---
name: article-reviewer
description: Review outline-first article packages for thesis strength, structure, style fit, fidelity, platform fit, and publication readiness.
---

# Article Reviewer

Use this skill to critically review article packages produced by `article_writer`.

## Expected Inputs

- `brief.md`
- `outline.md`
- source article or source notes when the request is research-backed or cross-language
- draft files (`article.md` or bilingual draft set)
- optional style-profile notes when the requested voice is part of the task

## Produced Artifact

- `review-report.md`

Use `templates/review-report-template.md` as the report skeleton.

## Required Shared Reads

- Start by reading [../../shared/writing-principles.md](../../shared/writing-principles.md).
- Use it as the canonical shared writing reference while producing or revising the review report.

## Review Modes

- `Outline Review`: before full drafting
- `Draft Review`: single-language article review
- `Bilingual Review`: bilingual pair or cross-language conversion review
- `Polish Review`: final pass after substantive issues are already resolved

## Workflow

### Step 1 - Read the brief and classify the request

Identify:

- target platform
- language mode
- style profile
- audience
- one-sentence takeaway
- whether the request is original drafting, conversion, or bilingual drafting
- whether the source basis is strong enough

If the brief is missing enough information that the writer could not reasonably target the article, return `Brief Gap`.

If the source basis is too weak for the claimed article confidence or the cross-language request has no reliable source text, return `Source Gap`.

### Step 2 - Review the outline first

Check whether the outline has:

- a clear thesis
- section-level logic progression
- an appropriate scope for the requested audience and platform
- enough planned evidence, examples, or support
- a conclusion that lands the intended takeaway
- a style direction that matches the requested profile

If the outline is not strong enough, return `Outline Revision`.

Do not let the process advance to full drafting on a weak outline unless the user explicitly asked to skip that gate.

### Step 3 - Review the full draft package

For single-language articles, check:

- title quality
- opening strength
- thesis clarity
- structure and transitions
- section usefulness
- evidence quality
- paragraph rhythm
- style fidelity
- platform fit
- ending strength
- sentence-level clarity where line edits materially affect comprehension

For bilingual or conversion work, also check:

- no claim loss
- no invented claims
- target-language naturalness
- stable terminology across languages
- preserved section intent and argument order

Apply the shared writing principles before using narrower review taste or local preferences.

### Step 4 - Prioritize findings correctly

Prioritize in this order:

1. thesis or argument failure
2. structural or outline weakness
3. source fidelity or evidence weakness
4. style-fit failure
5. platform-fit failure
6. local clarity or line-edit issues

Do not overload the report with line edits when the real problem is structural.

### Step 5 - Write `review-report.md`

The report should include:

- review mode
- decision
- artifacts reviewed
- high-priority findings
- strengths worth preserving
- required revisions
- decision rationale

Use one of these decisions:

- `Pass`
- `Brief Gap`
- `Source Gap`
- `Outline Revision`
- `Draft Revision`
- `Style Fit Gap`
- `Fidelity Issue`
- `Platform Fit Gap`
- `Unclear`

## Re-review Rule

- Re-review the full package after each revision.
- Do not auto-pass on the first resubmission if the article still feels structurally weak.
- If a style or fidelity issue materially changes the draft, review the whole argument again, not just the edited paragraph.

## Reviewer Standards

- Be critical without becoming vague.
- Make findings concrete enough that the writer can act on them directly.
- Preserve strong thesis and structure when they already work.
- Prefer publication readiness over generic positivity.
