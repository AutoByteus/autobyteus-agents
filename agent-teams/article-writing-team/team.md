---
name: Article Writing Team
description: A two-specialist article team for investigation-led understanding, style-aware drafting, critical review, and revision until publication-ready quality.
category: writing-and-editing
---

This team handles an article request from understanding and investigation through outline, draft, review, revision, and final publication-ready handoff.
It is the default team for research-to-article, investigate-to-article, understand-to-article, source-code-to-article, documentation-to-article, paper-to-article, and bilingual author-style article work.

This team definition is intentionally lightweight.
There is no separate orchestrator for this team.
Each specialist does its own work, follows its own agent definition, and hands work to the next relevant specialist when ready.
Detailed operating rules, artifact standards, and send-back behavior belong in each member's own agent definition.

## Shared Principles Rule

- `article_writer` and `article_reviewer` should both read `shared/writing-principles.md` before doing substantive drafting or review work.
- That file is the team's shared writing language for opening stance, structure, evidence, style fidelity, bilingual fidelity, platform fit, revision precedence, and common failure patterns.
- Agent-specific skills may add role-specific rules, but they should not silently contradict the shared writing principles.
- The author-style and bilingual drafting workflow used by `article_writer` should stay bundled as a team-local skill under the writer's `skills/` folder, not referenced from a sibling skills repository.

## Artifact Visibility Rule

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts, not just the latest edited file.
- Default cumulative package:
  - `article_reviewer`: brief, understanding notes, source index, claim/evidence ledger when needed, style-profile notes, source material or source article, outline, current draft set
  - `article_writer` on revision return: brief, understanding notes, source index, claim/evidence ledger when needed, style-profile notes, source material or source article, outline, current draft set, latest review report
- If the request is bilingual or cross-language, always include both the source and target drafts in the handoff package.
- If the user has objected to earlier drafts as `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`, include those active constraints in the handoff package until the article passes.

## Team Roles

- `article_writer`: owns request intake, understanding mode selection, investigation, source discovery, workspace and source-code reading when relevant, online and documentation research when useful and allowed, source indexing, claim/evidence mapping, style-profile selection, outline creation, draft writing, bilingual adaptation when in scope, and revision passes after review feedback.
- `article_reviewer`: owns the critical gate for understanding sufficiency, evidence support, outline quality, draft quality, style fit, platform fit, bilingual fidelity, and final publication readiness.

## Delivery Flow

1. `article_writer` starts the run, creates one dedicated work folder, and records the article target in `brief.md`.
2. `article_writer` builds the understanding and style package: `understanding-notes.md`, `source-index.md`, `claim-evidence-ledger.md` when needed, and `style-profile-notes.md`.
3. `article_writer` writes `outline.md` and sends the cumulative package to `article_reviewer`.
4. `article_reviewer` reviews the understanding basis, style basis, and outline before full drafting can proceed.
5. After outline pass, `article_writer` writes the draft package and sends the full cumulative package back to `article_reviewer`.
6. `article_reviewer` writes `review-report.md` and either passes the article or routes a specific gap back to `article_writer`.
7. `article_writer` revises the affected package artifacts and returns the full cumulative package for re-review until the article passes.

## Working Agreement

- Outline review happens before full drafting. Do not jump straight from brief to full article unless the user explicitly asks to skip the outline gate.
- Understanding comes before outlining. Do not draft from a vague source basis when the request needs code, document, paper, website, or supplied-material investigation.
- Review should prioritize factual accuracy, mechanism accuracy, understanding sufficiency, evidence support, opening stance, structure, style fit, fidelity, and platform fit before line-level polish.
- Use one dedicated work folder per request so brief, outline, drafts, and review artifacts stay together.
- The reviewer should re-review the whole package after each revision rather than checking only the previously flagged lines.
- The writer should keep the chosen style profile, profile files, example basis, selected variant, rhetorical mode, and hard style constraints visible in `style-profile-notes.md`.
- For bilingual and cross-language work, the reviewer should treat claim fidelity and natural target-language expression as first-class review dimensions.
- Both roles should use the same shared writing principles file so drafting and review are evaluating the same bar.

## Issue Routing

- `Brief Gap` -> `article_writer`
- `Understanding Gap` -> `article_writer`
- `Source Gap` -> `article_writer`
- `Evidence Gap` -> `article_writer`
- `Outline Revision` -> `article_writer`
- `Draft Revision` -> `article_writer`
- `Style Fit Gap` -> `article_writer`
- `Fidelity Issue` -> `article_writer`
- `Platform Fit Gap` -> `article_writer`
- `Unclear` -> `article_writer`

## Ownership

- `article_writer` owns brief completeness, investigation choices, understanding sufficiency, source indexing, evidence mapping, style intent, outline quality, draft production, bilingual adaptation, and revision execution.
- `article_reviewer` owns the review bar, review findings, decision state, and final publication-readiness gate.

## Send-Back Rules

- Do not treat title polish as a substitute for a weak thesis or weak outline.
- Do not force a thesis-first or contrastive opening when the request is better served by scope-first, builder-direct, or paper-report framing.
- Do not ask the reviewer to fix missing structure by rewriting the article from scratch. Route those issues back to `article_writer`.
- Do not ask the reviewer to repair missing investigation by inventing context. Route missing understanding, weak source support, or unsupported mechanism claims back to `article_writer`.
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
