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
| 13 | Treating a proxy signal as decisive evidence | Skill content |
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
| 25 | A link that exists only for another file's links | Package design |
| 26 | Softening requirements while restructuring | Creator process |
| 27 | Moved to the evaluation skill (`agent-package-evaluation`, evaluation mistakes 1) | Creator process |
| 28 | Moved to the evaluation skill (`agent-package-evaluation`, evaluation mistakes 2) | Creator process |
| 29 | Asking the user what the evidence already answers | Creator process |
| 30 | More Agents than the work needs | Package design |
| 31 | Private information in a public package | Creator process |
| 32 | Answering repeated feedback with another rule | Creator process |
| 33 | Making a role find earlier work by guessing words | Package design |
| 34 | Optimizing a package's form while its rules produce the failure | Creator process |
| 35 | A link that leaves the skill folder | Package design |
| 36 | Leaving behind what a role created in the user's shared space | Package design |
| 37 | An agent's own reusable knowledge kept in a Project's folder | Package design |
| 38 | Checking a new rule only against its own lines | Creator process |
| 39 | A rule for every incident | Creator process |

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
- **Instead:** State the rule once (universal transition in `agent.md`, shared rules in the shared file) and use pointers elsewhere. For the documents roles produce: keep the documents the agents need. Find where each fact lives, extend that owner, and point to it elsewhere (one update kept the plan, progress log, record and history, each fact written once; another extended the implementation handoff into a Checks Run table that later roles reuse by ID). Compare the old and new structure so no check is lost (that comparison restored three). Records of one kind that several roles produce get one file the roles add to, and one sender if they leave the team.
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

### 25. A link that exists only for another file's links

- **Incident:** The Software Engineering Team's shared `ticket-scope.md` links two design files. When delivery and API/E2E got `ticket-scope.md`, those links broke in their skill folders, and the Creator linked both design files into those roles too. The roles never use them, and every change to the 1,800 lines sent their agents an update notice; the user asked why delivery has the design principles (2026-10-20). The STORM team has the same coupling the other way round: its shared file links a file no role has, so the link is broken in six skills.
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file): what a role reads is owned by its skill; a shared file must not decide it through its own links.
- **Instead:** A role links only the files its skill names. A shared file links only files that every role reading it also has, and names the others in plain text ("Core Principle 7 in the team's design principles").
- **Detect:** [check-links.py](../scripts/check-links.py) reports links no file of the skill names, and broken links in a shared file seen through a role's folder.

### 30. More Agents than the work needs

- **Incidents:** A request to help a chemistry teacher plan and design lessons got two Agents, a planner and a designer; after testing, the user found one Agent worked better. In the Marketing Team, the content creator asks the Deep Researcher for research; the research is good, but the brief it returns carries less than the context the researcher built, so the draft is written with less (2026-10-25). A research team got a third Agent to review the supervisor's direction; the user kept two: the supervisor already reviews the researcher, so the role that owns the direction also owns its challenge, and a reviewer of the reviewer only adds a run and a wait (2026-11-02).
- **Breaks:** [principles §1](package-design-principles.md#1-choose-the-package-boundary-from-the-work): start with one Agent and one skill.
- **Instead:** Begin with one Agent and one skill, and split only on evidence from runs. Before proposing a second Agent, apply the test in principles §1 (full context: keep together; independent judgement or different limits: split), and write down what each handoff would lose and what the split gains. A role that checks another checker needs evidence that the owner's own review fails; first give the owner that review's questions.
- **Detect:** For each handoff in a proposed or existing package, ask what the receiver will not know that the sender knew, and whether one Agent with both skills would do the work without that loss. Two Agents writing one record, or a request that restates fields of a record both share, are the clearest signs.

### 33. Making a role find earlier work by guessing words

- **Incident:** A content creator had to reuse earlier replies by guessing search words and reading whole approved posts (186 pieces); a topic catalog was rejected as a copy of the posts. In the next two days it skipped the look-up for 4 of 8 new pieces, and when it searched, it missed answers worded differently from the question ("worktrees and tickets" was answered as "file-based handoffs"). The user, who had reminded it again and again, asked for something "like a book's table of contents" (2026-11-03).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files), information the roles share: a record serves the way its reader looks things up.
- **Instead:** When a role often looks up earlier work by meaning (the question it answered, the decision it made), give it a record keyed that way: topics pointing to the items, with what each says, kept current where items are made and fixed when a look-up misses. It holds a fact no other file holds, so it is not a duplicate.
- **Detect:** For each step that tells a role to check earlier work, name the record it reads and what that record is keyed by. A step that greps raw items with guessed terms, or that runs logs show being skipped, is a lead.

