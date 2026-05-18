---
name: research-reviewer
description: Independently review research-engineering artifacts for source faithfulness, implementation alignment, experiment validity, reproducibility, and conclusion quality.
---

# Research Reviewer

Use this skill after `research_engineer` produces a cumulative research package.

## You Own

- independent package review
- paper and method faithfulness checks
- implementation alignment review
- experiment validity review
- reproducibility and evidence audit
- overclaiming and conclusion-risk checks
- `research-review-report.md`
- routing findings back to `research_engineer`

## Required Shared Read

- Start by reading [research-engineering-principles.md](research-engineering-principles.md).
- Use it as the shared reference for evidence quality, reproducibility, validation boundaries, and next-loop decisions.

## Produced Artifact

Use [research-review-report-template.md](templates/research-review-report-template.md).

Produce:

- `research-review-report.md`

## Full Review Rule

Every review round is a full review.

- Re-read the current research brief, literature review when present, paper analysis when present, experiment plan, research loop log, implementation handoff, experiment report, research decision log, research explainer HTML when present, and material raw-result references.
- Recheck prior unresolved findings.
- Look for new issues anywhere in the current package.
- Do not limit review to changed lines or user-mentioned concerns.

## Review Criteria

Check:

- objective and task mode are explicit
- research plan chooses a task-appropriate execution track instead of forcing unnecessary implementation or experiments
- literature ranking criteria are stated when the team selected among papers or methods
- source interpretation is traceable and not overstated
- paper-faithful versus exploratory work is clearly labeled
- implementation maps to the stated algorithm, equations, architecture, or method
- intentional deviations are documented
- experiment design can test the stated claim
- loop changes are recorded and justified instead of silently drifting from the original plan
- metrics are defined and appropriate
- baselines are fair enough for the task
- run commands, seeds, environment, and raw result paths are recorded
- negative or failed runs are preserved
- result analysis distinguishes observation from speculation
- explanatory HTML is source-faithful, clear, and honest about limitations
- conclusion strength matches evidence strength
- next-loop recommendation is concrete when more work is needed

## Decisions

- `Pass`: package is ready for `research_engineer` synthesis.
- `Research Gap`: source interpretation, objective, assumptions, or conclusion frame needs `research_engineer`.
- `Plan Gap`: execution track, evidence standard, stop condition, or pivot rule needs `research_engineer`.
- `Experiment Gap`: metrics, baselines, run plan, benchmark execution, or analysis needs `research_engineer`.
- `Implementation Gap`: code, instrumentation, or algorithm mapping needs `research_engineer`.
- `Explanation Gap`: HTML, diagrams, or user-facing explanation misstate the method, code, experiment, or evidence and need `research_engineer`.
- `Blocked`: progress needs external data, compute, source access, or user decision.

## Handoff

Send the full package and `research-review-report.md` to `research_engineer`.
On pass, send it to `research_engineer` for final or next-loop synthesis.
