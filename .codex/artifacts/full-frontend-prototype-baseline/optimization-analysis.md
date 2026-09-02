# Full-Frontend Prototype Baseline Optimization Analysis

Review Status: Implemented and validated

## User Request And Scope

Change the existing-frontend prototype bootstrap contract so that the
Prototype Bootstrapper establishes a complete current-state frontend baseline
before the Product Prototyper implements any new requirement.

The requested model is:

1. Select the applicable source frontend application.
2. Reproduce its complete current client experience in the isolated prototype:
   routes, screens, visual appearance, responsive layouts, UI controls,
   client-side interactions, visible states, and supported user journeys.
3. Keep the prototype implementation simpler than production. Production
   services, authentication, persistence, integrations, and data are replaced
   by explicit deterministic mocks and synthetic fixtures.
4. Do not require source-code identity. The acceptance boundary is the
   observable frontend experience, not identical internal implementation.
5. Compare the runnable source frontend and runnable prototype and accept the
   bootstrap only when the current-state parity contract is satisfied.
6. Only after that acceptance may `product_prototyper` apply the focused
   future-state changes required by the current requirements round.

User clarification added after the initial analysis: the shared prototype
principles must make **same observable frontend, simpler prototype internals** a
first-class rule that Bootstrapper reads and applies before work. Production
and prototype code volume, component structure, and internal architecture may
differ substantially. Those are not parity criteria. The prototype may mock or
simplify every non-UI boundary, but it must reproduce 100% of the inventoried
UI/UX appearance, client-side behavior, visible states, and user journeys.

This is a material behavior change from the current bounded-baseline model. The
analysis covers the Requirements Engineering Team package only. It does not
change the Software Engineering Team, department orchestration, the pending
team-board handoff redesign, production implementation, or runtime product
code.

## Current Behavior And Package/File Ownership Baseline

### Effective package topology

- `shared/product-prototype-principles.md` is the canonical shared authority for
  prototype modes, technology, baseline scope, mock boundaries, fidelity,
  workspace isolation, and cross-role responsibility boundaries.
- Both prototype skills load that shared file through role-local symlinks.
- `agents/prototype-bootstrapper/skills/prototype-bootstrapper/SKILL.md` owns
  source inspection, prototype workspace creation, baseline construction,
  deterministic mocks, bootstrap validation, task-result submission, and
  refresh/reconciliation.
- `agents/prototype-bootstrapper/skills/prototype-bootstrapper/templates/prototype-bootstrap-report-template.md`
  is the only durable bootstrap evidence schema.
- `agents/product-prototyper/skills/requirements-prototyper/SKILL.md` owns
  bootstrap routing and result review, subsequent requirements-driven prototype
  evolution, user review, final screenshots, and `ui-ux-spec.md`.
- `agents/requirements-engineer/skills/requirements-engineer/SKILL.md` owns the
  prototype decision gate and the source request sent to Product Prototyper.
- `team.md` owns the short member responsibility and collaboration overview.
- Agent prompts provide thin role identity; configs provide tool and skill
  wiring; product-prototype support templates record future-state design and
  validation evidence.

### Current existing-frontend bootstrap contract

The current package intentionally implements a narrow bootstrap:

- Shared principles require only the **relevant surfaces and critical
  journey**, explicitly saying not to clone the entire product.
- Bootstrapper purpose is the **smallest runnable technical baseline**.
- Bootstrapper ownership and inputs focus on requested baseline surfaces and one
  critical journey.
- Existing Frontend Rules say to reproduce only the relevant baseline journey.
- Validation checks a baseline entry route, a critical journey, requested
  viewports, and relevant states.
- `prototype-bootstrap-report.md` is optional and records only a compact route,
  journey, and validation summary.
- Product Prototyper accepts bootstrap when the relevant journey is runnable,
  technology is truthful, and mocks are explicit.
- Product Prototyper skips bootstrap when a root exists unless a source refresh
  is explicitly requested; it does not require parity evidence for that root.

### Current primary instruction spine

`prototype decision -> resolve root -> bootstrap requested surfaces and critical journey -> review result -> implement focused future-state experience -> user review -> UI/UX package`

### Requested primary instruction spine

`prototype decision -> identify source frontend application and revision -> inventory complete current client experience -> build full mocked current-state parity baseline -> compare source and prototype -> accept or revise bootstrap -> implement focused future-state delta -> validate preservation and requested changes -> user review -> UI/UX package`

## Intended Behavior Contract

### Existing-frontend mode

The baseline unit is one explicitly selected source frontend application, or an
explicitly selected set of applications when the product experience genuinely
crosses them. A monorepo does not implicitly make every frontend application
part of one bootstrap.

For the selected application boundary, **complete current-state frontend
parity** means:

- every supported route and meaningful screen is inventoried;
- navigation, menus, dialogs, forms, controls, tables, filters, search,
  selection, validation, feedback, and other client-side operations reproduce
  the source behavior;
- meaningful loading, empty, populated, permission, validation, error,
  recovery, and completion states are represented;
- supported user journeys and role-dependent client experiences are
  represented;
- typography, color, spacing, layout, hierarchy, assets, controls, icons,
  responsive behavior, focus, keyboard behavior, feedback, and motion match the
  source at the validated viewports to the defined visual-parity standard;
- user-visible results of backend-dependent operations remain equivalent while
  the underlying service behavior is supplied by deterministic mocks;
- the implementation may be recreated, simplified, or selectively reused, but
  must contain real interface structure and interaction rather than screenshots
  or click hotspots;
- code volume, internal layering, and production architecture are not parity
  criteria; the smallest maintainable prototype implementation that satisfies
  the complete observable contract is preferred;
- every inventoried parity item must pass. Any known UI/UX, client-behavior,
  visible-state, or journey discrepancy blocks completed status until it is
  resolved.

This is **100% observable parity within the explicit selected-application
inventory and controlled validation environment**, not identical source code,
backend behavior, internal architecture, or byte-identical screenshot files.

### No-frontend mode

No source experience exists to reproduce. The existing bounded template path
remains appropriate: create only the baseline needed to make the requested
future experience reviewable and state truthfully that no current visual system
was found.

### Existing-prototype evolution

After current-state parity is accepted, Product Prototyper makes only the
requirements-driven future-state changes. Unaffected baseline behavior remains
preserved. The fact that a prototype directory exists is not sufficient proof
that the full baseline is complete.

### Refresh/reconciliation

A later refresh compares a newer source revision with the recorded parity
inventory. It incorporates current-source changes while preserving explicitly
approved prototype deltas. Source-equivalent baseline behavior and intentional
future-state differences must remain distinguishable.

## Preserved Behavioral Invariants And Authority Boundaries

- Product prototyping remains conditional; backend-only or otherwise
  sufficiently specified work does not require a prototype.
- `requirements_engineer` remains the canonical requirements and approval
  owner.
- `product_prototyper` remains the prototype scope, future-state design,
  user-review, final screenshot, and `ui-ux-spec.md` owner.
- `prototype_bootstrapper` remains a delegated technical-baseline specialist and
  does not decide requirements or conduct the user approval loop.
- Only the user approves intended future behavior. Product Prototyper's
  acceptance of a bootstrap task confirms current-state baseline evidence; it
  does not replace user approval of a changed experience.
- The prototype remains isolated from the production project at the approved
  canonical prototype root.
- Existing workspace naming rules, including
  `<prototype-subject>-prototype`, remain unchanged.
- Existing frontend technology and relevant design conventions remain the
  default when practical.
- No production credentials, personal/customer data, production exports,
  production writes, or live production service dependencies enter the
  prototype.
- Mock boundaries remain explicit and deterministic.
- A prototype remains evidence of frontend experience, not evidence of
  production backend, security, scalability, reliability, or operational
  readiness.
- Existing accepted prototype changes are preserved during refresh unless the
  user or revised requirements basis explicitly changes them.
- Current task-result and team-message routing remains unchanged in this
  optimization.
- No commit, push, merge, release, deployment, or sibling-repository change is
  part of this optimization.

## Instruction Ledger

| Behavior | Preconditions | Required Action | Output / Exit | Authoritative Owner | Evidence |
| --- | --- | --- | --- | --- | --- |
| Choose existing-frontend parity mode | Selected source frontend exists | Identify exact application/root/revision | Fixed baseline boundary | Shared principles; Requirements request | User request; current modes |
| Inventory current client experience | Existing-frontend mode | Inspect router, screens, navigation, roles, states, tests, runtime, and supported journeys | Complete traceable inventory | Bootstrapper skill | Source inspection tools and browser tools exist |
| Reproduce visual and behavioral baseline | Inventory exists | Implement each inventoried surface, state, interaction, and journey | Runnable prototype current-state baseline | Bootstrapper skill | User request |
| Mock non-UI boundaries | Backend-dependent frontend behavior exists | Put deterministic service/auth/persistence/integration behavior behind adapters/fixtures | Same visible outcomes without production dependency | Shared principles; Bootstrapper skill | Existing mock contract |
| Prove parity | Source and prototype can be exercised | Compare routes, states, journeys, viewports, visuals, and interactions | Completed report or precise blocker | Bootstrapper report and quality gate | User acceptance request; browser tools |
| Review bootstrap result | Bootstrapper submits result | Product Prototyper checks inventory, report, runnable state, and every parity result | Accept only when every inventoried item passes; otherwise request revision | Product Prototyper skill | Existing `review_task_result` lifecycle |
| Prevent premature feature work | Existing frontend baseline unaccepted | Keep future-state work blocked | Accepted baseline or blocker | Product Prototyper skill | User sequencing requirement |
| Evolve future state | Baseline accepted | Apply only requested changes and preserve unaffected baseline behavior | User-reviewable future-state prototype | Product Prototyper skill | Existing evolution contract |
| Refresh later source revisions | Source revision changes or parity evidence is stale | Reconcile source changes against inventory while preserving approved deltas | Updated parity evidence and prototype | Shared principles; Bootstrapper skill | Existing refresh contract |

## Macro Analysis

### Package Topology And Ownership

The topology is sound. No new skill, helper agent, script, or runtime reference
file is needed. The behavior should be repaired in the existing owners:

- shared principles for the cross-role distinction between complete baseline
  parity and focused future-state scope;
- Bootstrapper skill for inventory, construction, comparison, recovery, and
  completion;
- bootstrap report template for durable parity evidence;
- Product Prototyper skill for complete-baseline routing and review;
- Requirements Engineer skill for identifying the selected source frontend in
  the prototype request;
- team board for the short responsibility description.

The complete parity algorithm should not be copied into prompts, `team.md`, or
Product Prototyper. Those files need only the minimum ownership or routing
statement required for their distinct responsibility.

### Authoritative Sources And Boundaries

The shared principles are the correct owner for the rule that an
existing-frontend bootstrap is complete while later requirements-driven
prototype changes remain focused. Without this explicit mode boundary, the
current phrase “keep the prototype proportional” conflicts with the requested
complete baseline.

The same shared owner must also state the implementation-freedom principle:
frontend parity is judged from the client experience, while code volume,
production layering, and real service behavior are deliberately outside the
parity contract. Bootstrapper already reads this canonical shared reference
through its role-local symlink, so the correction should strengthen that owner
rather than copy a second full principle into the specialist skill.

The Bootstrapper skill must own the detailed parity workflow and gate. Product
Prototyper owns independent acceptance of the task result, not construction.
The report template owns the evidence schema rather than duplicating inventory
tables throughout prose.

### Logical Flow And Content Architecture

The current workflow begins construction before defining completeness. A
complete baseline requires an inventory result before implementation and an
itemized comparison before completion.

The repaired Bootstrapper flow should be:

1. Resolve source application, revision, runtime prerequisites, prototype root,
   and mode.
2. Inspect source code and, when runnable, the live current frontend.
3. Produce the route/surface/state/interaction/journey/viewport inventory.
4. Establish deterministic scenario fixtures and mock-boundary mapping.
5. Recreate the current client experience across that inventory.
6. Run source and prototype, compare item by item, and record evidence.
7. Resolve every failed parity item or report a blocked result.
8. Submit the runnable root and mandatory existing-frontend parity report.

Product Prototyper should then:

1. detect missing, stale, or incomplete parity evidence even when the directory
   already exists;
2. delegate initial bootstrap, parity completion, or refresh as appropriate;
3. accept only a complete, runnable, evidence-backed baseline;
4. begin the focused requirements-driven change after acceptance.

### Behavioral Grounding And Tool Support

The user explicitly requested complete current-state appearance, client
behavior, and journey parity with mocked data and services.

The current agent configs ground the necessary operation classes:

- file inspection and editing;
- shell commands and long-running source/prototype processes;
- browser navigation and DOM inspection;
- JavaScript execution;
- screenshots;
- viewport emulation;
- task delegation, submission, and review between the two prototype roles.

These tools support source/prototype comparison, but no existing tool or script
proves raw byte-identical screenshots automatically. The skill should define
100% parity against the explicit observable inventory in a controlled browser,
viewport, asset, font, fixture, role, and feature-configuration environment.
Every inventoried item must pass; a known UI/UX or client-behavior discrepancy
blocks completion. Raw image-byte differences caused only by normalized browser
rendering noise are not a substitute for that experience-level judgment, and
source reachability, feature flags, roles, or hidden states must not be omitted
silently.

### Outputs, Validation, Recovery, And Handoff

For an existing frontend, `prototype-bootstrap-report.md` can no longer be
optional because it is the acceptance evidence for a potentially large one-time
baseline. It should record:

- selected source application and revision;
- source and prototype commands and URLs;
- route and surface inventory;
- role and supported journey inventory;
- state and client-interaction coverage;
- validated viewports;
- source/prototype visual and behavior comparison;
- deterministic scenarios and mock boundaries;
- deliberate implementation simplifications;
- every difference, coverage limitation, and blocker;
- an explicit all-inventory-items-passed parity completion result.

No new artifact is required. Expanding the existing report avoids a second
manifest that could drift.

Recovery paths should be explicit:

- missing source application identity or revision -> return a precise gap;
- source cannot be started or authoritative current-state evidence is
  insufficient -> block parity completion rather than infer the full product;
- existing prototype lacks complete parity evidence -> delegate parity
  completion/reconciliation rather than skip bootstrap;
- any failed visual, client-behavior, visible-state, or journey comparison ->
  request revision on the same bootstrap task;
- production dependency cannot be safely mocked -> report blocker and affected
  inventory item;
- later source refresh intersects an approved prototype change -> preserve and
  label the intentional delta rather than silently overwriting it.

The existing task-result lifecycle is adequate and should remain unchanged.

## Micro Analysis

### Wording And Terminology

Use these terms consistently:

- **selected source frontend application**: the exact application boundary being
  reproduced, not automatically the whole monorepo;
- **current-state parity baseline**: the runnable prototype before new
  requirements are applied;
- **future-state delta**: the focused requirements-driven change made after
  baseline acceptance;
- **visual parity**: equivalent visible composition and presentation at defined
  viewports, including layout, spacing, typography, colors, assets, controls,
  and responsive behavior;
- **client-behavior parity**: equivalent user actions, navigation, validation,
  state transitions, feedback, keyboard/focus behavior, and visible outcomes;
- **mock boundary**: a deterministic substitute for production service,
  persistence, authentication, data, or integration behavior;
- **intentional delta**: an approved future-state difference from the source
  baseline;
- **parity discrepancy**: any known difference between the source and prototype
  for an inventoried UI/UX appearance, client behavior, visible state, or user
  journey. A discrepancy blocks completed status until resolved.

Avoid using **whole product** when the intended unit is a selected frontend
application. Avoid using **smallest baseline** in existing-frontend mode. Keep
**focused** and **proportional** for the future-state delta and no-frontend
mode.

### Qualifiers, Conditions, And Exceptions

- Complete parity applies only to existing-frontend bootstrap and applicable
  refresh/completion work.
- No-frontend bootstrap remains bounded because there is no existing current
  experience to clone.
- Source-code reuse is optional; 100% observable parity across the explicit
  inventory is mandatory.
- Code volume, internal architecture, component structure, and backend realism
  are not parity criteria. Prefer the simplest maintainable implementation that
  passes the observable contract.
- Backend and external operations are mocked; their user-visible client states
  and outcomes still require parity.
- Other frontend applications in a monorepo are excluded unless explicitly
  selected as part of the same product experience.
- An existing directory is reusable only when its source revision, parity
  inventory, and completion evidence are applicable.
- Intentional future-state changes are not parity defects, but they must be
  distinguished from source-equivalent behavior.
- If the source frontend cannot be exercised, completion requires sufficient
  authoritative evidence for the full inventory; otherwise the result is
  blocked or explicitly incomplete.

### Redundancy, Transitions, And Economy

- Keep one full cross-role parity principle in the shared reference.
- Keep detailed inventory/build/compare instructions only in Bootstrapper.
- Keep only bootstrap selection and result-acceptance rules in Product
  Prototyper.
- Keep only the selected-source prerequisite in Requirements Engineer.
- Keep only the high-level responsibility boundary in `team.md`.
- Put inventory and parity tables in the existing report template, not as large
  schemas in `SKILL.md`.
- Move the real-interface/no-screenshot-hotspot principle to the shared file
  because both roles must obey it; remove the duplicate Product Prototyper-only
  copy after the move.
- Do not expand other product-prototype templates unless they need one concise
  link or path to the mandatory bootstrap report.

### Negative And Prohibitive Sentence Disposition

| Current boundary | Disposition | Reason |
| --- | --- | --- |
| Prototype is not production implementation or proof of production readiness | Keep | Protects a distinct architecture and assurance boundary. |
| Never use prototype convenience as proof of a requirement | Keep | Protects user authority and requirements grounding. |
| Refresh only when required; never overwrite accepted behavior silently | Keep and sharpen | Refresh remains conditional, but parity evidence must also trigger completion/reconciliation when stale or missing. |
| Do not switch source frontend technology merely for familiarity | Keep | Prevents fidelity loss and unsupported deviation. |
| Do not clone the entire product when unrelated screens do not affect the decision | Remove/replace | Directly contradicts the requested complete existing-frontend baseline. Replace with the selected-application boundary so unrelated apps and server scope remain excluded. |
| Preserve accepted prototype behavior unless explicitly changed | Keep | Protects approved future-state work during evolution and refresh. |
| Do not use credentials, personal/customer data, or production exports | Keep | Security and privacy boundary. |
| Preserve visual language unless approved request changes it | Update | Existing baseline requires parity; the exception applies only to intentional future-state deltas. |
| Screenshots count as evidence only for validated runnable states | Keep | Prevents misleading evidence. |
| Do not write to production services or depend on production credentials | Keep | Safety and isolation boundary. |
| No prototype role owns production architecture or implementation | Keep | Ownership boundary. |
| Bootstrapper does not own requirements, user decisions, or future feature behavior | Keep | Separation of concerns; baseline completeness does not expand product authority. |
| Do not write prototype files into production unless explicitly assigned | Keep | Workspace isolation boundary. |
| Do not silently fall back to a different technology | Keep | Recovery must be explicit and reviewed. |
| Reproduce only the relevant journey, not unrelated scope | Remove/replace | Direct conflict. Replace with complete selected-application parity. |
| Copied/shared code is not proof of service or persistence equivalence | Rewrite | Preserve the boundary, but state the positive contract: code identity and volume are irrelevant; complete observable client parity plus mock isolation require evidence. |
| Do not imply a no-frontend template represents an existing design system | Keep | Factual-grounding boundary for no-frontend mode. |
| Never replace a refreshed prototype wholesale without recording preservation and change | Keep and extend | Needed to protect intentional prototype deltas against source refresh. |
| No production credentials or writes in Bootstrapper gate | Keep | Safety gate. |
| Do not claim completion when blocked or materially untested | Sharpen | Define incomplete route/journey/visual/client-behavior coverage as blocked, not completed. |
| Bootstrap report does not replace requirements or UI/UX spec | Keep | Artifact ownership boundary. |
| Product Prototyper must not create a competing requirements doc | Keep | Canonical ownership boundary. |
| Do not create optional reports merely to duplicate other artifacts | Keep | Economy boundary; the mandatory parity report gains a distinct acceptance purpose. |
| Never use temporary screenshot paths for final references | Keep | Durable evidence boundary. |
| Alternate and failure states only when they affect the product decision | Qualify | Keep for future-state additions; existing-frontend baseline must cover supported current states even when the new requirement does not change them. |
| Do not build a prototype when static evidence is sufficient | Keep | Preserves the conditional prototype gate. Once prototyping is selected for an existing frontend, full baseline parity applies. |
| Do not start feature work on an unreviewed or blocked bootstrap | Keep and strengthen | This becomes the explicit parity-before-delta gate. |
| Prototype change IDs are never reused | Keep | Traceability boundary. |
| Remove obsolete UI rather than retain unrequired compatibility behavior | Keep | Prevents stale future-state behavior; baseline preservation remains governed by approved requirements. |
| Do not use generated images or screenshot hotspots as UI | Move to shared and keep | Becomes essential to both bootstrap parity and later prototyping. |
| Do not present unapproved behavior as confirmed | Keep | User-authority boundary. |
| Do not convert prototype convenience into a requirement | Keep | Requirements-integrity boundary. |
| Do not rewrite canonical requirements when evidence conflicts | Keep | Ownership and recovery boundary. |
| Do not substitute task-result tools for normal team handoff | Keep unchanged in this scope | Coordination lifecycle is outside this parity optimization and has a separate pending analysis. |
| After handoff, do not poll | Keep unchanged in this scope | Runtime coordination boundary; unrelated to parity. |
| Only the user approves intended behavior | Keep | Task-result acceptance of parity is not product approval. |
| Do not use Codex-native collaboration tools internally | Keep unchanged in this scope | Existing team communication rule; separate coordination redesign remains pending. |

## Findings And Evidence

### Macro Findings

#### M1 - Existing baseline scope directly contradicts the requested contract

- Severity: Critical
- Evidence:
  - shared principles: reproduce relevant surfaces and critical journey; do not
    clone the entire product;
  - Bootstrapper purpose: smallest runnable technical baseline;
  - Bootstrapper Existing Frontend Rules: reproduce only the relevant journey.
- Impact: the current agent is expected to stop with most current routes,
  screens, journeys, states, and client behaviors unrepresented.

#### M2 - Completeness is undefined before construction

- Severity: High
- Evidence: Bootstrapper inspects entrypoints and routing but produces no
  required route/surface/state/interaction/journey inventory.
- Impact: neither Bootstrapper nor Product Prototyper can prove what “complete”
  covers or identify omissions reliably.

#### M3 - Bootstrap evidence is optional and too narrow

- Severity: High
- Evidence: the report is created only when useful and contains one routes field,
  one critical journey, and a compact validation summary.
- Impact: Product Prototyper lacks durable evidence for accepting a full
  current-state baseline or later reconciling a source revision.

#### M4 - Product Prototyper's acceptance gate validates only a critical journey

- Severity: High
- Evidence: current review accepts a runnable baseline when technology,
  relevant journey, and mock boundaries are satisfactory.
- Impact: bootstrap can be accepted before visual, client-behavior, route, and
  journey parity is complete.

#### M5 - Existing directory presence is mistaken for baseline readiness

- Severity: High
- Evidence: Product Prototyper skips initial bootstrap whenever the root exists,
  except for explicit refresh/reconciliation.
- Impact: partial, stale, or pre-contract prototypes can receive future-state
  changes without a trustworthy current-state foundation.

#### M6 - Baseline completeness and future-state proportionality are conflated

- Severity: High
- Evidence: shared and Product Prototyper rules use “smallest,” “focused,” and
  “proportional” without distinguishing bootstrap mode from later change scope.
- Impact: applying the correct future-state economy rule to initial bootstrap
  produces an intentionally incomplete baseline.

#### M7 - Mocking preserves boundaries but not explicitly every visible outcome

- Severity: Medium
- Evidence: the current rule keeps visible behavior real only where it matters
  to the requested baseline or product decision.
- Impact: existing client states outside the immediate requirement can be
  omitted even though they are part of the requested full baseline.

#### M8 - Visual fidelity has no source/prototype comparison contract

- Severity: High
- Evidence: current rules preserve visual language and validate requested
  viewports but do not require itemized source/prototype comparison.
- Impact: generic approximations can pass without proving matching layout,
  styling, responsive presentation, or interaction behavior.

#### M9 - Refresh cannot distinguish baseline parity from approved deltas

- Severity: Medium
- Evidence: refresh preserves accepted changes but the report has no
  source-equivalent versus intentional-delta classification.
- Impact: refresh can either overwrite approved designs or misclassify deliberate
  future-state differences as parity defects.

#### M10 - Runtime tool wiring is sufficient

- Severity: None / keep
- Evidence: both prototype roles have file, shell, process, browser, DOM,
  script, screenshot, and viewport tools; Product Prototyper also has task
  delegation and review tools, and Bootstrapper has task submission.
- Impact: no config or product-runtime change is required for this instruction
  redesign.

### Micro Findings

#### m1 - “Relevant” and “critical” are scope-reducing qualifiers

- Severity: High
- Evidence: they appear throughout baseline ownership, inputs, build steps,
  validation, report fields, and acceptance.
- Impact: local sentence edits will not work unless every baseline-stage use is
  reviewed and either removed or restricted to no-frontend/future-state work.

#### m2 - “Whole frontend” is ambiguous in a monorepo

- Severity: Medium
- Evidence: the naming rules already distinguish the relevant frontend
  application from the repository.
- Impact: saying “entire product” could unintentionally require cloning every
  application in a multi-application repository. Use the selected source
  frontend application boundary.

#### m3 - “100%” is not operationally defined

- Severity: Medium
- Evidence: no current inventory, supported-role/configuration boundary,
  comparison matrix, or visual tolerance exists.
- Impact: agents can either overclaim completeness or confuse screenshot-byte
  identity with UI/UX equality. Define a controlled validation environment,
  explicit observable inventory, all-items-pass gate, and blocked treatment for
  every unknown or failed item.

#### m4 - “Same code” and “same experience” need separation

- Severity: High
- Evidence: current rules discuss optional source-code reuse only in relation to
  service/persistence evidence.
- Impact: the agent may either copy production internals unnecessarily or treat
  a smaller prototype as permission to reduce the UI/UX. State that the
  simplest maintainable internal implementation is preferred while every
  inventoried client-visible item must still pass.

#### m5 - “Screenshots” have two different roles

- Severity: Low
- Evidence: Bootstrapper needs comparison screenshots; Product Prototyper owns
  final user-approved UI/UX reference screenshots.
- Impact: bootstrap validation images could be mistaken for final design
  references. Label bootstrap images as current-state comparison evidence.

## Proposed Improvements

### Macro Actions, In Order

#### 1. Restructure - split full baseline parity from focused future-state scope

- Action: `Restructure`
- Affected file: `agent-teams/requirements-engineering-team/shared/product-prototype-principles.md`
- Change:
  - make complete current-state parity mandatory for existing-frontend bootstrap;
  - preserve bounded construction for no-frontend mode;
  - preserve focused/proportional changes after baseline acceptance;
  - define visual parity, client-behavior parity, mock equivalence, selected-app
    boundary, comparison evidence, completion, and blocked recovery;
  - define **same observable frontend, simpler prototype internals**: code
    volume, component structure, layering, and backend realism may differ, but
    every inventoried UI/UX and client-behavior item must pass;
  - move the real-interface/no-screenshot-hotspot rule here.
- Expected effect: both prototype roles share one unambiguous mode contract.

#### 2. Restructure - make Bootstrapper a parity-baseline specialist

- Action: `Restructure`
- Affected file:
  `agents/prototype-bootstrapper/skills/prototype-bootstrapper/SKILL.md`
- Change:
  - update frontmatter description and purpose;
  - replace requested-surface ownership with full selected-application
    inventory and parity ownership;
  - require source application/root/revision, run prerequisites, supported
    roles/configurations, prototype root, and evidence paths when applicable;
  - add inventory before construction;
  - require real client structure/behavior with deterministic mocked boundaries;
  - require source/prototype comparison across routes, journeys, states,
    interactions, visuals, and viewports;
  - prefer the simplest maintainable mocked implementation that achieves the
    complete observable experience;
  - define every failed or unknown parity item as blocked completion;
  - keep no-frontend behavior explicitly bounded;
  - preserve accepted intentional deltas during refresh.
- Expected effect: the Bootstrapper reaches the current product state before
  future requirements are introduced.

#### 3. Update - make parity evidence mandatory and reviewable

- Action: `Update`
- Affected file:
  `agents/prototype-bootstrapper/skills/prototype-bootstrapper/templates/prototype-bootstrap-report-template.md`
- Change:
  - require the report for existing-frontend bootstrap, parity completion, and
    refresh;
  - add selected application and source/prototype runtime identity;
  - add route/surface, role/journey, state/interaction, and viewport inventories;
  - add source/prototype visual and behavior comparison matrices;
  - add mock-boundary mapping and intentional-delta classification;
  - add explicit all-items-pass completeness checks and discrepancy status.
- Expected effect: Product Prototyper has one durable acceptance basis; refresh
  has a stable comparison baseline.

#### 4. Restructure - gate Product Prototyper work on accepted parity

- Action: `Restructure`
- Affected file:
  `agents/product-prototyper/skills/requirements-prototyper/SKILL.md`
- Change:
  - distinguish complete existing-frontend baseline from focused future-state
    delta;
  - treat a missing/stale/incomplete parity report as a bootstrap completion or
    reconciliation trigger even when the directory exists;
  - expand the bootstrap packet with the selected source application, source
    revision/run context, parity expectation, supported roles/configurations,
    and exact prototype root;
  - accept only when the report, runnable prototype, inventories, comparison
    evidence, and mock boundaries agree and every inventoried parity item passes;
  - keep feature work blocked until acceptance;
  - preserve all unaffected baseline behavior during later focused changes;
  - require the still-relevant bootstrap report in final evidence.
- Expected effect: new product design begins from a trustworthy clone of the
  current client experience rather than a partial scaffold.

#### 5. Update - identify the source frontend in the requirements prototype request

- Action: `Update`
- Affected file:
  `agents/requirements-engineer/skills/requirements-engineer/SKILL.md`
- Change: when prototyping an existing frontend, include the selected frontend
  application/root, source revision, available run instructions/current-state
  evidence, known roles/configurations, and existing prototype root when known.
- Expected effect: monorepo and multi-frontend tasks enter prototyping with an
  explicit baseline boundary without shifting frontend inventory work to the
  Requirements Engineer.

#### 6. Update - align the short team responsibility contract

- Action: `Update`
- Affected file: `agent-teams/requirements-engineering-team/team.md`
- Change:
  - describe Bootstrapper as owning complete current-state parity for the
    selected existing frontend;
  - describe Product Prototyper as applying focused future-state changes after
    baseline acceptance;
  - update the collaboration-flow sentence from a generic bounded baseline to
    initial parity, parity completion, or refresh.
- Expected effect: team-level ownership agrees with specialist skills without
  duplicating the parity algorithm.

#### 7. Update - align Bootstrapper identity metadata without duplicating workflow

- Action: `Update`
- Affected file:
  `agents/prototype-bootstrapper/agent.md`
- Change: update the short description/identity to mention complete
  current-state frontend parity in existing-frontend mode while leaving all
  detailed procedure in the skill.
- Expected effect: metadata and runtime identity no longer imply a narrow
  baseline.

#### 8. Keep - configs and unrelated templates

- Action: `Keep`
- Affected boundaries:
  - both prototype `agent-config.json` files;
  - `team-config.json`;
  - Requirements Engineer templates;
  - Product Prototyper's experience story, behavior matrix, assumptions, change
    log, runbook, product report, and UI/UX spec templates, except for a concise
    bootstrap-report link if final cross-file review proves it necessary;
  - all Software Engineering Team and department files.
- Reason: current tools and membership support the workflow; the existing
  bootstrap report is sufficient as the parity evidence owner; future-state
  artifacts have distinct responsibilities.
- Expected effect: no package residue or unrelated behavior churn.

### Micro Actions, In Order

#### 9. Update - replace scope-reducing baseline language

- Action: `Update`
- Affected boundary: shared principles, Bootstrapper skill/report, Product
  Prototyper bootstrap routing/review, team responsibility summary
- Change: replace existing-frontend uses of “smallest,” “requested surfaces,”
  “relevant journey,” and “critical journey only” with the complete
  selected-application parity contract. Retain those qualifiers for no-frontend
  construction and future-state changes.
- Expected effect: conditions no longer silently reverse the requested behavior.

#### 10. Add - precise parity vocabulary and completion criteria

- Action: `Add`
- Affected boundary: shared principles and Bootstrapper quality gate
- Change: define route/surface coverage, client-behavior parity, visual parity,
  supported journey/role coverage, mock equivalence, intentional deltas, and
  parity discrepancies.
- Expected effect: “same frontend” becomes reviewable rather than aspirational.

#### 11. Move - real-interface rule to shared principles

- Action: `Move`
- Affected files: Product Prototyper skill -> shared principles
- Change: make the prohibition against generated-image/screenshot-hotspot UI a
  shared rule and remove the role-local duplicate.
- Expected effect: Bootstrapper cannot satisfy visual parity with a nonfunctional
  image while Product Prototyper continues to inherit the same protection.

#### 12. Keep - distinct safety, authority, and artifact boundaries

- Action: `Keep`
- Affected boundary: all reviewed runtime Markdown
- Change: retain the negative rules classified `Keep` above; narrow or move only
  the rules whose scope changes.
- Expected effect: increased baseline scope does not weaken user approval,
  security, isolation, production-readiness, canonical-artifact, or handoff
  boundaries.

## Assumptions And Open Questions

### Assumptions proposed for approval

1. **Frontend boundary:** “whole frontend” means the complete selected source
   frontend application, not every frontend application in a monorepo unless
   the work packet explicitly selects more than one.
2. **Observable completeness:** completion covers every supported and
   discoverable route, meaningful surface, state, client interaction, role, and
   user journey for that application, based on source routing, navigation,
   tests, code paths, documentation, and runnable behavior.
3. **Visual standard:** “same appearance” means every inventoried visual item
   passes in a controlled validation environment at the defined viewports. Use
   pixel-level or screenshot comparison where practical. Raw image-byte changes
   caused solely by normalized browser-rendering noise are not UI/UX
   differences, but any known perceived discrepancy blocks completion.
