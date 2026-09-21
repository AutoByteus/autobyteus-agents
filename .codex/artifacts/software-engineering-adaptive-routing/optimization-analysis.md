# Software Engineering Adaptive Routing Optimization Analysis

Review Status: Implemented and consistency-reviewed

## Requested Outcome And Scope

Introduce a simple, outcome-based routing gate for the Software Engineering Team:

- Architecture Designer completes the architecture design, then classifies the
  work with only `task_size` and `architectural_risk`.
- Implementation Engineer carries that classification through implementation,
  records any evidence-based change, and uses the same result-based routing
  protocol.
- Small/medium low-risk work may bypass Architecture Reviewer and Code Reviewer.
- Large or high-risk work continues through both independent review gates.
- Every specialist remains responsible for its own work and calls
  `get_handoff_rules` after producing its result.

Scope is the Software Engineering Team package under
`agent-teams/software-engineering-team/`. Existing unrelated working-tree
changes are outside this review and must remain untouched.

## Current Behavior And File Ownership Baseline

- `team.md` describes one unconditional flow:
  Architecture Designer -> Architecture Reviewer -> Implementation Engineer ->
  Code Reviewer -> API/E2E -> Delivery.
- `team-config.json` has unconditional Architecture Designer -> Architecture
  Reviewer and Implementation Engineer -> Code Reviewer rules.
- Architecture Designer's skill always classifies its completed design as
  `Architecture Review Ready` and creates the initial review revision before
  handoff.
- Implementation Engineer's skill always sends the implementation package to
  Code Reviewer and explicitly forbids direct routing to API/E2E.
- API/E2E always returns a successful validation result to Code Reviewer for
  proportional test-code review before Delivery.
- Only Architecture Designer currently has `get_handoff_rules` in its
  `agent-config.json`, although the repository-wide team practice says every
  specialist should use result-based routing.
- The design-spec and implementation-handoff templates do not carry a shared
  task-size/architectural-risk contract.

## Preserved Behavioral Invariants And Authority Boundaries

- Architecture Designer remains responsible for technical design and initial
  classification, not requirements ownership or implementation.
- Architecture Reviewer remains an independent gate for large or high-risk
  work; it is not removed from the team.
- Code Reviewer remains the independent source-review and failure-origin owner
  when the selected route requires it.
- API/E2E remains responsible for executable validation and coverage evidence.
- Delivery remains responsible for user verification, repository finalization,
  and terminal completion.
- `get_handoff_rules` remains the routing authority; skills explain how to
  classify and invoke the tool, while `team-config.json` supplies recipients
  and conditions.
- Direct low-risk routing does not allow an agent to silently downgrade newly
  discovered architectural impact. Such evidence must be recorded and routed
  back to Architecture Designer.
- Existing artifact-chain, absolute-path, user-approval, recovery, and
  no-polling rules remain in force.

## Macro Analysis

### Package structure and ownership

The current package has the correct specialist ownership but an inconsistent
routing contract. Team-level documentation, team configuration, agent skills,
agent tool lists, and handoff templates must agree on the same conditional
workflow. The classification contract belongs in the Architecture Designer's
design output and Implementation Engineer's handoff; recipient selection belongs
in `team-config.json`.

### Content architecture and flow

The main flow is written as a mandatory linear pipeline, which contradicts the
requested adaptive route. The flow should first describe the common stages,
then identify the two routing gates and the recovery exceptions. Architecture
Reviewer and Code Reviewer should be documented as conditional gates rather than
as universally required stages.

### Behavioral grounding

The two fields are intentionally limited to:

- `task_size`: `Small`, `Medium`, or `Large`;
- `architectural_risk`: `Low` or `High`.

`Large` and `High` are independent review overrides. `Small` or `Medium` with
`Low` risk follows the direct route. File count may support the size decision,
but the skills must not make it a hard threshold. High risk includes material
contract, persistence, security, concurrency, deployment, boundary, or
uncertainty impact.

### Handoff and tool consistency

All six Software Engineering specialists need the `get_handoff_rules` tool so
that each can complete its own work, classify the outcome, retrieve current
rules, and send the exact returned recipient. The existing pass notifications
and recovery routes remain, but their skills must distinguish primary forward
routing from informational notifications and failure-origin recovery.

### Outputs and validation

Design Spec must record the classification, rationale, selected route, and
escalation trigger. Implementation Handoff must carry the inherited values and
state whether implementation confirmed or changed them. API/E2E must record the
selected review route when direct success bypasses Code Reviewer. No new review
artifact is needed.

## Findings

| ID | Severity | Evidence | Impact |
| --- | --- | --- | --- |
| M1 | High | Current team flow and handoffs are unconditional. | Small/medium routine work cannot use the intended direct route. |
| M2 | High | Implementation skill forbids direct API/E2E routing. | The requested implementation-to-validation path is impossible. |
| M3 | High | API/E2E always returns successful results to Code Reviewer. | A direct route would stop at API/E2E or accidentally reintroduce review. |
| M4 | High | Only Architecture Designer has `get_handoff_rules`. | The universal result-based agent-team practice is not executable for the other specialists. |
| M5 | Medium | Design and implementation templates omit the classification contract. | Handoff rules cannot reliably evaluate the completed result. |
| M6 | Medium | Several skills describe review stages as mandatory without stating the route condition. | Cross-file content becomes inconsistent after conditional routing is added. |

## Proposed Improvements

| Action | File / Boundary | Change |
| --- | --- | --- |
| Update | `team-config.json` | Add explicit conditional rules for Architecture Designer and Implementation Engineer; add direct API/E2E -> Delivery success routing for small/medium low-risk work; preserve reviewer and recovery routes. |
| Update | `team.md` | Replace the unconditional flow with common stages, the two routing gates, and explicit recovery behavior. |
| Update | Architecture Designer skill and design template | Require classification after design, record rationale and route, and call `get_handoff_rules`. |
| Update | Implementation Engineer skill and handoff template | Carry classification forward, record implementation confirmation/change, perform lightweight self-check on the direct route, and call `get_handoff_rules`. |
| Update | Architecture Reviewer and Code Reviewer skills | State that they are conditional gates and preserve independent review/recovery responsibilities. |
| Update | API/E2E skill | Accept either reviewed or direct implementation input, record direct-route success, and use result-based routing for Delivery or Code Reviewer. |
| Update | All six agent configs | Add `get_handoff_rules` to the tool list. |
| Keep | Delivery workflow | Keep terminal verification, finalization, and return to Architecture Designer unchanged except for universal routing wording. |

## Routing Contract

Architecture Designer result:

- `task_size = Small or Medium` and `architectural_risk = Low` ->
  Implementation Engineer;
- `task_size = Large` or `architectural_risk = High` -> Architecture Reviewer.

Implementation Engineer result:

- `task_size = Small or Medium` and `architectural_risk = Low` -> API/E2E;
- `task_size = Large` or `architectural_risk = High` -> Code Reviewer.

API/E2E result:

- successful direct-route validation for Small/Medium + Low -> Delivery;
- successful reviewed-route validation -> Code Reviewer for proportional test
  review;
- failure-origin or classified recovery -> existing accountable specialist
  routes, even when the normal success route was direct.

## Assumptions And Risks

- The runtime's `get_handoff_rules` returns natural-language conditional rules
  that the agent evaluates against the result package; exact labels must
  therefore be present in the handoff artifact and message.
- `Low` risk is a bounded classification, not proof that the change is trivial.
  Implementation or validation may escalate it when evidence changes.
- A direct route still requires implementation-scoped checks and executable
  API/E2E validation; it only omits the independent review gates selected for
  larger or higher-risk work.
- Failure-origin review remains available as a recovery route and is not the
  normal source-review gate for a direct successful path.

## Validation Plan

1. Validate JSON syntax and the complete team roster/tool contract.
2. Search every team file for contradictory unconditional routes or stale
   "must pass first" wording.
3. Verify every handoff recipient exists and every direct route has a terminal
   continuation.
4. Read the changed skills in execution order and perform macro and micro
   consistency passes.
5. Run `git diff --check` and inspect the focused diff without modifying
   unrelated working-tree changes.

Target skill files changed during analysis: None

Analysis artifact: `.codex/artifacts/software-engineering-adaptive-routing/optimization-analysis.md`

## Implementation And Final Review

Implemented the approved plan across the Software Engineering Team package.
The authoritative changes include:

- conditional `team-config.json` rules for Architecture Designer,
  Implementation Engineer, API/E2E, reviewers, recovery, and Delivery;
- `get_handoff_rules` in every Software Engineering agent configuration;
- task-size and architectural-risk instructions in Architecture Designer and
  Implementation Engineer skills;
- direct-route support in Implementation Engineer, API/E2E, and Delivery;
- selected-gate wording and classification checks in Architecture Reviewer and
  Code Reviewer;
- classification fields in design, implementation, review, and API/E2E
  templates;
- team, agent, and README descriptions aligned with the conditional flow.

The second consistency pass confirmed:

- every configured handoff recipient belongs to the team roster;
- both normal success paths terminate at Delivery;
- large/high work reaches both independent review gates;
- small/medium low-risk work reaches API/E2E directly and can continue to
  Delivery without a code-review gate;
- API/E2E failures still have a focused failure-origin route;
- direct-route packages explicitly mark omitted review artifacts as
  `Not Applicable`;
- implementation or delivery rework re-evaluates the classification rather
  than forcing a stale reviewer route;
- every specialist has the routing tool and every skill instructs the agent to
  call it before handoff;
- no unrelated working-tree changes were edited.

Validation completed:

- JSON parsing passed for `team-config.json` and all Software Engineering
  `agent-config.json` files;
- frontmatter, skill-name, and relative-link checks passed for all six skills;
- team roster, handoff graph, and `get_handoff_rules` coverage checks passed;
- `git diff --check` passed;
- stale mandatory-review and direct-route contradiction scans were reviewed.

Target skill files changed during implementation: Yes — the files listed above.
