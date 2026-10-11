# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `skill` ×2
- Update intent: `repair`
- Target package: `agents/project-task-manager/skills/project-task-management/SKILL.md`; `agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/SKILL.md`
- Scope included: the two skills and this ticket folder.
- Scope excluded: agent definitions, configs, routes, templates; the Product Team; Agent Package Creator references.
- Request/reference: Project Task `project_task_3c51140d-…` (user, 2026-10-11). Analysis: [agent-package-analysis.md](agent-package-analysis.md).

## Summary

- **PM §5:** Task descriptions at direction level: problem or goal, why, facts and evidence, constraints, done. No design options, file-level suggestions or steps unless the user decided them, and then labelled as the user's. "About 80% clear is normal."
- **PM §7 "Decisions for the user"** (refined, not replaced): choices within the Task's direction go back to the worker. Real user decisions: the worker asks the user in its own conversation, and the PM tells the user in one line who is waiting and keeps it pending on the board. The PM relays only when really needed, and then faithfully, never deciding or approving for the user.
- **PM scenario table:** the "Worker needs a user decision" row becomes "Worker sends decisions" with the new handling.
- **Solution Designer, Inputs:** a delegated Task sets a direction; decisions it marks as the user's are part of it; the designer works out the rest.
- **Solution Designer §1:** decide solution details within the direction and record the choice and rationale in `requirements-doc.md`, with the designer as the decision owner. Leave the user only scope or product-direction changes, or a real product trade-off the evidence can't settle.
- **Solution Designer §2:** ask the user directly in its own conversation, also for delegated Tasks. Present the decisions made with the requirements. Don't route approval or decisions through the delegator, whose reply can't stand in for user approval unless it carries the user's words. It may tell the delegator in one line that it is waiting.

## Preserved behavior

- Explicit user approval of the requirements basis ("Never mark requirements Approved without that evidence"); scope changes need the user (`requirements-engineering.md` lines 26, 129).
- The PM never decides or approves for the user; answers travel in the user's words.
- Team routes in `team-config.json`; Product Design request flow.

## Changed paths

- Modified: `agents/project-task-manager/skills/project-task-management/SKILL.md`, `agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/SKILL.md`
- Added: this ticket folder

## Deliberately left out

- `requirements-doc-template.md`: its `Decision Owner` column already records who decided.
- `agent.md` files: they point to the skills; no rule duplicated there.
- Product Team designer: user confirmation of visual design is a legitimate user decision and isn't routed through a delegator. Not the same problem.
- Anti-pattern entry for this incident: the creator's `package-anti-patterns.md` has uncommitted local entries 15–16 in the main checkout, so a new number would clash. Follow-up: add "Relaying a worker's detail decisions through the delegator" once 15–16 are committed or discarded.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | `quick_validate.py` → "Skill is valid!" for `project-task-management` and `solution-designer`. |
| JSON parses | Pass | PM `agent-config.json`, SE `team-config.json`, Solution Designer `agent-config.json` (unchanged). |
| Cross-file consistency | Pass | PM "send the answer back in the user's words" matches the designer's "unless it carries the user's own words". The designer's "real product trade-off" matches `requirements-engineering.md` line 129 "material product decision". The approval gate is unchanged. |
| Scope | Pass | `git diff --stat`: 2 skill files (+19 / −3) and this ticket folder. |
| Runtime | Not run | Behavior is visible once the skills are reloaded. |
