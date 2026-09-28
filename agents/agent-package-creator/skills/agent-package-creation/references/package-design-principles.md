# Agent Package Design Principles

Use these package boundaries and writing principles with [Agent Package Creation](../SKILL.md). For skill internals, see [skill-authoring-principles.md](skill-authoring-principles.md). Adapt examples to the target repository's schema and catalog.

## 1. Choose the package boundary from the work

| Kind | Owns | Use when | Required definition files |
| --- | --- | --- | --- |
| Standalone Skill | Reusable instructions for how to perform a task; no role identity or member routing. | The skill itself is the requested deliverable or several roles can share it. | `SKILL.md` at a confirmed skill source root; optional linked resources only as needed. |
| Agent | One role's identity, responsibility, and tool/skill wiring. | One role can own the requested work without a Team routing contract. | `agent.md`, `agent-config.json` under `agents/<agent-id>/`. |
| Agent Team | Cooperation among distinct roles and conditional internal handoffs. | Multiple roles need a shared coordination/routing boundary. | `team.md`, `team-config.json`, and definitions for team-local members under `agent-teams/<team-id>/`. |
| Agent Org | Membership of Agents and/or Teams and cross-member handoffs. | The requested system needs an organization-level boundary. | `org.md`, `org-config.json`, plus any org-local members under `agent-orgs/<org-id>/`. |

An Agent definition can be standalone, team-local under a Team's `agents/`, or org-local under an Org's `agents/`. A Team can be shared or org-local under an Org's `agent-teams/`. Reuse a shared member by reference instead of copying its internal package. A reference to an imported shared member is viable only when that member ID is present in the runtime catalog.

Add a role or layer only if it owns a distinct decision, transformation, approval boundary, lifecycle, or output. A reviewer or coordinator needs a real work contract, not a title. Prefer a flatter arrangement when one role can complete the work coherently.

## 2. Design responsibilities before files

For each role, write a compact contract:

- **Input:** request, evidence, constraints, and artifact paths it receives.
- **Owned work:** the decision or transformation it alone makes.
- **Output:** durable result and domain artifact the next owner can consume.
- **Quality gate:** how its output is checked, including approval when required.
- **Exit:** result classification and next-action information available for routing.

Trace a normal path and each meaningful return path from intake to terminal result. A handoff should move a completed, classified result across a real ownership boundary. The receiver should depend on that result and evidence, not the sender's private ticket lifecycle, branch, worktree, implementation detail, or undocumented chat memory. Keep user decisions with the user; a role cannot silently approve a material behavior change on their behalf.

## 3. Give each rule one authoritative file

| Concern | Owner |
| --- | --- |
| Agent identity, purpose, runtime stance, attached-skill reminder when applicable, universal post-work transition; compact work contract if no skill is attached | `agent.md` |
| Tool names, skill attachment, processors, lifecycle/runtime settings | `agent-config.json` |
| Specialist inputs, procedure, decisions, artifacts, validation, recovery, result classification | Its `SKILL.md` |
| Team purpose, member boundaries, entry contract, high-level cooperation | `team.md` |
| Team roster, coordinator, rooted addresses, conditional internal routes | `team-config.json` |
| Org purpose, member boundaries, cross-member cooperation | `org.md` |
| Org placements and conditional cross-member routes | `org-config.json` |
| Detailed principles, schemas, examples, and output skeletons | Linked skill references/templates |
| Human-facing discovery and navigation | `README.md` or package documentation |

Short pointers are useful; competing procedures are not. When an Agent has a skill, keep its detailed work instructions there rather than repeating them in its shell, Team/Org summary, or README. Keep conditional recipient addresses in the applicable configuration, not in a skill. A containing Team or Org can state a communication convention without taking ownership of a member's procedure.

## 4. Apply one authoring standard

Use the same quality principles when creating or updating any target kind. Apply them in this order while designing and writing, with cross-file consistency throughout:

1. **Structure and ownership:** Choose the smallest package topology that can own the requested work; assign each behavior, route, and output one authoritative file before polishing prose.
2. **Content architecture and flow:** Make the path from trigger and inputs through decisions, work, outputs, validation/recovery, and handoff or stop coherent. Put prerequisites before dependent actions and exceptions beside the action they modify.
3. **Behavioral and factual grounding:** Derive obligations from the user's request, confirmed repository contract, observed files/tools, or explicit approvals. Qualify assumptions and unresolved decisions rather than presenting an inferred capability, path, or outcome as fact.
4. **Clarity and precision:** Name the actor, action, object, condition, and expected result where ambiguity would change execution. Keep terminology stable across definitions, configuration, and references.
5. **Economy and plain language:** Write direct prose in descriptions, instructions, examples, results, handoffs, and docs. Remove words that change no action, condition, scope, owner, evidence, output, or safety boundary. Keep meaningful distinctions; replace duplicate rules with pointers. Retain prohibitions that prevent plausible authority, safety, ambiguity, recovery, validation, or output failures.

The same test prevents both wordiness and over-shortening:

| Avoid | Use | Why |
| --- | --- | --- |
| “In order to validate the package, perform validation of the changed files.” | “Validate the changed files.” | The extra words add no action or condition. |
| “Follow the bundled `agent-package-creation` skill as the authoritative workflow for creating agent packages.” | “Follow `agent-package-creation`.” | Its attachment and scope are already clear. |
| “Send the result.” | “Send the result to every exact `recipient_address` returned.” | The shorter version loses the routing requirement. |

This standard guides the author's work, not a separate self-review stage. Independent review occurs only when requested or required by the containing workflow. For a skill's trigger, instruction flow, and resources, apply the [skill-authoring principles](skill-authoring-principles.md).

## 5. Attach skills deliberately

Bundle a skill when one Agent owns its procedure. Use a standalone skill source when the skill has an independent consumer or several Agents genuinely share the same behavior. An Agent with no skill-defined work need not have a skill. [Skill authoring principles](skill-authoring-principles.md) own placement, naming, and attachment mechanics.

Give each Agent only the tools its work or handoff uses.

## 6. Design Team coordination and routing

A Team's `team-config.json` registers `coordinatorMemberName`; the selected member must exist in its roster. Registration alone does not assign intake, management, approval, forwarding, or final-response duties. Put those duties in the coordinator's actual work contract and summarize the relationship in `team.md`.

Team-local Agent members use the repository's `refType: "agent"` and `refScope: "team_local"` pattern, pointing to the local definition. Routes in `team-config.json` use rooted member addresses, such as `/planner` and `/validator`. Check that every `from` and `to` address resolves. Write route conditions from statuses and artifact readiness that a member actually produces. Make success, recovery, notification, and terminal paths distinguishable; reviews and escalation are conditional policies, not mandatory stages by default.

The sending role completes its own work and produces a classified, file-backed result before routing. The Team config selects recipients from that result; the sender follows the [result and handoff contract](result-and-handoff-contract.md) for the exact protocol. `delegate_task` is a distinct execution mechanism, not a substitute for result-based handoff; declare a different mechanism only when the target workflow actually uses one.

## 7. Design Org membership and cross-member routing

An Org has `members`, `handoffs`, `avatarUrl`, and `defaultLaunchConfig` in `org-config.json`; use `null` for unauthored launch defaults. It has no `coordinatorMemberName` field. An executive/intake Agent may still own coordination through its own work contract; do not infer one from the Org file format.

- A shared Team mount uses `refType: "agent_team"`, `refScope: "shared"`, and the shared Team's catalog ID as `ref`. The Team keeps its coordinator, skills, and internal handoffs.
- An org-local Agent or Team uses `refScope: "org_local"` and an ID that resolves to the Org's local definition. Follow the target repository's observed `ref` encoding rather than guessing it. An org-local Team still uses a `team-config.json` for its internal routing.
- Org `handoffs` own only cross-member routes. Addresses may target direct Agents or nested Team members, such as `/engineering_org/platform_engineering_manager`. Verify the full rooted address through the member graph. Do not duplicate a child Team's internal routes at Org level.

Shared catalog references may be syntactically valid but unresolved in the current environment. Verify catalog availability when possible and otherwise report the dependency explicitly. Do not copy a private or external shared package just to make a local link appear resolved.

## 8. Boundary examples

These examples show where a responsibility belongs; adapt names and detail to the actual request.

- **Standalone Skill:** A reusable source-auditing procedure can live at `<skill-source-root>/<skill-name>/SKILL.md`, with a linked evidence checklist only if the procedure needs it. It has a trigger, inputs, checks, and output, but no `agent.md` or handoff roster. An Agent may later attach it explicitly through `skillNames`.
- **Individual Agent:** A research role owns evidence gathering and a research result. Its `agent.md` identifies that role, `agent-config.json` supplies its tools and attached research skill, and the skill explains its work. The Agent does not need a one-member Team merely to exist.
- **Team:** In the repository's Evidence-Driven Delivery example, Planner owns the next-task decision, Implementer executes that task, and Validator reports observed feedback. The Team config routes a completed `/validator` result back to `/planner`; Validator's skill does not decide the next task or hard-code the recipient.
- **Org:** The Software Development Department mounts shared Engineering and Product Teams without copying their members or adding an Org coordinator. Its `org-config.json` owns cross-Team routes; each Team keeps its coordinator and internal routes. An Org with local Agents/Teams instead places those definitions under its own root and uses resolvable org-local references.

The same task may need several kinds: creating a Team can include new Agents and their bundled skills. Report the requested top-level kind as `team` and validate the nested definitions; create a separate standalone Skill only when the user needs an independently owned skill package.

## 9. Preserve evidence and update safely

For `create`, inspect repository instructions and analogous packages, then select the smallest coherent topology. For `update`, read the full affected package and record the baseline, requested delta, affected owners, and preserved behavior before editing.

When optimizing, compare the observed package with intended and preserved behavior. Diagnose structure and ownership, flow, grounding, then wording; repeated text may signal a wrong owner or broken flow. Choose whether to add, move, merge, remove, or update a rule before trimming sentences.

Apply the change at its owner and reconcile configured names, member references, routes, links, and human docs. Remove obsolete paths when an approved replacement makes them stale; keep a compatibility path only when its consumer and lifecycle are justified.

Before declaring completion, validate what the actual package needs: JSON syntax, frontmatter, configured skill resolution, links and templates, tool/role fit, member refs, routed addresses, shared dependencies, cross-file ownership, and diff scope. Capture observed results and limitations in the durable result. If intent, approval, or package identity is material and ambiguous, return a precise gap rather than inventing a role, tool, recipient, capability, or permission.

Use examples of the desired artifact when a package boundary would otherwise remain abstract; keep risky handoff and irreversible-decision detail explicit even in a concise package.
