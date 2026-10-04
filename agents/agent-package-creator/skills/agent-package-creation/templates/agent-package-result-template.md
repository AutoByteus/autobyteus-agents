# Agent Package Creation Result

Use [result-and-handoff-contract.md](../references/result-and-handoff-contract.md) for field meanings and classification.

- Status: `Completed` / `Blocked` / `Requirement Gap` / `Design Impact`
- Operation: `create` / `update`
- Package type: `skill` / `agent` / `team` / `org`
- Update intent: `new-package` / `<reason for update>`
- Target package: `<name and absolute or repository-relative path>`
- Scope included: `<what was in scope>`
- Scope excluded: `<what was not changed>`
- Request/reference: `<user request, requirements, or calling artifact>`

## Summary

<Short description of what was created or updated and the observed outcome.>

## Ownership and design decisions

- `<concern>`: `<canonical owner and boundary>`
- `<concern>`: `<canonical owner and boundary>`

## Changed paths

### Added

- `<absolute path>`

### Modified

- `<absolute path>`

### Moved or renamed

- `<old path>` -> `<new path>` / `None`

### Removed

- `<absolute path>` / `None`

## Durable artifacts and evidence

- Result: `<absolute path to this file>`
- Analysis: `<absolute path to agent-package-analysis.md; required for update, N/A for create>`
- Design/requirements: `<absolute paths or None>`
- Validation evidence: `<absolute paths or command logs>`
- Generated package artifacts: `<absolute paths>`

## Approval state

- State: `Approved` / `Pending` / `Not required` / `Blocked`
- Evidence or decision reference: `<path or explanation>`

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | `Pass` / `Fail` / `N/A` | `<command/path; N/A for a skill-only change with no JSON>` |
| Frontmatter and names align | `Pass` / `Fail` | `<evidence>` |
| Skill folder/frontmatter align | `Pass` / `Fail` / `N/A` | `<N/A when no skill is affected>` |
| Configured `skillNames` resolve | `Pass` / `Fail` / `N/A` | `<N/A for a standalone skill with no Agent binding>` |
| Markdown links and references resolve | `Pass` / `Fail` | `<evidence>` |
| Skill validator and changed scripts | `Pass` / `Fail` / `Not available` / `N/A` | `<observed result or limitation>` |
| Member refs, coordinator, and rooted routes | `Pass` / `Fail` / `N/A` | `<Team/Org evidence>` |
| Imported shared dependencies | `Pass` / `Fail` / `Not checked` / `N/A` | `<catalog evidence or limitation>` |
| Ownership and cross-file consistency | `Pass` / `Fail` | `<evidence>` |
| Scope/diff review | `Pass` / `Fail` | `<evidence>` |

## Risks, questions, and blockers

- `<risk, unresolved question, or None>`

## Next expected action

<What the caller or next owner should do.>

## Handoff state

- `get_handoff_rules` called: `Yes` / `No` / `Unavailable`
- Matching routes: `<summary or None>`
- Handoffs sent: `<each recipient and result, or None>`
- Caller return: `<Yes/No and reason>`
