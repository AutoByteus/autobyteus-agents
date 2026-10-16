# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `skill` (bundled in the Solution Designer agent of the Software Engineering Team)
- Target package: `solution-designer` skill, `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/`. The user's installed copy, `/Users/normy/Desktop/claude-test/.claude/skills/solution-designer`, is a symlink to it.
- Scope included: the Solution Designer skill (`SKILL.md`, references, templates), its `agent.md` and `agent-config.json`, the Team files, the shared files its references link to, and the Creator's own anti-pattern list (workflow step 4 requires an entry for a mistake the principles did not prevent).
- Files read in full (repository `/Users/normy/autobyteus_org/autobyteus-agents`, `main` = `origin/main` = `16fb608`, fetched 2026-10-16; the working tree has uncommitted runtime-added config fields in `agent-config.json` files and `team.md`, none in the files edited here):
  - Solution Designer: `agent.md`, `agent-config.json`, `skills/solution-designer/SKILL.md`, `references/architecture-design.md`, `references/requirements-engineering.md`, `templates/{design-spec,investigation-notes,requirements-doc,solution-revision-record}-template.md`
  - Team: `team.md`, `team-config.json`
  - Shared files behind the symlinks: `shared/design-principles.md`, `shared/handoff-references.md` (read in full); `shared/design-examples.md` was not read (1,285 lines, only an optional example reference, not a gate)
  - Creator: `SKILL.md`, `references/{package-design-principles,skill-authoring-principles,package-anti-patterns,result-and-handoff-contract}.md`, both templates, `agent.md`, `agent-config.json`
  - Repository: `AGENTS.md`, `docs/agent-package-authoring.md`, `task-plans/board.md` (ticket and PR conventions)
  - Request: `/Users/normy/Desktop/claude-test/agent-feedback/solution-designer-skipped-design-principles.md`
- Scope excluded: the other SE Team skills and the other teams' skills (follow-ups below); the runtime tool behavior of AutoByteus itself; the content of `shared/design-principles.md`.
- Request/reference: feedback from `/solution_designer` (AgentRun `solution_designer_6b302d043a0444e4bf4812970aef8cd1`), sent at the user's request, 2026-10-16.
- Round 2 (2026-10-16, same task reopened): the user asked why only the Solution Designer skill got the hint and then narrowed the scope to the Software Engineering Team's other skills that use the shared files: architecture reviewer, implementation engineer, code reviewer. See "Round 2" below.

## Baseline

| File | Current responsibility |
| --- | --- |
| `solution-designer/SKILL.md` | The whole workflow. Lines 88-94 set the phase reading gates: read each gate file in full before the phase, record the files in `Authorities read`. Step 3 (line 175) names `architecture-design.md`, `design-principles.md` and the project's `DESIGN.md` as the design gate. `Blocked` (line 299) covers a missing "decision, approval, evidence or external/workspace prerequisite". Bootstrap step 3 (line 66) sends a failed workspace prerequisite to `Blocked` before deeper work. |
| `references/architecture-design.md`, `references/requirements-engineering.md` | Real files. The process for design and the standards for requirements. |
| `references/design-principles.md`, `design-examples.md`, `handoff-references.md` | Symlinks (`../../../../../shared/...`) to the Team's `shared/` folder; the repository convention (`docs/agent-package-authoring.md`, "Shared Team Reference Files") is one canonical file plus links, never copies. |
| `templates/design-spec-template.md` line 12, `templates/investigation-notes-template.md` line 18 | Each has an `Authorities read ... file and date` field, pre-filled with the expected gate files. |
| `agent.md` line 16 | One-line pointer: "Pass each phase's reading gate in the skill before that phase's work." |
| `team.md`, `team-config.json` | Cooperation and routes; no reading-gate content. |

## Preserved behavior

