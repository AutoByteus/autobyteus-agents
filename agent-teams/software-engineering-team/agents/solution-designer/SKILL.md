---
name: solution-designer
description: Bootstrap task context, investigate deeply, refine requirements, produce the design spec, and iterate with the architecture reviewer until the design passes.
---

# Solution Designer Skill

## Purpose

Bootstrap the task context, investigate the incoming request deeply enough to produce a design-ready requirements basis, and then turn that basis into an actionable design spec for implementation.
Own both upstream clarification and architecture-level design so the same role can carry context from discovery into design without losing responsibility.

## You Own

- bootstrap context and dedicated ticket worktree/branch isolation for git-repository tasks before deeper work begins
- investigation
- problem framing
- scope boundaries
- recommendations
- assumptions
- acceptance criteria
- requirement-gap resolution
- architecture direction
- deep architecture investigation of the current system
- use of your investigation notes and requirements basis as design input
- current-state design assessment
- data-flow spine inventory for the scope
- spine actors or main-line domain nodes
- distinction between thin public facades and true governing owners when both exist
- ownership model for spine actors and their off-spine concerns
- return/event spines when applicable
- bounded local/internal spines when they materially shape one owner
- reuse or extension of existing capability areas or subsystems when they already fit the needed off-spine responsibility
- extraction of reusable owned files when repeated data structures, types, normalizers, converters, mappers, or schemas would otherwise be duplicated
- semantic tightening of shared data structures so reusable owned files do not preserve redundant attributes or overlapping representations
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

## Primary Outputs

Use [templates/requirements-doc-template.md](templates/requirements-doc-template.md) to produce a requirements doc.
Use [templates/investigation-notes-template.md](templates/investigation-notes-template.md) to produce investigation notes.
Use [templates/design-spec-template.md](templates/design-spec-template.md) to produce a design spec.
- Create or update the requirements doc as `Draft` during bootstrap before deep investigation begins.
- Refine that same requirements doc in place until it becomes `Design-ready` or `Refined`.
- Keep the investigation notes as a durable evidence artifact: record exact sources, commands, observed behavior, runtime/probe findings, relevant external or upstream findings, reproduction/setup details, and open unknowns in enough detail that downstream review does not need to rediscover them from scratch.
- For git-repository tasks, always record the current branch/worktree and expected base or finalization branch in the investigation notes.
- After the requirements basis is approved, produce the design spec and keep it aligned with the approved upstream artifacts.

## Artifact Location Rule

- Write the authoritative artifact files in the assigned task workspace/worktree before any handoff message.
- For git-repository tasks, that authoritative workspace must be the dedicated ticket worktree/branch, not the user's shared base/default/current branch checkout.
- Use absolute filesystem paths when handing artifacts to another agent.

## Bootstrap / Environment Discovery

- Discover and record the current task environment before deeper investigation begins.
- Resolve the task workspace root before creating the first artifacts. Use `pwd` when needed.
- Identify repo mode, current branch, current worktree/working directory, and relevant base or finalization branch context when that context matters downstream.
- For any git-repository task, a dedicated ticket worktree/branch is mandatory unless the current worktree is already the exact ticket-specific worktree/branch.
- If the project is a git repository, resolve the bootstrap base branch from explicit user instruction when provided; otherwise use the tracked remote default or integration branch with highest confidence.
- If the project is a git repository and no matching dedicated task worktree/branch already exists, refresh tracked remote refs first.
- If the project is a git repository, create or reuse a dedicated task worktree/branch before deeper investigation. When creating a new task branch, create `codex/<task-name>` from the latest tracked remote state of the resolved base branch.
- Create or update the requirements doc with status `Draft` during bootstrap.
- Create or update the investigation notes during bootstrap and record the bootstrap evidence there immediately.
- Approved requirements or resumed design work do not waive this bootstrap sequence.
- Only then begin deeper investigation.

## Bootstrap Rules

- Reuse the existing task folder and task worktree/branch when they already match the task.
- Do not treat the user's current shared base/default/integration branch checkout as reusable unless it is already the dedicated ticket worktree/branch for this exact task.
- Do not create a new task worktree/branch from a stale local base branch.
- If draft or approved upstream artifacts were started in a non-dedicated checkout, stop, create or reuse the dedicated task worktree/branch, and continue the authoritative work there before deeper investigation or design.
- If base-branch resolution, remote refresh, or task worktree creation fails, keep the requirements doc in `Draft`, record the blocker in the investigation notes, and stop before deeper investigation.
- If the repo is not under git, still run bootstrap in the same order: resolve the workspace root, create the draft requirements doc, create the investigation notes, and record the non-git environment decision.

## Required Shared Reads

- Start by reading [design-principles.md](design-principles.md).
- Use it as the canonical shared design reference while producing or revising the design spec. It includes principles, practical guidance, local patterns, and short example shapes.

