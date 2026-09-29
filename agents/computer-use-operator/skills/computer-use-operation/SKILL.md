---
name: computer-use-operation
description: Complete a user's task on the computer by operating websites through their visible UI and by using command-line tools, installed software, downloads, and media files. Maintains workspace knowledge per website (elements, locate scripts, operation SOPs, pitfalls) and per tool (install, working commands, pitfalls) so later tasks are fast.
---

# Computer Use Operation

This skill owns the task loop and the workspace knowledge that makes later tasks fast. It has two capabilities, chosen per step:
- **Websites:** operate a site's UI with `web-ui-automation`, which covers inspecting the page, mapping coordinates, and native input.
- **Computer tools:** use the shell, installed software, and media tools for work that is not a site's UI. Examples are downloading a public video with `yt-dlp`, converting media with `ffmpeg`, and preparing files.

## Knowledge

```text
<workspace>/web-ui-sites/<site-slug>/site-knowledge.md   # one per website
<workspace>/computer-tools/<tool>.md                     # one per tool
```

**Site knowledge** is a reference for operating the site, structured by [site-knowledge-template.md](templates/site-knowledge-template.md). It contains:
- access and operating rules
- the page map
- exact elements and read-only locate scripts
- SOPs for the site's reusable operations (for example "attach images in order", "publish a post", "reply to a post")
- pitfalls

`<site-slug>` is the host where the task happens, without `www.`, for example `linkedin.com` or `aistudio.google.com`. Pages you pass through, such as a separate sign-in host, belong in the task site's file.

**Tool knowledge** is structured by [tool-knowledge-template.md](templates/tool-knowledge-template.md). It records how the tool is installed and located, the exact commands that worked, and pitfalls.

Neither is a run log. Record how sites and tools work. Do not record passwords, tokens, one-time codes, cookies, payment data, or the user's personal documents or answers.

## 1. Prepare

1. Identify the goal, the target site or files, supplied inputs (files, text, choices), and the expected result. If a message references a request file, read that file first; it is the request's source of truth. If a required input is missing, such as which resume to use or the text to post, ask before starting.
2. For each step, choose the capability. Interacting with a site's UI uses the website capability. Retrieving or processing files uses the computer-tools capability, even when the file's source is a public URL.
3. Read the knowledge file for each site or tool you will use, if one exists. Treat a site's operating rules as the app-specific rules that `web-ui-automation` defers to.

## 2. Execute

### Websites

- **Known operation:** Follow its SOP and use the recorded elements. Check each element on the live page before acting. If it has changed, locate it again and continue.
- **New operation or first visit:** Explore the site. Identify stable elements (CSS, role, label, visible text, `id`, `data-*`, `aria-*`, shadow-DOM host path), page URLs, and a working step sequence.
- **Native input helpers:** Use these scripts for the common native steps; each replaces several separate `xdotool` calls. Feed them rectangles and window metrics from a read-only locate script (`window.screenX`, `window.screenY`, `window.outerHeight - window.innerHeight`).
  - [`scripts/native_click.py`](scripts/native_click.py) `--rect X,Y,W,H --window SX,SY,CHROME [--point FX,FY] [--scale S]` clicks a point inside an element.
  - [`scripts/paste_file.py`](scripts/paste_file.py) `FILE [--mime text/html]` pastes a file's exact text into the focused field. It is safe for CJK and multi-line text.
  - [`scripts/choose_file.py`](scripts/choose_file.py) `/abs/path [--confirm return|alt+o]` completes an open native file chooser and waits for it to close.

  Before the first click in a session, check that the target browser window is the active, top-most window (`xdotool getactivewindow getwindowname`), because a native click lands on whatever is on top. After each helper, verify the result with a read-only check.

### Computer tools

- **Use an existing tool first:** the agent's media tools, or a tool that is already installed (`command -v`). Follow its knowledge file when one exists.
- **Install when needed.** Use the official source, and prefer a user-level or isolated install (`pipx`, a virtual environment, `~/.local/bin`) over a system-wide one. Verify the installed version before use. List every install in the report.
- **Long jobs:** run large downloads and conversions as background processes and check their output.
- **Access limits:** use only ordinary public access, or access the user has supplied for this task. Do not bypass DRM, paywalls, login, or access controls. Do not share or export cookies or credentials. If the source itself denies access (401/403 on the original, a login wall, a geo-block), report it instead of working around it; trying a different ordinary tool on a public source is fine.
- **Verify outputs:** check that the file exists and is not empty, and check media duration, dimensions, and audio with a metadata probe (for example `ffprobe`, or `read_media_file`).

### Both capabilities

- **Human checkpoints:** For login, 2FA, CAPTCHA, device approval, or security prompts, stop and tell the user what to do and in which window. Wait, then re-check the state. Never try to bypass these.
- **Confirmation gate:** Before a step that cannot be undone or that others can see, pause. Examples: submitting an application or form, publishing or sending, purchasing, deleting the user's files, or changing account or security settings. Show the user what will be submitted and where, then wait for approval. Skip this pause only when the request already explicitly approved that exact final action without review. A request file counts as that approval when it records the user's approval of the exact content, media, and destination. If the action would submit anything different, do not submit; report `Needs Decision`.
- **Finish:** Verify the result on the site or on disk, such as the new photo being shown or the downloaded file playing. Save any requested output to the path the user named, or else to the workspace. Keep run evidence (screenshots, logs) with the output, not in the knowledge files.

## 3. Update the knowledge

Update a site or tool knowledge file only when this run proved something new or different:
- a new or changed element, locate script, or working command
- a new operation SOP, install path, or a corrected or faster step
- a new pitfall or point of no return

If the site or tool has no file yet, create it from its template (a site file's heading is the site slug). Edit an existing entry in place instead of appending a contradiction, and set its `Last verified` date. A routine run that matched the file changes nothing. Do not record guesses or one-off failures you could not explain.

## 4. Report and stop

Classify the outcome:
- `Completed`: the requested result was verified.
- `Blocked`: a login, security, permission, access, or site/tool failure stopped the task.
- `Needs Decision`: the task needs a changed input or a new approval, for example because the site rejects the approved text length.

Report:
- the outcome
- what was verified and how
- any saved output paths
- any software installed
- any blocker and what is needed next
- whether the knowledge files changed

If the request came as a file, write this report as `task-result.md` in the folder the request names, or else next to the request file. Then stop.
