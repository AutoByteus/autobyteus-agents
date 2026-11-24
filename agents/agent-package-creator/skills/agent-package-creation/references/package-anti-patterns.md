# Package Anti-Patterns

Keep entries short and general: one cause per entry, the incident in one or two sentences, and merge entries that share a cause.

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
| 24 | Judging only the fix the request proposes | Creator process |
| 25 | A link that exists only for another file's links | Package design |
| 26 | Softening requirements while restructuring | Creator process |
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
| 40 | Leaving the structure for later | Creator process |
| 41 | A pull request before the evaluation | Creator process |
| 42 | Text that describes the file instead of the work | Skill content |
| 44 | A step before an irreversible action that only prose holds | Package design |
| 43 | A package that grows with every update | Creator process |

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

- **Incidents:** The `delegate_task` ban sat in five files of two teams, so fixing one left the others refusing (2026-10-14); the API/E2E report wrote each result in up to seven places, and follow-ups lived in five documents with two senders (2026-10-18, 2026-10-20). The user: the problem is the information structure, not the amount of documents.
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

- **Incident:** A shared file linked two design files, so the Creator linked them into delivery and API/E2E, which never use them; every change to them sent those agents an update notice (2026-10-20).
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file): what a role reads is owned by its skill; a shared file must not decide it through its own links.
- **Instead:** A role links only the files its skill names. A shared file links only files that every role reading it also has, and names the others in plain text ("Core Principle 7 in the team's design principles").
- **Detect:** [check-links.py](../scripts/check-links.py) reports links no file of the skill names, and broken links in a shared file seen through a role's folder.

### 30. More Agents than the work needs

- **Incidents:** A teacher's planner and designer worked better as one Agent; a researcher's brief to a separate writer carried less than the research behind it (2026-10-25); a reviewer of the reviewer only added a run and a wait (2026-11-02).
- **Breaks:** [principles §1](package-design-principles.md#1-choose-the-package-boundary-from-the-work): start with one Agent and one skill.
- **Instead:** Begin with one Agent and one skill, and split only on evidence from runs. Before proposing a second Agent, apply the test in principles §1 (full context: keep together; independent judgement or different limits: split), and write down what each handoff would lose and what the split gains. A role that checks another checker needs evidence that the owner's own review fails; first give the owner that review's questions.
- **Detect:** For each handoff in a proposed or existing package, ask what the receiver will not know that the sender knew, and whether one Agent with both skills would do the work without that loss. Two Agents writing one record, or a request that restates fields of a record both share, are the clearest signs.

### 33. Making a role find earlier work by guessing words

- **Incident:** A content creator reused earlier replies by guessing search words over 186 posts, skipped the look-up for 4 of 8 new pieces and missed answers worded differently; the user asked for "a book's table of contents" (2026-11-03).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files), information the roles share: a record serves the way its reader looks things up.
- **Instead:** When a role often looks up earlier work by meaning (the question it answered, the decision it made), give it a record keyed that way: topics pointing to the items, with what each says, kept current where items are made and fixed when a look-up misses. It holds a fact no other file holds, so it is not a duplicate.
- **Detect:** For each step that tells a role to check earlier work, name the record it reads and what that record is keyed by. A step that greps raw items with guessed terms, or that runs logs show being skipped, is a lead.

### 36. Leaving behind what a role created in the user's shared space

