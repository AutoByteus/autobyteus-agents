# Design Review Report

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

Keep one canonical design-review report path across reruns.
Do not create versioned copies by default.
On round `>1`, recheck prior unresolved findings first, update the prior-findings resolution section, and then record the new round result.
The latest round is authoritative; earlier rounds remain history.

## Review Round Meta

- Upstream Requirements Doc:
- Upstream Investigation Notes:
- Reviewed Design Spec:
- Supplemental Task Artifacts Reviewed:
- Current Review Round:
- Trigger:
- Prior Review Round Reviewed:
- Latest Authoritative Round:
- Current-State Evidence Basis:

Round rules:
- Reuse the same finding IDs across reruns for the same unresolved design-review issues.
- Create new finding IDs only for newly discovered issues.

## Round History

| Round | Trigger | Prior Unresolved Findings Rechecked | New Findings Found | Review Decision | Latest Authoritative | Notes |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Approved-Behavior And Current-Reality Basis

This is the basis for the technical review, not a second business-approval step. Understand the approved behavior and verify the relevant current production reality before applying the structural checks below.

- Approved requirements / intended behavior summary:
- Relevant existing behavior:
- Approved behavior change:
- Behavior explicitly preserved or outside scope:
- Remaining material ambiguity, if any:

| Journey ID | Relevant User / System / Operational Journey | Supported Trigger | Meaningful Outcome | Current / Target Production Path And Lifecycle Boundary | Evidence |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Use stable journey IDs so edge-case decisions and downstream reviews can reference a complete journey without repeating it.

Apply the remaining technical sections proportionately. If a whole section is genuinely inapplicable, write `N/A` with a short reason; do not invent a design concern to populate the template.

## Supplemental Artifact Coherence Verdict

If no supplemental task artifacts exist, write `None`.

| Artifact | Purpose And Scope Are Clear? (`Pass`/`Fail`) | Linked To Relevant Core Artifacts? (`Pass`/`Fail`) | Internally Complete? (`Pass`/`Fail`) | Consistent With Related Core Artifacts? (`Pass`/`Fail`) | Status And Approval Applicability Are Clear? (`Pass`/`Fail`) | Required Action |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Task Design Health Assessment Verdict

| Assessment Area | Result (`Pass`/`Fail`) | Evidence | Required Action |
| --- | --- | --- | --- |
| Assessment is present for the current task posture |  |  |  |
| Root-cause classification is explicit and evidence-backed |  |  |  |
| Refactor needed now / no refactor needed / deferred decision is explicit |  |  |  |
| Refactor decision is supported by the concrete design sections or residual-risk rationale |  |  |  |

## Prior Findings Resolution Check (Mandatory On Round >1)

| Prior Round | Finding ID | Previous Severity | Current Resolution | Evidence | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Spine Inventory Verdict

| Spine ID | Scope | Spine Is Readable? (`Pass`/`Fail`) | Narrative Is Clear? (`Pass`/`Fail`) | Facade Vs Governing Owner Is Clear? (`Pass`/`Fail`/`N/A`) | Main Domain Subject Naming Is Clear? (`Pass`/`Fail`) | Ownership Is Clear? (`Pass`/`Fail`) | Off-Spine Concerns Stay Off Main Line? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |

## Subsystem / Capability-Area Allocation Verdict

| Subsystem / Capability Area | Ownership Allocation Is Clear? (`Pass`/`Fail`) | Reuse / Extend / Create-New Decision Is Sound? (`Pass`/`Fail`) | Supports The Right Spine Owners? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Reusable Owned Structures Verdict

