# Package Anti-Patterns

Concrete mistakes found in real package work. The [package design principles](package-design-principles.md) and [skill authoring principles](skill-authoring-principles.md) remain the authority; each entry shows how one of them was broken, what to do instead, and how to catch it.

[Agent Package Creation](../SKILL.md) says when to read this file and when to add to it. Keep entries short and general: one cause per entry, the incident as a single line, and merge entries that share a cause.

## Package design

### 1. Forbidding user-directed collaboration

- **Incident:** The Solution Designer refused "send to @Product Team" in a standalone team because no rule matched and its instructions banned `delegate_task` (2026-10-07).
- **Breaks:** [§6](package-design-principles.md#6-design-team-coordination-and-routing): configured rules route workflow results; they do not limit collaboration the user asks for.
- **Instead:** Scope tool rules to what they protect ("do not bypass a configured route"). When the user names a collaborator, the role sends it the context with the tool the request names.
- **Detect:** Search for `delegate_task`, "substitute", "only", or "never contact" next to routing text; check that every "no rule matches" path also handles a collaborator the user named.

### 2. An outcome only a parent can route

- **Incident:** The Solution Designer's `Product Design Requested` outcome had a route only in the Orgs, so the standalone team had nowhere to send it.
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files): every path from request to result must be traceable in the package being run.
- **Instead:** Give each handed-off outcome a destination in the containing config, or state which parent provides it and what the role does when running on its own.
- **Detect:** For every outcome a role hands off, find its route in the team config; if it is only in an Org, check the standalone fallback.

### 3. A member describing another team's internals

- **Incident:** The Solution Designer skill described the Product UI/UX Designer's modes, repository, and Bootstrapper procedure.
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file): each role owns its own work; the receiver owns how it does its part.
- **Instead:** Describe the role's own outcome and what it hands over; link the receiver's result as an external artifact.
- **Detect:** Search a member's skill for other teams' member names and internal terms.

### 4. Copying one rule into several files

- **Incident:** The `delegate_task` ban appeared in the Solution Designer's `agent.md`, its skill, `team.md`, an Org summary, and another team's agent, so fixing one left the others refusing.
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file): one authoritative file per rule; others point to it.
- **Instead:** State the rule once (universal transition in `agent.md`, shared rules in the shared file) and use pointers elsewhere.
- **Detect:** Search the repository for a distinctive phrase of the rule before and after editing; every hit is a copy to remove or reconcile.

### 5. Colliding with an existing identity

- **Incident:** A new "Project Task Manager" agent duplicated a built-in agent of the same name in the server, so the user saw the wrong one.
- **Breaks:** [§9](package-design-principles.md#9-preserve-evidence-and-update-safely): inspect existing packages and the runtime before choosing an identity.
- **Instead:** Before creating, search the target repository, related repositories, and the runtime's built-ins for the same name or purpose; extend, replace, or rename deliberately.
- **Detect:** Search for the display name and ID across the repositories the runtime loads.

### 12. Hard-coding recipients in a skill

- **Incident:** Five STORM Team skills named their next member ("Handoff to `article_polisher_verifier`") and the agents had no `get_handoff_rules`, so the team's backward routes and any renamed member depended on skill text (sweep, 2026-10-07).
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file): conditional recipients belong in the team or Org config, not in a skill.
- **Instead:** The skill finishes and classifies the result and says "hand off"; the agent gets its recipients from `get_handoff_rules`.
- **Detect:** Search each skill for its team's `memberName` values and rooted addresses; check that every agent that hands off has `get_handoff_rules` in its tools.

## Skill content

### 6. Project specifics in a reusable skill

- **Incident:** A team skill hard-coded `autobyteus-server-ts/docs/design/data_migration_guideline.md` for every project.
- **Breaks:** [Ground and prioritize instructions](skill-authoring-principles.md#ground-and-prioritize-instructions): name a project only when it changes behavior.
- **Instead:** Point to the project's own guidance (for example its `DESIGN.md` or `TESTING.md`) and let the project link its documents.
- **Detect:** Search skills for repository names, absolute paths, and product names.

### 7. Over-structuring what people write naturally

- **Incident:** Project Task descriptions were given required fields ("Depends on", "report back"); the user wanted ordinary, detailed task descriptions.
- **Breaks:** [Write the operating contract](skill-authoring-principles.md#write-the-operating-contract): prescribe exact structure only where the operation is fragile.
- **Instead:** Describe what a good result contains; keep tracking data (dependencies, order) in the role's own records.
- **Detect:** For each required field or template, name what breaks without it; if nothing does, make it guidance.

### 8. Instructing default runtime behavior

- **Incident:** The shared design rule told agents to look up `AGENTS.md`, which agents read by default.
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), economy: remove words that change no action.
- **Instead:** Instruct only what the runtime or role would not do anyway.
- **Detect:** For each instruction, ask whether the agent would behave differently without it.

### 9. Procedures that assume an external system's behavior

- **Incident:** An event-search procedure asked for Luma keyword search; Luma's public pages have none, and `lu.ma` had moved to `luma.com`.
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), grounding: derive obligations from observed tools and systems.
- **Instead:** Check the external site, API, or tool before writing steps for it, and record what was observed.
- **Detect:** List every external system a skill depends on and the evidence for each assumed capability.

### 13. Treating a proxy signal as a verified defect

- **Incident:** Product guidance equated megabyte/captured fixtures with real-data copying and an older baseline-report pin with stale UI, prompting an unsupported refresh (2026-10-07).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), grounding: obligations need evidence, not an unqualified heuristic.
- **Instead:** Use size, method and metadata to guide proportionate inspection. Distinguish verified failure, unknown provenance/currency, optional maintenance, and an explicit refresh request before blocking or commissioning work.
- **Detect:** For every rule that blocks work or forces an action, name the evidence it requires; flag rules triggered by a proxy (size, age, method, naming, metadata) alone.

## Creator process

### 10. Working from a stale or unrelated checkout

- **Incident:** A design-guide decision was based on a checkout 16 commits behind; the current branch already had a root `AGENTS.md` and a design guide, and a duplicate file was nearly pushed.
- **Breaks:** [§9](package-design-principles.md#9-preserve-evidence-and-update-safely): read the actual current package before deciding.
- **Instead:** Fetch first, and read the target branch (`origin/<branch>`) or a fresh worktree from it, not a local checkout of unknown state.
- **Detect:** Before relying on a repository, compare the checkout with its remote branch and note the commit inspected.

### 11. Pushing without checking what goes out

- **Incident:** A push to `main` also published two unrelated local commits that sat beneath the new one.
- **Breaks:** Diff contained to the approved scope ([SKILL.md step 4](../SKILL.md#4-validate-and-recover)).
- **Instead:** Before pushing, list `origin/<branch>..HEAD` and push only when it contains exactly the intended commits; build the change on a fresh branch from the remote when the local branch carries other work.
- **Detect:** The list of commits to push, checked immediately before the push.
