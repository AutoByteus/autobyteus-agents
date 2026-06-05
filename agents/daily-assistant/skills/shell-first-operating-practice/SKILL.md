---
name: shell-first-operating-practice
description: Reusable shell-first operating practice for shell-capable agents. Use when an agent should use Unix-style terminal commands to inspect, search, read, edit, generate, transform, automate, verify, debug, manage processes, work with repositories, inspect network resources, or operate project runtimes.
---

# Shell-First Operating Practice

## Purpose

Use the shell as a primary operating interface, not only as a file manager.

This skill covers the Unix command-line style of working: orient yourself, inspect state, search precisely, compose small tools, transform streams, edit files, manage processes, inspect network resources, run project commands, and verify results.

Filesystem operations are one category inside this practice. The broader discipline is using shell commands to operate the whole working environment.

This skill assumes the agent has a shell execution tool such as `run_bash`. If the shell tool has another name, use the runtime's equivalent command-execution tool. If no shell execution tool is available, do not pretend to perform shell-based work.

## Core Operating Loop

1. Orient: confirm workspace, repository root, branch, and relevant environment.
2. Inspect: read only the context needed for the task.
3. Search: use precise search terms before browsing directories.
4. Plan: choose the smallest useful next action.
5. Execute: compose deterministic, bounded, non-interactive commands.
6. Verify: check the result with a command that would catch the likely failure.
7. Report: summarize changed state, verification, and remaining caveats.

## Entry Procedure

- At the start of a new task, establish the active workspace with `pwd` unless the host agent prompt has already required and performed it.
- When working in a repository, identify the repo root when useful: `git rev-parse --show-toplevel 2>/dev/null || pwd`.
- Before editing repository files, check current changes with `git status --short`.
- For non-trivial work, decide the smallest useful action before changing files or starting processes.

## Operating Rules

- Inspect first, make the smallest useful change, then verify.
- Navigate by intent, not by dumping directories. Derive likely names, symbols, strings, file extensions, and business terms from the user's request, then search for those directly.
- Prefer deterministic non-interactive commands. Do not rely on interactive editors such as `vi`, `vim`, `nano`, or pagers that wait for input.
- Compose small commands instead of hiding work in large opaque one-liners.
- Keep command output bounded. Pipe discovery output through `sed -n '1,120p'`, `head`, or a more specific filter when a command could print too much.
- Quote paths and variables. Assume file names may contain spaces.
- Preserve existing user work. Never discard or overwrite unrelated changes.
- Avoid destructive operations unless the user explicitly asked for them.
- Use project-native commands when they exist, such as `make`, `npm`, `pytest`, `cargo`, `go test`, `docker compose`, or framework CLIs.

## Command Families

Use the right command family for the job:

| Need | Typical commands |
| --- | --- |
| Orientation | `pwd`, `env`, `which`, `uname`, `date`, `git status`, `git branch` |
| Filesystem navigation | `find`, `rg --files`, `stat`, `file`, `mkdir`, `cp`, `mv`, `rm` |
| File inspection | `sed`, `nl`, `head`, `tail`, `wc`, `file`, `stat` |
| Search and discovery | `rg`, `git grep`, `grep`, `find` |
| Text processing | `sed`, `awk`, `cut`, `paste`, `sort`, `uniq`, `tr`, `xargs` |
| Structured data | `jq`, `yq`, `python3`, format-aware project tools |
| Editing and generation | heredocs, temp files, `python3`, `jq`, `perl`, project formatters |
| Processes and logs | `ps`, `pgrep`, `pkill`, `kill`, `jobs`, `tail`, `lsof` |
| Network and URLs | `curl`, `wget`, `ping`, `nc`, `dig`, `host` |
| Archives | `tar`, `gzip`, `zip`, `unzip` |
| Permissions | `chmod`, `chown`, `ls -l`, `stat` |
| Git and repository work | `git status`, `git diff`, `git add`, `git commit`, `git log`, `git show` |
| Project runtimes | `make`, `npm`, `pnpm`, `pytest`, `python3`, `docker`, `docker compose` |
| Verification | `diff`, `git diff`, tests, linters, parsers, compilers, smoke commands |

## Orientation

- Use `pwd` to confirm the active directory.
- Use `git rev-parse --show-toplevel` when repository-relative paths matter.
- Use `git status --short` before editing tracked files.
- Use `which command` or `command -v command` before assuming optional tools exist.
- Use `env | sort | sed -n '1,120p'` only when environment variables are relevant.

## Search And Discovery

- Start with content search, not folder browsing: `rg -n "specific_term|SpecificClass|function_name" path/`.
- Use `rg -l "term" path/` when you only need candidate file names.
- Use `rg --files path/ | rg "name|extension|domain"` when looking for filenames.
- Scope searches to the smallest plausible directory once you know it.
- Use `--glob` to include or exclude file types: `rg -n "term" src --glob '*.py' --glob '!*.min.js'`.
- Use `git grep -n "term"` as a strong fallback inside Git repositories when `rg` is unavailable.
- Outside Git repositories, if `rg` is unavailable, use constrained `grep` and `find` commands rather than broad scans.
- Use `find` only with constraints, such as `find . -maxdepth 3 -type f -name '*.md' -not -path '*/.git/*'`.
- Use targeted `ls` only for a known small directory, not as the default discovery method.
- Use pipelines to reduce noise: `rg -n "term" path | sed -n '1,80p'`, `rg --files | rg 'agent|config'`, `sort | uniq -c | sort -nr`.

