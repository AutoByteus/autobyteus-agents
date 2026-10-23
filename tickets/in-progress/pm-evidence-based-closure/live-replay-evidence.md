# Live replay evidence: autobyteus-agents-55

AutoByteus 1.5.9-beta.2 isolated instances, Project Task Manager on `claude_agent_sdk`, model `sonnet` (Sonnet 5.5, the real PM's model), 2026-10-23. Old text = `origin/main` `a8a09f3`; new text = this branch. Seed: a Project with the real autobyteus-275 description as `autobyteus-1` ("Done when: … the user's check; finalized on personal"), a board listing its dispatch, and a workspace cloned from the superrepo at `origin/personal` (`27f2d2f72d`). Run traces were kept under `/tmp/pm55/evidence/` during the check and removed afterwards; the excerpts below are what was observed.

## A. Replay of the real 275 terminal message (the Solution Designer's message, sent unchanged apart from the key)

| Run | Text | Skill loaded | Checks it ran | Outcome |
| --- | --- | --- | --- | --- |
| A-old | old | yes | board; `git merge-base --is-ancestor 0aa51d622c origin/personal` | **Kept the Task open:** "it's still open. I'm waiting for your OK to close it … Should I close autobyteus-1 now, or after your verdict?" (reproduces the real miss) |
| A-new | new (final step 5/7 wording) | yes | board; fetch; merge-base; tag `v1.5.9-beta.2` local and on origin | **Closed DONE**, "Evidence for closing autobyteus-1: …"; "You said you're already running the latest beta, which covers the open user check"; said what it did not check itself. |
| A2-new | new | **no** (no skill call, no tool calls) | none | Held it open. Not a test of the text: it never opened the skill. |
| A3-new | new, skill loaded first ("load your skill and read your board") | yes | board; fetch; merge-base; tag; `git worktree list`; **read the receipt** | **Closed DONE**: "I checked the evidence myself: … The Solution Designer's receipt check passes. You said you are running the latest beta, which is enough for me. If you see a problem with it, tell me and I'll reopen the Task. Your verdict is not holding it open." |

## B. Creating a new Task (does done carry "the user's check"?)

"Please create a Task for the software team, don't dispatch it yet: on the Task page, the comment times show in UTC…"

- Old: done = displayed in local time, "finalized on the base branch … No release requested." No user check.
- New: done = local time, tests and docs, "finalized on the base branch. A release is not part of done." No user check.

Fresh sessions do not reproduce the long-session habit of writing the user's check into done; the new step 5 sentence does not regress.

## C. Moving a Task to another worker

Board: open `autobyteus-N` with a stopped Creator copy; closed `autobyteus-2` (SE design principles) done by Creator copy `agent_package_creator_77b1…` (placeholder ID, so a delegation to it is refused, not run).

| Run | Text | User's words | First delegation |
| --- | --- | --- | --- |
| C-old, C-new (first runs) | old / draft | "delegate it to a **new** agent package creator" (the real words) | `recipient_address: /agent_package_creator` in both; the user asked for a new copy, which step 4 treats as his decision |
| C4-new | draft "the board's copy that did related work" | "give it to **another** agent package creator" | `recipient_address` (did not count a different package Task as related) |
| C5-new | final "a copy on your board that did that kind of work" | "another" | **`target_agent_run_id: agent_package_creator_77b1…`** first; then the address after the refusal |
| C6-old | old | "another" | `recipient_address` |

## Incident during the check

The first runs held the whole package. In C, both PMs delegated for real and two Creator copies started on the seeded Task; one committed to a new branch `pm-dropped-followup-row` in a worktree of the agents repo (under `/tmp/pm55`) and started a third isolated instance. Nothing was pushed and no PR was opened. The copies were stopped by stopping their instances; the branch and the two worktrees were removed. Later runs loaded only the PM's folder. Recorded as anti-pattern 28.
