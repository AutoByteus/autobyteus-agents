# Agent Package Analysis: the Article Writing Team uses the shared Deep Researcher

- Status: `Completed`
- Operation: `update` (update intent: `simplify`: one owner for general research)
- Package type: `team`
- Target package: `agent-teams/article-writing-team` and `agents/deep-researcher` (worktree `/tmp/atdr`, branch `article-team-deep-researcher`, from `origin/main` at `2329a86`)
- Files read in full:
  - the team's `team.md` and `team-config.json`;
  - both agents' `agent.md` and config;
  - the `article-researcher` skill, the `article-writing` skill, the outline template, and `shared/article-package.md`;
  - the Deep Researcher's `agent.md`, `deep-research` skill and brief template.
- Read in the parts that name research:
  - `shared/writing-principles.md` §2;
  - `article-reviewer` skill (inputs, Step 3, spot-check) and its review template;
  - `style-workflow.md`.
- Also checked: the Marketing Team (which already includes the shared Deep Researcher) and the Research-to-Deck Team.
- Request/reference: Task `autobyteus-agents-29` (user, 2026-10-19).

## How a team gets a shared agent (observed)

The Marketing Team lists `deep_researcher` with `refScope: shared`, plus rules both ways (`/marketing_content_creator -> /deep_researcher` and back). The shared agent becomes a standing member of the team run, and members message it. This works today (the team is in use and runs in the AutoByteus Org), so the Article Writing Team follows the same pattern instead of delegating. In the Org, a delegated copy of the team carries the team's rules (verified for #64).

## Where each part of `article-researcher` goes (nothing dropped)

| `article-researcher` section | New owner |
| --- | --- |
| Purpose, "research becomes durable files", reuse existing research first | Writer: `article-writing/references/understanding.md` |
| Research Sufficiency Contract (writer-ready questions) | Writer: `understanding.md`, "Ready to outline" |
| Research modes | Writer handles `supplied-source`, `workspace-source`, `experiential-builder`. `online-research` and `paper-document` deep research go to the Deep Researcher through `research-request.md`; a quick look at a link the user gave stays with the writer. |
| Step 2: research fields of `brief.md` | Writer (`article-writing` Step 1 already records modes and source basis; `understanding.md` updates them) |
| Step 3: `understanding-notes.md` (practical sequences, comparison primitive inventory, builder-owned design rationale) | Writer: `understanding.md` |
| Step 4: `source-index.md` | Writer: its own sources, plus one row per research brief (path); the brief's own sources stay in the Deep Researcher's `evidence.md`, not copied |
| Step 4: negative-capability claims ("does not support", "cannot") | **Deep Researcher** (`deep-research` rule, generally useful); the writer puts such claims in the request's claims to check |
| Step 5: `claim-evidence-ledger.md`, style-sensitive claims | Writer: `understanding.md`; an anchor may be a brief's claims-check row |
| Step 6: `research-handoff.md` | **Removed** (it was a bridge inside one agent). Facts, chronology and terms go to `understanding-notes.md` ("Must preserve"); allowed and forbidden claims to the ledger; reader starting point, question chain, spine and evidence burden to `outline.md` (already in its template); open questions to `understanding-notes.md`. |
| `research-open-questions.md` | `understanding-notes.md`, "Open questions" |
| Step 7: research readiness gate (12 checks) | Writer: `understanding.md`, "Ready to outline" (all kept) |
| Comparisons on the same neutral dimensions; alternative vs. composable | Writer for its own products (`understanding.md`); **Deep Researcher** for external comparisons (`deep-research`, generally useful) |

## Findings and planned changes

| # | Area | Change |
| --- | --- | --- |
| F1 | Structure | `team-config.json`: add `deep_researcher` (`refScope: shared`) and rules writer → Deep Researcher (a `research-request.md`) and back (the brief). |
| F2 | One owner | Remove the `article-researcher` skill; the writer's article-specific understanding work moves to `article-writing/references/understanding.md`; general research method is the Deep Researcher's. |
| F3 | Grounding | `deep-research` gains two generally useful rules: negative-capability claims, and like-for-like comparison dimensions. |
| F4 | Consistency | Update `team.md`, `article-package.md`, the writer's `agent.md` and config, `article-writing` (Steps 2, 4 and 9, path text), `style-workflow.md`, and the reviewer's inputs, Step 3 and report template. |

## Preserved behavior

- The pre-draft review and draft review.
- The reviewer's spot-check against primary sources.
- The writer's gates, style workflow and short path.
- The Deep Researcher's behavior for the Marketing Team (the two added rules are general).

## Question for the user

- The Research-to-Deck Team's `deep_researcher` is not a plain copy. It is that team's coordinator and entry point, and writes a deck-specific reasoning artifact and handoff (`research-resource-index`). Switching it to the shared Deep Researcher would mean a new entry point and moving the deck-specific step to the designer. No change here unless the user decides.

## Added during the work

- **The user, on the Deep Researcher:** "the deep researcher should have one index … first check what kind of deep research it has already done … taking notes is a good habit."
  - Today it reuses earlier research only in a folder with the same topic name, so related research under another name is missed.
  - `deep-research` now keeps `research/index.md`, one row per topic, read first: open every related topic, reuse what still holds, and research only what is new or out of date.
  - Notes and briefs stay in its own `research/` folder even when a requester names another folder, and it sends the path.
  - Its notes (`plan.md`, `evidence.md`) are read first whenever it picks a topic back up. That is an observable trigger; compaction is only the reason (anti-pattern 19).
- **First live run (isolated app):** the writer sent the research request, then drafted and sent the draft for review **before the brief came back**, because `understanding.md` said "Continue with other work while it runs". The reviewer returned `Evidence Gap` on exactly the caveat the brief recorded. Fixed in three places:
  - `understanding.md`: work on what does not depend on the research, but do not draft the claims it covers or send anything for review until the brief is back;
  - `article-writing`: the short path waits for the brief, and Step 8 checks every requested brief is back before drafting;
  - `article-package.md`: a brief's location is the path the Deep Researcher reports.
