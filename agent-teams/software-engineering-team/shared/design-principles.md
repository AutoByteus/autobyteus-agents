# Design Principles

This is the shared design reference for the software engineering team.

Use these principles for design work and review work.
They are the shared design language for this team.
This is the canonical design guidance file for this team: principles, practical application guidance, local patterns, design questions, smells, and short example shapes all live here.
One especially important law for this team is the `Authoritative Boundary Rule`: callers above a subject's authoritative boundary must depend on that boundary, not on that boundary and one of its internals at the same time.

## Terminology

- `Subsystem` / `capability area`: a larger functional area that owns a broader category of work and may contain multiple files plus optional module groupings.
- `Module`: an optional intermediate grouping inside a subsystem when the codebase benefits from it. Do not use `module` as a synonym for one file or as the default ownership term.
- `Folder` / `directory`: a physical grouping used to organize files and any optional module groupings.
- `File`: one concrete source file and the primary unit where one concrete concern should land.
- `Primary spine`: the main top-level business-relevant spine for one in-scope use case. There can be multiple primary spines in one design when multiple use cases or major business paths are in scope.
- `Return/Event spine`: a meaningful return path, callback path, or event-propagation path that matters to the behavior. It may move outward, upward, or back across boundaries; direction is not the deciding factor, business relevance is.
- `Bounded local spine`: an internal flow inside one owner, such as an event loop, worker cycle, state machine, queue dispatcher, or callback dispatch path. It is attached to a parent owner and adds local detail; it does not replace the longer primary spine.

## Core Principles

### 1. Data-Flow Spine Inventory and Clarity

- Identify and inventory the relevant data-flow spines for each in-scope use case.
- A practical spine inventory row should usually capture:
  - `spine_id`
  - scope
  - start
  - end
  - governing owner
  - why it matters
- Enumerate all relevant spines explicitly, not only the biggest one:
  - primary spines,
  - secondary spines,
  - return/event spines,
  - bounded local spines inside one owner when a loop, worker cycle, state machine, or dispatcher materially affects the design.
- `Primary` is per use case/path, not globally singular. If two important use cases each have a top-level business path, both can have their own primary spine.
- For each spine, state its start, end, owner, and why it exists.
- Keep only true main-line nodes on each spine.
- `Spine Span Sufficiency Rule` (mandatory): a primary spine must be stretched far enough to expose the real business path, not only the local edited segment.
- The primary spine should usually show:
  - the initiating surface/caller,
  - the important orchestration or boundary crossing,
  - the authoritative owner boundary,
  - any critical downstream mechanism or dependency,
  - the meaningful downstream effect, returned result, or emitted consequence.
- Practical default: use at least `4-5` meaningful nodes on the primary spine unless the full real path is genuinely smaller.
- A bounded local/internal spine is additive detail. It does not replace the longer primary spine when the longer spine is needed to judge ownership, API shape, or business meaning correctly.
- Good-shape example:
  - `Browser UI -> Session Bootstrap -> Runtime Invocation -> Exposure Composer -> Browser Surface`
- Bad-shape example:
  - `Exposure Composer -> Browser Surface`
- If the declared spine inventory is incomplete, or if the main line / secondary line / bounded local spines are hard to draw, the design is probably fragmented.

### 2. Ownership Clarity and Boundary Encapsulation

- Each main-line node must own something concrete:
  - state
  - lifecycle
  - invariants
  - sequencing
  - contracts
  - transformations
- Ownership is the concrete form of separation of concerns.
- Main domain subject nodes on the spine should stay coherent; do not force one node to absorb every nearby responsibility just because it is on the main line.
- When additional responsibilities are needed to make one node work, split them into clear off-spine concerns around that owner instead of creating hidden mixed-concern blobs.
- If a concern has no clear owner, the boundary is wrong.
- Authoritative Boundary Rule (mandatory): callers above a subject's authoritative boundary must depend on that boundary, not on that boundary and one of its internals at the same time. This is the `no boundary bypass / no mixed-level dependency` rule.
- When one boundary intentionally encapsulates lower-level concerns, callers above it should depend on the authoritative outer boundary instead of bypassing it and mixing in the internals directly.
- API/interface/query/command shape should be derived from this ownership and boundary model, not designed independently from it.

### 3. Off-Spine Concerns Around The Spine

- Off-spine concerns should serve a clear owner on the spine.
- Keep off-spine concerns off the main line unless they truly own core sequencing.
- Off-spine concerns may resolve, persist, adapt, map, publish, observe, or translate, but they should not compete with the spine.
- Before creating a new off-spine concern, check whether an existing capability area or subsystem already fits that responsibility and should be reused or extended.
- `Spine`, `owner`, and `off-spine concern` are architecture relationship terms, not naming templates.
- Do not name files, folders, services, classes, or types with vague labels like `Support`, `Supporting`, `OffSpine`, `SideConcern`, or `Helper` just because they sit off the main line. Name them by the concrete concern they own.

## Derived Checks

- Separation of concerns is still mandatory, and it should get stronger as the spine and ownership model become clearer. It is derived from the spine, main subject nodes, and ownership boundaries rather than treated as the starting point.
- No backward compatibility or legacy retention is a hard modernization rule for in-scope behavior. Design the clean-cut target directly and make removal of obsolete paths explicit.
- Removal is first-class architecture work, not optional cleanup. When clearer ownership, reusable owned structures, or better file responsibilities make redundant pieces unnecessary, name and remove/decommission those pieces explicitly in scope.
- Dependency direction follows ownership; name allowed directions and forbidden shortcuts explicitly.
- Authoritative Boundary Rule (mandatory): when one boundary or owner intentionally encapsulates another concern, callers above it should depend on the outer owner, not on both the outer owner and its internals at the same time.
- This rule is about authority and encapsulation, not about specific labels like `service`, `manager`, `repository`, `controller`, or `facade`.
- If a caller needs both an outer boundary and one of that boundary's internal managers, repositories, helpers, or lower-level concerns, either the boundary is wrong or the caller is bypassing ownership. Resolve that by choosing one authoritative entrypoint, or by redesigning the boundary and responsibilities explicitly.
- If callers only bypass an internal concern because the outer boundary does not expose enough usable API, fix that by strengthening the authoritative boundary or by reshaping ownership explicitly. Do not normalize the bypass as the steady-state design.
- Draft file responsibilities first. Then extract reusable owned structures where repetition appears, re-tighten the file responsibilities, and only after that finalize folder/path mapping.
- Reusable owned structures must also be semantically tight: remove redundant attributes, avoid overlapping parallel representations for the same domain subject, and keep each field's meaning singular and explicit.
- Shared cores and specialized variants are valid only when the shared base is truly coherent. Do not create one-for-all base structures that collect mostly-optional fields for unrelated cases; prefer meaningful specialization or composition under a clear subsystem owner.
- File placement must follow ownership; move or split files when their paths no longer match their real concern. Optional module groupings may be used inside a subsystem only when they improve readability.
- Subsystem, folder, and file mapping should be spine-led and ownership-led, but not mechanical. Optional module groupings are secondary structure only when they help the reader.
- Distinct structural depths often deserve distinct folders, but do not force artificial over-splitting. If a flatter layout is clearer, justify it explicitly.
- Interfaces, APIs, queries, commands, and reused service methods must also follow ownership and separation of concerns: one boundary, one subject, one responsibility, explicit identity shape.
- The design document should read spine-first, not file-first. Files, folders, and any optional module groupings are a derived implementation mapping, not the primary structure of the architecture story.
- Use concrete examples when they materially improve clarity. Do not leave a non-obvious design entirely abstract when a short example would explain the intended shape faster.
- Layering is optional explanatory output only. Do not use layering as a first principle.
- If layering is used as explanation, it must still follow ownership and encapsulation: a higher layer should not skip an owning boundary and directly reach into a deeper layer that the intermediate boundary already owns.

## Practical Application Guide

- Read the current code path before defining the target design.
- Write each primary execution/data-flow spine as a short arrow chain, but stretch it far enough to expose the real business path instead of only the local edited segment.
- Build a small spine inventory early, then use it to decide ownership and decomposition.
- Name the main-line nodes with natural domain language.
- Define what each main-line node owns before splitting off-spine concerns.
- Keep off-spine concerns attached to a clear owner on the spine.
- Before creating a new off-spine helper, check whether an existing capability area or subsystem already owns that category of work and should be reused or extended.
- If one spine node starts collecting too many unrelated duties, split off-spine concerns around that owner rather than letting it become a god-object.
- When repeated data structures, types, normalizers, converters, mappers, or schemas appear across several files, extract them into reusable owned files under the correct subsystem instead of duplicating them.
- When extracting a reusable owned structure, tighten it before standardizing it: remove redundant attributes, collapse overlapping parallel shapes, and keep each field semantically singular.
- When two cases share a real common core but one case needs extra fields or behavior, prefer a meaningful specialized variant on top of a tight shared base. Do not turn the base into a kitchen-sink structure with mostly-optional fields just to force reuse.
- Draft file responsibilities first. Then extract reusable owned structures where repetition appears, re-tighten the file responsibilities, and only after that finalize folder/path mapping.
- Split APIs, queries, commands, and service methods by subject when identity meaning differs; prefer explicit `getAgent...` / `getTeam...` style boundaries over one generic method that guesses what an ID or selector means.
- Specify target subsystems and files explicitly; mention module groupings only when they materially help readability or reflect an established codebase pattern.
- Map subsystems, folders, and files from the spine and ownership model, not from a rigid one-folder-per-step rule.
- If the layout stays flatter, record why that is clearer for this scope. If the layout splits more, make sure each split reflects a real owner or boundary.
- Record change inventory explicitly: `Add`, `Modify`, `Rename/Move`, `Remove`.
- Define migration/refactor sequence when the change is not greenfield.
- Prefer clean-cut replacement over compatibility wrappers or dual-path behavior. If old behavior is being replaced, design and record its removal explicitly.
- Treat addition and removal symmetrically: when a clearer subsystem owner, reusable owned structure, or file responsibility replaces fragmented or duplicated pieces, record what becomes unnecessary and remove/decommission it in scope.
- Add short concrete examples when they clarify a non-obvious spine, interface split, folder choice, or bounded local flow.

