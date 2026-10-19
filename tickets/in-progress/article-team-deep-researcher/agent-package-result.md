# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team` (Article Writing Team) plus the shared `deep-researcher` agent's skill
- Update intent: `simplify`: one owner for general research
- Request/reference: Task `autobyteus-agents-29`; analysis `agent-package-analysis.md`

## Summary

The Article Writing Team now includes the shared Deep Researcher as a member, the way the Marketing Team does. It is a standing member, with rules both ways. The writer's own `article-researcher` skill is removed:

- **Article-specific understanding** moves to `article-writing/references/understanding.md`: supplied material, workspace code, the user's firsthand sequence, the ledger with allowed and forbidden framings, and the Ready-to-outline check.
- **Outside research** is requested from the Deep Researcher with `research-request.md`: question, depth, scope, claims to check, quotes needed. The writer waits for the brief before drafting the claims it covers.
- **The Deep Researcher** gains two generally useful rules: negative-capability claims, and like-for-like comparison dimensions. At the user's request it also keeps one research index (`research/index.md`) that it reads first, keeps its research in its own folder, and reads its notes first whenever it picks a topic back up.

## Changed paths

- `agent-teams/article-writing-team/team-config.json`: adds member `deep_researcher` (`refScope: shared`) and rules writer → researcher and researcher → writer.
- `team.md`, `shared/article-package.md`: roles, cooperation and artifacts.
- Writer:
  - `agent.md` and `agent-config.json`: `article-researcher` removed;
  - `article-writing/SKILL.md`: Step 2, the short path, Steps 4 and 8;
  - `references/understanding.md` (new);
  - `references/style-workflow.md`.
- Reviewer: `article-reviewer/SKILL.md` (inputs, Step 3 for briefs) and `templates/review-report-template.md`.
- Removed: `agents/article-writer/skills/article-researcher/SKILL.md` (every section mapped in the analysis).
- `agents/deep-researcher/skills/deep-research/SKILL.md`: the research index, its own folder, notes read first, negative-capability claims, comparison dimensions.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | `article-writing`, `article-reviewer`, `deep-research` valid |
| Team config and links | Pass | Coordinator is a member; 4 rules between real members; 0 broken links; no reference to `article-researcher`, `research-handoff` or `research-open-questions` left |
| Nothing lost | Pass | Section map in the analysis; all 12 old readiness checks are in "Ready to outline" |
| Live run 1 (isolated app, Claude Haiku) | Found a gap | The flow ran writer → Deep Researcher → brief → reviewer, but the writer drafted before the brief came back, and the reviewer returned Evidence Gap (`ATW-01`, `ATW-05`). Fixed: wait for the brief. |
| Live run 2 after the fix | Pass | Request → brief → draft → Draft Revision → revision → **Pass** (`ATW-02`, `ATW-04`, final article `ATW-06`). The researcher created `research/index.md` with the topic's row (`ATW-03`). |
| Final review | Pass | Round 1: the live-run gap (wait for the brief) and the brief location. Round 2: no findings. |

## Question for the user

The Research-to-Deck Team's `deep_researcher` is that team's coordinator and entry point and writes a deck-specific reasoning artifact; it is not a plain copy. Switching it to the shared Deep Researcher means choosing a new entry point and moving the deck-specific step. It is unchanged here.
