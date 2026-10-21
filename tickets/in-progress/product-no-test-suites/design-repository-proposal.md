# Proposal for the design repository (the user decides; not changed in Task 45)

Repository: `/Users/normy/autobyteus_org/autobyteus-web-design` (remote `autobyteus-web-prototype`), read at `288ef06` on 2026-10-21. The Product team skills no longer run test suites or check scripts. These parts of the repository exist only for that, and pull agents back into it:

| What | Size | Proposal |
| --- | --- | --- |
| `README.md` section "Final And Correction Validation" (typecheck, lint, test, ten `validate:*` commands) | 1 section | Remove; keep only how to install and start the UI reference |
| `package.json` scripts `typecheck`, `lint`, `test` | 3 scripts | Remove from the design workflow (delete, or keep for occasional manual use, the user's choice) |
| `package.json` `validate:*`, `capture:*`, `audit:*` scripts | 36 scripts | Remove |
| `prototype/scripts/` validation, probe and capture files (`validate-*.mjs`, `probe-*.mjs`, `capture-*.mjs`, `audit-*.mjs`, `check-*.mjs`) | about 50 of 61 files | Delete; keep the fixture builders (`build-runtime-fixtures.mjs`, `build-icon-collections.mjs`, `dump-source-state.mjs`) |
| `evidence/` | 481 MB | Delete or move out of the repository |
| Root documents from the early bootstrap and corrections: `comparison-report.md`, `evidence-index.md`, `parity-inventory.md`, `pp-gap-009-correction.md`, `pp-gap-010-correction.md`, `product-prototyper-baseline-review.md`, `repository-placement-correction.md`, `independent-repository-migration.md`, `independent-repository-restoration.md`, `workspace-repository-return.md`, `personal-integration-record.md` | about 140 KB, last changed August to early October | Delete or move to an `archive/` folder; git history keeps them |
| Root `ui-ux-spec.md`, `ui-reference-runbook.md`, `ui-baseline-report.md`, `mock-boundaries.md`, `prototype-scenarios.md` | about 120 KB | Keep (still read by the designer); slim later if the user wants |
| Per-ticket `final-validation.mjs` files under `tickets/done/` | 18 files | Leave as history |
| Test files (`*.spec.ts`, `*.test.ts`) | 3 files | Remove with the `test` script |
