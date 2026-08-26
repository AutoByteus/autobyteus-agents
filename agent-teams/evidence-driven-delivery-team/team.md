---
name: Evidence-Driven Delivery Team
description: A canonical example of incremental investigation, planning, micro-task execution, validation, and result-based iteration.
category: example
---

This is the canonical example team for the agent-team conventions documented in
the repository README. Planner is the coordinator and entry specialist: the
user or calling workflow sends the initial request to Planner first. It models
a normal human delivery loop without asking one agent to predict and plan an
entire product before the first useful step.

## Responsibility Boundary

- `investigator` establishes the current situation, constraints, evidence, and
  unknowns for the overall request or the next small task.
- `planner` owns incremental planning and iteration coordination. It defines
  the next small executable task, interprets feedback, requests initial or
  focused investigation when needed, and decides whether to continue, rework,
  or finish. It is the coordinator and entry specialist.
- `implementer` executes one ready micro-task at a time and reports what was
  actually produced.
- `validator` compares the implementation result with the planner's
  expectation and records objective validation evidence and feedback.

No role silently takes over another role's responsibility. In particular,
Investigator reports evidence rather than planning, Implementer executes only
the current small task, and Validator reports feedback rather than fixing the
implementation.

## Primary Loop

```text
/user -> /planner -> /implementer -> /validator
           |              ^              |
           +-> /investigator ------------+
                   |                      |
                   +------> /planner <---+
```

## Canonical Handoff Graph

| From | To | Condition |
| --- | --- | --- |
| `/investigator` | `/planner` | Initial or task-focused evidence is complete, or investigation is blocked and Planner must decide the next boundary. |
| `/planner` | `/implementer` | One small task is execution-ready, or validation feedback has produced in-scope rework. |
| `/planner` | `/investigator` | A material unknown prevents safely defining the next small task. |
| `/implementer` | `/validator` | The task and implementation-scoped checks are complete. |
| `/implementer` | `/planner` | Implementation reveals a blocker, invalid dependency, or scope/design mismatch. |
| `/validator` | `/planner` | Validation produces `Pass`, `Fail`, or `Blocked` feedback. |

The runtime entry is `/planner`, because `coordinatorMemberName` is
`planner`. The user or calling workflow does not address Investigator first.
Planner decides whether the request is clear enough for a small task or needs
initial investigation.

The graph means:

- Investigator sends initial or task-specific evidence to Planner.
- Planner sends only one small, execution-ready task to Implementer.
- Implementer sends the completed task to Validator.
- Validator sends every result back to Planner.
- Planner sends a focused investigation request to Investigator when the next
  step cannot be defined safely.

Implementer and Validator do not contact Investigator directly. They send
evidence or feedback to Planner, which owns the decision to request focused
investigation or continue implementation.

## Incremental Loop

1. Planner receives the user or calling workflow request and decides whether
   the first small task is clear enough to define directly.
2. If evidence is missing, Investigator produces the initial evidence package
   or investigates the specific question needed for the next task, then
   returns the result to Planner.
3. Planner reads the current goal, evidence, prior results, and feedback. It
   chooses direct, incremental-slice, or discovery-led planning. It defines
   only the next smallest valuable task or focused investigation question, with
   an explicit expectation, dependencies, and validation conditions.
4. Implementer executes that task without inventing unapproved scope.
5. Validator compares the actual result with the task expectation and records
   evidence-backed `Pass`, `Fail`, or `Blocked` feedback.
6. Planner consumes the result and uses the matching handoff rule:
   - in-scope rework or the next ready task -> Implementer;
   - a material unknown -> Investigator;
   - the goal is complete -> return the terminal result to the caller;
   - an unresolved blocker -> return a precise blocked result.

The plan may retain a lightweight goal and completed-task ledger, but it must
not require a speculative detailed plan for the whole product. For a large,
unclear objective, the Planner first asks Investigator the smallest question
that reduces the most important uncertainty. A one-task baseline and a large
product then follow the same loop.

## Result Contract

Every result carries the current goal or task identifier, plan revision,
status, durable artifact paths, evidence, assumptions, open risks, and the
next expected action. Planner additionally records the current small task,
its expectation, validation conditions, and the reason for the next route.
Validator additionally records the observed-versus-expected comparison and
feedback.

## Communication Authority

Each member completes its own skill-defined work, persists its result, and uses
`get_handoff_rules` to retrieve the applicable rules. It sends every required
handoff to the exact returned recipient with `send_message_to`, then stops. The
team config is the routing authority; the skills own the work and result
contracts. All team handoffs use the `send_message_to` tool.
