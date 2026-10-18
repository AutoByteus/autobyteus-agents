# Agent Package Analysis: one Evidence Index in the API/E2E report

- Status: `Completed`
- Operation: `update` (update intent: `repair`: delivery must be able to judge the evidence from text)
- Package type: `team` (Software Engineering Team: API/E2E engineer, delivery engineer, shared handoff guide)
- Target package: `agent-teams/software-engineering-team/` (worktree `/tmp/sei`, branch `se-evidence-index`, from `origin/main` at `887e79d`)
- Files read in full: the API/E2E `SKILL.md` and its four templates; the delivery `SKILL.md` and `release-deployment-report-template.md`; `shared/handoff-references.md`; `team.md`. The other role skills were read in full in this conversation; since then only one-line symbolic-link notes changed (`git diff 16fb608 HEAD`).
- Request/reference: Task `autobyteus-agents-25`. The user, 2026-10-18: "definitely a problem … report it immediately".

## Evidence from a real ticket (`workspace-skill-collision-fix`, the autobyteus-142 fix)

Ticket folder: `autobyteus-worktrees/workspace-skill-collision-fix/tickets/done/workspace-skill-collision-fix/`.

- **30 evidence files, 39,055 log lines.** Only `16-desktop-instance-log-excerpt.txt` has a header (instance, commit, counts); the other logs start with raw tool output.
- **How the report points to evidence:**
  - the proof table uses filename fragments ("`03-unit-backends.log`, `06-codex-live-b…`");
  - the boundary matrix says "unit regression + restored beta.1 tests";
  - the repository table has no evidence column;
  - the desktop section uses ranges ("`16-desktop-03/04/05`");
  - "Other Execution Artifacts" says "Evidence files `01`–`16` are in the evidence folder".
- **The evidence folder path points into `tickets/in-progress/…`.** The files survived only because delivery later moved and committed the ticket.
- **Delivery's verification** opened "`evidence/07-, 08-, 09-live-skill-links-*.log`" and read raw logs to find the proving lines.

## Baseline (what each file says about evidence)

| File | Today |
| --- | --- |
| API/E2E `SKILL.md`:44 | Keep evidence in the ticket folder's `evidence/` and keep it reviewable. Nothing on headers, excerpts of proving lines, observed-only checks, or committing before the worktree can go. |
| API/E2E `SKILL.md`:209 | Name the evidence folder, attach the critical criteria's files, and point to the Acceptance-Criteria Proof table. |
| Execution report template | Evidence is a free-text column in seven places: ledger reconciliation, the proof table ("Evidence Files"), the boundary matrix, repository coverage, the broader-validation table, the desktop section, and "Other Execution Artifacts". |
| Ledger template | An "Evidence / Artifact Path" column per event. |
| Coverage investigation template | The command table's "Evidence / Output Path". |
| Revision record template | The prior-failure "Evidence" column. |
| Delivery `SKILL.md`:68–74 | Open the files the proof table links for the critical criteria. |
| Release/deployment report template | Verification is one free-text line, "Evidence relied on". |
| `shared/handoff-references.md`:32 and 66 | "the proof table links the evidence". |

## Findings

| # | Priority area | Evidence | Owner | Change |
| --- | --- | --- | --- | --- |
| F1 | Structure and ownership | Evidence is described in seven report places, the ledger and the investigation, each as free text | Execution report template | One **Evidence Index** section: a row per file with an ID. Every other place references evidence IDs. |
| F2 | Grounding | 29 of 30 files have no header; 39k log lines with no excerpt; desktop page checks are ledger text only | API/E2E `SKILL.md` Outputs | Each file starts with a short header. Long logs get an excerpt of the proving lines. Checks observed only on a page or console are saved as files. |
| F3 | Grounding | The evidence lives uncommitted in the worktree until delivery archives it | API/E2E `SKILL.md` | Commit the evidence and the reports with the ticket folder on the ticket branch before each handoff (or as the project's testing guideline says), and give the commit in the handoff. |
| F4 | Content flow | Delivery reads raw logs and records verification in one line | Delivery `SKILL.md`; release/deployment template | Judge each acceptance criterion from its index rows and the key line or detail named there. Record a short per-criterion judgement. Finalize when all are proven; send back only what is not. The user stays the last resort. |
| F5 | Consistency | The handoff guide and the ledger, investigation and revision templates point to evidence their own way | Those files | Point to the Evidence Index and evidence IDs. |

## Other roles (checked; no change)

- **Implementation engineer:** "Local Implementation Checks Run" and "Frontend Rendered-Result Check" record checks as text, with no index. The `shared-network-workspaces` run had 374 implementation-evidence files. No role finalizes from them, though: code review and API/E2E re-check the work. **No change.** The lean-handoff guide already stops them being forwarded.
- **Code reviewer:** each finding's evidence sits in its candidate-gate record, so the reviewer's own report already ties evidence to findings. **No change.**
- **Solution designer:** investigation notes record exact sources and commands (template), and the receipt check now reads the final documents and evidence. **No change.**

## Preserved behavior

- The proof bar, confidence gate and Acceptance-Criteria Proof table (now with evidence IDs).
- The user as last resort; delivery's integrated-state rerun.
- The evidence location rule (the ticket folder's `evidence/` or the testing guideline); the lean handoffs.
- Proportionality: a small change has a small index.

## Planned changes

- **Execution report template:**
  - add an Evidence Index (before the proof table), with the evidence folder and the commit holding it;
  - the proof table, boundary matrix, repository coverage, broader validation, desktop, lifecycle and ledger-reconciliation evidence columns use evidence IDs;
  - "Other Execution Artifacts" is for non-evidence artifacts.
- **Ledger template:** the evidence column takes evidence IDs; add a row to the index when a file is saved.
- **Coverage investigation template:** the command table's evidence column takes evidence IDs.
- **Revision record template:** prior-failure evidence as evidence IDs.
- **API/E2E `SKILL.md`:**
  - Outputs: index row, header, excerpt, files for observed checks;
  - commit before each handoff;
  - Result: point to the Evidence Index and give the commit.
- **Delivery `SKILL.md` "Verify From Evidence":** judge each criterion from the index.
- **Release/deployment template, Verification:** a per-criterion table.
- **`shared/handoff-references.md`:** the Evidence Index links the evidence.
