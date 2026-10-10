# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `skill`
- Update intent: `extend`, then `simplify` after independent review
- Target package: `agents/deep-researcher/skills/deep-research/SKILL.md`, `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md`
- Scope included: the two skills above and this ticket folder.
- Scope excluded: agent definitions, configs, routes; other teams.
- Request/reference: User request to keep research progress in files, as a researcher keeps notes; revised after the independent review of PR #35 at the user's request.

## Summary

- **Deep Researcher** (`deep-research`): creates or reuses the topic folder; writes sub-questions with a status to `plan.md`; keeps notes the way a researcher does: after reading a source (findings to `evidence.md`), when a sub-question is done, and when a lead goes nowhere or changes direction (both in `plan.md`).
- **research-to-deck Deep Researcher**: updates the notes and source index as sources are read (only sources read and kept); reads the project folder's research files before continuing.

## Changes from the first version of this PR (after independent review)

- Removed anti-pattern "15. Buffering findings only in chat memory". Its incident was not observed, and the number clashed with the lean-workflow entries 15–16. Add it later with a real incident if one occurs.
- Removed the general principle from the Agent Package Creator (first in `package-design-principles.md` §2, briefly in `skill-authoring-principles.md`). Its condition ("work that spans many tool calls or sessions") can't be known in advance; note-taking belongs to the skills whose work needs it (user decision).
- `deep-research`: removed the rule stated three times (Rules line, §4 runtime description), chose `plan.md` only, replaced the "Continuous milestone persistence" label with the action, and merged search and evidence into §3 (sections renumbered 1–5). Removed the step triggered by context compression, because the agent can't know when the framework compresses the conversation (user decision).
- research-to-deck: index gets sources read and kept, not every discovered one; "flush" wording removed; Step 0 reads research files from earlier work first; no compression trigger.

## Changed paths (vs `origin/main`)

- Modified: `agents/deep-researcher/skills/deep-research/SKILL.md`, `agent-teams/research-to-deck-team/agents/deep-researcher/skills/deep-researcher/SKILL.md`
- Added: this ticket folder (`agent-package-analysis.md`, `agent-package-result.md`)
- Not changed: anything in `agents/agent-package-creator/` (all back to `origin/main`)

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

- None.

## Handoff state

- Recorded in the review report and the message to `/project_task_manager`.
