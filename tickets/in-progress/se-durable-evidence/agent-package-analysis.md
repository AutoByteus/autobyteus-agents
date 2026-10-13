# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `extend`)
- Package type: `team` (Software Engineering Team): API/E2E engineer (main), delivery engineer, Solution Designer receipt
- Target package: `agent-teams/software-engineering-team/` at `origin/main` `72febcd`
- Files read in full: the API/E2E, delivery, Solution Designer and code reviewer packages (every file), `team.md` and `team-config.json`, all read earlier in this conversation. `git log 2074d75..72febcd` shows only my own #48 commits since, which are also in this conversation.
- Request/reference: Project Task `project_task_738d6cde-…` (user, 2026-10-13): store evidence durably and pass it as proof in handoffs.

## Baseline: how evidence is handled today

| Question | Finding | Evidence |
| --- | --- | --- |
| Where evidence is saved | No defined place. Reports go "at one canonical path in the assigned task workspace/worktree"; screenshots, logs and recordings have no rule. | API/E2E `SKILL.md` line 38 |
| Survives cleanup and archiving | At risk. "Clean up processes, browser state, data, and artifacts created for the validation" can delete evidence. Only the ticket folder is archived (`tickets/done/<ticket>/`, delivery line 127); delivery removes worktrees after finalization. | API/E2E line 183; delivery 127, 136 |
| Each acceptance criterion linked to its evidence | Partly. The "Changed Boundary And Evidence Matrix" is per case with criterion IDs; there is no per-criterion index, only "Every critical acceptance criterion directly proven: Yes/No". | execution report template |
| Handoffs carry the evidence | `Fail`: yes ("relevant logs/screenshots/artifacts"). `Pass`: no. The message states results and confidence; attachments are "the complete cumulative package and the added or updated durable test files". | API/E2E lines 200–217 |
| Downstream use | Code reviewer: already uses "existing evidence" (test review) and "the failure evidence" (failure origin). Delivery: judges "from the API/E2E execution report", a summary. Designer receipt: checks "final validation", not the evidence files. | code reviewer `SKILL.md`; delivery "Verify From Evidence"; designer `SKILL.md` receipt step 1 |
| Portable names | Delivery checks committed names, ticket evidence included (#42). API/E2E has no naming rule when it creates the files. | delivery workflow |

## Findings and planned changes

| # | Priority area | Owner | Change |
| --- | --- | --- | --- |
| 1 | Content flow | API/E2E `SKILL.md` Outputs | Keep evidence in the ticket folder's `evidence/` (or where the project's testing guideline says), so it is archived with the ticket and survives cleanup. Keep it reviewable (screenshots, log excerpts, test output); for something too large to commit, keep an excerpt and say where the full file is. Use portable names (no `:`). |
| 2 | Contradiction | API/E2E line 183 | Cleanup removes processes, browser state and data, and keeps the evidence. |
| 3 | Findability | execution report template | New "Acceptance-Criteria Proof" table: criterion, critical?, cases, evidence files, result. It indexes the existing per-case matrix instead of repeating it. |
| 4 | Handoff | API/E2E Result And Handoff | Every result (`Pass` too) names the evidence folder and attaches the execution report and the evidence for the critical acceptance criteria. |
| 5 | Downstream | delivery "Verify From Evidence" | Judge from the evidence files themselves (open the screenshots and logs for the critical criteria), not only the report's summary. |
| 6 | Downstream | designer receipt step 1 | Verify that the final validation evidence is in the archived ticket folder. |

The code reviewer needs no change: its test-code and failure-origin reviews already work from the existing evidence, which the handoff now carries.

## Second analysis (user, 2026-10-13): logical flow and consistency of the API/E2E engineer

Read: the API/E2E `SKILL.md` in full on this branch (`1abb344`), the templates (read in full earlier, plus my #48 and #49 edits), and the delivery and code-reviewer skills that consume its result.

### Real-workflow check

The Operating Sequence matches how an API/E2E engineer works:
1. understand the change and its real-use scenarios;
2. learn how the project tests (`TESTING.md`, README, scripts);
3. inventory existing tests and decide validity;
4. plan cases (ledger);
5. write and run repository tests from narrow to broad;
6. score confidence;
7. use a real surface only where a gap remains;
8. report and hand off.

The real-use scenario rules, the "not contrived" rule, the confidence gate and the persisted-data rules are sound.

### Findings

| # | Priority area | Evidence | Problem | Recommended change |
| --- | --- | --- | --- | --- |
| 1 | Logic conflict | Lines 153 ("unproven critical behavior blocks `Pass`"), 156 (category below 90% means no `Pass`) and 203 (`Blocked` means "ask the user for the exact missing dependency"), versus 209 and #48 (mark what only the user can check; delivery asks the user as a last resort). | A critical acceptance criterion with a part only the user can check can never `Pass`. API/E2E must return `Blocked` and ask the user itself, so the #48 path (delivery asks the user once, at the end) can't be reached. The two rules contradict. | Gate and score over what can be proven without the user. A part marked "only the user can check" (after trying) doesn't block `Pass`; it is listed for delivery. `Blocked` stays for a missing dependency that stops validation itself (a secret, service or environment). |
| 2 | Content flow | Operating Sequence steps 6, 8 and 9; ledger rule 118 | Evidence capture appears only in the ledger rule (when a ledger is used) and at the end (step 9). A real engineer saves evidence as each case runs. Step 9 doesn't mention the new Acceptance-Criteria Proof. | Steps 6 and 8: keep the evidence as each case runs. Step 9: write the report with its Acceptance-Criteria Proof. |
| 3 | Economy | Lines 208 and 220 | Two separate "attach" bullets (evidence; cumulative package and test files). | One attach bullet: the cumulative package, the evidence for the critical acceptance criteria, and the changed durable test files. |
| 4 | Grounding | Line 116 "a credible interruption or context-compression risk"; ledger template "Interruption, context-compression, or rerun note" | Relies on a framework event the agent can't observe (the point the user made for the Deep Researcher). | "a run long enough to outlast the conversation, or one likely to be interrupted". |
| 5 | Clarity | Line 10 "Prove the reviewed implementation" | On the direct low-risk route nothing was reviewed. | "Prove the implementation". |
