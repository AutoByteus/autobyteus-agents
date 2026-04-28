# Software Product Promo Production Principles

Use this file as the shared operating contract for the whole software product promo video team.

## 1. Product Truth Before Polish

- A promotional video may be persuasive, but it must not invent product capabilities, customer outcomes, integrations, metrics, awards, security claims, pricing, or availability.
- If a claim is not present in user-supplied material, public product material, or an approved brief, mark it as unverified instead of turning it into copy.
- Keep a clear difference between:
  - what the product already does
  - what the user wants the video to imply
  - what still needs confirmation
- Prefer specific product value over generic software language.
- Do not make the product sound bigger, more mature, or more enterprise-ready than the evidence supports.

## 2. Use The Right Promo Category

- `promotional video` and `product promo video` are general English terms for this team's output.
- Choose the format intentionally:
  - `product explainer` for a clear problem-solution story
  - `launch video` for a new product or major release
  - `SaaS demo promo` for a workflow-focused web product
  - `app store preview` for mobile app store use
  - `website hero video` for a landing-page embed
  - `social ad` for short paid or organic social placement
  - `sales enablement video` for outbound or demo-support use
- Do not silently turn a promo into a tutorial. A tutorial teaches step-by-step operation; a promo sells the value, proof, and next action.

## 3. Audience, Promise, Proof, Action

- Every promo package should make four things explicit:
  - audience
  - product promise
  - proof or reason to believe
  - call to action
- The core story should usually follow:
  - hook
  - problem or opportunity
  - product reveal
  - key capability moments
  - proof or credibility cue
  - call to action
- Show the actual product early. Do not spend most of the runtime on abstract setup if real software screens are available.
- Keep the main message simple enough that a viewer can repeat it after one watch.
- The narration must pass the audio-only test: if someone hears only the voiceover, without seeing the video, they should still understand what the product is, why it matters, the core mechanism, and the CTA. Visuals should enhance the message, not rescue weak narration.

## 4. Durable Project Package

- Work inside the active user-selected workspace root for the run.
- Create or reuse a product promo project folder instead of scattering files at the workspace top level.
- At minimum, the project package should include:
  - `product-promo-brief.md`
  - `research-notes.md` when external or supplied-source research was used
  - `promo-script.md`
  - `promo-storyboard.md`
  - `visual-source-index.md` when screenshots, frames, brand images, source visuals, generated variants, or edited variants are available
  - `visual-asset-plan.md`
  - `visual-asset-production-log.md` when generated, edited, polished, non-text callout, or highlight assets are produced
  - `visual-review-report.md` before final video production
  - `voiceover-package.md` when voiceover is in scope
  - `audio-generation-log.md` when generated speech is used
  - `subtitles.srt` when captions or subtitles are in scope
  - `video-edit-package.md`
  - `final-delivery-report.md`
  - `assets/`
  - `audio/`
  - `exports/`
- Handoffs should reference absolute paths to the current artifact files.

## 4A. User Approval Gates

- Do not treat the promo brief as approved downstream input until the user has approved the product positioning, audience, product promise, key claims, CTA, channel, aspect ratio, duration preference, and any hard duration limit.
- Do not start voiceover generation or visual production from a loose or unapproved script. The spoken script is the main creative spine of the video, and the visuals should carry the visible message without added explanatory text overlays.
- Approval can happen through iterative rounds. If the user revises positioning, claims, CTA, voiceover lines, or visual messaging intent, update the affected artifact before downstream handoff.
- `promo_director` owns brief approval, script approval, voiceover generation, measured audio review, and audio-informed storyboard finalization. Keep that context together unless the user explicitly asks to split it.
- `visual_reviewer` must not send visuals to user visual review until internal review has no remaining blocking findings. Internal `Visual Fix` loops may repeat as many times as needed before that user gate.
- After internal visual review passes, `visual_reviewer` must present the reviewed visual package to the user for approval before final video assembly starts. User visual feedback should be recorded in `visual-review-report.md` and routed to the owning specialist before video production continues.
- Handoff messages must state the approval status of the brief, script, and visual asset package when each is relevant to the receiving specialist.

## 4B. Story-Level Visual Ownership

- `promo_director` owns the story-level visual decision: which product screen, workflow state, feature moment, proof point, or conceptual support should appear for each spoken line.
- `visual_director` owns the production-level visual plan and candidate visual production: whether that moment is best created from a supplied screenshot, a screen recording, a cropped or polished asset, an edited image, a generated product visual, or a motion-graphics composition.
- If the script asks for a product moment that cannot be shown truthfully, route the issue back to `promo_director` before creating filler visuals.

## 4C. Audio Timing Comes Before Visual Production

- `promo-script.md` should contain approved voiceover, story order, product or UI moments, visual information to carry, and claim sources. It should not contain timestamps, provisional time ranges, estimated spoken durations, fixed segment lengths, or text overlays for every beat.
- After the user approves `promo-script.md`, `promo_director` should generate or select the voiceover clips, measure their real durations, and record the results before storyboard finalization and visual production.
- If a measured clip is too long, too rushed, awkward, unclear, or incompatible with an explicit hard duration limit, `promo_director` should revise the script, get user reapproval for affected lines, and regenerate the affected clip before visual planning continues.
- `promo-storyboard.md` and `visual-asset-plan.md` may use measured voiceover clip durations, clip ids, and deliberate pause or hold guidance. They must not rely on guessed pre-audio timing.
- A single voiceover clip may map to multiple storyboard shots, still frames, hold frames, UI cards, or motion moments. In that case, repeat the same voiceover clip id, assign a clear visual order within the clip, and describe the intended dwell or relative placement without pretending to know final edit timestamps.
- Final assembly may render one video segment per approved voiceover clip or storyboard segment, then concatenate those segments in approved script order. Segment start times belong in `video-edit-package.md` after the real audio and visual assets exist.

## 4D. Visual Production And Review Gate

- `visual_director` owns the visual plan and candidate visual production with exactly two image tools: `generate_image` and `edit_image`.
- For promo visual creation and polish, choose either `generate_image` or `edit_image`.
- Use `edit_image` for source-based UI polish, screenshot/frame cleanup, redaction, crop/framing improvement, background extension, mockup framing, non-text callouts/highlights, and revisions to existing visual assets.
- Use `generate_image` for new generated visuals such as conceptual support images, hero images, device mockups, transitions, backgrounds, and supported same-style product use-case visuals when the approved product context allows them.
- Final fundamental still/image resources used by the promo video must be outputs from `generate_image` or `edit_image`. User-supplied screenshots are source/seed/reference material, not final still assets by themselves.
- Even when a supplied screenshot is accurate and visually acceptable, create a generated or edited derivative for final still, hold-frame, hero-frame, UI-composite, thumbnail, or still-card use. This keeps the final visual package consistently polished and gives `generate_image` or `edit_image` a chance to improve crop, framing, lighting, redaction, visual hierarchy, and export-safe composition.
- Negative example: do not create final promo visuals as Python/PIL-only or script-only composites. Deterministic scripts may be used for mechanical preparation such as file conversion, measurement, masking, redaction, cropping, or assembling already-approved assets, but they must not replace `generate_image` or `edit_image` for polished promotional stills, hero frames, UI composites, or same-style supported use-case visuals.
- `visual_reviewer` must review candidate still assets before `promo_video_producer` uses them in motion or final assembly.
- `visual_reviewer` should treat a missing visual-director self-check decision as a blocking process defect, because every candidate should already have been inspected after its `generate_image` or `edit_image` call.
- `promo_video_producer` may use only visual assets that have passed internal visual review and user visual approval, unless the user explicitly waives the visual approval gate.
- `visual_reviewer` owns the approved still / hold frame manifest in `visual-review-report.md`. This manifest is the approved-only list of still frames, hold frames, hero frames, UI cards, UI composites, and non-text highlight frames that `promo_video_producer` may use as motion inputs.
- `visual-source-index.md` may mirror approved final assets as a resource cross-reference, but it must not replace the approved manifest and user approval record in `visual-review-report.md`.
- The approved manifest must map each approved asset to its shot id, voiceover clip id, clip visual order, beat id when available, matched spoken intent, product/UI moment shown, intended dwell or placement, and planned motion use.
- `visual_reviewer` must verify content consistency: the approved voiceover line, storyboard row, visual asset plan, and actual image should communicate the same idea. If the visual is correct technically but mismatched to the story, route the issue to `promo_director` or `visual_director` according to the source of the mismatch.
- When multiple visuals share one voiceover clip, `visual_reviewer` must also verify that the sequence is logical: each visual supports the right part of the spoken line, transitions do not scramble the message, and no approved frame is redundant or misleading.
- Misplaced rectangles, arrows, rings, highlight boxes, crops, or zoom targets are blocking visual asset defects. They must be fixed before video production.
- Added explanatory or marketing text overlays are blocking visual defects unless the user explicitly requested them or a legal/distribution requirement makes them necessary.
- The visual reviewer should expect iterative `Visual Fix` loops with `visual_director` until the package passes or an upstream decision must change.
- User review happens only after that internal pass. After the user sees the internally passed package, the visual reviewer should expect possible user feedback loops before the package is approved for video production.

## 4E. Visual Source Index Is Durable Memory

- `visual-source-index.md` is the cumulative visual resource memory for the run. It exists so the team does not lose track of user-supplied screenshots, user-supplied recording frames, generated candidates, edited variants, rejected attempts, and approved final assets when chat context changes or a new visual version starts.
- `visual_director` owns `visual-source-index.md`.
- Treat `visual-source-index.md` as the source of truth for which visual resources are currently available for planning, generation, editing, review, and final assembly.
- The supporting files have narrower jobs:
  - `source-asset-inventory.md` is the upstream inventory of material supplied or discovered during intake, such as screenshots, links, docs, recordings, and brand assets. It helps the director understand the starting package, but it is not enough once visual production creates new versions.
  - `visual-asset-production-log.md` records generation/editing attempts, prompts, tool calls, results, rejections, retries, and cooldown status. It is an audit trail, not the current visual library.
  - `visual-source-index.md` is the living resource index that pulls from all of the above and adds descriptions, use cases, lineage, review status, and final-use status.
- Create or update `visual-source-index.md` before visual planning begins whenever the project has screenshots, recordings, frames, source visuals, brand images, generated images, edited images, or prior candidate visuals.
- Before starting a new visual package version, producing a new candidate image, asking the user for another screenshot, or deciding that a source is missing, `visual_director` must read the current `visual-source-index.md`.
- The index should use stable asset ids and record each image or frame's absolute path, origin, dimensions or duration, UI area, product state, what it shows, sensitive-data risk, reuse potential, related storyboard shots, status, and notes.
- Every generated or edited visual should record its source or seed asset ids, output path, tool route, what changed, what UI invariants were preserved, related shot ids, review status, and final-use status.
- User-provided screenshots are source/seed/reference entries. Final still assets should be `generate_image` or `edit_image` derivatives linked back to those source entries unless the user explicitly waives this rule.
- If a required UI state, screen, brand asset, or product moment is missing, record the gap in the index and ask the user for the specific missing source instead of relying on memory or fabricating the interface.
- Handoff messages to `visual_reviewer` and `promo_video_producer` must include the absolute path to `visual-source-index.md` when it exists.

## 5. Source Material Discipline

- Treat supplied screenshots, screen recordings, product URLs, app store pages, docs, brand assets, and existing marketing pages as source material.
- Record source paths and URLs used for the brief and visual package.
- Redact or avoid sensitive information in screenshots and recordings, including tokens, private customer data, internal emails, production secrets, and personal data.
- Product UI text counts as visual information. Menus, cards, buttons, labels, workflow names, and interface copy are part of the visual layer, not a reason to add separate explanatory text.
- Visible text taxonomy:
  - `product UI text`: text already inside the real or source-based product interface; allowed and often useful when truthful and readable
  - `captions/subtitles`: accessibility or delivery text matching the narration; only produced when requested or required
  - `added explanatory/marketing text overlay`: separate copy placed over the video to explain or sell the message; not part of the default workflow and treated as a defect unless explicitly user-required or legally/distribution-required
