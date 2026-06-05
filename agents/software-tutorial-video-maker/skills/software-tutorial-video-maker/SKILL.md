---
name: software-tutorial-video-maker
description: Turn supplied software screenshots and rough teaching notes into a reusable tutorial brief, storyboard, voiceover set, and ffmpeg-assembled final tutorial video.
---

# Software Tutorial Video Maker Skill

## Purpose

Take supplied software screenshots plus rough instructional notes and produce a short, truthful, reusable tutorial video package from intake through final ffmpeg assembly.

## You Own

- screenshot review
- brief clarification
- segment ordering
- narration writing
- storyboard timing
- speech generation
- ffmpeg assembly
- final artifact packaging

## Primary Output

Use:
- [tutorial-brief-template.md](templates/tutorial-brief-template.md)
- [tutorial-storyboard-template.md](templates/tutorial-storyboard-template.md)
- [voiceover-package-template.md](templates/voiceover-package-template.md)
- [video-package-template.md](templates/video-package-template.md)

Produce:
- `tutorial-brief.md`
- `tutorial-storyboard.md`
- `voiceover-package.md`
- `video-package.md`
- `audio/segment01.*`, `audio/segment02.*`, ...
- final tutorial video such as `tutorial.mp4`

## Artifact Location Rule

- Create one dedicated work folder per tutorial run and keep the brief, storyboard, voiceover package, video package, narration assets, and final video in that folder.
- Write the authoritative artifacts in this order unless the user explicitly asks for a different sequence:
  - `tutorial-brief.md`
  - `tutorial-storyboard.md`
  - `voiceover-package.md`
  - `video-package.md`
- Keep the package reusable so the tutorial can be regenerated cleanly when screenshots, wording, or timing change.

## Communication Rule

- Keep progress updates short and production-oriented: brief/storyboard status, narration status, assembly status, and blocker status.

## Core Principles

### 1. Screenshot Truth Is The Source Of Truth

- Use the supplied screenshots or frames as the authoritative visual basis.
- Do not invent unseen menus, hidden controls, cursor paths, intermediate clicks, or success states that the screenshots and raw notes do not support.
- If a required visual state is missing, stop and ask for it.

### 2. One Segment Should Teach One Concrete Move

- Each segment should cover one clear teaching move whenever possible:
  - what the viewer is seeing
  - what action or concept matters
  - what visible result the viewer should notice
- Do not compress unrelated teaching steps into one long narration block.

### 3. Narration Should Follow The Visible UI

- The narration should stay anchored to what the viewer can actually see in that segment.
- Explain state, intent, and consequence in clear language.
- Keep narration concise and instructional by default.

### 4. Open With A Short Tutorial Framing Line

- The first narrated segment should briefly tell the viewer what the tutorial will demonstrate before moving into the first visible action.
- Default pattern: `In this tutorial, we'll show you how to ...`
- Keep this opening line short, concrete, and aligned with the actual tutorial objective.
- Do not add a long generic introduction that delays the visible teaching flow.

### 5. Timing Should Be Audio-Led

- Hold time should come from actual narration duration plus a small readability buffer.
- Do not use arbitrary fixed durations when the speech is materially shorter or longer.

### 6. Assembly Should Stay Simple Unless The User Asks For More

- Default to still-image video assembly with cuts or light fades.
- Do not add fake cursor movement, decorative animation, or cinematic motion unless the user explicitly wants that style.
- Use `ffmpeg` for video assembly instead of assuming a separate editing tool.

## Workflow

### Step 1 - Write `tutorial-brief.md`

Record:
- tutorial title or working slug
- audience
- language
- narration tone
- tutorial objective
- source screenshot or frame inventory
- expected final artifact
- raw user notes or rough script basis
- constraints
- missing assets or risky gaps

### Step 2 - Write `tutorial-storyboard.md`

Turn the tutorial into ordered segments.

Each segment should capture:
- `segment_id`
- source image or frame reference
- visible UI state summary
- teaching goal
- narration script
- emphasis note, if any
- transition note
- estimated speech seconds
- estimated hold seconds

Keep one concrete teaching move per segment whenever possible.

For the opening segment:
- start the narration with a short framing line that tells the viewer what they will learn
- then move directly into the first visible step without adding filler

### Step 3 - Generate narration

Generate one narration clip per segment with `speak`.

For each clip:
- pass `play=false` so the run produces the audio file without local playback side effects
- provide an explicit `output_path` for the segment file
- set `language` when the user requests a specific narration language
- use one consistent voice unless the tutorial explicitly needs variation
- preserve segment ordering in filenames
- keep one clip per segment
- record actual clip duration in `voiceover-package.md`

Do not silently change the meaning of the tutorial during speech generation.

### Step 4 - Assemble the video with ffmpeg

Use `ffmpeg` for:
- image-to-video segment creation
- audio muxing
- optional light transitions
- segment concatenation
- final export normalization

Build the timing plan from the real audio durations plus a small readability buffer.

If subtitles are useful, derive them directly from the segment narration and timing plan.

### Step 5 - Package the outputs

`video-package.md` should capture:
- final video path
- export resolution and frame rate
- segment timing summary
- subtitle path, if created
- exact `ffmpeg` command(s) used
- residual risks or known limitations

## Blocking Rules

- If screenshots are missing or out of order in a way that makes the tutorial misleading, stop and ask for the missing screenshot or sequencing clarification.
- If the raw notes are too vague or contradictory to support truthful narration, stop and ask for the minimum clarification.
- Prefer a short, accurate tutorial over a longer but speculative one.

## Tone

- Stay instructional, visually grounded, and production-aware.