- Phase reading gates stay per phase: requirements gate before step 1, design gate before step 3; a narrow change still passes every gate.
- `Authorities read` stays a recorded field in both artifacts.
- `Blocked` stays the result for a missing prerequisite; the user stays the authority for scope and for any exception.
- Shared files stay single canonical files reached by symlink (repository convention); handoff rules, tools and skill attachment are unchanged.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Content flow: the gate has no path for a file that cannot be opened | `SKILL.md:88-94` says to read each gate file but not what to do when one cannot be opened. The only `Blocked` hooks are a workspace prerequisite (line 66) and the result classification (line 299). No text in the skill, templates or `agent.md` handles an unreadable gate file. The feedback file (section 2, step 4) records that the agent planned to "note it in `Authorities read` and continue". | `SKILL.md`, Phase reading gates | A missing mandatory authority can be walked past, and the user is not told. | Add: stop the phase, tell the user at once with the path and error, return `Blocked`; continue only on the user's explicit direction. |
| 2 | Grounding: the skill does not say how to confirm a gate file exists, and the usual discovery tools hide symlinks | Observed in the installed skill folder (2026-10-16): `find . -type f` lists 7 files, `find -L . -type f` lists 10 (the 3 symlinks are skipped). `find . -iname 'design-principles*' -type f` prints nothing. From the project root, `find . -iname 'design-principles*'` prints nothing because the installed skill folder is itself a symlink and `find` does not enter it. The Glob tool (`**/design-principles*`) and the Grep tool (a string that is in the file) also found nothing. `ls -la`, `test -r` and the Read tool on the linked path all work. | `SKILL.md`, Phase reading gates | The agent concluded "does not exist" from a listing and told the user so twice. | State that `references/` holds symlinks, that listings and searches can skip them, and that a gate file is confirmed by opening its exact linked path. |
| 3 | Clarity: the `Authorities read` fields read as a place to document, not a record of what was read | `design-spec-template.md:12` and `investigation-notes-template.md:18` pre-list the expected files with "file and date". Nothing says the field holds only files opened in full, or what to do when one cannot be opened. The agent planned to use it for the gap. | The two templates (pointer) and `SKILL.md` (rule) | The field invites a footnote in place of a stop. | Say the field records files opened in full, and point to the skill's rule for a file that cannot be opened. No copy of the rule. |
| 4 | Process (Creator): no anti-pattern covers a mandatory-read gate without a stop rule | `package-anti-patterns.md` has no entry for gate files, symlinked references or missing mandatory inputs; workflow step 4 requires one when a mistake was not prevented. | `package-anti-patterns.md` | The same gap can be written into other skills. | Add entry 20 with a detection check; run the check repo-wide and list the other instances. |
| 5 | Economy: nothing needed in `agent.md` or `team.md` | `agent.md:16` already points to the skill's gates. A second statement of the rule there would be a copy (anti-pattern 4), and "open a file before saying it is missing" is something the agent already does; the failure was a discovery step, not a missing instruction in the shell. | None | Avoids a duplicate rule. | No change. |

### Review of the six options in the feedback (section 5) and the root-cause analysis (section 4)

| Option / cause | Decision | Reason |
| --- | --- | --- |
| 1. Verification rule: open the exact linked path, symlinks possible | Adopt, cut to a one-sentence hint in revision 2 (finding 2) | Grounded in the observed blind spots; one sentence at the gate. |
| 2. Missing-gate rule: stop, name the path, `Blocked` | Adopted in the first version; removed in revision 2 on the user's direction ("one hint is enough") (finding 1) | Add "continue only on the user's explicit direction": the user is the authority and a copied-without-links install is a real case; the direction and the missing file then go into `Authorities read`, so the field keeps a truthful use. |
| 3. Read all gates at task start / forbid early design reasoning | Reject | Gates are per phase by design: a task that ends at a requirements `Blocked` or `Needs user` would load 45 KB of principles for nothing. It would not have prevented this incident: the file was readable all along. The skill already says target architecture is not authoritative before approval (line 101-103) and design starts after approval (line 170-171). The leak of design thinking into step 1 happens in the agent's reasoning, which the package cannot enforce (see behavior changes). |
| 4. Hard checklist with line counts | Reject the line counts; the clarified-field change was made in the first version and removed in revision 2 | A line count does not show the file was read and adds noise. The stop rule in finding 1 makes an unread file a failure; the field only needs to say it records files opened. |
| 5. Copy real files / manifest / self-check script | Reject | Copying contradicts the repository convention and anti-patterns 4 and 10 (divergent copies). A manifest repeats the links already in `SKILL.md` (second list to maintain). A runtime script duplicates what opening the file at the gate already proves. Repo-wide check run now: 127 symlinks, 0 broken (`find -L . -path ./.git -prune -o -type l -print`). The one real packaging risk, a skill folder copied with `cp -r` so relative links dangle, is caught by the stop rule. For maintainers, the broken-link one-liner goes into the anti-pattern's detection line. |
| 6. Agent instruction line | Reject for `agent.md` | One owner per rule: the gate paragraph in `SKILL.md`. `agent.md` already points to the gates. |
| Cause 4.1 "`find -iname` repeated the error" | Correct the claim | `find -iname` without `-type f` does list symlinks. A search finds nothing only with `-type f`, from a start path that goes through the symlinked installed skill folder, or with the Glob/Grep tools (all observed). The agent knows which it ran. The finding is the same: do not infer absence from a listing or search. |
| Causes 4.2, 4.3, 4.5 (inference from a listing, footnote instead of stop, silence) | Addressed by findings 1 and 2 | Rule at the gate; reporting is part of the stop rule ("tell the user at once"). |

## Recommended or planned changes

Revision 2 (user direction, 2026-10-16): "don't overcomplicate; one hint in the skill that some files are symbolic links is enough". Findings 1 and 3 and the stop rule from the first version are superseded; the table above keeps the first-pass reasoning. The applied change is:

- `agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/SKILL.md` (Phase reading gates paragraph): one sentence: some `references/` files are symbolic links into the team's `shared/` folder; a listing such as `find -type f` skips them, so open each gate file by its path.
- `agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md`: entry 20, "Symlinked references the reader cannot see in a listing".
- Reverted to original: the two `Authorities read` template fields.
- No change: `agent.md`, `agent-config.json`, `team.md`, `team-config.json`, `references/*.md`, the symlinks, `shared/*`.

## Open questions and approvals

- Approval: the user asked for the changes the Creator agrees with (via `/solution_designer`); no further approval needed for the edits. Committing, branching and any PR are not authorized; the edits stay uncommitted in the working tree.
- Follow-ups outside the approved scope (listed in the result): the same exposure in 29 other skills (9 teams) that tell the agent to read a symlinked file; the duplicate anti-pattern number 18.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Checkout current | Pass | `git fetch origin`; `HEAD` = `origin/main` = `16fb608` |
| Symlinks in the skill resolve | Pass | `ls -la references/`: 3 symlinks to `shared/`; `wc -l` through them: 516, 1285, 67 lines |
| No broken symlinks anywhere in the repository | Pass | `find -L . -path ./.git -prune -o -type l -print` printed nothing; 127 symlinks in total (45 under `agents/`, `agent-teams/`, `agent-orgs/`) |
| Listing and search blind spots | Observed | `find . -type f` (7 vs 10 with `-L`), `find ... -iname ... -type f`, `find` from the root through the symlinked skill folder, Glob, Grep: all missed the files; `find -iname` from inside the folder, `ls -la`, `test -r`, Read: found them |
| Rule duplicated elsewhere? | Pass | `grep -rIl -i "reading gate"` in `agents`, `agent-teams`, `agent-orgs`: only the Solution Designer's `agent.md` (pointer), `SKILL.md`, and the two templates' field labels |
| Other skills with the same exposure | Follow-up | 29 other skills (SE Team 3, plus 8 other teams) name a symlinked file in a read-style line ("read", "consult", "start by"); none has a stop rule. A grep for "cannot be opened", "unreadable" and "does not exist" in them matched only unrelated lines (image legibility, upstream world rules). |

## Round 2: the architecture reviewer, implementation engineer and code reviewer skills

- Status: `Completed`
- Operation: `update`; update intent `extend` (the same hint, applied where the same shared files are read)
- Target packages: `architecture-reviewer`, `implementation-engineer` and `code-reviewer`, under `agent-teams/software-engineering-team/agents/<agent>/skills/<agent>/`
- Source read: worktree `/Users/normy/autobyteus_org/autobyteus-agents-worktrees/se-skills-symlink-hint`, branch `se-skills-symlink-hint` from `origin/main` = `44508f4` (fetched 2026-10-16; the merge of PR #52)
- Files read in full: the three `SKILL.md` files, the three `agent.md` and `agent-config.json` files; from round 1: `team.md`, `team-config.json`, `shared/design-principles.md`, `shared/handoff-references.md`, the Solution Designer package and the Creator package files listed above. Not read in full: the code-reviewer, architecture-reviewer and implementation-engineer templates (they carry no reading gate; `grep` found one inline link to `design-principles.md` in `design-review-report-template.md`, line 141) and `shared/design-examples.md` (an optional example reference).
- Scope excluded: the 26 skills in 8 other teams (the user limited this round to the Software Engineering Team); `api-e2e-engineer` and `delivery-engineer` (see finding 3).

### Baseline

| File | Current responsibility |
| --- | --- |
| `architecture-reviewer/SKILL.md` lines 41-44, "Required Shared Reads" | "Start by reading `design-principles.md`" and use it as the canonical design reference. `design-examples.md` and `handoff-references.md` are linked elsewhere (lines 48, 50, 86). |
| `implementation-engineer/SKILL.md` lines 51-54, "Required Shared Reads" | Same two bullets. `handoff-references.md` linked at line 143. |
| `code-reviewer/SKILL.md` lines 77-84, "Required Shared Reads" | "Start implementation review by reading `design-principles.md`", then when to consult `design-examples.md` and how to read for the later entry points. `handoff-references.md` linked at line 315. |
| `references/` in each of the three | Contains only three symlinks (`design-principles.md`, `design-examples.md`, `handoff-references.md`) into `shared/`; no real file. |
| `agent.md` and `agent-config.json` of each | Identity, a pointer to the skill, tools, `skillNames`. No reading-gate content. |

### Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Grounding: the same unstated fact as in round 1, in a stronger form | In each of the three skills the whole `references/` folder is symlinks: `find references -type f` prints 0 files, `find -L references -type f` prints 3, and each link opens by its path (observed 2026-10-16). An agent that lists the skill folder sees an empty `references/` while the skill tells it to start by reading `references/design-principles.md`. | The "Required Shared Reads" section of each `SKILL.md` | The same wrong conclusion ("the file does not exist") is likely, and these reviewers and the implementer apply the principles to every ticket. | Add the one-sentence hint to that section in each skill. |
| 2 | Ownership: one place per skill | Each skill already has a section that names the shared reads. The hint belongs beside the read instruction, once per skill, with no copy in `agent.md`, `team.md` or the templates. | `SKILL.md` of each | Avoids a second owner (anti-pattern 4). | One bullet in "Required Shared Reads". |
| 3 | Scope: `api-e2e-engineer` and `delivery-engineer` | Each has one symlink, `references/handoff-references.md`, named only in an inline link inside a handoff bullet ("as `handoff-references.md` describes"); neither has a "start by reading" instruction. | None | No gate depends on it; the agent follows a link rather than searching a listing. The user named the three skills. | No change; offered as an option. |

### Recommended or planned changes

- `.../architecture-reviewer/skills/architecture-reviewer/SKILL.md`, "Required Shared Reads": add a bullet: the `references/` files are symbolic links into the team's `shared/` folder; a listing such as `find -type f` skips them, so open each by its path.
- `.../implementation-engineer/skills/implementation-engineer/SKILL.md`, "Required Shared Reads": the same bullet.
- `.../code-reviewer/skills/code-reviewer/SKILL.md`, "Required Shared Reads": the same bullet.
- No change: the three `agent.md` and `agent-config.json` files, the templates, `team.md`, `team-config.json`, the symlinks, `shared/*`, `package-anti-patterns.md` (entry 20 already describes this fix and its detection check).

### Open questions and approvals

- Approval: the user asked for these three skills (conversation through `/solution_designer`). A pull request for review was requested; merging waits for the user's go-ahead.
- Decision for the user: whether to add the hint to `api-e2e-engineer` and `delivery-engineer` (finding 3) and to the 26 skills in 8 other teams.

### Checks (read-only, before editing)

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Checkout current | Pass | `git fetch origin`; worktree `HEAD` = `origin/main` = `44508f4`; no open pull requests |
| References are symlinks only | Observed | 0 real files under `references/` in the three skills; `find -L` 3 each |
| The links open | Pass | `[ -r <link> ]` true for all 11 links (3 + 3 + 3 + 1 + 1) |
| Existing hint wording | Pass | The Solution Designer sentence, merged in PR #52, reads "Some `references/` files are symbolic links into the team's `shared/` folder; a listing such as `find -type f` skips them, so open each gate file by its path." |

## Next action

Round 1 is merged (PR #52). For round 2, apply the planned changes (step 3), validate, open a pull request for the user to review, then reply to `/solution_designer`.

## Handoff state

An `update` records handoff in its result file.
