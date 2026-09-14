---
name: Software Development Department
description: A software delivery department with a thin Department Head entrypoint, a Solution Designer-led Software Engineering Team, and an independent Product Design & Prototyping Team.
category: software-engineering
---

Department Head is the placeholder department coordinator. It forwards the
user's request and existing context to the Software Engineering Team's Solution
Designer, then returns the terminal result or unresolved blocker to the user.
It does not own requirements, design, approvals or delivery gates.

## Ownership Boundaries

- `department_head` owns only intake routing and the final department response.
- `software_engineering_team/solution_designer` owns investigation, supported
  product scenarios, requirements, user-approval capture, architecture design,
  solution revisions and upstream recovery. It coordinates the engineering
  team and verifies the finalized delivery receipt.
- `product_design_prototyping_team` independently owns its modes, separate
  prototype projects, tickets, commits, user review and UI/UX artifacts.
- The remaining Software Engineering specialists own independent architecture
  review, implementation, code review, executable validation and delivery.

## Department Contract

A rough software request can enter directly; Department Head does not require
an approved requirements package. Solution Designer carries investigation into
requirements and, after explicit user approval, a proportionate architecture
design. It classifies size/risk after completing that design, then applies the
configured rules. Independent reviews remain conditional; design is not skipped.

Solution Designer exchanges Product requests and returned evidence directly
with Product Prototyper. Requirements/design clarification and downstream
recovery stay with Solution Designer, not Department Head. Delivery Engineer
returns finalized delivery to Solution Designer, which verifies the receipt
before returning `Terminal` to Department Head. Department Head presents that
result without dispatching it as new work or repeating specialist gates.

Detailed work belongs to the member skills. The department's
[team-config.json](team-config.json) owns cross-team recipient addresses and
conditional rules; child teams own their internal routing policies.

## Communication Convention

Finish owned work and persist any owned artifacts, classify the outcome, call
`get_handoff_rules`, apply every matching rule and use `send_message_to` with
each exact returned `recipient_address`. Carry the stable package identifier
and absolute artifact paths. Return the result to the caller when no rule
matches; stop after required handoffs. Do not use `delegate_task` as a substitute
or make Department Head a relay for specialist conversations.
