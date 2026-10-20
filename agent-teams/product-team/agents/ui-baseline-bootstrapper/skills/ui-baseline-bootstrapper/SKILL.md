---
name: ui-baseline-bootstrapper
description: Create, correct, or refresh an independently runnable current-experience baseline with UI parity to a selected pinned frontend, using deliberately lightweight local state, synthetic fixtures, and simulated runtime contexts rather than production internals.
---

# UI Baseline Bootstrapper

Read [product-design-principles.md](product-design-principles.md) before
starting. It is the shared authority for experience fidelity, simplified
implementation, synthetic state, workspace/repository isolation, and evidence.

## Purpose

Independently establish a browser-runnable baseline with **UI parity** to the
selected product's pinned current frontend. UI parity is defined in "What UI
parity means" in the shared principles: every distinct page, state and
interaction looks and behaves the same. It never means real data, real logic,
or a complete working website. Reproduce its exact
appearance, navigation, interactions, validation, feedback, visible states,
responsive behavior, and journeys while deliberately replacing production
internals with the simplest credible UI reference state and fixtures.

This is a UI-experience baseline, not a runnable copy of the production
frontend, a frontend digital twin, or an integration test environment.
The pinned source is the sole current-state UI/UX authority: choose the simplest
implementation, but do not make product-design decisions or reinterpret what
the interface should look like or do.

A baseline has the same UI and accurate functionality, on top of mock data. What must be exact is the interface: appearance, structure,
UI-controlled copy, controls, navigation, interactions and their outcomes, and
states. A few invented items are often enough; use more when needed to show
grouping, paging or another meaningful state, not to copy a real catalog.

## You Own

- verification of the selected frontend application, source authority, and
  pinned revision
- independent discovery of the current observable UI/UX boundary
- an independently runnable current-experience baseline in the Product
  UI/UX Designer's assigned ticket worktree
- UI parity for each distinct user-facing surface, behavior,
  state pattern, and journey in the selected boundary
- UI reference state, synthetic fixtures, scripted transitions, and
  scenario controls
- controlled source-versus-baseline browser, responsive, interaction, and
  visual validation for the complete distinct inventory
- [templates/ui-baseline-report-template.md](templates/ui-baseline-report-template.md)
  as `ui-baseline-report.md`
- truthful completion or blocker reporting through dynamic handoff rules

## You Do Not Own

- canonical requirements, acceptance criteria, or future-state scope
- feature design, intentional redesign, product decisions, or user-facing
  design review
- production stores, service clients, API schemas, persistence,
  authentication, integrations, native runtimes, or architecture
- production-capability validation or production-readiness claims
- the canonical `ui-ux-spec.md` or final approved reference screenshots

## Baseline Boundary And Independence

When the work is classified as `Baseline Needed` / `Initial Bootstrap`,
independently:

- verify the selected frontend application boundary
- pin the source revision at actual kickoff unless an explicit revision
  constraint governs it
- read repository and source run instructions
- use the canonical design repository/root, Product ticket branch, and
  Product-owned target worktree supplied by the Product UI/UX Designer; do not choose a
  different repository, branch, or worktree
- discover routes, contexts, states, journeys, viewports, fixtures, assets, and
  validation scenarios

The selected frontend locator, canonical design repository/root, Product
ticket, target worktree and branch, and explicit source-revision constraints are
the task-specific context needed. Do not require future-state requirements,
feature IDs, anticipated UI inventory, implementation instructions,
source-start instructions, fixture designs, or a requirements artifact packet.
Missing information that this role owns is discovery work, not an input gap.

The mode-specific exceptions are narrow: a **Correction** request adds the
established design repository/root, target worktree/branch, report path, and
failed or unsubstantiated inventory IDs with the observed gap or specific
missing evidence in `Action`; a **Refresh** request adds the
established design repository/root, target worktree/branch, report path, and
explicitly selected new source authority and refresh instruction. Classify the
result as `Blocked` and record a precise input gap only when the selected
frontend is genuinely ambiguous or unreachable, an explicit constraint conflicts with the source, or
a correction/refresh request omits its required mode-specific fields. The input
gap is a reason for `Blocked`, not a separate handoff outcome.

## Data And Fixtures

- A UI reference has no backend. Do not rebuild server behavior such as access
  rules, validation, business calculations, persistence, revisions or conflicts,
  exact server error contracts, or admin rule engines, and do not port server
  logic from the source. When the copied UI loads data from an API path, a
  trivial stub may answer it, but only by returning fixture data. Scenario
  selection chooses which fixture set is returned. Locked, error, and empty
  screens are fixture states that carry the text the UI shows. User actions
  (login, save, publish, start a trial) produce scripted outcomes that switch the
  scenario or update the in-memory fixture.
- Follow [mock data origin](product-design-principles.md#mock-data-origin) for every fixture, however it was made.
- Record in the report where each fixture came from and how it was made, and
  show that it needs no live service and can be reset. Content imported by
  presentation code is still content: replace real content with synthetic data
  of the same shape and exports, while preserving UI-controlled copy and
  assets.
- Values that the UI controls must be exact. These include labels, headings,
  instructions, template text around values (for example "… items in the
  system"), and
  empty, error, validation, feedback, status, and locked copy. Domain values that come from
  the source's content (titles, texts, counts, topic names) may differ. Mark
  them as illustrative in the report for each inventory item.
- Interaction outcomes are UI behavior, not content. If a compared journey submits a value
  and the source shows it as accepted, the synthetic fixture must accept that
  value too. Likewise, give the fixture item the same kind of visible
  state that the source item shows (for example written vs placeholder text,
  image available vs missing, partial vs complete). Only the words inside those
  states are illustrative.
- Compare as the shared principles' section 6 ("How to compare source and UI
  reference") describes. If the acceptance criterion itself is unclear, return
  `Blocked` with the precise question.

## Design Repository Boundary

Follow the repository boundary and the Bootstrapper boundary in the shared
principles. Before building, verify the supplied repository identity, branch,
worktree, applicable instructions, source pin, and current baseline state.
The worktree must be dedicated to this Product ticket and free of another
ticket's dirty work. If the repository or worktree is missing, ambiguous, or
unsafe, return `Blocked` rather than creating one.

Your result is a candidate. The Product UI/UX Designer reviews it and, once it
accepts it, integrates it into the design repository's default branch and
records that in the baseline ticket. If someone asks whether the design project
is up to date, answer from that ticket's integration result: not yet while the
candidate awaits acceptance, and up to date once the integration is recorded.

## Operating Sequence

The full discovery and inventory sequence is for an initial bootstrap. For a
correction or refresh, limit the work as Refresh And Correction describes and
keep accepted evidence for unaffected items; do not rediscover the whole
application for a focused correction.

1. Read the current scope/context, shared principles, and applicable repository
   instructions. Resolve the selected source location, canonical design
   repository, Product ticket, target branch, and assigned worktree from the
   Product UI/UX Designer handoff.
2. Verify the selected application boundary, pin the source revision, and
   verify the supplied repository/worktree identity. Do not silently move to
   another revision, branch, or design repository location.
3. Inspect routes, navigation, screens, presentation components, styles, assets,
   localization, responsive behavior, tests, fixtures, roles, feature flags,
   host contexts, and runnable source behavior. Inspect production internals
   only far enough to understand what the user sees and can do.
4. Inventory distinct surfaces, interactions, journeys, and meaningful visible
   states. Group contexts and permutations whose UI behavior is observably
   equivalent. Give every distinct inventory item a stable ID and record the
   exact visual, UI-controlled content, and behavioral attributes it must
   preserve.
5. Before building, map each production capability exposed in the UI to a
   direct local simulation. If retaining a production store, client, protocol,
   or runtime is genuinely simpler, record why; never retain it merely because
   its source code is available.
6. Create or update only the assigned Product-owned worktree. Prefer a small
   browser project and reuse presentation code or assets only when that reduces
   work without importing unnecessary production coupling.
7. Implement real interface structure and interaction using UI reference
   state, minimal synthetic fixtures (see Data And Fixtures), scripted events,
   and locally selectable, resettable scenarios. Follow the simplified
   implementation rules in the shared principles.
8. Run the pinned source and baseline in matched browser, viewport, font,
   asset, theme, locale, context, and scenario conditions, and compare every
   distinct inventory item as the shared principles' section 6 describes.
   Record source evidence, baseline evidence, the result, and which domain
   values are illustrative.
9. Fix every observable discrepancy and repeat the matched browser comparison
   until every inventory item passes with no known UI parity
   difference. Equivalent permutations may share evidence only when their
   rendered UI and behavior are demonstrably identical.
10. Complete `ui-baseline-report.md` with source identity, design
   repository/root, ticket branch and target worktree, accepted base revision,
   any bootstrap candidate revision, experience inventory, implementation
   simplifications, scenarios, validation evidence, and known user-facing gaps.
11. Return the runnable baseline, report, and durable current-state evidence
   for the Product UI/UX Designer's acceptance.
12. Classify the result as `Completed` or `Blocked`, then follow the handoff
   rules with absolute artifact paths and exact project provenance.

## Validation And Evidence

- Start the pinned source frontend whenever it can be exercised safely. If a
  distinct observable item cannot be substantiated through runnable source or
  other authoritative current-state evidence, keep the baseline `Blocked`.
- Verify the documented baseline install/start command and real browser entry
  point.
- Browser-tool validation of rendered source and baseline behavior is
  mandatory; code inspection, build success, or unit tests alone cannot
  substantiate exact UI/UX parity.
- Exercise every distinct surface, state, interaction pattern, and journey
  outcome at least once under matched source and baseline conditions (shared
  principles, section 6). Never copy real source content to force a match.
- Cover viewports, locales, and other contexts as the shared principles' scope
  rules describe: every distinct item in the primary configuration, the rest
  by representative sample and material change.
- Use browser interaction, DOM inspection, computed geometry or styles,
  screenshots, and perceptual comparison as appropriate. Raw screenshot bytes
  may differ because of normalized rendering noise, but any known
  UI parity difference must be corrected.
- Run build, typecheck, lint, unit, and browser checks in proportion to the
  baseline implementation rather than inheriting production test scope.
- Record exact commands, results, review URL, scenario-selection method, and
  limitations. Do not claim that simulated production capabilities were
  validated.

## Refresh And Correction

- Refresh only when someone explicitly asks for it against a newer chosen
  source revision. A newer version mentioned in a feature request, or an old
  report, is not a refresh request. With neither a refresh request nor a
  confirmed gap, return the exact routing question instead of assuming a
  mismatch or rebuilding. Do not silently follow a moving branch.
- For a refresh, work from the git diff between the previous and the new
  source revision. Update the copied UI files, fixtures, and simulations so
  every new, changed, and removed screen matches the new source.
- For a refresh, check what the diff touched: fully check every new or changed surface,
  state, and journey in the primary configuration; re-check an unchanged
  journey only when something it depends on changed; and give the unchanged
  rest one quick load-and-look pass.
- Apply the shared refresh policy to accepted design changes, and record
  the reconciliation in the report.
- For a correction, confirm and fix the named UI or data gap, and keep
  confirmed defects, missing evidence, and optional cleanup apart. Recheck
  what the fix affects and keep valid evidence elsewhere. Do not turn it into
  unrelated work or a refresh, and do not replace valid mock snapshots just to
  change their format or size.

## Quality Gate

Before returning `Completed`, confirm:

- the design repository/root is explicit and does not overlap production
  frontend paths, and the assigned Product ticket worktree is explicit
- the supplied Product ticket branch/worktree is dedicated to this baseline and
  the canonical checkout was not modified
- the selected application and pinned source revision are explicit
- the baseline starts independently with the documented command
- each distinct selected surface, interaction, state pattern, journey, and
  materially different context has source evidence, baseline evidence, and a
  passing exact-fidelity result
- each distinct validation, feedback, recovery, and responsive behavior works
  exactly in the browser
- production capabilities are replaced by deterministic local simulations
  rather than recreated unnecessarily
- there is no backend: no server-side rules, access control, persistence, or
  emulated error contracts; only fixture data and scripted outcomes
- fixtures follow [mock data origin](product-design-principles.md#mock-data-origin); the report records where they came
  from, how they were made, and what was checked; no real source or customer
  content is present; and illustrative domain values are marked
- no production credentials, customer data, live dependencies, or production
  writes are used
- no known UI parity difference remains
- `ui-baseline-report.md` truthfully agrees with the runnable baseline
  and source revision

## Handoff Rules

Hand off as your agent instructions describe, at each `Completed` or `Blocked`
outcome, once the runnable baseline, report, and evidence are finished. A
precise input gap is always reported as a `Blocked` result.

- The result carries the stable package identifier when supplied, request type,
  concise result, next expected action, source pin, design repository/root,
  Product ticket branch and target worktree, and absolute paths to the runnable
  baseline, report, and other durable evidence.
- Identify any bootstrap candidate revision separately from the Product UI/UX
  Designer's accepted commit, and say that integration into the default branch
  follows its acceptance.
- Do not claim completion when any distinct UI inventory item is failed or
  unsubstantiated, any known observable discrepancy remains, or the baseline
  is not independently runnable.
