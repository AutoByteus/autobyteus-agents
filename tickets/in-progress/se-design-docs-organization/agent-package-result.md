# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team` (Software Engineering Team, design documents)
- Update intent: `repair` (ownership and organization)
- Target package: `agent-teams/software-engineering-team/`
- Scope included: findings 1–5 of the analysis in this folder.
- Scope excluded: finding 6 (plain-language pass on the shared principles), later.
- Request/reference: User, 2026-10-10.

## Summary

Each design rule now has one owner, and every other file points to it.

1. **Example links:** `design-examples.md` is linked at the skill root in all four roles (moved for both reviewers, added for the Implementation Engineer); all example links resolve in every role.
2. **Process file and template point to the standard:** `architecture-design.md` is retitled "Architecture Design Process"; its production rules point to the Task Design Health Assessment, the Practical Application Guide, and Core Principle 5 instead of restating them. The design-spec template's "Legacy Removal Policy" keeps only fields with a pointer to Derived Checks; its data-transition section points to Core Principle 5.
3. **Size and risk definitions are shared:** "Task Size And Architectural Risk" (with the content-heavy guardrail) moved from the Solution Designer's file into `design-principles.md`, after the Task Design Health Assessment; the Solution Designer classifies with it and both reviewers judge with it (links added).
4. **Code Reviewer's copy of Principle 6 removed:** its section points to Core Principle 6 and keeps the review-specific rules (what a rejected scenario may not affect, structural observations, the Promote / Hold / Reject gate); 66 → 43 lines. The concurrent-workflow rule, which existed only in the Code Reviewer's copy, moved into Principle 6 so designers apply it too.
5. **Duplicates inside the shared file merged:** Derived Checks keep the rules (clean-cut replacement, removal, tight shared structures, shared core versus variants); the Practical Application Guide keeps the order of work (files before folders) and points to the checks.

## Ownership and design decisions

- `shared/design-principles.md`: what a good design is, including size and risk classification; read by all four roles.
- `solution-designer/references/architecture-design.md`: the designer's process only (investigation, migration check, production steps, when to classify).
- Templates: fields and what to record; rules by pointer.

## Changed paths

### Modified

- `shared/design-principles.md`
- `agents/solution-designer/skills/solution-designer/SKILL.md`, `references/architecture-design.md`, `templates/design-spec-template.md`
- `agents/architecture-reviewer/skills/architecture-reviewer/SKILL.md`
- `agents/code-reviewer/skills/code-reviewer/SKILL.md`

### Moved or added (finding 1, previous commit)

- `agents/{architecture-reviewer,code-reviewer}/skills/*/references/design-examples.md` → `design-examples.md`; added `agents/implementation-engineer/skills/implementation-engineer/design-examples.md` (links to `shared/`).

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | `Pass` | All Software Engineering Team skills. |
| Links and anchors | `Pass` | 194 links, each role's view (including linked shared files): 0 broken. |
| Anti-pattern 4 | `Pass` | Size/risk definitions and scenario-class definitions each in one file; the remaining `Discard or Rebuild` mentions are the Implementation Engineer's own action and the template's "what to record". |
| Old title references | `Pass` | No reference to "Architecture Design Standards". |
| Runtime | Not observed | Applies on the next design and review. |
