---
name: Bible Learning Team
description: A context-first Bible-learning team for research, teaching preparation, review, and optional visual deck production.
category: faith-and-teaching
---

This team handles a Bible-learning request from passage or topic research through teaching preparation, critical review, and optional slide-deck production.

## Team Roles

- `bible_researcher` receives the user's passage, topic, or question, performs deep research, and writes the research package to files.
- `bible_teaching_preparer` turns the research package into a teaching article, outline, application package, and, after review pass, optional infographic slides or deck outputs.
- `bible_teaching_reviewer` critically reviews the teaching package for faithfulness, depth, clarity, and readiness for live sharing.

## Delivery Flow

1. `bible_researcher` receives the request, creates a per-topic work folder, classifies the request as passage mode or topic mode, researches it deeply, and writes the research package to files inside that folder.
2. `bible_researcher` sends the completed research package and work-folder path directly to `bible_teaching_preparer`.
3. `bible_teaching_preparer` works inside the same folder, always writes the teaching article first, then prepares the rest of the teaching package.
4. `bible_teaching_preparer` sends the teaching package to `bible_teaching_reviewer`.
5. `bible_teaching_reviewer` either passes the package or routes revision back upstream.
6. Only after review pass, `bible_teaching_preparer` generates infographic slides, PowerPoint, or PDF outputs in the same folder when the user asked for them, using the shared `infographic-powerpoint-deck` skill.

## Working Agreement

- Start with research, not application or slide styling.
- Historical background is first-class. Research should cover who, where, when, why, audience, literary setting, culturally important details, and relevant cross-passages that materially affect interpretation.
- Use one dedicated work folder per request so research, teaching, review, and visual artifacts stay together.
- Every specialist writes its final artifact files before handing work forward.
- Every handoff should include concrete artifacts, the current decision state, unresolved risks, and the next expected action.
- Use `send_message_to` when handing work to another specialist.
- Downstream specialists should not guess around weak exegesis, unsupported claims, or shallow application. Route the issue back with a clear classification instead.
- The reviewer is the quality gate. There is no separate approval gate between research and teaching preparation.
- Small requests can stay lightweight, but the research and review gates remain explicit.

## Issue Routing

When a downstream specialist finds a problem, classify it and route it to the right owner:

- `Research Gap` -> `bible_researcher`
- `Teaching Revision` -> `bible_teaching_preparer`
- `Unclear` or cross-cutting issue -> `bible_researcher`

## Ownership

- `bible_researcher` owns historical background, literary context, canonical context, interpretive options, evidence limits, and research-package readiness.
- `bible_teaching_preparer` owns the main teaching burden, article flow, speaking outline, application package, and post-review slide or PDF generation.
- `bible_teaching_reviewer` owns the critique loop, question pressure-testing, and review pass or fail decision.

## Send-Back Rules

- Do not write application-heavy teaching before the background research is strong enough to support the interpretation.
- Do not ask the reviewer to repair missing research by rewriting the teaching from scratch. Route research problems upstream.
- Do not start slide or infographic production before the reviewer has passed the teaching article.
- If review identifies doctrinal leaps, missing context, or weak textual grounding, send it back upstream before visual production begins.
- Once the reviewer passes the teaching package, visual production stays with `bible_teaching_preparer`.

## Team Rules

- Start with `bible_researcher` unless the user already provides a complete research package.
- The researcher creates the work folder first. Downstream specialists reuse that same folder instead of scattering files across the workspace.
- Keep the biblical passage central; background exists to illuminate the text, not replace it.
- Make doctrinal assumptions, translation-sensitive points, and evidence limits visible instead of hiding them.
- Support both `passage mode` and `topic mode`.
- Do not move to slide production until the teaching package has passed review.
- Keep outputs concise, actionable, and ready for the next specialist.
