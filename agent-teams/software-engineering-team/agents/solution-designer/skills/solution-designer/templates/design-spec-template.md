# Design Spec

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

## Current-State Read

Summarize the relevant current flow and lifecycle, ownership boundaries, verified coupling or fragmentation problems when any exist, and constraints that the target design must respect. Reference investigation evidence and the behavior IDs below instead of duplicating their complete production paths here. Do not imply that every task has a structural problem.

## Intended Change

## Relevant Behavior And Production-Path Map (Mandatory)

Synthesize approved intent from the requirements and relevant existing behavior from the investigation notes before making structural design decisions. Use the stable behavior IDs from investigation. A small or backend-only change may need only one system, operational, or contract row; do not invent rows for unsupported technical possibilities.

| Behavior ID | Kind (`User`/`System`/`Operational`/`Contract`) | Approved Requirement / Intent And Acceptance-Criteria IDs | Approved Trigger Or Governing Contract | Relevant Existing Behavior And Evidence Reference | Approved Change Or Preserved Outcome | Target Production Path / Lifecycle And Spine ID(s) |
| --- | --- | --- | --- | --- | --- | --- |
| BEH-001 |  |  |  |  |  |  |

The behavior map defines what real behavior the design must serve. The later data-flow spine sections define how the target technical structure carries it; they complement this map rather than replace it.

## Relevant Supplemental Task Artifacts

List every still-relevant supplement used as design evidence or context and explain its relationship to this design. Keep the complete canonical supplement inventory in the investigation notes. If none apply, write `None`.

| Artifact Path | Purpose | Related Requirement / Acceptance-Criteria IDs (When Applicable) | Relationship To This Design | Status / Approval Applicability |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Task Design Health Assessment (Mandatory)

This section is required for every task: feature request, bug fix, behavior change, refactor, cleanup, performance issue, or larger requirement.
Do not fill it with ritual text. Tie the decision to current-state evidence from the investigation notes and the real current code path.

- Change posture (`Feature`/`Bug Fix`/`Behavior Change`/`Refactor`/`Cleanup`/`Performance`/`Larger Requirement`):
- Current design issue found (`Yes`/`No`/`Unclear`):
- Root cause classification (`Local Implementation Defect`/`Missing Invariant`/`Boundary Or Ownership Issue`/`Duplicated Policy Or Coordination`/`File Placement Or Responsibility Drift`/`Shared Structure Looseness`/`Legacy Or Compatibility Pressure`/`No Design Issue Found`/`Unclear`):
- Refactor needed now (`Yes`/`No`/`Deferred`/`Unclear`):
- Evidence:
- Design response:
- Refactor rationale:
- Intentional deferrals and residual risk, if any:

Rules:
- `No refactor needed` is valid only when the existing owner, boundary, API shape, file placement, and changed data structures remain healthy for this scope.
- `Refactor needed now` must be reflected in the removal/decommission plan, final file responsibilities, dependency rules, and change/refactor sequence.
- `Deferred` must name the residual risk and explain why the current task can still leave the in-scope behavior in a coherent state.

## Terminology

- `Subsystem` / `capability area`: a larger functional area that owns a broader category of work and may contain multiple files plus optional module groupings.
- `Module`: an optional intermediate grouping inside a subsystem when the codebase benefits from it. Do not use `module` as a synonym for one file or as the default ownership term.
- `Folder` / `directory`: a physical grouping used to organize files and any optional module groupings.
- `File`: one concrete source file and the primary unit where one concrete concern should land.

## Design Reading Order

Use the sections in this template in the following reasoning order, moving from verified context to concrete structure:

1. current-state read and intended change
2. relevant behavior and production-path map plus applicable supplemental context
3. task design-health, legacy-removal, and persisted-data decisions
4. data-flow spines, ownership, and off-spine concerns
5. ownership boundaries, dependency rules, and interfaces
6. subsystem / capability-area allocation
7. draft file responsibilities -> extract reusable owned structures -> finalize file responsibilities
8. folder/path mapping
9. change sequence, tradeoffs, risks, and implementation guidance

