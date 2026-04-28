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

## 4. Durable Project Package

- Work inside the active user-selected workspace root for the run.
- Create or reuse a product promo project folder instead of scattering files at the workspace top level.
- At minimum, the project package should include:
  - `product-promo-brief.md`
  - `research-notes.md` when external or supplied-source research was used
  - `promo-script.md`
  - `promo-storyboard.md`
  - `visual-asset-plan.md`
  - `screen-capture-log.md` when screenshots or recordings are selected or created
  - `visual-asset-production-log.md` when generated, edited, polished, callout, or highlight assets are produced
  - `visual-asset-review-report.md` before final video production
  - `voiceover-package.md` when voiceover is in scope
  - `audio-generation-log.md` when generated speech is used
  - `subtitles.srt` when subtitles are in scope
  - `video-edit-package.md`
  - `final-delivery-report.md`
  - `assets/`
  - `audio/`
  - `exports/`
- Handoffs should reference absolute paths to the current artifact files.

## 4A. User Approval Gates

- Do not treat the promo brief as approved downstream input until the user has approved the product positioning, audience, product promise, key claims, CTA, channel, aspect ratio, duration preference, and any hard duration limit.
- Do not start voiceover generation or visual production from a loose or unapproved script. The spoken script and on-screen copy are the main creative spine of the video.
- Approval can happen through iterative rounds. If the user revises positioning, claims, CTA, voiceover lines, or on-screen copy, update the affected artifact before downstream handoff.
- `promo_visual_asset_reviewer` must not send assets to user visual review until internal review has no remaining blocking findings. Internal `Visual Asset Fix` loops may repeat as many times as needed before that user gate.
- After internal visual review passes, `promo_visual_asset_reviewer` must present the reviewed visual asset package to the user for approval before final video assembly starts. User visual feedback should be recorded in `visual-asset-review-report.md` and routed to the owning specialist before video production continues.
- Handoff messages must state the approval status of the brief, script, and visual asset package when each is relevant to the receiving specialist.

## 4B. Story-Level Visual Ownership

- `promo_script_storyboarder` owns the story-level visual decision: which product screen, workflow state, feature moment, proof point, or conceptual support should appear for each spoken line.
- `product_visual_director` owns the production-level visual plan: whether that moment is best created from a supplied screenshot, a screen recording, a cropped or polished asset, an edited image, a generated product visual, or a motion-graphics composition.
- If the script asks for a product moment that cannot be shown truthfully, route the issue back to `promo_script_storyboarder` or `product_promo_strategist` before creating filler visuals.

## 4C. Audio Timing Comes Before Visual Production

- `promo-script.md` should contain approved words, on-screen copy, story order, product or UI moments, and claim sources. It should not contain timestamps, provisional time ranges, estimated spoken durations, or fixed segment lengths.
- After the user approves `promo-script.md`, `promo_video_producer` should generate the voiceover clips, measure their real durations, and record the results before storyboard finalization and visual production.
- If a measured clip is too long, too rushed, awkward, or incompatible with an explicit hard duration limit, route the issue back to `promo_script_storyboarder`. The script should be revised, reapproved by the user, and regenerated before visual planning continues.
- `promo-storyboard.md` and `visual-asset-plan.md` may use measured voiceover clip durations, clip ids, and deliberate pause or hold guidance. They must not rely on guessed pre-audio timing.
- Final assembly may render one video segment per approved voiceover clip or storyboard segment, then concatenate those segments in approved script order. Segment start times belong in `video-edit-package.md` after the real audio and visual assets exist.

## 4D. Visual Asset Production And Review Gate

- `product_visual_director` owns the visual plan and asset-production requirements, not the final approval of generated or edited still assets.
- `promo_visual_asset_producer` owns producing candidate still assets with the configured image tools exposed to that agent, such as `generate_image` and `edit_image`.
- Codex-only internal image generation is not a portable team dependency. If a runtime exposes a different image tool, the agent configuration must name that tool explicitly before the team can rely on it.
- `promo_visual_asset_reviewer` must review candidate still assets before `promo_video_producer` uses them in motion or final assembly.
- `promo_video_producer` may use only visual assets that have passed internal visual review and user visual approval, unless the user explicitly waives the visual approval gate.
- Misplaced rectangles, arrows, rings, labels, callouts, highlight boxes, crops, or zoom targets are blocking visual asset defects. They must be fixed before video production.
- The visual reviewer should expect iterative `Visual Asset Fix` loops with `promo_visual_asset_producer` until the package passes or an upstream decision must change.
- User review happens only after that internal pass. After the user sees the internally passed package, the visual reviewer should expect possible user feedback loops before the package is approved for video production.

