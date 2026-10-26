# Agent Package Analysis: Chemistry Teaching Team v2

- Status: `Completed` (analysis); planned changes approved by the Task direction
- Operation: `update`
- Package type: `team` → `agent` (revised, see F11)
- Target package: before: `agent-teams/chemistry-teaching-team/`, `agents/chemistry-module-designer/`; after: `agents/chemistry-teaching-assistant/`
- Scope: the library as an offline app, slides as data with shared components, low-text slides, private presenter notes, lesson export, a click-every-control test; retire the old index script
- Request reference: Project Task autobyteus-agents-4; the Curriculum Planner's request `k8-01-feedback-and-skill-changes.md`; the teacher's brief `user-brief.md` (2026-10-24)
- Update intent: `extend` and `repair` (the teacher's six feedback points)

## Baseline: files read in full

| File | What it owns now |
| --- | --- |
| `agent-teams/chemistry-teaching-team/team.md`, `team-config.json` | Two members; routes planner → designer (request saved in `auftraege/`) and back (module delivered with note) |
| `.../curriculum-planner/agent.md`, `agent-config.json` | Planner identity, tools, skill `chemistry-curriculum-planning` |
| `.../skills/chemistry-curriculum-planning/SKILL.md` | Request types, library layout, profile, curriculum overview, topic plan (HTML), module requests, `build_library_index.py`, delivery |
| `.../scripts/build_library_index.py` | Writes `<library>/index.html` (search page). **Overwrites any start page** |
| `.../templates/plan-template.html` | Plan and curriculum pages as HTML |
| `agents/chemistry-module-designer/agent.md`, `agent-config.json` | Designer identity, tools, skill `chemistry-teaching-module` |
| `.../skills/chemistry-teaching-module/SKILL.md` | One offline HTML file per module, built from `src_<thema>/` parts; slide boxes; notes in `aside.notes`; checks; delivery note |
| `.../assets/module-shell/*` | HTML shell (CSS, navigation, step animation, prediction, sorting, widgets, notes panel), `build.py` |
| `.../references/chemistry-and-safety.md` | Chemistry correctness and experiment safety |
| `.../scripts/check_equations.py`, `check_module.py` | Equation balance from `data-eq`; render check of a built module |

Also read: the teacher's library `/Users/normy/normy-projects/Chemie_Folie`:
- `inhaltsstandard.md` (her project's content standard: IDs, nine fields, slide attributes, embedding protocol);
- `unterrichtsprofil.md`;
- `werkzeuge/build_bibliothek.py` and `app.html` (project-local tools the team wrote);
- `src_k8_01_saeuren/plan.md` (33 slide concepts);
- screenshots of `index.html` and of slide K8-01.7-EN1.

Also read: the server's skill discovery (`autobyteus-server-ts/src/skills/services/skill-discovery.ts`, `configured-agent-skill-resolver.ts`). Team folders' `skills/` are in the catalog, and configured names resolve by name against the catalog. The running app loads this repository from the local checkout (`~/.autobyteus/server-data/agent-packages/registry.json`). The installed copy in `Deutsch_lernprojekt/.claude/skills/` is a symlink into the checkout.

## Preserved behavior

- The team topology: two members; the planner is the entry point and coordinator; both routes keep their meaning.
- A short request gives a usable lesson; the agents infer and deliver and ask only in one line; the teacher corrects.
- The teacher profile `unterrichtsprofil.md`, the curriculum grounding with pages, the "Vorschlag" marking.
- Chemistry correctness and safety rules (`chemistry-and-safety.md`) and the equation check.
- The designer stays a shared agent with the same ID, so running team configurations still resolve.
- Her existing files are never moved or deleted; legacy HTML decks stay findable.

## Findings

Ordered by the authoring-standard priority.

| # | Finding | Evidence | Owner | Impact | Change |
| --- | --- | --- | --- | --- | --- |
| F1 | No shared owner for the library's software | Each project rebuilt it: the team wrote `werkzeuge/build_bibliothek.py` (297 lines) and `app.html` (633 lines) in her folder, beside the package's `build_library_index.py` | Structure | Two library builders, one overwriting the other's start page; no reuse for the next teacher | One team-shared skill `chemistry-library-app` owns the app, the data format, the build and the test; both members attach it |
| F2 | Monolithic HTML is the content format | Designer skill §3 ("one self-contained file"); module 1.3 MB with 1.1 MB embedded fonts; every preview is an iframe of the whole module | Designer skill, module shell | Flicker, weight, hard to edit, doesn't scale (feedback 1, 6) | Slides become structured data rendered by shared components in one app; content as one file per knowledge point; data loaded per chapter |
| F3 | Teacher text sits on slides | Designer skill §3 "Slides" lists boxes (definition, Merke, …) on the slide; K8-01.7-EN1 has five boxes at 13–15 px | Designer skill | Unreadable slides (feedback 3) | Low-text rule (one core question, ≤ 40 visible words, ≥ 28 px at 1920×1080); teacher material in notes and knowledge-point fields; the test measures words and font sizes |
| F4 | Notes are a panel in the same window | Module shell `#notesPanel`, key N | Module shell | Notes visible when sharing the screen (feedback 5) | Presenter mode: separate audience window that never loads teacher data; notes in a separate data file; test checks the audience window and student export |
| F5 | No export | Neither skill offers one | Missing | Feedback 2 | Lesson export: student HTML, teacher HTML with presenter, PPTX with speaker notes, PDF |
| F6 | No full click test | `check_module.py` checks overflow, errors and screenshots only; the skill asks to "use each interaction once" by hand | Designer skill | Dead buttons reached the teacher (feedback 1) | Automated sweep that activates every control in every view and on every slide and fails on errors or controls without effect |
| F7 | Middle column can't close | Her current app (project-local) | App | Feedback 4 | App: left and middle columns collapse |
| F8 | `build_library_index.py` overwrites the start page | Script writes `index.html` unconditionally | Planner skill | Destroys the library app (Constraints) | Remove the script; the app build owns `index.html` and keeps a non-app `index.html` as a backup once |
| F9 | Plans are HTML pages | Planner §3, `plan-template.html` | Planner skill | Content not reusable as data; duplicate of knowledge points | Knowledge points as data (nine fields) in the shared format; the app shows and prints them; remove the template |
| F10 | Visual quality not covered | Designer skill: "SVG in code" only | Designer skill | Flat clipart (feedback 1) | Photos (own or licensed, attribution list) or consistent illustrations; correct molecule models; purposeful animation; checked at projector size |
| F11 | Two producing roles for one record | In the data format a knowledge point and its slides are one YAML file; the planner wrote the nine fields, the designer `folien`; each request restated goals and misconceptions the file holds; the delivery note repeated the build report; the automated check left neither role a decision of its own | Team topology | Handoff overhead, two writers of one record, consistency between terms, misconceptions and their slides across roles | One agent (Chemistry Teaching Assistant) with two skills; team and Module Designer removed. Raised by the user, approved 2026-10-24 |

Proposals A–C from the planner are mostly adopted:
- **A1 (app):** Vue 3 + Vite built to static files that run from `file://` (a classic script bundle).
- **A2, A3, A4, A5:** adopted.
- **A6:** the reply language follows the teacher, and the material stays German. This goes in the planner skill.
- **A7:** the old script is removed.
- **B1–B5:** adopted.
- **C:** the content format moves to the skill's data format; her `inhaltsstandard.md` is her project's document, so the team updates it in Task chemie-unterricht-2.

Alternative considered for F1: put the app into one member's bundled skill. Rejected, because the other member's skill could not link it (anti-pattern 25) and both members change it.

## Planned changes

Revised after F11. The user approved one agent and asked for a full refactor, including the name and folder.

1. **Add** `agents/chemistry-teaching-assistant/` (`agent.md`, `agent-config.json`):
   - skill `chemistry-teaching`, merging the planning skill and the slide skill;
   - skill `chemistry-library-app`, the shared skill below, now bundled with this one owner;
   - remove `agent-teams/chemistry-teaching-team/` and `agents/chemistry-module-designer/`.
   The manager closed the team's open tasks first (chemie-unterricht-2 cancelled; the ad-hoc task closed).
2. **Add** `chemistry-library-app`:
   - `SKILL.md`: install or update the app in a library, the data format, building, the quality gate, exports.
   - `references/data-format.md`: knowledge point, slide and component schema.
   - `app/`: Vue 3 + Vite source with `package-lock.json`.
   - `dist/`: the prebuilt runtime and the node build/test tool, so a library builds offline without npm.
   - `beispiel/`: a small neutral example library, which is also the test data.
3. **Teaching skill** (from the planner skill): the library is the app; knowledge points are data files; plans are printed from the app; remove `build_library_index.py` and `plan-template.html`; reply in the teacher's language; attach `chemistry-library-app`.
4. **Teaching skill** (from the designer skill): slides as data with components; low text; notes; visual quality; the quality gate. Remove the module shell and `check_module.py` (replaced). `check_equations.py` also reads equations from data files. Attach `chemistry-library-app`.
5. **team.md, team-config.json:** removed with the team.
6. **README:** one row for the agent replaces the team and designer rows.
7. **Creator anti-pattern 30** (added upstream in #125 for this case): one sentence added to its Detect line.

## Open questions

- Where the app runs: decided offline from her folder (Task default; she is asked once by the manager).

## Checks run (read-only)

- Skill discovery code read (see Baseline).
- Her library's current state and her current pages rendered and viewed.

## Next action

Apply the planned changes, validate (skill validator, links, JSON, app build, full click test on the example), run the team live on a copy of her library, then open the PR.
