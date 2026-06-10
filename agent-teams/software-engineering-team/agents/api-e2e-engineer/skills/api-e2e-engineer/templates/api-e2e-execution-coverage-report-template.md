# API/E2E Execution Coverage Report

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

Keep one canonical execution coverage report path across reruns.
Do not create versioned copies by default.
On round `>1`, recheck prior unresolved failures first, update the prior-failure resolution section, and then record the new round result.
The latest round is authoritative; earlier rounds remain history.
Execution may cover API, browser UI, native desktop UI, CLI, process/lifecycle, integration, or distributed checks depending on the real boundaries being proven.

## Execution Round Meta

- Requirements Doc:
- Investigation Notes:
- Design Spec:
- Design Review Report:
- Implementation Handoff:
- Code Review Report:
- Coverage Investigation:
- Current Execution Round:
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

## Execution Basis

## Pre-Execution Coverage Investigation

- Coverage investigation artifact:
- Completed before final test execution, durable coverage edits, durable coverage removals, or failure rerouting: `No` / `Yes`
- Existing durable coverage inventory reviewed: `No` / `Yes`
- Existing tests treated as authority without current-requirement validity review: `No` / `Yes (invalid; explain)`
- Stale or obsolete coverage found: `No` / `Yes`
- New durable coverage needed: `No` / `Yes`
- Reroute required from investigation: `No` / `Yes`
- Notes:

## Existing Durable Coverage Decision Summary

| Path / Scenario | Validity Decision (`Still Valid`/`Needs Update`/`Stale / Remove`/`Replace`/`Out Of Scope`/`Unclear`) | Action Taken | Evidence |
| --- | --- | --- | --- |
|  |  |  |  |

## Compatibility / Legacy Scope Check

- Reviewed requirements/design introduce, tolerate, or ambiguously describe backward compatibility in scope: `No` / `Yes (invalid upstream; reroute required)`
- Compatibility-only or legacy-retention behavior observed in implementation: `No` / `Yes (invalid implementation scope; reroute required)`
- Durable coverage added or retained only for compatibility-only behavior: `No` / `Yes (invalid; explain)`
- If compatibility-related invalid scope was observed, reroute classification used: `Local Fix` / `Design Impact` / `Requirement Gap` / `Unclear`
- Upstream recipient notified:

## Execution Surfaces / Modes

## Platform / Runtime Targets

## Lifecycle / Upgrade / Restart / Migration Checks

## Coverage Matrix

## Test Scope

## Execution Setup / Environment

## Tests Implemented Or Updated

## Tests Removed As Stale Or Obsolete

| Path / Scenario | Obsolete Assertion | Upstream Evidence | Replacement Coverage Or No-Replacement Rationale |
| --- | --- | --- | --- |
|  |  |  |  |

## Durable Coverage Changed In The Codebase

- Repository-resident durable coverage added, updated, or removed this round: `No` / `Yes`
- Paths added or updated:
- Paths removed:
- If `Yes`, returned through `code_reviewer` before delivery: `No` / `Yes`
- Post-API/E2E coverage code review artifact:

## Other Execution Artifacts

## Temporary Execution Methods / Scaffolding

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
