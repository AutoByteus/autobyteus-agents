---
name: product-experience-prototyper
description: Evolve an accepted product experience into a production-quality focused prototype, or establish a new product experience when no frontend exists, and produce an approved UI/UX specification with normative final reference screenshots.
---

# Product Experience Prototyper

Read [product-prototype-principles.md](product-prototype-principles.md) before
starting. It is the shared authority for prototype technology selection,
current-experience fidelity, lightweight implementation, synthetic state,
workspace/repository isolation, project ownership, and evidence.
This skill adds the product-experience workflow and artifacts; it does not
replace the shared cross-mode invariants with a second policy.

Before this mode begins, apply
[product-prototype-repository-management](../product-prototype-repository-management/SKILL.md)
to establish or resume the canonical repository, Product ticket, ticket branch,
active worktree, accepted base revision, and runtime isolation. Apply it again
after this mode's validation and user-review work for commit, integration,
ticket closure, and cleanup. This skill owns only the product-experience work.

## Purpose

For an existing product surface, accept an independently runnable
current-experience baseline with 100% observable UI/UX parity, then evolve that
baseline with the smallest credible requirements-driven change. The preserved
product shell, layout, styling language, controls, and unaffected behavior are
part of the experience being evolved; the proposed result must remain
recognizably connected to the existing product. The implementation may still
use lightweight prototype state instead of production internals. When no
frontend exists, create the smallest credible new product experience directly.
After user confirmation, turn the production-quality visual and interaction
design into a precise `ui-ux-spec.md` backed by the runnable prototype and
normative final reference screenshots.

## Mode Boundary

This skill is the product-facing evolution workflow. Use it when the request
concerns an existing product surface or when a new product experience must be
created and the user needs a product-facing prototype and UI/UX
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

- the focused prototype scope represented by the current request and available
  requirements context
- the product-experience content of the current Product ticket, including its
  scope, linked requirements, mode-specific artifacts, validation, approval,
  and handoff result
- review and acceptance of the Bootstrapper's exact current-experience baseline
- authoring the concrete, focused future-state UI/UX proposal for user review
- the mode-specific source and artifacts created in the active Product ticket
  worktree; for an existing product surface, future-state work begins only
  after baseline acceptance and remains an incremental baseline evolution
- the iterative prototype review loop with the user
- the canonical prototype-owned `ui-ux-spec.md`
- mode-specific fields and evidence in the Product ticket's durable artifact
  folder
- normative final reference screenshots and their mapping to pages, states,
  journeys, and requirements
- browser validation of the critical journey and important states
- supporting experience stories, behavior matrices, assumptions, run instructions, change history, and completion evidence when useful
- evidence-backed prototype findings and unresolved product decisions

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
- `requirements-revision-record.md` when it exists
- every relevant supplemental artifact
- requirement, behavior, and acceptance-criteria IDs in scope
- the exact questions or alternatives the prototype must resolve
- the supplied ticket or request identifier and an existing prototype ticket
  folder, when available
- critical journey, states, constraints, and non-goals
- user feedback and approved decisions for a focused revision round, when applicable
- an unambiguous selected existing-frontend locator when an existing product UI
  supplies the current experience
- any explicit user-imposed source-revision or prototype-root constraint
- an established prototype repository/root and bootstrap-report path when they already
  exist

If the current request lacks a decision question or observable journey, classify
the result as `Blocked`, record the precise missing input and recovery question
in the Product ticket, and stop instead of inventing a broad prototype. The
input gap is a reason for the `Blocked` result, not a separate handoff outcome.

## Final Outputs

For a completed prototype stage, produce:

- [templates/ui-ux-spec-template.md](templates/ui-ux-spec-template.md) as the canonical `ui-ux-spec.md`
- the runnable prototype package reviewed by the user
- final reference screenshots stored at stable paths and embedded or linked from `ui-ux-spec.md`

Create supporting artifacts only when they materially help construction, validation, revision, or handoff:

- [templates/experience-story-template.md](templates/experience-story-template.md) as `experience-story.md`
- [templates/ui-behavior-test-matrix-template.md](templates/ui-behavior-test-matrix-template.md) as `ui-behavior-test-matrix.md`
- [templates/prototype-assumptions-template.md](templates/prototype-assumptions-template.md) as `prototype-assumptions.md`
- [templates/prototype-change-log-template.md](templates/prototype-change-log-template.md) as `prototype-change-log.md`
- [templates/prototype-runbook-template.md](templates/prototype-runbook-template.md) as `prototype-runbook.md`
- [templates/product-prototype-report-template.md](templates/product-prototype-report-template.md) as `product-prototype-report.md`
- [shared/templates/prototype-ticket-template.md](../../../../shared/templates/prototype-ticket-template.md) as the shared per-ticket `prototype-ticket.md`
- `<ticket-folder>/visual-references/` containing the final `VIS-*` references
  and captured screenshots
- the bootstrapper's `prototype-bootstrap-report.md` for every
  current-experience bootstrap, correction, or refresh request

Each support artifact has a distinct purpose: the experience story frames the
working journey, the behavior matrix records deterministic validation,
assumptions record simulation boundaries, the change log records revision
history, the ticket record manages request status and delivery links, the
runbook records execution, and the prototype report is an optional cross-stage
summary. Do not create the report merely to duplicate the UI/UX specification or
those supporting artifacts.

Keep the runnable prototype source at the active Product ticket worktree while
the ticket is in progress. Keep the ticket record, UI/UX specification, final
visual references, and ticket-specific support artifacts together under that
worktree's ticket folder. The repository-management skill owns the canonical
repository, branch, worktree, ticket status, commit, integration, and cleanup
lifecycle; this mode owns only the product-experience artifacts and behavior.

## Repository-Management Boundary

Before following the product-experience sequence, use
[product-prototype-repository-management](../product-prototype-repository-management/SKILL.md)
to establish or resume the active Product ticket worktree and its accepted
prototype base. Do not switch the canonical prototype checkout, create a
second ticket worktree, or edit a production/source path from this mode.

Use the status transitions in the shared Product Prototype Principles for the
common `prototype-ticket.md` record. The management skill owns the transition
and repository state; this skill supplies the product-experience result and the
mode-specific evidence required for each transition.

## Prototype Selection

Keep the future-state change proportional to the decision:

- For an existing product surface, start from the accepted baseline and make
  the smallest localized change that answers the request. Do not replace the
  product shell with a disconnected demo application or move the affected
  behavior into an unrelated standalone visualizer.
- Build one critical journey before secondary flows.
- Include alternate, loading, empty, permission, error, and recovery states only when they affect the product decision.
- Compare alternatives only when the request asks for comparison or the requirements engineer identifies a real ambiguity.
- Do not build a prototype when a focused static artifact or direct clarification would answer the question more effectively; return that recommendation.

## Bootstrap Routing

- For an existing frontend, check only whether the active Product ticket
  worktree has an applicable accepted `prototype-bootstrap-report.md` for the
  established canonical prototype repository/root. Do not inspect or inventory
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
  [product-prototype-repository-management](../product-prototype-repository-management/SKILL.md)
  with `Mode: Initial Bootstrap` and an action to independently establish the
  exact current-experience baseline. Do not attach the requirements package or
  add discovered routes, contexts, expected states, implementation guidance,
  run instructions, fixtures, or requirement IDs. They are not inputs to the
  independent current-experience bootstrap. The prototype repository/root and
  target worktree are locations, not a request to pre-inventory or prescribe
  the implementation.
- For `Mode: Correction`, reuse the fixed schema, change `Action` to correct the
  named baseline gaps, and add only the established prototype repository/root,
  bootstrap-report path, and failed or unsubstantiated inventory IDs. For
  `Mode: Refresh`, change `Action` to refresh the established baseline and add
  only the established prototype repository/root, report path, and explicitly
  selected new source authority. Preserve the stable package identifier in all modes.
- When the Bootstrapper returns, read and review the runnable prototype,
  `prototype-bootstrap-report.md`, and referenced evidence directly. Accept an
  existing-frontend baseline only when its selected source and revision are
  explicit, the browser prototype is independently runnable, every distinct UI
  inventory item has matched source and prototype evidence, no known perceptible
  appearance or client-behavior difference remains, and production capabilities
  are replaced by documented local simulations. If correction is required,
  classify the outcome as `Baseline Needed` again and send the failed or
  unsubstantiated UI inventory IDs through the handoff rules.
- If the established prototype repository/root has an applicable accepted
  baseline report, read its current implementation and artifacts in the active
  ticket worktree and skip initial bootstrap. Request a refresh when an
  explicitly selected new source authority differs from the report. Request a
  correction when any known perceptible or behavioral difference or
  unsubstantiated distinct UI item remains.
- Do not start requirements-driven feature or design work on an unreviewed,
  failed, unsubstantiated, stale, or blocked current-experience baseline.

## Operating Sequence

1. Read the active Product ticket and management state, then restate the
   decision questions, in-scope IDs, critical journey, constraints, and
   non-goals. Read applicable requirements, investigation, revision, and
   feedback artifacts when they exist.
