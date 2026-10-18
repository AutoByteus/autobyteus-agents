# API/E2E Execution Coverage Report (mock, only the evidence sections)

## Evidence Index

- Evidence folder (absolute path): `<ticket>/evidence/`
- Commit that holds the evidence and these reports: `7d1e0b2` (ticket branch dark-mode-toggle)

| Evidence ID | File | Case IDs | Acceptance-Criteria IDs | Command Or Step | Tested Commit And Environment | What It Proves | Look For |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EV-01 | `EV-01-unit-settings.log` | API-01 | AC-002 | `pnpm vitest run tests/unit/settings/theme-toggle.test.ts` | 4f2a9c1; macOS 15.5, Node 22 | The saved theme is restored; system theme without a saved choice | "persists the chosen theme across reloads", "2 passed" |
| EV-02 | `EV-02-browser-toggle-excerpt.txt` (full log next to it) | E2E-01 | AC-001, AC-002 | Settings > Appearance > Dark mode on, reload | 4f2a9c1; Chromium 141, dev server | The toggle switches the page to dark and it stays dark after reload | `dataset.theme = "dark"` before and after `reload` |
| EV-03 | `EV-03-settings-dark.png` | E2E-01 | AC-001 | Screenshot after the toggle | 4f2a9c1; Chromium 141 | The page renders dark with the toggle on | Dark background, toggle in the on position |

## Acceptance-Criteria Proof

| Acceptance-Criteria ID | Critical | Proven By Case IDs | Evidence IDs | Result |
| --- | --- | --- | --- | --- |
| AC-001 (switching to dark mode shows the dark theme) | Yes | E2E-01 | EV-02, EV-03 | Proven |
| AC-002 (the choice survives a reload) | Yes | API-01, E2E-01 | EV-01, EV-02 | Proven |