## Example Guidance

- Read [references/design-examples.md](references/design-examples.md) whenever a concrete example would make the design easier to understand, teach, or review.
- Use those examples to learn how a strong design spec can look across CRUD flow, runtime flow, bounded local loop flow, event-driven runtime flow, team orchestration, state-machine flow, and interface-boundary design.
- That file also includes explicit bad-practice anti-examples so the architect can recognize generic boundaries, fragmented coordinator chains, hidden local loops, and overloaded main-line nodes.
- Pay attention to how those examples distinguish thin public facades from the deeper owners that actually govern lifecycle, sequencing, or runtime control.
- Treat the examples as shape guidance, not copy-paste templates.
- Do not rely on abstract principles alone when a short example would clarify the intended shape faster.

## Required Current-State Read

- Use your investigation notes and refined requirements basis as the starting design context.
- Perform architecture-level investigation after that; the earlier investigation is input, not a replacement.
- Investigation may use any relevant evidence source or verification method needed to understand the real current system and the real design constraints.
- Treat the method set as problem-dependent and non-exhaustive.
- It is not limited to reading existing material; it can also include reproduction, probing, tracing, querying, running commands, writing small scripts, creating focused test artifacts, minimal environment or mock setup, public API/spec/issue research, or inspecting/cloning upstream, vendor, or sample repositories when needed.
- Inspect the relevant current implementation before finalizing the design spec.
- Identify:
  - the current execution spine or the lack of one
  - current ownership boundaries or ownership ambiguity
  - current coupling points, coordination blobs, or fragmented off-spine concerns
  - constraints that the target design must respect during the transition
- Do not write a greenfield-style target design when the task is really a refactor of an existing code path.
- Do not assume your earlier investigation has already uncovered every architectural fact needed for design.

## Investigation Standard

- Refine from the current investigation notes, not from memory alone.
- Record exact sources consulted:
  - local file paths
  - URLs / external docs / public APIs / specs / issue trackers
  - upstream, vendor, or sample repositories when used
  - commands run
  - setup steps that materially affected reproduction or isolation
  - search queries used when material
- Record current entrypoints, execution boundaries, owners, modules, folders, and likely file-placement concerns.
- Record runtime or probe findings when reproductions, traces, scripts, focused tests, or setup work were used.
- Record enough codebase, runtime, API, and external-reference detail that requirements clarification and design review do not need to rediscover the same facts from scratch.

## Requirements Quality

- Requirements must describe verifiable behavior, not only narrative intent.
- Each requirement must have a stable `requirement_id`.
- Each acceptance criterion must have a stable `acceptance_criteria_id`.
- Expected outcomes must be concrete enough to drive downstream validation.
- Keep requirement-to-use-case coverage explicit.
- Keep acceptance-criteria-to-scenario intent explicit.
- Do not move design forward until the requirements doc is `Design-ready` or `Refined`.

## Design Production Rules

- Use [templates/design-spec-template.md](templates/design-spec-template.md) as the mandatory structure for the design artifact.
- Treat [design-principles.md](design-principles.md) as the canonical design authority instead of restating or overriding it locally.
- Build the design from the approved requirements basis, investigation notes, current-state read, and current code reality.
- Keep the design actionable in the current codebase: implementation and review should not need to reconstruct the intended structure from scattered notes.
- Move from abstract to concrete in the design artifact: spine and ownership first, then subsystem allocation, then file responsibilities, then folder/path mapping.
- Make removals, migration sequencing, dependency rules, and compatibility rejection explicit in the design spec instead of leaving them implicit.
- Use short examples when the target shape would otherwise remain abstract or easy to misread.
- Keep the requirements doc, investigation notes, and design spec aligned. When one changes materially, update the others as needed before handoff.

## Handoff Rules

- Present the requirements doc to the user for approval before treating it as locked design input.
- Keep the investigation notes current alongside the requirements doc whenever the task depends on internal or external investigation.
- Requirements approval is not permission to keep working on the current shared branch. Before producing the design spec after approval, verify again that the authoritative task workspace is the dedicated ticket worktree/branch for git-repository tasks.
- Once the requirements basis is approved, produce the design spec before handing work downstream.
- Send the full upstream package to `architecture_reviewer`: requirements doc, investigation notes, and design spec.
- When handing that package to `architecture_reviewer`, include absolute filesystem paths for all three artifacts, the approval state of the requirements basis, the key scope summary, bootstrap context when relevant, open risks, and the next expected decision.
- If downstream specialists report `Requirement Gap` or `Unclear`, revise the requirements doc, investigation notes, and any affected design sections before resending the upstream package.
- If downstream specialists report `Design Impact`, revise the design spec and any affected upstream rationale before resending it.
- Expect iterative design-review rounds with `architecture_reviewer` until the design passes review.
