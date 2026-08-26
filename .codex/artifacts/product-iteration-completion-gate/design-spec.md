# Design Spec

## Current-State Read

The Product Iteration Team already enters through `product_manager`, keeps product-loop state in a Product Iteration Plan, routes one Product Feature Brief to `solution_designer`, and receives a Delivery Engineer acceptance packet after normal engineering gates. Product Manager acceptance replaces routine user verification for active product iteration, while callback delivery remains distinct from acceptance.

The current gap is in the bounded PM decision loop: after `Accepted`, the skill always selects and routes another slice. The plan and team docs do not require the PM to evaluate whether the original product goal is already complete, nor do they preserve completion evidence and stop reason. This is a missing invariant in the existing authoritative owner, not a need for a second coordinator or runtime scheduler.

## Intended Change

Keep Product Manager as the single owner of product-loop state and add an explicit decision before next-feature routing:

1. Receive truthful delivery evidence and decide `Accepted`, `Needs Rework`, or `Blocked`.
2. For `Accepted`, update the plan and evaluate the original product goal/requirement against refined acceptance criteria and delivery evidence.
3. If incomplete, keep the loop `Active`, select exactly one next slice, create exactly one Product Feature Brief, and route it through Engineering Intake with truthful status.
4. If complete, record completion evidence/reference and stop reason `Product Goal Complete`, set the outer loop to `Stopped`, and do not create or route another brief.

Routine human verification is not inserted into either branch. User input remains an exception only for explicit product decisions, irreversible external side effects, or explicitly requested manual verification.

## Cross-Surface Product Iteration State Contract

This is the single contract that the Product Iteration Plan, Product Manager output, Delivery Engineer packet/report, Product Iteration Team guidance, Software Engineering Team guidance, and validation assertions must use verbatim. The plan is the durable product-loop record; PM output and delivery packets are projections of the same state, not alternate authorities.

| Exact field name | Allowed values / shape | Accepted + goal incomplete | Accepted + goal complete | `Needs Rework` | `Blocked` | Inactive one-off |
| --- | --- | --- | --- | --- | --- | --- |
| `Product Goal Completion Status` | `Incomplete` / `Complete` | `Incomplete` | `Complete` | `Incomplete` | `Incomplete` | `N/A` when no product-loop plan exists |
| `Product Goal Completion Evidence / Reference` | Required path/summary only when complete; otherwise `N/A` | `N/A` | Required and non-empty | `N/A` | `N/A` | `N/A` |
| `Product Goal Stop Reason` | `N/A` / `Product Goal Complete` / `Needs Rework` / `Blocked` / `Paused By Product Manager` / `Stopped By Product Manager` | `N/A` | Exactly `Product Goal Complete` | Exactly `Needs Rework` | Exactly `Blocked` | `N/A` |
| `Product Iteration Loop Status` | `Active` / `Paused` / `Blocked` / `Stopped`; `Inactive` only on a mode-bearing surface | `Active` | `Stopped` | `Paused` | `Blocked` | `Inactive` / `N/A` |
| `Next Iteration Status` | `Proposal Sent` / `Pending` / `Blocked` / `Product Goal Complete` / `N/A` | Exactly the truthful route result: `Proposal Sent`, `Pending`, or `Blocked` | Exactly `Product Goal Complete` | `N/A` | `N/A` | `N/A` |

Required invariants:

1. `Accepted + Incomplete` requires exactly one next selected slice and exactly one next Product Feature Brief. `Next Iteration Status` is `Proposal Sent` only after `send_message_to(solution_designer)` succeeds, `Pending` when the brief is durably persisted but cannot yet be sent, and `Blocked` when a truthful brief/route cannot be produced. The PM must not wait for routine human verification.
2. `Accepted + Complete` requires non-empty `Product Goal Completion Evidence / Reference`, `Product Iteration Loop Status: Stopped`, `Product Goal Stop Reason: Product Goal Complete`, `Next Iteration Status: Product Goal Complete`, `Next selected slice ID: N/A`, and no next brief or routine user-verification request.
3. `Needs Rework` requires `Product Goal Completion Status: Incomplete`, `Product Goal Completion Evidence / Reference: N/A`, `Product Goal Stop Reason: Needs Rework`, `Product Iteration Loop Status: Paused`, `Next Iteration Status: N/A`, no next brief, and a Product Acceptance Finding routed through Engineering Intake or a documented user/product decision.
4. `Blocked` requires `Product Goal Completion Status: Incomplete`, `Product Goal Completion Evidence / Reference: N/A`, `Product Goal Stop Reason: Blocked`, `Product Iteration Loop Status: Blocked`, `Next Iteration Status: N/A`, no next brief, and a Product Acceptance Finding or documented user/product decision.
5. `Acceptance Callback Status` remains a separate transport field with values `Not Required` / `Not Started` / `Sent` / `Pending` / `Blocked`. It never changes PM acceptance, completion, or next-iteration status. `Product Manager Acceptance Status` remains `N/A` / `Requested` / `Accepted` / `Needs Rework` / `Blocked`.
6. Inactive one-off runs preserve explicit user verification and do not create or interpret the product-loop state fields.

