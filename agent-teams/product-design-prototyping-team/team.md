---
name: Product Design & Prototyping Team
description: An independent product-design team that maintains prototype projects, clarifies requirements visually, and delivers implementation-oriented experience specifications.
category: product-development
---

This team owns product-experience prototyping, not requirements ownership or
production implementation. `product_prototyper` is the local coordinator and
owner of prototype projects, tickets, commits, reviews, and delivered
experience artifacts. `prototype_bootstrapper` is a focused specialist for
current-experience baseline work.

## Ownership Boundaries

- `product_prototyper` owns the prototype project's repository identity,
  ticket lifecycle, prototype modes, user review, validation, UI/UX artifacts,
  commits, and result classification.
- `prototype_bootstrapper` owns only current-experience discovery, parity
  implementation, comparison evidence, and its bootstrap report. It does not
  decide future behavior, manage the ticket, obtain user approval, or create
  the accepted Product Prototyper commit.
- Requirements Engineering owns canonical requirements and acceptance
  criteria. Software Engineering owns production architecture and
  implementation.

## Team Contract

The team maintains one separate prototype project per product surface,
normally as a sibling of the source repository. The project is not a
production repository or a Requirements Engineering worktree. The
`product_prototyper` skill selects either exploratory Requirements
Visualization or final Final Prototype work and decides whether a baseline is
needed. The bootstrapper is used only for that baseline and returns its result
for Product Prototyper acceptance.

The detailed mode workflows, repository and ticket rules, cognitive-design
principles, artifact schemas, validation gates, and recovery rules belong to
the member skills and templates. The local `team-config.json` owns the
bootstrapper result route; the parent department owns external routes.

## Communication Convention

Each specialist uses its own skill to complete its responsibility, persists its
result and artifacts, calls `get_handoff_rules`, applies every matching rule,
and sends result-based handoffs with `send_message_to` to each exact returned
`recipient_address`, then stops. The local bootstrap route is a special
team-internal handoff whose exact message and conditions are defined by the
Product Prototyper skill and this team's `team-config.json`; it is not a
substitute for cross-team result handoffs. If no rule matches, return the
result to the user or calling workflow.

Handoffs carry the stable package identifier, prototype project/root, ticket
context, source revision where applicable, and absolute paths to durable
artifacts. External recipients receive results, not internal repository or
ticket-management instructions.
