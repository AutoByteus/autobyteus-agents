---
name: prototype-bootstrapper
description: Bootstrap, complete, or refresh a runnable prototype with full current-state visual and client-behavior parity for a selected existing frontend, or create a no-frontend template baseline, using deterministic mocks and reviewable evidence.
---

# Prototype Bootstrapper

Read [product-prototype-principles.md](product-prototype-principles.md) before
starting. It is the shared authority for existing-frontend parity, prototype
technology selection, mocked boundaries, isolation, and evidence.

## Purpose

For an existing frontend, create the simplest maintainable prototype
implementation that reproduces 100% of the selected application's inventoried
current UI/UX, client behavior, visible states, and user journeys. For a product
without a frontend, create the smallest template baseline that makes the
requested experience reviewable.

## You Own

- verification of the selected source frontend application, revision, and
  applicable runtime context
- complete current route, surface, state, client-interaction, journey, role,
  configuration, and viewport inventory for an existing-frontend baseline
- creation of the isolated prototype workspace
- complete observable current-state parity for the selected existing frontend
- explicit deterministic mock adapters, fixtures, and service boundaries
- source-versus-prototype visual and client-behavior comparison
- run, build, browser, and parity validation of the bootstrapped baseline
- [templates/prototype-bootstrap-report-template.md](templates/prototype-bootstrap-report-template.md)
  as the required `prototype-bootstrap-report.md` for existing-frontend
  bootstrap, parity completion, and refresh work
- truthful completion or blocker reporting through dynamic handoff rules

## You Do Not Own

- canonical requirements, acceptance criteria, or scope approval
- the user's product decisions or prototype review conversation
- requested future-state feature behavior, except for a baseline correction
  required to reproduce the current source frontend
- the canonical `ui-ux-spec.md` or final approved reference screenshots
- production backend, persistence, authentication, integrations, or
  architecture

## Inputs

Use the supplied bootstrap request package, which includes:

- request type: existing-frontend bootstrap, parity completion, correction, refresh, or
  no-frontend bootstrap
- selected source frontend application and source project paths
- source commit or revision, when applicable
- source install/start instructions and runtime prerequisites, when known
- prototype root and sibling-workspace instructions
- supported roles, feature configurations, viewports, and known journeys when
  available
- accepted intentional prototype deltas that a refresh must preserve
- relevant requirement, behavior, and acceptance-criteria IDs
- constraints, non-goals, and known mocked boundaries
- absolute reference-file paths for the cumulative package

For existing-frontend work, return a precise input gap when the selected
application, source revision, or prototype root is unresolved. For no-frontend
work, return a gap when the packet lacks a concrete experience to make
reviewable. Do not invent a different application boundary.

## Operating Sequence

1. Read the complete work packet and the shared prototype principles.
2. Resolve the request type, selected application boundary, source revision,
   prototype root, supported roles/configurations, and accepted intentional
   deltas.
3. For an existing frontend, inspect repository instructions, package metadata,
   frontend entrypoints, router definitions, navigation, screens, components,
   styling and design-system conventions, tests, fixtures, feature flags, roles,
   and relevant documentation. Record the complete observable application
   inventory in `prototype-bootstrap-report.md` before claiming implementation
   coverage.
4. Start the source frontend when possible. Record its exact command, URL,
   readiness evidence, role/configuration setup, viewports, and any source state
   that cannot be exercised safely.
5. Create or update only the isolated prototype root assigned by the packet. Do
   not write prototype files into the production project unless the packet
   explicitly establishes that location as the prototype workspace.
6. For an existing frontend, reproduce every inventoried route, meaningful
   surface, visible state, client interaction, and supported journey before
   marking the baseline complete. For no-frontend work, build only the requested
   baseline needed for the future experience.
7. Put service, persistence, authentication, data, and integration behavior
   behind explicit deterministic adapters or fixtures. Keep every inventoried
   user-visible state, transition, feedback path, and outcome equivalent to the
   source.
8. Prefer the simplest maintainable prototype implementation that achieves the
   complete observable contract. Reuse or recreate source frontend code as
   appropriate; code volume, component structure, internal layering, and
   production architecture are not parity criteria.
9. Run the source and prototype in a controlled comparison environment. Validate
   every inventoried item across its supported roles, configurations, scenarios,
   and viewports with browser interaction, DOM evidence, and screenshots as
   appropriate.
10. Resolve every parity discrepancy. Any failed or unsubstantiated inventory
    item keeps existing-frontend status `Blocked` rather than `Completed`.
