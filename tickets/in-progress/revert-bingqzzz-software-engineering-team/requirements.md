# Requirements: Revert BingQ/BingQzzz Changes from the Software Engineering Team

Status: Refined

## User intent

Remove the effective BingQ/BingQzzz product-manager/product-iteration changes from the current `main` branch under `agent-teams/software-engineering-team/`, because the Product Manager is still in testing and should not alter the normal Software Engineering Team package.

## Scope

- In scope: only `agent-teams/software-engineering-team/**`.
- Remove the retained Product Manager agent package, PM-specific delivery guidance/templates, and PM/product-loop additions to `team.md`.
- Preserve the existing normal Software Engineering Team roster and unrelated changes by other authors.
- Do not modify `agent-teams/software-product-iteration-team/`, `.codex/artifacts/`, `README.md`, or unrelated paths.

## Acceptance criteria

1. No BingQ/BingQzzz-created Product Manager package remains under the Software Engineering Team directory.
2. The Software Engineering Team `team.md` and delivery guidance no longer contain the retained product-loop/PM additions from that workstream.
3. `team-config.json` remains the current normal roster and does not re-add `product_manager`.
4. The final diff is limited to the requested subtree and preserves unrelated later changes where practical.
5. Git checks confirm the effective changes were removed and configuration remains valid.

## Investigation coverage

- All 10 directly touched subtree files enumerated in `investigation-notes.md`.
- Net current-state comparison performed against `b188268^`.
- `team-config.json` verified to have no net difference and will not be changed.
- Revert scope excludes the separate Product Iteration Team and unrelated authors' paths.
