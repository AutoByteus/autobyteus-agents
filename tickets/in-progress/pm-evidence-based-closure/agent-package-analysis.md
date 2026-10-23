# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `agent` (change in its bundled skill `project-task-management`, plus one phrase in the containing Org summary)
- Target package: Project Task Manager, `agents/project-task-manager/` in `autobyteus-agents`
- Scope included: PM `SKILL.md` step 5 (what goes into done), step 7 (checking a result, moving a Task), step 6 (follow-up to the same copy) and the matching scenario row; `agent-orgs/autobyteus-org/org.md` step 3 phrase.
- Scope excluded: PM `agent.md`, `agent-config.json` (the user's local edit stays untouched), templates; all Software Engineering Team files (reviewed, no change, see finding 4).
- Request/reference: Task autobyteus-agents-55 from `/project_task_manager` (run `project_task_manager_7c8dce0c4a8b44f88e776a83809dee03`), 2026-10-23, plus its later message (reuse a related copy when moving a Task). Handover of the first copy: `task-plans/handover-agents-55*` in the main checkout.

Baseline: worktree `/Users/normy/autobyteus_org/autobyteus-agents-worktrees/pm-evidence-based-closure`, branch `pm-evidence-based-closure` from `origin/main` `a8a09f3`.

## Baseline (read in full)

| File | Owns |
| --- | --- |
| PM `agent.md`, `agent-config.json` | Identity, tools (`read_file`, `run_bash`, Task tools…), skill attachment. |
| PM `SKILL.md` | Board, reads, paths, Task creation (step 5 defines done), dispatch (step 6), tracking and closing (step 7). |
| PM `templates/board-template.md`, `task-plan-template.md` | Board and plan formats; no user-check field. |
| `agent-orgs/autobyteus-org/org.md`, `org-config.json` | Org members and routes; step 3 says the PM checks "the done criteria and the user's checks". |
| SD `SKILL.md` "Finalized Delivery Receipt" (l.392-416), `requirements-engineering.md`, `requirements-doc-template.md` | SD turns the Task's done into ACs; a user check the Task did not ask for is "not an open item". |
| Delivery `SKILL.md` (l.15-30, 95-126, 171), `release-deployment-report-template.md` | Verification from evidence; a user check only when unreachable after API/E2E tried, or when the user asked. |
| API/E2E `SKILL.md` (l.156-166, 213-217), coverage report template | "Only the user can check" only after deeper tests, real surface, emulation. |

The rest of the SE Team package was not changed and not needed for the decision; its rules on user checks were located by searching every SE file for "user's check", "user check", "user-only", "only the user", "user verification" and reading each hit in context.

## How the incident happened (traced from the PM's own trace and files)

| Step | Evidence | What went wrong |
| --- | --- | --- |
| 1. PM writes the Task | autobyteus-275 `task.json`, "Done when: … tests; docs; **the user's check**; finalized on personal" (written 2026-10-22). | Step 5 already says to write the user's check into done "only when the user asked for it for that Task"; the PM wrote it anyway. Same pattern in 261: AC-408 cites "The user's two-node check (the Task's 'Done when')" (`tickets/done/remote-discovery/requirements-doc.md:83`). |
| 2. SD turns it into an AC and reports it | 275 terminal message: "The user's check is on the beta … their verdict is the open item before you close the Task." 261/267 receipts: "AC-408 / AC-506 … is open with the user". | The SD followed the Task: its rule frees only checks "the Task did not ask for". Worker side behaved as written. |
| 3. PM holds the Task open | PM trace `raw_traces_active.jsonl` #13: "It stays open until you check it on the beta and tell me it works", after it had itself verified merge and release. | Step 7 says "do not wait for … the user's in-app check unless the user asked for it", but the Task listed it, and the rule names no positive duty to check the behaviour itself. Earlier reports also kept "Your three open checks (AC-408, AC-506, AC-605)" in every status message. |
| 4. PM explains | #34: quotes "if only the user's check remains, keep the Task open and ask for it". | That sentence was removed on 2026-10-20 (`5a9e537`); the PM (Sonnet, one session since 2026-10-08, compacted from 967k tokens) quoted the old habit. The current text frames the user's check as a legitimate done item "when the user asked", which keeps the habit alive. |

## Preserved behavior

- The PM plans and tracks; it does not do Task work. Verification stays read-only.
- Done for software = finalized on the base branch, merged, verified, cleaned up, follow-ups recorded; a release is a separate decision written into done only when the user asked.
- Close without asking permission; close only after cleanup; reply to the sender only when asked; follow up with the same copy when done is not met.
- Decisions that really need the user stay with the user.

## Findings

| # | Area | Evidence | Owner | Impact | Change |
| --- | --- | --- | --- | --- | --- |
| 1 | Flow, source of the chain | Step 5 l.55 keeps "the user's own check in the app" as a done item when asked; the PM writes it in by habit (275, 261). | PM `SKILL.md` step 5 | The team turns it into an AC and reports it as open; the PM then waits. | Release stays a separate decision; say plainly that the team's evidence and the PM's own check verify the work, so the user's check does not go into done. |
| 2 | Missing positive duty | Step 7 l.78 lists cheap claim checks (merge, cleanup, release) and a "do not wait" prohibition; nothing says the PM checks the behaviour and the test evidence itself, reports what it used, or what to do with a user check the Task or a worker names. | PM `SKILL.md` step 7 | The PM passes the verification to the user. | Replace the bullet's check sentences: read the receipt and test report, verify with read-only checks (git, releases/images, a read-only call showing the new behaviour); a user check named by the Task, worker or AC is the PM's when evidence settles it; "I run it" is enough; ask only what needs the user, once, naming what to look at; a check only he can do does not hold a finished Task open; state the evidence used when closing. |
| 3 | Consistency | `org.md` l.39-40 "the done criteria and the user's checks". | Org `org.md` | Repeats the old default at Org level. | "the done criteria and the delivery evidence". |
| 4 | Worker side | SD receipt rule, Delivery l.97-116 and API/E2E l.215 already make a user check exceptional and evidence-first, except where the Task asked for it. | SE Team skills | None once the PM stops writing it into done (finding 1). | No change. Note only: SD l.392 lists "explicit user verification" among Delivery's duties, older wording than Delivery's own "verification from the evidence"; harmless, left for a later SD tidy-up. |
| 5 | Copy choice when moving a Task (PM's second message) | Step 7 l.84 "delegate it to the new worker (an existing copy by its ID when it already knows the work)"; the PM picked a new Creator copy though the agents-53 copy existed. | PM `SKILL.md` step 7 | Context lost, extra copy. | Say: delegate it by its ID to a copy on the board that did that kind of work; a new copy only when none fits or the user asks for one. (A first draft said "related work"; the replay showed the PM did not count another package Task as related.) |
| 6 | Stale after autobyteus-275 (released v1.5.9-beta.2, the user runs it) | Step 6 l.69 "works only when … its earlier Task is DONE or CANCELLED … close the earlier Task first"; l.86 "a copy has one current Task"; l.76 matches reports by run ID only. The tool's own description now: "its other open Tasks stay open, and it is freed when its last Task is closed". | PM `SKILL.md` steps 6-7 | The PM would close a Task early or start a new copy to free a related one (finding 5), and could match a report to the wrong one of a copy's Tasks. | Drop the DONE/CANCELLED condition and "one current Task"; match a report by the Task key it names, else the run ID. Minimal, needed for finding 5. |

Alternative considered: a new "Verifying a result" section or a worker-side rule forbidding user-check ACs. Rejected: the chain starts at the PM's own done wording, and the worker rules already defer to the Task; one owner (PM) is enough.

## Planned changes

- PM `SKILL.md`: step 5 one sentence; step 6 follow-up bullet clause; step 7 report matching, check bullet, move bullet, prerequisite clause; scenario row "Worker reports done".
- `org.md`: one phrase.

## Open questions and approvals

None. The Task carries the user's direction; the PM's message adds the move rule.

## Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Incident traced | Done | PM trace `…/project_task_manager_7c8dce0c…/raw_traces_000004.jsonl` #1715, `raw_traces_active.jsonl` #9-#34; 275 `task.json`; 261/267 receipts. |
| Rule history | Done | `git log -S"only the user's check remains"`: added `53dd5bc` (10-09), removed `5a9e537` (10-20). |
| Runtime | Done | [live-replay-evidence.md](live-replay-evidence.md): old text holds 275 open, new text closes it with evidence; move scenario picks the same-kind copy by ID. |