Surface rules:

- PM output must always show the five exact fields above for an active product-loop delivery and must show either one next brief only for `Accepted + Incomplete`, a terminal completion record only for `Accepted + Complete`, or a finding/decision route for `Needs Rework`/`Blocked`.
- The Product Iteration Plan template must show the exact field names, allowed values, and the terminal/incomplete/rework/blocked combinations.
- The Delivery Engineer packet/report must request PM acceptance plus “one next feature only if the goal is incomplete, otherwise a completion decision, or a finding/decision route when not accepted”; it must not imply a next feature after every acceptance.
- Team guidance and validation assertions must repeat the same conditional language and forbid unconditional “next feature if accepted” semantics.

## Task Design Health Assessment (Mandatory)

- Change posture (`Feature`/`Bug Fix`/`Behavior Change`/`Refactor`/`Cleanup`/`Performance`/`Larger Requirement`): `Behavior Change`
- Current design issue found (`Yes`/`No`/`Unclear`): `Yes`
- Root cause classification (`Local Implementation Defect`/`Missing Invariant`/`Boundary Or Ownership Issue`/`Duplicated Policy Or Coordination`/`File Placement Or Responsibility Drift`/`Shared Structure Looseness`/`Legacy Or Compatibility Pressure`/`No Design Issue Found`/`Unclear`): `Missing Invariant`
- Refactor needed now (`Yes`/`No`/`Deferred`/`Unclear`): `Yes`
- Evidence: The current PM owner is correct, but an unconditional next-brief rule cannot represent a completed goal and can create unnecessary work. Plan state also lacks auditable completion data.
- Design response: Strengthen the PM skill as the authoritative decision boundary and extend existing plan/delivery templates. Keep the team topology and engineering spine unchanged.
- Refactor rationale: This is a focused contract refactor inside the existing PM subsystem. No runtime refactor, new service, duplicate agent, or state-store migration is needed.
- Intentional deferrals and residual risk, if any: Product-goal semantic judgment remains with the PM; static docs cannot prove business completeness. Live message delivery remains subject to existing `Sent`/`Pending`/`Blocked` fallback.

## Terminology

- **Product goal complete**: Product Manager's evidence-backed conclusion that the original product goal/requirement and refined acceptance criteria need no further feature slice.
- **Terminal loop state**: `Product Iteration Loop Status: Stopped` with `Product Goal Stop Reason: Product Goal Complete`, non-empty `Product Goal Completion Evidence / Reference`, and `Next Iteration Status: Product Goal Complete`; this is different from a per-ticket `Accepted` state.
- **Incomplete loop**: `Product Goal Completion Status: Incomplete`, PM acceptance is complete for the ticket, the product goal still needs one or more slices, outer loop is `Active`, and exactly one next brief is routed with a truthful `Next Iteration Status`.
- **Acceptance callback**: Delivery packet transport status only; never a substitute for Product Manager acceptance.

## Design Reading Order

1. PM acceptance/completion decision is the governing bounded local loop.
2. Product Iteration Team and Software Engineering Team docs expose the boundary.
3. Plan/delivery templates persist the state and evidence.
4. README/agent prompt mirror the contract without adding policy.

## Legacy Removal Policy (Mandatory)

- Policy: `No backward compatibility; remove legacy code paths.`
- Obsolete path: unconditional “accepted means always create another brief” behavior.
- Removal: replace it with completion evaluation followed by either next-brief routing or terminal stop.
- No compatibility wrapper or dual wording is retained. One-off user verification is a separate mode, not legacy behavior in this scope.

## Data-Flow Spine Inventory

| Spine ID | Scope (`Primary End-to-End`/`Return-Event`/`Bounded Local`) | Start | End | Governing Owner | Why It Matters |
| --- | --- | --- | --- | --- | --- |
| DS-001 | `Primary End-to-End` | Product Iteration Team entry | Delivered feature evidence | Product Manager | Shows the full product-to-engineering path that must continue without routine user verification. |
| DS-002 | `Return-Event` | Delivery acceptance packet | PM acceptance/completion decision | Product Manager | Defines the callback/acceptance boundary and the next action. |
| DS-003 | `Bounded Local` | PM accepted-delivery decision | Next brief or terminal stop | Product Manager | The missing completion check materially controls whether the loop continues. |

## Primary Execution Spine(s)

`Product Iteration Team -> Product Manager -> Product Iteration Plan -> Product Feature Brief -> solution_designer / Engineering Intake -> normal engineering gates -> Delivery Engineer evidence`

## Spine Narratives (Mandatory)

| Spine ID | Short Narrative | Main Domain Subject Nodes | Governing Owner | Key Off-Spine Concerns |
| --- | --- | --- | --- | --- |
| DS-001 | A PM-first run creates a plan and one bounded brief, then the brief traverses the normal engineering gates until truthful delivery evidence exists. | Product Iteration Team, Product Manager, Plan, Feature Brief, Engineering Intake, Delivery Engineer | Product Manager for product decisions; engineering roles for their gates | Artifact persistence, routing status, delivery/release evidence |
| DS-002 | Delivery Engineer sends evidence; Product Manager, not callback transport, decides acceptance and completion. | Delivery Engineer, acceptance packet, Product Manager | Product Manager | Callback status and PM acceptance status |
| DS-003 | PM updates history, evaluates completion, and either routes one next brief or records `Product Goal Complete` and stops. | Product Manager, Plan, next brief/terminal state | Product Manager | Completion evidence, stop reason, user-exception record |

## Spine Actors / Main-Line Nodes

- `Product Iteration Team`: PM-first entry boundary.
- `Product Manager`: authoritative product-loop owner.
- `Product Iteration Plan`: durable cursor, backlog, history, and completion state.
- `Product Feature Brief`: one bounded product request at a time.
- `solution_designer / Engineering Intake`: requirements/design entry; no bypass.
- `Engineering delivery gates`: implementation, validation, review, docs, delivery, and applicable finalization.
- `Delivery Engineer`: evidence and acceptance-packet producer, not product decider.

## Ownership Map

| Node | Owns |
| --- | --- |
| Product Iteration Team | Entry mode and team-level gate contract. |
| Product Manager | Product goal, priority, plan, cursor, product acceptance, completion judgment, exact state-contract fields, outer loop state, and next feature. |
| Product Iteration Plan | Durable product-loop state, exact completion/continuation fields, and evidence references; it does not replace engineering requirements. |
| Product Feature Brief | One selected slice's product context; it does not authorize implementation. |
| solution_designer / Engineering Intake | Requirements refinement and engineering design entry. |
| Delivery Engineer | Integrated delivery evidence, docs/finalization state, and packet transport. |

## Thin Entry Facades / Public Wrappers (If Applicable)

| Facade / Entry Wrapper | Governing Owner Behind It | Why It Exists | Must Not Secretly Own |
| --- | --- | --- | --- |
| Product Iteration Team config/team.md | Product Manager | Declares PM-first team entry | Acceptance, completion, or next-feature policy independent of PM skill |
| Product Feature Brief | Product Manager / Engineering Intake | Carries bounded product context across the boundary | Requirements, design, implementation permission, or delivery acceptance |

## Removal / Decommission Plan (Mandatory)

| Item To Remove / Decommission | Why It Becomes Unnecessary | Replaced By Which Owner / File / Structure | Scope (`In This Change`/`Follow-up`) | Notes |
| --- | --- | --- | --- | --- |
| Unconditional accepted-to-next-brief rule | It cannot terminate a completed product goal truthfully. | PM accepted-delivery completion branch in `SKILL.md`. | `In This Change` | Clean-cut replacement; no compatibility path. |
| Implicit `Stopped` meaning | It is ambiguous without a reason/evidence. | Plan completion fields and explicit `Product Goal Complete` stop reason. | `In This Change` | `Stopped` remains the existing outer status enum. |

