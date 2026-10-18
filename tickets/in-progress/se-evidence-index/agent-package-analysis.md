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

## Findings (revised after the user's direction, 2026-10-18)

The user's direction: no duplicates; fix the information structure so the existing documents, consolidated, provide the evidence ("good logic will normally help us with information structure").

**Where one case's facts were written before this change:**

| Fact | Places it was written |
| --- | --- |
| A case's plan (ID, criteria, command) | the investigation's add/update tables, its repository execution table, its temporary-probe plan, and the ledger's Planned Cases |
| A case's result and evidence | the ledger's events, the report's ledger reconciliation, the proof table, the boundary matrix, the repository coverage table, the broader-validation step table, the desktop section, the result summary, and "Other Execution Artifacts" (and my first draft added an Evidence Index) |
| Post-repository confidence and the broader-validation decision | the investigation, and again in the report ("carry forward") |
| Upstream document list | the investigation meta and the report meta |
| Environment | the report's platform section and free text per case |

| # | Priority area | Owner | Change |
| --- | --- | --- | --- |
| F1 | Structure and ownership | The templates | One owner per fact, following the work: the **investigation is the plan** (what to prove, how, planned cases); the **report is the run record and result** (cases with evidence, criteria proof, confidence, decisions); the **revision record is history**. The **ledger is removed**: the report's Cases table, updated right after each case, gives the same resume point. |
| F2 | Content flow | The report | One **Cases** table (case, criteria, boundary, command or steps, environment ID, result, evidence files, the exact line to look for, notes). Environments and tested commits are listed once and referenced by ID. The **Acceptance-Criteria Proof** maps each criterion to case IDs. |
| F3 | Grounding | API/E2E `SKILL.md` | Evidence files carry their own header and excerpt, so per-file facts live in the file. Observed checks are saved as files. Commit before each handoff. |
| F4 | Content flow | Delivery `SKILL.md` and template | Criterion → case rows → files and the quoted line; a per-criterion judgement table. |
| F5 | Consistency | Handoff guide, revision record, code reviewer and delivery mentions | Point to the Cases table and case IDs; no ledger. |

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

- **`api-e2e-execution-coverage-report-template.md` (rewritten):**
  - sections: Round (with the evidence folder and its commit), Routing Classification, Tested Builds And Environments, Cases, Acceptance-Criteria Proof, Validation Confidence Scorecard (post-repository and final), Broader Validation Decision, Desktop (when applicable), Lifecycle (when applicable), Compatibility, Durable Coverage Changed, Dependencies Mocked, Temporary Methods And Cleanup, Preliminary Classification, Latest Authoritative Result;
  - removed as duplicates: ledger reconciliation, boundary matrix, repository coverage table, broader-validation step table, Platform section (now environments), Other Execution Artifacts, separate temporary-method and cleanup tables, Result Summary, the upstream document list (kept in the investigation).
- **`api-e2e-coverage-investigation-template.md`:**
  - one Planned Cases table replaces the repository execution table, the temporary-probe plan and the ledger decision;
  - the post-repository scorecard and broader-validation decision move to the report;
  - routing classification moves to the report;
  - the desktop and environment sections are plans.
- **`api-e2e-test-case-ledger-template.md`:** removed.
- **`api-e2e-revision-record-template.md`:** prior-failure evidence as case IDs.
- **API/E2E `SKILL.md`:**
  - Outputs: three documents plus the evidence;
  - Operating Sequence: plan, cases recorded as they run, the confidence gate in the report;
  - Test-Case Ledger Rules become Recording Cases;
  - confidence and broader-validation recording in the report;
  - handoff documents without a ledger.
- **Delivery `SKILL.md` and `release-deployment-report-template.md`:** judge each criterion through its cases.
- **`shared/handoff-references.md`:** the Cases table links the evidence; the example lists no ledger.
