# Agent Package Analysis: Project Task Manager — parts, working rules, follow-up intake

- Status: `Completed`
- Operation: `update` (update intent: `extend`)
- Package type: `agent` (`agents/project-task-manager` with `project-task-management`)
- Target package: worktree `/tmp/ptm`, branch `ptm-task-parts`, from `origin/main` at `f10f0d1`
- Files read in full: `agent.md`, `agent-config.json`, `SKILL.md`, `board-template.md`, `task-plan-template.md` (the whole package)
- Request/reference:
  - Task autobyteus-agents-32 (the PM, 2026-10-20): autobyteus-171's FU-001 ("part of", released in v1.5.6-beta.11), extended with the follow-up contract of autobyteus-agents-34 (#71);
  - the user's working rules (closing, releases);
  - the prerequisite question, which goes to the user.

## Grounding: what the tools do (observed in AutoByteus 1.5.7-beta.4, isolated instance, through the PM's own tools)

Evidence: `evidence/PROBE-1-parts-done.log`, `evidence/PROBE-2-parts-cancel-and-last-part.log`.

| Action | Observed |
| --- | --- |
| `create_task` with `part_of: "probe-1"` (and `depends_on`) | `partOf: "probe-1"`; `depends_on` between parts works |
| `list_project_tasks` | each Task shows `partOf` and `parts` (the parent lists its parts) |
| Parent → `DONE` with two open parts | returns `closedParts: [probe-2, probe-3]`, and **both parts become DONE** |
| Parent → `CANCELLED` with one part DONE, one open | `closedParts: [probe-6]`; the open part becomes CANCELLED; the DONE part stays DONE |
| Last part → DONE | the parent stays TODO |

The consequence is not in the Task's description. Closing a parent as DONE marks its unfinished parts DONE, which would bypass "DONE only after a checked result". The rule therefore is: close each part on its own checked result, and close the parent last, when it has no open parts. `closedParts` is then empty. A non-empty `closedParts` on DONE means unchecked work was marked done. Cancelling a parent cancels its open parts and stops their copies.

## Map: the information the PM keeps, and where (anti-pattern 24: map before judging the proposal)

| Kind of record | Home | Change |
| --- | --- | --- |
| Task facts: description, status, files, assignments | the Task (app) | – |
| Order between Tasks | the Task's `depends_on` | – |
| A goal's slices | the Task's `part_of` (one parent, one level) | **new**; the board and plan do not copy it beyond the plan's own table |
| Workers; waits other than Tasks; the PM's own questions; open and closed dispatches (copy IDs) | board | the closed dispatches also identify the copy that cut the latest beta, for release Tasks |
| A plan's Tasks before creation | `task-plan.md` | gains "Part of" (the parent row) |
| Follow-ups of a delegated ticket | the team's `follow-ups.md`, sent by its Solution Designer at the ticket's end | **new intake:** each becomes a Task (or extends one). A follow-up waiting on the user's decision is the PM's question on the board. One the user decides is not needed becomes a CANCELLED Task with the reason, so a later search finds it. The PM does not edit the team's file. |

## Findings and planned changes

| # | Level | Finding | Change (owner) |
| --- | --- | --- | --- |
| F1 | file | Parts are missing: when to use them versus `depends_on` or separate Tasks; creating, reading, closing. | Step 3, planned path: a goal with several slices dispatched and finished separately → a parent Task (not dispatched) and parts; `depends_on` stays for order. Step 5: `part_of` in the Task tools. Step 7: close parts on their own results and the parent last, and report `closedParts` (`SKILL.md`). Plan template: "Part of". |
| F2 | file | Following up after a close by making follow-ups parts of the closing Task would close them with it. | Step 3: parts are planned slices, not tags added later; never part of a Task about to close. |
| F3 | file | Closing stops a copy the user is still talking to (happened several times with the MCP designer's copy). | Step 7, close: ask before closing a Task whose copy the user may still be working with; when the user explicitly asks, close and say what it stops; a follow-up Task to the same copy brings it back. |
| F4 | file | Release requests: the user's rule (2026-10-19) is missing. | Step 6: a release goes as a follow-up to the team copy that cut the latest beta (closed dispatches); a new team only when that copy cannot take it. |
| F5 | file | No intake for a ticket's end-of-ticket follow-up message (#71). | Step 7: "Follow-ups from a finished ticket": each becomes a Task or extends one (one Task per outcome); urgent ones reported to the user at once; evidence that lives in a worktree attached as copies; keys returned to the sender only when asked; none lost. Common scenarios: one row. |
| F6 | file | The board text says dependencies stay on the Tasks; parts need the same note. | Board intro in `SKILL.md` step 1: "which Task depends on or is part of which is stored on the Tasks". |
| F7 | (question) | A prerequisite request from a Solution Designer (autobyteus-agents-30). | Asked the user whether to include it; wording proposed below |

Tools: no change. `create_task`, `update_task` and the list and search tools already carry `part_of`, `partOf`, `parts` and `closedParts`.

## Preserved behavior

Everything else in the skill:
- the direct and planned paths;
- approval for each dispatch;
- no double dispatch;
- follow-ups to the same copy;
- close only after cleanup;
- reopening;
- moving a Task;
- the board's tables.

## Open question for the user (F7)

Proposed wording, if included (step 7, after the follow-up intake):

> **Prerequisite requests.** A Solution Designer may stop and ask you to create a prerequisite: something outside its ticket that blocks it. Create the prerequisite's Task, add it to the waiting Task's `depends_on`, and propose dispatching it with the user's approval, to the same Solution Designer copy when it can take it. A copy has one current Task: while its ticket is open, either message it to do the prerequisite under that Task, or close and reopen as the user decides. When the prerequisite is DONE, tell the waiting copy to continue.

## Real-use check plan

Isolated app, the PM on the final text, a test Project.

1. A request with a goal and slices. Expected: a parent and parts (`part_of`), with a part's `depends_on`.
2. Closing: the parts are closed first, then the parent, and `closedParts` is reported.
3. A Solution Designer stand-in sends an end-of-ticket follow-up message with `follow-ups.md`. Expected: Tasks created, the urgent one reported first, and nothing lost.
