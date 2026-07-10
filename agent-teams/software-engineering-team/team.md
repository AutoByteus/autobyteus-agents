---
name: Software Engineering Team
description: A lightweight self-operating software engineering team for upstream solution design, implementation, API/E2E coverage investigation and execution, review, documentation sync, and final handoff.
category: software-engineering
---

This team handles a software change from initial investigation through final handoff.

This team definition is intentionally lightweight.
`solution_designer` is the coordinator entry specialist for this team.
There is no separate standalone orchestrator role beyond the listed specialists.
Each specialist does its own work, follows its own bundled agent and skill definition, and hands work to the next relevant specialist when ready.
Detailed operating rules, artifact standards, and send-back behavior belong in each member's bundled `SKILL.md` and local templates rather than being duplicated across `team.md` and `agent.md`.

## Team Members

- `solution_designer`: bootstraps the task context, investigates the request, defines scope, writes the three mandatory solution artifacts, creates task-specific supplemental solution artifacts when they improve precision, and acts as the reset point when downstream work exposes a requirement gap, design impact, or cross-cutting ambiguity.
- `architecture_reviewer`: reviews the complete solution package and decides whether the design is ready for implementation.
- `implementation_engineer`: delivers the code changes from the reviewed design, runs implementation-scoped local checks, and prepares the implementation handoff without owning API/E2E coverage investigation, execution, or environment setup.
- `code_reviewer`: performs the source and architecture review pass before API/E2E coverage investigation and execution proceeds, and re-reviews any repository-resident durable coverage code added, updated, or removed later during API/E2E before delivery begins.
- `api_e2e_engineer`: owns API, end-to-end, and broader executable coverage investigation, existing-test validity decisions, coverage, environment setup, execution, and evidence after the implementation has passed code review; when it adds, updates, or removes repository-resident durable coverage, that updated state returns through `code_reviewer` before delivery.
- `delivery_engineer`: first refreshes the ticket branch against the latest tracked remote state of the recorded base branch, records the integrated-state check result, then updates durable project documentation or records explicit no-impact against that integrated state, prepares the final handoff, waits for explicit user completion or verification before archival or repository finalization, and handles release or deployment work when it is in scope.

## Delivery Flow

- Primary pass path: `solution_designer` -> `architecture_reviewer` -> `implementation_engineer` -> `code_reviewer` -> `api_e2e_engineer` -> `delivery_engineer`.
- `Design Impact`, `Requirement Gap`, and `Unclear` return to `solution_designer`; the revised solution package returns through `architecture_reviewer` before implementation resumes.
- A bounded `Local Fix` returns to the specialist that owns the affected code: `implementation_engineer` for implementation-owned source or packaging, and `api_e2e_engineer` for API/E2E-owned durable coverage. Updated code returns through `code_reviewer` before the next stage resumes.
- When `api_e2e_engineer` adds, updates, or removes repository-resident durable coverage after the initial code review, the cumulative package returns through `code_reviewer` before `delivery_engineer`.

## Team Orchestration Authority

- AutoByteus is the sole orchestration authority while an agent is running as a member of this team.
- Use AutoByteus `send_message_to` with an existing `memberName` from `team-config.json` for every inter-member workflow handoff, reroute, rework request, or stage transition.
- Do not use Codex-native multi-agent or collaboration tools such as `spawn_agent`, `wait_agent`, `list_agents`, `send_message`, `followup_task`, `interrupt_agent`, or equivalents, even when those tools are available in the runtime.
- Never create `/root/...` agents or any other native subagents to stand in for the declared AutoByteus team members.
- `coordinatorMemberName` identifies the AutoByteus entry specialist; it does not authorize that member to construct or supervise a parallel native-agent team.
- After a successful `send_message_to` handoff, finish the current stage and rely on AutoByteus messages and events to activate or resume the appropriate member. Do not poll another agent with native wait or list tools.
- If `send_message_to` is unavailable or a handoff cannot be completed after a bounded retry, preserve the artifacts and report the handoff blocker. Do not fall back to native subagent creation.

## Artifact Package Rules

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts produced so far, not only the latest local artifact.
- Downstream specialists should be able to read the cumulative artifact package without having to rediscover earlier work from scratch.
- The mandatory solution package is always the requirements doc, investigation notes, and design spec.
- `solution_designer` may add task-specific supplemental solution artifacts when a separate document materially improves requirement or design precision. Examples include a UI/UX specification, user-journey or interaction-state specification, protocol/API contract, or data-mapping specification.
- Supplemental solution artifacts extend but never replace the three mandatory solution artifacts. Link each supplement from at least one mandatory artifact, record its scope and approval state, and include it in every downstream cumulative package while it remains relevant.
- After architecture review, the mandatory solution package and its still-relevant supplements together form the reviewed solution package. The design review report records the gate decision and travels alongside that package.
- Default cumulative package:
  - `architecture_reviewer`: mandatory solution package, plus all still-relevant supplemental solution artifacts
  - `implementation_engineer`: reviewed solution package, plus the design review report
  - `code_reviewer`: reviewed solution package, design review report, and implementation handoff
  - `api_e2e_engineer`: reviewed solution package, design review report, implementation handoff, and code review report
  - `delivery_engineer`: reviewed solution package, design review report, implementation handoff, code review report, coverage investigation, and execution coverage report
- `api_e2e_engineer` must produce a coverage investigation artifact before final test execution, durable coverage edits, durable coverage removals, or failure rerouting. That artifact records whether existing API/E2E coverage is still valid, stale, needs update, should be removed, or must be replaced or expanded.
- When a reroute or rework artifact is produced, include that artifact too alongside the already-existing upstream package.
