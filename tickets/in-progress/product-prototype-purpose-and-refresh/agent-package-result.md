# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team`
- Update intent: `extend` — bring the user's stashed prototype draft into the Product Team package, rewritten for the current structure
- Target package: `product-team`, `agent-teams/product-team/`
- Scope included: shared principles, prototype-bootstrapper skill and report template
- Scope excluded: other members, routes, `team.md`
- Request/reference: user's local draft saved as `stash@{0}` before PR #20; user asked to apply whatever is still needed, following the package principles

## Summary

None of the draft had reached `main` through #20 or #21. Applying the stash directly would conflict with both and duplicate text across the shared principles and the bootstrapper, so each part was rewritten into one home:

- **Why the prototype exists** (shared section 1): the prototype is where Product designs new features before engineering builds them; call it the "product prototype", never a "UI project"; a baseline matters as an accurate, navigable copy, and comparison evidence is never the goal.
- **Proportionate checking** (shared section 4, beside the existing "not a Cartesian product" rule): every distinct item in the primary configuration; other viewports, locales, and contexts by representative sample plus material change. The bootstrapper's viewport rule points to it.
- **Throwaway comparison harness** (shared section 6).
- **Refresh policy** (shared section 2): when engineering has shipped its own version of a surface the prototype had changed, the source version wins; a prototype-only change is preserved unless the request asks to match the source. This replaces "preserve accepted prototype changes".
- **Refresh procedure** (bootstrapper): work from the source diff and verify in proportion to it; the report template gains a "Refresh Reconciliation" section.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | `Pass` | all four Product Team skills valid |
| Single home | `Pass` | refresh policy, harness, naming rule only in shared principles |
| Conflicts | `Pass` | no remaining "preserve accepted prototype changes" |
| Draft coverage | `Pass` | every draft part present on this branch |
| Scope/diff | `Pass` | 3 package files; the user's unrelated uncommitted files excluded |

## Risks, questions, and blockers

- The refresh rule changes behavior (source wins over accepted prototype changes engineering has shipped); it comes from the user's own draft.
- After merge, `stash@{0}` can be dropped.

## Handoff state

- `get_handoff_rules` called: `Unavailable`; returned to the user with the merge request
