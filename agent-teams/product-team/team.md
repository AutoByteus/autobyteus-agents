---
name: Product Team
description: An independent product team that uses code-first UI/UX design to explore requirements visually, evolve user experiences, and deliver production-ready UI/UX specifications and interactive reference models.
category: product-development
---

This team owns code-first Product UI/UX Design, producing approved UI/UX
specifications (`ui-ux-spec.md`) and interactive reference models, not
requirements ownership or production backend implementation.

Writing runnable code is the team's native design medium: AI agents write
frontend code natively, enabling interfaces, responsive layouts, and user
journeys to be designed, tested, and validated directly in the browser DOM with
true interaction fidelity rather than through static drawings.

## Members

- `product_prototyper` (Product UI/UX Designer) is the coordinator.
  It owns the design project, tickets, branches and worktrees, user design review,
  baseline acceptance, UI/UX artifacts (`ui-ux-spec.md` with normative reference
  screenshots), commits, and integration. Its agent definition chooses one mode
  per request: `exploratory-requirements-visualizer` for an abstract or
  product-independent question, or `product-experience-prototyper` for an
  existing or new product experience. Its repository-management skill runs
  before and after that mode.
- `prototype_bootstrapper` (UI Baseline Bootstrapper) builds a current-experience
  baseline with UI parity in the worktree the Product UI/UX Designer assigns,
  providing an accurate, runnable canvas of today's product. It reports the
  baseline and does not decide future behavior or manage the repository,
  ticket, or integration.
- Solution Designer owns canonical requirements and acceptance criteria.
  Software Engineering owns production architecture and implementation.

The shared `product-prototype-principles.md` holds the rules both members
follow: the code-first design rationale, what an interactive UI model is, UI
parity, mock data, the repository boundary, and the Bootstrapper boundary.
Detailed workflows belong to the member skills.

## Cooperation

- When an existing frontend has no accepted baseline, or the baseline needs a
  correction or refresh, the Product UI/UX Designer sends the fixed bootstrap
  request defined in its repository-management skill. The UI Baseline Bootstrapper
  returns `Completed` or `Blocked` for the Product UI/UX Designer to accept or recover.
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
