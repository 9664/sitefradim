#!/usr/bin/env python3
"""Private preservation of legitimate WordPress text and original media files.

Preserves original uploads (source_url), full REST records, rendered content HTML/text,
and rendered HTML for legitimate posts/pages. Auto-generated thumbnail variants are not
copied because they are reproducible from the original upload.
"""
from __future__ import annotations

import argparse, csv, hashlib, json, re, sys, time, unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlparse

import requests
from bs4 import BeautifulSoup

UA = "FradimLegacyPreserver/4.0 (+https://fradim.com.br/)"
MAX_FILE = 250 * 1024 * 1024
MEDIA_WORKERS = 32
PAGE_WORKERS = 16

# Detection only. Compromised records are excluded from historical content capture.
BAD = (
    "casino", "gambling", "sportsbook", "betting", "slot bonus", "free spins",
    "deposit bonus", "withdrawal casino", "royalgame", "thunderkick", "igaming",
)


def sess() -> requests.Session:
    s=requests.Session(); s.headers.update({"User-Agent":UA,"Accept":"*/*"}); return s

def get(s: requests.Session,url:str,stream:bool=False,slow:bool=False)->requests.Response:
    timeout=(7,30) if slow else (5,12)
    tries=2 if slow else 1
    last=None
    for i in range(tries):
        try:
            r=s.get(url,timeout=timeout,allow_redirects=True,stream=stream); r.raise_for_status(); return r
        except Exception as e:
            last=e; time.sleep(.4*(i+1))
    raise RuntimeError(str(last))

def plain(html:str)->str:
    return re.sub(r"\s+"," ",BeautifulSoup(html or "","lxml").get_text(" ",strip=True)).strip()

def suspicious(title:str,url:str,body:str)->bool:
    h=f"{title} {url}".lower()
    if any(x in h for x in BAD): return True
    low=body.lower(); return sum(x in low for x in BAD)>=2

def safe_slug(v:str,fallback:str)->str:
    v=unicodedata.normalize("NFKD",v or "").encode("ascii","ignore").decode(); v=re.sub(r"[^A-Za-z0-9._-]+","-",v).strip("-._").lower(); return v[:150] or fallback

def sha_bytes(b:bytes)->str: return hashlib.sha256(b).hexdigest()
def sha_file(p:Path)->str:
    h=hashlib.sha256();
    with p.open("rb") as f:
        for c in iter(lambda:f.read(1024*1024),b""): h.update(c)
    return h.hexdigest()
def same(url:str,host:str)->bool:
    p=urlparse(url); return p.scheme in {"http","https"} and (p.hostname or "").lower()==host
def write_json(p:Path,v:Any)->None:
    p.parent.mkdir(parents=True,exist_ok=True); p.write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding="utf-8")

def rest_all(base:str,endpoint:str,fields:str,errors:list[dict])->list[dict]:
    s=sess(); out=[]; page=1
    while True:
        url=f"{base}/wp-json/wp/v2/{endpoint}?per_page=100&page={page}&_fields={fields}"
        try: r=get(s,url,slow=True); data=r.json()
        except Exception as e: errors.append({"stage":endpoint,"url":url,"error":str(e)}); break
        if not isinstance(data,list): errors.append({"stage":endpoint,"url":url,"error":"unexpected payload"}); break
        out.extend(data); total=int(r.headers.get("X-WP-TotalPages","1") or 1)
        if page>=total: break
        page+=1
    return out

def capture_page(root:Path,kind:str,iid:int,url:str):
    s=sess()
    try:
        r=get(s,url,slow=True); body=plain(r.text); title=plain(str(BeautifulSoup(r.text,"lxml").title or ""))
        if suspicious(title,r.url,body): return None,{"type":"rendered-page","id":iid,"url_sha256":sha_bytes(r.url.encode())},None
        d=root/"rendered-pages"/kind/str(iid); d.mkdir(parents=True,exist_ok=True); (d/"source.html").write_bytes(r.content); (d/"text.txt").write_text(body+"\n",encoding="utf-8")
        rec={"id":iid,"url":url,"final_url":r.url,"status":r.status_code,"sha256":sha_bytes(r.content),"bytes":len(r.content)}; write_json(d/"metadata.json",rec); return rec,None,None
    except Exception as e: return None,None,{"stage":"rendered-page","url":url,"error":str(e)}

def media_target(root:Path,iid:int,url:str)->Path:
    name=Path(unquote(urlparse(url).path)).name or "file.bin"; suffix=Path(name).suffix.lower(); name=safe_slug(name,"file")
    if suffix and not name.endswith(suffix): name+=suffix
    return root/f"{iid}-{name}"

def download_media(root:Path,iid:int,url:str,slow:bool=False):
    s=sess()
    try:
        r=get(s,url,stream=True,slow=slow); declared=int(r.headers.get("Content-Length","0") or 0)
        if declared>MAX_FILE: raise RuntimeError("file too large")
        target=media_target(root,iid,r.url); target.parent.mkdir(parents=True,exist_ok=True); h=hashlib.sha256(); size=0
        with target.open("wb") as f:
            for c in r.iter_content(1024*1024):
                if not c: continue
                size+=len(c)
                if size>MAX_FILE: f.close(); target.unlink(missing_ok=True); raise RuntimeError("file too large")
                h.update(c); f.write(c)
        return {"id":iid,"url":url,"final_url":r.url,"path":str(target.relative_to(root.parent)),"bytes":size,"sha256":h.hexdigest(),"content_type":r.headers.get("Content-Type","")},None
    except Exception as e: return None,{"stage":"media","id":iid,"url":url,"error":str(e)}

