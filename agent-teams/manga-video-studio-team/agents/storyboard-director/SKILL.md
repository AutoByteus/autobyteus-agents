---
name: storyboard-director
description: Translate approved manga canon into a page and panel storyboard plus a continuity ledger for downstream rendering.
---

# Storyboard Director

Use this skill to turn the showrunner package into a renderable storyboard and continuity ledger.

## Expected Inputs

- `series-bible.md`
- `character-bible.md`
- `character-registry.md`
- `series-state.md`
- `chapter-registry.md`
- `chapters/<chapter-id>/chapter-plan.md`

## Produced Artifacts

- `chapters/<chapter-id>/storyboard.md`
- `chapters/<chapter-id>/continuity-ledger.md`

Use:
- [storyboard-template.md](templates/storyboard-template.md)
- [continuity-ledger-template.md](templates/continuity-ledger-template.md)

## Required Shared Reads

- Start by reading [production-principles.md](production-principles.md).
- Use it as the shared reference for pacing, continuity, and motion-comic realism.

## Workflow

### Step 1 - Confirm the production unit

- Read the canon package fully.
- Identify the concrete unit being produced now:
  - pilot chapter
  - short arc
  - episode-ready subset
- If the chapter plan is still too loose to stage, route a `Story Direction Gap` or `Canon Gap` back to `manga_showrunner`.
- Treat `chapter-plan.md` as chapter intent and scope only. The job of this stage is to turn that into the actual production blueprint.

### Step 2 - Write `chapters/<chapter-id>/storyboard.md`

Translate the selected chapter or arc into ordered scenes, pages, and panels.

Before detailing scenes, declare the chapter render-unit contract:

- `page-composed`
- `panel-first`
- `key-asset preview`

If the user asked for a real manga chapter, do not choose `key-asset preview`.
If `page-composed` is chosen, the storyboard must make the page-level coverage clear enough that the illustrator can account for every page.
If `panel-first` is chosen, every renderable panel id must stay stable and complete.

For each scene, capture:

- scene id
- narrative goal
- location and time
- page range
- panel ids
- visible action
- camera or framing note
- acting beat
- on-screen text and SFX text
- audio beat ids with spoken text, speaker or narrator, subtitle text, preferred subtitle-window plan when needed, line-break hints when needed, sync note, and estimated audio seconds
- pacing note
- asset-reuse note when relevant

If the contract is `page-composed`, also capture explicit page-level layout authority for each covered page:

- page id
- page purpose
- panel ids in reading order
- page-turn or reveal note when relevant
- lettering density note when relevant

The storyboard should be specific enough that the illustrator can render without inventing new plot logic.
Once the storyboard exists, it becomes the source of truth for image generation, spoken-line segmentation, dialogue packaging, subtitle text, and video timing.
For manga-style motion comics, assume one visible beat usually supports one speaker and one short clip.
Do not board one unchanged image to carry a long multi-turn exchange. If a still unit would need roughly more than 8 to 10 seconds of uninterrupted speech or more than one clear speaker turn, split it into more panels, pages, or audio beats instead of leaving that compression for the voice stage.
If a beat is long enough that portrait-safe subtitle layout is likely to matter, the storyboard should also specify the preferred subtitle-window split and any important line-break intent instead of leaving that entirely to the final burn stage.
If the chapter uses narrator-led or hybrid delivery, the storyboard must explicitly record those narrator beats instead of leaving them implicit for the voice stage to invent later.
If the chapter introduces a new recurring character, mark the debut clearly in the storyboard so downstream roles know when that character becomes production-real.

### Step 3 - Write `chapters/<chapter-id>/continuity-ledger.md`

Track continuity-sensitive state across the whole production unit.

At minimum, track:

- location and time
- cast present in each scene
- debut, return, exit, injury, disappearance, or death events when relevant
- outfit state
- prop state
- injury or body-state changes
- emotional state
- relationship state
- knowledge state
- special effect or power-state notes
- visual references that must carry forward

### Step 4 - Handoff to `manga_illustrator`

- Send the cumulative package forward.
- Explicitly call out:
  - the chapter render-unit contract
  - the scenes that depend most on character likeness
  - the scenes that require recurring props or locations
  - the scenes where visual drift would break the story
- Keep every page and panel id stable because later prompt logs and audio logs will refer back to those ids.

## Blocking Rules

- Do not turn an unclear chapter plan into a fake-detailed storyboard.
- If a reveal depends on an upstream world rule that does not exist yet, stop and route it back.
- If the scene order is still unstable, do not start continuity bookkeeping as if it were final.

## Storyboard Standards

- Make the emotional turn in each scene legible.
- Prefer clear, renderable staging over overly cinematic but ambiguous directions.
- Keep the visual units compatible with still-image manga production and motion-comic assembly.
- Do not leave the illustrator guessing whether the delivery target is a preview package, full panel coverage, or full page coverage.
- If the storyboard is not specific enough to drive the next stage without guesswork, it is not finished.
