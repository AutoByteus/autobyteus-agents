# Preview Candidate to Default Baseline Review

Review Status: Implemented; final consistency review passed

## User request and scope

Clarify and strengthen the Product Design & Prototyping workflow so that a
user-approved preview candidate is promoted into the default prototype
baseline. Keep the rule general and outcome-focused: preview URLs may be used
during exploration and review, but an approved candidate must be reachable
through normal/default entry points without depending on preview-only state
before the prototype is reported complete.

Scope is limited to the prototype principles, Product Prototyper repository
lifecycle, Product Experience Prototyper workflow, and the shared prototype
ticket template. No prototype application code is changed by this optimization.

## Current behavior and package ownership baseline

- `product-prototype-principles.md` defines repository lifecycle and status
  transitions, but does not distinguish Git integration from default-experience
  promotion.
- `product-prototype-repository-management/SKILL.md` owns commits, integration,
  ticket closure, and cleanup, but its post-integration sequence has no explicit
  default-entry-point promotion gate.
- `product-experience-prototyper/SKILL.md` owns user review, approval, final
  validation, and the product-experience result, but its final validation does
  not require the approved candidate to work from normal/default entry points.
- `prototype-ticket-template.md` records accepted base, prototype revision, and
  integration result, but has no field for the promoted default baseline or its
  validation evidence.
- The reported prototype used `prototypeReview=agent-org-flat` to render the
  approved experience. Review validation passed because it always opened the
  review URL, while clean routes and normal shell navigation still exposed the
  older experience.

## Preserved behavioral invariants and user-authority boundaries

1. Preview/review URLs remain valid tools for exploring and reviewing
   candidates; this change does not ban variants or require a particular URL
   format.
2. Only the explicitly user-approved candidate may become the default baseline.
3. User approval remains the authority for intentional future-state UI/UX.
4. Git worktree isolation, repository ownership, ticket provenance, source
   pinning, synthetic/local runtime boundaries, and dynamic handoff rules remain
   unchanged.
5. Integration and promotion remain distinct facts and must not be reported as
   interchangeable.
6. Future requirements-driven prototype work must use the promoted baseline as
   its accepted starting point.

## Macro analysis

### Package topology and ownership

The current ownership split is mostly sound. Shared principles own cross-role
prototype invariants, repository management owns Git/ticket lifecycle, the
Product Experience skill owns review and experience validation, and the ticket
template records durable state. The missing behavior is a cross-file contract:
no current owner states when an approved review candidate becomes the default
baseline.

### Authoritative sources and boundaries

Add one concise promotion invariant to the shared lifecycle contract. Keep the
repository-management skill responsible for recording promotion alongside
integration, and keep the Product Experience skill responsible for proving the
approved candidate through normal/default entry points. Add only the minimum
ticket fields needed to preserve the result.

### Logical flow and content architecture

The intended spine is:

`preview candidate -> user approval -> final validation -> integrate -> promote
to default baseline -> record promoted revision -> handoff`

The current spine skips the promotion step and moves directly from approval and
review evidence to integration and completion.

### Behavioral grounding and invariants

The reported source confirms the gap: the approved UI was selected by a
preview-only query, and the validation matrix used that query for every review
route. The workflow therefore proved candidate behavior, not default-baseline
behavior.

### Outputs, validation, recovery, and handoff

Completion must include both integration evidence and default-entry-point
promotion evidence. If the approved candidate is integrated but still requires
preview-only state, the result is not complete; preserve the ticket state and
report promotion as incomplete rather than claiming a new baseline.

## Micro analysis

### Wording and terminology

Use “preview candidate,” “approved candidate,” “default baseline,” and
“promotion” consistently. Avoid prescribing a specific query parameter,
framework, or variant-management mechanism in the general skill.

### Qualifiers, conditions, and exceptions

The condition should be attached to completion: “After explicit approval of a
preview candidate, promote it before reporting the prototype as complete.” The
promotion test should be expressed as a user-visible outcome, not as a rigid
implementation recipe.

### Redundancy, transitions, and economy

Do not add a large variant taxonomy or a new workflow mode. Add one lifecycle
distinction, one focused validation requirement, and concise provenance fields.
Historical review URLs can remain in evidence without becoming default entry
points.

## Findings and evidence

### Macro findings

- **Critical — Missing promotion state.** The lifecycle equates an integrated
  commit with a promoted baseline. Evidence: the repository-management
  integration sequence and shared status table have no default-exposure
  criterion.
- **High — Missing default-entry validation owner.** The product skill validates
  the review journey but does not require normal/default entry-point validation.
- **High — Incomplete durable contract.** The ticket template records the
  integrated revision but not the promoted baseline revision or proof.

### Micro findings

- **High — Review evidence is treated as baseline evidence.** The validator's
  review URL helper injects the preview state into every route.
- **Medium — Completion language is too broad.** “Prototype Completed” and
  “Integration target/result: Completed” can be read as default promotion even
  when only the review candidate is reachable.
- **Medium — The missing step is easy to omit.** No concise transition tells the
  agent to re-enter the approved candidate through normal navigation after
  integration.

## Proposed improvements

### Macro actions, in order

1. **Update** `shared/product-prototype-principles.md`: state that explicit
   approval of a preview candidate requires promotion into the default
   baseline before completion; define promotion as reachability from normal or
   default entry points without preview-only state; permit review URLs to remain
   as evidence.
2. **Update** `product-prototype-repository-management/SKILL.md`: separate
   integration from promotion in the finalization sequence and require the
   promoted baseline revision/evidence before marking a completed ticket.
3. **Update** `product-experience-prototyper/SKILL.md`: add a concise final
   validation step for the approved experience through normal/default entry
   points, while retaining review URLs for candidate review.
4. **Update** `shared/templates/prototype-ticket-template.md`: add fields for
   promoted default baseline revision and default-entry-point validation.

### Micro actions, in order

1. **Keep** existing preview/review URL language and user approval boundaries.
2. **Rewrite** completion language where it can imply that integration alone
   establishes the default baseline.
3. **Add** the terms “approved candidate,” “promoted default baseline,” and
   “default-entry-point validation” at the relevant lifecycle boundaries.
4. **Remove** no existing variant or review mechanism; the optimization is an
   ownership and transition clarification, not a restriction on exploration.

## Assumptions, open questions, and risks

- “Normal/default entry point” is intentionally implementation-neutral and may
  be a clean route, standard shell navigation, or another established product
  entry path.
- A historical or explicitly selected preview URL may remain available for
  review and comparison after promotion; it must not be the only route to the
  approved experience.
- No new status enum is required for this focused correction. The existing
  result can remain incomplete/blocked until promotion evidence exists.
- The main risk is future work branching from a Git revision whose default
  behavior does not match the approved experience. The added gate addresses
  that risk without prescribing how candidates are implemented.

## Validation plan

1. Check the edited files for consistent terminology and one owner per rule.
2. Confirm the lifecycle reads approval -> final validation -> integration ->
   promotion -> completion/handoff.
3. Confirm preview URLs remain allowed for review and are not required for the
   promoted default experience.
4. Resolve all edited Markdown links and run `git diff --check`.
5. Run the available standard skill/package validator for each changed skill.
6. Perform macro and micro review passes against the preserved invariants.

Target skill files changed during analysis: None

Analysis artifact:
`.codex/artifacts/prototype-baseline-promotion/optimization-analysis.md`

## Post-approval implementation and validation record

- Approval recorded: User explicitly approved the relaxed preview-to-default
  promotion language and requested the update.
- Target files changed:
  - `agent-teams/product-design-prototyping-team/shared/product-prototype-principles.md`
  - `agent-teams/product-design-prototyping-team/agents/product-prototyper/skills/product-prototype-repository-management/SKILL.md`
  - `agent-teams/product-design-prototyping-team/agents/product-prototyper/skills/product-experience-prototyper/SKILL.md`
  - `agent-teams/product-design-prototyping-team/shared/templates/prototype-ticket-template.md`
- Behavior preserved or intentionally changed: Preview/review URLs remain
  available for candidate exploration and evidence. An explicitly approved
  candidate must now be promoted to the default baseline, validated through a
  normal/default entry point, and recorded separately from integration when
  needed. Completion is no longer implied by Git integration alone.
- Validation performed and result: `quick_validate.py` reports `Skill is
  valid!` for both changed skills; 14/14 Markdown links resolve; JSON metadata
  parses; promotion-contract assertions pass; and `git diff --check` passes.
  No prototype application code or external prototype repository was changed.

## Macro review pass

- Invariants checked: User approval, preview flexibility, default entry-point
  reachability, repository/worktree isolation, integration ownership, ticket
  provenance, and future work starting from the promoted baseline.
- Grounding issues: None found. The rule is grounded in the reported
  `prototypeReview` failure and remains implementation-neutral.
- Flow or ownership issues: Resolved. Shared principles own the invariant,
  repository management owns integration/promotion state, Product Experience
  Prototyping owns final default-entry validation, and the ticket template
  records the resulting provenance.
- Cross-file issues: None found. The shared lifecycle, repository finalization,
  product quality gate, and ticket fields now express the same transition.

## Micro review pass

- Redundancy removed: No large variant taxonomy or new workflow mode was
  added; the change uses one concise promotion rule and focused reminders at
  validation/finalization boundaries.
- Defensive wording retained and why: The preview-only-state condition is
  retained because it protects the user-visible baseline and future-work
  starting point. Existing approval, isolation, and integration safeguards are
  unchanged.
- Transitions repaired: The effective sequence is now preview candidate -> user
  approval -> final normal-entry validation -> integration -> promotion ->
  recorded baseline -> completion/handoff.
- Final residual risk: The runtime still determines what its normal/default
  entry point is; each product ticket must record the concrete evidence. The
  skill intentionally does not prescribe a specific routing mechanism.
