---
name: narration-script-reviewer
description: Run strict full review of narrated presentation scripts and slide storyboards, route findings, and decide whether the package is ready for slide production.
---

# Narration Script Reviewer

Use this skill to review the explanation before any slide/video production or voiceover generation begins.
This role exists because narrated presentation videos succeed or fail on script logic, source discipline, and non-redundant spoken flow.
User approval of the topic, direction, or draft does not replace this review gate.

## Expected Inputs

- approved `presentation-brief.md`
- `research-notes.md` when present
- `source-material-inventory.md` when present
- `narration-script.md`
- `slide-storyboard.md`
- prior `narration-review-report.md` when this is a rerun

## Produced Artifact

- `narration-review-report.md`

Use:
- [narration-review-report-template.md](templates/narration-review-report-template.md)

## Required Shared Reads

- Start by reading [narrated-presentation-principles.md](narrated-presentation-principles.md).
- Use it as the shared reference for source discipline, logical explanation, no redundancy, spoken clarity, slide fit, embedded slide content, viewer mood, audio persona, narrator consistency, prompt-level cue readiness, and full-review behavior.

## Full Review Rule

Every review round is a full review.

- Re-read the complete current narration script.
- Re-read the complete current slide storyboard.
- Recheck prior unresolved findings.
- Also look for new issues anywhere in the current package.
- Do not limit review to changed lines, prior findings, or user-mentioned problem areas.
- A pass means the full current package passes.

## Review Criteria

Check:

- explanation objective is clear
- script follows a logical, viewer-guided explanatory flow
- each segment naturally follows from the previous one and prepares the next one
- abrupt topic jumps, missing bridges, and unexplained transitions are absent
- every important claim has source support or approved basis
- unsupported or misleading claims are removed or routed back
- no avoidable redundancy remains
- each sentence advances the explanation
- important terms are introduced before use
- reasoning steps are not skipped
- segment boundaries are suitable for spoken delivery, full review, slide design, and audio generation
- slide sequence matches narration sequence
- narration-to-slide mapping is explicit and sensible
- each slide has one clear explanatory job
- each slide specifies required embedded slide content, including exact on-image wording or labels when needed
- image-only or low-text slides have a clear content plan and rationale
- embedded slide content supports rather than duplicates narration
- visual mood/style contract is clear, audience-appropriate, and not defaulting to dark or solemn unless explicitly approved
- audio persona/performance contract is clear, audience-appropriate, relaxed, and not defaulting to a stiff or stern teacher style unless explicitly approved
- narrator identity and voice-consistency expectation are clear enough that the producer can keep one consistent voice across all generated clips
- prompt-level cue style is clear enough to guide natural generated speech without changing approved narration wording
- spoken language is natural and understandable
- spoken flow supports clear, complete, natural explanation without filler or rushed reasoning
- source uncertainty and assumptions are visible
- user approval is not being treated as a substitute for independent review

## Workflow

### Step 1 - Confirm the package

Confirm the handoff includes absolute paths for:

- `presentation-brief.md`
- `narration-script.md`
- `slide-storyboard.md`
- `research-notes.md` when present
- `source-material-inventory.md` when present

If any required artifact is missing, mark the review `Blocked`.

### Step 2 - Review source support

Use the brief and research notes as the source basis.
Spot-check important claims against recorded sources.
If online verification is needed and tools are available, use it selectively and record the source in the review report.

### Step 3 - Review explanation structure

Trace the explanation from beginning to end.
Identify jumps, missing definitions, weak transitions, repeated points, unsupported conclusions, and places where a viewer would lose the thread.
Review at both levels: the whole explanation arc and the sentence-by-sentence flow.
For every segment, ask: why does this come now, what did the viewer need before it, and what does it prepare next?
Flag any moment where a viewer would think, "why are we suddenly here?"

### Step 4 - Review spoken narration

Read the narration as speech.
Flag sentences that are too long, essay-like, repetitive, unnatural, vague, or too dense for voiceover.
Check whether segments are too long for a single slide/audio unit or too fragmented to sound natural.

### Step 5 - Review slide fit

Check that each slide has a clear job and enough visual direction for the slide designer.
Flag overloaded slides, narration-slide mismatch, missing visual source basis, missing required embedded slide content, missing visual mood/style guidance, image-only slides without a clear content plan, or slide wording that simply repeats narration.
Do not require one slide per sentence or one audio clip per image. Require an explicit mapping that will work as a narrated presentation.

### Step 6 - Review viewer mood and audio persona

Check that `presentation-brief.md`, `narration-script.md`, and `slide-storyboard.md` provide enough direction for the intended viewer experience.
The default should be light, friendly, relaxed, and approachable unless the user explicitly approved a heavier tone.
Flag missing or contradictory mood/persona direction, visual plans likely to become dark or solemn, missing narrator consistency direction, missing prompt-level cue guidance, and narration direction likely to become stiff, stern, sermon-like, or boring.

### Step 7 - Run explicit deep-review passes

Before deciding, make sure the review report records evidence for these passes:

- `Structure Pass`: overall argument order, section transitions, missing steps, and conclusion strength.
- `Viewer-Guided Flow Pass`: whether the explanation carries the viewer step by step without abrupt jumps or missing bridges.
- `Support Pass`: factual claims, source links, uncertainty, and unsupported statements.
- `Redundancy Pass`: repeated ideas, duplicated sentences, repeated slide titles, and filler.
- `Spoken Delivery Pass`: sentence length, natural phrasing, density, and spoken flow.
- `Slide Mapping Pass`: segment boundaries, slide jobs, visual fit, and production feasibility.
- `Embedded Slide Content Pass`: required embedded slide content, exact on-image wording or labels when needed, image-only rationale, readability risk, and whether the planned slide will feel like a real presentation/infographic page.
- `Viewer Experience Pass`: visual mood, audio persona, narrator consistency, prompt-level cue readiness, audience fit, and risk of the video feeling too dark, serious, stern, or boring.

### Step 8 - Decide and route

Write `narration-review-report.md`.

Decisions:

- `Pass`: ready for `slide_video_producer`.
- `Fail`: revise with `presentation_director`, then return for another full review.
- `Blocked`: required source, scope, or artifact is missing.

On fail or blocked, send the report to `presentation_director` with finding IDs, evidence, required updates, and next expected action.
On pass, send the cumulative package to `slide_video_producer`.

## Finding Classification

- `Logic Gap`: order, transitions, missing reasoning, or unclear explanation structure.
- `Unsupported Claim`: factual claim lacks source support or approval.
- `Redundancy`: repeated idea that does not add meaning.
- `Spoken Clarity`: awkward, too dense, too long, or unnatural narration.
- `Slide Fit`: storyboard or embedded slide content does not support the narration.
- `Scope Gap`: brief or user intent is missing or contradictory.
- `Blocked`: required artifact or source basis is missing.
