---
name: website-knowledge-automation
description: Complete a user's task on a website through its visible UI, using and maintaining that website's knowledge file in the current workspace (exact elements, locate scripts, operation SOPs, pitfalls) so later tasks on the same site are fast. Use for requests such as changing account settings, filling forms, posting, or retrieving content on a named site.
---

# Website Knowledge Automation

Use `web-ui-automation` to inspect the page, map coordinates, and send native input. This skill owns the task loop and the per-website knowledge that makes later tasks fast.

## Website knowledge

```text
<workspace>/web-ui-sites/<site-slug>/site-knowledge.md
```

`site-knowledge.md` is a reference for operating the site, structured by [site-knowledge-template.md](templates/site-knowledge-template.md). It contains:
- access and operating rules
- the page map
- exact elements and read-only locate scripts
- SOPs for the site's reusable operations (for example "attach images in order", "publish a post", "reply to a post")
- pitfalls

It is not a run log.

`<site-slug>` is the host where the task happens, without `www.`, for example `linkedin.com` or `aistudio.google.com`. Pages you pass through, such as a separate sign-in host, belong in the task site's file.

Record how the site works. Do not record passwords, tokens, one-time codes, cookies, payment data, or the user's personal documents or answers.

## 1. Prepare

1. Identify the goal, target site, supplied inputs (files, text, choices), and expected result. If a message references a request file, read that file first; it is the request's source of truth. If a required input is missing, such as which resume to use or the text to post, ask before starting.
2. If `<workspace>/web-ui-sites/<site-slug>/site-knowledge.md` exists, read it. Otherwise create it from the template, with the heading set to the site slug.
3. Treat its operating rules as the app-specific rules that `web-ui-automation` defers to.

## 2. Execute

- **Known operation:** Follow its SOP and use the recorded elements. Check each element on the live page before acting. If it has changed, locate it again and continue.
- **New operation or first visit:** Explore the site. Identify stable elements (CSS, role, label, visible text, `id`, `data-*`, `aria-*`, shadow-DOM host path), page URLs, and a working step sequence.
- **Native input helpers:** Use these scripts for the common native steps; each replaces several separate `xdotool` calls. Feed them rectangles and window metrics from a read-only locate script (`window.screenX`, `window.screenY`, `window.outerHeight - window.innerHeight`).
  - [`scripts/native_click.py`](scripts/native_click.py) `--rect X,Y,W,H --window SX,SY,CHROME [--point FX,FY] [--scale S]` clicks a point inside an element.
  - [`scripts/paste_file.py`](scripts/paste_file.py) `FILE [--mime text/html]` pastes a file's exact text into the focused field. It is safe for CJK and multi-line text.
  - [`scripts/choose_file.py`](scripts/choose_file.py) `/abs/path [--confirm return|alt+o]` completes an open native file chooser and waits for it to close.

  Before the first click in a session, check that the target browser window is the active, top-most window (`xdotool getactivewindow getwindowname`), because a native click lands on whatever is on top. After each helper, verify the result with a read-only check.
- **Human checkpoints:** For login, 2FA, CAPTCHA, device approval, or security prompts, stop and tell the user what to do and in which window. Wait, then re-check the page state. Never try to bypass these.
- **Confirmation gate:** Before a step that cannot be undone or that others can see, pause. Examples: submitting an application or form, publishing or sending, purchasing, deleting, or changing account or security settings. Show the user what will be submitted and where, then wait for approval. Skip this pause only when the request already explicitly approved that exact final action without review. A request file counts as that approval when it records the user's approval of the exact content, media, and destination. If the page would submit anything different, do not submit; report `Needs Decision`.
- **Finish:** Verify the result on the site, such as the new photo being shown or a confirmation page appearing. Save any requested output to the path the user named, or else to the workspace, and check that the file exists and is not empty. Keep run evidence (screenshots) with the output, not in the site knowledge.

## 3. Update the site knowledge

Update `site-knowledge.md` only when this run proved something new or different on the live site:
- a new or changed element or locate script
- a new operation SOP, or a corrected or faster step
- a new pitfall or point of no return

Edit the existing entry in place instead of appending a contradiction, and set its `Last verified` date. A routine run that matched the file changes nothing. Do not record guesses or one-off failures you could not explain.

## 4. Report and stop

Classify the outcome:
- `Completed`: the requested result was verified on the site.
- `Blocked`: a login, security, permission, or site failure stopped the task.
- `Needs Decision`: the task needs a changed input or a new approval, for example because the site rejects the approved text length.

Report:
- the outcome
- what was verified and how
- any saved output paths
- any blocker and what is needed next
- whether the site knowledge changed

If the request came as a file, write this report as `task-result.md` in the folder the request names, or else next to the request file. Then stop.