## Return Or Event Spine(s) (If Applicable)

`Delivery Engineer -> acceptance packet -> Product Manager -> Accepted + incomplete => next brief / Accepted + complete => terminal plan update`

`Needs Rework / Blocked -> Product Acceptance Finding -> solution_designer / user-product decision`

## Bounded Local / Internal Spines (If Applicable)

Parent owner: `Product Manager`

`Read delivery evidence -> Decide acceptance -> Update plan/history -> Evaluate goal completion -> (route one brief | record completion and stop)`

This is the explicit local decision loop. It prevents both premature stopping and unnecessary next-ticket generation.

## Off-Spine Concerns Around The Spine

| Off-Spine Concern | Related Spine ID(s) | Serves Which Owner | Responsibility | Why It Exists | Risk If Misplaced On Main Line |
| --- | --- | --- | --- | --- | --- |
| Artifact persistence | DS-001, DS-002, DS-003 | Product Manager | Keep plans, briefs, packets, and completion evidence durable | Enables recovery/audit | Would turn PM decision policy into storage mechanics |
| Routing status | DS-002, DS-003 | Product Manager | Record `Sent`/`Pending`/`Blocked` truthfully | Messaging may be unavailable | Could be mistaken for acceptance or completion |
| External/user exception record | DS-002, DS-003 | Product Manager / delivery | Explain real external approval/manual verification blockers | Preserves safety | Could reintroduce a routine human gate |

## Existing Capability / Subsystem Reuse Check

| Need / Concern | Existing Capability Area / Subsystem | Decision (`Reuse`/`Extend`/`Create New`) | Why | If New, Why Existing Areas Are Not Right |
| --- | --- | --- | --- | --- |
| Completion decision | Product Manager skill | `Extend` | PM already owns acceptance and cursor. | N/A |
| Durable completion state | Product Iteration Plan template | `Extend` | Existing plan is the authoritative product-loop record. | N/A |
| Delivery terminal status | Delivery release/deployment report template | `Extend` | Existing packet/report already exposes PM acceptance and next iteration. | N/A |

## Subsystem / Capability-Area Allocation

| Subsystem / Capability Area | Owns Which Concerns | Related Spine ID(s) | Governing Owner(s) Served | Decision (`Reuse`/`Extend`/`Create New`) | Notes |
| --- | --- | --- | --- | --- | --- |
| Product Iteration Team contract | Entry mode and gate language | DS-001 | Product Manager | `Extend` | No new team member or coordinator. |
| Product Manager product-loop skill | Acceptance, completion, cursor, next-feature policy | DS-002, DS-003 | Product Manager | `Extend` | Single authoritative policy owner. |
| Product-loop artifact templates | Plan and delivery state/evidence | DS-001 through DS-003 | Product Manager / Delivery Engineer | `Extend` | Keep templates descriptive, not executable. |

## Draft File Responsibility Mapping

| Candidate File | Owning Subsystem / Capability Area | Owner / Boundary | Concrete Concern | Why This Is One File | Reuses Shared Structure? |
| --- | --- | --- | --- | --- | --- |
| `.../product-manager/SKILL.md` | PM product-loop skill | Product Manager | Accepted-delivery branching and completion policy | Existing policy file already owns all PM workflow decisions | Product Iteration Plan/brief terms |
| `.../product-iteration-plan-template.md` | PM artifact templates | Product Manager | Completion status/evidence/stop reason fields | One durable plan shape | Existing plan fields |
| `.../release-deployment-report-template.md` | Delivery artifacts | Delivery Engineer | Terminal next-iteration status | Existing delivery report owns handoff state | PM status names |
| `software-product-iteration-team/team.md` | Team contract | Product Manager coordinator | No-human routine gate and terminal semantics | Team-level contract belongs here | PM skill terms |

## Reusable Owned Structures Check

| Repeated Structure / Logic | Candidate Shared File | Owning Subsystem | Why Shared | Redundant Attributes Removed? (`Yes`/`No`) | Overlapping Representations Removed? (`Yes`/`No`) | Must Not Become |
| --- | --- | --- | --- | --- | --- | --- |
| Product goal completion state | Existing Product Iteration Plan template | Product Manager | Plan is the one product-loop state shape | `Yes` | `Yes` | A duplicate runtime state model |

## Shared Structure / Data Model Tightness Check

| Shared Structure / Type / Schema | One Clear Meaning Per Field? (`Yes`/`No`) | Redundant Attributes Removed? (`Yes`/`No`) | Parallel / Overlapping Representation Risk (`Low`/`Medium`/`High`) | Corrective Action |
| --- | --- | --- | --- | --- |
| Product Iteration Plan metadata | `Yes` | `Yes` | `Low` | Use completion status, evidence, and stop reason for distinct meanings; do not add a second “done” flag. |

## Final File Responsibility Mapping

| File | Owning Subsystem / Capability Area | Owner / Boundary | Concrete Concern | Why This Is One File | Reuses Shared Structure? |
| --- | --- | --- | --- | --- | --- |
| `agent-teams/software-product-iteration-team/team.md` | Product Iteration Team contract | Product Manager | PM-first entry, routine no-human gate, continuation/terminal semantics | Team contract is the public team surface | PM status vocabulary |
| `agent-teams/software-engineering-team/agents/product-manager/agent.md` | PM agent prompt | Product Manager | Thin pointer to completion-aware skill | Keeps prompt thin | PM skill |
| `agent-teams/software-engineering-team/agents/product-manager/skills/product-manager/SKILL.md` | PM skill | Product Manager | Full acceptance, completion, next-brief, negative-decision behavior | Governing policy owner | Plan/brief/finding templates |
| `agent-teams/software-engineering-team/agents/product-manager/skills/product-manager/templates/product-iteration-plan-template.md` | PM artifact | Product Manager | Durable loop state and completion evidence | Plan is one state artifact | Existing backlog/history |
| `agent-teams/software-engineering-team/agents/delivery-engineer/skills/delivery-engineer/templates/release-deployment-report-template.md` | Delivery artifact | Delivery Engineer | PM acceptance and terminal next-iteration state | Report owns delivery evidence | PM statuses |
| `agent-teams/software-engineering-team/team.md` | Shared engineering team contract | solution_designer / Product Manager boundary | One-off vs product-loop verification and completion | Shared boundary needs one consistent statement | PM terms |
| `README.md` | Repository overview | Repository maintainers | Concise public behavior statement | Existing overview is the right surface | PM terms |

## Ownership Boundaries

Product Manager owns the product goal and decides whether the goal is complete. Delivery Engineer owns integrated delivery evidence and sends the packet; it cannot mark the goal complete. `solution_designer` owns engineering intake and receives at most one concrete brief. The plan records PM state but does not become a requirements/design document.

## Boundary Encapsulation Map

| Authoritative Boundary | Internal Owned Mechanism(s) It Encapsulates | Upstream Callers That Must Use The Boundary | Forbidden Bypass Shape | If Boundary API Is Too Thin, Fix By |
| --- | --- | --- | --- | --- |
| Product Manager skill | Plan update, acceptance evaluation, completion evaluation, next-brief routing | Team coordinator and delivery callback | Delivery Engineer choosing next slice; team doc inventing a second completion policy | Strengthen PM skill and template fields |
| Engineering Intake / solution_designer | Requirements and design refinement | Product Manager briefs | PM routing directly to implementation | Keep one-brief route through Intake |

## Dependency Rules

- Delivery Engineer -> Product Manager with evidence/packet; never direct product acceptance.
- Product Manager -> `solution_designer` with exactly one Product Feature Brief when incomplete.
- Product Manager -> terminal plan state when complete; no next-feature route.
- Product Manager -> Product Acceptance Finding -> `solution_designer` or user/product decision when not accepted.
- Team docs and templates describe the PM skill; they do not create alternate coordinators.
- One-off verification remains owned by the user in the inactive/non-product loop.

Forbidden shortcuts: Delivery Engineer self-accepting, PM routing directly to implementation, routine user verification in active product iteration, or callback `Sent` being treated as PM acceptance/completion.

## Interface Boundary Mapping

| Interface / API / Query / Command / Method | Subject Owned | Responsibility | Accepted Identity Shape(s) | Notes |
| --- | --- | --- | --- | --- |
| Product Feature Brief route | One selected product slice | Start Engineering Intake | selected slice ID + plan reference | Exactly one brief per route. |
| Product Manager acceptance packet | One delivered ticket/slice | Product evidence input | ticket/slice + artifact paths | Callback status is transport metadata. |
| Product Iteration Plan | One product goal/loop | Durable cursor/history/completion | product goal + slice IDs | Not an engineering requirements doc. |

