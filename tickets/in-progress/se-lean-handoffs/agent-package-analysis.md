# Agent Package Analysis: lean handoffs in the Software Engineering Team

- Status: `Completed`
- Operation: `update` (update intent: `repair`)
- Package type: `team`
- Target package: Software Engineering Team, `agent-teams/software-engineering-team/` (worktree `/tmp/lean`, branch `se-lean-handoffs`, from `origin/main` at `ed23b4d`)
- Scope included: every rule that says what a role sends, attaches, accepts or preserves at a handoff; the delivery receipt check; the same pattern in the other teams.
- Files read in full: `team.md`, `team-config.json`; all six `agent.md` and `agent-config.json`; the six role `SKILL.md`; Solution Designer `references/requirements-engineering.md` and `references/architecture-design.md`; `implementation-handoff-template.md`; the parts of `api-e2e-execution-coverage-report-template.md` that list artifacts (lines 1–60, 160–231), all at `ed23b4d`. The other templates and the shared `design-principles.md` and `design-examples.md` were read in full earlier at the same commit; a search of them for handoff, attach, package and reference-file text finds no handoff rule beyond the lines below.
- Scope excluded: the AutoByteus UI's slowness with long attachment lists (a separate possible Task); evidence size and repository growth (parked ticket `evidence-size-and-repo-growth`); recipients hard-coded in role skills (anti-pattern 12, an existing follow-up).
- Request/reference: Project Task `project_task_ecb48849-8c86-477c-aa06-ecf7c2fd3b67`. The user: "when you do handoff, you hand off the necessary ones, not all of those."

## Evidence from a real run

Ticket `shared-network-workspaces` (AutoByteus NFS), folder `/Users/normy/autobyteus_org/autobyteus-worktrees/shared-network-workspaces/tickets/in-progress/shared-network-workspaces/`.

- **The message:** the Solution Designer's "Validation Resume" message to API/E2E attached 1,618 files. Its text said "all 1614 incoming refs preserved in 1618 attached references" (screenshots in the Task context).
- **How the list grew:** each role kept every reference it received, added its own, and wrote a `package-index.json` (some with hash checks) to prove nothing was dropped. The "incoming references preserved" counts went 435 (CRR-007) → 739 (CRR-009) → 992 (CRR-010) → 1,003 (SR-023) → 1,088 (CRR-011) → 1,285 (CRR-012/013) → 1,302 (SR-024) → 1,614 (Validation Resume).
- **The largest index:** `evidence/acceptance-revision/sr024/package-index.json` is 756 KB and lists 1,610 paths:
  - 884 in `evidence/`, 374 in `implementation-evidence/`, 223 in `code-review-evidence/`, 13 in `architecture-review-evidence/`;
  - only 29 top-level ticket documents;
  - about 85 repository files: 61 `.go`, plus Python, shell, TypeScript, workflow and docs files.
- **The handoff file was fine:** `validation-resume-handoff.md` (149 lines) said clearly what to do and named the documents to read: requirements and approval, investigation, design, solution history, ARCH-008 review, IR-009 implementation handoff, CRR-013 report and the API-006 coverage files. Those are about 15 files. The other 1,600 attachments added nothing the receiver needed.
- **Cost:** agents spent turns building and checking indexes ("Receipt checks verify path existence/preservation only"). Messages became hard to read, and the AutoByteus UI slows down when it renders the attachment list.

## Cause

The role skills tell each sender to carry everything forward and never say what to leave out:

| # | File:line | Text |
| --- | --- | --- |
| 1 | code-reviewer `SKILL.md`:243 | "Preserve the complete cumulative artifact package through every reroute." |
| 2 | code-reviewer `SKILL.md`:316, 319–322 | Each route sends "the cumulative package" / "the complete package" / "the complete passed package" / "the complete failure package" |
| 3 | code-reviewer `SKILL.md`:323 | "attach all relevant artifacts using the tool's reference-file input" |
| 4 | api-e2e-engineer `SKILL.md`:58, 212–221 | "hand off or reroute the cumulative package"; a list of every document "as absolute filesystem paths"; "Attach the complete cumulative package, the evidence files for the critical acceptance criteria, and the added or updated durable test files … do not rely only on paths in the message text" |
| 5 | implementation-engineer `SKILL.md`:47, 143–147 | Accept and "Send the cumulative package with … every still-relevant supplement … and triggering evidence" |
| 6 | architecture-reviewer `SKILL.md`:86, 90 | Send "the cumulative reviewed architecture package … every still-relevant supplemental task artifact … any still-relevant triggering downstream report, revision record, or evidence"; on Fail "the complete architecture package plus …" |
| 7 | solution-designer `SKILL.md`:310–311 | "Include every still-relevant supplement and external Product artifact" |
| 8 | solution-designer `SKILL.md`:338 | The receipt check verifies "the same package identity and cumulative artifact paths" |
| 9 | requirements-engineering.md:95, 103 | "preserve the approved UI/UX package in the cumulative downstream handoff"; "Preserve every still-relevant supplement in the cumulative package." |
| 10 | delivery-engineer `SKILL.md`:141 | "The terminal message must include the complete cumulative package …" |

Nothing defines "the package" as anything other than everything received so far. "Still-relevant" gives no test for leaving a file out, and every evidence file stays relevant to something. So agents read "preserve" and "complete" literally: they attached every incoming reference, added their own, and audited the list to prove nothing was lost. No rule asks what the receiver needs for its next step.

## Baseline

| File | Current responsibility for handoffs |
| --- | --- |
| `team.md` Communication Convention | Routing protocol and the scope rule; no rule on what a handoff carries. Lines 40–43 list what an implementation-ready package contains. |
| Each role `SKILL.md` Handoff Rules | Per-route sends, each naming the whole package (rows 1–10 above). |
| `solution-designer/agent.md`:18–22 | Read the incoming handoff file; mention and attach your own handoff file. |
| `implementation-handoff-template.md` Upstream Artifact Package | Paths to the upstream documents. |
| `api-e2e-execution-coverage-report-template.md` Execution Round Meta | Paths to the upstream documents, plus the proof table and artifact tables. |
| Revision records (`SR`, `ARCH-REV`, `IR`, `CRR`, `API-REV`, `DR`) | The history of each role's rounds, with links to their triggers. |

The documents already link to each other: the implementation handoff and the execution report list the upstream paths, the revision records index the rounds, and the proof table links the evidence. So a receiver can reach everything from a few current documents.

## Preserved behavior

- Every route, recipient rule, classification and stop condition.
- Each role reads what its skill says it works from, with absolute paths.
- The Solution Designer writes a handoff file, mentions it in the message and attaches it.
- API/E2E names the evidence folder and points to the proof table on every result; delivery opens the evidence it links.
- The test-code reviewer gets the added or updated durable test files; removed test paths come with diff evidence.
- On failure, the failing cases' commands, expected versus observed behavior and evidence go to the reviewer.
- Revision records and the canonical documents stay the history; nothing is deleted.

## Findings