- **Incidents:** The Computer Use Operator's skill never said the tabs it opens are its to close; 32 of 97 tasks left tabs open in the user's signed-in browser, and the user closed about 20 by hand (2026-11-08). A Product designer ran `tailscale serve` without reading the configuration and replaced the entry the user's phone used, then removed it in its clean-up (2026-11-16).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files): the path from request to completion includes what a role leaves behind.
- **Instead:** When a role works in a space the user or other roles also use (a browser, a desktop, background processes, a shared folder), its skill says how the role tells its own items from others' (here the tab IDs its own calls returned, since the tool lists every task's tabs), that it reads the shared state before changing it and adds only where nothing exists (a new entry can replace another's), that it removes its own when the task ends in any outcome and never others', and that its report names anything it left and why. A procedure several roles need goes into one skill they share.
- **Detect:** For each agent with tools that create shared state (`open_tab`, `start_background_process`, desktop input), or with `run_bash` and work that changes the machine's settings (Tailscale Serve, listening ports, firewall, sharing), find the skill step that reads the state first, the one that cleans up at the end, and how the role identifies its own items.

### 37. An agent's own reusable knowledge kept in a Project's folder

- **Incident:** The Computer Use Operator kept its knowledge of each website in each Project's workspace, so Projects relearned the same sites and three sites had drifting copies (2026-11-09).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files), knowledge an agent reuses across Projects.
- **Instead:** Keep it in the agent's semantic memory, which every agent has. Its skill keeps the agent's craft there and leaves only the Project's own part (which account, the Project's steps) in the Project. It also says how concurrent runs write, and where the files go when the app gives no semantic memory.
- **Detect:** For each skill that writes files meant for later tasks (knowledge, notes, an index of earlier work), ask whose they are: the Project's work or state, or the agent's craft that another Project would reuse. The second, under `<workspace>/`, is a lead.

### 44. A step before an irreversible action that only prose holds

- **Incident:** A pipeline agent kept its records in a register a script checked. Its ladder said every record is qualified before it is ranked and contacted, but the script checked one later stage only. In practice the agent went from sourced straight to ranked, and no record was ever qualified. Under a request for speed, it qualified contacts from their own profile headlines and queued messages to them, two of which went out to the wrong people (2026-11-24).
- **Breaks:** [Write the operating contract](skill-authoring-principles.md#write-the-operating-contract): prescribe scripts where the operation is fragile. A step that guards an action outside the workspace (a message, a submission, a payment) is fragile: skipping it fails silently until someone outside is harmed.
- **Instead:** Give each step a result field in the record, and have the checker refuse a record at a stage without every earlier stage's result. The agent keeps the judgement (what counts as evidence); the checker keeps the order. An approval is a recorded result too: it names what the approver saw.
- **Detect:** For each skill with a stage ladder or gates and a checker script, list each stage's required result and whether the script refuses a record without it. A stage the counts show as always empty is a lead.

## Skill content

### 6. Project specifics in a reusable skill

- **Incidents:** A team skill hard-coded one project's migration guide for every project; a missed test was blamed on the API/E2E skill although the engineer had followed the project's own `TESTING.md` exactly (2026-10-20).
- **Breaks:** [Ground and prioritize instructions](skill-authoring-principles.md#ground-and-prioritize-instructions): name a project only when it changes behavior.
- **Instead:** Point to the project's own guidance (for example its `DESIGN.md` or `TESTING.md`) and let the project link its documents. When a project problem proposes a package change, fix the project's document when the agent followed it, and leave the package general.
- **Detect:** Search skills for repository names, absolute paths, and product names. For a problem from project work, check the agent's own record against the project document it followed before changing the package.

### 7. Over-structuring what people write naturally

- **Incidents:** Task descriptions got required fields and a prerequisite became five numbered steps (2026-10-19); an eight-step intake and a debugging guide restated what live runs showed the model did from the purpose alone. The user: "you're giving some kind of instruction they don't even need" (2026-10-20).
- **Breaks:** [Write the operating contract](skill-authoring-principles.md#write-the-operating-contract): prescribe exact structure only where the operation is fragile.
- **Instead:** Describe what a good result contains; keep tracking data (dependencies, order) in the role's own records. State the purpose, the boundary, and the few things that must happen; trust a capable model with the rest. Spell out exact steps only where there is one safe way: a tool that behaves surprisingly, an irreversible action, a fixed format another system parses.
- **Detect:** For each required field or template, name what breaks without it; if nothing does, make it guidance. For each step in a list, ask whether a capable model would do it anyway from the purpose, or whether another part of the skill already says it; if so, cut it.

### 8. Instructing default runtime behavior

- **Incident:** The shared design rule told agents to look up `AGENTS.md`, which agents read by default.
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), economy: remove words that change no action.
- **Instead:** Instruct only what the runtime or role would not do anyway.
- **Detect:** For each instruction, ask whether the agent would behave differently without it.

### 9. Procedures that assume an external system's behavior

- **Incident:** An event-search procedure asked for Luma keyword search; Luma's public pages have none, and `lu.ma` had moved to `luma.com`. A one-line tool note described the Project Task Manager's `list_running_agents` as showing its delegated copies, which the tool's own description excludes (2026-11-19).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), grounding: derive obligations from observed tools and systems.
- **Instead:** Check the external site, API, or tool before writing steps for it, and record what was observed.
- **Detect:** List every external system a skill depends on and the evidence for each assumed capability.

### 13. Treating a proxy signal as decisive evidence

- **Incidents:** Fixture size was taken as real-data copying (2026-10-07); an invented six-return cap halted a study that still had useful work (2026-10-28); test-count progress displaced the goal-level decision (2026-11-01).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), grounding: obligations need evidence, not an unqualified heuristic.
- **Instead:** Treat size, method, and metadata as reasons to look closer. Before blocking work or starting new work, tell apart a confirmed failure, unknown origin or freshness, optional cleanup, and an explicit request. Tie the next work to the user's goal: an activity count or a correctly working component does not establish system usefulness or novelty.
- **Detect:** For every rule that blocks work or forces an action, name the evidence it requires; flag rules triggered by a proxy (size, age, method, naming, metadata, cycle or no-progress count) alone. Search package instructions for numeric retry/revision/return limits next to stop or escalation rules; distinguish an explicit user boundary or a real operational resource limit from an agent-invented substitute for goal/evidence review. For progress and completion rules, check what the metric actually establishes and whether peripheral repairs can displace the main decision.

### 14. Writing in jargon instead of plain actions

- **Incident:** Guidance used "unverified currency", "proportionate" about 20 times and slash compounds (2026-10-07); a progress log was called a "ledger" (2026-10-18).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), clarity and plain language: name the actor, action, and result in everyday words.
- **Instead:** Say what to do. Use a short list when there are several criteria, and a concrete check instead of "proportionately".
- **Detect:** Search changed text for slash compounds (`word/word`), vague qualifiers ("proportionate", "appropriate", "as needed", "relevant"), and sentences that pile up nouns ending in -ity, -ance, or -ence; for each, ask what exactly the agent does.

