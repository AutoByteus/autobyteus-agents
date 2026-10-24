# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `agent` (change in its bundled skill)
- Target package: Project Task Manager, `agents/project-task-manager/` in `autobyteus-agents`
- Scope included: PM `SKILL.md` step 1 (the board) and step 5 (the shape of a Task description: the user's two additions of 2026-10-24, then the title-field update); `templates/board-template.md`; one line of the Creator's `live-checks.md` (finding 5).
- Scope excluded: PM `agent.md`, `agent-config.json`, the task-plan template, the Org, every other package. The live board (the PM restructures it itself at the same time).
- Request/reference: Task autobyteus-agents-56 from `/project_task_manager` (run `project_task_manager_7c8dce0c4a8b44f88e776a83809dee03`), 2026-10-24.

Baseline: worktree `/Users/normy/autobyteus_org/autobyteus-agents-worktrees/pm-board-upkeep`, branch `pm-board-upkeep` from `origin/main` `d705e9a` (includes agents-55).

## Baseline (read in full)

| File | Owns |
| --- | --- |
| PM `agent.md` | Identity; "Work like an experienced project manager who keeps a board". |
| PM `agent-config.json` | Tools include `read_file`, `write_file`, `edit_file`, `run_bash`: enough to split and archive files. |
| PM `SKILL.md` step 1 | What the board records ("what Tasks can't hold": Project, workers, non-Task waits, own questions, open copies, recent closed copies), "don't copy" dependencies, read it first, update it after each change. Nothing about its size or its upkeep. |
| PM `SKILL.md` step 5 | A Task created for later goes on the board "only when it waits for something else". |
| `templates/board-template.md` | Five tables; closed dispatches "Drop other rows once neither is likely". |
| `agent-orgs/autobyteus-org/org.md` | "keeps the boards": no structure, so no change. |

## Evidence: the real board (`task-plans/board-backup-20261024.md`, read-only copy)

| Section | Lines | Characters | Against the skill |
| --- | --- | --- | --- |
| Header (related Projects) | 9 | 1,670 | fine |
| Workers | 26 | 7,379 | one row per delivered Task with commit and test detail, plus user rules ("REMEMBERED", "RULE") and release state; the template has one row per kind of work |
| Open dispatches | 19 | 9,508 | fine in count; rows carry Task content |
| Closed dispatches | 58 | 48,123 | the template says drop rows no longer likely to be needed; rows up to 1,928 characters repeat Task outcomes |
| Deferred follow-up candidates | 24 | 4,932 | not in the template; prose |
| Questions for the user | 17 | 3,075 | some 2-3 weeks old |
| Open Tasks not yet dispatched | 143 | 32,746 | step 5 says not to list them; each is already a Task |
| Total | 302 | 108,051 | about 27k tokens read at every session start |

Each rule that applies here was already in the skill (record only what Tasks can't hold, don't list undispatched Tasks, drop old closed rows). They were broken a little at a time over two weeks. The skill says what the board holds; it never asks the PM to check whether the board still works for it, or what to do when it doesn't.

## Preserved behavior

- The board is the PM's memory between conversations: read first, updated after each create, dispatch, close and result.
- What it records: Project, workers, non-Task waits, own questions, open copies (IDs for `send_message_to`), recent closed copies (IDs for follow-ups, the latest release copy).
- The Task system holds dependencies, parts, descriptions and comments.

## Findings

| # | Area | Evidence | Owner | Impact | Change |
| --- | --- | --- | --- | --- | --- |
| 1 | Missing behavior | Step 1 states the board's contents but has no upkeep duty or trigger; the board reached 302 lines and 108 KB. | PM `SKILL.md` step 1 | Every session starts with about 27k tokens of reading; long rows make edits error-prone; the board and the Tasks drift apart. | One bullet in step 1: the board is an index, one short line per live item, and the Tasks hold the content. When the board is slow to read or edit (a size given as an example), reorganize it at a natural moment: move closed and parked material to files beside it with a pointer, drop what a Task already holds, and ask once about stale waits. Back up first, check that no live item is lost, and tell the user in one line. No permission needed. |
| 2 | Template | Closed dispatches: "Drop other rows once neither is likely" gives no home for history the PM wants to keep. | `board-template.md` | The PM keeps everything on the live board instead. | Point older rows to an archive file beside the board. One phrase. |
| 3 | Other places | `org.md` "keeps the boards"; `agent.md` "keeps a board"; config tools are enough. | — | None. | No change. |

Alternatives considered: a fixed archive layout or strict limits (a hard line cap, required files). Rejected under anti-pattern 7: the user's point is that the PM grows the structure itself as the board needs, so the skill gives the purpose, a size as an observable trigger, and the safeguards.

| 4 | Step 5 (the user's additions) | Lists and search show only a Task's first line, or its title once autobyteus-260 ships; descriptions had no fixed shape (the real 275 description opens with a heading-like phrase; autobyteus-68 opens "Priority: Low (user decision, 2026-10-13)."). | PM `SKILL.md` step 5 | Lists cannot be scanned, and parts of a brief get dropped. | Revise the existing briefing sentence: a short title (the title field when the tools have one, otherwise line 1); then labelled sections in the user's order. One sentence instead of a template (`task-template.md`): the list of parts is short, and a template would be a second file for the same rule. |
| 5 | Creator guide | `live-checks.md` said "Use a capable model for the role under test". Here, the PM's real model (Sonnet) and a stronger one (Opus) behaved differently on the same text. | Creator `live-checks.md` | A check on another model can pass while the real role does not follow the rule. | Run the role on its real model; use one run on a stronger model to tell wording from model habit. |

## Planned changes

- `SKILL.md` step 1: one new bullet.
- `board-template.md`: closed-dispatches note points to an archive file.
- `SKILL.md` step 5: the briefing sentence gets the title and the section order.
- Creator `live-checks.md`: the model line.

## Open questions and approvals

None; the direction is the user's, in the Task.

## Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Board measured | Done | Section sizes above (python over the backup). |
| Runtime | Done | [live-replay-evidence.md](live-replay-evidence.md) |
