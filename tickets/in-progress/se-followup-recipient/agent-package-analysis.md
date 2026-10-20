# Agent Package Analysis: one home and one sender for follow-ups

- Status: `Completed` (wording proposed to the user; no package file changed yet)
- Operation: `update` (update intent: `fix` — follow-ups went untracked)
- Package type: `team` (`agent-teams/software-engineering-team`)
- Target package: worktree `/tmp/sfr`, branch `se-followup-recipient`, from `origin/main` at `488aa2b`
- Files read in full:
  - `team.md`, `shared/ticket-scope.md`, `shared/evidence-files.md`;
  - `solution-designer/SKILL.md`, `requirements-doc-template.md`;
  - `code-reviewer/SKILL.md`.
- Sections read, every place a follow-up is recorded:
  - design spec template: Change Scope, Removal plan;
  - design review template: scope status, Residual Risks;
  - implementation handoff template: Legacy check;
  - implementation engineer skill: lines 88–97;
  - both code review templates: Follow-ups;
  - API/E2E skill: line 31;
  - Example 11 in `shared/design-examples.md`.
- Search: every role's skill, template and config for follow-ups, "Requested by" and `list_available_agents`.
- Request/reference:
  - Task autobyteus-agents-34 (the PM, 2026-10-20). Cause: on autobyteus-197, F-1 (autobyteus-205) and the Settings copy-name issue (autobyteus-208) went untracked until the user asked.
  - The user, 2026-10-20: one sender, the Solution Designer, when the ticket ends; and "one kind of record needs one home".
- Revised from the first version, which proposed a "Follow-up Tasks go to" field. That version judged only the fix the Task proposed (anti-pattern 24, added after this).

## Map: follow-ups today

| Where recorded | Shape | Sent by |
| --- | --- | --- |
| Design spec, Change Scope "Follow-ups" line | prose list | Solution Designer, at the delivery receipt |
| Design spec, Removal plan rows with scope `Follow-up` | table rows | (in Change Scope) |
| Design review, `Out-of-Scope Recommendation` under residual risks | prose | Solution Designer, at the delivery receipt |
| Implementation handoff, "Dead code found elsewhere" and size lines | prose | Solution Designer, at the delivery receipt |
| Code review report, Follow-ups table | table | Code Reviewer, after each review (`Requested by`, else a guess via `list_available_agents`) |
| API/E2E test review report, Follow-ups table | table | Code Reviewer; **not** in the Solution Designer's sweep |
| API/E2E execution report, case Notes | reference to the reviewer's follow-up | – |
| API/E2E and Delivery, anything else they notice | **nowhere** (no `ticket-scope.md` link) | – |

Problems found:

- **F1:** one kind of record has six homes in four shapes, and the reader must know and merge them all.
- **F2:** two senders, one of which guesses the recipient.
- **F3:** the Solution Designer's sweep misses the test review report.
- **F4:** the sweep runs only on the `Terminal` path, so a ticket that ends `Blocked` loses its follow-ups.
- **F5:** API/E2E and Delivery have no place to record follow-ups.

## Design

- **One home:** `follow-ups.md` in the ticket folder. The file and its row are defined once, in `shared/ticket-scope.md`. Whoever finds a follow-up adds a row (creating the file if needed) and cites its `FU-*` ID in its own document instead of describing it again. The file is committed with the ticket like other documents.
- **Row:** ID; found by (role, document); what is wrong and where; evidence; why it is outside this ticket; urgent; suggested Task description; sent (to, date).
- **One sender:** the Solution Designer, the team's entry point, which knows "Requested by".
  - When a result leaves the team (`Terminal`, or `Blocked` returned to the user or caller), it sends every unsent row in one message to "Requested by", with the file attached, and fills in Sent.
  - When the user asked directly, the follow-ups go to the user with the result.
  - Urgent rows come first in the message; there is no separate early send, pending the user's answer.
- **No new requirements field.** The sender is now always the agent that received the request, so "Requested by" is the right address. Prerequisites are unchanged and still sent at once.

## Old → new map (so nothing is lost)

| Old | New |
| --- | --- |
| Change Scope "Follow-ups:" prose | Change Scope cites FU IDs; the rows live in `follow-ups.md` |
| Removal plan scope `Follow-up` | That item is a follow-up row; the Removal plan keeps only this change's removals |
| Design review `Out-of-Scope Recommendation` | A problem that should be a Task is a follow-up row; a risk that needs no Task stays in Residual Risks |
| Implementation handoff dead-code and size lines | FU IDs |
| Code review Follow-ups tables (both templates) and "Sent to" line | "Follow-ups: FU IDs added by this review, or None" |
| Code reviewer sends; `list_available_agents` fallback | Records only; tool removed from config |
| Solution Designer sweep of three documents, Terminal only | Reads `follow-ups.md` on any result that leaves the team |
| API/E2E case Notes "follow-up reference the reviewer sent" | The FU ID |
| API/E2E and Delivery: no place | Add rows (link `ticket-scope.md` from both) |
| `team.md`, `ticket-scope.md` Follow-up row, Example 11 "sends the follow-up request" | "added to `follow-ups.md`; the Solution Designer sends them when the ticket leaves the team" |

## Preserved behavior

- What is a follow-up versus this ticket or a prerequisite: unchanged.
- Each follow-up still carries what, where, evidence, why outside, and a suggested Task.
- Follow-ups never fail a review or reopen work.
- Prerequisites: unchanged (sent at once by the Solution Designer to "Requested by").
- Handoff rules and routes: unchanged. Follow-ups leave the team only through the Solution Designer.

## Repository check for the new anti-pattern 4 test (one kind of record in several documents)

- `Residual Risks` appears in two reports (design review and one other). It is a candidate to look at, not a defect: no single reader is known to need them together.
- Revision records exist per role. Each is its own role's history, read by that role, so they are not a scattered collection.

## Real-use check plan (after the user approves the wording)

Isolated app, the Software Engineering Team, a tiny prepared ticket.

1. The code reviewer reviews it and finds a follow-up. Expected: a row in `follow-ups.md`, the ID cited in its report, and no message outside the team.
2. The Solution Designer receives "Delivery Completed". Expected: one message to "Requested by" (a stand-in agent) with the file, and Sent filled in.
3. Same, with the user asking directly. Expected: the follow-ups in its result to the user.
