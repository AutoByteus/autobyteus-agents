# Live replay evidence: autobyteus-agents-56

AutoByteus 1.5.9-beta.2 isolated instances, 2026-10-24. Only the Project Task Manager's folder was loaded, so no delegation could reach a real worker (anti-pattern 28). Each instance held a Project seeded with copies of the 283 real AutoByteus Task files (descriptions, comments, statuses; no attachments). The board was the real backup `task-plans/board-backup-20261024.md` (302 lines, 108,051 bytes), with the test Project ID substituted. Each run was first asked to load its skill and read the board, then sent "Good morning. What's open right now, and what do you need from me today?". Old text = `origin/main` `d705e9a`.

## Big board

| Run | Model | Text | Outcome |
| --- | --- | --- | --- |
| old | Sonnet | old | Answered; no word about the board's size. A later "drop the Oct 8–13 questions" removed 13 rows; nothing else changed (105 KB). |
| old | Opus | old | Answered and offered to go through the old questions; board unchanged (108 KB). |
| v1–v6 | Sonnet | six wordings of the new bullet | Noticed every time ("302 lines and 108 KB, well past the size…"). It asked for permission (v1, v2) or promised to do it "at the next update" or "today" (v3–v6), but never started on its own. After "Yes, go ahead": a partial job (60 KB, 280 lines, long cells cut to an archive, the 140 undispatched rows left). |
| final (v6) | Opus | new | **Reorganized it on its own in the load turn:** board 9.3 KB, 78 lines, plus `board-closed.md`, `board-undispatched.md`, `board-parked.md` and a backup. It said so in one paragraph and asked once about the 13 stale questions. |
| final, earlier draft | Opus | new | Same result: 6.6 KB, 61 lines, three side files and a backup. |

Loss check on the final Opus run (python over the original and the new files, backup excluded):
- **Identifiers:** 162 Task keys, 63 run IDs, 58 long Task IDs and 5 Project IDs; **0 missing**.
- **Live board:** all 9 open dispatches, with team and coordinator IDs. The 3 keys from the open-dispatch section that are not on the live board (10, 183, 59) were mentions inside rows (a DONE note, follow-up lists), not dispatches.
- **Cross-check:** the PM checked the board against the Task system's IN_PROGRESS list.

## Small healthy board (38 lines, 2.3 KB)

| Run | Model | Text | Outcome |
| --- | --- | --- | --- |
| small | Opus | new | Not reorganized (2,270 bytes before and after). |
| small | Sonnet | new | Not reorganized; later normal updates kept it at 2.4 KB. |

## Task description shape (step 5, Sonnet, new text)

"Please create a Task for the software team, don't dispatch it yet: …"

- **First line:** a one-sentence summary ("Send button stays disabled for a few seconds after pasting a very long message into the composer").
- **Sections, in order:** Why it matters (with the user's words and date), Facts and evidence, Direction (open), Done when, Related Tasks.
- **Same result** on the earlier draft wording (comment times Task).
- **Not exercised:** fixing a vague first line on an older Task. Asked to add a note to autobyteus-68 (first line "Priority: Low (user decision, 2026-10-13)."), the PM added the comment without reading the Task, so it never saw that line.

## Data caveat

New Tasks created in the test Project restarted at key `autobyteus-1`, a key the copied Tasks already used. The PM noticed it and went on; this does not affect the points above.
