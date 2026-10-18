# API/E2E Execution Coverage Report (mock, only the sections delivery reads for evidence)

## Round

- Evidence folder (absolute path): `<ticket>/evidence/`
- Commit that holds this report and the evidence: `7d1e0b2` (ticket branch dark-mode-toggle)

## Tested Builds And Environments

| Env ID | Commit Tested | Platform / OS | Runtime, Browser, Or App Build | Other Settings That Matter |
| --- | --- | --- | --- | --- |
| ENV-1 | 4f2a9c1 | macOS 15.5 | Node 22.23.1 | none |
| ENV-2 | 4f2a9c1 | macOS 15.5 | Chromium 141, dev server :3000 | fresh profile |

## Cases

| Case ID | Criteria | Boundary / Surface | Command Or Steps | Env | Result | Evidence Files | Look For | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-01 | AC-002 | theme store (unit) | `pnpm vitest run tests/unit/settings/theme-toggle.test.ts` | ENV-1 | Pass | `EV-01-unit-settings.log` | "persists the chosen theme across reloads", "2 passed" |  |
| E2E-01 | AC-001, AC-002 | Settings page in the browser | Settings > Appearance > switch "Dark mode" on, reload | ENV-2 | Pass | `EV-02-browser-toggle-excerpt.txt` (full log next to it), `EV-03-settings-dark.png` | `dataset.theme = "dark"` before and after `reload`; screenshot: dark page, toggle on |  |

## Acceptance-Criteria Proof

| Acceptance-Criteria ID | Critical | Proven By Case IDs | Result | User-Only Part |
| --- | --- | --- | --- | --- |
| AC-001 (switching to dark mode shows the dark theme) | Yes | E2E-01 | Proven | — |
| AC-002 (the choice survives a reload) | Yes | API-01, E2E-01 | Proven | — |
