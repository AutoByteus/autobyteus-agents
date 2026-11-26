#!/usr/bin/env python3
"""Check the people a file links against what the user said about them and what earlier events record.

usage: check_people.py FILE [--people-dir DIR]

FILE is any file that links people: a guest-list capture, a profile-read result, an event's people.md, a send
request. People are matched by their LinkedIn (/in/), Luma (/user/) and X profile URLs, and by any other profile
link listed in known-people.md; a known-people.md row without a link is matched by full name and only shown. DIR is <workspace>/events/people; it is found from FILE's path when FILE lies under it.

Exit status 1 when FILE names, on a line not marked `skipped` or `ruled out`, someone known-people.md rules out, or
someone marked `1st` (connected to the user) who has no row there; 0 otherwise; 2 on a usage error.
"""
import argparse, os, re, sys, unicodedata
from collections import defaultdict
from urllib.parse import unquote

PROFILE = re.compile(r"(?<![\w.@/-])(?:https?://)?(?:[a-z]{2,3}\.|www\.|m\.)?"
                     r"(linkedin\.com/in|luma\.com/user|lu\.ma/user|x\.com|twitter\.com)/([^\s/|)<>\]\"'`,?#]+)", re.I)
URL = re.compile(r"https?://[^\s|)<>\]\"'`]+", re.I)
X_NOT_PEOPLE = {"i", "home", "search", "explore", "intent", "share", "hashtag", "settings", "messages",
                "notifications", "login", "signup", "compose", "tos", "privacy"}
FIRST = re.compile(r"(?<![\w])1st(?![\w])", re.I)
CLOSED = re.compile(r"\b(skipped|ruled out)\b", re.I)


def other_key(url):
    url = re.sub(r"^https?://(www\.)?", "", url.lower()).split("?")[0].split("#")[0]
    return "url:" + unquote(url).rstrip("/.")


def keys(line, extra=frozenset()):
    """The person keys a line names: ('linkedin:slug', ...), plus any other URL known-people.md lists."""
    found = []
    for m in PROFILE.finditer(line):
        site, slug = m.group(1).lower(), unquote(m.group(2)).strip().lower().rstrip(".")
        if site in ("x.com", "twitter.com"):
            if slug in X_NOT_PEOPLE or not re.fullmatch(r"[a-z0-9_]{1,15}", slug):
                continue
            found.append("x:" + slug)
        else:
            found.append(("linkedin:" if site.startswith("linkedin") else "luma:") + slug)
    found += [k for k in map(other_key, URL.findall(line)) if k in extra]
    return list(dict.fromkeys(found))


def cells(line):
    return [c.strip() for c in re.split(r"(?<!\\)\|", line.strip().strip("|"))]


def plain(text):
    return re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text).replace("**", "").replace("`", "").strip()


def read_known(path):
    """Rows of known-people.md: one dict per table row under a header that has a Status column."""
    rows, header, problems = [], None, []
    if not os.path.isfile(path):
        return rows, problems
    for n, line in enumerate(open(path, encoding="utf-8"), 1):
        if not line.lstrip().startswith("|"):
            header = None
            continue
        c = cells(line)
        if header is None:
            if any(x.lower() == "status" for x in c):
                header = [x.lower() for x in c]
            continue
        if all(re.fullmatch(r":?-{2,}:?", x) for x in c if x):
            continue
        get = lambda word: next((c[i] for i, h in enumerate(header) if word in h and i < len(c)), "")
        status = plain(get("status")).lower()
        status = ("ruled out" if "ruled out" in status else "not known" if status.startswith("not known")
                  else "known" if status.startswith("known") else "unrecognized: " + status)
        links = {other_key(u) for u in URL.findall(line)}
        row = {"line": n, "name": plain(c[0]), "status": status, "words": plain(get("word")).strip('"“”'),
               "date": plain(get("date")), "keys": keys(line), "links": links}
        if not row["keys"] and not links:
            problems.append(f"known-people.md line {n}: no profile link, so only its full name is matched; add the link")
        rows.append(row)
    return rows, problems


def fold(text):
    return "".join(c for c in unicodedata.normalize("NFKD", text) if not unicodedata.combining(c)).casefold()


def find_people_dir(path):
    d = os.path.dirname(os.path.abspath(path))
    while d != os.path.dirname(d):
        if os.path.basename(d) == "people" and os.path.basename(os.path.dirname(d)) == "events":
            return d
        d = os.path.dirname(d)
    return None


