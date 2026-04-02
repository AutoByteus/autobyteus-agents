# Common Design Patterns

These patterns are secondary to the primary execution/data-flow spine and ownership model.
Use them only when they help a clearly owned spine node or off-spine concern solve a specific structural problem.
Do not introduce a pattern if it obscures the spine, blurs ownership, or creates generic coordination blobs.

## State Machine

- Solves: lifecycle-driven behavior with explicit states and transitions.
- Best fit: inside one owned node with meaningful state progression.
- Avoid: spreading one state machine across multiple owners without a clear boundary.

## Event Loop / Worker Loop

- Solves: continuous dispatch, polling, or async work handling.
- Best fit: inside one owned runtime or worker-style node.
- Avoid: letting the loop become the whole architecture instead of the internal mechanism of one owner.
- Example shape: `AgentRuntime -> AgentWorker`, where the runtime owns lifecycle and the worker owns the serialized event loop.

## Factory

- Solves: controlled construction of objects, backends, adapters, or runtime variants.
- Best fit: boundary creation points with explicit ownership.
- Avoid: turning a factory into a hidden service locator or policy container.
- Example shape: `AgentFactory` creates runtime/context/handler-registry wiring at the creation boundary instead of scattering construction across runtime code.

## Registry

- Solves: lookup of capabilities, handlers, providers, or definitions by key.
- Best fit: off-spine concern for indexed lookup.
- Avoid: hiding business decisions or orchestration inside the registry.
- Example shape: `EventHandlerRegistry` or a parser strategy registry stays as lookup infrastructure for a dispatcher or parser owner.

## Adapter

- Solves: translation between external and internal contracts.
- Best fit: boundaries around providers, transport layers, persistence, or external callbacks.
- Avoid: embedding core business behavior into boundary translation code.
- Example shape: event bridges or callback binders translate between member/runtime events and outward-facing team or transport events.

## Strategy

- Solves: interchangeable behavior variants behind one stable contract.
- Best fit: one owner that selects among explicit variants.
- Avoid: using strategy when the variants actually represent different owners or flows.
- Example shape: a streaming parser builds detection/parsing strategies from a small registry while one parser owner remains in control.

## Repository

- Solves: persistence access behind a stable domain-facing contract.
- Best fit: persistence boundary serving a clear owner.
- Avoid: placing orchestration, validation, or business rules in the repository.
- Example shape: repository fulfills storage for a domain/use-case owner; it should not become a hidden coordinator.

## Manager

- Solves: explicit coordination only when authority and lifecycle ownership are clear.
- Best fit: top-level orchestration with narrow, well-defined ownership.
- Avoid: vague coordination blobs that accumulate unrelated responsibilities.
- Example shape: `TeamManager` owns lazy member creation, node startup, and team-level node routing, while runtime loops and handlers stay elsewhere.

## Pattern Rule

- Start with the spine.
- Identify the owned node or off-spine concern that has a concrete structural problem.
- Apply a pattern only if it clarifies that local structure.
- Record the applied pattern and why it belongs inside that owner or off-spine concern.
