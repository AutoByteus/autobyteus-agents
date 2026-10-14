---
name: Article Writing Team
description: A two-specialist article team for investigation-led understanding, style-aware drafting, critical review, and revision until publication-ready quality.
category: writing-and-editing
---

This team turns an article request into a publication-ready package: investigation, outline, draft, review, and revision. It is the default team for research-to-article, investigate-to-article, source-code-to-article, documentation-to-article, paper-to-article, and bilingual author-style article work.

## Roles

- `article_writer` is the entry and coordinator. It receives the user's request, asks the user for what only the user can supply, builds the package (research, style, outline, visual plan, draft), revises after review, and delivers the final package to the user. Its work is defined by the `article-researcher` and `article-writing` skills.
- `article_reviewer` is the gate. It judges the understanding basis, style basis, outline, visual plan, draft, and publication readiness, and writes `review-report.md`. It does not rewrite the article or repair missing investigation. Its work is defined by the `article-reviewer` skill.

## Cooperation

1. The writer builds the package and sends it for a pre-draft review: understanding basis, style basis, outline, and visual plan.
2. After a pass, the writer drafts and sends the draft package for review.
3. The reviewer returns every decision to the writer: a pass, or the gap and revisions to fix. The writer revises and returns the whole package for re-review until it passes, then delivers the result to the user.

Recipients for each result come from `team-config.json`.

## Shared files

- [`shared/writing-principles.md`](shared/writing-principles.md): the quality bar both roles apply. Skills add role-specific rules but do not contradict it.
- [`shared/platform-output-rules.md`](shared/platform-output-rules.md): packaging and visual-legibility rules for WeChat and Medium.
- [`shared/article-package.md`](shared/article-package.md): the files in one request's work folder and what each handoff carries.
