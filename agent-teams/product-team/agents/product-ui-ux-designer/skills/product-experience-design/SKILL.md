---
name: product-experience-design
description: Evolve an accepted product experience through code-first UI/UX design, or establish a new product experience when no frontend exists, delivering an approved UI/UX specification with normative reference screenshots and a runnable UI reference.
---

# Product Experience Design

Read [product-design-principles.md](product-design-principles.md) before
starting. It is the shared authority for design technology selection,
current-experience fidelity, lightweight implementation, synthetic state,
workspace/repository isolation, project ownership, and evidence.
This skill adds the product-experience workflow and artifacts; it does not
replace the shared cross-mode invariants with a second policy.

Before this mode begins, apply
[product-design-repository-management](../product-design-repository-management/SKILL.md)
to establish or resume the canonical repository, Product ticket, ticket branch,
active worktree, accepted base revision, and runtime isolation. Apply it again
after this mode's validation and user-review work for commit, integration,
ticket closure, and cleanup, and use its ticket statuses for the common
`product-ticket.md` record. This skill owns only the product-experience work
and supplies the evidence each status transition needs; it never switches the
canonical design checkout, creates a second ticket worktree, or edits a
production or source path.

## Purpose

For an existing product surface, accept an independently runnable
current-experience baseline that has **UI parity** with the product, as defined
in the shared principles. Then evolve that baseline with the smallest credible
requirements-driven change. The preserved
product shell, layout, styling language, controls, and unaffected behavior are
part of the experience being evolved; the proposed result must remain
recognizably connected to the existing product. The implementation may still
use lightweight UI reference state instead of production internals. When no
frontend exists, create the smallest credible new product experience directly.
After user confirmation, turn the production-quality visual and interaction
design into a precise `ui-ux-spec.md` backed by the runnable UI reference and
normative final reference screenshots.

## What You Build

A UI reference looks and behaves like the product, but it runs on a little mock
data and has no real content or backend. It is a model of the product's UI,
not a second copy of the website.

Two definitions in the shared principles govern every accept, reject and
correction decision in this skill:

- **"What a UI reference is"**: what the project implements and
  what it never contains.
- **"What UI parity means"**: what must match the product exactly, and what is
  never required.

In short:

| The UI reference implements | The UI reference never contains |
| --- | --- |
| Every distinct page, component, style, asset and responsive layout | Real content: article and document bodies, catalog or question sets, answer data, transcripts, translations, media inventories |
| All UI-controlled text and messages | Real user or account records, or exports of them |
| Navigation, controls, forms, validation and interactions, with scripted visible outcomes | The product's real logic: grading, progress calculation, recommendations, search, publishing |
| Every distinct state and role, through deterministic scenarios | A backend: server rules, persistence, access control, integrations |
| A small stub serving hand-written fixtures | Recorded, replayed or captured source responses, or data sized like the source's |

"Complete" always means that every distinct page, state and interaction pattern
is covered at least once. It never means a complete working website, every
item, or every data combination.

Two quick checks before any acceptance:

1. **Size and provenance.** The mock data layer and any content files are
   small (kilobytes) and hand-written. Megabytes of data, or item counts that
   match the source, mean real data was copied.
2. **What is compared.** UI code, UI text, structure, styles, states and
   behavior must match. Data values are illustrative.

## Core Design Rules

These rules govern every future-state change. The rest of this skill points
back to them.

1. **Evolve the product in place.** Start from the accepted baseline and make
   the smallest localized change that answers the request. Do not replace the
   product shell with a disconnected demo or move the behavior into a
   standalone visualizer. Build the critical journey first. Add alternate,
   loading, empty, permission, error, and recovery states only when they
   affect the decision.
2. **Keep interactions real; simulate underneath.** Every visible control is
   a real product control. When an agent, the server, or time causes the
   change, trigger it through that actor's real product surface, such as a
   scripted tool call in the agent's own conversation. Never add a review
   panel, overlay, or URL switch (shared principles, section 5).
3. **Use only paths the product has.** Before you propose a journey step,
   confirm in the source or product docs that the product supports it, and
   record where. Never invent a product control to stage a scenario. A path
   the product lacks is a requirement change (Findings Rules).
4. **Commit to one design.** Present the design you recommend, even when the
   request lists options. Describe the alternatives in words in the review
   notes, with your reasoning. Build an alternative only if the user asks to
   see it, as a real variant reached through normal product UI, never as a
   toggle.
5. **Own the visual quality of what you change.** Inside the changed area,
   judge the existing visual quality and fix its problems, recording each fix
   as a design change. Outside it, keep appearance and behavior exact. Passing
   functional and parity checks does not show that a screen is clean.
6. **Review inside the product.** The ticket worktree already isolates the
   change, so the review URL is the product's normal entry point, with no
   preview-only state. Run the visual design review (Validation) before
   presenting.

If a focused static artifact or direct clarification would answer the question
better than a UI reference, return that recommendation instead.

## Mode Boundary

This skill is the product-facing evolution workflow. Use it when the request
concerns an existing product surface or when a new product experience must be
created and the user needs a product-facing design and UI/UX
specification. For an abstract or product-independent question with no
applicable existing product surface, use the sibling
`exploratory-requirements-visualizer` skill instead. Requirement uncertainty
does not by itself justify switching an existing-product change to an
independent visualizer. Do not turn an unresolved requirements question into
an unapproved final product behavior.

You author the concrete future-state UI/UX proposal within the current request,
available requirements context, and review feedback. The proposal becomes
authoritative only through explicit user approval; the role never self-approves
a visual or behavioral product decision.

## You Own

- the focused design scope represented by the current request and available
  requirements context
- the product-experience content of the current Product ticket, including its
  scope, linked requirements, mode-specific artifacts, validation, approval,
  and handoff result
- review and acceptance of the Bootstrapper's exact current-experience baseline
- authoring the concrete, focused future-state UI/UX proposal for user review
- the mode-specific source and artifacts created in the active Product ticket
  worktree; for an existing product surface, future-state work begins only
  after baseline acceptance and remains an incremental baseline evolution
- the iterative design review loop with the user
- the canonical design-owned `ui-ux-spec.md`
- mode-specific fields and evidence in the Product ticket's durable artifact
  folder
- normative final reference screenshots and their mapping to pages, states,
  journeys, and requirements
- browser validation of the critical journey and important states
- supporting experience stories, behavior matrices, assumptions, run instructions, change history, and completion evidence when useful
- evidence-backed design findings and unresolved product decisions

## You Do Not Own

- canonical requirements, acceptance criteria, scope approval, or final product decisions
- target production backend or software architecture
- production-readiness claims for mocked security, persistence, integrations, performance, or operations
- unrelated product scope

Do not create a second `requirements-doc.md` or `product-requirements.md`. The
UI/UX specification is a behavior-defining supplement, not the canonical
requirements doc. When requirements context exists, keep its IDs and
cross-stage findings traceable without duplicating the complete requirements
package.

## Working Context

Use the current request and available workspace context. Use the following
when present; record unavailable or inapplicable values as such rather than
inventing them:

- `requirements-doc.md`
- `investigation-notes.md`
- `solution-revision-record.md` when it exists
- every relevant supplemental artifact
- requirement, behavior, and acceptance-criteria IDs in scope
- the exact questions or alternatives the design must resolve
- the supplied ticket or request identifier and an existing design ticket
  folder, when available
- critical journey, states, constraints, and non-goals
- user feedback and approved decisions for a focused revision round, when applicable
- an unambiguous selected existing-frontend locator when an existing product UI
  supplies the current experience
- any explicit user-imposed source-revision or design-root constraint
- an established design repository/root and bootstrap-report path when they already
  exist

If the current request lacks a decision question or observable journey, classify
the result as `Blocked`, record the precise missing input and recovery question
in the Product ticket, and stop instead of inventing a broad UI reference. The
input gap is a reason for the `Blocked` result, not a separate handoff outcome.

## Final Outputs

For a completed design stage, produce:

- [templates/ui-ux-spec-template.md](templates/ui-ux-spec-template.md) as the canonical `ui-ux-spec.md`
- the runnable UI reference package reviewed by the user
- final reference screenshots stored at stable paths and embedded or linked from `ui-ux-spec.md`

Create supporting artifacts only when they materially help construction, validation, revision, or handoff:

- [templates/experience-story-template.md](templates/experience-story-template.md) as `experience-story.md`
- [templates/ui-behavior-test-matrix-template.md](templates/ui-behavior-test-matrix-template.md) as `ui-behavior-test-matrix.md`
- [templates/design-assumptions-template.md](templates/design-assumptions-template.md) as `design-assumptions.md`
- [templates/design-change-log-template.md](templates/design-change-log-template.md) as `design-change-log.md`
- [templates/ui-reference-runbook-template.md](templates/ui-reference-runbook-template.md) as `ui-reference-runbook.md`
- [templates/product-design-report-template.md](templates/product-design-report-template.md) as `product-design-report.md`
- [shared/templates/product-ticket-template.md](../../../../shared/templates/product-ticket-template.md) as the shared per-ticket `product-ticket.md`
- `<ticket-folder>/visual-references/` containing the final `VIS-*` references
  and captured screenshots
- the bootstrapper's `ui-baseline-report.md` for every
  current-experience bootstrap, correction, or refresh request

Each support artifact has a distinct purpose: the experience story frames the
working journey, the behavior matrix records deterministic validation,
assumptions record simulation boundaries, the change log records revision
history, the ticket record manages request status and delivery links, the
runbook records execution, and the product design report is an optional cross-stage
summary. Do not create the report merely to duplicate the UI/UX specification or
those supporting artifacts.

Keep the runnable UI reference source at the active Product ticket worktree while
the ticket is in progress. Keep the ticket record, UI/UX specification, final
visual references, and ticket-specific support artifacts together under that
worktree's ticket folder.

## Bootstrap Routing

- For an existing frontend, check only whether the active Product ticket
  worktree has an applicable accepted `ui-baseline-report.md` for the
  established canonical design repository/root. Do not inspect or inventory
  the current source UI merely to prepare a Bootstrapper request. If no
  repository/root or accepted baseline is established, use the repository-
  management skill's baseline-worktree path before requesting Bootstrapper.
- Request bootstrap work when the baseline is absent, any distinct UI inventory
  item is failed or unsubstantiated, or an explicit correction or source
  refresh is required. Do not infer a refresh from a moving branch. For
  no-frontend work, create the smallest requirements-driven experience directly
  without using the Bootstrapper.
- For an absent baseline, classify the Product ticket as `Baseline Needed` and
  send the fixed payload in
  [product-design-repository-management](../product-design-repository-management/SKILL.md)
  with `Mode: Initial Bootstrap` and an action to independently establish the
  exact current-experience baseline. Do not attach the requirements package or
  add discovered routes, contexts, expected states, implementation guidance,
  run instructions, fixtures, or requirement IDs. They are not inputs to the
  independent current-experience bootstrap. The design repository/root and
  target worktree are locations, not a request to pre-inventory or prescribe
  the implementation.
- For `Mode: Correction`, use the payload's correction fields. In `Action`,
  state the gap type of each failed or unsubstantiated ID (UI copy, structure,
  style, state, interaction, or data-boundary) and restate the baseline
  acceptance criterion below. Never phrase a correction so it can be satisfied
  by making the UI reference show the source's data. For `Mode: Refresh`, use the
  payload's refresh fields. Preserve the stable package identifier in all
  modes.
- When the Bootstrapper returns, read and review the runnable baseline,
  `ui-baseline-report.md`, and referenced evidence directly. Accept an
  existing-frontend baseline only when its selected source and revision are
  explicit, the browser baseline is independently runnable, every distinct UI
  inventory item has matched source and baseline evidence, no known UI parity
  difference remains, and production capabilities
  are replaced by documented local simulations. If correction is required,
  classify the outcome as `Baseline Needed` again and send the failed or
  unsubstantiated UI inventory IDs through the handoff rules.
- Baseline acceptance criterion: accept only UI parity as defined in the
  shared principles. Judge it on two tiers:
  - **Exact:** UI-controlled text (labels, headings, instructions, template
    text around values, empty / error / validation / feedback / status copy),
    navigation targets, controls, interactions and their outcomes, redirects,
    component structure and order, computed styles, responsive layout, and
    every meaningful state (empty, populated, loading, error, locked,
    permission, role).
  - **Illustrative:** domain values such as titles, texts, topic names, counts,
    percentages and item lists. They come from small synthetic fixtures and may
    differ from the source. A difference in these values is never, on its own,
    a parity failure. It fails only when it changes or hides a UI state, for
    example a list with too few items to show its layout, or a missing
    empty/locked case.
- Baseline data-boundary check: before accepting, confirm that baseline data
  is small, hand-written and synthetic. Inspect the fixture and content
  directories, their size, and their provenance. Recorded, replayed, captured
  or bulk-copied source data or content is a baseline defect. Send it
  back as a data-boundary correction. This includes content files that copied
  presentation code imports statically. Do not accept it, and do not carry it
  forward as an open item.
- If the established design repository/root has an applicable accepted
  baseline report, read its current implementation and artifacts in the active
  ticket worktree and skip initial bootstrap. Request a refresh when an
  explicitly selected new source authority differs from the report. Request a
  correction when any known UI parity difference or
  unsubstantiated distinct UI item remains.
- Do not start requirements-driven feature or design work on an unreviewed,
  failed, unsubstantiated, stale, or blocked current-experience baseline.

## Operating Sequence

1. Read the active Product ticket and management state, then restate the
   decision questions, in-scope IDs, critical journey, constraints, and
   non-goals. Read applicable requirements, investigation, revision, and
   feedback artifacts when they exist. Confirm that each journey step you
   plan exists in the product (Core Design Rule 3).
2. Use the management skill's active ticket worktree, accepted base revision,
   repository instructions, and runtime-isolation record.
3. Inspect the accepted current-experience baseline and its bootstrap evidence
   in the active worktree. Apply the bootstrap routing rules before any
   existing-frontend future-state work. If the baseline is absent or fails
   acceptance, return `Baseline Needed` through the management and handoff
   process and stop future-state work until the Product UI/UX Designer accepts it.
4. Create or update only the mode-specific source and supporting artifacts in
   the active ticket worktree. Implement the smallest future-state delta that
   exercises the requested decisions, following the Core Design Rules. For
   no-frontend work, build the smallest runnable experience directly in the
   management-established baseline worktree.
5. Start the UI reference using the runtime resources recorded by the management
   skill. Validate the critical journey, relevant scenarios, and preserved
   baseline surfaces in a browser, and run the visual design review. Correct
   every observed visual or interaction discrepancy and repeat validation
   before presenting the review URL.
6. Keep the UI reference available, give the user the review URL and concise
   review focus, and provide the evidence needed for management to set the
   ticket status to `Awaiting User Review`. Request explicit feedback.
7. Apply focused feedback that stays within the current scope, preserve
   accepted behavior, and provide the evidence needed for management to set the
   ticket back to `In Progress`. Revalidate affected and relevant regression
   paths, and repeat review as needed.
8. After explicit user confirmation, perform final browser and visual
   validation of the approved experience through its normal entry point. If
   that validation requires a material visible or behavioral change, reopen
   user review before finalizing.
9. Capture canonical screenshots for relevant pages, states, and viewports in
   the current ticket's `visual-references/` directory using stable `VIS-*`
   IDs.
10. Complete `ui-ux-spec.md` and useful mode-specific supporting artifacts,
    including the design rationale, approval reference, final screenshots,
    detailed behavior, mocked boundaries, source pin, and validated journeys.
    Fill the visual, content, responsive, accessibility, and motion sections
    for the scope the change affects, using the product's existing values or
    the approved change. Keep them under the active ticket folder.
    Include the canonical repository, ticket branch, accepted base, and resulting
    UI reference revision from management state when recording provenance.
