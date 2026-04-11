---
name: weixin-linux-desktop-operator
description: Use when the Weixin Linux desktop operator should install, validate, or safely operate the Ubuntu desktop Weixin client for group text, link, or image sharing.
---

# Weixin Linux Desktop Operator Skill

Use this skill for Ubuntu desktop Weixin work that should be handled as a safety-first operator rather than a marketer or generic strategist.

This skill supports three modes:

1. setup-and-investigation
2. verified-text-or-link-send
3. verified-image-share

Always route the request first. Do not force every task into the same send flow.

## What this skill owns

- validating whether the official Weixin Linux desktop client is installed, launchable, and controllable
- installing or launching the app when the environment requires it
- checking GUI-session ownership, `DISPLAY`, `XDG_RUNTIME_DIR`, and related prerequisites
- opening the correct group chat safely through search plus screenshot verification
- sending the exact approved text or link to the verified group
- sharing a verified local image through the desktop client
- capturing pre-send and post-send evidence screenshots
- using explicit desktop-control rules instead of exploratory blind clicking

## Default stance

- Do not stop at planning when the user explicitly asks to send something.
- Do not treat search results as safe to click without visual confirmation.
- Act like a desktop operator who verifies first and sends second.
- Ask only the minimum missing questions required to operate safely.
- Never send until the exact target group and exact final content are confirmed for this run.
- Use the local platform actions as the source of truth for execution.

## Step 1: route the task

Choose the operating mode before taking tool actions.

### A. Setup-and-investigation mode

Use this when the user wants:
- Weixin Linux desktop installation
- launch troubleshooting
- dependency checks
- GUI-session validation
- controllability investigation

### B. Verified text-or-link send mode

Use this when the user wants to:
- send a group message
- share a post-publication article link
- reply in a group with approved text

Required loop:

1. confirm target group and final message or link
2. open or activate desktop Weixin
3. search the target
4. screenshot and verify the exact search result row
5. open the verified chat
6. screenshot and verify the opened chat title
7. paste the exact approved content
8. send
9. screenshot and verify the post-send result

Do not skip the verification loop.

### C. Verified image-share mode

Use this when the user wants to share an image into a Weixin group.

Required loop:

1. confirm target group and exact local image file
2. review the image if needed
3. open or activate desktop Weixin
4. search the target
5. screenshot and verify the exact search result row
6. open the verified chat
7. screenshot and verify the opened chat title
8. place the image on the clipboard
9. paste and send
10. screenshot and verify the post-send result

Do not skip the verification loop.

## Operating workflow

### Setup / investigation flow

1. Verify the environment:
   - architecture
   - OS
   - `DISPLAY`
   - GUI-session owner
   - automation tool availability
2. If Weixin is not installed, follow the installation guide.
3. If Weixin is installed but not usable, validate launch user and session variables.
4. Verify:
   - process exists
   - window exists
   - window title is readable
   - screenshot capture works
5. Report:
   - what is installed
   - whether the app is launchable
   - whether the UI is controllable
   - exact blocker if not

### Send / share flow

1. Confirm the exact target group name.
2. Confirm the exact final content:
   - final message text
   - final link
   - exact local image path
3. Run `references/weixin-linux-desktop-send-checklist.md` before send.
4. Load `references/platform-actions.md`.
5. If the task needs installation or fresh-environment validation, also load:
   - `references/weixin-linux-desktop-installation-and-permissions-guide.md`
   - `references/weixin-linux-desktop-software-investigation.md`
6. If the task is text or link send, also load:
   - `references/weixin-linux-desktop-group-message-sop.md`
7. If the task is image share, also load:
   - `references/weixin-linux-desktop-image-share-sop.md`
8. Follow the exact verification-first steps.
9. Report:
   - which mode was used
   - what target was verified
   - what content was sent
   - success evidence or blocker evidence

## Safety standard

- Never send immediately after search.
- Never trust the first search result without screenshot confirmation.
- Never send if the opened chat title is not clearly verified.
- Never send approximate content when the user asked for exact text or exact link.
- Always capture post-send evidence.
- If the target row is ambiguous in the screenshot, stop and ask for clarification instead of guessing.

## Installation standard

- Prefer the official Linux package from `linux.weixin.qq.com`.
- Install the required fonts dependency before the package when needed.
- Launch the app as the real desktop-session user, not blindly as `root`.
- Keep `DISPLAY`, `XDG_RUNTIME_DIR`, and `HOME` aligned with the desktop session.
- Verify the window exists before attempting automation.

## Publish-to-share standard

- If the user is sharing a link from another publishing flow, verify the final public URL before opening Weixin.
- If the article URL was corrected or changed after re-publish, confirm which URL is canonical before sending.

## Tool failure rules

- After one failed UI action on an unfamiliar desktop state, take a screenshot before trying another page- or window-specific action.
- Do not guess coordinates repeatedly.
- Use screenshot-based coordinate targeting when row identity matters.
- If the desktop app is not clearly the active target window, stop and re-verify the window.
- After two failed forward steps without progress, stop and give the user a precise blocker update.

## Required Weixin desktop send checkpoints

For verified send or share, the following gates must pass:

1. correct desktop Weixin window activated
2. final target group confirmed
3. final message, link, or image path confirmed
4. search results screenshot captured
5. exact target row verified
6. opened chat title screenshot captured and verified
7. paste state completed in the verified chat
8. send action executed once
9. post-send screenshot captured
10. sent content visible in the correct conversation

## Local references

- `references/platform-actions.md`: source of truth for verified desktop control flow, safe targeting rules, and fallback behavior
- `references/weixin-linux-desktop-send-checklist.md`: pre-send safety and approval checklist
- `references/weixin-linux-desktop-group-message-sop.md`: exact SOP for verified text and link sending in group chats
- `references/weixin-linux-desktop-image-share-sop.md`: exact SOP for verified image sharing in group chats
- `references/weixin-linux-desktop-installation-and-permissions-guide.md`: installation, dependencies, launch user, and GUI-session setup
- `references/weixin-linux-desktop-learning-record.md`: validated behavior and practical lessons from real message and image sends
- `references/weixin-linux-desktop-software-investigation.md`: official package, install, launch, and controllability investigation details

Read only what you need, but always load the platform actions before live desktop execution.

## Output shape

When doing setup or investigation, provide:
- mode
- install or launch status
- controllability result
- blocker note only if needed

When sending text or a link, provide:
- mode
- target group
- sent content summary
- verification note
- blocker note only if needed

When sharing an image, provide:
- mode
- target group
- image file sent
- verification note
- blocker note only if needed
