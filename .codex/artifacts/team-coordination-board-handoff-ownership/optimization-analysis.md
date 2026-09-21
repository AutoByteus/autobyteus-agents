# Team Coordination Board Handoff Ownership — Optimization Analysis

Review Status: Analysis complete - awaiting user approval

## User request and review scope

Analyze a stricter separation-of-concerns model for agent teams:

- each individual agent and bundled skill owns only its specialist work, required inputs, artifacts, result classifications, quality gates, and readiness conditions;
- `team.md` acts as the shared coordination board that owns every inter-member handoff, recipient choice, message/tool choice, pass notification, reroute, and task-lifecycle transition;
- when a specialist reaches a board-defined trigger, that specialist follows the matching board row and sends the result to the specified recipient.

This review covers the complete Requirements Engineering Team and Software Engineering Team packages, including their `team.md`, configs, agent prompts, nine bundled skills, shared references, and templates. It also checks repository authoring guidance and the current AutoByteus team-prompt composition path.

The Software Development Department is inspected as a neighboring boundary but is not included in the recommended first edit scope. Its Head's specialist responsibility is cross-team orchestration itself, so moving that workflow out of its skill is a separate design decision rather than a mechanical application of the specialist-team rule.

No AutoByteus runtime/product change and no `autobyteus-skills` change is proposed.

## Current package and behavior baseline

### Current ownership

| Concern | Current owners |
| --- | --- |
| Member identity and tool/skill wiring | `agent.md` and `agent-config.json` |
| Specialist execution, outputs, validation, classifications | Member `SKILL.md` and templates |
| Team identity and high-level flow | `team.md` |
| Exact handoff recipients, tools, payloads, notifications, and reroutes | Duplicated between `team.md`, member skills, some agent prompts, and some templates |
| Cross-role design and prototype principles | Team-shared references |

Both team guides already describe high-level collaboration. Software Engineering `team.md` goes further and already contains most of the forward path, pass notifications, recovery boundaries, and communication rules. The same routes then appear again in individual skills.

Across the nine member skills, the current scan found 87 lines containing collaboration tools or explicit team-member routing references and 15 route-oriented sections. This count is only an indicator; the architectural defect is competing ownership, not the exact number of matching lines.

### Runtime grounding: the coordination-board model is supported now

The current AutoByteus server composes the shared team instruction into each team member's runtime prompt:

- `autobyteus-server-ts/src/agent-team-execution/services/member-team-context-builder.ts` resolves the active team's instruction and stores it as `MemberTeamContext.teamInstruction`.
- `autobyteus-server-ts/src/agent-team-execution/services/member-run-instruction-composer.ts` composes team instruction, agent instruction, roster/tool instructions, and task-delegation protocol as distinct instruction sources.
- The Codex team bootstrap renders both `Team Instruction` and `Agent Instruction`; the Claude and AutoByteus backend paths use the same composition contract.
- The runtime also injects the current member identity, allowed recipient roster, and available task-delegation protocol.

Therefore every active member can apply a shared transition table in `team.md`. No product modification is required.

Important limitation: `team.md` is shared prompt context, not an active workflow engine or persisted board service. The current member still interprets the matching row and calls the tool. Centralizing the instructions removes policy duplication; it does not add mechanical enforcement or durable board state.

## Recommended ownership model

```text
team-config.json
  -> who exists and which tools/skills are wired

team.md
  -> who owns each stage
  -> (current member, result/trigger) -> tool -> recipient
  -> cumulative message envelope
  -> notifications, reroutes, task-result boundaries, and stop/wait behavior

agent.md
  -> identity, specialist purpose, authoritative skill, and tone

member SKILL.md
  -> inputs without sender coupling
  -> specialist procedure
  -> artifacts and result schema
  -> domain classifications
  -> validation and result-readiness conditions
  -> no teammate recipient, communication tool, or handoff sequence

templates
  -> artifact facts, evidence, result, classification, and required correction
  -> no recipient or routing field
```

The operational interface becomes:

```text
Skill produces: result + classification + evidence + artifact paths + readiness
Team board maps: current member + result -> route/tool/recipient/message envelope
Runtime supplies: current identity + allowed roster + exposed tools
```

This is the clean separation the user described. The skill determines **what has been completed and whether it is ready**. The board determines **where that result goes**.

## Preserved behavioral invariants

- No member, stage, artifact, quality gate, approval gate, notification, review, recovery path, or finalization condition is removed.
- Requirements Engineering remains responsible for evidence-grounded requirements, conditional prototyping, architecture readiness, and explicit user approval.
- Product Prototyper remains the owner of user-facing prototype review and the UI/UX package.
- Prototype Bootstrapper remains a bounded delegated task whose result is reviewed by Product Prototyper.
- Software Engineering retains the complete Architecture Designer capability and the existing architecture -> review -> implementation -> source review -> API/E2E -> proportional test review -> delivery flow.
- Architecture-review and implementation-review pass notifications remain mandatory and informational.
- Implementation or API/E2E rework still returns through the required review gates before forward progress resumes.
- Delivery success still requires explicit user verification and successful applicable finalization before the terminal package returns to Architecture Designer.
- Architecture Designer remains the only Software Engineering member that submits the delegated software-team result.
- Requirements Engineer remains the Requirements Engineering team-result submitter when that team has delegated ingress.
- Ordinary member communication remains `send_message_to`; bounded tasks retain `delegate_task`, `submit_task_result`, and `review_task_result`.
- Absolute artifact paths and the cumulative still-relevant package remain mandatory.
- Agent configs, team configs, member names, tool exposure, and source-folder topology remain unchanged.

## Macro analysis

### Finding BOARD-M1 — High — routing currently has multiple authoritative owners

Evidence:

- Software Engineering `team.md` defines the primary route, pass notifications, recovery, task boundary, and communication tools.
- All six Software Engineering skills independently define recipients, tools, payloads, no-poll rules, reroutes, or terminal return behavior.
- Requirements Engineering `team.md` defines its collaboration path and tool families, while all three member skills independently define the exact message/task routes.

Impact: changing a recipient or transition requires synchronized edits across the board, sender skill, receiver assumptions, prompt metadata, and sometimes templates. Drift can produce duplicate forwarding or contradictory ownership.

Disposition: `Restructure`. Make each `team.md` the sole routing authority and remove team-specific routing from member packages.

### Finding BOARD-M2 — High — the current team guides are already close to coordination boards

Software Engineering `team.md` already contains almost the entire route graph. Requirements Engineering `team.md` already contains its four-stage collaboration flow and communication boundary.

Impact: this is primarily an ownership and content-placement change, not a workflow redesign. The runtime behavior can remain the same while individual prompts become smaller.

Disposition: `Restructure`, not `Add` a new orchestration layer. Use compact tables in the existing team guides.

### Finding BOARD-M3 — High — routing leaks into output templates

Several templates contain `Recommended Recipient`, `Required Recipient`, `Next recipient or routing`, or fixed member names. Other templates say they must be written “before any handoff message.”

Impact: even if skill prose is cleaned up, artifacts would continue encoding a second routing map. A stale template could send a correct specialist result to the wrong member.

Disposition: `Update`. Templates retain result, classification, required correction, and evidence, but remove recipient mapping. Rewrite timing language as “before marking the stage result ready.” Artifact names such as `implementation-handoff.md` and `handoff-summary.md` remain unchanged because they are canonical domain outputs, not routing policy.

### Finding BOARD-M4 — Medium — classification and routing are unnecessarily fused

Example: Code Reviewer currently defines both what `Local Fix`, `Design Impact`, `Requirement Gap`, and `Unclear` mean and which member receives each classification.

Impact: the classification semantics belong to technical review; the recipient mapping belongs to team organization. Combining them makes the skill organization-specific.

Disposition: `Split` responsibility without adding a file. Keep classification definitions and re-entry requirements in the skill; move the classification-to-recipient map to `team.md`.

### Finding BOARD-M5 — Medium — repository authoring guidance is internally inconsistent

README currently says:

- `team.md` is the coordination contract and should contain handoff expectations;
- `SKILL.md` should contain handoff and routing rules;
- handoffs should be expressed by specialist packages rather than hidden in a large team prompt;
- elsewhere, handoffs are described as expressed through both `team.md` and specialist routing rules.

Impact: the repository does not identify one routing owner, which encourages the exact duplication under review.

Disposition: `Update` README to define the new boundary explicitly: team-specific routing belongs to `team.md`; a team-local skill owns neutral result contracts and domain classifications.

### Finding BOARD-M6 — Medium — strict centralization must not remove domain completion gates

Some current handoff bullets mix two concerns:

- routing mechanics: recipient, tool, attachments, message order, stop/wait;
- specialist readiness: review must pass, user confirmation must exist, finalization must be complete, reports must be written.

Impact: deleting entire `Handoff Rules` sections mechanically would weaken outputs and safety gates.

Disposition: `Move` routing mechanics to the board and `Rewrite` specialist readiness as `Result Contract`, `Outcome Contract`, or completion-gate language inside the skill.

### Finding BOARD-M7 — Medium — a central board is prompt-based, not enforcement-based

The runtime guarantees that members receive team instructions and roster/tool context, but it does not execute the transition table independently of the agent.

Impact: the board must be direct and executable. Each row needs an unambiguous sender/current-member condition, trigger, tool, recipient, required message delta, and post-send behavior.

Disposition: `Add` no runtime component. State at the top of each board: apply only the row whose sender is the current member and whose trigger matches the current result.

### Finding BOARD-M8 — Open boundary — Department Head is not an ordinary specialist

Inside Requirements and Software Engineering, routing is coordination around specialist skills. In Software Development Department, cross-team orchestration is the Head's actual domain responsibility.

Impact: applying the same rule to the Department would move nearly the entire Head skill into Department `team.md` and leave the skill with little independent work. That may be desirable, but it is a materially different package decision.

Disposition: `Keep` Department unchanged in the recommended first pass and surface it as a later explicit decision.

## Target coordination boards

### Software Engineering transition inventory to preserve

| Current member | Trigger/result | Tool and recipient | Required transition behavior |
| --- | --- | --- | --- |
| `architecture_designer` | Initial or revised design is review-ready | `send_message_to` -> `architecture_reviewer` | Send cumulative architecture package and current `AD-REV-*`; then stop/wait |
| `architecture_reviewer` | `Pass` | Primary `send_message_to` -> `implementation_engineer`; notification -> `architecture_designer` | Primary package first; then short informational pass notification; both must succeed |
| `architecture_reviewer` | `Fail`/`Blocked`: `Design Impact`, `Requirement Gap`, or `Unclear` | `send_message_to` -> `architecture_designer` | Send complete reviewed package and finding IDs; do not advance |
| `implementation_engineer` | Implementation result is review-ready | `send_message_to` -> `code_reviewer` | Send cumulative implementation package and current `IR-*` |
| `implementation_engineer` | `Design Impact`, `Requirement Gap`, or `Unclear` | `send_message_to` -> `architecture_designer` | Send classification and evidence |
| `implementation_engineer` | Implementation-owned `Local Fix` completed | `send_message_to` -> `code_reviewer` | Re-enter source review before API/E2E |
| `code_reviewer` | Implementation review `Pass` | Primary `send_message_to` -> `api_e2e_engineer`; notification -> `implementation_engineer` | Primary package first; then informational pass notification; both must succeed |
| `code_reviewer` | Implementation review `Fail`/`Blocked` | `send_message_to` -> classification owner | Do not advance to API/E2E |
| `api_e2e_engineer` | API/E2E `Pass` | `send_message_to` -> `code_reviewer` | Request proportional changed-test review or `Not Applicable` |
| `api_e2e_engineer` | API/E2E `Fail` | `send_message_to` -> `code_reviewer` | Request focused failure-origin review with execution evidence |
| `api_e2e_engineer` | `Blocked` on missing external dependency | User request, not inter-member handoff | Preserve evidence and request the exact missing dependency |
| `code_reviewer` | Proportional test review `Pass`/`Not Applicable` | `send_message_to` -> `delivery_engineer` | Send complete passed package |
| `code_reviewer` | Proportional test review `Fail` | `send_message_to` -> classified owner, normally `api_e2e_engineer` | Require corrected API/E2E result and proportional review again |
| `code_reviewer` | Failure-origin review completed | `send_message_to` -> classified owner | Implementation fix -> source review again; API/E2E fix -> execution/review again; design/requirement/unclear -> Architecture Designer |
| `delivery_engineer` | Implementation/packaging `Local Fix` | `send_message_to` -> `implementation_engineer` | Re-enter implementation and source review |
| `delivery_engineer` | `Design Impact`, `Requirement Gap`, or `Unclear` | `send_message_to` -> `architecture_designer` | Send delivery evidence and classification |
| `delivery_engineer` | User verified and all applicable finalization is complete | `send_message_to` -> `architecture_designer` | Send authoritative terminal cumulative package; then stop/wait |
| `architecture_designer` | Verified terminal package received | `submit_task_result` when delegated; otherwise caller response | Check terminal evidence before returning successful team result |
| `architecture_designer` | Material requirement gap | Delegated blocked result or standalone caller response | Preserve approved requirements; parent coordinates revision on the same software task |
| `architecture_designer` | Parent `request_revision` | `send_message_to` -> accountable specialist when internal work is required | Continue same task-team execution; no duplicate parent task |

