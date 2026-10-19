# Agent Package Creation Result

- Status: `Completed` (live check in progress; see below)
- Operation: `update`
- Package type: `team`
- Update intent: `extend`: prerequisite findings
- Target package: `agent-teams/software-engineering-team`
- Request/reference: Task `autobyteus-agents-30`; analysis `agent-package-analysis.md`; feedback `skill-feedback-prerequisite-findings.md`

## Changed paths

- **Added:**
  - `shared/ticket-scope.md`: the one owner of the four kinds (this ticket, prerequisite, follow-up, Requirement Gap), the two-question prerequisite test, where prerequisites hide, who acts, and the Jira example;
  - symbolic links in the Solution Designer, architecture reviewer, implementation engineer and code reviewer `references/`.
- **Solution Designer `SKILL.md`:**
  - step 1: trace through real dependencies, probe, and judge findings;
  - step 3.2: judge the same way;
  - a new **Prerequisites** section: write it down; at the end of the investigation, ask the "Requested by" agent to create and dispatch its Task first; stop; continue when it is delivered;
  - the Recovery row, the third `Blocked` kind, the resume notification, and the receipt note.
- **Requirements template:** a Prerequisites table in the Scope Guardrail; Review Authority's exception for prerequisites.
- **Code reviewer "Ticket Scope":** definitions moved to the shared file; only its actions remain, including routing a prerequisite to the Solution Designer as a Requirement Gap. The failure-origin rule also covers prerequisites.
- **Architecture reviewer, implementation engineer:** route a prerequisite to the Solution Designer, naming it.
- **`team.md`:** the scope paragraph points to `ticket-scope.md`.
- **Example 11:** the "old bug blocks an in-scope criterion" row is decided by functionality.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | Solution Designer, code reviewer, architecture reviewer, implementation engineer: valid |
| Links | Pass | 0 broken (checked after each round) |
| Nothing lost | Pass | Every sentence removed from the code reviewer's Ticket Scope is now in `ticket-scope.md` or in its actions |
| Live check | Pass on the merged text | Isolated app, a test repository with the same trap. `evidence/PRE-01`: on the earlier text ("absorb it if the fix is small") the designer probed the real SDK, found the bug, and absorbed it as a one-line change. `evidence/PRE-02`: on the merged text it classified the bug by functionality ("in how the transport is built, not in the Jira preset"), wrote `PRE-001` in the Prerequisites table with its evidence, stopped before design, and told the user (asked directly, so no Project Task Manager). |
| Final review | Pass | Round 1: removed the code reviewer's repeat of the team rule. Round 2: Review Authority exception. Round 3 (user direction): definition by functionality; placement along the workflow. Round 4: the "trace through real dependencies" instruction is owned by the Solution Designer (the shared file states only the fact); "follows step 2" made unambiguous. Round 5: no findings. Round 6 (user direction): simplified to write down → finish the investigation → send to the delegating agent at its end → stop → continue when delivered. Round 7: no findings. Round 8 (user direction, less rigid): the Prerequisites section becomes one short paragraph: write it down, message the delegating agent right away to create the Task and give it to you first, stop, continue when it is done. Round 9: no findings. |

## Follow-ups (not in this Task)

- **The Project Task Manager's skill:** a delegated copy has one current Task at a time, so giving the prerequisite to the same Solution Designer while its ticket is open needs a message or a close-and-reopen; decide this there. When a prerequisite arrives, create its Task, set the paused Task's `depends_on`, dispatch with approval, and when it is DONE, tell the paused team to continue. Its skill covers `depends_on`, forwarded requests and relaying, but not the "tell them to continue" step.
- **The user approves the wording before merge**, as the Task requires.
