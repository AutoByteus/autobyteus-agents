# Middle School Mathematics Team — Package Result

- Status: `Validation in progress` — implementation exists; delivery is not yet finalized.
- Operation: `create`
- Package type: `team`
- Update intent: `new-package`
- Target package: `/home/autobyteus/workspace/autobyteus-agents/agent-teams/middle-school-mathematics-team/`
- Scope included: two local agents, two bundled skills, a shared learning standard,
  algebra/geometry starter examples, SVG diagrams, synthetic experiments and checks.
- Scope excluded: a curriculum, multi-subject organization, other subject teams,
  private packages, personal learner data, real learner trials, platform changes.
- Request/reference: Project Task Manager's 2026-10-24 delegated “Create the
  Middle School Mathematics Team”; user approved the name, public `agent-teams/`
  destination, simple initial scope, and dispatch to Agent Package Creator.

## Summary

Two members are enough for the first experiment. The **Learning Guide** owns the
learner conversation and adaptation; the **Mathematical Reviewer** independently
checks the math and teaching material. The learner is not an agent. No parent
organization or external shared-agent dependency is required.

Example: the Guide prepares a rectangle split into widths `x` and `2` with height
`3`. The Reviewer checks the relationship between the whole area and `3x + 6`,
the solution and transfer key, and that the opening leaves reasoning to the
learner. The Guide then asks the learner to explain the two areas, waits, and
uses checked hints only when needed. New or corrected mathematics is rechecked;
unchanged prompts do not need a new review on every turn.

## Ownership and design decisions

- `team.md`: purpose, audience assumptions, role boundaries, cooperation.
- `team-config.json`: exactly two team-local members, coordinator, two unique
  directed handoff pairs; no routing dependency on another Team or Org.
- Member `agent.md` and configs: identity, tools, skill attachment, post-work handoff.
- `guide-visual-math-learning`: private episode note, tutoring, review consumption,
  learner wait, evidence attribution, and next-episode decision.
- `review-visual-math`: independent mathematical check and revision-specific review.
- `shared/learning-standard.md`: one quality bar reachable through both skills.
- Guide-owned starter reference/assets: two examples, four worked/transfer keys,
  exact visuals and verbal alternatives; not a complete curriculum.
- `experiments.md`: package experiment findings and future learner-trial questions.

The existing public Classroom Simulation Team is a communication demonstration,
not this human-learning contract. The mentioned Socratic Math Team was not
selected or copied; no private teaching-package files were read or imported.
The target name did not exist in the repository or inspected server built-ins.

## Changed paths

Added:

- `agent-teams/middle-school-mathematics-team/` — complete new package (15 files
  or symlinks).
- `tickets/in-progress/create-middle-school-mathematics-team/` — this result,
  [experiments](experiments.md), [validator](validate.py), [validation log](validation.log),
  and synthetic evidence.

Modified: repository `README.md`, one discoverability row.
Moved/removed existing paths: none. No edits to other teams, `.claude/`,
`.codex/skills/`, `task-plans/`, job-team artifacts, or other repositories.

## Durable artifacts

All repository-relative paths above resolve under
`/home/autobyteus/workspace/autobyteus-agents/` after base-branch integration.
This result is
`/home/autobyteus/workspace/autobyteus-agents/tickets/in-progress/create-middle-school-mathematics-team/agent-package-result.md`.
An analysis is N/A for this new package. The request and design decisions are
recorded here and in the experiment record.

## Approval state

Implementation and public package destination: **Approved** by the delegated
request, superseding the earlier ticket-only restriction. Real learner trials,
publication of learner records, and activation in the user's running app: **not
performed or presumed authorized**. The live checks use an isolated server.

## Validation

Static checks pass: JSON/frontmatter, folder and skill bindings, exactly two
members, a valid coordinator, unique rooted routes, shared links, example keys,
SVG structure, both standard skill validators, and whitespace. The isolated app
loaded the team with no load issues and resolved all configured tool names.
Both SVG renders were inspected. See [validation.log](validation.log) and
[runtime load evidence](evidence/runtime-load.json).

Live validation and final review are recorded in [experiments.md](experiments.md).
No static script is presented as a model-behavior test. No synthetic rehearsal
is presented as evidence of human learning.

## Risks and next questions

- Model behavior is not deterministic; a checked episode is not guaranteed true.
  Two roles can share a model and repeat a correlated error. One tested model
  produced duplicate review messages; see the experiment record, not a universal
  claim of reliable behavior across models.
- Exact grade, curriculum, language preferences, and prior learner experience
  remain open. Initial prerequisites are assumptions to probe, not claims.
- Text/SVG inspection does not establish accessibility on every device.
- Private tutor notes are not access-controlled answer hiding.
- Real learner transfer, retention, benefit, and review-delay tolerance are untested.

## Next expected action

The Project Task Manager verifies the evidence and base-branch delivery before
closing the Task; this worker does not mark it DONE. Activation instructions are
in the package README. A willing learner trial and any voluntarily supplied prior
examples are the next separate participation/approval decision, not automatic work.

## Handoff state

At the time of writing, rules have not yet been retrieved and no final result
has been sent. The worker will retrieve the rules after finalization and send the
result to every matching recipient and the delegating Project Task Manager.
