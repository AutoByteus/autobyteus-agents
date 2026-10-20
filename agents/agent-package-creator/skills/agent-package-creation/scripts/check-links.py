#!/usr/bin/env python3
"""Check every relative Markdown link under the given folders or files: the target exists, and a #anchor
matches a heading in the target file (GitHub-style anchors). Follows symbolic links.

  check-links.py PATH [PATH ...]

Prints each broken link as FILE: LINK (reason) and exits 1 if any is broken.
"""
import os
import re
import sys

LINK = re.compile(r"\]\(([^)\s]+)\)")
HEADING = re.compile(r"^#{1,6}\s+(.+?)\s*#*$", re.M)
FENCE = re.compile(r"^(```|````).*?^\1", re.M | re.S)


def anchors(path, cache={}):
    if path not in cache:
        text = FENCE.sub("", open(path, encoding="utf-8").read())
        found, seen = set(), {}
        for heading in HEADING.findall(text):
            slug = re.sub(r"[^\w\- ]", "", heading.lower()).strip().replace(" ", "-")
            n = seen.get(slug, 0)
            seen[slug] = n + 1
            found.add(slug if n == 0 else f"{slug}-{n}")
        cache[path] = found
    return cache[path]


def markdown_files(paths):
    for path in paths:
        if os.path.isfile(path):
            yield path
        for root, _, files in os.walk(path, followlinks=True):
            yield from (os.path.join(root, f) for f in files if f.endswith(".md"))


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    broken = 0
    for md in markdown_files(sys.argv[1:]):
        text = FENCE.sub("", open(md, encoding="utf-8").read())
        for link in LINK.findall(text):
            if re.match(r"[a-z]+:", link) or link.startswith("<"):
                continue
            target, _, anchor = link.partition("#")
            path = os.path.normpath(os.path.join(os.path.dirname(md), target)) if target else md
            if not os.path.exists(path):
                print(f"{md}: {link} (missing target)")
                broken += 1
            elif anchor and path.endswith(".md") and anchor.lower() not in anchors(path):
                print(f"{md}: {link} (no heading for #{anchor})")
                broken += 1
    print(f"{broken} broken link(s)")
    sys.exit(1 if broken else 0)


if __name__ == "__main__":
    main()
