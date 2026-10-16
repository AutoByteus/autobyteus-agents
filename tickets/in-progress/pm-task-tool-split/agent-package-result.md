# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent`
- Update intent: `repair`: keep the Project Task Manager's task tools working across the AutoByteus `create_or_update_task` split
- Target package: Project Task Manager, `agents/project-task-manager/`
- Scope included: `agent-config.json` `toolNames`, `SKILL.md` task-tool wording, a search of every app-loaded package for the old name and for Task-closing instructions.
- Scope excluded: AutoByteus code (Task ee74d72b, done); removing the old name after the release.
- Request/reference: Project Task `project_task_b32eb64b-e62e-48f6-8079-5147a4c3ee95`; analysis `agent-package-analysis.md`

## Summary

The Project Task Manager now lists `create_task`, `update_task` and, for the transition, `create_or_update_task`. Each app version uses the names it knows and skips the others without an error:

- **Installed v1.5.4:** the shipped code gives the agent `create_or_update_task` and drops the two new names.
- **New release:** its source gives `create_task` and `update_task` and drops the old name.

Either name alone would fail in one version:

- **New names only:** no create/update tool in v1.5.4 (outside a member context).
- **Old name only:** no create/update tool in the new release.

The skill names the new tools. One note in step 5 says what each does and that an older app has the single `create_or_update_task`.

## Ownership and design decisions

- Tool selection: `agent-config.json` (`toolNames`).
- What each task tool does, and the transition: one note at the start of `SKILL.md` step 5. The other lines name the new tools only, so removing the old name later touches one config entry and one sentence.

## Changed paths

### Added

- `tickets/in-progress/pm-task-tool-split/agent-package-analysis.md`, `agent-package-result.md`
- `tickets/in-progress/pm-task-tool-split/evidence/old-app-v1.5.4-probe.txt`, `old-app-probe.mjs`, `new-release-probe.txt`

### Modified

- `agents/project-task-manager/agent-config.json`: `toolNames` adds `create_task` and `update_task` and keeps `create_or_update_task`.
- `agents/project-task-manager/skills/project-task-management/SKILL.md`:
  - step 5 has a "Task tools" note;
  - line 43 creates with `create_task`;
  - the scenarios table uses `update_task` and `create_task`.

### Removed

- None

## Approval state

- State: `Pending`: PR for the user's review. Go-ahead to do the work: user, 2026-10-16.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | Pass | `json.load` |
| Frontmatter and names align | Pass | `quick_validate.py`: valid |
| Skill folder/frontmatter align | Pass | Same |
| Configured `skillNames` resolve | Pass | Unchanged `project-task-management` |
| Markdown links and references resolve | Pass | No links changed |
| Tool names exist | Pass | New release: `create_task`, `update_task`, `create_or_update_project`, `list_projects`, `list_project_tasks` in `project-task-tool-contract.ts`. v1.5.4: `create_or_update_task` in the installed app's adapters. |
| Both versions keep task tools | Pass | Analysis evidence table; probe outputs in `evidence/` |
| Other packages using the old tool | Pass | Only this package, in `autobyteus-agents` and `autobyteus-private-agents` |
| Delegators without `update_task` told to close Tasks | Pass | The Deep Researcher and the Marketing Content Creator delegate but are not told to close Tasks |
| Final review against the standard and anti-patterns | Pass | Round 1: reworded the step 5 note, which had two colons in one sentence. Round 2: no findings. |

## Risks, questions, and blockers

- The runs exercised the shipped tool-resolution code, not a full LLM session. Confirm with one Project Task Manager action after installing the release.
- **After the release is installed (follow-up):**
  - remove `create_or_update_task` from `toolNames` and the "older AutoByteus app" sentence in step 5;
  - check the new app's server log for the "not found in registry. Skipping." warning about `create_or_update_task`, expected only on the native runtime until then.

## Next expected action

The user reviews the PR. On "approved, merge": merge, update the local checkout, and report to the PM.

## Handoff state

- `get_handoff_rules` called: at report time.
