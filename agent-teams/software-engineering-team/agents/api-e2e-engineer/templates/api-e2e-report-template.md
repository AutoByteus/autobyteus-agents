# API, E2E, And Executable Validation Report

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

Keep one canonical validation report path across reruns.
Do not create versioned copies by default.
On round `>1`, recheck prior unresolved failures first, update the prior-failure resolution section, and then record the new round result.
The latest round is authoritative; earlier rounds remain history.
Validation may cover API, browser UI, native desktop UI, CLI, process/lifecycle, integration, or distributed checks depending on the real boundaries being proven.

## Validation Round Meta

- Requirements Doc:
- Investigation Notes:
- Design Spec:
- Design Review Report:
- Implementation Handoff:
- Review Report:
- Current Validation Round:
- Trigger:
- Prior Round Reviewed:
- Latest Authoritative Round:

Round rules:
- Reuse the same scenario IDs across reruns for the same scenarios.
- Create new scenario IDs only for newly discovered coverage.

## Round History

| Round | Trigger | Prior Unresolved Failures Rechecked | New Failures Found | Result | Latest Authoritative | Notes |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Validation Basis

## Compatibility / Legacy Scope Check

- Reviewed requirements/design introduce, tolerate, or ambiguously describe backward compatibility in scope: `No` / `Yes (invalid upstream; reroute required)`
- Compatibility-only or legacy-retention behavior observed in implementation: `No` / `Yes (invalid implementation scope; reroute required)`
- Durable validation added or retained only for compatibility-only behavior: `No` / `Yes (invalid; explain)`
- If compatibility-related invalid scope was observed, reroute classification used: `Local Fix` / `Design Impact` / `Requirement Gap` / `Unclear`
- Upstream recipient notified:

## Validation Surfaces / Modes

## Platform / Runtime Targets

## Lifecycle / Upgrade / Restart / Migration Checks

## Coverage Matrix

## Test Scope

## Validation Setup / Environment

## Tests Implemented Or Updated

## Durable Validation Added To The Codebase

- Repository-resident durable validation added or updated this round: `No` / `Yes`
- Paths added or updated:
- If `Yes`, returned through `code_reviewer` before delivery: `No` / `Yes`
- Post-validation code review artifact:

## Other Validation Artifacts

## Temporary Validation Methods / Scaffolding

## Dependencies Mocked Or Emulated

## Prior Failure Resolution Check (Mandatory On Round >1)

| Prior Round | Scenario / Failure Reference | Previous Classification | Current Resolution | Evidence | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Scenarios Checked

## Passed

## Failed

## Not Tested / Out Of Scope

## Blocked

## Cleanup Performed

## Classification

- `Local Fix`: the main issue is a bounded implementation correction.
- `Design Impact`: the main issue is a weakness or mismatch in the reviewed design.
- `Requirement Gap`: intended behavior or acceptance criteria are missing or ambiguous.
- `Unclear`: the issue is cross-cutting, low-confidence, or cannot yet be classified cleanly.

## Recommended Recipient

## Evidence / Notes

## Latest Authoritative Result

- Result values: `Pass` / `Fail` / `Blocked`
- Result:
- Notes:
