---
name: Software Engineering Team
description: A lightweight self-operating software engineering team for upstream solution design, implementation, validation, review, documentation sync, and final handoff.
category: software-engineering
---

This team handles a software change from initial investigation through final handoff.

This team definition is intentionally lightweight.
There is no separate orchestrator for this team.
Each specialist does its own work, follows its own agent definition, and hands work to the next relevant specialist when ready.
Detailed operating rules, artifact standards, and send-back behavior belong in each member's own agent definition.

## Artifact Visibility Rule

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts produced so far, not only the latest local artifact.
- Downstream specialists should be able to read the cumulative artifact package without having to rediscover earlier work from scratch.
- Default cumulative package:
  - `architect_reviewer`: requirements doc, investigation notes, design spec
  - `implementation_engineer`: requirements doc, investigation notes, design spec, design review report
  - `api_e2e_engineer`: requirements doc, investigation notes, design spec, design review report, implementation handoff
  - `code_reviewer`: requirements doc, investigation notes, design spec, design review report, implementation handoff, validation report
  - `delivery_engineer`: requirements doc, investigation notes, design spec, design review report, implementation handoff, validation report, review report
- When a reroute or rework artifact is produced, include that artifact too alongside the already-existing upstream package.

## Team Members

- `solution_designer`: bootstraps the task context, investigates the request, defines scope, writes the requirements doc and investigation notes, produces the design spec, and acts as the reset point when downstream work exposes a requirement gap, design impact, or cross-cutting ambiguity.
- `architect_reviewer`: reviews the design spec and decides whether the design is ready for implementation.
- `implementation_engineer`: delivers the code changes from the reviewed design and prepares the implementation handoff.
- `api_e2e_engineer`: designs and executes executable validation and records pass, fail, blocked, and uncovered coverage with evidence.
- `code_reviewer`: performs the engineering review and records the final findings and residual risks.
- `delivery_engineer`: updates durable project documentation or records explicit no-impact once the reviewed implementation state is clear, then prepares the final handoff, waits for explicit user completion or verification before archival or repository finalization, and handles release or deployment work when it is in scope.
