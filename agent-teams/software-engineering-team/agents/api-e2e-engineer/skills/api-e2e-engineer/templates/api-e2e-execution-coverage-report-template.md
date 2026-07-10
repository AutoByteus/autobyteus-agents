# API/E2E Execution Coverage Report

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

Keep one canonical execution coverage report path across reruns.
Do not create versioned copies by default.
On round `>1`, recheck prior unresolved failures first, update the prior-failure resolution section, and then record the new round result.
The latest round is authoritative; earlier rounds remain history.
Execution may cover API, browser UI, native desktop UI, CLI, process/lifecycle, integration, or distributed checks depending on the real boundaries being proven.

## Contents

- [Pre-Execution Coverage Investigation](#pre-execution-coverage-investigation)
- [Project Execution Basis](#project-execution-basis)
- [Repository Coverage Execution](#repository-coverage-execution)
- [Validation Confidence Scorecard](#validation-confidence-scorecard-mandatory)
- [Live-System / Browser Validation Decision And Execution](#live-system--browser-validation-decision-and-execution)
- [Lifecycle / Upgrade / Restart / Migration Checks](#lifecycle--upgrade--restart--migration-checks)
- [Latest Authoritative Result](#latest-authoritative-result)

## Execution Round Meta

- Requirements Doc:
- Investigation Notes:
- Design Spec:
- Supplemental Solution Artifacts:
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

## Pre-Execution Coverage Investigation

- Coverage investigation artifact:
- Completed before final test execution, durable coverage edits, durable coverage removals, or failure rerouting: `No` / `Yes`
- Existing durable coverage inventory reviewed: `No` / `Yes`
- Existing tests treated as authority without current-requirement validity review: `No` / `Yes (invalid; explain)`
- Stale or obsolete coverage found: `No` / `Yes`
- New durable coverage needed: `No` / `Yes`
- Reroute required from investigation: `No` / `Yes`
- Notes:

## Project Execution Basis

- Assigned task worktree / workspace:
- Project type and runtime stack:
- Required environment variables or secrets available: `Yes` / `No` / `N/A` (do not record secret values)

| Instruction / Configuration Path | Commands, Setup, Or Constraints Applied |
| --- | --- |
|  |  |

| Component / Dependency | Working Directory | Start / Setup Command | Isolated Port / Resource | Readiness Evidence | Stop / Cleanup Result |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

| Data / Fixture / Identity | Creation Or Setup Method | Isolation | Cleanup / Retention Result |
| --- | --- | --- | --- |
|  |  |  |  |

## Existing Durable Coverage Decision Summary

| Path / Scenario | Validity Decision (`Still Valid`/`Needs Update`/`Stale / Remove`/`Replace`/`Out Of Scope`/`Unclear`) | Action Taken | Evidence |
| --- | --- | --- | --- |
|  |  |  |  |

## Compatibility / Legacy Scope Check

- Reviewed requirements/design introduce, tolerate, or ambiguously describe backward compatibility in scope: `No` / `Yes (invalid upstream; reroute required)`
- Compatibility-only or legacy-retention behavior observed in implementation: `No` / `Yes (invalid implementation scope; reroute required)`
- Approved historical-schema logic observed only inside the isolated migration boundary: `No` / `Yes` / `N/A`
- Durable coverage added or retained only for compatibility-only behavior: `No` / `Yes (invalid; explain)`
- If compatibility-related invalid scope was observed, reroute classification used: `Local Fix` / `Design Impact` / `Requirement Gap` / `Unclear`
- Upstream recipient notified:

## Changed Boundary And Evidence Matrix

| Scenario ID | Requirement / Acceptance-Criteria IDs | Changed Boundary | Execution Surface / Mode | Evidence Type (`Durable`/`Temporary`/`Live`/`Browser`) | Result (`Pass`/`Fail`/`Blocked`/`Not Tested`) | Evidence / Artifact |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Repository Coverage Execution

| Order | Command | Working Directory / Configuration | Boundary Or Scenario Proven | Result (`Pass`/`Fail`/`Blocked`) | Evidence / Output Path |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Validation Confidence Scorecard (Mandatory)

Record the score after repository execution and the final score after broader validation. If broader validation did not run, repeat the post-repository score as final and explain why it was unnecessary.

| Confidence Category | Post-Repository Score (`0-100%`/`N/A`) | Final Score (`0-100%`/`N/A`) | Change | Final Supporting Evidence | Residual Uncertainty |
| --- | --- | --- | --- | --- | --- |
| Requirement and acceptance-criteria proof |  |  |  |  |  |
| Changed-boundary execution directness |  |  |  |  |  |
| Cross-boundary integration realism and mock gap |  |  |  |  |  |
| Environment, configuration, identity, and fixture fidelity |  |  |  |  |  |
| Failure, edge-case, lifecycle, and recovery evidence |  |  |  |  |  |
| User-surface and browser confidence |  |  |  |  |  |
| Durable regression coverage quality and relevance |  |  |  |  |  |

- Overall post-repository confidence:
- Overall final confidence:
- Calculation method:
- Confidence change produced by broader validation:
- Every critical acceptance criterion directly proven: `Yes` / `No`
- Any final applicable category below `90%`: `No` / `Yes` — list:
- Default final confidence target of `95%` met: `Yes` / `No`
- Confidence-limiting residual risks:

## Live-System / Browser Validation Decision And Execution

- Decision after repository execution: `Required` / `Not Required` / `Blocked`
- Selected execution mode (`Browser`/`Live API`/`Native`/`CLI`/`Lifecycle`/`Worker or Distributed`/`Other`/`None`):
- Confidence gap or residual risk targeted:
- Expected confidence after broader validation:
- Browser-specific decision and rationale:
- If `Not Required`, direct evidence that made broader validation unnecessary:
- If `Blocked`, exact unavailable dependency or access and attempted alternatives:
- Startup order, commands, and readiness results:
- Worktree-specific ports, databases, storage, caches, and temporary paths:
- Seed data, fixtures, identities, authentication, permissions, or session state:

| Scenario / Journey Step | Expected Observable Result | Actual Observable Result | DOM / Screenshot / Log / API / Process Evidence | Result |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Platform / Runtime Targets

- Operating system / platform:
- Runtime and relevant framework versions:
- Browser / engine and version, when applicable:
- Device, viewport, locale, timezone, or accessibility settings, when applicable:

## Lifecycle / Upgrade / Restart / Migration Checks

- Persisted data migration applicable: `No` / `Yes`
- Supported source schema/version and target schema/version:
- Migration trigger, owner, and ordering:
- Representative source data exercised:
- Target-schema validation and completion-gate evidence:
- Post-migration current-runtime behavior evidence:
- Interruption, restart-safety/idempotency, and recovery evidence:
- Mixed-version access prevention or cutover/deployment-sequencing evidence, when applicable:
- Normal runtime old-shape path, dual read/write, or compatibility fallback observed: `No` / `Yes (reroute required)`
- Residual untested migration risk:

## Tests Implemented Or Updated

| Path / Scenario | Change (`Added`/`Updated`) | Requirement / Boundary | Execution Result | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Tests Removed As Stale Or Obsolete

| Path / Scenario | Obsolete Assertion | Upstream Evidence | Replacement Coverage Or No-Replacement Rationale |
| --- | --- | --- | --- |
|  |  |  |  |

## Durable Coverage Changed In The Codebase

- Repository-resident durable coverage added, updated, or removed this round: `No` / `Yes`
- Paths added or updated:
- Paths removed:
- Added or updated paths attached for proportional test-code review: `Yes` / `No` / `Not Applicable`
- Diff or repository evidence supplied for removed paths:

## Other Execution Artifacts

| Artifact Path | Type / Purpose | Retained Or Temporary | Notes |
| --- | --- | --- | --- |
|  |  |  |  |

## Temporary Execution Methods / Scaffolding

| Path / Method | Why Needed | Result / Evidence | Cleanup Result |
| --- | --- | --- | --- |
|  |  |  |  |

## Dependencies Mocked Or Emulated

| Dependency | Method | Why Real Dependency Was Not Used | Confidence Limitation |
| --- | --- | --- | --- |
|  |  |  |  |

## Prior Failure Resolution Check (Mandatory On Round >1)

| Prior Round | Scenario / Failure Reference | Previous Classification | Current Resolution | Evidence | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Result Summary

| Result (`Pass`/`Fail`/`Blocked`/`Not Tested`/`Out Of Scope`) | Scenario IDs | Summary / Reason |
| --- | --- | --- |
|  |  |  |

## Cleanup Performed

| Resource / Process / Data | Ownership | Cleanup Action | Result |
| --- | --- | --- | --- |
|  |  |  |  |

## Classification

- `Local Fix`: the main issue is a bounded implementation correction.
- `Design Impact`: the main issue is a weakness or mismatch in the reviewed design.
- `Requirement Gap`: intended behavior or acceptance criteria are missing or ambiguous.
- `Unclear`: the issue is cross-cutting or cannot yet be classified cleanly from the available evidence.

## Recommended Recipient

## Evidence / Notes

## Latest Authoritative Result

- Result values: `Pass` / `Fail` / `Blocked`
- Result:
- Final validation confidence:
- Default `95%` confidence target met: `Yes` / `No`
- Any final applicable confidence category below `90%`: `No` / `Yes` — list:
- Live-system / browser decision:
- Critical acceptance criteria lacking direct proof:
- Required next recipient (`Pass` -> `code_reviewer` for proportional test-code review; `Fail` -> `code_reviewer` for focused source re-review; `Blocked` -> user request):
- Notes:
