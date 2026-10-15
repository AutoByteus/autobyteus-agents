---
name: article-reviewer
description: Review investigation-led article packages for understanding sufficiency, evidence support, reader continuity, structure, style fit, fidelity, platform fit, and publication readiness.
---

# Article Reviewer

Use this skill to critically review article packages produced by the article writer.
The writer owns investigation, hierarchical structure, drafting, visual planning, and asset insertion; the reviewer owns the gate that decides whether the understanding basis, structure, visuals, and draft are publication-ready.
Review and route: do not rewrite the article, and do not invent context to repair missing investigation. Return each gap to the writer.

Review structure from the largest unit to the smallest. Do not let polished local prose compensate for an unresolved article promise, weak section progression, or paragraphs with multiple competing jobs.

## Expected Inputs

The package described in [the article package](../../../../shared/article-package.md). Read every file present:

- `brief.md`
- `understanding-notes.md`
- `source-index.md`
- `claim-evidence-ledger.md` when present
- `research-handoff.md`, and `research-open-questions.md` when present
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

- Start by reading [the team writing principles](../../../../shared/writing-principles.md), the canonical shared writing reference for the review report.
- Read [the platform output rules](../../../../shared/platform-output-rules.md) to judge platform fit and visual legibility.

## Review Modes

- `Understanding Review`: source basis, investigation notes, and claim/evidence support before or alongside outline review
- `Outline Review`: before full drafting
- `Visual Plan Review`: visual placement, purpose, evidence support, caption safety, and asset plan
- `Draft Review`: single-language article review
- `Bilingual Review`: bilingual pair or cross-language conversion review
- `Polish Review`: final pass after substantive issues are already resolved

Choose the mode from what the package contains. A package with no draft gets the pre-draft review: Understanding, Outline, and Visual Plan Review (Steps 1-5). A package with a draft gets Draft Review, or Bilingual Review for a bilingual pair or conversion (Steps 1-8). Use Polish Review only when the previous report left no substantive finding.

## Workflow

### Step 1 - Read the brief and classify the request

Identify:

- target platform
- language mode
- style profile
- selected profile variant when present
- rhetorical mode when present
- opening stance when present
- opening progression and any justified negative/contrastive-opening exception when present
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
- positive-first opening progression for non-essay modes
- explicit reason for any negative or contrastive first move
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

### Spot-check against the primary source

The notes can be wrong. Choose the load-bearing claims: everything the main claim depends on, plus every number, command, quote, and mechanism the package or draft states as fact (at least five, or all of them if fewer). Check each against the primary source itself: open the file or code path, run the command, read the cited section or page. Record claim, source opened, and result in the report. A claim the source contradicts or does not support is an `Evidence Gap` and outranks structure findings. Run code the draft shows when running it is cheap. Do this on the pre-draft review for the claims the point rests on, and again on the draft for what the draft adds.

### Step 4 - Review the outline first

The pre-draft review is light: it decides whether the direction is sound before the writer drafts. Do not ask for paragraph plans. Check that `outline.md` agrees with `style-profile-notes.md` and the understanding package, and look for:

- a specific main claim, bounded by the evidence, that is new or useful to this reader
- the opening stance, and for non-essay modes a positive-first opening progression, with a recorded reason for any negative or contrastive first move
- one named logic spine and the reader's starting point
- a real anchor example (run or sourced) planned for an early place
- a section chain: each section has a one-sentence claim, the reader question it answers, its evidence, mechanism, or example, and what it leads to
- a representation decision wherever the visualization-load trigger fires
- an ending that lands the main claim

Use these structural tests:

- **Article test:** Can the whole article be stated as one bounded claim or answer?
- **Section test:** Does each section add a new claim, mechanism, evidence, example, decision, or implication rather than restating a prior section?
- **Order test:** Does each section follow from the previous section and create the need for the next one?
- **Chain test:** Does every section follow from what the reader already understands, add a necessary contribution, and create the next question, rather than merely introduce another related topic?
- **Representation test:** Where the trigger fires, does the outline choose prose, image, or both, and do the recorded reasons explain why?
- **Bridge test:** Does every meaningful shift in topic, time, actor, abstraction level, scope, or evidence type have a reason and a bridge?
- **Ending test:** Does the conclusion resolve or compress the main claim without introducing a new core idea?

If the outline is only a title list or section topics, or is otherwise not strong enough, return `Outline Revision`. Do not advance an underspecified outline because its topic coverage looks complete.

Do not let the process advance to full drafting on a weak outline unless the user explicitly asked to skip that gate or the writer used the short path.

### Step 5 - Review the visual plan

Check whether `visual-plan.md` exists when:

- the user requested images or image generation
- the article is technical, architectural, process-heavy, comparative, data-backed, or visually dense enough that a text-only draft would weaken comprehension
- the outline contains mechanisms, sequences, boundaries, comparisons, or abstractions that would be clearer visually
- any idea meets the visualization-load trigger in the shared writing principles

If no visuals are needed, verify that the writer made a reasonable text-only decision.
For every `prose-only` idea, apply the same visualization-load trigger the writer uses and check that the writer recorded why the reader does not need to build or hold a mental model. A visualization-load moment left `prose-only` without that reason is a defect, not a style choice.

For each planned or inserted visual, check:

- it supports a nearby section claim, mechanism, sequence, comparison, boundary, or takeaway
- its placement improves the reasoning flow instead of interrupting it
- the type is appropriate: diagram, screenshot, chart, table, matrix, map, generated illustration, or placeholder
- the source or evidence anchor supports the visual content
- the caption is accurate and does not introduce unsupported facts
- the visual links back to a representation decision for its section
- prose responsibility, image responsibility, and combined takeaway are distinct and accurate
- generated images do not fake UI, metrics, architecture, charts, people, logos, screenshots, benchmarks, or source evidence
- the visual has a proposition, visible entities, visible relationships/actions/states, and a minimum reader takeaway without relying entirely on the caption
- a generic illustration could not replace the visual without changing what the reader learns, unless the asset is intentionally a conceptual cover
- the production method follows the tool order in the writing principles, and any fallback is documented
- view each final raster: any short in-image labels are grounded, accurate, and legible, including at mobile article width
- ordinary low-quality SVG is not the default; a diagram is acceptable only as an explicit high-quality HTML-rendered/rasterized exception
- `visual-asset-index.md` exists when assets are sourced, generated, inserted, or intentionally omitted

Return `Outline Revision` when a major idea has no intentional representation decision, when prose/image responsibilities are unclear upstream, or when a visualization-load moment is left `prose-only` without a recorded reason. Return `Visual Plan Gap` when visual planning is missing, visuals are decorative, visuals are disconnected from the article flow, a visual's proposition is not self-contained, captions compensate for a generic image, captions overclaim, or assets invent unsupported details.

### Step 6 - Review the full draft package

**Cold read first.** Before opening the outline, notes, or ledger, read only the draft files from the top as a first-time reader. Write down each place you were lost: an unexplained term, a jump, a claim whose source you wondered about, a point where you stopped seeing why you were reading. Then open the package and use these notes in the passes below. Do this on the first draft review and after any structural revision.

Review in this order and record the highest failing level first:

1. **Article level:** main claim, scope, opening stance, bounded conclusion, reader transformation, and whether the anchor example is real, early, and reused.
2. **Section level:** section order, the chain from one section to the next, representation decisions, section jobs, contribution to the main claim, and repetition across sections.
3. **Paragraph level:** one dominant job per paragraph, known-to-new movement, claim-to-mechanism-to-evidence continuity, prose/image responsibility, and transitions between paragraphs.
4. **Sentence level:** referents, terminology, rhythm, clarity, and platform polish.

For single-language articles, check:

- title quality
- opening strength
- opening stance correctness
- positive-first opening correctness for non-essay drafts: the first paragraph must orient the reader in what exists or what we use before discussing what was not used, missing, rejected, or proposed instead
- thesis clarity or main-observation clarity
- factual accuracy
- mechanism accuracy
- understanding fidelity
- global structure, section progression, and paragraph progression
- structure and transitions
- section usefulness
- evidence quality
- claim/evidence alignment
- paragraph rhythm
- style fidelity
- alignment with `style-profile-notes.md` when present
- visual placement, captions, asset references, and image/prose flow when visuals are part of the article package
- paired representation flow: the image adds its intended information, the prose carries its intended qualifications, and neither medium is merely duplicating or replacing the other by accident
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

Run the reverse outline on the draft: write one sentence for each section and each paragraph, then compare that map with `outline.md`. If the draft's compressed map cannot be explained as a coherent progression, classify the problem as `Draft Revision` or `Outline Revision` according to whether the outline or the draft first diverged. Do not solve a macro failure with line edits.