Complete every mandatory section, but apply the detailed mappings proportionately to the actual change. For a genuinely inapplicable section, write `N/A` with a short reason. Do not invent spines, subsystems, interfaces, abstractions, or risks merely to populate the template.

## Legacy Removal Policy (Mandatory)

- Policy: `No backward compatibility; remove legacy code paths.`
- Required action: identify obsolete legacy paths/files included in this scope.
- Treat removal as first-class design work: when clearer subsystem ownership, reusable owned structures, or tighter file responsibilities make fragmented or duplicated pieces unnecessary, name and remove/decommission them in scope.
- Decision rule: the design is invalid if it depends on compatibility wrappers, dual-path behavior, or legacy fallback branches kept only for old behavior.
- A schema or model change does not by itself require persisted-data migration. Record the approved transition decision; when transformation is required, use an explicit migration boundary rather than dual-shape business logic or normal repository fallbacks.

## Persisted Data / State Transition Decision (Mandatory When Persisted Data May Be Affected)

A code-model, serialization, or storage-schema change triggers this decision, not an automatic migration. If no persisted data is affected, write `Not Affected` with a brief reason.

- Stored subject, location, representative shape, and approximate volume:
- Relevant code-model, serialization, semantic, or physical-store change:
- Normal reader/writer behavior and representative evidence:
- Required semantics and invariants under direct use:
- Physical-store, privacy/security, disposal/rebuild, and operational constraints:
- Decision (`Not Affected`/`Directly Usable — No Migration`/`Discard or Rebuild`/`Migration Required`/`Undetermined`):
- Decision rationale, including concrete benefit versus I/O, downtime, corruption, recovery, and rollout cost:
- Acceptance criteria or design constraints supported by this decision:

For `Directly Usable — No Migration`, explain why current version-agnostic runtime behavior is sufficient. A stored superset with obsolete extra fields may qualify when representative evidence proves those fields are ignored safely and required meaning remains intact.

For `Discard or Rebuild`, identify the authoritative source or rebuild mechanism and why loss of the stored copy is acceptable.

For `Undetermined`, identify the missing evidence and block dependent design decisions.

### Migration Plan (Only When Decision Is `Migration Required`)

- Current canonical schema / version:
- Older persisted schema version(s) that require transformation:
- Why direct use and discard/rebuild are insufficient:
- Migration trigger (`Startup`/`Deployment`/`Maintenance Command`/`Other`):
- Migration owner and file / subsystem location:
- Normal business/runtime path that remains current-schema-only:
- Historical-shape types or decoders confined to migration-owned code:
- Completion marker / version ledger:
- Restart-safety or idempotency strategy:
- Validation before current runtime proceeds:
- Backup / rollback / quarantine / operator-recovery strategy:
- Concurrent old/new application access risk and cutover / maintenance / deployment-sequencing decision:
- Historical migration retention decision:

| Migration Step | Source Shape / Version | Target Shape / Version | Transformation Owner | Validation | Failure / Recovery Behavior |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

When migration is required, complete or gate it before affected current runtime behavior consumes incompatible data. Keep historical-schema knowledge inside migration-owned files and out of current business services and normal repositories.

## Data-Flow Spine Inventory

List every relevant spine that matters to understanding the design.

| Spine ID | Scope (`Primary End-to-End`/`Return-Event`/`Bounded Local`) | Related Behavior ID(s) | Start | End | Governing Owner | Why It Matters |
| --- | --- | --- | --- | --- | --- | --- |
| DS-001 |  |  |  |  |  |  |

## Primary Execution Spine(s)

Write each primary execution spine as a short arrow chain, for example:
`Input -> Manager -> Run -> Backend -> Engine / Client -> Provider`

## Spine Narratives (Mandatory)

For each important spine, explain the end-to-end motion in prose so a reader can understand the design by following the flow instead of reconstructing it from files.
Keep off-spine concerns summary-level here only; use the detailed off-spine concerns section below for the full mapping.

