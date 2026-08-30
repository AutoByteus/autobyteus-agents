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

## Follow-up review: cognition and HCI foundations

### User-approved outcome

Ground the visualizer principles in broader research on human cognition and
human-computer interaction rather than attributing the whole approach to Alan
Kay. The reference should explain why simplification, visible causality,
progressive disclosure, and learn-by-doing reduce the user's need to mentally
simulate a complex system.

### Research findings

- The Cambridge Handbook of Multimedia Learning summarizes cognitive-load
  implications for multimedia design, including the limited capacity of
  working memory for novel information. This supports limiting simultaneous
  novel elements and keeping attention on the relationship under review.
- W3C Cognitive Accessibility guidance recommends simplified presentations,
  hiding nonessential options, and progressive disclosure when complexity
  makes it difficult to focus. This supports the existing simplicity budget
  and the requirement to remove distracting product chrome.
- W3C cognitive accessibility research identifies attention, memory,
  perception, language, and executive-function differences as relevant to
  interaction design. This supports a readable non-motion path and visible
  state labels rather than relying on animation or recall alone.

### Proposed change

Add a concise, unnumbered `Cognitive Foundations` section before the Alan Kay
anchor in `visualization-principles.md`. It will connect the research to
practical visualizer rules without presenting a hard numeric law about human
memory or duplicating the later simplicity and accessibility sections.

The section will map common cognitive risks to design responses:

- too many novel elements -> one decision question and a small visible state
  set;
- distraction and extraneous detail -> remove nonessential chrome and use
  progressive disclosure;
- recall and mental simulation -> keep labels, state, and causal consequence
  visible;
- motion or spatial access needs -> provide pause, replay/reset, and a
  readable non-motion path;
- confusing visual/text duplication -> use short text that names the model,
  rather than repeating every visual detail.

### Preserved boundaries

- `visualization-principles.md` remains the single owner of reusable visual
  design guidance.
- `SKILL.md` remains the owner of activation, execution, artifacts,
  validation, and handoff; it only points to the reference.
- Alan Kay remains a useful historical design anchor, not the sole authority
  for the principles.

### Validation plan

- Verify the new section is concise and does not duplicate the detailed rules
  below it.
- Check source links and attribution wording.
- Re-read the reference in order, validate Markdown links and whitespace, and
  confirm the skill/reference ownership boundary remains clear.

### Final implementation review

- Added the unnumbered `Cognitive Foundations` section before the Alan Kay
  anchor, preserving the existing numbered principle flow.
- Grounded the section in cognitive-load/multimedia-learning research and W3C
  cognitive-accessibility guidance, with direct source links and no hard
  numeric memory claims.
- Mapped cognitive risks to concrete responses without replacing or duplicating
  the later simplicity, causality, truthful-simplification, technology, and
  comprehension sections.
- Updated the single `SKILL.md` pointer so the workflow explicitly names the
  cognitive foundations while leaving execution and handoff ownership there.
- Local Markdown links, cognitive-foundation assertions, external link checks,
  and `git diff --check` passed.

Review Status: Implemented; cognition-foundation macro and micro review passed

## Follow-up review: cognition-first visualization design pass

### User-approved outcome

The current visualizer at `http://127.0.0.1:4179` still presents too much
navigation, explanatory text, identifier detail, and system surface before
the user has understood the central distinction. The skill must require a
short design-thinking phase before any frontend is created. The agent should
first decide how the concept can be demonstrated with the smallest cognitive
load, then implement that chosen model.

### Current gap

- The brief records the decision question, journey, states, and technology,
  but it does not require an explicit representation choice or causal
  storyboard.
- The operating sequence moves from brief directly to copying the scaffold
  and building the frontend.
- There is no durable record of which objects, states, interaction, and
  progressive-disclosure choices were deliberately selected or rejected.
- The existing running visualizer demonstrates the risk: its chapter
  navigation, target switch, identity details, tool calls, and implementation
  terminology compete with the first conceptual lesson.

### Proposed change

Add a ticket-scoped `requirements-visualization-design-plan.md` template and
make it a required pre-implementation artifact. The plan will capture:

- the one question and one-sentence user takeaway;
- the chosen visual representation and why it is simpler than alternatives;
- the small object/state model;
- the `show -> act -> consequence -> boundary` storyboard;
- progressive-disclosure decisions and details intentionally omitted;
- mock boundaries, accessibility/non-motion fallback, and a comprehension
  check.

Update the skill so the agent must complete and self-check this plan against
the cognitive foundations and simplicity budget before copying or modifying
the frontend scaffold. A plan that fails the check must be simplified or
reworked; it must not proceed directly to implementation. The plan is a
design hypothesis, not a requirements approval artifact or a production
UI/UX specification.

### Preserved boundaries

- `SKILL.md` owns the workflow gate and implementation sequence.
- `visualization-principles.md` remains the authoritative source for the
  cognitive and visual design rules.
- The brief explains why the visualizer is needed; the design plan explains
  how the concept will be demonstrated; the review record proves what was
  actually implemented and tested.
- The Product Prototyper still owns the visual representation, while the user
  and Requirements Engineering retain requirements approval responsibility.

### Validation plan

- Verify the new template has no duplicated ownership with the brief or review
  template.
- Confirm the operating sequence blocks implementation until a design plan is
  complete and applies the existing principles reference.
- Confirm the result contract and artifact rules include the design-plan path.
- Re-read the skill, templates, and principles in execution order for clear
  brief -> design plan -> implementation -> review flow.

### Final implementation review

- Inspected the running `send-message-delegate-task-semantics` visualizer at
  `http://127.0.0.1:4179` and confirmed the reported failure mode: the first
  experience exposes chapter navigation, multiple controls, identity details,
  implementation terminology, and long explanatory surfaces before the core
  distinction is learned.
- Added the required cognition-first design pass to `SKILL.md`, including a
  representation choice, visible model, causal storyboard, simplicity gate,
  progressive-disclosure boundary, and comprehension evidence.
- Added `requirements-visualization-design-plan-template.md` and made the
  design plan a ticket artifact and result-contract requirement.
- Preserved separation of concerns: the brief owns why/scope, the design plan
  owns how the concept is demonstrated, the frontend owns implementation, and
  the review record owns validation evidence.
- Updated the operating sequence so frontend implementation cannot begin
  until the design plan passes the cognitive-foundation and simplicity checks.
- Verified the new local template link, required headings, skill/template
  references, and `git diff --check`.

Review Status: Implemented; cognition-first design-pass macro and micro review passed

## Follow-up review: full consistency and cognitive-load audit

### User-approved outcome

Re-audit the complete skill package rather than relying only on link and
heading checks. The package must have a clear content workflow—brief -> design
plan -> implementation -> review -> handoff—and the design gate must be
strong enough to prevent another information-dense visualizer like the one at
`http://127.0.0.1:4179`.

### Audit findings

The overall direction is correct, but four issues weaken consistency:

1. The artifact rules say to copy the frontend template before the design
   pass, while the operating sequence and cognition-first section say the
   design plan must come first. This is a content-order contradiction.
2. The design pass chooses a visual representation, while Technology Selection
   later chooses an implementation technology, but the distinction is not
   explicit. An agent could treat the framework choice as the design decision.
3. The gate says the plan must pass “comprehension and simplicity checks,” but
   neither the skill nor the plan template defines a compact pass/fail set.
   “Ready to Build” could therefore be marked without proving that the first
   view is cognitively light.
4. The review template records implementation validation but not the design
   plan, plan fidelity, or actual comprehension evidence. The final artifact
   flow therefore loses the link between the planned simple model and the
   delivered visualizer.

The existing brief/design-plan overlap is intentional and manageable: the
brief owns why and scope, while the design plan owns how the concept will be
demonstrated. The review record should own evidence of what was actually
delivered, rather than repeating the full plan.

### Required repairs

- State explicitly that representation is the conceptual visual form and
  technology selection is the later implementation mapping.
- Change the repository rule to copy the scaffold only after the design gate.
- Add a compact mandatory design-gate checklist: one question, one focused
  first view, small visible model, one primary causal journey, no long
  explanation required, progressive disclosure for secondary detail, and an
  equivalent non-motion path.
- Add design-plan path, fidelity/deviation, and comprehension evidence to the
  review template and result flow.
- Permit later progressive steps only when the first view is independently
  understandable; do not prohibit every multi-step visualizer, but prohibit a
  chapter shell from carrying the initial explanation burden.

### Preserved boundaries

- The brief remains the scope and intent artifact.
- The design plan remains the visual representation and implementation gate.
- The visualizer source remains the implementation artifact.
- The review record remains validation and user-feedback evidence.
- The principles reference remains the authoritative cognitive and visual
  guidance; the skill owns sequencing and gate enforcement.

### Validation plan

- Re-read all five package documents in execution order after the repairs.
- Search for contradictory “copy/build before design” wording and ambiguous
  uses of “design” versus “technology.”
- Check that every design-gate field is represented in the design plan and
  that review evidence connects back to it.
- Validate all local links, Markdown formatting, required gate phrases, and
  `git diff --check`.

### Final macro and micro review

- Re-read the skill, principles reference, brief template, design-plan
  template, and review template in execution order.
- Repaired the copy-before-design wording contradiction in the skill and
  scaffold instructions.
- Separated conceptual visual-form selection from later frontend technology
  selection; removed the premature technology field from the brief and kept
  it in the design plan after the gate.
- Added five explicit Ready-to-Build checks to both the skill and design-plan
  template, including first-view focus, simplicity budget, progressive
  disclosure, and a non-motion equivalent.
- Extended revision handling so changes to the visual form, visible model,
  journey, or cognitive budget require the design gate again.
- Connected the review template and result contract to the design plan,
  intentional deviations, first-view simplicity evidence, and comprehension
  evidence, while allowing Not Applicable artifacts for early exits.
- Confirmed the brief -> design plan -> implementation -> validation ->
  handoff order, local links, ownership pointer, gate completeness, and
  `git diff --check` all pass.

Review Status: Implemented; full consistency and cognitive-load macro/micro review passed

## Follow-up review: motion pacing for comprehension

### User-approved outcome

The current requirements visualizer at `http://127.0.0.1:4179` changes the
send-message state so quickly that the user cannot perceive the message's
departure, travel, arrival, and consequence. The cognitive foundations must
explicitly treat motion as part of the explanation: a requirements visualizer
should use deliberate teaching pace rather than instantaneous state swaps.

### Research and design findings

- The existing principles already require purposeful, pauseable, replayable,
  resettable motion and a non-motion path, but they do not define pacing or a
  visible sequence that the user must be able to follow.
- W3C accessibility guidance emphasizes controlling moving content and
  allowing users to pause, stop, or hide it; WCAG also requires that
  interaction-triggered motion not be the only way to convey essential
  information.
- Apple's interaction guidance similarly treats motion as feedback and
  instruction, while warning against gratuitous motion and recommending that
  people can cancel it. This supports purposeful, controllable motion rather
  than fast decoration.
- “Slow” is not a universal duration law. The appropriate rule for this skill
  is: use a teaching pace slow enough for a first-time observer to identify
  the causal sequence; expose pause/replay/step or a slower mode when the
  sequence is easy to miss; use instant changes only when immediacy itself is
  the concept or the change is not decision-relevant.

### Proposed changes

1. Add `Motion For Understanding` inside the Cognitive Foundations section of
   `visualization-principles.md`. Define teaching pace, staged causal motion,
   dwell time at the consequence, no simultaneous unrelated movement, and
   pause/replay/step/skip controls. Include a practical example with a
   1.5–3 second simple path as a starting heuristic, explicitly not a law.
2. Add a motion storyboard to the design-plan template: purpose, phases,
   pacing, pause points, controls, reduced-motion behavior, and the meaning of
   instant versus animated changes.
3. Require the skill's design pass and browser validation to verify that the
   motion is perceptible and that the user can explain the sequence afterward.
4. Add examples for message delivery, delegation, and state validation so the
   principles map directly to implementation choices.

### Preserved boundaries

- Motion remains a design aid, not a substitute for stable labels or a
  non-motion equivalent.
- The brief still owns requirement intent; the design plan owns the motion
  sequence; the review record owns observed pacing and comprehension evidence.
- The user remains the approval authority; the Product Prototyper only models
  the concept honestly.

### Validation plan

- Re-read the Cognitive Foundations, causality, examples, design-pass,
  template, and browser-validation sections in order.
- Check that “slow” is framed as perceptible teaching pace rather than a rigid
  universal timing requirement.
- Confirm motion controls, reduced-motion behavior, non-motion equivalence,
  and comprehension evidence are represented consistently across files.
- Validate links, whitespace, and `git diff --check`.

### Final implementation review

- Added `Motion For Understanding` under `Cognitive Foundations`, treating
  animation as a temporary diagram that explains a causal sequence rather
  than as decorative polish.
- Added teaching-pace guidance: staged initial state, action, movement,
  arrival, and consequence dwell; no instant decision-relevant swaps; no
  unrelated simultaneous motion; and a 1.5–3 second starting heuristic that
  is explicitly not a universal law.
- Added pause, replay, reset, step/slow options, reduced-motion equivalence,
  and direct examples for messaging, delegation, and form validation.
- Mapped the principle into the design plan, Ready-to-Build gate, review
  template, result contract, and browser-validation sequence.
- Verified the three new external guidance links returned HTTP 200, local
  Markdown links passed, motion fields were present across all owners, the
  workflow order remained intact, and `git diff --check` passed.

Review Status: Implemented; motion-pacing macro and micro review passed
