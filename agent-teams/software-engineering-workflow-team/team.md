---
name: Software Engineering Workflow Team
description: A staged multi-agent software-engineering team derived from the software-engineering-workflow-skill.
category: software-engineering
---

This team converts the single `software-engineering-workflow-skill` into a coordinated multi-agent workflow.

## Collaboration Model

- `workflow_lead` coordinates the process.
- `requirements_analyst` handles clarification and requirements refinement.
- `system_architect` handles design basis and architecture reasoning.
- `implementation_engineer` handles implementation delivery.
- `api_e2e_tester` handles acceptance validation.
- `code_reviewer` handles the final review and docs-impact closure.

## Required Sequence

1. Clarify the request and make scope explicit.
2. Turn the clarified request into design direction.
3. Implement against that direction.
4. Validate the result against expected behavior.
5. Review the final work for quality and remaining gaps.

## Team Rules

- Do not skip directly from user request to implementation without requirements and design.
- If upstream understanding is weak, route the work back instead of guessing.
- If testing or review discovers meaningful problems, route the work back to the right specialist.
- Keep outputs concise, actionable, and ready for the next specialist.

This repository intentionally keeps runtime configuration lightweight. Users are expected to customize models, tools, and processors after importing the definitions into AutoByteus.