- If the provided screenshots are low resolution, stale, inconsistent, or visually unclear, do not force the final video to rely on them. Ask the user for stronger product visuals, use the available material as seed/reference input for `generate_image` or `edit_image`, or request stronger generated promo visuals when that is truthful.
- Use real product UI as source evidence for product-specific feature claims and proof moments. Final still/image assets should be generated or edited derivatives grounded in that real UI, not raw screenshots copied straight into the final visual package. Generated or edited visuals may be promo assets for hero scenes, product-context scenes, device mockups, transitions, metaphors, backgrounds, and polished marketing frames, but they must not pretend to show real product capabilities or UI states that are not supported.
- For software promos, source-based image editing is often the right middle path: use real screenshots or frames as the factual source, then polish them with `edit_image` for crop, lighting, depth, background, redaction, non-text highlights/callouts, and hold-frame quality. Prefer this over raw tutorial stills when it preserves product truth and produces a significantly stronger promo.

## 6. Channel And Aspect Ratio Must Be Approved

- Approve intended channels before production begins, such as website, YouTube, LinkedIn, X/Twitter, TikTok, Instagram Reels, app store preview, investor deck, or sales email.
- Approve the required aspect ratio and resolution for each export variant before visual planning:
  - `16:9 horizontal` for YouTube, website embeds, and presentation use
  - `9:16 vertical` for short-form mobile social
  - `1:1 square` for feed placements when requested
  - app-store-specific ratios only when the user asks for app store delivery
- Script length, screen crop strategy, caption layout when captions are in scope, and visual density must match the chosen channel.
- Mixed aspect ratios inside one final export are a blocking error unless the user explicitly approves a designed split-screen or framed treatment.

## 7. Screens Must Be Legible

- A product promo must let the viewer understand the product, not just see motion.
- Do not use tiny, unreadable full-page screenshots when the claim depends on a specific UI action or result.
- Use crop, zoom, highlight, cursor path, non-text callout, or simplified screen region plans when needed.
- Keep captions, if requested, away from the important UI.
- Never cover the exact feature the narration is describing.
- Default to no added explanatory or marketing text overlays. Do not add keyword overlays, title-card copy, or explanatory text to rescue weak visuals. Use product UI, crop, zoom, non-text highlights, generated or edited visual frames, and motion to deliver the concept.

## 7A. Default Visual Language Is Animated UI Showcase

- The default visual style for software product promos is polished motion graphics built from real product UI, especially animated screenshot transitions, floating UI cards, non-text feature highlights, and readable product-screen motion.
- Product screenshots and recordings may be presented as layered cards with soft shadows, perspective tilt, scale changes, and smooth entrance or exit motion when that helps the viewer follow the product story.
- Use motion to guide attention from one feature or screen state to the next, not as decoration that competes with the UI.
- Keep card tilt, perspective, blur, speed, and overlap restrained enough that important product text and interface controls remain readable.
- Every storyboard shot that uses this style should specify the intended motion treatment at a practical level.
- `promo_director` owns story-level motion intent, `visual_director` owns the visual motion treatment, and `promo_video_producer` owns the actual implementation in the final edit.
- Do not lock the team to one animation toolchain. The producer may use any available reliable method that fits the project, as long as the output remains truthful, readable, and reproducible enough to document.

## 8. Generated And Edited Visuals Are Promo Assets

