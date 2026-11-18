---
name: Article Writing Team
description: An article team for investigation-led understanding, drafting in the style the reader needs (progressive, professional, essay, scientific paper, narrative) as a web project or Markdown, critical review, and revision until publication-ready quality; outside research uses the shared `deep-research` skill.
category: writing-and-editing
---

This team turns an article request into a publication-ready package: investigation, outline, draft, review, and revision. It is the default team for research-to-article, investigate-to-article, source-code-to-article, documentation-to-article, paper-to-article, and bilingual author-style article work, in any of the [styles](shared/styles/index.md), as a web project (the website's default) or Markdown.

## Roles

- `article_writer` is the entry and coordinator. It receives the user's request, asks the user for what only the user can supply, builds the package (understanding, style, outline, visual plan, draft), revises after review, and delivers the final package to the user with a web project or publish folder ready to drop on the AutoByteus website.
- `article_reviewer` is the gate. It judges the understanding basis, style basis, outline, visual plan, draft, and publication readiness, and writes `review-report.md`. It does not rewrite the article or repair missing investigation.

## Cooperation

1. The writer understands the subject from what it was given and from its own research of outside sources with the shared `deep-research` skill. It decides the style and the point, builds the package, shows the author a one-page plan, and sends it for a light pre-draft review: the point, the evidence (spot-checked against primary sources), the style basis, a short outline, and the visual plan.
2. After a pass, the writer drafts and sends the draft package. The reviewer reads the draft cold, spot-checks its claims against primary sources, and reviews structure from the claim down to the sentence.
3. The reviewer returns every decision to the writer: a pass, or the gap and revisions to fix. The writer revises and returns the whole package for re-review until it passes, then delivers the result to the user. A finding that survives two revisions goes to the user for a decision.

A small request (a rewrite, a conversion, a short note, or a supplied draft) takes the short path in `article-writing`: it skips the pre-draft review and goes straight to draft review.

Recipients for each result come from `team-config.json`.

## Shared files

- [`shared/writing-principles.md`](shared/writing-principles.md): the rules for every article; [`shared/explanatory-writing.md`](shared/explanatory-writing.md): for every style but a narrative; [`shared/figures-and-page.md`](shared/figures-and-page.md): figures and the web page. Skills add role-specific rules but do not contradict them.
- [`shared/styles/`](shared/styles/index.md): the article styles, how one is chosen, and how to add one.
- [`shared/formats.md`](shared/formats.md): the website's two formats, web project and Markdown folder.
- [`shared/platform-output-rules.md`](shared/platform-output-rules.md): WeChat, Medium and bilingual delivery.
- `shared/html-article.py`: checks, reads and packs a web project; `shared/publish-folder.py`: builds and checks a Markdown publish folder.
- [`shared/article-package.md`](shared/article-package.md): the files in one request's work folder and what each handoff carries.
