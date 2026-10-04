# Product Design & UI Principles

This is the canonical shared reference for the Product Team. Read it before creating, bootstrapping, evolving, or reviewing a
UI reference or UI/UX specification.

Role-specific workflow belongs in each agent's `SKILL.md`; this document holds
only the principles that must remain consistent across design roles.

## 1. Purpose And Fidelity Boundary

### Terms

The Product Team's skills and templates use these terms with these meanings:

- **UI reference:** the runnable model of the product's UI that the team
  designs in, described below. Do not call it a prototype, sandbox, or UI
  project; one name keeps it distinct from the production frontend.
- **Baseline:** the accepted UI reference of today's product, with UI parity to
  the pinned source.
- **Design repository:** the separate Git repository that holds the UI
  reference, its tickets, and its evidence (section 8).
- **Visual reference:** a captured or annotated image of a surface and state
  (section 10). A screenshot is a visual reference; the runnable UI reference
  is not.

### Why the team designs in code

Static design drawings cannot show real responsive layout, scrolling, font
rendering, or live interaction states, so engineering has to interpret them.
The team instead designs in a running UI reference, where layouts, states, and
journeys are exercised in the browser rather than drawn. The result is a
precise visual and interaction target for engineering, not production code.

### What a UI reference is

A UI reference is a runnable **model of the product's UI**. Every distinct page
and state looks and behaves like the product, driven by **simple mock data**.
It shows what the product looks like and how a user moves through it. It is
**not a complete working website**: it does not hold the product's real data,
and it does not implement the product's real logic.

It exists so Product can design features on top of today's product before
Software Engineering builds them: people click through a proposed feature in
context, refine it, and approve it. The approved outcome is the UI/UX
specification (`ui-ux-spec.md`) with its normative reference screenshots,
which Software Engineering implements; the UI reference substantiates that
specification and lets users and engineers click through the approved flows.
Every design activity serves that outcome. A baseline is valuable as an
accurate, navigable copy of today's product; comparison evidence only
establishes that accuracy and is never the goal, so verification effort stays
small next to the baseline itself.

A UI reference implements:

- every distinct page, route, layout, component, style and asset that makes up
  the UI;
- all UI-controlled text: labels, headings, instructions, and empty, error,
  validation, feedback and status messages;
- navigation, controls, forms, validation, dialogs and interactions, with
  visible outcomes. Outcomes are scripted: the UI reference shows the result the
  product would show for the mock case, without computing it the way the
  product does;
- every meaningful state: empty, populated, loading, error, locked,
  permission, role, logged out;
- a small mock data layer: a stub that answers the UI's data requests from
  hand-written fixtures, with scripted outcomes for user actions and
  resettable in-memory state;
- deterministic scenarios that select which state and role the UI shows.

It does not contain:

- real data or content: article and document bodies, catalog or question
  sets, answer data, transcripts, translations, media inventories, user
  records, or any export of them;
- recorded, replayed or captured source responses, whether kept as files or
  served through a replay layer;
- a backend: server rules, persistence, access control, integrations or
  production protocols;
- the product's real logic: scoring and grading engines, recommendation or
  progress calculations, search, publishing pipelines, payment, email or media
  processing. Only their visible results appear, as scripted outcomes for the
  mock cases.

Mock data is **enough items of each shape to show every UI state, and no
more**. A list gets a few items, enough to show its layout, grouping, paging
and facets. A detail page gets one or two item bodies per type. Values are
invented and marked illustrative. A healthy data layer is measured in
kilobytes. If fixtures or content files reach megabytes, or match the
source's item counts, real data has been copied.

Copy the source's **UI code**, not its **content**. When copied presentation
code imports content (Markdown, JSON, or data modules such as question sets or topic lists), keep the importing UI code unchanged and replace the imported
content with a small synthetic file of the same shape and exports. A
presentation-boundary audit covers UI code only. Content files are expected to
differ from the source.

### What UI parity means

**UI parity** is the fidelity target for a current-experience baseline. Every
use of "parity", "exact" or "fidelity" in the Product Team's skills means this.
A current-experience baseline has UI parity when, for every distinct page, state and interaction
a user can see, the baseline and the pinned source look and behave the same
under matched mock scenarios.

| Parity covers (must match exactly) | Parity does not cover (never required) |
| --- | --- |
| Appearance: layout, spacing, typography, colors, borders, shadows, icons, imagery, responsive behavior | Data and content: titles, texts, counts, topic names, lists, media (illustrative) |
| UI-controlled text, including template text around values | Real business logic: how scores, progress, recommendations or search results are computed |
| Navigation: routes, links, redirects, guards | Backend behavior: persistence, access control, integrations, performance |
| Interactions and their visible outcomes: clicks, forms, validation, feedback | Every data permutation, every item, every role/value combination |
| Every distinct state: empty, populated, loading, error, locked, role, logged out | Code structure, stores, APIs or runtime architecture |
| Focus, keyboard and motion behavior | Raw screenshot bytes |

"Complete" means **complete coverage of distinct UI**: each distinct page type,
state and interaction pattern appears at least once with evidence. It does not
mean a complete website, every item, or every data combination. One mock item
can stand for every item that renders the same way.

### Fidelity boundary

- A UI reference is an evidence instrument for product behavior, UI,
  interaction, state, navigation, visual hierarchy, and journey decisions.
  An exploratory requirements visualizer helps clarify an abstract or
  product-independent decision; product experience design evolves or
  establishes the product-facing experience and becomes an approval instrument
  only after explicit user confirmation.
- Optimize for **high experience fidelity and low implementation fidelity**.
  The reviewer should see and exercise the intended interface behavior, while
  the implementation underneath may be deliberately small and synthetic.
- For a current-experience baseline, high experience fidelity means **UI
  parity** (defined above) for every item in the distinct recorded inventory.
  For a future-state design, it means a production-quality,
  fully specified visual and interaction design suitable for use as an
  implementation reference after user approval.
- Observable fidelity includes exact hierarchy, geometry, layout, spacing,
  density, typography, font assets, color, borders, radii, shadows, icons,
  imagery, labels, controls, responsive behavior, focus, keyboard behavior,
  feedback, motion, navigation, state transitions, and journey outcomes.
- A **UI parity difference** is a known human-perceptible or behaviorally
  meaningful difference in something UI parity covers, under matched browser,
  viewport, font, asset, theme, locale, context, scenario, and synthetic
  data-fixture conditions. An illustrative data value is never one. "Exact"
  means no known UI parity difference; it does not require identical source
  code, runtime architecture, or raw screenshot bytes.
- UI-controlled content—including labels, instructions, formatting, validation,
  feedback, and error or recovery messages—is part of the exact experience
  contract. Domain record values are synthetic and minimal. Current-source
  comparisons seed the same synthetic values into the source observation
  environment wherever that is cheap. Elsewhere they compare per component and
  per state under representative data, and mark content-derived values as
  illustrative. Never record, replay, or bulk-copy the source's data or content
  into a UI reference to force identical values. Future-state references identify
  any illustrative fixture value explicitly.
- A UI reference is not a production implementation, frontend digital twin,
  integration test environment, production architecture, or proof of
  production readiness.
- Code-first design exists to remove ambiguity about the user experience. Its
  stores, data model, service shape, and runtime structure do not prescribe the
  eventual implementation.
- Keep production requirements canonical in `requirements-doc.md`. Keep the
  final UI/UX specification canonical in `ui-ux-spec.md`; an
  exploratory visualizer brief and review record are supporting clarification
  evidence, not a replacement for either canonical artifact.
- Never use design convenience as proof of a product requirement without
  recording the decision and its evidence.

## 2. Product Design Modes

Use one explicit mode for each design workspace:

- **Current-experience bootstrap:** independently establish a browser-runnable
  UI/UX baseline from a pinned existing frontend revision. Reproduce the
  selected application's distinct current user-facing surfaces and behavior,
  not its production runtime or internal implementation.
- **No-frontend construction:** create the smallest useful experience baseline
  from the team's standard frontend template.
- **Product experience design:** read and preserve the accepted UI reference
  before applying a focused requirements-driven change. Use this mode for a
  request that changes an existing product route, component, screenshot-backed
  surface, or preserved interaction; the result must remain connected to that
  product experience.
- **Explicit refresh/reconciliation:** update an established UI reference to a
  newer selected frontend revision only when requested, and record the
  reconciliation. Where the newer source implements a surface the UI reference
  had changed (an accepted design change that engineering has since
  shipped, possibly differently), the source version wins. An accepted
  design-only change with no source equivalent is preserved, unless the
  request explicitly asks the baseline to match the source.
- **Exploratory requirements visualization:** build the smallest interactive
  or animated experience needed to clarify one abstract or product-independent
  decision for which there is no applicable existing product surface. It is
  review-ready exploratory evidence, not an approved future-state design or a
  final UI/UX specification. Do not use it to replace or imitate an existing
  product route or component; use Product Experience Design for that
  change. Keep its ticket in progress while clarification continues.

Initial current-experience bootstrap is normally a one-time independent stage
for a design workspace. Later requirements-driven work normally belongs to
`product_ui_ux_designer`.

## 3. Source And Technology Selection

- When an existing frontend is selected, identify that application and pin the
  source revision used as the current-experience authority. Do not silently
  change the source boundary or revision. For no-frontend construction, record
  the selected product surface and template instead.
- When a request changes an existing product surface, Product Experience
  Design is the baseline-native path: inspect the accepted product
  experience and preserve unaffected shell, styling, controls, and behavior.
  Exploratory Requirements Visualization is independent by default and must
  not be selected merely because the existing-product requirement is unclear.
- Prefer the source frontend's framework, language, styling system, assets, and
  design-system conventions when they make visual reuse and maintenance easier.
  Matching production package layout, build topology, routing internals, state
  architecture, or service clients is not required.
- For Product Experience Design on an existing product surface, evolve the
  accepted baseline in place within the Product design worktree. Reuse its
  presentation components, styles, tokens, assets, shell, and interaction
  language unless the approved change intentionally replaces one of them. Do
  not create a disconnected replacement application merely to simplify the
  UI reference. A smaller new UI reference is appropriate for
  no-frontend construction or Exploratory Requirements Visualization when no
  applicable existing product surface is in scope.
- Do not copy a complete production frontend merely to claim fidelity. When
  reusing source code, separate UI code from content by what a file holds, not
  by its folder. Content found in `shared/`, `utils/` or `data/` modules is
  still content (see "What a UI reference is"). Choose the
  smallest implementation that can express the complete observable UI
  experience within the selected boundary.
- When no frontend exists, use the host workspace's configured design
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
  item to have applicable source evidence, baseline or design evidence, and a passing
  fidelity result before declaring a current-experience baseline complete.
- Completeness applies to distinct observable behavior, not to a Cartesian
  product of identical roles, data values, feature configurations, runtimes,
  locales, and viewports. One deterministic scenario may substantiate behavior
  that is visibly equivalent across several contexts.
- Cover every distinct item once in the primary configuration (normal desktop
  viewport, default locale). Check narrow viewports, alternate locales, and
  other contexts on a representative sample plus every surface whose layout or
  behavior materially changes in them.
- Represent each context that produces a materially different UI or user
  journey. Record visibly equivalent contexts without rebuilding or retesting
  the same behavior unnecessarily.
- A current-experience bootstrap does not require future-state requirements or
  feature decisions. It discovers the existing experience independently and
  must not introduce unapproved redesign or future behavior.
- Later design changes remain proportional to the concrete product decision
  they must resolve. Missing unrelated design detail does not justify
  expanding a focused requirements-driven change.

## 5. Simplified Implementation And Synthetic State

- Use the simplest credible implementation for the observable contract. The
  default shape is:

  ```text
  runnable UI
      -> UI reference state and scripted transitions
      -> small synthetic fixtures
  ```

- Hard-coded synthetic values are acceptable for isolated presentation
  scenarios. Use a small design-specific store or fixture module when state
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
- Real, recorded, replayed, captured or bulk-copied source data or content is a
  defect wherever it sits in the design repository, including content files
  that copied UI code imports statically. Replace it as described in "What a UI
  reference is".
- Use only synthetic data. UI reference runs must not require production
  credentials, customer data, production exports, live production services, or
  production writes. Mutable state must be locally resettable.

## 6. Experience Fidelity And Evidence

- Reproduce the pinned source's appearance and client-visible behavior exactly
  for every distinct item in the selected current-experience inventory unless
  an accepted design change intentionally differs.
- Use real interface structure and interaction. Do not use page screenshots or
  click hotspots as substitutes for a runnable UI.
- Validate every distinct recorded surface, visible state, interaction pattern,
  and journey outcome in matched source and baseline/design conditions. Equivalent
  permutations may share evidence only when their rendered UI and behavior are
  demonstrably the same.
- Use controlled browser interaction, DOM inspection, computed-style or
  geometry checks, screenshots, and perceptual comparison as appropriate.
  Rendering noise such as subpixel antialiasing does not require raw
  screenshot-byte identity, but any known UI parity
  difference blocks exact current-experience completion.
- A harness that runs the source for comparison (a fake backend, fixture
  server, or capture script) is disposable scaffolding. Give it only the
  fixtures the compared screens need, and when it grows costly, prefer direct
  side-by-side inspection of the affected surfaces.
- Differences in internal stores, protocols, runtimes, or architecture are
  intentional simplifications and do not affect UI/UX fidelity when the visible
  presentation and behavior remain exact.
- Record what the UI reference demonstrates, how technical capabilities are
  simulated, which source revision it reflects, and any user-facing limitation.
- In a user-approved future-state package, final screenshots and the
  corresponding `ui-ux-spec.md` are normative implementation references. Treat
  all visible design details as requirements-defining by default; identify any
  illustrative fixture content or permitted variation explicitly.
- For an exploratory requirements visualizer, browser captures and interaction
  evidence explain the question under review but are not normative final
  references. Record modeled states, mock boundaries, and unresolved questions.
- Capture final reference screenshots only after explicit user confirmation.
  Bootstrap screenshots are current-experience evidence, not approved
  future-state references.

## 7. UI Authority And Responsibility Boundary

- The pinned source frontend is the sole UI/UX authority for a current-
  experience baseline. `ui_baseline_bootstrapper` discovers and reproduces that
  experience; it decides only the simplest baseline implementation, not the
  appearance, behavior, product policy, or future design.
- `product_ui_ux_designer` accepts an applicable baseline and authors a concrete,
  focused future-state UI/UX proposal within the requirements and user
  feedback. After baseline acceptance, it owns the canonical runnable
  experience, review loop, final validation, screenshots, and `ui-ux-spec.md`,
  but it does not approve its own proposal.
- In exploratory requirements-visualization mode, `product_ui_ux_designer` owns
  only the independent visual representation and review evidence. Solution
  Designer owns the canonical requirements clarification loop when it is
  present, and the user remains the approval authority. A concrete change to
  an existing product surface belongs to Product Experience Design.
- The user is the sole approval authority for intentional future-state UI/UX
  and behavior. `solution_designer` preserves that approval, owns canonical
  requirements and acceptance criteria, and integrates the approved UI/UX
  package for downstream implementation.
- No product design role owns the target production architecture or production
  implementation.

## 8. Product Design Repository Boundary

- Each design repository is a separate Git repository, normally a sibling of
  the source repository named `<design-subject>-design`. It is not nested in the
  source repository, a production frontend directory, a Solution Designer worktree, or a generic
  `designs/` or `prototypes/` directory.
- The Product UI/UX Designer owns the design repository and its lifecycle: tickets,
  ticket branches and worktrees, ticket statuses, commits, integration,
  baseline promotion, and cleanup. Its `product-design-repository-management`
  skill defines that lifecycle. Solution Designer may link design artifacts
  but does not manage them.
- Design work writes only to the design repository, through the assigned
  ticket worktree. The source repository may be read, never written. UI reference
  runs never write to production services or use production credentials.
- When the repository or worktree cannot be identified or isolated safely,
  stop and report the exact blocker instead of creating a second project or
  sharing a checkout.
- Record in durable design evidence: the source repository and selected
  frontend, pinned source revision, canonical design repository/root, active
  ticket worktree and branch, accepted base revision, ticket revision, run
  command, scenario-selection method, and major implementation
  simplifications.

## 9. UI Baseline Bootstrapper And Product UI/UX Designer Boundary

- `ui_baseline_bootstrapper` (UI Baseline Bootstrapper) owns only the current-experience baseline: source
  verification and pinning, observable-surface discovery, lightweight
  parity implementation, matched validation, and the baseline report.
- UI Baseline Bootstrapper may create or update baseline files only in the Product
  UI/UX Designer's assigned baseline or ticket worktree. It does not create a
  second worktree, write to the canonical checkout during active
  ticket work, implement future-state requirements, create the canonical
  future-state `ui-ux-spec.md`, conduct the user design review, or approve a
  product decision.
- `product_ui_ux_designer` (Product UI/UX Designer) reviews and tests the Bootstrapper's
  result, commits the accepted baseline in the design repository, and owns
  product-experience future-state changes, user review, final UI/UX artifacts,
  and design commits. In exploratory requirements-visualization mode, it
  owns the exploratory visualizer revisions and review evidence instead.
- The Product UI/UX Designer must not begin future-state work on an unreviewed or
  failed bootstrap result. UI Baseline Bootstrapper must not add design changes while
  correcting current-state parity.
- A no-frontend design repository does not need a Bootstrapper baseline; the Product
  UI/UX Designer establishes the design repository and initial runnable baseline directly.

## 10. Delivery Artifacts And Visual References

- The canonical design repository contains the UI reference,
  project-wide change history, and current-experience bootstrap evidence. Each
  ticket folder under `tickets/` contains `product-ticket.md` and the
  mode-appropriate supporting evidence. A product-experience ticket adds
  `ui-ux-spec.md`, final `visual-references/`, behavior matrix, runbook,
  product design report, assumptions, and other delivery artifacts as needed. An
  exploratory-visualization ticket adds its visualization brief,
  cognition-first design plan, review record, review URL, visualizer source or
  entry-point evidence, motion/comprehension evidence, visual references, and
  unresolved-question record as needed; it does not create a final
  `ui-ux-spec.md` merely for exploration.
- `ui-ux-spec.md` is the canonical detailed experience contract only for a
  product-experience ticket. The product design report is an optional cross-stage
  summary and must not duplicate the UI/UX specification or supporting
  evidence.
- Use `visual-references/` as the umbrella directory. Call an actual captured
  browser image a screenshot, and identify it with a stable `VIS-*` ID and a
  descriptive filename such as
  `VIS-002-filter-panel-open-desktop-1440x900.png`.
- Bootstrap comparison screenshots are current-state evidence. Final visual
  references captured after explicit user approval are normative for the
  approved surface, state, and viewport unless the UI/UX specification marks
  content or variation as illustrative/permitted.
- Every durable artifact must link back to the source pin, design repository
  root/revision, and relevant requirements, behavior, and acceptance IDs when
  those references exist.
