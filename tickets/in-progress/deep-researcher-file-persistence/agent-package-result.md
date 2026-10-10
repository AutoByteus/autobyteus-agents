# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `skill`
- Update intent: `extend`, then `simplify` after independent review
- Target package: `agents/deep-researcher/skills/deep-research/SKILL.md`, `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md`, `agents/agent-package-creator/skills/agent-package-creation/references/skill-authoring-principles.md`
- Scope included: the three files above and this ticket folder.
- Scope excluded: agent definitions, configs, routes; other teams.
- Request/reference: User request to keep research progress in files so it survives conversation summarization; revised after the independent review of PR #35 at the user's request.

## Summary

- **Deep Researcher** (`deep-research`): creates or reuses the topic folder; writes sub-questions with a status to `plan.md`; writes each finding to `evidence.md` as soon as its source is read; when earlier findings no longer appear in the conversation, reads `plan.md` and `evidence.md` before searching again.
- **research-to-deck Deep Researcher**: updates the notes and source index as sources are read (only sources read and kept); reads the project folder's research files before continuing.
- **Authoring principle**: one paragraph in `skill-authoring-principles.md` "Write the operating contract": long-running skills keep a working record in one reused task folder, add entries instead of overwriting, and read it before continuing.

## Changes from the first version of this PR (after independent review)

- Removed anti-pattern "15. Buffering findings only in chat memory". Its incident was not observed, and the number clashed with the lean-workflow entries 15–16. Add it later with a real incident if one occurs.
- Moved the principle from a sub-heading of `package-design-principles.md` §2 (role contracts) to `skill-authoring-principles.md`, cut to one paragraph, and removed project-specific paths and the per-test rule.
- `deep-research`: removed the rule stated three times (Rules line, §4 runtime description), chose `plan.md` only, replaced the "Continuous milestone persistence" label with the action, and folded the recovery step into §3 (sections renumbered 1–5).
- research-to-deck: index gets sources read and kept, not every discovered one; "flush" wording removed; recovery sentence moved to Step 0.

## Changed paths (vs `origin/main`)

- Modified: `agents/deep-researcher/skills/deep-research/SKILL.md`, `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md`, `agents/agent-package-creator/skills/agent-package-creation/references/skill-authoring-principles.md`
- Added: this ticket folder (`agent-package-analysis.md`, `agent-package-result.md`)
- Not changed any more: `package-design-principles.md`, `package-anti-patterns.md` (back to `origin/main`)

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | `python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py` → "Skill is valid!" for `deep-research`, research-to-deck `deep-researcher`, `agent-package-creation`. |
| Links | Pass | `templates/research-brief-template.md` exists; no reference left to the removed anchor `#continuous-file-backed-persistence-for-long-horizon-work` or to the removed anti-pattern. |
| Section references | Pass | No file refers to `deep-research` section numbers, so the renumbering breaks nothing. |
| JSON / routes | N/A | No config, member or route changed. |
| Merge with `origin/main` | Pass | Branch based on `636e0df`; the anti-pattern file is no longer touched, so no clash with the lean-workflow entries 15–16. |
| Repo sweep | Pass | Other research skills (`research-engineer`, `event-scouting`, `marketing-content-creation`) already record as they go or delegate research; no change needed. |

## Risks, questions, and blockers

- Runtime compaction was checked for the AutoByteus native runtime only, not for Codex or Claude runtimes. The recovery sentence relies on what the agent sees in the conversation, not on any runtime signal.

## Handoff state

- Recorded in the review report and the message to `/project_task_manager`.
