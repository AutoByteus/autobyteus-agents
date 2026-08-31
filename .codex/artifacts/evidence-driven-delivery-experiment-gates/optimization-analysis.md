# Evidence-Driven Delivery Experiment-Gates Review

Review Status: Implemented; macro and micro consistency review passed

## User request and review scope

Analyze why the Evidence-Driven Delivery Team continued an expensive 128K
benchmark after a cheaper benchmark had already failed the practical success
criteria. Review the team package as an instruction system, with particular
attention to the Planner, Implementer, and Validator skills, their result
templates, the role prompts, `team.md`, and `team-config.json`.

The requested improvement is not to replace the incremental delivery loop. It
is to make experimental work evidence-gated: start with the cheapest useful
test, stop when that test falsifies the practical hypothesis, and unlock a
more expensive or complex experiment only after the previous gate passes.

## Current behavior and package/file ownership baseline

The package currently contains:

- `team.md`: team identity, responsibility boundaries, the canonical loop,
  handoff graph, result contract, and communication authority.
- `team-config.json`: four-member roster, `planner` coordinator, and six
  conditional rooted handoff rules.
- Each `agent.md`: a thin role prompt that points to its bundled skill and
  requires `get_handoff_rules` plus `send_message_to` after work.
- `planner/SKILL.md`: incremental planning strategies, one-current-task
  discipline, plan revision, result interpretation, and routing preparation.
- `implementer/SKILL.md`: one-task execution, implementation-scoped checks,
  actual-result reporting, and dependency/scope mismatch recovery.
- `validator/SKILL.md`: expectation-to-observation comparison, smallest
  validation surface selection, evidence, and `Pass`/`Fail`/`Blocked` feedback.
- The four role templates: investigation, plan, implementation-result, and
  validation-result schemas.

The current primary spine is:

```text
request -> Planner -> Investigator when evidence is missing
        -> Implementer for one ready task
        -> Validator for observed-versus-expected evidence
        -> Planner for rework, investigation, continuation, or completion
```

The package already has one authoritative source for recipient selection:
`team-config.json`. The role prompts and skills instruct members to call
`get_handoff_rules` and use the returned recipient address. No routing-address
change is proposed by this review.

## Preserved behavioral invariants, safety boundaries, and required outputs

1. Planner remains the coordinator and owns the next-step decision.
2. Investigator supplies evidence and unknowns; it does not plan or implement.
3. Implementer executes only the current bounded task and does not silently
   expand scope or take over validation.
4. Validator independently compares observed behavior with the Planner's
   expectation and records objective evidence.
5. Every specialist persists its role-owned result and uses the configured
   handoff rules and exact returned `recipient_address` values.
6. `team-config.json` remains the authority for inter-member routing; skills
   should not hard-code recipients.
7. A missing matching handoff can produce a terminal or blocked result for the
   caller rather than forcing another specialist to run.
8. Evidence paths, commands, assumptions, unknowns, risks, and result status
   remain durable outputs.
9. An explicit user stop or cancellation takes precedence over continuation.
10. A cheap experiment failing a practical gate must not be treated as a
    mathematical proof that no larger experiment could ever succeed. It is a
    sufficient stop decision for the current practical objective unless the
    user explicitly requests exhaustive proof.

## Macro analysis

### Package structure and ownership

**Finding M1 — High — experiment-governance ownership is missing.**

The package has clear role ownership for investigation, planning,
implementation, validation, and routing, but no file owns experiment design
controls such as hypothesis, cost budget, stopping condition, checkpoint, or
escalation eligibility. Consequently, an expensive benchmark can be described
as one Planner task and passed through the normal Implementer/Validator loop
without a separate decision gate.

**Impact:** The workflow can be structurally correct while still spending
substantial time on a path already shown to have poor practical value.

**Disposition: Add and distribute by existing ownership.** Add experiment
gate fields and policy to `planner/SKILL.md` and `plan-template.md`; add
execution enforcement to `implementer/SKILL.md` and
`implementation-result-template.md`; add gate disposition to
`validator/SKILL.md` and `validation-result-template.md`. Do not add a new
agent or state-management layer.

**Finding M2 — Medium — the package boundary is good, but the control contract
is incomplete.**

`team-config.json` correctly owns recipient conditions, while the skills own
work and result preparation. However, the handoff rule from Planner to
Implementer only requires a task to be “small enough,” dependency-ready, and
explicitly validated. It does not make “small enough” include runtime cost or
require a cheapest-first gate.

**Impact:** A task can satisfy the routing contract while violating the user's
practical constraint against wasteful escalation.

**Disposition: Keep the route graph; update the skill contract instead.** The
existing Planner-to-Implementer and Implementer-to-Planner routes are enough
to carry an experiment gate result. Add bounded resource/time expectations, a
stop condition, and an explicit next-gate unlock condition to the Planner's
task contract, but do not encode a rigid experiment ladder or extra stage
addresses in `team-config.json`.

### Content architecture and logical flow

The normal loop is coherent for ordinary micro-tasks:

```text
observe -> bound one task -> implement -> validate -> Planner decides next step
```

For experiments, the necessary sub-flow is absent:

```text
hypothesis -> cheapest discriminating test -> gate decision
           -> stop or unlock next complexity level
```

The current Planner skill has Direct Micro-Task, Incremental Slice, and
Discovery-Led strategies, but none explicitly inserts the experiment gate
before escalation. The Validator skill says to select the smallest validation
surface, but also permits broader checks when the changed boundary requires
them without saying that broader checks are locked until the prior gate passes.

**Finding M3 — High — the experiment path jumps from task execution to broad
validation without an explicit unlock decision.**

**Disposition: Add and reorder.** Put a short “experiment gate” section after
task bounding and before handoff preparation in Planner. Put a corresponding
“execution stop gate” before expensive work in Implementer and a
“gate disposition” step after observation in Validator.

### Behavioral grounding

The user's report provides direct evidence of the failure:

- baseline: 64K incomplete;
- 128K: approximately 5.96 tok/s;
- target: 20 tok/s at 150K;
- later short test: approximately 11.15 tok/s versus a 14.97 tok/s minimum;
- the team continued after cheaper evidence had already made escalation
  impractical.

The current files support incremental work, but do not state that an
experiment is a sequence of falsifiable gates. They also do not state that a
failed lower-cost gate closes higher-cost gates by default.

**Finding M4 — High — “micro-task” is defined by scope and observability, not
by expected cost or decision value.**

**Impact:** An exact 128K A/B can look bounded because it has one objective,
while remaining too expensive to be a responsible next step.

**Disposition: Update.** Define an experiment micro-task as one bounded gate
with a maximum budget, expected evidence, and a stop/escalation decision. A
full benchmark becomes a later gate, not one indivisible task.

### Outputs, validation, recovery, and handoff

The current templates capture task IDs, expectations, commands, observations,
results, risks, and continuation. They do not capture:

- hypothesis or decision question;
- cheapest discriminating test;
- pass/fail threshold and measurement tolerance;
- time/token/resource budget;
- checkpoint and abort condition;
- whether the next complexity gate is unlocked;
- whether the result is `Stop`, `Rework`, `Investigate`, or `Escalate`.

**Finding M5 — High — result artifacts cannot reliably communicate “stop
escalation.”**

`Fail` is too coarse: it can mean “fix and rerun,” “stop because the
hypothesis is falsified,” or “investigate a measurement problem.” The Planner
must infer the distinction from prose.

**Disposition: Update.** Add an explicit gate disposition and next-gate
eligibility to the Planner, Implementer, and Validator result contracts.

### Recovery and user authority

The Implementer currently returns to Planner when the task breakdown or
dependencies are invalid, but it is not explicitly authorized to stop when a
cheaper experiment has already falsified the practical hypothesis. The role
prompt says to hand off after work, but does not elevate a later user stop
signal over the current task.

**Finding M6 — High — stop authority is underspecified.**

**Disposition: Add.** Explicitly require both Planner and Implementer to stop
on a user cancellation, a triggered stop condition, a failed prerequisite
gate, or an exhausted budget. Preserve the evidence and return a planning
result rather than continuing or silently abandoning the task.

## Micro analysis

The macro package is coherent enough for sentence-level review. The main
wording problems are precision gaps rather than excessive verbosity.

### Wording and terminology

- `small enough to execute` is underspecified for benchmarks. It should mean
  small in scope **and** bounded in time, cost, resource use, and evidence
  value.
- `validation conditions` does not distinguish a required gate from a
  diagnostic observation. Use explicit `pass threshold`, `stop condition`,
  and `next gate unlock condition` terms.
- `adding broader checks when the changed boundary requires them` can be read
  as permission to run a full benchmark before a cheap gate has passed. Add
  “only after the current gate passes or when the broader check is itself the
  cheapest way to resolve the question.”
- `Continue current plan` in the Validator template is too permissive without
  a gate disposition. Replace or supplement it with an explicit decision such
  as `Stop`, `Rework`, `Investigate`, `Next Gate Unlocked`, or `Complete`.
- `If implementation invalidates the task breakdown or dependencies` misses
  invalidation by evidence, expected value, budget, or user direction.

### Redundancy and economy

The repeated universal handoff wording in the four `agent.md` prompts is a
valid runtime boundary because it keeps the role shell explicit and
consistent. It should not be duplicated wholesale in every skill. The
optimization should add only the role-specific experiment controls where they
belong.

The new experiment policy should be concise and shared through cross-references
where possible. Do not add a separate generic “benchmark manager” skill or a
large reference document for a small gate contract.

### Negative-instruction disposition

- **Keep:** “Do not create a speculative detailed plan for the entire
  product.” It protects the incremental planning boundary.
- **Keep and sharpen:** “Do not silently expand scope.” Add that running a
  higher-cost experiment is scope expansion unless the next-gate condition is
  satisfied.
- **Keep and sharpen:** “Do not force an implementation-only workaround.”
  Include triggered stop conditions and negative experiment evidence as valid
  reasons to return to Planner.
- **Add:** “Do not begin the next experiment gate until the current gate's
  unlock condition is satisfied.” This closes the exact failure branch.
- **Add:** “Do not continue after an explicit user stop or cancellation.” This
  protects user authority and external resource use.
- **Remove:** No current prohibitions should be removed solely for brevity;
  the important missing behavior is an explicit positive stop path, not more
  warnings.

## Proposed improvements

### Macro improvements

1. **Update — `planner/SKILL.md`:** Add evidence-gated experiment planning.
   Every experiment plan must define the hypothesis, cheapest discriminating
   test, measurable threshold, budget, checkpoint, stop condition, and exact
   condition that unlocks the next complexity level. Treat each rung as one
   micro-task.
2. **Update — `plan-template.md`:** Add fields for experiment mode, hypothesis,
   current gate, cheapest test, pass threshold, budget, checkpoint, stop
   condition, next-gate unlock condition, and gate disposition.
3. **Update — `implementer/SKILL.md`:** Before executing, verify the current
   gate and budget. Stop and return evidence to Planner when the gate fails,
   the budget/checkpoint is exhausted, the expected value becomes negative, or
   the user asks to stop. Do not start a higher gate merely because Planner's
   earlier wording names it.
4. **Update — `implementation-result-template.md`:** Record budget used,
   checkpoint status, triggered stop condition, gate result, and whether the
   result is ready for validation or requires Planner re-evaluation.
5. **Update — `validator/SKILL.md`:** Make validation explicitly gate-based.
   Validate the cheapest sufficient surface first, classify the result, and
   state whether the next gate is unlocked. A failed prerequisite gate closes
   higher-cost validation by default.
6. **Update — `validation-result-template.md`:** Add gate disposition and next
   gate eligibility, distinguishing `Stop`, `Rework`, `Investigate`, `Next
   Gate Unlocked`, and `Complete`.
7. **Keep — `team-config.json`:** Preserve the existing six-route graph and
   exact rooted addresses. The config should remain a routing authority rather
   than become a rigid experiment state machine.
8. **Keep — `team.md` and role prompts:** Retain the four-role separation,
   dynamic handoff authority, and existing high-level loop. No new cross-role
   experiment state or rigid team-level workflow was added; detailed controls
   remain in the owning skills and templates.

### Micro improvements

1. **Update:** Replace ambiguous “small enough” wording with “bounded in
   scope, cost, duration, and evidence objective.”
2. **Update:** Use one consistent term, `experiment gate`, for each
   cheap-to-expensive rung.
3. **Update:** Replace generic continuation fields with explicit gate
   disposition and unlock language.
4. **Keep:** Existing evidence-path, observed-versus-expected, assumption,
   unknown, and residual-risk fields; they are necessary outputs rather than
   redundancy.

## Simulation before implementation

The proposed design was simulated against the reported benchmark and several
non-benchmark task shapes.

### Scenario A — cheap benchmark gate fails

Planner classifies the work as an evidence-gated experiment and creates only
the shortest representative test. The plan records the throughput threshold,
budget, stop condition, and the requirement that a pass unlocks the next gate.
Implementer runs only that gate. Validator observes `11.15 tok/s` against a
`14.97 tok/s` minimum and records `Stop` plus `Next Gate Unlocked: No`.
Planner closes the experiment and returns the evidence. No 128K or 150K task is
created. **Result: solves the reported failure.**

### Scenario B — cheap benchmark gate passes

Validator records `Next Gate Unlocked: Yes` only when the threshold and route
correctness pass. Planner creates one next gate, not the entire remaining
benchmark. A later failure stops only the escalation path unless the result is
classified as a measurement or environment issue requiring focused
investigation. **Result: incremental escalation works.**

### Scenario C — open-ended research without experiments

Planner selects discovery-led planning, asks Investigator one focused question,
and does not require experiment budgets or benchmark ladders. **Result: the
experiment policy does not burden ordinary research.**

### Scenario D — ordinary implementation task

Planner selects a direct micro-task or incremental slice. Experiment controls
are marked `N/A`; the task still uses the normal implementation and validation
loop. **Result: the policy is conditional rather than rigid.**

