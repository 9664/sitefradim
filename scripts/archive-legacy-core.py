#!/usr/bin/env python3
"""Core private archive of legitimate WordPress text and same-origin media.

Uses WordPress REST as the authoritative inventory, then fetches only links belonging to
legitimate posts/pages. This avoids crawling injected sitemap entries while preserving
full rendered text, source HTML, media metadata, original binaries and SHA-256 hashes.
"""
from __future__ import annotations

import argparse, csv, hashlib, json, re, sys, time, unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup

BASE_UA = "FradimLegacyPreserver/3.0 (+https://fradim.com.br/)"
MAX_FILE = 250 * 1024 * 1024
MEDIA_WORKERS = 20
PAGE_WORKERS = 12

# Detection only: compromised/injected records are excluded from historical body/media.
BAD_MARKERS = (
    "casino", "gambling", "sportsbook", "betting", "slot bonus", "free spins",
    "deposit bonus", "withdrawal casino", "royalgame", "thunderkick", "igaming",
)


def session() -> requests.Session:
    s = requests.Session()
    s.headers.update({"User-Agent": BASE_UA, "Accept": "*/*"})
    return s


def get(s: requests.Session, url: str, *, stream: bool=False) -> requests.Response:
    last = None
    for n in range(2):
        try:
            r = s.get(url, timeout=(7, 15), allow_redirects=True, stream=stream)
            r.raise_for_status()
            return r
        except Exception as exc:  # noqa
            last = exc
            time.sleep(.4 * (n + 1))
    raise RuntimeError(f"GET failed: {last}")


def text(html: str) -> str:
    return re.sub(r"\s+", " ", BeautifulSoup(html or "", "lxml").get_text(" ", strip=True)).strip()


def bad(title: str, url: str, body: str) -> bool:
    head = f"{title} {url}".lower()
    if any(x in head for x in BAD_MARKERS):
        return True
    body_l = body.lower()
    return sum(x in body_l for x in BAD_MARKERS) >= 2


def same(url: str, host: str) -> bool:
    p = urlparse(url)
    return p.scheme in {"http", "https"} and (p.hostname or "").lower() == host


def slug(v: str, fallback: str) -> str:
    v = unicodedata.normalize("NFKD", v or "").encode("ascii", "ignore").decode()
    v = re.sub(r"[^A-Za-z0-9._-]+", "-", v).strip("-._").lower()
    return v[:150] or fallback


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def file_digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for c in iter(lambda: f.read(1024 * 1024), b""):
            h.update(c)
    return h.hexdigest()


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")


def all_items(base: str, endpoint: str, fields: str, errors: list[dict[str,str]]) -> list[dict[str,Any]]:
    s = session(); result=[]; page=1
    while True:
        url=f"{base}/wp-json/wp/v2/{endpoint}?per_page=100&page={page}&_fields={fields}"
        try:
            r=get(s,url); data=r.json()
        except Exception as exc:  # noqa
            errors.append({"stage":endpoint,"url":url,"error":str(exc)}); break
        if not isinstance(data,list):
            errors.append({"stage":endpoint,"url":url,"error":"unexpected payload"}); break
        result.extend(data)
        total=int(r.headers.get("X-WP-TotalPages","1") or 1)
        if page>=total: break
        page+=1
    return result


def html_images(html: str, page_url: str, host: str) -> set[str]:
    soup=BeautifulSoup(html or "","lxml"); urls=set()
    def add(raw):
        if not raw: return
        u=urljoin(page_url, str(raw).strip())
        if same(u,host): urls.add(u)
    for img in soup.find_all("img"):
        for a in ("src","data-src","data-lazy-src"): add(img.get(a))
        for a in ("srcset","data-srcset"):
            raw=img.get(a)
            if raw:
                for part in str(raw).split(","): add(part.strip().split(" ")[0])
    for meta in soup.find_all("meta"):
        if str(meta.get("property","")).lower() in {"og:image","og:image:url"}: add(meta.get("content"))
    return urls


def fetch_page(out: Path, item_type: str, item_id: int, link: str, host: str):
    s=session()
    try:
        r=get(s,link); raw=r.content; soup=BeautifulSoup(raw,"lxml")
        title=soup.title.get_text(" ",strip=True) if soup.title else ""
        body=re.sub(r"\s+"," ",soup.get_text(" ",strip=True)).strip()
        if bad(title,r.url,body):
            return None,set(),{"type":"page-html","id":item_id,"url_sha256":digest(r.url.encode()),"body_sha256":digest(raw)},None
        folder=out/"rendered-pages"/item_type/f"{item_id}"
        folder.mkdir(parents=True,exist_ok=True)
        (folder/"source.html").write_bytes(raw); (folder/"text.txt").write_text(body+"\n",encoding="utf-8")
        rec={"id":item_id,"url":link,"final_url":r.url,"status":r.status_code,"title":title,"sha256":digest(raw),"bytes":len(raw)}
        write_json(folder/"metadata.json",rec)
        return rec,html_images(r.text,r.url,host),None,None
    except Exception as exc:  # noqa
        return None,set(),None,{"stage":"rendered-page","url":link,"error":str(exc)}


def filename_for(root: Path, key: str, url: str) -> Path:
    p=urlparse(url); name=Path(unquote(p.path)).name or "file.bin"
    suffix=Path(name).suffix.lower(); name=slug(name,"file")
    if suffix and not name.endswith(suffix): name+=suffix
    return root/f"{key}-{name}"


def fetch_media(root: Path, key: str, url: str):
    s=session()
    try:
        r=get(s,url,stream=True)
        declared=int(r.headers.get("Content-Length","0") or 0)
        if declared>MAX_FILE: raise RuntimeError("file too large")
        target=filename_for(root,key,r.url); target.parent.mkdir(parents=True,exist_ok=True)
        h=hashlib.sha256(); size=0
        with target.open("wb") as f:
            for c in r.iter_content(1024*1024):
                if not c: continue
                size+=len(c)
                if size>MAX_FILE:
                    f.close(); target.unlink(missing_ok=True); raise RuntimeError("file too large")
                h.update(c); f.write(c)
        return {"url":url,"final_url":r.url,"path":str(target.relative_to(root.parent)),"bytes":size,"sha256":h.hexdigest(),"content_type":r.headers.get("Content-Type","")},None
    except Exception as exc:  # noqa
        return None,{"stage":"media","url":url,"error":str(exc)}


