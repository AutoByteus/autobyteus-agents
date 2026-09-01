# Result And Handoff Contract

Use this reference with the `agent-team-architecture` skill and [agent-team-result-template.md](../templates/agent-team-result-template.md). The result is written before routing and is the source of truth for the next owner.

## Required result fields

| Field | Requirement |
| --- | --- |
| `status` | `Completed`, `Blocked`, `Requirement Gap`, `Design Impact`, or another explicitly defined truthful outcome. |
| `operation` | Exactly `create` or `update`. |
| `update_intent` | `new-package` for create; the user's concise reason for update, such as `optimize` or `repair`. |
| `target_package` | Package identity and path. |
| `scope` | What was included and excluded. |
| `request_reference` | User request, requirements artifact, or calling-package reference. |
| `summary` | Short explanation of the decision and outcome. |
| `ownership_decisions` | The canonical owner for each changed rule or concern. |
| `changed_paths` | Added, modified, moved, and removed paths, using truthful status. |
| `artifacts` | Absolute paths to the durable design, result, validation, and generated package artifacts that remain relevant. |
| `approval_state` | Approved, pending, not required, or blocked, with the evidence/reference. |
| `validation` | Checks performed, observed result, and limitations. |
| `risks_and_questions` | Residual risks, unknowns, blockers, and decisions needed. |
| `next_action` | What the recipient or caller should do next. |
| `handoff_state` | Whether rules were retrieved, which handoffs succeeded, or why the result returned to the caller. |

## Classification guidance

- Use `Completed` only when the approved create/update is applied, reconciled, and validated.
- Use `Requirement Gap` when intended behavior or acceptance criteria must be clarified.
- Use `Design Impact` when ownership, topology, or boundary design must be revised before the package can proceed.
- Use `Blocked` when an external dependency, unsafe workspace, unavailable required input/tool, or other non-local blocker prevents safe continuation.
- Use `Pass`/`Fail` for a validation sub-result only when the overall result also states the operation outcome.

These classifications describe the result. They do not create additional operation modes.

## Handoff protocol

1. Persist the complete result artifact.
2. Include absolute paths to the result and all still-relevant upstream artifacts.
3. Call `get_handoff_rules` after the result exists.
4. Apply every matching conditional rule.
5. Call `send_message_to` once for each exact returned `recipient_address`.
6. Keep the message short: identify the result path, outcome, and next action.
7. If no rule matches, return the result to the user or caller.
8. Stop after required handoffs succeed; do not poll or do the next owner's work.

The skill and result may describe the outcome and required next action, but they must not invent the recipient address. `team-config.json` or the containing runtime owns conditional recipient selection.
