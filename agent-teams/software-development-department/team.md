---
name: Software Development Department
description: An end-to-end software delivery department connecting independent Requirements Engineering, Product Design & Prototyping, and Software Engineering teams through result-based handoffs.
category: software-engineering
---

This department is the software-work entrypoint. The Head owns intake and the
final response; the three nested teams remain independent specialists.

## Ownership Boundaries

- `requirements_engineering_team` owns intended behavior, requirements
  evidence, acceptance criteria, user approval, requirements readiness, and
  preliminary downstream routing.
- `product_design_prototyping_team` owns its separate prototype projects,
  tickets, commits, user review, and UI/UX artifacts.
- `software_engineering_team` owns architecture when selected, implementation,
  review, executable validation, delivery, and finalization.

## Department Contract

The Head starts or resumes a stable package through Requirements Engineering.
Requirements Engineering forwards the user's explicit or clarified Product
Design request when present; Product Prototyper selects its mode after
receiving the request and returns its result to Requirements Engineering.
Once requirements approval and the routing assessment exist, the parent
handoff configuration routes the package either to bounded direct
implementation or to architecture design; it also handles Product Design and
blocked outcomes. The Software Engineering team carries the selected route
through validation and delivery, then returns the terminal result for Head
verification.

The detailed specialist procedures and artifact schemas belong to the member
skills and templates. `team-config.json` is the sole owner of executable
cross-team routing conditions and canonical recipient addresses.

## Communication Convention

Each specialist completes its own responsibility, persists its result, calls
`get_handoff_rules`, applies every matching rule, and uses `send_message_to`
with each exact returned `recipient_address`. No department member relays a
package merely to add an extra coordination step. Handoffs carry the stable
package identifier and absolute paths to the durable cumulative artifacts.