The board should also own the shared envelope rule: every primary message includes result/classification, relevant revision IDs, current decision state, open risks, expected next action, and absolute paths for the cumulative still-relevant artifact package. Notification rows use the smaller notification envelope already approved.

### Requirements Engineering transition inventory to preserve

| Current member | Trigger/result | Tool and recipient | Required transition behavior |
| --- | --- | --- | --- |
| `requirements_engineer` | Focused prototype request is justified and ready | `send_message_to` -> `product_prototyper` | Send decision questions, IDs, constraints, and cumulative requirements package |
| `product_prototyper` | Prototype root absent or explicit refresh/reconciliation approved | `delegate_task` -> `prototype_bootstrapper` | Create one bounded bootstrap task and retain task ID |
| `prototype_bootstrapper` | Bootstrap `Completed` or `Blocked` | `submit_task_result` -> bound task review owner | Submit baseline evidence and absolute paths; then stop/wait |
| `product_prototyper` | Bootstrap result correctable | `review_task_result(request_revision)` on same task | Send precise task-result feedback; no duplicate task |
| `product_prototyper` | Bootstrap result accepted | `review_task_result(accept)` | Continue prototype work from the reviewed baseline |
| `product_prototyper` | Approved UI/UX package, requirement-impact finding, not-recommended finding, or blocker | `send_message_to` -> `requirements_engineer` | Send the outcome-specific evidence and cumulative package |
| `requirements_engineer` | Revised requirements are ready for another prototype round | `send_message_to` -> `product_prototyper` | Send focused changed IDs, approval state, and cumulative package |
| `requirements_engineer` | Approved architecture-ready package or terminal blocker | `submit_task_result` when delegated; otherwise caller response | Submit/return Requirements Engineering result; then stop/wait when delegated |
| `product_prototyper` | This member itself has delegated task-agent ingress | `submit_task_result` instead of normal member message | Preserve the existing conditional task-agent behavior |

User-facing approval and prototype-review conversations remain inside the responsible skills because they are specialist work, not team-member routing.

## Content architecture and logical-flow analysis

### Team board structure

Recommended execution order inside each `team.md`:

1. team purpose and entry member;
2. member responsibility table;
3. shared result/message envelope;
4. primary and recovery transition table;
5. notification rules;
6. delegated-task and standalone terminal boundary;
7. stop/wait rule.

The board should not restate how architecture is designed, how code is reviewed, how API/E2E confidence is calculated, how a prototype is built, or how delivery finalization is executed.

### Member skill structure

Recommended execution order for each skill:

1. purpose and ownership;
2. required artifact inputs, without naming the sender;
3. specialist procedure;
4. output artifacts;
5. outcome/classification semantics;
6. validation and result-readiness gate;
7. neutral stopping condition: the result package is ready for team routing.

No skill needs to say “look at the board.” The runtime already supplies `team.md` as Team Instruction. The skill only needs a clear result state that the board can match.

### Templates and shared references

- Templates retain factual `Result`, `Classification`, `Required Correction`, evidence, and revision fields.
- `Recommended Recipient`, `Required Recipient`, fixed team-member names, and `Next recipient or routing` fields are removed or rewritten as non-routing result fields.
- “Before any handoff message” becomes “before marking the stage result ready.”
- Requirements shared prototype principles retain prototype safety/fidelity rules but remove their duplicated member responsibility map; Requirements `team.md` owns that map.

## Micro analysis and instruction disposition

### Handoff-bearing instruction ledger

| Current instruction type | Positive function | Target owner | Disposition |
| --- | --- | --- | --- |
| `Use send_message_to` / target exact roster name | Select ordinary team delivery tool | `team.md` shared communication contract | `Move` |
| Named next recipient in skill operating sequence | Advance or reroute stage | `team.md` transition row | `Move` |
| `delegate_task`, `review_task_result`, `submit_task_result` circumstances | Control bounded task lifecycle | `team.md` task rows | `Move` |
| Cumulative artifact list repeated in sender skills | Define message envelope | One shared board envelope plus row-specific additions | `Merge` |
| “After handoff, stop and do not poll” | Protect asynchronous lifecycle | `team.md` shared post-send rule | `Move` |
| “Do not use Codex-native collaboration tools” | Protect tool-family/task tracking | `team.md` once per team | `Move` |
| Pass notification order and contents | Prevent duplicate forward handoff and keep originator informed | Software `team.md` notification rows | `Move` |
| “Do not advance on Fail/Blocked” | Protect review gate | Team transition trigger plus sender skill's truthful result contract | `Move` routing; `Keep` result validity |
| Classification -> member arrows | Map technical outcome to organizational owner | `team.md` classification route table | `Move` |
| Classification definitions and required re-entry checks | Define specialist result and safe recovery sequence | Member skill | `Keep`, remove recipient names |
| “Before any handoff message” | Ensure artifact exists before result leaves stage | Member skill/template result-readiness wording | `Rewrite` |
| “Recommended/Required recipient” template fields | Encode routing in artifact | Team board | `Remove` template field; keep classification/evidence |
| Architecture Designer final submit/standalone return | Team boundary transition | Software `team.md` | `Move`; skill keeps terminal-readiness criteria |
| Requirements Engineer final submit/standalone return | Team boundary transition | Requirements `team.md` | `Move`; skill keeps result-readiness criteria |
| Bootstrapper task result submission | Delegated task transition | Requirements `team.md` | `Move`; skill keeps bootstrap result contents |
| Prototype/requirements/delivery user interaction | Specialist work, not inter-member routing | Relevant member skill | `Keep` |
| Artifact names containing “handoff” | Canonical domain output name | Skill/template | `Keep` |

### Negative-instruction coverage

Every handoff-related prohibition has a disposition above. Non-routing prohibitions are not candidates for movement and remain in their authoritative specialist skill, shared domain reference, or output template. They protect distinct boundaries including:

- approved behavior and architecture ownership;
- evidence grounding and product reachability;
- reviewer independence;
- prototype scope, production-data safety, and workspace isolation;
- source/test validity and no-legacy constraints;
- user approval and user verification;
- repository finalization and external side effects;
- truthful pass, blocker, and validation claims.

No domain safeguard is proposed for removal merely because its current sentence appears near a handoff rule.

## Proposed improvements

### 1. Restructure — Software Engineering `team.md`

Update `agent-teams/software-engineering-team/team.md` into the sole Software Engineering coordination board:

- keep purpose, entry contract, member responsibility, and cumulative artifact model;
- replace narrative Primary Flow, Review Pass Notifications, Recovery, and Communication sections with the complete transition table above;
- define one shared primary-message envelope, one smaller informational-notification envelope, task-result boundaries, and the stop/wait rule;
- keep explicit re-entry paths so fixes cannot bypass source review or API/E2E review.

