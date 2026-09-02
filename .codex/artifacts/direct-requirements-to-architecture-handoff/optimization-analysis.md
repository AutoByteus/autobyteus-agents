# Message-Only Software Development Department Optimization Analysis

Review Status: Implemented and validated

## User-requested outcome and review scope

Simplify the Software Development Department and both referenced child teams to
one inter-member communication model:

1. A specialist completes or classifies its current responsibility.
2. It calls `get_handoff_rules`.
3. It selects every returned condition matching the current result.
4. It calls `send_message_to` with the exact returned `recipient_address` and
   cumulative artifact paths.
5. It ends the stage without polling.

Remove `delegate_task`, `review_task_result`, and `submit_task_result` from this
department workflow. No member inside the Software Development Department,
Requirements Engineering Team, or Software Engineering Team will use a
server-managed delegated-task lifecycle for this workflow.

The key cross-team transition remains:

`/requirements_engineering_team/requirements_engineer` ->
`/software_engineering_team/architecture_designer`

only after explicit user approval and architecture readiness.

This review covers:

- Software Development Department config, team guide, Head agent, and Head skill;
- Requirements Engineering Team config and team guide;
- Requirements Engineer, Product Prototyper, and Prototype Bootstrapper prompts,
  configs, skills, shared prototype principles, and affected bootstrap template;
- Architecture Designer prompt, config, skill result/recovery boundary, and
  Software Engineering Team result wording;
- public README descriptions.

The other five Software Engineering specialist skills already use
`send_message_to`; their existing internal workflow is not being refactored in
this change.

## Current behavior and package/file ownership baseline

### Current mixed communication model

| Transition | Current mechanism |
| --- | --- |
| Head -> Requirements Engineering Team | `delegate_task` |
| Requirements Team -> Head | `submit_task_result` / `review_task_result` |
| Requirements Engineer <-> Product Prototyper | `send_message_to` |
| Product Prototyper -> Prototype Bootstrapper | `delegate_task` |
| Prototype Bootstrapper -> Product Prototyper | `submit_task_result` / `review_task_result` |
| Head -> Software Engineering Team | `delegate_task` |
| Software specialists internally | `send_message_to` |
| Architecture Designer -> Head | `submit_task_result` / `review_task_result` |

### Current authoritative owners

| Concern | Owner |
| --- | --- |
| Allowed conditional message routes | Applicable `team-config.json.handoffs` |
| Shared dynamic handoff protocol | Applicable `team.md` |
| Specialist work, artifacts, outcome classification, and payload | Specialist `SKILL.md` |
| Runtime tools | Specialist `agent-config.json` |
| Department entry and final user response | Head of Software Development |
| Requirements and user approval | Requirements Engineer |
| Architecture and terminal software result | Architecture Designer |

## Preserved behavioral invariants and safety boundaries

- Requirements Engineering Team and Software Engineering Team remain independent
  shared sibling definitions referenced by the department.
- Head remains the department coordinator and initial/final user-facing boundary.
- Requirements Engineer remains the canonical requirements owner.
- Only explicit user approval authorizes the architecture handoff.
- Product prototyping remains conditional.
- Prototype Bootstrapper retains full current-state baseline/parity ownership;
  only its communication lifecycle changes.
- Product Prototyper continues reviewing bootstrap evidence before future-state
  prototype work; `review_task_result` is replaced by direct evidence review,
  not removed as a quality gate.
- Architecture Designer retains complete architecture-design capability and the
  Software Engineering Team coordinator role.
- Architecture Reviewer, Implementation Engineer, Code Reviewer, API/E2E
  Engineer, and Delivery Engineer retain their existing message-based workflow.
- Delivery Engineer remains the verified-finalization authority.
- Architecture Designer cannot return terminal success before checking Delivery
  Engineer's finalized package.
- Requirement gaps return to Requirements Engineer and require renewed user
  approval when intended behavior changes.
- Every message carries the cumulative still-relevant artifact package through
  absolute paths.
- Standalone agents/teams return terminal results to the user or caller when no
  handoff rule applies.
- No AutoByteus product/runtime or other-repository change is in scope.

## Target message-only flow

```text
/head_of_software_development
  -> /requirements_engineering_team/requirements_engineer

/requirements_engineering_team/requirements_engineer
  -> /requirements_engineering_team/product_prototyper       (prototype needed)
  -> /software_engineering_team/architecture_designer        (approved + ready)
  -> /head_of_software_development                            (blocked before architecture)

/requirements_engineering_team/product_prototyper
  -> /requirements_engineering_team/prototype_bootstrapper    (baseline needed)
  -> /requirements_engineering_team/requirements_engineer     (prototype result/gap)

/requirements_engineering_team/prototype_bootstrapper
  -> /requirements_engineering_team/product_prototyper        (complete or blocked)

/software_engineering_team/architecture_designer
  -> internal Software Engineering routes                     (existing flow)
  -> /requirements_engineering_team/requirements_engineer     (Requirement Gap)
  -> /head_of_software_development                             (terminal or non-requirement blocker)

/head_of_software_development
  -> final user/caller response
```

## Macro analysis

### Finding M1 — Critical — Two communication lifecycles create unnecessary routing complexity

**Evidence:** Five coordinator/bootstrap roles currently mix normal messages with
`delegate_task`, `review_task_result`, and `submit_task_result`. Their skills
must distinguish task IDs, result acceptance, revision requests, and ordinary
handoffs.

**Impact:** The same artifact package crosses two conceptual protocols. Agents
must remember which tool closes which relationship, increasing cognitive load
and creating failure modes such as sending a message when a task result is
expected or submitting a task result when no bound task exists.

**Action:** `Remove` all three task tools and their lifecycle prose from the
three in-scope packages. `Restructure` every inter-member transition as a
conditional message handoff.

### Finding M2 — Critical — Head incorrectly relays approved requirements into Software Engineering

**Evidence:** Head currently delegates and reviews both child teams. Department
config declares Head -> Software Engineering.

**Impact:** The requirements owner does not hand its approved package directly
to the architecture owner.

**Action:** `Move` the forward route to nested Requirements Engineer -> nested
Architecture Designer. Head sends only initial work to Requirements Engineer and
receives blocker or terminal status.

### Finding M3 — High — Handoff conditions and recipients are duplicated in skills

**Evidence:** Requirements and prototype skills name recipients and tools while
team configs also define conditional edges.

**Impact:** Route changes require multiple edits and specialists carry
coordination knowledge unrelated to their core work.

**Action:** `Restructure` the affected Handoff sections around outcome
classification plus `get_handoff_rules`. The JSON graph owns recipient choice;
the skill owns completion state, evidence, artifact readiness, and payload.

### Finding M4 — High — Prototype bootstrap task review must become direct evidence review

**Evidence:** Product Prototyper currently delegates bootstrap work and calls
`review_task_result`; Prototype Bootstrapper reports with `submit_task_result`.

**Impact:** Simply replacing tools without preserving review criteria would
weaken the baseline parity gate.

**Action:** `Update` Product Prototyper to send the bootstrap packet as a normal
handoff, receive the returned bootstrap package, inspect the runnable prototype
and report directly, request correction through a matching message rule when
needed, and accept the baseline only under the existing quality criteria.

### Finding M5 — High — Department graph must contain every cross-team recovery and terminal route

**Evidence:** Direct Requirements -> Architecture removes Architecture Designer's
bound software task. Current requirement-gap and terminal paths assume either a
review owner or standalone caller.

**Impact:** Forward work could start, but requirement gaps or final delivery could
be stranded.

**Action:** `Add` Architecture Designer -> nested Requirements Engineer for
requirement gaps and Architecture Designer -> Head for terminal/non-requirement
blocker outcomes.

### Finding M6 — High — All affected senders need grounded dynamic-routing tools

**Evidence:** `get_handoff_rules` exists in merged `origin/main` Northstar team
configs, but the five affected roles do not all expose it. Head and Prototype
Bootstrapper do not currently expose `send_message_to`.

**Impact:** The proposed language would name unavailable tools.

**Action:** `Update` affected configs:

- Head: add `get_handoff_rules`, `send_message_to`; remove task tools.
- Requirements Engineer: add `get_handoff_rules`; remove `submit_task_result`.
- Product Prototyper: add `get_handoff_rules`; remove all task tools.
- Prototype Bootstrapper: add `get_handoff_rules`, `send_message_to`; remove
  `submit_task_result`.
- Architecture Designer: add `get_handoff_rules`; remove `submit_task_result`.

### Finding M7 — Medium — “Finished” needs explicit outcome semantics

**Evidence:** The roles can finish a stage with materially different results:
prototype required, approved requirements, completed bootstrap, requirement gap,
local correction, terminal success, or blocker.

**Impact:** A generic “when finished, hand off” instruction could apply the wrong
conditional rule.

**Action:** `Update` each affected skill to classify its result using its existing
quality/readiness gates before querying rules. The configuration conditions use
those outcome names.

