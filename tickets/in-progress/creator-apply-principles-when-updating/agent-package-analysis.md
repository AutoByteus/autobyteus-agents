# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `repair`)
- Package type: `skill`
- Target package: `agents/agent-package-creator/skills/agent-package-creation/` (`SKILL.md`, `references/package-design-principles.md`)
- Scope included: steps 2–4 of `SKILL.md`; §4 of `package-design-principles.md`.
- Scope excluded: `package-anti-patterns.md`. The main checkout has uncommitted entries 15–16 there, and the defect is a process gap, not a new kind of mistake. Templates.
- Request/reference: User, 2026-10-11: work in two steps. Analyse by the principles, then write the update by the same principles, "only when you do this, then the updated package will follow your principles … use your principle to update yourself first."

## Baseline (`origin/main` `516e713`)

| Location | Current text |
| --- | --- |
| SKILL step 2 | "Judge the target against the shared authoring standard … Record … recommended or planned changes". The analysis is judged by the standard, but the planned changes aren't explicitly designed by it. |
| SKILL step 3 | "Apply the shared authoring standard while writing." |
| SKILL step 4, All kinds | "one owner per rule, no stale names or competing routes, and a diff contained to the approved scope. Run the detection checks in package-anti-patterns.md that apply." These are structural checks; the changed wording isn't re-read against the standard (grounding, clarity, economy, judgement over rigid rules). |
| principles §4, line 67 | "This standard guides the author's work, **not a separate self-review stage**." |

## Observed defects (2026-10-10..11)

- PR #35: proposed a general rule triggered by "work that spans many tool calls or sessions", which can't be known in advance (grounding). The user caught it.
- PR #37: wrote "show that on its board" into the Solution Designer skill, which describes another agent's internals (anti-pattern 3). Found only on a user-requested re-review.
- PR #36: a grammar slip and a repeated sentence (economy), found only on a re-review.
- PR #38: the template note repeats the skill's list of reasoning sources (anti-pattern 4), found when the user asked about the process.

All of these break existing principles and anti-patterns. What failed is the final check: §4 line 67 explicitly rules out a self-review of the changed text, and step 4 checks structure, not wording.

## Preserved behavior

- `analyze` changes nothing; `update` writes the analysis before editing; validation and the anti-pattern-entry rule are unchanged.
- Independent review only when requested or required by the workflow.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Content flow | SKILL step 2 doesn't tie planned changes to the standard | SKILL step 2 | Proposals can come from the request's wording rather than the principles. | Plan each change by the same standard the analysis judged with. |
| 2 | Content flow | SKILL step 3 is one generic line | SKILL step 3 | The writing step isn't linked to the analysis's criteria. | Write each change by the standard you judged with in step 2. |
| 3 | Content flow | SKILL step 4 checks structure only | SKILL step 4 | Wording defects reach the PR. | Before handoff, re-read the changed text against the standard and the applicable anti-patterns, as a reviewer would, and fix what fails. |
| 4 | Ownership / contradiction | principles §4 line 67 "not a separate self-review stage" | principles §4 | It contradicts finding 3 and caused the skipped check. | The standard guides the analysis, the writing and the final check; independent review is still only on request. |

User refinement during the update (2026-10-11): "After your updates, you should use your principle to do a final review. Because if you found problems, then you will continue this update." Finding 3 became a review loop: review, fix, review again until a review finds nothing.