4. **Implementation freedom:** production frontend code may be reused or
   recreated. Code amount, component structure, and internal architecture may
   differ substantially and are not acceptance criteria. Prefer the simplest
   maintainable prototype implementation that passes the complete observable
   contract.
5. **Mocking:** service, data, authentication, persistence, and integration
   internals may be simpler and deterministic, but their client-visible states
   and outcomes must match the source baseline across every inventoried item.
6. **Sequencing:** no requirements-driven feature or design work begins until
   Product Prototyper accepts the parity baseline.
7. **Approval:** parity acceptance is a task-quality decision by Product
   Prototyper; explicit user approval remains required for intended future-state
   behavior.
8. **Evidence:** bootstrap comparison screenshots are validation evidence, not
   the final user-approved UI/UX reference screenshots.
9. **Existing prototypes:** a pre-existing prototype without current applicable
   parity evidence must undergo parity completion/reconciliation.
10. **Concurrency:** this optimization does not design concurrent branch or
    worktree management for multiple simultaneous changes to the same canonical
    prototype project. Existing repository/workspace isolation rules continue
    to apply; a separate concurrency design may be needed later.

### Open questions surfaced, not silently decided

- If the source frontend cannot run, is complete source/code/test/design
  evidence sufficient for a completed parity claim, or must the bootstrap remain
  blocked until the source can be exercised? The proposed safe default is to
  block whenever full observable parity cannot be substantiated.
- If the selected product journey crosses multiple separately deployed frontend
  applications, should one prototype root reproduce all selected applications
  or should each have its own `<prototype-subject>-prototype` project? The
  proposed default follows the previously approved application-based naming
  rule and requires explicit multi-application selection.
- If acceptance must additionally require zero-tolerance raw pixel-file
  identity, the runtime needs a fixed browser/OS/font environment and numeric
  image-diff rules. The proposed contract instead requires 100% inventoried
  UI/UX parity and zero known perceived or behavioral discrepancy; it does not
  confuse anti-aliasing or image encoding noise with a product difference.

Approval of this plan will be treated as approval of the stated assumptions,
not as a decision on the unresolved exceptional cases beyond their proposed
safe defaults.

## Risks

- A full application baseline can be substantially larger and slower than the
  current critical-journey bootstrap. This is an intentional one-time cost of
  the requested workflow.
- Hidden routes, feature flags, permission combinations, remote configuration,
  and unavailable services can make an unbounded universal claim unknowable.
  The explicit inventory and blocked treatment for unknown items make 100%
  completion meaningful within the selected application contract.
- Copying the production frontend wholesale could retain live services or
  production assumptions. Explicit mock boundaries and no-production checks
  remain mandatory even when source code is reused.
- Recreating rather than reusing UI code can introduce visual drift. Required
  source/prototype comparison mitigates this.
- A large report can become noise if it repeats future-state UI/UX artifacts.
  Restrict it to current-state inventory, parity evidence, mocks, gaps, and
  intentional deltas.
- Source refresh can conflict with approved prototype changes. The report must
  distinguish source-equivalent baseline behavior from intentional deltas.
- Existing uncommitted branch work could be overwritten by a broad edit. Any
  implementation must preserve the current working tree and apply only the
  approved focused hunks.

## Validation Plan

After explicit approval and implementation:

1. Run the standard skill validator against:
   - `requirements-engineer`;
   - `requirements-prototyper`;
   - `prototype-bootstrapper`.
2. Parse all three relevant agent configs and `team-config.json`; confirm skill
   names, member names, and tool capabilities remain valid.
3. Resolve every Markdown link and both shared-principles symlinks.
4. Confirm the shared reference is the sole full cross-role parity authority.
5. Search existing-frontend runtime instructions for stale narrow-baseline
   language, including:
   - `smallest runnable technical baseline`;
   - `requested baseline surfaces and critical journey`;
   - `reproduce only the relevant baseline journey`;
   - skipping bootstrap solely because the root exists;
   - optional existing-frontend bootstrap reporting.
6. Confirm narrow/proportional language remains correctly scoped to
   no-frontend work and future-state deltas.
7. Assert the effective flow:
   - Requirements Engineer identifies the selected source frontend;
   - Product Prototyper delegates when parity evidence is absent, incomplete, or
     stale;
   - Bootstrapper inventories before construction;
   - Bootstrapper compares source and prototype;
   - every failed or unknown parity item blocks completion;
   - Product Prototyper reviews and accepts before feature work.
8. Confirm the bootstrap report template includes source identity, route/surface
   inventory, role/journey inventory, state/interaction inventory, viewport and
   visual comparison, mocked boundaries, intentional deltas, completeness, and
   gaps.
9. Confirm every retained negative instruction still protects a distinct
   safety, authority, recovery, validation, or output boundary.
10. Confirm no workflow detail is duplicated into agent prompts or `team.md`.
11. Compare the final effective package against every preserved invariant and
    approved assumption.
12. Perform the required macro behavior/structure review pass.
13. Perform the required micro economy/coherence review pass.
14. Run `git diff --check` and inspect the focused diff so pre-existing branch
    changes are not overwritten.

Static package validation cannot prove real application parity. The first live
existing-frontend bootstrap after this change should exercise the new inventory,
comparison, revision, and acceptance gates and record any runtime limitation.

Target skill files changed during analysis: None

Analysis artifact:
`.codex/artifacts/full-frontend-prototype-baseline/optimization-analysis.md`

## Post-Approval Implementation And Validation Record

- Approval recorded: After the analysis was revised to make **same observable
  frontend, simpler prototype internals** explicit, the user replied, “Cool,
  now I approve, thanks.”
