# Product Prototype Principles

This is the canonical shared reference for product-prototype work in the
Requirements Engineering Team. Read it before creating, bootstrapping,
evolving, or reviewing a runnable prototype.

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

- Identify the selected frontend application and pin the source revision used
  as the current-experience authority. Do not silently change the source
  boundary or revision.
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

- Reuse an applicable canonical prototype root that already represents the same
  frontend application or product surface.
- Derive a new `prototype-subject` in this order: the selected frontend
  application's name; a recognizable product-surface name when the application
  name is generic; the repository name when it represents one relevant
  frontend; or a stable product/experience name when no frontend exists.
  Normalize it to the workspace's naming conventions and use
  `<prototype-subject>-prototype` as the default repository directory name.
- Keep a long-lived existing-product prototype in a separate stable workspace,
  commonly as a sibling of the source repository.
- Record the source project, pinned source revision, prototype root, run command,
  scenario-selection method, and major implementation simplifications.
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

## 9. Repository Boundary And Ownership

- Treat the production source repository and the product-prototype repository
  as separate projects. The prototype repository is a long-lived sibling
  workspace for the selected product surface, not a feature branch or worktree
  inside the production implementation repository.
- The source repository is read-only from prototype work. Prototype code,
  synthetic fixtures, visual evidence, UI/UX specifications, and prototype
  commits belong only to the prototype repository.
- Reuse an existing prototype repository when its product surface and source
  boundary match. Otherwise establish one stable repository using the shared
  workspace naming rule, normally `<prototype-subject>-prototype` beside the
  source repository.
- `product_prototyper` owns selecting and reserving the stable prototype
  repository path before an existing-frontend baseline is delegated. Record the
  absolute path in the prototype work item and the fixed bootstrap trigger.
- `prototype_bootstrapper` may initialize the repository and project files at
  that exact reserved path. It must block on a path collision, ambiguous
  repository identity, or unsafe existing contents rather than silently
  choosing another project name or location.
- Record both repository identities in durable artifacts: source repository and
  pinned revision, plus prototype repository, prototype root, branch/worktree,
  and delivered commit or tag.
- If the prototype repository cannot be identified, initialized, or isolated
  safely, stop and report the exact blocker. Do not fall back to editing the
  production repository.
- Creating a remote repository or pushing changes is an explicit repository
  policy or user-authorized action. It is not an automatic consequence of
  completing a prototype task.

## 10. Prototype Work Items, Branches, And Worktrees

- Manage each cohesive experience or use-case change as one prototype work
  item. A work item may trace to multiple requirements, behavior, and
  acceptance-criteria IDs when they form one reviewable experience change; do
  not force one prototype ticket per low-level requirement.
- Use a stable prototype work-item identifier, normally `PT-*`, and a concise
  slug. Keep the work-item record, runnable changes, evidence, and delivery
  manifest linked by that identifier.
- Keep the accepted prototype baseline on the prototype repository's accepted
  branch, normally `main`. Create a dedicated ticket branch and worktree from
  the accepted baseline for concurrent or isolated work. Do not mix two
  work-item changes in one worktree.
- Before editing, verify repository identity, current branch, base accepted
  commit, clean or intentionally owned worktree state, and the absence of a
  conflicting work-item branch or package. Never reuse an unrelated dirty
  worktree or overwrite another work item's evidence.
- Put active artifacts under a stable `tickets/in-progress/<PT-ID>-<slug>/`
  package. After approval and final validation, move or rename the package to
  `tickets/done/<PT-ID>-<slug>/` in the delivered prototype revision. The
  package must retain the work-item ID and exact revision provenance.
- A completed work item is not complete merely because files changed. It needs
  a reproducible commit, validation evidence, user approval where future-state
  behavior changed, and a delivery manifest that indexes the final artifacts.
- If the source pin, accepted prototype baseline, worktree isolation, or prior
  work-item state is ambiguous, block rather than silently reconcile it.

## 11. Bootstrapper And Product-Prototyper Boundary

- `prototype_bootstrapper` owns only the current-experience baseline: source
  verification and pinning, observable-surface discovery, prototype-native
  parity implementation, matched validation, and the bootstrap report.
- For an initial existing-frontend bootstrap, the Bootstrapper may initialize
  the prototype repository at the reserved path and create a reproducible
  checkpoint commit/report in an isolated bootstrap branch or worktree. For a
  correction or refresh, it works from the accepted prototype baseline in an
  isolated bootstrap branch or worktree.
- The Bootstrapper returns the runnable candidate baseline, checkpoint commit,
  report, and evidence. It does not implement future-state requirements, create
  the canonical future-state `ui-ux-spec.md`, conduct the user design review,
  or approve a product decision.
- `product_prototyper` reviews and tests the Bootstrapper's result, then owns
  the official accepted-baseline commit or tag in the prototype repository's
  accepted branch. It may squash or cherry-pick the Bootstrapper checkpoint
  into its owned acceptance worktree before committing the accepted baseline.
  It also owns all subsequent future-state work items, user review, final
  UI/UX artifacts, and delivery commits.
- The Product Prototyper must not begin future-state work on an unreviewed or
  uncommitted bootstrap result. The Bootstrapper must not alter a Product
  Prototyper future-state ticket or add design changes while correcting parity.
- A no-frontend prototype does not need a Bootstrapper baseline; the Product
  Prototyper establishes the prototype repository and initial runnable baseline
  directly, then follows the same work-item and delivery rules.

## 12. Delivery Artifacts And Visual References

- The canonical completed work-item package contains, as applicable, the
  runnable prototype revision, `prototype-work-item.md`, `ui-ux-spec.md`,
  `prototype-delivery-manifest.md`, the behavior matrix, runbook, change log,
  assumptions, prototype report, and `visual-references/`.
- `ui-ux-spec.md` is the canonical detailed experience contract. The delivery
  manifest is the canonical index of what was delivered and from which exact
  revision. The prototype report records findings and cross-stage implications
  without duplicating either document.
- Use `visual-references/` as the umbrella directory. Call an actual captured
  browser image a screenshot, and identify it with a stable `VIS-*` ID and a
  descriptive filename such as
  `VIS-002-filter-panel-open-desktop-1440x900.png`.
- Bootstrap comparison screenshots are current-state evidence. Final visual
  references captured after explicit user approval are normative for the
  approved surface, state, and viewport unless the UI/UX specification marks
  content or variation as illustrative/permitted.
- Every delivered artifact must link back to the work-item ID, source pin,
  Product Prototyper accepted-baseline commit, final prototype commit or tag,
  and relevant requirements/behavior/acceptance IDs when those references
  exist. Record the Bootstrapper checkpoint separately when one exists.