def main() -> int:
    ap=argparse.ArgumentParser(); ap.add_argument("--base",default="https://fradim.com.br"); ap.add_argument("--output",default="legacy-vault")
    a=ap.parse_args(); base=a.base.rstrip("/"); host=(urlparse(base).hostname or "").lower(); out=Path(a.output).resolve(); out.mkdir(parents=True,exist_ok=True)
    errors=[]; quarantine=[]; suspicious_ids=set(); legit_links=[]; media_urls={}

    specs={
        "posts":"id,date,modified,slug,link,title,content,excerpt,featured_media,categories,tags,status",
        "pages":"id,date,modified,slug,link,title,content,excerpt,featured_media,status",
    }
    for endpoint,fields in specs.items():
        for item in all_items(base,endpoint,fields,errors):
            iid=int(item.get("id",0) or 0); title=text(item.get("title",{}).get("rendered","")); body_html=item.get("content",{}).get("rendered",""); body=text(body_html); link=str(item.get("link","") or "")
            if bad(title,link,body):
                suspicious_ids.add(iid); quarantine.append({"type":endpoint[:-1],"id":iid,"url_sha256":digest(link.encode()),"reason":"compromised record excluded"}); continue
            folder=out/"wordpress-rest"/endpoint/slug(str(item.get("slug","")),f"{endpoint[:-1]}-{iid}"); folder.mkdir(parents=True,exist_ok=True)
            write_json(folder/"record.json",item); (folder/"content.html").write_text(body_html,encoding="utf-8"); (folder/"content.txt").write_text(body+"\n",encoding="utf-8")
            if link and same(link,host): legit_links.append((endpoint[:-1],iid,link))
            for u in html_images(body_html,link or base,host): media_urls.setdefault(u,f"content-{iid}-{hashlib.sha1(u.encode()).hexdigest()[:8]}")

    fields="id,date,modified,slug,link,source_url,mime_type,media_details,caption,description,alt_text,post,title"
    safe_meta=[]
    for item in all_items(base,"media",fields,errors):
        iid=int(item.get("id",0) or 0); parent=int(item.get("post",0) or 0); src=str(item.get("source_url","") or ""); title=text(item.get("title",{}).get("rendered","")); desc=text(item.get("description",{}).get("rendered","")); cap=text(item.get("caption",{}).get("rendered","")); alt=str(item.get("alt_text","") or "")
        if parent in suspicious_ids or bad(title,src,f"{desc} {cap} {alt}"):
            quarantine.append({"type":"media","id":iid,"url_sha256":digest(src.encode()),"reason":"compromised media record excluded"}); continue
        safe_meta.append(item)
        if src and same(src,host): media_urls.setdefault(src,f"wp-{iid}")
    write_json(out/"wordpress-rest/media-index.json",safe_meta)

    page_records=[]
    with ThreadPoolExecutor(max_workers=PAGE_WORKERS) as ex:
        futures={ex.submit(fetch_page,out,t,i,u,host):u for t,i,u in legit_links}
        for fut in as_completed(futures):
            rec,urls,q,err=fut.result()
            if rec: page_records.append(rec)
            if q: quarantine.append(q)
            if err: errors.append(err)
            for u in urls: media_urls.setdefault(u,f"page-{hashlib.sha1(u.encode()).hexdigest()[:12]}")

    media_records=[]; media_root=out/"media"
    with ThreadPoolExecutor(max_workers=MEDIA_WORKERS) as ex:
        futures={ex.submit(fetch_media,media_root,key,u):u for u,key in list(media_urls.items())}
        for fut in as_completed(futures):
            rec,err=fut.result()
            if rec: media_records.append(rec)
            if err: errors.append(err)

    page_records.sort(key=lambda x:x["final_url"]); media_records.sort(key=lambda x:x["final_url"])
    write_json(out/"manifests/pages.json",page_records); write_json(out/"manifests/media.json",media_records); write_json(out/"manifests/quarantine.json",quarantine); write_json(out/"manifests/errors.json",errors)

    checksum=out/"manifests/checksums.csv"; rows=[]
    for p in sorted(x for x in out.rglob("*") if x.is_file() and x!=checksum): rows.append((str(p.relative_to(out)),file_digest(p),p.stat().st_size))
    checksum.parent.mkdir(parents=True,exist_ok=True)
    with checksum.open("w",encoding="utf-8",newline="") as f:
        w=csv.writer(f); w.writerow(["path","sha256","bytes"]); w.writerows(rows)

    counts={"legitimate_wordpress_records":len(legit_links),"legitimate_pages_archived":len(page_records),"wp_media_records_retained":len(safe_meta),"media_urls_discovered":len(media_urls),"media_files_archived":len(media_records),"quarantined_records":len(quarantine),"errors":len(errors),"archive_files":len(rows),"archive_bytes_before_packaging":sum(x[2] for x in rows)}
    inventory={"created_at":datetime.now(timezone.utc).isoformat(),"source":base,"capture_version":3,"policy":{"private_backup":True,"compromised_records":"diagnostic-only","same_origin_media_only":True,"republication_requires_curation":True},"counts":counts}
    write_json(out/"inventory.json",inventory)
    (out/"REPORT.md").write_text("# Fradim.com.br — cofre privado do legado\n\n"+"\n".join(f"- {k}: {v}" for k,v in counts.items())+"\n\nBackup privado; não autoriza republicação automática de mídia.\n",encoding="utf-8")
    print(json.dumps(counts,ensure_ascii=False)); return 0

if __name__=="__main__": sys.exit(main())
