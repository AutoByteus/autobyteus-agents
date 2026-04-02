# Review Report

Use earlier design artifacts as context only.
The review authority is the shared design principles, common design practices, and the code-review gate itself.
If the review shows that an earlier design artifact was weak, incomplete, or wrong, classify that as `Design Impact`.
Keep one canonical Stage 8 review report path across reruns.
Do not create versioned copies by default.
On round `>1`, recheck prior unresolved findings first, update the prior-findings resolution section, and then record the new round result.
The latest round is authoritative; earlier rounds remain history.

## Review Round Meta

- Current Review Round:
- Trigger Stage:
- Prior Review Round Reviewed:
- Latest Authoritative Round:
- Investigation Notes Reviewed As Context:
- Earlier Design Artifacts Reviewed As Context:

Round rules:
- Reuse the same finding IDs across reruns for the same unresolved issues.
- Create new finding IDs only for newly discovered review findings.
- Update the scorecard on every review round; the latest round's scorecard is authoritative.

## Round History

| Round | Trigger | Prior Unresolved Findings Rechecked | New Findings Found | Gate Decision | Latest Authoritative | Notes |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Review Scope

## Prior Findings Resolution Check (Mandatory On Round >1)

| Prior Round | Finding ID | Previous Severity | Current Resolution | Evidence | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Source File Size And Structure Audit (If Applicable)

Use this section for changed source implementation files only.
Do not apply the source-file hard limit to unit, integration, API, or E2E test files.

| Source File | Effective Non-Empty Lines | `>500` Hard-Limit Check | `>220` Delta Gate | SoC / Ownership Check | Placement Check | Preliminary Classification | Required Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

## Structural / Design Checks

| Check | Result (`Pass`/`Fail`) | Evidence | Required Action |
| --- | --- | --- | --- |
| Data-flow spine clarity and preservation under shared principles |  |  |  |
| Ownership boundary preservation |  |  |  |
| Support structure clarity |  |  |  |
| Existing capability/subsystem reuse |  |  |  |
| Reusable owned structures |  |  |  |
| Shared-structure / data-model tightness |  |  |  |
| No unjustified duplication in changed scope |  |  |  |
| Dependency quality / forbidden shortcuts |  |  |  |
| Boundary encapsulation / authoritative entrypoint preservation |  |  |  |
| File placement / layout clarity |  |  |  |
| Naming quality and naming-to-responsibility alignment (files, folders, APIs, types, functions, parameters, variables) |  |  |  |
| Duplication / patch layering control |  |  |  |
| Dead/obsolete code cleanup completeness in changed scope |  |  |  |

## Review Scorecard (Mandatory)

Record the scorecard even when the review fails.
The scorecard explains the current quality level; it does not override the gate result.
Use equal-weight scoring across all ten categories.

- Overall score (`/10`):
- Overall score (`/100`):
- Score calculation note: equal-weight average across the ten categories below; round `/10` to one decimal place and `/100` to the nearest whole number.

| Category | Score (`1.0-10.0`) | Why This Score | What Is Weak / Holding It Down | What Should Improve |
| --- | --- | --- | --- | --- |
| Spine clarity and traceability |  |  |  |  |
| Ownership clarity and boundary encapsulation |  |  |  |  |
| Separation of concerns and file placement |  |  |  |  |
| API/interface/query/command clarity |  |  |  |  |
| Shared-structure/data-model tightness and reusable owned structures |  |  |  |  |
| Dependency quality and shortcut avoidance |  |  |  |  |
| Naming quality and local readability |  |  |  |  |
| Validation strength |  |  |  |  |
| Runtime correctness under edge cases |  |  |  |  |
| Modernization / cleanup / no legacy |  |  |  |  |

Rules:
- Do not record raw numbers without explanation.
- Every row must include the reason for the score, the concrete weakness or drag, and the expected improvement.
- No minimum numeric score automatically passes or fails the review; the gate still follows the actual findings and mandatory checks.

## Findings

Rules:
- Reuse the same finding ID when the same issue persists across rounds.
- Create a new finding ID only for newly discovered issues.
- Mark resolved or obsolete earlier findings in the prior-findings resolution table instead of silently dropping them.
- If dead/obsolete/legacy/compatibility issues exist, enumerate each one explicitly with the concrete file/path/item, evidence, and required removal or cleanup action.

## Validation And Test Quality Verdict

| Area | Check | Result (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- |
| Validation Evidence | Sufficient for changed behavior |  |  |
| Tests | Test quality is acceptable |  |  |
| Tests | Test maintainability is acceptable |  |  |
| Tests | Main issue is `Validation Gap` rather than source/design drift |  |  |

## Legacy / Backward-Compatibility Verdict

| Check | Result (`Pass`/`Fail`) | Notes |
| --- | --- | --- |
| No backward-compatibility mechanisms in changed scope |  |  |
| No legacy old-behavior retention in changed scope |  |  |
| Dead/obsolete code cleanup completeness in changed scope |  |  |

## Dead / Obsolete / Legacy Items Requiring Removal (Mandatory If Any Exist)

| Item / Path | Type (`DeadCode`/`ObsoleteFile`/`LegacyBranch`/`CompatWrapper`/`UnusedHelper`/`UnusedTest`/`UnusedFlag`/`ObsoleteAdapter`/`DormantPath`) | Evidence | Why It Must Be Removed | Required Action |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Docs-Impact Verdict

- Docs impact: `Yes` / `No`
- Why:
- Files or areas likely affected:

## Classification

- `Local Fix`: bounded source fix, no upstream design/requirement update needed
- `Validation Gap`: main issue is insufficient validation evidence
- `Design Impact`: structural issue in code or earlier design artifact was weak/wrong/incomplete
- `Requirement Gap`: missing or ambiguous intended behavior
- `Unclear`: cross-cutting or low-confidence root cause

## Recommended Recipient

## Residual Risks

## Latest Authoritative Result

- Gate Decision:
- Score Summary:
- Notes:
