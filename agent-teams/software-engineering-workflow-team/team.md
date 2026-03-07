---
name: Software Engineering Workflow Team
description: A staged multi-agent software-engineering team derived from the software-engineering-workflow-skill.
category: software-engineering
---

This team converts the single `software-engineering-workflow-skill` into a coordinated multi-agent workflow.

## Collaboration Model

- `requirements_analyst` handles clarification and requirements refinement.
- `architect` handles design basis and architecture reasoning.
- `implementation_engineer` handles implementation delivery.
- `api_e2e_tester` handles acceptance validation.
- `code_reviewer` handles the final engineering review and docs-impact closure.
- `deployment_engineer` handles release preparation, deployment execution, and post-deploy verification.

## Required Sequence

1. Clarify the request and make scope explicit through `requirements_analyst`.
2. Turn the clarified request into design direction through `architect`.
3. Implement against that direction.
4. Validate the result against expected behavior.
5. Review the final work for quality, remaining gaps, and docs impact.
6. Prepare and execute release or deployment work when required.

## Team Protocol

### Shared Principle

Each specialist should produce one artifact that the next specialist can act on directly.
Do not hand off vague commentary when a concrete artifact or classification is possible.
The original workflow skill's transition matrix is implemented here as agent-to-agent routing rather than a separate workflow-state controller.

### Primary Handoff Chain

1. `requirements_analyst` produces a requirements brief and sends it to `architect`.
2. `architect` produces a design brief and sends it to `implementation_engineer`.
3. `implementation_engineer` produces an implementation handoff and sends it to `api_e2e_tester`.
4. `api_e2e_tester` sends a validation report to `code_reviewer` when validation passes.
5. `code_reviewer` sends the approved review report to `deployment_engineer` when review passes.
6. `deployment_engineer` produces the final release and deployment report and acts as the terminal pass gate when deployment is in scope.

### Feedback Loop Routing

When a downstream specialist finds a problem, classify it and route it using `send_message_to`:

- `Local Fix` -> `implementation_engineer`
- `Design Impact` -> `architect`
- `Requirement Gap` -> `requirements_analyst`
- `Deployment Fix` -> `deployment_engineer`
- `Unclear` or cross-cutting issue -> `requirements_analyst` as the reset point for clarification

### Specialist Expectations

- `requirements_analyst` owns request clarity, scope, and acceptance criteria.
- `architect` owns solution direction and design-level tradeoffs.
- `implementation_engineer` owns execution against the current design and normal source commits during feature delivery.
- `api_e2e_tester` owns validation evidence and failure classification.
- `code_reviewer` owns final findings, residual risks, docs-impact visibility, and the engineering review gate.
- `deployment_engineer` owns release notes, version/tag or release commit work, deployment execution, rollout checks, and rollback visibility.

### Send-Back Rules

- Do not push a requirement issue into implementation as a coding task.
- Do not ask the reviewer to solve architecture gaps directly.
- Do not treat testing failures as all belonging to implementation; classify them first.
- When a specialist receives rework, they should produce an updated artifact and resend it to the correct downstream specialist.
- If a downstream issue changes assumptions or intended behavior, route back upstream before more implementation work continues.
- Do not leave release ownership implicit: if deployment is in scope, hand review-passed work to `deployment_engineer`.

## Team Rules

- Do not skip directly from user request to implementation without requirements and design.
- If upstream understanding is weak, route the work back instead of guessing.
- If testing or review discovers meaningful problems, route the work back to the right specialist.
- `requirements_analyst` is the runtime entrypoint because the team no longer depends on a separate coordinator agent.
- If no release or deployment work is required for a task, `deployment_engineer` may simply record that no deploy action was needed and close the flow.
- Keep outputs concise, actionable, and ready for the next specialist.

This repository intentionally keeps runtime configuration lightweight. Users are expected to customize models, tools, and processors after importing the definitions into AutoByteus.
