# C002 method (recorded before researcher evaluation)
Goal revision 1; no tuning. Prior supervisor result 7/12 vs 8/12 is known,
not treated as a blinded hypothesis. Independently regenerate researcher evidence.
Hypotheses: Candidate perfection means 12 correct; better means strictly more
correct than Baseline on the identical 12 evaluation rows. Any Candidate error
falsifies perfection; a nonpositive paired accuracy difference falsifies superiority.
Select every CSV row with split=evaluation, exclude only the two smoke rows.
Controls: unchanged CSV/evaluator; Candidate x>=5, Baseline x>=4, fixed supplied
labels. Accuracy = number correct / family or overall row count. Paired difference
= Candidate correctness minus Baseline correctness, including ties and failures.
Check unique IDs, count 12, four rows per family, exact CSV-to-output equality;
recompute predictions/correctness separately and repeat evaluator byte-for-byte.
This verifies execution/arithmetic, not label validity or population generalization.
Budget: one batch, <=120 seconds local command runtime; standard library only,
no network/dependencies, all writes inside study. No new dataset or tuning.
