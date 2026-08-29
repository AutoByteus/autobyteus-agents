---
name: interactive-requirements-visualizer
description: Build and iteratively revise a small interactive visual experience that helps users understand and clarify requirements before final prototype production.
---

# Interactive Requirements Visualizer

## Purpose

Turn an ambiguous requirement question into the smallest useful interactive
visual experience so the user can understand the proposed scope and behavior
without mentally simulating a long text description or static diagram.

This is an exploratory clarification skill. It is not the final product
prototype skill and it does not produce the canonical requirements or the
final implementation-oriented ui-ux-spec.md.

Do not begin by building a frontend. First decide how the concept should be
demonstrated with the smallest useful visual model, record that design
hypothesis, and only then implement it.

Read [product-prototype-principles.md](product-prototype-principles.md)
before choosing the technology or changing the prototype repository.
That shared reference owns cross-mode repository, fidelity, safety, evidence,
and approval invariants; this skill owns only the visualization-specific
workflow, artifacts, validation, and routing.

Before this mode begins, apply
[product-prototype-repository-management](../product-prototype-repository-management/SKILL.md)
to establish or resume the Product ticket, dedicated ticket branch, active
worktree, accepted base revision, and runtime isolation. Apply it again after
visualizer validation and review to finalize the ticket, commit the durable
visualizer result, integrate it under repository policy, and clean up safely.
This skill owns only the requirements-visualization experience and its
mode-specific evidence.

The skill includes a reusable project scaffold at
[templates/visualizer-project/](templates/visualizer-project/). After the
design gate passes, copy that scaffold for a new visualization ticket instead
of rebuilding the development setup from scratch. The scaffold makes
animation and spatial-rendering capabilities available, but its starter
experience is intentionally simple; installed capability is not a reason to
use every library.

## Activation And Inputs

Use this skill when the request is explicitly or implicitly in Requirements
Visualization mode. A direct user request and a request from Requirements
Engineering follow the same workflow; determine the mode from the request
content, not from the sender. The request should identify:

- the user or product decision the visualizer must clarify;
- the requirement, behavior, or acceptance-criteria IDs in scope when they
  exist;
- the critical journey, interaction, state transition, or comparison to show;
- constraints, non-goals, and known alternatives;
- the canonical requirements artifact paths when canonical requirements
  context exists;
- the selected source frontend and established prototype repository/root when
  an existing product experience is relevant;
- the ticket or request identifier and any prior visualizer revision or user
  feedback when available.

If there is no concrete decision question or observable experience to show,
return a precise request gap instead of building a generic showcase.

## Responsibility Boundary

### You Own

- the interactive visualizer's focused scope and technology choice;
- a small runnable browser experience that explains the selected behavior;
- purposeful animation, state transitions, mock data, and direct interaction;
- the visualizer-specific ticket artifacts, revision history, browser validation,
  and review URL;
- incorporating focused revision requests from Requirements Engineering;
- honest documentation of simulation boundaries and unresolved visual questions.

### You Do Not Own

- canonical requirements, requirement IDs, acceptance-criteria approval, or
  product-intent decisions;
- deciding that the user understood or approved a requirement;
- production backend, architecture, persistence, security, or integration
  behavior;
- the final product prototype or normative ui-ux-spec.md;
- the Requirements Engineer's task workspace or ticket lifecycle.

When canonical requirements context exists, Requirements Engineering owns the
question and clarification loop. The user remains the approval authority.
Product Prototyper owns the visual representation and sends each review-ready
revision to the Requirements Engineer when that route exists; for a direct
user request with no such route, return the review package to the user or
calling workflow. Do not silently convert user feedback into an approved
requirement.

## Visualization Principles

Before design, implementation, and review, read and apply
[visualization-principles.md](references/visualization-principles.md). It
defines the visualizer's cognitive foundations, complexity budget, truthful
simplification rules, causal-animation guidance, accessibility expectations,
comprehension gate, and concrete examples.

## Cognition-First Design Pass

Before copying the frontend scaffold or writing visualizer code, complete a
short design-thinking pass and record it in
`requirements-visualization-design-plan.md`. Keep it short enough to support
thinking, not another large specification.

1. **Name the one thing to understand.** Restate the decision question and
   write the one-sentence takeaway the user should be able to explain after
   using the visualizer.
2. **Choose the smallest visual form.** Consider conceptual forms such as a
   state transition, actor relationship, comparison, or spatial model. Choose
   one because it makes the target relationship easier to see. Reject a more
   elaborate form when it adds visual complexity without improving
   understanding. Select HTML/CSS, SVG/canvas, React, or 3D technology only
   after this conceptual choice passes the design gate.
3. **Define the visible model.** List only the actors or objects, states, and
   relationships required for the question. Define the initial state and the
   decision-relevant consequence. Do not start with routes, identifiers,
   dashboards, metadata, or internal terminology.
4. **Storyboard the interaction.** Describe the smallest sequence as
   `show -> user action -> visible consequence -> simplified boundary`. The
   first view must be understandable before the user opens details or reads a
   long explanation. If motion carries meaning, storyboard its phases,
   teaching pace, consequence dwell, and reset point; do not collapse a
   decision-relevant transition into an instant state swap.
5. **Apply the cognitive foundation.** Check the model against the
   simplicity budget, progressive disclosure, visible causality, truthful
   simplification, and non-motion accessibility rules. If the plan needs a
   chapter navigator, several explanatory panels, or extensive terminology in
   the first view, redesign the model before coding. A later progressive step
   may expose additional detail only after the first view is independently
   understandable.
6. **Record omissions and comprehension evidence.** State what is mocked or
   omitted, why the omission is safe for this question, how the user can
   pause, replay, step through, slow, or bypass motion, and what observable
   behavior will show that the model was understood.

Mark the design plan `Ready to Build` only when all of these are true:

- the first view presents one decision question and one focused journey;
- the visible model fits the simplicity budget and has no unnecessary
  dashboard, navigation, identifier, or implementation surface;
- the user can identify the action and its consequence without reading a long
  explanation or remembering a hidden prior state;
- secondary detail is deferred behind intentional progressive disclosure;
- decision-relevant motion is slow enough to follow, holds the consequence,
  and does not depend on unrelated simultaneous movement;
- the same decision-relevant meaning is available without motion or 3D.

The design plan is a representation decision and implementation gate. It is
not a requirements approval, final UI/UX specification, or promise that the
visualizer's simplified model is the complete product behavior. If the plan
cannot express the concept with a focused first view and a short causal
journey, return to design rather than compensating with more UI or text.

The chosen representation is the conceptual visual form, not the frontend
framework. After the plan passes, Technology Selection maps that form to the
smallest implementation technology and active dependency subset.

## Technology Selection

Choose the smallest technology that can express the required interaction. For
a design plan marked `Ready to Build`, copy
[templates/visualizer-project/](templates/visualizer-project/) into a
  ticket-scoped temporary project such as
  `visualizers/<ticket-id>/` inside the active Product ticket worktree, then use
the smallest active subset of its dependencies:

- plain HTML/CSS/JavaScript for a small linear or stateful visualizer;
- the scaffold's React/Vite/TypeScript setup when component state or repeated
  interaction makes a single file unclear;
- the existing prototype frontend technology when the visualizer must extend
  an established prototype or preserve its interaction language;
- `motion` or CSS transitions when animation clarifies causality or state;
- `three`, `@react-three/fiber`, and `@react-three/drei` only when the decision
  genuinely depends on spatial structure, depth, movement, or physical
  relationships.

The visualizer does not need to use the product's frontend technology merely
because it will inform the product requirements. Technology parity is required
only when the question itself depends on existing UI behavior, component
constraints, or interaction language. Final Product Prototype mode has a
different technology and fidelity contract.

The visualizer may be a small project or route inside the active Product ticket
worktree of the canonical Product Prototype repository. Do not create a new Git
repository or worktree for each visualizer; the management skill already
created the isolated ticket worktree. Keep the copied project temporary and
ticket-scoped, separate from production code, and free of production backend or
integration work.

## Artifact And Repository Rules

- Use the canonical Product Prototype repository, the supplied Product ticket,
  and the active ticket worktree established by the management skill. Do not
  create a second product-prototype repository or ticket worktree.
- Create or update the shared `prototype-ticket.md` record in the ticket
  folder for every supplied or newly created visualization ticket, including
  request-gap, `Baseline Needed`, `Not Recommended`, and `Blocked` outcomes.
  Use the shared status transitions; keep mode-specific brief, design-plan,
  and review fields in their own artifacts instead of duplicating them in the
  ticket record.
- Complete the cognition-first design pass and keep its design plan in the
  ticket folder before creating or substantially revising frontend code.
- After the design plan is `Ready to Build`, copy
  `templates/visualizer-project/` into the ticket-scoped visualizer project.
  Never edit the skill template in place.
- Record the template revision, active dependencies, and any omitted optional
  capability in the visualization brief or review record.
- Keep visualizer source and run instructions in the temporary prototype project
  inside the active worktree, and
  keep `prototype-ticket.md`, the brief, design plan, revision record, review
  evidence, motion/comprehension evidence, and visual references in the ticket
  folder.
- Keep the ticket under tickets/in-progress/<ticket-id>/ while Requirements
  Engineering is still collecting understanding or feedback. Close it only
  after the clarification loop is confirmed complete and no final-prototype
  work follows.
- Return durable visualizer source and ticket evidence to the management skill
  for commit on the Product ticket branch and integration according to the
  normal repository policy. This mode does not commit, integrate, or clean up
  the worktree independently.
- If an existing frontend is relevant, rely on an accepted current-experience
  baseline when the visualizer extends that experience. If the baseline is
  absent, use the fixed Bootstrapper payload in the repository-management skill
  and resume only after Product Prototyper accepts the baseline.
- Use absolute paths in all handoffs and record the live review URL when one
  is available.

Use [templates/requirements-visualization-brief-template.md](templates/requirements-visualization-brief-template.md)
as requirements-visualization-brief.md.
Use [templates/requirements-visualization-design-plan-template.md](templates/requirements-visualization-design-plan-template.md)
as requirements-visualization-design-plan.md.
Use [templates/requirements-visualization-review-template.md](templates/requirements-visualization-review-template.md)
as requirements-visualization-review.md.
Use the sibling final-prototype template
[../requirements-prototyper/templates/prototype-ticket-template.md](../requirements-prototyper/templates/prototype-ticket-template.md)
as the shared ticket record `prototype-ticket.md`.

## Operating Sequence

1. Read the focused visualization request, requirements context, active Product
   ticket, repository instructions, prior revision, and open user questions.
2. Use the management skill's canonical repository, ticket branch, active
   worktree, accepted base revision, runtime-isolation record, and visualizer
   template. Create or update the mode-specific fields in `prototype-ticket.md`
   and provide the evidence management needs to set its status to `In Progress`
   once active work begins. Do not create another ticket worktree or edit the
   canonical checkout directly.
3. Resolve the accepted baseline in the management-established active worktree
   before creating mode-specific visualizer artifacts:
   - If an existing frontend is relevant and an accepted baseline is present,
     continue.
   - If an existing frontend is relevant and the accepted baseline is absent,
     provide the evidence for management to set the ticket status to
     `Baseline Needed`, send the fixed minimal Bootstrapper message through the
     matching handoff rule, and stop. Do not write a brief, design plan, or
     visualizer source for future-state work. Resume at this baseline check only
     after Product Prototyper accepts the Bootstrapper result in the same
     management-established worktree.
   - If no frontend exists, record that no current-experience baseline is
     required and continue.
4. Write or update the visualization brief. State the single decision
   question, user journey, states, non-goals, and success signal.
5. Complete the cognition-first design pass and write or update the design
   plan. Choose the representation, visible model, causal storyboard,
   progressive-disclosure boundary, and non-motion path. Do not write
   frontend code until the plan passes its comprehension and simplicity
   checks.
6. Copy the template into the ticket-scoped visualizer project, remove or
   replace its example content, select the smallest active technology subset,
   and implement the design hypothesis with mocked boundaries. Do not invent
   product behavior outside the question or add interface surface merely
   because the scaffold supports it.
7. Start the visualizer and validate the critical interaction, state changes,
   reset/replay behavior, responsive layout, accessibility fallback,
   motion pacing and consequence dwell when motion is used, pause/step/slow
   controls specified by the design plan when motion is used, the
   comprehension gate, and documented limitations in a browser. If
   decision-relevant motion is used, exercise at least pause and replay/reset
   or skip, and record the reduced-motion/stable-state result.
8. Record the implementation revision, review URL, visual references, known
   questions, motion/comprehension evidence, and evidence in the ticket
   artifacts when a visualizer exists. Provide the review-ready evidence for
   management to set the ticket status to `Awaiting User Review`.
9. Classify the result as Requirements Visualization Ready, Requirement
   Impact, Not Recommended, Blocked, or a request gap. For a review-ready
   package, provide the evidence for management to set the ticket status to
   `Awaiting User Review` and preserve the active worktree before routing. For
   `Not Recommended`, `Requirement Impact`, `Blocked`, or a request gap, provide
   the corresponding outcome and evidence for management to apply the shared
   status before routing: `Not Recommended` maps to `Not Recommended`, while
   `Requirement Impact`, `Blocked`, and request-gap outcomes map to `Blocked`.
   Do not claim requirement approval; the user owns approval, while Requirements
   Engineering records the decision when it owns the canonical requirements
   context.
10. On a focused revision request, set the ticket status back to `In Progress`,
   preserve the accepted visual behavior,
   update only the requested scope, and revalidate the affected journey. If
   the revision changes the visual form, visible model, journey, or cognitive
   budget, update the design plan and pass the design gate again before
   changing frontend code. Return another review-ready revision afterward.
11. If the visualizer or user feedback exposes a contradiction or material
   scope change in the canonical requirements, classify a `Requirement Impact`
   finding and return the evidence to Requirements Engineering instead of
   changing the requirement locally.
12. When Requirements Engineering confirms that the clarification loop is
   complete, return the durable visualizer evidence and final visualization
   package to the management skill. Management commits the result on the
   Product ticket branch, integrates it under repository policy, moves a closed
   ticket to `tickets/done/`, and performs safe runtime/worktree cleanup. If no
   final-prototype work follows, provide the evidence for management to mark the
   ticket `Completed`; otherwise keep or reopen it `In Progress` for the
   separate `requirements-prototyper` invocation. Do not claim completion before
   repository finalization is durable.

## Result Contract

Every completed result must include:

- Requirements Visualization Ready, Requirement Impact, Not Recommended,
  Baseline Needed, Blocked, or a precise request-gap classification;
- the stable package and ticket identifiers;
- the decision question and covered requirement/behavior IDs;
- the applicable absolute path to the common `prototype-ticket.md` record;
- applicable absolute paths to the visualizer source, brief, design plan,
  review record, ticket folder, and visual references; explicitly state when
  an artifact was not created because the result was a request gap, Not
  Recommended, Baseline Needed, or Blocked;
- the current ticket status, using the shared status transitions;
- the design-gate status, or Not Applicable when no design pass occurred, and
  any intentional deviation between the plan and the delivered visualizer;
- the review URL when a visualizer exists and the exact browser validation
  performed;
- the technology and revision used;
- the canonical prototype repository/root, active ticket branch/worktree,
  accepted prototype base, ticket revision, integration result, and cleanup
  result as recorded by repository management;
- the visualizer template revision and active/omitted capabilities;
- modeled states, mock boundaries, limitations, unresolved questions, and the
  next expected action;
- first-view simplicity evidence and the observed comprehension result when a
  visualizer was implemented;
- motion pacing, consequence dwell, and motion-control evidence when motion is
  part of the explanation;
- whether the visualizer is ready for another user review or the clarification
  loop is complete.

## Handoff Rules

- Finish the visualizer artifacts. For an interim result such as `Baseline
  Needed` or `Awaiting User Review`, have repository management record the
  current status and preserve the active worktree before routing. For a terminal
  result, have it finalize the repository state before routing. A mode result is
  not complete merely because its files exist in a worktree.
- Call get_handoff_rules and use the returned conditional rules as the
  routing authority.
- Apply every matching rule and call send_message_to with the exact returned
  recipient_address; do not infer or hard-code a recipient.
- For Requirements Visualization Ready, send the review-ready package to the
  recipient returned by the matching rule, or return it to the user/calling
  workflow when no handoff rule applies. Do not claim user approval.
- For `Blocked` or a request gap, send the precise
  blocker, evidence, and recovery question through the matching rule; when no
  rule applies, return it to the user or calling workflow.
- For Requirement Impact, send the exact conflicting feedback, affected
  requirement or behavior IDs, visualizer evidence, and the decision that
  Requirements Engineering must resolve through the matching rule; when no
  rule applies, return it to the user or calling workflow.
- For Not Recommended, send the evidence explaining why an interactive
  visualizer would not materially improve the current decision.
- For Baseline Needed, use the fixed Bootstrapper payload in the
  repository-management skill instead of sending future-state requirements or
  a visualizer design.
- If no returned rule applies, return the result to the user or calling
  workflow. After all required messages succeed, end the stage and do not poll.
