---
name: Requirements Engineering Team
description: A focused requirements team that turns incoming requests or requirements packages into approved requirements and a result-based downstream route.
category: software-engineering
---

This team owns requirements work, not the implementation that follows it.
`requirements_engineer` is the local coordinator and canonical owner of the
requirements result.

## Ownership Boundaries

- `requirements_engineer` owns investigation, intended behavior, scope,
  requirements, acceptance criteria, supporting evidence, user approval,
  requirements readiness, the routing assessment, and its own artifacts.
- Product Design & Prototyping is a separate team. Requirements Engineering
  may request its visualizer or final prototype, but does not own its project,
  repository, tickets, commits, or UI/UX artifacts.
- Target architecture and implementation belong to downstream Software
  Engineering specialists.

## Team Contract

The Requirements Engineer uses its bundled skill to process the available
request or requirements package. After the requirements work, approval, and
routing assessment are complete, its classified result follows the parent
department's conditional handoff rules: prototype clarification may go to
Product Design & Prototyping, a bounded direct-implementation result may go
to Implementation Engineer, an architecture-routed or unclear result may go
to Architecture Designer, and a blocker may return to the department
coordinator.

The detailed work sequence, artifact schemas, assessment criteria, and
recovery rules belong to the Requirements Engineer skill and its templates.
The parent department `team-config.json` owns cross-team recipient addresses
and conditions; this local team has no competing cross-team routing table.

## Communication Convention

Every team member completes its own work, persists its result and artifacts,
calls `get_handoff_rules`, applies every matching rule, sends the result with
`send_message_to` to each exact returned `recipient_address`, and stops. If no
rule matches, it returns the result to the user or calling workflow.

Handoffs carry the stable package identifier, next expected action, and
absolute paths to all still-relevant artifacts. Product-team artifacts remain
externally owned and are referenced rather than recreated.
