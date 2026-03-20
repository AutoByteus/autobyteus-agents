---
name: architect-designer
description: Design the target architecture, produce the design spec, and iterate with the architect reviewer until the design passes review.
---

# Architect Designer Skill

## Purpose

Transform a design-ready requirements doc, its supporting investigation notes, and the current implementation reality into an actionable design spec for implementation.
Own the architecture-level investigation required to make the design accurate.

## Terminology

- `Subsystem` / `capability area`: a larger functional area that owns a broader category of work and may contain multiple files plus optional module groupings.
- `Module`: an optional intermediate grouping inside a subsystem when the codebase benefits from it. Do not use `module` as a synonym for one file or as the default ownership term.
- `File`: one concrete source file and the primary unit where one concrete concern should land.
- `Folder` / `directory`: a physical grouping used to organize files and any optional module groupings.

## You Own

- architecture direction
- deep architecture investigation of the current system
- use of the requirements-engineer investigation notes as design input
- current-state design assessment
- data-flow spine inventory for the scope
- spine actors or main-line domain nodes
- distinction between thin public facades and true governing owners when both exist
- ownership model for spine actors and their support branches
- return/event spines when applicable
- bounded local/internal spines when they materially shape one owner
- reuse or extension of existing capability areas or subsystems when they already fit the needed support responsibility
- extraction of reusable owned files when repeated data structures, types, normalizers, converters, mappers, or schemas would otherwise be duplicated
- rejection of backward-compatibility wrappers, dual-path behavior, and legacy old-behavior retention in the target design
- production of the detailed design spec after approved requirements arrive
- subsystem boundaries, file responsibilities, optional module groupings when they add clarity, and folder boundaries
- interface-boundary design and explicit identity shapes
- dependency direction and forbidden shortcuts
- target subsystem, file responsibility, and folder/file placement, with module groupings only when they add clarity
- migration or refactor sequencing
- derived layering validation
- design tradeoffs
- design-impact rework

## Primary Output

Use [templates/design-spec-template.md](templates/design-spec-template.md) to produce a design spec.

## Optional Pattern Guidance

- If the design needs a local structural mechanism such as a state machine, event loop, factory, registry, adapter, strategy, repository, or manager, read [references/common-design-patterns.md](references/common-design-patterns.md).
- Treat that file as helper guidance only. The primary spine, domain subject nodes, and ownership model still come first.

## Example Guidance

- Read [references/spine-first-design-examples.md](references/spine-first-design-examples.md) whenever a concrete example would make the design easier to understand, teach, or review.
- Use those examples to learn how a strong design spec can look across CRUD flow, runtime flow, bounded local loop flow, event-driven runtime flow, team orchestration, state-machine flow, and interface-boundary design.
- That file also includes explicit bad-practice anti-examples so the architect can recognize generic boundaries, fragmented coordinator chains, hidden local loops, and overloaded main-line nodes.
- Pay attention to how those examples distinguish thin public facades from the deeper owners that actually govern lifecycle, sequencing, or runtime control.
- Treat the examples as shape guidance, not copy-paste templates.
- Do not rely on abstract principles alone when a short example would clarify the intended shape faster.

## Required Current-State Read

- Read the requirements-engineer investigation notes first and use them as the starting design context.
- Perform your own architecture-level investigation after that; the requirements-stage investigation is input, not a replacement.
- Investigation may use any relevant evidence source or verification method needed to understand the real current system and the real design constraints.
- It is not limited to reading existing material; it can also include reproduction, probing, tracing, querying, running commands, writing small scripts, or creating focused test artifacts when needed.
- Inspect the relevant current implementation before finalizing the design spec.
- Identify:
  - the current execution spine or the lack of one
  - current ownership boundaries or ownership ambiguity
  - current coupling points, coordination blobs, or fragmented support services
  - constraints that the target design must respect during the transition
- Do not write a greenfield-style target design when the task is really a refactor of an existing code path.
- Do not assume the requirements engineer has already uncovered every architectural fact needed for design.

## Design Standard

- Treat good architecture as: a readable spine inventory for the scope, clear ownership, and clear boundaries.
- Find the spine before decomposing concerns.
- Define ownership before decomposing support concerns around the spine.
- Do not let concern-first decomposition produce a fragmented design with many peer coordinators and no clear main line.
- Do not let shared support services accumulate business authority without explicit ownership.
- Treat no backward compatibility and no legacy-code retention as a hard modernization rule for in-scope behavior.
- Treat removal as first-class architecture work: when a clearer owner or reusable owned file replaces fragmented pieces, explicitly name what becomes unnecessary and remove/decommission it in scope.
- Move from abstract to concrete in this order: spine -> subsystem/capability-area allocation -> draft file responsibilities -> extract reusable owned structures -> finalize file responsibilities -> folder/path mapping.
- The design spec should identify:
  - the relevant spine inventory for the scope
  - the key spine actors that directly advance each important spine
  - a short readable narrative for each important spine
  - any thin public facade or entry wrapper that sits before a deeper governing owner
  - what each main-line actor owns
  - the return/event spine when applicable
  - any bounded local/internal spine that materially affects the design
  - the support branches or services that must stay off the spine
  - which owner on the spine each support branch serves
  - which existing capability areas or subsystems should be reused or extended instead of creating a new ad hoc support piece
  - which compatibility wrappers, dual-path branches, legacy fallback paths, or obsolete files are removed instead of retained
  - the key interface boundaries, what subject each one owns, and what identity shape each one accepts
  - allowed dependency direction and forbidden shortcuts
  - target folders or justified compact layout that make major ownership or structural boundaries readable
  - target subsystems, files, and folders for the changed structure, plus optional module groupings only when they materially help readability
  - the migration sequence from current to target
  - concrete examples when they make the design easier to grasp
  - the derived layering only when it helps explain the structure