### 36. Leaving behind what a role created in the user's shared space

- **Incident:** The Computer Use Operator, shared by three teams, works in the user's own signed-in browser. Its skill never said that the tabs it opens are its to close, so closing was each run's habit: over 23 runs, 32 of 97 tasks left their tabs open, and the busiest run opened a new tab for every page and closed none of 58. The user found about 20 stale tabs and closed them by hand (2026-11-08).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files): the path from request to completion includes what a role leaves behind.
- **Instead:** When a role works in a space the user or other roles also use (a browser, a desktop, background processes, a shared folder), its skill says how the role tells its own items from others' (here the tab IDs its own calls returned, since the tool lists every task's tabs), that it removes its own when the task ends in any outcome and never others', and that its report names anything it left and why.
- **Detect:** For each agent with tools that create shared state (`open_tab`, `start_background_process`, desktop input), find the skill step that cleans it up at the end and how the role identifies its own items.

### 37. An agent's own reusable knowledge kept in a Project's folder

- **Incident:** The Computer Use Operator, shared by three teams, kept what it learned about each website in the workspace (`<workspace>/web-ui-sites/`), so each Project's runs learned the same sites again. Three sites had two or three copies that had drifted apart: one copy learned how to send a DM, another how to search the inbox. The user: a Project's memory is documents in the Project's folder, and an agent's own experience is documents in the agent's own place (2026-11-09).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files), knowledge an agent reuses across Projects.
- **Instead:** Turn on semantic memory for the agent. Its skill keeps the agent's craft there and leaves only the Project's own part (which account, the Project's steps) in the Project. It also says how concurrent runs write, and where the files go when semantic memory is off.
- **Detect:** For each skill that writes files meant for later tasks (knowledge, notes, an index of earlier work), ask whose they are: the Project's work or state, or the agent's craft that another Project would reuse. The second, under `<workspace>/`, is a lead.

## Skill content

### 6. Project specifics in a reusable skill

- **Incidents:** A team skill hard-coded one project's migration guideline path for every project. A Task asked to teach the API/E2E engineer a full-rerun rule after a ticket missed two broken tests; the Creator first proposed a skill edit. The ticket's report showed the engineer had applied the project's `TESTING.md` rule exactly; the rule's wording was the gap. The user: agent packages are general, and project-specific rules live in the project's own files (2026-10-20).
- **Breaks:** [Ground and prioritize instructions](skill-authoring-principles.md#ground-and-prioritize-instructions): name a project only when it changes behavior.
- **Instead:** Point to the project's own guidance (for example its `DESIGN.md` or `TESTING.md`) and let the project link its documents. When a project problem proposes a package change, fix the project's document when the agent followed it, and leave the package general.
- **Detect:** Search skills for repository names, absolute paths, and product names. For a problem from project work, check the agent's own record against the project document it followed before changing the package.

### 7. Over-structuring what people write naturally

- **Incident:** Project Task descriptions were given required fields ("Depends on", "report back"); the user wanted ordinary, detailed task descriptions. A prerequisite procedure was written as five numbered steps; the user asked for one short paragraph that trusts the model's judgement (2026-10-19). The Project Task Manager's follow-up intake was drafted as eight steps, half of them restating rules the skill already had (search before creating, approval for each dispatch); a live run showed the model did all of them from the purpose alone (2026-10-20). A guide on finding a bug's cause first listed how to debug (read, reproduce, add logging, re-check a surprising result). Live runs showed the old text already did all of it, and the user said: "the model is so smart … you're giving some kind of instruction they don't even need". The guide kept only what the model could not know: the team's diagnostic boundaries and reporting conventions (2026-10-20).
- **Breaks:** [Write the operating contract](skill-authoring-principles.md#write-the-operating-contract): prescribe exact structure only where the operation is fragile.
- **Instead:** Describe what a good result contains; keep tracking data (dependencies, order) in the role's own records. State the purpose, the boundary, and the few things that must happen; trust a capable model with the rest. Spell out exact steps only where there is one safe way: a tool that behaves surprisingly, an irreversible action, a fixed format another system parses.
- **Detect:** For each required field or template, name what breaks without it; if nothing does, make it guidance. For each step in a list, ask whether a capable model would do it anyway from the purpose, or whether another part of the skill already says it; if so, cut it.

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

### 13. Treating a proxy signal as decisive evidence

- **Incidents:** Product guidance equated megabyte/captured fixtures with real-data copying and an older baseline-report pin with stale UI, prompting an unsupported refresh (2026-10-07). A research package invented a six-return cap and a two-no-progress-return stop; its first real study halted at six despite new evidence and useful authorized work remaining. The user rejected both the cap and a proposed two-return extension (2026-10-28). Research supervision later prioritized repair and test-count progress without establishing which work could change the goal-level decision (2026-11-01).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), grounding: obligations need evidence, not an unqualified heuristic.
- **Instead:** Treat size, method, and metadata as reasons to look closer. Before blocking work or starting new work, tell apart a confirmed failure, unknown origin or freshness, optional cleanup, and an explicit request. Tie the next work to the user's goal: an activity count or a correctly working component does not establish system usefulness or novelty.
- **Detect:** For every rule that blocks work or forces an action, name the evidence it requires; flag rules triggered by a proxy (size, age, method, naming, metadata, cycle or no-progress count) alone. Search package instructions for numeric retry/revision/return limits next to stop or escalation rules; distinguish an explicit user boundary or a real operational resource limit from an agent-invented substitute for goal/evidence review. For progress and completion rules, check what the metric actually establishes and whether peripheral repairs can displace the main decision.

### 14. Writing in jargon instead of plain actions

- **Incident:** One update's guidance used "unverified currency" (for "possibly outdated"), "proportionate" about 20 times, slash compounds such as "generation/capture", and sentences that chained abstract nouns; the meaning was right but hard to act on (2026-10-07). The API/E2E "test-case ledger" was a progress log whose name hid its purpose; the user asked why it was called a ledger (renamed "test progress", 2026-10-18).
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

- **Incident:** After a merge, the local checkout was left behind because uncommitted edits overlapped the merged file, so the installed creator skill, linked to that checkout, kept running the old text (2026-10-13).
- **Breaks:** [Step 5](../SKILL.md#5-persist-deliver-and-route-the-result): a merged change takes effect only when the local checkout has it.
- **Instead:** Right after merging, update the local checkout as the [skill](../SKILL.md#5-persist-deliver-and-route-the-result) describes, preserving any overlapping local work.
- **Detect:** After each merge, compare the local branch with `origin/<branch>`; it should be neither behind nor ahead.

### 24. Judging only the fix the request proposes

- **Incident:** A Task proposed a "Follow-up Tasks go to" field so roles would know where to send follow-ups. The Creator compared that field with a stricter "Requested by" and recommended the field. It did not first map where follow-ups are recorded: five places, two senders. The user asked for one home and one sender; a fresh Creator asked a neutral question recommended exactly that (2026-10-20).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files): trace the information and the path from request to result before choosing a design.
- **Instead:** Read a proposed fix as the requester's view of the problem. Map the information or flow it concerns across every role first: where each kind of record is written, who reads it, who sends it. Then judge the proposal against that map, and say so when a different structure is better.
- **Detect:** Check that the analysis maps the current information or flow before it discusses the proposed fix, and that it names at least one alternative to the proposal.

### 26. Softening requirements while restructuring

- **Incident:** A restructure regrouped the SE design-principles guide so each rule had one home. The map showed every old section's new home, but rewording had softened eleven requirements: "should be derived" became "is derived", "justify it explicitly" became "record why", "File placement must follow ownership" and "the operational benefit justifies the risk" dropped out in merges. The user asked whether anything was lost; a line-by-line read found four and a requirement-word comparison seven more (2026-10-20).
- **Breaks:** [§9](package-design-principles.md#9-update-and-restructure-safely): a restructure moves and joins text; it does not change what the text requires.
- **Instead:** Carry each requirement word, qualifier, and named case with the text it belongs to. Reword only where the meaning stays the same strength. Merge two statements only when they say the same thing; when they cover different cases, keep both.
- **Detect:** Run [compare-wording.py](../scripts/compare-wording.py) on the old and new files, and read every sentence it lists beside its new home, starting with those whose closest match lacks a requirement word. A dropped count is a lead, not a verdict: merged duplicates also lower it.

### 29. Asking the user what the evidence already answers

- **Incident:** For a teaching team, the Creator sent the teacher six questions (region, library location, plan format, devices, first topic, textbook), each with a recommendation. Her own modules already named her region and curriculum, and a normal school day settled the rest. She answered: "make it as simple … think about the reality … instead of asking me those questions". The first skill drafts also told the agents to ask her everything at once and to wait for plan approval (2026-10-24).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), grounding: derive what you can from the user's materials and a realistic use, and decide it.
- **Instead:** Before asking, check each question against the user's files and a realistic day of the user's work; decide what they settle, and report the decision in the result. Ask only where a wrong guess would make the result unusable, in one short line. Give the roles you write the same habit: infer, deliver, let the user correct.
- **Detect:** For each question in a message to the user, name the evidence you looked at and why it does not settle the question. In skills, search for "ask", "confirm" and "approval" and check that each one names why the role cannot infer the answer.

### 31. Private information in a public package

- **Incident:** An audit of the public agents repository found the user's name in an author style profile, his home-folder paths and server-data paths in committed work records, private group-chat names and admin session URLs in marketer packages removed months earlier but still in history, and references to his private career and investor plans on a task board and in evidence files. People install and clone the repository directly; the user: "very, very important, no private information" (2026-10-30).
- **Breaks:** [Create or update canonical files](../SKILL.md#3-create-or-update-canonical-files): a public package carries nothing private about the user, and material from private sources enters only generalized.
- **Instead:** Generalize before writing, keep work records outside a public repository, and run [check-private-info.py](../scripts/check-private-info.py) on imported material and before every commit, with the user's own terms in a private list.
- **Detect:** `check-private-info.py --staged` before a commit; `check-private-info.py <package folders>` for the current files; for history, the same patterns over every blob reachable from the remote's branches, tags, and pull-request refs.

### 32. Answering repeated feedback with another rule

- **Incident:** A user corrected a research team's method again and again: start from existing work, compare directions, do not drop into small holes. Each correction added sentences to the skills while the assignment, report and review cycle that produced the behaviour stayed the same. A review format still asked for "the smallest useful next work", so it still produced a repair queue beside a new sentence saying not to. The user: "I have provided quite a lot of feedback in the past and I don't know why it's still not really improved" (2026-11-01).
- **Breaks:** [§9](package-design-principles.md#9-update-and-restructure-safely): diagnose structure and flow before wording.
- **Instead:** When the same kind of correction returns, stop adding text. Find what produces the behaviour: which record the role fills in, what its first step is, what a review asks, who checks whom, and what a role is never asked. Change that, and remove the sentences it replaces. Also check how the correction travelled, since a role can narrow it on the way to you.
- **Detect:** Read the package's history for the same complaint across commits. For each repeated one, name the record, step, review question or route that now makes the behaviour hard to repeat; if the answer is only a new sentence, the cause is untouched.

### 34. Optimizing a package's form while its rules produce the failure

- **Incident:** The user found an article from a writing team "like a novel", not a technical blog. The Creator's analysis of the team judged only its form (repeated rules, six priority lists, duplicate records), and the restructure carried one rule over unchanged: choose the narrative mode for any firsthand material. That rule, chosen by whose material it was rather than what kind of article it was, produced the story-style article. The user pointed at the output before the Creator did (2026-11-05).
- **Breaks:** [§9](package-design-principles.md#9-update-and-restructure-safely): diagnose observed defects and their owners before choosing edits; and [step 1](../SKILL.md#1-map-the-target-and-ownership-spine): find who owns the rule that failed.
- **Instead:** When the request comes from a bad result, read the result first, name each failure in it (with examples), and trace each to the rule, default or missing rule that produced it, before or alongside the structural clean-up. A restructure moves rules; it must also judge them.
- **Detect:** The analysis lists the failures seen in the output, each with the rule that caused it. A restructure whose findings are all about form, after the user complained about the output, is a lead.

### 35. A link that leaves the skill folder

- **Incident:** The Article Writing Team's skills linked their shared standard as `../../../../shared/writing-principles.md`. The link resolves inside the repository, so the link check passed, but the app installs each skill into the workspace on its own (`.claude/skills/<skill>`), where the path leads nowhere. In a live run the writer searched the disk, did not find the file, and both agents worked without the team's standard (2026-11-05).
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file): a rule needs a home every role applying it can read, as the role runs.
- **Instead:** Give each skill a `references/` symbolic link to every shared file it reads, link to that local path, and add the hint anti-pattern 20 asks for, as the Software Engineering Team does.
- **Detect:** For every Markdown link in a skill folder (not following symbolic links), resolve it and flag any target outside that skill's folder.

### 38. Checking a new rule only against its own lines

- **Incident:** Two rules added to a team's design principles (a required collaborator is a required parameter; one builder for a picture shown in several places) passed the link, wording and privacy checks and went to the user. A whole-set read afterwards found that the first contradicted the same principle's accepted setter (a collaborator connected after construction), and the second asked for one builder across a server and its clients, which separate codebases cannot share. The user asked for this check after every principles update (2026-11-12).
- **Breaks:** [Step 4](../SKILL.md#4-validate-and-recover): one owner per rule and no competing rules across the package.
- **Instead:** Read the whole set. For each rule, exception, example and template line on the same ground, say whether the new rule agrees with it, contradicts it, or repeats it. Then judge the rule as a practitioner would, including where following it to the letter does harm.
- **Detect:** The result lists, for each added or changed rule, what it was checked against and the outcome.

### 39. A rule for every incident

- **Incident:** One ticket's review found a collaborator made optional for tests and the same rows built twice for a list and an open view. The Creator drafted both as new bullets, Signals, Checks and template lines in a team's design principles, though "a missing collaborator fails loudly" and "each fact is derived by one owner" already covered them; a test run on the old text caught the first. The user: each incident adds another point, with no end; the principles should stay at the level of structure (2026-11-12).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files) (extend the owner instead of adding a place) and [§9](package-design-principles.md#9-update-and-restructure-safely) (diagnose before adding).
- **Instead:** Ask first whether the incident shows a general gap at the set's level. If an existing rule covers it, the incident becomes an example or case study, or a rule in the project's own documents, and the existing rule gains at most a few words naming the missed form.
- **Detect:** For each rule a change adds, name the existing rule closest to it and why that rule does not cover the incident. Read the set's recent history: a rule, Signal or Check added per incident is a lead for a consolidation pass.
