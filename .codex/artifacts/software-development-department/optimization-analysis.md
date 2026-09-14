# Software Development Department — Optimization Analysis

Review Status: Expanded cleanup implemented and validated

## User request and scope

Create a separate `Software Development Department` folder that contains the existing Requirements Engineering Team and Software Engineering Team as peer subteams.

User clarification: the existing team definitions must remain in their own sibling folders. The department references them with shared `agent_team` references; it does not copy or physically nest their packages under the department folder. The runtime necessarily presents those references as child team targets during a department run, but their source ownership remains independent.

The requested organizational outcome is:

```text
Software Development Department
├── Requirements Engineering Team
└── Software Engineering Team
```

This review covers the new department package and the smallest cross-file changes required to replace the current, semantically incorrect model in which `software_engineering_team` is a member of Requirements Engineering Team.

Changes to the AutoByteus product/runtime and to the independent `autobyteus-skills` repository are out of scope.

## Current behavior and package ownership baseline

| Package or file | Current responsibility |
| --- | --- |
| `agent-teams/requirements-engineering-team/` | Requirements investigation, conditional product prototyping, explicit user approval, direct delegation to Software Engineering Team, and review of its returned result |
| `agent-teams/software-engineering-team/` | Approved-package intake, architecture design and review, implementation and source review, API/E2E validation, user-verified delivery, finalization, and delegated result submission |
| `README.md` | Repository-level team catalogue and package conventions |
| `.codex/artifacts/solution-designer-to-architecture-designer/optimization-analysis.md` | Completed analysis and implementation record for the preceding coordinator rename and direct requirements-to-software delegation |

Current runtime flow:

```text
User or caller
  -> Requirements Engineering Team / requirements_engineer
  -> delegate_task(software_engineering_team)
  -> Software Engineering Team / architecture_designer
  -> submit_task_result
  -> Requirements Engineer review
  -> final response
```

Current structural problem: `software_engineering_team` is a shared `agent_team` member inside `requirements-engineering-team/team-config.json`. This enables delegation but incorrectly represents Software Engineering as organizationally contained by Requirements Engineering.

Observed repository convention: a parent definition may contain nested `agent_team` members, but it still designates an agent as coordinator. The current runtime topology planner explicitly rejects an `agent_team` as the designated coordinator. Therefore, a parent containing the two peer teams requires its own agent coordinator.

## Preserved invariants and user-authority boundaries

- Requirements Engineering remains the sole owner of intended behavior, requirements, acceptance criteria, requirements evidence, conditional prototype coordination, and explicit user approval.
- Software Engineering remains the sole owner of target architecture, architecture review, implementation, code review, executable validation, delivery, and finalization.
- The Architecture Designer keeps the full design capability already preserved by the Solution Designer rename.
- Software Engineering submits success only after Delivery Engineer reports explicit user verification and completed applicable finalization.
- Each delegated team result is reviewed through `review_task_result`; correctable work uses the existing task execution rather than an untracked message handoff.
- Independent packages may use separate task delegations; dependent stages remain ordered.
- Internal specialists do not need parent task metadata. Their existing artifact-driven handoffs remain intact.
- The parent coordinator must not invent or silently change requirements, architecture, review decisions, validation evidence, user approval, or finalization status.
- No Product Manager or Product Iteration Team behavior is reintroduced.
- The two existing specialist teams remain independently invokable: Requirements Engineering can produce an approved requirements package, and Software Engineering can consume an already approved package.

## Macro analysis

### Package topology and ownership

**Finding SDD-M1 — High — the current containment boundary is semantically wrong.**

Evidence: `requirements-engineering-team/team-config.json` lists `software_engineering_team` as a member, while both team guides define separate specialist ownership boundaries.

Impact: runtime routing works, but the package topology says Requirements Engineering owns or encloses Software Engineering. That conflicts with the intended real-organization model.

**Finding SDD-M2 — High — a parent coordinator is required by the current runtime.**

Evidence: the current topology planner rejects a configured coordinator whose `refType` is `agent_team`; task-team delegation sends work to the target team's ingress coordinator.

Impact: a department containing only the two subteam nodes would not have a valid coordinator. Reusing either specialist coordinator would recreate the asymmetric ownership problem. The department needs a neutral `head_of_software_development` agent.

**Finding SDD-M3 — High — moving the team references changes the task lifecycle owner.**

Evidence: Requirements Engineer currently owns Software Engineering delegation and review. Architecture Designer submits the Software Engineering task result to that delegator.

Impact: after both teams become peers, the department coordinator must own both task IDs, review the Requirements Engineering result, delegate its approved package to Software Engineering, review that result, and return or submit the department result. Requirements Engineer must instead submit its own team result to the department.

### Authoritative sources and boundaries

The proposed authoritative ownership is:

| Concern | Authoritative owner |
| --- | --- |
| Department routing and cross-team task lifecycle | New `head-of-software-development` skill |
| Requirements workflow and requirements result | Existing `requirements-engineer` skill |
| Architecture-through-delivery workflow and software result | Existing Software Engineering member skills |
| Parent membership and coordinator wiring | New department `team-config.json` |
| Requirements-only membership | Existing Requirements team `team-config.json` |
| Repository-level discovery | `README.md` |

No new runtime artifact or orchestration ledger is justified. Task IDs and the cumulative specialist artifacts already provide the required lifecycle evidence.

### Logical flow and content architecture

Recommended end-to-end flow:

```text
User or calling workflow
  -> Software Development Department / head_of_software_development
  -> delegate_task(requirements_engineering_team)
  -> Requirements Engineer creates and obtains approval for the package
  -> Requirements Engineer submit_task_result
  -> Software Development Manager review_task_result
  -> delegate_task(software_engineering_team)
  -> Architecture Designer coordinates architecture through finalized delivery
  -> Architecture Designer submit_task_result
  -> Software Development Manager review_task_result
  -> final response, or submit_task_result when the department itself is delegated
```

This flow makes both specialist teams peers and keeps the cross-team lifecycle at their shared parent.

Standalone behavior remains explicit:

- Requirements Engineering Team: ends with an approved requirements package and returns it to the user/caller, or submits it when running as a delegated task team.
- Software Engineering Team: starts from an approved requirements package and returns finalized delivery, or submits it when running as a delegated task team.
- Software Development Department: is the default end-to-end entrypoint when both stages are required.

### Outputs, validation, recovery, and handoff

The department manager owns no new canonical work artifact. It verifies and carries the cumulative package produced by the specialist teams.

Recovery routes:

- A correctable Requirements Engineering gap returns through `review_task_result(request_revision)` on the same requirements task.
- A Software Engineering implementation or delivery gap returns through `review_task_result(request_revision)` on the same software task.
- If Software Engineering identifies a material requirements gap, the manager keeps the software submission pending, delegates a bounded requirements-revision task, obtains the revised approved package, and then requests revision on the existing software task with those authoritative references.
- A user decision or external blocker is returned truthfully instead of being guessed by the manager.

## Micro analysis

### Wording and terminology

- Use `Software Development Department` for the parent display name and `software-development-department` for its folder/reference ID.
- Use `head_of_software_development` for the member name and `head-of-software-development` for its local agent and skill folders.
- Use `Requirements Engineering Team` and `Software Engineering Team` as peer organizational labels.
- Use `delegating task owner` or `department coordinator` in Software Engineering recovery text instead of hard-coding `Requirements Engineer`, because the Software Engineering Team remains reusable outside the department.

### Qualifiers, conditions, and exceptions

- `submit_task_result` must be conditional on a bound delegated task-team ingress context; standalone runs return through the caller path.
- Requirements approval remains with the user, not the department manager's task-result review.
- Review acceptance confirms the delegated result, not a change in product intent.
- The manager may delegate independent packages separately but must not claim concurrency for dependent requirements and software stages.

### Redundancy, transitions, and economy

- Remove direct Software Engineering delegation instructions from Requirements Engineering rather than retaining them as inactive warnings.
- Do not duplicate Requirements or Software Engineering stage details inside the manager skill; link the stage contracts through the delegation packet and returned artifacts.
- Do not create a department-level template, status file, README, or quick-reference package solely for completeness.
- Retain concise approval and finalization boundaries because they protect real user-authority and completion conditions.

## Findings and evidence summary

| ID | Severity | Finding | Concrete impact |
| --- | --- | --- | --- |
| `SDD-M1` | High | Software Engineering is nested inside Requirements Engineering | Incorrect organizational ownership |
| `SDD-M2` | High | A nested team cannot be the parent coordinator | A neutral coordinator agent is required |
| `SDD-M3` | High | Cross-team task ownership currently belongs to Requirements Engineer | Lifecycle must move to the department manager |
| `SDD-m1` | Medium | Requirements files repeatedly describe direct Software Engineering delegation | Stale behavior after peer-team restructuring |
| `SDD-m2` | Medium | Software files name Requirements Engineer as the fixed review owner | Breaks standalone and parent-team reuse |
| `SDD-m3` | Low | README exposes only the two specialist entrypoints | The new end-to-end entrypoint would be undiscoverable |

## Proposed improvements

### Macro actions, in order

1. **Add — `agent-teams/software-development-department/`**
   - Add `team-config.json` with `head_of_software_development` as the local agent coordinator.
   - Add `requirements_engineering_team` and `software_engineering_team` as shared peer `agent_team` members.
   - Add `team.md` defining the parent boundary, sequential lifecycle, independent-package behavior, recovery, and final-result path.

2. **Add — `agent-teams/software-development-department/agents/head-of-software-development/`**
   - Add `agent-config.json`, `agent.md`, and `skills/head-of-software-development/SKILL.md`.
   - Give the manager only the tools required to inspect packages and own the delegated lifecycle: `read_file`, `run_bash`, `delegate_task`, `review_task_result`, and `submit_task_result`.
   - Do not add templates or a manager-owned runtime artifact.

3. **Restructure — Requirements Engineering Team boundary**
   - Remove `software_engineering_team` from `requirements-engineering-team/team-config.json`.
   - Update `team.md`, Requirements Engineer metadata, prompt, and skill so the team ends at the approved requirements result.
   - Replace Requirements Engineer's downstream `delegate_task`/`review_task_result` ownership with conditional `submit_task_result` ownership when its team is delegated.

4. **Update — Software Engineering caller-neutral result boundary**
   - Preserve the existing software workflow and Architecture Designer submission ownership.
   - Update the Software Engineering team guide and Architecture Designer skill only where they hard-code Requirements Engineer as the delegating review owner.

5. **Update — `README.md`**
   - Add Software Development Department as the end-to-end entrypoint.
   - Describe Requirements Engineering and Software Engineering as independently invokable specialist teams.

### Micro actions, in order

1. **Update** direct-delegation wording in Requirements Engineering to requirements-result submission wording.
2. **Update** caller-specific Software Engineering recovery wording to parent/caller-neutral wording.
3. **Remove** obsolete requirements-to-software membership, tool, and handoff references after confirming the new manager owns them.
4. **Keep** architecture depth, internal reviewer notifications, user verification, finalization, and Architecture Designer task-result submission.
5. **Keep** product-prototype delegation and review inside Requirements Engineering unchanged; only the cross-team boundary moves.

## Assumptions and open questions

### Approved decisions

- Parent display name: `Software Development Department`.
- Parent folder/reference ID: `software-development-department`.
- Neutral coordinator role: `head_of_software_development` / `head-of-software-development`.
- Requirements Engineering and Software Engineering remain separate sibling source folders and are referenced with `refScope: "shared"`.
- The department, rather than Requirements Engineer, owns both subteam task lifecycles and the final cross-team response.
- Requirements Engineering no longer contains or directly delegates to Software Engineering.

The user approved the separate reference-based department and selected Head of Software Development as its neutral coordinator. No implementation-blocking behavior question remains.

### Risks

- If direct Software Engineering delegation remains in Requirements Engineering, the new parent becomes cosmetic and the false containment survives.
- If the manager duplicates specialist decisions, it weakens domain ownership. Its skill must remain routing- and evidence-focused.
- A Software Engineering requirement-gap recovery crosses two task lifecycles; the manager must retain the existing software task while obtaining an approved requirements revision.
- The untracked `.codex/skills/skill-optimizer` symlink existed before this analysis and is not part of the proposed repository changes.

## Validation plan

After approval and implementation:

1. Parse all changed JSON configurations.
2. Run the standard skill validator on the new manager skill and every changed existing skill.
3. Verify the new coordinator resolves to an agent member, not an `agent_team` member.
4. Verify the department exposes exactly the two shared peer team targets plus its local manager.
5. Verify Requirements Engineering no longer contains or references `software_engineering_team` as a member or downstream target.
6. Verify Requirements Engineer has `submit_task_result` for delegated ingress and no obsolete cross-team delegation/review tools.
7. Verify Architecture Designer retains `submit_task_result` and the complete architecture-through-finalization workflow.
8. Check every changed Markdown link and skill/frontmatter name.
9. Search for stale direct Requirements-owns-Software wording across active repository files.
10. Run `git diff --check` and scan for unresolved merge markers.
11. Perform the required macro behavior/structure review, then the micro economy/coherence review.

Target skill files changed during analysis: None

Target runtime/team files changed during analysis: None

Analysis artifact: `.codex/artifacts/software-development-department/optimization-analysis.md`

## Post-approval implementation and validation record

- Approval recorded: User explicitly approved creating the separate department, selected `head_of_software_development` as its coordinator, and confirmed that the two specialist team packages must remain separate sibling folders referenced by the department.

### Target files changed

Added:

- `agent-teams/software-development-department/team-config.json`
- `agent-teams/software-development-department/team.md`
- `agent-teams/software-development-department/agents/head-of-software-development/agent-config.json`
- `agent-teams/software-development-department/agents/head-of-software-development/agent.md`
- `agent-teams/software-development-department/agents/head-of-software-development/skills/head-of-software-development/SKILL.md`

Updated:

- `README.md`
- `agent-teams/requirements-engineering-team/team-config.json`
- `agent-teams/requirements-engineering-team/team.md`
- `agent-teams/requirements-engineering-team/agents/requirements-engineer/agent-config.json`
- `agent-teams/requirements-engineering-team/agents/requirements-engineer/agent.md`
- `agent-teams/requirements-engineering-team/agents/requirements-engineer/skills/requirements-engineer/SKILL.md`
- `agent-teams/software-engineering-team/team.md`
- `agent-teams/software-engineering-team/agents/architecture-designer/skills/architecture-designer/SKILL.md`

### Behavior preserved or intentionally changed

