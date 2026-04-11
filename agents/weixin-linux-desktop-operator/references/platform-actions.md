# Weixin Linux Desktop Platform Actions

This file contains the distilled desktop-control actions for the Ubuntu Weixin client. Use these exact patterns instead of exploratory blind clicking when the task is to send a message, link, or image safely.

For fresh-machine or container setup, also load:
- `references/weixin-linux-desktop-installation-and-permissions-guide.md`
- `references/weixin-linux-desktop-software-investigation.md`

For live send runs, also load the relevant SOP:
- `references/weixin-linux-desktop-group-message-sop.md`
- `references/weixin-linux-desktop-image-share-sop.md`

Those files are the source of truth for:
- official package install and GUI-session ownership
- validated desktop launch method
- screenshot-first group targeting
- clipboard-based image share
- verification checkpoints before and after send

## Core route

- Preferred app: official Linux desktop Weixin client
- Preferred send strategy: search, screenshot, verify, open, screenshot, verify, paste, send, screenshot
- Do not rely on blind search-result clicking
- Do not rely on browser-tab titles that look similar to the desktop app title

## Preconditions

- User has confirmed the exact target group for this run.
- User has confirmed the exact final message, link, or image file for this run.
- Desktop Weixin is installed and launchable, or setup mode is in scope.
- Desktop automation tools required by the chosen flow are available.

## Action 1: Activate the correct desktop Weixin window

### Rule
- make sure the active target is the real desktop Weixin app window
- do not confuse it with a browser tab or another similarly titled window

### Verify
- window class and title match the desktop Weixin app
- screenshot of the active window is consistent with the desktop client

## Action 2: Search the target group

### Rule
- type the target group name into the Weixin search box
- do not click any result yet

## Action 3: Capture and verify search results

### Rule
- capture a screenshot of the search results
- visually confirm the exact target row before opening anything

### If ambiguous
- stop and ask for clarification
- do not guess

## Action 4: Open the target group by verified targeting

### Rule
- use screenshot-confirmed coordinate targeting to click the exact verified row

### Verify
- capture a screenshot after opening the chat
- confirm the chat title matches the intended group

### If it fails
- do not send anything
- go back to the search and verification step

## Action 5: Paste and send

### Text or link send
- place the exact final text or link on the clipboard
- paste into the verified chat input
- send with `Enter`

### Image share
- place the exact local image onto the clipboard
- paste into the verified chat input
- wait for the image to load
- send with `Enter`

## Action 6: Verify post-send state

### Rule
- always capture a post-send screenshot

### Verify
- the sent text, link, or image is visible in the correct conversation
- the chat title is still correct

## Setup and launch fallback rules

- If Weixin is not installed, use the official Linux package path and install prerequisites from the installation guide.
- If a root launch fails or shows `XDG_RUNTIME_DIR` ownership issues, relaunch as the actual desktop-session user.
- If the window cannot be found, verify process existence, display settings, and GUI-session ownership before attempting automation.

## Stable safety fallbacks

- If search results are not trustworthy, take another screenshot before any click.
- If target row identity is still unclear, stop instead of sending to the wrong chat.
- If the app state is stale after send, verify through a fresh screenshot rather than assuming failure.
- If a local image is questionable, review it before clipboard paste instead of sending it blindly.
