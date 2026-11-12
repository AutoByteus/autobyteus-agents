#!/usr/bin/env python3
"""Scan one subject's transcript before its run is counted: foreign processes or paths, and resource failures.

usage: scan-transcript.py TRACES... --allow ROOT [--allow ROOT ...] [--marker TEXT ...] [--foreign-user NAME ...]
                          [--ignore ROOT ...] [--watch-tmp] [--json OUT]

  TRACES     the run's raw trace files (raw_traces*.jsonl), or folders holding them (searched recursively)
  --allow    a path that belongs to the subject: its workspace, its instance's data folder, the package copy,
             the app or server it runs, its home. Its own processes and files live under these.
  --marker   text that never belongs to the subject, such as the user's data folder, another instance's folder
             or the host user's home. It is flagged wherever it appears in a process row or in a call.
  --foreign-user  a user name that only other subjects' or the host's processes run as (for example `nobody`
             when each sandbox sees the others under it); checked in the user column of process rows only
  --ignore   a root to skip besides the system folders (/usr, /bin, /lib, /etc, /proc, /sys, /dev, /run, /var)
  --watch-tmp  also check paths under /tmp (skipped by default; pass --marker for other instances' /tmp folders)

Findings:
  foreign-process  a process row in any tool result, whatever command printed it, that shows a marker or a path
                   outside the allowed roots: the subject saw a process that is not its own
  foreign-path     a marker, or a path outside the allowed roots, in the subject's own tool calls
  resource         an out-of-memory, killed, crash, no-space or limit marker in a command's output or error, or in
                   the subject's own message (text it only read from a file is not scanned)

A path counts only when its first folder exists on this host, so URL paths such as /orders/1042 are not paths.
Exit 0 when nothing is found, 1 when something is. Read each finding before calling the run affected: a resource
line can be source text a command printed.
"""
import argparse, datetime, json, os, re, sys
from pathlib import Path

SYSTEM = ("/usr", "/bin", "/sbin", "/lib", "/lib32", "/lib64", "/libx32", "/etc", "/proc", "/sys", "/dev", "/run",
          "/var", "/boot")
READ_TOOLS = {"Read", "read_file", "Grep", "Glob", "NotebookRead", "WebFetch", "read_page", "dom_snapshot",
              "view", "search_files", "list_directory"}
PROC_CMD = re.compile(r"(?:^|[\s;&|(`$])(?:ps|pgrep|pkill|top|htop|pstree|lsof|fuser|pidof)(?:\s|$)"
                      r"|/proc/(?:\d+|self|\*|\$\w+)/|\bss\s+-\w*p|\bnetstat\s+-\w*p", re.M)
# a process row: optional user, a pid, then up to ten columns before a path or a common program
PROC_ROW = re.compile(r"^\s*(?:\S+\s+)?\d{1,7}\s+(?:\S+\s+){0,10}?(?:/\S|\S*\b(?:node|python3?|bash|sh|zsh|"
                      r"chrom\w*|claude|codex|bwrap|java|npm|pnpm|npx|vite|nuxt|vitest|sleep)\b)")
LS_ROW = re.compile(r"^\s*[-dlcbps][rwxsStT-]{9}[.+@]?\s")  # `ls -l` lines are files, not processes
PATH = re.compile(r"(?<![\w.~:/@-])(/(?:[\w.@+%=,-]+/)*[\w.@+%=,-]+)")
VIEWERS = {"cat", "head", "tail", "sed", "nl", "grep", "rg", "awk", "less", "more", "jq", "wc", "diff", "git"}
RESOURCE = re.compile(
    r"Cannot allocate memory|ENOMEM|\b[Oo]ut of memory\b|OutOfMemory|heap out of memory|\bMemoryError\b|"
    r"\boom[-_ ]?kill|(?:^|\n)\s*Killed(?:\s|$)|exit (?:code|status) 137|\bcode 137\b|\bsignal 9\b|SIGKILL|"
    r"[Ss]wap (?:is )?(?:full|exhausted)|Page crashed|Target crashed|[Rr]enderer (?:process )?crash|"
    r"[Bb]rowser (?:has )?(?:crashed|disconnected)|Failed to launch (?:the )?browser|No space left on device|"
    r"\bENOSPC\b|[Dd]isk quota exceeded|Too many open files|\bEMFILE\b|Resource temporarily unavailable|"
    r"fork: retry")


def texts(value):
    """Every string inside a tool's args or result (dicts, lists, JSON strings)."""
    if isinstance(value, str):
        s = value.strip()
        if s[:1] in "[{":
            try:
                yield from texts(json.loads(s))
                return
            except ValueError:
                pass
        yield value
    elif isinstance(value, dict):
        for v in value.values():
            yield from texts(v)
    elif isinstance(value, list):
        for v in value:
            yield from texts(v)


