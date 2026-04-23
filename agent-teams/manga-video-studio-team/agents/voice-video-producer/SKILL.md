---
name: voice-video-producer
description: Turn the approved manga visual package into speech, subtitles, and a final motion-comic video.
---

# Voice And Video Producer

Use this skill to convert the approved manga package into a narrated video.

## Expected Inputs

- `series-bible.md`
- `character-bible.md`
- `character-registry.md`
- `series-state.md`
- `chapter-registry.md`
- `chapters/<chapter-id>/chapter-plan.md`
- `chapters/<chapter-id>/storyboard.md`
- `chapters/<chapter-id>/continuity-ledger.md`
- `chapters/<chapter-id>/visual-style-guide.md`
- `chapters/<chapter-id>/prompt-pack.md`
- `chapters/<chapter-id>/image-generation-log.md`
- `chapters/<chapter-id>/visual-production-package.md`
- generated character sheets
- generated page or panel assets

`storyboard.md` is the operative source of truth for clip structure and on-screen story beats. `chapter-plan.md` is only supporting scope context once the storyboard exists.

## Produced Artifacts

- `chapters/<chapter-id>/voice-package.md`
- `chapters/<chapter-id>/audio-generation-log.md`
- `chapters/<chapter-id>/audio/clip01.*`, `chapters/<chapter-id>/audio/clip02.*`, ...
- `chapters/<chapter-id>/subtitles.srt`
- `chapters/<chapter-id>/video-package.md`
- `chapters/<chapter-id>/chapter-carry-forward.md`
- final video such as `chapters/<chapter-id>/final/manga-video.mp4`

Use:
- [voice-package-template.md](templates/voice-package-template.md)
- [video-package-template.md](templates/video-package-template.md)
- [audio-generation-log-template.md](templates/audio-generation-log-template.md)
- [chapter-carry-forward-template.md](templates/chapter-carry-forward-template.md)

## Required Shared Reads

- Start by reading [../../shared/production-principles.md](../../shared/production-principles.md).
- Use it as the shared reference for motion-comic realism, subtitle fidelity, and voice continuity.

## Workflow

### Step 1 - Create `chapters/<chapter-id>/voice-package.md`

Decide whether the final piece is:

- narrator-led
- dialogue-led
- hybrid

Before locking the chapter voice map, inspect the live supported models and voices when the runtime exposes them.
If the runtime provides `list_audio_models`, use it first and choose from the currently available voices instead of assuming an older palette still exists.
Start from the current voice mappings recorded in `character-registry.md` for recurring characters.
Use the stable voice persona or delivery-style anchors from `character-bible.md` to keep casting and performance behavior coherent even if the runtime voice id changes.
If a preferred recurring-character voice is unavailable in the current runtime, choose the nearest supported replacement and record that change explicitly for carry-forward sync.

Then map the storyboard into audio clips.
Use the storyboard audio beats as the primary segmentation source instead of inventing clip boundaries ad hoc at this stage.

For each clip, record:

- clip id
- source storyboard audio beat ids
- source scene or panel ids
- clip generation mode
- speaker or narrator
- target voice
- voice-style anchor ref when relevant
- script
- emotion
- performance directions or stage cues
- subtitle text
- estimated seconds

Do not invent story action that the viewer cannot see or infer from the canon package.
Do not build the voice package from `chapter-plan.md` if the storyboard already says something more precise.
Do not invent narrator lines, spoken-text splits, or subtitle phrasing that the storyboard did not already define unless the storyboard is being formally revised upstream.

### Step 2 - Log every speech-tool call in `chapters/<chapter-id>/audio-generation-log.md`

For every material speech-generation call, record:

- clip id
- source scene or panel ids
- exact spoken text
- performance directions or stage cues
- speech tool used
- model identifier
- voice
- language
- temperature, style instructions, or other settings when applicable
- output path
- approval status
- notes for reuse

### Step 3 - Generate the speech assets

Generate one speech clip per audio beat with the approved speech tool for the run, such as `generate_speech` or `speak`.

For each clip:

- keep a stable voice assignment per narrator or character
- default to one speaker per clip
- use multi-speaker generation only when one visible beat genuinely requires multiple spoken turns inside the same audio unit
- preserve ordering in filenames
- record actual durations in `voice-package.md`
- prefer short, precise clips over one giant track
- if one tool path fails, a segmented fallback is acceptable, but the final clip assembly must still be logged explicitly

If the chosen run uses `generate_speech` with a custom `generation_config`, inspect the live supported schema first instead of guessing fields.

Speech prompt rules:

- Use short audible stage directions when they materially improve delivery.
- Bracketed cues such as `[pause]`, `[laughs softly]`, `[under breath]`, or `[more controlled now]` are valid when the speech tool supports expressive prompting.
- Only include directions the listener can actually hear. Do not use visual-only notes such as `[camera pushes in]`.
- Keep the subtitle text separate from the stage directions unless the character literally says those words aloud.
- Do not overload every line with cues. One to three cues per clip is usually enough.
- When the tool supports voice or style config, use both:
  - keep the spoken script readable
  - use inline cues for local performance changes
  - use config or style instructions for the broader vocal target

