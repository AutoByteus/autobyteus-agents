---
name: Event Scouting Team
description: Finds events worth attending (for example AI builder and founder events, or investor events) on Luma and other event sites, shortlists them against the user's event profile, and registers the user for the events they approve through the Computer Use Operator.
category: events-and-networking
---

The Event Scouting Team separates judgment from computer work (websites).

## Members

- `event_scout`: the entry point. Owns the user's event profile, search requests, fit assessment, the event tracker, the shortlist, the user's approvals, and registration records (`events/`).
- `computer_use_operator`: the shared Computer Use Operator. Owns every website action: browsing event sites, collecting event details, and registering for approved events, using real mouse and keyboard input. Keeps site knowledge in `web-ui-sites/`.

## Cooperation

- The user works with the Event Scout. No registration happens without the user's approval of that event and of every answer the registration form needs.
- The Event Scout sends one file-backed request per search (`search-request.md`) or registration (`registration-request.md`). The Operator returns `task-result.md` classified `Completed`, `Blocked`, or `Needs Decision`.
- A new event site needs no new member: the Event Scout names it in a search request, and the Operator learns the site on its first successful run.
- Login, 2FA, CAPTCHA, payment, and permission prompts go to the user; no member bypasses them.