## File Inspection

- Use `wc -l path/to/file` to understand file size before reading broadly.
- Use `sed -n '40,120p' path/to/file` to read exact windows.
- Use `nl -ba path/to/file | sed -n '40,120p'` when line numbers matter.
- Use `head -80 path/to/file` or `tail -80 path/to/file` only when the beginning or end is clearly relevant.
- Use `file path/to/file` before treating unknown files as text.
- Use `jq` for JSON inspection instead of reading raw JSON by hand when practical.
- Use `python3 -m json.tool path/to/file.json >/dev/null` to check whether JSON is valid.

## Text Processing

- Use shell pipelines for stream transformations that are easier to verify than hand edits.
- Use `sort | uniq -c | sort -nr` to count repeated values.
- Use `awk` for column-oriented extraction and simple reports.
- Use `sed` for bounded stream substitution or extraction.
- Use `cut` for delimiter-separated fields when the format is simple.
- Use `xargs` carefully only when input is controlled. Prefer null-delimited forms for arbitrary filenames, such as `rg -l --null "term" path | xargs -0 sed -n '1,40p'`.
- Prefer parser-aware tools over text tricks for structured formats.

## Structured Data

- Use `jq` for JSON reads and simple rewrites.
- Use `yq` for YAML when available.
- Use `python3` for structured transformations when escaping, nesting, or validation matters.
- Validate generated structured files after writing them.
- Avoid broad regex edits in JSON, YAML, TOML, XML, or lockfiles when a parser is available.

## Editing And Generation

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
- Write through a temp file when replacing important files.

## Filesystem Operations

- Create parent directories deliberately with `mkdir -p "path/to/dir"`.
- Use explicit paths with `cp`, `mv`, and `rm`.
- Use `rm` only for files that are generated, temporary, or explicitly requested for deletion.
- Never use `rm -rf` unless the user explicitly asked for directory deletion and you have verified the path.
- Before moving or deleting repository files, check `git status --short`.
- When copying or moving agent bundles, verify both source and destination with `find path -maxdepth 2 -type f | sort`.

## Processes And Logs

- Use `ps`, `pgrep`, and `lsof` to inspect running processes.
- Use `tail -n` or `tail -f` for logs, keeping output bounded unless actively debugging.
- Prefer project-native background process controls when available.
- Stop only processes you clearly identify as related to the task.
- Do not use broad `kill` or `pkill` patterns unless the user explicitly asked and the target is verified.

## Network And URL Inspection

- Use `curl -I URL` for headers and availability checks.
- Use `curl -L URL | sed -n '1,120p'` only when a bounded content preview is enough.
- Use `wget` only when downloading is required and acceptable.
- Use `ping`, `nc`, `dig`, or `host` for connectivity and DNS checks when relevant.
- Do not scrape or download large resources unless the user asked or the task requires it.

## Archives And Compression

- Inspect archive contents before extracting when practical: `tar -tf`, `unzip -l`.
- Extract into a deliberate directory, not blindly into the current workspace.
- Use `tar`, `gzip`, `zip`, and `unzip` according to the file type and project conventions.

## Git And Repository Work

- Use `git status --short` before edits and before staging.
- Use `git diff -- path` to inspect unstaged changes.
- Stage only paths relevant to the task.
- Prefer non-interactive git commands.
- Do not reset, checkout, clean, rebase, amend, or force-push unless the user explicitly asks.
- Preserve unrelated dirty work.

## Project-Native Commands

- Prefer existing scripts and documented commands over ad hoc shell logic.
- Inspect `package.json`, `Makefile`, `pyproject.toml`, `Cargo.toml`, `go.mod`, or project docs when choosing test or build commands.
- Run the smallest relevant verification command first.
- If a command may be long-running, explain why it is needed and keep output bounded.

## Verification

- Every shell-driven change needs a verification step.
- Use checks that fit the task: `git diff -- path/to/file`, `rg -n "expected_text" path/to/file`, `python3 -m json.tool path/to/file.json >/dev/null`, `python3 -m py_compile path/to/file.py`, tests, linters, compilers, or the project's own checks.
- Verify generated files exist and contain the expected content.
- If there is no relevant automated test, verify the changed file content directly and summarize the residual risk.

## Anti-Patterns

- Do not start with `ls -la`, `ls -R`, `find .`, `tree`, or broad recursive directory dumps.
- Do not run generic whole-repo searches such as `rg -n "config" .` unless the term is truly rare.
- Do not use `cat` on large files. Check size first or read a range.
- Do not print thousands of filenames or matches when a narrower search or bounded preview would work.
- Do not chain unrelated inspection, editing, and verification into one unreadable command.
- Do not make broad replacements without an exact anchor.
- Do not use unquoted paths.
- Do not blindly overwrite files you have not inspected.
- Do not repeat the same failing command without changing something meaningful.
- Do not claim a command changed or verified something before checking the result.
