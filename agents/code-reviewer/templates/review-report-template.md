# Review Report

Use earlier design artifacts as context only.
The review authority is the shared design principles, common design practices, and the code-review gate itself.
If the review shows that an earlier design artifact was weak, incomplete, or wrong, classify that as `Design Impact`.

## Review Scope

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
| File placement / layout clarity |  |  |  |
| Naming quality and naming-to-responsibility alignment (files, folders, APIs, types, functions, parameters, variables) |  |  |  |
| Duplication / patch layering control |  |  |  |
| Dead/obsolete code cleanup completeness in changed scope |  |  |  |

## Findings

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