## 5. Source Material Discipline

- Treat supplied screenshots, screen recordings, product URLs, app store pages, docs, brand assets, and existing marketing pages as source material.
- Record source paths and URLs used for the brief and visual package.
- Redact or avoid sensitive information in screenshots and recordings, including tokens, private customer data, internal emails, production secrets, and personal data.
- If the provided screenshots are low resolution, stale, inconsistent, or visually unclear, do not force the final video to rely on them. Capture better product visuals, use them as references for source-based editing, or request stronger generated promo visuals when that is truthful.
- Use real product UI for product-specific feature claims and proof moments. Generated or edited visuals may be first-class promo assets for hero scenes, product-context scenes, device mockups, transitions, metaphors, backgrounds, and polished marketing frames, but they must not pretend to show real product capabilities or UI states that are not supported.
- For software promos, source-based image editing is often the right middle path: use real screenshots or frames as the factual source, then polish them with configured image tools for crop, lighting, depth, background, redaction, callouts, and hold-frame quality. Prefer this over raw tutorial stills when it preserves product truth and produces a significantly stronger promo.

## 6. Channel And Aspect Ratio Must Be Approved

- Approve intended channels before production begins, such as website, YouTube, LinkedIn, X/Twitter, TikTok, Instagram Reels, app store preview, investor deck, or sales email.
- Approve the required aspect ratio and resolution for each export variant before visual planning:
  - `16:9 horizontal` for YouTube, website embeds, and presentation use
  - `9:16 vertical` for short-form mobile social
  - `1:1 square` for feed placements when requested
  - app-store-specific ratios only when the user asks for app store delivery
- Script length, screen crop strategy, subtitle layout, and visual density must match the chosen channel.
- Mixed aspect ratios inside one final export are a blocking error unless the user explicitly approves a designed split-screen or framed treatment.

## 7. Screens Must Be Legible

- A product promo must let the viewer understand the product, not just see motion.
- Do not use tiny, unreadable full-page screenshots when the claim depends on a specific UI action or result.
- Use crop, zoom, highlight, cursor path, callout, or simplified screen region plans when needed.
- Keep overlays and captions away from the important UI.
- Never cover the exact feature the narration is describing.

## 7A. Default Visual Language Is Animated UI Showcase

- The default visual style for software product promos is polished motion graphics built from real product UI, especially animated screenshot transitions, floating UI cards, feature callouts, and readable product-screen motion.
- Product screenshots and recordings may be presented as layered cards with soft shadows, perspective tilt, scale changes, and smooth entrance or exit motion when that helps the viewer follow the product story.
- Use motion to guide attention from one feature or screen state to the next, not as decoration that competes with the UI.
- Keep card tilt, perspective, blur, speed, and overlap restrained enough that important product text and interface controls remain readable.
- Every storyboard shot that uses this style should specify the intended motion treatment at a practical level.
- `promo_script_storyboarder` owns story-level motion intent, `product_visual_director` owns the visual motion treatment, and `promo_video_producer` owns the actual implementation in the final edit.
- Do not lock the team to one animation toolchain. The producer may use any available reliable method that fits the project, as long as the output remains truthful, readable, and reproducible enough to document.

## 8. Generated And Edited Visuals Are First-Class Promo Assets