## Structural Triggers

- Repeated coordination trigger:
  - If provider selection, fallback, retry, aggregation, routing, or fan-out logic repeats across callers, give that policy a clear owner.
- Responsibility overload trigger:
  - If one file owns multiple unrelated concerns, split it. If a subsystem or optional module grouping becomes a mixed catch-all, reorganize it into clearer owned files and boundaries.
- Ambiguous-boundary trigger:
  - If one API, query, command, or service method accepts a generic ID or selector that may refer to different subjects, or returns a generic mixed-subject list, split it into explicit subject-owned boundaries or require an explicit compound identity shape.
- Empty indirection trigger:
  - If a proposed layer or module only forwards calls and owns no policy, translation, or boundary concern, remove it.
- Authoritative-boundary trigger:
  - If a caller depends on both an outer boundary and one of that boundary's internal managers, repositories, helpers, or lower-level concerns, keep one authoritative entrypoint and remove the bypass.
- Shared-folder trigger:
  - Put code in a shared/common folder only when it is truly cross-cutting and concern-agnostic.
- Shared-structure tightness trigger:
  - If a proposed shared type, schema, or model still contains redundant fields, overlapping representations, or mixed-purpose attributes, tighten the shape before promoting it into a reusable owned file.
- Shared-base overreach trigger:
  - If a proposed base/shared type is accumulating optional fields mainly to serve divergent cases, split it into a tighter shared core plus meaningful specialized variants, or use composition instead.
- Capability-area reuse trigger:
  - If the spine needs status, events, handlers, persistence, streaming, bootstrap, shutdown, or similar off-spine behavior, first check whether an existing subsystem already owns that work before creating a new local helper.
- Legacy-cleanup trigger:
  - If a proposed solution keeps compatibility wrappers, dual-path reads/writes, or fallback branches only to preserve old behavior, redesign it toward a clean-cut replacement and explicit removal plan.
- Example-clarity trigger:
  - If a design point would otherwise remain abstract or easy to misread, add a short good-shape example and, when useful, a bad-shape anti-example.

## Common Local Patterns

Use these only when they solve a local problem inside a clear owner or off-spine concern.
These patterns are secondary to the primary execution/data-flow spine and ownership model.
Do not introduce a pattern if it obscures the spine, blurs ownership, or creates generic coordination blobs.

### State Machine

- Solves: lifecycle-driven behavior with explicit states and transitions.
- Best fit: inside one owned node with meaningful state progression.
- Avoid: spreading one state machine across multiple owners without a clear boundary.

### Event Loop / Worker Loop

- Solves: continuous dispatch, polling, or async work handling.
- Best fit: inside one owned runtime or worker-style node.
- Avoid: letting the loop become the whole architecture instead of the internal mechanism of one owner.
- Example shape: `AgentRuntime -> AgentWorker`, where the runtime owns lifecycle and the worker owns the serialized event loop.

### Factory

- Solves: controlled construction of objects, backends, adapters, or runtime variants.
- Best fit: boundary creation points with explicit ownership.
- Avoid: turning a factory into a hidden service locator or policy container.
- Example shape: `AgentFactory` creates runtime/context/handler-registry wiring at the creation boundary instead of scattering construction across runtime code.

### Registry

- Solves: lookup of capabilities, handlers, providers, or definitions by key.
- Best fit: off-spine concern for indexed lookup.
- Avoid: hiding business decisions or orchestration inside the registry.
- Example shape: `EventHandlerRegistry` or a parser strategy registry stays as lookup infrastructure for a dispatcher or parser owner.

### Adapter

- Solves: translation between external and internal contracts.
- Best fit: boundaries around providers, transport layers, persistence, or external callbacks.
- Avoid: embedding core business behavior into boundary translation code.
- Example shape: event bridges or callback binders translate between member/runtime events and outward-facing team or transport events.

### Strategy

- Solves: interchangeable behavior variants behind one stable contract.
- Best fit: one owner that selects among explicit variants.
- Avoid: using strategy when the variants actually represent different owners or flows.
- Example shape: a streaming parser builds detection/parsing strategies from a small registry while one parser owner remains in control.

