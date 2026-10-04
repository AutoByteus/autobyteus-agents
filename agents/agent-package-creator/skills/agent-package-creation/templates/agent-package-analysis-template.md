# Agent Package Analysis

Use [result-and-handoff-contract.md](../references/result-and-handoff-contract.md) for field meanings and classification.

- Status: `Completed` / `Blocked` / `Requirement Gap` / `Design Impact`
- Operation: `analyze` / `update`
- Package type: `skill` / `agent` / `team` / `org`
- Target package: `<name and absolute path>`
- Scope included: `<files, members, and questions reviewed>`
- Scope excluded: `<what was not reviewed or will not change>`
- Request/reference: `<user request or calling artifact>`

## Baseline

| File | Current responsibility |
| --- | --- |
| `<path>` | `<what it owns now>` |

## Preserved behavior

- `<trigger, output, approval, route, or safeguard that must stay intact>`

## Findings

Include defects in existing files and behavior the request or package purpose needs but the package lacks. Order by the authoring-standard priority: structure and ownership, content flow, grounding, clarity, economy.

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | `<area>` | `<file:line or observed check>` | `<owning file>` | `<effect on behavior or readers>` | `<add / move / merge / remove / update>` |

## Recommended or planned changes

<For `analyze`: recommended changes, left unapplied. For `update`: the planned edits by file. Write `None` when the package needs no change.>

- `<path>`: `<change>`

## Open questions and approvals

- `<decision needed, assumption to confirm, approval state, or None>`

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| `<check>` | `Pass` / `Fail` / `Not run` | `<command, path, or reason>` |

## Next action

<What the user or next owner should do: for example, request an `update` that applies selected recommendations, or apply the planned changes.>

## Handoff state

<For `analyze` only; an `update` records handoff in its result file.>

- `get_handoff_rules` called: `Yes` / `No` / `Unavailable`
- Handoffs sent: `<each recipient and result, or None>`
- Caller return: `<Yes/No and reason>`
