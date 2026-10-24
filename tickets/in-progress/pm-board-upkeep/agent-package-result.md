# Agent Package Creation Result

- Status: `Completed`, with a model limit recorded below
- Operation: `update`
- Package type: `agent`
- Update intent: `extend` (the PM keeps its board small and reorganizes it as it grows; Task descriptions get a title and a steady shape)
- Target package: Project Task Manager, `agents/project-task-manager/` (`autobyteus-agents`)
- Scope included: PM skill step 1 (one new bullet) and step 5 (one revised sentence); one phrase in `templates/board-template.md`; one line in the Creator's `live-checks.md`.
- Scope excluded: PM `agent.md` and `agent-config.json` (tools already cover file work); `org.md` ("keeps the boards" stays true); the live board.
- Request/reference: Task autobyteus-agents-56 with its two comments, and the PM's title-field update (2026-10-24).

## Summary

**Board:** the skill said what the board holds, but not that the PM keeps checking whether it still works. The new bullet in step 1:
- the board is an index, one short line per live item, and the Tasks hold the content;
- when it is slow to read or edit (for example past about 150 lines or 30 KB, or rows longer than a line), the PM reorganizes it before going on with anything else, like moving from a desk to a shelf to a library;
- it starts by moving whole sections that are history or that the Tasks already hold into files beside the board, with a pointer, then shortens long rows;
- it is the PM's own working file, so no approval: back up, check nothing live is lost, tell the user in a line;
- only stale waits go to the user, once.

The template's closed-dispatch note now moves old rows to an archive file instead of dropping them.

**Task descriptions:** the step 5 briefing sentence now asks for a short title, a one-sentence summary. It goes in the title field when the Task tools have one, otherwise on the description's first line, so the sentence is true before and after autobyteus-260. Then come short labelled sections in the user's order: why it matters, facts and evidence, direction, constraints, done when, related Tasks. I chose one sentence over a `task-template.md`: the parts are a short list, and a template would add a second file for the same rule.

## Validation

| Check | Result | Evidence |
| --- | --- | --- |
| Links | `Pass` | `check-links.py`: 0 broken. |
| Wording | `Pass` | `compare-wording.py`: 0 old requirement sentences lost. |
| Oversized board, Opus | `Pass` | Reorganized on its own: 108 KB to 9 KB, 78 lines, three side files and a backup. 0 of 162 keys, 63 run IDs, 58 long IDs and 5 Project IDs lost; all 9 open dispatches on the live board. Opus on the old text did not reorganize. |
| Oversized board, Sonnet | **Partial** | Noticed and planned it every time, across six wordings, but asked or deferred. After "go ahead" it did a partial job (60 KB). Sonnet on the old text did not even mention the size. |
| Small healthy board | `Pass` | Not reorganized, on Sonnet or Opus. |
| Task description shape | `Pass` | Sonnet: one-sentence title line, then the sections in order. Fixing a vague old first line was not exercised: the PM added a comment without reading the Task. |

Evidence: [live-replay-evidence.md](live-replay-evidence.md).

## Risks and questions

- **The real PM runs on Sonnet.** With this text it will notice an oversized board and report it, and it does the work when the user says "go ahead". It did not start alone in any of six wordings. Opus does it unprompted. Options for the user: say "tidy your board" once when the PM reports it, or run the PM on Opus.
- **The live board** is being restructured by the PM now; this change did not touch it.
- **Title field:** once autobyteus-260 ships, the sentence directs the PM to the field without another edit.
