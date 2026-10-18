# Reuse check: the API/E2E reuse rule applied to a real diff

- A real two-commit repository: implementation's checks ran on `8b0e050`, then a code-review fix made `d191f72`, which API/E2E validates.
- `git diff --name-only 8b0e050 d191f72` → `src/server/api.ts`

| Check | Code It Exercises | Touched By The Diff? | Evidence Judgeable? | Decision Under The Rule |
| --- | --- | --- | --- | --- |
| IMP-01 | `src/theme/` | No | Yes (commit, look-for line) | **Reuse** as case API-01, kind `Reused` ("files changed since 8b0e050 do not touch src/theme/") |
| IMP-02 | `src/server/` | Yes | Yes (commit, look-for line) | **Rerun** as case API-02 on `d191f72` |

- AC-001's browser journey was not run by implementation, so API/E2E runs it (E2E-01).
- Result: API/E2E runs two cases (API-02, E2E-01) instead of three, and repeats nothing whose code is unchanged.
- Delivery path for AC-002: proof → API-01 (`Reused`, names IMP-01) → the implementation handoff's IMP-01 row → `IMP-01-unit-theme.log` → "persists the chosen theme across reloads". It is the same path, one row further.

Limit: a mock read by the Agent Package Creator following the API/E2E and delivery text; the diff is real.
