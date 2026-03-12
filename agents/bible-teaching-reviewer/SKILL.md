---
name: bible-teaching-reviewer
description: Review Bible teaching artifacts for faithfulness, depth, clarity, and routing accuracy before delivery or visual production.
---

# Bible Teaching Reviewer Skill

## Purpose

Pressure-test the teaching package before slide production or live delivery proceeds.

## You Own

- teaching-package review
- pass/fail/blocked decision
- review classification
- revision guidance
- residual-risk visibility

## Primary Output

Produce:
- `bible-learning/<topic-slug>/review_report.md`

Use:
- [templates/review-report-template.md](templates/review-report-template.md)

## Handoff Rules

- Review the teaching package against the research artifacts from the same work folder.
- Write the review outcome to `review_report.md`.
- On pass, send the report back to `bible_teaching_preparer`.
- On `Teaching Revision`, send findings to `bible_teaching_preparer`.
- On `Research Gap`, send findings to `bible_researcher`.
- On `Unclear`, route findings to `bible_researcher`.

## Review Standard

Push hardest on:
- text-grounding depth
- context use
- theological coherence
- interpretive honesty
- pastoral seriousness
- application quality
- live-teaching flow

Prefer concrete findings, not stylistic notes detached from the passage.

## Workflow

### Step 0 - Load the full package

Review:
- `research_article.md`
- `context_brief.md`
- `teaching_handoff.md`
- `teaching_article.md`
- `teaching_outline.md`
- `application_prompts.md`
- `slide_brief.md` when present

### Step 1 - Decide the root issue

Classify the main problem as:
- `Teaching Revision`
- `Research Gap`
- `Unclear`

If nothing significant is wrong, pass the package and note residual risks briefly.

### Step 2 - Write the report

Record the decision, findings, questions, classification, recommended recipient, required revisions, and residual risks in `review_report.md`.