| Spine ID | Short Narrative | Main Domain Subject Nodes | Governing Owner | Key Off-Spine Concerns |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Spine Actors / Main-Line Nodes

List only the nodes that directly advance the core request, command, or data.

## Ownership Map

State what each main-line node owns: lifecycle, state, invariants, sequencing, contracts, or transformations.

If a public facade or entry wrapper exists, say explicitly whether it is only a thin boundary or whether it is also a governing owner.

## Thin Entry Facades / Public Wrappers (If Applicable)

| Facade / Entry Wrapper | Governing Owner Behind It | Why It Exists | Must Not Secretly Own |
| --- | --- | --- | --- |
|  |  |  |  |

## Removal / Decommission Plan (Mandatory)

Use this section to make removal first-class instead of leaving the design as addition-only.

| Item To Remove / Decommission | Why It Becomes Unnecessary | Replaced By Which Owner / File / Structure | Scope (`In This Change`/`Follow-up`) | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Return Or Event Spine(s) (If Applicable)

Write the return or event flow on the same principle as the execution spine.

## Bounded Local / Internal Spines (If Applicable)

Use this section when an event loop, worker loop, state machine, dispatch cycle, or callback flow materially shapes one owner's behavior.
For each one, name:
- parent owner
- short arrow chain
- why this bounded local spine matters

## Off-Spine Concerns Around The Spine

Use this as the full off-spine concern inventory.
Do not repeat the same mapping again in another section.

| Off-Spine Concern | Related Spine ID(s) | Serves Which Owner | Responsibility | Why It Exists | Risk If Misplaced On Main Line |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Ownership Boundaries

Explain where authority changes hands and what must stay encapsulated inside each owner.
Name which boundaries are authoritative public entrypoints versus internal owned mechanisms that should stay behind them.

## Boundary Encapsulation Map

| Authoritative Boundary | Internal Owned Mechanism(s) It Encapsulates | Upstream Callers That Must Use The Boundary | Forbidden Bypass Shape | If Boundary API Is Too Thin, Fix By |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Dependency Rules

State who may depend on, call, or emit to whom, and name the shortcuts or cross-boundary dependencies that are forbidden.
Make boundary-bypass rules explicit when one public boundary is supposed to encapsulate a lower-level concern.

## Interface Boundary Mapping

| Interface / API / Query / Command / Method | Subject Owned | Responsibility | Accepted Identity Shape(s) | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

Rule:
- Do not use one generic boundary when the subject or identity meaning differs.
- Split boundaries by subject or require an explicit compound identity shape.

## Interface Boundary Check

| Interface | Responsibility Is Singular? (`Yes`/`No`) | Identity Shape Is Explicit? (`Yes`/`No`) | Ambiguous Selector Risk (`Low`/`Medium`/`High`) | Corrective Action |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Main Domain Subject Naming Check

| Node / Subject | Current / Proposed Name | Name Is Natural And Self-Descriptive? (`Yes`/`No`) | Naming Drift Risk | Corrective Action |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Existing Capability / Subsystem Reuse Check

When an off-spine need appears, do not create a new helper immediately.
First check whether an existing capability area or subsystem already fits that responsibility.

| Need / Concern | Existing Capability Area / Subsystem | Decision (`Reuse`/`Extend`/`Create New`) | Why | If New, Why Existing Areas Are Not Right |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Subsystem / Capability-Area Allocation

Use this section to show which broader functional areas own which parts of the target behavior before you map concrete concerns into files.

| Subsystem / Capability Area | Owns Which Concerns | Related Spine ID(s) | Governing Owner(s) Served | Decision (`Reuse`/`Extend`/`Create New`) | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Draft File Responsibility Mapping

Draft the concrete file responsibilities after the spine and subsystem allocations are clear.
Treat this as the first concrete pass, not the final answer.

| Candidate File | Owning Subsystem / Capability Area | Owner / Boundary | Concrete Concern | Why This Is One File | Reuses Shared Structure? |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Reusable Owned Structures Check

When repeated data structures, types, normalizers, converters, mappers, or schemas appear across several files, decide whether they should be extracted into reusable owned files under the correct subsystem.

