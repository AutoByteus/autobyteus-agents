# Requirements Doc

## Status (`Draft`/`Design-ready`/`Refined`)

`Design-ready`

## Goal / Problem Statement

Update the Product Iteration Team so Product Manager can run a complete product goal as a self-contained loop: accept each delivered feature from truthful engineering evidence, select and route the next bounded requirement while the goal is incomplete, and stop only when the Product Manager determines the product goal/requirement is complete (or an explicit blocker/pause/stop decision applies). Routine human verification must not sit between accepted iterations.

This change is limited to the current `autobyteus-agents` repository. It changes the agent-team contract and durable Product Manager guidance/templates; it does not implement a runtime orchestration service or remove exceptional user approvals for irreversible external effects.

## Investigation Findings

- The existing Product Iteration Team is already Product Manager-coordinated and active by default.
- The existing Product Manager skill already owns the plan, accepts delivery packets, and proposes one next feature, but its accepted-delivery procedure unconditionally requires a next brief and has no explicit product-goal-complete branch.
- The existing team and delivery guidance already separates routine product-iteration acceptance from one-off user verification, but the completion condition is represented only indirectly as `Stopped` and is not tied to a Product Manager completion decision.
- The Product Iteration Plan template has backlog, cursor, history, and outer-loop status fields but lacks explicit completion evidence/stop-reason fields.

## Design Health Assessment (Mandatory)

- Change posture (`Feature`/`Bug Fix`/`Behavior Change`/`Refactor`/`Cleanup`/`Performance`/`Larger Requirement`): `Behavior Change`
- Initial design issue signal (`Yes`/`No`/`Unclear`): `Yes`
- Root cause classification (`Local Implementation Defect`/`Missing Invariant`/`Boundary Or Ownership Issue`/`Duplicated Policy Or Coordination`/`File Placement Or Responsibility Drift`/`Shared Structure Looseness`/`Legacy Or Compatibility Pressure`/`No Design Issue Found`/`Unclear`): `Missing Invariant`
- Refactor posture (`Likely Needed`/`Likely Not Needed`/`Deferred`/`Unclear`): `Likely Needed`
- Evidence basis: Product Manager owns the correct outer boundary, but the accepted-delivery flow does not require an explicit completion evaluation before creating the next slice. That omission can cause an unnecessary next ticket or leave the loop without a truthful terminal state.
- Requirement or scope impact: Add an explicit PM completion decision, completion evidence/stop reason in the plan, and a terminal branch that does not wait for routine human verification or create another feature after the goal is complete.

## Recommendations

- Preserve the current Product Manager authoritative boundary and one-brief-at-a-time engineering intake.
- Treat `Stopped` with stop reason `Product Goal Complete` as the terminal product-loop state; keep `Active`, `Paused`, and `Blocked` for non-terminal or interrupted states already used by the team contract.
- Require Product Manager to evaluate goal completion after every accepted delivery. Only an incomplete goal produces the next Product Feature Brief.
- Keep Product Manager acceptance evidence-based and autonomous for routine product-loop work. Ask the user only for an explicit product decision, manual verification request, or external side-effect approval.
- Do not add a duplicate Product Manager agent or a runtime loop implementation in this repository.

## Scope Classification (`Small`/`Medium`/`Large`)

`Medium` — a cross-file workflow-contract update, but confined to markdown skill/team guidance and templates with no production code or external service changes.

## In-Scope Use Cases

- `UC-001 Initial PM loop`: Product Manager creates/updates the plan and routes exactly one initial brief through Engineering Intake.
- `UC-002 Accepted incomplete slice`: Product Manager accepts truthful delivery evidence, records the slice, selects one next slice, and routes one next brief without human verification.
- `UC-003 Accepted final slice`: Product Manager accepts truthful delivery evidence, determines the product goal is complete, records completion evidence and `Product Goal Complete`, sets the outer loop to `Stopped`, and does not route another brief.
- `UC-004 Rework or blocker`: Product Manager records `Needs Rework` or `Blocked` and routes the finding through Engineering Intake or records a genuine user/product decision blocker.
- `UC-005 One-off preservation`: Normal one-off engineering still uses explicit user verification and does not enter the autonomous product loop unless product iteration is explicitly active.
- `UC-006 External-approval exception`: Product Manager may block when an irreversible external side effect or explicitly requested manual verification requires a user decision.

## Out of Scope

- Implementing a server-side scheduler, queue, loop runner, ranking engine, or database-backed roadmap.
- Automatically approving deployments, purchases, production pushes, or other irreversible external effects.
- Removing the existing engineering requirements, design, implementation, validation, review, documentation, release, or cleanup gates.
- Testing live team messaging with side-effecting messages.
- Updating the separate `autobyteus-skills` repository; this task's source of truth is the current repository.

## Functional Requirements