- Added Software Development Department as the end-to-end entrypoint.
- Kept Requirements Engineering Team and Software Engineering Team as independent sibling source packages and referenced both with shared `agent_team` entries.
- Replaced the former Requirements-contains-Software topology with manager-owned requirements and software task lifecycles.
- Changed Requirements Engineer from Software Engineering delegator/reviewer to Requirements Engineering result submitter when its team is delegated.
- Preserved Requirements Engineering ownership, conditional prototype flow, and the task-scoped Prototype Bootstrapper lifecycle.
- Preserved the complete Architecture Designer workflow, internal reviewer notifications, user verification, finalization gate, and Architecture Designer software-task submission.
- Generalized Software Engineering's result-review owner so the team remains usable by the department or a standalone caller.
- Added no department-level runtime artifact, template, duplicated specialist skill, or copied team definition.

### Validation performed and result

- Fresh `origin/main` fetch: branch remains based on current `origin/main`; no incoming main commits were pending.
- JSON parse: all 109 repository JSON files passed.
- Department topology assertions: coordinator is the local agent; both specialist teams are shared sibling references; no physical nested team package exists under the department.
- Task-lifecycle tool assertions: Head owns `delegate_task`, `review_task_result`, and conditional `submit_task_result`; Requirements Engineer owns conditional `submit_task_result`; Architecture Designer retains `submit_task_result`; Product Prototyper retains its bootstrap delegation/review tools.
- Standard skill validator: new Head skill, Requirements Engineer skill, and Architecture Designer skill each reported `Skill is valid!`.
- Markdown links: all eight changed or affected package files passed. The changed README hunk adds no links; pre-existing illustrative README link examples were excluded because they are intentionally not root-relative package links.
- Stale-reference searches: no direct `software_engineering_team` target remains in Requirements Engineering; no fixed Requirements Engineer review owner remains in Software Engineering; no obsolete manager name or Product Iteration reference exists in the department.
- Newline and trailing-whitespace scan: passed for all three affected package trees.
- `git diff --check`: passed.
- Merge-marker scan: passed.
- Base ancestry check: `origin/main` is an ancestor of the current branch.

### Macro review pass

- Package ownership: passed. The department owns orchestration; the two specialist teams retain their domain ownership and separate source folders.
- Primary spine: passed. Intake -> requirements delegation/review -> software delegation/review -> final return/submission is explicit.
- Runtime grounding: passed against the inspected topology-planner and task-delegation contracts. An agent coordinator is present, and both team targets are visible shared references.
- Outputs and recovery: passed. The department introduces no competing canonical artifact and defines same-task correction plus cross-team requirements-gap recovery.
- Cross-file consistency: passed across team configs, team guides, agent metadata, skills, and README.

### Micro review pass

- Removed obsolete direct Requirements-to-Software delegation and returned-result wording.
- Replaced hard-coded Requirements Engineer caller language in Software Engineering with `delegating task owner` or `review owner`.
- Retained negative instructions only where they protect a real ownership, approval, finalization, task-identity, or concurrency boundary.
- Kept the Head skill focused on routing and evidence instead of repeating specialist workflows.
- Terminology and identifiers are consistent: `Software Development Department`, `head_of_software_development`, and `head-of-software-development`.

### Final residual risk

No live AutoByteus department run was launched. Validation proves the package topology and documented contracts statically; the first runtime use should confirm end-to-end notification and task-settlement behavior. At runtime the shared team references necessarily appear as child team targets of the department run, while their source definitions remain independent sibling folders as requested.

## Follow-up optimizer review — runtime relevance and defensive noise

### Review trigger and scope

The user correctly challenged this runtime team instruction:

> Requirements Engineering Team and Software Engineering Team remain independent definitions in separate sibling folders. This department references both with shared `agent_team` members; it does not copy their agents, skills, or artifacts into this package.

The updated optimizer rubric requires a normal-path relevance, plausible-branch, unasked-work, and distinct-boundary test for every defensive instruction. The previous micro pass did not apply that test strictly enough.

This follow-up reviews:

- the complete Software Development Department package;
- Requirements Engineering `team.md`, its coordinator prompt/config/skill, and the coordinator skill's linked templates;
- the Product Prototyper, Prototype Bootstrapper, and shared prototype files for cross-file ownership and routing consistency;
- README, team configs, and the modified Software Engineering boundary as neighboring authoritative sources.

It does not reopen the specialist prototype behavior for an unrelated redesign. Specialist instructions are changed only if the package/ownership review demonstrates duplication or runtime noise at the reviewed boundary.

Target skill files changed during follow-up analysis: None

Target runtime/team files changed during follow-up analysis: None

Analysis artifact updated during follow-up: `.codex/artifacts/software-development-department/optimization-analysis.md`

### Corrected macro analysis

#### Finding FOLLOW-M1 — High — Department `team.md` and coordinator skill compete as workflow owners

Evidence:

- `team.md` defines the eight-step primary flow, independent-package rule, recovery routes, and handoff authority.
- `head-of-software-development/SKILL.md` independently defines the same sequence, task contracts, recovery, independent-work rules, and final result.

Impact: the department has two runtime workflow sources that can drift. The quoted package-layout paragraph is one symptom of a broader ownership problem: `team.md` has expanded beyond team discovery and responsibility into a second operating skill.

Disposition: `Restructure`. Keep a compact department purpose, roster, responsibility boundary, and one high-level transition in `team.md`. Keep executable routing, task contracts, review rules, recovery, and final-result behavior only in the coordinator skill.

#### Finding FOLLOW-M2 — Medium — the `Reference Model` section has no runtime decision value

Evidence:

- Shared/local reference semantics are already encoded by `team-config.json`.
- Repository readers can discover the sibling-folder relationship from `README.md` and the filesystem.
- No normal department action could copy subteam agents or skills; the workflow never invites that action and the coordinator lacks a package-authoring responsibility.

Impact: the section answers an unasked package-layout question inside runtime instructions. It adds no task action, output, recovery route, safety boundary, approval rule, or validation requirement.

Disposition: `Remove` the complete `Reference Model` section from runtime `team.md`. `Keep` the concise repository-level explanation in `README.md`, where package topology has a real audience.

#### Finding FOLLOW-M3 — High — Requirements Engineering `team.md` duplicates its member skills

Evidence:

- The team guide repeats the Requirements Engineer's 17-stage flow, prototype gate, artifacts, readiness gate, result submission, and handoff rules.
- Product Prototyper and Prototype Bootstrapper skills already own their detailed task lifecycles and artifact rules.
- The shared prototype principles already own cross-role technology, baseline, mock, isolation, and evidence rules.

Impact: the team guide is a competing execution manual and repeats several ownership safeguards at a less precise level.

Disposition: `Restructure` Requirements Engineering `team.md` into a compact team contract: purpose, roles, ownership boundary, concise collaboration flow, and pointers to the authoritative member skills/shared principles.

#### Finding FOLLOW-M4 — Medium — roster and package-mechanics explanations are misplaced

Evidence:

- Requirements `team.md` explains that Prototype Bootstrapper is visible because `delegate_task` resolves against the roster.
- It separately states that the visible roster defines available specialists.
- The config and runtime-injected delegation roster already determine this behavior, while Product Prototyper's skill names the exact bootstrap target.

Impact: these sentences explain implementation mechanics without changing a runtime decision.

Disposition: `Remove` the explanatory roster sentences. `Keep` the actual routing instruction in Product Prototyper's skill because it names a real target and bounded task lifecycle.

### Corrected micro analysis

#### Department negative-instruction ledger

| Location / instruction | Positive route | Plausible mistake or distinct boundary | Disposition |
| --- | --- | --- | --- |
| `team.md` Reference Model: does not copy agents, skills, or artifacts | Shared references already exist in config | No plausible runtime copying branch | `Remove` |
| Coordinator routes work “without taking over” specialist decisions | Specialist ownership is stated immediately below | Repeated locally; no new boundary | `Remove` from introduction |
| Coordinator “does not author requirements, choose architecture…” | Route decisions and gaps to the owning team | Ownership drift is plausible, but the long prohibition duplicates the ownership list | `Rewrite` as one positive routing rule |
| Do not start Software Engineering before accepted, approved requirements | Start Software Engineering after the accepted approval-bearing result | Real dependency and approval gate | `Rewrite` positively and keep |
| Return user decisions/blockers instead of managerial inference | Route unresolved authority to the user | Real user-authority boundary | `Keep`, tighten |
| Task acceptance does not replace approval or verification | Check both evidence types independently | Real semantic ambiguity | `Keep` |
| End after submission; do not poll | Wait for lifecycle notification | Real task-lifecycle boundary | `Keep` |
| Agent prompt: coordinate “without doing” specialist work | Preserve specialist ownership and route gaps | Repeats the ownership contract | `Rewrite` positively |
| Skill: do not duplicate canonical artifacts | Treat specialist artifacts as canonical and carry their paths | Real artifact-authority boundary | `Rewrite` positively |
| Do not treat result acceptance as user approval | Require approval evidence before accepting requirements result | Real authority boundary | `Keep` |
| Exact task ID; do not create duplicate task | Revise the active task by its exact ID | Real task-identity boundary | `Keep` |
| Do not combine unrelated tasks or claim unsupported concurrency | Use separate tasks and claim concurrency only when observed | Real execution/reporting boundary, currently phrased defensively | `Rewrite` positively |

#### Requirements boundary negative-instruction ledger

| Location / instruction group | Positive route | Plausible mistake or distinct boundary | Disposition |
| --- | --- | --- | --- |
| Team guide roster visibility explanations | Product Prototyper delegates to the named Bootstrapper target | Runtime/config already supplies target visibility | `Remove` |
| Team guide detailed prototype, artifact, readiness, and handoff rules | Member skills and shared principles own these rules | Competing authority and repetition | `Move`/`Merge` into the existing owners by removing team-guide copies |
| Requirements must not design target architecture | State behavior and measurable constraints; defer technical structure | Real specialist ownership boundary | `Keep` once in the team boundary and at the requirements-writing/validation action points |
| Requirements Engineer must not mark approval without user approval | Record explicit approval evidence | Real user-authority boundary | `Keep` |
| Prototype is not mandatory / do not prototype when it adds no evidence | Apply the conditional prototype gate | Real optional-branch decision | `Rewrite` positively where possible and keep |
| Prototyper must not create a second canonical requirements doc | Return `ui-ux-spec.md` to Requirements Engineer | Real artifact-authority collision | `Keep` |
| Requirements Engineer must not delegate directly to Bootstrapper | Send prototype work to Product Prototyper, which owns bootstrap delegation | Real routing ambiguity because Bootstrapper is visible | `Keep` |
| Do not use task-result tools for ordinary prototype handoffs | Use `send_message_to` for normal member handoffs and task tools for bootstrap | Real lifecycle distinction | `Keep` |
| Do not use Codex-native collaboration tools | Use the configured AutoByteus team/task tools | Protects task tracking when both tool families may be available | `Keep` |
| Requirements result rules repeated in Operating Sequence, Result, and Handoff sections | Keep the complete contract in `Requirements Team Result`; use short sequence references | Repetition adds no boundary | `Merge` and remove duplicate handoff bullets |
| “Cross-team orchestration belongs to … Software Development Department” in the Requirements skill | Standalone returns; delegated ingress submits | Host/package label does not change this skill's action | `Remove` the named-parent commentary |

The linked requirements templates retain their output-local boundaries. Their negative statements prevent supported-path fabrication, target-architecture leakage, ambiguous approval, or migration prescription and therefore close plausible branches.

### Follow-up proposed improvements

#### Macro actions

1. **Restructure — `agent-teams/software-development-department/team.md`**
   - Remove `Reference Model` completely.
   - Keep a compact department purpose, specialist ownership, member roles, and high-level `Requirements -> Software` transition.
   - Replace detailed flow, recovery, and handoff copies with a short statement that the Head's bundled skill owns execution.

2. **Update — Head of Software Development runtime package**
   - Keep `team-config.json` unchanged as the authoritative shared-reference topology.
   - Keep `agent-config.json` unchanged as tool/skill wiring.
   - Tighten `agent.md` to positive specialist-routing language.
   - Keep the full executable workflow in `SKILL.md`, consolidate repeated independent-work text, and rewrite low-value defensive negatives positively.

3. **Restructure — `agent-teams/requirements-engineering-team/team.md`**
   - Remove package mechanics and the duplicated 17-step workflow/checklists.
   - Keep purpose, roles, responsibility boundary, a concise collaboration sequence, and the shared-principles link.
   - Leave detailed requirements, prototype, bootstrap, artifact, approval, and handoff behavior in their existing authoritative skills/references.

4. **Update — Requirements Engineer skill boundary**
   - Consolidate result behavior under `Requirements Team Result`.
   - Remove its repeated final handoff bullets and named-parent commentary.
   - Preserve approval, architecture-boundary, task-ingress, and revision controls.

5. **Keep — specialist and package owners**
   - Keep Product Prototyper and Prototype Bootstrapper task behavior unchanged.
   - Keep shared prototype principles and linked templates unchanged.
   - Keep both team configs and README's repository-level sibling/reference explanation unchanged.
   - Keep Software Engineering caller-neutral task-result boundary unchanged.

#### Micro actions

1. `Remove` the quoted copy/folder/package defense from runtime instructions.
2. `Rewrite` retained ownership and concurrency boundaries as direct positive routes where that is equally precise.
3. `Merge` duplicate Requirements result instructions into one authoritative section.
4. `Keep` negatives that protect user approval, explicit verification, task identity, tool lifecycle, artifact authority, or architecture ownership.

### Follow-up assumptions, risks, and validation plan

Assumptions:

- `team.md` should describe the team and its high-level collaboration model; the coordinator's bundled skill owns executable detail.
- README is the appropriate repository-level owner for physical sibling-folder and shared-reference explanation.
- The user is asking for behavior-preserving cleanup, not removal of approval, review, recovery, or task-lifecycle gates.

Risks:

- Over-compressing `team.md` could hide which specialist owns a stage. The compact version must retain member responsibilities and the end-to-end transition.
- Removing repeated safeguards from both the team guide and skills would weaken behavior. Each retained rule must have one explicit authoritative owner before a duplicate is removed.

Validation after approval:

1. Run the standard validator on Head of Software Development and all three Requirements Engineering skills.
2. Verify team/config/skill names and every relative link or symlink.
3. Verify both configs and task-tool ownership remain unchanged.
4. Search runtime Markdown for physical-folder, copying, roster-mechanics, and named-parent commentary.
5. Compare all approval, architecture-boundary, prototype-routing, task-identity, recovery, user-verification, and finalization invariants with the current baseline.
6. Run `git diff --check`, JSON parsing, merge-marker checks, and both macro and micro review passes.

## Expanded whole-package rubric audit

