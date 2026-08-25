---
name: Software Engineering Team
description: A self-operating software engineering team that turns an approved requirements package into reviewed architecture, implementation, executable validation, verified delivery, and a returned team result.
category: software-engineering
---

This team begins with approved, architecture-ready requirements and carries them through technical design, implementation, executable validation, and finalized delivery. Independent architecture and source-review gates are selected from the completed work result rather than applied unconditionally.

`architecture_designer` is the coordinator and ingress specialist. There is no separate orchestrator role. Each specialist owns its stage and sends the cumulative package to the next accountable specialist.

Detailed operating rules, artifacts, validation, and recovery belong in each member's bundled `SKILL.md` and templates.

## Responsibility Boundary

- Requirements Engineering owns intended behavior, acceptance criteria, supporting requirement evidence, and user approval.
- Software Engineering owns target architecture, architecture review, implementation, source review, executable validation, delivery, and finalization.
- The team consumes approved upstream artifacts and does not silently rewrite them. A material requirement gap returns through `architecture_designer` under the applicable handoff rules.
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

- `architecture_designer`: investigates current architecture, creates the complete technical design, determines `task_size` and `architectural_risk`, coordinates architecture-owned recovery, receives terminal delivery evidence, and routes the terminal outcome.
- `architecture_reviewer`: independently reviews designs selected for review by the completed task classification and decides whether they are ready for implementation.
- `implementation_engineer`: implements the design, confirms or updates the carried classification when evidence requires it, performs implementation-scoped checks and a lightweight self-review on the direct route, and prepares the implementation handoff.
- `code_reviewer`: independently reviews implementation source for selected large/high-risk work and later performs proportional review of API/E2E test-code changes or records `Not Applicable`.
- `api_e2e_engineer`: accepts either a reviewed or direct implementation package, investigates coverage validity, executes API/E2E and broader validation, maintains applicable durable coverage, and produces evidence.
- `delivery_engineer`: integrates the latest base, synchronizes durable documentation, prepares user verification, waits for explicit user confirmation, completes finalization and applicable release/deployment/cleanup, and returns the terminal package to `architecture_designer`.

## Primary Flow

1. `architecture_designer` validates the approved input package, performs architecture-level investigation, writes `design-spec.md`, creates `architecture-design-revision-record.md`, and records `task_size` as `Small`, `Medium`, or `Large` plus `architectural_risk` as `Low` or `High`.
2. After the design is complete, `architecture_designer` calls `get_handoff_rules`. `Large` or `High` work goes to `architecture_reviewer`; `Small` or `Medium` plus `Low` goes directly to `implementation_engineer`.
3. When selected, `architecture_reviewer` independently reviews the design, then sends the cumulative reviewed package to `implementation_engineer` and the informational pass notification to `architecture_designer`.
4. `implementation_engineer` implements the design, runs implementation-scoped validation, carries the two classification fields into `implementation-handoff.md`, records any evidence-based change, and calls `get_handoff_rules`. `Large` or `High` work goes to `code_reviewer`; `Small` or `Medium` plus `Low` goes directly to `api_e2e_engineer`.
5. When selected, `code_reviewer` independently reviews implementation source, then sends the package to `api_e2e_engineer` and the informational pass notification to `implementation_engineer`.
6. `api_e2e_engineer` investigates and executes coverage. A successful reviewed-route result goes to `code_reviewer` for proportional test-code review, including `Not Applicable` when no durable test file changed. A successful direct low-risk result goes directly to `delivery_engineer`. A failure may still go to `code_reviewer` for focused failure-origin review.
7. On successful proportional test-code review, `code_reviewer` sends the complete passed package to `delivery_engineer`.
8. `delivery_engineer` performs the latest-base integration and delivery workflow, obtains explicit user testing/verification, and completes all applicable finalization, release/deployment, and safe cleanup steps.
9. Only after successful finalization, `delivery_engineer` sends the terminal cumulative package to `architecture_designer`.
10. `architecture_designer` verifies the terminal package, applies the available handoff rules, and returns the result to the user or calling workflow when no rule applies.

## Routing Classification

The two routing fields are intentionally simple and are assigned after the Architecture Designer completes the design:

- `task_size`: `Small`, `Medium`, or `Large`. This is the expected implementation scope; file count is supporting evidence, not a hard threshold.
- `architectural_risk`: `Low` or `High`. `High` applies when the design has material contract, persistence, security, concurrency, deployment, ownership-boundary, blast-radius, or unresolved-uncertainty impact.

`Large` or `High` always selects the independent Architecture Reviewer and Code Reviewer gates. `Small` or `Medium` with `Low` risk uses the direct implementation and API/E2E path. Implementation Engineer may correct either field when new evidence requires it, but must not silently downgrade risk; a newly discovered design impact returns to Architecture Designer.

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

When a reroute or rework artifact is produced, retain it alongside the upstream chain. Internal specialists continue using this artifact-driven model and stable package identity.

## Review Pass Notifications

Pass notifications complement rather than replace the primary forward handoff.

- Send the full primary handoff first. After it succeeds, send the short notification so it can truthfully name the next active stage.
- If the notification fails after the primary handoff succeeds, retry only the notification; do not duplicate the primary handoff.
- Architecture-review pass notification -> `architecture_designer`.
- Implementation code-review pass notification -> `implementation_engineer`.
- Include `Pass`, the applicable review/revision ID, review-report path, next recipient, and `Informational — no action required`.
- The notified originator records the status and does not repeat the primary handoff or restart work.

## Recovery Boundary

- Internal `Local Fix`, `Design Impact`, and test/review reroutes continue through `send_message_to` under the owning skills.
- Requirement gaps route to `architecture_designer`, which does not edit approved requirements. It completes the precise gap evidence and applies the handoff rules so Requirements Engineering can produce an updated and re-approved package.
- Revision instructions return to `architecture_designer`, which routes them to the correct specialist while preserving the package identifier and artifact history.
- `delivery_engineer` must not send a successful terminal message before explicit user testing/verification and successful finalization.
- `architecture_designer` must not send a successful terminal outcome before receiving and checking that terminal delivery package.

## Communication Authority

- Use `send_message_to` for internal team handoffs, acknowledgements, reroutes, and terminal outcomes.
- Every specialist calls `get_handoff_rules` after completing its own result and uses each matching returned recipient exactly. Skills define the classification and handoff procedure; `team-config.json` defines the conditional recipients.
- Do not use Codex-native collaboration tools for this team's internal workflow.
- After completing all required messages for a stage, end the stage and do not poll.
