# Agent Package Analysis

Use [result-and-handoff-contract.md](../references/result-and-handoff-contract.md) for field meanings and classification.

- Status: `Completed` / `Blocked` / `Requirement Gap` / `Design Impact`
- Operation: `analyze` / `update`
- Package type: `skill` / `agent` / `team` / `org`
- Target package: `<name and absolute path>`
- Scope included: `<files, members, and questions reviewed>`
- Files read in full: `<every file of the affected package, the Team or Org files, and the linked shared files, with the commit read>`
- Scope excluded: `<what was not reviewed or will not change>`
- Request/reference: `<user request or calling artifact>`

## Baseline

| File | Current responsibility |
| --- | --- |
| `<path>` | `<what it owns now>` |

## Preserved behavior

- `<trigger, output, approval, route, or safeguard that must stay intact>`

## Cause

<What produced the problem the request reports, its owner, and the fix designed for it. For a review: the question.>

## Quality check

The whole affected package as it will be with the fix in it, by the levels of [principles §4](../references/package-design-principles.md#4-apply-one-authoring-standard). Every row is filled, `Pass` with what was checked when nothing is found.

| Level | Result | Evidence | What this update does |
| --- | --- | --- | --- |
| 1. The flow | | | |
| 2. The nodes | | | |
| 3. The files | | | |
| 4. Inside each file | | | |
| 5. The lines | | | |
| Anti-patterns (detection checks run) | | | |
| Size (lines per changed file, before → after; what each added line does) | | | |

## Findings

Defects in existing files and behavior the request or package purpose needs but the package lacks, ordered by level.

| # | Level | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | `<level>` | `<file:line or observed check>` | `<owning file>` | `<effect on behavior or readers>` | `<add / move / merge / remove / update>` |

## Recommended or planned changes

<For `analyze`: recommended changes, left unapplied. For `update`: the planned edits by file, starting with the structure changes the findings call for (folders, files, names, boundaries; applied first, in their own commit). Write `None` when the package needs no change.>

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
