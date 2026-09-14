# API/E2E Test-Case Ledger

Use this as one canonical execution checkpoint when an API/E2E run contains multiple independently meaningful cases, a long-running case, or a credible interruption or context-compression risk. Create it before execution and update it in place. Do not create one file per case or versioned copies.

The ledger preserves in-flight case-level continuity. The coverage investigation owns the plan, the execution coverage report owns the latest complete round-level result, and the API/E2E revision record owns cross-round history.

## Ledger Meta

- Assigned task workspace / worktree:
- Coverage investigation:
- Execution coverage report:
- API/E2E revision record:
- Ledger scope and reason it is required:
- Last updated:

## Planned Cases

List independently meaningful executable cases, not every assertion or internal step. Reuse the same case IDs in the investigation, execution report, and later reruns.

| Case ID | Case / Journey | Requirement / Acceptance-Criteria IDs | Boundary / Execution Surface | Planned Command Or Entry Point | Planned Order | Notes |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Execution Events

Record a `Started` event when a case begins, then append a `Completed` event immediately after its execution attempt and before proceeding to the next case. For a long-running case, append meaningful checkpoints while it is in progress. A non-terminal event does not prove a final result.

| Sequence | Case ID | Timestamp | Event (`Started`/`Checkpoint`/`Completed`) | Command / Entry Point / Material Configuration | Expected Observable Result | Observed Result Or Checkpoint | Result (`Pass`/`Fail`/`Blocked`/`Not Tested`/`N/A`) | Evidence / Artifact Path | Next Action / Unresolved Issue |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |

## Re-entry And Reconciliation

- Last durably recorded event:
- Last completed case and result:
- Cases still running, interrupted, or not started:
- Next case or recovery action:
- Interruption, context-compression, or rerun note:
- Reconciled into execution coverage report: `No` / `Yes` — report path and section:
- Reconciliation note for any case missing a terminal result:
