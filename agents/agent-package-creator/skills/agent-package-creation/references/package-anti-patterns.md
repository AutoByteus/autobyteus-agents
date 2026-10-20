# Package Anti-Patterns

Concrete mistakes found in real package work. The [package design principles](package-design-principles.md) and [skill authoring principles](skill-authoring-principles.md) remain the authority; each entry shows how one of them was broken, what to do instead, and how to catch it.

[Agent Package Creation](../SKILL.md) says when to read this file and when to add to it. Keep entries short and general: one cause per entry, the incident as a single line, and merge entries that share a cause.

## Index

| # | Mistake | Section |
| --- | --- | --- |
| 1 | Forbidding user-directed collaboration | Package design |
| 2 | An outcome only a parent can route | Package design |
| 3 | A member describing another team's internals | Package design |
| 4 | One rule, fact or kind of record in several places | Package design |
| 5 | Colliding with an existing identity | Package design |
| 6 | Project specifics in a reusable skill | Skill content |
| 7 | Over-structuring what people write naturally | Skill content |
| 8 | Instructing default runtime behavior | Skill content |
| 9 | Procedures that assume an external system's behavior | Skill content |
| 10 | Deciding from a stale or partial view of the package | Creator process |
| 11 | Pushing without checking what goes out | Creator process |
| 12 | Hard-coding recipients in a skill | Package design |
| 13 | Treating a proxy signal as a verified defect | Skill content |
| 14 | Writing in jargon instead of plain actions | Skill content |
| 15 | One full procedure for every request | Skill content |
| 16 | Re-reading state instead of keeping it | Skill content |
| 17 | Merging without updating the local checkout | Creator process |
| 18 | Handoffs that forward everything | Package design |
| 19 | A trigger the agent cannot observe | Skill content |
| 20 | Symlinked references the reader cannot see in a listing | Skill content |
| 21 | A tool list that does not match the work | Skill content |
| 22 | A review standard the reviewer cannot read | Skill content |
| 23 | Merged into 4 | Package design |
| 24 | Judging only the fix the request proposes | Creator process |

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

### 4. One rule, fact or kind of record in several places

- **Incident:** The `delegate_task` ban appeared in the Solution Designer's `agent.md`, its skill, `team.md`, an Org summary, and another team's agent, so fixing one left the others refusing. In the Article Writing Team the opening-progression rule sat in eight files and the image-tool order in five (2026-10-14). The API/E2E report wrote each test case's result and evidence in up to seven places, and a first fix added an eighth, an Evidence Index. The API/E2E engineer reran the implementation engineer's 5,830 unit tests because those results had no commit or evidence. A review of the team called its documents "too much paperwork"; the user corrected that the problem was the information structure, not the amount (2026-10-18). Follow-ups lived in five places (design spec, design review, implementation handoff, two code review reports) and two roles sent them, one guessing the recipient; the Creator first proposed keeping them in each report, because each follow-up was written only once, and the user pointed out that one kind of record needs one home (2026-10-20).
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file) and [§2](package-design-principles.md#2-design-responsibilities-before-files), information the roles share: one owner per rule, per fact, and per kind of record; others point to it.
- **Instead:** State the rule once (universal transition in `agent.md`, shared rules in the shared file) and use pointers elsewhere. For the documents roles produce: keep the documents the agents need. Find where each fact lives, extend that owner, and point to it elsewhere (#60 kept the plan, progress log, record and history, each fact written once; #61 extended the implementation handoff into a Checks Run table that later roles reuse by ID). Compare the old and new structure so no check is lost (#60's comparison restored three). Records of one kind that several roles produce get one file the roles add to, and one sender if they leave the team.
- **Detect:** Search the repository for a distinctive phrase of the rule before and after editing; every hit is a copy to remove or reconcile. For each fact a template records (a result, a commit, an evidence path, a score), count the places it is written. For each check a role runs, see whether an earlier role already recorded it in a form that could be reused. For each kind of record (follow-ups, decisions, evidence), count the documents that hold such records; more than one, with a reader who needs them all, is a scattered collection even when no record is copied.

### 5. Colliding with an existing identity

- **Incident:** A new "Project Task Manager" agent duplicated a built-in agent of the same name in the server, so the user saw the wrong one.
- **Breaks:** [§9](package-design-principles.md#9-update-and-restructure-safely): inspect existing packages and the runtime before choosing an identity.
- **Instead:** Before creating, search the target repository, related repositories, and the runtime's built-ins for the same name or purpose; extend, replace, or rename deliberately.
- **Detect:** Search for the display name and ID across the repositories the runtime loads.

### 12. Hard-coding recipients in a skill

- **Incident:** Five STORM Team skills named their next member ("Handoff to `article_polisher_verifier`") and the agents had no `get_handoff_rules`, so the team's backward routes and any renamed member depended on skill text (sweep, 2026-10-07). The Article Writing Team's two agents also lacked `get_handoff_rules` and a post-work transition, so its configured routes could not be retrieved (2026-10-14).
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file): conditional recipients belong in the team or Org config, not in a skill.
- **Instead:** The skill finishes and classifies the result and says "hand off"; the agent gets its recipients from `get_handoff_rules`.
- **Detect:** Search each skill for its team's `memberName` values and rooted addresses; check that every agent in a team with `handoffs` has `get_handoff_rules` in its tools and the transition in its `agent.md`.

### 18. Handoffs that forward everything

- **Incident:** Software Engineering Team skills said to send "the complete cumulative package" and "attach all relevant artifacts", so each role forwarded every reference it received; one message attached 1,618 files, mostly old evidence and source (2026-10-15).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files): a handoff moves a completed result; the receiver depends on that result, not on the sender's whole history.
- **Instead:** Let the sender decide after its work: its result plus the files the receiver opens for its next step. Earlier material stays reachable through the documents' links. Give guidance and an example, not a fixed list per route.
- **Detect:** Search handoff text for "complete", "cumulative", "all relevant", "every still-relevant" or "preserve" next to "package" or "attach"; check that no rule makes a reference list grow with every hop.

## Skill content

### 6. Project specifics in a reusable skill

- **Incident:** A team skill hard-coded `autobyteus-server-ts/docs/design/data_migration_guideline.md` for every project.
- **Breaks:** [Ground and prioritize instructions](skill-authoring-principles.md#ground-and-prioritize-instructions): name a project only when it changes behavior.
- **Instead:** Point to the project's own guidance (for example its `DESIGN.md` or `TESTING.md`) and let the project link its documents.
- **Detect:** Search skills for repository names, absolute paths, and product names.

### 7. Over-structuring what people write naturally

- **Incident:** Project Task descriptions were given required fields ("Depends on", "report back"); the user wanted ordinary, detailed task descriptions. A prerequisite procedure was written as five numbered steps; the user asked for one short paragraph that trusts the model's judgement (2026-10-19).
- **Breaks:** [Write the operating contract](skill-authoring-principles.md#write-the-operating-contract): prescribe exact structure only where the operation is fragile.
- **Instead:** Describe what a good result contains; keep tracking data (dependencies, order) in the role's own records. State the purpose, the boundary, and the few things that must happen; trust a capable model with the rest.
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
- **Instead:** Treat size, method, and metadata as reasons to look closer. Before blocking work or starting new work, tell apart a confirmed failure, unknown origin or freshness, optional cleanup, and an explicit request.
- **Detect:** For every rule that blocks work or forces an action, name the evidence it requires; flag rules triggered by a proxy (size, age, method, naming, metadata) alone.

### 14. Writing in jargon instead of plain actions

- **Incident:** PR #33's guidance used "unverified currency" (for "possibly outdated"), "proportionate" about 20 times, slash compounds such as "generation/capture", and sentences that chained abstract nouns; the meaning was right but hard to act on (2026-10-07). The API/E2E "test-case ledger" was a progress log whose name hid its purpose; the user asked why it was called a ledger (renamed "test progress", 2026-10-18).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), clarity and plain language: name the actor, action, and result in everyday words.
- **Instead:** Say what to do. Use a short list when there are several criteria, and a concrete check instead of "proportionately".
- **Detect:** Search changed text for slash compounds (`word/word`), vague qualifiers ("proportionate", "appropriate", "as needed", "relevant"), and sentences that pile up nouns ending in -ity, -ance, or -ence; for each, ask what exactly the agent does.

### 15. One full procedure for every request

- **Incident:** The Project Task Manager ran investigate, plan file, approval, propose, and dispatch even when the user said "delegate this Task to the software team", which already named the Task and worker and gave approval (2026-10-08).
- **Breaks:** [Write the operating contract](skill-authoring-principles.md#write-the-operating-contract): the shortest coherent path, with gates only where they protect something.
- **Instead:** Give the small, common request its own short path, and say that an explicit user instruction is the approval it grants.
- **Detect:** Walk the smallest realistic request through the skill (one named item, a direct instruction); flag each step or approval that adds nothing for it.

### 16. Re-reading state instead of keeping it

- **Incident:** The Project Task Manager listed every Project, every available agent, and every Task including DONE ones for each request, re-checked assignments before each dispatch, and kept no record between conversations (2026-10-08).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), economy: an instruction, including a tool call, must change what the role does.
- **Instead:** In a role's procedure at runtime, read only what the next decision needs, use the tools' filters, and give knowledge that lasts (who does what, what is open) a saved record that the role reads first and updates as it works.
- **Detect:** For each read or listing call a skill requires, name what the role does differently with the answer and whether a filter or saved record already gives it.

### 19. A trigger the agent cannot observe

- **Incident:** Skill text told agents to act "after compression" or "when work spans many sessions" (deep researcher, 2026-10-13), and a draft API/E2E rule said "after compaction, read the progress log". The agent cannot tell that its context was compacted.
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), grounding: a condition must be something the role can check.
- **Instead:** Trigger on what the agent can see: picking the work back up, being unsure what already ran, a file's content. Mention compaction only as the reason a record exists.
- **Detect:** Search skills for "compaction", "compression", "session", "context window" and "forget"; for each, check that the condition is one the agent can observe.

### 20. Symlinked references the reader cannot see in a listing

- **Incident:** The Solution Designer skill's required reading `design-principles.md` is a symlink into the team's `shared/` folder. The agent listed the skill folder with `find -type f`, which skips symlinks, decided the file did not exist, and told the user so twice (2026-10-16).
- **Breaks:** [Ground and prioritize instructions](skill-authoring-principles.md#ground-and-prioritize-instructions): a skill that depends on a package fact the reader cannot easily see should state it.
- **Instead:** Where the skill tells the reader to read a symlinked file, add one hint: some files are symbolic links; open them by path.
- **Detect:** List links with `find <package> -type l` and check that the skill that reads each one carries the hint; `find -L <package> -type l` prints broken links.

### 21. A tool list that does not match the work

- **Incident:** The Article Writer had `generate_speech` though no step makes speech, and its skill required image-to-image editing without granting `edit_image`; the reviewer carried three process-control tools its review never used (2026-10-14).
- **Breaks:** [§5](package-design-principles.md#5-attach-skills-deliberately): give each Agent only the tools its work or handoff uses, and every tool its work needs.
- **Instead:** Derive the list from the skill's actions: each action that needs a tool gets one, and each tool traces to an action.
- **Detect:** For each tool in `agent-config.json`, find the skill step that uses it; for each step that edits an image, hands off, or runs a process, find the tool.

### 22. A review standard the reviewer cannot read

- **Incident:** The Article Reviewer judged platform fit and mobile legibility while the rules sat in the writer's skill references; its own package had no mention of them (2026-10-14).
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file): a rule needs one owner that every role applying it can read.
- **Instead:** Put a standard that writer and reviewer both apply in a file shared at the Team level and link it from both skills.
- **Detect:** For each dimension a reviewer judges, find the file that states the bar and check that the reviewer's skill can reach it.

## Creator process

### 10. Deciding from a stale or partial view of the package

- **Incidents:** A decision based on a checkout 16 commits behind nearly pushed a duplicate design guide; a code-reviewer change made without reading its linked shared references duplicated the team's design examples, and a full read later found nine more inconsistencies (2026-10-13).
- **Breaks:** [§9](package-design-principles.md#9-update-and-restructure-safely): judge and change the actual, complete package.
- **Instead:** Fetch first and work from the target branch (`origin/<branch>`) or a fresh worktree from it. Read the whole package before judging, as the [skill](../SKILL.md#inputs-and-operation) describes, including the shared files its references link to.
- **Detect:** Compare the checkout with its remote branch and note the commit inspected; compare the analysis's list of files read in full with the package's files and their links.

### 11. Pushing without checking what goes out

- **Incident:** A push to `main` also published two unrelated local commits that sat beneath the new one.
- **Breaks:** Diff contained to the approved scope ([SKILL.md step 4](../SKILL.md#4-validate-and-recover)).
- **Instead:** Before pushing, list `origin/<branch>..HEAD` and push only when it contains exactly the intended commits; build the change on a fresh branch from the remote when the local branch carries other work.
- **Detect:** The list of commits to push, checked immediately before the push.

### 17. Merging without updating the local checkout

- **Incident:** After PR #46 was merged, the local checkout was left behind because uncommitted edits overlapped the merged file, so the installed creator skill, linked to that checkout, kept running the old text (2026-10-13).
- **Breaks:** [Step 5](../SKILL.md#5-persist-deliver-and-route-the-result): a merged change takes effect only when the local checkout has it.
- **Instead:** Right after merging, update the local checkout as the [skill](../SKILL.md#5-persist-deliver-and-route-the-result) describes, preserving any overlapping local work.
- **Detect:** After each merge, compare the local branch with `origin/<branch>`; it should be neither behind nor ahead.

### 24. Judging only the fix the request proposes

- **Incident:** Task autobyteus-agents-34 proposed a "Follow-up Tasks go to" field so roles would know where to send follow-ups. The Creator compared that field with a stricter "Requested by" and recommended the field. It did not first map where follow-ups are recorded: five places, two senders. The user asked for one home and one sender; a fresh Creator asked a neutral question recommended exactly that (2026-10-20).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files): trace the information and the path from request to result before choosing a design.
- **Instead:** Read a proposed fix as the requester's view of the problem. Map the information or flow it concerns across every role first: where each kind of record is written, who reads it, who sends it. Then judge the proposal against that map, and say so when a different structure is better.
- **Detect:** Check that the analysis maps the current information or flow before it discusses the proposed fix, and that it names at least one alternative to the proposal.
