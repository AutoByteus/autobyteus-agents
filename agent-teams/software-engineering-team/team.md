---
name: Software Engineering Team
description: A Solution Designer-led team that investigates requests, engineers approved requirements, produces proportionate architecture designs, then implements, reviews, validates and delivers the solution.
category: software-engineering
---

Solution Designer is the coordinator and software-work entrypoint. It accepts
raw requests, approved packages or solution-revision feedback, owning both
requirements engineering and architecture design with an approved requirements
basis between those phases. The team can run standalone or inside an Org; no
separate requirements owner is required.

## Ownership Boundaries

- `solution_designer` owns intake, investigation, supported product scenarios,
  requirements, acceptance criteria, approval capture, architecture design,
  Product Design coordination, solution revisions and requirement/design recovery.
- `architecture_reviewer` independently reviews selected architecture packages.
- `implementation_engineer` owns implementation and implementation-scoped checks.
- `code_reviewer` independently reviews selected source/test work and owns
  failure-origin review at its boundary.
- `api_e2e_engineer` owns executable coverage and validation.
- `delivery_engineer` owns integrated delivery, documentation sync,
  verification from the evidence, finalization and the release the user or the
  release guide decides, deployment and cleanup.

## Route Contract

Solution Designer investigates and refines requirements, approves them within
the request's direction or obtains the user's approval when a decision needs
it, and completes architecture investigation and a proportionate design
spec. It then classifies the completed solution's size and architectural risk.
The configured rules determine independent review or direct implementation;
see [team-config.json](team-config.json) for the conditions. Direct here means
skipping independent review, not skipping design. Implementation self-checks
and executable validation still apply.

A request to release or deploy work that is already merged, with no change to
the software, has nothing to design: Solution Designer bootstraps the worktree
and hands the request to the delivery engineer, which releases with the
project's release guide and returns the result to Solution Designer.

Requirements and design stay distinct authorities despite their shared owner.
The same canonical investigation notes support both phases; one cumulative
`solution-revision-record.md` indexes their evolution. Every implementation-ready
package has approved requirements, investigation, design, solution history
and relevant supplements; [handoff.md](shared/handoff.md#the-tickets-documents)
lists the ticket's documents and when each exists.

Requirement/design/unclear findings return to Solution Designer, which obtains
renewed approval for changed intended behavior before revising the affected
authoritative design. Reviewer pass notifications do not trigger duplicate
forwarding. Delivery Engineer returns `Delivery Completed` to Solution Designer
only after its completion gates pass. Solution Designer verifies the receipt
and returns `Terminal` to the user/caller when no handoff rule matches.

## Communication Convention

Each specialist completes its skill-defined responsibility and hands off as
[handoff.md](shared/handoff.md) describes: the rules from `get_handoff_rules`
choose the recipients, and a handoff carries what the receiver needs for its
next step. [team-config.json](team-config.json) owns internal conditional
recipients; parent rules own cross-team Product handoffs. When no rule matches,
the result returns to the caller. When the user explicitly asks a specialist to
involve another agent or team, the specialist sends it the context even without
a rule.

Every role keeps to the ticket's scope: the requirements doc's Scope Guardrail
and the design spec's Change Scope. [shared/ticket-scope.md](shared/ticket-scope.md)
says whether a problem found is part of this ticket, a prerequisite (its own
Task first, which the Solution Designer asks the delegating agent to create), or
a follow-up, recorded in the ticket's `follow-ups.md` and sent by the Solution
Designer when the ticket leaves the team.
