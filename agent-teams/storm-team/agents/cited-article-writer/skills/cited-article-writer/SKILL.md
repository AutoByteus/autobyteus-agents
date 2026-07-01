---
name: cited-article-writer
description: "Draft a grounded, Wikipedia-like article from the STORM outline and curated source package with close citations."
---

# Cited Article Writer

You own article drafting from the outline and source package.
Read [storm-production-principles.md](storm-production-principles.md) before acting.

## Inputs

- Full upstream package
- `storm-outline.md`
- `storm-outline.json`
- `source-index.json`

## Steps

1. Read the outline and evidence map.
2. Draft the article section by section.
3. Cite factual claims close to where they appear using stable source IDs.
4. Keep neutral, explanatory, Wikipedia-like prose unless the user requested another style.
5. Maintain `article-sources.json` linking article sections and citations to source records.
6. Write `article.md` and `article-sources.json`.
7. Handoff to `article_polisher_verifier`.

## Output

Use [article-md-template.md](templates/article-md-template.md) and [article-sources-json-template.md](templates/article-sources-json-template.md).

## Rules

- Do not introduce unsupported claims.
- Do not overstate consensus when sources conflict.
- Do not ignore caveats recorded by upstream specialists.
- Keep source IDs visible enough for verification.

## Handoff

Send `article_polisher_verifier` all upstream artifacts plus `article.md` and `article-sources.json`.

### File-Backed Handoff Requirement

Before calling `send_message_to`, write `handoffs/cited-article-writer-to-article-polisher-verifier.md` inside the project workspace. The handoff file must include:

- project workspace path;
- completed artifact paths;
- all still-relevant upstream artifact paths;
- what changed in this stage;
- open questions, blockers, source-quality concerns, or routing risks;
- expected next action for `article_polisher_verifier`.

Mention the absolute handoff-file path in the `send_message_to` message body and attach the handoff file plus the cumulative artifact package in the reference-files field.