- `promo_visual_asset_producer` should use the configured image tools, such as `generate_image` and `edit_image`, proactively when they can create a stronger promotional image than the raw supplied material.
- Generated or edited visuals may be used for hero images, polished product-context scenes, device mockups, animated-card backgrounds, transitions, metaphors, atmospheric scenes, and marketing frames based on the team's understanding of the product.
- If the product supports a use case but the user lacks a strong screenshot for it, `product_visual_director` may request a generated or edited visual and `promo_visual_asset_producer` may produce it with the configured image tools. The package must record which source material or approved brief supports that scenario.
- Use source-based image editing to improve supplied visuals when appropriate, including cleanup, redaction, extension, background replacement, mockup framing, lighting, cropping, and visual polish.
- When a product screenshot is true but visually weak, ask `promo_visual_asset_producer` for a source-based polished still and use the raw recording mainly as a motion bridge if that yields a clearer final video.
- Do not generate fake UI screenshots and present them as the actual product.
- Do not edit a product screenshot in a way that changes the factual UI state, product capability, result, data, pricing, proof, or claim being shown.
- For prompt-only image routes, call `generate_image` with a self-contained prompt and omit `generation_config`.
- Do not create or pass `generation_config` or a model identifier just to carry model choice, aspect ratio, orientation, or target dimensions. Those belong either in runtime configuration or in the final prompt text.
- Every final generated-image prompt must include the intended aspect ratio and orientation in positive prompt language.
- Image tool calls are serial-only. Call exactly one `generate_image` or `edit_image`, wait for the result, inspect and log it, then run `sleep 60` before making any further image-tool call.
- Do not dispatch multiple image-tool calls at the same time, in the background, through a background process, or as a parallel batch.
- The 60-second cooldown applies after candidate, rejected, timed-out, failed, and approved image-tool calls. Do not retry before the cooldown completes.
- Keep planned asset ids and storyboard shot mapping stable across the serial queue.

## 9. Speech Generation Is Serial

- Default promo narration is one clear narrator voice unless the brief explicitly calls for dialogue, testimonial, or host-read delivery.
- Speech tool calls are serial-only. Treat the clip list as a queue, not a batch: call exactly one `generate_speech` or selected `speak` call, wait for that call to return, inspect and log the result, then immediately run `sleep 60` before making any further speech-tool call.
- Do not dispatch multiple speech-tool calls at the same time, in the background, through a background process, or as a parallel batch.
- The 60-second cooldown applies after candidate, rejected, timed-out, failed, and approved speech-tool calls. Do not retry before the cooldown completes.
- Keep clip ids and final timeline order stable across the serial queue.
- If the runtime exposes model-backed generated-video tools, use the same serial-only pattern and 60-second cooldown for those calls. This does not apply to local deterministic editing commands such as ffmpeg concatenation or rendering from already-approved assets.
- Generated speech prompts should keep spoken script and non-spoken performance directions clearly separated in the package.
- Subtitle text should match what is spoken unless the user explicitly asks for condensed captions.
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
- Valid implementation routes include `ffmpeg` filters, scripted frame generation, HTML/CSS/canvas rendering captured to video, Remotion-style composition, available local video tools, or generated intermediate clips. Choose based on quality, controllability, and what the runtime actually supports.
- If a shot needs too much narration to explain what it is, revise the shot or route the issue upstream.

## 11. Final QA Must Check The Export

- Do not stop at a successful export command.
- Validate the exported video file itself.
- Check:
  - correct export path, aspect ratio, resolution, duration, and format
  - final duration follows measured narration and respects the approved duration preference or hard limit
  - no black frames, missing assets, or accidental placeholder screens
  - product screens are legible at the target viewing size
  - narration, subtitles, and visible shots stay aligned
  - subtitle placement does not cover important UI
  - no unsupported claim appears in voiceover, captions, or on-screen text
  - sensitive information is not visible
  - CTA is present and accurate
- Record final QA results in `final-delivery-report.md`.

## 12. Route Problems To The Owner

- Product positioning, audience, proof, or claim gaps belong to `product_promo_strategist`.
- Script pacing, story order, hook, or CTA flow gaps belong to `promo_script_storyboarder`.
- Screenshot, screen-recording, UI readability, brand asset, or visual planning gaps belong to `product_visual_director`.
- Generated or edited visual production gaps belong to `promo_visual_asset_producer`.
- Visual truth, callout placement, highlight placement, and asset readiness gates belong to `promo_visual_asset_reviewer`.
- Voiceover, subtitle, edit, audio, export, or final QA gaps belong to `promo_video_producer`.
- Do not silently invent around a missing upstream decision.
