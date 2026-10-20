#!/usr/bin/env python3
"""Compare the requirement wording of a text before and after a restructure.

  compare-wording.py --old FILE [FILE ...] --new FILE [FILE ...]

Prints:
1. How often each requirement word (must, should, never, do not, only, ...) appears in the old and
   the new files, marking each word whose count dropped.
2. Each old sentence that holds a requirement word and no longer appears verbatim in the new files
   (ignoring Markdown formatting), with its closest new sentence and the requirement words that one
   lacks; sentences whose closest match lacks one come first.

The output is a reading list, not a verdict: a dropped count can be two duplicates merged into one, and
a sentence can move into a different sentence. Read each listed sentence beside its new home and decide
whether the requirement, its qualifiers, and its named cases survived.
"""
import argparse
import difflib
import re

WORDS = ["must", "must not", "should", "should not", "never", "always", "do not", "don't", "only",
         "mandatory", "required", "prohibited", "forbidden", "cannot", "justify", "explicitly",
         "at least", "every", "each", "unless", "except"]
PATTERNS = {w: re.compile(r"\b" + re.escape(w) + r"\b", re.I) for w in WORDS}


def sentences(paths):
    found = []
    for path in paths:
        text = re.sub(r"^```.*?^```", "", open(path, encoding="utf-8").read(), flags=re.M | re.S)
        # Join hard-wrapped lines into one paragraph or list item before splitting sentences.
        text = re.sub(r"\n(?![ \t]*(?:[-*>|#]|\d+\.|\n|$))[ \t]*", " ", text)
        for line in text.splitlines():
            line = re.sub(r"\[([^]]*)\]\([^)]*\)", r"\1", line)  # keep link text, drop the target
            line = re.sub(r"[`*_]", "", line)
            line = re.sub(r"^\s*(?:[->|#]+|\d+\.)\s*", "", line).strip()
            found += [s.strip() for s in re.split(r"(?<=[.;:!?])\s+(?=[A-Z`\"*(])", line) if s.strip()]
    return found


def strength(sentence):
    return {w for w, p in PATTERNS.items() if p.search(sentence)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--old", nargs="+", required=True)
    parser.add_argument("--new", nargs="+", required=True)
    args = parser.parse_args()
    old, new = sentences(args.old), sentences(args.new)
    old_text, new_text = "\n".join(old), "\n".join(new)

    print("Requirement words (old -> new):")
    for w, p in PATTERNS.items():
        a, b = len(p.findall(old_text)), len(p.findall(new_text))
        if a or b:
            print(f"  {w:12} {a:4} -> {b:<4}{'  DROPPED' if b < a else ''}")

    new_set = set(new)
    changed = [s for s in old if strength(s) and s not in new_set]
    rows = []
    for s in changed:
        match = difflib.get_close_matches(s, new, n=1, cutoff=0)
        best = match[0] if match else ""
        rows.append((sorted(strength(s) - strength(best)), s, best))
    rows.sort(key=lambda row: not row[0])
    print(f"\nOld sentences with requirement words not found verbatim in the new files: {len(rows)}"
          f" ({sum(1 for row in rows if row[0])} whose closest new sentence lacks one, listed first)")
    for lost, s, best in rows:
        print(f"\n- OLD: {s}\n  NEW: {best}" + (f"\n  LACKS: {', '.join(lost)}" if lost else ""))


if __name__ == "__main__":
    main()
