# Interactive Requirements Visualizer Review

Review Status: Implemented; final macro and micro consistency review passed

## User request and scope

Add a separate Product Prototyper skill for interactive, animated
requirements visualization. Keep it distinct from final product prototyping,
allow the same Product Prototyper to receive either mode, preserve Product
Design & Prototyping ownership of its repository and tickets, and recheck the
Requirements Engineering, Product Design & Prototyping, and Software
Development Department contracts for logical and usable handoffs.

## Preserved behavioral invariants

- Requirements Engineering owns canonical requirements, acceptance criteria,
  clarification decisions when it owns that context, and explicit user
  approval.
- Product Prototyper owns the separate prototype repository, project, ticket
  lifecycle, durable commits, visualizer source, and final prototype artifacts.
- Prototype Bootstrapper owns only current-experience baseline parity and
  returns its report to Product Prototyper.
- Interactive visualization is exploratory review evidence, not a final
  `ui-ux-spec.md`, production architecture, or implicit approval.
- Final prototype mode remains the path for approved UI/UX specification and
  normative final visual references.
- Completed work calls `get_handoff_rules`, applies every matching rule, and
  sends to each exact returned recipient; no matching rule returns to the
  user/calling workflow.

## Macro analysis

### Package structure and ownership

The existing final-prototype skill already owns runnable product experiences,
baseline acceptance, final UI/UX specifications, and final visual references.
Adding visualization as a second mode inside the same Product Prototyper keeps
repository and ticket ownership unified without conflating exploratory and
final artifacts. A sibling `interactive-requirements-visualizer` skill is the
authoritative workflow for the new mode; the agent prompt only selects the
mode.

### Flow and handoff

Requirements Engineering now chooses the least expensive visual path:
interactive visualization for unresolved questions, final prototyping after
behavior is sufficiently understood, or no prototype when direct evidence is
enough. The department config carries explicit mode fields on both incoming
routes. Product results distinguish review-ready visualization, final
prototype completion, requirement impact, not recommended, and blocked
outcomes.

Direct user requests and Requirements Engineering requests use the same mode
contract. The sender is not used as a separate workflow branch; if no handoff
rule applies, the Product Prototyper returns the result to the user or calling
workflow.

### Artifacts, validation, and approval

The visualizer produces a brief, runnable source, review record, browser
validation evidence, review URL when available, modeled-state/mock-boundary
notes, and open questions. Its ticket stays in progress while clarification
is open. The final-prototype skill remains the only owner of `ui-ux-spec.md`
and normative final visual references. Browser interaction, replay/reset,
responsive behavior, and non-motion accessibility are explicit visualizer
checks.

## Micro analysis

- Replaced sender-specific language with request-mode language so direct user
  and agent-originated requests are handled identically.
- Distinguished “review-ready” from “approved” throughout Product and
  Requirements documentation.
- Used “mode-appropriate artifacts” where the prior generic UI/UX wording
  could imply that exploratory visualization creates a final specification.
- Kept the shared principles authoritative for repository, ticket, approval,
  and baseline rules; kept visualization interaction heuristics in the new
  skill to avoid duplicating its detailed checklist in team files.
- Kept `send_message_to` and dynamic handoff wording aligned with the existing
  team authoring convention.

## Files changed

- Product Prototyper agent config and prompt
- New `interactive-requirements-visualizer` skill and two output templates
- Existing final-prototype mode boundary
- Product Design & Prototyping team contract and shared principles
- Requirements Engineer skill and Requirements Engineering team contract
- Software Development Department routes, summary, and Head ownership wording

## Validation plan

- Parse every JSON file.
- Resolve changed Markdown links and skill bindings.
- Confirm both Product Prototyper skills have matching config and frontmatter.
- Verify the three-team roster and rooted cross-team routes.
- Search for stale repository, ownership, mode, and handoff wording.
- Run `git diff --check` and repeat macro and micro content review.

## Final review and validation

- JSON parsing passed for all 115 repository JSON files.
- Product Prototyper skill bindings, frontmatter names, required handoff tools,
  team coordinators, three-team roster, and mode-specific routes all passed
  focused assertions.
- All local Markdown links in the changed Product, Requirements, and shared
  principle files resolved.
- `git diff --check` passed, and the new visualizer files contain no trailing
  whitespace.
- Macro review found and repaired the final-prototype approval gate applying
  incorrectly to visualization-only work, the visualizer's blocked outcome
  not matching the parent route, and contradictory ticket-closure wording.
- Micro review found no remaining mode, ownership, approval, or handoff
  inconsistency in the changed package.

The repository has a few pre-existing broken relative links outside this
changed package; they were not altered because they belong to unrelated agent
packages.

Target skill files changed during implementation: the new visualizer skill,
the final-prototype skill boundary, and the Requirements Engineer skill.

Analysis artifact:
`.codex/artifacts/interactive-requirements-visualizer/optimization-analysis.md`

## Follow-up review: reusable scaffold and visual simplification

### User-approved outcome

Provide a reusable temporary visualizer project scaffold with a lightweight
default stack and the optional capabilities needed for animation and spatial
visualization. The scaffold must speed up creation without forcing every
visualizer to become a production-like application. Add explicit simplification
and comprehension rules, including a concrete two-person communication versus
delegated-instance example.

### Macro findings

- The skill already permits independent technology selection, but it does not
  provide a copyable project scaffold. Each visualizer must therefore recreate
  build setup and interaction primitives from scratch.
- The running visualizer at `http://127.0.0.1:4178` is visually polished but
  presents a scenario library, multi-panel workbench, JSON inspector,
  identifier panel, and ledger at once. It explains too much system surface
  before the user can understand one decision.
- The skill says to prefer direct manipulation and progressive disclosure, but
  it lacks a measurable simplicity budget and a comprehension gate.

### Preserved invariants

- Exploratory visualization remains distinct from final product prototyping and
  never implies requirements approval.
- The visualizer remains in the canonical Product Prototype repository and
  ticket; the scaffold is copied into a ticket-scoped temporary project rather
  than becoming a new Git repository.
- Technology may differ from the product frontend unless the question depends
  on existing UI behavior or component fidelity.
- Three.js and animation libraries are available capabilities, not mandatory
  visual complexity.

### Proposed and approved changes

1. **Add** `templates/visualizer-project/` with a small React/Vite/TypeScript
   scaffold, `motion`, `three`, `@react-three/fiber`, and `@react-three/drei`
   available in `package.json`. The starter remains a single-question,
   single-journey example and does not include production services or a dense
   dashboard.
2. **Update** the Technology Selection and Operating Sequence sections so the
   agent copies the scaffold for each visualizer ticket, records the chosen
   capability, and uses the smallest active subset of the installed packages.
3. **Add** a Visualization Simplicity And Comprehension section with a default
   budget, progressive disclosure, causal-animation rules, and the concrete
   `send_message_to` two-person versus `delegate_task` new-instance example.
4. **Update** the result/validation contract so the review records the main
   comprehension question, visible complexity, and the non-motion fallback.

### Validation plan

- Parse the template `package.json`.
- Run `npm install` and `npm run build` inside the template project.
- Check template Markdown links, skill references, and no production-repository
  coupling.
- Re-read the skill in execution order for technology, simplicity, artifacts,
  validation, and handoff consistency.
- Run `git diff --check` and a second macro/micro review.

Target skill files changed during this follow-up: the interactive visualizer
`SKILL.md` and its new project template files.

### Follow-up implementation review

- Added and validated the copyable template project with React/Vite/TypeScript,
  `motion`, `three`, `@react-three/fiber`, and `@react-three/drei` available.
- Added a minimal two-person starter example: message animation between two
  existing executions versus a newly appearing delegated worker instance.
- Added the simplicity budget, progressive-disclosure rule, causal-animation
  rule, and comprehension gate to the skill.
- `npm install --include=dev --no-package-lock` completed with zero reported
  vulnerabilities, and `npm run build` passed.
- Template package parsing, skill/template links, changed-file whitespace, and
  `git diff --check` passed.
- Macro re-read found no conflict between independent technology selection,
  template use, repository ownership, and final-prototype boundaries. Micro
  re-read found no remaining ambiguity about optional 3D capability or the
  message/delegation example.

Review Status: Implemented; follow-up macro and micro consistency review passed

## Follow-up review: visualization principles reference

### User-approved outcome

Separate visualization-specific design principles and examples from the
execution skill. The skill should remain the authoritative workflow, while a
principles reference should explain how to make a visualizer simple, truthful,
causal, accessible, and easy to understand.

### Current content-flow findings

- `SKILL.md` currently owns activation, responsibility, design rules,
  simplicity rules, technology selection, repository rules, execution,
  artifacts, results, and handoff. Its execution sections are coherent, but
  the design-principle material is long enough to distract from the workflow.
- The project template README repeats a small amount of the simplicity and
  optional-capability guidance. This is useful as a copied-project reminder,
  but the detailed principles need one authoritative owner.
- The brief and review templates already own captured decisions and evidence;
  they should remain templates rather than become principle documents.

### Proposed and approved changes

1. **Add** `references/visualization-principles.md` as the authoritative
   visualization design reference, including complexity budget, progressive
   disclosure, truthful simplification, motion/3D rules, accessibility,
   comprehension gate, anti-patterns, and concrete examples.
2. **Move** the detailed Visualization Design Rules and Visualization
   Simplicity And Comprehension content out of `SKILL.md` into the reference.
3. **Keep** a short pointer in `SKILL.md` so the workflow explicitly reads and
   applies the reference before building and reviewing.
4. **Update** the template README to point to the reference for full guidance
   while retaining only scaffold-specific instructions.

### Preserved ownership

- `SKILL.md`: trigger, inputs, work sequence, artifacts, validation, result,
  recovery, and handoff.
- `references/visualization-principles.md`: reusable visualization design
  rules and examples.
- `templates/`: copied project and artifact schemas.
- `product-prototype-principles.md`: cross-role prototype principles.

### Validation plan

- Resolve all links from `SKILL.md`, the new reference, and the template README.
- Check that each detailed design rule has one authoritative owner.
- Parse the template package and rerun its build.
- Re-read the package in execution order for trigger, principles, technology,
  artifacts, validation, and handoff consistency.

### Final consistency review

- Added `references/visualization-principles.md` with one authoritative home
  for design rules, simplification guidance, causal-animation guidance,
  accessibility, comprehension checks, and examples.
- Reduced `SKILL.md` to a short principles pointer plus its workflow and result
  contract. No detailed visualization rule remains duplicated there.
- Kept the project template focused on scaffold usage and capability
  availability; it does not become a second principle document.
- The communication/delegation, form-state, and permission examples all follow
  the same one-question, one-journey, progressive-disclosure model.
- Skill/reference/template links and package JSON parsing passed.
- Template installation reported zero vulnerabilities and `npm run build`
  passed after the reference split.
- `git diff --check` passed. A second macro pass found no ownership or content
  flow conflict; a second micro pass found no duplicated design rule or
  inconsistent terminology.

Review Status: Implemented; principle-reference macro and micro review passed

## Follow-up review: Alan Kay-inspired examples

### User-approved outcome

Strengthen the principle reference with examples inspired by Alan Kay's
learning-by-doing and concrete visual-interface ideas. Use the ideas as design
anchors, not as unsupported quotations or a requirement to imitate a specific
historical interface.

### Review finding

The reference already contains concrete examples, but they are framed mostly
as rules and diagrams. It lacks an explicit bridge explaining why a user should
interact with a simplified model instead of reading a system description.

### Proposed and approved change

Add a short design anchor and three examples showing:

- a person learning the difference between message and delegation by watching
  the visible actors and resulting state;
- a user learning a form-validation rule by performing one correction;
- a user learning a permission rule by switching actors and attempting one
  action.

State the attribution carefully: the examples are inspired by concrete,
visual, learn-by-doing interface ideas associated with Alan Kay; they are not
presented as verbatim quotations. Keep the existing simplicity budget,
truthful-simplification boundary, and comprehension gate authoritative.

### Validation plan

- Ensure the new anchor remains a reference principle rather than workflow.
- Check that examples use the same one-question/one-journey budget as existing
  examples.
- Validate the external reference link, Markdown formatting, and terminology.
- Perform a final macro and micro read of the reference and the skill pointer.

## Follow-up review: broader example catalog

### User-approved outcome

Expand the principle reference beyond the orchestration example so visualizer
authors can recognize the same simplification pattern in ordinary product
requirements. Keep each example small and ensure examples do not turn the
principles file into a second workflow guide.

### Proposed change

Add a compact catalog covering long-running operations, search/filtering,
approval, retry/recovery, and cross-agent handoff. Each example will state the
question, the smallest useful visual model, and the distracting detail to omit.

### Preserved boundary

Examples remain illustrative design guidance. The active requirement, selected
journey, artifact capture, browser validation, and routing remain owned by
`SKILL.md` and its templates.

### Final review

- Added the Alan Kay-inspired “learn by doing” anchor with careful attribution
  and a four-step pattern: show, act, consequence, boundary.
- Added concrete examples for long-running work, search/filtering, approval,
  retry/recovery, cross-agent handoff, and responsive behavior.
- Confirmed every example follows the existing simplicity budget and does not
  add workflow instructions to the principles reference.
- Removed the duplicate principles pointer from `SKILL.md`; one pointer now
  clearly leads from the workflow to the authoritative reference.
- Local links, package JSON parsing, example-presence checks, the external
  reference (HTTP 200), and `git diff --check` passed.
- Macro and micro rereads found no remaining content-flow, ownership, or
  terminology inconsistency.

Review Status: Implemented; expanded-example macro and micro review passed
