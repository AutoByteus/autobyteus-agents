# Product Design & Requirements Team Consistency Audit

Review Status: Approved change implemented; follow-up validation complete

## User request and review scope

Review the Product Design & Prototyping Team and the Requirements Engineering
Team against the agent-team best practices in `README.md`, especially:

- one authoritative owner for each rule;
- separation between `agent.md`, `team.md`, `SKILL.md`, and `team-config.json`;
- specialist-owned work followed by result-based `get_handoff_rules` routing;
- clear boundaries between Requirements Engineering, Product Prototyping, and
  Prototype Bootstrapper;
- coherent baseline-native versus exploratory-prototype behavior; and
- consistent artifacts, validation, recovery, and handoff contracts.

This is an audit only. No runtime or authoritative team/agent/skill file was
changed during this review. The only new file is this user-visible analysis
artifact.

## Current behavior and package ownership baseline

### Product Design & Prototyping

- `product-prototyper/agent.md` is the local coordinator shell. It selects
  exactly one mode based on the relationship to the product surface:
  `product-experience-prototyper` for an existing product surface or new
  product-facing experience, and `exploratory-requirements-visualizer` for an
  abstract/product-independent question.
- `product-prototype-repository-management/SKILL.md` owns the separate
  prototype repository, Product ticket, branch/worktree, runtime isolation,
  revision, commit, integration, and cleanup lifecycle.
- `product-experience-prototyper/SKILL.md` owns baseline-native product
  experience evolution, user review, approval evidence, UI/UX specification,
  final references, and product-mode validation.
- `exploratory-requirements-visualizer/SKILL.md` owns independent conceptual
  visualization, cognition-first design, exploratory artifacts, and
  clarification evidence. It explicitly routes existing-product surfaces to
  Product Experience instead of building a disconnected visualizer.
- `prototype-bootstrapper/SKILL.md` owns only current-experience discovery,
  parity implementation, comparison evidence, and its bootstrap report in a
  Product-assigned worktree. Product Prototyper accepts and commits the result.
- Product `team-config.json` owns the local Product-Prototyper/Bootstrapper
  route; the software-department `team-config.json` owns cross-team routes.

### Requirements Engineering

- `requirements-engineer/SKILL.md` owns investigation, canonical
  requirements, acceptance criteria, user approval, requirements revision
  history, and the post-approval architecture-design routing assessment.
- It records and forwards explicit or clarified Product Design intent as the
  generic `Product Design Requested` outcome. It does not select the Product
  mode or prescribe Product repository, ticket, bootstrap, or implementation
  operations.
- Product Design results return as evidence. Requirements Engineering records
  user decisions and integrates only approved behavior into its canonical
  requirements package.
- `requirements-engineering-team/team-config.json` is intentionally empty;
  the parent software-department configuration owns the cross-team routes.

## Preserved invariants

The following behavior is coherent and should remain unchanged unless a later
approved design explicitly changes it:

1. Existing route/component/screenshot-backed/preserved-interaction requests
   use baseline-native Product Experience Prototyping; they must not be turned
   into standalone visualizers.
2. Independent conceptual requests may use the exploratory visualizer, but it
   does not create the canonical requirements or final `ui-ux-spec.md`.
3. Bootstrapper reproduces current experience only; it does not design future
   behavior, own Product tickets, or create the accepted Product commit.
4. Product Prototyper owns the separate prototype repository and per-ticket
   worktree lifecycle. Requirements Engineering only references externally
   owned Product artifacts.
5. Requirements Engineering forwards Product Design context without choosing
   the Product mode. The Product Prototyper makes that decision after receipt.
6. Each specialist persists its result, calls `get_handoff_rules`, applies
   every matching rule, sends to each exact returned `recipient_address` with
   `send_message_to`, and stops or returns to its caller when no rule matches.
7. User approval remains the authority for future product behavior and final
   Product UI/UX artifacts.

## Macro analysis

### Package structure, ownership, and authoritative sources

**Overall result: structurally sound, with two ownership/contract gaps.**

- The four-layer separation in `README.md` is substantially respected:
  `agent.md` provides identity and selection, `team.md` provides boundaries and
  high-level coordination, the skills provide specialist procedures, and
  configuration files provide runtime routing.
- The shared Product principles are correctly symlinked into all three Product
  skill packages, so the fidelity, repository, approval, and isolation rules
  have one shared source.
- **Finding M-01 — Medium, schema ownership:**
  `product-experience-prototyper/templates/prototype-ticket-template.md` is
  described as the common `prototype-ticket.md` template, but the exploratory
  skill imports it through a sibling-mode path. A ticket schema used by both
  modes belongs to the repository-management skill or a Product team-shared
  template area, not under one mode skill. This is not currently a behavioral
  contradiction, but it creates an ownership dependency and makes the
  Product Experience skill appear to own a cross-mode artifact.
- **Finding M-02 — Medium, lifecycle ordering:**
  `product-prototyper/agent.md` says to apply repository management first and
  select a mode afterward. Both mode skills then independently say to apply
  repository management before the mode and again after the mode. The shared
  management skill also says it runs before and after exactly one mode skill.
  Read literally, the entry path can apply the management lifecycle twice
  before mode work starts. This conflicts with a single clear execution spine
  and can cause duplicate ticket/worktree initialization or repeated state
  transitions.

### Content architecture and logical flow

**Overall result: the primary flows are coherent after the earlier naming and
ownership correction, but a few exits are underspecified.**

- Product flow is understandable: select the appropriate mode, establish or
  resume Product isolation, perform mode work, validate/review, finalize via
  Product repository management, then route the result.
- Requirements flow is understandable: investigate, define and approve the
  requirements package, optionally forward generic Product Design context,
  integrate returned evidence, assess architecture routing, then hand off the
  approved result.
- The baseline boundary is logically placed: Product Experience cannot proceed
  with future-state work until the Bootstrapper result is accepted.
- **Finding M-03 — Medium, exit normalization:**
  the exploratory skill explicitly maps request-gap outcomes to `Blocked`, but
  Product Experience says “return the gap” without defining its result value,
  and Bootstrapper says “return a precise input gap” while its result contract
  only permits `Completed` or `Blocked`. The likely intended behavior is that
  missing decision/journey/frontend/workspace inputs are `Blocked`, but the
  mode contracts should say this explicitly so `team-config.json` can always
  match the result.
- Product team `team.md` repeats a concise version of mode selection already
  present in Product Prototyper `agent.md`. Because the README permits a
  high-level team-path summary, this is not a contradiction; it is a low-level
  economy issue rather than a missing owner.

### Behavioral grounding, outputs, validation, recovery, and handoff

**Overall result: required product/review/repository invariants are well
covered; file-backed handoff behavior is not explicit enough in the runtime
packages.**

- Product Experience requires accepted-baseline inspection, localized delta,
  preserved behavior, browser comparison, user confirmation, final references,
  and durable repository finalization.
- Exploratory Visualization requires a cognition-first design pass, simple
  representation, controlled motion, comprehension evidence, review status,
  and explicit non-approval boundaries.
- Bootstrapper requires source pinning, complete observable inventory,
  matched browser validation, deterministic local simulation, and truthful
  `Completed`/`Blocked` reporting.
- Requirements Engineering requires evidence-grounded requirements, user
  approval, canonical artifact paths, and explicit direct-versus-architecture
  routing fields.
- **Finding M-04 — Medium, communication contract:** `README.md` requires a
  file-backed handoff by default: write the complete handoff/result file first,
  mention its absolute path in `send_message_to`, attach it in the reference
  files field, and have the receiver read it. The scoped teams currently
  require durable artifacts and absolute paths, but do not explicitly require
  this write/mention/attach/read sequence. The current wording is therefore
  compatible with the practice but not sufficiently enforceable for a runtime
  agent.
- Route coverage itself is consistent: Product-local bootstrap outcomes match
  the Bootstrapper contract, Product cross-team outcomes match the two Product
  mode contracts, and Requirements outcomes match the parent department
  routes. No missing canonical recipient or stale renamed skill identifier was
  found in the inspected package.

## Micro analysis

### Terminology and qualifiers

- **Finding m-01 — Low, Requirements Engineer shell wording:**
  `requirements-engineer/agent.md` calls its skill responsible for “prototype
  coordination.” The skill now deliberately says Requirements Engineering
  only records/forwards Product Design context and integrates returned evidence;
  Product Prototyper owns Product coordination. “Product Design request
  context and evidence integration” would be more precise and avoid reopening
  the old ownership ambiguity.
- “Product Design Requested,” “Requirements Visualization Ready,” “Prototype
  Completed,” “Requirement Impact,” and `Blocked` are used consistently between
  the relevant skills and routing configuration. The gap wording is the only
  result vocabulary that is not consistently normalized (Finding M-03).

### Redundancy and economy

- The repeated `get_handoff_rules` / `send_message_to` instructions in
  `agent.md`, `team.md`, and each skill are mostly intentional: the README
  specifically requires the universal agent/team convention and the skill
  owns the specialist handoff procedure. Keep the safety-critical instruction,
  but avoid adding more copies.