11. Return the completed mode artifacts and final validation evidence to the
    management skill for the final ticket state, commit, integration, ticket
    closure, and cleanup. Do not claim completion before integration is
    durable.
12. Classify the final package as `Design Completed` only after management
    finalization succeeds, then follow the handoff rules with the ticket record,
    final UI/UX package, repository state, and every still-relevant supporting
    artifact.

## Design Evolution Rules

- For an existing UI reference, read the current design artifacts and implementation before changing either.
- Treat the accepted UI inventory and its exact visual evidence as the
  preservation baseline outside the changed area (Core Design Rule 5), and
  distinguish each intentional delta, including visual-quality fixes.
- When material revision rounds need traceability, create `design-change-log.md` and assign every recorded addition, behavior change, or removal a stable, never-reused `DC-*` ID.
- Record which accepted behaviors are preserved, intentionally changed, or removed.
- Keep existing transition and scenario IDs stable when their meaning has not changed.
- Update the UI/UX specification, applicable supporting artifacts, and implementation only where the approved design request or user feedback requires it.
- Validate the changed journey and affected baseline behavior. When a change
  touches shared navigation, layout, design tokens, or UI reference state,
  revalidate the related shared surfaces rather than unrelated product scope.
- For removals, delete obsolete UI, routes, scenarios, and artifact statements instead of retaining compatibility behavior without an explicit requirement.

## Implementation Principles

- Keep shared state and asynchronous status in an appropriate store or composable; keep local presentation state near the component.
- Preserve the UI reference's high-experience-fidelity, low-implementation-fidelity
  boundary. Extend UI reference state and fixtures instead of introducing
  production protocols or runtimes unless those mechanisms are themselves part
  of the user-facing decision.
- Treat production quality as a UI/UX standard: the approved design must be
  visually finished and precise enough for downstream frontend implementation,
  without implying production backend or runtime readiness.

## Validation

- Read the project's README and applicable development instructions before choosing commands or starting services.
- Verify the documented install/start command, entry route, and scenario-selection method.
- Exercise the critical journey from its real entry point.
- Validate every requested deterministic scenario and visible outcome.
- Keep UI-controlled labels, instructions, formatting, validation, feedback,
  and recovery messages synchronized across the runnable UI reference,
  `ui-ux-spec.md`, and final references. Mark synthetic domain record values as
  illustrative when they are not intended requirements.
- Inspect desktop and narrow-mobile layouts when the experience is responsive.
- After implementing or revising UI, compare the browser result with the exact
  accepted baseline for preserved areas and with the approved intended design
  for changed areas. Fix every visible or interaction discrepancy and repeat
  browser validation until none remains.
- Visual design review: look at every changed screen as a user would, beside
  the surrounding product. Check hierarchy, colour noise, borders and boxes,
  and consistency with sibling components, and ask whether it looks like the
  product. Fix what you find, then revalidate.
- Compare source and baseline/design per component and per state, never by whole-page
  text or layout hashes. Page-level hashes fail on every illustrative data
  difference and hide real UI differences. Compare separately:
  - UI-controlled text, with digits and content slots masked;
  - the set of component signatures;
  - computed styles of shared components;
  - page-skeleton geometry;
  - interactive elements and their targets, with item IDs masked;
  - final route and title.
  Exclude rendered content prose (for example markdown/prose containers) from
  UI-copy checks. When a value comes from account or state
  data (progress, entitlement, role, flags), seed the same synthetic value on
  the source observation side instead of copying source data into the
  UI reference.
- Use a clean, matched scenario on both sides. Before comparing logged-in
  surfaces, confirm that both sides use the same synthetic account type and a
  reset state. Before comparing logged-out surfaces, confirm that neither
  side's session carries over from earlier work.
