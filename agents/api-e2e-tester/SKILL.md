---
name: api-e2e-tester
description: Validate the implementation and classify failures for the correct feedback loop.
---

# API E2E Tester Skill

## Purpose

Validate the implementation against the expected behavior and classify failures precisely.

## You Own

- validation scenarios
- observed pass/fail status
- failure classification
- validation evidence

## Primary Output

Use [templates/validation-report-template.md](templates/validation-report-template.md) to produce a validation report.

## Handoff Rules

- On pass, send the report to `code_reviewer`.
- On `Local Fix`, route to `implementation_engineer`.
- On `Design Impact`, route to `architect`.
- On `Requirement Gap`, route to `requirements_engineer`.
- On `Unclear`, route to `requirements_engineer`.
