# Investigation Notes: Revert Scope

## Baseline and current tip

- Current source: `origin/main` at `d1e3343652e3bd7a9fbced09d8f53154d6980a95`.
- Workstream baseline: `b188268^` (`0302690`), immediately before the probable BingQ/BingQzzz changes.
- Last matching workstream commit: `e821463`.
- No commits after `e821463` modify `agent-teams/software-engineering-team/**`.

## Directly touched files

Git history identifies these 10 files under the requested subtree as directly touched by the workstream:

1. `team-config.json`
2. `team.md`
3. `agents/delivery-engineer/skills/delivery-engineer/SKILL.md`
4. `agents/delivery-engineer/skills/delivery-engineer/templates/release-deployment-report-template.md`
5. `agents/product-manager/agent-config.json`
6. `agents/product-manager/agent.md`
7. `agents/product-manager/skills/product-manager/SKILL.md`
8. `agents/product-manager/skills/product-manager/templates/product-acceptance-finding-template.md`
9. `agents/product-manager/skills/product-manager/templates/product-feature-brief-template.md`
10. `agents/product-manager/skills/product-manager/templates/product-iteration-plan-template.md`

## Effective-state classification

- `team-config.json`: no net difference from `b188268^`; the `product_manager` roster entry was added by `b188268` and removed by `e821463`.
- The other 9 files have surviving net differences at `origin/main`.
- The PM package is new and remains present under the normal Software Engineering Team directory.
- Delivery Engineer and release-template files retain product-mode PM acceptance, callback, goal-completion, and next-iteration fields.
- `team.md` retains product-loop coordination and PM acceptance guidance.

## Revert strategy

Restore the requested subtree's effective pre-work behavior without reverting unrelated later changes:

- delete the six new PM package files;
- remove PM/product-loop additions from `team.md`;
- restore the BingQ/BingQzzz PM-specific portions of Delivery Engineer guidance and the release template to their pre-work behavior, preserving unrelated later edits by other authors in the release template;
- leave `team-config.json` at its current state, which already matches the pre-work state;
- do not touch `agent-teams/software-product-iteration-team/`, `.codex/artifacts/`, `README.md`, or unrelated paths.