### 15. One full procedure for every request

- **Incident:** The Project Task Manager ran investigate, plan file, approval, propose, and dispatch even when the user said "delegate this Task to the software team", which already named the Task and worker and gave approval (2026-10-08). The Creator itself ran its full read, analysis and evaluation gate for a two-line tool grant; the user: "very much heavy process just to add new line" (2026-11-19).
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

### 42. Text that describes the file instead of the work

- **Incident:** Every shared file of a writing team opened with who uses it ("The writer applies it and the reviewer judges by it"), and the Creator's own references opened the same way; the user: if you have a principle, state the principle (2026-11-16).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), the lines: each line changes what the agent does.
- **Instead:** State the rule. The files that use it link it and say when to read it; what a file is for shows in its name and its content.
- **Detect:** Read the first lines of each file and every sentence that names the file itself, its readers or who applies it ("this file", "used by", "applies it", "shared by"); ask what the agent does differently because of it.

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

- **Incident:** A Task proposed a "Follow-up Tasks go to" field; the Creator recommended it without first mapping where follow-ups were recorded (five places, two senders), and the user asked for one home and one sender (2026-10-20).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files): trace the information and the path from request to result before choosing a design.
- **Instead:** Read a proposed fix as the requester's view of the problem. Map the information or flow it concerns across every role first: where each kind of record is written, who reads it, who sends it. Then judge the proposal against that map, and say so when a different structure is better.
- **Detect:** Check that the analysis maps the current information or flow before it discusses the proposed fix, and that it names at least one alternative to the proposal.

### 26. Softening requirements while restructuring

- **Incident:** A restructure of the design principles mapped every section to its new home, but rewording softened eleven requirements ("should be derived" became "is derived"); the user asked whether anything was lost (2026-10-20).
- **Breaks:** [§9](package-design-principles.md#9-update-and-restructure-safely): a restructure moves and joins text; it does not change what the text requires.
- **Instead:** Carry each requirement word, qualifier, and named case with the text it belongs to. Reword only where the meaning stays the same strength. Merge two statements only when they say the same thing; when they cover different cases, keep both.
- **Detect:** Run [compare-wording.py](../scripts/compare-wording.py) on the old and new files, and read every sentence it lists beside its new home, starting with those whose closest match lacks a requirement word. A dropped count is a lead, not a verdict: merged duplicates also lower it.

### 29. Asking the user what the evidence already answers

- **Incident:** The Creator sent a teacher six questions her own modules and a normal school day already answered; she said: "think about the reality … instead of asking me those questions" (2026-10-24).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), grounding: derive what you can from the user's materials and a realistic use, and decide it.
- **Instead:** Before asking, check each question against the user's files and a realistic day of the user's work; decide what they settle, and report the decision in the result. Ask only where a wrong guess would make the result unusable, in one short line. Give the roles you write the same habit: infer, deliver, let the user correct.
- **Detect:** For each question in a message to the user, name the evidence you looked at and why it does not settle the question. In skills, search for "ask", "confirm" and "approval" and check that each one names why the role cannot infer the answer.

### 31. Private information in a public package