| Repeated Structure / Logic | Extraction Need Was Evaluated? (`Pass`/`Fail`) | Shared File Choice Is Sound? (`Pass`/`Fail`/`N/A`) | Ownership Of Shared Structure Is Clear? (`Pass`/`Fail`/`N/A`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Shared Structure / Data Model Tightness Verdict

| Shared Structure / Type / Schema | One Clear Meaning Per Field? (`Pass`/`Fail`) | Redundant Attributes Removed? (`Pass`/`Fail`) | Overlapping Representation Risk Is Controlled? (`Pass`/`Fail`) | Shared Core Vs Specialized Variant / Composition Decision Is Sound? (`Pass`/`Fail`/`N/A`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Removal / Decommission Completeness Verdict

| Item / Area | Redundant / Obsolete Piece To Remove Is Named? (`Pass`/`Fail`) | Replacement Owner / Structure Is Clear? (`Pass`/`Fail`/`N/A`) | Removal / Decommission Scope Is Explicit? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## File Responsibility Mapping Verdict

| File | Responsibility Is Singular And Clear? (`Pass`/`Fail`) | Responsibility Matches The Intended Owner/Boundary? (`Pass`/`Fail`) | Responsibilities Were Re-Tightened After Shared-Structure Extraction? (`Pass`/`Fail`/`N/A`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Dependency Direction / Forbidden Shortcut Verdict

| Owner / Boundary | Allowed Dependencies Are Clear? (`Pass`/`Fail`) | Forbidden Shortcuts Are Explicit? (`Pass`/`Fail`) | Direction Is Coherent With Ownership? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Boundary Encapsulation Verdict

| Boundary / Owner | Authoritative Public Entry Point Is Clear? (`Pass`/`Fail`) | Internal Owned Mechanisms Stay Internal? (`Pass`/`Fail`) | Caller Bypass Risk Is Controlled? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Interface Boundary Verdict

| Interface / API / Query / Command / Method | Subject Is Clear? (`Pass`/`Fail`) | Responsibility Is Singular? (`Pass`/`Fail`) | Identity Shape Is Explicit? (`Pass`/`Fail`) | Generic Boundary Risk (`Low`/`Medium`/`High`) | Verdict (`Pass`/`Fail`) |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Subsystem / Folder / File Placement Verdict

| Path / Item | Target Placement Is Clear? (`Pass`/`Fail`) | Folder Matches Owning Boundary? (`Pass`/`Fail`) | Mixed-Layer Or Over-Split Risk (`Low`/`Medium`/`High`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Existing Capability / Subsystem Reuse Verdict

| Need / Concern | Existing Capability Area Was Checked? (`Pass`/`Fail`) | Reuse / Extension Decision Is Sound? (`Pass`/`Fail`) | New Support Piece Is Justified? (`Pass`/`Fail`/`N/A`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Legacy / Backward-Compatibility Verdict

Do not classify a general version-agnostic reader as backward compatibility merely because it safely ignores irrelevant extra fields. When migration is approved, do not classify migration-owned historical schema files as runtime legacy retention when they remain isolated from current business paths.

| Area | Compatibility Wrapper / Dual-Path / Legacy Retention Exists? (`Yes`/`No`) | Clean-Cut Removal Is Explicit? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Persisted-Data Transition Verdict (When Applicable)

Review the approved decision and its evidence. A schema or model change alone is not proof that migration is required.

| Area / Stored Subject | Approved Decision | Representative Reader / Semantic / Invariant Evidence Is Sufficient? (`Pass`/`Fail`) | Direct Use, Rebuild, Or Migration Choice Is Proportionate? (`Pass`/`Fail`) | Migration Safety Is Complete If Required? (`Pass`/`Fail`/`N/A`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

For `Migration Required`, verify isolated ownership, ordering, validation, completion gating, interruption/recovery, and applicable rollout constraints. For other decisions, do not demand migration machinery.

## Change / Refactor Safety Verdict

| Area | Sequence Is Realistic? (`Pass`/`Fail`) | Temporary Seams Are Explicit? (`Pass`/`Fail`) | Cleanup / Removal Is Explicit? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Example Adequacy Verdict

| Topic / Area | Example Was Needed? (`Yes`/`No`) | Example Is Present And Clear? (`Pass`/`Fail`/`N/A`) | Bad / Avoided Shape Is Explained When Helpful? (`Pass`/`Fail`/`N/A`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Material Edge-Case Reachability And Proportionality

Record every material edge case or technical premise that arises from the technical checks and is actually considered while deciding a finding or additional state, APIs, abstractions, coordination, or recovery behavior. Include scenarios rejected as `Not Reachable`; if none arise, write `None`. This section preserves check-driven reasoning; it is not a request to brainstorm edge cases before review.

For each recorded premise, use this shape:

### `<edge-case-id>` — `<technical premise>`

- Related approved requirement or established contract:
- Relevant journey ID(s):
- Actual current / approved target system behavior and lifecycle at the claimed point:
- Reachability reasoning and evidence:
- Reachability: `Reachable` / `Not Reachable` / `Unclear`
- Review consequence / proportionate response:

Use a stable edge-case ID so downstream roles can preserve or reclassify the decision by reference. Apply the shared reachability rule. Keep a `Not Reachable` premise in this section with the evidence explaining why the referenced journey cannot produce it; it cannot become a finding. A materially `Unclear` premise requires investigation or a blocked decision rather than speculative machinery.

## Missing Use Cases / Open Unknowns

| Item | Why It Matters | Required Action | Status |
| --- | --- | --- | --- |
|  |  |  |  |

## Review Decision

- `Pass`: the design is ready for implementation.
- `Fail`: the design needs upstream rework before implementation should proceed.
- `Blocked`: the review cannot finish because required input, evidence, or clarification is missing.

## Findings

If none, write `None`.
Otherwise list actionable findings with:
- type
- finding ID
- severity
- affected approved behavior, relevant existing behavior, journey, or established contract
- evidence
- current or target-production reachability evidence when the finding depends on an edge case or lifecycle premise
- required update
- why the required update is proportionate to the verified consequence
- recommended recipient

Rules:
- Reuse the same finding ID when the same issue persists across rounds.
- Create a new finding ID only for newly discovered issues.
- Mark resolved or obsolete earlier findings in the prior-findings resolution table instead of silently dropping them.

## Classification

- `Design Impact`: the design spec itself needs revision before implementation can proceed safely.
- `Requirement Gap`: intended behavior, scope, or acceptance criteria are still missing or ambiguous.
- `Unclear`: the issue is cross-cutting, low-confidence, or cannot yet be classified cleanly.

## Recommended Recipient

## Residual Risks

## Latest Authoritative Result

- Review Decision:
- Notes:
