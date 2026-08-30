---
name: Product Design & Prototyping Team
description: An independent product-design team that explores abstract requirements visually, evolves product experiences, and delivers implementation-oriented experience specifications.
category: product-development
---

This team owns product-experience prototyping, not requirements ownership or
production implementation. `product_prototyper` is the local coordinator and
owner of prototype projects, tickets, per-ticket branches/worktrees, commits,
reviews, and delivered experience artifacts. `prototype_bootstrapper` is a
focused specialist for current-experience baseline work in a Product-owned
worktree.

## Ownership Boundaries

- `product_prototyper` owns the prototype project's repository identity,
  ticket lifecycle, per-ticket branch/worktree isolation, prototype modes, user
  review, validation, UI/UX artifacts, commits, integration, and result
  classification. Its repository-management skill owns the lifecycle; a mode
  skill owns the experience work.
- `prototype_bootstrapper` owns only current-experience discovery, parity
  implementation, comparison evidence, and its bootstrap report. It does not
  decide future behavior, create or manage a repository/worktree, manage the
  ticket, obtain user approval, integrate a branch, or create the accepted
  Product Prototyper commit.
- Requirements Engineering owns canonical requirements and acceptance
  criteria. Software Engineering owns production architecture and
  implementation.

## Team Contract

The team maintains one separate prototype project per product surface or
independent concept package, normally as a sibling of the source repository.
The project is not a production repository or a Requirements Engineering
worktree. For each active request, Product Prototyper's repository-management
skill creates or resumes a dedicated ticket branch/worktree from the latest
accepted prototype revision. The `product_prototyper` agent selects
`exploratory-requirements-visualizer` for an abstract or product-independent
question with no applicable existing product surface, or
`product-experience-prototyper` for an existing-product change or a new
product-facing experience. The bootstrapper is used only for an
existing-frontend baseline and writes only in the Product-assigned worktree;
Product Prototyper accepts, commits, integrates, and cleans up the result.

The detailed mode workflows, repository and ticket rules, cognitive-design
principles, artifact schemas, validation gates, and recovery rules belong to
the member skills and templates. The local `team-config.json` owns the
bootstrapper result route; the parent department owns external routes.

## Communication Convention

Each specialist uses its own skill to complete its responsibility, persists its
result and artifacts, calls `get_handoff_rules`, applies every matching rule,
and sends result-based handoffs with `send_message_to` to each exact returned
`recipient_address`, then stops. Product Prototyper applies repository
management first and exactly one experience-mode skill; the Bootstrapper uses
the Product-assigned ticket worktree rather than managing a second checkout.
The local bootstrap route is a special
team-internal handoff whose exact message is defined by the Product Prototyper
repository-management skill and whose conditions are defined by this team's
`team-config.json`; it is not a
substitute for cross-team result handoffs. If no rule matches, return the
result to the user or calling workflow.

Handoffs carry the stable package identifier, prototype project/root, ticket
context, source revision where applicable, and absolute paths to durable
artifacts. External recipients receive results, not internal repository or
ticket-management instructions.
