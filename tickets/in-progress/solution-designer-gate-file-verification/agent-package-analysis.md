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

## Next action

Apply the planned changes (step 3), validate, then reply to `/solution_designer`.

## Handoff state

An `update` records handoff in its result file.
