#!/usr/bin/env python3
"""Check, read and pack an article's web project: a site/ folder in the format the AutoByteus website's
HTML article import takes (formats.md, "Web Project").

  html-article.py check SITE        Reports what the website would refuse or show wrongly, and the title,
                                    excerpt, address and cover it will show.
  html-article.py text SITE         Prints the page's visible text (headings marked with #, figure captions
                                    included) and its word count, for reading the draft as text.
  html-article.py zip SITE OUT.zip  Checks SITE, then writes the .zip to upload (only when nothing needs fixing).

What it cannot see (empty space above the first line, legibility, how figures and motion look) is checked
by looking at the page in a browser.

Exit status: 0 when nothing needs fixing, 1 when something does, 2 on a usage error.
Standard library only.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
import zipfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ALLOWED = {".html", ".htm", ".css", ".js", ".mjs", ".json", ".txt", ".svg", ".png", ".jpg", ".jpeg",
           ".gif", ".webp", ".avif", ".ico", ".woff", ".woff2", ".ttf", ".otf"}
FIELDS = {"title", "excerpt", "slug", "author", "date", "cover"}
MAX_ZIP = 10 * 1024 * 1024
MAX_FILE = 10 * 1024 * 1024
MAX_TOTAL = 50 * 1024 * 1024
MAX_FILES = 500
SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
OUTSIDE = re.compile(r"^(?:[a-z][a-z0-9+.-]*:|//)", re.I)
CSS_URL = re.compile(r"""url\(\s*['"]?([^'")]+)['"]?\s*\)|@import\s+['"]([^'"]+)['"]""", re.I)
JS_OUTSIDE = re.compile(r"""(?:\bimport\b[^;'"]*|\bfetch\s*\(\s*|\bimport\s*\(\s*)['"`](?:https?:)?//""")
WORD = re.compile(r"[A-Za-z0-9'’-]+|[^\x00-\x7f\s]")
VH = re.compile(r"(?<![\w-])\d*\.?\d+(?:d|s|l)?vh\b")
IMAGE_MAGIC = ((b"\x89PNG\r\n\x1a\n", "PNG"), (b"\xff\xd8\xff", "JPEG"), (b"GIF87a", "GIF"), (b"GIF89a", "GIF"))


def is_hidden(rel: Path) -> bool:
    return any(part.startswith(".") or part == "__MACOSX" for part in rel.parts)


def image_kind(path: Path) -> str | None:
    head = path.read_bytes()[:16]
    for magic, kind in IMAGE_MAGIC:
        if head.startswith(magic):
            return kind
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "WebP"
    return None


class Page(HTMLParser):
    """Collects what the checks and the text view need from one HTML file."""

    SKIP = {"head", "script", "style", "noscript", "template", "svg"}
    BLOCK = {"p", "div", "section", "article", "li", "figcaption", "blockquote", "tr", "br", "aside",
             "header", "footer", "dd", "dt", "pre", "table", "ul", "ol", "figure", "main"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.refs: list[tuple[str, str]] = []   # (tag.attr, url) for resources the page loads
        self.links: list[tuple[str, dict]] = []  # (href, attrs) of <a>
        self.h1 = 0
        self.inline_styles: list[str] = []
        self.inline_scripts: list[str] = []
        self.text: list[str] = []
        self._skip = 0
        self._tag_stack: list[str] = []

    def handle_starttag(self, tag, attrs):
        a = {k: (v or "") for k, v in attrs}
        if tag == "h1":
            self.h1 += 1
        for attr in ("src", "poster", "data"):
            if a.get(attr):
                self.refs.append((f"{tag}.{attr}", a[attr]))
        if tag in ("link",) and a.get("href"):
            self.refs.append(("link.href", a["href"]))
        if a.get("srcset"):
            for part in a["srcset"].split(","):
                if part.strip():
                    self.refs.append((f"{tag}.srcset", part.strip().split()[0]))
        if tag == "a" and a.get("href"):
            self.links.append((a["href"], a))
        if a.get("style"):
            self.inline_styles.append(a["style"])
        if tag in self.SKIP:
            self._skip += 1
        self._tag_stack.append(tag)
        if not self._skip:
            if re.fullmatch(r"h[1-6]", tag):
                self.text.append("\n" + "#" * int(tag[1]) + " ")
            elif tag in self.BLOCK:
                self.text.append("\n")

    def handle_endtag(self, tag):
        if tag in self.SKIP and self._skip:
            self._skip -= 1
        if self._tag_stack and self._tag_stack[-1] == tag:
            self._tag_stack.pop()
        if not self._skip and (tag in self.BLOCK or re.fullmatch(r"h[1-6]", tag)):
            self.text.append("\n")

    def handle_data(self, data):
        current = self._tag_stack[-1] if self._tag_stack else ""
        if current == "style":
            self.inline_styles.append(data)
        elif current == "script":
            self.inline_scripts.append(data)
        if not self._skip:
            self.text.append(data)

    def visible_text(self) -> str:
        raw = "".join(self.text)
        lines = [re.sub(r"\s+", " ", line).strip() for line in raw.split("\n")]
        out: list[str] = []
        for line in lines:
            if line and line not in ("#", "##", "###", "####", "#####", "######"):
                out.append(line)
        return "\n\n".join(out)


def parse(path: Path) -> Page:
    page = Page()
    page.feed(path.read_text(encoding="utf-8", errors="replace"))
    page.close()
    return page


def local_target(site: Path, base: Path, url: str) -> Path | None:
    """The file a relative URL points to, or None when it leaves the folder."""
    path = unquote(urlsplit(url).path)
    if not path:
        return base
    target = (site / path.lstrip("/")) if path.startswith("/") else (base.parent / path)
    try:
        target.resolve().relative_to(site.resolve())
    except ValueError:
        return None
    return target


def check(site: Path) -> tuple[list[str], list[str], dict]:
    problems: list[str] = []
    notes: list[str] = []
    meta: dict = {}
    if not site.is_dir():
        return [f"{site} is not a folder"], notes, meta

    files: list[Path] = []
    total = 0
    seen_lower: dict[str, str] = {}
    for path in sorted(site.rglob("*")):
        rel = path.relative_to(site)
        if is_hidden(rel):
            continue
        if path.is_symlink():
            problems.append(f"{rel}: a symbolic link; the website refuses it")
            continue
        if path.is_dir():
            continue
        lower = str(rel).lower()
        if lower in seen_lower:
            problems.append(f"{rel} and {seen_lower[lower]} differ only in letter case")
        seen_lower[lower] = str(rel)
        if path.suffix.lower() not in ALLOWED:
            problems.append(f"{rel}: the website does not keep this kind of file; move it out of the site folder")
            continue
        size = path.stat().st_size
        total += size
        if size > MAX_FILE:
            problems.append(f"{rel}: {size / 1048576:.1f} MiB, more than 10 MiB")
        files.append(path)
    if len(files) > MAX_FILES:
        problems.append(f"{len(files)} files, more than {MAX_FILES}")
    if total > MAX_TOTAL:
        problems.append(f"{total / 1048576:.1f} MiB in all, more than 50 MiB")

    index = site / "index.html"
    if not index.is_file():
        problems.append("no index.html at the top of the folder")

    # article.json
    info = site / "article.json"
    if not info.is_file():
        problems.append("no article.json at the top of the folder (title, excerpt, slug, cover; the website "
                        "imports a .zip without it as a Markdown article)")
    else:
        try:
            meta = json.loads(info.read_text(encoding="utf-8"))
        except (ValueError, UnicodeDecodeError) as err:
            problems.append(f"article.json is not valid JSON: {err}")
            meta = {}
        if not isinstance(meta, dict):
            problems.append("article.json is not a JSON object")
            meta = {}
        for key in sorted(set(meta) - FIELDS):
            problems.append(f"article.json: unknown field '{key}' (the website refuses it)")
        for key, limit in (("title", 300), ("excerpt", 240)):
            value = meta.get(key)
            if not isinstance(value, str) or not value.strip():
                problems.append(f"article.json: '{key}' is missing")
            elif len(value) > limit:
                problems.append(f"article.json: '{key}' has {len(value)} characters, more than {limit}")
        for key in ("slug", "author", "date", "cover"):
            if key in meta and not (isinstance(meta[key], str) and meta[key].strip()):
                problems.append(f"article.json: '{key}' is empty; leave it out instead")
        slug = meta.get("slug")
        if isinstance(slug, str) and slug and (not SLUG.match(slug) or len(slug) > 80):
            problems.append("article.json: 'slug' must be lowercase letters or digits joined by '-', at most 80")
        if not slug:
            notes.append("no slug: the website makes the address from the title")
        date = meta.get("date")
        if isinstance(date, str) and date:
            try:
                dt.date.fromisoformat(date)
            except ValueError:
                problems.append("article.json: 'date' is not a YYYY-MM-DD date")
        cover = meta.get("cover")
        if isinstance(cover, str) and cover:
            target = local_target(site, info, cover)
            if OUTSIDE.match(cover) or target is None or not target.is_file():
                problems.append(f"article.json: cover '{cover}' is not a file inside the folder")
            elif image_kind(target) is None:
                problems.append(f"article.json: cover '{cover}' is not a PNG, JPEG, WebP or GIF image")
            elif target.stat().st_size > MAX_FILE:
                problems.append(f"article.json: cover '{cover}' is larger than 10 MiB")
        elif not cover:
            notes.append("no cover: link previews show no image")

    # pages, styles and scripts
    height_message = False
    for path in files:
        rel = path.relative_to(site)
        suffix = path.suffix.lower()
        if suffix in (".html", ".htm"):
            page = parse(path)
            if path == index and page.h1:
                problems.append("index.html has an <h1>: the website shows the title above the page; "
                                "leave out the page's own title, byline and date")
            for where, url in page.refs:
                if url.startswith(("data:", "blob:", "#")):
                    continue
                if OUTSIDE.match(url):
                    problems.append(f"{rel}: {where} loads {url} from another website; put the file in the folder")
                elif (target := local_target(site, path, url)) is None or not target.exists():
                    problems.append(f"{rel}: {where} '{url}' is not a file inside the folder")
            for href, attrs in page.links:
                if href.startswith(("http://", "https://", "//")):
                    if attrs.get("target") != "_blank" or "noopener" not in attrs.get("rel", ""):
                        problems.append(f"{rel}: link to {href} needs target=\"_blank\" rel=\"noopener\"")
                elif not OUTSIDE.match(href) and not href.startswith("#"):
                    target = local_target(site, path, href)
                    if target is None or not target.exists():
                        problems.append(f"{rel}: link '{href}' is not a file inside the folder")
            styles = "\n".join(page.inline_styles)
            scripts = "\n".join(page.inline_scripts)
        elif suffix == ".css":
            styles, scripts = path.read_text(encoding="utf-8", errors="replace"), ""
        elif suffix in (".js", ".mjs"):
            styles, scripts = "", path.read_text(encoding="utf-8", errors="replace")
        else:
            continue
        for m in CSS_URL.finditer(styles):
            url = (m.group(1) or m.group(2) or "").strip()
            if not url or url.startswith(("data:", "#")):
                continue
            if OUTSIDE.match(url):
                problems.append(f"{rel}: the style loads {url} from another website; put the file in the folder")
            elif (target := local_target(site, path, url)) is None or not target.exists():
                problems.append(f"{rel}: the style's '{url}' is not a file inside the folder")
        if VH.search(styles) or VH.search(scripts):
            problems.append(f"{rel}: sizes with vh; in the website's frame the height then grows every time "
                            "it is reported")
        if JS_OUTSIDE.search(scripts):
            problems.append(f"{rel}: a script loads from another website; nothing outside the folder loads")
        if "article-height" in scripts:
            height_message = True
    if index.is_file() and not height_message:
        problems.append("no script posts the page's height ('article-height'); the frame would be one screen "
                        "high and scroll")
    return problems, notes, meta


def show(meta: dict, problems: list[str], notes: list[str]) -> None:
    print(f"Title:   {meta.get('title', '(none)')}")
    print(f"Excerpt: {meta.get('excerpt', '(none)')}")
    slug = meta.get("slug")
    print(f"Address: /blog/{slug}/" if slug else "Address: made from the title")
    print(f"Cover:   {meta.get('cover', '(none)')}")
    for note in notes:
        print(f"Note:    {note}")
    if problems:
        print(f"\n{len(problems)} problem(s) to fix in the site folder:")
        for p in problems:
            print(f"  - {p}")
    else:
        print("\nReady: nothing to fix.")


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("check").add_argument("site", type=Path)
    sub.add_parser("text").add_argument("site", type=Path)
    z = sub.add_parser("zip")
    z.add_argument("site", type=Path)
    z.add_argument("out", type=Path)
    args = ap.parse_args(argv)

    if args.cmd == "text":
        index = args.site / "index.html"
        if not index.is_file():
            print(f"no index.html in {args.site}", file=sys.stderr)
            return 1
        text = parse(index).visible_text()
        words = len(WORD.findall(text))
        print(text)
        print(f"\n({words} words)")
        return 0

    problems, notes, meta = check(args.site)
    show(meta, problems, notes)
    if args.cmd == "check":
        return 1 if problems else 0
    if problems:
        print("\nNo .zip written: fix the problems first.")
        return 1
    with zipfile.ZipFile(args.out, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(args.site.rglob("*")):
            rel = path.relative_to(args.site)
            if path.is_file() and not path.is_symlink() and not is_hidden(rel):
                zf.write(path, rel.as_posix())
    size = args.out.stat().st_size
    if size > MAX_ZIP:
        print(f"\n{args.out}: {size / 1048576:.1f} MiB, more than 10 MiB: the website refuses it")
        return 1
    print(f"\nWrote {args.out} ({size / 1048576:.2f} MiB)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
