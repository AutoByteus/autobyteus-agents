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
  forwards the user's explicit or clarified Product Design request together
  with its requirements context. Product Prototyper selects the appropriate
  mode after receiving that request; Requirements Engineering does not choose
  the mode or own the Product team's project, repository, tickets, commits, or
  UI/UX artifacts.
- Target architecture and implementation belong to downstream Software
  Engineering specialists.

## Team Contract

The Requirements Engineer uses its bundled skill to process the available
request or requirements package. During requirements work, an explicit or
clarified Product Design request may follow the parent department's
conditional handoff rule to Product Design & Prototyping; returned evidence
comes back to Requirements Engineering for user decision and requirements
integration. After requirements approval and the routing assessment are
complete, a bounded direct-implementation result may go to Implementation
Engineer, an architecture-routed or unclear result may go to Architecture
Designer, and a blocker may return to the department coordinator.

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
