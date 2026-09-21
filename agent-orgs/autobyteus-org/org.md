---
name: AutoByteus Org
description: A cross-functional AutoByteus organization combining product experience, software engineering, and marketing execution through shared Teams.
category: product-and-software
---

AutoByteus Org is the top-level operating organization for product experience,
software delivery, and marketing execution. It mounts the existing shared
Teams directly; it does not copy or redefine their agents, skills, tools, or
internal handoff rules.

## Mounted Teams

- `product_design_prototyping_team` owns product discovery, experience design,
  prototypes, and UI/UX evidence.
- `software_engineering_team` owns requirements integration, solution design,
  implementation, review, executable validation, and delivery.
- `marketing_team` owns platform-native marketing work across LinkedIn, X,
  Xiaohongshu, Weixin Official Account, and Weixin Channels.

`marketing_team` is intentionally referenced as a shared Team. Its definition
is supplied by the shared runtime catalog, including deployments that mount the
private marketing package. This public Org package does not duplicate or
expose that Team's account-specific files, learning records, or private
workspace data.

## Operating Contract

- Each mounted Team owns its internal coordinator, specialist responsibilities,
  skills, tools, artifacts, and local routing.
- Use the Org handoff rules for work that crosses product experience, software
  engineering, and marketing boundaries.
- Preserve the stable package or campaign identifier, the original request,
  approval state, constraints, and absolute artifact paths in every cross-Team
  handoff.
- Before sending a cross-Team result, call `get_handoff_rules`, apply every
  matching rule, and send to each exact returned `recipient_address`.
- Do not invent a recipient from memory or use a Team-internal address when the
  result belongs to another mounted Team.

## Cross-Team Boundaries

- Product experience questions and prototype evidence stay with Product Design
  & Prototyping until the relevant product decision or package is ready.
- Requirements, technical feasibility, implementation, review, validation, and
  delivery remain with Software Engineering.
- Marketing owns channel-native drafting and publishing workflows, but must
  obtain verified product facts and explicit approval before making claims or
  publishing live content.
- The Org owns only these cross-Team routes; each Team's `team-config.json`
  remains the source of truth for its internal handoffs.

## Package Model

This Org contains three shared Team references and no Org-level coordinator.
The shared Teams may be provided by different imported agent-definition
packages, as long as the runtime catalog contains the referenced Team IDs.