The follow-up above identified the first structural problem. This expanded pass applies every optimizer rubric to the complete Software Development Department package and the complete Requirements Engineering Team package, including configs, prompts, skills, the canonical shared prototype reference, its two symlinks, and all eleven templates. The two caller-neutral Software Engineering edits and README were checked as neighboring boundaries.

### What is and is not runtime garbage

Runtime garbage means an instruction that changes no plausible action, output, safety boundary, authority decision, recovery path, validation requirement, or handoff. Length alone is not the test.

The audit found additional garbage and structural redundancy. It did **not** find that Prototype Bootstrapper itself is garbage. `product_prototyper` has `delegate_task` and `review_task_result`, the bootstrapper has `submit_task_result`, and member-target delegation requires the bootstrapper to be addressable in the team roster. The runtime relationship is real; the prose explaining why the roster works is the garbage.

The shared prototype file is also not duplicated physically. Both role-local files are symlinks to `shared/product-prototype-principles.md`, which follows the repository's documented shared-reference convention.

### Provenance: what the current work introduced

Git distinguishes current uncommitted edits from pre-existing text:

- **Introduced by the current department implementation:** every new Department runtime file, including the low-value `Reference Model` paragraph and the duplicated workflow in Department `team.md`.
- **Introduced by the current Requirements boundary edit:** the named-parent sentence in Requirements Engineer's result section and the two repeated result-routing bullets at the end of its handoff section.
- **Made stale by the current Requirements boundary edit:** `Do not delegate directly to prototype_bootstrapper`. That instruction pre-existed, but the current edit removed `delegate_task` from Requirements Engineer's tool config and failed to remove the now-impossible prohibition.
- **Pre-existing in the checked-in package:** the long duplicate Requirements `team.md`, its roster-mechanics explanation, Product Prototyper's self-referential writing instruction, Bootstrapper's unavailable-tool/direct-handoff prohibitions, and the repository-layout clause in the shared prototype principles.

This provenance identifies responsibility for the current diff; it does not speculate about who authored older committed text.

### Rubric-by-rubric macro assessment

| Optimizer rubric | Result | Evidence and impact | Proposed action |
| --- | --- | --- | --- |
| 1. Package structure and ownership | **Fail** | Both Department `team.md` and the Head skill define the complete cross-team workflow. Requirements `team.md` likewise repeats role-specific workflows already owned by three member skills and a shared reference. | `Restructure` both team guides; keep executable detail in the owning skills. |
| 2. Content architecture and priority | **Fail** | The main team purpose and member transition are buried under duplicate step lists, tool mechanics, artifact inventories, quality gates, and recovery detail. | Keep `team.md` focused on purpose, members, ownership, high-level collaboration, and cross-member handoff expectations. |
| 3. Logical flow | **Pass with consolidation needed** | The actual spines are coherent: Department routes Requirements -> Software; Requirements routes investigation -> optional prototype -> approval -> result; Prototyper routes baseline -> iteration -> approval -> evidence; Bootstrapper routes packet -> baseline -> validation -> task result. The defect is multiple descriptions of those spines, not a missing runtime stage. | Preserve each spine in its authoritative skill and reduce team-guide copies to transitions. |
| 4. Scope and audience fit | **Fail** | Runtime prose discusses sibling folders, copied agents/skills, roster resolution, the host repository's missing template, and a named parent department. These are package/repository facts, not execution decisions. | `Remove` runtime commentary; `Keep` repository topology in README. |
| 5. Behavior contract | **Pass, must be preserved** | Required artifacts, conditional prototype routing, approval, architecture separation, task IDs, result review, revision, validation, blockers, and finalization are all defined. | `Keep` these invariants while consolidating their owners. |
| 6. Factual and behavioral grounding | **Fail in three local clauses** | Requirements Engineer has no `delegate_task`; Bootstrapper has no `send_message_to`; Bootstrapper cannot directly message Requirements Engineer. Prohibitions describing those impossible operations are unsupported. | `Remove` or rewrite them as the configured positive route. |
| 7. Clarity and precision | **Needs improvement** | Several boundaries are long lists of forbidden specialist actions even though a positive owner/route is already defined. Result behavior is repeated in separate sections. | `Rewrite` as direct routing instructions and `Merge` repeated result text. |
| 8. Defensive wording | **Fail locally** | Folder copying, unavailable tools, impossible direct handoffs, and unrequested architecture-role routing close no plausible branch. Approval, task identity, security, production-write, and evidence prohibitions do close plausible costly branches. | Remove only low-value defenses; retain or positively sharpen real safeguards. |
| 9. Redundancy and authority | **Fail** | Team guides compete with member skills; Requirements result behavior is repeated; some package-wide tool rules appear in both team and role files. | Choose one owner per rule and retain only short routing reminders where necessary. |

### Authoritative behavior baseline to preserve

- Department config remains the sole topology owner: one local Head coordinator and two shared peer team targets.
- Requirements config remains requirements-only and continues to expose Requirements Engineer, Product Prototyper, and Prototype Bootstrapper.
- Requirements Engineer owns the canonical requirements, investigation, revision history, architecture-readiness decision, explicit user approval, and standalone/delegated Requirements result.
- Product prototyping remains conditional. Requirements Engineer routes prototype work only to Product Prototyper.
- Product Prototyper owns prototype scope, user review, `ui-ux-spec.md`, final screenshots, and the bounded Bootstrapper task lifecycle.
- Prototype Bootstrapper owns only the assigned technical baseline and submits its evidence to the task delegator.
- Shared prototype principles remain canonical for technology, fidelity, mock, isolation, safety, and evidence rules.
- Software Engineering remains the downstream owner of architecture through user-verified finalization; Architecture Designer remains its task-result submitter.
- User approval of intended behavior and user verification of delivered behavior remain distinct from task-result acceptance.
- Same-stage correction uses the existing task ID; blockers and authority decisions are reported truthfully; delegated submitters stop and wait rather than poll.

### Complete defensive-instruction disposition

The tables below account for every behavior-bearing negative or prohibitive instruction in the canonical reviewed files. Similar bullets that protect the same boundary are grouped together. Literal status labels such as `No Frontend`, `No current supported behavior`, and `Yes / No` are data values, not prohibitions. The two role-local prototype-principles symlinks are not counted as separate sources.

#### Software Development Department

| File / instruction group | Boundary test | Disposition |
| --- | --- | --- |
| `team.md`: coordinator works “without taking over” specialist decisions | Ownership is immediately defined again; no distinct action | `Remove` from the introduction |
| `team.md`: sibling folders; does not copy agents, skills, or artifacts | No runtime copying path or tool; package-layout commentary | `Remove` |
| `team.md`: long “does not author requirements, choose architecture…” list | Specialist ownership drift is plausible, but the list duplicates the ownership table | `Rewrite` as one positive rule to route decisions to the owning team |
| `team.md`: do not start Software before accepted, approved Requirements | Real dependency and approval gate | `Keep`, phrase positively |
| `team.md`: return user decisions/blockers instead of managerial inference | Real user-authority boundary | `Keep`, tighten |
| `team.md`: task acceptance does not replace approval or verification | Real semantic ambiguity across lifecycle layers | `Keep` |
| `team.md`: submit then do not poll | Real asynchronous task-lifecycle boundary | `Keep` in the Head skill; remove the duplicate from the team guide |
| Head `agent.md`: coordinate “without doing” specialist work | Useful role boundary, defensively worded | `Rewrite` positively |
| Head skill purpose: “without replacing specialist judgment” | Duplicates Ownership Boundary | `Remove` from Purpose |
| Head skill: do not duplicate canonical artifacts | Real artifact-authority collision | `Rewrite`: treat specialist artifacts as canonical and carry their paths |
| Head skill: return only start-preventing blockers | Real entry/recovery threshold | `Keep` |
| Head skill: wait rather than poll | Real task-lifecycle boundary | `Keep` |
| Head skill: acceptance is not approval | Real user-authority boundary | `Keep` |
| Head skill: accept blockers only when focused revision cannot resolve them | Real terminal-versus-recoverable distinction | `Keep`, simplify |
| Head skill: accept success only with verification/finalization evidence | Real completion gate | `Keep` |
| Head skill: exact task ID; no duplicate revision task | Real task-identity boundary | `Keep` |
| Head skill: do not combine unrelated packages or claim unsupported concurrency | Real task separation/reporting boundary | `Rewrite` positively |