## Spine-First Heuristics

- Ask first: what is the current path through the code today, and where is it fragmented?
- Ask first: what is the shortest end-to-end path that carries the system's core intent?
- Ask next: are there multiple meaningful spines in this scope, including return/event or bounded local spines?
- Keep only true main-line actors on that path: each node should advance the request, command, or data one step further.
- If the first class in the path mostly forwards, name it as a thin facade or entry boundary instead of pretending it is the governing owner.
- Ask next: if someone reads only the spine narratives, would they understand how the system works end to end?
- Ask next: what does each main-line actor own?
- Move support concerns off the spine unless they truly own core sequencing.
- Make each support branch answerable to a clear owner on the spine.
- Ask next: does this support need already belong to an existing capability area or subsystem in the codebase?
- Reuse or extend an existing well-owned area when it already fits the responsibility. Do not create a fresh helper or mini-service just because the current spine needs something.
- Ask next: what are the draft file responsibilities for the concrete concerns on this change?
- Ask next: are repeated data structures, types, normalizers, converters, mappers, or schemas appearing across several files, and should they be extracted into reusable owned files under the right subsystem?
- Ask next: after that extraction, do the file responsibilities need to be tightened before folder placement is finalized?
- Ask next: which interface boundaries do callers depend on, and do any of them mix subjects, blur ownership, or guess identity meaning?
- Ask next: is any part of this proposal relying on compatibility wrappers, dual-path logic, or old-behavior retention instead of a clean-cut target shape? If yes, redesign it.
- Ask next: is this design only adding new structure, or is it also removing the redundant fragments, duplicate structures, and obsolete helpers that the new structure makes unnecessary?
- Split generic interface boundaries by subject when needed; avoid one API, query, command, or service method that tries to interpret multiple subject types behind one ambiguous input.
- If several peer services all appear to coordinate the use case, simplify until one dominant line is visible.
- If behavior is important but no owner is obvious, the boundary is wrong.
- Make dependency rules explicit so the target decoupling is mechanically checkable.
- Specify where each changed owner, interface, adapter, or support branch should live in subsystems, files, and folders, and name module groupings only when they make the structure easier to read.
- Do not map the spine into code mechanically. Use judgment so the resulting layout is natural and readable for the scope.
- Ask next: do the proposed folders make the structural boundaries readable, or do they flatten several layers and owners into one mixed directory?
- Remember that shared-layer, feature-oriented, runtime-oriented, and hybrid layouts can all be correct when they make the ownership and structural depth easier to read.
- If the target structure cannot be landed in one step, describe the staged transition instead of leaving the migration implicit.
- Let layering emerge from the spine and ownership model: upstream initiators, mid-line domain/control nodes, downstream engines/providers.
- When the structure is non-trivial, often keep those distinct structural depths in distinct folders, but do not force splits that are too small or artificial. If a flatter layout stays clearer, justify it.
- If you apply a pattern, state which owner or support branch uses it and why it helps there.

## Examples

- Run execution:
  `Input -> AgentRunManager -> AgentRun -> AgentRunBackend -> RuntimeEngine / Client -> Provider Runtime`
- Example ownership:
  `AgentRunManager` owns creation/lookup, `AgentRun` owns run lifecycle, `AgentRunBackend` owns runtime adaptation.
- Run event return:
  `Provider Runtime Events -> RuntimeEngine / Client -> AgentRunBackend -> AgentRun -> Consumers`
- Team orchestration:
  `Input -> AgentTeamRunManager -> TeamRun -> TeamRunBackend -> member AgentRuns -> member runtimes`
- CRUD request:
  `HTTP Controller -> Application Service -> Domain Aggregate -> Repository`
- Facade versus owner:
  `Agent facade -> AgentRuntime -> AgentWorker`
  where the facade is the public entry surface and the runtime/worker are the governing owners of lifecycle and serialized control flow.
- Bounded local/internal spine:
  `Queue/Event Source -> Runtime Loop -> Handler/Transition -> Output Event`
- Example ownership:
  domain aggregate owns invariants, application service owns use-case sequencing, repository owns persistence fulfillment.
- Interface-boundary example:
  avoid `getRunResumeConfig(runId)`
  prefer `getAgentRunResumeConfig(runId)`, `getTeamRunResumeConfig(teamRunId)`, `getTeamMemberRunResumeConfig(teamRunId, memberKey)`
- Typical support services that should stay off the spine:
  definition resolution, persistence, projections, message mapping, callbacks, metrics, audit logging.
- Capability-area reuse example:
  if a codebase already has `events/`, `status/`, `handlers/`, `streaming/`, or `bootstrap-steps/`, new work in those categories should normally land there instead of creating a one-off neighbor helper.
- Modernization example:
  reject `NewRuntime + LegacyRuntime + CompatibilityLayer` when the change is meant to replace the old runtime behavior in scope; design the clean-cut target and explicitly remove the legacy path.

## Handoff Rules

- Accept the approved requirements doc and investigation notes from `requirements_engineer` as the only forward handoff source for requirements-stage output.
- Produce the design spec before handing work downstream.
- Send the design spec to `architect_reviewer`.
- If the real issue is a `Requirement Gap`, route it to `requirements_engineer`.
- If downstream specialists report `Design Impact`, revise the design spec and resend it.
- If the issue is `Unclear`, route it to `requirements_engineer` for clarification reset.
- Expect iterative design-review rounds with `architect_reviewer` until the design passes review.
