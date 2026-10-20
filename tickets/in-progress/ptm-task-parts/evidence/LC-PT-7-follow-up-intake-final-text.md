# LC-PT-7-follow-up-intake-final-text: Project Task Manager on the final text (trimmed follow-up intake, short prerequisite paragraph)
# AutoByteus 1.5.7-beta.4 isolated instance, claude_agent_sdk, claude-opus-5, 2026-10-20; messages 2 and 3 were sent by a stand-in Solution Designer

## message received
You received a message from the agent with sender run id "agent_package_creator_02bafa5307eb46aaab7fa6fa9e55f035".
message:
Ticket nodeapp-1 (Jira preset) is finalized and verified: Terminal. Delivered on main; the delivery receipt checked out. Follow-ups found outside the ticket (follow-ups.md attached; it lives in our worktree, which will be removed):
- FU-001 (URGENT, security): the MCP gateway exposes credentialed tools without a token check (src/gateway.js:40-58). Outside: gateway is out of scope. Suggested Task: require a token on the gateway's tool endpoints.
- FU-002: the mcps.json loader ignores unknown keys silently (src/config.js:12). Outside: loader behavior. Suggested Task: warn about unknown keys in mcps.json.

Reference files:
- /tmp/ptm-live2/team-wt/tickets/done/jira-preset/follow-ups.md

## tool calls
- create_task {"project_id": "project_48481dfa-ab65-4ac7-b49f-355d01ba70ae", "description": "Require a token on the MCP gateway's tool endpoints.\n\nProblem (security, urgent): the MCP gateway exposes credentialed tools without any token check. There is no auth middleware on the `/tools` endpoints at src/gateway.js:40-58, so callers can reach tools that carry credentials without authenticating.\n\nWhy it matters: credentialed tools are reachable by anyone who can reach the gateway. This was raised as urgent by the Software Engineering Team's code reviewer.\n\nWhat done looks like: the gateway's tool endpoints require a valid token and reject requests without one, covered by a test that would catch the end
- create_task {"project_id": "project_48481dfa-ab65-4ac7-b49f-355d01ba70ae", "description": "Warn about unknown keys in mcps.json.\n\nProblem: the mcps.json loader silently ignores keys it does not recognise (src/config.js:12). A typo or an outdated key in a user's MCP configuration is accepted without any signal, so the setting simply never takes effect and the user has no way to tell why.\n\nWhat done looks like: loading an mcps.json that contains unknown keys produces a clear warning naming the offending keys, while still loading the valid configuration.\n\nFound by the implementation engineer (implementation-handoff.md) while delivering nodeapp-1 (Jira preset); reported as FU-002 and outside that tick
- send_message_to {"target_agent_run_id": "agent_package_creator_02bafa5307eb46aaab7fa6fa9e55f035", "content": "Thanks \u2014 the follow-ups are safe: I copied follow-ups.md out of your worktree to /tmp/ptm-live2/pm/repo/task-plans/evidence/nodeapp-1/follow-ups.md and recorded both as Project Tasks, FU-001 as nodeapp-3 (gateway token check, flagged urgent to the user) and FU-002 as nodeapp-4 (warn on unknown mcps.json keys). Neither is yours to carry further.\n\nI am holding nodeapp-1 open, because two things in your report do not line up with what I can see. Please clear both up.\n\n1. The prerequisite. Your previous message said you had to stop: the MCP transport passes headers where the SDK reads requestIn

## reply
The team reports `nodeapp-1` done. **I have not closed it**, because two things don't add up.

**First — a security follow-up you should see now.** FU-001: the MCP gateway exposes credentialed tools with no token check — no auth middleware on `/tools` at `src/gateway.js:40-58`. Anyone who can reach the gateway can reach tools carrying credentials. Their own code reviewer flagged it urgent. It's recorded as **`nodeapp-3`**.

**Why `nodeapp-1` is still open:**

1. **The prerequisite was never done.** Last message: the preset "cannot authenticate until this is fixed." `nodeapp-2` is still TODO, never dispatched to anyone. Yet the ticket came back finalized and verified. Either they fixed the transport inside the ticket, or the preset ships unable to authenticate — which wouldn't meet what done looks like.
2. **The delivery claim doesn't check out where I can check it.** "Delivered on main" — but `main` in the Project workspace `/tmp/ptm-live2/pm/repo` has one commit (`init`) and only `README.md`. No `src/` at all; none of the cited files exist there. I searched `/tmp/ptm-live2` and that's the only git repo.

I've asked the coordinator for both answers plus the delivering repo path and commit SHA, and told it not to tear down its worktree yet. I'm not treating this as finished until they resolve.

**Follow-ups preserved** — `follow-ups.md` lived in the worktree, so I copied it to `task-plans/evidence/nodeapp-1/` and attached it to both new Tasks:
- `nodeapp-3` — token on the gateway's tool endpoints (URGENT, security)
- `nodeapp-4` — warn about unknown keys in `mcps.json`

**Your decisions, when you're ready:**
- Dispatch `nodeapp-3` now? Given it's an open credentialed endpoint, I'd do this one first regardless of how `nodeapp-1` resolves.
- `nodeapp-4` now or later?
- `nodeapp-2` is on hold — if the team fixed the transport in-ticket *with* the real-SDK test, I'll cancel it as absorbed rather than dispatch duplicate work. Otherwise it needs a worker.
