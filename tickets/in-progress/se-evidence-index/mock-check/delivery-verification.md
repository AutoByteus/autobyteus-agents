# Real-use check: the delivery engineer reads a mock handoff

## What was done

- A small mock handoff, written with the new template: `handoff-message.txt`, plus `api-e2e-execution-coverage-report.md` with only the evidence sections (Evidence Index, Acceptance-Criteria Proof) and three evidence files with headers in `evidence/`.
- It was read the way the delivery engineer's "Verify From Evidence" now says:
  - for each acceptance criterion, read its Evidence Index rows;
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

## Limits

- The screenshot is a text placeholder.
- The check was made by the Agent Package Creator following the delivery engineer's text, not by a live delivery engineer run.