Run a first-time-reader continuity audit during the macro pass. Read each section ending with the next section opening, then do the same for paragraph boundaries. Mark every moment that invites `Where did this come from?`, `How does this follow?`, or `Why now?`; require a bridge, missing prerequisite, explicit signpost, or structural reorder. Do not treat an unprepared topic, time, actor, abstraction, scope, or evidence shift as a mere transition-polish issue.

Complete two review passes:

1. **Macro pass:** source and mechanism fidelity (including the spot checks), main claim, scope, opening stance, anchor example, section chain, representation decisions, evidence placement, visual propositions, and ending.
2. **Micro pass:** terminology, known-to-new movement, transitions, paragraph relations, prose/image redundancy, rhythm, style variant, bilingual fidelity, platform packaging, captions, label accuracy, and line-level clarity.

Run the micro pass only after the macro pass is coherent. `Pass` requires both passes to be complete with no unresolved high-priority finding; a polished draft with a weak global map is not publication-ready.

If the draft is using the wrong Ryan variant, the wrong rhetorical mode, or the wrong ownership stance, treat that as a real structural problem rather than a cosmetic style note.
If a non-essay draft begins with `we did not`, `not X`, `unlike`, `rather than`, or another negative/contrastive frame when a positive subject-first opening is available, return `Draft Revision` unless the approved outline records a justified exception. Do not pass because the negative side is technically grounded; grounding and opening fit are separate checks.
If the draft introduces claims, mechanisms, chronology, or comparisons that are not present in the understanding package or supplied user constraints, treat that as an evidence or fidelity problem.
If the draft uses `not X, but Y`, `common explanation`, `should`, or `the deeper problem is`, verify that the setup side is grounded. If it is not grounded, classify it as `Evidence Gap`, not merely a tone issue.
If the draft contains visuals that invent details, classify the issue by severity: factual or mechanism inaccuracy for false visual content, `Evidence Gap` for unsupported visual claims, or `Visual Plan Gap` for placement, caption, asset, or usefulness failures.

### Step 7 - Prioritize findings correctly

Prioritize in this order:

1. factual or mechanism inaccuracy
2. insufficient understanding or missing source investigation
3. unsupported load-bearing claims
4. article-level promise or opening-stance failure
5. global structural or outline weakness
6. section-order, reader-continuity, or section-contribution failure
7. paragraph-flow, missing-bridge, or transition failure
8. source fidelity or evidence weakness
9. visual factuality, usefulness, placement, or caption failure
10. style-fit or ownership-stance failure
11. platform-fit failure
12. local clarity or line-edit issues

Do not overload the report with line edits when the real problem is structural.

### Step 8 - Write `review-report.md`

The report should include:

- review mode
- decision
- artifacts reviewed
- primary-source spot checks and cold-read notes
- high-priority findings
- strengths worth preserving
- required revisions
- decision rationale

Use exactly one decision per report: the class of the highest-priority finding (Step 7), listing the other findings under it. Use `Pass` only when no required revision remains.

Decisions:

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
- `Unclear` (the package cannot be classified, for example because the files do not match each other or the request; say what is unclear)

## Re-review Rule

- Re-review the full package after each revision.
- After substantive findings, pass only after at least one full-package re-review; do not pass a resubmission that is still structurally weak.
- If a style or fidelity issue materially changes the draft, review the whole argument again, not just the edited paragraph.
- If the writer changes the investigation notes, source index, or claim/evidence ledger, re-check the outline and draft against the updated understanding package.
- If the writer changes `visual-plan.md`, `visual-asset-index.md`, captions, or inserted images, re-check the visual plan against the understanding package and the surrounding article flow.
- If a prior round flagged sales tone, detachment, repetition, or a too-generic mechanism, verify that the failure mode was actually removed.
- If the draft changes the main claim or section order, require `outline.md` to be updated and review the revised structure before passing the prose.
- If a finding from the previous report is still open after two revisions, mark it `recurring` in the report and say that the writer should ask the user to decide, rather than repeating the same request.

## Reviewer Standards

- Be critical without becoming vague.
- Make findings concrete enough that the writer can act on them directly.
- Preserve strong thesis and structure when they already work.
- Prefer publication readiness over generic positivity.
- Do not accept a draft that sounds more polished but remains under-investigated, inaccurate, unsupported, visually misleading, wrongly framed, detached from the builder voice, or repetitive in the same places.
