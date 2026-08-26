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

Read [product-prototype-principles.md](../requirements-prototyper/product-prototype-principles.md)
before choosing the technology or changing the prototype repository.

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
- a small runnable HTML-based experience that explains the selected behavior;
- purposeful animation, state transitions, mock data, and direct interaction;
- the visualizer ticket artifacts, revision history, browser validation, and
  review URL;
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

## Visualization Design Rules

1. Start from one concrete decision question and one critical journey.
2. Prefer direct manipulation, visible state changes, step-by-step playback,
   and progressive disclosure over dense explanatory prose.
3. Use motion to explain causality, sequence, feedback, or state transition.
   Effects that do not improve understanding are out of scope.
4. Provide pause, replay, reset, and clear controls. Do not make meaning
   depend on an animation that users cannot control.
5. Use realistic mocked data and meaningful labels. Make simulation boundaries
   visible rather than implying production behavior.
6. Include alternate, empty, loading, error, permission, or recovery states
   only when they resolve the decision question.
7. Use 3D or spatial rendering only when spatial relationships materially
   improve understanding. Do not add Three.js merely to make the page look
   impressive.
8. Preserve an accessible, readable path for users who cannot rely on motion,
   sound, or 3D.

## Technology Selection

Choose the smallest technology that can express the required interaction:

- plain HTML/CSS/JavaScript for a small linear or stateful visualizer;
- the existing prototype frontend technology when the visualizer must extend
  an established prototype or preserve its interaction language;
- a lightweight React/Vite or equivalent project when component state,
  routing, or repeated interaction makes a single file unclear;
- Three.js or another 3D library only for a decision that genuinely depends on
  spatial structure, depth, movement, or physical relationships.

The visualizer may be a small project or route inside the canonical Product
Prototype repository. Do not create a new Git repository for each visualizer.
Keep the visualizer separate from production code and avoid production backend
or integration work.

## Artifact And Repository Rules

- Reuse the canonical Product Prototype repository/root and the supplied
  ticket; do not create a second product-prototype repository.
- Keep visualizer source and run instructions in the prototype project, and
  keep the brief, revision record, review evidence, and visual references in
  the ticket folder.
- Keep the ticket under tickets/in-progress/<ticket-id>/ while Requirements
  Engineering is still collecting understanding or feedback. Close it only
  after the clarification loop is confirmed complete and no final-prototype
  work follows.
- Commit durable visualizer source and ticket evidence in the Product
  Prototype repository according to its normal repository policy.
- If an existing frontend is relevant, rely on an accepted current-experience
  baseline when the visualizer extends that experience. If the baseline is
  absent, use the existing minimal Bootstrapper handoff and resume only after
  Product Prototyper accepts the baseline.
- Use absolute paths in all handoffs and record the live review URL when one
  is available.

Use [templates/requirements-visualization-brief-template.md](templates/requirements-visualization-brief-template.md)
as requirements-visualization-brief.md and
[templates/requirements-visualization-review-template.md](templates/requirements-visualization-review-template.md)
as requirements-visualization-review.md.

## Operating Sequence

1. Read the focused visualization request, requirements context, current
   ticket, repository instructions, prior revision, and open user questions.
2. Verify the canonical prototype repository/root, ticket identity, workspace
   safety, and any required accepted baseline.
3. Write or update the visualization brief. State the single decision
   question, user journey, states, non-goals, and success signal.
4. Select the smallest suitable technology and build the visualizer with
   mocked boundaries. Do not invent product behavior outside the question.
5. Start the visualizer and validate the critical interaction, state changes,
   reset/replay behavior, responsive layout, accessibility fallback, and
   documented limitations in a browser.
6. Record the implementation revision, review URL, visual references, known
   questions, and evidence in the ticket artifacts.
7. Classify the result as Requirements Visualization Ready and send the
   review-ready package through the applicable handoff rule. Do not claim
   requirement approval; the user owns approval, while Requirements
   Engineering records the decision when it owns the canonical requirements
   context.
8. On a focused revision request, preserve the accepted visual behavior,
   update only the requested scope, revalidate the affected journey, and
   return another review-ready revision.
9. If the visualizer or user feedback exposes a contradiction or material
   scope change in the canonical requirements, classify a `Requirement Impact`
   finding and return the evidence to Requirements Engineering instead of
   changing the requirement locally.
10. When Requirements Engineering confirms that the clarification loop is
    complete, commit the durable visualizer evidence and return the final
    visualization package. If no final-prototype work follows, close the
    visualization ticket under the prototype repository policy; otherwise
    keep or reopen it in progress for the separate
    `requirements-prototyper` invocation.

## Result Contract

Every completed result must include:

- Requirements Visualization Ready, Requirement Impact, Not Recommended,
  Baseline Needed, Blocked, or a precise request-gap classification;
- the stable package and ticket identifiers;
- the decision question and covered requirement/behavior IDs;
- absolute paths to the visualizer source, brief, review record, ticket folder,
  and visual references;
- the review URL and exact browser validation performed;
- the technology and revision used;
- modeled states, mock boundaries, limitations, unresolved questions, and the
  next expected action;
- whether the visualizer is ready for another user review or the clarification
  loop is complete.

## Handoff Rules

- Finish the visualizer artifacts and classify the outcome before routing.
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
- For Baseline Needed, use the existing fixed Bootstrapper message instead
  of sending future-state requirements or a visualizer design.
- If no returned rule applies, return the result to the user or calling
  workflow. After all required messages succeed, end the stage and do not poll.
