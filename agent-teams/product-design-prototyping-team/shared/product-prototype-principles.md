# Product Prototype Principles

This is the canonical shared reference for the Product Design & Prototyping
Team. Read it before creating, bootstrapping, evolving, or reviewing a
runnable prototype.

Role-specific workflow belongs in each agent's `SKILL.md`; this document holds
only the principles that must remain consistent across prototype roles.

## 1. Purpose And Fidelity Boundary

- A product prototype is an evidence and approval instrument for product
  behavior, UI, interaction, state, navigation, visual hierarchy, and journey
  decisions.
- Optimize for **high experience fidelity and low implementation fidelity**.
  The reviewer should see and exercise the intended interface behavior, while
  the implementation underneath may be deliberately small and synthetic.
- For a current-experience baseline, high experience fidelity means **100%
  observable UI/UX parity** with the pinned source across the distinct recorded
  inventory. For a future-state prototype, it means a production-quality,
  fully specified visual and interaction design suitable for use as an
  implementation reference after user approval.
- Observable fidelity includes exact hierarchy, geometry, layout, spacing,
  density, typography, font assets, color, borders, radii, shadows, icons,
  imagery, labels, controls, responsive behavior, focus, keyboard behavior,
  feedback, motion, navigation, state transitions, and journey outcomes.
- "Exact" means no known human-perceptible or behaviorally meaningful
  difference under matched browser, viewport, font, asset, theme, locale,
  context, scenario, and synthetic data-fixture conditions. It does not require
  identical source code, runtime architecture, or raw screenshot bytes.
- UI-controlled content—including labels, instructions, formatting, validation,
  feedback, and error or recovery messages—is part of the exact experience
  contract. Domain record values may be synthetic, but current-source
  comparisons use the same synthetic fixture values in source and prototype so
  content differences do not conceal visual drift. Future-state references
  identify any illustrative fixture value explicitly.
- A prototype is not a production implementation, frontend digital twin,
  integration test environment, production architecture, or proof of
  production readiness.
- Prototype code exists to remove ambiguity about the user experience. Its
  stores, data model, service shape, and runtime structure do not prescribe the
  eventual implementation.
- Keep production requirements canonical in `requirements-doc.md` and keep the
  prototype-owned UI/UX supplement canonical in `ui-ux-spec.md`.
- Never use prototype convenience as proof of a product requirement without
  recording the decision and its evidence.

## 2. Prototype Modes

Use one explicit mode for each prototype workspace:

- **Current-experience bootstrap:** independently establish a browser-runnable
  UI/UX baseline from a pinned existing frontend revision. Reproduce the
  selected application's distinct current user-facing surfaces and behavior,
  not its production runtime or internal implementation.
- **No-frontend construction:** create the smallest useful experience baseline
  from the team's standard frontend template.
- **Existing prototype evolution:** read and preserve the accepted prototype
  before applying a focused requirements-driven change.
- **Explicit refresh/reconciliation:** compare an established prototype with a
  newer selected frontend revision only when requested; preserve accepted
  prototype changes and record the reconciliation.

Initial current-experience bootstrap is normally a one-time independent stage
for a prototype workspace. Later requirements-driven work normally belongs to
`product_prototyper`.

## 3. Source And Technology Selection

- When an existing frontend is selected, identify that application and pin the
  source revision used as the current-experience authority. Do not silently
  change the source boundary or revision. For no-frontend construction, record
  the selected product surface and template instead.
- Prefer the source frontend's framework, language, styling system, assets, and
  design-system conventions when they make visual reuse and maintenance easier.
  Matching production package layout, build topology, routing internals, state
  architecture, or service clients is not required.
- Reuse presentation components, styles, tokens, or assets when doing so
  reduces work without importing unnecessary production coupling. Creating a
  smaller prototype-native project is equally valid.
- Do not copy a complete production frontend merely to claim fidelity. Choose the
  smallest implementation that can express the complete observable UI
  experience within the selected boundary.
- When no frontend exists, use the host workspace's configured prototype
  template. If none is supplied, use Vue 3, Vite, and TypeScript and record the
  selection.

## 4. Observable Experience Scope

- Define the selected UI boundary explicitly. In a monorepo this is the chosen
  frontend application or product surface, not every application in the
  repository.
- Cover each distinct user-facing route or surface, navigation path, control
  behavior, validation and feedback pattern, meaningful visible state, and
  supported journey within that boundary.
- Assign stable inventory IDs and require every distinct observable inventory
  item to have applicable source evidence, prototype evidence, and a passing
  fidelity result before declaring a current-experience baseline complete.
- Completeness applies to distinct observable behavior, not to a Cartesian
  product of identical roles, data values, feature configurations, runtimes,
  locales, and viewports. One deterministic scenario may substantiate behavior
  that is visibly equivalent across several contexts.
- Represent each context that produces a materially different UI or user
  journey. Record visibly equivalent contexts without rebuilding or retesting
  the same behavior unnecessarily.
- A current-experience bootstrap does not require future-state requirements or
  feature decisions. It discovers the existing experience independently and
  must not introduce unapproved redesign or future behavior.
- Later prototype changes remain proportional to the concrete product decision
  they must resolve. Missing unrelated prototype detail does not justify
  expanding a focused requirements-driven change.

## 5. Simplified Implementation And Synthetic State

- Use the simplest credible implementation for the observable contract. The
  default shape is:

  ```text
  runnable UI
      -> prototype-native state and scripted transitions
      -> small synthetic fixtures
  ```

- Hard-coded synthetic values are acceptable for isolated presentation
  scenarios. Use a small prototype-specific store or fixture module when state
  is shared, mutable, or reused across surfaces.
- Keep visible interactions real: navigation, forms, validation, dialogs,
  selection, filtering, search, focus, feedback, and state changes must respond
  correctly in the runnable interface.
- Fake the operation beneath the interface whenever the production capability
  is not itself under review. Saving may update memory, streaming may use a
  timer, a terminal may return scripted output, and a run may advance through
  predefined statuses.
- Do not reproduce GraphQL, REST, WebSocket, authentication, persistence,
  filesystem, terminal, model, tool, messaging, update, download, or other
  production contracts merely to keep production stores or clients unchanged.
  Protocol-level simulation is justified only when the protocol behavior is
  itself visible and part of the review question.
- Represent browser, mobile, desktop-host, Electron, permission, role, feature,
  and connectivity contexts through deterministic scenario state. Do not bundle
  Electron, native bridges, server processes, or host runtimes when a browser
  scenario can express the same user-visible experience.
- Use only synthetic data. Prototype runs must not require production
  credentials, customer data, production exports, live production services, or
  production writes. Mutable state must be locally resettable.

## 6. Experience Fidelity And Evidence

- Reproduce the pinned source's appearance and client-visible behavior exactly
  for every distinct item in the selected current-experience inventory unless
  an accepted prototype change intentionally differs.
- Use real interface structure and interaction. Do not use page screenshots or
  click hotspots as substitutes for a runnable UI.
- Validate every distinct recorded surface, visible state, interaction pattern,
  and journey outcome in matched source and prototype conditions. Equivalent
  permutations may share evidence only when their rendered UI and behavior are
  demonstrably the same.
- Use controlled browser interaction, DOM inspection, computed-style or
  geometry checks, screenshots, and perceptual comparison as appropriate.
  Rendering noise such as subpixel antialiasing does not require raw
  screenshot-byte identity, but any known perceptible appearance or interaction
  difference blocks exact current-experience completion.
- Differences in internal stores, protocols, runtimes, or architecture are
  intentional simplifications and do not affect UI/UX fidelity when the visible
  presentation and behavior remain exact.
- Record what the prototype demonstrates, how technical capabilities are
  simulated, which source revision it reflects, and any user-facing limitation.
- In a user-approved future-state package, final screenshots and the
  corresponding `ui-ux-spec.md` are normative implementation references. Treat
  all visible design details as requirements-defining by default; identify any
  illustrative fixture content or permitted variation explicitly.
- Capture final reference screenshots only after explicit user confirmation.
  Bootstrap screenshots are current-experience evidence, not approved
  future-state references.

## 7. Workspace Selection And Isolation

- Reuse an applicable canonical prototype repository that already represents
  the same frontend application or product surface.
- Derive a new `prototype-subject` in this order: the selected frontend
  application's name; a recognizable product-surface name when the
  application name is generic; the repository name when it represents one
  relevant frontend; or a stable product/experience name when no frontend
  exists. Normalize it to the workspace's naming conventions and use
  `<prototype-subject>-prototype` as the default prototype repository name.
- Keep the prototype repository separate from the source repository. In a
  workspace containing both, place them as sibling directories:

  ```text
  workspace/
    source-repository/
    <prototype-subject>-prototype/
  ```

  The prototype repository is not a subdirectory of the source repository,
  even when the selected frontend is nested inside that source repository. Do
  not add a generic `prototypes/` container.
- When no frontend exists, derive the prototype subject from the product or
  experience name and create the separate prototype repository at the
  workspace location selected by the Product Prototyper. Record the choice.
- Record the source repository and selected frontend, pinned source revision,
  prototype repository/root, run command, scenario-selection method, and major
  implementation simplifications.
- Do not let prototype runs write to production services or depend on
  production credentials.

## 8. UI Authority And Responsibility Boundary

- The pinned source frontend is the sole UI/UX authority for a current-
  experience baseline. `prototype_bootstrapper` discovers and reproduces that
  experience; it decides only the simplest prototype implementation, not the
  appearance, behavior, product policy, or future design.
- `product_prototyper` accepts an applicable baseline and authors a concrete,
  focused future-state UI/UX proposal within the requirements and user
  feedback. After baseline acceptance, it owns the canonical runnable
  experience, review loop, final validation, screenshots, and `ui-ux-spec.md`,
  but it does not approve its own proposal.
- The user is the sole approval authority for intentional future-state UI/UX
  and behavior. `requirements_engineer` preserves that approval, owns canonical
  requirements and acceptance criteria, and integrates the approved UI/UX
  package for downstream implementation.
- No prototype role owns the target production architecture or production
  implementation.

## 9. Prototype Repository Boundary And Ownership

- Treat the source repository and the product prototype as separate Git
  repositories and separate project roots. The prototype repository normally
  sits beside the source repository in the workspace and uses the stable name
  `<prototype-subject>-prototype`. It is not a nested project, production
  frontend directory, Requirements Engineer worktree, or generic
  `prototypes/` directory.
- Product Prototyper resolves, creates when necessary, and owns the prototype
  repository from request intake. Ownership includes its project files,
  ordinary ticket folders, prototype-specific commits, and durable UI/UX
  evidence. Requirements Engineering may link those artifacts but does not
  manage them.
- Prototype work may modify only the prototype repository. Production source
  paths, production services, and production credentials remain outside the
  prototype boundary. Bootstrapping may read the pinned source repository but
  must write only to the prototype repository.
- Reuse an existing canonical prototype repository when its product surface
  and source boundary match. Otherwise derive the stable repository name using
  Section 7. If the repository cannot be identified, initialized, or isolated
  safely, stop and report the exact blocker rather than silently creating a
  second project.
- Record source repository and revision, selected frontend, prototype
  repository/root and revision, run command, and major implementation
  simplifications in durable prototype evidence.

## 10. Prototype Repository Lifecycle

- Maintain one stable prototype repository for the selected frontend or
  product surface. Manage each requirements-driven request as a ticket inside
  that repository, using the caller's existing ticket or request identifier
  when one is supplied. If none exists, create the ticket using the Product
  team's normal ticket convention before editing. Do not invent a second
  prototype-specific ticket ID.
