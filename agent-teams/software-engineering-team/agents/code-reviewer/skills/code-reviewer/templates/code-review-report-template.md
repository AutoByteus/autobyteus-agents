# Code Review Report

Write this artifact to `code-review-report.md` in the assigned task workspace before any handoff message.

Use the approved requirements as the intended-behavior authority and the canonical shared design guidance plus this report's criteria as the technical-review authority. Earlier technical design artifacts are context, not immunity from independent implementation review.
If the review shows that an earlier design artifact was weak, incomplete, or wrong, classify that as `Design Impact`.
Keep one canonical code review report path across reruns.
Do not create versioned copies by default.
For every completed review round, first confirm the affected behavior and production-path basis, then recheck applicable prior unresolved findings, complete the current review, update this report to the latest complete result, and create or append the corresponding entry in `code-review-revision-record.md`. The initial result receives `CRR-001` with prior result `N/A`.
The latest canonical report is authoritative; the revision record is the concise chronological history for all completed review results.

Use the full report for `Implementation Review`. For `API/E2E Failure-Origin Review`, record the failure context in the review meta and scope, update only affected findings or score rationale when needed, classify the cause, and route it without repeating the full source audit or scorecard.

Do not record successful API/E2E test-code review here. Use the separate `api-e2e-test-review-report.md` template for that result.

## Review Round Meta

- Review Entry Point: `Implementation Review` / `API/E2E Failure-Origin Review`
- Requirements Doc Reviewed As Context:
- Investigation Notes Reviewed As Context:
- Design Spec Reviewed As Context:
- Supplemental Task Artifacts Reviewed As Context:
- Solution Revision Record Reviewed As Context:
- Relevant Solution Revision IDs:
- Implementation Handoff Reviewed As Context:
- Implementation Revision Record Reviewed As Context:
- Relevant Implementation Revision IDs:
- Code Review Revision Record:
- Current Code Review Revision ID: `N/A` / `CRR-*`
- Current Review Round:
- Trigger:
- Prior Review Round Reviewed:
- Latest Authoritative Round:
- Coverage Investigation Reviewed (failure-origin entry point):
- Execution Coverage Report Reviewed (failure-origin entry point):
- API/E2E Revision Record Reviewed (failure-origin entry point):
- Relevant API/E2E Revision IDs:
- Delivery Revision Record Reviewed (delivery re-entry only):
- Relevant Delivery Revision IDs:
- Failing Scenario IDs:
- Exact Failing Commands / Execution Mode:
- Failure Evidence Paths:

Round rules:
- Reuse the same finding IDs across reruns for the same unresolved issues.
- Create new finding IDs only for newly discovered review findings.
- Keep the full scorecard current on every implementation-review round. Revalidate affected and previously failing checks, and preserve still-valid evidence for unaffected checks instead of repeating the review solely to rewrite unchanged content. Do not repeat the scorecard for a failure-origin-only round.
- Set `Current Review Round` to `1` when no prior canonical result exists. If a prior report exists without a revision record, record that result as an unrecorded baseline and create `CRR-001`; never infer a prior `Pass` from missing history.

## Review Scope

- Changed implementation and behavior reviewed:
- Files / areas reviewed:
- Explicit exclusions:

## Upstream Behavior And Production-Path Basis Confirmation

Complete this understanding and alignment foundation before the implementation structural checks. Understand the approved business intent and relevant existing behavior, then start from the design spec's behavior map, verify it against the implementation, and record status plus implementation evidence instead of restating unchanged content. This is not a review or reapproval of the business decision. For a failure-origin-only round, update only the affected behavior and material premise.

- Approved requirements basis understood:
- Design-spec behavior map verified against the implementation:
- Design basis and round confirmed:
- Behavior-basis status: `Confirmed` / `Contradicted` / `Unclear`
- Changed or newly discovered behavior, if any:
- Remaining material ambiguity, if any:

| Behavior ID | Current Status (`Confirmed`/`Contradicted`/`Unclear`/`Newly Discovered`) | Current Implementation Path And Lifecycle Evidence | Contradicting Or Newly Discovered Supported Behavior Evidence (Only When Applicable) |
| --- | --- | --- | --- |
|  |  |  |  |

Reuse the design spec's behavior IDs. Assign a provisional ID only when concrete evidence reveals a relevant supported behavior missing upstream; route it to `solution_designer` and do not pass until the upstream map is corrected. Do not create a behavior from technical possibility alone. `Contradicted`, `Unclear`, or `Newly Discovered` behavior prevents an implementation-review pass.

After the initial review result, complete the applicable prior-finding resolution table in `code-review-revision-record.md` after confirming this behavior basis and before finalizing prospective new findings.

## Structural / Design Checks

Required for implementation review only.
Use the mandatory structural checks below on every implementation review. Do not replace them with a smaller ad hoc checklist.
Treat the `Authoritative Boundary Rule` as one of the highest-signal structural checks in this section. Apply these checks only after establishing the behavior basis above; validate any material assumed scenario before using it in a finding or score.
Work from macro structure toward detail: data-flow spine, ownership and boundaries, interfaces and dependencies, subsystem and file responsibilities, then local implementation and test readiness.
Review test structure proportionately when test files are relevant. Do not apply implementation-source size thresholds to tests, and do not fail a coherent test suite merely because its files are large.

| Check | Result (`Pass`/`Fail`) | Evidence | Required Action |
| --- | --- | --- | --- |
| Task design health assessment is present, evidence-backed, and preserved by the implementation |  |  |  |
| Implementation matches approved behavior-defining supplemental artifacts |  |  |  |
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

## Source File Size And Structure Audit (If Applicable)

Complete this local source audit after the structural review above. It is required for implementation review only.
Use this section for changed source implementation files only.
Do not apply the source-file hard limit to unit, integration, API, or E2E test files.

| Source File | Effective Non-Empty Lines | `>500` Hard-Limit Check | `>220` Delta Check | SoC / Ownership Check | Placement Check | Preliminary Classification | Required Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

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

## Material Premise Validation (Only When Needed)

### Upstream Design-Review Material-Premise Decisions

| Premise ID | Current Status (`Confirmed`/`Reclassified`/`No Longer Relevant`) | Changed Evidence / Reason (Required For `Reclassified` Or `No Longer Relevant`) |
| --- | --- | --- |
|  |  |  |

Complete a detailed record only when an implementation check, prospective finding, score rationale, or introduced mechanism depends on a new or reclassified material production, failure, or lifecycle scenario. Include `Not Reachable` decisions, but preserve unchanged upstream decisions by ID instead of copying their reasoning. If none are new or reclassified, write `None`; do not search for edge cases or other hypothetical scenarios.

Use one record per distinct initiating condition when evidence, path, or consequence differs. Do not combine unrelated causes into one `A or B or C` premise.

For each new or reclassified premise, use this shape:

### `<premise-id>` — `<technical premise>`

- Origin: `New` / `Reclassified from <prior-premise-id>`
- Related approved requirement or established contract:
- Relevant behavior ID(s):
- Initiating basis kind: `User` / `System` / `Operational` / `Contract`
- Independent product-supported initiating trigger or applicable governing contract:
- Support evidence: for `User`, name the exposed product surface and supported user action; for `System`, the supported runtime event; for `Operational`, the supported operator action; for `Contract`, why the governing contract applies:
- Forward current or approved target production caller/event path that exercises the initiating basis and reaches the claimed state:
- Lifecycle preconditions and material consequence at the claimed point:
- Reachability: `Reachable` / `Not Reachable` / `Unclear`
- Review consequence / proportionate response:

Reuse the prior premise ID when reclassifying it; assign a new stable ID only to a new premise. Apply the shared product-reachability rule. A record is incomplete when its initiating basis is only the downstream client, SDK, endpoint, handler, middleware, generic infrastructure, diff, test, or proposed mechanism whose applicability is being assessed. `Reachable` requires the complete independent, forward-traced witness above; `Not Reachable` cannot drive a finding, score deduction, defect attribution, or machinery; materially `Unclear` requires investigation or routing.

## Review Scorecard (Mandatory)

Complete this summary only after the structural, local-source, legacy, cleanup, and material-premise checks above. It is mandatory for implementation-review rounds; do not repeat it for a failure-origin-only round.
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
| `8` | `Runtime Correctness And Behavioral Fidelity` |  |  |  |  |
| `9` | `No Backward-Compatibility / No Legacy Retention` |  |  |  |  |
| `10` | `Cleanup Completeness` |  |  |  |  |

Rules:
- Do not record raw numbers without explanation.
- Every row must include the reason for the score, the concrete weakness or drag, and the expected improvement.
- Every category is mandatory. Clean pass target is `>= 9.0` in every category. Any category below `9.0` is a real gap and should normally fail the review.
- Score only against approved or verified behavior, established contracts, supported operational constraints, and concrete maintainability defects. Cite the applicable premise-validation record for any material assumed scenario; `Not Reachable` cannot lower a score.
- Do not let the overall summary override a weak category. The review still follows the actual findings and mandatory checks.
- If the `Authoritative Boundary Rule` is broken, call it out explicitly in findings and in the relevant score rationale instead of hiding it under vague dependency wording.

## Findings

Rules:
- Reuse the same finding ID when the same issue persists across rounds.
- Create a new finding ID only for newly discovered issues.
- After the initial result, mark resolved or obsolete earlier findings in the current `CRR-*` entry's prior-finding resolution table instead of silently dropping them.
- Tie every finding to affected approved behavior, relevant existing behavior, an established engineering contract, or a real supported operational constraint.
- When a finding depends on an assumed production, failure, or lifecycle scenario, cite its material-premise validation ID and include the production trigger/path, evidence, material consequence, and why the required action is proportionate.
- If dead/obsolete/legacy/compatibility issues exist, enumerate each one explicitly with the concrete file/path/item, evidence, and required removal or cleanup action.

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
- Material-Premise Gate (`Pass`/`Fail`/`Blocked`):
- Score Summary:
- Failure Origin (when applicable):
- Recommended Recipient (when applicable):
- Notes:
