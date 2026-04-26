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
  - `voiceover-package.md` when voiceover is in scope
  - `audio-generation-log.md` when generated speech is used
  - `subtitles.srt` when subtitles are in scope
  - `video-edit-package.md`
  - `final-delivery-report.md`
  - `assets/`
  - `audio/`
  - `exports/`
- Handoffs should reference absolute paths to the current artifact files.

## 5. Source Material Discipline

- Treat supplied screenshots, screen recordings, product URLs, app store pages, docs, brand assets, and existing marketing pages as source material.
- Record source paths and URLs used for the brief and visual package.
- Redact or avoid sensitive information in screenshots and recordings, including tokens, private customer data, internal emails, production secrets, and personal data.
- If the provided screenshots are low resolution, stale, inconsistent, or visually unclear, route the issue instead of building the final video around them.
- Use real product UI for product-specific moments. Generated or stock-like visuals may support transitions, metaphors, or backgrounds, but should not pretend to be actual product screens.

## 6. Channel And Aspect Ratio Must Be Locked

- Lock intended channels before production begins, such as website, YouTube, LinkedIn, X/Twitter, TikTok, Instagram Reels, app store preview, investor deck, or sales email.
- Lock the required aspect ratio and resolution for each export variant before visual planning:
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

## 8. Generated Visuals Are Supporting Material

- Use generated images only when they help the promo communicate a mood, metaphor, transition, abstract concept, or non-product background.
- Do not generate fake UI screenshots and present them as the actual product.
- For prompt-only image routes, call `generate_image` with a self-contained prompt and omit `generation_config`.
- Do not create or pass `generation_config` or a model identifier just to carry model choice, aspect ratio, orientation, or target dimensions. Those belong either in runtime configuration or in the final prompt text.
- Every final generated-image prompt must include the intended aspect ratio and orientation in positive prompt language.
- Image tool calls may be dispatched in parallel or batches when the active runtime supports high-throughput generation.
- Parallel image generation is acceptable for supporting visuals, retries, and local fixes, but every returned result must still be inspected, logged, and either approved or rejected.
- Keep planned asset ids and storyboard shot mapping stable even when calls return out of order.

## 9. Speech Generation Can Run In Parallel

- Default promo narration is one clear narrator voice unless the brief explicitly calls for dialogue, testimonial, or host-read delivery.
- Speech tool calls may be dispatched in parallel or batches when the active runtime supports high-throughput generation.
- Parallel speech generation is acceptable for independent clips, retries, and alternate takes, but every returned result must still be inspected, logged, and either approved or rejected.
- Keep clip ids and final timeline order stable even when calls return out of order.
- Generated speech prompts should keep spoken script and non-spoken performance directions clearly separated in the package.
- Subtitle text should match what is spoken unless the user explicitly asks for condensed captions.

## 10. Editing Should Serve Comprehension

- Fast cuts and motion are useful only when the viewer can still understand the product.
- Avoid generic hype edits that obscure what the software actually does.
- Match each spoken value claim to a visible product moment, proof point, or brand-safe supporting visual.
- Use music, transitions, sound effects, and motion graphics as support, not as a replacement for product clarity.
- If a shot needs too much narration to explain what it is, revise the shot or route the issue upstream.

## 11. Final QA Must Check The Export

- Do not stop at a successful export command.
- Validate the exported video file itself.
- Check:
  - correct export path, aspect ratio, resolution, duration, and format
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
- Screenshot, screen-recording, UI readability, brand asset, or generated visual gaps belong to `product_visual_director`.
- Voiceover, subtitle, edit, audio, export, or final QA gaps belong to `promo_video_producer`.
- Do not silently invent around a missing upstream decision.
