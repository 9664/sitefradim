#!/usr/bin/env python3
"""Create a private preservation archive of the legacy fradim.com.br WordPress site.

The archive keeps legitimate same-origin pages, WordPress REST payloads, extracted text,
media binaries, metadata and checksums. Suspected injected/spam pages are not copied;
only a minimal diagnostic record is kept so the malicious material is not propagated.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import mimetypes
import os
import re
import sys
import time
import unicodedata
import xml.etree.ElementTree as ET
from collections import OrderedDict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable
from urllib.parse import unquote, urljoin, urlparse

import requests
from bs4 import BeautifulSoup

USER_AGENT = "FradimLegacyPreserver/1.0 (+https://fradim.com.br/)"
TIMEOUT = 30
MAX_PAGES = 2500
MAX_MEDIA = 10000
MAX_FILE_BYTES = 250 * 1024 * 1024

# Used only to avoid copying known injected material into the historical vault.
SUSPICIOUS_MARKERS = (
    "casino",
    "gambling",
    "sportsbook",
    "betting",
    "slot bonus",
    "free spins",
    "deposit bonus",
    "withdrawal casino",
    "royalgame",
    "thunderkick",
    "igaming",
)

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".tif", ".tiff", ".bmp", ".svg"}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def strip_html(value: str) -> str:
    return normalize_space(BeautifulSoup(value or "", "lxml").get_text(" ", strip=True))


def safe_slug(value: str, fallback: str = "item") -> str:
    value = unicodedata.normalize("NFKD", value or "").encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^a-zA-Z0-9._-]+", "-", value).strip("-._").lower()
    return value[:140] or fallback


def same_origin(url: str, base_host: str) -> bool:
    parsed = urlparse(url)
    return parsed.scheme in {"http", "https"} and parsed.netloc.lower().split(":")[0] == base_host


def looks_suspicious(title: str, url: str, text: str) -> bool:
    title_url = f"{title} {url}".lower()
    if any(marker in title_url for marker in SUSPICIOUS_MARKERS):
        return True
    body = text.lower()
    hits = sum(1 for marker in SUSPICIOUS_MARKERS if marker in body)
    return hits >= 2


def request(session: requests.Session, url: str, *, stream: bool = False) -> requests.Response:
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            response = session.get(url, timeout=TIMEOUT, allow_redirects=True, stream=stream)
            response.raise_for_status()
            return response
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            time.sleep(1.2 * (attempt + 1))
    raise RuntimeError(f"GET failed after retries: {url}: {last_error}")


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def append_jsonl(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(payload, ensure_ascii=False) + "\n")


def wp_paginate(session: requests.Session, base: str, endpoint: str, fields: str) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    page = 1
    while True:
        url = f"{base}/wp-json/wp/v2/{endpoint}?per_page=100&page={page}&_fields={fields}"
        response = request(session, url)
        payload = response.json()
        if not isinstance(payload, list):
            raise RuntimeError(f"Unexpected WordPress REST payload for {endpoint}")
        items.extend(payload)
        total_pages = int(response.headers.get("X-WP-TotalPages", "1"))
        if page >= total_pages:
            break
        page += 1
        time.sleep(0.15)
    return items


def discover_sitemap_urls(session: requests.Session, base: str, errors: list[dict[str, str]]) -> list[str]:
    seen: OrderedDict[str, None] = OrderedDict()
    queue = [f"{base}/wp-sitemap.xml", f"{base}/sitemap_index.xml", f"{base}/sitemap.xml"]
    processed: set[str] = set()

    while queue and len(processed) < 100:
        sitemap_url = queue.pop(0)
        if sitemap_url in processed:
            continue
        processed.add(sitemap_url)
        try:
            response = request(session, sitemap_url)
            root = ET.fromstring(response.content)
        except Exception as exc:  # noqa: BLE001
            errors.append({"stage": "sitemap", "url": sitemap_url, "error": str(exc)})
            continue

        locs = [normalize_space(node.text or "") for node in root.findall(".//{*}loc")]
        if root.tag.endswith("sitemapindex"):
            queue.extend(url for url in locs if url and same_origin(url, urlparse(base).hostname or ""))
        else:
            for url in locs:
                if url:
                    seen.setdefault(url, None)
    return list(seen.keys())[:MAX_PAGES]


def extract_page_media(html: str, page_url: str, base_host: str) -> set[str]:
    soup = BeautifulSoup(html, "lxml")
    urls: set[str] = set()

    def add(raw: str | None) -> None:
        if not raw:
            return
        resolved = urljoin(page_url, raw.strip())
        if same_origin(resolved, base_host):
            urls.add(resolved)

    for tag in soup.find_all("img"):
        add(tag.get("src"))
        add(tag.get("data-src"))
        add(tag.get("data-lazy-src"))
        for attr in ("srcset", "data-srcset"):
            raw = tag.get(attr)
            if raw:
                for candidate in str(raw).split(","):
                    add(candidate.strip().split(" ")[0])

    for tag in soup.find_all("meta"):
        if str(tag.get("property", "")).lower() in {"og:image", "og:image:url"}:
            add(tag.get("content"))

    for tag in soup.find_all("a"):
        href = tag.get("href")
        if href:
            path = urlparse(urljoin(page_url, href)).path.lower()
            if Path(path).suffix in IMAGE_EXTENSIONS:
                add(href)

    for match in re.finditer(r"url\([\"']?([^\"')]+)", html, flags=re.I):
        candidate = match.group(1).strip()
        if Path(urlparse(candidate).path).suffix.lower() in IMAGE_EXTENSIONS:
            add(candidate)

    return urls


def media_target(root: Path, url: str) -> Path:
    parsed = urlparse(url)
    path = unquote(parsed.path)
    if not path or path.endswith("/"):
        path += "index.bin"
    safe_parts = [safe_slug(part, "file") for part in Path(path).parts if part not in {"/", "", ".", ".."}]
    if not safe_parts:
        safe_parts = ["file.bin"]
    name = safe_parts[-1]
    original_suffix = Path(path).suffix.lower()
    if original_suffix and not name.endswith(original_suffix):
        name += original_suffix
    safe_parts[-1] = name
    return root.joinpath(*safe_parts)


def download_media(
    session: requests.Session,
    url: str,
    target_root: Path,
    manifest: list[dict[str, Any]],
    errors: list[dict[str, str]],
) -> None:
    try:
        response = request(session, url, stream=True)
        content_length = int(response.headers.get("Content-Length", "0") or 0)
        if content_length > MAX_FILE_BYTES:
            raise RuntimeError(f"file exceeds {MAX_FILE_BYTES} bytes")

        target = media_target(target_root, response.url)
        target.parent.mkdir(parents=True, exist_ok=True)
        h = hashlib.sha256()
        total = 0
        with target.open("wb") as fh:
            for chunk in response.iter_content(chunk_size=1024 * 1024):
                if not chunk:
                    continue
                total += len(chunk)
                if total > MAX_FILE_BYTES:
                    fh.close()
                    target.unlink(missing_ok=True)
                    raise RuntimeError(f"stream exceeded {MAX_FILE_BYTES} bytes")
                h.update(chunk)
                fh.write(chunk)

        manifest.append(
            {
                "url": url,
                "final_url": response.url,
                "path": str(target.relative_to(target_root.parent)),
                "bytes": total,
                "sha256": h.hexdigest(),
                "content_type": response.headers.get("Content-Type", ""),
                "last_modified": response.headers.get("Last-Modified", ""),
            }
        )
    except Exception as exc:  # noqa: BLE001
        errors.append({"stage": "media", "url": url, "error": str(exc)})


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="https://fradim.com.br")
    parser.add_argument("--output", default="legacy-vault")
    args = parser.parse_args()

    base = args.base.rstrip("/")
    base_host = (urlparse(base).hostname or "").lower()
    output = Path(args.output).resolve()
    output.mkdir(parents=True, exist_ok=True)

    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT, "Accept": "*/*"})

    errors: list[dict[str, str]] = []
    quarantined: list[dict[str, Any]] = []
    page_manifest: list[dict[str, Any]] = []
    media_manifest: list[dict[str, Any]] = []
    discovered_media: OrderedDict[str, None] = OrderedDict()
    suspicious_parent_ids: set[int] = set()

    inventory: dict[str, Any] = {
        "created_at": now_iso(),
        "source": base,
        "policy": {
            "same_origin_media_only": True,
            "suspected_injected_pages": "diagnostic-only; body/media not copied",
            "archive_is_private_backup_not_publication": True,
        },
    }

    # WordPress REST snapshots.
    wp_root = output / "wordpress-rest"
    rest_specs = {
        "posts": "id,date,modified,slug,link,title,content,excerpt,featured_media,categories,tags,status",
        "pages": "id,date,modified,slug,link,title,content,excerpt,featured_media,status",
    }
    for endpoint, fields in rest_specs.items():
        try:
            items = wp_paginate(session, base, endpoint, fields)
            for item in items:
                title = strip_html(item.get("title", {}).get("rendered", ""))
                content_html = item.get("content", {}).get("rendered", "")
                plain = strip_html(content_html)
                url = item.get("link", "")
                item_id = int(item.get("id", 0) or 0)
                if looks_suspicious(title, url, plain):
                    if item_id:
                        suspicious_parent_ids.add(item_id)
                    quarantined.append(
                        {
                            "type": endpoint[:-1],
                            "id": item_id,
                            "url_sha256": sha256_bytes(str(url).encode("utf-8")),
                            "reason": "suspected injected/spam content; body intentionally not archived",
                        }
                    )
                    continue

                slug = safe_slug(item.get("slug", ""), f"{endpoint[:-1]}-{item_id}")
                item_dir = wp_root / endpoint / slug
                item_dir.mkdir(parents=True, exist_ok=True)
                write_json(item_dir / "record.json", item)
                (item_dir / "content.html").write_text(content_html, encoding="utf-8")
                (item_dir / "content.txt").write_text(plain + "\n", encoding="utf-8")
        except Exception as exc:  # noqa: BLE001
            errors.append({"stage": f"wp-rest-{endpoint}", "url": f"{base}/wp-json/wp/v2/{endpoint}", "error": str(exc)})

    # Media library is the best chance of preserving orphaned uploads too.
    media_items: list[dict[str, Any]] = []
    try:
        media_fields = "id,date,modified,slug,link,source_url,mime_type,media_details,caption,description,alt_text,post"
        media_items = wp_paginate(session, base, "media", media_fields)
        for item in media_items:
            parent = int(item.get("post", 0) or 0)
            if parent and parent in suspicious_parent_ids:
                continue
            source_url = str(item.get("source_url", "") or "")
            if source_url and same_origin(source_url, base_host):
                discovered_media.setdefault(source_url, None)
        write_json(wp_root / "media-index.json", media_items)
    except Exception as exc:  # noqa: BLE001
        errors.append({"stage": "wp-rest-media", "url": f"{base}/wp-json/wp/v2/media", "error": str(exc)})

    # Sitemap/page capture preserves theme-era HTML and text, not only WP content.rendered.
    page_urls = discover_sitemap_urls(session, base, errors)
    for index, url in enumerate(page_urls, start=1):
        if index > MAX_PAGES:
            break
        if not same_origin(url, base_host):
            continue
        try:
            response = request(session, url)
            html = response.text
            soup = BeautifulSoup(html, "lxml")
            title = normalize_space(soup.title.get_text(" ", strip=True) if soup.title else "")
            plain = normalize_space(soup.get_text("\n", strip=True))
            if looks_suspicious(title, response.url, plain):
                quarantined.append(
                    {
                        "type": "page-html",
                        "url_sha256": sha256_bytes(response.url.encode("utf-8")),
                        "status": response.status_code,
                        "body_sha256": sha256_bytes(response.content),
                        "reason": "suspected injected/spam content; HTML/text/media intentionally not archived",
                    }
                )
                continue

            parsed = urlparse(response.url)
            slug = safe_slug(parsed.path.strip("/") or "home", "home")
            page_dir = output / "pages" / slug
            page_dir.mkdir(parents=True, exist_ok=True)
            (page_dir / "source.html").write_bytes(response.content)
            (page_dir / "text.txt").write_text(plain + "\n", encoding="utf-8")
            page_record = {
                "url": url,
                "final_url": response.url,
                "status": response.status_code,
                "title": title,
                "html_sha256": sha256_bytes(response.content),
                "html_bytes": len(response.content),
                "saved_as": str((page_dir / "source.html").relative_to(output)),
            }
            page_manifest.append(page_record)
            write_json(page_dir / "metadata.json", page_record)
            for media_url in extract_page_media(html, response.url, base_host):
                discovered_media.setdefault(media_url, None)
        except Exception as exc:  # noqa: BLE001
            errors.append({"stage": "page", "url": url, "error": str(exc)})
        time.sleep(0.12)

    # Download same-origin media discovered from both the WP media library and legitimate pages.
    media_root = output / "media"
    for idx, url in enumerate(discovered_media.keys(), start=1):
        if idx > MAX_MEDIA:
            errors.append({"stage": "media", "url": "", "error": f"media limit reached at {MAX_MEDIA}"})
            break
        download_media(session, url, media_root, media_manifest, errors)
        time.sleep(0.08)

    write_json(output / "manifests" / "pages.json", page_manifest)
    write_json(output / "manifests" / "media.json", media_manifest)
    write_json(output / "manifests" / "quarantine.json", quarantined)
    write_json(output / "manifests" / "errors.json", errors)

    # File-level checksum catalogue for long-term integrity checks.
    checksum_rows: list[tuple[str, str, int]] = []
    for path in sorted(p for p in output.rglob("*") if p.is_file() and "checksums" not in p.parts):
        checksum_rows.append((str(path.relative_to(output)), sha256_file(path), path.stat().st_size))
    checksum_path = output / "manifests" / "checksums.csv"
    checksum_path.parent.mkdir(parents=True, exist_ok=True)
    with checksum_path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.writer(fh)
        writer.writerow(["path", "sha256", "bytes"])
        writer.writerows(checksum_rows)

    counts = {
        "sitemap_urls_discovered": len(page_urls),
        "legitimate_pages_archived": len(page_manifest),
        "media_urls_discovered": len(discovered_media),
        "media_files_archived": len(media_manifest),
        "quarantined_records": len(quarantined),
        "errors": len(errors),
        "archive_files": len(checksum_rows),
        "archive_bytes_before_packaging": sum(row[2] for row in checksum_rows),
    }
    inventory["counts"] = counts
    write_json(output / "inventory.json", inventory)

    report = [
        "# Fradim.com.br — relatório de preservação do legado",
        "",
        f"Gerado em: {inventory['created_at']}",
        f"Fonte: {base}",
        "",
        "## Contagens",
        "",
        *(f"- {key}: {value}" for key, value in counts.items()),
        "",
        "## Política",
        "",
        "- O pacote é backup privado, não material de publicação.",
        "- Páginas suspeitas de injeção/spam não têm corpo ou mídia copiados; apenas evidência mínima/hash.",
        "- Somente mídia hospedada no próprio fradim.com.br é baixada automaticamente.",
        "- Itens com direitos/proveniência incertos permanecem sujeitos a curadoria antes de qualquer republicação.",
    ]
    (output / "REPORT.md").write_text("\n".join(report) + "\n", encoding="utf-8")

    print(json.dumps(counts, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