2. Use the management skill's active ticket worktree, accepted base revision,
   repository instructions, and runtime-isolation record. Do not create a
   second ticket worktree, switch the canonical checkout, or edit a production
   or source path from this mode.
3. Inspect the accepted current-experience baseline and its bootstrap evidence
   in the active worktree. Apply the bootstrap routing rules before any
   existing-frontend future-state work. If the baseline is absent or fails
   acceptance, return `Baseline Needed` through the management and handoff
   process and stop future-state work until Product Prototyper accepts it.
4. Create or update only the mode-specific source and supporting artifacts in
   the active ticket worktree. Preserve the accepted baseline and implement the
   smallest future-state delta that exercises the requested decisions. For
   no-frontend work, build the smallest runnable experience directly in the
   management-established baseline worktree.
5. Start the prototype using the runtime resources recorded by the management
   skill. Validate the critical journey, relevant scenarios, preserved baseline
   surfaces, and production-quality visual finish in a browser. Correct every
   observed visual or interaction discrepancy and repeat validation before
   presenting the review URL.
6. Keep the prototype available, give the user the review URL and concise
   review focus, and provide the evidence needed for management to set the
   ticket status to `Awaiting User Review`. Request explicit feedback.
7. Apply focused feedback that stays within the current scope, preserve
   accepted behavior, and provide the evidence needed for management to set the
   ticket back to `In Progress`. Revalidate affected and relevant regression
   paths, and repeat review as needed.
8. After explicit user confirmation, perform final browser and visual
   validation, including the approved experience through its normal/default
   entry point rather than relying only on a preview URL. If that validation
   requires a material visible or behavioral change, reopen user review before
   finalizing.
9. Capture canonical screenshots for relevant pages, states, and viewports in
   the current ticket's `visual-references/` directory using stable `VIS-*`
   IDs.
10. Complete `ui-ux-spec.md` and useful mode-specific supporting artifacts,
    including the approval reference, final screenshots, detailed behavior,
    mocked boundaries, source pin, and validated journeys. Keep them under the
    active ticket folder. Include the canonical repository, ticket branch,
    accepted base, and resulting prototype revision from management state when
    recording provenance.
11. Return the completed mode artifacts and final validation evidence to the
    management skill. It records the final ticket state, commits the accepted
    baseline or prototype result on the Product ticket branch, integrates and,
    when an approved preview candidate is the intended product baseline,
    promotes it according to repository policy, moves an accepted ticket to
    `tickets/done/`, and performs safe runtime/worktree cleanup. Do not claim
    completion before integration and any required baseline promotion are
    durable.
12. Classify the final package as `Prototype Completed` only after management
    finalization succeeds, then follow the handoff rules with the ticket record,
    final UI/UX package, repository state, and every still-relevant supporting
    artifact.

## Prototype Evolution Rules

- For an existing prototype, read the current prototype artifacts and implementation before changing either.
- Treat the accepted UI inventory and its exact visual evidence as the
  preservation baseline. Keep unaffected appearance and user-facing behavior
  exact while distinguishing each requirements-driven intentional delta.
- When material revision rounds need traceability, create `prototype-change-log.md` and assign every recorded addition, behavior change, or removal a stable, never-reused `PC-*` ID.
- Record which accepted behaviors are preserved, intentionally changed, or removed.
- Keep existing transition and scenario IDs stable when their meaning has not changed.
- Update the UI/UX specification, applicable supporting artifacts, and implementation only where the approved prototype request or user feedback requires it.
- Validate the changed journey and affected baseline behavior. When a change
  touches shared navigation, layout, design tokens, or prototype state,
  revalidate the related shared surfaces rather than unrelated product scope.
- For removals, delete obsolete UI, routes, scenarios, and artifact statements instead of retaining compatibility behavior without an explicit requirement.

## Implementation Principles

- Keep shared state and asynchronous status in an appropriate store or composable; keep local presentation state near the component.
- Preserve the prototype's high-experience-fidelity, low-implementation-fidelity
  boundary. Extend prototype-native state and fixtures instead of introducing
  production protocols or runtimes unless those mechanisms are themselves part
  of the user-facing decision.
- Treat production quality as a UI/UX standard: the approved prototype must be
  visually finished and precise enough for downstream frontend implementation,
  without implying production backend or runtime readiness.

## Validation

