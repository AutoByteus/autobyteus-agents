# Agent Package Creation Result: trial of the updated Product team (Task autobyteus-agents-46)

- Status: `Completed`
- Operation: `update` (trial, then a small fix)
- Package type: `team` (`agent-teams/product-team`, after #98)
- Request/reference: Task autobyteus-agents-46; the user, 2026-10-21: test the new team "with a much smaller" project; "as long as it doesn't do those crazy … unit tests … then that's fine … you decide".

## Trial (isolated instance, claude-opus-5 for both members)

Test data: a tiny notes app (a notes list, a Settings page with two cards), whose README says: "Before every change, run all checks and keep them green: typecheck, lint, test, then validate:ui". No design repository yet.

Request: "design a way to pin notes … a Pinned section at the top of All notes". The user's approval was played by the Creator.

| Phase | Time | What happened |
| --- | --- | --- |
| Baseline (Bootstrapper) | 15:03–15:22, 19 min | Copied the app in 2 min. Then about 13 min proving a byte-identical copy matched: 44 page-structure comparison files and 10 screenshot pairs. |
| Design to review | 15:22–15:33, 11 min | Pin control, Pinned and Others groups, motion and announcements. Worked around a broken screenshot tool ("Current display surface not available for capture", an environment issue) with a disposable headless-Chrome script outside the repository. |
| After approval | 15:34–15:43, 9 min | Spec, 11 final screenshots (desktop and mobile, with the unchanged Settings page for context), integration, cleanup. |

- **Test commands:** none, by either agent; the README's typecheck, lint, test and validate:ui were not run.
- **Finished designs:** none rechecked (none existed before).
- **Quality:** the spec has measured sizes, colours, timings, focus and screen-reader behaviour, and four journeys covering every state. It flags the undesigned persistence and two measured contrast shortfalls (the approved faint pin is 2.5:1 against 3:1). An engineer can build it.

## Fix

`shared/product-design-principles.md` §6: **copied UI code is its own evidence.**
- Files the baseline reuses unchanged render the same by construction: confirm the files match and look at them once beside the source.
- Compare item by item only what the baseline rebuilds or simulates, and only as far as needed.
- The Bootstrapper's step 8 points to it.

Evaluation: a baseline-only request on a fresh copy, stopped after 22 minutes.
- **What it did:** the Bootstrapper copied the files (noting they were "byte-identical"), but this time swapped in invented notes. That made the notes screen a simulated surface, so comparing it was legitimate.
- **Still heavy:** a full pass twice after a fixture change, both sides of the 640/641 px breakpoint, focus order, screenshot pairs (the screenshot tool returned stale frames), and durable evidence.
- **Verdict:** the fix is correct for pure copies but not proven by this run. The wider per-item evidence demand (principles §4 and §6, Bootstrapper steps 8 and 9, the validation section, the quality gate, the report template) remains. By the user's direction it was left as is, since it is comparison, not test suites. Watch the real WEB-BASELINE-REFRESH-012.

## Real ticket (read-only)

WEB-BASELINE-REFRESH-012 and remote-nodes-page (autobyteus-267) were opened at 14:05, before #98 merged at 14:44. At 15:00 their worktrees had no changes since they were opened, so there is nothing yet to compare.
