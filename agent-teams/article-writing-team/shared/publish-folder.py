#!/usr/bin/env python3
"""Build and check an article's publish folder: the article's Markdown plus its images, in the format
the AutoByteus website's article import takes (platform-output-rules.md, "Website Publish Folder").

  publish-folder.py build DRAFT OUT [--slug S] [--cover IMAGE] [--author A] [--date YYYY-MM-DD]
      Writes OUT/article.md (the draft, image links changed to images/..., settings block on top)
      and OUT/images/ (the images the draft shows, and the cover), then checks OUT.
  publish-folder.py check OUT [--draft DRAFT]
      Reports what would block publishing or show wrongly, and the title, address and excerpt
      the website will show. With --draft, also checks that OUT is the current copy of DRAFT.

Exit status: 0 when nothing needs fixing, 1 when something does, 2 on a usage error.
Standard library only.
"""
from __future__ import annotations

import argparse
import datetime as dt
import os
import re
import shutil
import sys
import unicodedata
from pathlib import Path
from urllib.parse import unquote

MAX_IMAGE_BYTES = 10 * 1024 * 1024
MAX_SLUG = 80
EXCERPT_MAX = 240
SETTINGS_KEYS = ("author", "date", "slug", "cover")
SETTINGS_BLOCK = re.compile(r"\A﻿?---[ \t]*\r?\n(.*?)\r?\n---[ \t]*(?:\r?\n|\Z)", re.S)
EXTERNAL = re.compile(r"^(?:[a-z][a-z0-9+.-]*:|//)", re.I)
FENCE = re.compile(r"^\s{0,3}(`{3,}|~{3,})")
DEFINITION = re.compile(r"^\s{0,3}\[((?:[^\]\\]|\\.)+)\]:\s*(<[^>]*>|\S+)")
HTML_TAG = re.compile(r"<!--|</?[A-Za-z][A-Za-z0-9-]*(?:\s[^<>]*)?/?>")


# ---------- Markdown scanning (enough of CommonMark for an article's images and links) ----------

def split_settings(text: str) -> tuple[dict[str, str], list[str], str, int]:
    """(settings, unknown keys, body, lines the block takes)."""
    m = SETTINGS_BLOCK.match(text)
    if not m:
        return {}, [], text, 0
    settings: dict[str, str] = {}
    unknown: list[str] = []
    for line in m.group(1).splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        key, _, value = line.partition(":")
        key, value = key.strip(), value.strip().strip("'\"")
        if key in SETTINGS_KEYS and value:
            settings[key] = value
        elif key:
            unknown.append(key)
    return settings, unknown, text[m.end():], m.group(0).count("\n")


def prose_lines(lines: list[str]):
    """(index, line) for lines outside fenced code; inline code spans blanked out."""
    fence = None
    for i, line in enumerate(lines):
        f = FENCE.match(line)
        if fence:
            if f and f.group(1)[0] == fence[0] and len(f.group(1)) >= len(fence):
                fence = None
            continue
        if f:
            fence = f.group(1)
            continue
        if line.startswith("    ") or line.startswith("\t"):
            continue  # indented code
        yield i, re.sub(r"(`+)(.+?)\1", lambda s: " " * len(s.group(0)), line)


def _bracket_end(s: str, i: int) -> int:
    """Index of the `]` closing the `[` at i, or -1."""
    depth = 0
    while i < len(s):
        c = s[i]
        if c == "\\":
            i += 2
            continue
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return -1


def _destination(s: str, i: int) -> tuple[int, int] | None:
    """Span of the destination starting at or after i (inside `(...)`)."""
    while i < len(s) and s[i] in " \t":
        i += 1
    if i < len(s) and s[i] == "<":
        close = s.find(">", i)
        return (i, close + 1) if close > i else None
    j, parens = i, 0
    while j < len(s):
        c = s[j]
        if c == "\\":
            j += 2
            continue
        if c.isspace():
            break
        if c == "(":
            parens += 1
        if c == ")":
            if parens == 0:
                break
            parens -= 1
        j += 1
    return (i, j) if j > i else None


def norm_label(label: str) -> str:
    return re.sub(r"\s+", " ", label).strip().lower()


def scan(lines: list[str]):
    """Inline images, inline links, image reference labels, and definitions, with line indexes.

    Yields (kind, line_index, start, end, value): kind is `image`, `link`, `image-ref` (value is the
    label) or `definition` (value is the label; start/end span the destination).
    """
    for i, line in prose_lines(lines):
        d = DEFINITION.match(line)
        if d:
            yield "definition", i, d.start(2), d.end(2), norm_label(d.group(1))
            continue
        pos = 0
        while True:
            b = line.find("[", pos)
            if b < 0:
                break
            if b > 0 and line[b - 1] == "\\":
                pos = b + 1
                continue
            e = _bracket_end(line, b)
            if e < 0:
                break
            is_image = b > 0 and line[b - 1] == "!"
            if e + 1 < len(line) and line[e + 1] == "(":
                span = _destination(line, e + 2)
                if span:
                    yield ("image" if is_image else "link"), i, span[0], span[1], None
                    pos = span[1]
                    continue
            if is_image:
                if e + 1 < len(line) and line[e + 1] == "[":
                    e2 = _bracket_end(line, e + 1)
                    label = line[e + 2:e2] if e2 > 0 else ""
                    yield "image-ref", i, b, e2 + 1, norm_label(label or line[b + 1:e])
                    pos = max(e2 + 1, e + 1)
                    continue
                yield "image-ref", i, b, e + 1, norm_label(line[b + 1:e])
            pos = e + 1


def strip_angle(dest: str) -> str:
    return dest[1:-1] if dest.startswith("<") and dest.endswith(">") else dest


def image_destinations(lines: list[str]):
    """(line_index, start, end, destination) for every image destination, inline or by definition."""
    items = list(scan(lines))
    used = {v for k, _, _, _, v in items if k == "image-ref"}
    for kind, i, s, e, value in items:
        if kind == "image" or (kind == "definition" and value in used):
            yield i, s, e, strip_angle(lines[i][s:e])


# ---------- What the website does with names and bytes ----------

def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not 0x300 <= ord(c) <= 0x36F)
    text = unicodedata.normalize("NFC", text).lower()
    out, dash = [], False
    for c in text:
        if unicodedata.category(c)[0] in "LMN":
            out.append(c)
            dash = False
        elif not dash:
            out.append("-")
            dash = True
    return "".join(out).strip("-")


def image_type(path: Path) -> str:
    """`png`, `jpeg`, `gif`, `webp`, or the name of what the file is instead."""
    head = path.read_bytes()[:512]
    if head.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if head.startswith(b"\xff\xd8\xff"):
        return "jpeg"
    if head[:6] in (b"GIF87a", b"GIF89a"):
        return "gif"
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "webp"
    text = head.lstrip(b"\xef\xbb\xbf").lstrip().lower()
    if text.startswith(b"<svg") or (text.startswith(b"<?xml") and b"<svg" in text):
        return "SVG"
    if head[4:8] == b"ftyp":
        return "AVIF/HEIC"
    if head.startswith(b"%PDF"):
        return "PDF"
    if head.startswith(b"BM"):
        return "BMP"
    ext = path.suffix.lstrip(".").upper()
    return ext + " (or not an image)" if ext else "not an image"


def package_path(ref: str) -> str | None:
    """The folder-relative path a reference points to, or None when it leaves the folder."""
    ref = unquote(re.split(r"[?#]", ref)[0]).replace("\\", "/")
    out: list[str] = []
    for seg in ref.split("/"):
        if seg in ("", "."):
            continue
        if seg == "..":
            if not out:
                return None
            out.pop()
        else:
            out.append(seg)
    return "/".join(out)


# ---------- build ----------

def safe_name(name: str) -> str:
    stem, ext = os.path.splitext(name)
    stem = re.sub(r"[^\w.-]+", "-", stem, flags=re.U).strip("-") or "image"
    return stem + ext.lower()


def resolve_local(ref: str, draft_dir: Path) -> Path | None:
    if EXTERNAL.match(ref) or ref.startswith("#"):
        return None
    p = Path(unquote(re.split(r"[?#]", ref)[0]))
    p = p if p.is_absolute() else draft_dir / p
    return p if p.is_file() else None


def transform(draft: Path, cover: str | None):
    """(body with image links rewritten, {source file: images/name}, cover target or None)."""
    text = draft.read_text(encoding="utf-8")
    _, _, body, _ = split_settings(text)
    lines = body.split("\n")
    mapping: dict[Path, str] = {}
    taken: set[str] = set()

    def target(src: Path) -> str:
        key = src.resolve()
        if key not in mapping:
            name = safe_name(src.name)
            stem, ext = os.path.splitext(name)
            n = 2
            while name.lower() in taken:
                name = f"{stem}-{n}{ext}"
                n += 1
            taken.add(name.lower())
            mapping[key] = "images/" + name
        return mapping[key]

    edits: dict[int, list[tuple[int, int, str]]] = {}
    for i, s, e, dest in image_destinations(lines):
        src = resolve_local(dest, draft.parent)
        if src:
            edits.setdefault(i, []).append((s, e, target(src)))
    for i, spans in edits.items():
        for s, e, new in sorted(spans, reverse=True):
            lines[i] = lines[i][:s] + new + lines[i][e:]
    cover_target = None
    if cover:
        src = resolve_local(cover, draft.parent) or (Path(cover) if Path(cover).is_file() else None)
        if not src:
            sys.exit(f"--cover: no such image file: {cover}")
        cover_target = target(src)
    return "\n".join(lines), mapping, cover_target


def settings_block(settings: dict[str, str]) -> str:
    if not settings:
        return ""
    rows = [f"{k}: {settings[k]}" for k in SETTINGS_KEYS if settings.get(k)]
    return "---\n" + "\n".join(rows) + "\n---\n"


def build(args) -> int:
    draft, out = Path(args.draft).resolve(), Path(args.out).resolve()
    if not draft.is_file():
        sys.exit(f"no such draft: {draft}")
    if out == draft.parent or out in draft.parents:
        sys.exit("OUT must be a folder of its own, such as <work folder>/publish/<name>, not the work folder")
    if out.exists():
        extra = [p for p in out.iterdir() if p.name not in ("article.md", "images") and not p.name.startswith(".")]
        if extra:
            sys.exit(f"{out} holds files that are not a publish folder's ({', '.join(p.name for p in extra)}); choose another OUT")
        shutil.rmtree(out)
    stated, _, _, _ = split_settings(draft.read_text(encoding="utf-8"))
    body, mapping, cover_target = transform(draft, args.cover)
    settings = {**stated, **{k: v for k, v in (("author", args.author), ("date", args.date), ("slug", args.slug)) if v}}
    if cover_target:
        settings["cover"] = cover_target
    (out / "images").mkdir(parents=True)
    for src, rel in mapping.items():
        shutil.copyfile(src, out / rel)
    if not mapping:
        (out / "images").rmdir()
    (out / "article.md").write_text(settings_block(settings) + body.lstrip("\n"), encoding="utf-8")
    print(f"Built {out}")
    return check_folder(out, draft)


# ---------- check ----------

def first_paragraph(lines: list[str], start: int) -> str:
    para: list[str] = []
    in_fence = False
    for line in lines[start:]:
        if FENCE.match(line):
            if para:
                break
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        s = line.strip()
        block = (not s or s.startswith(("#", ">", "|", "- ", "* ", "+ ", "---")) or re.match(r"\d+[.)]\s", s)
                 or re.fullmatch(r"!\[.*\]\(.*\)", s))
        if block:
            if para:
                break
            continue
        para.append(s)
    text = " ".join(para)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"[*_`]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text if len(text) <= EXCERPT_MAX else text[:EXCERPT_MAX - 1] + "…"