- Target files changed:
  - `agent-teams/requirements-engineering-team/shared/product-prototype-principles.md`
  - `agent-teams/requirements-engineering-team/agents/prototype-bootstrapper/skills/prototype-bootstrapper/SKILL.md`
  - `agent-teams/requirements-engineering-team/agents/prototype-bootstrapper/skills/prototype-bootstrapper/templates/prototype-bootstrap-report-template.md`
  - `agent-teams/requirements-engineering-team/agents/prototype-bootstrapper/agent.md`
  - `agent-teams/requirements-engineering-team/agents/product-prototyper/skills/requirements-prototyper/SKILL.md`
  - `agent-teams/requirements-engineering-team/agents/requirements-engineer/skills/requirements-engineer/SKILL.md`
  - `agent-teams/requirements-engineering-team/team.md`
- Behavior preserved or intentionally changed:
  - Replaced the narrow requested-surface/critical-journey existing-frontend
    bootstrap with 100% observable parity across the complete recorded selected
    application inventory.
  - Made code volume, component structure, layering, production architecture,
    and source-code identity explicitly irrelevant to parity acceptance; the
    simplest maintainable prototype implementation is preferred.
  - Preserved real UI structure and client-visible behavior while keeping
    service, persistence, authentication, data, and integration boundaries
    deterministic and mocked.
  - Added source-versus-prototype inventory and comparison before completion.
  - Made `prototype-bootstrap-report.md` mandatory for existing-frontend
    bootstrap, parity completion, and refresh.
  - Made every failed or unsubstantiated inventory item block completed status.
  - Prevented Product Prototyper from starting requirements-driven future-state
    work until it accepts an applicable complete parity result.
  - Distinguished existing-frontend acceptance from the bounded no-frontend
    path.
  - Preserved conditional prototyping, requirements and approval ownership,
    workspace naming and isolation, technology selection, security/privacy
    boundaries, intentional-delta preservation, final screenshot ownership, and
    the current task-result/message lifecycle.
- Validation performed and result:
  - Standard `quick_validate.py` passed for `requirements-engineer`,
    `requirements-prototyper`, and `prototype-bootstrapper`: `Skill is valid!`
    for all three.
  - All three agent configs and `team-config.json` parsed; configured skill names,
    member names, and coordinator identity resolved.
  - Required file, shell, process, browser, DOM, script, screenshot, viewport,
    delegation, review, and task-result tool wiring was present.
  - All reviewed Markdown links resolved, including the newly linked bootstrap
    report template.
  - Both role-local shared-principles symlinks resolved to the canonical shared
    reference.
  - Assertions passed for the 100% parity authority, simpler-internals boundary,
    inventory-before-implementation flow, controlled comparison, runnable source
    gate, all-items-pass completion, mandatory parity evidence, conditional
    delegation, no-frontend acceptance, parity-before-future-state gate,
    Requirements Engineer source-app input, and team ownership summary.
  - Search found no stale existing-frontend rules for the smallest technical
    baseline, requested-surface-only reproduction, critical-journey-only
    reproduction, optional parity evidence, or bounded initial baseline.
  - The real-interface/no-screenshot-hotspot cross-role rule has one shared
    authority.
  - `git diff --check` passed.
  - No live product bootstrap was launched; static package validation cannot
    prove parity against a real application.
- Working-tree note: this branch already contained other approved uncommitted
  changes, including earlier Requirements Engineering cleanup and prototype
  workspace naming. This implementation preserved that working tree and made no
  commit, push, merge, release, deployment, or sibling-repository change.

## Macro Review Pass

- Invariants checked: Conditional prototype entry, selected-application boundary,
  complete existing-frontend parity, bounded no-frontend construction, simpler
  mocked internals, real client experience, user authority, canonical artifact
  ownership, source/app revision identity, stable isolated root, intentional
  delta preservation, and task lifecycle all have explicit owners.
- Grounding issues: None found. The configured tools support the required file,
  process, browser, screenshot, and task operations. The instructions avoid
  claiming automated byte-identical screenshot proof and instead require a
  controlled observable inventory with every item passing.
- Flow or ownership issues: Resolved. Shared principles own the cross-role parity
  contract; Bootstrapper owns inventory, construction, comparison, evidence, and
  blocked recovery; the report template owns the durable schema; Product
  Prototyper owns task-result acceptance and later future-state work;
  Requirements Engineer supplies the selected source application context; the
  team board remains a short responsibility summary.
- Cross-file issues: None found. Existing-frontend, parity-completion, refresh,
  and no-frontend task types, report requirements, acceptance conditions, and
  artifact propagation agree across all changed owners. Configs and symlinks
  remain valid.

## Micro Review Pass

- Redundancy removed: Removed the narrow baseline rules and moved the
  real-interface/no-screenshot-hotspot rule to the shared authority. Kept
  detailed inventory schemas only in the bootstrap report and kept `team.md`
  at the responsibility/flow level. Role-local mentions are short operational
  applications or completion gates rather than competing principles.
- Defensive wording retained and why: Retained user-approval, canonical
  requirements, production-readiness, source-technology, production data and
  credential, production write/dependency, workspace isolation, blocked-result,
  refresh-preservation, no-frontend visual-system, and handoff boundaries. Each
  prevents a distinct authority, safety, evidence, recovery, or output failure.
- Transitions repaired: The effective sequence is now selected source identity
  -> complete observable inventory -> simplest mocked implementation ->
  controlled source/prototype comparison -> all-items-pass result -> Product
  Prototyper acceptance -> focused future-state delta -> user review and final
  evidence. An existing directory alone no longer skips parity completion.
- Final residual risk: A live application may contain hidden routes, inaccessible
  roles, remote flags, or unavailable source runtime dependencies. The new
  contract treats every failed or unsubstantiated required item as blocked, but
  the first real bootstrap must confirm that the product runtime can support the
  complete inventory and comparison process. Concurrent changes to one
  canonical prototype root remain outside this optimization.
