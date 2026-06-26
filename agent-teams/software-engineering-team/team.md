---
name: Software Engineering Team
description: A lightweight self-operating software engineering team for upstream solution design, implementation, API/E2E coverage investigation and execution, review, documentation sync, and final handoff.
category: software-engineering
---

This team handles a software change from initial investigation through final handoff.
When product iteration is active, the team can also run an outer loop where `product_manager` proposes the next Product Feature Brief, the normal engineering workflow delivers it through the existing gates, and `delivery_engineer` returns completion context to `product_manager` for the next proposal.

This team definition is intentionally lightweight.
`solution_designer` is the coordinator entry specialist for this team.
There is no separate standalone orchestrator role beyond the listed specialists.
Each specialist does its own work, follows its own bundled agent and skill definition, and hands work to the next relevant specialist when ready.
Detailed operating rules, artifact standards, and send-back behavior belong in each member's bundled `SKILL.md` and local templates rather than being duplicated across `team.md` and `agent.md`.

## Artifact Visibility Rule

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts produced so far, not only the latest local artifact.
- Downstream specialists should be able to read the cumulative artifact package without having to rediscover earlier work from scratch.
- Default cumulative package:
  - `architecture_reviewer`: requirements doc, investigation notes, design spec
  - `implementation_engineer`: requirements doc, investigation notes, design spec, design review report
  - `code_reviewer`: requirements doc, investigation notes, design spec, design review report, implementation handoff
  - `api_e2e_engineer`: requirements doc, investigation notes, design spec, design review report, implementation handoff, code review report
  - `delivery_engineer`: requirements doc, investigation notes, design spec, design review report, implementation handoff, code review report, coverage investigation, execution coverage report
  - `product_manager` (product-iteration completion callback): requirements doc, investigation notes, design spec, design review report, implementation handoff, code review report, coverage investigation, execution coverage report, docs sync report, final handoff summary or delivery/release/deployment report
- `api_e2e_engineer` must produce a coverage investigation artifact before final test execution, durable coverage edits, durable coverage removals, or failure rerouting. That artifact records whether existing API/E2E coverage is still valid, stale, needs update, should be removed, or must be replaced or expanded.
- If `api_e2e_engineer` adds, updates, or removes repository-resident durable coverage after the initial code review, route the cumulative package plus the coverage investigation and execution coverage report back through `code_reviewer` before `delivery_engineer`.
- When a reroute or rework artifact is produced, include that artifact too alongside the already-existing upstream package.

## Team Members

- `solution_designer`: bootstraps the task context, investigates the request, defines scope, writes the requirements doc and investigation notes, produces the design spec, and acts as the reset point when downstream work exposes a requirement gap, design impact, or cross-cutting ambiguity.
- `product_manager`: owns product opportunity selection, next-feature proposals, Product Feature Briefs, and the outer delivery-to-product iteration loop; routes concrete briefs back to Engineering Intake / `solution_designer` without bypassing engineering gates.
- `architecture_reviewer`: reviews the design spec and decides whether the design is ready for implementation.
- `implementation_engineer`: delivers the code changes from the reviewed design, runs implementation-scoped local checks, and prepares the implementation handoff without owning API/E2E coverage investigation, execution, or environment setup.
- `code_reviewer`: performs the source and architecture review pass before API/E2E coverage investigation and execution proceeds, and re-reviews any repository-resident durable coverage code added, updated, or removed later during API/E2E before delivery begins.
- `api_e2e_engineer`: owns API, end-to-end, and broader executable coverage investigation, existing-test validity decisions, coverage, environment setup, execution, and evidence after the implementation has passed code review; when it adds, updates, or removes repository-resident durable coverage, that updated state returns through `code_reviewer` before delivery.
- `delivery_engineer`: first refreshes the ticket branch against the latest tracked remote state of the recorded base branch, records the integrated-state check result, then updates durable project documentation or records explicit no-impact against that integrated state, prepares the final handoff, waits for explicit user completion or verification before archival or repository finalization, and handles release or deployment work when it is in scope.

## Product Iteration Coordination

- Product iteration is active when a task starts from a Product Manager brief or the user explicitly asks for continuous product improvement. Unrelated one-off work can record the Product Manager callback as `Not Required`.
- `product_manager` proposes the next feature; `solution_designer` remains the engineering intake/coordinator for refining a concrete brief into requirements and design.
- After Delivery Engineer has truthful delivery completion/finalization status for an active product-iteration task, `delivery_engineer` sends a self-contained completion packet to `product_manager` with relevant artifact paths using `send_message_to`.
- If `product_manager` cannot be messaged, Delivery Engineer records the packet path and callback status as `Pending` or `Blocked`; only a successful `send_message_to(product_manager)` counts as `Sent`.
- Delivery Engineer must not choose the next feature. Product Manager must not start source edits or route directly to implementation; the next feature returns to Engineering Intake / `solution_designer`.
