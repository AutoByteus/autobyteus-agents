# Architecture Design Process

Read after requirements approval for architecture design, and during design-impact recovery. The main skill owns phase transitions and recovery; this reference owns how you investigate, produce, and classify the design.

[design-principles.md](design-principles.md) is the design standard: what a good design is, for you and for the reviewers. This file is your process for producing one, and points to the principles instead of restating them. The design-spec template records the completed design; it is not the design method.

## Architecture Investigation Standard

- Begin from the approved requirements, investigation notes, and supplements, but perform the additional technical investigation needed for architecture decisions.
- Inspect the relevant current implementation before finalizing the design.
- Apply the project-specific design principles described in [design-principles.md](design-principles.md#project-specific-design-principles). Record the `DESIGN.md` path(s) that apply, or `No project DESIGN.md found`, in the design spec's `Authorities read` field, and any conflict or discrepancy in the field beside it.
- Record exact architecture evidence in the canonical investigation notes: source paths, documentation or URLs, commands, runtime/probe observations, setup conditions, and material unknowns. Link that evidence from the design spec instead of maintaining a competing evidence log.
- Identify the change posture, current execution spine, ownership boundaries, coupling or fragmentation, design-health pressure, root-cause classification, refactor posture, and transition constraints.
- Distinguish supported user, system, operational, and contract behavior from states reachable only through synthetic calls, internal-file mutation, or mechanical possibility.
- When persisted data may be affected, inspect representative data, current readers and writers, semantics, invariants, physical-store constraints, disposability, volume, and operational risk before choosing a transition.
- Do not write a greenfield target for a change that must safely transform an existing production path.

## Mandatory Production Migration Convention Check

When persisted data may require transformation, locate and read the target
repository's authoritative migration conventions before designing that
transformation or its admission gate. Find them through the project's `DESIGN.md`
or the repository's design documentation; use the project's own
document, not a copy in the skill repository. If that authority is absent or
insufficient, record the gap and update the canonical document within
authorized scope; do not invent contradictory local policy. Link its reviewed
version in investigation notes and the design.

Inspect at least the relevant released predecessor migrations and current
admission owner. Record retained/skipped/warning source dispositions, real
installed-data evidence where available, and which current operations depend
on each target. Directory enumeration is not current-package validation.
Choose global, capability or run admission from actual invariant ownership;
never equate non-`SUCCEEDED` aggregate status with global startup failure.
Warning success requires independently valid admitted results and bounded
explicit nonfatal dispositions, not a majority threshold. Include cross-root
reference effects and representative valid/invalid coexistence in upgrade
verification. Apply the repository's proportionate recovery rule rather than
adding parallel journals/backups for speculative failures.

## Design Production Rules

- Write the design in [design-spec-template.md](../templates/design-spec-template.md), the mandatory structure for recording it, after making the decisions with the design principles.
- Build from approved behavior, requirements evidence, architecture investigation, applicable supplements, and current code reality.
- Preserve stable behavior, requirement, and acceptance-criteria IDs. Link each relevant behavior to its approved trigger, target production path, lifecycle boundary, and applicable spine IDs.
- Keep the design actionable in the current codebase; implementation and review must not reconstruct the target structure from scattered notes.
- Make the design-health decision with the principles' [Task Design Health Assessment](design-principles.md#task-design-health-assessment); carry `Refactor needed now` into the removal plan, file responsibilities, dependencies, and sequencing.
- Work in the order of the principles' [Practical Application Guide](design-principles.md#practical-application-guide).
- Decide each persisted-data transition with [Core Principle 5](design-principles.md#5-current-schema-runtime-and-proportionate-persisted-data-transitions).
- Make removals, dependency rules, compatibility rejection, sequencing, risks, and persisted-data decisions explicit in the design spec.
- Use short examples when a target shape would otherwise remain abstract or easy to misread.
- Keep the design, investigation notes and supplements aligned with the approved requirements basis. Resolve conflicts using the main skill's recovery rules; obtain renewed user approval before changed intended behavior governs design.

## Task Size And Architectural Risk

After the design is complete, classify it with [Task Size And Architectural Risk](design-principles.md#task-size-and-architectural-risk) in the design principles.
