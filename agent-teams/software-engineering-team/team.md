---
name: Software Engineering Team
description: A staged engineering delivery team for requirements, design, implementation, API and E2E validation, review, and deployment.
category: software-engineering
---

This team handles a software change from investigation and requirements definition through release and deployment.

## Team Roles

- `requirements_engineer` investigates the problem, defines scope, and produces a requirements doc plus supporting investigation notes.
- `architect_designer` performs architecture-level investigation and turns approved requirements into a detailed design spec grounded in the current codebase, organized around the primary spine, and clear about ownership boundaries.
- `architect_reviewer` reviews the design spec before implementation and checks spine clarity, ownership, naming, decoupling, and migration safety.
- `implementation_engineer` delivers the code changes and keeps the implementation aligned with the agreed design.
- `api_e2e_engineer` implements API and E2E tests, validates behavior against acceptance criteria, and reports evidence.
- `code_reviewer` performs independent engineering review and checks remaining risks and docs impact.
- `deployment_engineer` handles release preparation, rollout steps, and post-deploy verification.

## Delivery Flow

1. `requirements_engineer` investigates the request and produces a requirements doc plus investigation notes.
2. The user reviews and approves the requirements doc before design begins, while the investigation notes remain attached as design input.
3. `architect_designer` uses the approved requirements doc and investigation notes as starting input, performs architecture-level investigation, and turns that into a design spec.
4. `architect_reviewer` reviews the design spec, sends findings back to `architect_designer` until the design passes review, and then sends the reviewed design to `implementation_engineer`.
5. `implementation_engineer` delivers the implementation from the reviewed design and a concrete handoff for API and E2E work.
6. `api_e2e_engineer` implements and runs API and E2E tests, then reports pass, fail, or blocked status.
7. `code_reviewer` performs the engineering review once validation is clean.
8. `deployment_engineer` handles release and deployment work when that work is in scope.

## Working Agreement

- Every handoff should include a concrete artifact, the current decision state, open risks, and the next expected action.
- The requirements stage should hand off both the approved requirements doc and the current investigation notes before design starts.
- The `architect_designer` must still perform architecture-level investigation and must not rely on the requirements-stage notes alone when design depends on deeper structural facts.
- The design spec from `architect_designer` should identify the primary execution/data-flow spine first, name the key main-line nodes on that spine, define what those nodes own, state dependency direction, specify target modules/files, and keep support services explicitly off that spine unless they own core sequencing.
- Use `send_message_to` when handing work to another specialist.
- After the user approves the requirements artifact, the only forward handoff target for that artifact is `architect_designer`.
- `architect_designer` produces the detailed design spec that `architect_reviewer` reviews before any implementation starts.
- `architect_reviewer` must review the design spec for spine clarity, ownership clarity, naming clarity, dependency direction, module/file placement, and migration safety before implementation begins.
- The `architect_designer` and `architect_reviewer` loop may repeat for multiple rounds until the design passes review.
- Downstream specialists should not guess around upstream ambiguity. Send the work back with a clear classification instead.
- Small tasks should stay lightweight, but the team should still preserve role boundaries and explicit handoffs.
- Requirements work can require deep investigation across the codebase, documentation, logs, data, or external references before the requirements doc and investigation notes are ready for handoff.

## Issue Routing

When a downstream specialist finds a problem, classify it and route it to the right owner:

- `Local Fix` -> `implementation_engineer`
- `Design Impact` -> `architect_designer`
- `Requirement Gap` -> `requirements_engineer`
- `Deployment Fix` -> `deployment_engineer`
- `Unclear` or cross-cutting issue -> `requirements_engineer`

## Ownership

- `requirements_engineer` owns investigation findings, investigation notes, request clarity, scope, recommendations, and acceptance criteria.
- `architect_designer` owns solution direction, architecture-level investigation, design-level tradeoffs, spine clarity, ownership clarity, and identification of the key main-line nodes.
- `architect_reviewer` owns the design review gate, independent design findings, and pass/fail judgment for the design spec.
- `implementation_engineer` owns execution against the current design, unit-level verification, and normal source commits during feature delivery.
- `api_e2e_engineer` owns API and E2E test implementation, execution evidence, and failure classification.
- `code_reviewer` owns final findings, residual risks, docs-impact visibility, and the engineering review gate.
- `deployment_engineer` owns release notes, version/tag or release commit work, deployment execution, rollout checks, and rollback visibility.

## Send-Back Rules

- Do not push a requirement issue into implementation as a coding task.
- Do not ask the reviewer to redesign the system instead of routing design issues back to `architect_designer`.
- Do not bypass `architect_reviewer` and hand an unreviewed design spec directly to `implementation_engineer`.
- Do not treat testing failures as all belonging to implementation. Distinguish product defects, environment blockers, design problems, and requirement gaps.
- When a specialist receives rework, update the relevant artifact and resend it to the correct downstream specialist.
- If a downstream issue changes intended behavior, scope, or acceptance criteria, route back upstream before more implementation work continues.
- If release or deployment work is required, hand review-passed work to `deployment_engineer` instead of leaving release ownership implicit.
- Do not start design work until the user has confirmed that the requirements doc matches the intended outcome and the supporting investigation notes are current.

## Team Rules

- Start with `requirements_engineer` unless the task already comes with approved requirements.
- Do not bypass `architect_designer` after requirements approval when handing the requirements artifact forward.
- Do not move to implementation without a reviewed design spec that has passed the `architect_reviewer` gate.
- Do not move to design without an approved requirements doc and current investigation notes.
- Do not move to deployment before validation and review are clean.
- If no deployment work is required, `deployment_engineer` should record that explicitly.
- Keep outputs concise, actionable, and ready for the next specialist.