- `visual_director` should use `generate_image` and `edit_image` proactively when they can create a stronger promotional image than the raw supplied material.
- Generated or edited visuals may be used for hero images, polished product-context scenes, device mockups, animated-card backgrounds, transitions, metaphors, atmospheric scenes, and marketing frames based on the team's understanding of the product.
- Every final still/image resource that serves as a fundamental visual asset should be a `generate_image` or `edit_image` output. Raw screenshots may appear in the production package as source references, seed images, evidence, or unpolished source material, but not as final approved still assets unless the user explicitly waives this rule.
- If the product supports a use case but the user lacks a strong screenshot for it, `visual_director` may produce a generated or edited same-style use-case visual with `generate_image` or `edit_image`. This is a source-grounded route: use the user's real product UI screenshots as input/base/reference images by default so the result remains visually grounded in the actual product.
- A same-style supported use-case visual is allowed only when the approved brief, source material, or user confirmation supports the capability. It must not pretend to be an exact user-provided screenshot or recording frame unless it is one.
- Same-style supported use-case visuals should preserve the real product layout, navigation model, UI language, brand treatment, and interaction logic while changing only example content, safe demo data, or a supported workflow state needed for the promo.
- Do not use prompt-only `generate_image` for product UI or same-style supported use-case visuals when a relevant real product UI source is available. Use `edit_image` with selected UI screenshot(s) for source-based work. Use `generate_image` for product-adjacent generated compositions only when the selected UI screenshot(s) can be included as input/reference material or the user explicitly approves a representative prompt-only route.
- If no relevant source UI exists for the needed product area, ask the user for a screenshot or explicit approval before using prompt-only generation for a representative UI-style visual.
- If support for the use case, UI area, data shape, or workflow state is uncertain, ask the user for confirmation or a better source screenshot instead of inventing around the gap.
- Use source-based image editing to improve supplied visuals when appropriate, including cleanup, redaction, extension, background replacement, mockup framing, lighting, cropping, non-text highlighting, and visual polish.
- When a product screenshot is true but visually weak, `visual_director` should produce a source-based polished still and use the raw recording mainly as a motion bridge if that yields a clearer final video. When a product screenshot is true and already clean, still produce a `generate_image` or `edit_image` derivative for final still use so the visual package remains consistent.
- Do not generate unsupported fake UI screenshots and present them as the actual product.
- Do not edit a product screenshot in a way that changes the factual UI state, product capability, result, data, pricing, proof, or claim being shown.
- For prompt-only `generate_image` routes, call `generate_image` with a self-contained prompt and omit `generation_config`. Prompt-only routes are suitable for conceptual support, metaphors, backgrounds, device mockups, and non-product hero imagery; they are not the default route for product UI or same-style supported use-case visuals.
- Do not create or pass `generation_config` or a model identifier just to carry model choice, aspect ratio, orientation, or target dimensions. Those belong either in runtime configuration or in the final prompt text.
- Every final generated-image prompt must include the intended aspect ratio and orientation in positive prompt language.
- `generate_image` and `edit_image` calls are serial-only. Call exactly one, wait for the result, inspect the actual output image, log the decision, then run `sleep 60` before making any further image call.
- A successful tool return or existing output file is not enough. After every generated or edited image, `visual_director` must visually check whether the image matches the storyboard shot, voiceover intent, product truth, UI layout, source/reference image, aspect ratio, readability, non-text highlight placement, and sensitive-data requirements.
- Each image output must be marked in `visual-asset-production-log.md` and `visual-source-index.md` as `candidate passed self-check`, `needs edit`, `rejected`, or `blocked`.
- If the output is close but has fixable defects, queue a follow-up `edit_image` call after the required cooldown and describe the exact correction. If the output is fundamentally wrong, reject it and regenerate with a corrected prompt or source selection after the cooldown.
- Do not send an uninspected, failed, rejected, or obviously flawed image to `visual_reviewer` as a candidate asset.
- Do not dispatch multiple `generate_image` or `edit_image` calls at the same time, in the background, through a background process, or as a parallel batch.
- The 60-second cooldown applies after candidate, rejected, timed-out, failed, and approved `generate_image` and `edit_image` calls. Do not retry before the cooldown completes.
- Keep planned asset ids and storyboard shot mapping stable across the serial queue.

## 9. Speech Generation Is Serial

