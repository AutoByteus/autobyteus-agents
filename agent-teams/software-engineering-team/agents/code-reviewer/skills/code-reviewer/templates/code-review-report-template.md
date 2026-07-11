# Code Review Report

Write this artifact to `code-review-report.md` in the assigned task workspace before any handoff message.

Use earlier design artifacts as context only.
The review authority is the canonical shared design guidance and the review criteria in this report.
If the review shows that an earlier design artifact was weak, incomplete, or wrong, classify that as `Design Impact`.
Keep one canonical code review report path across reruns.
Do not create versioned copies by default.
On round `>1`, recheck prior unresolved findings first, update the prior-findings resolution section, and then record the new round result.
The latest round is authoritative; earlier rounds remain history.

Use the full report for `Implementation Review`. For `API/E2E Failure-Origin Review`, record the failure context in the review meta and scope, update only affected findings or score rationale when needed, classify the cause, and route it without repeating the full source audit or scorecard.

Do not record successful API/E2E test-code review here. Use the separate `api-e2e-test-review-report.md` template for that result.

## Review Round Meta

- Review Entry Point: `Implementation Review` / `API/E2E Failure-Origin Review`
- Requirements Doc Reviewed As Context:
- Supplemental Solution Artifacts Reviewed As Context:
- Current Review Round:
- Trigger:
- Prior Review Round Reviewed:
- Latest Authoritative Round:
- Investigation Notes Reviewed As Context:
- Design Spec Reviewed As Context:
- Design Review Report Reviewed As Context:
- Implementation Handoff Reviewed As Context:
- Coverage Investigation Reviewed (failure-origin entry point):
- Execution Coverage Report Reviewed (failure-origin entry point):
- Failing Scenario IDs:
- Exact Failing Commands / Execution Mode:
- Failure Evidence Paths:

Round rules:
- Reuse the same finding IDs across reruns for the same unresolved issues.
- Create new finding IDs only for newly discovered review findings.
- Update the full scorecard on every implementation-review round. Do not repeat it for a failure-origin-only round.

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

Required for implementation review only.
Use this section for changed source implementation files only.
Do not apply the source-file hard limit to unit, integration, API, or E2E test files.

| Source File | Effective Non-Empty Lines | `>500` Hard-Limit Check | `>220` Delta Check | SoC / Ownership Check | Placement Check | Preliminary Classification | Required Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

## Structural / Design Checks

Required for implementation review only.
Use the mandatory structural checks below on every implementation review. Do not replace them with a smaller ad hoc checklist.
Treat the `Authoritative Boundary Rule` as one of the highest-signal structural checks in this section.
Review test structure proportionately when test files are relevant. Do not apply implementation-source size thresholds to tests, and do not fail a coherent test suite merely because its files are large.

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
| Task design health assessment is present, evidence-backed, and preserved by the implementation |  |  |  |
| Implementation matches approved supplemental solution artifacts that constrain observable behavior |  |  |  |
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
| Relevant test scenarios and assertions are clear and requirement-aligned |  |  |  |
| Test fixtures/helpers are reasonably reusable and test structure remains coherent |  |  |  |
| No stale, duplicated, or compatibility-only tests are retained in changed scope |  |  |  |
| API/E2E readiness for the next workflow stage |  |  |  |

## Review Scorecard (Mandatory)

Mandatory for implementation-review rounds. Do not repeat it for a failure-origin-only round.
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
| `7` | `API/E2E Readiness` |  |  |  |  |
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

## Legacy / Backward-Compatibility Verdict

A general version-agnostic reader is not backward compatibility merely because it safely ignores irrelevant extra fields. Approved historical schema files confined to a required migration subsystem are also not current-runtime legacy behavior.

| Check | Result (`Pass`/`Fail`) | Notes |
| --- | --- | --- |
| No backward-compatibility mechanisms in changed scope |  |  |
| No legacy old-behavior retention in changed scope |  |  |
| Dead/obsolete code cleanup completeness in changed scope |  |  |
| Approved persisted-data transition decision is followed without unnecessary migration work |  |  |
| No version-specific dual reads/writes or request-time old-shape fallback exists |  |  |
| Approved transition mechanics match the reviewed design, including migration safety only when required |  |  |

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
- `Local Fix`: bounded implementation, packaging, test, fixture, environment, execution, or report correction with no upstream design/requirement update needed
- `Design Impact`: structural issue in code or earlier design artifact was weak/wrong/incomplete
- `Requirement Gap`: missing or ambiguous intended behavior
- `Unclear`: cross-cutting issue that cannot be classified from available evidence
- Structural failures normally classify as `Design Impact`.

## Recommended Recipient

- `Local Fix` -> `implementation_engineer` when the bounded fix is in implementation-owned source or packaging
- `Local Fix` -> `api_e2e_engineer` when the bounded fix is an invalid/stale test, fixture, environment, execution, or report problem
- `Design Impact` -> `solution_designer`
- `Requirement Gap` -> `solution_designer`
- `Unclear` -> `solution_designer`

Routing note:
- Implementation-owned fixes return through implementation review and API/E2E again.
- API/E2E-owned fixes return to API/E2E execution; a later pass returns for the separate proportional test-code review before delivery.

## Residual Risks

## Latest Authoritative Result

- Review Decision:
- Review Entry Point:
- Score Summary:
- Failure Origin (when applicable):
- Recommended Recipient (when applicable):
- Notes:
