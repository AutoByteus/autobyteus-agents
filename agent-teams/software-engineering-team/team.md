---
name: Software Engineering Team
description: A Solution Designer-led team that investigates requests, engineers approved requirements, produces proportionate architecture designs, then implements, reviews, validates and delivers the solution.
category: software-engineering
---

Solution Designer is the coordinator and software-work entrypoint. It accepts
raw requests, approved packages or solution-revision feedback, owning both
requirements engineering and architecture design with explicit user approval
between those phases. The team can run standalone or within the Software
Development Department; no separate requirements owner is required.

## Ownership Boundaries

- `solution_designer` owns intake, investigation, supported product scenarios,
  requirements, acceptance criteria, approval capture, architecture design,
  Product Design coordination, solution revisions and requirement/design recovery.
- `architecture_reviewer` independently reviews selected architecture packages.
- `implementation_engineer` owns implementation and implementation-scoped checks.
- `code_reviewer` independently reviews selected source/test work and owns
  failure-origin review at its boundary.
- `api_e2e_engineer` owns executable coverage and validation.
- `delivery_engineer` owns integrated delivery, documentation sync, explicit
  user verification, finalization and applicable release/deployment/cleanup.

## Route Contract

Solution Designer investigates and refines requirements, obtains explicit user
approval, and completes architecture investigation and a proportionate design
spec. It then classifies the completed solution's size and architectural risk.
The configured rules determine independent review or direct implementation;
see [team-config.json](team-config.json) for the conditions. Direct here means
skipping independent review, not skipping design. Implementation self-checks
and executable validation still apply.

Requirements and design stay distinct authorities despite their shared owner.
The same canonical investigation notes support both phases; one cumulative
`solution-revision-record.md` indexes their evolution. Every implementation-ready
package carries approved requirements, investigation, design, solution history
and relevant supplements. Include independent review artifacts when applicable;
omitted review artifacts are explicitly `N/A — not applicable`.

Requirement/design/unclear findings return to Solution Designer, which obtains
renewed approval for changed intended behavior before revising the affected
authoritative design. Reviewer pass notifications do not trigger duplicate
forwarding. Delivery Engineer returns `Delivery Completed` to Solution Designer
only after its completion gates pass. Solution Designer verifies the receipt
and returns `Terminal` through the applicable parent rule or directly to the
user/caller when standalone. Department Head does not repeat these gates.

## Communication Convention

Each specialist completes its skill-defined responsibility, persists artifacts,
classifies its result, calls `get_handoff_rules`, applies every matching rule
and uses `send_message_to` with each exact returned `recipient_address`.
[team-config.json](team-config.json) owns internal conditional recipients;
parent rules own cross-team Product and department handoffs. Return the result
to the caller if no rule matches and stop after required handoffs. Do not use
`delegate_task` as a substitute for this result-based protocol.