- **Incident:** An audit of the public agents repository found the user's name in a style profile, his home and server-data paths, private chat names and his career plans in files and history; the user: "very, very important, no private information" (2026-10-30).
- **Breaks:** [Create or update canonical files](../SKILL.md#3-create-or-update-canonical-files): a public package carries nothing private about the user, and material from private sources enters only generalized.
- **Instead:** Generalize before writing, keep work records outside a public repository, and run [check-private-info.py](../scripts/check-private-info.py) on imported material and before every commit, with the user's own terms in a private list.
- **Detect:** `check-private-info.py --staged` before a commit; `check-private-info.py <package folders>` for the current files; for history, the same patterns over every blob reachable from the remote's branches, tags, and pull-request refs.

### 32. Answering repeated feedback with another rule

- **Incident:** A user corrected a research team's method again and again; each correction added sentences while the review format still asked for "the smallest useful next work" and kept producing the repair queue (2026-11-01).
- **Breaks:** [§9](package-design-principles.md#9-update-and-restructure-safely): diagnose structure and flow before wording.
- **Instead:** When the same kind of correction returns, stop adding text. Find what produces the behaviour: which record the role fills in, what its first step is, what a review asks, who checks whom, and what a role is never asked. Change that, and remove the sentences it replaces. Also check how the correction travelled, since a role can narrow it on the way to you.
- **Detect:** Read the package's history for the same complaint across commits. For each repeated one, name the record, step, review question or route that now makes the behaviour hard to repeat; if the answer is only a new sentence, the cause is untouched.

### 34. Optimizing a package's form while its rules produce the failure

- **Incident:** A writing team's article read "like a novel"; the Creator's analysis judged only the team's form and carried over the rule that produced it (narrative mode for any firsthand material) (2026-11-05).
- **Breaks:** [§9](package-design-principles.md#9-update-and-restructure-safely): diagnose observed defects and their owners before choosing edits; and [step 1](../SKILL.md#1-map-the-target-and-ownership-spine): find who owns the rule that failed.
- **Instead:** When the request comes from a bad result, read the result first, name each failure in it (with examples), and trace each to the rule, default or missing rule that produced it, before or alongside the structural clean-up. A restructure moves rules; it must also judge them.
- **Detect:** The analysis lists the failures seen in the output, each with the rule that caused it. A restructure whose findings are all about form, after the user complained about the output, is a lead.

### 35. A link that leaves the skill folder

- **Incident:** Skills linked `../../../../shared/writing-principles.md`; the link check passed in the repository, but the app installs each skill on its own, and in a live run both agents worked without the standard (2026-11-05).
- **Breaks:** [§3](package-design-principles.md#3-give-each-rule-one-authoritative-file): a rule needs a home every role applying it can read, as the role runs.
- **Instead:** Give each skill a `references/` symbolic link to every shared file it reads, link to that local path, and add the hint anti-pattern 20 asks for, as the Software Engineering Team does.
- **Detect:** For every Markdown link in a skill folder (not following symbolic links), resolve it and flag any target outside that skill's folder.

### 38. Checking a new rule only against its own lines

- **Incident:** Two new design principles passed the link, wording and privacy checks; a whole-set read then found one contradicted an accepted setter and the other asked for one builder across separate codebases (2026-11-12).
- **Breaks:** [Step 4](../SKILL.md#4-validate-and-recover): one owner per rule and no competing rules across the package.
- **Instead:** Read the whole set. For each rule, exception, example and template line on the same ground, say whether the new rule agrees with it, contradicts it, or repeats it. Then judge the rule as a practitioner would, including where following it to the letter does harm.
- **Detect:** The result lists, for each added or changed rule, what it was checked against and the outcome.

### 39. A rule for every incident

- **Incident:** One ticket's review findings were drafted as new bullets, Signals, Checks and template lines although existing rules covered both; the user: each incident adds another point, with no end (2026-11-12). The same happened in a rule set a role keeps for the user: a content creator's learning step filed each correction of a voice as one more dated item, 22 in all, until the general opening rule no longer caught a new form ("I just published a short video on…"), and the user had to correct it again (2026-11-21).
- **Breaks:** [§2](package-design-principles.md#2-design-responsibilities-before-files) (extend the owner instead of adding a place) and [§9](package-design-principles.md#9-update-and-restructure-safely) (diagnose before adding).
- **Instead:** Name the general practice of the field the incident shows (for design principles, an established architecture practice), and add a rule only when the set does not yet state that practice. If it does, the incident becomes an example or case study, or a rule in the project's own documents, and the existing rule gains at most a few words naming the missed form.
- **Detect:** For each rule a change adds, name the general practice it states and the existing rule closest to it; a rule that names a case rather than a practice, or that the closest rule already covers, is a lead. Read the set's recent history: a rule, Signal or Check added per incident is a lead for a consolidation pass. For a role that records the user's corrections (a voice, a style or review guide), check that its learning step rewords the practice a correction belongs to instead of appending an item.

### 40. Leaving the structure for later

- **Incident:** Extending a writing team, the Creator patched the principles with "sections 4 to 6 hold in every style except narrative" and left six structure problems in a chat for "after the merge"; the user: folders and files are reorganized constantly, as code is refactored (2026-11-15).
- **Breaks:** [§9](package-design-principles.md#9-update-and-restructure-safely): restructure as you go.
- **Instead:** Put the structure changes into the analysis's planned changes and apply them in the same update, first and in their own commit; then make the content change on the new structure.
- **Detect:** The analysis's planned changes include the structure changes its findings call for, and the result shows them applied. A patch sentence that excepts a case from a rule, a renamed heading under an old file name, or a restructure left "for later" is a lead.

### 41. A pull request before the evaluation

- **Incident:** To show the user wording before the merge, the Creator opened three pull requests before any evaluation; the skill tied only the merge to the evaluation. The user: a pull request means the change is proven better (2026-11-15).
- **Breaks:** [Step 5](../SKILL.md#5-persist-deliver-and-route-the-result): the pull request follows step 4, the evaluation included.
- **Instead:** Keep the change on its branch until it passes step 4. To show the wording earlier, give the branch's diff, a compare link or a diff file. Every change except a [small change](../SKILL.md#inputs-and-operation) is evaluated by default; only the user's word for that change waives it (the user: "unless the user specifically says evaluation is not needed, the default is always evaluation").
- **Detect:** Each pull request the Creator opens links an evaluation report dated before it; a pull request with "waiting for the evaluation" in its description is a lead.

### 43. A package that grows with every update

- **Incident:** In one day a writing team grew from 1,105 to 1,227 lines and the Creator's anti-patterns from 307 to 323, with no line having to show what it does; text that adds nothing passed every analysis (2026-11-16).
- **Breaks:** [§4](package-design-principles.md#4-apply-one-authoring-standard), the lines: a package grows only by lines that do something.
- **Instead:** The quality check records each changed file's size before and after and what each added line does, and the update removes what the change makes unnecessary.
- **Detect:** The analysis's size row; across the history, line counts per file that only rise.
