# Real-use check: entry 23's detection, applied to the Software Engineering Team before and after #60 and #61

**Question:** for each fact a template records, how many places is it written?

| Fact | Before #60 (`887e79d`) | Now (`582736a`) |
| --- | --- | --- |
| A test case's evidence path | 5 evidence columns in the execution report, plus 1 in the ledger, plus the desktop and lifecycle text lines | One per role's own runs: the implementation handoff's Checks Run and the execution report's Cases. A reused case points to the check by ID. |
| A test case's result | Ledger events, ledger reconciliation, boundary matrix, repository table, broader-validation steps, result summary | The execution report's Cases. The test progress log keeps only Started/Completed for resuming, which is its separate job. |
| The implementation engineer's test results | Free text with no commit or evidence, so API/E2E reran them | The Checks Run rows, reused by ID while their code is unchanged |

The rule's first step, "find where the fact already lives before adding a place", applied to #60's first draft (a new Evidence Index) would have found those places and pointed to the restructure that the user later asked for.

Command for the first row: `git show 887e79d:<report template> | grep -c 'Evidence / Artifact|Evidence Files|Evidence / Output|Process Evidence'` → 5.