- Use interim screenshots only as disposable review aids when needed.
- Capture final reference screenshots only after explicit user confirmation and final validation of the corresponding states.
- Reconfirm with the user after any post-confirmation change that materially alters visible or interactive behavior.
- Run the available build, typecheck, lint, unit, or browser checks that are proportionate to the UI reference.
- Record exact commands, results, review URL, and any limitation.
- Keep the UI reference process available during active user review. Clean it up after the review stage ends or the user no longer needs the live URL, without disrupting unrelated user processes.

## Quality Gate

Before reporting the design package as completed, confirm:

- the design repository/root is distinct from production frontend paths and
  its source pin, accepted base, ticket branch/worktree, and committed design
  revision are recorded
- the ticket identifier, ticket status, ticket folder, and linked artifacts are
  recorded and agree
- repository management has recorded the integration result and safe cleanup
  result, or the exact reason either is not required or is blocked
- a completed ticket is under `tickets/done/<ticket-id>/`; a blocked or
  unfinished ticket remains under `tickets/in-progress/<ticket-id>/`
- an existing-frontend design repository has an accepted, applicable
  `ui-baseline-report.md` that shows UI parity for every distinct
  inventory item
- design data is small, hand-written and synthetic. No recorded, replayed,
  captured or bulk-copied source data or content remains anywhere in
  the design repository, including statically imported content files.
  Fixture size and provenance are recorded.
- the documented command starts the UI reference, and the critical journey,
  including any actor-caused change, runs from the product's normal entry
  point with no preview-only control, overlay, or URL switch
- `ui-ux-spec.md`, the runnable UI reference, final screenshots, and applicable supporting artifacts agree
- the UI/UX specification records the user's confirmation reference
- every requested action has visible feedback and every important transition has a stable ID
- changed behavior and relevant previously accepted journeys have been exercised
- simulation boundaries, simplifications, and production gaps are explicit
- every changed screen passed the visual design review and looks like the
  product rather than a generic starter screen
- hierarchy, dimensions, spacing, density, typography, font assets, colors,
  borders, radii, shadows, icons, imagery, surfaces, controls, states, focus,
  feedback, motion, and responsive behavior are production-quality and fully
  specified
- desktop and narrow-mobile views have no avoidable clipping, overlap, awkward wrapping, or layout drift
- keyboard focus, labels, contrast intent, and readable hierarchy are represented
- no unapproved behavior is presented as confirmed
- every final visual reference matches the validated runnable state and identifies its viewport
- every visible detail in a final reference is requirements-defining by default;
  fixture content or permitted variation is illustrative only when explicitly
  identified in `ui-ux-spec.md`

## Anti-Patterns

Each of these has happened before. Recognise it and use the correction
instead.

- **Copying content along with UI code.** Defining the copied "presentation
  boundary" by folder, so every file the pages import comes along: Markdown content, JSON data
  files, and data modules such as question sets or translations. The UI reference ends up holding megabytes of real
  content. Correction: copy UI code only. Replace every imported content file
  with a small synthetic file of the same shape and exports, and audit UI code
  and content separately.

- **Judging data as if it were UI.** Rejecting a baseline because a dashboard
  shows "1 categories" where the source shows "18", or a different category
  name. Correction: counts, titles and names are illustrative domain values.
  Check the template text around them ("… categories in the system"),
  the component and its styles, and whether every state is represented.
- **Whole-page hash comparison.** Comparing `innerText` or layout hashes of
  entire pages and calling every mismatch a failure. Correction: compare per
  component and per state, with content masked (see Validation).
- **Corrections without a stated criterion.** Sending "these routes differ, fix
  them" without saying what must be exact and what is illustrative. The
  Bootstrapper will reasonably copy the source's data to make the pages
  identical. Correction: every correction names the gap type for each ID and
  restates the acceptance criterion.
- **Accepting captured source data as "fixtures".** Passing "source-captured
  payloads", "complete libraries", recorded API responses, replay layers, or
  real answer data, transcripts and question sets because the pages then
  match. Correction: that is copied content, a data-boundary defect. Replace it
  with a few hand-written items of the same shape.
