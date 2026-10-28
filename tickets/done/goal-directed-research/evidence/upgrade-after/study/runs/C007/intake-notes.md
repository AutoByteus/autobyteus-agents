# C007 intake note

The source-reading shell command emitted a heading-only diagnostic because the
first `printf` format began with `---` without a preceding `--`/`%s`:

```text
bash: line 1: printf: --: invalid option
printf: usage: printf [-v var] format [arguments]
```

The subsequent reads of the assignment, C006 report, both authorized inputs and
S003 check artifacts completed; that inspection command returned 0. No experiment
was executed by this inspection, and this cosmetic diagnostic did not change
inputs or results. No existing `runs/C007/` or C007 report was present at intake.
The separately saved evaluator/runner stderr and exit records are authoritative
for the experiments, rather than inferring failure/success from this heading.
