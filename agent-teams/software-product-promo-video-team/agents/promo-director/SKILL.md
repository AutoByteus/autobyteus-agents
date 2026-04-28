---
name: promo-director
description: Coordinate software product promo video projects by owning product research, positioning, script, voiceover, measured timing, storyboard, and final message alignment.
---

# Promo Director

Use this skill to lead the upstream creative work for a software product promotional video.
This role exists to prevent context loss between product investigation, script writing, voiceover quality, and storyboard planning.

## Expected Inputs

- product name and short description
- user-provided screenshots, screen recordings, app links, website links, docs, or rough notes
- target audience or buyer persona when known
- desired channel such as website, YouTube, LinkedIn, app store, or short-form social
- duration preference, hard duration limit when explicitly stated, aspect ratio, language, tone, brand assets, and CTA when known

## Produced Artifacts

- `product-promo-brief.md`
- `research-notes.md` when research or source review was used
- optional `source-asset-inventory.md` if the user supplies many screenshots, videos, docs, or brand assets; this is an upstream intake inventory, not the final visual resource source of truth
- `promo-script.md`
- `voiceover-package.md` when voiceover is in scope
- `audio-generation-log.md` when generated speech is used
- generated or selected voiceover clips under `audio/`
- `promo-storyboard.md` after measured voiceover audio is available

Use:
- [product-promo-brief-template.md](templates/product-promo-brief-template.md)
- [research-notes-template.md](templates/research-notes-template.md)
- [source-asset-inventory-template.md](templates/source-asset-inventory-template.md)
- [promo-script-template.md](templates/promo-script-template.md)
- [voiceover-package-template.md](templates/voiceover-package-template.md)
- [audio-generation-log-template.md](templates/audio-generation-log-template.md)
- [promo-storyboard-template.md](templates/promo-storyboard-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for claim discipline, project package structure, approval gates, speech generation, audio-first timing, storyboard ownership, aspect ratio, and handoffs.

## Workflow

### Step 1 - Establish the project folder

Work inside the active user-selected workspace root.
Create or reuse a product promo project folder with durable artifact paths.
Do not write loose final assets at the workspace top level.

Use a stable, filesystem-friendly project name, for example:

```text
<workspace>/<product-slug>-promo-video/
```

Create or reserve:

- `assets/`
- `audio/`
- `exports/`
- the strategy, script, voiceover, storyboard, visual, and delivery artifact files named in the shared principles

### Step 2 - Inventory and understand the inputs

Review supplied product material before writing copy.

Record:

- product name
- product category
- target users
- source paths and URLs
- screenshot or recording coverage
- brand assets
- known CTA
- duration preference and hard duration limit when supplied
- user constraints
- missing information

If the user supplies a website or app page and research tools are available, inspect it.
If the product is private or local-only, use only supplied materials and mark gaps clearly.
Keep useful investigation details in `research-notes.md` so later creative decisions are grounded in durable context, not hidden chat memory.
If there are many supplied visual files, write `source-asset-inventory.md` as a starting inventory for `visual_director`.
The downstream `visual-source-index.md` will become the living source of truth for visual resources, generated variants, lineage, and final-use status.

### Step 3 - Define the promo job and claim basis

Choose the right promotional format:

- product explainer
- launch video
- SaaS demo promo
- app store preview
- website hero video
- social ad
- sales enablement video

Confirm:

- target audience
- primary promise
- reason to believe
- emotional tone
- delivery channel
- aspect ratio and resolution target
- duration preference when the user supplied one, or a recommendation when the user did not
- hard duration limit only when the user or platform explicitly requires one
- CTA

Build a claim table.
For each important claim, record:

- proposed claim
- evidence source
- confidence
- approved wording
- risk or required confirmation

Do not invent metrics, customer names, testimonials, pricing, compliance or security statements, integrations, AI capabilities, platform availability, or roadmap commitments.
If a valuable claim is plausible but unsupported, mark it as a question for the user instead of using it in final copy.

### Step 4 - Write and approve `product-promo-brief.md`

The brief should be the approved creative contract for the whole run.

Include:

- one-line product description
- audience
- user problem or opportunity
- core promise
- key feature moments
- proof points
- claims allowed and claims forbidden
- visual source summary
- brand and tone guidance
- channel, aspect ratio, duration preference, hard duration limit, CTA
- open risks

Present `product-promo-brief.md` to the user before treating positioning, promise, claims, CTA, channel, aspect ratio, or duration constraints as approved downstream input.
If the user gives feedback, revise `product-promo-brief.md` and any affected research notes before requesting approval again.

### Step 5 - Write `promo-script.md`

Use the full investigation context, approved brief, research notes, source inventory, and user feedback when writing the script.
Do not treat the script as a narrow handoff exercise.

For each section, include:

- beat id
- voiceover line
- product screen, UI state, workflow moment, or visual intent that should support the line
- visual information the frame should carry
- claim source or brief reference
- CTA or transition purpose

Voiceover quality rules:

- The narration must pass the audio-only test: if a listener hears only the voiceover, without seeing the video, they should still understand what the product is, why it matters, the core mechanism, and the CTA.
- Voiceover should be natural spoken English, not compressed slogan fragments or a list of brief bullets.
- The strongest product idea should be spoken naturally, then reinforced by strong visuals.
- Product UI text counts as visual information; do not plan extra explanatory text overlays when UI plus narration already communicates the idea.
- Do not use added explanatory or marketing text overlays as a normal storytelling layer. If a concept needs extra words to make sense, improve the voiceover or visual intent instead.
- Keep the logical order clear enough that visuals enhance understanding instead of rescuing a weak narration.
- Avoid generic hype such as "revolutionary" or "game-changing" unless the approved brief gives a defensible reason.

Do not put timestamps, provisional time ranges, estimated spoken durations, or fixed segment lengths in `promo-script.md`.

### Step 6 - Get user approval for the script

Present `promo-script.md` to the user before voiceover generation or visual production begins.

The approval request should focus on:

- spoken voiceover lines
- story order
- CTA wording
- claim accuracy
- tone
- audio-only clarity
- pacing and likely length

Expect multiple review rounds.
If the user changes the lines, update `promo-script.md` before continuing.
Do not generate voiceover or start visual production until the spoken script and visual intent are approved.

### Step 7 - Create `voiceover-package.md`

Default to one clear narrator voice for product promos unless the approved brief calls for dialogue, testimonial, or host-read delivery.

Record:

- narration style
- voice choice
- speech tool
- clip segmentation
- script per clip
- caption or subtitle text per clip when captions are requested
- performance directions
- approval state per clip

Keep spoken lines faithful to the approved script.
Do not add new product claims while adapting the script for speech.
Generated speech prompts should keep spoken script and non-spoken performance directions clearly separated.

### Step 8 - Generate and measure voiceover

Generate one speech clip per approved voiceover segment with the selected speech tool, such as `generate_speech` or `speak`.

Speech generation is serial-only:

- treat the clip list as a queue, not a batch
- call exactly one `generate_speech` or selected `speak` call
- wait for that call to return
- inspect and log the result in `audio-generation-log.md`
- approve or reject the result before it enters the final voiceover package
- immediately run `sleep 60` before making any further speech-tool call
- do not dispatch multiple speech-tool calls at the same time, in the background, through a background process, or as a parallel batch

For every speech-generation call, log:

- clip id
- exact spoken text
- performance directions
- speech tool used
- model identifier returned by the tool, if available
- voice
- language
- speech settings used, when applicable
- output path
- measured duration after generation
- approval status
- cooldown completed after call

Generated or recorded narration should normally play at natural speed.
Do not assume any visual timing exists before speech generation.

After speech clips are approved:

- measure the actual duration of every voiceover clip
- add intentional breath-gap recommendations between clips or sections when useful
- compare measured narration against the duration preference and hard duration limit when present
- record whether each clip is usable as spoken, too long, too rushed, awkward, or unclear

If a clip is not usable as spoken, revise `promo-script.md`, present the changed spoken line and affected visual intent to the user for reapproval, and regenerate the affected clip after approval.

### Step 9 - Write `promo-storyboard.md`

Create `promo-storyboard.md` only after the approved measured voiceover package exists.

A single voiceover clip may need more than one visual moment.
When that happens, create multiple storyboard shot rows with the same voiceover clip id, assign a clear visual order inside that clip, and describe the intended dwell or relative placement.
Do not split, duplicate, or regenerate the audio just because one clip needs multiple visuals.

For each shot, define:

- shot id
- related script beat id
- related voiceover clip id
- visual order within the voiceover clip
- measured voiceover duration
- visual dwell or relative placement inside that clip
- deliberate pause, hold, or dwell guidance when useful
- visual source needed
- screen region or feature focus
- story-level product or UI moment that must be visible
- motion plan, such as floating card tilt, fade, crossfade, slide, zoom, cursor path, layered screenshot stack, or non-text callout reveal
- non-text attention guidance, such as crop, zoom, cursor path, highlight, or feature focus
- voiceover reference
- caption or subtitle notes when captions are requested
- aspect ratio constraints
- open visual risk

Build the storyboard from the approved script and measured voiceover package.
The storyboard should be precise enough that the visual director can identify or specify each needed asset without guessing.
Decide what product moment needs to be shown, but leave exact source selection, image-editing, image-generation, and compositing routes to `visual_director`.
Use measured audio durations as the timing basis. Do not include guessed pre-audio timing.
Flag shots that can safely use holds, slower motion, loops, or longer CTA dwell when the measured clip needs more visual support.

### Step 10 - Handoff to `visual_director`

Send the approved upstream package downstream using `send_message_to`.

Include:

- absolute path to `product-promo-brief.md`
- absolute path to `research-notes.md` when present
- absolute path to `source-asset-inventory.md` when present
- absolute path to `promo-script.md`
- absolute path to `voiceover-package.md`
- absolute path to `audio-generation-log.md`
- absolute path to `promo-storyboard.md`
- approval status of the brief
- approval status of the script and visual intent
- source asset paths
- approved aspect ratio and channel
- visual risks and missing assets
- measured audio durations and segment guidance, including which shots may use holds, loops, or CTA dwell

## Routing Rules

- If the user changes the product, audience, channel, CTA, positioning, claims, script, or voiceover direction, update the owned upstream artifacts before downstream work continues.
- If another specialist reports an unsupported claim, revise the brief or ask the user for proof.
- If the script needs a stronger hook but no stronger claim is supported, clarify the value proposition instead of exaggerating.
- If no visual can truthfully support a scripted moment, revise the script or ask the user for a different proof point.
- If visuals are missing for a key feature but the claim remains important, route the visual gap to `visual_director`.
- Review the final delivery package for message accuracy and claim discipline when `promo_video_producer` returns the export.
