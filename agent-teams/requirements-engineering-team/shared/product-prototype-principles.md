# Product Prototype Principles

This is the canonical shared reference for product-prototype work in the
Requirements Engineering Team. Read it before creating, bootstrapping,
evolving, or reviewing a runnable prototype.

Role-specific workflow belongs in each agent's `SKILL.md`; this document holds
only the principles that must remain consistent across prototype roles.

## 1. Purpose And Boundary

- A product prototype is an evidence and approval instrument for product
  behavior, UI, interaction, state, navigation, visual hierarchy, and journey
  decisions.
- It is not production implementation, production architecture, or proof of
  production readiness.
- Keep production requirements canonical in `requirements-doc.md` and keep the
  prototype-owned UI/UX supplement canonical in `ui-ux-spec.md`.
- Never use prototype convenience as proof of a product requirement without
  recording the decision and its evidence.

## 2. Prototype Modes

Use one explicit mode for each prototype workspace:

- **Existing frontend bootstrap:** reproduce the complete current client
  experience of the selected source frontend application and use its frontend
  technology.
- **No-frontend bootstrap:** create the prototype from the team's standard
  frontend template.
- **Existing prototype evolution:** read and preserve the existing prototype
  before applying the approved new request.
- **Explicit refresh/reconciliation:** compare a prototype against a newer
  production frontend revision only when the request specifically requires it;
  never overwrite accepted prototype behavior silently.

Initial bootstrap is normally a one-time handoff stage for a prototype
workspace. Later work normally belongs to `product_prototyper`.

## 3. Technology Selection

- When the source product has a frontend, detect and use the same framework,
  language, package manager, build tooling, routing approach, and relevant
  design-system conventions when practical.
- Do not replace an existing frontend technology merely because a different
  prototype stack is more familiar.
- When no frontend exists, use the host workspace's configured standard
  prototype template. If no template is supplied, use Vue 3, Vite, and
  TypeScript as the default fallback and record that selection.
- Record the detected or selected technology, source revision, and any
  deliberate deviation in the bootstrap evidence.

## 4. Baseline And Scope

- Define the selected source frontend application explicitly. In a monorepo,
  this is the applicable frontend application, not every application in the
  repository unless the work packet selects them together.
- For an existing frontend, establish 100% observable current-state parity
  across the recorded application inventory before adding new behavior. Cover
  every supported and discoverable route, meaningful surface, visible state,
  client-side interaction, user journey, role, configuration, and validated
  viewport within that boundary.
- Preserve the same observable frontend while allowing simpler prototype
  internals. Source-code reuse is optional, and code volume, component
  structure, layering, and production architecture are not parity criteria.
  Prefer the simplest maintainable implementation that satisfies the complete
  observable contract.
- Keep no-frontend construction and later requirements-driven changes
  proportional to the concrete decision they must resolve; this economy rule
  does not reduce an existing-frontend parity baseline.
- Do not begin requirements-driven prototype changes until
  `product_prototyper` accepts the applicable current-state parity result.
- Preserve accepted prototype behavior during later revisions unless the user
  explicitly approves a change or the requirements engineer sends a revised
  requirements basis.

## 5. Mock Boundaries And Data

- Mock service, persistence, authentication, external integration, and other
  production boundaries explicitly and deterministically.
- Keep interface state, transitions, validation, loading, empty, error,
  permission, recovery, and visible feedback real. In an existing-frontend
  baseline, each inventoried user-visible result must match the source even
  though the underlying operation is mocked.
- Use small synthetic fixtures that reflect relevant production data shapes.
  Do not use credentials, personal data, customer data, or production exports.
- Place mocked behavior behind explicit adapters or fixtures instead of
  scattering arbitrary data and service branches through presentation code.
- Record what the prototype proves, what remains mocked, and what production
  behavior is still unresolved.

## 6. Fidelity And Evidence

- For an existing-frontend baseline, reproduce the source appearance and client
  behavior across the complete inventory. This includes hierarchy, layout,
  spacing, typography, colors, labels, assets, controls, navigation, responsive
  behavior, focus, keyboard behavior, feedback, motion, and accessibility
  intent.
- Use real interface structure and interaction. Do not use generated images,
  page screenshots, or click hotspots as substitutes for the reproduced UI.
- Validate source and prototype in a controlled browser, viewport, asset, font,
  fixture, role, and feature-configuration environment. Compare each recorded
  route, surface, state, interaction, and journey with runnable evidence.
- Treat the baseline as complete only when every inventoried parity item passes.
  Any known UI/UX, client-behavior, visible-state, or journey discrepancy, and
  any unsubstantiated inventory item, blocks completed status.
- Raw screenshot-byte differences caused only by normalized browser rendering
  noise are not product differences. They do not excuse any known perceived or
  behavioral discrepancy.
- Distinguish requirements-defining behavior and visual details from
  illustrative details that implementation may refine later.
- Screenshots are evidence only when they correspond to the validated runnable
  state. Bootstrap comparison screenshots are current-state parity evidence,
  not final approved future-state references.
- Capture final reference screenshots only after explicit user confirmation.

## 7. Workspace Selection, Naming, And Isolation

- Reuse an applicable canonical prototype root that already represents the same
  frontend application or product surface.
- For a new root, choose a stable prototype subject in this order:
  1. the relevant source frontend application's name; in a monorepo, use the
     application rather than the repository name;
  2. the recognizable product-surface name when the application identifier is
     generic or ambiguous;
  3. the repository name when it represents the single relevant frontend; or
  4. a stable product or experience name when no source frontend exists.
- If these sources do not identify a stable subject, obtain an explicit stable
  name before creating the workspace.
- Name the new prototype directory `<prototype-subject>-prototype`, normalized
  to the applicable workspace's directory and package naming conventions.
- Keep a long-lived existing-product prototype in a separate, stable prototype
  workspace, commonly as a sibling of the source repository, for example:

  ```text
  workspace/
  ├── platform-monorepo/
  └── customer-portal-prototype/
  ```

- Record the source project, source commit or revision, prototype root, run
  command, and mock boundary in durable prototype evidence.
- Do not allow prototype runs to write to production services or depend on
  production credentials.

## 8. Responsibility Boundary

- `prototype_bootstrapper` establishes, completes, or explicitly refreshes the
  current-state parity baseline and returns its evidence through the applicable
  handoff rules to `product_prototyper`.
- `product_prototyper` accepts the baseline, then owns focused requested
  experience changes, user review, final validation, screenshots, and
  `ui-ux-spec.md`.
- `requirements_engineer` owns canonical requirements, acceptance criteria,
  requirements approval, and integration of the approved UI/UX package.
- No prototype role owns the target production architecture or production
  implementation.
