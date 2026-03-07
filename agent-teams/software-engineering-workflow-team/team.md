---
name: Software Engineering Workflow Team
description: A staged engineering delivery team for requirements, design, implementation, validation, review, and deployment.
category: software-engineering
---

This team handles a software change from request clarification through release and deployment.

## Team Roles

- `requirements_analyst` clarifies the request, defines scope, and writes acceptance criteria.
- `architect` turns approved requirements into a design that implementation can follow.
- `implementation_engineer` delivers the code changes and keeps the implementation aligned with the agreed design.
- `api_e2e_tester` validates behavior against acceptance criteria and reports evidence.
- `code_reviewer` performs independent engineering review and checks remaining risks and docs impact.
- `deployment_engineer` handles release preparation, rollout steps, and post-deploy verification.

## Delivery Flow

1. `requirements_analyst` turns the request into a requirements brief.
2. `architect` turns the requirements brief into a design brief.
3. `implementation_engineer` delivers the implementation and a concrete handoff for validation.
4. `api_e2e_tester` validates the change and reports pass, fail, or blocked status.
5. `code_reviewer` performs the engineering review once validation is clean.
6. `deployment_engineer` handles release and deployment work when that work is in scope.

## Working Agreement

- Every handoff should include a concrete artifact, the current decision state, open risks, and the next expected action.
- Use `send_message_to` when handing work to another specialist.
- Downstream specialists should not guess around upstream ambiguity. Send the work back with a clear classification instead.
- Small tasks should stay lightweight, but the team should still preserve role boundaries and explicit handoffs.

## Issue Routing

When a downstream specialist finds a problem, classify it and route it to the right owner:

- `Local Fix` -> `implementation_engineer`
- `Design Impact` -> `architect`
- `Requirement Gap` -> `requirements_analyst`
- `Deployment Fix` -> `deployment_engineer`
- `Unclear` or cross-cutting issue -> `requirements_analyst`

## Ownership

- `requirements_analyst` owns request clarity, scope, and acceptance criteria.
- `architect` owns solution direction and design-level tradeoffs.
- `implementation_engineer` owns execution against the current design, unit-level verification, and normal source commits during feature delivery.
- `api_e2e_tester` owns validation evidence and failure classification.
- `code_reviewer` owns final findings, residual risks, docs-impact visibility, and the engineering review gate.
- `deployment_engineer` owns release notes, version/tag or release commit work, deployment execution, rollout checks, and rollback visibility.

## Send-Back Rules

- Do not push a requirement issue into implementation as a coding task.
- Do not ask the reviewer to redesign the system instead of routing design issues back to `architect`.
- Do not treat testing failures as all belonging to implementation. Distinguish product defects, environment blockers, design problems, and requirement gaps.
- When a specialist receives rework, update the relevant artifact and resend it to the correct downstream specialist.
- If a downstream issue changes intended behavior, scope, or acceptance criteria, route back upstream before more implementation work continues.
- If release or deployment work is required, hand review-passed work to `deployment_engineer` instead of leaving release ownership implicit.

## Team Rules

- Start with `requirements_analyst` unless the task already comes with approved requirements.
- Do not move to implementation without a stable design basis.
- Do not move to deployment before validation and review are clean.
- If no deployment work is required, `deployment_engineer` should record that explicitly.
- Keep outputs concise, actionable, and ready for the next specialist.
