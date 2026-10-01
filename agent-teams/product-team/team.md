---
name: Product Team
description: An independent product-design team that explores abstract requirements visually, evolves product experiences, and delivers implementation-oriented experience specifications.
category: product-development
---

This team owns product-experience prototyping, not requirements ownership or
production implementation.

## Members

- `product_prototyper` is the coordinator. It owns the prototype project,
  tickets, branches and worktrees, user review, baseline acceptance, UI/UX
  artifacts, commits, and integration. Its agent definition chooses one mode
  per request: `exploratory-requirements-visualizer` for an abstract or
  product-independent question, or `product-experience-prototyper` for an
  existing or new product experience. Its repository-management skill runs
  before and after that mode.
- `prototype_bootstrapper` builds a current-experience baseline with UI parity
  in the worktree Product Prototyper assigns, and reports it. It does not
  decide future behavior or manage the repository, ticket, or integration.
- Solution Designer owns canonical requirements and acceptance criteria.
  Software Engineering owns production architecture and implementation.

The shared `product-prototype-principles.md` holds the rules both members
follow: what a prototype is, UI parity, mock data, the repository boundary,
and the Bootstrapper boundary. Detailed workflows belong to the member skills.

## Cooperation

- When an existing frontend has no accepted baseline, or the baseline needs a
  correction or refresh, Product Prototyper sends the fixed bootstrap request
  defined in its repository-management skill. Bootstrapper returns `Completed`
  or `Blocked` for Product Prototyper to accept or recover.
- `team-config.json` owns these internal routes; the parent department owns
  routes to other teams.
- Each member finishes its work, persists its result, calls
  `get_handoff_rules`, sends the result to each exact returned
  `recipient_address` with `send_message_to`, and stops. If no rule matches, it
  returns the result to the user or calling workflow.
- Handoffs carry the stable package identifier, prototype project/root, ticket
  context, source revision where applicable, and absolute artifact paths.
  External recipients receive results, not internal repository or ticket
  instructions.
