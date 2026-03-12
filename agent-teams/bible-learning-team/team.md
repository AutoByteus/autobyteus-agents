---
name: Bible Learning Team
description: A context-first Bible-learning team for research, teaching preparation, review, and default visual deck production unless the user explicitly wants teaching-only output.
category: faith-and-teaching
---

This team handles a Bible-learning request from passage or topic research through teaching preparation, critical review, and then slide-deck production by default unless the user explicitly asks for a teaching-only/text-only result.

## Team Roles

- `bible_researcher` receives the user's passage, topic, or question, uses the shared `deep-research-article` workflow, writes a substantial `article.md`, and keeps the supporting research package in the same work folder.
- `bible_teaching_preparer` turns `article.md` into a teaching article, outline, application package, then prepares `slides_content_plan.md`, and after content-plan review pass, proceeds into infographic slides and deck output by default.
- `bible_teaching_reviewer` critically reviews the teaching package for faithfulness, depth, clarity, and readiness for live sharing, then reviews `slides_content_plan.md`, and finally reviews the visual package as the normal final stage unless the user explicitly keeps the request text-only.

## Delivery Flow

1. `bible_researcher` receives the request, creates a per-topic work folder, classifies the request as passage mode or topic mode, uses `deep-research-article` for the research process, and writes `article.md` plus the supporting research package inside that folder.
2. `bible_researcher` sends the completed `article.md` package and work-folder path directly to `bible_teaching_preparer`.
3. `bible_teaching_preparer` works inside the same folder, always writes the teaching article first, then prepares the rest of the teaching package.
4. `bible_teaching_preparer` sends the teaching package to `bible_teaching_reviewer`.
5. `bible_teaching_reviewer` runs a full teaching review, sends revisions back when needed, and re-reviews the full package after each revision instead of checking only the previous checklist.
6. Only after the teaching package passes review, `bible_teaching_preparer` writes `slides_content_plan.md` in the same folder.
7. `bible_teaching_preparer` sends `slides_content_plan.md` to `bible_teaching_reviewer` for slide-content review.
8. `bible_teaching_reviewer` either passes the content plan or routes `Slides Content Revision` back to `bible_teaching_preparer`.
9. Only after `slides_content_plan.md` passes review, `bible_teaching_preparer` uses the shared `infographic-powerpoint-deck` skill to turn that content plan into `slides_visual_plan.md`, prompts, and the final infographic slides plus deck artifact.
10. `bible_teaching_preparer` sends the visual package back to `bible_teaching_reviewer` for final visual review.
11. `bible_teaching_reviewer` either passes the visual package or routes `Visual Revision` back to `bible_teaching_preparer`.

## Working Agreement

- Start with research, not application or slide styling.
- Historical background is first-class. Research should cover who, where, when, why, audience, literary setting, culturally important details, relevant cross-passages, and the main interpretive tensions that materially affect interpretation.
- The researcher should produce a real long-form `article.md` with integrated textual evidence and source notes, not a short outline with bare references.
- The final deck is a first-class deliverable, not a throwaway summary. A substantial article should usually become a substantial deck.
- Use one dedicated work folder per request so research, teaching, review, and visual artifacts stay together.
- Every specialist writes its final artifact files before handing work forward.
- Every handoff should include concrete artifacts, the current decision state, unresolved risks, and the next expected action.
- Use `send_message_to` when handing work to another specialist.
- Downstream specialists should not guess around weak exegesis, unsupported claims, or shallow application. Route the issue back with a clear classification instead.
- The reviewer is the quality gate for the teaching package, the slide content plan, and the final slide package in the normal Bible-sharing flow.
- Review should happen in rounds. If substantial issues were found earlier, the reviewer should normally re-review at least twice after that initial pass instead of using a one-fix-and-pass shortcut.
- Small requests can stay lightweight, but the research and review gates remain explicit.

## Issue Routing

When a downstream specialist finds a problem, classify it and route it to the right owner:

- `Research Gap` -> `bible_researcher`
- `Teaching Revision` -> `bible_teaching_preparer`
- `Slides Content Revision` -> `bible_teaching_preparer`
- `Visual Revision` -> `bible_teaching_preparer`
- `Unclear` or cross-cutting issue -> `bible_researcher`

## Ownership

- `bible_researcher` owns historical background, literary context, canonical context, interpretive options, evidence limits, and long-form `article.md` readiness.
- `bible_teaching_preparer` owns the main teaching burden, article flow, speaking outline, application package, `slides_content_plan.md`, and post-review deck production.
- `bible_teaching_reviewer` owns the multi-round critique loop, question pressure-testing, and final teaching, slide-content, plus visual review decision.

## Send-Back Rules

- Do not write application-heavy teaching before the background research is strong enough to support the interpretation.
- Do not ask the reviewer to repair missing research by rewriting the teaching from scratch. Route research problems upstream.
- Do not start slide or infographic production before the reviewer has passed the teaching article.
- Do not start infographic production before the reviewer has passed `slides_content_plan.md`.
- If review identifies doctrinal leaps, missing context, or weak textual grounding, send it back upstream before visual production begins.
- Once the reviewer passes the teaching package, visual production stays with `bible_teaching_preparer`, but the completed visual package still returns to the reviewer for a final gate.

## Team Rules

- Start with `bible_researcher` unless the user already provides a complete research package.
- The researcher creates the work folder first. Downstream specialists reuse that same folder instead of scattering files across the workspace.
- Keep the biblical passage central; background exists to illuminate the text, not replace it.
- Use `article.md` as the canonical research artifact. Keep the deep-research support files in the same folder so the preparer and reviewer can verify evidence when needed.
- Integrate the actual text under discussion into the research article. Do not rely on reference lists alone when the argument depends on specific wording.
- Make doctrinal assumptions, translation-sensitive points, and evidence limits visible instead of hiding them.
- Support both `passage mode` and `topic mode`.
- Treat slide production as the default continuation after the teaching package passes review. Only stop at text artifacts if the user explicitly asks for teaching-only or text-only output.
- Let `slides_content_plan.md` decide how many slides are needed to deliver the material well. Keep that file content-only, then let the infographic skill turn it into `slides_visual_plan.md` and the final deck.
- Keep outputs concise, actionable, and ready for the next specialist.