| Repeated Structure / Logic | Candidate Shared File | Owning Subsystem | Why Shared | Redundant Attributes Removed? (`Yes`/`No`) | Overlapping Representations Removed? (`Yes`/`No`) | Must Not Become |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Shared Structure / Data Model Tightness Check

Use this section to verify that extracted shared structures are not only reusable, but also semantically tight.

| Shared Structure / Type / Schema | One Clear Meaning Per Field? (`Yes`/`No`) | Redundant Attributes Removed? (`Yes`/`No`) | Parallel / Overlapping Representation Risk (`Low`/`Medium`/`High`) | Corrective Action |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Final File Responsibility Mapping

Re-tighten the file responsibilities after extracting reusable owned structures and before final folder/path placement.

| File | Owning Subsystem / Capability Area | Owner / Boundary | Concrete Concern | Why This Is One File | Reuses Shared Structure? |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Applied Patterns (If Any)

Name any local patterns used, where they live, what problem they solve, and which owner or off-spine concern they belong to.

## Target Subsystem / Folder / File Mapping

Name the folders and files that should be created, changed, moved, or deleted, and explain what belongs in each one. This is the most concrete projection of the earlier spine, subsystem, and file-responsibility decisions. If the codebase benefits from an intermediate module grouping, name it explicitly but treat it as optional structure rather than the default ownership term.
This mapping should be spine-led and ownership-led, but not mechanical. The goal is readability, not a rigid one-folder-per-spine-step rule.

| Path | Kind (`Folder`/`Module`/`File`) | Owner / Boundary | Responsibility | Why It Belongs Here | Must Not Contain |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Rules:
- If the design has meaningful structural depth, usually reflect it in folders rather than flattening everything into one mixed directory.
- Do not place transport entrypoints, main-line domain/control nodes, persistence, adapters, and unrelated off-spine concerns in one flat folder when that hides ownership or structural depth.
- A compact layout is acceptable when it remains easy to read for the scope. If you keep it flatter, state why that is the clearer tradeoff.
- Folder boundaries should make ownership and structural depth easier to read, not hide them.
- Shared-layer, feature-oriented, runtime-oriented, and hybrid projections can all be valid when they make the intended ownership and flow easier to understand.

## Folder Boundary Check

| Path / Folder | Intended Structural Depth (`Transport`/`Main-Line Domain-Control`/`Persistence-Provider`/`Off-Spine Concern`/`Mixed Justified`) | Ownership Boundary Is Clear? (`Yes`/`No`) | Mixed-Layer Or Over-Split Risk (`Low`/`Medium`/`High`) | Justification / Corrective Action |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Concrete Examples / Shape Guidance (Mandatory When Needed)

Use short examples when they make the design easier to understand.
Examples can explain:
- a spine shape
- an interface-boundary split
- a subsystem, optional module grouping, folder, and file mapping choice
- a bounded local spine such as a loop or state machine
- a bad-practice shape that this design is intentionally avoiding

| Topic | Good Example | Bad / Avoided Shape | Why The Example Matters |
| --- | --- | --- | --- |
|  |  |  |  |

Use this section when the design would otherwise remain too abstract.

## Backward-Compatibility Rejection Log (Mandatory)

| Candidate Compatibility Mechanism | Why It Was Considered | Rejection Decision (`Rejected`/`N/A`) | Clean-Cut Replacement / Removal Plan |
| --- | --- | --- | --- |
|  |  |  |  |

Hard block:
- Any design that depends on backward-compatibility wrappers, dual-path behavior, or retained legacy flow for in-scope replaced behavior fails review.

## Derived Layering (If Useful)

Describe the layer shape only after the spine inventory, ownership model, and interface boundaries are clear.

## Change / Refactor Sequence

Describe the order of change from current state to target state, including any temporary seams and what obsolete paths, compatibility-only boundaries, or legacy code must be removed at the end. Include migration sequencing only when the approved persisted-data decision is `Migration Required`.

## Key Tradeoffs

## Risks

## Guidance For Implementation
