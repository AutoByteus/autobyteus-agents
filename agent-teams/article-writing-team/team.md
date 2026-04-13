---
name: Article Writing Team
description: A style-aware article-writing team for outline-first drafting, critical review, and revision until publication-ready quality.
category: writing-and-editing
---

This team handles an article request from brief and outline through draft, review, revision, and final publication-ready handoff.

This team definition is intentionally lightweight.
There is no separate orchestrator for this team.
Each specialist does its own work, follows its own agent definition, and hands work to the next relevant specialist when ready.
Detailed operating rules, artifact standards, and send-back behavior belong in each member's own agent definition.

## Shared Principles Rule

- `article_writer` and `article_reviewer` should both read `shared/writing-principles.md` before doing substantive drafting or review work.
- That file is the team's shared writing language for opening stance, structure, evidence, style fidelity, bilingual fidelity, platform fit, revision precedence, and common failure patterns.
- Agent-specific skills may add role-specific rules, but they should not silently contradict the shared writing principles.

## Artifact Visibility Rule

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts, not just the latest edited file.
- Default cumulative package:
  - `article_reviewer`: brief, source material or source article, style-profile choice, selected profile variant, rhetorical mode, outline, current draft set
  - `article_writer` on revision return: brief, source material or source article, selected profile variant, rhetorical mode, outline, current draft set, latest review report
- If the request is bilingual or cross-language, always include both the source and target drafts in the handoff package.
- If the user has objected to earlier drafts as `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`, include those active constraints in the handoff package until the article passes.

## Team Roles

- `article_writer`: owns request intake, brief clarification, style-profile selection, outline creation, draft writing, bilingual adaptation when in scope, and revision passes after review feedback.
- `article_reviewer`: owns the critical gate for outline quality, draft quality, style fit, platform fit, bilingual fidelity, and final publication readiness.

## Delivery Flow

1. `article_writer` receives the request, creates one dedicated work folder for the article package, and records the core brief in `brief.md`.
2. `article_writer` records the requested platform, language, output mode, style profile, selected profile variant, rhetorical mode, audience, one-sentence takeaway, depth target, source-material basis, and any hard revision constraints in `brief.md`.
3. `article_writer` writes `outline.md` with title options, the selected opening stance, section purposes, and the evidence, mechanism, or examples each section will use.
4. `article_writer` sends the outline package to `article_reviewer`.
5. `article_reviewer` reviews the outline first and either passes it or routes `Brief Gap`, `Source Gap`, or `Outline Revision` back to `article_writer`.
6. Only after the outline passes review, `article_writer` writes the full draft package: `article.md` for single-language work, or source/target draft files when bilingual or cross-language output is in scope.
7. `article_writer` sends the full draft package to `article_reviewer`.
8. `article_reviewer` writes `review-report.md`, then either passes the article or routes `Draft Revision`, `Style Fit Gap`, `Fidelity Issue`, `Platform Fit Gap`, or `Unclear` back to `article_writer`.
9. `article_writer` revises the draft package and returns the full cumulative package for re-review until the article passes.

## Working Agreement

- Outline review happens before full drafting. Do not jump straight from brief to full article unless the user explicitly asks to skip the outline gate.
- Review should prioritize factual accuracy, mechanism accuracy, opening stance, structure, style fit, fidelity, and platform fit before line-level polish.
- Use one dedicated work folder per request so brief, outline, drafts, and review artifacts stay together.
- The reviewer should re-review the whole package after each revision rather than checking only the previously flagged lines.
- The writer should keep the chosen style profile and example basis visible in the brief or handoff when style matching is part of the request.
- The writer should also keep the selected profile variant, rhetorical mode, and any hard user feedback constraints visible in the brief or handoff.
- If the requested profile is still bootstrapping, the writer should state that limitation in `brief.md` and keep the draft structurally strong rather than pretending the voice is fully learned.
- For bilingual and cross-language work, the reviewer should treat claim fidelity and natural target-language expression as first-class review dimensions.
- Both roles should use the same shared writing principles file so drafting and review are evaluating the same bar.

## Issue Routing

- `Brief Gap` -> `article_writer`
- `Source Gap` -> `article_writer`
- `Outline Revision` -> `article_writer`
- `Draft Revision` -> `article_writer`
- `Style Fit Gap` -> `article_writer`
- `Fidelity Issue` -> `article_writer`
- `Platform Fit Gap` -> `article_writer`
- `Unclear` -> `article_writer`

## Ownership

- `article_writer` owns brief completeness, style intent, outline quality, draft production, bilingual adaptation, and revision execution.
- `article_reviewer` owns the review bar, review findings, decision state, and final publication-readiness gate.

## Send-Back Rules

- Do not treat title polish as a substitute for a weak thesis or weak outline.
- Do not force a thesis-first or contrastive opening when the request is better served by scope-first, builder-direct, or paper-report framing.
- Do not ask the reviewer to fix missing structure by rewriting the article from scratch. Route those issues back to `article_writer`.
- Do not treat bilingual conversion as passed if claims are lost, invented, or materially weakened in the target language.
- If the brief is underspecified, route the gap before overcommitting the draft to a brittle direction.
- If the user later supplies a more exact mechanism or runtime explanation, replace the earlier generic abstraction instead of preserving it for stylistic continuity.
- Once substantive findings have been raised, the reviewer should expect at least one full-package re-review before passing.

## Team Rules

- Start with `article_writer`.
- Keep outputs concrete and ready for the next specialist.
- Prefer publication-ready structure over decorative prose.
- Let the requested platform shape packaging, but do not let platform conventions weaken the core argument.
- Make style decisions explicit instead of letting them remain implicit guesses.
- Let user-supplied corrections about accuracy, ownership stance, rhetoric, and repetition override default style habits.
