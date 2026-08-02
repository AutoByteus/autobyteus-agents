# Small-Scope Revert Design and Execution Plan

## Design basis

Restore the effective pre-work behavior of the normal Software Engineering Team package while preserving unrelated changes:

1. Delete the six new files under `agents/product-manager/`.
2. Remove only the PM/product-iteration additions from `team.md`, restoring its pre-work normal-team guidance.
3. Restore the PM-specific portions of Delivery Engineer `SKILL.md` to its pre-work version.
4. Remove PM-specific verification/callback/product-goal fields from the release/deployment template while preserving unrelated later edits by other authors.
5. Do not edit `team-config.json`; it is already identical to the pre-work blob.

## Planned validation

- `git diff --name-only` is confined to the requested subtree.
- No `product_manager` references remain in the normal team package except where unrelated historical content is out of scope; current normal team roster remains unchanged.
- `jq empty` passes for remaining JSON configs.
- Git diff comparisons confirm the six new PM files are deleted and PM-specific effective changes are removed.

## Execution result

Implemented on branch `codex/revert-bingqzzz-software-engineering-team` from refreshed `origin/main`:

- Deleted the six retained Product Manager package files under `agents/product-manager/`.
- Restored `team.md` to the pre-work normal Software Engineering Team guidance.
- Restored Delivery Engineer `SKILL.md` to the pre-work user-verification workflow.
- Removed Product Manager acceptance/callback fields from the release/deployment report template while preserving unrelated later delivery-record fields.
- Left `team-config.json` unchanged because its current blob already matches the pre-work state.

No source change was made outside the requested Software Engineering Team package. The separate Product Iteration Team remains untouched.
