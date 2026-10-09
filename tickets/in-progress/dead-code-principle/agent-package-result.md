# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team` (Software Engineering Team)
- Update intent: `extend`
- Target package: `agent-teams/software-engineering-team/`
- Scope included: shared `design-principles.md`; Solution Designer design-spec template; Architecture Reviewer review template; Implementation Engineer skill and handoff template; Code Reviewer report template.
- Request/reference: User, 2026-10-09; analysis in this folder.

## Summary

New **Core Principle 7, "No Dead Code"** in the shared design principles, read by all four roles: what counts as dead, the evidence needed before removal (search plus compiler/lint/unused-export checks, and entry points a search misses), the scope (touched files and modules, including code already dead; elsewhere becomes a follow-up task), and the rule that code still reachable is not dead. The principle's later sections get one line each in their own style: a Practical Application step, a Required Design Question, and a Design Smell. Each role now points to the principle instead of defining dead code itself: the design's removal plan records dead code with evidence and scope, the design review fails a plan that misses it, implementation removes it and lists the rest, and code review checks it.

## Ownership and design decisions

- One definition: `shared/design-principles.md` Core Principle 7 (anti-pattern 4). The Implementation Engineer's own list was replaced with a pointer.
- Existing structures reused: the design spec's mandatory Removal / Decommission Plan (with its `In This Change` / `Follow-up` scope column) and the review's Removal verdict; no new sections.
- Placement follows the file's flow: principle → practical step → design question → smell.

## Changed paths

### Modified

- `agent-teams/software-engineering-team/shared/design-principles.md`
- `.../solution-designer/skills/solution-designer/templates/design-spec-template.md`
- `.../architecture-reviewer/skills/architecture-reviewer/templates/design-review-report-template.md`
- `.../implementation-engineer/skills/implementation-engineer/SKILL.md`
- `.../implementation-engineer/skills/implementation-engineer/templates/implementation-handoff-template.md`
- `.../code-reviewer/skills/code-reviewer/templates/code-review-report-template.md`

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | `Pass` | All four Software Engineering Team skills. |
| Anchor `#7-no-dead-code` | `Pass` | 3 links resolve. |
| Anti-pattern 4 (one definition) | `Pass` | No dead-code definition outside the shared file. |
| Anti-pattern 14 (plain language) | `Pass` | No jargon or slash compounds in added lines. |
| Runtime | Not observed | Applies on the next design and review. |
