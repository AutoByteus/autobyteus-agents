# Prototype Bootstrap Report

Create this report for every current-experience bootstrap, correction, or
refresh. It substantiates 100% observable UI/UX parity between the pinned source
and independently runnable baseline while recording deliberate implementation
simplifications. It does not prove production integration or replace
`requirements-doc.md` or `ui-ux-spec.md`.

## Status

- Status: `Completed` / `Blocked`
- Request type: `Current-Experience Bootstrap` / `Correction` / `Refresh`
- Next expected action:

## Source Identity

- Source project:
- Selected frontend application or product surface:
- Source root:
- Governing branch or revision authority:
- Pinned source commit or revision:
- Applicable repository instructions:
- Source observation command and URL, or other authoritative evidence:

## Prototype Identity

- Prototype repository/root (separate Git repository):
- Product ticket:
- Product ticket branch:
- Product-owned target worktree:
- Accepted prototype base revision:
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
operation. `Pass` requires applicable source evidence, prototype evidence, and
no known perceptible or behavioral difference.

| ID | Route / Surface | Exact Visual And UI-Controlled Content Obligations | States / Operations / Outcomes | Material Contexts | Prototype Scenario / Synthetic Fixture | Source Evidence | Prototype Evidence | Fidelity Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UXB-001 |  |  |  |  |  |  |  | `Pass` / `Fail` / `Unknown` |

## Journey Inventory

| Journey ID | Starting Scenario | Source Steps And Visible Outcomes | Prototype Steps And Visible Outcomes | Alternate / Recovery Path | Evidence | Result |
| --- | --- | --- | --- | --- | --- | --- |
| UXJ-001 |  |  |  |  |  | `Pass` / `Fail` / `Unknown` |

## Exact Visual Fidelity Comparison

Validate each distinct rendered surface and state under matched conditions.
Raw screenshot bytes may differ only because of normalized rendering noise; a
known perceptible difference is a failure.

| Visual ID | Surface / State / Context | Matched Browser / Viewport / Font / Asset / Theme / Locale / Scenario / Synthetic Fixture | Source Screenshot | Prototype Screenshot | DOM / Geometry / Style / Perceptual Method | Remaining Difference | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UXV-001 |  |  |  |  |  | `None` / details | `Pass` / `Fail` / `Unknown` |

## Implementation Simplifications

Record how the prototype preserves visible experience without reproducing
production mechanisms.

| Production Capability Visible In The UI | Visible Experience Preserved | Prototype Simulation | Production Mechanism Intentionally Absent |
| --- | --- | --- | --- |
|  |  |  |  |

- Presentation code, styles, tokens, or assets reused:
- UI code recreated:
- Prototype-specific state model:
- Hard-coded or fixture-backed synthetic data:
- Scripted asynchronous behavior:
- Browser simulation of mobile, desktop-host, Electron, role, permission, or
  feature contexts:
- Why any retained production store, client, protocol, or runtime is simpler
  than replacing it, or `None`:

## Validation

- Browser and version:
- Validated viewports:
- Source-observation method:
- Prototype commands and results:
- Build, typecheck, lint, unit, or browser checks run in proportion to the
  prototype:
- Complete navigation and journey checks:
- DOM, computed-style, geometry, screenshot, perceptual, or manual evidence
  paths:
- Scenario reset and isolation result:
- Known validation limitations:

## Completion Check

- Selected source boundary and pinned revision are explicit: `Yes` / `No`
- Prototype starts independently at the documented URL: `Yes` / `No`
- Every distinct selected navigation destination and surface has exact source
  and prototype evidence: `Yes` / `No`
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
- Perceptible appearance or client-behavior discrepancies remaining: `None` /
  details
- Unsubstantiated distinct UI inventory items remaining: `None` / details
- 100% observable UI/UX parity achieved for the recorded distinct inventory:
  `Yes` / `No`

`Completed` means every distinct recorded UI/UX inventory item has passing
source-versus-prototype evidence and no known perceptible or behavioral
difference remains. It does not mean production stores, protocols, native
runtimes, integrations, or architecture were reproduced or validated.

## Known Gaps And Next Action

- Blocked or incomplete UI inventory IDs:
- User-facing differences or omissions:
- Illustrative fixture content or production mechanisms intentionally
  simplified without changing presentation:
- Source reachability or evidence limitations:
- Required correction:
- Recommended next action for `product_prototyper`:
