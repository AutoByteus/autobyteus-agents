---
name: presentation-director
description: Lead narrated presentation video projects by owning intake, research, explanation structure, narration script, slide storyboard, review revisions, and final explanation coherence.
---

# Presentation Director

Use this skill to lead the upstream work for a narrated presentation video.
This role merges research and script writing because the researcher has the full source context needed to write the explanation clearly.

## Expected Inputs

- topic, question, argument, lesson, review subject, or rough video idea
- user-provided notes, documents, links, screenshots, images, slide drafts, transcripts, or source materials
- target audience, language, tone, aspect ratio, and delivery context when known
- viewer mood, visual style, and narration persona preferences when known
- narrator identity, voice consistency, and prompt-level cue preferences when known
- constraints such as must-use sources, forbidden sources, required claims, privacy limits, or citation expectations

## Produced Artifacts

- `presentation-brief.md`
- `source-material-inventory.md` when the user supplies multiple materials or links
- `research-notes.md` when source review or online research was used
- `narration-script.md`
- `slide-storyboard.md`

Use:
- [presentation-brief-template.md](templates/presentation-brief-template.md)
- [source-material-inventory-template.md](templates/source-material-inventory-template.md)
- [research-notes-template.md](templates/research-notes-template.md)
- [narration-script-template.md](templates/narration-script-template.md)
- [slide-storyboard-template.md](templates/slide-storyboard-template.md)

## Required Shared Reads

- Start by reading [narrated-presentation-principles.md](narrated-presentation-principles.md).
- Use it as the shared reference for explanation quality, source discipline, no-redundancy rules, full script review, slide mapping, embedded slide content, viewer mood, narration persona, narrator consistency, prompt-level cue style, and slide simplicity.

## Workflow

### Step 1 - Establish the project folder

Work inside the active user-selected workspace root.
Create or reuse one durable project folder.
Do not write loose final assets at the workspace top level.

Use a stable, filesystem-friendly project name, for example:

```text
<workspace>/<topic-slug>-narrated-presentation-video/
```

Create or reserve:

- `sources/`
- `slides/`
- `audio/`
- `exports/`
- the brief, research, script, storyboard, review, visual, assembly, and delivery artifact files named in the shared principles

### Step 2 - Inventory and understand inputs

Review supplied materials before writing the script.

Record:

- user objective
- target audience
- source paths and URLs
- input-material status
- required and forbidden claims
- tone and language constraints
- visual mood and style preferences
- audio persona and performance preferences
- narrator identity and voice-consistency preferences
- prompt-level cue preferences for generated speech
- content-led explanation expectation
- missing information

If there are multiple supplied materials, write `source-material-inventory.md`.
If the user supplies URLs or asks for broader context, research online using available tools and record sources in `research-notes.md`.
If the topic is high-stakes, current, factual, legal, financial, medical, scientific, or otherwise likely to change, verify from reliable sources and record dates or versions.

### Step 3 - Define the explanation contract

Write `presentation-brief.md` as the approved contract for the run.

Include:

- explanation objective
- target audience
- central question or thesis
- scope boundaries
- source basis
- key points
- terms that need definition
- known risks or contested areas
- language and tone
- visual mood/style contract
- audio persona/performance contract
- narrator identity and voice-consistency contract
- prompt-level cue style for generated speech
- content-led explanation expectation and aspect ratio
- visual style direction for simple slides

Present `presentation-brief.md` to the user for approval before treating the scope, source basis, audience, or tone as locked downstream input.
If the user gives feedback, revise the brief and any affected research notes before requesting approval again.
Do not add artificial size constraints or fixed slide counts.
Record that the explanation should be as complete as needed to explain the subject clearly, with no redundancy or filler.

Default style contract unless the user asks otherwise:

- visual mood: light, relaxed, friendly, clear, audience-approachable
- avoid: dark cinematic, ominous, solemn, heavy, black/gold poster-like, or overly dramatic visual style
- audio persona: warm, conversational, relaxed, engaging, not stiff or lecture-like
- narrator identity: one consistent narrator voice/persona across all generated clips unless the user explicitly asks for multiple voices
- prompt-level cue style: concise audible bracketed cues such as `[warm, conversational]`, `[short pause]`, or `[gentle emphasis]` to make generated speech natural without changing approved narration wording
- avoid: old-fashioned, stern, formal teacher, sermon-like, monotonous, or boring delivery

### Step 4 - Write `narration-script.md`

Use the full source context, approved brief, research notes, source inventory, and user feedback.

For each segment, include:

- segment id
- slide id or approved slide sequence
- narration text
- purpose in the explanation
- source or evidence basis
- key term or reasoning step introduced
- redundancy risk, if any

Script rules:

- Use spoken language that sounds natural when read aloud.
- Keep logical order explicit.
- Guide the viewer step by step through a coherent explanatory path. Each segment should naturally follow from the previous one and prepare the next one.
- Add bridge sentences when the explanation would otherwise jump to a new concept, source fact, example, or implication too abruptly.
- Do not list facts as separate blocks; explain why each fact matters before moving on.
- Avoid repeated ideas unless each repeat adds a distinct angle.
- Make every sentence advance the explanation.
- Define important terms before relying on them.
- Do not use unsupported claims.
- Do not write dense article paragraphs for narration.
- Do not write slide text as a substitute for narration.
- Do not weaken or pad the script to satisfy an artificial size constraint. Let completeness, depth, clarity, engagement, and natural flow determine final length.
- Keep segment boundaries useful for review, audio generation, and slide design.
- Default to one narration segment per primary slide, but split long explanations into multiple segments when the visual should change.

### Step 5 - Write `slide-storyboard.md`

Map the approved explanation into simple slides.

For each slide, include:

- slide id
- linked narration segment ids
- slide purpose
- main visual or diagram idea
- required embedded slide content: exact on-image wording when needed, labels, diagram content, chart content, source visuals, and visual structure that the generated/edited final slide image must contain
- visual mood/style notes for the slide, following the approved visual mood/style contract
- image-only or low-text content rationale when no written wording is planned
- source basis for visual elements
- visual risk or missing asset

Default to one main idea per slide.
Do not leave required embedded slide content blank.
If the slide intentionally has little or no written wording, define the image-only content plan and explain why that carries the point better.
If one slide needs too much text or too many points, split it.
If one narration segment needs several visual states, split that narration segment and update `narration-script.md` before review.
If several short narration segments use the same visual context, they may share one slide only when the storyboard makes that mapping explicit.
Check that the slide sequence feels like a guided explanation, not a pile of related pages.

### Step 6 - Send to narration script review

Send the cumulative upstream package to `narration_script_reviewer`:

- `presentation-brief.md`
- `research-notes.md` when present
- `source-material-inventory.md` when present
- `narration-script.md`
- `slide-storyboard.md`

Use absolute filesystem paths.
State the approval status, target audience, source basis, open risks, and next expected decision.

If `narration_script_reviewer` returns findings, revise the whole affected package and send it back for another full review.
Do not ask for a delta review.

### Step 7 - Handoff after script approval

Once `narration_script_reviewer` passes the script and storyboard, send the cumulative package to `slide_video_producer`.
Include the `narration-review-report.md` path and any residual risks.

## Routing Rules

- If slide production exposes missing visual support for a source claim, revise the script/storyboard or ask the user for a source.
- If video assembly exposes narration problems that require script changes, revise the script and resend it to `narration_script_reviewer` for a full review before production resumes.
- If the final video reveals an explanation defect, update the source artifacts rather than patching it only in the edit.