### Finding M8 — Medium — Concurrency needs correlation without task IDs

**Evidence:** The department may process multiple independent packages. Removing
task IDs eliminates the server-managed correlation key.

**Impact:** Messages and terminal results could be associated with the wrong
package.

**Action:** `Add` a stable package/work-item identifier to Head's initial message
and require every downstream message and cumulative package to preserve it. Do
not introduce a new task-state system or mandatory tracking artifact solely for
this purpose.

### Finding M9 — Medium — Standalone stopping behavior must remain explicit

**Evidence:** In standalone Requirements or Software Team use, parent department
routes may not be visible.

**Impact:** An agent could invent a recipient or fail to return a useful result.

**Action:** `Keep` one fallback: when no returned rule applies, return the
completed or blocked result to the user/calling workflow. Do not use task-result
tools.

### Finding M10 — Low — Runtime and public descriptions contain obsolete task language

**Evidence:** Prompts, team guides, shared prototype principles, bootstrap report
template, and README use “delegated task,” task ID, result review, or task
submission terminology.

**Impact:** Stale wording would reintroduce the removed mental model.

**Action:** `Update` or `Remove` every live occurrence in the three in-scope
packages.

## Micro analysis

### Wording and terminology findings

| Severity | Evidence | Impact | Action |
| --- | --- | --- | --- |
| Medium | “Delegate,” “submit,” “review task result,” and “handoff” describe overlapping transitions | Ambiguous tool choice | `Replace` inter-member lifecycle terms with “handoff,” “send,” “receive,” and direct evidence review |
| Medium | Skills name exact recipients | Duplicates JSON ownership | `Remove` recipient names from affected Handoff sections |
| Medium | “When finished” lacks gate status | Premature handoff risk | `Replace` with “after the role's applicable completion or blocker gate is recorded” |
| Low | Head repeats task ID and review mechanics | Obsolete cognitive burden | `Remove` task-specific sections and condense around package IDs and terminal evidence |
| Low | Bootstrap report asks for delegated task ID | Stale output field | `Update` to request/package identifier |

### Negative-instruction disposition

| Boundary | Disposition | Reason |
| --- | --- | --- |
| Do not invent a recipient when no rule matches | `Keep` | Prevents unconfigured routes |
| Do not poll after a successful message | `Keep` | Preserves event-driven flow |
| Do not claim completion when quality gates fail | `Keep` | Protects truthful outputs |
| Do not start prototype feature work before baseline acceptance | `Keep` | Preserves parity gate |
| Do not revise approved requirements inside Architecture | `Keep` | Protects ownership |
| Do not use task-result tools | `Remove` as repeated runtime warnings | The tools and all positive task paths will be removed; one shared message-only protocol is sufficient |
| Do not create duplicate tasks/task IDs | `Remove` | The task concept no longer exists in this workflow |
| Do not refactor other Software specialists | `Move` to analysis scope | Not a runtime behavior |

## Proposed improvements by file

### Software Development Department

| Action | File | Change |
| --- | --- | --- |
| `Restructure` | `team-config.json` | Declare message edges for Head -> nested Requirements Engineer; Requirements Engineer -> Head blocker; Requirements Engineer -> nested Architecture Designer approval; Architecture Designer -> nested Requirements Engineer gap; Architecture Designer -> Head terminal/blocker. Remove task/review wording and Head -> Software relay. |
| `Restructure` | `team.md` | Define the message-only department flow and shared `get_handoff_rules` protocol. |
| `Restructure` | Head `SKILL.md` | Replace task decomposition/delegation/result review with initial package handoff, package-ID continuity, incoming blocker/terminal verification, and final response. |
| `Update` | Head `agent.md` | Describe thin message-based intake/final coordination. |
| `Update` | Head `agent-config.json` | Keep read/shell tools; add `get_handoff_rules` and `send_message_to`; remove `delegate_task`, `review_task_result`, and `submit_task_result`. |

### Requirements Engineering Team

