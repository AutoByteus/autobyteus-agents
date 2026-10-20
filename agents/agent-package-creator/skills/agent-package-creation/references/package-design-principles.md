# Agent Package Design Principles

Use these package boundaries and writing principles with [Agent Package Creation](../SKILL.md). [package-anti-patterns.md](package-anti-patterns.md) shows real mistakes against them. For skill internals, see [skill-authoring-principles.md](skill-authoring-principles.md). Adapt examples to the target repository's schema and catalog.

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

Trace a normal path and each meaningful return path from intake to terminal result. A handoff should move a completed, classified result across a real ownership boundary, carrying the original request, the status or decision, constraints, approvals, absolute artifact paths, and the next action. The receiver should depend on that result and evidence, not the sender's private ticket lifecycle, branch, worktree, implementation detail, or undocumented chat memory. Keep user decisions with the user; a role cannot silently approve a material behavior change on their behalf.

**Information the roles share.** In an agent team, the documents are the roles' memory and the audit trail: each run starts fresh and may lose earlier context, so what is not written down is lost. Do not judge them by how many there are; judge how the information is structured:

- Before adding a document, section, field, or step, find where that fact already lives, and extend its owner instead of adding another place.
- Give each fact one owner; other documents point to it by ID or path instead of copying it.
- Give each kind of record one home. When several roles produce records of the same kind and someone uses them together, such as follow-ups found by any role, keep them in one file the roles add to; each role's own document cites their IDs. Records spread over several documents make every reader know all the places and merge them. A file that moves records into one home is not a duplicate; a file that copies them, such as an index of results that live elsewhere, is.
- Order a document the way the work happens, and name it for its use: a "test progress log", not a "ledger".
- Record a result a role produced (a test run, a decision) with what the next role needs to judge whether it still holds, such as the commit and the evidence, so the next role reuses it instead of repeating it.
- A restructure removes repeats, never checks ([step 4](../SKILL.md#4-validate-and-recover) verifies this).

Keep it in proportion: a small change needs a small record.

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

**Design a package like software.** The boundaries (§1) are its architecture; the path from request to result (§2) is its data-flow spine; one owner per rule and per fact (§2, §3) is its single source of truth, and one home per kind of record is its one table per entity; handoffs and their files are its interfaces; restructuring compares old and new so no check is lost; validation and real runs are its tests. Duplication is a smell, as in code. Two differences matter. The runtime is a model that interprets: state the purpose, the boundary, and the few things that must happen, and trust its judgement for the rest; do not script every step. And its bugs are silent: two drifting copies or wrong wording fail without an error, so owners and real runs matter even more than in code.

Use the same quality principles when creating, analyzing, or updating any target kind. An analysis uses them as its review criteria; create and update apply them in this order while designing and writing, with cross-file consistency throughout:

1. **Structure and ownership:** Choose the smallest package topology that can own the requested work; assign each behavior, route, and output one authoritative file before polishing prose.
2. **Content architecture and flow:** Make the path from trigger and inputs through decisions, work, outputs, validation/recovery, and handoff or stop coherent. Put prerequisites before dependent actions and exceptions beside the action they modify.
3. **Behavioral and factual grounding:** Derive obligations from the user's request, confirmed repository contract, observed files/tools, or explicit approvals. Qualify assumptions and unresolved decisions rather than presenting an inferred capability, path, or outcome as fact.
4. **Clarity and precision:** Name the actor, action, object, condition, and expected result where ambiguity would change execution. Keep terminology stable across definitions, configuration, and references. Give an example of the desired artifact when a boundary would otherwise stay abstract.
5. **Economy and plain language:** Write direct prose in descriptions, instructions, examples, results, handoffs, and docs. Remove words that change no action, condition, scope, owner, evidence, output, or safety boundary. Keep meaningful distinctions; replace duplicate rules with pointers. Retain prohibitions that prevent plausible authority, safety, ambiguity, recovery, validation, or output failures.

The same test prevents both wordiness and over-shortening:

| Avoid | Use | Why |
| --- | --- | --- |
| “In order to validate the package, perform validation of the changed files.” | “Validate the changed files.” | The extra words add no action or condition. |
| “Follow the bundled `agent-package-creation` skill as the authoritative workflow for creating agent packages.” | “Follow `agent-package-creation`.” | Its attachment and scope are already clear. |
| “Send the result.” | “Send the result to every exact `recipient_address` returned.” | The shorter version loses the routing requirement. |
| “Unverified currency.” | “Possibly outdated.” | Jargon hides the meaning. |
| “Verify in proportion to the diff.” | “Check what the diff touched.” | Names the action instead of a quality. |
| “Judge it by provenance, independence, deterministic/resettable behavior, and proportionate complexity.” | A short list: where it came from, needs no live service, same result every run. | A chain of abstract nouns and slash compounds becomes checks an agent can perform. |

This standard guides the analysis, the changes, and the final review of the changed text ([Agent Package Creation](../SKILL.md) steps 2–4). Independent review occurs only when requested (the `analyze` operation) or required by the containing workflow. For a skill's trigger, instruction flow, and resources, apply the [skill-authoring principles](skill-authoring-principles.md).

## 5. Attach skills deliberately

Bundle a skill when one Agent owns its procedure. Use a standalone skill source when the skill has an independent consumer or several Agents genuinely share the same behavior. An Agent with no skill-defined work need not have a skill. [Skill authoring principles](skill-authoring-principles.md) own placement, naming, and attachment mechanics.

Give each Agent only the tools its work or handoff uses.

## 6. Design Team coordination and routing

A Team's `team-config.json` registers `coordinatorMemberName`; the selected member must exist in its roster. Registration alone does not assign intake, management, approval, forwarding, or final-response duties. Put those duties in the coordinator's actual work contract and summarize the relationship in `team.md`.

Team-local Agent members use the repository's `refType: "agent"` and `refScope: "team_local"` pattern, pointing to the local definition. Routes in `team-config.json` use rooted member addresses, such as `/planner` and `/validator`. Check that every `from` and `to` address resolves. Write route conditions from statuses and artifact readiness that a member actually produces. Make success, recovery, notification, and terminal paths distinguishable; reviews and escalation are conditional policies, not mandatory stages by default.

The sending role completes its own work and produces a classified, file-backed result before routing. The Team config selects recipients from that result; the sender follows the [result and handoff contract](result-and-handoff-contract.md) for the exact protocol. Do not use `delegate_task` to bypass a configured route for a normal result.

Configured rules route the workflow's own results; they do not limit collaboration the user asks for. When the user explicitly asks a role to involve an agent or team at runtime (by name, address, or mention), the role sends that collaborator its persisted context even when no rule covers it, using the tool the request names: `delegate_task` to delegate, `send_message_to` to message. A role never contacts anyone that neither the user nor the rules named. A role's skill describes its own outcomes; it does not name other teams' internals or forbid user-directed collaboration.

## 7. Design Org membership and cross-member routing

An Org has `members`, `handoffs`, `avatarUrl`, and `defaultLaunchConfig` in `org-config.json`; use `null` for unauthored launch defaults. It has no `coordinatorMemberName` field. An executive/intake Agent may still own coordination through its own work contract; do not infer one from the Org file format.

- A shared Team mount uses `refType: "agent_team"`, `refScope: "shared"`, and the shared Team's catalog ID as `ref`. The Team keeps its coordinator, skills, and internal handoffs.
- An org-local Agent or Team uses `refScope: "org_local"` and an ID that resolves to the Org's local definition. Follow the target repository's observed `ref` encoding rather than guessing it. An org-local Team still uses a `team-config.json` for its internal routing.
- Org `handoffs` own only cross-member routes. Addresses may target direct Agents or nested Team members, such as `/engineering_org/platform_engineering_manager`. Verify the full rooted address through the member graph. Do not duplicate a child Team's internal routes at Org level.

**Delegated copies** (observed in AutoByteus, 2026-10-19): a member that delegates starts an independent copy. A copy of a mounted Team, or of a direct Org agent at its address, carries the Org's handoff rules for that address, so Org rules reach delegated work. A message by address reaches only the standing instance; a copy is reached only by its run ID, so a cross-member reply addressed to a Team reaches the standing Team, not the copy that asked. A copy has one current Task at a time.

Shared catalog references may be syntactically valid but unresolved in the current environment. Verify catalog availability when possible and otherwise report the dependency explicitly. Do not copy a private or external shared package just to make a local link appear resolved.

## 8. Boundary examples

These examples show where a responsibility belongs; adapt names and detail to the actual request.

- **Standalone Skill:** A reusable source-auditing procedure can live at `<skill-source-root>/<skill-name>/SKILL.md`, with a linked evidence checklist only if the procedure needs it. It has a trigger, inputs, checks, and output, but no `agent.md` or handoff roster. An Agent may later attach it explicitly through `skillNames`.
- **Individual Agent:** A research role owns evidence gathering and a research result. Its `agent.md` identifies that role, `agent-config.json` supplies its tools and attached research skill, and the skill explains its work. The Agent does not need a one-member Team merely to exist.
- **Team:** In the repository's Evidence-Driven Delivery example, Planner owns the next-task decision, Implementer executes that task, and Validator reports observed feedback. The Team config routes a completed `/validator` result back to `/planner`; Validator's skill does not decide the next task or hard-code the recipient.
- **Org:** The Software Development Department mounts shared Engineering and Product Teams without copying their members or adding an Org coordinator. Its `org-config.json` owns cross-Team routes; each Team keeps its coordinator and internal routes. An Org with local Agents/Teams instead places those definitions under its own root and uses resolvable org-local references.

The same task may need several kinds: creating a Team can include new Agents and their bundled skills. Report the requested top-level kind as `team` and validate the nested definitions; create a separate standalone Skill only when the user needs an independently owned skill package.

## 9. Update and restructure safely

Before creating, inspect the repository's instructions, analogous packages, and the runtime's built-in definitions, so a new identity extends, replaces, or deliberately differs from what exists. Before changing, build the full picture and write the analysis, as the [skill](../SKILL.md#inputs-and-operation) describes.

When optimizing, compare the observed package with intended and preserved behavior. Diagnose structure and ownership, flow, grounding, then wording; repeated text may signal a wrong owner or broken flow. Choose whether to add, move, merge, remove, or update a rule before trimming sentences.

**Restructure at the right level.** A package drifts as many small changes land, each right on its own. Judge its structure at three levels:

1. **Inside a file:** order, repeats, wording.
2. **A file:** whether its name still describes most of what it holds, and whether it sits where its readers look. Split a file whose parts serve different readers or different moments in the work; merge files that do one job.
3. **The file set:** what each file is for, who reads it and when, and how the files connect. Ask whether you would draw these boundaries if you started fresh.

The full read before an update shows the signals: a name that no longer fits the content; a file that keeps gaining sections for other readers; one task that sends the reader through many files, or one rule that needs many cross-links; fixes that each add a file or section instead of extending an owner; one concept under several names. Record them as findings. Propose a restructure above the file level as its own change, separate from the behavior change in hand, unless that change cannot be done well without it. Start it from the readers and what each needs when, map every old file, section, and name to its new home, update every link, and check in a live run that the agents still behave as before.

Apply the change at its owner and reconcile configured names, member references, routes, links, and human docs. Remove obsolete paths when an approved replacement makes them stale; keep a compatibility path only when its consumer and lifecycle are justified.

Before declaring completion, validate as [step 4](../SKILL.md#4-validate-and-recover) describes and capture observed results and limitations in the durable result. If intent, approval, or package identity is material and ambiguous, return a precise gap rather than inventing a role, tool, recipient, capability, or permission.
