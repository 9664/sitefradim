#!/usr/bin/env python3
"""Audit and sanitize a WordPress WXR export without importing WordPress code.

Usage:
    python scripts/sanitize-wordpress-wxr.py export.xml --output recovery/wxr-clean

The command:
- never executes PHP or JavaScript;
- rejects trash and non-editorial WordPress objects;
- strips executable/embedded HTML from published posts;
- restores original dates from the `_wp_old_date` metadata when available;
- emits JSON for human review, never content ready for automatic publication.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter
from dataclasses import dataclass, field
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.parse import urlparse
from xml.etree import ElementTree as ET

WP = "http://wordpress.org/export/1.2/"
CONTENT = "http://purl.org/rss/1.0/modules/content/"
EXCERPT = "http://wordpress.org/export/1.2/excerpt/"

BLOCKED_TAGS = {
    "script", "style", "iframe", "object", "embed", "form", "input", "button",
    "textarea", "select", "option", "noscript",
}
ALLOWED_TAGS = {
    "p", "br", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li",
    "strong", "b", "em", "i", "blockquote", "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "hr", "span", "div",
    "pre", "code", "sup", "sub",
}
VOID_TAGS = {"br", "img", "hr"}
SAFE_SCHEMES = {"", "http", "https", "mailto", "tel"}

SPAM_TERMS = re.compile(
    r"\b(casino|cassino|slot|slots|bet|betano|novibet|parimatch|brazino|plinko|"
    r"jackpot|poker|gambling|powbet|wintopia|spindragons|loto\s*club)\b",
    re.IGNORECASE,
)
OFFSCREEN = re.compile(r"left\s*:\s*-\d{3,}px", re.IGNORECASE)
DANGEROUS_MARKERS = ("<script", "atob(", "javascript:", "<iframe", "<object", "<embed")


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def sha256_text(value: str) -> str:
    return sha256_bytes(value.encode("utf-8"))


class SafeHTML(HTMLParser):
    """Allow-list sanitizer for recovery output, never automatic publication."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.output: list[str] = []
        self.block_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        if tag in BLOCKED_TAGS:
            self.block_depth += 1
            return
        if self.block_depth or tag not in ALLOWED_TAGS:
            return

        safe_attrs: list[tuple[str, str]] = []
        for raw_name, raw_value in attrs:
            name = raw_name.lower()
            value = raw_value or ""
            if name.startswith("on") or name in {"style", "srcdoc", "formaction"}:
                continue

            if tag == "a" and name == "href":
                candidate = value.strip()
                if re.match(r"(?i)javascript:|data:", candidate):
                    continue
                if urlparse(candidate).scheme.lower() not in SAFE_SCHEMES:
                    continue
                safe_attrs.append(("href", candidate))
            elif tag == "a" and name == "title":
                safe_attrs.append((name, value))
            elif tag == "img" and name == "src":
                candidate = value.strip()
                if re.match(r"(?i)javascript:", candidate):
                    continue
                if urlparse(candidate).scheme.lower() not in {"", "http", "https"}:
                    continue
                safe_attrs.append(("src", candidate))
            elif tag == "img" and name in {"alt", "title", "width", "height"}:
                safe_attrs.append((name, value))
            elif tag in {"td", "th"} and name in {"colspan", "rowspan"}:
                safe_attrs.append((name, value))

        rendered = "".join(f' {name}="{escape(value, quote=True)}"' for name, value in safe_attrs)
        self.output.append(f"<{tag}{rendered}>")

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        tag = tag.lower()
        if not self.block_depth and tag in ALLOWED_TAGS and tag not in VOID_TAGS:
            self.output.append(f"</{tag}>")

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag in BLOCKED_TAGS:
            if self.block_depth:
                self.block_depth -= 1
            return
        if not self.block_depth and tag in ALLOWED_TAGS and tag not in VOID_TAGS:
            self.output.append(f"</{tag}>")

    def handle_data(self, data: str) -> None:
        if not self.block_depth:
            self.output.append(data)

    def handle_entityref(self, name: str) -> None:
        if not self.block_depth:
            self.output.append(f"&{name};")

    def handle_charref(self, name: str) -> None:
        if not self.block_depth:
            self.output.append(f"&#{name};")

    def handle_comment(self, data: str) -> None:
        return