| Action | File | Change |
| --- | --- | --- |
| `Restructure` | `team-config.json` | Keep every normal message edge, including Product Prototyper <-> Prototype Bootstrapper now that bootstrap is also message-based. Use precise conditions for prototype need, baseline need, bootstrap result, and prototype result. |
| `Update` | `team.md` | Establish the shared message-only dynamic handoff protocol. |
| `Restructure` | Requirements Engineer `SKILL.md` | Query rules after `Prototype Needed`, `Approved Architecture-Ready`, or `Blocked`; send cumulative package to returned address; remove task submission. |
| `Update` | Requirements Engineer `agent.md` | Mention dynamic handoff and remove task-result language. |
| `Update` | Requirements Engineer config | Add `get_handoff_rules`; remove `submit_task_result`. |
| `Restructure` | Product Prototyper `SKILL.md` | Replace bootstrap delegation/review with handoff/direct evidence review; query rules for bootstrap request and result back to Requirements Engineer. |
| `Update` | Product Prototyper `agent.md` | Remove delegation/task-result terminology. |
| `Update` | Product Prototyper config | Add `get_handoff_rules`; remove `delegate_task`, `review_task_result`, `submit_task_result`. |
| `Restructure` | Prototype Bootstrapper `SKILL.md` | Accept a handoff packet; query rules and send completed/blocked package back; preserve parity gates. |
| `Update` | Prototype Bootstrapper `agent.md` | Replace temporary task-agent identity with focused bootstrap specialist identity. |
| `Update` | Prototype Bootstrapper config | Add `get_handoff_rules` and `send_message_to`; remove `submit_task_result`. |
| `Update` | Shared prototype principles and role-local links | Replace one-time delegated-task language with one-time bootstrap stage/handoff. The linked shared authority remains single-source. |
| `Update` | Bootstrap report template | Replace delegated task ID with request/package identifier. |

### Software Engineering Team

| Action | File | Change |
| --- | --- | --- |
| `Update` | Architecture Designer `SKILL.md` | Remove bound-task submission language; query rules for initial/revised architecture package, requirement gap, and verified terminal result. Preserve all design work and finalization gates. |
| `Update` | Architecture Designer `agent.md` | Replace task-result submission with dynamic terminal routing. |
| `Update` | Architecture Designer config | Add `get_handoff_rules`; remove `submit_task_result`. |
| `Update` | Software Team `team.md` | Remove task-result lifecycle wording and describe direct department/standalone completion. |
| `Keep` | Software Team `team-config.json` | Preserve existing internal message edges and notifications. Cross-team edges remain in department config. |
| `Keep` | Other five specialist skills/configs | They already communicate through `send_message_to`; no task-lifecycle refactor is needed. |

### Public documentation and analysis record

| Action | File | Change |
| --- | --- | --- |
| `Update` | `README.md` | Describe the message-only department flow and direct Requirements -> Architecture handoff. |
| `Update` | This analysis artifact | Mark implemented/validated after all gates pass and record live-runtime limitation. |

## Shared dynamic handoff language shape

```text
After the role's applicable completion or blocker gate is recorded, call
`get_handoff_rules`. Apply every returned rule whose condition matches the
current result. For each match, call `send_message_to` with the exact returned
`recipient_address`, a concise status and requested next action, and absolute
paths for the cumulative still-relevant package.

Do not select a recipient from memory. If no returned rule applies, return the
result to the user or calling workflow. After all required messages succeed, end
the stage and do not poll.
```

Specialist skills retain their own result classifications, payload contents,
quality gates, and artifact requirements. They do not own recipient selection.

## Assumptions, open questions, and risks

### Assumptions

- Parent-department and child-team handoff rules are visible to an acting nested
  member through `get_handoff_rules`.
- Rooted nested recipient addresses in `origin/main` are the supported routing
  contract.
- Head remains the department coordinator but no longer creates child tasks.
- Direct messages can activate the addressed nested member without a delegated
  task object.

### Risks

- If nested parent rules are not visible at runtime, direct cross-team routing
  requires a product fix; duplicating parent routes into child configs would not
  be an acceptable source-of-truth workaround.
- Removing task IDs reduces server-managed correlation; stable package IDs and
  artifact paths must be preserved in messages.
- Direct evidence review must retain the same bootstrap quality gate previously
  enforced before `review_task_result` acceptance.
- A missing terminal or requirement-gap edge would strand the workflow.
- Static repository validation cannot prove live nested-member activation.

### Open question resolved by the requested simplification

No task tool is retained as a fallback. If a route is not available, the agent
returns a blocker to the current user/caller rather than starting a second
communication model.

## Validation plan after approval

1. Run the standard validator on Head, Requirements Engineer, Product
   Prototyper, Prototype Bootstrapper, and Architecture Designer skills.
2. Parse every changed JSON file.
3. Assert that the three package trees contain no live `delegate_task`,
   `review_task_result`, or `submit_task_result` instruction or tool entry.
4. Assert every sender exposes `get_handoff_rules` and `send_message_to`.
5. Validate every direct and nested rooted handoff endpoint.
6. Assert one approved Requirements -> Architecture edge and no Head -> Software
   relay edge.
