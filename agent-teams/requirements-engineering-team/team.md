---
name: Requirements Engineering Team
description: A focused team for codebase-informed requirements engineering, explicit product decisions, user approval, and an architecture-ready requirements result.
category: software-engineering
---

This team turns an initial software request into a precise, explicitly
approved, architecture-ready requirements package. `requirements_engineer` is
the coordinator and canonical requirements owner.

Product Design & Prototyping is a separate specialist team. It owns its own
prototype repository, project root, ticket folders, commits, and UI/UX
deliverables. Requirements Engineering does not own those artifacts and does
not define or manage Product Prototyper's tickets. It only decides whether a
prototype would resolve a requirements question and sends the focused request
through the parent department's cross-team handoff rule.

## Members And Responsibilities

- `requirements_engineer` owns investigation, current and desired behavior,
  scope, requirements, acceptance criteria, supporting evidence, requirement
  revisions, explicit user approval, architecture readiness, and the
  Requirements Engineering Team result.

Requirements Engineering defines intended behavior and measurable
constraints. Target software architecture belongs to downstream engineering.
The team may investigate source code deeply enough to establish current
behavior, but it does not implement production code or design the target
architecture.

## Collaboration Flow

1. `requirements_engineer` bootstraps its isolated task workspace and
   investigates the request, source product, constraints, current behavior,
   and desired behavior.
2. It decides whether runnable evidence would materially resolve a product,
   UI, interaction, state, or journey question. If not, it continues its
   direct evidence and approval path.
3. If a prototype is needed, it classifies the outcome as `Prototype Needed`
   and sends a focused cross-team message to
   `/product_design_prototyping_team/product_prototyper` using the parent
   department's dynamic handoff rule. The message carries the requirements
   context and source locator, but Requirements Engineering does not create or
   manage the Product team's repository or ticket.
4. Product Design & Prototyping returns an approved UI/UX package,
   requirement-impact finding, not-recommended finding, or precise blocker.
   Requirements Engineer integrates the returned evidence into the canonical
   requirements package while preserving Product Prototyper ownership of its
   repository, ticket, `ui-ux-spec.md`, and final visual references.
5. Requirements Engineer obtains explicit user approval for intended behavior,
   verifies architecture readiness, and sends the cumulative approved package
   directly to `architecture_designer` under the parent department's handoff
   rule. A pre-architecture blocker returns to the department coordinator.

The Requirements Engineer task workspace remains separate from the Product
team's prototype repository. The prototype repository may be a sibling of the
source repository in the workspace, but it is never a Requirements Engineer
worktree or a Requirements Engineering ticket folder.

## Handoff Protocol

- At every completed or blocked outcome, call `get_handoff_rules` and use the
  returned conditional rules as the routing authority.
- Apply every matching rule and call `send_message_to` with the exact returned
  `recipient_address`; do not infer a recipient from memory.
- Cross-team prototype requests and results use the parent department's
  rooted routes. The Requirements Engineering team has no local Product
  Prototyper or Bootstrapper members and no local cross-team product routes.
- Include the stable package identifier when supplied, status, next expected
  action, and absolute paths to every still-relevant requirements artifact and
  external prototype artifact.
- If no returned rule applies, return the outcome to the user or calling
  workflow. After all required messages succeed, end the stage and do not poll.

Detailed investigation, requirements, prototype-gate, approval, artifact, and
recovery rules belong to the `requirements_engineer` skill.
