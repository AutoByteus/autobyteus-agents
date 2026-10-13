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
