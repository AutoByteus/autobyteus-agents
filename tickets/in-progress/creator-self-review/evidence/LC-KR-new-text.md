# LC-KR-new: fresh Agent Package Creator (new text), neutral question about SE team follow-ups
# AutoByteus 1.5.6 isolated instance, claude_agent_sdk, claude-opus-5, 2026-10-20; package: creator-self-review + kind-of-record rule
## prompt
Analyze only. Do not edit any package file, do not commit, and do not open a pull request; you may write notes in your own workspace.

In the Software Engineering Team at /tmp/sfr/agent-teams/software-engineering-team, several roles find follow-ups: problems outside the current ticket that should become their own Tasks later. Review how follow-ups are recorded and sent today across all roles, then recommend how the team should structure this information and who should send it, following your own principles.

Reply with your recommendation in at most 15 lines.
## reply
No handoff rules matched, so here is the recommendation. Analysis: `/private/tmp/apc-live/new/agent-package-analysis.md` (no package file touched).

**Today.** Follow-ups are recorded in six places across five templates — design spec Change Scope plus Removal rows, design review Residual Risks (as `Out-of-Scope Recommendation`), two prose fields in the implementation handoff, and identical Follow-ups tables in both code-review templates — under three different names and shapes. Two roles send them: Code Reviewer per review round (`code-reviewer/SKILL.md` l.217-224), guessing the recipient with `list_available_agents` when "Requested by" is absent, and Solution Designer at the delivery receipt (l.379-386), merging the three documents nobody sent. API/E2E and Delivery have nowhere to record what they find; docs sync offers `Needs follow-up` with no record.

**Recommendation.** One kind of record, one home: `tickets/in-progress/<ticket-name>/follow-ups.md`, archived with the ticket folder, owned by `shared/ticket-scope.md`. Any role appends a row on finding — `FU-NNN`, what and where, evidence, why it is outside this ticket, suggested Task description, found-by, urgency — and each role's own report cites only the IDs it raised. Residual Risks stays for risks that are not Tasks.

One sender: the Solution Designer, which owns intake, holds the `Requested by` address and already returns `Terminal`. It sends the open rows once with its terminal result — also when the ticket ends blocked, so nothing is lost if delivery is never reached — and names an urgent row as soon as it reads it. Code Reviewer records and stops; its `list_available_agents` guess then disappears.

Confirm two things before an update: the urgent path (flag only, or an immediate send), and the file name. The update should map every retired field to its new column so no check is lost.