- Read the project's README and applicable development instructions before choosing commands or starting services.
- Verify the documented install/start command, entry route, and scenario-selection method.
- Exercise the critical journey from its real prototype entry point.
- Validate every requested deterministic scenario and visible outcome.
- Keep UI-controlled labels, instructions, formatting, validation, feedback,
  and recovery messages synchronized across the runnable prototype,
  `ui-ux-spec.md`, and final references. Mark synthetic domain record values as
  illustrative when they are not intended requirements.
- Inspect desktop and narrow-mobile layouts when the experience is responsive.
- After implementing or revising UI, compare the browser result with the exact
  accepted baseline for preserved areas and with the approved intended design
  for changed areas. Fix every visible or interaction discrepancy and repeat
  browser validation until none remains.
- Use interim screenshots only as disposable review aids when needed.
- Capture final reference screenshots only after explicit user confirmation and final validation of the corresponding states.
- Reconfirm with the user after any post-confirmation change that materially alters visible or interactive behavior.
- Run the available build, typecheck, lint, unit, or browser checks that are proportionate to the prototype.
- Record exact commands, results, review URL, and any limitation.
- For an explicitly approved preview candidate, validate the normal/default
  entry point as well; a review URL alone does not prove baseline promotion.
- Keep the prototype process available during active user review. Clean it up after the review stage ends or the user no longer needs the live URL, without disrupting unrelated user processes.

## Quality Gate

Before reporting the prototype as completed, confirm:

- the prototype repository/root is distinct from production frontend paths and
  its source pin, accepted base, ticket branch/worktree, and committed prototype
  revision are recorded
- an explicitly approved preview candidate, when present, is promoted so the
  approved experience is reachable through the normal/default entry point
  without preview-only state, and the promotion evidence is recorded
- the ticket identifier, ticket status, ticket folder, and linked artifacts are
  recorded and agree
- repository management has recorded the integration result and safe cleanup
  result, or the exact reason either is not required or is blocked
- a completed ticket is under `tickets/done/<ticket-id>/`; a blocked or
  unfinished ticket remains under `tickets/in-progress/<ticket-id>/`
- an existing-frontend prototype has an accepted, applicable, exact-fidelity
  `prototype-bootstrap-report.md`
- the documented command starts the prototype and the critical journey is runnable
- `ui-ux-spec.md`, the runnable prototype, final screenshots, and applicable supporting artifacts agree
- the UI/UX specification records the user's confirmation reference
- every requested action has visible feedback and every important transition has a stable ID
- changed behavior and relevant previously accepted journeys have been exercised
- simulation boundaries, simplifications, and production gaps are explicit
- the visual direction is specific to the product rather than a generic starter screen
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

## Findings Rules

- Tie every finding to a requested requirement, behavior, acceptance criterion, or decision question.
- Distinguish observed prototype behavior from recommended requirement changes.
- Record which alternatives were explored, what evidence differentiates them, and what decision remains with the user.
- Do not silently convert a prototype convenience into a product requirement.
- Treat user feedback that materially changes scope, requirements, acceptance criteria, or governing constraints as a requirement-impact finding; return it to `requirements_engineer` before implementing it.
- If codebase or contract evidence contradicts the draft requirement, report the contradiction with its source; do not rewrite canonical requirements.

## Handoff Rules

- Use these rules at each `Baseline Needed`, `Prototype Completed`, `Requirement Impact`, `Not Recommended`, or `Blocked` outcome.
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
  artifact. Do not create a second prototype-specific task ID.
- If no returned rule applies, return the outcome to the user or calling workflow.
- After all required messages succeed, end the current stage and do not poll.
- Complete the completed-prototype handoff only after user confirmation and final artifact production. If progress is blocked, return the blocker; if a prototype is not recommended, return the decision rationale and evidence path instead of claiming prototype completion or creating final UI/UX artifacts.
- A requirement-impact handoff may occur during prototype review; include the exact user feedback, affected IDs, and prototype evidence, then wait for a revised requirements package.
- For `Baseline Needed`, the applicable fixed Bootstrapper payload in the
  [repository-management skill](../product-prototype-repository-management/SKILL.md)
  is the complete request; do not append the requirements package or the
  Product Prototyper ticket package under the general artifact rule. Keep the
  ticket status and bootstrap result in the Product Prototyper's ticket folder.
- For `Prototype Completed`, include absolute paths to `ui-ux-spec.md`, the
  runnable prototype, final screenshots, the applicable
  `prototype-bootstrap-report.md`, and every still-relevant supporting
  artifact. Include the ticket record and folder, prototype repository/root,
  ticket branch/worktree, accepted base, prototype revision, source pin,
  integration and cleanup result, user-confirmation reference, validated
  journeys and scenarios, mocked boundaries, prototype findings, and unresolved
  decisions.
