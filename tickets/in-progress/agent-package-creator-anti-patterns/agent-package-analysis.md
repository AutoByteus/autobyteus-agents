# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `agent` (bundled skill `agent-package-creation`)
- Target package: Agent Package Creator, `/Users/normy/autobyteus_org/autobyteus-agents/agents/agent-package-creator/`
- Scope included: `SKILL.md`, `references/package-design-principles.md`, `references/skill-authoring-principles.md`; incidents from this conversation's work (tickets under `tickets/in-progress/`).
- Scope excluded: other packages; the uncommitted user-directed collaboration fix (separate ticket), except as an incident source.
- Request/reference: User, 2026-10-07: add anti-patterns to the creator's principles and grow them from real problems, starting with the creator itself.

## Baseline

| File | Current responsibility |
| --- | --- |
| `SKILL.md` | Operations, workflow, validation; links the two principle files. |
| `references/package-design-principles.md` | Boundaries, ownership, authoring standard, routing, safe updates. Positive rules only. |
| `references/skill-authoring-principles.md` | Skill ownership, instruction flow, resources, validation. Positive rules only. |

No file records a concrete mistake, how it was found, or how to detect it again.

## Preserved behavior

- The two principle files keep their subjects and stay short.
- The analysis-first update flow, validation, and result contract are unchanged.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership (missing behavior) | No anti-pattern record; real mistakes repeated across packages (the `delegate_task` ban was copied into five places). | New `references/package-anti-patterns.md` | Lessons stay in chat and tickets; the next package repeats them. | Add an anti-pattern file: each entry is a short, generalized rule with the incident it came from, the principle it breaks, what to do instead, and how to detect it. |
| 2 | Content flow (missing behavior) | Nothing tells the creator to add an entry when a defect traces to a gap in its own guidance. | `SKILL.md` | The file would not grow. | In analysis and recovery: when a finding shows a mistake these files did not prevent, add or extend an entry in the same update. Read the file when analyzing, and use it as a checklist during validation. |
| 3 | Economy | A growing list can bloat. | Anti-pattern file | Hard to read; duplicates. | Group by area; one entry per cause; merge entries that share a cause; keep each to a few lines; principles stay the authority and entries link to them. |

## Seed entries (incidents from this work)

1. Forbidding user-directed collaboration (blanket `delegate_task` ban; Solution Designer refused "send to @Product Team", 2026-10-07).
2. An outcome only a parent Org can route (Solution Designer `Product Design Requested` in a standalone team).
3. A member skill describing another team's internals (Product Designer modes, repository, Bootstrapper).
4. Copying one rule into several files (the ban in five places).
5. Project-specific paths or rules in a reusable skill (hard-coded AutoByteus migration path).
6. Over-structuring content the user writes naturally (prescribed fields in Project Task descriptions).
7. Redundant instructions for default runtime behavior (telling agents to read `AGENTS.md`).
8. Procedures that assume an external system's behavior (Luma keyword search that does not exist).
9. Creating an identity that collides with an existing one (two "Project Task Manager" agents).
10. Working from a stale checkout (a superrepo checkout 16 commits behind; missed the existing root `AGENTS.md` and design guide).
11. Pushing without checking what else will be pushed (two unrelated Product commits went out with a push).

## Planned changes

- Add `references/package-anti-patterns.md` with the seed entries grouped as package design, skill content, and creator process.
- `SKILL.md`: link it next to the principle files; add the growth rule to step 2 (analysis) and step 4 (recovery); add it to the step 4 validation.
- Both principle files: one pointer line each to the anti-patterns file.

## Open questions and approvals

- Approval: user request. No open questions.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Existing anti-pattern content | None | `grep -i "anti-pattern\|mistake"` over the package. |

## Next action

Apply the planned changes, validate, and write `agent-package-result.md`.