- Keep ticket folders such as `tickets/in-progress/<ticket-id>/` and
  `tickets/done/<ticket-id>/` inside the prototype repository. They contain the
  ticket record, UI/UX specification, visual references, and supporting
  evidence; they are ordinary folders, not branches or worktrees.
- The prototype source remains at the repository root. Product Prototyper
  works in that stable repository and updates the ticket folder alongside the
  implementation. A dedicated per-ticket branch or worktree is not required.
- The Product Prototyper reads the current prototype repository and its
  accepted baseline before making a focused change. Keep revision history in
  the existing change log and ticket record when a material evolution needs
  traceability.
- For an existing frontend with no accepted baseline, Product Prototyper sends
  the fixed bootstrap request with the selected frontend and canonical
  prototype repository/root. Bootstrapper establishes current UI/UX parity in
  that repository and returns the runnable result, bootstrap report, and
  evidence.
- Product Prototyper performs acceptance and regression validation, commits
  the accepted baseline and later future-state changes in the prototype
  repository, keeps the ticket status and UI/UX specification synchronized
  with that committed state, and moves the completed ticket folder to
  `tickets/done/` when the ticket is finished. Push only under existing
  repository policy or explicit authorization.
- Multiple tickets may exist in the same repository, but overlapping changes
  must be handled deliberately. Do not overwrite another ticket's uncommitted
  changes; serialize the work or report the exact conflict.
- Do not create a dedicated ticket branch or task worktree. If the canonical
  prototype repository is in an unsafe or ambiguous state, stop and report the
  exact blocker rather than inventing another root.

## 11. Bootstrapper And Product-Prototyper Boundary

- `prototype_bootstrapper` owns only the current-experience baseline: source
  verification and pinning, observable-surface discovery, prototype-native
  parity implementation, matched validation, and the bootstrap report.
- Bootstrapper may create or update the prototype repository at the canonical root,
  but does not implement future-state requirements, create the canonical
  future-state `ui-ux-spec.md`, conduct the user design review, or approve a
  product decision.
- `product_prototyper` reviews and tests the Bootstrapper's result, commits the
  accepted baseline in the prototype repository, and owns all subsequent
  future-state changes, user review, final UI/UX artifacts, and prototype
  commits.
- The Product Prototyper must not begin future-state work on an unreviewed or
  failed bootstrap result. Bootstrapper must not add design changes while
  correcting current-state parity.
- A no-frontend prototype does not need a Bootstrapper baseline; Product
  Prototyper establishes the prototype repository and initial runnable baseline directly.

## 12. Delivery Artifacts And Visual References

- The canonical prototype repository contains the runnable prototype, project-wide
  change history, and current-experience bootstrap evidence. Each ticket folder
  under `tickets/` contains its `prototype-ticket.md`, `ui-ux-spec.md`, final
  `visual-references/`, behavior matrix, runbook, prototype report, assumptions,
  and other ticket-specific supporting delivery artifacts as needed.
- `ui-ux-spec.md` is the canonical detailed experience contract for its ticket.
  The prototype report is an optional cross-stage summary and must not
  duplicate the UI/UX specification or supporting evidence.
- Use `visual-references/` as the umbrella directory. Call an actual captured
  browser image a screenshot, and identify it with a stable `VIS-*` ID and a
  descriptive filename such as
  `VIS-002-filter-panel-open-desktop-1440x900.png`.
- Bootstrap comparison screenshots are current-state evidence. Final visual
  references captured after explicit user approval are normative for the
  approved surface, state, and viewport unless the UI/UX specification marks
  content or variation as illustrative/permitted.
- Every durable artifact must link back to the source pin, prototype repository
  root/revision, and relevant requirements, behavior, and acceptance IDs when
  those references exist.
