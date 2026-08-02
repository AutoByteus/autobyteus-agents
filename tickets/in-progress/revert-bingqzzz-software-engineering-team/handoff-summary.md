# Handoff Summary: Revert BingQ/BingQzzz Software Engineering Team Changes

## Current status

The revert is complete and validated locally on `codex/revert-bingqzzz-software-engineering-team`. The protected `main` branch has not yet received this revert.

## Effective behavior removed

- The normal Software Engineering Team no longer includes the retained Product Manager/product-iteration guidance.
- The normal Delivery Engineer workflow again requires explicit user verification.
- Product Manager acceptance/callback fields are removed from the normal delivery report template.
- The retained Product Manager package under the Software Engineering Team directory is deleted.

## Preserved

- `agent-teams/software-engineering-team/team-config.json` and the normal roster.
- Unrelated later delivery-record changes.
- `agent-teams/software-product-iteration-team/` and all paths outside the requested package.

## Finalization hold

Per the workflow gate, commit/push/merge into protected `main` remains pending explicit user verification of this prepared diff.