### Scenario E — the short test is not a valid proxy

Planner must record why the cheap test cannot answer the decision question. It
may choose a different cheap probe or explicitly plan a larger test with a
budget and checkpoint. The design does not automatically stop every task
merely because a short test is inconvenient. **Result: avoids over-rigidity.**

### Scenario F — user says to stop or the budget is exhausted

Implementer stops the current process when possible, preserves partial
evidence, and returns a planning result. Planner does not create another
execution task without a new, explicitly justified decision. **Result: user
authority and resource limits are preserved.**

The simulation passes because the experiment-specific controls are conditional
on task shape, while the general Planner loop remains open to research,
implementation, validation, rework, and investigation tasks.

## Assumptions, open questions, and risks

### Assumptions

- The user's primary goal is practical engineering triage and avoiding wasted
  compute, not an exhaustive mathematical proof that a target is impossible.
- A short-context test is a valid screening gate for this optimization only
  when the Planner records why its result is decision-relevant to the larger
  target.
- Explicit user stop/cancellation is authoritative even if a prior Planner
  task remains incomplete.

### Open questions

- Should the default throughput threshold be a fixed absolute value, a
  percentage of the target, or a task-specific minimum improvement over the
  baseline?
- Should budget be expressed in wall-clock time, tokens, compute cost, or all
  applicable units?
- When a lower gate fails but the user explicitly requests exhaustive
  characterization, should Planner require a new approved plan with a larger
  budget rather than continue automatically?

### Risks

- An overly strict short-test gate could reject an optimization whose benefit
  appears only at longer context. The plan should require a relevance
  rationale or explicit user approval before making that exception.
- Adding the same stop policy independently to three skills could create drift.
  Keep the core gate vocabulary in the Planner plan/result contract and use
  concise role-specific enforcement in Implementer and Validator.
- Treating every low benchmark result as terminal could hide measurement,
  environment, or route-correctness problems. Those should classify as
  `Investigate` rather than silently escalating.

## Validation plan after approval

1. Parse all changed JSON and validate every configured handoff address against
   the declared four-member roster.
2. Confirm every role still has its required skill, result template, tools,
   and dynamic handoff instructions.
3. Search runtime-authored Markdown for unresolved placeholders and stale
   recipient-name instructions.
4. Review the edited package in execution order: plan -> implement -> validate
   -> gate decision -> handoff or terminal result.
5. Run a synthetic thought experiment using the reported benchmark numbers:
   confirm that a failed cheap gate produces `Stop` and no 128K/150K task is
   generated, while a passing gate unlocks only the next defined rung.
6. Perform a second macro pass for ownership/flow and a second micro pass for
   wording, redundancy, and every retained prohibition.

Target skill files changed during analysis: None

## Post-approval implementation and validation

The approved, simulated design was implemented without changing the team
roster or handoff graph. The experiment controls are conditional, so ordinary
research, implementation, validation, and content tasks can continue using
the existing planning strategies without filling benchmark-specific fields.

Files changed:

- `agent-teams/evidence-driven-delivery-team/agents/planner/skills/planner/SKILL.md`
- `agent-teams/evidence-driven-delivery-team/agents/planner/skills/planner/templates/plan-template.md`
- `agent-teams/evidence-driven-delivery-team/agents/implementer/skills/implementer/SKILL.md`
- `agent-teams/evidence-driven-delivery-team/agents/implementer/skills/implementer/templates/implementation-result-template.md`
- `agent-teams/evidence-driven-delivery-team/agents/validator/skills/validator/SKILL.md`
- `agent-teams/evidence-driven-delivery-team/agents/validator/skills/validator/templates/validation-result-template.md`

Validation performed:

- Confirmed team topology, frontmatter, bundled skill links, and JSON validity.
- Confirmed the existing six handoff rules still point only to declared team
  members; `team-config.json` was not made into an experiment state machine.
- Confirmed no unresolved runtime placeholders were introduced.
- Simulated the reported `11.15 tok/s` result against the `14.97 tok/s`
  threshold: the result produces `Stop`, leaves the next gate locked, and
  schedules no higher-cost benchmark.
- Simulated a passing gate: it unlocks exactly one next gate rather than the
  entire remaining benchmark.
- Simulated ordinary non-experiment work: experiment controls remain
  conditional and do not alter the normal micro-task loop.
- `git diff --check` passed.

Target skill files changed during implementation:
`planner/SKILL.md`, `plan-template.md`, `implementer/SKILL.md`,
`implementation-result-template.md`, `validator/SKILL.md`, and
`validation-result-template.md` under the Evidence-Driven Delivery Team.

Analysis artifact:
`.codex/artifacts/evidence-driven-delivery-experiment-gates/optimization-analysis.md`
