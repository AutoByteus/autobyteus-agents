# Result And Handoff Contract

This file defines the analysis and result fields and the handoff for [Agent Package Creation](../SKILL.md). [agent-package-analysis-template.md](../templates/agent-package-analysis-template.md) and [agent-package-result-template.md](../templates/agent-package-result-template.md) supply the formats.

The persisted file that is routed is the analysis for `analyze` and the result for `create` and `update`.

## Required analysis fields

An analysis is written for `analyze` and before editing in `update`.

| Field | Requirement |
| --- | --- |
| `status` | Same values as the result `status`. |
| `operation` | `analyze` or `update`. |
| `package_type`, `target_package`, `scope`, `request_reference` | As defined for the result. |
| `baseline` | Each file read in full and what it currently owns, including linked shared files. |
| `preserved_behavior` | Triggers, outputs, approvals, routes, and safeguards that must stay intact. |
| `findings` | Each defect, missing behavior, or risk with evidence (file and line or observed check), owning file, impact, and recommended change, ordered by the authoring-standard priority. |
| `changes` | Recommended (unapplied) changes for `analyze`; planned edits by file for `update`; `None` when no change is needed. |
| `open_questions` | Decisions, assumptions to confirm, and approval state. |
| `checks` | Read-only checks run, observed result, and limitations. |
| `next_action` | What the user or next owner should do. |
| `handoff_state` | For `analyze` only, as defined for the result. |

## Required result fields

| Field | Requirement |
| --- | --- |
| `status` | `Completed`, `Blocked`, `Requirement Gap`, `Design Impact`, or another explicitly defined truthful outcome. |
| `operation` | Exactly `create` or `update`. |
| `package_type` | `skill`, `agent`, `team`, or `org`. Report the requested top-level target; list nested definitions under changed paths. |
| `update_intent` | `new-package` for create; the user's concise reason for update, such as `optimize` or `repair`. |
| `target_package` | Package identity and path. |
| `scope` | What was included and excluded. |
| `request_reference` | User request, requirements artifact, or calling-package reference. |
| `summary` | Short explanation of the decision and outcome. |
| `ownership_decisions` | The canonical owner for each changed rule or concern, including standalone versus bundled skill ownership. |
| `changed_paths` | Added, modified, moved, and removed paths, using truthful status. |
| `artifacts` | Absolute paths to the durable analysis (required for `update`), design, result, validation, and generated package artifacts that remain relevant. |
| `approval_state` | Approved, pending, not required, or blocked, with the evidence/reference. |
| `validation` | Checks performed, observed result, and limitations; mark irrelevant type-specific checks `N/A`. |
| `risks_and_questions` | Residual risks, unknowns, blockers, and decisions needed. |
| `next_action` | What the recipient or caller should do next. |
| `handoff_state` | Whether rules were retrieved, which handoffs succeeded, or why the result returned to the caller. |

## Classification guidance

- Use `Completed` for create/update only when the approved change is applied, reconciled, and validated. For `analyze`, use it when the analysis covers the requested scope with evidence; recommended changes remain unapplied.
- Use `Requirement Gap` when intended behavior or acceptance criteria must be clarified.
- Use `Design Impact` when ownership, topology, or boundary design must be revised before the package can proceed.
- Use `Blocked` when an external dependency, unsafe workspace, unavailable required input/tool, or other non-local blocker prevents safe continuation.
- Use `Pass`/`Fail` for a validation sub-result only when the overall result also states the operation outcome.

## Handoff

The agent's post-work transition (`agent.md`) retrieves the handoff rules, sends to every matching recipient, and stops. For each handoff:

- Persist the complete analysis or result before calling `get_handoff_rules`.
- Keep the message short: the result's absolute path, the outcome, and the next action, plus the absolute paths of the upstream artifacts the recipient needs for its next step.
- If the user explicitly asked to involve an agent or team, send the result to it as described in [package-design-principles.md](package-design-principles.md#6-design-team-coordination-and-routing), whether or not a rule matches.
- Never invent a recipient address; the containing Team or Org configuration or the runtime selects recipients. Do not poll a recipient or do the next owner's work.