| # | Priority area | Evidence | Owner | Impact | Change |
| --- | --- | --- | --- | --- | --- |
| F1 | Structure and ownership | No file says what a handoff carries; ten places in six files each say to carry everything (Cause table). | New shared `shared/handoff-references.md`, linked from each role skill and `team.md` | References grow every hop, up to 1,618 in one message. | Add one shared guide: after finishing, the sender reasons about what it produced, what the receiver does next and which files it will open, and hands off those; the rest stays reachable through the documents' links. |
| F2 | Content flow | Rows 1–10 | Each role skill | Each sender copies the incoming list forward. | Replace "complete/cumulative package" sends with the role's own results plus what the receiver works from, pointing to the shared rule. |
| F3 | Grounding | `package-index.json` with 1,610 paths and hash checks; "Receipt checks verify path existence/preservation" | Shared rule; solution-designer `SKILL.md`:338 | Turns spent on indexes and audits that prove nothing about the work. | Say that a handoff needs no index or audit of the references received; the receipt checks the final documents and evidence, not "cumulative artifact paths". |
| F4 | Grounding | About 85 repository source and doc files attached | Shared rule | Source attached from a branch that may already have moved on. | The receiver reads code in the worktree at the branch and commit named; key files are named in the text (the implementation handoff's Key Files section). |
| F5 | Clarity | "still-relevant" (rows 4–7, 9) has no test | Shared rule | Everything qualifies. | Give the test: will the receiver open this file for its next step? Add a before/after example from the real run. |

## Planned changes

- **Add `agent-teams/software-engineering-team/shared/handoff-references.md`.** It owns how a sender chooses what to hand off:
  - three questions to think through;
  - where everything else stays reachable;
  - what "the package" means;
  - signs of forwarding instead of choosing;
  - a before/after worked example (1,618 files vs. nine).
- **Design decision (user, during this update):** the sending agent decides what to hand off, because it did the work and knows what it produced and what the receiver does next. So the shared file is reasoning guidance with signs of forwarding and the real before/after example, not a per-route list. The first draft gave each route a fixed list; the user rejected that: "it's the agent they should decide, because they do their work."
- **Each role skill:** link the shared file through a `references/handoff-references.md` symlink, the team's pattern for shared files (new `references/` folders for API/E2E and delivery). Replace the per-route "send the complete/cumulative package …" lists with one line: after finishing, decide what to hand off (your result plus the files the receiver needs for its next step, absolute paths, attached), reasoning as the shared file describes, without forwarding everything received. Each route line then says "send the result to …".
  - code-reviewer: remove "Preserve the complete cumulative artifact package through every reroute" (243) and "attach all relevant artifacts" (323); routes 316–324 send the result.
  - api-e2e-engineer: step 9 hands off "the result"; 212–221 become the one line, keeping that removed test files are given as paths with the diff.
  - implementation-engineer: a Local Fix arrives with the finding, its evidence and the sender's report (47); 143–147 and 152 become the one line.
  - architecture-reviewer: 86 and 90 send the result; the separate absolute-paths line is covered by the one line.
  - solution-designer: name the supplements and Product artifacts the receiver needs (310); attach the handoff file with the files the receiver needs, decided by the shared guidance (321–325); the receipt checks the final documents, not "cumulative artifact paths" (338).
  - Input lists keep saying what each role works from; "cumulative"/"complete" is dropped from "Accept the … package" so it does not read as an attachment list. The shared file defines "the package" as the ticket folder's documents.
- **requirements-engineering.md:**
  - 95: link the approved UI/UX package from the requirements doc;
  - 103: keep every still-relevant supplement in the inventory.
- **delivery-engineer `SKILL.md`:**
  - 141: the terminal message names the archived ticket folder and the final documents the receipt check needs, instead of "the complete cumulative package".
- **`team.md` Communication Convention:** one sentence pointing to the shared rule. Lines 40–43 already say what the package contains; reword "carries" as "has".
- **Other teams:** no change. Article Writing, STORM, Kids Coloring Story, Narrated Presentation Video, Manga Video Studio and Software Product Promo Video define a "default cumulative package" per receiver: a fixed list of named documents that does not grow with rounds or evidence. That is already a curated list.
  - Product Team's `product-experience-design` says "every still-relevant supporting artifact" (lines 374, 576, 589) but has no evidence-growth or preserve-all rule. Watch it; do not change it here.

## Open questions and approvals

- None for the design. A PR is opened for the user's review; merge only on "approved, merge".

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Cause confirmed on real data | Pass | Counts and index breakdown above; `validation-resume-handoff.md` lines 123–135 |
| Every handoff/attachment rule found | Pass | `grep -rn -i 'cumulative\|every still-relevant\|attach\|preserve'` over the team; rows 1–10 |
| Other teams checked for the same pattern | Pass | Same search over `agent-teams`, `agents`, `agent-orgs`; findings above |

## Next action

Apply the planned changes, run the validator and the final review, and open a PR for the user.
