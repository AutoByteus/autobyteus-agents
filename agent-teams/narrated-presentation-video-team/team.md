---
name: Narrated Presentation Video Team
description: A slide-based explainer video team for researched narration scripts, clean presentation visuals, voiceover, and simple still-slide video assembly.
category: creative-media
---

This team creates narrated presentation videos from user-provided materials, links, rough notes, documents, or topic requests.

The output is a simple presentation-style video: still slide or page images are paired with narration, then the video advances through the deck with cuts or light fades. It is not a motion-graphics, cinematic promo, or animated explainer workflow by default.

`presentation_director` is the coordinator entry specialist for this team.
There is no separate standalone orchestrator beyond the listed specialists.
Each specialist does its own work, follows its own bundled agent and skill definition, and hands work to the next relevant specialist when ready.

Detailed production rules, artifact schemas, media-generation rules, QA gates, and role-specific execution steps belong in [shared/narrated-presentation-principles.md](shared/narrated-presentation-principles.md) and each member's bundled `SKILL.md`.

## Shared Principles

- The canonical shared production reference is [shared/narrated-presentation-principles.md](shared/narrated-presentation-principles.md).
- Each member folder has a local `narrated-presentation-principles.md` symlink to that shared file, so specialists can read it as a nearby agent-local reference.
- Member skills may add narrower role-specific rules, but they should not silently contradict the shared principles.

## Team Members

- `presentation_director`: owns intake, source-material inventory, online and supplied-source research, research notes, explanation framing, presentation brief, narration script, slide storyboard, revision after review, and final explanation coherence.
- `narration_script_reviewer`: owns strict full review of the narration script and slide storyboard before slide production starts, including logic, factual support, redundancy, completeness, spoken clarity, slide fit, and audience fit.
- `slide_video_producer`: owns simple slide/page visual planning and production through the approved media-generation route, media resource indexing, separate image/audio generation logs, voiceover generation or ingestion of approved user audio, audio-to-slide pairing, optional subtitles, still-slide video assembly, export QA, and final delivery package.

## Artifact Visibility And Approval

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts produced so far, not only the latest local artifact.
- Downstream specialists should be able to read the cumulative package without reconstructing earlier decisions from chat history.
- `presentation_director` must present `presentation-brief.md` to the user for approval before treating audience, scope, explanation objective, source basis, language, tone, or aspect ratio as approved downstream input. The video length is content-led.
- `presentation_director` must present `narration-script.md` and `slide-storyboard.md` to `narration_script_reviewer` before slide/video production or voiceover generation begins.
- `narration_script_reviewer` must run a full review every round. After any revision, the reviewer re-reviews the whole script and storyboard, not only changed lines or prior findings.
- User approval does not replace narration script review. The reviewer is responsible for deep explanation quality even when the user likes the direction.
- Slide and video production begins only after `narration_script_reviewer` records a pass.
- Default mapping is one approved narration segment to one primary slide image because it keeps audio generation, review, and assembly manageable.
- The mapping is explicit, not mechanical: one slide may carry multiple short narration segments when the same visual context remains useful, and a long explanation should be split into multiple reviewed narration segments before production if the visual should change.
- Voiceover generation and final video assembly use the approved narration-to-slide mapping and the final slide images produced by `slide_video_producer`.
- Default cumulative package:
  - `presentation_director` to `narration_script_reviewer`: approved presentation brief, research notes, source-material inventory when present, narration script, slide storyboard
  - `narration_script_reviewer` to `slide_video_producer`: approved presentation brief, research notes, source-material inventory when present, approved narration review report, approved narration script, slide storyboard
  - `presentation_director` final review: final delivery report, media resource index, separate image/audio generation logs, production log, video assembly package, final export path, plus the approved upstream package

## Delivery Flow

1. `presentation_director` starts the run, inventories supplied materials, researches online when useful and allowed, prepares `presentation-brief.md`, and gets user approval for scope, audience, explanation objective, source basis, tone, language, and aspect ratio. The script and storyboard decide the final length by what the explanation needs.
2. `presentation_director` writes `narration-script.md` and `slide-storyboard.md` from the full research context. The script must follow a logical sequence, avoid redundant statements, and map each narration segment to a clear slide purpose. If one slide would need too much narration or if one narration idea needs multiple visual states, split the narration/storyboard before review.
3. `narration_script_reviewer` performs a full review of the whole narration script and slide storyboard. Blocking findings go back to `presentation_director`; every rerun is another full review until the reviewer passes the package.
4. `slide_video_producer` creates the slide video production package: media resource index, production plan, final generated/edited slide images, separate image/audio generation logs, and production log. Slides should be clean, readable, audience-friendly, content-bearing presentation or infographic pages whose approved slide content is embedded in the generated/edited image itself, not added later as a script or overlay.
5. `slide_video_producer` creates or imports approved voiceover, creates optional subtitles when requested, pairs each approved narration segment with its slide image or approved slide sequence, creates one still-image video segment per approved slide/audio pair, concatenates those segment videos, validates boundary audio, and writes the delivery package.
6. `presentation_director` can review the final package for explanation accuracy and source discipline before external publication.

## Issue Routing

- `Research Gap` -> `presentation_director`
- `Unsupported Or Misleading Claim` -> `presentation_director`
- `Script Logic Or Redundancy` -> `presentation_director`
- `Script Review` -> `narration_script_reviewer`
- `Slide Visual Fix` -> `slide_video_producer`
- `Audio Or Assembly Fix` -> `slide_video_producer`
- `Final Explanation Defect` -> `presentation_director`
- `Unclear` -> `presentation_director`

## Ownership Boundaries

- Do not let downstream specialists invent facts, source claims, missing reasoning steps, or major explanation structure. Route those gaps to `presentation_director`.
- Do not ask `slide_video_producer` to compensate for a weak explanation with decorative slides, assembly tricks, or unapproved narration changes. Route logic, redundancy, or missing-context issues to `presentation_director` through the reviewer gate.
- Keep fixes with the specialist who owns the failing artifact unless the issue exposes an upstream decision gap.
