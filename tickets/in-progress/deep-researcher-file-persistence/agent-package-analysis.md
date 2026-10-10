# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `skill`
- Target package: `agents/deep-researcher/skills/deep-research/SKILL.md` and `agents/agent-package-creator/skills/agent-package-creation/references/package-design-principles.md`
- Scope included:
  - `agents/deep-researcher/skills/deep-research/SKILL.md`
  - `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md`
  - `agents/agent-package-creator/skills/agent-package-creation/references/package-design-principles.md`
  - `agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md`
- Scope excluded:
  - Unrelated agent definitions, tools, and configs in other teams
  - Marketing team implementation (reviewed as an architectural reference only)
- Request/reference: User request on deep researcher task folder isolation, continuous milestone file persistence, and resilience against runtime context compression.

## Baseline

| File | Current responsibility |
| --- | --- |
| `agents/deep-researcher/skills/deep-research/SKILL.md` | Defines standalone deep research workflow: search/read sources, write `evidence.md` and `research-brief-<YYYY-MM-DD>.md` under `research/<topic-slug>/`. |
| `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md` | Defines team research stage: outputs `research-resource-index.md`, `research_notes.md`, `claim_evidence_ledger.md`, and `article.md` in the project folder. |
| `agents/agent-package-creator/skills/agent-package-creation/references/package-design-principles.md` | Package boundaries, role contracts, file ownership, and authoring quality standards. |
| `agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md` | Catalog of observed design and authoring mistakes and how to detect them. |

## Preserved behavior

- Dedicated topic folder `research/<topic-slug>/` remains the research location, reused when continuing or refreshing prior research on the same topic.
- Source hierarchy (primary sources first, secondary sources labeled for user experience context).
- Browser / computer-use delegation via `task-request.md` for sources requiring login, trials, or complex interactions.
- Evidence classification into `fact`, `self-claim`, and `opinion` with source URL and date recorded for every finding.
- Final research brief format using `research-brief-template.md` and handoff routing via `get_handoff_rules`.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Content flow & robustness | `agents/deep-researcher/skills/deep-research/SKILL.md:27-35` separates Step 3 ("Search and read") from Step 4 ("Keep an evidence record"). | `agents/deep-researcher/skills/deep-research/SKILL.md` | During long-running research, an agent reads many pages in Step 3 before writing in Step 4. Context compression causes intermediate findings, source URLs, and metrics to be lost or degraded. | Update Step 3 & 4 to mandate continuous milestone persistence: append to `evidence.md` and update sub-question status immediately after reading each source. |
| 2 | Robustness & grounding | `agents/deep-researcher/skills/deep-research/SKILL.md` lacks explicit compression recovery instructions. | `agents/deep-researcher/skills/deep-research/SKILL.md` | When context is compressed or a session resumes, the agent may duplicate searches or guess details instead of re-reading local files. | Add explicit context-compression recovery rule: disk files are authoritative ground truth; re-read them to restore context. |
| 3 | General architecture principles | `agents/agent-package-creator/skills/agent-package-creation/references/package-design-principles.md:28` forbids undocumented chat memory in handoffs, but does not state the in-flight milestone persistence rule for long-horizon agent tasks. | `package-design-principles.md` | Other long-running skills (analysis, multi-step debugging, research) risk holding state only in context memory until the final handoff. | Add a general principle for continuous file-backed persistence and context compression resilience across all long-horizon tasks. |
| 4 | Anti-pattern catalog | `agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md` lacks an entry for accumulating findings in chat memory during multi-step work. | `package-anti-patterns.md` | Authors may continue writing skills that batch all file writes to the final step. | Add Anti-Pattern 15: Accumulating findings only in chat memory during long-horizon tasks. |
| 5 | Team skill alignment | `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md:46-54` notes not to rely on chat memory for downstream work, but does not explicitly require in-flight milestone updates. | `agent-teams/.../SKILL.md` | Secondary deep research skill could also suffer from context loss before `article.md` is generated. | Update Step 1 and Step 2 in `research-to-deck-team` deep-researcher skill to mandate continuous milestone writing. |

## Recommended or planned changes

- `agents/deep-researcher/skills/deep-research/SKILL.md`:
  - Clarify Step 1 & 2 on initializing the topic folder `<workspace>/research/<topic-slug>/` and sub-questions.
  - Integrate Step 3 & 4 to enforce continuous milestone writing: append to `evidence.md` immediately upon reading each source; track sub-question resolution.
  - Add explicit compression-recovery rule: disk files are the ground truth; re-read local files upon resumption or after context compression.
- `agents/agent-package-creator/skills/agent-package-creation/references/package-design-principles.md`:
  - Add subsection in Section 2 / Section 4 establishing continuous file-backed persistence for long-horizon tasks to survive runtime context compression.
- `agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md`:
  - Add Anti-Pattern 15: Accumulating findings only in chat memory during long-horizon tasks.
- `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md`:
  - Emphasize continuous in-flight persistence of `research-resource-index.md` and `research_notes.md` as sources are examined.

## Open questions and approvals

- None. The user explicitly requested an update and a merge request / PR for review.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Target files exist | Pass | Verified via `view_file` |
| Git status clean on feature branch | Pass | Clean branch `deep-researcher/file-persistence-compression-resilience` created from `origin/main` |

## Next action

Apply planned changes to canonical files, validate changes, generate result artifact, and create PR.
