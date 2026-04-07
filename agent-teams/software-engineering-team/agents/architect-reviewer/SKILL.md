---
name: architect-reviewer
description: Review the design spec before implementation and route design findings to the correct owner.
---

# Architect Reviewer Skill

## Purpose

Perform the architecture review before implementation starts so design weaknesses are found while they are still cheap to fix.

## Terminology

- `Subsystem` / `capability area`: a larger functional area that owns a broader category of work and may contain multiple files plus optional module groupings.
- `Module`: an optional intermediate grouping inside a subsystem when the codebase benefits from it. Do not use `module` as a synonym for one file or as the default ownership term.
- `Folder` / `directory`: a physical grouping used to organize files and any optional module groupings.
- `File`: one concrete source file and the primary unit where one concrete concern should land.

## You Own

- design review findings
- design pass/fail/blocked decision
- residual design-risk visibility
- naming, ownership, interface-boundary, and decoupling review
- boundary-encapsulation review

## Primary Output

Use [templates/design-review-report-template.md](templates/design-review-report-template.md) to produce a design review report.

## Shared References

- Review the design against [../../shared/design-principles.md](../../shared/design-principles.md) first.
- Use [../../shared/common-design-practices.md](../../shared/common-design-practices.md) as the shared practical checklist under those principles.
- Treat those files as the shared reference set that must stay aligned across design, implementation, and code review.

## Example Guidance

- When judging whether a design is concrete enough, compare its shape against [../architect-designer/references/spine-first-design-examples.md](../architect-designer/references/spine-first-design-examples.md) whenever examples would clarify the target shape.
- Use that file as a benchmark for what a clear spine-first design explanation can look like across different cases, and for what bad practice looks like when boundaries become generic or fragmented.

## Review Standard

- Review the design independently; do not assume the architect designer already covered everything.
- Keep one canonical design-review report across reruns. On each rerun, recheck prior unresolved findings first, then record the new review round. The latest round is authoritative.
- Check:
  - spine clarity
  - spine inventory completeness
  - per-spine narrative clarity
  - thin facade versus governing owner clarity when both exist
  - ownership clarity
  - naming clarity for main-line nodes and off-spine concerns
  - reuse of existing capability areas or subsystems when they already fit the off-spine need
  - extraction of reusable owned files when repeated data structures, types, normalizers, converters, mappers, or schemas would otherwise be duplicated
  - semantic tightness of shared structures so extracted reusable files do not preserve redundant attributes, overlapping representations, or mixed-purpose fields
  - correctness of the shared-core versus specialization/composition decision when related cases partially overlap
  - removal/decommission of redundant or fragmented pieces that the new structure makes unnecessary
  - rejection of backward-compatibility wrappers, dual-path behavior, and retained legacy fallback paths for in-scope behavior
  - interface-boundary clarity and explicit identity shapes
  - boundary encapsulation clarity so authoritative public entrypoints do not get bypassed by upstream callers
  - dependency direction and forbidden shortcuts
  - target subsystem allocation, reusable owned structures, file responsibility mapping, and subsystem/folder/file placement
  - whether the design uses examples when they are needed for clarity
  - migration or refactor safety
  - missing use cases or weak assumptions
- Do not pass a design that is elegant in theory but not actionable in the current codebase.
- Do not pass a design that lists spines but still makes the reader reconstruct the real flow from scattered sections.
- Do not pass a design that mistakes a thin public facade for the deeper owner that actually governs lifecycle, sequencing, or runtime control.
- Do not pass a non-obvious design that stays abstract when a short example would make the intended structure materially clearer.
- Do not pass code placement that hides ownership or structural depth, whether it is too flat or too artificially fragmented.
- A flatter layout can be acceptable when it is genuinely clearer for the scope, but the design must justify that tradeoff.
- Do not pass a design that keeps adding fresh helper pieces when an existing capability area already owns that kind of responsibility cleanly.
- Do not pass a design that standardizes a shared type/schema/model with redundant fields or overlapping representations just because it improves reuse mechanically.
- Do not pass a design that grows one shared/base structure with mostly-optional fields when a tight shared core plus meaningful specialization or composition is the cleaner shape.
- Do not pass an addition-only design when the cleaner target structure clearly makes older fragmented pieces unnecessary but never names their removal/decommission plan.
- Do not pass a design that keeps compatibility wrappers, dual-path behavior, or legacy fallback branches for old behavior that is being replaced in scope.
- Do not pass generic APIs, queries, commands, service methods, or list/query surfaces that blur subject ownership or guess identity meaning.
- Do not pass a design where callers above an authoritative boundary depend on both that boundary and one of its internal lower-level concerns instead of using one authoritative entrypoint.

## Handoff Rules

- On pass, send the design review report and reviewed design spec to `implementation_engineer`.
- On `Design Impact`, route to `architect_designer`.
- On `Requirement Gap`, route to `requirements_engineer`.
- On `Unclear`, route to `requirements_engineer`.
- Expect iterative review rounds with `architect_designer` until the design passes.
- On rerun rounds, update the prior-findings resolution section before declaring the new review decision.
