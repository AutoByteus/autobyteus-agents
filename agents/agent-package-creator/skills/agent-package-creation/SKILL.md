---
name: agent-package-creation
description: Create, analyze, or update standalone skills, Agents, Agent Teams, and Agent Orgs, including skills their roles need.
---

# Agent Package Creation

Create, analyze, or update Skill, Agent, Team, and Org definitions. The roles you define perform their own work.

Read [package-design-principles.md](references/package-design-principles.md) for package boundaries and writing principles. For skill work, also read [skill-authoring-principles.md](references/skill-authoring-principles.md). [package-anti-patterns.md](references/package-anti-patterns.md) records real mistakes and how to detect them.

## Inputs and operation

Identify the requested outcome, repository and path, target kind (`skill`, `agent`, `team`, or `org`), users, constraints, approvals, and artifact workspace. Choose the source root and artifact workspace from the user's direction or confirmed repository conventions; if neither resolves them, ask before writing.

Use three operations:

- `create`: establish a new target; record `update_intent: new-package`.
- `analyze`: review an existing target without changing it, when the user asks to analyze, review, or audit it. The analysis file is the result.
- `update`: change an existing target; record the user's reason as `update_intent` (for example `extend`, `repair`, `optimize`, or `simplify`). Write the analysis before editing.

Target kind is separate from operation. If an identity already exists, inspect it; use `update` when the user asks for a change and `analyze` when they ask only for a review, unless the user confirms a distinct target. Preserve accepted behavior outside the approved change.

Before `analyze` or `update`, build the full picture, as an experienced reviewer would before judging anyone's work. Read in full every file of the affected package (`agent.md`, config, every skill with its references and templates), the containing Team or Org files, the shared files they link to, and the sibling members the change affects. A search shows where a phrase is, not how the package works. A read stays valid while the files' full text is still in your conversation. For the next request on the same package, read again only what is no longer there (for example after the conversation was summarized) and what changed since; a diff from the commit you read shows that. Base findings and designs on that read, and list the files read in the analysis.

When material scope, behavior, ownership, or removal is unresolved, surface a requirement or approval gap before making that decision. Follow repository-specific artifact, branch, worktree, approval, and finalization instructions where they apply.

## Workflow

### 1. Map the target and ownership spine

Map the target kind and root, each role's responsibility, skill ownership and attachment, coordinator or intake owner where applicable, artifacts, routes and addresses, dependencies, and links.

For `create`, establish the intended behavior and required outputs from the request and confirmed repository conventions. For `analyze` and `update`, distinguish the requested change or review question from existing behavior that must remain intact. When optimizing or reviewing, diagnose observed defects and their owners, at the level where they sit ([principles §9](references/package-design-principles.md#9-update-and-restructure-safely)), before choosing edits. When the request proposes a fix, first map the information or flow the problem is about across every role, then judge the proposal against that map; the proposal frames the question, not the answer. For any update, identify the smallest coherent delta.

Describe the path from request to completion and recovery. For a role, specify input, owned work, output, quality gate, and handoff. For a skill, specify trigger, inputs, work, outputs, validation, and stopping condition. Give each rule one owner. Team coordinator registration does not create duties by itself; an Org has no coordinator field.

### 2. Write the analysis (`analyze` and `update`)

Before editing any package file, write one `agent-package-analysis.md` in the artifact workspace using [agent-package-analysis-template.md](templates/agent-package-analysis-template.md). If this task's workspace already has an analysis of the same target, revise that file instead of adding another. Judge the target against the shared authoring standard in [package-design-principles.md](references/package-design-principles.md) (and [skill-authoring-principles.md](references/skill-authoring-principles.md) for skills) and against the request or the package's stated purpose, so findings cover both defects in existing files and missing behavior. Check the target against [package-anti-patterns.md](references/package-anti-patterns.md). Record the baseline, preserved behavior, findings with evidence and owning file, recommended or planned changes, and open questions. Design each recommended or planned change by the same standard, so the proposal already follows it. Run the read-only checks from step 4 that the findings rely on and record the observed results.

- **`analyze`:** Change no package file. Leave recommended changes unapplied, since applying them is a later `update` the user must request. Continue at step 5 with the analysis as the result.
- **`update`:** If the analysis exposes an unresolved material decision, record `Requirement Gap` in it and continue at step 5. Otherwise apply the planned changes in step 3.

### 3. Create or update canonical files

For `create`, write the required definition files at the confirmed location, plus only the roles, skills, references, templates, scripts, or assets that own necessary behavior. For `update`, change the canonical owner of each affected rule, remove paths made obsolete by the approved design, and reconcile bindings, member references, routes, and links.

Write each change by the shared authoring standard, the same one an analysis judges with.

- **Skill:** Write or update `SKILL.md` and justified local resources. Follow [skill-authoring-principles.md](references/skill-authoring-principles.md) for standalone versus bundled placement, naming, and attachment. If the request targets only an existing skill, leave Agent identity and Team/Org routing unchanged unless the binding or contract actually changes.
- **Agent:** Write `agent.md` and `agent-config.json` with an explicit tool list and `skillNames` (empty when no skill is needed). Put detailed specialist procedure in an attached skill when needed; a simple Agent may keep a compact work contract in `agent.md`.
- **Team:** Write `team.md`, `team-config.json`, and the definitions of team-local members. The summary owns cooperation; the config owns roster, coordinator, and conditional internal routes; members own their specialist work.
- **Org:** Write `org.md`, `org-config.json`, and any org-local members. The Org owns placements and cross-member routes; mounted Teams retain their coordinators and internal routes. Verify shared references against the available catalog rather than copying the shared member.

Design handoffs as [package-design-principles.md](references/package-design-principles.md) §2 and §6 describe. Keep human documentation navigational rather than a competing runtime procedure.

### 4. Validate and recover

Validate what the selected kind and changed files require, and record observed evidence:

- **Any skill:** check frontmatter/name/description, links with their `#anchors` ([check-links.py](scripts/check-links.py)) and referenced paths, unfinished placeholders, and the available standard skill validator. Run focused checks for changed scripts, and confirm the skill's claimed outputs and tool dependencies are supported. Check that frontmatter, body, references, and attachment describe one effective trigger and behavior, not conflicting variants. For an update, compare the previous trigger, outputs, approvals, recovery, and stopping condition with the revised ones. For bundled skills, verify explicit `skillNames` attachment.
- **Any changed Agent/config:** parse JSON; check Agent frontmatter, tool/skill wiring, and folder/name alignment.
- **Team/Org:** check member references and rooted addresses; for a Team, confirm its coordinator is a member, and that each sender–recipient pair has one handoff entry (a new route between a pair that already has one adds a rule to that entry; AutoByteus refuses to load a Team with a duplicate pair); for an Org, check shared versus org-local placements and child-Team boundaries. Check that every outcome a role hands off has a destination in the containing config, or that the package states which parent provides it and what happens when the package runs on its own. Check that no role forbids user-directed collaboration. Record catalog availability or its absence truthfully.
- **All kinds:** compare definition, config, skill, references, templates, and human docs for one owner per rule, no stale names or competing routes, and a diff contained to the approved scope. When the change restructures files or the documents a role produces, map every old file, section, field, and name to its new home, so the restructure loses no check, and update every link to a moved or renamed file. Then compare each reworded or merged statement with its original: the requirement words (must, should, never, only, do not), qualifiers, and named cases should survive, and two statements merge only when they said the same thing. [compare-wording.py](scripts/compare-wording.py) lists the sentences to read. Run the detection checks in [package-anti-patterns.md](references/package-anti-patterns.md) that apply.
- **Real use:** when the change alters how agents route, hand off, decide, or record their work, check it in a live app on the final text: a small realistic scenario, observed from the agents' messages and files. [live-checks.md](references/live-checks.md) describes how. Wording is silent when it is wrong, so a live run catches what reading does not; a run on earlier text does not verify later text.
- **Final review:** read the changed text as a reviewer would, against the same standard and the anti-patterns that apply. If it finds problems, update the text and review again; hand off only when a review finds none.

Correct an in-scope canonical owner and rerun affected checks. When a finding shows a mistake the principles and anti-patterns did not prevent, add an anti-pattern entry, or extend the one with the same cause, in the same update. Then run that entry's detection check across the repository and list every other instance in the result as a follow-up. Record `Requirement Gap` when intent or approval is missing, `Design Impact` when topology must be reconsidered, or `Blocked` when an external dependency prevents safe work. Do not claim a runtime registration or catalog check that was not observed.

### 5. Persist, deliver, and route the result

Before handoff, read [result-and-handoff-contract.md](references/result-and-handoff-contract.md). For `analyze`, the analysis file from step 2 is the result. For `create` and `update`, write one result using [agent-package-result-template.md](templates/agent-package-result-template.md); an `update` result links its analysis. Record observed validation and limitations; use absolute artifact paths in handoff messages.

Deliver the change the way the repository works, usually a pull request, and merge it yourself once it passes step 4: every check the change needs, and, where step 4 calls for a live check, an evaluation that shows the change working as intended (better than the old text, where they were compared). That evidence is the approval, so do not ask the user to approve the merge. Ask first only when the evaluation could not run, was inconclusive, or showed something worse, or when the user asked to review that change. Do not publish, release, or deploy beyond the merge without the user's explicit authorization.

When you merge a pull request, bring the user's local checkout up to date right away: installed skills run from it, and every running agent whose skill folder changed receives a skill-update notice listing the changed files. So a change reaches running agents only through that update, and a file a role links but does not use shows up as noise in its notices. If uncommitted local work overlaps the merged files, preserve it first on a named branch and as a patch, then update, re-apply it, and say where it is. When the re-apply conflicts because the merge changed the same lines, keep the merged text and re-apply the local change by hand; the branch and patch keep the original. Never discard local work.

Then classify and route the result as the contract describes.

## Complete-result standard

For `create` and `update`, the requested definition is created or updated at its canonical boundary, reconciled with any containing package, and supported by observed validation and a durable result. For `analyze`, one durable analysis covers the requested scope with evidence and leaves the package unchanged. In every case, a gap or blocker that prevented completion is recorded truthfully instead.
