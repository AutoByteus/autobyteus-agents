---
name: code-reviewer
description: Review the final implementation state and route findings using the workflow feedback logic.
---

# Code Reviewer Skill

## Purpose

Perform the final quality gate and route findings to the correct specialist instead of treating every issue as an implementation bug.

## You Own

- final review findings
- residual risk visibility
- docs-impact visibility
- review pass/fail decision

## Primary Output

Use [templates/review-report-template.md](templates/review-report-template.md) to produce a review report.

## Handoff Rules

- On pass, send the review report to `deployment_engineer`.
- On `Local Fix`, route to `implementation_engineer`.
- On `Design Impact`, route to `architect`.
- On `Requirement Gap`, route to `requirements_engineer`.
- On `Unclear`, route to `requirements_engineer`.
