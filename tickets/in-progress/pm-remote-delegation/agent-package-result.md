# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent` (Project Task Manager)
- Request/reference: Task autobyteus-agents-47; the user, 2026-10-21. App 1.5.8-beta.8 (cross-node delegation and discovery, autobyteus-191, 245, 247, 261).

## Change

| File | Change |
| --- | --- |
| `agents/project-task-manager/agent-config.json` | `list_available_nodes` added (only here; nothing is exposed automatically, and the user asked for the Project Task Manager) |
| `project-task-management/SKILL.md`, step 6 (one home) | **On another node.** Find the worker with `list_available_nodes` and `list_available_agents` with `node`, and delegate with `node`, the address and the Task's full description. A saved Task (`task_id`) cannot go to another node yet, so the PM sets the Task to IN_PROGRESS itself after the delegation succeeds. Use only a node and worker the user named or approved. A remote copy has only the description (no files or attachments yet, and it cannot read this node's files). It runs with its own default runtime and model and approves its own tool calls, so the PM says so before risky work and asks before sending private data. Both nodes must have registered each other; refusals go to the user as they came. Record the node in the Worker column; follow-ups go by run ID. |
| Common scenarios | One row: delegate to another node. |

## Evaluation (isolated instances, PM claude-opus-5)

Test network:
- office-old (old text) and office-new (new text) both register lab, and lab registers both back.
- office-new also registers solo, which does not register it back.
- lab offers Summary Writer (with a default runtime), No Default Helper (none), and the team Review Pair (drafter and checker, with a team default).

The same first request to both: "create a Task … Have a summary writer on one of our other nodes do it."

| | Old text | New text (final) |
| --- | --- | --- |
| Finding the node | Guessed node names with `list_available_agents` ("docker", "lab", "office-new") | `list_available_nodes`: lab available, solo unavailable |
| Delegation to the remote agent | (refused by a test-data error, fixed for the rerun) | By description on the first try; Task set IN_PROGRESS; DONE when the Summary Writer's reply came from node "lab" |

The new text's first run found a real gap. The app answered "A saved Task (task_id) can't be given to an agent on another node yet … Delegate with a description instead", and the PM recovered on its own. The rule now says so, and the rerun on the final text went straight to a description.

Further requests to the final text:

| Case | Result |
| --- | --- |
| Review Pair team on lab | `delegated: true`, team run and coordinator; the drafter's reply came from node "lab"; Task DONE |
| No Default Helper on lab | Refusal passed on as it came: "There is no default runtime configured for the target agent No Default Helper on node "lab"."; asked before rerouting |
| Any agent on solo (not registered back) | Reported that solo has not registered this node; asked before rerouting |
| solo stopped (down) | "Node "solo" could not be reached (fetch failed)."; it noticed the cause changed and refused to guess an address it could not list |

## Notes

- A running Project Task Manager session must be restarted to get the new tool and skill text.
- Other agents with `list_available_agents` (Deep Researcher, Marketing Content Creator) were not given `list_available_nodes`: the user did not ask.