- Default promo narration is one clear narrator voice unless the brief explicitly calls for dialogue, testimonial, or host-read delivery.
- `promo_director` owns speech generation because voiceover wording, tone, pacing, and emphasis are part of the promo message. `promo_video_producer` uses the approved measured voiceover package for captions or subtitles when in scope, mixing, timing, and final assembly.
- Speech tool calls are serial-only. Treat the clip list as a queue, not a batch: call exactly one `generate_speech` or selected `speak` call, wait for that call to return, inspect and log the result, then immediately run `sleep 60` before making any further speech-tool call.
- Do not dispatch multiple speech-tool calls at the same time, in the background, through a background process, or as a parallel batch.
- The 60-second cooldown applies after candidate, rejected, timed-out, failed, and approved speech-tool calls. Do not retry before the cooldown completes.
- Keep clip ids and final timeline order stable across the serial queue.
- If the runtime exposes model-backed generated-video tools, use the same serial-only pattern and 60-second cooldown for those calls. This does not apply to local deterministic editing commands such as ffmpeg concatenation or rendering from already-approved assets.
- Generated speech prompts should keep spoken script and non-spoken performance directions clearly separated in the package.
- Caption or subtitle text should match what is spoken unless the user explicitly asks for condensed captions.
- After speech is generated or recorded, measure actual clip durations before visual production. Treat natural narration timing as the primary timing source for the storyboard, visual plan, and edit unless an explicit hard duration limit has been supplied.

## 10. Editing Should Serve Comprehension

- Fast cuts and motion are useful only when the viewer can still understand the product.
- Avoid generic hype edits that obscure what the software actually does.
- Match each spoken value claim to a visible product moment, proof point, or brand-safe approved visual.
- Use music, transitions, sound effects, and motion graphics as support, not as a replacement for product clarity.
- Follow the storyboard and visual asset plan for shot-specific motion treatments.
- Time motion graphics to the voiceover or music rhythm, but do not sacrifice UI legibility for speed.
- Build an audio-led segment plan from measured voiceover durations plus deliberate pauses, then make visuals serve that plan.
- If a measured narration clip needs more visual support, extend the visual segment with holds, slower motion, loops, or longer end-card dwell. Do not cut off or unnaturally compress narration.
- If a measured narration clip is short, keep the matching visual segment concise unless extra time is needed for readability, CTA dwell, or an intentional pause.
- Avoid time-stretching voiceover. If an explicit hard duration limit makes speech retiming unavoidable, keep it minimal, pitch-corrected, and documented.
- Video retiming is allowed when it preserves comprehension: stretch/hold/loop visuals for longer narration and trim/compress visual-only motion for shorter narration.
- Valid implementation routes include `ffmpeg` filters, scripted frame generation, HTML/CSS/canvas rendering exported to video, Remotion-style composition, available local video tools, or generated intermediate clips. Choose based on quality, controllability, and what the runtime actually supports.
- If a shot needs too much narration to explain what it is, revise the shot or route the issue upstream.

## 11. Final QA Must Check The Export

- Do not stop at a successful export command.
- Validate the exported video file itself.
- Check:
  - correct export path, aspect ratio, resolution, duration, and format
  - final duration follows measured narration and respects the approved duration preference or hard limit
  - no black frames, missing assets, or accidental placeholder screens
  - product screens are legible at the target viewing size
  - narration, captions or subtitles when in scope, and visible shots stay aligned
  - caption or subtitle placement does not cover important UI when in scope
  - no unsupported claim appears in voiceover, captions when used, product UI text, or any user/legal-required text
  - sensitive information is not visible
  - CTA is present and accurate
- Record final QA results in `final-delivery-report.md`.

## 12. Route Problems To The Owner

- Product positioning, audience, proof, claim, script pacing, story order, hook, CTA flow, voiceover quality, and storyboard gaps belong to `promo_director`.
- Screenshot, screen-recording, UI readability, brand asset, visual planning, generated visual, edited visual, and candidate visual production gaps belong to `visual_director`.
- Visual truth, non-text callout placement, highlight placement, no-added-text discipline, and visual readiness gates belong to `visual_reviewer`.
- Caption/subtitle, sound mix, edit implementation, export, or final technical QA gaps belong to `promo_video_producer`.
- Do not silently invent around a missing upstream decision.