def main()->int:
    ap=argparse.ArgumentParser(); ap.add_argument("--base",default="https://fradim.com.br"); ap.add_argument("--output",default="legacy-vault"); a=ap.parse_args()
    base=a.base.rstrip("/"); host=(urlparse(base).hostname or "").lower(); root=Path(a.output).resolve(); root.mkdir(parents=True,exist_ok=True)
    errors=[]; quarantine=[]; bad_ids=set(); links=[]
    specs={"posts":"id,date,modified,slug,link,title,content,excerpt,featured_media,categories,tags,status","pages":"id,date,modified,slug,link,title,content,excerpt,featured_media,status"}
    for endpoint,fields in specs.items():
        for item in rest_all(base,endpoint,fields,errors):
            iid=int(item.get("id",0) or 0); title=plain(item.get("title",{}).get("rendered","")); html=item.get("content",{}).get("rendered",""); body=plain(html); link=str(item.get("link","") or "")
            if suspicious(title,link,body): bad_ids.add(iid); quarantine.append({"type":endpoint[:-1],"id":iid,"url_sha256":sha_bytes(link.encode()),"reason":"compromised record excluded"}); continue
            d=root/"wordpress-rest"/endpoint/safe_slug(str(item.get("slug","")),f"{endpoint[:-1]}-{iid}"); d.mkdir(parents=True,exist_ok=True); write_json(d/"record.json",item); (d/"content.html").write_text(html,encoding="utf-8"); (d/"content.txt").write_text(body+"\n",encoding="utf-8")
            if link and same(link,host): links.append((endpoint[:-1],iid,link))

    media_fields="id,date,modified,slug,link,source_url,mime_type,media_details,caption,description,alt_text,post,title"
    safe_media=[]; media_jobs=[]
    for item in rest_all(base,"media",media_fields,errors):
        iid=int(item.get("id",0) or 0); parent=int(item.get("post",0) or 0); src=str(item.get("source_url","") or ""); title=plain(item.get("title",{}).get("rendered","")); desc=plain(item.get("description",{}).get("rendered","")); cap=plain(item.get("caption",{}).get("rendered","")); alt=str(item.get("alt_text","") or "")
        if parent in bad_ids or suspicious(title,src,f"{desc} {cap} {alt}"): quarantine.append({"type":"media","id":iid,"url_sha256":sha_bytes(src.encode()),"reason":"compromised media record excluded"}); continue
        safe_media.append(item)
        if src and same(src,host): media_jobs.append((iid,src))
    write_json(root/"wordpress-rest/media-index.json",safe_media)

    pages=[]
    with ThreadPoolExecutor(max_workers=PAGE_WORKERS) as ex:
        fs=[ex.submit(capture_page,root,k,i,u) for k,i,u in links]
        for f in as_completed(fs):
            rec,q,e=f.result();
            if rec: pages.append(rec)
            if q: quarantine.append(q)
            if e: errors.append(e)

    media_root=root/"media"; media=[]; first_fail=[]
    with ThreadPoolExecutor(max_workers=MEDIA_WORKERS) as ex:
        futures={ex.submit(download_media,media_root,i,u,False):(i,u) for i,u in media_jobs}
        for f in as_completed(futures):
            rec,e=f.result();
            if rec: media.append(rec)
            elif e: first_fail.append(futures[f])
    # Slow retry only for originals that failed the fast pass.
    if first_fail:
        with ThreadPoolExecutor(max_workers=8) as ex:
            futures={ex.submit(download_media,media_root,i,u,True):(i,u) for i,u in first_fail}
            for f in as_completed(futures):
                rec,e=f.result();
                if rec: media.append(rec)
                elif e: errors.append(e)

    pages.sort(key=lambda x:x["final_url"]); media.sort(key=lambda x:x["id"])
    write_json(root/"manifests/pages.json",pages); write_json(root/"manifests/media.json",media); write_json(root/"manifests/quarantine.json",quarantine); write_json(root/"manifests/errors.json",errors)
    checksum=root/"manifests/checksums.csv"; rows=[]
    for p in sorted(x for x in root.rglob("*") if x.is_file() and x!=checksum): rows.append((str(p.relative_to(root)),sha_file(p),p.stat().st_size))
    checksum.parent.mkdir(parents=True,exist_ok=True)
    with checksum.open("w",encoding="utf-8",newline="") as f: w=csv.writer(f); w.writerow(["path","sha256","bytes"]); w.writerows(rows)
    counts={"legitimate_wordpress_records":len(links),"legitimate_pages_archived":len(pages),"wp_media_records_retained":len(safe_media),"original_media_candidates":len(media_jobs),"media_files_archived":len(media),"quarantined_records":len(quarantine),"errors":len(errors),"archive_files":len(rows),"archive_bytes_before_packaging":sum(x[2] for x in rows)}
    write_json(root/"inventory.json",{"created_at":datetime.now(timezone.utc).isoformat(),"source":base,"capture_version":4,"policy":{"private_backup":True,"original_uploads":True,"generated_thumbnails":"not copied; reproducible from originals","compromised_records":"diagnostic-only","republication_requires_curation":True},"counts":counts})
    (root/"REPORT.md").write_text("# Fradim.com.br — preservação privada do legado\n\n"+"\n".join(f"- {k}: {v}" for k,v in counts.items())+"\n\nOs arquivos de mídia são os uploads originais do WordPress; miniaturas geradas automaticamente não foram duplicadas.\n",encoding="utf-8")
    print(json.dumps(counts,ensure_ascii=False)); return 0

if __name__=="__main__": sys.exit(main())