#### Requirements Engineering team guide and coordinator prompt

| File / instruction group | Boundary test | Disposition |
| --- | --- | --- |
| `team.md`: Bootstrapper is visible because delegation resolves against the roster | Explains runtime/package mechanics but changes no decision | `Remove` explanation; keep the role |
| `team.md`: Requirements does not design target architecture | Real specialist boundary | `Keep` once, preferably as positive downstream ownership |
| `team.md`: does not own downstream work/cross-team orchestration | Real team endpoint, but package-specific wording is verbose | `Rewrite` to the positive Requirements result |
| `team.md`: member “does not own” lists | Correct but repeated in member skills | `Remove` detailed copies; keep concise ownership summaries |
| `team.md`: not-recommended, missing/existing bootstrap, blocked-result branches | Real branches already owned in member skills | `Move` by removing team copies and keeping skill owners |
| `team.md`: prototype is not mandatory; skip when it adds no evidence | Real optional-stage decision | `Keep` once as a concise positive conditional; detailed test stays in Requirements skill |
| `team.md`: optional support artifacts, no duplicate report, no competing requirements doc | Real output rules already owned by Prototyper skill/templates | `Remove` team copies |
| `team.md`: task tools only for bounded work | Real message-versus-task lifecycle boundary | `Keep` as a concise team handoff expectation |
| `team.md`: only user approves; draft is not approval; task acceptance is not approval | Real authority boundary, repeated several times | `Merge` into one compact team statement; retain action-local checks in skills |
| `team.md`: carry prototype package without silently rewriting it | Real artifact-authority boundary | `Rewrite` positively |
| `team.md`: architecture-ready only when complete | Real output gate; details belong in Requirements skill | `Keep` a short result definition only |
| `team.md`: unresolved decisions return rather than guess | Real authority/recovery boundary | `Keep`, tighten |
| `team.md`: visible roster defines specialists | Tautological package mechanics | `Remove` |
| `team.md`: do not use Codex-native collaboration | Real tool-family boundary when team agents are run with more than one collaboration surface | `Keep` once at the team handoff boundary |
| `team.md`: no polling | Real lifecycle boundary, already actionable in role skills | `Remove` team duplicate; keep action-local rules |
| Requirements `agent.md`: does not design architecture or perform downstream work | Necessary high-level role framing | `Keep`, optionally phrase positively |

#### Requirements Engineer skill

| Instruction group | Boundary test | Disposition |
| --- | --- | --- |
| Purpose and `You Do Not Own`: no premature architecture, implementation, review, delivery, or invented intent | Real Requirements-versus-Software ownership boundary | `Keep` as the authoritative role contract |
| Revision record does not duplicate canonical artifacts | Real artifact-schema boundary | `Rewrite` positively as a concise index contract |
| Supplemental artifacts only when useful; no competing UI/UX spec; canonical paths/workspace isolation | Real output authority and workspace safety | `Keep` |
| Investigation: do not rely only on UI/request, infer requirements from code mechanics, weaken intent, or prescribe migration | Real evidence, user-authority, and architecture boundaries | `Keep` |
| Requirements: do not invent UI journeys; include branches only when supported; no unapproved architecture; evidence stays in notes | Real scope, grounding, and artifact boundaries | `Keep`; phrase positively where equally precise |
| Never mark Approved without explicit user approval | Real approval boundary | `Keep` |
| Prototype is conditional; prose must not be assumed sufficient for material UI; skip low-value prototype work | Real branch-selection contract | `Rewrite` the skip rule positively and keep behavior |
| Accept prototype UI/UX only with confirmation; return mismatched approval/artifacts | Real validation and recovery boundary | `Keep` |
| Supplements never replace canonical docs; scratch files are retained only when useful | Real artifact-authority/economy boundary | `Keep` |
| Missing revision history is `N/A`, never implied approval | Real traceability/approval integrity | `Keep` |
| No invented target architecture at readiness; open decisions cannot be Approved | Real validation and status boundary | `Keep` |
| Complete/submit only after architecture readiness and approval; wait rather than poll; revisions stay requirements-owned | Real output, lifecycle, and ownership boundaries | `Keep` |
| Named parent: “Cross-team orchestration belongs to … Software Development Department” | Host-package commentary; standalone/delegated branches already determine behavior | `Remove` named-parent sentence |
| Do not use Codex-native collaboration | Real tool-family boundary | `Remove` duplicate from this skill only if retained in compact `team.md`; behavior remains unchanged |
| Send prototype requests only to Product Prototyper | Real exclusive route because Bootstrapper is also visible | `Keep` |
| Do not delegate directly to Bootstrapper | Impossible: Requirements Engineer no longer has `delegate_task` | `Remove` |
| Final two return/submit bullets | Valid behavior already fully defined in `Requirements Team Result` | `Merge` there; remove duplicate bullets |

#### Product Prototyper prompt and skill

| Instruction group | Boundary test | Disposition |
| --- | --- | --- |
| `You Do Not Own` and no second requirements document | Real artifact and decision-authority boundary | `Keep` |
| Return a missing decision question/journey instead of inventing broad scope | Real input/recovery boundary | `Keep` |
| Support artifacts only when useful; optional report must not duplicate; final screenshots cannot use temporary paths | Real output-economy and durability boundaries | `Keep`; template reminder is justified at point of use |
| Build only decision-relevant states/alternatives; recommend a static artifact when better | Real proportionality and optional-branch logic | `Keep` |
| Bootstrap/refresh only under stated conditions; no feature work on unreviewed bootstrap | Real dependency, scope, and validation boundaries | `Keep` |
| Stable/non-reused IDs; only approved changes; remove obsolete behavior rather than invent compatibility | Real traceability and scope boundaries | `Keep` |
| `Implementation Principles`: “Follow shared principles; do not restate or override them here” | Self-referential package-authoring instruction; the top-of-skill link already loads the reference | `Remove` this bullet |
| Do not use generated images or screenshot hotspots as interface implementation | Real plausible prototype shortcut that would invalidate interaction evidence | `Keep` |
| Interim/final screenshot, reconfirmation, process-cleanup, layout, and unapproved-behavior checks | Real evidence, user-authority, external-process, and validation boundaries | `Keep` |
| Do not convert prototype convenience into requirements or rewrite canonical requirements | Real Requirements ownership boundary | `Keep` |
| Task-result tools only for delegated bootstrap; normal handoff uses `send_message_to`; do not poll | Real lifecycle distinction | `Keep` |
| Do not use Codex-native collaboration | Real team tool-family boundary | `Remove` duplicate from this skill only if retained in compact `team.md`; behavior remains unchanged |
| Completion only after confirmation/artifacts; blockers and not-recommended results remain truthful | Real result-status boundary | `Keep` |
| No direct handoff to architecture/implementation | Those roles are not visible members of this team; positive Requirements Engineer route is already explicit | `Remove` |