def name_of(text):
    if text.lstrip().startswith("|"):
        for c in cells(text):
            c = plain(c)
            if re.search(r"[^\W\d_]", c) and not URL.search(c) and not PROFILE.search(c):
                return c[:40]
    return plain(re.split(r"https?://", text)[0]).strip(" -*:(")[:40]


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("file")
    ap.add_argument("--people-dir")
    a = ap.parse_args()
    people_dir = a.people_dir or find_people_dir(a.file)
    if not os.path.isfile(a.file):
        print(f"no such file: {a.file}", file=sys.stderr)
        return 2
    if not people_dir:
        print("FILE is not under <workspace>/events/people/: pass --people-dir <workspace>/events/people", file=sys.stderr)
        return 2
    rel = os.path.relpath(os.path.abspath(a.file), os.path.abspath(people_dir)).split(os.sep)
    own_event = rel[0] if len(rel) > 1 and rel[0] != ".." else None

    known_path = os.path.join(people_dir, "known-people.md")
    known, problems = read_known(known_path)
    by_key, other_links = {}, set()
    for row in known:
        other_links |= row["links"]
        for k in row["keys"] + sorted(row["links"]):
            if k in by_key and by_key[k] is not row:
                problems.append(f"known-people.md lines {by_key[k]['line']} and {row['line']}: the same link {k}")
            by_key[k] = row

    earlier = defaultdict(list)
    for event in sorted(os.listdir(people_dir)):
        p = os.path.join(people_dir, event, "people.md")
        if event == own_event or not os.path.isfile(p):
            continue
        text, names = open(p, encoding="utf-8").read().splitlines(), {}
        for line in text:
            for k in keys(line, other_links):
                earlier[k].append(f"{event}: {line.strip()[:220]}")
                names.setdefault(k, name_of(line).lower())
        # A person's own section (its heading starts with their name) holds the debrief and the user's words.
        heads = [(i, plain(re.sub(r"^#+\s*", "", t)).lower()) for i, t in enumerate(text) if re.match(r"#{2,4}\s", t)]
        for k, name in names.items():
            for j, (i, head) in enumerate(heads):
                if name and head.startswith(name):
                    end = heads[j + 1][0] if j + 1 < len(heads) else len(text)
                    body = [t.strip() for t in text[i + 1:end] if t.strip()][:6]
                    earlier[k] += [f"{event}, section {head}: {t[:220]}" for t in body]

    # One person per group of keys: keys on the same line join when the line names at most one link per site.
    parent = {}
    def root(k):
        while parent.setdefault(k, k) != k:
            k = parent[k]
        return k
    lines = []
    for n, line in enumerate(open(a.file, encoding="utf-8"), 1):
        ks = keys(line, other_links)
        if not ks:
            continue
        lines.append((n, line.rstrip("\n"), ks))
        sites = [k.split(":")[0] for k in ks]
        for k in ks:
            root(k)
        if len(sites) == len(set(sites)):
            for k in ks[1:]:
                parent[root(k)] = root(ks[0])
    people = defaultdict(lambda: {"keys": set(), "lines": []})
    for n, text, ks in lines:
        for r in {root(k) for k in ks}:
            people[r]["keys"] |= {k for k in ks if root(k) == r}
            people[r]["lines"].append((n, text))

    out = defaultdict(list)
    for p in people.values():
        row = next((by_key[k] for k in sorted(p["keys"]) if k in by_key), None)
        open_lines = [n for n, t in p["lines"] if not CLOSED.search(t)]
        first = any(FIRST.search(t) for _, t in p["lines"])
        name = row["name"] if row else name_of(p["lines"][0][1])
        link = sorted(p["keys"])[0].split(":", 1)[1] if p["keys"] else ""
        where = "line " + ", ".join(str(n) for n, _ in p["lines"][:4])
        said = f'{row["date"]}: "{row["words"]}"' if row else ""
        if row and row["status"] == "ruled out":
            out["ruled out" if open_lines else "closed"].append(f"{name} ({link}, {where}) {said}")
        elif first and not row:
            out["connected" if open_lines else "closed"].append(f"{name} ({link}, {where})")
        elif row:
            out["known"].append(f"{name} ({link}, {where}) {row['status']}, {said}")
        hist = [h for k in sorted(p["keys"]) for h in earlier.get(k, [])]
        if hist:
            out["earlier"].append(f"{name} ({link}, {where})\n      " + "\n      ".join(list(dict.fromkeys(hist))[:8]))
    # A row with no profile link can only be matched by its full name: shown, never counted.
    text = [fold(t) for t in open(a.file, encoding="utf-8").read().splitlines()]
    for row in known:
        name = fold(row["name"])
        if row["keys"] or row["links"] or len(name.split()) < 2:
            continue
        hits = [str(n) for n, t in enumerate(text, 1) if re.search(r"(?<!\w)" + re.escape(name) + r"(?!\w)", t)]
        if hits:
            out["name only"].append(f"{row['name']} (line {', '.join(hits[:4])}) {row['status']}, {row['date']}: \"{row['words']}\"")

    print(f"{a.file}: {len(people)} people checked against {known_path} ({len(known)} rows"
          f"{', missing' if not os.path.isfile(known_path) else ''}) and the other events' people.md.")
    titles = {
        "ruled out": "Ruled out by the user: take them off; no shortlist, draft or message unless the user names them again",
        "connected": "Connected to the user (1st) with no row in known-people.md: ask the user before any draft, then record the answer",
        "known": "In known-people.md: follow the user's words",
        "earlier": "Seen at other events: what the team did then",
        "name only": "Same name as a known-people.md row that has no profile link: check whether it is the same person, and add the link",
        "closed": "Marked skipped or ruled out in this file (not counted)",
    }
    for key, title in titles.items():
        if out[key]:
            print(f"\n{title}:")
            print("\n".join("  - " + x for x in out[key]))
    for p in problems:
        print("\nWarning: " + p)
    blocked = len(out["ruled out"]) + len(out["connected"])
    print(f"\n{'FAIL' if blocked else 'PASS'}: {len(out['ruled out'])} ruled out, "
          f"{len(out['connected'])} connected without the user's word.")
    return 1 if blocked else 0


if __name__ == "__main__":
    sys.exit(main())