## Interface Boundary Check

| Interface | Responsibility Is Singular? (`Yes`/`No`) | Identity Shape Is Explicit? (`Yes`/`No`) | Ambiguous Selector Risk (`Low`/`Medium`/`High`) | Corrective Action |
| --- | --- | --- | --- | --- |
| Product Feature Brief route | `Yes` | `Yes` | `Low` | Keep selected slice and plan reference required. |
| PM acceptance packet | `Yes` | `Yes` | `Low` | Keep callback/acceptance separate. |
| Product Iteration Plan | `Yes` | `Yes` | `Low` | Add completion evidence/stop reason without a duplicate done field. |

## Main Domain Subject Naming Check

| Node / Subject | Current / Proposed Name | Name Is Natural And Self-Descriptive? (`Yes`/`No`) | Naming Drift Risk | Corrective Action |
| --- | --- | --- | --- | --- |
| Product Manager | Product Manager | `Yes` | Low | Preserve. |
| Product Iteration Plan | Product Iteration Plan | `Yes` | Low | Preserve. |
| Product Goal Complete | Product Goal Complete | `Yes` | Low | Use only as `Product Goal Stop Reason` and `Next Iteration Status` in the complete terminal combination. |

## Applied Patterns (If Any)

- **State machine (bounded local)**: PM accepted-delivery decision transitions to the exact `Accepted + Incomplete` combination (`Incomplete` + `Active` + one next brief + truthful `Proposal Sent`/`Pending`/`Blocked`), the exact `Accepted + Complete` combination (`Complete` + evidence + `Stopped` + `Product Goal Complete` + terminal next status), or the exact `Needs Rework`/`Blocked` combinations. The state machine is described in the PM skill, plan template, team guidance, and delivery report; no runtime object is added.

## Target Subsystem / Folder / File Mapping

| Path | Kind (`Folder`/`Module`/`File`) | Owner / Boundary | Responsibility | Why It Belongs Here | Must Not Contain |
| --- | --- | --- | --- | --- | --- |
| `agent-teams/software-product-iteration-team/team.md` | `File` | Product Iteration Team | Public team-loop contract | Existing team entry surface | PM implementation logic |
| `agent-teams/software-engineering-team/agents/product-manager/skills/product-manager/SKILL.md` | `File` | Product Manager | Governing completion/continuation policy | Existing authoritative PM skill | Runtime scheduler |
| `agent-teams/software-engineering-team/agents/product-manager/skills/product-manager/templates/product-iteration-plan-template.md` | `File` | Product Manager | Plan state/evidence fields | Existing plan artifact | Requirements/design details |
| `agent-teams/software-engineering-team/agents/delivery-engineer/skills/delivery-engineer/templates/release-deployment-report-template.md` | `File` | Delivery Engineer | Delivery-to-PM terminal status | Existing delivery artifact | Product priority policy |
| `agent-teams/software-engineering-team/team.md` | `File` | Shared team boundary | One-off/product-loop verification contract | Existing team contract | Duplicate PM plan |
| `README.md` | `File` | Repository overview | Public summary | Existing docs entrypoint | Operational state |

No new folder, module, agent, runtime, or repository is needed.

## Folder Boundary Check

| Path / Folder | Intended Structural Depth (`Transport`/`Main-Line Domain-Control`/`Persistence-Provider`/`Off-Spine Concern`/`Mixed Justified`) | Ownership Boundary Is Clear? (`Yes`/`No`) | Mixed-Layer Or Over-Split Risk (`Low`/`Medium`/`High`) | Justification / Corrective Action |
| --- | --- | --- | --- | --- |
| `agent-teams/software-product-iteration-team` | `Main-Line Domain-Control` | `Yes` | `Low` | Team contract only. |
| `.../product-manager/skills/product-manager` | `Main-Line Domain-Control` + artifact templates | `Yes` | `Low` | Existing PM subsystem separates skill and templates. |

## Concrete Examples / Shape Guidance (Mandatory When Needed)