7. Assert prototype baseline request/return edges and direct evidence-review
   gates remain complete.
8. Assert requirement-gap and terminal department edges exist.
9. Verify other Software specialist files are unchanged.
10. Check all links, shared symlinks, stale task terminology, conflict markers,
    and `git diff --check`.
11. Perform both macro and micro rereads.
12. Record that live nested handoff execution was not run unless a runtime test
    becomes available.

## Analysis boundary

Target skill files changed during analysis: None

Analysis artifact:
`.codex/artifacts/direct-requirements-to-architecture-handoff/optimization-analysis.md`

## Implementation and validation record

### Implemented

- Replaced the department-level task lifecycle with `get_handoff_rules` plus
  `send_message_to` for every configured inter-member transition.
- Removed the Head -> Software Engineering relay. Approved architecture-ready
  requirements now route directly from nested Requirements Engineer to nested
  Architecture Designer.
- Added the complete message recovery graph: pre-architecture blocker to Head,
  Requirement Gap to Requirements Engineer, and verified terminal or
  non-requirement blocker to Head.
- Converted Product Prototyper <-> Prototype Bootstrapper to normal messages
  while preserving Product Prototyper's direct bootstrap evidence review and
  the Bootstrapper's complete current-state parity gate.
- Added dynamic-routing tools to Head, Requirements Engineer, Product
  Prototyper, Prototype Bootstrapper, and Architecture Designer, and removed all
  three task-lifecycle tools from their configs.
- Replaced lifecycle-specific prompt, team-guide, shared-principle, template,
  and README wording. Delivery Engineer's behavior was not refactored; two
  terminal-return lines were updated only to remove stale submission language.
- Preserved the Software Engineering internal route graph. One Delivery ->
  Architecture rule sentence was updated to say “verify and route” instead of
  “submit or return”; its endpoints and condition are unchanged.

### Macro review pass

Pass. Package ownership is coherent:

- `team-config.json.handoffs` owns conditional recipients;
- each `team.md` owns the shared communication protocol and team flow;
- specialist skills own work, artifacts, exit classification, payload, quality
  gates, and recovery evidence;
- `agent-config.json` owns actual tool availability.

The forward, recovery, blocker, terminal, standalone, and concurrent-package
paths are complete. Requirements ownership, explicit user approval, prototype
parity, direct bootstrap evidence review, full architecture design, review pass
notifications, Delivery authority, and finalization gates remain intact.

### Micro review pass

Pass. Exit names now align with configuration conditions, affected specialist
skills no longer hard-code recipients, obsolete lifecycle terminology is gone,
and retained negative instructions protect concrete ownership, approval,
workspace, parity, evidence, routing, or terminal gates. No additional process
state, helper script, tracking artifact, or copied shared reference was added.

### Validation results

- Standard `quick_validate.py`: pass for Head of Software Development,
  Requirements Engineer, Product Prototyper, Prototype Bootstrapper, and
  Architecture Designer.
- JSON parsing: pass for all 13 JSON files in the three affected package trees.
- Affected sender tool contract: pass; all five expose `get_handoff_rules` and
  `send_message_to`, and none exposes `delegate_task`, `review_task_result`, or
  `submit_task_result`.
- Removed task-lifecycle terminology scan: pass across the three live package
  trees.
- Rooted handoff endpoint resolution, including nested shared teams: pass.
- Required department graph: pass; exactly one Requirements Engineer ->
  Architecture Designer forward edge and no Head -> Software Engineering relay.
- Prototype request/return, Requirement Gap, blocker, and terminal edges: pass.
- Target-package relative Markdown links: pass. README link targets are
  unchanged; its pre-existing unresolved repo-relative links were excluded from
  this focused check because this change edited no README links.
- Shared symlinks: pass for all 9 links in scope.
- Stale Solution Designer names and merge conflict markers: none found.
- Architecture Reviewer, Implementation Engineer, Code Reviewer, and API/E2E
  Engineer packages: byte-identical to `HEAD`. Delivery Engineer runtime config
  is unchanged; only the noted terminal wording changed.
- `git diff --check`: pass.

### Remaining limitation

Static repository checks cannot prove that a nested member receives both parent
and child handoff rules or that a direct message activates that nested member in
an installed AutoByteus runtime. No live nested-handoff execution was available
for this validation. If the runtime does not expose the parent department rules,
that is a product-level blocker; the package does not duplicate those routes as
an ungrounded workaround.
