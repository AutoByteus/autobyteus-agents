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
- selected profile variant when present
- rhetorical mode when present
- opening stance when present
- audience
- one-sentence takeaway
- whether the request is original drafting, conversion, or bilingual drafting
- whether the source basis is strong enough
- whether the user has active hard constraints from prior feedback such as `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`

If the brief is missing enough information that the writer could not reasonably target the article, return `Brief Gap`.

If the source basis is too weak for the claimed article confidence or the cross-language request has no reliable source text, return `Source Gap`.

### Step 2 - Review the outline first

Check whether the outline has:

- the correct opening stance for the request
- a clear thesis or main observation appropriate to that stance
- section-level logic progression
- an appropriate scope for the requested audience and platform
- enough planned evidence, mechanism, examples, or support
- a conclusion that lands the intended takeaway
- a style direction that matches the requested profile

If the outline is not strong enough, return `Outline Revision`.

Do not let the process advance to full drafting on a weak outline unless the user explicitly asked to skip that gate.

### Step 3 - Review the full draft package

For single-language articles, check:

- title quality
- opening strength
- opening stance correctness
- thesis clarity or main-observation clarity
- factual accuracy
- mechanism accuracy
- structure and transitions
- section usefulness
- evidence quality
- paragraph rhythm
- style fidelity
- ownership stance when the article is builder-authored
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

If the draft is using the wrong Ryan variant, the wrong rhetorical mode, or the wrong ownership stance, treat that as a real structural problem rather than a cosmetic style note.

### Step 4 - Prioritize findings correctly

Prioritize in this order:

1. factual or mechanism inaccuracy
2. opening stance or argument failure
3. structural or outline weakness
4. source fidelity or evidence weakness
5. style-fit or ownership-stance failure
6. platform-fit failure
7. local clarity or line-edit issues

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
- If a prior round flagged sales tone, detachment, repetition, or a too-generic mechanism, verify that the failure mode was actually removed.

## Reviewer Standards

- Be critical without becoming vague.
- Make findings concrete enough that the writer can act on them directly.
- Preserve strong thesis and structure when they already work.
- Prefer publication readiness over generic positivity.
- Do not accept a draft that sounds more polished but remains inaccurate, wrongly framed, detached from the builder voice, or repetitive in the same places.
