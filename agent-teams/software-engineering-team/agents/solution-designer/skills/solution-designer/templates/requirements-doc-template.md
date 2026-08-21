# Requirements Doc

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

## Status (`Draft`/`Design-ready`/`Refined`)

## Goal / Problem Statement

## Current And Desired Behavior (Mandatory)

Summarize how each relevant behavior works now and how it must work after the change. Use the stable behavior IDs from the investigation notes. State meaningful user, system, operational, or contract outcomes—not production-path detail or technical design—so this requirements doc remains precise and understandable on its own.

For genuinely new behavior, write `No current supported behavior`. For a refactor or cleanup with no intended behavior change, make the preserved outcome explicit.

| Behavior ID | Current Behavior | Desired Behavior | Preserved / Unchanged Behavior | Related Requirement / Acceptance-Criteria IDs |
| --- | --- | --- | --- | --- |
| BEH-001 |  |  |  |  |

## Investigation Findings

## Relevant Supplemental Task Artifacts

List only supplements that clarify or constrain requirements or acceptance criteria. Keep the complete canonical supplement inventory in the investigation notes. If none apply, write `None`.

| Artifact Path | Type / Purpose | Related Requirement IDs | Related Acceptance-Criteria IDs | Status / Approval | Relationship To Requirements |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Design Health Assessment (Mandatory)

- Change posture (`Feature`/`Bug Fix`/`Behavior Change`/`Refactor`/`Cleanup`/`Performance`/`Larger Requirement`):
- Initial design issue signal (`Yes`/`No`/`Unclear`):
- Root cause classification (`Local Implementation Defect`/`Missing Invariant`/`Boundary Or Ownership Issue`/`Duplicated Policy Or Coordination`/`File Placement Or Responsibility Drift`/`Shared Structure Looseness`/`Legacy Or Compatibility Pressure`/`No Design Issue Found`/`Unclear`):
- Refactor posture (`Likely Needed`/`Likely Not Needed`/`Deferred`/`Unclear`):
- Evidence basis:
- Requirement or scope impact:

## Recommendations

## Scope Classification (`Small`/`Medium`/`Large`)

## Scope Guardrail (Mandatory)

This is the canonical change boundary for solution design and technical review. Do not duplicate the full behavior table, functional requirements, or acceptance criteria here. Reference their stable IDs and add only the minimum boundary statement needed to prevent scope drift.

### In-Scope Use Cases

List the supported user, system, operational, or contract use cases this ticket is authorized to change. Give each use case a stable ID for requirement-to-use-case coverage.

### Out of Scope

List adjacent behaviors, policies, systems, migrations, or quality improvements this ticket does not authorize. State explicitly when a plausible security, reliability, compatibility, or operational concern belongs to a separate requirement rather than this change.

### Preserved Behavior Boundary

Reference the applicable `BEH-*`, requirement, and acceptance-criteria IDs whose outcomes must remain unchanged. Do not repeat their complete text. Add a concise cross-cutting invariant only when the behavior table's `Preserved / Unchanged Behavior` column is insufficient by itself.

### Review Authority

- Every blocking `Design Impact` or implementation-correction finding must cite an approved requirement, acceptance criterion, or preserved-behavior ID that it protects.
- A finding that would introduce new product behavior, policy, threat model, migration obligation, or operational contract is a `Requirement Gap`; it must return for explicit user approval before becoming authoritative.
- An adjacent concern outside the approved boundary may be recorded as a non-blocking risk, recommendation, or separate-ticket candidate. It must not be treated as a required design correction.
- A downstream reviewer comment does not amend this requirements basis. The solution designer must update the canonical requirements and obtain renewed user approval before a scope-changing proposal can govern design or implementation.

## Functional Requirements

List each item with a stable `requirement_id`.

## Acceptance Criteria

List each item with a stable `acceptance_criteria_id`.

## Constraints / Dependencies

## Persisted Data Outcome (When Applicable)

- Stored subject / location:
- Required outcome (`Not Affected`/`Directly Usable — No Migration`/`Discard or Rebuild`/`Migration Required`/`Undetermined`):
- Existing data to preserve, discard/rebuild, transform, or quarantine:
- Unacceptable data loss or corruption:
- Relevant availability, maintenance-window, or rollout constraints:
- Related requirement and acceptance-criteria IDs:

## Assumptions

## Risks / Open Questions

## Requirement-To-Use-Case Coverage

## Acceptance-Criteria-To-Scenario Intent

## Approval Status
