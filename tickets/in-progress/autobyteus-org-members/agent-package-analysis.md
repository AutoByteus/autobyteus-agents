# Agent Package Analysis: the AutoByteus Org with its real working relationships

- Status: `Completed`
- Operation: `update` (update intent: `extend`)
- Package type: `org`
- Target package: `agent-orgs/autobyteus-org` (worktree `/tmp/aorg`, branch `autobyteus-org-members`, from `origin/main` at `8fc8940`)
- Files read in full: `org.md`, `org-config.json`. Also read:
  - the member definitions it affects: the Project Task Manager package and the Agent Package Creator's `agent.md` and config;
  - the Product, Software Engineering and Marketing `team.md` and `team-config.json`;
  - the outcome sections of the Solution Designer, Product UI/UX Designer and Marketing Content Creator skills;
  - the Northstar Org, as the pattern for Org members.
- Platform sources read on `origin/personal`:
  - `docs/design/collaboration_model.md`, `docs/modules/agent_orgs.md`, `docs/modules/agent_communication.md`;
  - `get-handoff-rules-service.ts`, `member-instance-scope.ts`, `agent-org-task-source-resolver.ts`, `collaborator-source-projector.ts`.
- Request/reference: Task `autobyteus-agents-28`. The user, 2026-10-19:
  - "normally I would talk to the PM in the organization";
  - "put the PM and the agent package creator inside the root organization and put the other team there";
  - "marketing should be there";
  - "If you have software engineering task, you're delegated to the software engineering team. If you have marketing task … marketing team … improve the agent package … creator."

## How the platform treats an Org (observed in code and docs)

- **No entry point:** an Org has no coordinator or entry-point field, and launching focuses no one (`agent_orgs.md`). "The user talks to the PM" is a convention written in `org.md`.
- **Messages vs. delegation:** inside a run members message each other. `delegate_task` starts an independent copy, and a copy is reached only by its run ID (CM-4, CM-5). An address reaches the **standing** instance.
- **Rules reach the copies:**
  - A copy of a **mounted Team** is built from the Org tree with the Org's handoffs (`handoffs: tree.handoffs`); each member gets the rules whose `from` is its address.
  - A copy of a **direct Org agent** at its address "keeps the root's handoffs" (`member-instance-scope.ts`).

  So rules to the PM reach the work the PM delegates.
- **Rule addresses:** a handoff source must be an agent address; a destination may be an agent or a Team (its coordinator).

## Findings

| # | Area | Evidence | Change |
| --- | --- | --- | --- |
| F1 | Structure | The PM and the Agent Package Creator are not members; the user talks to the PM, which delegates by kind of work | Mount both as shared direct agents (`refType: agent`, `refScope: shared`). |
| F2 | Content flow | The six direct cross-Team rules (Software Engineering ↔ Product ↔ Marketing) send a result by address to the **standing** instance. When the PM has delegated the work, the work runs in a **copy**, so the reply would reach the Org's standing Solution Designer, not the copy that asked. | The PM is the hub: cross-Team needs and results go to the PM, which delegates and passes results back by run ID (user: Task routing by kind; option A). |
| F3 | Content flow | No rule returns a delegated result to the PM; today results reach it only because the PM runs standalone and is the caller | Add rules to `/project_task_manager` from the Solution Designer, the Product UI/UX Designer, the Marketing Content Creator and the Agent Package Creator, naming each one's real outcomes. |
| F4 | Clarity | `org.md` describes three Teams and "no Org-level coordinator" | Rewrite: the members, the PM as the user's entry point, routing by kind of work, results back to the PM, cross-Team needs through the PM, follow-ups, the Creator maintaining packages (outside delivery). |

## Preserved behavior

- Each Team's internal routes and coordinator.
- Members' own packages: no skill or agent change. The PM already relays between Tasks and acts on forwarded user requests; the Solution Designer, Product Designer, Marketing Content Creator and Creator already route by `get_handoff_rules`.
- Delegation rules (CM-1 … CM-9).

## Open points

- The user did not choose between options A and B in words; the user's routing statement ("software tasks to the Software Engineering Team, marketing tasks to the Marketing Team, package tasks to the Creator") matches A, so A is built and stated in the PR for review.