### 2. Restructure — all six Software Engineering skills

Update:

- `agents/architecture-designer/skills/architecture-designer/SKILL.md`
- `agents/architecture-reviewer/skills/architecture-reviewer/SKILL.md`
- `agents/implementation-engineer/skills/implementation-engineer/SKILL.md`
- `agents/code-reviewer/skills/code-reviewer/SKILL.md`
- `agents/api-e2e-engineer/skills/api-e2e-engineer/SKILL.md`
- `agents/delivery-engineer/skills/delivery-engineer/SKILL.md`

Actions:

- `Remove` every `Handoff Rules` section and organization-specific tool/recipient instruction.
- `Rewrite` named-sender inputs as neutral required artifact packages.
- `Keep` specialist procedures, outputs, quality gates, classifications, and re-entry requirements.
- `Rewrite` `Routing`, `Outcome Routing`, `Terminal Return`, and `Final Team Result` sections as neutral classification/result-readiness contracts.
- `Keep` `implementation-handoff.md` and delivery handoff artifacts as canonical output names.

### 3. Update — all six Software Engineering agent prompts

Remove descriptions and prompt sentences that say the bundled skill owns routing, notifications, terminal return, or task submission. Keep role identity, specialist purpose, skill authority, critical review stance, artifact responsibility, and tone.

### 4. Update — Software Engineering routing-bearing templates

Update the following templates where they encode recipient/routing fields or “before handoff message” timing:

- Architecture Designer: `architecture-design-revision-record-template.md`, `design-spec-template.md`, `investigation-notes-template.md`, `requirements-doc-template.md`
- Architecture Reviewer: `architecture-review-revision-record-template.md`, `design-review-report-template.md`
- Implementation Engineer: `implementation-handoff-template.md`, `implementation-revision-record-template.md`
- Code Reviewer: `code-review-report-template.md`, `code-review-revision-record-template.md`, `api-e2e-test-review-report-template.md`
- API/E2E Engineer: `api-e2e-coverage-investigation-template.md`, `api-e2e-execution-coverage-report-template.md`, `api-e2e-revision-record-template.md`
- Delivery Engineer: `docs-sync-report-template.md`, `release-deployment-report-template.md`, `delivery-revision-record-template.md`

`Remove` fixed recipient fields, `Rewrite` them as result/classification/required-correction fields when information must remain, and `Rewrite` readiness timing without changing artifact schemas otherwise.

### 5. Restructure — Requirements Engineering `team.md`

Update `agent-teams/requirements-engineering-team/team.md` into the sole Requirements Engineering coordination board:

- keep purpose, shared prototype link, and member responsibilities;
- add the normal member-message, prototype-bootstrap task, task-result review/revision, Requirements team-result, and conditional Prototyper task-agent routes above;
- define the shared cumulative package and stop/wait rules once.

### 6. Restructure — all three Requirements Engineering skills

Update:

- `agents/requirements-engineer/skills/requirements-engineer/SKILL.md`
- `agents/product-prototyper/skills/requirements-prototyper/SKILL.md`
- `agents/prototype-bootstrapper/skills/prototype-bootstrapper/SKILL.md`

Actions:

- `Remove` all team recipient, communication-tool, task-tool, and handoff sections.
- `Rewrite` operating sequences to end in observable result/readiness states rather than named sends.
- `Keep` prototype selection, bootstrap-packet content, task-result acceptance criteria, approval gates, outputs, validation, classifications, and revision behavior.
- `Rewrite` final sections as neutral result contracts.

### 7. Update — all three Requirements Engineering agent prompts

Remove prompt statements assigning handoff, delegation/review, or result-submission behavior to the bundled skills. Preserve identity, specialist purpose, skill/shared-reference authority, ownership, and tone.

### 8. Update — Requirements routing-bearing references/templates

