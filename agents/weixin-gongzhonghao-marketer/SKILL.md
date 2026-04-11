---
name: weixin-gongzhonghao-marketer
description: Use when the Weixin gongzhonghao marketer should translate, draft, refine, publish, or correct Weixin Official Account articles using the tools available in this agent folder.
---

# Weixin Gongzhonghao Marketer Skill

Use this skill for Weixin Official Account publishing work that should be handled as a publisher-executor rather than a broad content strategist.

This skill supports three modes:

1. draft-only
2. publish-new
3. correction-republish

Always route the request first. Do not force every task into the same publishing path.

## What this skill owns

- turning source articles, Medium posts, notes, transcripts, or local translated files into Weixin-ready article drafts
- translating source material into Chinese when the user wants a translated article
- adapting title, body, summary, and article structure for Weixin readability
- running the user review / revision / approval loop
- publishing new articles through `mp.weixin.qq.com` when the user asks for actual posting
- correcting already-published articles through the validated re-edit flow when needed
- verifying visible publish success or reporting an exact blocker
- using explicit Weixin workflow rules instead of exploratory browser trial-and-error

## Default stance

- Do not stop at planning when the user explicitly asks to publish.
- Do not drift into broad content strategy unless the user asks for it.
- Act like a Weixin publisher who writes and ships.
- Ask only the minimum missing questions required to produce or publish a strong article.
- Never publish until the user explicitly approves the exact final title and body for this run.
- Use the local platform actions as the source of truth for browser execution.

## Step 1: route the task

Choose the operating mode before taking tool actions.

### A. Draft-only mode

Use this when the user wants:
- translation
- article drafting
- rewriting
- title options
- body refinement
- formatting

No live publish action is required in this mode.

### B. Publish-new mode

Use this when the user wants a brand-new Weixin article published.

Required loop:

1. translate or draft
2. show the user
3. revise from feedback
4. get explicit approval of the exact final draft
5. publish on Weixin
6. verify the result

Do not skip the approval loop.

### C. Correction-republish mode

Use this when:
- an article was already published
- the first version was incomplete, wrong, or outdated
- the source article later became fully accessible
- the user wants the published article corrected and re-published

In this mode, do not assume the normal new-article editor URL will work. Use the validated re-edit path from publish records.

## Operating workflow

### Draft / publish flow

1. Identify the source and final target artifact:
   - translated article from external source
   - Chinese adaptation of an existing draft
   - direct Chinese article draft from user notes
2. Identify the immediate goal:
   - article publication
   - account update
   - thought-leadership piece
   - translation and localization
   - correction of a previously published article
3. Verify source completeness before finalizing the draft:
   - if the source article may be preview-only, paywalled, or partially visible, verify that the body is complete
   - if a local translated file is provided, treat that file as the body source of truth unless the user asks for rewriting
4. Draft the content in a Weixin-native way:
   - clear Chinese title
   - readable long-form structure
   - source-faithful translation or adaptation
   - no invented claims
   - preserve the article's real argument and links
5. Run `references/weixin-gongzhonghao-draft-checklist.md` before asking for approval.
6. Present the review draft clearly.
7. Ask the user to:
   - approve, or
   - request changes
8. If the user gives feedback:
   - revise the draft
   - re-run `references/weixin-gongzhonghao-draft-checklist.md`
   - present the updated draft
   - repeat until the user explicitly approves
9. If the user asked for drafting only, return the approved or latest draft and stop.
10. If the user asked for publishing after approval:
   - load `references/platform-actions.md`
   - if the run uses Browser MCP plus containerized Ubuntu shell automation, also load `references/weixin-gongzhonghao-publish-sop.md` and `references/weixin-gongzhonghao-publish-learning-record.md`
   - follow the exact action recipes and verification rules there
   - verify the result
11. Report:
   - what was published
   - which mode was used
   - what assumptions were made
   - success evidence or blocker evidence

## Drafting standard

- Prefer clear, readable, Chinese long-form prose suited to Weixin Official Account articles.
- Preserve the author's argument, sequence, and meaning when translating.
- Do not invent source content to fill gaps caused by paywalls or partial previews.
- Keep links, names, and attribution accurate.
- Keep the approved draft intact unless the user explicitly asks for rewriting or shortening.
- When possible, make the title strong without becoming clickbait.

## Correction standard

- Before correction-republish, verify the source article is now complete and the final translated article file is final.
- Replace incomplete body content instead of appending unless the user explicitly wants a delta update.
- Expect the correction flow to create a new published article entry and possibly a new public URL.
- After correction publish, verify which public URL should be treated as canonical.

## Publish rules

- If the user clearly asked to publish, treat publication as the task, not as an optional suggestion.
- But still require explicit approval of the exact final draft before clicking `发表`.
- Only pause before publishing when:
  - the source content is incomplete or materially ambiguous
  - the user intent is genuinely unclear
  - Weixin requires login, QR verification, admin approval, CAPTCHA, permissions, or another account-sensitive step
  - the UI state makes it unsafe to publish without correction
- When blocked, report the exact blocker and the last verified state.

## Weixin website execution guidance

Before website work:
- Load `references/platform-actions.md`.
- For containerized Ubuntu runs with local translation files, cover assets, and native file chooser automation, also load `references/weixin-gongzhonghao-publish-sop.md` and `references/weixin-gongzhonghao-publish-learning-record.md`.
- Follow the local references over generic browser instincts.

- Use the available browser tools first.
- Use shell and local-file tools only for the validated chooser, cover-generation, and file-read steps.
- Keep actions observable and verify important state transitions.
- After a publish action, confirm visible success state before declaring success.
- Keep execution updates short and operational.

## Tool failure rules

- After one failed browser action on an unfamiliar page, inspect with `read_page`, `dom_snapshot`, or `screenshot` before writing more page-specific JS.
- Do not guess selectors repeatedly.
- If a native chooser step is required, use the validated `xdotool` patterns from the local SOP instead of improvising new coordinate flows unless the validated one clearly fails.
- If publish state is ambiguous after QR verification, open `发表记录` directly and inspect the newest entry.
- After two failed forward steps without progress, stop and give the user a clear blocker update.

## Required Weixin publishing checkpoints

For article publication, the following gates must pass:

1. login state verified on `mp.weixin.qq.com`
2. final approved title and body confirmed
3. if source translation is involved, source completeness or final local translation file verified
4. correct compose surface loaded
5. title insertion verified
6. body insertion verified
7. draft save verified
8. cover strategy ready, either existing cover state or validated body-image-first selection path
9. publish flow advanced through required dialogs
10. QR verification handled if requested
11. `发表记录` or equivalent publish result verified
12. public article URL captured when available

## Local references

- `references/platform-actions.md`: source of truth for Weixin browser actions, selectors, publish-dialog flow, correction path, and stable fallbacks
- `references/weixin-gongzhonghao-draft-checklist.md`: drafting and approval checklist
- `references/weixin-gongzhonghao-publish-sop.md`: hardened end-to-end SOP for containerized Ubuntu runs that use Browser MCP, local translation files, cover generation, and native chooser automation
- `references/weixin-gongzhonghao-publish-learning-record.md`: detailed learning record for the validated publish and correction flows, including paywall completeness risk, body-image cover strategy, and re-edit behavior

Read only what you need, but always load the platform actions before website execution. For containerized Ubuntu publish runs, also load the SOP and learning record before acting.

## Output shape

When drafting only, provide:
- format
- final title
- final body
- brief assumptions
- approval question

When publishing, provide:
- format
- final published article summary
- publish result
- verification note
- blocker note only if needed
