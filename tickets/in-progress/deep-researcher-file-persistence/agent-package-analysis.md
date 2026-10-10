# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `skill` (standalone `deep-research`, research-to-deck team-local `deep-researcher`)
- Target package: `agents/deep-researcher/skills/deep-research/SKILL.md`, `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md`
- Scope included: the two skills above; the Research Engineer skill as a reference.
- Scope excluded: agent definitions, tools, configs, routes; other teams.
- Request/reference: User request: keep research progress in the topic folder, as a researcher keeps notes. Revised 2026-10-10 after the independent review of PR #35, at the user's request ("Since you said it's partly correct … Update the PR").

## Baseline (`origin/main` `636e0df`)

| File | Current responsibility |
| --- | --- |
| `deep-research/SKILL.md` | §1 looks for earlier notes in `<workspace>/research/<topic-slug>/` and reuses them. §4 writes `evidence.md` "as you go". No file holds the sub-questions and their status, and dead ends aren't noted. |
| research-to-deck `deep-researcher/SKILL.md` | Keeps `research-resource-index.md`, `research_notes.md` and `claim_evidence_ledger.md` in the project folder. Doesn't say to update them while reading, or to read them before continuing. |

## Preserved behavior

- The topic folder, reused for the same topic. Primary sources first, secondary sources labeled.
- `task-request.md` handoff for sign-in or browser-heavy pages.
- Evidence types `fact` / `self-claim` / `opinion`, each with source and date. "Never record a finding without its source."
- Brief template, Deliver step, and handoff via `agent.md`.
- research-to-deck artifacts, the handoff to `infographic_powerpoint_designer`, and downstream-fix routing.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Content flow | `deep-research/SKILL.md` §2 lists sub-questions only in the conversation. | `deep-research/SKILL.md` | Open questions and dead ends live only in the agent's working memory, so it can repeat searches. | Write sub-questions and their status to `plan.md`, and update the status when a sub-question is done. |
| 2 | Content flow | §3 (search) and §4 (evidence) are separate steps, although §4 already says "as you go". | `deep-research/SKILL.md` | Readers can take the step order to mean "read first, record later". | Merge them: write each finding to `evidence.md` as soon as its source is read. |
| 3 | Content flow | The skill doesn't say when to write notes. | `deep-research/SKILL.md` | Notes depend on the agent remembering to write them. | Name the moments a researcher writes a note: after reading a source, when a sub-question is done, when a lead goes nowhere or changes direction. |
| 4 | Content flow | The research-to-deck skill doesn't say when to update the index and notes. | research-to-deck skill | Findings can be lost before `article.md` is written. | Update the notes and index as sources are read; in Step 0, read research files from earlier work first. |

Note-taking stays in the skills whose work produces findings (here the Deep Researcher), like a human researcher's habit of writing notes as they go. No general authoring rule or anti-pattern, and no step triggered by context compression: neither the author nor the agent can know in advance how long work runs or when the framework compresses the conversation, so such a trigger couldn't be followed (user decision, 2026-10-10).

## Planned changes

- `deep-research/SKILL.md`: §1 creates or reuses the folder; §2 writes `plan.md` with a status per sub-question; §3 and §4 become one "Search, read, and record" step that names when to write notes; later sections are renumbered.
- research-to-deck `deep-researcher/SKILL.md`: Step 0 reads research files from earlier work first; index and notes updated as sources are read.

## Open questions and approvals

- None. The user asked for the update.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Baseline read | Pass | `git show origin/main:<path>` for each file. |

## Next action

Apply the planned changes, validate, and update PR #35.