- `shared/product-prototype-principles.md`: remove the duplicate member responsibility map; keep prototype principles.
- `requirements-revision-record-template.md`: replace recipient field with a requirements-owned next-action field.
- `product-prototype-report-template.md`: remove fixed required recipient.
- `prototype-bootstrap-report-template.md`: replace the named next-agent field with a neutral next-action/result field.

### 9. Update — repository authoring guidance

Update README's `team.md`, `SKILL.md`, authoring-practice, team-modeling, and sanity-check guidance so it consistently states:

- team-specific handoff routing belongs only in `team.md`;
- member skills produce neutral, board-routable results;
- templates record classification and correction needs, not recipients;
- configs provide the tools the board requires;
- standalone reusable skills may return a neutral result to their caller but must not embed a team-specific route.

### 10. Keep — wiring and unrelated domain content

- `Keep` both `team-config.json` files and all nine `agent-config.json` files unchanged.
- `Keep` Department files unchanged in this pass.
- `Keep` all domain procedures, quality gates, artifact names, user interactions, approval rules, review standards, delivery/finalization rules, and shared design content not related to routing.
- `Add` no coordination state file, helper script, board artifact, or runtime component.

## Assumptions, open questions, and risks

### Recommended decisions

1. Apply board-only routing to the Requirements Engineering and Software Engineering specialist teams.
2. Define “handoff” as inter-member messaging plus delegated task/result/review transitions and team-result return/submission.
3. Keep direct user clarification, prototype review, approval, verification, and external-dependency requests inside the specialist skill.
4. Keep Department Head orchestration unchanged in this first pass because orchestration is that role's primary skill, not incidental routing around another specialty.

### Open question requiring explicit decision before edits

Should the same board-only rule also apply to Software Development Department?

- **Recommended:** not in this pass. First establish and validate the pattern in the two specialist teams.
- **Alternative:** move Head task delegation/review/submission into Department `team.md`, then reduce or remove most of the Head skill. This is coherent but materially broader.

### Risks

- A large board can become noisy. Mitigation: one envelope contract plus compact tables; do not copy specialist procedures.
- A board trigger can drift from a skill's result vocabulary. Mitigation: validate every board trigger against an explicit skill outcome/classification.
- Removing sender names from input sections can make provenance less obvious. Mitigation: list the exact required artifact package; the board owns sender provenance.
- Team-local skills become intentionally routing-neutral outside their team. Mitigation: they end with a complete neutral result contract that any caller can consume.
- Mechanical removal of `Handoff Rules` could delete a completion gate. Mitigation: split each mixed rule and compare every preserved invariant after editing.
- Template recipient fields may be used for audit today. Mitigation: preserve classification, required correction, and next action while deriving the recipient from the board.

## Validation plan after approval

1. Run the standard skill validator on all nine changed skills.
2. Parse all JSON and confirm no config change occurred.
3. Validate every board sender and recipient against `team-config.json`.
4. Validate every board tool against the sender's `agent-config.json`.
5. Validate every board trigger against an outcome/classification or readiness condition defined in the sender's skill.
6. Validate that every skill result has exactly one normal board route, terminal route, user-blocked route, or local continuation.
7. Validate that all rework paths re-enter required review and validation stages.
8. Search agent prompts, skills, shared references, and templates for team-specific recipients, collaboration tools, `Handoff Rules`, `Recommended Recipient`, and `Next recipient or routing` outside `team.md`.
9. Permit only canonical artifact names such as `implementation-handoff.md` and `handoff-summary.md`, plus neutral words such as “result package,” outside the board.
10. Check every Markdown link and shared-reference symlink.
11. Compare all preserved invariants with the pre-edit baseline.
12. Perform the optimizer's macro behavior/structure pass, then its micro economy/coherence and negative-instruction pass.
13. Run `git diff --check`, merge-marker checks, and stale-route searches.

Target skill files changed during analysis: None

Target runtime/team files changed during analysis: None

Analysis artifact: `.codex/artifacts/team-coordination-board-handoff-ownership/optimization-analysis.md`

## Analysis gate

Stop here. Do not update authoritative team, agent, skill, shared-reference, template, config, or README files until the user reviews and explicitly approves this ownership plan and resolves the Department scope question.