- Requirements Engineer repeats Product non-ownership in several sections.
  This repetition protects a high-risk boundary, but the detailed statement
  that Bootstrapper returns work and Product Prototyper commits the separate
  repository is not needed for Requirements Engineering's own procedure. It
  could be shortened to “Product artifacts and lifecycle remain externally
  owned; link the delivered evidence.” This is an optional cleanup, not a
  functional inconsistency.
- Product team mode-selection text is useful as a high-level path summary, but
  the exact decision rule should remain authoritative in
  `product-prototyper/agent.md`; the team summary can point to it rather than
  restating the full condition.

## Findings summary

| ID | Severity | Finding | Current impact |
| --- | --- | --- | --- |
| M-01 | Medium | Common Product ticket template is owned by one mode skill while consumed by both modes. | Cross-mode schema ownership is indirect and can drift. |
| M-02 | Medium | Repository management is instructed before mode selection and again by the selected mode. | Entry lifecycle can be interpreted as duplicate initialization. |
| M-03 | Medium | Product Experience and Bootstrapper gap exits do not explicitly normalize to `Blocked`. | A gap result may fail to match the configured route. |
| M-04 | Medium | README file-backed handoff protocol is not explicit in scoped runtime contracts. | Agents may send paths without creating/attaching a complete handoff file. |
| m-01 | Low | Requirements Engineer `agent.md` uses broad “prototype coordination” wording. | Minor scope ambiguity. |
| m-02 | Low | Product `team.md` repeats mode-selection detail. | Minor duplication; no behavior conflict. |
| m-03 | Low | Requirements skill repeats Product ownership boundaries more than necessary. | Minor verbosity; boundary itself is correct. |

No major ownership contradiction was found between Requirements Engineering,
Product Prototyper, and Bootstrapper. In particular, Requirements Engineering
no longer selects the Product mode or owns Product tickets/repositories, and
existing-product visualization is now directed to baseline-native Product
Experience Prototyping.

## Proposed improvements (not applied)

1. **Update — resolve management ordering (M-02).** Select the Product mode
   from the request first, then apply repository management once before the
   selected mode and once for finalization after it. Keep the current
   management ownership and all isolation safeguards.
2. **Move — centralize the common ticket schema (M-01).** Move
   `prototype-ticket-template.md` to the Product repository-management skill's
   templates or a Product team-shared templates area. Update both mode skills
   to reference that single owner.
3. **Update — normalize gap outcomes (M-03).** State explicitly in Product
   Experience and Bootstrapper that missing required inputs are recorded as a
   precise `Blocked` result, and keep their handoff sections/configuration
   aligned with that value. Preserve exploratory mode's existing request-gap
   evidence while mapping it to `Blocked` for routing.
4. **Update — make file-backed handoffs executable (M-04).** Add one concise
   team-shared handoff rule (or direct cross-reference) requiring a complete
   handoff/result file, absolute path in the message, attachment in the
   reference-files field, receiver read-before-act behavior, and result/status
   file before return. Do not duplicate the full protocol in every skill.
5. **Rewrite — narrow Requirements Engineer shell wording (m-01).** Replace
   “prototype coordination” with “Product Design request context and evidence
   integration.” Keep mode selection and Product lifecycle ownership in Product
   Prototyper.
6. **Shorten — reduce safe duplication (m-02/m-03).** Keep `team.md` as a
   high-level path summary and keep the exact mode/ownership rules in the
   authoritative agent or skill. Remove only repeated explanatory wording; do
   not remove the non-ownership safeguards.

## Assumptions, open questions, and risks

- This audit treats the current uncommitted authoritative files as the review
  subject and preserves them; earlier approved work in the working tree was
  not reset or rewritten.
- The intended repository-management lifecycle is one setup pass before mode
  work and one finalization pass afterward. If the runtime intentionally
  requires a separate preflight pass, that should be named as a distinct
  read-only preflight rather than another application of the lifecycle skill.
- The intended route for a missing Product Experience or Bootstrapper input is
  assumed to be `Blocked`, because that is the only compatible configured
  recovery outcome. Confirm if a separate request-gap route is desired.
- README's file-backed handoff requirement is treated as a runtime team
  contract, not merely documentation for future team authors.
- No implementation-oriented skill edit, commit, push, merge, or runtime test
  was performed as part of this audit.

## Validation plan after approval

1. Apply only the approved ownership/order/wording changes.
2. Parse all Product, Requirements, and parent department JSON configuration.
3. Verify every configured skill name, frontmatter name, symlink, and Markdown
   link resolves.
4. Re-run a route/result matrix for Product Experience, Exploratory
   Visualization, Bootstrapper, and Requirements outcomes.
5. Review each workflow in order: intake -> owned work -> artifacts ->
   validation/recovery -> result classification -> handoff -> stop.
6. Confirm the file-backed handoff protocol is represented without duplicating
   the full routing matrix in `team.md` or `SKILL.md`.
7. Run `git diff --check` and complete a second macro pass followed by a
   micro-economy pass.

## Validation performed for this analysis

- Inspected all Product Design & Prototyping and Requirements Engineering
  `agent.md`, `team.md`, `team-config.json`, `agent-config.json`, skills,
  shared principles, templates, and linked paths.
- Compared the package against the README sections on team package ownership,
  file-backed communication, specialist ownership, conditional routing, and
  fixed agent shells.
- Parsed five relevant JSON configurations successfully.
- Verified all configured skill bindings resolve with matching SKILL.md
  frontmatter names.
- Checked 31 scoped Markdown files; all scoped relative links resolved.
- Confirmed no stale `requirements-prototyper` or
  `interactive-requirements-visualizer` identifiers remain in the authored
  Product/Requirements package.
- Confirmed the Product and Requirements result labels inspected in the skills
  are represented by the corresponding routing configuration.
- `git diff --check` passed.

Target skill files changed during analysis: None

Analysis artifact:
`.codex/artifacts/product-and-requirements-team-consistency-audit/optimization-analysis.md`

## Post-approval implementation record

Approval received: the user approved the highest-priority lifecycle fix.

Implemented:

- Updated `agent-teams/product-design-prototyping-team/agents/product-prototyper/agent.md`.
- Mode selection now occurs before the Product Prototyper invokes the shared
  repository-management lifecycle.
- The selected mode workflow remains responsible for applying repository
  management for entry setup and post-validation finalization.
- Removed the agent-shell instruction that applied a duplicate setup pass.
- Preserved the repository-management ownership, ticket/worktree isolation,
  finalization, commit, integration, cleanup, and handoff rules.

Follow-up macro review:

- The entry spine is now `select one mode -> mode-owned management setup ->
  mode work -> validation/review -> management finalization -> handoff`.
- `product-prototype-repository-management/SKILL.md` remains the lifecycle
  authority; the mode skills remain its before/after execution points.
- No duplicate “first apply” setup instruction remains in the Product
  Prototyper package.
- No additional Product or Requirements ownership contradiction was introduced.

Follow-up micro review:

- The new agent-shell wording is explicit about the actor, timing, and purpose
  of repository management.
- The universal post-work handoff convention remains unchanged.
- No unrelated authoritative files were modified for this fix.

Validation after implementation:

- Product Prototyper lifecycle wording was reviewed across the agent shell,
  repository-management skill, and both mode skills.
- Configured Product skill bindings and routing contracts remain unchanged and
  were previously validated as resolving correctly.
- `git diff --check` passed.

Target skill files changed during implementation: None. The changed file is the
Product Prototyper agent shell; the skill package itself was not modified.

## Post-approval implementation record: normalized gap outcomes

Approval received: the user approved the next-highest-priority fix for
unnormalized gap outcomes.

Implemented:

- Product Experience now classifies a missing decision question or observable
  journey as `Blocked`, records the precise missing input and recovery question,
  and treats the gap as a reason rather than a separate handoff outcome.
- Prototype Bootstrapper now classifies ambiguous/unreachable frontend input,
  conflicting source constraints, and missing correction/refresh fields as
  `Blocked` with a precise input-gap reason.
- Exploratory Requirements Visualization now consistently represents request
  gaps as `Blocked` with a precise request-gap reason. Its result contract and
  handoff wording no longer present request gaps as a separate route value.
- No routing recipient or ticket status was added; the existing `Blocked`
  routes remain the single configured recovery path.

Follow-up review:

- Product team configuration now has one compatible recovery classification for
  all inspected Product input-gap cases: `Blocked`.
- Existing successful outcomes (`Completed`, `Baseline Needed`, `Prototype
  Completed`, `Requirements Visualization Ready`, `Requirement Impact`, and
  `Not Recommended`) remain unchanged.
- Product Prototyper mode selection and the Requirements Engineer boundary were
  not changed by this fix.

Validation after implementation:

- Searched the Product mode and Bootstrapper skills for standalone input-gap
  classifications; remaining gap language is explicitly a reason/subtype of
  `Blocked` or refers to an observed product gap.
- Parsed five relevant JSON configurations successfully.
- Verified all configured Product and Requirements skill bindings still resolve
  with matching frontmatter names.
- Checked all 31 scoped Markdown files; relative links still resolve.
- `git diff --check` passed.

Target skill files changed during implementation:
`product-experience-prototyper/SKILL.md`,
`exploratory-requirements-visualizer/SKILL.md`, and
`prototype-bootstrapper/SKILL.md`.
