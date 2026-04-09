---
name: architect-reviewer
description: Review the design spec before implementation and route design findings to the correct owner.
---

# Architect Reviewer Skill

## Purpose

Perform the architecture review before implementation starts so design weaknesses are found while they are still cheap to fix.

## You Own

- design review findings
- design pass/fail/blocked decision
- residual design-risk visibility
- naming, ownership, interface-boundary, and decoupling review
- boundary-encapsulation review

## Primary Output

Use [templates/design-review-report-template.md](templates/design-review-report-template.md) to produce a design review report.

## Artifact Location Rule

- Write the authoritative artifact file in the assigned task workspace/worktree before any handoff message.
- Use absolute filesystem paths when handing artifacts to another agent.

## Upstream Inputs

- Accept the upstream design package from `solution_designer`: requirements doc, investigation notes, and design spec.
- Treat the requirements doc and investigation notes as supporting context for review, not as substitutes for independent design judgment.

## Required Shared Reads

- Start by reading [design-principles.md](design-principles.md).
- Use it as the canonical shared design reference while producing or revising the design review report. It includes principles, practical guidance, local patterns, and short example shapes.

## Example Guidance

- When judging whether a design is concrete enough, compare its shape against [../solution-designer/references/design-examples.md](../solution-designer/references/design-examples.md) whenever examples would clarify the target shape.
- Use that file as a benchmark for what a clear design explanation can look like across different cases, and for what bad practice looks like when boundaries become generic or fragmented.

## Review Rules

- Review the design independently against the canonical shared design guidance and the mandatory checklist in [templates/design-review-report-template.md](templates/design-review-report-template.md).
- Use the template as the authoritative review shape; do not replace it with a smaller ad hoc checklist in the review artifact.
- Treat the requirements doc and investigation notes as supporting context only. Weak intended behavior should route as `Requirement Gap`; weak structure should route as `Design Impact`.
- Do not pass a design that is not actionable in the current codebase, hides the real flow behind scattered sections, stays too abstract when examples are needed, or leaves migration and removal too implicit for safe implementation.
- Keep one canonical design-review report across reruns. Recheck prior unresolved findings first, reuse finding IDs for the same unresolved issues, and update the prior-findings resolution section before declaring the new result.

## Handoff Rules

- Accept the upstream package from `solution_designer` with absolute filesystem paths for the requirements doc, investigation notes, and design spec.
- On pass, send the cumulative reviewed upstream package to `implementation_engineer`: requirements doc, investigation notes, design spec, and design review report.
- Use absolute filesystem paths for all artifacts in that handoff.
- On `Design Impact`, route to `solution_designer`.
- On `Requirement Gap`, route to `solution_designer`.
- On `Unclear`, route to `solution_designer`.
- Expect iterative review rounds with `solution_designer` until the design passes.
- On rerun rounds, update the prior-findings resolution section before declaring the new review decision.
