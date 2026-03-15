# Common Design Patterns

These patterns are secondary to the primary execution/data-flow spine and ownership model.
Use them only when they help a clearly owned spine node or support branch solve a specific structural problem.
Do not introduce a pattern if it obscures the spine, blurs ownership, or creates generic coordination blobs.

## State Machine

- Solves: lifecycle-driven behavior with explicit states and transitions.
- Best fit: inside one owned node with meaningful state progression.
- Avoid: spreading one state machine across multiple owners without a clear boundary.

## Event Loop / Worker Loop

- Solves: continuous dispatch, polling, or async work handling.
- Best fit: inside one owned runtime or worker-style node.
- Avoid: letting the loop become the whole architecture instead of the internal mechanism of one owner.

## Factory

- Solves: controlled construction of objects, backends, adapters, or runtime variants.
- Best fit: boundary creation points with explicit ownership.
- Avoid: turning a factory into a hidden service locator or policy container.

## Registry

- Solves: lookup of capabilities, handlers, providers, or definitions by key.
- Best fit: support branch for indexed lookup.
- Avoid: hiding business decisions or orchestration inside the registry.

## Adapter

- Solves: translation between external and internal contracts.
- Best fit: boundaries around providers, transport layers, persistence, or external callbacks.
- Avoid: embedding core business behavior into boundary translation code.

## Strategy

- Solves: interchangeable behavior variants behind one stable contract.
- Best fit: one owner that selects among explicit variants.
- Avoid: using strategy when the variants actually represent different owners or flows.

## Repository

- Solves: persistence access behind a stable domain-facing contract.
- Best fit: persistence boundary serving a clear owner.
- Avoid: placing orchestration, validation, or business rules in the repository.

## Manager

- Solves: explicit coordination only when authority and lifecycle ownership are clear.
- Best fit: top-level orchestration with narrow, well-defined ownership.
- Avoid: vague coordination blobs that accumulate unrelated responsibilities.

## Pattern Rule

- Start with the spine.
- Identify the owned node or support branch that has a concrete structural problem.
- Apply a pattern only if it clarifies that local structure.
- Record the applied pattern and why it belongs inside that owner or support branch.
