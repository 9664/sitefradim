#!/usr/bin/env python3
"""Fast private preservation sweep for the legacy fradim.com.br WordPress site.

This is a second, independent capture path. It prioritizes WordPress REST originals,
full rendered text, sitemap-era HTML and same-origin media. Suspected injected content
is represented only by non-content diagnostic hashes and is never copied into the
historical body/media archive.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import sys
import threading
import time
import unicodedata
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urljoin, urlparse

import requests
from bs4 import BeautifulSoup

UA = "FradimLegacyPreserver/2.0 (+https://fradim.com.br/)"
CONNECT_TIMEOUT = 8
READ_TIMEOUT = 20
MAX_FILE = 250 * 1024 * 1024
PAGE_WORKERS = 12
MEDIA_WORKERS = 16
MAX_SITEMAP_URLS = 5000
MAX_MEDIA = 20000

# Detection only. Suspected injected material is excluded from body/media capture.
SUSPICIOUS = (
    "casino", "gambling", "sportsbook", "betting", "slot bonus", "free spins",
    "deposit bonus", "withdrawal casino", "royalgame", "thunderkick", "igaming",
)
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".tif", ".tiff", ".bmp", ".svg", ".avif"}


def utcnow() -> str:
    return datetime.now(timezone.utc).isoformat()


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def text_from_html(value: str) -> str:
    return clean(BeautifulSoup(value or "", "lxml").get_text(" ", strip=True))


def slugify(value: str, fallback: str) -> str:
    value = unicodedata.normalize("NFKD", value or "").encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^A-Za-z0-9._-]+", "-", value).strip("-._").lower()
    return value[:150] or fallback


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def same_origin(url: str, host: str) -> bool:
    p = urlparse(url)
    return p.scheme in {"http", "https"} and (p.hostname or "").lower() == host


def suspicious(title: str, url: str, body: str) -> bool:
    head = f"{title} {url}".lower()
    if any(marker in head for marker in SUSPICIOUS):
        return True
    low = body.lower()
    return sum(marker in low for marker in SUSPICIOUS) >= 2


def new_session() -> requests.Session:
    session = requests.Session()
    session.headers.update({"User-Agent": UA, "Accept": "*/*"})
    return session


def get(session: requests.Session, url: str, *, stream: bool = False) -> requests.Response:
    error: Exception | None = None
    for attempt in range(2):
        try:
            r = session.get(url, timeout=(CONNECT_TIMEOUT, READ_TIMEOUT), allow_redirects=True, stream=stream)
            r.raise_for_status()
            return r
        except Exception as exc:  # noqa: BLE001
            error = exc
            time.sleep(0.5 * (attempt + 1))
    raise RuntimeError(f"GET failed: {url}: {error}")


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def wp_all(base: str, endpoint: str, fields: str, errors: list[dict[str, str]]) -> list[dict[str, Any]]:
    session = new_session()
    out: list[dict[str, Any]] = []
    page = 1
    while True:
        url = f"{base}/wp-json/wp/v2/{endpoint}?per_page=100&page={page}&_fields={fields}"
        try:
            r = get(session, url)
            data = r.json()
        except Exception as exc:  # noqa: BLE001
            errors.append({"stage": f"rest-{endpoint}", "url": url, "error": str(exc)})
            break
        if not isinstance(data, list):
            errors.append({"stage": f"rest-{endpoint}", "url": url, "error": "non-list payload"})
            break
        out.extend(data)
        total = int(r.headers.get("X-WP-TotalPages", "1") or 1)
        if page >= total:
            break
        page += 1
    return out


def sitemap_urls(base: str, host: str, errors: list[dict[str, str]]) -> list[str]:
    session = new_session()
    queue = [f"{base}/wp-sitemap.xml", f"{base}/sitemap_index.xml", f"{base}/sitemap.xml"]
    seen_maps: set[str] = set()
    pages: dict[str, None] = {}
    while queue and len(seen_maps) < 100:
        url = queue.pop(0)
        if url in seen_maps:
            continue
        seen_maps.add(url)
        try:
            r = get(session, url)
            root = ET.fromstring(r.content)
        except Exception as exc:  # noqa: BLE001
            errors.append({"stage": "sitemap", "url": url, "error": str(exc)})
            continue
        locs = [clean(node.text or "") for node in root.findall(".//{*}loc")]
        if root.tag.endswith("sitemapindex"):
            queue.extend(x for x in locs if x and same_origin(x, host))
        else:
            for x in locs:
                if x and same_origin(x, host):
                    pages.setdefault(x, None)
                    if len(pages) >= MAX_SITEMAP_URLS:
                        return list(pages)
    return list(pages)


def html_media(html: str, page_url: str, host: str) -> set[str]:
    soup = BeautifulSoup(html, "lxml")
    out: set[str] = set()

    def add(raw: str | None) -> None:
        if not raw:
            return
        resolved = urljoin(page_url, raw.strip())
        if same_origin(resolved, host):
            out.add(resolved)

    for img in soup.find_all("img"):
        for attr in ("src", "data-src", "data-lazy-src"):
            add(img.get(attr))
        for attr in ("srcset", "data-srcset"):
            raw = img.get(attr)
            if raw:
                for part in str(raw).split(","):
                    add(part.strip().split(" ")[0])
    for meta in soup.find_all("meta"):
        if str(meta.get("property", "")).lower() in {"og:image", "og:image:url"}:
            add(meta.get("content"))
    for anchor in soup.find_all("a"):
        href = anchor.get("href")
        if href and Path(urlparse(urljoin(page_url, href)).path).suffix.lower() in IMAGE_EXTS:
            add(href)
    for match in re.finditer(r"url\([\"']?([^\"')]+)", html, flags=re.I):
        raw = match.group(1).strip()
        if Path(urlparse(raw).path).suffix.lower() in IMAGE_EXTS:
            add(raw)
    return out


def capture_page(base_output: Path, url: str, host: str) -> tuple[dict[str, Any] | None, set[str], dict[str, Any] | None, dict[str, str] | None]:
    session = new_session()
    try:
        r = get(session, url)
        html = r.text
        soup = BeautifulSoup(html, "lxml")
        title = clean(soup.title.get_text(" ", strip=True) if soup.title else "")
        body = clean(soup.get_text("\n", strip=True))
        if suspicious(title, r.url, body):
            return None, set(), {
                "type": "page-html",
                "url_sha256": sha(r.url.encode()),
                "body_sha256": sha(r.content),
                "status": r.status_code,
                "reason": "suspected injected content; body/media excluded",
            }, None
        parsed = urlparse(r.url)
        slug = slugify(parsed.path.strip("/") or "home", "home")
        folder = base_output / "pages" / slug
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "source.html").write_bytes(r.content)
        (folder / "text.txt").write_text(body + "\n", encoding="utf-8")
        record = {
            "url": url, "final_url": r.url, "status": r.status_code, "title": title,
            "html_sha256": sha(r.content), "html_bytes": len(r.content),
            "saved_as": str((folder / "source.html").relative_to(base_output)),
        }
        write_json(folder / "metadata.json", record)
        return record, html_media(html, r.url, host), None, None
    except Exception as exc:  # noqa: BLE001
        return None, set(), None, {"stage": "page", "url": url, "error": str(exc)}


def target_for(root: Path, key: str, url: str) -> Path:
    p = urlparse(url)
    filename = Path(unquote(p.path)).name or "file.bin"
    filename = slugify(filename, "file.bin")
    suffix = Path(unquote(p.path)).suffix.lower()
    if suffix and not filename.endswith(suffix):
        filename += suffix
    return root / f"{key}-{filename}"


def download_one(root: Path, key: str, url: str) -> tuple[dict[str, Any] | None, dict[str, str] | None]:
    session = new_session()
    try:
        r = get(session, url, stream=True)
        size_header = int(r.headers.get("Content-Length", "0") or 0)
        if size_header > MAX_FILE:
            raise RuntimeError("file too large")
        target = target_for(root, key, r.url)
        target.parent.mkdir(parents=True, exist_ok=True)
        h = hashlib.sha256()
        total = 0
        with target.open("wb") as fh:
            for chunk in r.iter_content(1024 * 1024):
                if not chunk:
                    continue
                total += len(chunk)
                if total > MAX_FILE:
                    fh.close()
                    target.unlink(missing_ok=True)
                    raise RuntimeError("stream too large")
                h.update(chunk)
                fh.write(chunk)
        return {
            "url": url, "final_url": r.url, "path": str(target.relative_to(root.parent)),
            "bytes": total, "sha256": h.hexdigest(),
            "content_type": r.headers.get("Content-Type", ""),
            "last_modified": r.headers.get("Last-Modified", ""),
        }, None
    except Exception as exc:  # noqa: BLE001
        return None, {"stage": "media", "url": url, "error": str(exc)}


def file_sha(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="https://fradim.com.br")
    ap.add_argument("--output", default="legacy-vault")
    args = ap.parse_args()
    base = args.base.rstrip("/")
    host = (urlparse(base).hostname or "").lower()
    out = Path(args.output).resolve()
    out.mkdir(parents=True, exist_ok=True)

    errors: list[dict[str, str]] = []
    quarantine: list[dict[str, Any]] = []
    suspicious_ids: set[int] = set()
    wp_root = out / "wordpress-rest"

    specs = {
        "posts": "id,date,modified,slug,link,title,content,excerpt,featured_media,categories,tags,status",
        "pages": "id,date,modified,slug,link,title,content,excerpt,featured_media,status",
    }
    for endpoint, fields in specs.items():
        items = wp_all(base, endpoint, fields, errors)
        for item in items:
            item_id = int(item.get("id", 0) or 0)
            title = text_from_html(item.get("title", {}).get("rendered", ""))
            content_html = item.get("content", {}).get("rendered", "")
            body = text_from_html(content_html)
            link = str(item.get("link", "") or "")
            if suspicious(title, link, body):
                suspicious_ids.add(item_id)
                quarantine.append({
                    "type": endpoint[:-1], "id": item_id,
                    "url_sha256": sha(link.encode()),
                    "reason": "suspected injected content; body excluded",
                })
                continue
            slug = slugify(str(item.get("slug", "")), f"{endpoint[:-1]}-{item_id}")
            folder = wp_root / endpoint / slug
            folder.mkdir(parents=True, exist_ok=True)
            write_json(folder / "record.json", item)
            (folder / "content.html").write_text(content_html, encoding="utf-8")
            (folder / "content.txt").write_text(body + "\n", encoding="utf-8")

    media_fields = "id,date,modified,slug,link,source_url,mime_type,media_details,caption,description,alt_text,post,title"
    media_items = wp_all(base, "media", media_fields, errors)
    safe_media_meta: list[dict[str, Any]] = []
    candidates: dict[str, str] = {}
    for item in media_items:
        item_id = int(item.get("id", 0) or 0)
        parent = int(item.get("post", 0) or 0)
        title = text_from_html(item.get("title", {}).get("rendered", ""))
        desc = text_from_html(item.get("description", {}).get("rendered", ""))
        caption = text_from_html(item.get("caption", {}).get("rendered", ""))
        alt = str(item.get("alt_text", "") or "")
        src = str(item.get("source_url", "") or "")
        if parent in suspicious_ids or suspicious(title, src, f"{desc} {caption} {alt}"):
            quarantine.append({"type": "media", "id": item_id, "url_sha256": sha(src.encode()), "reason": "associated with suspected injected content; binary excluded"})
            continue
        safe_media_meta.append(item)
        if src and same_origin(src, host):
            candidates.setdefault(src, f"wp-{item_id}")
    write_json(wp_root / "media-index.json", safe_media_meta)

    urls = sitemap_urls(base, host, errors)
    page_records: list[dict[str, Any]] = []
    with ThreadPoolExecutor(max_workers=PAGE_WORKERS) as pool:
        futures = {pool.submit(capture_page, out, url, host): url for url in urls}
        for future in as_completed(futures):
            record, page_media, q, err = future.result()
            if record:
                page_records.append(record)
            if q:
                quarantine.append(q)
            if err:
                errors.append(err)
            for media_url in page_media:
                candidates.setdefault(media_url, f"page-{hashlib.sha1(media_url.encode()).hexdigest()[:12]}")

    media_records: list[dict[str, Any]] = []
    media_root = out / "media"
    media_pairs = list(candidates.items())[:MAX_MEDIA]
    with ThreadPoolExecutor(max_workers=MEDIA_WORKERS) as pool:
        futures = {pool.submit(download_one, media_root, key, url): url for url, key in media_pairs}
        for future in as_completed(futures):
            rec, err = future.result()
            if rec:
                media_records.append(rec)
            if err:
                errors.append(err)

    page_records.sort(key=lambda x: x["final_url"])
    media_records.sort(key=lambda x: x["final_url"])
    write_json(out / "manifests/pages.json", page_records)
    write_json(out / "manifests/media.json", media_records)
    write_json(out / "manifests/quarantine.json", quarantine)
    write_json(out / "manifests/errors.json", errors)

    checksum_path = out / "manifests/checksums.csv"
    rows: list[tuple[str, str, int]] = []
    for path in sorted(p for p in out.rglob("*") if p.is_file() and p != checksum_path):
        rows.append((str(path.relative_to(out)), file_sha(path), path.stat().st_size))
    checksum_path.parent.mkdir(parents=True, exist_ok=True)
    with checksum_path.open("w", encoding="utf-8", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["path", "sha256", "bytes"])
        w.writerows(rows)

    counts = {
        "sitemap_urls_discovered": len(urls),
        "legitimate_pages_archived": len(page_records),
        "wp_media_records_retained": len(safe_media_meta),
        "media_urls_discovered": len(candidates),
        "media_files_archived": len(media_records),
        "quarantined_records": len(quarantine),
        "errors": len(errors),
        "archive_files": len(rows),
        "archive_bytes_before_packaging": sum(size for _, _, size in rows),
    }
    inventory = {
        "created_at": utcnow(),
        "source": base,
        "capture_version": 2,
        "policy": {
            "private_backup": True,
            "same_origin_media_only": True,
            "suspected_injected_content": "diagnostic hashes only; body/binaries excluded",
            "publication_requires_separate_curation": True,
        },
        "counts": counts,
    }
    write_json(out / "inventory.json", inventory)
    (out / "REPORT.md").write_text(
        "# Fradim.com.br — cofre privado do legado\n\n"
        f"Captura: {inventory['created_at']}\n\n"
        + "\n".join(f"- {k}: {v}" for k, v in counts.items())
        + "\n\nEste pacote é preservação privada. Ele não autoriza republicação automática de nenhuma mídia.\n",
        encoding="utf-8",
    )
    print(json.dumps(counts, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
