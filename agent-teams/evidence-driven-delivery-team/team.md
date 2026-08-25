---
name: Evidence-Driven Delivery Team
description: A canonical example of investigation, planning, micro-task execution, validation, and result-based iteration.
category: example
---

This is the canonical example team for the agent-team conventions documented in
the repository README. It models a normal human delivery loop without giving
one agent ownership of every specialist's work.

## Responsibility Boundary

- `investigator` establishes the current situation, constraints, evidence, and
  unknowns.
- `planner` turns the investigation into an ordered plan of micro-tasks with
  dependencies and explicit expectations for each task.
- `implementer` executes one ready micro-task at a time and reports what was
  actually produced.
- `validator` compares the implementation result with the planner's
  expectations and records objective validation evidence and feedback.
- `iteration_coordinator` owns the active iteration decision: dispatch the next
  ready task, request rework, request a replan, request new investigation, or
  return a complete validated ledger to Planner for closure.

No role silently takes over another role's responsibility. In particular,
Validator reports feedback rather than fixing implementation, Iteration
Coordinator dispatches work rather than implementing or rewriting the plan,
and Planner closes the plan rather than validating implementation.

## Primary Loop

```text
Investigator -> Planner -> Iteration Coordinator -> Implementer -> Validator
                              ^                    ^             |
                              |                    |             |
                  replan / close +----------------+-------------+
                              |
                         new unknown -> Investigator
```

The arrows mean:

- Planner sends the complete plan package to Iteration Coordinator.
- Iteration Coordinator sends one ready task or in-scope rework to
  Implementer.
- Validator sends each task result back to Iteration Coordinator.
- Iteration Coordinator sends a replan or complete validated ledger to
  Planner, or a newly discovered unknown to Investigator.

1. Investigator produces the current-state investigation package.
2. Planner decomposes the work into dependency-ordered micro-tasks, defines
   the expected outcome and validation conditions for each task, and sends the
   complete plan package to Iteration Coordinator.
3. Iteration Coordinator dispatches only one dependency-ready task to
   Implementer.
4. Implementer executes that task without inventing unapproved scope, and
   Validator checks the result against the task expectation, recording
   evidence and `Pass`, `Fail`, or `Blocked` feedback.
5. Iteration Coordinator consumes each result and routes the next iteration
   through the matching handoff rule:
   - next ready task or in-scope rework -> Implementer;
   - plan must change -> Planner;
   - a new unknown must be investigated -> Investigator;
   - all planned work is validated -> send the complete task ledger to Planner.
6. Planner reconciles the ledger, closes the plan, and returns the terminal
   plan result to the caller. A one-task plan follows the same loop.

## Result Contract

Every result carries the current plan or task identifier, status, durable
artifact paths, evidence, assumptions, open risks, and the next expected
action. Planner additionally records dependencies and expectations. Validator
additionally records the observed-versus-expected comparison and feedback.
Iteration Coordinator additionally records its next-step decision and the
reason for it. Planner records the complete task ledger and closure summary
when the coordinator reports that all tasks passed.

## Communication Authority

Each member completes its own skill-defined work, persists its result, and uses
`get_handoff_rules` to retrieve the applicable rules. It sends every required
handoff to the exact returned recipient with `send_message_to`, then stops. The
team config is the routing authority; the skills own the work and result
contracts.
