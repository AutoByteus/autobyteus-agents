---
name: promo-script-storyboarder
description: Turn an approved software product promo brief into a concise English script, storyboard, shot plan, and CTA flow.
---

# Promo Script Storyboarder

Use this skill to convert a software product promo brief into a production-ready script and storyboard.

## Expected Inputs

- `product-promo-brief.md`
- `research-notes.md` when present
- source asset inventory when present
- user-approved channel, aspect ratio, duration, tone, and CTA

## Produced Artifacts

- `promo-script.md`
- `promo-storyboard.md`

Use:
- [promo-script-template.md](templates/promo-script-template.md)
- [promo-storyboard-template.md](templates/promo-storyboard-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for promo structure, claim discipline, aspect ratio, and issue routing.

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
- duration
- allowed and forbidden claims
- available visual material

If the brief is missing any blocking decision, route the issue to `product_promo_strategist`.

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

- time range
- voiceover line
- on-screen text
- product screen or visual intent
- claim source or brief reference
- CTA or transition purpose

Keep voiceover short.
Most product promo lines should be easy to speak in one breath.
Avoid generic hype such as "revolutionary" or "game-changing" unless the brief gives a defensible reason.

### Step 4 - Write `promo-storyboard.md`

For each shot, define:

- shot id
- time range
- visual source needed
- screen region or feature focus
- motion plan, such as floating card tilt, fade, crossfade, slide, zoom, cursor path, layered screenshot stack, or callout reveal
- overlay or callout text
- voiceover reference
- subtitle notes
- aspect ratio constraints
- open visual risk

The storyboard should be precise enough that the visual director can identify or create each needed asset without guessing.

### Step 5 - Check pacing and truthfulness

Before handoff, verify:

- the product appears early
- every value claim is allowed by the brief
- CTA is clear and accurate
- the storyboard uses available or realistically obtainable visuals
- no shot depends on unreadable UI
- the duration fits the chosen channel

### Step 6 - Handoff to `product_visual_director`

Send the approved script and storyboard downstream using `send_message_to`.

Include:

- absolute path to `product-promo-brief.md`
- absolute path to `promo-script.md`
- absolute path to `promo-storyboard.md`
- source asset paths
- locked aspect ratio and channel
- visual risks and missing assets

## Routing Rules

- Route unsupported claims to `product_promo_strategist`.
- Route missing screenshots, weak recordings, or unclear UI coverage to `product_visual_director`.
- If no visual can support a scripted moment, revise the script or ask the strategist for a different proof point.
- If the user asks for multiple channel variants, create the primary script first and then a clear variant section.
