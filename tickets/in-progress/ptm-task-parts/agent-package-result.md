# Agent Package Creation Result

- Status: `Completed`
- Operation: `update` (update intent: `extend`)
- Package type: `agent` (`agents/project-task-manager`)
- Analysis: [agent-package-analysis.md](agent-package-analysis.md)
- Request/reference:
  - Task autobyteus-agents-32 (the PM, 2026-10-20);
  - the user, 2026-10-20: include prerequisite requests; keep the skill to general practice that a capable model reasons from, with exact steps only where there is one safe way.

## Summary

The Project Task Manager now uses "part of" and handles the end-of-ticket follow-up message and prerequisite requests.

- **A goal in slices:** a parent Task (not dispatched) with parts (`part_of`). Order stays in `depends_on`. Follow-ups never become parts of a closing Task.
- **Close a parent last:** each part closes on its own checked result. Observed in 1.5.7-beta.4: closing a parent as DONE marks its open parts DONE, and CANCELLED cancels them; `closedParts` lists them.
- **The user's rules:**
  - ask before closing a Task whose copy the user may still be talking to; when the user asks, close and say what it stops;
  - a release goes as a follow-up to the copy that cut the latest beta.
- **Follow-ups from a finished ticket:** none lost (each ends up in a Task; a dropped one is a CANCELLED Task with the reason); urgent ones go to the user at once; evidence is copied out of worktrees; reply only if asked.
- **Prerequisite requests:** a new Task the waiting Task depends on, dispatched with approval, preferably to the same Solution Designer.
- **Templates:** the plan gets a "Part of" column; the board keeps the latest release copy's row; parts are not copied to the board.
- **Tools:** no change; the existing tools carry the fields.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator, links | Pass | `quick_validate.py` valid; `check-links.py`: 0 broken |
| Tool grounding | Pass | `evidence/PROBE-1`, `PROBE-2` (the PM's own tools, isolated 1.5.7-beta.4) |
| LC-PT-1–3 (parts) | Pass | Planned a parent and three parts with a → b → c; created them with `part_of` and `depends_on`, nothing dispatched; on "close the goal", closed the parts (DONE, DONE, CANCELLED) then the parent, so `closedParts` was empty; the board did not copy parts |
| LC-PT-4 (follow-ups, first text) | Pass | Urgent first; a duplicate extended the existing Task; evidence copied out of the worktree |
| LC-PT-6 (prerequisite, final text) | Pass | Created the prerequisite Task, made the waiting Task depend on it, reasoned about one current Task per copy, asked for approval |
| LC-PT-7 (follow-ups, final text) | Pass | Both recorded, the urgent security one first; `follow-ups.md` copied out of the worktree. It also refused to close the ticket because its delivery claim did not check out. |
| Final review | Pass | Round 1: the follow-up intake was eight steps, half restating existing rules; trimmed to its purpose (the user's balance), and anti-pattern 7 gained the check (#72). Round 2: none. |

## Next expected action

The user reviews and merges. Then update the local checkout, keeping the user's `agent-config.json` edit, and report to the PM.
