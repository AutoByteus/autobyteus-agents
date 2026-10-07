# UI Baseline Report

Create this report for every current-experience bootstrap, correction, or
refresh. It substantiates UI parity (see "What UI parity means" in the shared
principles) between the pinned source and the independently runnable baseline,
and records deliberate implementation simplifications and the mock data
boundary. It does not prove production integration or replace
`requirements-doc.md` or `ui-ux-spec.md`.

## Status

- Status: `Completed` / `Blocked`
- Request type: `Current-Experience Bootstrap` / `Correction` / `Refresh`
- Correction evidence/specific gap, or explicit refresh instruction (when applicable):
- Next expected action:

## Source Identity

- Source project:
- Selected frontend application or product surface:
- Source root:
- Governing branch or revision authority:
- Pinned source commit or revision:
- Applicable repository instructions:
- Source observation command and URL, or other authoritative evidence:

## Baseline & Repository Identity

- Design repository/root (separate Git repository):
- Product ticket:
- Product ticket branch:
- Product-owned target worktree:
- Accepted design base revision:
- Bootstrap candidate revision or commit, when available:
- Install command:
- Start command:
- Review URL:
- Framework, language, and styling system:
- Scenario-selection and reset method:

## Experience Boundary

- Included UI boundary:
- Distinct navigation destinations and surfaces:
- Distinct interaction and feedback patterns:
- Meaningful visible-state patterns:
- Materially different roles, features, locales, host contexts, or viewports:
- Visibly equivalent contexts represented by shared scenarios:
- Excluded product surfaces and rationale:

## UI Experience Inventory

Group equivalent contexts rather than creating a Cartesian matrix. Each row
should identify a distinct user-facing surface or behavior, not an internal API
operation. `Pass` requires applicable source evidence, baseline evidence, and
no known UI parity difference. In the fixture column, name the
synthetic fixture and list any illustrative domain values (content-derived
titles, texts, or counts that intentionally differ from the source).

For corrections/refreshes, identify newly checked items and link still-applicable
accepted evidence for unaffected items. Do not present inherited evidence as a
fresh check or infer current UI mismatch from the report's older pin alone.

| ID | Route / Surface | Exact Visual And UI-Controlled Content Obligations | States / Operations / Outcomes | Material Contexts | Baseline Scenario / Synthetic Fixture | Source Evidence | Baseline Evidence | Fidelity Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UXB-001 |  |  |  |  |  |  |  | `Pass` / `Fail` / `Unknown` |

## Journey Inventory

| Journey ID | Starting Scenario | Source Steps And Visible Outcomes | Baseline Steps And Visible Outcomes | Alternate / Recovery Path | Evidence | Result |
| --- | --- | --- | --- | --- | --- | --- |
| UXJ-001 |  |  |  |  |  | `Pass` / `Fail` / `Unknown` |

## Exact Visual Fidelity Comparison

Validate each distinct rendered surface and state under matched conditions.
Raw screenshot bytes may differ only because of normalized rendering noise; a
known UI parity difference is a failure.

| Visual ID | Surface / State / Context | Matched Browser / Viewport / Font / Asset / Theme / Locale / Scenario / Synthetic Fixture | Source Screenshot | Baseline Screenshot | DOM / Geometry / Style / Perceptual Method | Remaining Difference | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UXV-001 |  |  |  |  |  | `None` / details | `Pass` / `Fail` / `Unknown` |

## Implementation Simplifications

Record how the baseline preserves visible experience without reproducing
production mechanisms.

| Production Capability Visible In The UI | Visible Experience Preserved | Baseline Simulation | Production Mechanism Intentionally Absent |
| --- | --- | --- | --- |
|  |  |  |  |

- Presentation code, styles, tokens, or assets reused:
- UI code recreated:
- Baseline-specific state model:
- Synthetic-state provenance and method (hand-authored, generated, serialized,
  or captured from controlled synthetic scenarios; input/scenario evidence):
- Provenance inspection scope, findings and limits (including statically imported
  content; unknown/mixed sources are not certified from a sample):
- Fixture size/repetition and maintainability notes, when useful (signals for
  inspection, not proof of copying or a fixed acceptance threshold):
- Scripted asynchronous behavior:
- Browser simulation of mobile, desktop-host, Electron, role, permission, or
  feature contexts:
- Why any retained production store, client, protocol, or runtime is simpler
  than replacing it, or `None`:

## Validation

- Browser and version:
- Validated viewports:
- Source-observation method:
- Baseline commands and results:
- Build, typecheck, lint, unit, or browser checks run in proportion to the
  baseline:
- Complete navigation and journey checks:
- DOM, computed-style, geometry, screenshot, perceptual, or manual evidence
  paths:
- Scenario reset and isolation result:
- Known validation limitations:

## Completion Check

- Selected source boundary and pinned revision are explicit: `Yes` / `No`
- Baseline starts independently at the documented URL: `Yes` / `No`
- Every distinct selected navigation destination and surface has exact source
  and baseline evidence: `Yes` / `No`
- Every distinct interaction, feedback, and meaningful state pattern is
  demonstrated at least once: `Yes` / `No`
- Every context that materially changes the UI is represented: `Yes` / `No`
- Every distinct supported journey and relevant recovery path is runnable with
  matching visible outcomes: `Yes` / `No`
- Desktop and narrow-mobile behavior are validated when applicable: `Yes` /
  `No` / `N/A`
- Interface structure and interactions are real rather than screenshot or
  hotspot substitutes: `Yes` / `No`
- Production capabilities are simulated locally and deterministically: `Yes` /
  `No`
- Production credentials, customer data, live dependencies, and production
  writes are absent: `Yes` / `No`
- UI parity differences remaining: `None` /
  details
- Unsubstantiated distinct UI inventory items remaining: `None` / details
- Mock data boundary meets "Synthetic-state provenance and proportionality"
  in the shared principles,
  with supporting evidence above and no real source/customer content:
  `Yes` / `No` / `Unknown`
- UI parity achieved for every item in the recorded distinct inventory:
  `Yes` / `No`

`Completed` means every distinct recorded UI/UX inventory item has passing
source-versus-baseline evidence and no known UI parity difference
remains. It does not mean production stores, protocols, native
runtimes, integrations, or architecture were reproduced or validated.

## Refresh Reconciliation (Refresh Only)

- Previous and new source pins:
- Surfaces added, changed, or removed by the source diff:
- Accepted design changes superseded by the source version:
- Accepted design-only changes preserved, or removed because the request asked to match the source:
- Unchanged surfaces given a load-and-look pass:

## Known Gaps And Next Action

- Blocked or incomplete UI inventory IDs:
- User-facing differences or omissions:
- Illustrative fixture content or production mechanisms intentionally
  simplified without changing presentation:
- Source reachability or evidence limitations:
- Required correction:
- Optional fixture cleanup (not a parity or provenance failure by itself):
- Recommended next action for `product_ui_ux_designer`:
