---
name: promo-script-storyboarder
description: Turn an approved software product promo brief into a concise English script, then turn measured voiceover audio into an audio-informed storyboard and CTA flow.
---

# Promo Script Storyboarder

Use this skill to convert a software product promo brief into a user-approved script, then convert measured voiceover audio into a production-ready storyboard.

## Expected Inputs

- `product-promo-brief.md`
- `research-notes.md` when present
- source asset inventory when present
- user-approved channel, aspect ratio, tone, CTA, duration preference, and hard duration limit when present
- `voiceover-package.md` and `audio-generation-log.md` when creating or revising `promo-storyboard.md`

## Produced Artifacts

- `promo-script.md`
- `promo-storyboard.md` after measured voiceover audio is available

Use:
- [promo-script-template.md](templates/promo-script-template.md)
- [promo-storyboard-template.md](templates/promo-storyboard-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for promo structure, script approval, audio-first timing, claim discipline, aspect ratio, and issue routing.

## Workflow

### Step 1 - Confirm the creative contract

Read the approved brief before writing.

Confirm:

- promo format
- audience
- promise
- proof
- CTA
- target channel
- aspect ratio
- duration preference and hard duration limit when present
- allowed and forbidden claims
- available visual material
- brief approval status

If the brief is missing any blocking decision, route the issue to `product_promo_strategist`.
Do not proceed from an unapproved brief unless the user explicitly asks for exploratory draft options.

### Step 2 - Choose the story structure

Default to a concise promo arc:

1. Hook
2. Problem or opportunity
3. Product reveal
4. Capability moment 1
5. Capability moment 2
6. Proof or credibility cue
7. CTA

Adjust the structure for the requested format.
For social ads, move faster and show the product almost immediately.
For website hero videos, keep the script lighter and let visuals carry more weight.
For sales enablement, make the problem and proof more explicit.

Do not write a step-by-step tutorial unless the user explicitly asks for tutorial content.

### Step 3 - Write `promo-script.md`

Keep the script in English.

For each section, include:

- beat id
- voiceover line
- on-screen text
- product screen, UI state, workflow moment, or visual intent that should support the line
- claim source or brief reference
- CTA or transition purpose

Keep voiceover short.
Most product promo lines should be easy to speak in one breath.
Do not put timestamps, provisional time ranges, estimated spoken durations, or fixed segment lengths in `promo-script.md`.
Avoid generic hype such as "revolutionary" or "game-changing" unless the brief gives a defensible reason.

### Step 4 - Get user approval for the script

Present `promo-script.md` to the user before audio generation or visual production begins.

The approval request should focus on:

- spoken voiceover lines
- on-screen copy
- story order
- CTA wording
- claim accuracy
- tone
- pacing and length

Expect multiple review rounds.
If the user changes the lines, update `promo-script.md` before continuing.
Do not send work to `promo_video_producer` for audio generation until the spoken script and on-screen copy are approved.

### Step 5 - Handoff approved script to `promo_video_producer`

Send the approved script package downstream using `send_message_to` for the early voiceover timing pass.

Include:

- absolute path to `product-promo-brief.md`
- absolute path to `promo-script.md`
- approval status of the brief
- approval status of the script and on-screen copy
- source asset paths when useful for pronunciation or product names
- approved aspect ratio and channel
- duration preference and hard duration limit when present
- narration style or voice direction when known

Do not create final `promo-storyboard.md` until `promo_video_producer` returns measured voiceover durations.

### Step 6 - Review measured voiceover timing

When `voiceover-package.md` and `audio-generation-log.md` return, review:

- clip ids and spoken sequence
- exact spoken text per clip
- measured duration per clip
- total measured narration duration
- user duration preference and hard duration limit when present
- clips that sound too long, too rushed, awkward, or unclear

If a line needs revision, update `promo-script.md`, present the changed spoken lines or on-screen copy to the user for reapproval, and send the revised script back to `promo_video_producer` for regeneration.

### Step 7 - Write `promo-storyboard.md`

For each shot, define:

- shot id
- related script beat id
- related voiceover clip id
- measured voiceover duration
- deliberate pause, hold, or dwell guidance when useful
- visual source needed
- screen region or feature focus
- story-level product or UI moment that must be visible
- motion plan, such as floating card tilt, fade, crossfade, slide, zoom, cursor path, layered screenshot stack, or callout reveal
- overlay or callout text
- voiceover reference
- subtitle notes
- aspect ratio constraints
- open visual risk

Build the storyboard from the approved script and measured voiceover package.
The storyboard should be precise enough that the visual director can identify or specify each needed asset without guessing.
Decide what product moment needs to be shown, but leave the exact capture, image-editing, image-generation, and compositing route to `product_visual_director`.
Use measured audio durations as the timing basis. Do not include guessed pre-audio timing.
Flag shots that can safely use holds, slower motion, loops, or longer CTA dwell when the measured clip needs more visual support.

### Step 8 - Check pacing and truthfulness

Before handoff, verify:

- the script approval status is recorded
- the voiceover package and measured durations are recorded
- the product appears early
- every value claim is allowed by the brief
- CTA is clear and accurate
- the storyboard uses available or realistically obtainable visuals
- no shot depends on unreadable UI
- the measured narration respects any hard duration limit, or the issue has been routed back for script revision
- each shot has enough visual support for the measured voiceover clip

### Step 9 - Handoff to `product_visual_director`

Send the approved script and storyboard downstream using `send_message_to`.

Include:

- absolute path to `product-promo-brief.md`
- absolute path to `promo-script.md`
- absolute path to `voiceover-package.md`
- absolute path to `audio-generation-log.md`
- absolute path to `promo-storyboard.md`
- approval status of the brief
- approval status of the script and on-screen copy
- source asset paths
- approved aspect ratio and channel
- visual risks and missing assets
- measured audio durations and segment guidance, including which shots may use holds, loops, or CTA dwell

## Routing Rules

- Route unsupported claims to `product_promo_strategist`.
- Route missing screenshots, weak recordings, or unclear UI coverage to `product_visual_director`.
- If no visual can support a scripted moment, revise the script or ask the strategist for a different proof point.
- If the user asks for multiple channel variants, create the primary script first and then a clear variant section.
