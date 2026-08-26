# Design Principles

This is the canonical shared design reference for the software engineering team. Use it for design work and technical review; it contains the team's principles, practical guidance, local patterns, design questions, smells, and short example shapes.

## Contents

- [Terminology](#terminology)
- [Core Principles](#core-principles)
- [Derived Checks](#derived-checks)
- [Practical Application Guide](#practical-application-guide)
- [Task Design Health Assessment](#task-design-health-assessment)
- [Structural Triggers](#structural-triggers)
- [Common Local Patterns](#common-local-patterns)
- [Short Example Shapes](#short-example-shapes)
- [Required Design Questions](#required-design-questions)
- [Design Smells](#design-smells)

## Terminology

- `Subsystem` / `capability area`: a larger functional area that owns a broader category of work and may contain multiple files plus optional module groupings.
- `Module`: an optional intermediate grouping inside a subsystem when the codebase benefits from it. Do not use `module` as a synonym for one file or as the default ownership term.
- `Folder` / `directory`: a physical grouping used to organize files and any optional module groupings.
- `File`: one concrete source file and the primary unit where one concrete concern should land.
- `Primary spine`: the main top-level business-relevant spine for one in-scope use case. There can be multiple primary spines in one design when multiple use cases or major business paths are in scope.
- `Return/Event spine`: a meaningful return path, callback path, or event-propagation path that matters to the behavior. It may move outward, upward, or back across boundaries; direction is not the deciding factor, business relevance is.
- `Bounded local spine`: an internal flow inside one owner, such as an event loop, worker cycle, state machine, queue dispatcher, or callback dispatch path. It is attached to a parent owner and adds local detail; it does not replace the longer primary spine.

## Core Principles

Apply these principles from behavioral foundation through macro structure before detailed checks. The product-reachability gate in Principle 6 is conditional: invoke it only when a concrete check produces a material premise, not as a separate edge-case discovery stage.

### 1. Approved Behavior And Production Reality

- Design validation and code review are technical checks, not a second business-approval process. Begin by understanding the approved business intent and use the approved requirements as the intended-behavior authority. If they are materially ambiguous or inconsistent, return the gap instead of judging, redefining, or inventing behavior.
- Before applying structural principles, establish the relevant behavioral baseline: existing behavior, the approved change, and behavior that must remain unchanged or outside scope.
- Understand the complete relevant behavior and production path from a supported trigger or governing contract to its meaningful outcome. The behavior may be user-initiated, system-initiated, operational, or contract-driven. Trace enough of its lifecycle boundaries to judge the change correctly; this does not require understanding unrelated parts of the product.

### 2. Data-Flow Spine Inventory and Clarity

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

### 3. Ownership Clarity and Boundary Encapsulation

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
- API/interface/query/command shape should be derived from this ownership and boundary model, not designed independently from it.

### 4. Off-Spine Concerns Around The Spine

- Off-spine concerns should serve a clear owner on the spine.
- Keep off-spine concerns off the main line unless they truly own core sequencing.
- Off-spine concerns may resolve, persist, adapt, map, publish, observe, or translate, but they should not compete with the spine.
- Before creating a new off-spine concern, check whether an existing capability area or subsystem already fits that responsibility and should be reused or extended.
- `Spine`, `owner`, and `off-spine concern` are architecture relationship terms, not naming templates.
- Do not name files, folders, services, classes, or types with vague labels like `Support`, `Supporting`, `OffSpine`, `SideConcern`, or `Helper` just because they sit off the main line. Name them by the concrete concern they own.

### 5. Current-Schema Runtime And Proportionate Persisted-Data Transitions

- A code-model, serialization, or storage-schema change triggers persisted-data analysis, not an automatic migration.
- Decide explicitly whether existing data is `Not Affected`, `Directly Usable — No Migration`, `Discard or Rebuild`, `Migration Required`, or `Undetermined`.
- Base the decision on representative stored data, normal reader and writer behavior, semantic meaning, current invariants, physical-store constraints, data volume, and operational risk.
- Existing data is directly usable when the normal version-agnostic runtime can read it correctly and preserve required semantics and invariants without old-version branches. For example, a stored JSON superset does not require rewriting merely because the current model ignores obsolete extra attributes.
- A generic reader policy that projects recognized fields or tolerates irrelevant extras is not automatically backward-compatibility code. Version-specific branching, dual reads/writes, compatibility fields, and fallback paths in current business logic remain prohibited.
- Choose `Discard or Rebuild` when the data is disposable or safely reproducible and that outcome satisfies the requirements.
- Choose `Migration Required` only when existing data must be transformed for correctness, current invariants, a required physical-store change, privacy/security, or another concrete operational need. State the benefit and why direct use or rebuild is insufficient.
- When migration is required, keep it in an explicit startup, deployment, or maintenance boundary. Confine historical-schema knowledge there; define ordering, validation, completion, interruption/recovery, and risk-appropriate backup or rollback behavior.
- Do not rewrite large data sets merely for representational cleanliness. Weigh I/O, downtime, corruption exposure, recovery complexity, and rollout constraints against the migration's concrete benefit.
- If the evidence is insufficient, choose `Undetermined` and investigate or block the design rather than assuming either migration or safety.

### 6. Product-Reachability Gate For Material Premises (Only When Needed)

- Apply this gate only when a concrete design or implementation check produces a prospective finding or proposed or existing mechanism that depends on a material production, failure, or lifecycle premise. Do not brainstorm hypothetical edge cases as a separate completeness exercise.
- `Product Reachability Rule` (mandatory): a premise may affect design or review only when normal product execution, an explicitly supported user, system, or operational action, or an established product, security, or operational contract can produce it from a real supported state without manually mutating hidden state or relying on test-only or synthetic setup to create the initiating state.
- Classify the premise before it can affect a design or review decision:
  - `Reachable`: product-supported execution or a governing contract provides a concrete current or approved target-production trigger and path.
  - `Not Reachable`: the relevant current or approved target behavior and lifecycle do not produce the state. Do not require design or code for it in the current scope.
  - `Unclear`: material evidence is missing. Investigate or block the dependent decision instead of prescribing speculative machinery.
- The existence of a method, state field, generic capability, fallback branch, defensive mechanism, or ability to mutate internal files is not by itself evidence that the product produces a scenario. An internal file is not a user-operated surface unless the product explicitly exposes it as one.
- A test-only caller, synthetic reproduction, or artificially constructed state may reproduce an already established product path; it cannot establish that the path exists.
- Reachability requires a complete witness: the product-supported initiating trigger or applicable governing contract, the concrete current or approved target caller/event path, the claimed state at the relevant lifecycle point, and the material consequence.
- `Independent Origin Rule` (mandatory): the initiating trigger or governing contract must exist independently of the premise or mechanism under review. For a user-facing premise, name both the exposed product surface and supported user action. For a non-user premise, name the supported system event, operational action, or applicable governing contract.
- A client, SDK, endpoint, handler, middleware, generic infrastructure, or proposed target mechanism may appear only after the initiating basis in the witness; it cannot prove that the product exposes its own path.
- Trace the normal production path forward from the supported trigger. When the initiating basis is a governing contract, name the concrete caller or event that exercises it. Do not reason backward from a fallback branch, synthetic reproduction, or test and invent an initiating cause. Mechanical possibility at any one link is insufficient.
- Classify distinct initiating conditions separately when their evidence or consequence differs. Do not use an `A or B or C` list to create aggregate reachability; one real but irrelevant condition does not validate the speculative conditions or the claimed consequence.
- Manual tampering, arbitrary deletion or corruption, unsupported data/schema versions, infrastructure failure, or interrupted execution are outside scope by default. Count one only when the product explicitly supports the relevant action or state, or an established product, security, or operational contract makes it relevant and evidence establishes the actual lifecycle path.
- Without a product-supported or observed behavior path, or a governing contract with a concrete approved target path, the premise cannot drive a finding or new machinery.
- Persist every material premise classification in the applicable design or review artifact, including scenarios rejected as `Not Reachable`. Record the complete relevant behavior and production path, actual system lifecycle, and evidence that makes the premise reachable, unreachable, or unclear.
- Require additional state, APIs, abstractions, coordination, or recovery behavior only when they address a reachable material problem and are proportionate to its consequence. Technical completeness means correctness for supported behavior and real operational constraints, not handling every imaginable state.

## Derived Checks

- Separation of concerns is still mandatory, and it should get stronger as the spine and ownership model become clearer. It is derived from the spine, main subject nodes, and ownership boundaries rather than treated as the starting point.
- No backward compatibility or legacy retention is a hard modernization rule for in-scope behavior. Design the clean-cut target directly and make removal of obsolete paths explicit.
- Give every affected persisted-data change an evidence-backed transition decision. Use an explicit migration boundary only when transformation is actually required; never compensate with version-specific compatibility behavior in normal business or runtime paths.
- Removal is first-class architecture work, not optional cleanup. When clearer ownership, reusable owned structures, or better file responsibilities make redundant pieces unnecessary, name and remove/decommission those pieces explicitly in scope.
- Dependency direction follows ownership; name allowed directions and forbidden shortcuts explicitly.
- The Authoritative Boundary Rule is about authority and encapsulation, not about specific labels like `service`, `manager`, `repository`, `controller`, or `facade`.
- If a caller needs both an outer boundary and one of that boundary's internal managers, repositories, helpers, or lower-level concerns, either the boundary is wrong or the caller is bypassing ownership. Resolve that by choosing one authoritative entrypoint, or by redesigning the boundary and responsibilities explicitly.
- If callers only bypass an internal concern because the outer boundary does not expose enough usable API, fix that by strengthening the authoritative boundary or by reshaping ownership explicitly. Do not normalize the bypass as the steady-state design.
- Finalize folder/path mapping only after drafting file responsibilities, extracting any reusable owned structures, and re-tightening those responsibilities.
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
- Define the change/refactor sequence when the change is not greenfield.
- When persisted data may be affected, make the transition decision before designing migration machinery. If migration is required, design it as a separate owned spine and keep the target runtime current-schema-only.
- Prefer clean-cut replacement over compatibility wrappers or dual-path behavior. If old behavior is being replaced, design and record its removal explicitly.
- Treat addition and removal symmetrically: when a clearer subsystem owner, reusable owned structure, or file responsibility replaces fragmented or duplicated pieces, record what becomes unnecessary and remove/decommission it in scope.
- Add short concrete examples when they clarify a non-obvious spine, interface split, folder choice, or bounded local flow.

## Task Design Health Assessment

Every task needs an explicit design-health decision, regardless of size or posture.
The assessment can be short for a narrow local fix, but it must be supported by current-state evidence rather than generic reassurance.

Use the assessment to answer:

- Is this task a feature request, bug fix, behavior change, refactor, cleanup, performance issue, or larger requirement?
- Is the right response a local change, or does the task expose a design issue?
- If a bug is reported, is the root cause a local defect, a missing invariant, a boundary/ownership problem, duplicated policy, or a data-model/API shape issue?
- If a feature is requested, can the existing ownership model absorb it cleanly, or would direct addition make the product less maintainable?
- Is refactoring required in this change, explicitly not needed, or deferred with a named residual risk?

Root-cause classifications:

- `Local Implementation Defect`: the existing owner and boundary are correct; one local branch, condition, conversion, or state update is wrong.
- `Missing Invariant`: the right owner exists but does not enforce a required rule consistently.
- `Boundary Or Ownership Issue`: the task crosses, bypasses, or confuses authoritative ownership.
- `Duplicated Policy Or Coordination`: fallback, retry, aggregation, routing, fan-out, validation, or selection logic repeats across callers and needs one owner.
- `File Placement Or Responsibility Drift`: the change would expand a file or folder beyond its real concern.
- `Shared Structure Looseness`: shared DTOs, schemas, types, mappers, or normalizers are redundant, overlapping, or too generic.
- `Legacy Or Compatibility Pressure`: the proposed answer keeps old paths, dual behavior, wrappers, or fallback branches that should be removed.
- `No Design Issue Found`: the current design remains healthy for this scope; explain why.

Decision examples:

- Local bug with no refactor:
  - `Change posture`: bug fix
  - `Root cause classification`: local implementation defect
  - `Refactor needed now`: no
  - `Why`: the existing owner and boundary are correct; the defect is isolated to one validation branch and does not duplicate policy or bypass a boundary.
- Bug that exposes a boundary problem:
  - `Change posture`: bug fix
  - `Root cause classification`: boundary or ownership issue
  - `Refactor needed now`: yes
  - `Why`: callers depend on both an outer service and one of its repositories, causing inconsistent invariant enforcement.
  - `Design response`: strengthen the authoritative service boundary and remove direct repository access from those callers.
- Feature that should reuse an existing subsystem:
  - `Change posture`: feature
  - `Root cause classification`: no design issue found
  - `Refactor needed now`: no
  - `Why`: the existing subsystem already owns the off-spine concern; the feature extends that owner without changing dependency direction.
- Feature that requires refactor first:
  - `Change posture`: feature
  - `Root cause classification`: file placement or responsibility drift
  - `Refactor needed now`: yes
  - `Why`: adding the feature directly would grow an already mixed file that owns unrelated parsing, persistence, and orchestration.
  - `Design response`: split file responsibilities by owner first, then add the feature under the correct owner.
- Compatibility pressure:
  - `Change posture`: behavior change
  - `Root cause classification`: legacy or compatibility pressure
  - `Refactor needed now`: yes
  - `Why`: preserving old and new behavior through a dual-path branch would keep two representations authoritative.
  - `Design response`: make a clean-cut replacement and record the old path removal in scope.

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
- Persisted-data transition trigger:
  - If a code model, serialization contract, or storage schema changes, determine whether existing data is directly usable, disposable/rebuildable, or truly requires transformation. Create a migration owner only for `Migration Required`; do not teach the current business path version-specific old/new behavior.
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
- What persisted-data transition decision applies, and what representative reader, semantic, invariant, storage, volume, and operational evidence supports it?
- If migration is required, which owner performs it, and how are ordering, completion, validation, interruption, recovery, and rollout handled?
- Which duplicated, fragmented, or now-unnecessary helpers/files/structures become removable because the new design gives them a clearer owner or replacement?
- Which shared data structures, schemas, DTOs, mappers, or types need tightening so redundant attributes or overlapping representations are removed instead of standardized?
- Which dependencies are allowed, and which shortcuts are forbidden?
- Which boundaries are public entrypoints versus internal owned sub-layers, and which callers are allowed to depend on each?
- Is any caller currently depending on both an outer owner and one of that owner's internals? If so, which boundary should remain authoritative?
- Which subsystems and files should own the target structure, and are any optional module groupings actually needed?
- Does the subsystem, folder, and file layout make ownership and structural depth readable without becoming artificially fragmented?
- Which interface boundaries exist, what subject does each one own, and what identity shape or selector shape does each one accept?
- Which parts of the design need a concrete example to make the intended shape obvious?
- What is the change/refactor path from current state to target state, including migration only when the approved persisted-data decision requires it?

## Design Smells

- A technical finding or new machinery is justified only by a hypothetical state, generic capability, or test-only path rather than approved behavior and current or target-production reachability
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
- Old-schema decoding, branching, or dual reads/writes embedded in current business services or normal repositories instead of isolated migration-owned code
- Bulk migration or destructive rewriting proposed merely because a schema changed, without evidence that existing data must be transformed or that the operational benefit justifies the risk
- Migration steps that can partially apply without a completion marker, validation, restart strategy, or recovery path
- Generic interface boundaries, list/query surfaces, or service methods that accept one ambiguous ID or selector and then guess what subject it belongs to
- A higher boundary bypasses the intended owner and reaches directly into a deeper layer that should stay encapsulated
- Names that do not describe the actual owner or role
- Misplaced files whose paths hide the real concern
- Folder layouts that are so flat they hide boundaries, or so split that they create artificial structure with no real owner
- Empty indirection layers that only pass through work
