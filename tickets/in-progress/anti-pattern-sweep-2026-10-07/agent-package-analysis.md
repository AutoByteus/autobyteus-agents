# Agent Package Analysis

- Status: `Completed`
- Operation: `analyze` (repository sweep with the detection checks of `package-anti-patterns.md`)
- Package type: repository-wide (Teams, Agents, Orgs in `autobyteus-agents`)
- Target: `/Users/normy/autobyteus_org/autobyteus-agents` at `77a518e` (`origin/main`, after PR #31)
- Scope included: tracked packages; the server's built-in agents in `autobyteus-workspace-superrepo` (`origin/personal`) for identity collisions.
- Scope excluded: changes to any file; untracked work in progress (`agent-teams/english-bridge-team/`).
- Request/reference: User, 2026-10-07: use the new principles to update the other packages.

## Results by anti-pattern

| # | Anti-pattern | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Forbidding user-directed collaboration | Clean | Remaining `delegate_task` hits are the scoped "do not bypass a configured route" rule, the creator's own docs, and an archived `.codex/artifacts` audit. |
| 2 | An outcome only a parent can route | Handled | Product UI/UX Designer's exploratory visualizer sends to the Solution Designer "when that route exists" and otherwise returns to the user. |
| 3 | A member describing another team's internals | Found | `product-team/.../exploratory-requirements-visualizer/SKILL.md` names the Solution Designer about 10 times and describes its ownership ("owns the question and clarification loop", task workspace, ticket lifecycle); `product-experience-design/SKILL.md` line 201 once. |
| 5 | Colliding with an existing identity | Found | `agents/daily-assistant` ("Daily Assistant") duplicates the server's built-in `daily-assistant` ("Daily Assistant"), the same situation as the Project Task Manager. |
| 6 | Project specifics in a reusable skill | Clean | No repository paths or product names in skills. |
| — | New: hard-coding recipients in a skill | Found | STORM Team skills name their next member, for example `cited-article-writer/SKILL.md`: "Handoff to `article_polisher_verifier`", "Send `article_polisher_verifier` all upstream artifacts"; all six STORM skills contain member names. Principle §3 keeps recipients in the team config; no anti-pattern entry covered it, so the sweep only caught it by chance. |

Not mechanically checkable in a sweep: 4 (copied rules), 7 (over-structuring), 8 (default runtime behavior), 9 (external assumptions), 10–11 (creator process).

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| F1 | Structure and ownership | Anti-pattern 5: two "Daily Assistant" agents. | User decision; server repo or `agents/daily-assistant` | The user may see the wrong one, as with the Project Task Manager. | Same choice as before: remove the built-in (Software Engineering Team request) or rename or remove this repository's copy. |
| F2 | Structure and ownership | Anti-pattern 3 in the Product visualizer skill. | Product Team skill | Product depends on the Software Engineering Team's internal roles; behavior is safe (it falls back to the user) but the coupling remains. | Replace "Solution Designer" with "the requirements owner, when one exists" and drop descriptions of its workspace and lifecycle. The Product Team was changed by others today (branch `product-team/designer-core-design-rules`); coordinate before editing. |
| F3 | Structure and ownership (gap in the anti-patterns) | Hard-coded recipients in all six STORM skills. | Creator `package-anti-patterns.md`; STORM skills | Renaming a member or adding a route requires editing skills; recipients compete with `team-config.json`. | Add anti-pattern 12 "Hard-coding recipients in a skill" with a detection check; then change the STORM skills to "hand off" and leave recipients to the team config. |

## Recommended changes

Not applied; they need an `update` request.

1. Creator: add anti-pattern 12 (F3).
2. STORM Team: remove member names used as recipients from the six skills (F3).
3. Product Team: generalize the Solution Designer references (F2), after checking for concurrent Product work.
4. Daily Assistant: user decides (F1).

## Open questions and approvals

1. F1 resolved (user, 2026-10-07): the built-in Daily Assistant belongs to the product; this repository's `agents/daily-assistant/` copy (2 files, no live references) is removed. Only archived `.codex/artifacts` records mention it.
2. F2 and F3: approved (user, 2026-10-07: "go ahead"); applied, see `agent-package-result.md`.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Sweep base | Current | `origin/main` `77a518e`, fetched before the sweep. |
| Detection checks 1, 2, 3, 5, 6 | Run | `git grep` and config scripts over tracked files. |
| Server built-ins | Read | `origin/personal`: `daily-assistant`, `project-task-manager`, `retrospective-skill-improver`. |

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: None
- Caller return: Yes; no rule matched.