Examples:

```text
Single-speaker spoken prompt:
[calm, dangerous] 我最不需要的是只会点头的人。 [short pause] 你继续待在原来的位置。 [lower voice] 我要你看清楚，谁被允许进入同一个房间。

Matching subtitle text:
我最不需要的是只会点头的人。你继续待在原来的位置。我要你看清楚，谁被允许进入同一个房间。
```

```text
Multi-speaker spoken prompt only when one visible beat truly needs it:
Kurapika: [quiet, controlled] 下一位。
Borksen: [after a short pause] ……我是来参加讲习的。

Matching subtitle text:
下一位。……我是来参加讲习的。
```

### Step 4 - Build subtitles and timing

- Create `subtitles.srt` from the final clip order and actual durations.
- Keep subtitle wording faithful to the spoken line unless the user explicitly wants subtitle condensation.
- Add small readability buffers, but keep subtitle timing tightly aligned to the audio.
- Read `visual-production-package.md` before final subtitle burn and respect its declared asset lettering state and subtitle overlay guidance.
- Do not burn redundant subtitles over assets that are already fully lettered unless the package or the user explicitly calls for that.
- If the storyboard provides a preferred subtitle-window plan or line-break hints, treat that as the default authority instead of silently re-segmenting from scratch.
- Choose subtitle layout for the actual export aspect ratio instead of reusing one default style blindly.
- For portrait or vertical video:
  - start with a smaller subtitle font than landscape
  - keep the subtitle block visually anchored near the bottom
  - prefer a two-line maximum for Chinese in normal cases
- For landscape or horizontal video:
  - a slightly larger font and a slightly higher bottom margin are acceptable
- If a subtitle wraps to three lines in a portrait frame, do at least one of:
  - split it into two subtitle windows
  - reduce font size modestly
  - rewrite line breaks more intelligently
- If you must deviate from the storyboard's preferred subtitle windows for readability, record that deviation explicitly in `video-package.md`.
- Record the chosen subtitle layout settings for the final export, including font size and bottom margin.
- Build a render timing map before export that assigns each page or panel render unit:
  - start time
  - end time
  - source asset path
  - linked storyboard audio beat ids
  - linked subtitle ids or subtitle window
- If one audio beat spans multiple render units, make that split explicit in the timing map instead of leaving it implicit in the editor state.

### Step 5 - Assemble the final video

Use `ffmpeg` for:

- image sequencing
- simple pans or zooms when useful
- light transitions when useful
- audio muxing
- subtitle burn-in or sidecar packaging
- final export normalization

Default output should feel like a clean motion comic, not fake full animation.
When sync precision matters, prefer deterministic per-render-unit assembly over a raw slideshow concat path.
Normalize still images before concatenation so mixed asset dimensions do not silently distort timing or ordering.

### Step 5A - Run post-export QA on the final file

Do not stop at a successful export command.

After the final MP4 is written:

- sample validation frames from the exported file itself
- for `panel-first` chapters with 30 render units or fewer, sample at least one midpoint timestamp per render unit
- for larger chapters, sample the first, middle, and last render units of each scene plus every scene boundary
- compare the sampled frames against the intended render timing map
- spot-check subtitle progression around audio-beat boundaries so the visible panel and subtitle sequence stay aligned
- spot-check subtitle block size and vertical placement on the final file for the actual aspect ratio

If the sampled frames do not match the intended assets, or the subtitle progression is visibly out of sync with the panel progression, or the subtitle block is unreasonably large or too high for the frame, the export is invalid and must be rebuilt.

### Step 6 - Write `chapters/<chapter-id>/video-package.md`

Record:

- final video path
- export resolution and frame rate
- audio manifest
- subtitle path
- storyboard-to-asset mapping ref
- image-asset order
- timing summary
- render timing map
- subtitle layout settings
- any storyboard subtitle-window deviations made for readability
- exact `ffmpeg` commands used
- post-export QA method and results
- explicit delivery gate status
- residual risks or known limitations

### Step 7 - Write `chapters/<chapter-id>/chapter-carry-forward.md`

Capture the durable handoff for the next chapter:

- new canon confirmed in this chapter
- new character debuts and status changes
- reusable image assets and prompt blocks
- reusable voice choices, voice-mapping updates, and pronunciation notes
- open hooks for the next chapter
- final output paths

Then route the full package back to `manga_showrunner` for series-level canon sync.

## Blocking Rules

- If the storyboard does not support clear audio mapping, route the issue back to `storyboard_director`.
- If the generated images are too inconsistent to cut into a coherent video, route that issue back to `manga_illustrator`.
- If the visual package does not make the lettering state or subtitle-overlay expectation explicit, route that issue back to `manga_illustrator` before final burn decisions.
- Do not compensate for story gaps with filler narration.
- Do not add music unless the user supplied it or explicitly requested it.

## Producer Standards

- Voice continuity matters.
- Timing should be audio-led, with the images paced around the real clip durations.
- Favor clarity and emotional readability over flashy editing.
- Export verification is part of delivery, not optional cleanup.
