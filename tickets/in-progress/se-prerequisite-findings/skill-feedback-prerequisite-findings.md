# Skill feedback: the Solution Designer skill has no "prerequisite finding"

- From: Solution Designer, 2026-10-19, at the user's request in the Solution Designer conversation.
- The user's words: "I think it belongs to your skill, right? Maybe you can send this feedback and what happened, the concrete case … ask project task manager to create a task for this." Earlier: "this kind of thing we have came across quite a few times already. If your skill enables you to do that, would that be much better?"
- Skill concerned: `solution-designer`. Real path: `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/` (`SKILL.md`, `references/requirements-engineering.md`, `references/architecture-design.md`; shared references in `…/software-engineering-team/shared/`, e.g. `design-examples.md` Example 11). Linked into the workspace at `.claude/skills/solution-designer`.

## The concrete case (autobyteus-175, Jira through a ready-made MCP server)

1. The Task asked "what works today". In the first phase, investigating current behavior, I traced the real path of a Jira connection: settings form → `mcps.json` → `HttpManagedMcpServer` → MCP SDK → server.
2. At the last step, our transport options (`{ url, headers }`) did not match what the SDK reads (`requestInit.headers`). The unit test replaced the SDK with a fake, so it could not show this. A cheap probe against a real local server proved that no `Authorization` header arrives (P-001), and a control proved the fix shape (P-002).
3. Asking "can this Task's goal be met if this stays?" gave "no": Atlassian's server cannot connect at all. So it is a **prerequisite**, not a side note.
4. The same investigation found two more prerequisites for the planned Jira presets:
   - the vault cannot hold MCP secrets (FU-2);
   - `/mcp/gateway` exposes all MCP tools to loopback callers without a token, which defeats per-agent tool choice (FU-6).
5. I raised them with the user at once with a recommended order. The user chose FU-1 first, and it became `autobyteus-179` (delivered in v1.5.6-beta.10). It worked, but by improvisation: the skill does not describe this.

## The gap in the skill

The skill knows two kinds of findings:
- **in scope:** part of the ticket;
- **out of scope:** a follow-up, collected and sent to the Task-managing agent at the end, at the Finalized Delivery Receipt (step 3), per the Scope Guardrail and Example 11.

A prerequisite is a third kind. It is outside the ticket's scope, but it blocks the ticket's own done-when, or makes the result unsafe. The end-of-ticket timing is wrong for it: by then, the blocked work has been designed or built on a broken basis. The Recovery table's "Non-requirement external blocker" does not fit either: the prerequisite is inside our own product, it needs a Task of its own, and it needs a recommended order.

## Proposed addition (to be worded and placed by whoever does the Task)

1. **Definition.** A *prerequisite* is a defect or missing capability outside the ticket's scope, without which the ticket's done-when cannot be met, or cannot be met safely.
2. **When to look.**
   - While tracing each supported scenario end to end, in requirements investigation and again in architecture investigation.
   - Trace through the real external dependency (library, service, runtime), not only our own tests.
   - Confirm a suspicion with a cheap probe.
3. **Test.** "If this stays as it is, can this ticket still reach its goal safely?" If not, it is a prerequisite.
4. **Action.**
   - Record it in the requirements (stable ID, evidence, which REQs/ACs depend on it).
   - If it is small and within the ticket's direction, absorb it into the ticket.
   - Otherwise draft a separate Task with a recommended order and ask the user immediately, since it changes order or scope.
   - After the user agrees, send it to the Task-managing agent, and pause or narrow the current ticket (unaffected parts may continue).
5. **Timing.** Immediately, not at the delivery receipt.
6. **Lesson from the same case.** My FU-1 design told the implementer to keep a test seam (`setSdkLoader`), and that seam then became dead code. The design checklist could add "check whether a kept seam still has a caller after the change".

## Possibly affected beyond the Solution Designer

The Architecture Reviewer, Code Reviewer and API/E2E Engineer meet the same situation (finding a prerequisite during review or validation). Whoever does the Task should decide whether the definition belongs in a shared reference (e.g. `shared/design-principles.md` or `shared/handoff-references.md`) so that every role uses one term.
