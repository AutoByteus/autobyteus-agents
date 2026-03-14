# Design Spec

## Current-State Read

Describe the current execution path, current ownership boundaries, current coupling/fragmentation problems, and the constraints that the target design must respect.

## Intended Change

## Primary Execution Spine

Write as a short arrow chain, for example:
`Input -> Manager -> Run -> Backend -> Engine / Client -> Provider`

## Spine Actors / Main-Line Nodes

List only the nodes that directly advance the core request, command, or data.

## Ownership Map

State what each main-line node owns: lifecycle, state, invariants, sequencing, contracts, or transformations.

## Return Or Event Spine (If Applicable)

Write the return or event flow on the same principle as the execution spine.

## Supporting Structure Around The Spine

List the important supporting owners, adapters, translators, persistence pieces, or transport pieces around the spine.

## Ownership Boundaries

Explain where authority changes hands and what must stay encapsulated inside each owner.

## Dependency Rules

State who may depend on, call, or emit to whom, and name the shortcuts or cross-boundary dependencies that are forbidden.

## Support Branches / Services Off The Spine

List the services that resolve, persist, map, observe, publish, or adapt around the spine, and name which owner on the spine each one serves.

## Target Modules / Files

Name the modules and files that should be created, changed, moved, or deleted, and explain what belongs in each one.

## Derived Layering (If Useful)

Describe the layer shape only after the spine and ownership model are clear.

## Migration / Refactor Sequence

Describe the order of change from current state to target state, including any temporary seams and what must be removed at the end.

## Key Tradeoffs

## Risks

## Guidance For Implementation
