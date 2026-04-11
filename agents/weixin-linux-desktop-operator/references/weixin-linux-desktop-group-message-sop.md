# Weixin Linux Desktop Group Messaging SOP

## Purpose

Use the Ubuntu desktop Weixin client to safely send a message to a target group chat.

## Scope

This SOP documents the method that worked in the current environment.

## Tools

- `xdotool`
- `xclip`
- `scrot`
- screenshot-based coordinate targeting

## Core Rule

Never send immediately after search.
Always verify before sending.

## Working Method

### 1. Activate the real desktop Weixin window

Make sure you are controlling the desktop Weixin app, not a browser tab with a similar title.

### 2. Search the target group name

Type the target group name in the Weixin search box.

### 3. Capture a screenshot of the search results

Do not click immediately.
Capture a screenshot first and visually confirm the exact target row.

### 4. Open the target group using screenshot-confirmed targeting

Use screenshot-based coordinate targeting to click the exact verified row.

### 5. Capture a screenshot after opening the chat

Verify that the chat title matches the intended group.
Do not send anything unless the title is correct.

### 6. Paste and send

- copy the final message to clipboard
- paste into the message box
- send with `Enter`

### 7. Capture a screenshot after sending

Verify that the message appears in the correct conversation.

## Verified Safe Workflow

The workflow that worked in this environment was:
1. search
2. screenshot search results
3. confirm the exact target row
4. click the verified row
5. screenshot the opened chat title
6. send
7. screenshot after send

## Recommended Verification Checkpoints

- Checkpoint A: search results screenshot
- Checkpoint B: opened chat title screenshot
- Checkpoint C: post-send screenshot

## Example Message Used In This Session

`Brief note: I used the Ubuntu Weixin desktop client to search the group, enter content, and send this message.`

## Installation Prerequisite Reference

Before using this SOP on a fresh machine or container, read:
- `weixin-linux-desktop-installation-and-permissions-guide.md`

That guide covers:
- official package download
- dependency installation
- correct GUI launch user
- `DISPLAY` / `XDG_RUNTIME_DIR` / `HOME` setup
- automation tool prerequisites

## Best Current Method

The most reliable group-selection method found in this environment is:
- screenshot first
- verify the exact result row
- use screenshot-based coordinate targeting
- verify the opened chat title
- only then send
