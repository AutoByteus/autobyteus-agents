---
name: unix-filesystem-practice
description: Reusable Unix filesystem operating practice for shell-capable agents. Use when an agent needs to navigate, inspect, read, create, edit, replace, move, delete, or verify files efficiently through shell commands, especially when shell-first work is preferred or dedicated file tools are unavailable.
---

# Unix Filesystem Practice

## Purpose

Use the shell as the primary filesystem interface. Treat files as durable state, commands as composable transformations, and verification as part of every edit.

This skill assumes the agent has a shell execution tool such as `run_bash`. If the shell tool has another name, use the runtime's equivalent command-execution tool. If no shell execution tool is available, do not pretend to perform shell-based filesystem work.

## Entry Procedure

- At the start of a new task, establish the active workspace with `pwd` unless the host agent prompt has already required and performed it.
- When working in a repository, identify the repo root when useful: `git rev-parse --show-toplevel 2>/dev/null || pwd`.
- Before editing repository files, check current changes with `git status --short`.
- For non-trivial work, decide the smallest useful edit before changing files.

## Operating Rules

- Inspect first, make the smallest useful change, then verify.
- Navigate by intent, not by dumping directories. Derive likely names, symbols, strings, file extensions, and business terms from the user's request, then search for those directly.
- Prefer standard tools: `pwd`, `git rev-parse`, `rg`, `sed`, `awk`, `nl`, `wc`, `head`, `tail`, `sort`, `uniq`, `xargs`, `find`, `stat`, `file`, `mkdir`, `cp`, `mv`, `rm`, `diff`, `git diff`, `python3`, `jq`, and project-native test commands.
- Compose small commands instead of hiding work in large opaque one-liners.
- Quote paths and variables. Assume file names may contain spaces.
- Preserve existing user work. Never discard or overwrite unrelated changes.
- Avoid destructive operations unless the user explicitly asked for them.
- Keep command output bounded. Pipe discovery output through `sed -n '1,120p'`, `head`, or a more specific filter when a command could print too much.
- Prefer deterministic non-interactive commands. Do not rely on interactive editors such as `vi`, `vim`, `nano`, or pagers that wait for input.

## Efficient Navigation

- Start with content search, not folder browsing: `rg -n "specific_term|SpecificClass|function_name" path/`.
- Use `rg -l "term" path/` when you only need candidate file names.
- Use `rg --files path/ | rg "name|extension|domain"` when looking for filenames.
- Scope searches to the smallest plausible directory once you know it.
- Use `--glob` to include or exclude file types: `rg -n "term" src --glob '*.py' --glob '!*.min.js'`.
- Use `git grep -n "term"` as a strong fallback inside Git repositories when `rg` is unavailable.
- Outside Git repositories, if `rg` is unavailable, use constrained `grep` and `find` commands rather than broad scans.
- Use `find` only with constraints, such as `find . -maxdepth 3 -type f -name '*.md' -not -path '*/.git/*'`.
- Use targeted `ls` only for a known small directory, for example `ls agents/daily-assistant`, not as the default discovery method.
- Use pipelines to reduce noise: `rg -n "term" path | sed -n '1,80p'`, `rg --files | rg 'agent|config'`, `sort | uniq -c | sort -nr`.
- Use `xargs` carefully only when the input is controlled; prefer null-delimited forms for arbitrary filenames, such as `rg -l --null "term" path | xargs -0 sed -n '1,40p'`.

## Inefficient Navigation To Avoid

- Do not start with `ls -la`, `ls -R`, `find .`, `tree`, or broad recursive directory dumps.
- Do not run generic whole-repo searches such as `rg -n "config" .` unless the term is truly rare.
- Do not use `cat` on large files. Check size first or read a range.
- Do not print thousands of filenames or matches when a narrower search or bounded preview would work.
- Do not chain unrelated inspection, editing, and verification into one unreadable command. Keep operations separate enough to understand failures.

## Reading Files

- Use `wc -l path/to/file` to understand file size before reading broadly.
- Use `sed -n '40,120p' path/to/file` to read exact windows.
- Use `nl -ba path/to/file | sed -n '40,120p'` when line numbers matter.
- Use `head -80 path/to/file` or `tail -80 path/to/file` only when the beginning or end is clearly relevant.
- Use `file path/to/file` before treating unknown files as text.
- Use `jq` for JSON inspection instead of reading or rewriting raw JSON by hand when practical.
- Use `python3 -m json.tool path/to/file.json >/dev/null` to check whether JSON is valid before or after edits.

## Expert File Editing Techniques

Use this edit-method selection order:

| Edit need | Preferred technique |
| --- | --- |
| Locate target | `rg -n`, then inspect with `nl -ba file | sed -n 'start,endp'` |
| Single literal substitution | `perl -0pi -e` with an exact pattern |
| Stream rewrite | `sed` to a temp file, then `mv` |
| Field or column rewrite | `awk` to a temp file, then `mv` |
| Structured data | `jq`, `python3`, or a format-aware parser |
| Multi-line exact block | `python3` exact replacement with a missing-target guard |
| Append-only content | quoted heredoc with `cat >>` |
| Insert at anchor | `python3` exact anchor insertion |
| Full generated file | heredoc or `python3`, preferably through a temp file |

Rules:

- Choose the narrowest tool that matches the edit shape.
- Prefer parser-aware edits for structured files.
- Avoid broad regex replacements when an exact anchor or parser is available.
- Keep inspection, edit, and verification as separate commands when a failure would need diagnosis.

## Creating Files

- Create parent directories deliberately with `mkdir -p "path/to/dir"`.
- For short text files, use a quoted heredoc:

```bash
cat > "path/to/file.md" <<'EOF'
complete file content
EOF
```

- For structured content or large files, prefer `python3` so escaping, newlines, and encodings are explicit:

```bash
python3 - <<'PY'
from pathlib import Path

path = Path("path/to/file.json")
path.parent.mkdir(parents=True, exist_ok=True)
path.write_text("""{
  "example": true
}
""", encoding="utf-8")
PY
```

## Editing Files

- For multi-line or important edits, use exact replacement with `python3`:

```bash
python3 - <<'PY'
from pathlib import Path

path = Path("path/to/file")
text = path.read_text(encoding="utf-8")
old = """exact old block"""
new = """exact new block"""
if old not in text:
    raise SystemExit("target block not found")
path.write_text(text.replace(old, new, 1), encoding="utf-8")
PY
```

- For structured files, use a parser when available:

```bash
python3 - <<'PY'
import json
from pathlib import Path

path = Path("path/to/config.json")
data = json.loads(path.read_text(encoding="utf-8"))
data["enabled"] = True
path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
PY
```

- For simple single-line replacements, `perl` is acceptable when the pattern is exact:

```bash
perl -0pi -e 's/old literal text/new literal text/' "path/to/file"
```

- For stream rewrites, use `sed` with a temp file instead of relying on portable `sed -i` behavior:

```bash
target="path/to/file"
tmp="$(mktemp "$(dirname "$target")/.tmp.XXXXXX")"
trap 'rm -f "$tmp"' EXIT
sed 's/old literal text/new literal text/g' "$target" > "$tmp"
mv "$tmp" "$target"
trap - EXIT
```

- For field or column transformations, use `awk` with a temp file:

```bash
target="path/to/file"
tmp="$(mktemp "$(dirname "$target")/.tmp.XXXXXX")"
trap 'rm -f "$tmp"' EXIT
awk '{ print $1, $3 }' "$target" > "$tmp"
mv "$tmp" "$target"
trap - EXIT
```

- Avoid `sed -i` for portable edits because BSD/macOS and GNU sed use different in-place syntax.

## Safer Overwrites

- When rewriting a file, write to a temporary file first and move it into place only after successful generation:

```bash
target="path/to/output.txt"
tmp="$(mktemp "$(dirname "$target")/.tmp.XXXXXX")"
python3 generate_content.py > "$tmp"
mv "$tmp" "$target"
```

- If a command can fail after creating a temporary file, clean it up:

```bash
target="path/to/output.txt"
tmp="$(mktemp "$(dirname "$target")/.tmp.XXXXXX")"
trap 'rm -f "$tmp"' EXIT
some_command > "$tmp"
mv "$tmp" "$target"
trap - EXIT
```

Use a temp file in the same directory as the target when practical so the final `mv` stays on the same filesystem.

## Appending And Inserting

- Append with a quoted heredoc only when the operation is intentionally append-only.
- Insert at a specific location with `python3` and an explicit anchor instead of broad pattern matching.

## Moving, Copying, And Deleting

- Use explicit paths with `cp`, `mv`, and `rm`.
- Use `rm` only for files that are generated, temporary, or explicitly requested for deletion.
- Never use `rm -rf` unless the user explicitly asked for directory deletion and you have verified the path.
- Before moving or deleting repository files, check `git status --short`.

## Verification

- Every filesystem change needs a verification step.
- Use checks that fit the task: `git diff -- path/to/file`, `rg -n "expected_text" path/to/file`, `python3 -m json.tool path/to/file.json >/dev/null`, `python3 -m py_compile path/to/file.py`, `pytest`, `npm test`, or the project's own checks.
- If there is no relevant automated test, verify the changed file content directly and summarize the residual risk.

## Anti-Patterns

- Do not dump huge files when a small range would answer the question.
- Do not make broad replacements without an exact anchor.
- Do not use unquoted paths.
- Do not blindly overwrite files you have not inspected.
- Do not repeat the same failing command without changing something meaningful.
- Do not claim a file changed before verifying it.