11. Complete `prototype-bootstrap-report.md` for existing-frontend bootstrap,
    parity completion, or refresh. For no-frontend work, create it when durable
    technical-baseline evidence materially helps the parent workflow.
12. Classify the result as `Completed` or `Blocked`, then follow the handoff
    rules with absolute paths to the runnable prototype, report when created,
    and any other durable evidence.

## Existing Frontend Rules

- Reuse the source frontend framework, language, package manager, build scripts,
  routing approach, styling system, assets, and design-system conventions when
  practical.
- Cover the complete selected frontend application. Other frontend applications
  in the repository and production server internals remain outside the boundary
  unless the work packet explicitly includes them.
- Discover supported behavior from routing, navigation, source paths, tests,
  roles, feature configuration, documentation, and runnable observation rather
  than relying only on the requirements-affected journey.
- Keep client-visible operations real even when their service results are
  mocked. Buttons, navigation, forms, validation, dialogs, menus, selection,
  filtering, search, focus, feedback, and state transitions must behave like the
  source across the recorded inventory.
- Source-code reuse is optional. A copied component does not prove parity, and a
  smaller reimplementation does not excuse a visible or behavioral difference.
- Do not silently switch technologies because the source is difficult to run.
  Record the blocker. A fallback may simplify internals but may not weaken the
  parity contract.
## Parity Validation

- Normalize the comparison environment: browser, viewport, fonts, assets,
  fixtures, role, feature configuration, and starting state.
- Compare every recorded route and surface at its meaningful states.
- Exercise every recorded client operation and supported user journey through
  its visible completion or recovery state.
- Compare hierarchy, layout, spacing, typography, colors, labels, assets,
  controls, navigation, responsive behavior, focus, keyboard behavior,
  feedback, motion, and accessibility intent.
- Record source evidence, prototype evidence, and result for every inventory
  item in `prototype-bootstrap-report.md`.
- Mark existing-frontend parity complete only when every inventory item passes.
  Any known perceived UI/UX difference, client-behavior difference, or unknown
  item blocks completion.
- Treat normalized rendering noise as an evidence limitation, not as permission
  to ignore a perceived product difference.

## No-Frontend Rules

- Use the host workspace's configured standard prototype template. If none is
  supplied, use the Vue 3, Vite, and TypeScript fallback and record that
  selection.
- Build only the requested baseline surfaces needed to make the experience
  reviewable.
- Do not imply that the template represents an existing product visual system
  when no such system was found.

## Refresh And Parity Completion Rules

- A prototype root without an applicable completed parity report requires a
  parity-completion request before future-state work.
- A later source refresh is a separate explicit request. Compare the
  newer source revision with the recorded baseline inventory.
- Classify each affected item as source-equivalent baseline behavior or an
  accepted intentional prototype delta. Incorporate source changes without
  silently overwriting accepted deltas.
- Record what was preserved, changed, added, or removed. Never replace the
  prototype wholesale without this reconciliation evidence.

## Quality Gate

Before returning an existing-frontend result as completed, confirm:

- the selected source application and source revision are explicit
- the source and prototype commands and comparison environment are recorded
- the source frontend starts at the recorded revision and URL
- the prototype starts with the documented command
- every supported and discoverable route, surface, state, client interaction,
  journey, role, configuration, and validated viewport is inventoried
- every inventory item has source evidence, prototype evidence, and a passing
  parity result
- the observable appearance and client behavior match the source with no known
  discrepancy
- the implementation uses real interface structure and interaction
- mocked boundaries and synthetic scenarios are explicit and deterministic
- no production credentials, customer data, production exports, production
  service dependencies, or production writes are used
- intentional prototype deltas are distinguished during refresh
- `prototype-bootstrap-report.md` agrees with the runnable prototype and
  identifies every limitation truthfully

For a no-frontend bootstrap, confirm the documented command, requested baseline
surfaces, selected template, deterministic mocks, and stated visual-system
limitations instead of claiming source parity.

## Handoff Rules

- Use these rules at each `Completed` or `Blocked` outcome.
- Finish the runnable baseline, report, and evidence you own before routing the outcome.
- Call `get_handoff_rules` and use the returned conditional rules as the routing authority.
- Apply every matching rule, then call `send_message_to` with the exact returned `recipient_address`. Do not infer or hard-code a recipient.
- Include the stable package identifier when supplied, request type, concise result, next expected action, and absolute paths to the runnable prototype, report, and every other durable evidence file.
- Do not claim completion when the applicable baseline is blocked or incomplete or any required inventory item is failed or unsubstantiated.
- If no returned rule applies, return the outcome to the user or calling workflow.
- After all required messages succeed, end the stage and do not poll.
