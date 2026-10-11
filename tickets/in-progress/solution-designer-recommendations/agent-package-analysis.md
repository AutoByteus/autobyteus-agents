# Agent Package Analysis

- Status: `Completed`
- Operation: `analyze` (no files changed)
- Package type: `skill`
- Target package: `agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/` at `origin/main` `516e713`: `SKILL.md`, `references/requirements-engineering.md` (RE), `templates/requirements-doc-template.md` (TPL), `templates/investigation-notes-template.md`, `templates/design-spec-template.md`.
- Request/reference: Project Task `project_task_b50d58ce-…` (user, 2026-10-11). After investigating, the designer should give a recommended answer for each undecided part, deciding it itself within the Task's direction, rather than leave open questions.

## Findings

| # | Question | Verdict | Evidence (exact lines) |
| --- | --- | --- | --- |
| 1 | Are unknowns turned into recommendations with reasoning? | **Partly covered** | Covered for details within the direction: SKILL 113–116 "Decide solution details within the given direction yourself … Choose what the evidence and the direction support and record the choice and its rationale". Elsewhere unknowns are only recorded: SKILL 112 "define … unknowns and verification intent"; RE 9 "Record … unresolved questions in the investigation notes"; RE 29 "Separate scope, non-goals, assumptions, constraints, and unresolved decisions"; RE 126 "assumptions and unresolved decisions are visible". |
| 2 | (a) self-decided within direction vs (b) user decisions **with a recommendation** | **(a) covered, (b) missing the recommendation** | (a) SKILL 113–118 (from `79765da`). (b) SKILL 117–118 "Leave for the user only decisions that change scope or product direction, or a real product trade-off the evidence cannot settle" and SKILL 141 "Present the decisions you made with the requirements, and only the questions that really need the user": neither asks for a recommendation. RE 72–73 "Record unresolved experience questions and ask the user for direction when that decision is necessary": no recommendation. |
| 3 | Do templates push toward leaving questions open? | **Yes (mild)** | TPL 165 heading "Open Decisions And Questions"; TPL 167 columns "Question / Why It Matters / Options / Evidence / Decision Owner / Status", with no recommendation column; TPL 122 "Explicitly unresolved product decisions:"; TPL 201 "Material assumptions and open decisions are visible". Design spec line 13 "discrepancies (open questions for the user)". The investigation notes' "Assumptions, Unknowns, And Risks" table has a "Resolution / Owner" column, which is fine. |
| 4 | Anything that presents options without a recommendation? | **Yes** | The TPL 167 DEC table lists "Options / Evidence" with no recommendation field. In the delegated-copy-task-locator example the designer did recommend (b) and (a) in its message, but the template doesn't ask for it. |

## Proposed smallest changes (not applied)

1. **SKILL §1, lines 113–118:** replace the bullet with:
   > - After investigating, give each undecided part a recommended answer with its reasoning; the evidence usually supports one. Decide it yourself when it is a solution detail within the given direction (an edge case, consistency across similar surfaces, a gap an approved design left), and record the choice and rationale in `requirements-doc.md` with yourself as the decision owner. Leave for the user only decisions that change scope or product direction, or a real product trade-off the evidence cannot settle, and bring each with your recommendation.
2. **SKILL §2, line 141:** "and only the questions that really need the user" becomes "and only the questions that really need the user, each with your recommendation".
3. **TPL 165–169:** heading "Open Decisions And Questions" becomes "Decisions". Add a "Recommendation And Reasoning" column after "Options / Evidence", and one line under the table: "Every row carries a recommendation. Status: `Decided` (by you, within the direction) or `Needs user` (scope or product direction)."
4. Optional, for consistency:
   - RE 73: "ask the user for direction, with your recommendation, when that decision is necessary".
   - TPL 122: "Product decisions still needing the user (with recommendation):".
   - Design spec 13: "(with your recommendation, for the user)".

None of this changes the approval gate: explicit user approval of the requirements basis and scope changes stays as is (SKILL §2, RE 26, RE 129).

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Source | Pass | `git show origin/main:<path>` at `516e713`; line numbers are from that revision. |
| Files changed | None | `analyze` only. |

## Approval and refinement (2026-10-11)

The user approved changes 1–4 with one refinement: reasoning comes first, then the recommendation. The reasoning is grounded in (1) what the investigation found about the current project, (2) industry best practice, and (3) a good user experience or other quality goals that apply. The template column is named "Reasoning And Recommendation". Applied as an `update`; see [agent-package-result.md](agent-package-result.md).
