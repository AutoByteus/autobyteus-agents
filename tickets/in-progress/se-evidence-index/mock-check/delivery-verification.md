# Real-use check: a mock handoff read by the delivery engineer's instructions, and a progress-log resume

## What was done

- A small mock handoff, written with the final template: `handoff-message.txt`, plus `api-e2e-execution-coverage-report.md` with only the sections delivery reads for evidence (Round, Tested Builds And Environments, Cases, Acceptance-Criteria Proof), and three evidence files with headers in `evidence/`.
- Rounds 1 and 2 ran on the first draft, which had a separate Evidence Index. After the user's direction against duplicates, the mock was rebuilt on the consolidated structure (Cases plus Proof) and checked again in round 3.
- It was read the way the delivery engineer's "Verify From Evidence" now says:
  - for each acceptance criterion, follow the proof table to its cases;
  - open the files for the critical ones;
  - check the line or detail named under "Look For" (searched with `grep`).

## Round 1: caught a defect

- **AC-001 (EV-02):** "Look For" said `data-theme = "dark"`, but the log has `dataset.theme = "dark"`, so the search found nothing.
- Under the new instruction this is "a file without the line it claims": the criterion is Not Proven and goes back to API/E2E with that reason.
- That is the intended behavior. It also showed that "Look For" must quote the line exactly, so the template and the API/E2E skill now say so.

## Round 2: after the fix

| Acceptance-Criteria ID | Evidence IDs Checked | What You Saw | Judgement |
| --- | --- | --- | --- |
| AC-001 | EV-02, EV-03 | EV-02 line 5 `dataset.theme = "dark"` after the toggle and line 7 after `reload`; EV-03 shows the dark page with the toggle on | Proven |
| AC-002 | EV-01, EV-02 | EV-01 line 3 "persists the chosen theme across reloads", line 6 "2 passed"; EV-02 line 7 kept after reload | Proven |

- Both text files have headers naming the command or step, the commit, the environment, the date and the case.
- The handoff gives the evidence folder and the commit that holds it.
- Result: everything is proven from text alone, without running a test or asking the user. Delivery can finalize, as "Verify From Evidence" says.

## Round 3: final structure

- AC-001 → E2E-01:
  - its row lists `EV-02-browser-toggle-excerpt.txt` and `EV-03-settings-dark.png`;
  - "Look For" `dataset.theme = "dark"` is found at lines 5 and 7 (after `reload`);
  - the screenshot shows the dark page with the toggle on.
  - Proven.
- AC-002 → API-01 and E2E-01: "persists the chosen theme across reloads" at line 3 and "2 passed" at line 6 of EV-01, plus EV-02 line 7. Proven.
- Delivery read one path (criterion → cases → files → quoted line) and could finalize from text alone.

## Progress-log resume check

`api-e2e-test-progress.md` shows a compaction during E2E-01:

- API-01 has `Started` and `Completed Pass`, so it is done and not rerun.
- E2E-01 has only `Started`, with the dev server and browser profile in its note.
- The skill's rule (read the progress log first; don't rerun a completed case; don't skip one that never completed) leads to:
  - checking or stopping the noted server;
  - rerunning E2E-01 from the start;
  - writing its `Completed` row and its Cases row.

## Limits

- The screenshot is a text placeholder.
- The check was made by the Agent Package Creator following the delivery engineer's text, not by a live delivery engineer run.