#### Prototype Bootstrapper prompt and skill

| Instruction group | Boundary test | Disposition |
| --- | --- | --- |
| Prompt's long “do not invent/approve/create/claim” list | Correct ownership, repeated by the skill | `Rewrite` prompt positively as technical-baseline ownership |
| Purpose repeats that behavior/user review is not owned | Duplicates `You Do Not Own` immediately below | `Remove` duplicate clause from Purpose |
| `You Do Not Own` list | Real scope, approval, artifact, production, and architecture boundaries | `Keep` as authoritative |
| Missing packet returns a gap instead of broad scope | Real input/recovery boundary | `Keep` |
| Isolated prototype root; no production-project writes unless explicitly assigned | Real workspace safety boundary | `Keep` |
| No silent technology switch; only relevant baseline; component reuse is not proof of service equivalence | Real fidelity, scope, and factual-grounding boundaries | `Keep` |
| No unsupported visual-system claim | Real factual-grounding boundary | `Keep` |
| No wholesale refresh overwrite without preservation record | Real destructive-change and traceability boundary | `Keep` |
| No production credentials or writes | Real security/external-side-effect boundary | `Keep` |
| Submit with `submit_task_result`; do not use `send_message_to` | Bootstrapper has no `send_message_to`; negative route is impossible | `Rewrite` as the positive submit route |
| Do not claim completion when blocked/untested | Real validation and truthful-result boundary | `Keep` |
| Do not hand off directly to Requirements Engineer | Bootstrapper has no messaging tool and its task result already returns to Product Prototyper | `Remove` |

#### Shared prototype principles and templates

| Instruction group | Boundary test | Disposition |
| --- | --- | --- |
| Shared reference says role-specific workflow belongs in each skill | Defines cross-file authority in the correct shared-reference location | `Keep` |
| Prototype is not production/architecture/readiness proof; convenience is not requirements evidence | Real scope and evidentiary boundary | `Keep` |
| Refresh only when assigned; no silent overwrite; no casual technology replacement | Real scope, preservation, and fidelity boundaries | `Keep` |
| “this agent repository does not itself contain the runnable template” | Host-repository fact; fallback action is already complete and the claim can become stale | `Remove` clause |
| Do not clone unrelated product scope; preserve accepted behavior unless approved | Real proportionality and user-authority boundary | `Keep` |
| No credentials, personal/customer data, production exports, services, or writes | Real privacy, security, and external-side-effect boundary | `Keep` |
| Screenshots only from validated state and after confirmation | Real evidence and approval boundary | `Keep` |
| No prototype role owns production architecture/implementation | Real shared role boundary | `Keep` |
| Requirements templates: no synthetic supported paths, architecture prescription, migration prescription, or ambiguous approval | Real grounding, ownership, and approval boundaries at the output schema | `Keep` |
| Prototype templates: optional report does not duplicate, IDs are never reused, final images follow approval, bootstrap report does not replace canonical docs | Real use-boundary, traceability, approval, and artifact-authority rules | `Keep` |
| Remaining template labels and `No` values | Data schema, not defensive instruction | `Keep` |

### Additional findings from the expanded micro pass

**Finding EXP-M1 — High — Requirements `team.md` is a second execution manual.**

Its 17-step flow, prototype decision section, artifact inventory, cumulative package, approval gate, and detailed tool lifecycle repeat the three member skills and shared reference. This is structural redundancy, not merely wordiness.

**Finding EXP-M2 — Medium — three prohibitions are impossible under the configured tools.**

- Requirements Engineer cannot call `delegate_task`.
- Prototype Bootstrapper cannot call `send_message_to`.
- Prototype Bootstrapper cannot directly message Requirements Engineer.

Positive routing already exists. These prohibitions add no safety or recovery boundary.

**Finding EXP-M3 — Medium — package-authoring commentary leaked into runtime.**

The Department folder/copy paragraph, Requirements roster-resolution explanations, named parent department, Product Prototyper's “do not restate” instruction, and shared reference's repository-template clause describe packaging rather than work execution.

**Finding EXP-M4 — Medium — result and authority rules repeat without a single local owner.**

Requirements result routing is complete under `Requirements Team Result` and then repeated under `Handoff Rules`. Approval distinctions recur multiple times in Requirements `team.md`. Consolidation can remove copies without weakening approval.

**Finding EXP-M5 — Low — some negative boundaries should become positive routes.**

Examples: treat specialist artifacts as canonical; route specialist decisions to their owners; start Software only from accepted approved requirements; use separate tasks for separate packages; submit Bootstrapper results through `submit_task_result`.

### Expanded proposed edit set

1. **Restructure — `agent-teams/software-development-department/team.md`**
   - Remove `Reference Model` and all detailed workflow/recovery/tool copies.
   - Retain purpose, members, ownership, the Requirements -> Software transition, and a pointer to the Head skill as execution owner.

2. **Update — Department Head prompt and skill**
   - Rewrite defensive ownership language positively.
   - Keep the complete task contracts, stage gates, same-task recovery, task-result review, user authority, finalization, and final-result behavior in the skill.
   - Merge independent-package wording and preserve truthful concurrency reporting.

3. **Restructure — `agent-teams/requirements-engineering-team/team.md`**
   - Remove roster mechanics and the duplicated 17-step specialist workflow.
   - Retain team purpose, coordinator, concise member ownership, conditional prototype transition, result boundary, team handoff tool-family rule, and shared-principles link.

4. **Update — Requirements Engineer skill**
   - Remove the named parent, impossible direct Bootstrapper delegation prohibition, and duplicate result bullets.
   - Keep all evidence, architecture, approval, prototype, artifact, revision, readiness, and task-result safeguards.

5. **Update — Product Prototyper skill**
   - Remove the self-referential shared-contract writing instruction and impossible architecture/implementation handoff prohibition.
   - Keep prototype selection, bootstrap lifecycle, artifact authority, user review, screenshot, validation, scope, and normal-handoff rules.

6. **Update — Prototype Bootstrapper prompt and skill**
   - Remove the repeated Purpose boundary and impossible send/direct-handoff prohibitions.
   - State the configured `submit_task_result` route positively.
   - Preserve isolation, fidelity, deterministic mocks, security, validation, and truthful blocker reporting.

7. **Update — shared prototype principles**
   - Remove only the host-repository template clause.
   - Preserve the fallback stack decision and all cross-role safety/fidelity/evidence rules.

8. **Keep unchanged**
   - Both team configs and all agent configs.
   - Requirements Engineer and Product Prototyper prompts.
   - All eleven templates and both shared-reference symlinks.
   - README's repository-level topology explanation.
   - The two caller-neutral Software Engineering edits.

### Expanded risks and validation plan

Risks:

- Compressing a team guide too far could hide the cross-member transition. Each compact guide must still name the entry coordinator, members, owners, high-level handoff, and terminal result.
- Removing a duplicated approval or task-lifecycle warning from every owner would change behavior. Each removal must be checked against the authoritative surviving rule.
- Product Prototyper's bootstrap delegation remains valid only while Prototype Bootstrapper stays in the team config; that membership is explicitly preserved.

