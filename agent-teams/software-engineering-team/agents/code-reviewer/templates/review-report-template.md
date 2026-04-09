# Review Report

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

Use earlier design artifacts as context only.
The review authority is the canonical shared design guidance and the review criteria in this report.
If the review shows that an earlier design artifact was weak, incomplete, or wrong, classify that as `Design Impact`.
Keep one canonical review report path across reruns.
Do not create versioned copies by default.
On round `>1`, recheck prior unresolved findings first, update the prior-findings resolution section, and then record the new round result.
The latest round is authoritative; earlier rounds remain history.

## Review Round Meta

- Requirements Doc Reviewed As Context:
- Current Review Round:
- Trigger:
- Prior Review Round Reviewed:
- Latest Authoritative Round:
- Investigation Notes Reviewed As Context:
- Design Spec Reviewed As Context:
- Design Review Report Reviewed As Context:
- Implementation Handoff Reviewed As Context:
- Validation Report Reviewed As Context:

Round rules:
- Reuse the same finding IDs across reruns for the same unresolved issues.
- Create new finding IDs only for newly discovered review findings.
- Update the scorecard on every review round; the latest round's scorecard is authoritative.

## Round History

| Round | Trigger | Prior Unresolved Findings Rechecked | New Findings Found | Review Decision | Latest Authoritative | Notes |
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

| Source File | Effective Non-Empty Lines | `>500` Hard-Limit Check | `>220` Delta Check | SoC / Ownership Check | Placement Check | Preliminary Classification | Required Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

## Structural / Design Checks

Use the mandatory structural checks below on every review. Do not replace them with a smaller ad hoc checklist.
Treat the `Authoritative Boundary Rule` as one of the highest-signal structural checks in this section.

Quick examples:
- Good shape:
  - `Caller -> Service`
  - `Service -> Repository`
- Bad shape:
  - `Caller -> Service`
  - `Caller -> Repository`
  - `Service -> Repository`
- Review interpretation:
  - if the caller needs both `Service` and `Repository`, either the service is not the real authority or the caller is bypassing the authority
  - call this out explicitly as an authoritative-boundary failure rather than leaving it as vague dependency drift

| Check | Result (`Pass`/`Fail`) | Evidence | Required Action |
| --- | --- | --- | --- |
| Data-flow spine inventory clarity and preservation under shared principles |  |  |  |
| Ownership boundary preservation and clarity |  |  |  |
| Off-spine concern clarity (off-spine concerns serve clear owners and stay off the main line) |  |  |  |
| Existing capability/subsystem reuse check (no fresh helper where an existing subsystem should own it) |  |  |  |
| Reusable owned structures check (repeated structures extracted into the right owned file instead of copied across files) |  |  |  |
| Shared-structure/data-model tightness check (no kitchen-sink base, no overlapping parallel shapes, specialization/composition used meaningfully) |  |  |  |
| Repeated coordination ownership check (shared policy has a clear owner instead of being repeated across callers) |  |  |  |
| Empty indirection check (no pass-through-only boundary) |  |  |  |
| Scope-appropriate separation of concerns and file responsibility clarity |  |  |  |
| Ownership-driven dependency check (no forbidden shortcuts or unjustified cycles) |  |  |  |
| Authoritative Boundary Rule check (callers do not depend on both an outer owner and that owner's internal manager/repository/helper/lower-level concern) |  |  |  |
| File placement check (file/folder path matches owning concern or explicitly justified shared boundary) |  |  |  |
| Flat-vs-over-split layout judgment (layout is readable for the scope and not artificially fragmented) |  |  |  |
| Interface/API/query/command/service-method boundary clarity (one subject, one responsibility, explicit identity shape) |  |  |  |
| Naming quality and naming-to-responsibility alignment check (files, folders, APIs, types, functions, parameters, variables) |  |  |  |
| No unjustified duplication of code / repeated structures in changed scope |  |  |  |
| Patch-on-patch complexity control |  |  |  |
| Dead/obsolete code cleanup completeness in changed scope |  |  |  |
| Test quality is acceptable for the changed behavior |  |  |  |
| Test maintainability is acceptable for the changed behavior |  |  |  |
| Validation evidence sufficiency for the changed flow |  |  |  |
| No backward-compatibility mechanisms (no compatibility wrappers/dual-path behavior) |  |  |  |
| No legacy code retention for old behavior |  |  |  |

## Review Scorecard (Mandatory)

Record the scorecard even when the review fails.
The scorecard explains the current quality level; it does not override the review decision.
Use the canonical priority order below. The order is the review reasoning order, not an equal-weight category list.

- Overall score (`/10`):
- Overall score (`/100`):
- Score calculation note: report `/10` and `/100` for summary/trend visibility only. If an overall score is reported, a simple average across the ten categories below is acceptable, but the average is never the review decision rule.

| Priority | Category | Score (`1.0-10.0`) | Why This Score | What Is Weak / Holding It Down | What Should Improve |
| --- | --- | --- | --- | --- | --- |
| `1` | `Data-Flow Spine Inventory and Clarity` |  |  |  |  |
| `2` | `Ownership Clarity and Boundary Encapsulation` |  |  |  |  |
| `3` | `API / Interface / Query / Command Clarity` |  |  |  |  |
| `4` | `Separation of Concerns and File Placement` |  |  |  |  |
| `5` | `Shared-Structure / Data-Model Tightness and Reusable Owned Structures` |  |  |  |  |
| `6` | `Naming Quality and Local Readability` |  |  |  |  |
| `7` | `Validation Strength` |  |  |  |  |
| `8` | `Runtime Correctness Under Edge Cases` |  |  |  |  |
| `9` | `No Backward-Compatibility / No Legacy Retention` |  |  |  |  |
| `10` | `Cleanup Completeness` |  |  |  |  |

Rules:
- Do not record raw numbers without explanation.
- Every row must include the reason for the score, the concrete weakness or drag, and the expected improvement.
- Every category is mandatory. Clean pass target is `>= 9.0` in every category. Any category below `9.0` is a real gap and should normally fail the review.
- Do not let the overall summary override a weak category. The review still follows the actual findings and mandatory checks.
- If the `Authoritative Boundary Rule` is broken, call it out explicitly in findings and in the relevant score rationale instead of hiding it under vague dependency wording.

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

- `Pass` is not a classification. Record pass/fail/blocked in `Latest Authoritative Result`, then use a classification below only when the review does not pass cleanly.
- `Local Fix`: bounded source fix, no upstream design/requirement update needed
- `Validation Gap`: main issue is insufficient validation evidence
- `Design Impact`: structural issue in code or earlier design artifact was weak/wrong/incomplete
- `Requirement Gap`: missing or ambiguous intended behavior
- `Unclear`: cross-cutting or low-confidence root cause
- Structural failures normally classify as `Design Impact`.

## Recommended Recipient

- `Local Fix` -> `implementation_engineer`
- `Validation Gap` -> `api_e2e_engineer`
- `Design Impact` -> `solution_designer`
- `Requirement Gap` -> `solution_designer`
- `Unclear` -> `solution_designer`

Routing note:
- If a `Local Fix` changes validated behavior or weakens existing validation evidence, the updated implementation should return through `api_e2e_engineer` before code review resumes.

## Residual Risks

## Latest Authoritative Result

- Review Decision:
- Score Summary:
- Notes:
