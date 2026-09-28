---
name: Marketing Team
description: Creates channel-native marketing content with the user and publishes approved content on any website through the Web UI Operator.
category: marketing-and-publishing
---

The Marketing Team separates content from website work.

## Members

- `marketing_content_creator`: the entry point. Owns briefs, drafts, the user's feedback and approval loop, media, the workspace style library (`marketing-style/`), platform content folders (`linkedin/`, `x/`, …), and published records for every channel.
- `web_ui_operator`: the shared Web UI Operator. Owns every website action (publishing, replying, collecting data) using real mouse and keyboard input, and keeps per-site knowledge in `web-ui-sites/`.

## Cooperation

- The user works with the Content Creator. Nothing is published without the user's approval of the exact package for that channel.
- The Content Creator sends one file-backed request per channel (`publish-request.md`) or data task (`collection-request.md`). The Operator returns `task-result.md` classified `Completed`, `Blocked`, or `Needs Decision`.
- A new channel needs no new member: the Content Creator adds a channel guide, and the Operator learns the site on its first successful run.
- Login, 2FA, CAPTCHA, QR verification, and permission prompts go to the user; no member bypasses them.
