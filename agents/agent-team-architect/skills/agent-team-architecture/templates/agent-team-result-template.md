# Agent Team Architecture Result

- Status: `Completed` / `Blocked` / `Requirement Gap` / `Design Impact`
- Operation: `create` / `update`
- Update intent: `new-package` / `<reason for update>`
- Target package: `<name and absolute or repository-relative path>`
- Scope included: `<what was in scope>`
- Scope excluded: `<what was not changed>`
- Request/reference: `<user request, requirements, or calling artifact>`

## Summary

<Short description of the architecture decision and observed outcome.>

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
- Design/requirements: `<absolute paths>`
- Validation evidence: `<absolute paths or command logs>`
- Generated package artifacts: `<absolute paths>`

## Approval state

- State: `Approved` / `Pending` / `Not required` / `Blocked`
- Evidence or decision reference: `<path or explanation>`

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | `Pass` / `Fail` / `N/A` | `<command/path>` |
| Frontmatter and names align | `Pass` / `Fail` | `<evidence>` |
| Skill names and paths resolve | `Pass` / `Fail` / `N/A` | `<evidence>` |
| Markdown links and references resolve | `Pass` / `Fail` | `<evidence>` |
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
