# Agent Package Creation Result

- Status: `Completed` (pending the teacher's check of the example, as the Task asks)
- Operation: `create`
- Package type: `team` (with a new shared Agent, and one anti-pattern entry for the Creator)
- Update intent: `new-package`
- Target package: Chemistry Teaching Team, `agent-teams/chemistry-teaching-team/`, and the shared Chemistry Module Designer, `agents/chemistry-module-designer/`
- Scope included: the team, its planner, the shared module designer, skills, scripts, the module shell, the plan template, README index rows, anti-pattern 29 in the Creator's list
- Scope excluded: the teacher's real folder `/Users/normy/normy-projects/Chemie_Folie` (only copies were used); other packages
- Request/reference: Project Task `autobyteus-agents-1` and its scope extension (2026-10-24): curriculum analysis → teaching plans (terms, methods, diagnosis, differentiation) → modules → a library with fast lookup; "make it as simple … think about the reality"

## Summary

A chemistry teacher at a Berlin Gymnasium (grades 7–12) writes one line, such as „Morgen Klasse 8, Eisen und Schwefel“. The team answers with a usable lesson:

- a teaching plan grounded in the official curriculum, with page numbers;
- an interactive module in her own slide style;
- an offline library start page that finds terms, slides, tasks and plan sections in seconds and collects them into a lesson list ("Meine Stunde").

A live team run on a copy of her folder produced all of this from that one line, with no questions to her.

## Decisions taken (the teacher asked not to be asked)

| Question | Decision | Why |
| --- | --- | --- |
| Bundesland, curriculum | Inferred at runtime from her materials; for her: Berlin, RLP 1–10 Teil C Chemie and RLP gymnasiale Oberstufe | Her modules say "gymnasiale Oberstufe Berlin" and "RLP Teil C". The package hard-codes no Land |
| Where the "database" lives | The folder where she keeps her modules, plus `index.html` (offline search, "Meine Stunde" list), `lehrplan/`, `plaene/`, `auftraege/`, `unterrichtsprofil.md`; her files are not moved | Works offline in school, no installation, copyable to a USB stick or the school PC; her Kunststoffe notes already describe a deck as an "Unterrichtsbibliothek" from which she picks 10–15 slides |
| Plan format | One printable HTML page per topic: curriculum reference, goals, terms with a class-ready explanation, lesson sequence, methods, diagnosis, differentiation, experiments, modules | Same look as her modules; prints to PDF; the search reads the terms and sections |
| Module format and use | Her slide format (offline HTML, hidden solutions, teacher notes), for both projector and pupils' devices, plus step animations, predictions, sorting and slider models | Her decks are "selbstlernfähig" and projector-sized |
| Start | No onboarding: the first lesson request starts the work; the curriculum overview is built on first use, after an urgent lesson | A teacher's day: the lesson comes first |
| Questions and approvals | Agents infer, deliver and let her correct; they ask only when a wrong guess would make the result unusable, in one short line. No waiting for plan approval | The user's direction |
| One agent or a team | A team: the Curriculum Planner (entry, plans, library) plus the shared Chemistry Module Designer, which can also be used on its own | Plans and modules are different work; she gets the plan at once while modules are built |

## Ownership and design decisions

- Curriculum overview, plans, module requests, library and index: the Curriculum Planner's skill `chemistry-curriculum-planning`, which includes `build_library_index.py` and `plan-template.html`.
- Modules (animation, interaction, tasks, notes, chemistry and safety checks): the module designer's skill `chemistry-teaching-module`, with the module shell, `check_equations.py`, `check_module.py` and `references/chemistry-and-safety.md`.
- Routes: `team-config.json`. The planner sends to the designer when a request is saved in `auftraege/`; the designer sends to the planner when a requested module is delivered with its note. No skill names a recipient.
- Teacher profile `unterrichtsprofil.md`: one file in the library; both roles read and extend it.
- Module ↔ library contract: the designer fills title, description and the `klasse` meta tag; the index reads them and falls back to her older files.

## Changed paths

### Added
- `agents/chemistry-module-designer/` (`agent.md`, `agent-config.json`, `skills/chemistry-teaching-module/`: `SKILL.md`, `references/chemistry-and-safety.md`, `assets/module-shell/` with 4 parts and `build.py`, `scripts/check_equations.py`, `scripts/check_module.py`)
- `agent-teams/chemistry-teaching-team/` (`team.md`, `team-config.json`, `agents/curriculum-planner/` with `agent.md`, `agent-config.json`, `skills/chemistry-curriculum-planning/`: `SKILL.md`, `scripts/build_library_index.py`, `templates/plan-template.html`)
- `tickets/in-progress/chemistry-teaching-team/` (this result and evidence)

### Modified
- `README.md`: index rows for the agent and the team
- `agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md`: entry 29, "Asking the user what the evidence already answers"

### Moved or renamed / Removed
- None

## Durable artifacts and evidence

- Result: this file
- Analysis: N/A (create)
- Validation evidence: `evidence/` in this folder (live requests, team messages, final replies, check output)
- Example output for the teacher to check: `/Users/normy/normy-projects/Chemie_Folie_Beispiel_Team/`. It is a copy of her folder after the team run on the final text, and her real folder is unchanged. It contains:
  - `index.html`: the start page with search;
  - `plaene/8-eisen-und-schwefel.html`: the teaching plan;
  - `eisen-schwefel.html`: the 30-slide module;
  - `lehrplan/lehrplan-analyse.html`: the curriculum overview.

## Approval state

- State: Approved for building (Task and the user's "decide yourself"). Acceptance of the example is pending with the teacher; the PR merge is pending a maintainer review (https://github.com/AutoByteus/autobyteus-agents/pull/112)
- Evidence: Task autobyteus-agents-1 and the Project Task Manager's relayed messages of 2026-10-24

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | Pass | `python3 -m json.tool` on both `agent-config.json` and `team-config.json` |
| Frontmatter and names align | Pass | Folder, `name`, `skillNames` match for both skills |
| Skill folder/frontmatter align | Pass | `quick_validate.py`: "Skill is valid!" for both skills |
| Configured `skillNames` resolve | Pass | Both agents loaded in AutoByteus 1.5.9-beta.3 with their skills (Skill calls in the traces) |
| Markdown links and references resolve | Pass | `check-links.py`: 0 broken, 0 unnamed on both packages, README and the Creator references |
| Skill validator and changed scripts | Pass | Equation checker on 20 good and bad equations (charges, hydrates, complexes, organics, typos all caught); module shell driven in Chrome through DevTools (keys, steps, prediction, sorting, solutions, slider, notes); index on a copy of her folder: 235 slides, 157 tasks; search, umlaut-insensitive matching, filters and lesson list work |
| Member refs, coordinator, and rooted routes | Pass | Team loaded with `loadIssues: []`, coordinator `curriculum_planner`, 2 members, 2 handoffs; both routes fired in the live run |
| Imported shared dependencies | Pass | Shared `chemistry-module-designer` resolved from the same package |
| Ownership and cross-file consistency | Pass | One owner per rule; `team.md` summarises without repeating skill rules |
| Scope/diff review | Pass | Worktree branch from `origin/main`; only the paths above |
| Real use (live, final text) | Pass | See below |
| Final review against the standard and anti-patterns | Pass | Round 1: the creator had asked the user six questions, and the skills told agents to ask and to wait for plan approval; fixed and recorded as anti-pattern 29. Round 2: the team's live run showed plan sections were found only by heading; the planner's own fix was adopted |

### Live runs (isolated AutoByteus 1.5.9-beta.3, Opus 5.5, Claude Agent SDK runtime, copies of her folder)

1. **Module designer alone, earlier text.** Request: Klasse 8, Eisen und Schwefel. It read her modules, reused her Redox shell, took hazard data from GESTIS, chose a teacher demonstration and flagged the pupil-experiment question. Output: 16 slides; both checks pass.
2. **Team, final text.** Request: „Morgen Klasse 8, Eisen und Schwefel.“
   - The planner asked nothing. It inferred Berlin from her modules, downloaded the official RLP 1–10 Teil C Chemie (2015-11-10), and wrote the curriculum overview and the plan, quoting pages 30–31 and the level-F standards.
   - It answered at once with a ready double lesson and a "Stunde 1 kompakt" block, saved a module request and handed it off by the configured rule, asking for the parts needed tomorrow first.
   - The designer delivered parts A–B with `uebergabe.md` and routed back.
   - On safety, it corrected the plan with sources (GESTIS, a published risk assessment): no grinding of the mixture; no SO₂ pupil experiments up to grade 9; copper powder + sulfur can react explosively, so copper sheet in sulfur vapour instead.
   - The planner took the corrections into the plan, linked the terms to slides, rebuilt the index and verified one search.
   - A second delivery completed the module (parts C–E: energy diagram, particle level, conservation of mass, copper-sheet experiment, final check, language support, hazard overview), 30 slides in all. The return route fired again, and the planner linked all 14 terms and rebuilt the index.
   - My own checks on the final module pass: 3 equations balanced, including 2 Cu + S → Cu2S; no overflow, no script errors; 43 screenshots.

## Risks, questions, and blockers

- Safety facts come from GESTIS and published risk assessments. No agent could open the DGUV Stoffliste directly, so the modules flag that point for the teacher's own risk assessment.
- Her three older decks (`aminosaeuren`, `chemisches-gleichgewicht`, `saeure-base`) are bundled apps; the index finds them by title and by the slides it can read.
- The planner edited its own skill script during the run, in the test copy. The fix was right and is adopted; in real use such an edit would change the installed checkout.

## Follow-ups

- Candidates found by anti-pattern 29's detection check, to review rather than confirmed defects: the default approval of `presentation-brief.md` in the Narrated Presentation Video Team, and of `deck_storyboard.md` in the Research To Deck Team. Both ask the user before work their materials might settle.
- Optional: a draft risk assessment per experiment (Gefährdungsbeurteilung, as a template the teacher signs) if she wants it.

## Next expected action

1. The teacher opens `/Users/normy/normy-projects/Chemie_Folie_Beispiel_Team/index.html` and checks the plan and module.
2. To try the team on a real request of her own before the merge, import the branch worktree `/Users/normy/autobyteus-org/autobyteus-task-worktrees/create-chemistry-module-designer` as a local package in AutoByteus. Then start the Chemistry Teaching Team with her module folder as the workspace.
3. PR #112 needs a maintainer's review or merge (branch protection: REVIEW_REQUIRED; earlier PRs were merged by `ryan-zheng-teki`). After the merge, update the local checkout `/Users/normy/autobyteus-org/autobyteus-agents`. It has staged and unstaged work in SE configs and `design-examples.md`, which do not overlap this PR's files; preserve it and pull.

## Handoff state

- `get_handoff_rules` called: see the final report
- Caller return: the result goes to the Project Task Manager (the caller)
