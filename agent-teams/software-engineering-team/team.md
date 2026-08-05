---
name: Software Engineering Team
description: A self-operating software engineering team that turns an approved requirements package into reviewed architecture, implementation, executable validation, verified delivery, and a returned team result.
category: software-engineering
---

This team begins with approved, architecture-ready requirements and carries them through technical design, implementation, review, API/E2E validation, and finalized delivery.

`architecture_designer` is the coordinator and task-team ingress specialist. There is no separate orchestrator role. Each specialist owns its stage and sends the cumulative package to the next accountable specialist.

Detailed operating rules, artifacts, validation, and recovery belong in each member's bundled `SKILL.md` and templates.

## Responsibility Boundary

- Requirements Engineering owns intended behavior, acceptance criteria, supporting requirement evidence, and user approval.
- Software Engineering owns target architecture, architecture review, implementation, source review, executable validation, delivery, and finalization.
- The team consumes approved upstream artifacts and does not silently rewrite them. A material requirement gap returns through `architecture_designer` to the delegating Requirements Engineer or standalone caller.
- The coordinator rename preserves the full existing architecture-design capability.

## Entry Contract

The default input is the cumulative approved requirements package:

- `requirements-doc.md`
- `investigation-notes.md`
- `requirements-revision-record.md`
- every still-relevant requirements supplement
- approved UI/UX package and prototype references when applicable
- assigned workspace, repository, branch/worktree, base, and finalization context
- expected validation, delivery, and done conditions

`architecture_designer` verifies this package before design. Missing approval, contradictory intended behavior, or unsafe workspace context is a blocker, not permission to recreate requirement engineering.

## Team Members

- `architecture_designer`: investigates current architecture, creates the complete technical design, coordinates architecture-owned recovery, receives terminal delivery evidence, and submits the delegated team result.
- `architecture_reviewer`: independently reviews the design and decides whether it is ready for implementation.
- `implementation_engineer`: implements the reviewed design, performs implementation-scoped checks, and prepares the implementation handoff.
- `code_reviewer`: independently reviews implementation source and later performs proportional review of API/E2E test-code changes or records `Not Applicable`.
- `api_e2e_engineer`: investigates coverage validity, executes API/E2E and broader validation, maintains applicable durable coverage, and produces evidence.
- `delivery_engineer`: integrates the latest base, synchronizes durable documentation, prepares user verification, waits for explicit user confirmation, completes finalization and applicable release/deployment/cleanup, and returns the terminal package to `architecture_designer`.

## Primary Flow

1. `architecture_designer` validates the approved input package, performs architecture-level investigation, writes `design-spec.md`, and creates `architecture-design-revision-record.md`.
2. `architecture_designer` sends the cumulative architecture package to `architecture_reviewer`.
3. On architecture-review pass, `architecture_reviewer` sends the full package to `implementation_engineer`, then sends a short informational pass notification to `architecture_designer`.
4. `implementation_engineer` implements and validates the design, then sends the cumulative implementation package to `code_reviewer`.
5. On implementation-review pass, `code_reviewer` sends the full package to `api_e2e_engineer`, then sends a short informational pass notification to `implementation_engineer`.
6. `api_e2e_engineer` investigates and executes coverage, then returns the complete result to `code_reviewer` for proportional test-code review, including `Not Applicable` when no durable test file changed.
7. On successful proportional review, `code_reviewer` sends the complete passed package to `delivery_engineer`.
8. `delivery_engineer` performs the latest-base integration and delivery workflow, obtains explicit user testing/verification, and completes all applicable finalization, release/deployment, and safe cleanup steps.
9. Only after successful finalization, `delivery_engineer` sends the terminal cumulative package to `architecture_designer`.
10. When this is a delegated task-team run, `architecture_designer` submits the final result with `submit_task_result`; otherwise it returns the result through the standalone caller path.

## Artifact Visibility Rule

Every primary handoff carries absolute paths for all still-relevant artifacts produced so far, not only the latest stage artifact. The cumulative package grows through:

1. approved requirements, investigation notes, requirements revision record, and supplements
2. design spec and architecture-design revision record
3. design review report and architecture-review revision record
4. implementation handoff and implementation revision record
5. code review report and code-review revision record
6. coverage investigation, execution coverage report, and API/E2E revision record
7. proportional API/E2E test-code review result
8. delivery, docs-sync, handoff, release/deployment, and finalization evidence

When a reroute or rework artifact is produced, retain it alongside the upstream chain. Internal specialists continue using this artifact-driven model; they do not need parent task-lifecycle metadata.

## Review Pass Notifications

Pass notifications complement rather than replace the primary forward handoff.

- Send the full primary handoff first. After it succeeds, send the short notification so it can truthfully name the next active stage.
- If the notification fails after the primary handoff succeeds, retry only the notification; do not duplicate the primary handoff.
- Architecture-review pass notification -> `architecture_designer`.
- Implementation code-review pass notification -> `implementation_engineer`.
- Include `Pass`, the applicable review/revision ID, review-report path, next recipient, and `Informational — no action required`.
- The notified originator records the status and does not repeat the primary handoff or restart work.

## Recovery And Task Boundary

- Internal `Local Fix`, `Design Impact`, and test/review reroutes continue through `send_message_to` under the owning skills.
- Requirement gaps route to `architecture_designer`, which does not edit approved requirements. In a delegated run it submits the precise gap through the task-result lifecycle so the Requirements Engineer can update and re-approve requirements before requesting revision on the same task.
- Parent revision instructions return to the task-scoped `architecture_designer`, which routes them to the correct specialist without creating a duplicate task.
- `delivery_engineer` must not send a successful terminal message before explicit user testing/verification and successful finalization.
- `architecture_designer` must not submit a successful task result before receiving and checking that terminal delivery package.

## Communication Authority

- Use `send_message_to` for ordinary internal team handoffs, acknowledgements, and reroutes.
- Use `submit_task_result` only from `architecture_designer` when it has the bound delegated task-team ingress context.
- Do not use Codex-native collaboration tools for this team's internal workflow.
- After completing all required messages for a stage, end the stage and do not poll.