After approval:

1. Apply the macro restructuring before the micro wording pass.
2. Run the standard validator on all four changed skills.
3. Parse configs and assert tool-to-instruction grounding, including the absence of instructions to use unavailable tools.
4. Verify every Markdown link and both prototype-principles symlinks.
5. Search runtime Markdown for sibling-folder/copy text, roster mechanics, named-parent commentary, repository-template commentary, and impossible handoff prohibitions.
6. Compare the final package against every preserved invariant above.
7. Re-run the complete negative-instruction ledger and assign `Keep`, `Rewrite`, `Remove`, or `Move` to every remaining prohibition.
8. Perform the required macro structure/behavior pass and then the micro economy/coherence pass.
9. Run `git diff --check`, JSON parsing, merge-marker, stale-name, and stale-target searches.

### Expanded analysis gate

Target skill files changed during this expanded analysis: None

Target runtime/team files changed during this expanded analysis: None

Analysis artifact updated: `.codex/artifacts/software-development-department/optimization-analysis.md`

At this gate, no authoritative file had been changed by the expanded review. The later approval and implementation are recorded below.

## Expanded cleanup implementation and validation record

Approval recorded: on 2026-08-12, the user explicitly approved the expanded cleanup and asked to return to the separate handoff-ownership discussion afterward.

### Files updated by this cleanup

- `agent-teams/software-development-department/team.md`
- `agent-teams/software-development-department/agents/head-of-software-development/agent.md`
- `agent-teams/software-development-department/agents/head-of-software-development/skills/head-of-software-development/SKILL.md`
- `agent-teams/requirements-engineering-team/team.md`
- `agent-teams/requirements-engineering-team/agents/requirements-engineer/skills/requirements-engineer/SKILL.md`
- `agent-teams/requirements-engineering-team/agents/product-prototyper/skills/requirements-prototyper/SKILL.md`
- `agent-teams/requirements-engineering-team/agents/prototype-bootstrapper/agent.md`
- `agent-teams/requirements-engineering-team/agents/prototype-bootstrapper/skills/prototype-bootstrapper/SKILL.md`
- `agent-teams/requirements-engineering-team/shared/product-prototype-principles.md`

No config, template, symlink, README, or Software Engineering file was changed as part of this expanded cleanup. Existing earlier department/topology changes remain in the working tree.

### Applied macro corrections

- Restructured Department `team.md` from a second orchestration manual into a compact purpose, member/ownership contract, high-level cross-team transition, and pointer to the Head skill as the executable owner.
- Removed the Department `Reference Model` and all runtime folder/copy commentary.
- Restructured Requirements `team.md` from a 17-step duplicate execution manual into a compact team purpose, member ownership, conditional prototype transition, result boundary, and shared communication contract.
- Removed roster-resolution mechanics, detailed artifact inventories, duplicated readiness checks, and duplicated member workflows from Requirements `team.md`.
- Preserved the actual execution spines in the authoritative member skills and the shared prototype principles.

### Applied micro corrections

- Rewrote Department ownership and independent-package defenses as positive routes.
- Replaced the Head's artifact-duplication prohibition with a positive canonical-artifact rule.
- Consolidated Requirements result routing under `Requirements Team Result` and removed its named-parent commentary and repeated final handoff bullets.
- Removed Requirements Engineer's impossible direct-Bootstrapper delegation prohibition after confirming that agent has no `delegate_task` tool.
- Removed Product Prototyper's self-referential “do not restate” instruction and unavailable architecture/implementation handoff warning.
- Rewrote Prototype Bootstrapper's prompt around positive technical-baseline ownership.
- Replaced Bootstrapper's unavailable `send_message_to` warning with its configured positive `submit_task_result` route and removed the impossible direct Requirements Engineer handoff warning.
- Removed the host-repository template clause from the shared principles while preserving the documented fallback stack.
- Retained every negative instruction that protects a plausible approval, architecture, artifact-authority, task-identity, evidence, security, privacy, workspace, destructive-change, validation, recovery, or truthful-result boundary.

### Validation results

- Standard skill validator: all four changed skills reported `Skill is valid!`.
- JSON parse: all 109 repository JSON files passed.
- Team frontmatter and member-reference resolution: Department and Requirements packages passed.
- Department topology: local Head coordinator plus the two shared peer team references passed.
- Requirements topology: Requirements Engineer, Product Prototyper, and Prototype Bootstrapper only passed.
- Collaboration-tool grounding passed:
  - Head: `delegate_task`, `review_task_result`, `submit_task_result`.
  - Requirements Engineer: `send_message_to`, `submit_task_result`.
  - Product Prototyper: `send_message_to`, `delegate_task`, `review_task_result`, `submit_task_result`.
  - Prototype Bootstrapper: `submit_task_result`; its `delegate_task` mention describes the received packet rather than an unavailable tool call.
- Affected-package Markdown links: all 19 local targets passed.
- Shared prototype-principles symlinks: both resolve to the canonical shared file.
- Stale runtime-noise search: no folder/copy defense, roster mechanics, named-parent commentary, repository-template clause, or impossible handoff prohibition remains.
- Requirements boundary search: no `software_engineering_team` or Software Development Department runtime reference remains inside Requirements Engineering.
- `git diff --check`: passed.
- Merge-marker scan: passed.
- Fresh `origin/main` fetch: branch is 0 behind and 2 commits ahead; `origin/main` remains an ancestor of the current branch.

README contains pre-existing illustrative Markdown-link examples whose paths are intentionally not root-relative live files. The affected-package link check excludes those examples; the current README change adds no Markdown link.

### Required review pass 1 — macro behavior and structure

- **Package ownership:** passed. Team guides own team identity, member boundaries, and high-level collaboration; member skills own detailed execution; the shared prototype reference owns cross-role prototype principles; configs own runtime wiring.
- **Primary flow:** passed. Department remains request -> Requirements task/review -> Software task/review -> final result. Requirements remains investigation -> conditional prototype -> integration -> explicit approval -> standalone/delegated result.
- **Behavioral invariants:** passed. Requirements approval, architecture separation, conditional prototyping, bounded bootstrap delegation, same-task review/revision, user verification, finalization, and blocker truthfulness remain represented.
- **Outputs and validation:** passed. Canonical requirements, investigation, revision, UI/UX, prototype, bootstrap, and department-result contracts remain with their owners.
- **Recovery and handoff:** passed under the currently approved mixed ownership model. The later proposal to move all handoff routing exclusively into `team.md` was not applied in this cleanup.

### Required review pass 2 — micro economy and coherence

- Every remaining negative or prohibitive instruction in the reviewed canonical files was rechecked against the expanded ledger.
- Remaining negatives close plausible and distinct boundaries; no unavailable-tool or unrequested-role warning remains.
- Department `team.md` is 27 lines, down from 56, and Requirements `team.md` is 34 lines, down from 99 before this cleanup.
- Terminology, tool names, member names, result branches, and approval qualifiers are consistent across the affected files.
- Runtime package/layout commentary is confined to repository documentation rather than normal execution instructions.

### Remaining design question

The user's subsequent proposal—make `team.md` the sole owner of every inter-member handoff while member skills own only specialist work, artifacts, classifications, and readiness—is intentionally left open for the next review. It is a separate ownership redesign, not part of this approved cleanup.
