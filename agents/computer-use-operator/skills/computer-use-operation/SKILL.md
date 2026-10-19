---
name: computer-use-operation
description: Complete a user's task on the computer by operating websites and apps through what is on the screen (screenshots to see, native input to act) and by using command-line tools, installed software, downloads, and media files. Maintains workspace knowledge per website (how controls look and where, locators, operation SOPs, pitfalls) and per tool (install, working commands, pitfalls) so later tasks are fast.
---

# Computer Use Operation

This skill owns the task loop and the workspace knowledge that makes later tasks fast. It has two capabilities, chosen per step:
- **Screen:** operate a website or app the way a person does: look at a screenshot, act with native mouse and keyboard input, and look again. Locating through the page's DOM, as `web-ui-automation` describes, is the fallback.
- **Computer tools:** use the shell, installed software, and media tools for work that is not a site's UI. Examples are downloading a public video with `yt-dlp`, converting media with `ffmpeg`, and preparing files.

## Knowledge

```text
<workspace>/web-ui-sites/<site-slug>/site-knowledge.md   # one per website
<workspace>/computer-tools/<tool>.md                     # one per tool
```

**Site knowledge** is a reference for operating the site, structured by [site-knowledge-template.md](templates/site-knowledge-template.md). It contains:
- access and operating rules
- the page map
- the controls: how each looks and where it sits on screen, plus its page locator and read-only locate script for the fallback
- SOPs for the site's reusable operations (for example "attach images in order", "publish a post", "reply to a post")
- pitfalls

`<site-slug>` is the host where the task happens, without `www.`, for example `linkedin.com` or `aistudio.google.com`. Pages you pass through, such as a separate sign-in host, belong in the task site's file. For an icon-only control that words describe poorly, keep a small cropped reference image next to the file (`<site-slug>/refs/<control>.png`) and name it in the Elements table.

**Tool knowledge** is structured by [tool-knowledge-template.md](templates/tool-knowledge-template.md). It records how the tool is installed and located, the exact commands that worked, and pitfalls.

Neither is a run log. Record how sites and tools work. Do not record passwords, tokens, one-time codes, cookies, payment data, or the user's personal documents or answers.

## 1. Prepare

1. Identify the goal, the target site or files, supplied inputs (files, text, choices), and the expected result. If a message references a request file, read that file first; it is the request's source of truth. If a required input is missing, such as which resume to use or the text to post, ask before starting.
2. For each step, choose the capability. Interacting with a site's or app's UI uses the screen capability. Retrieving or processing files uses the computer-tools capability, even when the file's source is a public URL.
3. Read the knowledge file for each site or tool you will use, if one exists. Treat a site's operating rules as the app-specific rules that `web-ui-automation` defers to.

## 2. Execute

### Screen

- **Look.** [`scripts/screen_capture.py`](scripts/screen_capture.py) `[OUT.png]` captures the whole screen and prints its path, `image=` and `screen=` sizes, and `screen_per_image_px`. Open the PNG with the tool that shows you images (`read_media_file`, or your runtime's own file reader). The screenshot also shows what is on top, such as a dialog or another window; a native click lands there.
- **Click what you see.** Read the target's centre in the image as you see it, and click it with [`scripts/native_click.py`](scripts/native_click.py) `--at X,Y --scale S`. Your runtime may show a large image smaller than the file: it may state the factor, or else compare the width you see with `image=`. `S` = (image width / width you see) × `screen_per_image_px`; for example 1.28 × 0.5 = 0.64 for a 2560 px capture shown at 2000 px on a screen whose X coordinates are half the capture's pixels. If the target is not in the screenshot, scroll or navigate and look again rather than guessing a point.
- **Locate through the page instead** (`web-ui-automation`: a read-only locate script's rectangle and window metrics, then `native_click.py --rect X,Y,W,H --window SX,SY,CHROME [--point FX,FY]`) when:
  - you cannot see images: the screenshot does not load, or the tool says the model has no image input;
  - the target is off screen and easier to find in the page, such as one row in a long list;
  - several controls look alike and the picture cannot tell them apart;
  - a click from the image did not do what you expected.

  Read exact text and field values from the page (`read_page`, `dom_snapshot`, a read-only script) rather than from the picture.
- **Check what changed.** After a click whose result matters, such as opening the composer, attaching a file or switching a setting, take a new screenshot and compare it with the one before: the expected change is there and nothing else changed. A routine step with an obvious result needs no extra check.
- **Known operation:** follow its SOP. Find each recorded control on the current screen by its look and place; if it moved or changed, locate it again, continue, and update the knowledge.
- **New operation or first visit:** explore the site. Record how each control looks and where it is, a stable page locator for the fallback (CSS, role, label, visible text, `id`, `data-*`, `aria-*`, shadow-DOM host path), page URLs, and a working step sequence.
- **Other native helpers:**
  - [`scripts/paste_file.py`](scripts/paste_file.py) `FILE [--mime text/html]` pastes a file's exact text into the focused field. It is safe for CJK and multi-line text.
  - [`scripts/choose_file.py`](scripts/choose_file.py) `/abs/path [--confirm return|alt+o]` completes an open native file chooser and waits for it to close.

### Computer tools

- **Use an existing tool first:** the agent's media tools, or a tool that is already installed (`command -v`). Follow its knowledge file when one exists.
- **Install when needed.** Use the official source, and prefer a user-level or isolated install (`pipx`, a virtual environment, `~/.local/bin`) over a system-wide one. Verify the installed version before use. List every install in the report.
- **Long jobs:** run large downloads and conversions as background processes and check their output.
- **Access limits:** use only ordinary public access, or access the user has supplied for this task. Do not bypass DRM, paywalls, login, or access controls. Do not share or export cookies or credentials. If the source itself denies access (401/403 on the original, a login wall, a geo-block), report it instead of working around it; trying a different ordinary tool on a public source is fine.
- **Verify outputs:** check that the file exists and is not empty, and check media duration, dimensions, and audio with a metadata probe (for example `ffprobe`, or `read_media_file`).

### Both capabilities

- **Human checkpoints:** For login, 2FA, CAPTCHA, device approval, or security prompts, stop and tell the user what to do and in which window. Wait, then re-check the state. Never try to bypass these.
- **Confirmation gate:** Before a step that cannot be undone or that others can see, pause. Examples: submitting an application or form, publishing or sending, purchasing, deleting the user's files, or changing account or security settings. Show the user what will be submitted and where, then wait for approval. Before the final click, check in a fresh screenshot that the point is on the approved control and that the content shown is the approved content. Skip this pause only when the request already explicitly approved that exact final action without review. A request file counts as that approval when it records the user's approval of the exact content, media, and destination. If the action would submit anything different, do not submit; report `Needs Decision`.
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
