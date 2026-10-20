# Agent Package Analysis: proportionality pass (Task autobyteus-agents-39)

- Status: `Completed` (analysis; no package file changed)
- Operation: `analyze`
- Package type: `team`: Software Engineering Team and Product Team
- Target package: `/tmp/p39/agent-teams/software-engineering-team`, `/tmp/p39/agent-teams/product-team` (worktree of `origin/main` at `24339b2`)
- Scope included: the documents a ticket produces, the templates and rules that shape them, and the measured size of real tickets against their code change
- Files read in full: SE `team.md`, `shared/handoff.md`, Solution Designer `SKILL.md`, `references/requirements-engineering.md`. Outlined (all headings, plus the parts on size and proportion): the design-spec, requirements and investigation templates; the implementation handoff, API/E2E, delivery and docs-sync templates; the delivery skill's document rules; the Product `ui-ux-spec` template and the Product skills' proportion rules. The SE design principles were read in full for #84–#86. **Before any edit, each file that changes is read in full** (Creator step 1).
- Archives measured: `autobyteus-workspace-superrepo/tickets/done` (SE, 640 tickets, at `e677fe98da`), `autobyteus-web-design/tickets/done` (Product, 36 tickets, at `43d2d7d`)
- Scope excluded: how much testing a change needs (Task autobyteus-agents-10); investigation guidance (Task 33); the Product skills' one-home restructure (proposed as its own Task below)
- Request/reference: Task autobyteus-agents-39 (Project Task Manager, 2026-10-20). Direction: a small ticket keeps a small record and a short run, nothing that protects the user is lost, and the user decides after the analysis.

## Baseline: what tickets cost today

### SE team, tickets since 2026-09-20 (`evidence/ticket-record-vs-change.tsv`)

Code size comes from the commits each ticket's records name, counting non-Markdown files outside `tickets/`. It is approximate, and accurate to the order of magnitude.

| Task size | Tickets | Record, median | Documents, median | Changed lines, median |
| --- | --- | --- | --- | --- |
| Small | 27 | 149 KB (68–335) | 16 | 479 |
| Medium | 37 | 241 KB | 21 | 1,593 |
| Large | 36 | 359 KB | 22 | 6,404 |

A Large change is 13 times a Small one; its record is only 2.4 times bigger. Examples of Small tickets:

| Ticket | Code change | Record |
| --- | --- | --- |
| `org-history-row-toggle` | 22 + 5 lines | 125 KB, 16 documents; a 14.5 KB design spec with 38 sections: spine inventory, facades, boundary-encapsulation map, ownership map for one click handler |
| `claude-sdk-builtin-tool-restriction` | 65 + 12 | 147 KB, 15 documents |
| `agy-empty-mcp-config-activation` | 81 + 10 | 86 KB, 15 documents |
| `skill-update-notice-changed-files` | 3 source files (~100 lines) | 80 KB, 16 documents |
| E2E-01 (the restructured team's live run, #81) | 3 lines | 25 KB requirements, 20 KB investigation; 33 minutes |

Where a Small ticket's record goes (19 Small tickets since 2026-10-01, average per ticket):

| Documents | KB | Share |
| --- | --- | --- |
| Design spec, investigation notes, requirements doc (Solution Designer) | 49 | 33% |
| API/E2E coverage investigation, execution report, test-case ledger, revision record | 36 | 24% |
| Five revision records (solution, implementation, API/E2E, delivery; + reviews when selected) | 16 | 11% |
| Release/deployment report, handoff summary, docs-sync report, release notes | 18 | 12% |
| Implementation handoff | 13 | 9% |
| Other (review reports when selected, ad hoc handoff files) | 15 | 10% |

**Verbatim repetition is no longer the problem:** 1% of long lines appear in more than one document of a ticket (#75–#81 gave each fact one home). The biggest remaining overlap is between the API/E2E coverage investigation and the execution report (71 lines across 19 tickets).

### Product team

Product tickets are already compact in document count: two documents (`product-ticket.md`, `ui-ux-spec.md`), and baseline refreshes are 4–5 KB. But a small UI change still gets a full spec: 17–32 KB with 21–25 sections and 8–34 screenshots (`collapsed-left-panel-expand-keeps-run`: 25 KB spec, 21 KB ticket, 27 screenshots). The skills the designer reads are large: `product-experience-design` 550 lines, the principles 485, repository management 293.

## Findings

| # | Finding | Owner | Evidence |
| --- | --- | --- | --- |
| 1 | **The templates set the size, not the change.** The Solution Designer skill already says what a narrow change needs ("explain the existing owner/path, intended delta, affected files, evidence and design-health decision"), but the design-spec template has 46 sections, 10 marked Mandatory, and says "complete every mandatory section … keep the written detail proportionate". The agents fill every section with real content, so a one-handler change gets spines, facades and boundary maps. The requirements (27 headings) and investigation templates (22) work the same way. | Solution Designer templates | `org-history-row-toggle` design spec; the measured 49 KB per Small ticket |
| 2 | **One kind of record in six files.** Every role keeps its own revision record (`SR-`, `ARCH-REV-`, `IR-`, `CRR-`, `API-REV-`, `DR-`), even for a ticket that has one round, where each holds one "baseline 001" entry that restates its report. This is the same pattern as the follow-ups (Task 34): one kind of record (the ticket's rounds) needs one home. | every role's revision-record template, `handoff.md` | 16 KB, 5 files per Small ticket |
| 3 | **API/E2E writes its plan and its result as two documents** that repeat the scope, the changed-behavior summary and the case list; for a small change the plan is short. | API/E2E templates | 28 KB average, the largest verbatim overlap |
| 4 | **Delivery writes three reports,** a docs-sync report, a release/deployment report and a handoff summary, and the release report has a section that points to the handoff summary. The docs-sync result is a few lines on most tickets. | delivery templates | 18 KB per Small ticket; the handoff summary is the user's verification document and stays |
| 5 | **Reading is not the cost to cut.** "Proportionality limits what you write, never what you read" keeps a small ticket's design quality. Reading the principles (~490 lines) costs minutes; writing ~150 KB costs most of the 33 minutes. | Solution Designer skill | E2E-01 |
| 6 | **Product: the same template effect, smaller.** The `ui-ux-spec` template has no short form, so a one-surface change gets every section and screenshots of every state. | Product `ui-ux-spec` template | specs of 17–32 KB for small changes |
| 7 | **Product skill size is a structure problem, not proportion:** 550 + 485 + 293 lines. It needs a one-home restructure like #84, with the wording comparison. That is a different kind of change and should not be mixed into this pass. | Product skills | line counts |

## What must stay (protects the user)

- Approved requirements with acceptance criteria, and the user's approval when a decision needs it (`Needs user`).
- The Scope Guardrail and Change Scope: reviewers and every role judge "this ticket or follow-up" from them.
- The task-size and risk classification with its evidence and escalation trigger: it selects the route, and an underestimated small ticket must still escalate.
- The decisions that prevent silent damage: legacy removal (clean cut) and persisted data (`Not Affected` with a reason).
- Direct proof of each critical acceptance criterion (the execution report's AC proof and evidence), independent review on the routes that select it, delivery's verification from evidence, and the user's verification.
- Reading gates: unchanged.

## The user's caution (2026-10-20): even a small fix may need a refactor

The archive bears it out: of 27 Small tickets, **13 found a design issue** in their design-health assessment and **6 decided a refactor** (for example `delegated-team-member-lazy-activation`: "remove the flag and the eager path so the invariant holds structurally"). So a short form must never shorten the thinking that finds these:

- **Kept in full on every ticket:**
  - the reading gates and tracing the real path;
  - the whole Task Design Health Assessment (issue found, root cause, refactor needed now, evidence, response, deferrals);
  - legacy removal and persisted-data decisions;
  - classification;
  - scope;
  - acceptance criteria.
- **Shortened only:** sections that describe structure the change does not touch (spine inventories, facade and boundary tables, folder mapping), and only when the health assessment found no structural issue. When it found one, the sections that describe the refactor are written as today.
- **Checks before merging A:**
  - replay the 13 Small tickets that found an issue and confirm each finding lives in a section the short form keeps;
  - a live run with a small fix planted in code that hides a design problem, old text against new text: the new text must still flag the refactor.
- **Merge:** this ticket merges only after the user reviews it.

## Recommended changes (the user decides)

| # | Change | Effect on a Small ticket | Files |
| --- | --- | --- | --- |
| A | **A short form for a Small, Low-risk ticket.** One rule at the top of each Solution Designer template: when the change is Small and Low risk, write only the listed sections. The design spec keeps the ones the skill already names, plus classification, Change Scope, legacy and data decisions. The requirements doc keeps problem, current/desired/preserved behavior, Scope Guardrail, requirements and ACs, decisions. The investigation notes keep sources, findings and unknowns. Other sections are left out, not filled with `N/A`. If the design grows during the work, it switches to the full form (the escalation trigger already exists). | ~49 KB → ~15 KB | the three Solution Designer templates; skill step 3.4 points to the short form instead of restating it |
| B | **One ticket history instead of six revision records.** `ticket-history.md`: each role appends one entry per completed round (its ID such as `IR-002`, trigger, result, what changed, links). The IDs and their meaning stay the same. Alternative B-lite: a role opens its revision record only at its second round, and the first round is recorded in its report. | 5 files, ~16 KB → 1 file, ~3 KB | the six revision-record templates become one shared template; each skill's revision-record section; `handoff.md` table |
| C | **API/E2E: plan and result in one document.** The coverage investigation becomes the plan section at the top of the execution report, so the report is written in two stages and each fact is written once. | ~28 KB → ~18 KB | API/E2E skill and its two templates; `handoff.md` table |
| D | **Delivery: the docs-sync result becomes a section of the delivery report;** the handoff summary stays as the user's verification document. | 3 → 2 reports | delivery skill and templates; `handoff.md` table |
| E | **Product: a short form of `ui-ux-spec` for a change to one surface,** with screenshots of the changed states only. | ~25 KB → ~8 KB | `ui-ux-spec` template; one line in `product-experience-design` |

Together, the estimate for a Small ticket is **~150 KB and 16 documents → ~60 KB and 9 documents**, with a shorter run (writing is most of it). Medium and Large tickets keep the full forms; they gain only from B, C and D.

**Separate Task (proposed):** a one-home restructure of the Product skills (`product-experience-design`, the principles, repository management), like #84, with the wording comparison. Do it after this pass.

**Order and coordination:**
- **Order:** A, then B, then C and D, then E, as small pull requests. Each has an old-to-new map and the wording comparison (`compare-wording.py`), so no rule weakens.
- **Live check:** at the end, a small ticket and a large ticket both run end to end. The small one should produce the smaller record, and the large one should keep its full record and review route.
- **Task 10** (how much testing) stays separate. C changes where API/E2E writes and leaves how much it tests alone, so 10 can follow on the new structure.
- **Task 33** (investigation guidance) comes after this, as planned.
- **Task 40** is done (#84–#86).

## The user's decision (2026-10-20)

- **No change for small tickets (A–D) or the Product spec (E).** The team works well for them. Even a small ticket checks whether a refactor is needed, which keeps the architecture consistent and converging over time.
- **Change only release requests (F):** the Solution Designer bootstraps the worktree and sends the release request directly to the delivery engineer, without requirements, investigation or design. Evidence: `stable-release-20261014/solution-designer-release-handoff.md` ("none matches a new release-only request"; the user had to say "just send to delivery engineer directly"). Delivery first asked for an unnecessary risk approval (its `known-issues-decision.md`, DR-002).
- **The Product skills' one-home restructure:** not requested now.

## Open questions and approvals

1. Which of A–E to do? My recommendation is all five, in the order above.
2. For B: one `ticket-history.md` (my recommendation: one home for one kind of record, the same reasoning as `follow-ups.md`), or B-lite (fewer edits, but the six-file structure stays)?
3. Create the Product skills' one-home restructure as its own Task?

## Analysis checks

- Measurements were rerun from the archives (script in this conversation; table in `evidence/`). Code size is approximate: some tickets name extra commits (for example `imported-team-defaults-edit` counts a base merge's files).
- Archive tickets come from earlier team versions. The Small tickets since 2026-10-01 already follow the information-structure changes and show the same sizes.

## Next action

The user decides on A–E and questions 2–3. Then: read every affected file in full, make the changes as small pull requests with an old-to-new map, run the live check, merge, and update the local checkout.

## Handoff state

- Route outcome: report to the user (the Task requires the user's decision before changes)
- `get_handoff_rules` called: at the end of the Task
- Handoffs sent: None yet
- Caller return: the Project Task Manager is told when the Task completes
