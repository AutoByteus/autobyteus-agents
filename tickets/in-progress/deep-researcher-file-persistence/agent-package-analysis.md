# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `skill` (standalone `deep-research`, research-to-deck team-local `deep-researcher`), plus one Agent Package Creator authoring principle
- Target package: `agents/deep-researcher/skills/deep-research/SKILL.md`, `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md`, `agents/agent-package-creator/skills/agent-package-creation/references/skill-authoring-principles.md`
- Scope included: the three files above; the Research Engineer skill and the AutoByteus native compaction code (`autobyteus-ts/src/memory/compaction/`) as references.
- Scope excluded: agent definitions, tools, configs, routes; other teams.
- Request/reference: User request: keep research progress in the topic folder so it survives conversation summarization and resumption. Revised 2026-10-10 after the independent review of PR #35, at the user's request ("Since you said it's partly correct … Update the PR").

## Baseline (`origin/main` `636e0df`)

| File | Current responsibility |
| --- | --- |
| `deep-research/SKILL.md` | §1 looks for earlier notes in `<workspace>/research/<topic-slug>/` and reuses them. §4 writes `evidence.md` "as you go". No file holds the sub-questions and their status. No instruction for when earlier findings drop out of the conversation. |
| research-to-deck `deep-researcher/SKILL.md` | Keeps `research-resource-index.md`, `research_notes.md` and `claim_evidence_ledger.md` in the project folder. Doesn't say to update them while reading, or to read them before continuing. |
| `skill-authoring-principles.md` | "Write the operating contract" covers outputs and recovery, but not where a long-running skill keeps its working record. |

## Preserved behavior

- The topic folder, reused for the same topic. Primary sources first, secondary sources labeled.
- `task-request.md` handoff for sign-in or browser-heavy pages.
- Evidence types `fact` / `self-claim` / `opinion`, each with source and date. "Never record a finding without its source."
- Brief template, Deliver step, and handoff via `agent.md`.
- research-to-deck artifacts, the handoff to `infographic_powerpoint_designer`, and downstream-fix routing.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Content flow | `deep-research/SKILL.md` §2 lists sub-questions only in the conversation. | `deep-research/SKILL.md` | After the conversation is summarized, the agent can lose track of which sub-questions are still open and repeat searches. | Write sub-questions and their status to `plan.md`, and update the status when a sub-question is done. |
| 2 | Content flow | §3 (search) and §4 (evidence) are separate steps, although §4 already says "as you go". | `deep-research/SKILL.md` | Readers can take the step order to mean "read first, record later". | Merge them: write each finding to `evidence.md` as soon as its source is read. |
| 3 | Recovery | No step for when earlier findings no longer appear in the conversation. The AutoByteus compaction summary keeps paths and decisions (`compaction-summary-prompt.ts`), but not every evidence row. | `deep-research/SKILL.md`, research-to-deck skill | Detail lost to summarization gets guessed or re-searched. | One trigger sentence: read the folder's files before searching again. |
| 4 | Content flow | The research-to-deck skill doesn't say when to update the index and notes. | research-to-deck skill | Same loss risk before `article.md` is written. | Update the notes and index as sources are read; add the recovery sentence to Step 0. |
| 5 | Authoring guidance | No authoring rule for a skill's working record over long work. The Research Engineer already follows the practice (durable project folder; loop log before the first trial). | `skill-authoring-principles.md` | New long-running skills may keep progress only in the conversation, or overwrite earlier results. | One paragraph under "Write the operating contract". |

No anti-pattern entry: no observed incident was recorded, and the catalog holds only observed mistakes. If one is observed, add it then.

## Planned changes

- `deep-research/SKILL.md`: §1 creates or reuses the folder; §2 writes `plan.md` with a status per sub-question; §3 and §4 become one "Search, read, and record" step with the recovery sentence; later sections are renumbered.
- research-to-deck `deep-researcher/SKILL.md`: recovery sentence in Step 0; index and notes updated as sources are read.
- `skill-authoring-principles.md`: one paragraph on the working record.

## Open questions and approvals

- None. The user asked for the update.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Baseline read | Pass | `git show origin/main:<path>` for each file. |
| Runtime compaction behavior | Observed | AutoByteus native runtime only: `compaction-summary-prompt.ts`, `accepted-compaction-builder.ts`. Codex/Claude runtimes not inspected. |

## Next action

Apply the planned changes, validate, and update PR #35.
