# Agent Package Analysis

- Status: `Completed`
- Operation: `analyze` (no files changed)
- Package type: `skill` ×2
- Target package: `agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/SKILL.md` §2; `agents/project-task-manager/skills/project-task-management/SKILL.md` §7 and scenario table; board template. All at `origin/main` `ec90c33`.
- Scope included: both rules, the board's "Pending user decisions", and what the AutoByteus web app shows for a waiting run (`autobyteus-web` in the superrepo at `92de64600`).
- Scope excluded: changing the app.
- Request/reference: Project Task `project_task_f3f4b283-…` (user, 2026-10-12: "Why does the solution designer always send you the message? … And then you are telling me.")

## Baseline

| Location | Current text |
| --- | --- |
| SD SKILL §2, lines 149–151 | "When you are waiting for the user, tell the delegator in one line, so it can let the user know; the user may not be watching your conversation." The notice is unconditional. |
| PM SKILL §7, line 65 | "When a worker is waiting for the user there, tell the user in one line which Task and worker, and keep it on the board under pending decisions." |
| PM scenario row, line 91 | "…the worker asks the user directly; tell the user who is waiting, record it as pending." |
| PM board template | "Pending user decisions" table; "Remove a row once the answer is sent back to the worker." |
| App | Task card shows the worker's live status (`types/project.ts` `TaskRootStatus = 'running' \| 'initializing' \| 'idle' \| 'error' \| 'offline'`; label "Idle"). "Awaiting" exists only for tool approval (`stores/agentActivityStore.ts:113`, `'awaiting-approval'`). There is no "waiting for you" or unread indicator for a run. |

## Findings

1. **Is the notice useful? Only when the user isn't already in the designer's conversation.**
   - The original reason holds narrowly: with several teams running, a team that stopped to ask can go unnoticed. The app shows only "Idle", which looks the same as "finished".
   - But the rule fires every time. In the four 2026-10-11/12 examples (remote-provider removal, auto-refresh names, launch defaults, compaction F-6/F-7/F-8) the user was typically already talking to that designer, so the notice and the PM's relay repeated what the user had just read.
   - The designer *can* tell the difference from its own conversation: has the user written to it directly, or has it only received the Task from the delegator? That is observable, unlike "the user may not be watching".
2. **Does the PM's relay add value? Only in the same case.**
   - When the user started the work through the PM and hasn't opened the team's conversation, the PM is the one place the user looks, so one line there helps.
   - Otherwise it duplicates. The board's pending-decisions list is still useful for status requests.
   - The app doesn't show "waiting for you" today (see Baseline), so a relay can't simply be replaced by the UI yet.
3. **Owner: both, coupled, but the cause is in the Solution Designer skill.**
   - The designer sends unconditionally; the PM faithfully passes on what it receives. Fixing the sender's condition removes most of the noise.
   - The PM rule needs only a small adjustment, so it stays useful if any worker still sends an unneeded notice.

## Recommended fix (not applied)

**Solution Designer §2:** make the notice conditional on something the designer can observe. Replace the last sentence ("When you are waiting for the user, tell the delegator …") with:

> If the user has not written to you in this conversation yet, because you only received the Task from the delegator, also tell the delegator in one line that you are waiting for the user, so it can point the user to you. Once the user is talking to you here, just ask here.

**PM §7 "Decisions for the user":** replace "When a worker is waiting for the user there, tell the user in one line which Task and worker, and keep it on the board under pending decisions." with:

> When a worker says it is waiting for the user, point the user to it once (which Task and worker), and keep it on the board under pending decisions until the worker reports progress.

This is unchanged in substance, but it no longer depends on the PM relaying the answer, and the PM doesn't have to judge whether the user is engaged (the designer's condition handles that).

**PM scenario row:** "…the worker asks the user directly; if it says it is waiting, point the user to it once and record it as pending (step 7)."

**Board template, "Pending user decisions":** "Remove a row once the answer is sent back to the worker." becomes "Remove a row when the worker reports progress." Answers now go directly to the worker, so the old trigger never fires.

Final review of this proposal (2026-10-12): round 1 dropped "unless the user is already talking to that worker" from the PM wording, because the PM can't observe it. It also added the board-template fix, because the stale removal rule assumed the PM relays answers. Round 2 found nothing more.

Alternatives considered:
- **Drop the notice entirely:** this loses the one case that matters (work started via the PM, and the user never opened the team's conversation), because the app shows only "Idle".
- **PM lists waiting items only when asked for status:** quieter, but a team that stopped to ask could wait unnoticed. Acceptable only together with the app indicator below.

## App-level suggestion (AutoByteus product; recommendation only)

Add a **"Waiting for you"** signal so neither message is needed.

- **Simplest version:** an unread or attention dot on the run's tree row and on the Task card when the run went idle after a message the user hasn't opened. It needs no inference of intent.
- **Richer version:** a "Waiting for you" status, shown when a run ends its turn with a question to the user and no handoff or tool call pending.

With that in place, the designer's notice and the PM's relay can be removed. The board would then list waiting Tasks only for status requests.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Current rules | Observed | `git show origin/main:<path>` at `ec90c33`. |
| App indicators | Observed | `rg` over `autobyteus-web` (excluding tests and node_modules): Task root status words, `'awaiting-approval'` for tools only, no unread or attention indicator for runs. |
| The four examples | Not verified | Taken from the Task description; the run transcripts were not opened. |

## User decision (2026-10-12): remove the round trip entirely

The user rejected the conditional version. The PM sets the direction. The Solution Designer investigates, reasons out the unclear ~20%, makes its own recommendations, and asks the user directly. It doesn't send "waiting for the user" to the PM, and the PM doesn't relay it: "the user is already focused on the solution designer; this round trip is not needed… redundant, makes it more complicated."

Planned changes (`update`):

- **SD §2:** remove the waiting-notice sentence.
- **PM §7 "Decisions for the user":**
  - keep: choices within the direction are the worker's; a worker that sends the PM user decisions is told to ask the user directly; the PM never decides or approves for the user;
  - remove: the "point the user / pending" bookkeeping and the relay path.
- **PM scenario row "Worker sends decisions":** same as §7.
- **PM §1 board description and board template:** "decisions waiting for the user" becomes the PM's own questions waiting for the user (dispatch approvals, plan changes), with no "Asked by" column.
- **Other places:** `agent.md` "whenever you need a decision" refers to the PM's own decisions, so it stays. §5 "Requests forwarded for the user" is a user's request passed on by a worker, not a decision round trip, so it stays.
