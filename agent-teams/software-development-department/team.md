---
name: Software Development Department
description: A software delivery department with a placeholder Department Head coordinator, a Solution Designer-led Software Engineering Team, and an independent Product Design & Prototyping Team.
category: software-engineering
---

Department Head is the placeholder department coordinator.

## Ownership Boundaries

- `department_head` fills the required coordinator slot without workflow duties.
- `software_engineering_team/solution_designer` owns investigation, supported
  product scenarios, requirements, user-approval capture, architecture design,
  solution revisions and upstream recovery. It coordinates the engineering
  team and verifies the finalized delivery receipt.
- `product_design_prototyping_team` independently owns its modes, separate
  prototype projects, tickets, commits, user review and UI/UX artifacts.
- The remaining Software Engineering specialists own independent architecture
  review, implementation, code review, executable validation and delivery.

## Department Contract

Solution Designer accepts rough software requests and carries investigation into
requirements and, after explicit user approval, a proportionate architecture
design. It classifies size/risk after completing that design, then applies the
configured rules. Independent reviews remain conditional; design is not skipped.

Solution Designer exchanges Product requests and returned evidence directly
with Product Prototyper. Requirements/design clarification and downstream
recovery stay with Solution Designer. Delivery Engineer returns finalized
delivery to Solution Designer, which verifies the receipt before returning
`Terminal` to the user or caller when no handoff rule matches.

Detailed work belongs to the member skills. The department's
[team-config.json](team-config.json) owns cross-team recipient addresses and
conditional rules; child teams own their internal routing policies.

## Communication Convention

Each working specialist finishes owned work, persists artifacts, classifies the
outcome, calls `get_handoff_rules`, applies every matching rule and uses
`send_message_to` with each exact returned `recipient_address`. Carry the stable package identifier
and absolute artifact paths. Return the result to the caller when no rule
matches; stop after required handoffs. Do not use `delegate_task` as a substitute.
