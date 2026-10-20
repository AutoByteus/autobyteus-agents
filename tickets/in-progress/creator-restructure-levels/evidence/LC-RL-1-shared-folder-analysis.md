# Agent Package Analysis: Code Reviewer records follow-ups instead of sending them

- Status: `Design Impact` (the requested change cannot be contained to the Code Reviewer package; see Finding 2 and Open questions)
- Operation: `analyze` (analysis step only; no package file changed)
- Package type: `agent` (`code_reviewer`, team-local in `agent-teams/software-engineering-team`)
- Target package: `/tmp/sfr/agent-teams/software-engineering-team/agents/code-reviewer`
- Repository state read: `/tmp/sfr` on branch `se-followup-recipient` at `488aa2b`; after `git fetch origin`, `HEAD..origin/main` is 0 commits, so the checkout is current. The only untracked paths are this ticket folder and the earlier one below. Re-verified on a fresh full read, 2026-10-20.
- Review criteria: the installed creator skill at `/tmp/crl/agents/agent-package-creator` (symlinked into the session). It is ahead of this repo's committed copy at `agents/agent-package-creator` by one section of `package-design-principles.md` ("Restructure at the right level"); the anti-patterns file is identical in both. The findings below do not depend on that section.
- Scope included: the Code Reviewer's `agent.md`, `agent-config.json`, skill, both report templates, the revision-record template, its four symlinked shared references, the containing team files, and every other role's text that states where follow-ups are recorded or sent
- Files read in full:
  - `agents/code-reviewer/agent.md`, `agents/code-reviewer/agent-config.json`
  - `agents/code-reviewer/skills/code-reviewer/SKILL.md`
  - `.../templates/code-review-report-template.md`, `.../templates/api-e2e-test-review-report-template.md`, `.../templates/code-review-revision-record-template.md`
  - `shared/ticket-scope.md`, `shared/handoff-references.md` (both symlinked into the skill's `references/`)
  - `team.md`, `team-config.json` (coordinator `solution_designer`, 6 members, 18 handoffs)
  - `shared/design-examples.md` Example 11 (lines 1060–1127); `shared/design-principles.md` lines 165–175, 480–485
  - `agents/solution-designer/skills/solution-designer/SKILL.md` Finalized Delivery Receipt (lines 365–392) and line 120; `templates/requirements-doc-template.md`, `templates/design-spec-template.md` (Change Scope, Removal plan)
  - `agents/implementation-engineer/.../SKILL.md` lines 88–97 and `implementation-handoff-template.md` lines 75–81; `agents/api-e2e-engineer/.../SKILL.md` line 31; `agents/architecture-reviewer/.../design-review-report-template.md` line 232
  - `/tmp/sfr/tickets/in-progress/se-followup-recipient/agent-package-analysis.md` (untracked earlier team-level analysis of this same change)
- Scope excluded: no edits of any kind; the Solution Designer, API/E2E, Implementation and shared files are read for dependency, not changed here. The team-wide design is not restated — the earlier analysis above owns it; this file covers only the Code Reviewer's slice and what that slice depends on.
- Request/reference: user, 2026-10-20 — "the code reviewer should stop sending follow-ups itself. It should add each follow-up as a row in the ticket's `follow-ups.md` and cite the row's ID in its report; the Solution Designer sends them when the ticket ends."

## Baseline

| File | Current responsibility |
| --- | --- |
| `agent.md` | Identity, the review invariant, revision-record reminder, tone. Says nothing about follow-ups. |
| `agent-config.json` | 12 tools + `skillNames: ["code-reviewer"]`. `list_available_agents` exists only for the follow-up send (skill line 219). |
| `skills/code-reviewer/SKILL.md` | Three review entry points; Ticket Scope section decides this ticket / prerequisite / follow-up / requirement gap and **records the follow-up in its own report and sends it out of the team** (lines 130–134, 202, 217–224, 284, 291, 305). |
| `templates/code-review-report-template.md` | Follow-ups table (5 columns) + "Sent to (address and message reference) / No Task manager found / None" line (309–317); line 307 routes out-of-scope findings there. |
| `templates/api-e2e-test-review-report-template.md` | A second, identical Follow-ups table + "Sent to" line (85–91). |
| `templates/code-review-revision-record-template.md` | Per-round review history. No follow-up field. |
| `references/ticket-scope.md` (symlink to `shared/`) | Defines the four kinds; for Follow-up says "Recorded with its evidence and **sent to the agent that manages the project's Tasks** … when the role's work ends". |
| `references/handoff-references.md` (symlink) | What a handoff carries. Unaffected. |
| `team.md` line 69 | "a follow-up for the agent that manages the project's Tasks". |
| Solution Designer `SKILL.md` 379–386 | On a verified `Delivery Completed`, sweeps design spec Change Scope, design review out-of-scope recommendations and the implementation handoff, and sends those; "The code reviewer's report records the ones **it sent**." |

## Map: how a Code Reviewer follow-up flows today

Found → promoted by the candidate gate → judged with `ticket-scope.md` → written into the Follow-ups table of whichever of its **two** reports it is in → sent by the reviewer, in one message, to "Requested by" from the requirements doc, or to an agent it discovers with `list_available_agents`, or kept in the report when it finds none → the address and message reference are written back into the same table's "Sent to" line → the Solution Designer's end-of-ticket sweep deliberately skips these ("records the ones it sent").

So the Code Reviewer today is the second sender, the only one that guesses a recipient, and the only one whose records are excluded from the end-of-ticket sweep. The request removes exactly that. The direction is right and matches anti-patterns 4 and 24 (one home, one sender).

### Alternatives considered

- **Leave the rows in the two reports and widen the Solution Designer's sweep to read them** (no new file). Rejected: it keeps six homes for one kind of record, so the sender and any later reader must know all of them and merge them, which is the scattered-collection case in anti-pattern 4. It also leaves the duplicate five-column table in both templates.
- **Keep the reviewer as sender but take the address from "Requested by" only** (drop `list_available_agents`). Rejected: two senders remain, mid-ticket sends cannot be grouped with the rest, and a reviewer `Fail` still sends follow-ups for work the ticket may later change.
- **Recommended:** one home (`follow-ups.md`, row defined in `shared/ticket-scope.md`) and one sender (the Solution Designer, when the ticket leaves the team) — the request as stated.

## Preserved behavior

- What counts as a follow-up versus this ticket, prerequisite or Requirement Gap: unchanged (`ticket-scope.md`, Example 11).
- A follow-up never fails a review, lowers a score or reopens implementation (SKILL 202–204; both templates).
- Each follow-up still carries what is wrong and where, evidence, why it is outside this ticket, and a suggested Task description — those five fields move to the row, they are not dropped.
- Prerequisites keep their immediate route (`Requirement Gap` to `/solution_designer`, named a prerequisite).
- The three entry points, the gates, the scorecard, the revision record, and all 18 configured team routes stay as they are. The reviewer keeps `send_message_to` and `get_handoff_rules` for team handoffs.
- The reviewer stays a reviewer: it records, it does not fix.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership | SKILL 217–224 sends; 130–134, 202, 284, 291, 305 repeat that sending in five more places | `skills/code-reviewer/SKILL.md` | Two senders for one kind of record; one of them guesses the recipient (anti-pattern 4, 12) | Remove the send; the reviewer adds a row to `follow-ups.md` and cites `FU-*` IDs. State it once in Ticket Scope and make the other five lines point there. |
| 2 | Structure and ownership | Solution Designer SKILL 379–386 sweeps three documents, skips the reviewer's, and runs only on a verified `Delivery Completed`; `ticket-scope.md` line 12 and `team.md` line 69 still say the finder sends | Files **outside** this package | A Code-Reviewer-only edit leaves follow-ups in a file nobody sends, and loses them entirely when a ticket ends `Blocked` (anti-pattern 2) | Do not ship this as a Code-Reviewer-only change. `shared/ticket-scope.md` must own `follow-ups.md` and its row; the Solution Designer must read that file on any result that leaves the team. Needs the user's decision (Open questions). |
| 3 | Structure and ownership | Two identical Follow-ups tables, `code-review-report-template.md` 309–317 and `api-e2e-test-review-report-template.md` 85–91 | both templates | The reviewer alone keeps two homes for one kind of record; the row definition would be duplicated a third time next to `ticket-scope.md` | Replace each table and its "Sent to" line with one line: `Follow-ups: <FU-* IDs added by this review, or None>`. Define the row only in `shared/ticket-scope.md`. |
| 4 | Content flow | SKILL 284 ("send a follow-up request … and return the package to the API/E2E owner") and API/E2E SKILL 31 ("with the follow-up reference the reviewer sent") | `SKILL.md` + API/E2E skill | The pre-existing-failure path reads as a send on both sides; after the change the reviewer has no message to reference | Reviewer adds the row and gives API/E2E the `FU-*` ID; the API/E2E line must change in the same update (cross-file, outside this package). |
| 5 | Grounding / tools | `agent-config.json` line 14; `list_available_agents` is used by no other step (grep: single hit in the skill, line 219) | `agent-config.json` | A tool with no remaining action (anti-pattern 21) | Remove `list_available_agents`. Keep the other 11 tools. |
| 6 | Content flow | SKILL 133–134 orders "record follow-ups and send the follow-up request" inside the scoring step; 305 carves out "follow-up requests … are not team handoffs" | `SKILL.md` | After the change the handoff section needs no follow-up exception at all; leaving it invites a send | Cut the exception from Handoff Rules; in step 7 keep only "record follow-ups (Ticket Scope)". |
| 7 | Clarity | Example 11, `design-examples.md` 1086–1087 and 1120 ("sends the follow-up request", "sends the rest as follow-up requests") | `shared/design-examples.md` | The worked example the reviewer is told to consult would contradict its skill — a standard the reviewer reads, stating the old behavior (anti-patterns 4, 22) | Update both lines with the same change: records a row in `follow-ups.md`; the Solution Designer sends them when the ticket ends. |
| 8 | Economy | `agent.md` says nothing about follow-ups | `agent.md` | No change needed; adding a follow-up rule here would be a fourth copy | Leave `agent.md` unchanged. |
| 9 | Economy | `code-review-report-template.md` 129 already has a `Scope, if promoted` column whose value can be `Follow-up` | `templates/code-review-report-template.md` | The ID can be cited in the row that promoted the finding, so the report needs no second place at all | Write the `FU-*` ID in that column (`Follow-up FU-003`). The separate `Follow-ups:` ID line is then only needed in `api-e2e-test-review-report-template.md`, which has no candidate table. Confirm with Open question 2. |

## Recommended changes (left unapplied)

Within this package, once Finding 2 is resolved:

- `skills/code-reviewer/SKILL.md`: rewrite the Ticket Scope Follow-up bullet as "add a row to the ticket's `follow-ups.md` (`shared/ticket-scope.md` defines the file and the row) and cite its `FU-*` ID in your report"; delete the send paragraph (217–224); trim step 7, line 284, line 291 and the Handoff Rules exception (305) to point at that bullet.
- `templates/code-review-report-template.md` and `templates/api-e2e-test-review-report-template.md`: Follow-ups table + "Sent to" line → one `Follow-ups:` ID line each; update the pointer at 307 and 81.
- `agent-config.json`: drop `list_available_agents`.
- Unchanged: `agent.md`, the revision-record template, `handoff-references.md`.

Outside this package, required for the change to work (owners, not edits proposed here): `shared/ticket-scope.md` (own `follow-ups.md` and the row), Solution Designer skill step 3 (read that file on any result leaving the team, fill `Sent`), `shared/design-examples.md` Example 11, `team.md` line 69, API/E2E skill line 31. The earlier analysis at `/tmp/sfr/tickets/in-progress/se-followup-recipient/agent-package-analysis.md` already designs this and adds homes for API/E2E and Delivery; it should be the single design of record rather than a second plan.

## Open questions and approvals

1. **Scope decision (blocking).** Apply the Code Reviewer's slice together with `shared/ticket-scope.md`, the Solution Designer and the three stale lines as one update (recommended — the smallest *coherent* delta), or stage the Code Reviewer alone and accept that follow-ups sit unsent until the rest lands? Analysis-only was requested, so no edit is made either way.
2. **Row fields.** Confirm the row is: ID; found by (role, document); what and where; evidence; why outside this ticket; urgent; suggested Task description; sent (to, date) — as the earlier analysis proposes. The reviewer's five columns map into it with nothing lost.
3. **`follow-ups.md` lifecycle.** Confirm it is a ticket-folder document committed with the ticket like the others (`shared/evidence-files.md` convention) and moved to `tickets/done/` by Delivery.
4. Not approved to commit, branch or open a pull request.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Checkout current with remote | `Pass` | `git fetch`; `HEAD` = `origin/main` = `488aa2b`; `HEAD..origin/main` = 0 commits |
| Every place a follow-up is recorded or sent | `Pass` | Repo-wide grep for `follow-up`, `Requested by`, `list_available_agents`: 6 recording homes, 2 senders (see Map) |
| `agent-config.json` parses; tools trace to skill steps | `Fail` for one tool | `python3 json.load` parses; `list_available_agents` traces only to SKILL 219 (Finding 5) |
| Symlinked references readable by path | `Pass` | `find -type l` lists 4 for this skill; all resolve into `shared/`; skill line 81 already carries the symlink hint |
| Team routes unaffected | `Pass` | `team-config.json`: coordinator `solution_designer` in roster, 18 handoffs, none about follow-ups |
| Every handed-off outcome has a destination | `Fail` | Follow-ups would have no sender in the standalone team after a Code-Reviewer-only edit (Finding 2) |
| Live run in an isolated app | `Not run` | Analysis step only; the earlier analysis's three-step scenario should run on the final text |
| Anti-pattern 24 detection (map before judging; an alternative named) | `Pass` | Map section precedes the proposal; three options compared under Alternatives considered |
| Anti-pattern 4 detection (homes per kind of record, after the change) | `Pass` | One home, one sender, provided Finding 2's out-of-package owners change in the same update; a Code-Reviewer-only edit scores `Fail` |

## Next action

Decide Open question 1 (and confirm 2–3), then request an `update`. If the answer is the single coherent change, that update's target is the team package, with this file covering the Code Reviewer's share; the earlier `se-followup-recipient` analysis stays the design of record. Verify afterwards with the three-step live run on the final text.

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: see the reply to the caller
- Caller return: `Yes` — analysis returned with the main points, package unchanged
