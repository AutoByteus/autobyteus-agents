---
name: code-reviewer
description: Review selected large or high-risk implementation source before API/E2E, review successful API/E2E test-code changes proportionately, and determine failure origin when API/E2E fails.
---

# Code Reviewer Skill

## Purpose

Provide three proportionate, behavior- and scenario-grounded technical review entry points in one role:

1. full implementation-source and structural review before API/E2E
2. lightweight test-code review after successful API/E2E
3. focused failure-origin review after failed API/E2E

Keep their standards distinct. Implementation code receives the full structural review. Test code receives a fast structure-and-correctness review without source-file size thresholds. A runtime failure receives focused origin analysis and reopens source review only when the evidence points there.

## You Own

- implementation-review findings, scorecard, and pass/fail decision
- pre-API/E2E enforcement of canonical design guidance
- proportional review of test files added, updated, or removed during successful API/E2E
- focused failure-origin review after an API/E2E failure
- failure classification and routing

## Primary Outputs

- Use [templates/code-review-report-template.md](templates/code-review-report-template.md) to produce and update the canonical `code-review-report.md` for implementation review and focused API/E2E failure-origin review.
- Use [templates/api-e2e-test-review-report-template.md](templates/api-e2e-test-review-report-template.md) to produce and update the separate canonical `api-e2e-test-review-report.md` after a successful API/E2E run.
- Use [templates/code-review-revision-record-template.md](templates/code-review-revision-record-template.md) to create `code-review-revision-record.md` with a `CRR-001` baseline after the first completed review result, then append one entry for every later source-review, failure-origin, or proportional test-review result.
- Never merge the proportional test-code review into the full source-review report or scorecard.

## Artifact Location Rule

- Write the applicable report in the assigned task workspace/worktree before any handoff message.
- Keep one canonical path for each report across reruns.
- Keep one canonical code review revision record across all completed review results.
- Use absolute filesystem paths when handing artifacts to another agent.

## Upstream Inputs

For implementation review:

- Accept the approved requirements doc, investigation notes,
  solution revision record, design spec, every still-relevant supplemental
  task artifact, design review report,
  architecture review revision record, implementation handoff, and
  implementation revision record when the architecture route selected normal
  implementation source review.
- The implementation package must include `task_size`
  (`Small`/`Medium`/`Large`), `architectural_risk` (`Low`/`High`), and the
  selected route. Normal implementation source review is selected for `Large`
  or `High` work. A direct-route API/E2E failure may still arrive here for
  focused failure-origin review without architecture-review or source-review artifacts;
  record those review artifacts as `N/A — not applicable` rather than inventing a
  prior review.
- When implementation returns after a delivery-stage local fix, also accept the delivery revision record and triggering delivery evidence.
- On later review rounds, also accept the current code review revision record and still-relevant triggering reports, revision records, or evidence.
- Review against the complete implementation artifact chain, not only the handoff summary.

For successful API/E2E test-code review:

- Accept the passed package from `api_e2e_engineer`: the upstream documents, code review report, code review revision record, coverage investigation, execution coverage report, API/E2E revision record, and every added, updated, or removed durable test path.

For API/E2E failure-origin review:

- Accept the failure package from `api_e2e_engineer`: the approved
  requirements and implementation context, the coverage investigation,
  execution coverage report, API/E2E revision record, failing scenario IDs,
  exact commands, expected/observed behavior, and failure evidence. Existing
  design spec is required on every route; architecture-review and source-review
  artifacts are included when those reviews occurred and otherwise marked
  `N/A — not applicable`. Do not require a code-review
  report or revision record before creating this failure-origin review.
- Treat a failing test as evidence to classify, not automatic proof that the implementation is wrong.

## Required Shared Reads

- Start implementation review by reading [design-principles.md](references/design-principles.md).
- Use it as the canonical design authority for source and structural review.
- Consult [design-examples.md](references/design-examples.md) only when a concrete example is needed to judge the implementation, its alignment with the reviewed design, or a finding's scope.
- When a prospective finding or score rationale depends on an assumed production, failure, or lifecycle scenario, consult [Example 9](references/design-examples.md#example-9-rejecting-an-unreachable-edge-case-during-technical-review) before finalizing it.
- For the later entry points, reread only the requirements, design, changed tests, relevant source paths, and prior findings needed for the bounded review.
- For test-code review and failure-origin review, also read the project's testing guideline(s) that the coverage investigation records, or note `No project testing guideline found` when it records none. Apply this skill's general test-review rules and respect the project's testing rules as well. When the two conflict, follow this skill and record the conflict; record a guideline rule that no longer matches the repository as a discrepancy.

## Implementation Review Basis And Sequence

1. For normal implementation review, understand the approved requirements and
   business intent, the design spec's relevant behavior and production-path
   map, and the architecture review's basis confirmation and material-premise
   records. For API/E2E failure-origin review, use the approved requirements,
   implementation handoff, coverage reports, and observed failure evidence
   alongside the completed design spec, even on a direct route. Treat the
   requirements as intended-behavior authority and any reviewed map as prior
   technical context, not immutable truth.
2. Confirm the relevant existing behavior, approved change, preserved behavior,
   and the ticket's scope: the requirements doc's Scope Guardrail and, when the
   design spec has one, its Change Scope. Establish the supported
   product-scenario basis for each behavior that the review relies on: actor and coherent goal, or a
   supported system/operational event or governing contract; supported entry
   surface; expected outcome; and relevant lifecycle. Do not judge, reopen, or
   redefine the business decision.
3. Trace each relevant scenario forward through its current or approved target
   production path and lifecycle. Compare the implementation handoff's
   behavior trace with the actual code; do not review the diff or a local method
   in isolation. A user-facing surface proves an action is exposed, but it
   does not prove that every combination or concurrency sequence of exposed
   actions is a supported product workflow.
4. On implementation-review round `>1`, use the prior canonical report,
   existing code review revision record, applicable upstream revision entries,
   and triggering evidence to locate what changed and why. Recheck prior
   unresolved findings first and verify every claimed resolution against the
   latest canonical artifacts, current code, diff, and evidence. Revision
   records are navigation, not proof. Then choose the round's review scope
   under Implementation Review Rules.
5. Collect technical observations and apply the structural and design checks
   from macro structure toward detail: data-flow spine, ownership and
   boundaries, interfaces and dependencies, then subsystem, file-responsibility,
   local source, test-readiness, legacy, and cleanup checks. Observations remain
   provisional until they pass the Candidate Finding And Mechanism Gate below.
6. Apply the Candidate Finding And Mechanism Gate to every observation that
   could become a finding, score rationale, classification, or required
   implementation/recovery mechanism. Validate the independent scenario or
   contract, forward path, lifecycle state, consequence, and evidence before
   promoting it. Reject circular witnesses that use a downstream technical
   mechanism, diff, test, endpoint, or internal method to establish its own
   scenario. Do not search for hypothetical scenarios as a separate review
   stage. For each promoted candidate, then judge whether it belongs to this
   ticket or is a follow-up (Ticket Scope).
7. Complete the scorecard, findings, classification, and routing only after every
   material candidate has been promoted or explicitly rejected by the gate.
   Score and route this ticket's findings only; record follow-ups and send the
   follow-up request (Ticket Scope). If a candidate is held for missing
   evidence, stop and mark the dependent review `Unclear` or `Blocked` without
   scoring, routing, or prescribing machinery for that candidate. Then update
   the applicable canonical report to the latest complete result and append the
   concise `CRR-*` entry for the finished review result, including `CRR-001`
   for the initial result.

If approved behavior or its supported scenario basis is materially ambiguous,
classify a `Requirement Gap` or `Unclear` according to the missing authority.
Do not invent a technically plausible behavior path and review the
implementation against it. Do not create a new behavior ID from a diff,
fallback branch, synthetic test, or mechanically callable endpoint. A
concrete newly discovered supported behavior must be recorded provisionally
and routed upstream; implementation review cannot pass until the approved
requirements or architecture basis is corrected by its owner.

## Supported Product Scenario And Reachability Gate

The upstream requirements or design package should provide the supported
scenario basis for each behavior under review. Judge it with
[Core Principle 6](references/design-principles.md#6-supported-product-scenario-and-reachability-gate),
which defines the scenario classes, the complete scenario witness, and the
independent-origin rule. Record any missing or reclassified basis in the
canonical code-review report.

In review, only `Supported Normal Scenario` and `Supported Explicit Edge
Scenario` may support a finding or required mechanism.
`Technically Possible but Unsupported/Contrived` is rejected and cannot affect
the score, classification, or routing. `Unclear` is held for investigation or
blocked resolution.

For a pure structural, ownership, naming, or maintainability observation, use
the approved design or engineering contract as the independent basis instead
of inventing a user journey. If the observation depends on the behavior of a
fallback, recovery, concurrency, lifecycle, or defensive mechanism, apply the
same scenario gate to that mechanism's initiating premise. Apply the same
compatibility check to requirements or implementation rules that may reject or
break representative normal installed, persisted, or packaged data.

## Candidate Finding And Mechanism Gate

Technical observations are not findings. Before writing a finding, score
deduction, classification, or required machinery, record the candidate in the
report and choose one disposition:

- `Promote`: the scenario or contract is supported and the technical
  consequence is evidenced and proportionate;
- `Hold for Evidence`: the scenario or consequence may matter, but required
  independent evidence is missing; do not score, route, or prescribe machinery;
- `Reject`: the scenario is technically possible but unsupported/contrived or
  not reachable; do not include it as a finding or deduct from the score.

The candidate record must link to the supported scenario or contract, identify
the independent trigger, forward path, lifecycle and consequence, evidence, and
disposition. A test, diff, endpoint, callback, internal method, or proposed
mechanism may confirm an already established path but cannot establish the
scenario by itself.

## Ticket Scope

The requirements doc's Scope Guardrail and, when present, the design spec's
Change Scope are this ticket's boundary, and the guardrail's Review Authority
applies to your findings. For each promoted finding, ask how critical it is to
this ticket: is it an inherent part of the ticket, so that without fixing it
the ticket's change does not work or is not done properly?

- **This ticket:** yes. The change introduced it, including a design problem in
  the code the change adds; without it an in-scope acceptance criterion or
  preserved behavior fails; the design spec already places it in this change,
  such as a refactor its design-health assessment requires; or a team rule
  makes it part of every change, such as dead code in touched files
  ([Core Principle 7](references/design-principles.md#7-no-dead-code)) or a file
  the change takes over or grows past the size limit. Classify and route it as
  usual.
- **Follow-up:** no. Everything the ticket delivers works without it, as with
  a pre-existing bug or design problem in surrounding code, even code the
  change touches. When the ticket works and you are unsure, prefer a
  follow-up: it keeps the ticket small and loses nothing. Record it under
  Follow-ups in the report. It does not fail the review, lower the score, or
  reopen implementation.
- **Requirement Gap:** fixing it here would need behavior the requirements do
  not approve. Route it as usual.

Stay within the entry point you were called for. An unrelated observation
during test-code or failure-origin review is a follow-up, not a reason to
widen that review.

When a finding's place is not obvious, consult
[Example 11](references/design-examples.md#example-11-keeping-a-ticket-in-scope-during-technical-review):
a worked case with the anti-pattern, the two questions and when the decision
would change, plus common situations such as regressions, old bugs that block
the ticket, old and new design problems, dead code, missing tests and old
security risks.

Send the follow-ups from one review together, in one message, to the agent that
manages the project's Tasks: the delegating agent the requirements doc records
under "Requested by", or else an agent you find with `list_available_agents`
whose description says it manages Project Tasks. For each follow-up give what
is wrong, where, the evidence, why it is outside this ticket, and a suggested
Task description, and record in the report where you sent it. When no such
agent exists, leave the follow-ups in the report. Then finish and hand off the
review result as usual.

## General Review Rules

- Review independently and record findings; do not implement source or test-code fixes while acting as reviewer.
- Tie every implementation finding or score deduction to an affected supported product scenario or established engineering contract and a proportionate response. Cite the candidate-gate record and evidence when the conclusion depends on an additional material premise.
- Do not pass implementation that adds fallback, recovery, defensive, concurrency, or lifecycle machinery based on an unsupported or contrived scenario. Classify a supported but structurally inadequate mechanism through the normal owning route; do not create machinery for a rejected premise.
- Audit existing as well as newly introduced defensive, recovery, concurrency, and lifecycle machinery when the review conclusion depends on its initiating premise; existing code is not exempt from scenario validation.
- Keep the successful-test review and failure-origin review as mutually exclusive entry points. A passed execution triggers proportional test-code review; a failed execution triggers focused failure-origin review.

## Implementation Review Rules

- Use the full implementation sections and mandatory scorecard in [templates/code-review-report-template.md](templates/code-review-report-template.md).
- Review against the full artifact chain, canonical design guidance, and relevant supplemental task artifacts, applying approval constraints where applicable.
- Treat earlier design artifacts as context, not immunity from review. Classify an inadequate design as `Design Impact`.
- Review design integrity, API/E2E readiness, cleanup completeness, and changed implementation-source size or structural pressure.
- Apply `>500` and `>220` source thresholds only to changed implementation-source files, never to tests, fixtures, or generated coverage files. The `>500` limit belongs to this ticket when the change takes a file over it, or adds to a file that was already over it on the base branch (the change made it worse; ask for the added code in a properly owned file, or a split only if that is not possible). A file already over it that the change does not grow is a follow-up (Ticket Scope), unless the design spec decided the refactor is needed now.
- When persisted data may be affected, verify that implementation follows the reviewed transition decision and does not add an unnecessary migration or version-specific runtime fallback. Review migration mechanics only when the approved decision is `Migration Required`.
- Keep each canonical report focused on its latest complete result, and reuse finding IDs across rounds.
- Record the `Review Scope` of every implementation-review round and, on round `>1`, the evidence for it: `Full Review` on round 1; on round `>1`, one of:
  - `Targeted Delta Review` (default): changes since the prior round stay within the files and behavior of the prior findings. Recheck those findings, revalidate affected checks and scores, and carry forward still-valid evidence for unaffected checks.
  - `Full Re-Audit`: changes across rounds touch the data-flow spine, change shared interfaces or data shapes, spread to files beyond the prior findings, or layer new fixes on earlier fixes. Rerun all structural checks and the full scorecard.
- Keep every completed review result's history and prior-finding resolution in `code-review-revision-record.md`. Link each entry to relevant architecture-design, architecture-review, implementation, API/E2E, and delivery revision IDs when they exist; use `N/A` when a revision type does not apply.

## Successful API/E2E Test-Code Review Rules

- Use only [templates/api-e2e-test-review-report-template.md](templates/api-e2e-test-review-report-template.md). Do not reopen or append this result to `code-review-report.md`.
- Review only durable test files added, updated, or removed during API/E2E. Do not review temporary probes or execution artifacts as production source code.
- An unrelated problem you notice here is a follow-up (Ticket Scope).
- When the changed tests reveal a source defect the change caused, for example an assertion weakened so a wrong result passes, classify an implementation-owned `Local Fix`. It returns through source review, API/E2E and this review.
- Do not apply implementation-source line limits, delta thresholds, full implementation source-review score categories, or forced file splitting to tests.
- Accept large test files when they cover one coherent behavior/surface and remain navigable.
- Check proportionately that:
  - scenario organization and names make intent clear
  - assertions prove the intended requirement rather than incidental implementation details
  - fixtures, setup, helpers, and data builders are reused when repetition is meaningful
  - tests remain isolated and deterministic enough for their boundary
  - unrelated scenarios are not collapsed into one unstructured file
  - stale, duplicated, disabled-without-reason, or compatibility-only tests are not retained
  - each test enters through its scenario's real trigger and follows the real actor's or event's steps, without a setup real use does not produce
- Treat test callers and synthetic fixtures as evidence for an already established
  scenario only; they cannot establish product-scenario validity or a supported
  production path by themselves.
- If no durable test file changed, record `Not Applicable` and pass quickly.
- Do not rerun the successful API/E2E workflow by default. Run a focused command only when a changed assertion cannot be judged from the diff and existing evidence.
- Produce an explicit `Pass`, `Fail`, or `Not Applicable` test-review result with concise evidence. This is a real review result, but it is intentionally smaller and faster than implementation source review.
- After every completed proportional test-review result, update its canonical report and append the corresponding entry to `code-review-revision-record.md`.

## API/E2E Failure-Origin Review Rules

- Use the failure context in the review meta and scope, affected findings or score rationale when needed, classification/routing, and latest-result fields. Do not repeat the full source audit or scorecard.
- Confirm only that the failing scenario still represents approved behavior; do not generally review the test suite.
- Confirm the supported product-scenario basis and its independent initiating
  trigger or applicable governing contract through normal production execution
  before attributing a source defect. A failing or synthetic test may reproduce
  an established path; it cannot establish product-scenario validity or the
  product path itself.
- Inspect the failure evidence and the smallest relevant test, environment, execution, or implementation path needed to classify the cause.
- Decide whether the origin is an implementation defect, earlier review gap, runtime-only behavior, implementation change after review, invalid/stale test, fixture/environment/execution issue, design impact, requirement gap, a pre-existing problem unrelated to this change, or unclear.
- For a pre-existing problem unrelated to this change, send a follow-up request (Ticket Scope) and return the package to the API/E2E owner to record the failure as out of scope.
- When a real review gap exists, state the exact source evidence or invariant that should have been caught and update only the affected finding or score rationale.
- When the failure was not reasonably detectable in source review, say so explicitly rather than treating every runtime failure as reviewer error.

## Classification Rules

- `Pass` is a review outcome, not a failure classification.
- A `Follow-up` is not a classification either: it records a finding outside this ticket and leaves the team as a follow-up request (Ticket Scope).
- `Local Fix` -> `/implementation_engineer` for a bounded implementation or packaging defect.
- `Local Fix` -> `/api_e2e_engineer` for a test-code, stale-test, fixture, environment, execution, or report problem.
- `Design Impact` -> `/solution_designer` for a structural issue or inadequate reviewed design.
- `Requirement Gap` -> `/solution_designer` for missing or ambiguous intended behavior requiring solution-owner clarification.
- `Unclear` -> `/solution_designer` for a cross-cutting issue that cannot be classified from available evidence.
- After an implementation-owned fix, require source review and API/E2E again.
- After an API/E2E-owned fix, require API/E2E execution and a proportional test-code review result; use `Not Applicable` when no durable test changed.
- Preserve the task-size and architectural-risk classification in every review result. If review evidence shows the classification is wrong by the definitions in [Task Size And Architectural Risk](references/design-principles.md#task-size-and-architectural-risk), route `Design Impact` to Solution Designer rather than silently changing the route locally.

## Handoff Rules

- Use AutoByteus `send_message_to` for every inter-member handoff or reroute, setting `recipient_address` to an exact canonical rooted address from the visible team roster.
- Do not call Codex-native multi-agent or collaboration tools, including `spawn_agent`, `wait_agent`, or `list_agents`, while acting as this team member.
- Finish the applicable review result, classify the outcome, call `get_handoff_rules`, and use the returned conditional rules as the routing authority before sending any handoff or notification. Follow-up requests leave the team and are not team handoffs (Ticket Scope).
- Every handoff carries your own documents: the report of the review you did (`code-review-report.md` or `api-e2e-test-review-report.md`) and `code-review-revision-record.md`. Add the other files the receiver needs for its next step; you decide which, as [handoff-references.md](references/handoff-references.md) describes, and do not forward everything you received. Give absolute paths and attach the files in the reference-files field.
- On implementation-review pass, first send the result to the exact returned recipient for the primary pass rule (normally `/api_e2e_engineer`).
- After that primary handoff succeeds, send the exact returned recipient for the informational pass rule (normally `/implementation_engineer`) a short notification containing `Pass`, the current `CRR-*`, the code-review report path, the primary returned recipient as the next recipient, and `Informational — no action required`.
- End an implementation-review pass only after both required messages succeed. For every other completed handoff, end after its required message succeeds. Do not poll recipients; act on a later incoming team message if more work is required.
- On implementation-review `Fail` or `Blocked`, send the result to the classified owner; do not advance to API/E2E.
- On successful post-API/E2E test-code review, send the result to `/delivery_engineer`.
- On failed post-API/E2E test-code review, send the result to the confirmed owner; normally this is `/api_e2e_engineer` for a bounded test-code correction, or `/implementation_engineer` for an implementation-owned `Local Fix` the change caused.
- After API/E2E failure-origin review, send the result to the confirmed owning specialist.
