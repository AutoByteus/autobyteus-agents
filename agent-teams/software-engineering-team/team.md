---
name: Software Engineering Team
description: A lightweight self-operating software engineering team for upstream solution design, implementation, validation, review, documentation sync, and final handoff.
category: software-engineering
---

This team handles a software change from initial investigation through final handoff.

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
  - `api_e2e_engineer`: requirements doc, investigation notes, design spec, design review report, implementation handoff, review report
  - `delivery_engineer`: requirements doc, investigation notes, design spec, design review report, implementation handoff, review report, validation report
- If `api_e2e_engineer` adds or updates repository-resident durable validation after the initial code review, route the cumulative package plus the validation report back through `code_reviewer` before `delivery_engineer`.
- When a reroute or rework artifact is produced, include that artifact too alongside the already-existing upstream package.

## Team Members

- `solution_designer`: bootstraps the task context, investigates the request, defines scope, writes the requirements doc and investigation notes, produces the design spec, and acts as the reset point when downstream work exposes a requirement gap, design impact, or cross-cutting ambiguity.
- `architecture_reviewer`: reviews the design spec and decides whether the design is ready for implementation.
- `implementation_engineer`: delivers the code changes from the reviewed design, runs implementation-scoped local checks, and prepares the implementation handoff without owning API/E2E validation or validation-environment setup.
- `code_reviewer`: performs the source and architecture review pass before API/E2E validation proceeds, and re-reviews any repository-resident durable validation code added later during API/E2E before delivery begins.
- `api_e2e_engineer`: owns API, end-to-end, and broader executable validation coverage, validation-environment setup, execution, and evidence after the implementation has passed code review; when it adds or updates repository-resident durable validation, that updated state returns through `code_reviewer` before delivery.
- `delivery_engineer`: first refreshes the ticket branch against the latest tracked remote state of the recorded base branch, records the integrated-state check result, then updates durable project documentation or records explicit no-impact against that integrated state, prepares the final handoff, waits for explicit user completion or verification before archival or repository finalization, and handles release or deployment work when it is in scope.
