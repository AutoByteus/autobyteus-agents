# Platform Output Rules

Packaging for each platform. The writer applies these rules before delivery; the reviewer uses them to judge platform fit. The mode, opening and structure rules are in [writing-principles.md](writing-principles.md); a platform shapes packaging, never the argument.

## WeChat (Chinese)

- A concise title (what a title must say is in the writing principles, section 4).
- Clear section headings and visible structure; short paragraphs for mobile reading.
- Bullet lists for process steps and key claims; tables when they clarify stages, roles or mechanism differences.
- Precise technical terms, with the English term in parentheses where it helps.
- Formulas as readable LaTeX blocks, with symbols explained in nearby text.
- End with a compact takeaway section (a "最后的想法" style is acceptable).

## Medium (English)

- Section headers with conceptual or technical labels that match the section's content.
- Explanation progression explicit and skimmable; bullets for criteria, principles and outcomes when they help inspection, without forcing lists into explanatory prose.
- Tables when they clarify stages, roles or mechanism differences.
- Compact equations followed by a plain-language interpretation.
- A concise conclusion that states the result and its implication; in `technical-blog` and `paper-report`, a bounded implication, not a slogan.

## Visuals On Both Platforms

Both platforms are read mostly on phones. Treat text-bearing diagrams and comparison graphics as mobile content: a large source PNG does not stay readable merely because the platform scales it down.

- Before delivery, view each text-bearing visual at a narrow mobile article width, such as 360–390px (resize a copy with `run_bash`, then view it). Titles, card text, row labels, arrows, lifecycle annotations, and every accept/revision or success/failure path must be readable without zoom or horizontal scrolling.
- If the check fails, reduce the text, split wide matrices into separate portrait cards, and stack wide workflows into portrait panels. Keep the reading order explicit and provide nearby prose that carries the same essential meaning.

## Bilingual Delivery

When the user asks for both languages, deliver in this order:

1. The WeChat Chinese draft.
2. The Medium English draft.
3. Optional alignment notes (3–6 bullets) on the logic preserved.

The conversion steps are in the writer's style workflow; the fidelity rules are in the principles, section 9.