def only_viewers(command):
    """True when every step of a shell command only prints files (cd, cat, sed -n, grep …), so its output is file text."""
    steps = [x.strip() for x in re.split(r"&&|\|\||;|\n", command) if x.strip()]
    progs = [os.path.basename(x.split()[0]) for x in steps if x.split()[0] not in ("cd", "export", "set", "echo")]
    return bool(progs) and all(p in VIEWERS for p in progs)


def trace_files(items):
    for item in items:
        p = Path(item)
        if p.is_dir():
            yield from sorted(p.rglob("raw_traces*.jsonl"))
        elif p.exists():
            yield p


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("traces", nargs="+")
    ap.add_argument("--allow", action="append", default=[], required=True)
    ap.add_argument("--marker", action="append", default=[])
    ap.add_argument("--foreign-user", action="append", default=[])
    ap.add_argument("--ignore", action="append", default=[])
    ap.add_argument("--watch-tmp", action="store_true")
    ap.add_argument("--json")
    a = ap.parse_args()
    allow = [os.path.normpath(x) for x in a.allow]
    ignore = list(SYSTEM) + [os.path.normpath(x) for x in a.ignore] + ([] if a.watch_tmp else ["/tmp"])
    tops = {}

    def under(path, roots):
        return any(path == r or path.startswith(r.rstrip("/") + "/") for r in roots)

    def foreign_paths(line):
        found = []
        for m in PATH.finditer(line):
            path = os.path.normpath(m.group(1))
            top = "/" + path.strip("/").split("/")[0]
            if top not in tops:
                tops[top] = os.path.isdir(top)
            parent_of_own = any(r.startswith(path.rstrip("/") + "/") for r in allow)
            if tops[top] and not parent_of_own and not under(path, allow) and not under(path, ignore):
                found.append(path)
        return found

    findings, records = [], []
    for f in trace_files(a.traces):
        for n, raw in enumerate(f.read_text(errors="replace").splitlines(), 1):
            try:
                records.append((f, n, json.loads(raw)))
            except ValueError:
                continue
    calls = {r.get("tool_call_id"): r for _, _, r in records if r.get("trace_type") == "tool_call"}

    def add(kind, f, n, r, detail, line, command=""):
        ts = r.get("ts")
        try:
            when = datetime.datetime.fromtimestamp(float(ts), datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
        except (TypeError, ValueError):
            when = str(ts)
        findings.append({"kind": kind, "time_utc": when, "tool": r.get("tool_name"), "file": str(f), "line_no": n,
                         "detail": detail, "text": line.strip()[:240], "command": command[:160]})

    for f, n, r in records:
        kind = r.get("trace_type")
        if kind == "tool_call":
            for s in texts(r.get("tool_args")):
                for line in s.splitlines():
                    hits = [m for m in a.marker if m in line] + foreign_paths(line)
                    if hits:
                        add("foreign-path", f, n, r, ", ".join(dict.fromkeys(hits)), line, s)
        elif kind == "tool_result":
            call = calls.get(r.get("tool_call_id"), {})
            command = "\n".join(texts(call.get("tool_args")))
            listing = bool(PROC_CMD.search(command))
            for s in texts(r.get("tool_result")):
                for line in s.splitlines():
                    if (listing or PROC_ROW.search(line)) and not LS_ROW.match(line):
                        users = [u for u in a.foreign_user if u in line.split()[:6]]
                        hits = users + [m for m in a.marker if m in line] + foreign_paths(line)
                        if hits:
                            add("foreign-process", f, n, r, ", ".join(dict.fromkeys(hits)), line, command)
            reading = r.get("tool_name") in READ_TOOLS or only_viewers(command)
            outputs = [] if reading else list(texts(r.get("tool_result")))
            outputs += [e for e in texts(r.get("tool_error")) if e not in ("None", "")]
            for s in outputs:
                for m in RESOURCE.finditer(s):
                    start = s.rfind("\n", 0, m.start()) + 1
                    end = s.find("\n", m.end())
                    add("resource", f, n, r, m.group(0).strip(), s[start:end if end != -1 else None], command)
        elif kind == "assistant":
            s = r.get("content") or ""
            for m in RESOURCE.finditer(s):
                add("resource", f, n, r, m.group(0).strip(), s[max(0, m.start() - 80):m.end() + 80])

    counts = {k: sum(1 for x in findings if x["kind"] == k) for k in ("foreign-process", "foreign-path", "resource")}
    print(f"records: {len(records)}  tool calls: {len(calls)}  findings: {counts}")
    for x in findings:
        print(f"- {x['kind']} {x['time_utc']} {x['tool']}: {x['detail']}\n    {x['text']}")
    if a.json:
        Path(a.json).write_text(json.dumps({"counts": counts, "findings": findings}, indent=1))
    sys.exit(1 if findings else 0)


if __name__ == "__main__":
    main()