- `REQ-001` **PM-owned active loop**: Product Iteration Team remains PM-coordinated and active by default; Product Manager owns plan, cursor, acceptance, completion decision, and next-feature selection.
- `REQ-002` **Autonomous routine acceptance**: In active product iteration, Delivery Engineer sends truthful delivery evidence to Product Manager and Product Manager acceptance replaces routine human verification for each feature.
- `REQ-003` **Incomplete-goal continuation**: After an accepted delivery, Product Manager must update the plan, keep the outer loop `Active`, select exactly one next slice, create exactly one next brief, and route it through Engineering Intake when the product goal is not complete.
- `REQ-004` **Completion terminal branch**: After an accepted delivery, Product Manager must evaluate whether the stated product goal/requirement is complete. If complete, Product Manager must record completion evidence and stop reason `Product Goal Complete`, set the outer loop to `Stopped`, and not create or route a next brief.
- `REQ-005` **Plan completion state**: Product Iteration Plan must record product-goal completion status, completion evidence/reference, stop reason, and next-iteration status in addition to existing backlog/cursor/history fields.
- `REQ-006` **Negative decisions**: `Needs Rework` and `Blocked` remain explicit Product Manager decisions with a Product Acceptance Finding routed through Engineering Intake or a documented user/product decision; they must not silently continue or self-implement.
- `REQ-007` **Gate preservation**: Product Manager must not bypass requirements/design/implementation/validation/review/docs/delivery gates and must not ask Delivery Engineer to choose the next feature.
- `REQ-008` **Exception boundary**: Routine product-loop work is autonomous, but explicit user input remains allowed only for a real product decision, irreversible external side effect, or explicitly requested manual verification.
- `REQ-009` **Consistent contract**: Product Iteration Team, Software Engineering Team product-loop guidance, Product Manager skill/agent prompt, and delivery/plan templates must express the same acceptance, continuation, completion, and exception semantics.

## Cross-Surface Product Iteration State Contract

These exact field names and values are shared by the Product Iteration Plan, Product Manager output, Delivery Engineer packet/report, team guidance, and targeted validation assertions:

| Field | Allowed values / shape | Incomplete accepted delivery | Complete accepted delivery | `Needs Rework` / `Blocked` delivery | Inactive one-off run |
| --- | --- | --- | --- | --- | --- |
| `Product Goal Completion Status` | `Incomplete` / `Complete` | `Incomplete` | `Complete` | `Incomplete` | `N/A` when no product-loop plan exists |
| `Product Goal Completion Evidence / Reference` | Required path/summary only when complete; otherwise `N/A` | `N/A` | Required and non-empty | `N/A` | `N/A` |
| `Product Goal Stop Reason` | `N/A` / `Product Goal Complete` / `Needs Rework` / `Blocked` / `Paused By Product Manager` / `Stopped By Product Manager` | `N/A` | Exactly `Product Goal Complete` | Exactly `Needs Rework` or `Blocked` | `N/A` |
| `Product Iteration Loop Status` | `Active` / `Paused` / `Blocked` / `Stopped` (or `Inactive` where the surface already has a mode field) | `Active` | `Stopped` | `Paused` for `Needs Rework`; `Blocked` for `Blocked` | `Inactive` / `N/A` |
| `Next Iteration Status` | `Proposal Sent` / `Pending` / `Blocked` / `Product Goal Complete` / `N/A` | Exactly the truthful route result: `Proposal Sent`, `Pending`, or `Blocked` | Exactly `Product Goal Complete` | `N/A` | `N/A` |

State invariants:

- `Accepted + Incomplete` requires exactly one next selected slice, exactly one next Product Feature Brief, and `Next Iteration Status` equal to the truthful route result. It must not wait for routine human verification.
- `Accepted + Complete` requires non-empty completion evidence/reference, `Stopped`, `Product Goal Complete`, and no next selected slice, next brief, or routine user-verification request.
- `Needs Rework` requires no silent continuation, no next brief, a Product Acceptance Finding, and `Paused`/`Needs Rework` state until the finding is resolved or a user/product decision is obtained.
- `Blocked` requires no silent continuation, no next brief, a Product Acceptance Finding or documented user/product decision, and `Blocked`/`Blocked` state until the blocker is resolved.
- Delivery `Acceptance Callback Status` remains transport-only (`Not Required` / `Not Started` / `Sent` / `Pending` / `Blocked`) and is never the Product Manager acceptance or completion decision.
- One-off runs retain explicit user verification and do not use the active product-loop state contract.

## Acceptance Criteria