- **Carrying copied content forward as an open item.** Noting that real content
  files are "unchanged from the earlier baseline" and moving on. Correction:
  copied content is a defect in the current baseline. Request a data-boundary
  correction before acceptance, or record the ticket as not complete.
- **Trusting stale sessions.** Comparing logged-in pages while one side is
  still logged in from earlier work, or with a different account type on each
  side. Correction: set up the same synthetic scenario on both sides and
  confirm it before comparing.
- **Too little data to show the UI.** Swinging the other way and using fixtures
  so small that lists, grouping, paging, empty and locked states never render.
  Correction: minimal data is enough items of each shape to show every UI
  state, and no more.
- **Review control panels or overlays on top of the product**, including a
  `?prototypeReview=` switch copied from an older ticket. Correction: Core
  Design Rule 2.
- **Asking the user to choose between switches instead of designing.**
  Correction: Core Design Rule 4.
- **Preserving a visibly unclean baseline inside the area you are
  redesigning** because every functional check passed. Correction: Core
  Design Rule 5.
- **Proposing a product path that doesn't exist.** Correction: Core Design
  Rule 3.

## Findings Rules

- Tie every finding to a requested requirement, behavior, acceptance criterion, or decision question.
- Distinguish observed design behavior from recommended requirement changes.
- Record which alternatives were explored, what evidence differentiates them, and what decision remains with the user.
- Do not silently convert a design convenience into a product requirement.
- Treat user feedback that materially changes scope, requirements, acceptance criteria, or governing constraints as a requirement-impact finding; classify it as `Requirement Impact` and route it through the handoff rules before implementing it.
- If codebase or contract evidence contradicts the draft requirement, report the contradiction with its source; do not rewrite canonical requirements.

## Handoff Rules

- Use these rules at each `Baseline Needed`, `Design Completed`, `Requirement Impact`, `Not Recommended`, or `Blocked` outcome.
- A missing decision question or observable journey is a `Blocked` input-gap
  outcome. Include the missing input, evidence, and recovery question; do not
  emit an unconfigured gap outcome.
- Finish the artifacts you own. For an interim result such as `Baseline Needed`
  or `Awaiting User Review`, have repository management record the current
  status and preserve the active worktree before routing. For a terminal result,
  have it finalize the repository state before routing. A mode result is not
  complete merely because its files exist in a worktree.
- Call `get_handoff_rules` and use the returned conditional rules as the routing authority.
- Apply every matching rule, then call `send_message_to` with the exact returned `recipient_address`. Do not infer or hard-code a recipient.
- Include the stable package identifier from the surrounding workflow when
  supplied, the supplied ticket or request identifier, outcome, next expected
  action, and absolute paths to the ticket folder and every still-relevant
  artifact. Do not create a second design-specific task ID.
- If no returned rule applies, return the outcome to the user or calling workflow.
- After all required messages succeed, end the current stage and do not poll.
- Complete the completed-design handoff only after user confirmation and final artifact production. If progress is blocked, return the blocker; if a UI reference is not recommended, return the decision rationale and evidence path instead of claiming design completion or creating final UI/UX artifacts.
- A requirement-impact handoff may occur during design review; include the exact user feedback, affected IDs, and design evidence, then wait for a revised requirements package.
- For `Baseline Needed`, the applicable fixed Bootstrapper payload in the
  [repository-management skill](../product-design-repository-management/SKILL.md)
  is the complete request; do not append the requirements package or the
  Product UI/UX Designer ticket package under the general artifact rule. Keep the
  ticket status and bootstrap result in the Product UI/UX Designer's ticket folder.
- For `Design Completed`, include absolute paths to `ui-ux-spec.md`, the
  runnable UI reference, final screenshots, the applicable
  `ui-baseline-report.md`, and every still-relevant supporting
  artifact. Include the ticket record and folder, design repository/root,
  ticket branch/worktree, accepted base, design revision, source pin,
  integration and cleanup result, user-confirmation reference, validated
  journeys and scenarios, mocked boundaries, design findings, and unresolved
  decisions.
