---
name: article-reviewer
description: Review investigation-led article packages for understanding sufficiency, evidence support, thesis strength, structure, style fit, fidelity, platform fit, and publication readiness.
---

# Article Reviewer

Use this skill to critically review article packages produced by `article_writer`.
The writer owns investigation and drafting; the reviewer owns the gate that decides whether the understanding basis, outline, and draft are publication-ready.
The writer owns visual planning and asset insertion; the reviewer owns the gate that decides whether those visuals improve the article without inventing facts.

## Expected Inputs

- `brief.md`
- `understanding-notes.md`
- `source-index.md`
- `claim-evidence-ledger.md` when present
- `style-profile-notes.md` when an author/style profile, rhetorical mode, or platform style is part of the task
- `outline.md`
- `visual-plan.md` when visuals are requested or materially useful for the article shape
- `visual-asset-index.md` when visual assets are sourced, generated, inserted, or intentionally omitted
- source article or source notes when the request is research-backed or cross-language
- draft files (`article.md` or bilingual draft set)

## Produced Artifact

- `review-report.md`

Use `templates/review-report-template.md` as the report skeleton.

## Required Shared Reads

- Start by reading [writing-principles.md](writing-principles.md).
- Use it as the canonical shared writing reference while producing or revising the review report.

## Review Modes

- `Understanding Review`: source basis, investigation notes, and claim/evidence support before or alongside outline review
- `Outline Review`: before full drafting
- `Visual Plan Review`: visual placement, purpose, evidence support, caption safety, and asset plan
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
- understanding mode
- allowed investigation methods
- visual expectations, visual constraints, and whether the article needs generated images, diagrams, screenshots, charts, tables, or no visuals
- whether the request is original drafting, conversion, or bilingual drafting
- whether the source basis is strong enough
- whether the user has active hard constraints from prior feedback such as `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`

If the brief is missing enough information that the writer could not reasonably target the article, return `Brief Gap`.

If the source basis is too weak for the claimed article confidence or the cross-language request has no reliable source text, return `Source Gap`.

### Step 2 - Review the style package

When style matching, author voice, platform packaging, or bilingual adaptation is in scope, check whether `style-profile-notes.md` exists and is specific enough for review.

Verify that it records:

- selected profile ID and profile file path
- example file paths when examples were used
- selected profile variant or stance mode
- rhetorical mode
- platform and language rules that matter
- concrete voice, structure, rhythm, terminology, and ending constraints
- forbidden style moves for this request
- active user corrections and bootstrapping limitations
- evidence constraints for contrastive or recommendation-style moves

Return `Style Fit Gap` when the style basis is missing or too vague to review style fit.
Return `Evidence Gap` when the style package authorizes a move that conflicts with the source basis or shared writing principles.

### Step 3 - Review the understanding package

Check whether `understanding-notes.md`, `source-index.md`, and `claim-evidence-ledger.md` when present show enough understanding for the article being attempted.

For supplied-source articles, verify:

- supplied materials are identified and actually used
- source notes capture the relevant mechanism, argument, chronology, or evidence
- limitations or missing inputs are explicit

For workspace or source-code articles, verify:

- relevant files, docs, tests, examples, logs, commands, or runtime observations are listed
- mechanism claims in the planned article map back to concrete paths, commands, or observations
- the writer did not infer architecture or behavior without inspecting the current project evidence

For online, documentation, paper, or PDF-backed articles, verify:

- material sources were read deeply enough for the claims being made
- dates and uncertainty are explicit when recency matters
- opposing evidence, caveats, or source limitations are not hidden

For builder-experience articles, verify:

- the user's practical sequence, firsthand observations, and ownership stance are preserved
- the article does not turn firsthand material into detached generic commentary

Return:

- `Understanding Gap` when the writer has not understood the subject deeply enough for the article
- `Source Gap` when key sources are missing, inaccessible, or not actually inspected
- `Evidence Gap` when the article direction contains load-bearing claims not supported by the recorded evidence, including author-style patterns that create an unsupported contrast, opponent, common belief, recommendation, root-cause claim, or production observation

Do not ask the writer to fix missing understanding only through prose edits.

### Step 4 - Review the outline first

Check whether the outline has:

- the correct opening stance for the request
- a clear thesis or main observation appropriate to that stance
- section-level logic progression
- an appropriate scope for the requested audience and platform
- enough planned evidence, mechanism, examples, or support
- a visible relationship to the understanding package
- a conclusion that lands the intended takeaway
- a style direction that matches the requested profile
- visible alignment with `style-profile-notes.md` when style matching is in scope
- visible visual opportunities when the article is technical, architectural, process-heavy, comparative, data-backed, or long enough to need visual pacing

If the outline is not strong enough, return `Outline Revision`.

Do not let the process advance to full drafting on a weak outline unless the user explicitly asked to skip that gate.

### Step 5 - Review the visual plan

Check whether `visual-plan.md` exists when:

- the user requested images or image generation
- the article is technical, architectural, process-heavy, comparative, data-backed, or visually dense enough that a text-only draft would weaken comprehension
- the outline contains mechanisms, sequences, boundaries, comparisons, or abstractions that would be clearer visually

If no visuals are needed, verify that the writer made a reasonable text-only decision.

For each planned or inserted visual, check:

- it supports a nearby section claim, mechanism, sequence, comparison, boundary, or takeaway
- its placement improves the reasoning flow instead of interrupting it
- the type is appropriate: diagram, screenshot, chart, table, matrix, map, generated illustration, or placeholder
- the source or evidence anchor supports the visual content
- the caption is accurate and does not introduce unsupported facts
- generated images do not fake UI, metrics, architecture, charts, people, logos, screenshots, benchmarks, or source evidence
- a structured diagram or annotated screenshot is used when it would be clearer and more truthful than a decorative generated image
- `visual-asset-index.md` exists when assets are sourced, generated, inserted, or intentionally omitted

Return `Visual Plan Gap` when visual planning is missing, visuals are decorative, visuals are disconnected from the article flow, captions overclaim, or assets invent unsupported details.

### Step 6 - Review the full draft package

For single-language articles, check:

- title quality
- opening strength
- opening stance correctness
- thesis clarity or main-observation clarity
- factual accuracy
- mechanism accuracy
- understanding fidelity
- structure and transitions
- section usefulness
- evidence quality
- claim/evidence alignment
- paragraph rhythm
- style fidelity
- alignment with `style-profile-notes.md` when present
- visual placement, captions, asset references, and image/prose flow when visuals are part of the article package
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
If the draft introduces claims, mechanisms, chronology, or comparisons that are not present in the understanding package or supplied user constraints, treat that as an evidence or fidelity problem.
If the draft uses `not X, but Y`, `common explanation`, `should`, or `the deeper problem is`, verify that the setup side is grounded. If it is not grounded, classify it as `Evidence Gap`, not merely a tone issue.
If the draft contains visuals that invent details, classify the issue by severity: factual or mechanism inaccuracy for false visual content, `Evidence Gap` for unsupported visual claims, or `Visual Plan Gap` for placement, caption, asset, or usefulness failures.

### Step 7 - Prioritize findings correctly

Prioritize in this order:

1. factual or mechanism inaccuracy
2. insufficient understanding or missing source investigation
3. unsupported load-bearing claims
4. opening stance or argument failure
5. structural or outline weakness
6. source fidelity or evidence weakness
7. visual factuality, usefulness, placement, or caption failure
8. style-fit or ownership-stance failure
9. platform-fit failure
10. local clarity or line-edit issues

Do not overload the report with line edits when the real problem is structural.

### Step 8 - Write `review-report.md`

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
- `Understanding Gap`
- `Source Gap`
- `Evidence Gap`
- `Outline Revision`
- `Visual Plan Gap`
- `Draft Revision`
- `Style Fit Gap`
- `Fidelity Issue`
- `Platform Fit Gap`
- `Unclear`

## Re-review Rule

- Re-review the full package after each revision.
- Do not auto-pass on the first resubmission if the article still feels structurally weak.
- If a style or fidelity issue materially changes the draft, review the whole argument again, not just the edited paragraph.
- If the writer changes the investigation notes, source index, or claim/evidence ledger, re-check the outline and draft against the updated understanding package.
- If the writer changes `visual-plan.md`, `visual-asset-index.md`, captions, or inserted images, re-check the visual plan against the understanding package and the surrounding article flow.
- If a prior round flagged sales tone, detachment, repetition, or a too-generic mechanism, verify that the failure mode was actually removed.

## Reviewer Standards

- Be critical without becoming vague.
- Make findings concrete enough that the writer can act on them directly.
- Preserve strong thesis and structure when they already work.
- Prefer publication readiness over generic positivity.
- Do not accept a draft that sounds more polished but remains under-investigated, inaccurate, unsupported, visually misleading, wrongly framed, detached from the builder voice, or repetitive in the same places.
