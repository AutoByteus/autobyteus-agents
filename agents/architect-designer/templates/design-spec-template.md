# Design Spec

## Current-State Read

Describe the current execution path, current ownership boundaries, current coupling/fragmentation problems, and the constraints that the target design must respect.

## Intended Change

## Terminology

- `Subsystem` / `capability area`: a larger functional area that owns a broader category of work and may contain multiple files plus optional module groupings.
- `Module`: an optional intermediate grouping inside a subsystem when the codebase benefits from it. Do not use `module` as a synonym for one file or as the default ownership term.
- `File`: one concrete source file and the primary unit where one concrete concern should land.
- `Folder` / `directory`: a physical grouping used to organize files and any optional module groupings.

## Design Reading Order

Read and write this design from abstract to concrete:

1. data-flow spine
2. subsystem / capability-area allocation
3. draft file responsibilities -> extract reusable owned structures -> finalize file responsibilities
4. folder/path mapping

## Legacy Removal Policy (Mandatory)

- Policy: `No backward compatibility; remove legacy code paths.`
- Required action: identify obsolete legacy paths/files included in this scope.
- Treat removal as first-class design work: when clearer subsystem ownership, reusable owned structures, or tighter file responsibilities make fragmented or duplicated pieces unnecessary, name and remove/decommission them in scope.
- Gate rule: the design is invalid if it depends on compatibility wrappers, dual-path behavior, or legacy fallback branches kept only for old behavior.

## Data-Flow Spine Inventory

List every relevant spine that matters to understanding the design.

| Spine ID | Scope (`Primary End-to-End`/`Return-Event`/`Bounded Local`) | Start | End | Governing Owner | Why It Matters |
| --- | --- | --- | --- | --- | --- |
| DS-001 |  |  |  |  |  |

## Primary Execution Spine(s)

Write each primary execution spine as a short arrow chain, for example:
`Input -> Manager -> Run -> Backend -> Engine / Client -> Provider`

## Spine Narratives (Mandatory)

For each important spine, explain the end-to-end motion in prose so a reader can understand the design by following the flow instead of reconstructing it from files.
Keep support branches summary-level here only; use the detailed support-structure section below for the full mapping.

| Spine ID | Short Narrative | Main Domain Subject Nodes | Governing Owner | Key Support Branches |
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

## Supporting Structure Around The Spine

Use this as the full support-branch inventory.
Do not repeat the same mapping again in another section.

| Support Branch / Service | Related Spine ID(s) | Serves Which Owner | Responsibility | Why It Exists | Risk If Misplaced On Main Line |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Existing Capability / Subsystem Reuse Check

When a support need appears, do not create a new helper immediately.
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

## Ownership Boundaries

Explain where authority changes hands and what must stay encapsulated inside each owner.

## Dependency Rules

State who may depend on, call, or emit to whom, and name the shortcuts or cross-boundary dependencies that are forbidden.

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

## Applied Patterns (If Any)

Name any local patterns used, where they live, what problem they solve, and which owner or support branch they belong to.

## Target Subsystem / Folder / File Mapping

Name the folders and files that should be created, changed, moved, or deleted, and explain what belongs in each one. This is the most concrete projection of the earlier spine, subsystem, and file-responsibility decisions. If the codebase benefits from an intermediate module grouping, name it explicitly but treat it as optional structure rather than the default ownership term.
This mapping should be spine-led and ownership-led, but not mechanical. The goal is readability, not a rigid one-folder-per-spine-step rule.

| Path | Kind (`Folder`/`Module`/`File`) | Owner / Boundary | Responsibility | Why It Belongs Here | Must Not Contain |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Rules:
- If the design has meaningful structural depth, usually reflect it in folders rather than flattening everything into one mixed directory.
- Do not place transport entrypoints, main-line domain/control nodes, persistence, adapters, and unrelated support branches in one flat folder when that hides ownership or structural depth.
- A compact layout is acceptable when it remains easy to read for the scope. If you keep it flatter, state why that is the clearer tradeoff.
- Folder boundaries should make ownership and structural depth easier to read, not hide them.
- Shared-layer, feature-oriented, runtime-oriented, and hybrid projections can all be valid when they make the intended ownership and flow easier to understand.

## Folder Boundary Check

| Path / Folder | Intended Structural Depth (`Transport`/`Main-Line Domain-Control`/`Persistence-Provider`/`Support Branch`/`Mixed Justified`) | Ownership Boundary Is Clear? (`Yes`/`No`) | Mixed-Layer Or Over-Split Risk (`Low`/`Medium`/`High`) | Justification / Corrective Action |
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

## Migration / Refactor Sequence

Describe the order of change from current state to target state, including any temporary seams and what obsolete paths, compatibility-only boundaries, or legacy code must be removed at the end.

## Key Tradeoffs

## Risks

## Guidance For Implementation
