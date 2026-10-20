# LC-PT-6-prerequisite-request: Project Task Manager on the final text (trimmed follow-up intake, short prerequisite paragraph)
# AutoByteus 1.5.7-beta.4 isolated instance, claude_agent_sdk, claude-opus-5, 2026-10-20; messages 2 and 3 were sent by a stand-in Solution Designer

## message received
You received a message from the agent with sender run id "agent_package_creator_02bafa5307eb46aaab7fa6fa9e55f035".
message:
From the Solution Designer of the Software Engineering Team, working on nodeapp-1 (Jira preset). I have to stop: a prerequisite blocks this ticket. The MCP transport (src/mcp-client.js) passes headers where the MCP SDK reads requestInit.headers, so no configured header reaches any request; a probe against a real local server showed the Authorization header dropped, and our unit test passes only because it fakes the SDK. A Jira preset cannot authenticate until this is fixed, and it is the transport's functionality, not the preset's. Suggested Task: "MCP transport drops configured headers: pass them as requestInit.headers and add a test against the real SDK." Please create that Task and give it to me, so I do it first; I continue nodeapp-1 after it is done. Details are in my requirements doc's Prerequisites (PRE-001).

## tool calls
- create_task {"project_id": "project_48481dfa-ab65-4ac7-b49f-355d01ba70ae", "description": "MCP transport drops configured headers: pass them as requestInit.headers and add a test against the real SDK.\n\nProblem: in src/mcp-client.js the MCP transport passes headers at the top level, but the MCP SDK reads them from requestInit.headers. As a result no configured header reaches any request. A probe against a real local MCP server showed the Authorization header being dropped. The existing unit test passes only because it fakes the SDK, so it does not catch this.\n\nWhy it matters: any MCP server entry that needs authentication is broken today. This blocks nodeapp-1 (Jira preset for the MCP settings) \u201
- update_task {"task_id": "nodeapp-1", "depends_on": ["nodeapp-2"]}

## reply
The Solution Designer stopped `nodeapp-1` on a real blocker, and I've recorded the prerequisite.

**Created `nodeapp-2`** — "MCP transport drops configured headers: pass them as `requestInit.headers` and add a test against the real SDK." I set `nodeapp-1` to depend on it, so the app now shows the Jira preset as blocked by it. `nodeapp-1` stays open and IN_PROGRESS — the team resumes it afterwards, so there's nothing to close.

The evidence is solid enough to act on: headers passed at the top level while the SDK reads `requestInit.headers`, a probe against a real local server showing Authorization dropped, and a unit test that only passes because it fakes the SDK. Authentication for any MCP entry is broken, so this is transport work, not preset work.

**One decision for you — who gets it.** The designer asked for it itself, which is the right instinct since it has the context, but I can't hand it over: a copy works one Task at a time and `nodeapp-1` is still its current Task, and I don't have the team run ID needed to give an existing team copy new work. Closing `nodeapp-1` to free it would throw away the investigation it's standing on, which I'd rather not do.

So I propose dispatching `nodeapp-2` to a **new `/software_engineering_team` copy**, and telling the designer to stand by. May I? Nothing is dispatched until you say so.

One thing I'll pick up at dispatch: the designer's requirements doc (PRE-001) has the full detail, but it gave no path and that doc likely lives in its worktree. I'll ask it for the path and attach a copy to `nodeapp-2` so the new copy inherits the findings instead of re-probing — and so it survives the worktree being removed.
