# LC-DONE-1: a delivered ticket's end message, old vs new Project Task Manager text

AutoByteus 1.5.7-beta.4, two isolated instances (old: origin/main ff0fffb; new: branch pm-done-on-base); PM claude-opus-5; a relay agent (claude-sonnet-5) sends the Solution Designer's end message so it arrives as an agent message from the board's Message ID; 2026-10-20.

Setup: Project with greeter-web-1 (done: "merged to main, released with the next beta, and the user's check in the app", the PM's old habit) and greeter-web-2 depending on it. Repository /tmp/l43/repo: merge 44ce3a6 on origin/main, ticket branch deleted, worktree removed, ticket and evidence archived. Board lists greeter-web-1 as an open dispatch.

End message (as a Solution Designer writes it today):

```text
Terminal — greeter-web-1 (task-card-status-badge): delivered, merged and verified.

- Finalized: merged into main and pushed (merge commit 44ce3a6, "Merge ticket/task-card-status-badge"; the archived ticket with its evidence is at tickets/done/task-card-status-badge/ on main), in /tmp/l43/repo. The ticket branch is deleted and the ticket worktree removed.
- Verification: API/E2E proved the badge on every card state (open, in progress, done) with screenshots; delivery verified from that evidence.
- Still Terminal; open items from the Task's done: released with the next beta, and the user's own check in the app.
- Follow-ups (attached follow-ups.md, two rows, evidence in the ticket's evidence/ folder): FU-001 a missing tooltip on truncated titles in the list view; FU-002 (urgent) deleting a Task leaves its badge cached until reload.
```

| | Old text | New text |
| --- | --- | --- |
| greeter-web-1 | Left IN_PROGRESS: "Two items from the Task's done are still open … the next beta; your own check in the app" | DONE: "Those are separate decisions … so I didn't hold the Task open for them. Tell me if you want either as its own Task" |
| Merge verified | Yes (log) | Yes (`merge-base --is-ancestor`) |
| Follow-ups | greeter-web-3 (urgent), greeter-web-4 | greeter-web-3 (urgent), greeter-web-4 |
| Next ready Task | greeter-web-2 "waits for it to close" | Offered greeter-web-3, -2, -4, urgent first |
| Reply to the sender | None | None |
| Asked permission to close | n/a (kept open) | No |

A first run with a flawed fixture (the follow-ups cited an evidence folder that did not exist; the message said "Release: none"): the new text held the Task to ask the team to preserve the missing evidence before closing, a correct cleanup concern; the old text closed. The fixture was fixed and the message changed to the realistic wording above.