def sanitize_html(value: str) -> str:
    parser = SafeHTML()
    parser.feed(value or "")
    parser.close()
    cleaned = "".join(parser.output)
    cleaned = re.sub(r"<(div|span)>\s*</\1>", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    return cleaned.strip()


@dataclass
class Item:
    post_id: str = ""
    post_type: str = ""
    status: str = ""
    title: str = ""
    slug: str = ""
    post_date: str = ""
    content: str = ""
    excerpt: str = ""
    parent: str = ""
    attachment_url: str = ""
    meta: dict[str, list[str]] = field(default_factory=dict)


def child_text(element: ET.Element, tag: str) -> str:
    child = element.find(tag)
    return child.text if child is not None and child.text else ""


def parse_item(element: ET.Element) -> Item:
    meta: dict[str, list[str]] = {}
    for postmeta in element.findall(f"{{{WP}}}postmeta"):
        key = child_text(postmeta, f"{{{WP}}}meta_key")
        value = child_text(postmeta, f"{{{WP}}}meta_value")
        if key:
            meta.setdefault(key, []).append(value)

    return Item(
        post_id=child_text(element, f"{{{WP}}}post_id"),
        post_type=child_text(element, f"{{{WP}}}post_type"),
        status=child_text(element, f"{{{WP}}}status"),
        title=child_text(element, "title"),
        slug=child_text(element, f"{{{WP}}}post_name"),
        post_date=child_text(element, f"{{{WP}}}post_date"),
        content=child_text(element, f"{{{CONTENT}}}encoded"),
        excerpt=child_text(element, f"{{{EXCERPT}}}encoded"),
        parent=child_text(element, f"{{{WP}}}post_parent"),
        attachment_url=child_text(element, f"{{{WP}}}attachment_url"),
        meta=meta,
    )


def iter_items(path: Path) -> Iterable[Item]:
    for _, element in ET.iterparse(path, events=("end",)):
        if element.tag == "item":
            yield parse_item(element)
            element.clear()


def original_date(item: Item) -> str:
    old = item.meta.get("_wp_old_date", [])
    return old[0] if old and old[0] else item.post_date[:10]


def external_domains(html: str) -> list[str]:
    domains = {
        match.group(1).lower()
        for match in re.finditer(r'''href\s*=\s*["']https?://([^/"']+)''', html, flags=re.IGNORECASE)
    }
    return sorted(domains)


def reject_reason(item: Item) -> str | None:
    combined = f"{item.title}\n{item.slug}\n{item.content}"
    if item.status == "trash":
        return "trash"
    if OFFSCREEN.search(item.content) and SPAM_TERMS.search(combined):
        return "offscreen-spam"
    if SPAM_TERMS.search(f"{item.title}\n{item.slug}") and item.post_type != "attachment":
        return "spam-title-or-slug"
    return None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("wxr", type=Path)
    parser.add_argument("--output", type=Path, default=Path("recovery/wxr-clean"))
    args = parser.parse_args()

    if not args.wxr.is_file():
        raise SystemExit(f"WXR file not found: {args.wxr}")

    source_bytes = args.wxr.read_bytes()
    lowered_prefix = source_bytes[:65536].lower()
    if b"<!doctype" in lowered_prefix or b"<!entity" in lowered_prefix:
        raise SystemExit("WXR rejected: DTD/entity declarations are not accepted")

    output = args.output
    posts_dir = output / "posts"
    posts_dir.mkdir(parents=True, exist_ok=True)

    type_counts: Counter[str] = Counter()
    status_counts: Counter[str] = Counter()
    rejects: Counter[str] = Counter()
    accepted: list[dict[str, object]] = []
    attachments: list[dict[str, object]] = []
    script_count = 0

    for item in iter_items(args.wxr):
        type_counts[item.post_type] += 1
        status_counts[item.status] += 1

        reason = reject_reason(item)
        if reason:
            rejects[reason] += 1
            continue

        if item.post_type == "attachment":
            attachments.append({
                "id": int(item.post_id) if item.post_id.isdigit() else item.post_id,
                "parent": int(item.parent) if item.parent.isdigit() else item.parent,
                "url": item.attachment_url,
                "date": item.post_date[:10],
            })
            continue

        if item.post_type != "post" or item.status != "publish":
            continue

        scripts = len(re.findall(r"<script\b", item.content, flags=re.IGNORECASE))
        script_count += scripts
        cleaned = sanitize_html(item.content)
        residue = [marker for marker in DANGEROUS_MARKERS if marker in cleaned.lower()]
        if residue:
            raise SystemExit(f"Sanitizer residue in post {item.post_id}/{item.slug}: {residue}")

        record = {
            "id": int(item.post_id) if item.post_id.isdigit() else item.post_id,
            "slug": item.slug,
            "title": item.title,
            "originalDate": original_date(item),
            "exportDate": item.post_date[:10],
            "scriptTagsRemoved": scripts,
            "rawContentSha256": sha256_text(item.content),
            "sanitizedContentSha256": sha256_text(cleaned),
            "externalLinkDomains": external_domains(cleaned),
            "publicationState": "review-required",
            "content": cleaned,
        }
        (posts_dir / f"{item.slug}.json").write_text(
            json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        accepted.append({key: value for key, value in record.items() if key != "content"})

    report = {
        "source": {"file": args.wxr.name, "sizeBytes": len(source_bytes), "sha256": sha256_bytes(source_bytes)},
        "items": {
            "postTypes": dict(sorted(type_counts.items())),
            "statuses": dict(sorted(status_counts.items())),
            "acceptedPublishedPosts": len(accepted),
            "attachmentsIndexed": len(attachments),
            "scriptTagsRemoved": script_count,
            "rejects": dict(sorted(rejects.items())),
        },
        "policy": {
            "autoPublish": False,
            "mediaEmbeddedInWxr": False,
            "nextStep": "human editorial and media provenance review",
        },
        "acceptedPosts": accepted,
    }

    (output / "audit.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (output / "attachments.json").write_text(json.dumps(attachments, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(
        f"Recovered {len(accepted)} published posts for review; "
        f"removed {script_count} script tags; indexed {len(attachments)} attachments."
    )
    print(f"Output: {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