- `AC-001`: Product Iteration Team documentation identifies Product Manager as the coordinator and states that routine human verification is not required between accepted product-iteration slices.
- `AC-002`: Product Manager skill has an explicit accepted-delivery decision branch that checks goal completion before producing a next brief and exposes the exact state fields in PM output.
- `AC-003`: For an incomplete goal, the skill requires `Product Goal Completion Status: Incomplete`, `Product Iteration Loop Status: Active`, exactly one next slice/brief, and `Next Iteration Status` equal to the truthful route result.
- `AC-004`: For a complete goal, the skill requires `Product Goal Completion Status: Complete`, non-empty `Product Goal Completion Evidence / Reference`, `Product Iteration Loop Status: Stopped`, `Product Goal Stop Reason: Product Goal Complete`, `Next Iteration Status: Product Goal Complete`, no next slice/brief, and no routine user-verification request.
- `AC-005`: For `Needs Rework` / `Blocked`, the skill and plan preserve no-silent-continuation semantics, use the exact `Needs Rework` / `Blocked` stop reason and `N/A` next-iteration status, and route a Product Acceptance Finding or documented user/product decision.
- `AC-006`: Product Iteration Plan template includes the exact completion status, evidence/reference, stop-reason, loop-status, and next-iteration fields and documents their allowed combinations.
- `AC-007`: Delivery report and team guidance use the same exact state contract, distinguish Product Manager acceptance from callback delivery, and conditionally request a next feature only for an incomplete goal.
- `AC-008`: One-off Software Engineering Team user-verification behavior remains intact; autonomous acceptance is scoped to active product iteration.
- `AC-009`: Product Manager remains the sole owner of product acceptance, plan/cursor, completion, and next-feature selection; Delivery Engineer only supplies evidence.
- `AC-010`: No duplicate Product Manager agent or runtime scheduler is introduced by this change.
- `AC-011`: JSON configs parse, markdown/template edits pass whitespace checks, and targeted static assertions prove every state-contract combination and affected surface.

## Constraints / Dependencies

- Authoritative task worktree: `/Users/bingq/.autobyteus/server-data/temp_workspace/autobyteus-agents-product-iteration-completion-gate` on `codex/product-iteration-completion-gate`.
- Baseline commit: `958ce7742aa5` (`codex/product-manager-loop`), which contains the prior PM-loop contract; the current tracked remote `origin/main` does not contain that prior local integration and must not be used as a replacement baseline.
- Finalization target: current repository's integration/default branch as determined by Delivery Engineer after refreshing tracked remote state.
- Changes are repository-local; no sibling skills repository edits are in scope.
- Use existing Product Manager skill/templates and shared team-local references; do not introduce compatibility wrappers or a second canonical PM.

## Assumptions

- “Requirement complete” means the Product Manager can truthfully conclude from the original product goal, Product Iteration Plan, refined acceptance criteria, and delivery evidence that no further feature slice is required for that goal.
- The outer loop can use existing `Stopped` status with an explicit stop reason rather than adding a new enum that would require broader runtime changes.
- A next brief is only required while the goal remains incomplete; an accepted final slice legitimately has no next brief.

## Risks / Open Questions

- Product Manager completion judgment is an instructed workflow decision, not an automated semantic proof; acceptance evidence and completion rationale must remain durable.
- The runtime may not expose a live message route; the existing truthful `Pending`/`Blocked` fallback remains required for next-brief routing.
- The delivery report's terminal completion fields are documentation contracts, not a runtime state store.

## Requirement-To-Use-Case Coverage

| Requirement ID | UC-001 | UC-002 | UC-003 | UC-004 | UC-005 | UC-006 |
| --- | --- | --- | --- | --- | --- | --- |
| REQ-001 | Yes | Yes | Yes | Yes | Yes | Yes |
| REQ-002 | No | Yes | Yes | No | Yes | Yes |
| REQ-003 | No | Yes | No | No | No | No |
| REQ-004 | No | No | Yes | No | No | No |
| REQ-005 | Yes | Yes | Yes | Yes | No | No |
| REQ-006 | No | No | No | Yes | No | Yes |
| REQ-007 | Yes | Yes | Yes | Yes | Yes | Yes |
| REQ-008 | No | Yes | Yes | Yes | Yes | Yes |
| REQ-009 | Yes | Yes | Yes | Yes | Yes | Yes |

## Acceptance-Criteria-To-Scenario Intent

| Acceptance Criteria ID | Scenario Intent For Downstream Validation |
| --- | --- |
| AC-001 | Static team-doc assertion for PM coordination and no routine human gate. |
| AC-002 | Skill-text assertion for PM coordination, completion evaluation, and exact PM output fields. |
| AC-003 | State-matrix assertion for incomplete accepted delivery and one-brief route. |
| AC-004 | State-matrix assertion for complete accepted delivery, evidence, terminal stop, and no next brief. |
| AC-005 | State-matrix assertion for rework/blocked decisions and finding/user-decision route. |
| AC-006 | Plan-template exact field/value/invariant assertion. |
| AC-007 | Delivery/team exact contract and callback/acceptance separation assertion. |
| AC-008 | One-off preservation assertion. |
| AC-009 | Ownership wording assertion. |
| AC-010 | File inventory assertion that no duplicate PM/runtime scheduler is added. |
| AC-011 | `python3 -m json.tool`, `git diff --check`, and a focused Python contract probe. |

## Approval Status

The user's explicit request is sufficiently concrete to treat these requirements as design-ready: autonomous Product Manager acceptance, one-next-slice continuation, and termination at product-goal completion. Architecture review should focus on preserving the existing engineering gates and keeping the completion branch unambiguous.
