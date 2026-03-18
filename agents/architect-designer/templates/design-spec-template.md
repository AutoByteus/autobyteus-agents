# Design Spec

## Current-State Read

Describe the current execution path, current ownership boundaries, current coupling/fragmentation problems, and the constraints that the target design must respect.

## Intended Change

## Legacy Removal Policy (Mandatory)

- Policy: `No backward compatibility; remove legacy code paths.`
- Required action: identify obsolete legacy paths/files included in this scope.
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
First check whether an existing capability area, subsystem, or owning module already fits that responsibility.

| Need / Concern | Existing Capability Area / Subsystem | Decision (`Reuse`/`Extend`/`Create New`) | Why | If New, Why Existing Areas Are Not Right |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

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

## Target Folder / Module / File Mapping

Name the folders, modules, and files that should be created, changed, moved, or deleted, and explain what belongs in each one.
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
- a folder/module/file mapping choice
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

## Derived Layering (If Useful)

Describe the layer shape only after the spine inventory, ownership model, and interface boundaries are clear.

## Migration / Refactor Sequence

Describe the order of change from current state to target state, including any temporary seams and what obsolete paths, compatibility-only boundaries, or legacy code must be removed at the end.

## Key Tradeoffs

## Risks

## Guidance For Implementation
