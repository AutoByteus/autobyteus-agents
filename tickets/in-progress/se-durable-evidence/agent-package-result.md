# Agent Package Creation Result

- Status: `Completed` (pending the user's approval and merge)
- Operation: `update`
- Package type: `team` (Software Engineering Team)
- Update intent: `extend`
- Target package: `agent-teams/software-engineering-team/`
- Request/reference: Project Task `project_task_738d6cde-…` (user, 2026-10-13). Analysis: [agent-package-analysis.md](agent-package-analysis.md).

## Already fine

- `Fail` handoffs already include the logs, screenshots and artifacts.
- The test-case ledger records an evidence path for each executed case.
- A per-case evidence matrix (case, criterion IDs, evidence) exists.
- The code reviewer's test-code and failure-origin reviews already work from existing evidence.
- The delivery engineer checks portable names of committed files, ticket evidence included (#42).
- The ticket folder is archived to `tickets/done/` and committed.

## Changes

- **API/E2E `SKILL.md` Outputs:**
  - the evidence itself (screenshots, log excerpts, test output, recordings, what was tried) is a named output, kept in the ticket folder's `evidence/` (or where the project's testing guideline says), so it is archived with the ticket and survives worktree cleanup;
  - it stays reviewable, with an excerpt plus location for files too large to commit;
  - names are portable (for example, no `:`).
- **API/E2E `SKILL.md` cleanup:** removes processes, browser state, data and *temporary* artifacts, and keeps the evidence (previously "and artifacts", which could delete it).
- **API/E2E `SKILL.md` handoff:** every result, `Pass` included, names the evidence folder and attaches the execution report and the evidence files for the critical acceptance criteria. "The next roles judge from the evidence itself, not from a summary."
- **Execution report template:** new "Acceptance-Criteria Proof" index, listing the evidence folder plus criterion, critical, cases, evidence files and result (`Proven` / `Not Proven` / `Only The User Can Check`).
- **Delivery "Verify From Evidence":** judge from the evidence itself, not only the report's summary. Open the files the Acceptance-Criteria Proof table links for the critical criteria.
- **Solution Designer receipt (step 1):** verify the final validation "with its evidence in the archived ticket folder".

## Note for the AutoByteus project

Its release guide says the artifact-hygiene check rejects "generated ticket artifact drops". If that blocks an `evidence/` folder in tickets, its `TESTING.md` should name where evidence goes. The skill already defers to the project's testing guideline for the location.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | `quick_validate.py` → "Skill is valid!" for api-e2e-engineer, delivery-engineer and solution-designer. |
| Ownership and cross-file consistency | Pass | The evidence location rule is stated once (API/E2E skill); the template only has the field. Delivery and the designer receipt read what API/E2E now passes. The result values match #48's "Only The User Can Check". |
| Scope/diff review | Pass | 4 files (+20/−4) and this ticket folder. |
| Final review against the standard and anti-patterns | `Pass` (round 3) | Round 1: the template repeated the evidence location (anti-pattern 4), so it was removed there; "(no `:`)" became an example. Round 2: the delivery bullet's grammar was fixed. Round 3 was clean. |

## Revision 2 (user, 2026-10-13): logical-flow fixes from the second analysis

1. **Logic conflict fixed (confidence gate):**
   - "unproven critical behavior blocks `Pass`, except a part only the user can check";
   - a new rule says such a part is not a gap: score and gate over what can be proven without the user, list that part for delivery, and it doesn't block `Pass`;
   - `Blocked` is for a missing dependency that stops validation itself (a secret, service or environment), and the `Blocked` result points to the gate;
   - both templates' "every critical acceptance criterion directly proven" lines now say "apart from parts only the user can check".
2. **Evidence as it runs:** Operating Sequence steps 6 and 8 keep each case's evidence as it runs; step 9 writes the report "with its Acceptance-Criteria Proof".
3. **One attach rule:** the cumulative package, the evidence files for the critical acceptance criteria, and the changed durable test files. The evidence bullet now names the folder and points to the proof table.
4. **Observable trigger:** the ledger rule says "a run likely to be interrupted or to outlast the conversation" instead of "context-compression risk"; both templates' note field is "Interruption or rerun note".
5. **Purpose:** "Prove the implementation" (the direct route has no review).

Final review:
1. Round 1 made the gate rule point to the marking rule instead of repeating it (anti-pattern 4), and aligned the templates' "directly proven" lines with the gate.
2. Round 2 was clean. The validator passes.
