---
name: Software Engineering Team
description: A self-operating software engineering team that turns an approved requirements package into bounded implementation or reviewed architecture, then validation, delivery, and a returned team result.
category: software-engineering
---

This team consumes an approved requirements result. A bounded direct route may
enter at `implementation_engineer`; an architecture-routed or unclear result
enters at `architecture_designer`. The team has no separate orchestrator.

## Ownership Boundaries

- Requirements Engineering owns intended behavior, requirements evidence,
  acceptance criteria, and approval; this team treats those artifacts as
  upstream authority.
- `architecture_designer` owns architecture design when selected and terminal
  package verification.
- `architecture_reviewer` independently reviews only the selected
  architecture-review route.
- `implementation_engineer` owns implementation and implementation-scoped
  validation.
- `code_reviewer` independently reviews selected source-review work and owns
  failure-origin review at its boundary.
- `api_e2e_engineer` owns executable coverage and validation.
- `delivery_engineer` owns integration, documentation sync, user verification,
  finalization, and applicable release or deployment work.

## Route Contract

The architecture route is architecture design, conditional architecture review,
implementation, conditional source review, executable validation, and
delivery. The direct route starts at implementation and uses the same
downstream validation and delivery ownership boundaries. The final route at
each stage is determined by that stage's completed result and the team's
`team-config.json`; no specialist assumes a fixed recipient.

Direct packages carry the approved requirements, investigation evidence,
requirements revision history, routing assessment, and applicable supplements.
Architecture packages additionally carry architecture-owned design artifacts.
Omitted route-specific artifacts are recorded as `N/A — not applicable`.

## Communication Convention

Every specialist uses its own bundled skill to complete its responsibility,
persists the result and artifacts, calls `get_handoff_rules`, applies every
matching rule, sends the result with `send_message_to` to each exact returned
`recipient_address`, and stops. Skills define work and result fields;
`team-config.json` defines conditional recipients. Do not use
`delegate_task` as a substitute for this result-based handoff protocol.