def check_folder(folder: Path, draft: Path | None = None) -> int:
    problems: list[str] = []
    notes: list[str] = []
    md = folder / "article.md"
    if not md.is_file():
        print(f"BLOCKS: {folder} has no article.md")
        return 1
    files = sorted(p for p in folder.rglob("*") if p.is_file() and not any(part.startswith(".") for part in p.relative_to(folder).parts))
    text = md.read_text(encoding="utf-8")
    settings, unknown, body, offset = split_settings(text)
    lines = body.split("\n")
    where = lambda i: f"article.md:{i + 1 + offset}"

    for key in unknown:
        problems.append(f"IGNORED: settings key `{key}` (the website reads only {', '.join(SETTINGS_KEYS)})")
    if "date" in settings:
        try:
            dt.date.fromisoformat(settings["date"][:10])
            assert re.match(r"\d{4}-\d{2}-\d{2}$", settings["date"])
        except (ValueError, AssertionError):
            problems.append(f"IGNORED: date `{settings['date']}` is not YYYY-MM-DD")

    title, title_line, before = None, None, None
    for i, line in prose_lines(lines):
        m = re.match(r"^\s{0,3}#[ \t]+(.+?)[ \t#]*$", line)
        if m:
            title, title_line = re.sub(r"\s+", " ", m.group(1)).strip(), i
            break
        if line.strip() and before is None:
            before = i
    if title is None:
        problems.append("BLOCKS: no `# ` title line")
    elif before is not None:
        problems.append(f"SHOWS WRONG: {where(before)}: text before the `# ` title line appears above the article: {lines[before].strip()[:60]}")

    slug = settings.get("slug")
    if slug:
        if slugify(slug) != slug or len(slug) > MAX_SLUG:
            problems.append(f"BLOCKS: slug `{slug}` is not a valid address (lowercase letters and digits joined by `-`, at most {MAX_SLUG})")
        address = slug
    else:
        full = slugify(title or "")
        address = full[:MAX_SLUG].rstrip("-")
        if len(full) > MAX_SLUG:
            problems.append(f"SHOWS WRONG: no `slug:`, and the address made from the title is cut mid-word: /blog/{address}/")

    used: set[str] = set()
    for i, s, e, dest in image_destinations(lines):
        ref = dest
        if EXTERNAL.match(ref):
            problems.append(f"BLOCKS: {where(i)}: image from another website: {ref}")
            continue
        if ref.startswith("/") or ref.startswith("#"):
            problems.append(f"BLOCKS: {where(i)}: image path `{ref}` is not inside the folder (use images/...)")
            continue
        rel = package_path(ref)
        if rel is None:
            problems.append(f"BLOCKS: {where(i)}: image path `{ref}` leaves the folder")
            continue
        used.add(rel)
        problems += image_problems(folder / rel, f"{where(i)}: image `{ref}`")
    cover = settings.get("cover")
    if cover:
        rel = None if EXTERNAL.match(cover) or cover.startswith("/") else package_path(cover)
        if rel is None:
            problems.append(f"IGNORED: cover `{cover}` is not an image inside the folder")
        else:
            used.add(rel)
            problems += [p.replace("BLOCKS", "IGNORED") for p in image_problems(folder / rel, f"cover `{cover}`")]

    for p in files:
        rel = p.relative_to(folder).as_posix()
        if rel != "article.md" and rel not in used:
            problems.append(f"NOT CLEAN: {rel} is not used by the article; only article.md and its images belong here")

    for i, line in prose_lines(lines):
        if HTML_TAG.search(line):
            problems.append(f"SHOWS WRONG: {where(i)}: raw HTML is shown as text: {HTML_TAG.search(line).group(0)[:40]}")
        if "$$" in line:
            problems.append(f"SHOWS WRONG: {where(i)}: formulas are not rendered; `$$` is shown as written")
    for kind, i, s, e, _ in scan(lines):
        if kind != "link":
            continue
        dest = strip_angle(lines[i][s:e])
        if not (dest.startswith(("https://", "mailto:", "#")) or re.match(r"^/(?![/\\])", dest)):
            problems.append(f"SHOWS WRONG: {where(i)}: link `{dest}` is shown as plain text (only https:, mailto:, / and # links stay links)")

    if draft is not None:
        expected, _, _ = transform(draft, None)
        if expected.lstrip("\n") != body:
            problems.append(f"STALE: article.md is not the current copy of {draft}; run build again")

    notes.append(f"Title: {title or '(none)'}")
    notes.append(f"Address: /blog/{address}/")
    excerpt = first_paragraph(lines, title_line + 1 if title_line is not None else 0)
    notes.append(f"Excerpt: {excerpt or '(empty: no paragraph after the title)'}")
    notes.append(f"Author: {settings.get('author', '(website default)')}; date: {settings.get('date', '(when published)')}; cover: {cover or '(none)'}")
    notes.append(f"Images: {len(used)}")
    for n in notes:
        print(n)
    if problems:
        print(f"\n{len(problems)} to fix:")
        for p in problems:
            print("- " + p)
        return 1
    print("\nReady: drop this folder on the website's Articles page.")
    return 0


def image_problems(path: Path, label: str) -> list[str]:
    if not path.is_file():
        return [f"BLOCKS: {label}: no such file in the folder"]
    size = path.stat().st_size
    if size > MAX_IMAGE_BYTES:
        return [f"BLOCKS: {label}: {size / 1048576:.1f} MiB, over the 10 MiB limit"]
    kind = image_type(path)
    if kind not in ("png", "jpeg", "gif", "webp"):
        return [f"BLOCKS: {label}: {kind}; the website takes PNG, JPEG, WebP or GIF"]
    return []


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    b = sub.add_parser("build", help="copy a draft and its images into a publish folder, then check it")
    b.add_argument("draft")
    b.add_argument("out")
    b.add_argument("--slug")
    b.add_argument("--cover", help="the image that represents the article, as the draft links it or as a file path")
    b.add_argument("--author")
    b.add_argument("--date", help="YYYY-MM-DD")
    c = sub.add_parser("check", help="check a publish folder")
    c.add_argument("folder")
    c.add_argument("--draft", help="the draft the folder was built from")
    args = ap.parse_args()
    if args.cmd == "build":
        if args.slug and (slugify(args.slug) != args.slug or len(args.slug) > MAX_SLUG):
            print(f"--slug `{args.slug}` is not a valid address; for example: {slugify(args.slug)[:MAX_SLUG]}", file=sys.stderr)
            return 2
        return build(args)
    folder = Path(args.folder).resolve()
    if not folder.is_dir():
        print(f"no such folder: {folder}", file=sys.stderr)
        return 2
    return check_folder(folder, Path(args.draft).resolve() if args.draft else None)


if __name__ == "__main__":
    sys.exit(main())