| Topic | Good Example | Bad / Avoided Shape | Why The Example Matters |
| --- | --- | --- | --- |
| Incomplete goal | `PM Accepted -> Goal Incomplete -> Plan Active -> Brief PM-002 -> solution_designer` | `PM Accepted -> Delivery Engineer invents PM-002` | Keeps product selection inside PM. |
| Complete goal | `PM Accepted -> Completion Status Complete + evidence -> Loop Stopped + Stop Reason Product Goal Complete + Next Iteration Status Product Goal Complete -> no next slice/brief` | `PM Accepted -> always create PM-002` | Makes the requested terminal behavior and exact field values explicit. |
| Rework / blocked | `PM Needs Rework/Blocked -> Completion Status Incomplete + matching Stop Reason + Next Iteration Status N/A -> finding/decision route, no next brief` | `PM Needs Rework -> silently route PM-002` | Prevents negative product decisions from becoming silent continuation. |
| Human gate | `External deployment approval required -> PM Blocked -> request user decision` | `Every accepted slice -> wait for user done message` | Removes routine delay without unsafe auto-approval. |

## Backward-Compatibility Rejection Log (Mandatory)

| Candidate Compatibility Mechanism | Why It Was Considered | Rejection Decision (`Rejected`/`N/A`) | Clean-Cut Replacement / Removal Plan |
| --- | --- | --- | --- |
| Keep unconditional next-brief behavior as fallback | Could preserve old “always continue” wording | `Rejected` | Replace with explicit completion branch. |
| Add a second PM completion flag beside loop status | Could avoid changing template status semantics | `Rejected` | Use existing `Stopped` plus completion status/evidence/stop reason with singular meanings. |
| Add a duplicate team-local PM agent | Could specialize the Product Iteration Team | `Rejected` | Reuse canonical shared PM agent/skill owned by Software Engineering Team. |

## Derived Layering (If Useful)

Not used as a primary design axis. The relevant layers are already expressed by the PM boundary, engineering intake, and delivery evidence spine.

## Migration / Refactor Sequence

1. Update requirements and design artifacts in the dedicated task worktree with the exact cross-surface state matrix and AR-001 resolution.
2. Re-review the design; implementation remains locked until architecture review passes.
3. Extend the PM skill's accepted-delivery procedure and output shape with the matrix before next-brief routing.
4. Extend the Product Iteration Plan and Delivery report templates with the exact fields, values, and conditional wording.
5. Align Product Iteration Team, Software Engineering Team, PM agent, and README wording; remove any unconditional “next feature if accepted” implication.
6. Validate JSON, whitespace, targeted state-matrix assertions for every surface, and absence of duplicate PM/runtime files.
7. Hand the cumulative package through normal implementation, code review, executable coverage, and delivery gates.

## Validation Plan

- Parse `agent-teams/software-product-iteration-team/team-config.json`, `agent-teams/software-engineering-team/team-config.json`, and Product Manager agent config with `python3 -m json.tool`.
- Assert PM skill contains both the incomplete-goal continuation branch and complete-goal terminal branch, with completion evaluated before next brief.
- Assert every affected surface contains the exact fields `Product Goal Completion Status`, `Product Goal Completion Evidence / Reference`, `Product Goal Stop Reason`, `Product Iteration Loop Status`, and `Next Iteration Status` where applicable.
- Assert the incomplete/complete/rework/blocked combinations and forbidden unconditional-next-feature wording.
- Assert team and delivery docs contain no routine-human gate for active product iteration and preserve one-off verification.
- Assert `git diff --check` passes.
- Use a focused inline Python contract probe; no live team messages and no new durable test harness are needed for docs-only scope.

## Open Risks / Review Questions

- Is `Stopped` with an explicit reason clear enough for maintainers, or does the reviewer identify an existing status contract that requires a different terminal representation?
- Does any downstream delivery template still imply that every accepted delivery needs a next brief?
- Is one-off user verification still visibly preserved after wording changes?
- Do PM output and delivery packet fields use the exact matrix without `Accepted` implying a next brief when the goal is complete?

## Handoff Notes

Architecture Review Round 1 failed with AR-001 Design Impact because the cross-surface state contract was not exact enough. Requirements and design are now revised with one matrix and explicit invariants for accepted/incomplete, accepted/complete, rework, blocked, and one-off states. Re-review must pass before implementation proceeds. The implementation should modify only the current repository and should not touch the separate skills worktree.
