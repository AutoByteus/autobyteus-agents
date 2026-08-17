# Prototype Bootstrap Report

Create this report for every existing-frontend bootstrap, parity-completion, or
refresh task. For a no-frontend bootstrap, create it when durable technical
baseline evidence materially helps the parent workflow. This report proves the
technical baseline; it does not replace `requirements-doc.md` or
`ui-ux-spec.md`.

## Bootstrap Status

- Status: `Completed` / `Blocked` / `Refresh Required`
- Task type: `Existing-Frontend Bootstrap` / `Parity Completion` / `Refresh` / `No-Frontend Bootstrap`
- Existing-frontend parity result: `Complete` / `Blocked` / `N/A`
- Delegated task ID:

## Source Baseline Identity

- Source project:
- Selected source frontend application:
- Source application root:
- Source commit or revision:
- Source install/start command:
- Source URL and readiness evidence:
- Supported roles and feature configurations:
- Applicable repository instructions:

## Prototype Identity

- Prototype root:
- Prototype install/start command:
- Prototype URL and readiness evidence:
- Framework, language, package manager, and build tooling:
- Router, styling, assets, and design-system conventions:

## Prototype Implementation Strategy

- Source code or assets reused:
- UI code recreated:
- Internal simplifications:
- Why the simpler implementation preserves the same observable frontend:
- Deliberate technology deviations and reasons:

Code volume, component structure, internal layering, and production
architecture are not parity criteria. Every applicable observable inventory
item below must still pass.

## Route, Surface, And State Inventory

| Inventory ID | Source Route / Surface | Roles / Configurations | Meaningful States | Client Operations | Related Journeys | Prototype Route / Scenario | Source Evidence | Prototype Evidence | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BP-UI-001 |  |  |  |  |  |  |  |  | `Pass` / `Fail` / `Unknown` |

## User Journey Inventory

| Journey ID | Actor / Starting State | Source Steps And Visible Outcomes | Prototype Steps And Visible Outcomes | Alternate / Failure / Recovery Paths | Evidence | Result |
| --- | --- | --- | --- | --- | --- | --- |
| BP-J-001 |  |  |  |  |  | `Pass` / `Fail` / `Unknown` |

## Client-Behavior Parity

| Behavior ID | Route / Surface | Trigger | Source State Transition And Feedback | Prototype State Transition And Feedback | Mock Scenario | Evidence | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BP-CB-001 |  |  |  |  |  |  | `Pass` / `Fail` / `Unknown` |

## Visual And Responsive Parity

| Visual ID | Route / Surface / State | Viewport | Source Evidence | Prototype Evidence | Hierarchy / Layout / Spacing | Typography / Color / Assets / Controls | Responsive / Focus / Motion | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BP-VIS-001 |  |  |  |  |  |  |  | `Pass` / `Fail` / `Unknown` |

Bootstrap comparison screenshots are current-state validation evidence, not the
final user-approved future-state references owned by `product_prototyper`.

## Mock Boundaries And Fixtures

| Boundary / Data | Source Client-Visible States And Outcomes | Prototype Adapter Or Fixture | Deterministic Scenarios | Production Capability Not Implemented | Result |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  | `Pass` / `Fail` / `Unknown` |

## Intentional Prototype Deltas

Use this section for refresh or parity-completion work. A listed delta must have
an accepted requirements or user-decision basis; otherwise treat the difference
as a parity discrepancy.

| Delta ID | Affected Inventory IDs | Source-Equivalent Baseline | Accepted Prototype Difference | Approval / Requirements Basis | Preservation Result |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Validation Environment And Commands

- Browser and version:
- Viewports:
- Fonts and assets:
- Fixtures and starting data:
- Role and feature configuration:
- Source commands:
- Prototype commands:
- Build, typecheck, lint, unit, or browser commands:
- Comparison method:
- Rendering noise or environment limitations:

## Completeness Gate

- Selected source frontend boundary is explicit: `Yes` / `No`
- Source revision is explicit: `Yes` / `No`
- Source and prototype are runnable in the recorded environment: `Yes` / `No`
- Every supported and discoverable route and surface is inventoried: `Yes` / `No`
- Every meaningful visible state is inventoried: `Yes` / `No`
- Every supported client interaction and user journey is inventoried: `Yes` / `No`
- Applicable roles, feature configurations, and viewports are covered: `Yes` / `No`
- Every inventory row is `Pass`: `Yes` / `No`
- Mock boundaries are explicit and deterministic: `Yes` / `No`
- No production credentials, production/customer data, live production dependencies, or production writes are used: `Yes` / `No`
- Every accepted intentional delta is distinguished from source parity: `Yes` / `No` / `N/A`
- Known UI/UX or client-behavior discrepancies remaining: `None` / details
- Unsubstantiated inventory items remaining: `None` / details
- Existing-frontend parity complete: `Yes` / `No` / `N/A`

An existing-frontend result is `Completed` only when every applicable
completeness item is satisfied, every inventory row passes, and no known or
unsubstantiated parity discrepancy remains.

## Known Gaps And Next Action

- Blocked or incomplete inventory IDs:
- Source reachability or evidence limitations:
- Baseline limitations:
- Unresolved production assumptions:
- Required correction or evidence:
- Recommended next action for `product_prototyper`:
