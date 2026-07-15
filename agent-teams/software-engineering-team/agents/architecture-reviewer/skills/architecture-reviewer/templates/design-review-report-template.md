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

## Prior Findings Resolution Check (Mandatory On Round >1)

Complete this before evaluating new-round content.

| Prior Round | Finding ID | Previous Severity | Current Resolution | Evidence | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Upstream Behavior And Production-Path Basis Verdict

Complete this gate before applying the structural checks below. Validate the design spec's behavior map against the approved requirements, investigation evidence, and real current code. This is technical validation of the solution basis, not a second business-approval step and not an invitation to reconstruct behavior from isolated code.

- Overall Basis Verdict (`Pass`/`Fail`/`Blocked`):
- Approved requirements / intended behavior checked:
- Relevant existing behavior and evidence checked:
- Approved change, preserved behavior, and outside scope checked:
- Remaining material ambiguity, if any:

| Behavior ID | Kind | Approved Intent Alignment (`Pass`/`Fail`) | Approved Trigger / Contract And Current-State Evidence (`Pass`/`Fail`/`Unclear`) | Target Outcome / Path / Spine Coherence (`Pass`/`Fail`/`Unclear`) | Status (`Confirmed`/`Needs Correction`/`Unclear`) | Required Action |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

Reuse the design spec's stable behavior IDs. Assign a provisional ID only when concrete evidence reveals a relevant supported behavior missing upstream; route it to `solution_designer` and do not pass until the upstream map is corrected. Do not create a behavior row from technical possibility alone. An overall `Pass` requires every relevant row to be `Confirmed`.

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

## Spine Inventory Verdict

| Spine ID | Scope | Spine Is Readable? (`Pass`/`Fail`) | Narrative Is Clear? (`Pass`/`Fail`) | Facade Vs Governing Owner Is Clear? (`Pass`/`Fail`/`N/A`) | Main Domain Subject Naming Is Clear? (`Pass`/`Fail`) | Ownership Is Clear? (`Pass`/`Fail`) | Off-Spine Concerns Stay Off Main Line? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |

## Boundary Encapsulation Verdict

| Boundary / Owner | Authoritative Public Entry Point Is Clear? (`Pass`/`Fail`) | Internal Owned Mechanisms Stay Internal? (`Pass`/`Fail`) | Caller Bypass Risk Is Controlled? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Dependency Direction / Forbidden Shortcut Verdict

| Owner / Boundary | Allowed Dependencies Are Clear? (`Pass`/`Fail`) | Forbidden Shortcuts Are Explicit? (`Pass`/`Fail`) | Direction Is Coherent With Ownership? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Interface Boundary Verdict

| Interface / API / Query / Command / Method | Subject Is Clear? (`Pass`/`Fail`) | Responsibility Is Singular? (`Pass`/`Fail`) | Identity Shape Is Explicit? (`Pass`/`Fail`) | Generic Boundary Risk (`Low`/`Medium`/`High`) | Verdict (`Pass`/`Fail`) |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Existing Capability / Subsystem Reuse Verdict

| Need / Concern | Existing Capability Area Was Checked? (`Pass`/`Fail`) | Reuse / Extension Decision Is Sound? (`Pass`/`Fail`) | New Support Piece Is Justified? (`Pass`/`Fail`/`N/A`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

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

## File Responsibility Mapping Verdict

| File | Responsibility Is Singular And Clear? (`Pass`/`Fail`) | Responsibility Matches The Intended Owner/Boundary? (`Pass`/`Fail`) | Responsibilities Were Re-Tightened After Shared-Structure Extraction? (`Pass`/`Fail`/`N/A`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Subsystem / Folder / File Placement Verdict

| Path / Item | Target Placement Is Clear? (`Pass`/`Fail`) | Folder Matches Owning Boundary? (`Pass`/`Fail`) | Mixed-Layer Or Over-Split Risk (`Low`/`Medium`/`High`) | Verdict (`Pass`/`Fail`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Removal / Decommission Completeness Verdict

| Item / Area | Redundant / Obsolete Piece To Remove Is Named? (`Pass`/`Fail`) | Replacement Owner / Structure Is Clear? (`Pass`/`Fail`/`N/A`) | Removal / Decommission Scope Is Explicit? (`Pass`/`Fail`) | Verdict (`Pass`/`Fail`) | Notes |
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

## Material Premise Validation (Only When Needed)

Complete this section only when a structural check, prospective finding, or proposed or existing mechanism depends on a material production, failure, or lifecycle scenario whose validity is not already established by the behavior basis. Include considered premises rejected as `Not Reachable`; otherwise write `None`. Do not use this section to search for edge cases or hypothetical failures.

Use one record per distinct initiating condition when evidence, path, or consequence differs. Do not combine unrelated causes into one `A or B or C` premise.

For each recorded premise, use this shape:

### `<premise-id>` — `<technical premise>`

- Related approved requirement or established contract:
- Relevant behavior ID(s):
- Supported initiating trigger or governing contract, with evidence:
- Concrete current or approved target production caller/event path from that trigger to the claimed state:
- Lifecycle preconditions and material consequence at the claimed point:
- Reachability: `Reachable` / `Not Reachable` / `Unclear`
- Review consequence / proportionate response:

Use a stable premise ID so downstream roles can preserve or reclassify the decision by reference. Apply the shared reachability rule. A `Reachable` label without the complete trigger-to-consequence witness above is invalid. Keep a `Not Reachable` premise in this section with the evidence explaining why the referenced behavior and production path cannot produce it; it cannot become a finding or justify in-scope machinery. A materially `Unclear` premise requires investigation or a blocked decision rather than speculative machinery.

## Unresolved Approved-Behavior Or Current-State Gaps

Record only concrete gaps discovered while validating the approved behavior basis or performing the structural review. Do not brainstorm missing use cases. If none remain, write `None`.

| Item | Why It Matters | Required Action | Status |
| --- | --- | --- | --- |
|  |  |  |  |

## Review Decision

- `Pass`: the upstream behavior basis passes, the design is ready for implementation, and no in-scope machinery or finding depends on an unsupported material premise.
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
- material-premise validation ID when the finding depends on an assumed production, failure, or lifecycle scenario
- current or target-production evidence for that scenario
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
- Material-Premise Gate (`Pass`/`Fail`/`Blocked`):
- Notes:
