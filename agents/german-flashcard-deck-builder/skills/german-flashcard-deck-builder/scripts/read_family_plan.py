#!/usr/bin/env python3
"""Read one word family's rows and the shared character-style text out of a
project's own image-planning Markdown document.

This script does not know any project's specific character, word list, or
focus rules. It only parses a generic shape that image-planning Markdown
docs in this family of projects use:

- a Markdown heading (default "Einheitlicher Bildstil") whose bullet list is
  the shared, project-specific image style text (character appearance,
  format, forbidden text, etc.) to prepend to every per-word prompt;
- a Markdown pipe table whose header row contains a column that names the
  word family ("Mutterverb" by default) and a column with the per-word image
  concept text ("Bildkonzept" by default), plus whatever other columns the
  project put there (word, sentence, level, meaning, ...). Every column is
  returned by its own header text, so callers do not need to guess positions.

Run read-only; it never modifies the document.

Usage:
  read_family_plan.py --doc PATH --family NAME
      [--style-heading "Einheitlicher Bildstil"]
      [--family-column "Mutterverb"]

Prints one JSON object: {"style_bullets": [...], "rows": [ {header: value, ...}, ... ]}
`rows` is empty (not an error) when the family is not in the document yet;
the caller should then fall back to the project's raw word-list spreadsheet.
"""
import argparse
import json
import re
import sys


def unescape_cell(text):
    return text.strip().replace("\\|", "|")


def split_row(line):
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]
    # Split on unescaped pipes only.
    parts = re.split(r"(?<!\\)\|", line)
    return [unescape_cell(p) for p in parts]


def extract_style_bullets(lines, heading):
    bullets = []
    in_section = False
    heading_pat = re.compile(r"^#{1,6}\s+" + re.escape(heading) + r"\s*$")
    for line in lines:
        if heading_pat.match(line):
            in_section = True
            continue
        if in_section:
            if re.match(r"^#{1,6}\s+", line):
                break
            m = re.match(r"^\s*-\s+(.*)$", line)
            if m:
                bullets.append(m.group(1).strip())
    return bullets


def find_pipe_tables(lines):
    """Return list of (header_cells, [row_cells, ...]) for every pipe table
    whose header is followed by a separator row of dashes."""
    tables = []
    i = 0
    n = len(lines)
    while i < n - 1:
        line = lines[i]
        nxt = lines[i + 1]
        if line.strip().startswith("|") and re.match(r"^\s*\|[\s:|-]+\|\s*$", nxt):
            header = split_row(line)
            rows = []
            j = i + 2
            while j < n and lines[j].strip().startswith("|"):
                rows.append(split_row(lines[j]))
                j += 1
            tables.append((header, rows))
            i = j
        else:
            i += 1
    return tables


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--doc", required=True)
    ap.add_argument("--family", required=True)
    ap.add_argument("--style-heading", default="Einheitlicher Bildstil")
    ap.add_argument("--family-column", default="Mutterverb")
    args = ap.parse_args()

    with open(args.doc, "r", encoding="utf-8") as f:
        text = f.read()
    lines = text.splitlines()

    style_bullets = extract_style_bullets(lines, args.style_heading)

    rows = []
    for header, table_rows in find_pipe_tables(lines):
        if args.family_column not in header:
            continue
        family_idx = header.index(args.family_column)
        for cells in table_rows:
            if len(cells) != len(header):
                continue
            if cells[family_idx].strip() == args.family:
                rows.append(dict(zip(header, cells)))

    print(json.dumps({"style_bullets": style_bullets, "rows": rows}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