### Repository

- Solves: persistence access behind a stable domain-facing contract.
- Best fit: persistence boundary serving a clear owner.
- Avoid: placing orchestration, validation, or business rules in the repository.
- Avoid: callers above the owning service or boundary depending on both that boundary and the repository directly.
- Example shape: repository fulfills storage for a domain/use-case owner; it should not become a hidden coordinator.

### Manager

- Solves: explicit coordination only when authority and lifecycle ownership are clear.
- Best fit: top-level orchestration with narrow, well-defined ownership.
- Avoid: vague coordination blobs that accumulate unrelated responsibilities.
- Avoid: callers above the owning service or boundary depending on both that boundary and the manager directly.
- Example shape: `TeamManager` owns lazy member creation, node startup, and team-level node routing, while runtime loops and handlers stay elsewhere.

## Short Example Shapes

### Authoritative Boundary Mini Example

- Good shape:
  - `Caller -> Outer Boundary`
  - `Outer Boundary -> Internal Owned Mechanism`
- Bad shape:
  - `Caller -> Outer Boundary`
  - `Caller -> Internal Owned Mechanism`
  - `Outer Boundary -> Internal Owned Mechanism`

### Common Spine Shapes

- CRUD/request spine:
  - `Frontend -> API -> Service -> Repository -> Database`
- Runtime/worker spine:
  - `API -> Run -> Runtime -> Worker/Event Loop`
- Bounded local loop/state spine:
  - `Queue/Event Source -> Loop/State Machine -> Handler/Transition -> Output/Next Event`
- Example pairing:
  - primary spine: `Request Surface -> Session Owner -> Runtime -> Event Loop Owner`
  - bounded local spine inside `Event Loop Owner`: `Receive Event -> Normalize -> Select Handler -> Apply Transition -> Emit Next Event`

## Required Design Questions

- What are the relevant primary, secondary, return/event, and bounded local data-flow spines for the in-scope use cases?
- If there are multiple in-scope use cases or major business paths, did the design name multiple primary spines instead of compressing them into one vague chain?
- Is each primary spine stretched far enough to expose the real business path, authoritative owner, and downstream consequence instead of stopping at the local edited segment?
- Which bounded local/internal spines exist inside owned nodes, and where do they start and end?
- What are the main domain subject nodes on each spine?
- What does each node own?
- What are the return/event spines, if the change is async or event-driven?
- Which off-spine concerns serve which owner on the spine?
- Which off-spine needs should reuse or extend an existing capability area or subsystem instead of creating a new helper?
- Which legacy paths, compatibility wrappers, dual-path branches, obsolete files, or deprecated boundaries are removed in this change?
- Which duplicated, fragmented, or now-unnecessary helpers/files/structures become removable because the new design gives them a clearer owner or replacement?
- Which shared data structures, schemas, DTOs, mappers, or types need tightening so redundant attributes or overlapping representations are removed instead of standardized?
- Which dependencies are allowed, and which shortcuts are forbidden?
- Which boundaries are public entrypoints versus internal owned sub-layers, and which callers are allowed to depend on each?
- Is any caller currently depending on both an outer owner and one of that owner's internals? If so, which boundary should remain authoritative?
- Which subsystems and files should own the target structure, and are any optional module groupings actually needed?
- Does the subsystem, folder, and file layout make ownership and structural depth readable without becoming artificially fragmented?
- Which interface boundaries exist, what subject does each one own, and what identity shape or selector shape does each one accept?
- Which parts of the design need a concrete example to make the intended shape obvious?
- What is the migration path from current state to target state?

## Design Smells

- Many peer coordinators with no obvious main line
- Important spines are left implicit instead of being named
- The named spine stops at the local edited helper path and hides the real initiating surface, authoritative owner boundary, or downstream consequence
- Event loops or state machines materially affect the behavior, but no bounded local spine is described
- Shared helpers that quietly own business behavior
- Shared structures that still carry redundant fields, overlapping representations, or mixed meanings after extraction
- Off-spine concerns sitting on the main line without owning sequencing
- New helper or service pieces created ad hoc even though an existing subsystem already owns that kind of work
- A caller depends on both a public boundary and one of its internal managers, repositories, helpers, or lower-level concerns at the same time
- Compatibility wrappers, dual-path behavior, or legacy fallback branches kept only to preserve old flows
- Generic interface boundaries, list/query surfaces, or service methods that accept one ambiguous ID or selector and then guess what subject it belongs to
- A higher boundary bypasses the intended owner and reaches directly into a deeper layer that should stay encapsulated
- Names that do not describe the actual owner or role
- Misplaced files whose paths hide the real concern
- Folder layouts that are so flat they hide boundaries, or so split that they create artificial structure with no real owner
- Empty indirection layers that only pass through work
