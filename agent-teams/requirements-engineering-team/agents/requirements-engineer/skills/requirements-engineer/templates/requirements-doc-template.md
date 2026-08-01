# Requirements Document

Write this artifact to `requirements-doc.md` in the assigned task workspace.
Keep one canonical path across refinement rounds.

## Document Status

- Status: `Draft` / `Ready for Approval` / `Approved` / `Blocked`
- Current requirements revision ID: `RER-*` / `N/A`
- Request / ticket:
- Requirements owner:
- Date:
- Approval state and reference:

## Problem And Desired Outcome

- Problem:
- Affected actors or systems:
- Desired outcome:
- Observable definition of success:

## Relevant Current And Desired Behavior

Use stable behavior IDs. Record only behavior relevant to this request.

| Behavior ID | Kind (`User`/`System`/`Operational`/`Contract`) | Evidence-Backed Current Behavior | Desired Behavior | Intentionally Preserved Behavior | Investigation Evidence |
| --- | --- | --- | --- | --- | --- |
| BEH-001 |  |  |  |  |  |

For genuinely new behavior, write `No current supported behavior` and identify the approved target trigger. Do not create behavior from a synthetic caller, manual internal-state manipulation, or mechanical possibility.

## Stakeholders, Actors, And Outcomes

| Actor / Stakeholder | Goal Or Responsibility | Required Outcome | Important Constraint |
| --- | --- | --- | --- |
|  |  |  |  |

## Scope

### In Scope

### Out Of Scope

### Non-Goals

## Requirements

| Requirement ID | Requirement | Related Behavior IDs | Priority / Criticality | Rationale | Source / Decision Reference |
| --- | --- | --- | --- | --- | --- |
| REQ-001 |  |  |  |  |  |

Requirements state behavior or measurable constraints. Do not prescribe target modules, files, classes, services, or data-flow structure unless the user explicitly requires a concrete implementation constraint.

## Acceptance Criteria

| Acceptance-Criteria ID | Related Requirement IDs | Preconditions / Trigger | Observable Expected Outcome | Important Alternate Or Failure Outcome | Verification Intent |
| --- | --- | --- | --- | --- | --- |
| AC-001 |  |  |  |  |  |

## Relevant Scenarios And Journeys

Use user journeys only when a user actually initiates or experiences the behavior. Backend and infrastructure requirements may instead use system, operational, or contract scenarios.

| Scenario ID | Kind (`User`/`System`/`Operational`/`Contract`) | Actor / Initiator / Governing Contract | Starting Condition | Steps Or Event Sequence | Expected Outcome | Related Requirement / AC IDs |
| --- | --- | --- | --- | --- | --- | --- |
| SCN-001 |  |  |  |  |  |  |

## UI, Interaction, And Experience Requirements

- Applicable: `Yes` / `No`
- Linked UI/UX or interaction supplement:
- Linked runnable prototype and applicable support artifacts:
- UI/UX user-confirmation reference:
- Approved visual-reference baseline:
- Requirements-defining visual or interaction details:
- Illustrative details left to downstream design and implementation:
- Required screens, states, transitions, feedback, responsive behavior, or accessibility outcomes:
- Explicitly unresolved product decisions:

When this section is not applicable, write `N/A` for prototype-specific fields rather than leaving their approval state ambiguous.

## Quality And Non-Functional Requirements

Include only applicable, evidence-backed, or user-approved constraints.

| Quality ID | Area (`Performance`/`Reliability`/`Security`/`Privacy`/`Accessibility`/`Compliance`/`Operability`/`Compatibility`/`Other`) | Measurable Requirement Or Constraint | Conditions / Scope | Verification Intent |
| --- | --- | --- | --- | --- |
| QR-001 |  |  |  |  |

## Data Continuity And Acceptable Loss

- Persisted or external data affected: `No` / `Yes` / `Unknown`
- Data or state that must be preserved:
- Loss, reset, rebuild, or regeneration that is acceptable:
- Retention, privacy, compliance, volume, downtime, or operational constraints:
- Unknowns requiring downstream investigation:

State the required outcome and constraints. Do not prescribe a migration merely because a schema changes; downstream architecture determines the transition mechanism.

## External Contracts And Dependencies

| Contract / Dependency | Required Behavior Or Constraint | Evidence / Authority | Uncertainty Or Risk |
| --- | --- | --- | --- |
|  |  |  |  |

## Supplemental Artifacts

| Artifact Path | Purpose | Related Requirement / AC IDs | Status | Approval Applicability / State |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Assumptions

| Assumption ID | Assumption | Why It Is Necessary | Validation Plan / Owner | Status |
| --- | --- | --- | --- | --- |
| ASM-001 |  |  |  |  |

## Open Decisions And Questions

| Decision / Question ID | Question | Why It Matters | Options / Evidence | Decision Owner | Status |
| --- | --- | --- | --- | --- | --- |
| DEC-001 |  |  |  |  |  |

## Traceability

| Requirement ID | Behavior IDs | Acceptance-Criteria IDs | Scenario IDs | Supplemental / Prototype Evidence |
| --- | --- | --- | --- | --- |
| REQ-001 |  |  |  |  |

## Downstream Architecture Input

- Product and system constraints architecture must preserve:
- Decisions intentionally deferred to architecture design:
- Technical facts architecture should verify:
- Known feasibility or integration risks:

This section transfers constraints and open technical questions. It does not define the target architecture.

## Readiness Check

- Relevant current behavior is evidence-backed: `Yes` / `No`
- Desired and preserved behavior are explicit: `Yes` / `No`
- Scope and non-goals are clear: `Yes` / `No`
- Requirements and acceptance criteria are testable and traceable: `Yes` / `No`
- Applicable scenarios are covered: `Yes` / `No`
- Prototype and supplemental evidence is integrated consistently: `Yes` / `No` / `N/A`
- Applicable UI/UX approval and final visual-reference basis are recorded: `Yes` / `No` / `N/A`
- Material assumptions and open decisions are visible: `Yes` / `No`
- User approval received: `Yes` / `No`
- Architecture-ready: `Yes` / `No`
- Remaining blocker:
