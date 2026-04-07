---
name: Software Engineering Team
description: A lightweight self-operating software engineering team for requirements, design, implementation, validation, review, documentation sync, and final handoff.
category: software-engineering
---

This team handles a software change from investigation through final handoff.

This team definition is intentionally lightweight.
There is no separate orchestrator for this team.
Each specialist does its own work, follows its own agent definition, and hands work to the next relevant specialist when ready.
Detailed operating rules, artifact standards, and send-back behavior belong in each member's own agent definition.

## Team Members

- `requirements_engineer`: bootstraps the task context, investigates the request, defines scope, writes the requirements doc and investigation notes, and acts as the reset point when downstream work exposes a requirement gap or cross-cutting ambiguity.
- `architect_designer`: turns the approved requirements and supporting investigation into the design spec and owns architecture-level refinement when design issues are sent back.
- `architect_reviewer`: reviews the design spec and decides whether the design is ready for implementation.
- `implementation_engineer`: delivers the code changes from the reviewed design and prepares the implementation handoff.
- `api_e2e_engineer`: designs and executes executable validation and records pass, fail, blocked, and uncovered coverage with evidence.
- `code_reviewer`: performs the engineering review and records the final findings and residual risks.
- `documentation_engineer`: updates durable project documentation or records explicit no-impact once the reviewed implementation state is clear.
- `deployment_engineer`: prepares the final handoff, waits for explicit user completion or verification before archival or repository finalization, and handles release or deployment work when it is in scope.
