# Design Review Report

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

Keep one canonical design-review report path across reruns.
Do not create versioned copies by default.
For every completed review round, first confirm the affected behavior and production-path basis, then recheck applicable prior unresolved findings, complete the current review, update this report to the latest complete result, and create or append the corresponding entry in `architecture-review-revision-record.md`. The initial result receives `ARCH-REV-001` with prior decision `N/A`.
The latest canonical report is authoritative; the revision record is the concise chronological history for all rounds.

## Review Round Meta

- Upstream Requirements Doc:
- Upstream Investigation Notes:
- Upstream Requirements Revision Record:
- Reviewed Design Spec:
- Supplemental Task Artifacts Reviewed:
- Architecture Design Revision Record Reviewed:
- Relevant Architecture Design Revision IDs:
- Architecture Review Revision Record:
- Current Architecture Review Revision ID: `N/A` / `ARCH-REV-*`
- Current Review Round:
- Trigger:
- Prior Review Round Reviewed:
- Latest Authoritative Round:
- Current-State Evidence Basis:

## Routing Classification Review

- Task size (`Small`/`Medium`/`Large`):
- Architectural risk (`Low`/`High`):
- Classification rationale reviewed:
- Independent Architecture Review required by the classification: `Yes` / `No` / `Routing inconsistency`
- Classification evidence or correction required:

Round rules:
- Reuse the same finding IDs across reruns for the same unresolved design-review issues.
- Create new finding IDs only for newly discovered issues.
- Keep the current structural verdicts complete. Revalidate affected and previously failing checks, and preserve still-valid evidence for unaffected checks instead of repeating the review solely to rewrite unchanged content.
- Set `Current Review Round` to `1` when no prior canonical result exists. If a prior report exists without a revision record, record that result as an unrecorded baseline and create `ARCH-REV-001`; never infer a prior `Pass` from missing history.

## Upstream Behavior And Production-Path Basis Confirmation

Complete this understanding and alignment gate before applying the structural checks below. Understand the approved business intent and relevant existing behavior, then confirm the design spec's behavior map against the approved requirements, investigation evidence, and real current code. This is technical validation of the architecture basis, not a review or reapproval of the business decision and not an invitation to reconstruct behavior from isolated code.

- Overall Basis Status (`Confirmed`/`Contradicted`/`Blocked`):
- Approved requirements / intended behavior understood:
- Relevant existing behavior and evidence confirmed:
- Scope guardrail confirmed (`In-Scope Use Cases` / `Out of Scope` / `Preserved Behavior Boundary` / `Review Authority`):
- Approved change, preserved behavior, and outside scope understood:
- Every prospective blocking `Design Impact` finding is traceable to an approved requirement, acceptance criterion, or preserved-behavior ID (`Yes`/`No`):
- Remaining material ambiguity, if any:

| Behavior ID | Kind | Design Alignment With Approved Intent (`Pass`/`Fail`) | Approved Trigger / Contract And Current-State Evidence (`Pass`/`Fail`/`Unclear`) | Target Outcome / Path / Spine Coherence (`Pass`/`Fail`/`Unclear`) | Status (`Confirmed`/`Needs Correction`/`Unclear`) | Required Action |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

Reuse the design spec's stable behavior IDs. Assign a provisional ID only when concrete evidence reveals a relevant supported behavior missing upstream; classify that as a `Requirement Gap`, route it to `/architecture_designer`, and do not treat the proposed behavior as authoritative until the requirements basis receives any required user approval. Do not create a behavior row from technical possibility alone. An overall `Confirmed` status requires every relevant row to be `Confirmed` and every prospective `Design Impact` blocker to pass scope traceability.

After the initial review result, complete the applicable prior-finding resolution table in `architecture-review-revision-record.md` after confirming this behavior basis and before finalizing prospective new findings.

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

Complete this section only when a structural check, prospective finding, or proposed or existing mechanism depends on a material production, failure, or lifecycle scenario not already established by the behavior basis. Include premises rejected as `Not Reachable`; otherwise write `None`. Do not use this section to search for edge cases or other hypothetical scenarios.

Use one record per distinct initiating condition when evidence, path, or consequence differs. Do not combine unrelated causes into one `A or B or C` premise.

For each recorded premise, use this shape:

### `<premise-id>` — `<technical premise>`

- Related approved requirement or established contract:
- Relevant behavior ID(s):
- Initiating basis kind: `User` / `System` / `Operational` / `Contract`
- Independent product-supported initiating trigger or applicable governing contract:
- Support evidence: for `User`, name the exposed product surface and supported user action; for `System`, the supported runtime event; for `Operational`, the supported operator action; for `Contract`, why the governing contract applies:
- Forward current or approved target production caller/event path that exercises the initiating basis and reaches the claimed state:
- Lifecycle preconditions and material consequence at the claimed point:
- Reachability: `Reachable` / `Not Reachable` / `Unclear`
- Review consequence / proportionate response:

Use a stable premise ID and apply the shared product-reachability rule. A record is incomplete when its initiating basis is only the downstream client, SDK, endpoint, handler, middleware, generic infrastructure, or proposed mechanism whose applicability is being assessed. `Reachable` requires the complete independent, forward-traced witness above; `Not Reachable` cannot drive a finding or in-scope machinery; materially `Unclear` requires investigation or a blocked decision.

## Unresolved Approved-Behavior Or Current-State Gaps

Record only concrete gaps discovered while validating the approved behavior basis or performing the structural review. Do not brainstorm missing use cases. If none remain, write `None`.

| Item | Why It Matters | Required Action | Status |
| --- | --- | --- | --- |
|  |  |  |  |

## Review Decision

- `Pass`: the upstream behavior basis is confirmed, the design is ready for implementation, and no in-scope machinery or finding depends on an unsupported material premise.
- `Fail`: the design needs upstream rework before implementation should proceed.
- `Blocked`: the review cannot finish because required input, evidence, or clarification is missing.

## Findings

If none, write `None`.
Otherwise list actionable findings with:
- type
- finding ID
- severity
- approved requirement, acceptance criterion, or preserved-behavior ID protected
- scope status (`Within Approved Scope` / `Requirement Gap — User Approval Required` / `Out-of-Scope Recommendation`)
- whether the required update changes approved behavior (`Yes`/`No`); if `Yes`, record user-approval status
- affected approved behavior, relevant existing behavior, journey, or established contract
- evidence
- material-premise validation ID and its supporting production trigger/path evidence when the finding depends on an assumed production, failure, or lifecycle scenario
- required update
- why the required update is proportionate to the verified consequence
- recommended recipient

Rules:
- A blocking `Design Impact` finding must have scope status `Within Approved Scope` and cite its approved authority. A `Requirement Gap — User Approval Required` may block progression while clarification is unresolved, but it must not prescribe the proposed new behavior as a mandatory design correction before approval.
- An `Out-of-Scope Recommendation` is non-blocking and belongs under residual risks, recommendations, or a separate-ticket note.
- A reachable technical premise proves that a state can occur; it does not prove that the ticket authorizes changing that behavior.
- Reuse the same finding ID when the same issue persists across rounds.
- Create a new finding ID only for newly discovered issues.
- After the initial result, mark resolved or obsolete earlier findings in the current `ARCH-REV-*` entry's prior-finding resolution table instead of silently dropping them.

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
