# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `agent`
- Target package: `Data Engineer` — `/Users/normy/autobyteus-org/autobyteus-agents/agents/data-engineer`
- Scope included: `agent.md`, `agent-config.json`, bundled skill `data-engineering` (`SKILL.md`, `references/data-quality-principles.md`, `templates/data-preparation-report-template.md`), the `README.md` entry, other packages that mention the Data Engineer, and `stash@{0}` (visual profiling work).
- Scope excluded: other agents and teams (none mention Data Engineer visualization), `stash@{1}`, the website repository, `autobyteus-workspace`, `autobyteus-mcps`.
- Request/reference: User decision via the Project Task Manager, 2026-10-12: remove data visualization from the Data Engineer so it focuses on its own job ("The data visualizing is only for humans … very hard to understand … I don't want to have it now"). Drop `stash@{0}`; leave `stash@{1}`.

## Baseline

Inspected at `origin/main` `5e667c8` after `git fetch`; local `main` equals `origin/main`, working tree clean.

| File | Current responsibility |
| --- | --- |
| `agents/data-engineer/agent.md` | Identity; points to the `data-engineering` skill; runtime rules on source truth, schema conformance, encoding, integrity checks, reproducible scripts. No visualization. |
| `agents/data-engineer/agent-config.json` | File, bash, and background-process tools; `skillNames: ["data-engineering"]`. No visualization tools. |
| `skills/data-engineering/SKILL.md` | Five steps: source audit, schema contract, transformation scripts, validation, report and handoff. No visualization. |
| `skills/data-engineering/references/data-quality-principles.md` | Sections 1–5: source truth, determinism, encoding, referential integrity, schema discipline. No visualization. |
| `skills/data-engineering/templates/data-preparation-report-template.md` | Markdown report: sources, outputs, scripts, validation table, anomalies, next action. No charts or diagrams. |
| `README.md` (table row and nothing else) | "Ingests, cleans, normalizes, validates, and prepares datasets and JSON content collections." No visualization. |
| `stash@{0}` (`aff7e59`, base `9af4f21`) | Uncommitted visual profiling: "profiles, visualizes" in descriptions; a rule to show structures with ER diagrams and HTML data explorers; a new step "Human-digestible visual presentation & exploration" (`data-profile.html`, relationship graphs); principles §6 "Visual Transparency" and §7 "Before vs. After"; template sections for a Visual Data Explorer path, a Mermaid ER diagram, and a before/after table; README section text; untracked ticket `tickets/in-progress/data-engineer-visual-profiling/` (analysis, result, `validate.py`). |

## Preserved behavior

- Trigger: creating, importing, restructuring, parsing, schema design, and auditing or repairing data files.
- Steps 1–5 of the skill, the data-quality principles §1–5, and the Markdown preparation report.
- Tools and skill wiring in `agent-config.json`.
- Plain Markdown handoff notes: counts, checks, anomalies, next action.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership | `git diff stash@{0}^1 stash@{0}` shows every visualization rule; `grep -rniE "visual\|chart\|graph\|plot\|dashboard\|explorer\|html" agents/data-engineer` on `main` finds nothing; `git log --all -S visualiz -- agents/data-engineer` finds no commit. | `stash@{0}` (not in any package file) | The visual profiling was never committed. Keeping the stash leaves it ready to be re-applied by mistake. | Drop `stash@{0}`. No package file needs a removal. |
| 2 | Grounding (user decision) | `SKILL.md:62-65` says "Report & handoff" and the template lists counts and checks, but nothing says the report stays plain. The user saw visual profiles as too complicated. | `skills/data-engineering/SKILL.md` | Without a stated boundary, a run may still add diagrams or an HTML explorer to its handoff. | Update step 5.1: keep the report a short Markdown summary of sources, counts, checks, and anomalies; no charts, diagrams, or HTML data explorers. One sentence, in the skill only. |
| 3 | Consistency | `README.md:30`, `agent.md:3`, `SKILL.md:3` describe ingest, clean, normalize, structure, validate, prepare. | Each file | Already consistent without visualization. | None. |
| 4 | Scope | Repository-wide search for "data engineer" outside its folder finds only `README.md:30` and `tickets/in-progress/create-data-engineer/`. Other packages do not reference its visualization. | — | No other agent or team needs a change. | None. |

## Recommended or planned changes

- `stash@{0}`: drop (user decision). `stash@{1}` stays.
- `agents/data-engineer/skills/data-engineering/SKILL.md`: step 5.1 gains the plain-report boundary (finding 2).
- No change to `agent.md`, `agent-config.json`, the reference, the template, or `README.md`.

## Open questions and approvals

- Approved by the user: removal of visualization, dropping `stash@{0}`, commit and push to `main`.
- Not changed, noted only: `agent.md:12` ("Keep this runtime prompt thin …") is a note to authors rather than an instruction to the agent; out of this request's scope.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Checkout is current | Pass | `git fetch`; `main...origin/main` level at `5e667c8` |
| Visualization terms in committed package | Pass (none) | `grep -rniE` over `agents/data-engineer` |
| Visualization content location | Pass | Only in `stash@{0}` (tracked diff and untracked ticket files) |
| Other references to the Data Engineer | Pass | Only `README.md:30` and the creation ticket |
| Other copies of the stash text | Pass (none) | Searched `autobyteus-org`, `normy-projects`, `~/.autobyteus` for "profiles, visualizes", `data-profile.html`, "Visual Data Explorer" |

## Next action

Apply the planned changes, drop `stash@{0}`, validate, commit, and push.
