# Agent Package Creation Result

- Status: `Completed` (package and validation); merge pending maintainer review, then checkout update (see Handoff state)
- Operation: `update`
- Package type: `agent` (was `team`)
- Update intent: `extend` and `repair` (the teacher's six feedback points); `simplify` (one agent instead of a team, user-approved)
- Target package: Chemistry Teaching Assistant, `agents/chemistry-teaching-assistant/`. It replaces `agent-teams/chemistry-teaching-team/` and `agents/chemistry-module-designer/`.
- Scope included: the library app, the data format, the browser check, the merged teaching skill, the topology change, README, Creator anti-pattern 30
- Scope excluded: the teacher's library (the K8-01 rework is Task chemie-unterricht-2 in Project „Chemie Unterricht“, to be re-created for the new agent); her project files `inhaltsstandard.md` and `unterrichtsprofil.md`
- Request/reference: Task autobyteus-agents-4; `k8-01-feedback-and-skill-changes.md`; `user-brief.md`; the user's decision on 2026-10-24 to use one role and refactor freely
- Analysis: [agent-package-analysis.md](agent-package-analysis.md)

## Summary

The teacher's six complaints, and what answers each:

1. **Flicker, heavy HTML, poor visuals, dead buttons.** The library is now one Vue app, prebuilt to classic scripts that run from `file://`.
   - It loads about 240 KB once (fonts included) instead of 1.3 MB per module, and data per chapter. It uses no iframes.
   - Slides are YAML data rendered by 15 shared, tested components.
   - The check `pruefen` clicks every control in every view and on every slide.
2. **Download.** Meine Stunde downloads the chosen lesson as:
   - student HTML: one file, no notes;
   - teacher HTML: with the presenter view;
   - PowerPoint: slides as pictures, notes as speaker notes;
   - PDF: with or without notes.
3. **Too much text.** One core question per slide and about 40 visible words at most. The components set every font to at least 28 px on 1920×1080. Teacher text goes into the notes or the knowledge point, and the check measures words and font sizes on every slide.
4. **Middle column can't close.** The left and middle columns both close; the slides then fill the width as large live previews.
5. **Notes visible to students.** Presenter mode works like PowerPoint's: the audience window loads only student data. The check confirms that no teacher text reaches the audience window, the student HTML or the student PDF.
6. **Growth and editing.** One YAML file per knowledge point, stable IDs, data loaded per chapter, and a build that validates everything with file and place.

The team was replaced by one agent with two skills, because a knowledge point and its slides are now one record.

## Ownership and design decisions

- **Library software** (app, data format, build, check, exports): the skill `chemistry-library-app`.
  - The source is in `app/`; `dist/` holds the prebuilt runtime and the Node tool, committed so a library builds offline without npm.
  - `references/bausteine.md` is generated from the schema the build validates against, so the two cannot drift apart.
- **Teaching work** (curriculum, knowledge points with nine fields, slides, chemistry and safety, check, delivery): the skill `chemistry-teaching`, with `references/chemistry-and-safety.md`.
- **The teacher's settings:** `unterrichtsprofil.md` in her folder, as before.
- **Start page:** only the app's build writes `index.html`.
  - A start page it did not write is kept once as `index-vorher-<date>.html`.
  - `build_library_index.py` is removed.
  - The skill tells the agent to stop using older project build scripts and to update instructions that mention them.

## Decisions taken (no question to the teacher)

| Question | Decision | Why |
| --- | --- | --- |
| Where the app runs | Offline from her folder; a double click on `index.html` | Task default; no account or hosting; works in school without network |
| App technology | Vue 3 + Vite, built to classic scripts | Her positive experience with Vue apps; module scripts do not load from `file://` |
| Media in exports | Embedded as data URIs | On `file://`, exporting to PNG/PPTX cannot read separate files |
| Lessons | Saved in her browser, with file export and import; the agent sets a suggested lesson per chapter, taken over with one click | The agent cannot write into her browser storage |
| Team or agent | One agent | See analysis F11 and anti-pattern 30 (upstream) |

## Changed paths

### Added
- `agents/chemistry-teaching-assistant/`:
  - `agent.md`, `agent-config.json`;
  - `skills/chemistry-teaching/`: `SKILL.md`, `references/chemistry-and-safety.md`;
  - `skills/chemistry-library-app/`: `SKILL.md`, `references/data-format.md`, `references/bausteine.md` (generated), `app/` (source), `dist/` (build), `beispiel/` (example library and test data).

### Modified
- `README.md`: one row replaces the team and designer rows.
- `agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md`: one sentence added to the Detect line of entry 30 (added upstream in #125 for this same case).

### Moved or renamed
- `agents/chemistry-module-designer/` → `agents/chemistry-teaching-assistant/`
- `chemistry-teaching-module` → `chemistry-teaching`

### Removed
- `agent-teams/chemistry-teaching-team/`: the team, the Curriculum Planner, `chemistry-curriculum-planning`, `build_library_index.py`, the plan template.
- The module shell, `check_equations.py`, `check_module.py`. The build now checks equations, and `pruefen` replaces the render check.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | Pass | `agent-config.json` |
| Frontmatter, names, skill folders align | Pass | `quick_validate.py`: both skills valid; agent folder and `skillNames` match |
| Markdown links resolve | Pass | `check-links.py` on the agent's own files, README and the Creator references: 0 broken (the local `node_modules` is ignored and not committed) |
| App build | Pass | `npm run build`: app.js 125 KB, app.css 114 KB (fonts included), player 196 KB, pptx 463 KB, tool 215 KB |
| Equation check (ported) | Pass | 15 correct equations pass; 6 faulty ones caught (charge, atoms, unknown element, words, unmarked charge, no arrow) |
| Full browser check on the example | Pass | 271 controls clicked, 14 slides measured (≤ 28 words, smallest font 28 px), audience window checked in 16 positions, PowerPoint with 6 slides and speaker notes, PDF 6 pages each, both HTML exports opened and used |
| Defects the check found and that were fixed | — | Audience window unreachable (Vue proxy of a cross-origin window on `file://`); audience blank when the presenter page reloads; fonts missing in PowerPoint images; controls without effect (now disabled or marked current); a slide taller than the stage; single-column cards when both columns are closed |
| Wording comparison (two skills merged) | Pass after fix | `compare-wording.py`: restored term explanations, differentiation, presenter keys; added the offline check the old render check had |
| Topology | Pass | Team removed; the manager closed its open tasks first (chemie-unterricht-2 cancelled, the ad-hoc task closed) |
| Live run | Pass | See below; evidence in `evidence/` |

## Live run

Setup:
- AutoByteus 1.5.9-beta.3, an isolated instance, Opus 5.5, the claude_agent_sdk runtime;
- only `chemistry-teaching-assistant` loaded;
- the workspace was a copy of her real library in its old format: HTML plans, a hand-built K8-01 module, project tools, her `inhaltsstandard.md` and profile.

Request: „Morgen in Klasse 8 brauche ich K8-01.7 (Gefahr hängt von Stoff und Konzentration ab). Bitte so vorbereiten, dass ich es präsentieren und herunterladen kann.“

What the agent did:
- **Skills.** It loaded both skills. It asked no question.
- **Content.** It wrote `inhalt/bibliothek.yaml` from her curriculum data and K8-01.7 as a data knowledge point with all nine fields. It kept her slide IDs and her wording.
- **Slides.** It built 12 low-text slides (a vote, a teacher experiment, a step animation from beaker to particles, a slider with the 100-square grid, cards, true/false, a hazard ladder, an exit ticket) and set a 10-slide suggested lesson.
- **Build.** It built the app. Her old start page was kept as `index-vorher-2026-10-24.html`, and her older decks stay findable.
- **Check.** It ran `pruefen` and fixed what it found: a notes sentence repeated on a slide, and an over-full slide seen in the screenshots. It repeated until the report said "bestanden".
- **Project files.** It updated her `inhaltsstandard.md` and profile to the new format, and wrote `lieferungen/2026-10-24-K8-01.7-gefahr-stoff-konzentration.md`.
- **Reply.** In German, it gave:
  - the start path and the lesson;
  - the safety points for her risk assessment;
  - what it could not confirm;
  - two app limitations: vote counts across slides, and real GHS pictograms.

My independent `pruefen` on its library: **bestanden**, 328 controls clicked, 12 slides measured at 10–38 visible words with a smallest font of 28 px. The audience window, both HTML exports, PowerPoint and both PDFs were verified. The slides look clean at projector size; the step animation connects Stoffebene and Teilchenebene correctly.

What followed from the run:
1. **The two limitations it reported are now fixed.**
   - `abstimmung` gains `merken`/`vergleich`, so before/after votes compare.
   - `versuch` shows the real GHS pictograms: UNECE, public domain (licence checked on Wikimedia Commons), sanitised SVG.
   - Both are in the example library; the full check passes (271 controls, 14 slides).
2. **The privacy check was refined.** A notes sentence that also appears on a slide, such as an expected answer shown as the solution, is no longer counted as a leak.

The run used the skill text from before three additive restorations: term explanations, differentiation, and the presenter keys in the delivery note. Its output already contained all three. The two app additions and the refined check were verified by the full check, not by a second live run.

The rebuilt result, for the teacher to open: `/Users/normy/normy-projects/Chemie_Folie_Beispiel_v2/index.html`. It is a copy, rebuilt with the final app; her real folder is unchanged.

## Risks and follow-ups

- **New components** (for example a live simulation beyond CSS animation) are added to the skill's app by a package update. The skill tells the agent to record such needs in its delivery note.
- **Her current library** is in the old format. Task chemie-unterricht-2 converts K8-01 and updates her `inhaltsstandard.md` and profile; it is to be re-created for `/chemistry_teaching_assistant`.
- **Review candidate from anti-pattern 30:** the STORM Team, which splits one article over five producing roles.
- **Earlier follow-ups still open:** the default approval stages in the Narrated Presentation Video Team and the Research To Deck Team (anti-pattern 29).

## Handoff state

- `get_handoff_rules` called: Yes; no rules (standalone Creator copy).
- Caller return: Yes, to the Project Task Manager, the sender of Task autobyteus-agents-4.
- Delivery: PR https://github.com/AutoByteus/autobyteus-agents/pull/121, which needs a maintainer's review (this account cannot merge).
- After the merge:
  - update the local checkout `/Users/normy/autobyteus-org/autobyteus-agents`, preserving its uncommitted work;
  - the running app and the installed skill links read from that checkout;
  - re-create the K8-01 rework as a Task for `/chemistry_teaching_assistant`.
