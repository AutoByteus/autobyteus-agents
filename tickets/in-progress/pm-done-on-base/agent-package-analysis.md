# Agent Package Analysis: a Task is done when delivery finalized it on the base branch (Task autobyteus-agents-43)

- Status: `Completed`
- Operation: `update`
- Package type: `agent` (Project Task Manager), plus one line in the SE team's Solution Designer
- Target: worktree `/tmp/p43`, branch `pm-done-on-base`, from `origin/main` at `ff0fffb`
- Files read in full:
  - the Project Task Manager package: `agent.md`, `agent-config.json`, `SKILL.md`, `board-template.md`, `task-plan-template.md`;
  - the SE Solution Designer and delivery engineer skills (read in full for Task 39, at `ff0fffb`).
- Request/reference: Task autobyteus-agents-43 (the PM's own findings and the user's rule, 2026-10-20)

## Map: where "done" and "keep open" are decided

| Where | What it says today | Effect |
| --- | --- | --- |
| PM step 5, writing a Task | "what done looks like", with no guidance on releases or the user's check | The PM's habit: "Done when … released with the next beta, and the user's check in the app" |
| PM step 7, Check the result | "including anything the user must check in the app: if only the user's check remains, keep the Task open and ask for it"; verify "the release is published" | Delivered, merged Tasks stayed open for days (autobyteus-71, 93, 114, …) |
| PM step 7, Close only after cleanup | "when the user may still be working with it, ask before closing" | A second reason to hold Tasks open: keeping a team's conversation alive |
| PM, Common scenarios | "Check the result (and the user's in-app check)" | The same rule, repeated in the index |
| PM, the follow-ups intake | "Reply to the sender only if it asks" (follow-ups only) | Replies like "recorded, I keep it open" to the Solution Designer's end message |
| SE Solution Designer, `Terminal` | a verified delivery receipt; nothing about releases | The team copies the Task's "Done when" into its handoffs (`task-keys-declutter/handoff-architecture-design-complete.md`: "the user's check in the app") and reports a release or check as an open item |
| SE delivery engineer | verification from evidence before finalizing, with the user's check only as a last resort; release only when asked | Already consistent with the rule |
| Board and plan templates | "Waiting for … the next release" (undispatched Tasks only) | Consistent: a release is its own Task |

## Changes

| File | Change |
| --- | --- |
| PM `SKILL.md` step 5 | For software work, done is the outcome finalized on the base branch: merged, verified and cleaned up, with follow-ups recorded. A release and the user's in-app check are separate decisions, each its own Task when the user wants it, and go into a Task's done only when the user asked for that Task. |
| PM step 7, Check the result | Verify cheaply: the merge is on the target branch (`git merge-base --is-ancestor`), the cleanup is done, and the release is published when the Task asked for one. Don't wait for a release or check the user didn't ask for, even when an earlier description of the PM's lists it. On a verified finalization: close without asking permission, record the follow-ups, offer the next ready Task, reply only when asked. |
| PM step 7, Close only after cleanup | Don't hold a finished Task open to keep a copy available: a reopen or a follow-up Task brings it back. Ask before closing when the user is still working with the copy ("he said so, or he is talking with it now"; was "may still be working with it"). |
| PM, Common scenarios | The "Worker reports done" row follows step 7. |
| SE Solution Designer, Finalized Delivery Receipt | A finalized delivery ends the ticket; a release or check the Task did not ask for is not an open item. |

## Kept

- Never close without a checked result.
- Close only after cleanup.
- Ask before closing when the user is working with the copy.
- When the user explicitly asks to close, close.
- Releases go to the copy that cut the latest beta.
- Delivery's own verification and its last-resort user check before finalizing.

`compare-wording.py`: the only dropped requirement words ("must", "only") belong to the replaced rule "if only the user's check remains, keep the Task open".

## Validation

| Check | Result | Evidence |
| --- | --- | --- |
| Links | Pass | `check-links.py`: 0 broken, 0 unnamed |
| Wording | Pass | Only the replaced rule's "must"/"only" dropped; ask-before-closing kept with a concrete trigger |
| Live check, old vs new | Pass | `evidence/LC-DONE-1-old-vs-new.md`. The same end message ("Still Terminal; open items: released with the next beta, and the user's own check in the app"). The old text kept the Task IN_PROGRESS and the dependent Task blocked. The new text verified the merge, closed DONE without asking, recorded both follow-ups, offered the next ready Tasks, and sent no reply. |

## Limitations

- The relay agent stands in for a Solution Designer, and the Task status was set by the PM, not by a real dispatch.
- The team-side line was not run live: it only stops the designer from listing a release or check as an open item.
