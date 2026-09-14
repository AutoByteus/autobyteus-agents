# Architecture Design Standards

Read after requirements approval for architecture design, and during design-impact recovery. The main skill owns phase transitions and recovery; this reference owns technical design quality and post-design classification.

## Architecture Investigation Standard

- Begin from the approved requirements, investigation notes, and supplements, but perform the additional technical investigation needed for architecture decisions.
- Inspect the relevant current implementation before finalizing the design.
- Record exact architecture evidence in the canonical investigation notes: source paths, documentation or URLs, commands, runtime/probe observations, setup conditions, and material unknowns. Link that evidence from the design spec instead of maintaining a competing evidence log.
- Identify the change posture, current execution spine, ownership boundaries, coupling or fragmentation, design-health pressure, root-cause classification, refactor posture, and transition constraints.
- Distinguish supported user, system, operational, and contract behavior from states reachable only through synthetic calls, internal-file mutation, or mechanical possibility.
- When persisted data may be affected, inspect representative data, current readers and writers, semantics, invariants, physical-store constraints, disposability, volume, and operational risk before choosing a transition.
- Do not write a greenfield target for a change that must safely transform an existing production path.

## Design Production Rules

- Use [design-spec-template.md](../templates/design-spec-template.md) as the mandatory design structure and [design-principles.md](../design-principles.md) as the canonical design authority.
- Build from approved behavior, requirements evidence, architecture investigation, applicable supplements, and current code reality.
- Preserve stable behavior, requirement, and acceptance-criteria IDs. Link each relevant behavior to its approved trigger, target production path, lifecycle boundary, and applicable spine IDs.
- Keep the design actionable in the current codebase; implementation and review must not reconstruct the target structure from scattered notes.
- Include a design-health assessment for every task. Justify `No refactor needed`; map `Refactor needed now` into removals, file responsibilities, dependencies, and sequencing; state residual risk for `Deferred`.
- Move from behavior and current state to spines and ownership, subsystem allocation, draft file responsibilities, reusable structures, tightened final responsibilities, and folder/path mapping.
- Make removals, dependency rules, compatibility rejection, sequencing, risks, and applicable persisted-data transition decisions explicit.
- Treat a schema or model change as a reason to analyze existing data, not proof that migration is required.
- For `Directly Usable — No Migration`, prove that normal version-agnostic readers preserve required meaning and invariants.
- For `Discard or Rebuild`, identify the authoritative source or rebuild lifecycle and why loss is acceptable.
- For `Migration Required`, isolate old-shape transformation before current runtime use and define validation, completion, restart safety, recovery, rollout, and historical migration retention.
- Use short examples when a target shape would otherwise remain abstract or easy to misread.
- Keep the design, investigation notes and supplements aligned with the approved requirements basis. Resolve conflicts using the main skill's recovery rules; obtain renewed user approval before changed intended behavior governs design.

## Task Size And Architectural Risk

After the architecture design is complete, classify the task using these two
fields and record the evidence in the design spec. This is the classification
standard for every completed solution, including a narrow local change.

- `task_size`: `Small`, `Medium`, or `Large`.
  - `Small`: a narrow local change with limited implementation scope.
  - `Medium`: several files or components within existing ownership and
    architectural boundaries.
  - `Large`: a broad feature, major refactor, or change spanning substantial
    implementation scope or multiple subsystems.
- `architectural_risk`: `Low` or `High`.
  - `Low`: the current architecture absorbs the change with bounded impact,
    low uncertainty, and no material new or changed contract, persistence,
    security, concurrency, deployment, or ownership-boundary behavior.
  - `High`: any material contract, persistence, security, concurrency,
    deployment, ownership-boundary, blast-radius, or unresolved-uncertainty
    impact is present.

### Content-Heavy Work Classification Guardrail

Separate **content volume** from **code-architecture impact** before assigning
these fields. A large number of Markdown/JSON/content packages, source files,
catalog entries, generated records, or schema conversions does not by itself
make work `Large` or `High`. Classify the implementation surface and production
path, not the number of content records.

When the bounded delta is a deterministic content/projection conversion plus
catalog, generator, verifier, focused test, or documentation updates within
existing ownership and contracts, it is normally `Small` or `Medium` with
`architectural_risk=Low`, even when the content inventory is large. Confirm
that the existing readers/contracts can consume the result and that no new
runtime owner, API, persistence migration, route behavior, security boundary,
concurrency behavior, deployment concern, or normative availability/scoring
semantics is introduced.

Use `Large` or `High` only when the implementation itself materially changes
code architecture or another listed risk surface—for example, introducing or
moving runtime owners, changing shared contracts, migrating learner state,
rewiring routes/APIs, removing duplicate readers, or reconciling multiple
subsystems. Do not inflate risk merely because the current repository contains
legacy architecture that is explicitly out of scope for the requested delta.
Conversely, a small amount of content can still be `High` when its integration
changes a shared contract or persistence/ownership boundary.

Record the distinction explicitly in `design-spec.md`: list content inventory
as evidence, then separately list the code/runtime/persistence surfaces actually
in scope. If implementation discovers that a content-only change requires
material architecture changes, return a Design Impact and reclassify rather
than broadening the direct route silently.

Use this structural-versus-payload check when classifying the completed design:

1. **Payload surfaces:** content packages, Markdown/JSON bodies, catalogs,
   fixtures, generated indexes, provenance, and content-only documentation.
2. **Structural surfaces:** runtime modules, shared types/interfaces, ownership
   boundaries, dependency direction, routes/APIs, persistence readers/writers,
   migrations, security/concurrency controls, and deployment configuration.
3. **House test:** if the existing structural surfaces can consume the changed
   payload through their current contract and no structural surface changes
   meaningfully, do not inflate size or risk solely because the payload
   inventory is large.
4. **Target-versus-delta test:** distinguish the architecture the requirements
   describe as a long-term target from the code and payload surfaces actually
   requested in this implementation round. Do not turn an entire repository
   inventory or a future clean-cut target into current implementation scope
   without evidence that those structural changes are part of the delta.

Typical sizing examples: one content package or local validation adjustment is
usually `Small`; a bulk package conversion with catalog/generator/verifier,
test, and documentation updates but no runtime-owner change is usually
`Medium`/`Low`; a runtime-boundary refactor, shared-contract change, route/API
rewrite, or persistence migration is `Large` and/or `High`.

Record the values, rationale and affected surfaces in the design spec. If later
evidence changes the classification, update the design artifact and classify
the revised result rather than silently downgrading risk. The main skill's
Result And Handoff procedure applies the current handoff rules; this reference
does not select a review or implementation recipient.
