# Picture-Book Production Principles

This is the shared source of truth for the kids picture story team. It governs child fit,
story pacing, source wording, image generation, in-image text, visual continuity, review,
and book delivery.

## Product contract

- Produce a reading-first illustrated picture book, not a worksheet or activity pack.
- Use one complete image per story page. Do not compress several storyboard rows into a
  contact sheet or multi-panel page unless the approved format explicitly calls for it.
- Recommend 21-28 illustrated pages by default so the story has room for setup, escalation,
  emotional change, resolution, and a satisfying ending. The approved brief may choose a
  different count with a clear rationale.
- Record the target age, reading level, language, book dimensions, orientation, intended
  use, and digital or print delivery format in the approved brief.
- Keep the story gentle, inclusive, emotionally safe, and appropriate for the target age.

## Story and page-turn rules

- The storyboard is the authority for page order, story beat, exact words, required
  characters, motifs, visual action, and page-turn intent.
- Give each page one primary narrative job. Use page turns for discovery, suspense,
  emotional change, humor, or calm resolution rather than repeating the same beat.
- Keep sentences and vocabulary appropriate for the approved reading level. Record
  proposed text as pending until the user approves it.
- Do not invent a moral, historical claim, quotation, translation, or religious wording.
  Mark original adaptations as original text or paraphrase rather than presenting them as
  sourced quotations.

## Exact text on the image surface

- The page image must contain the exact approved words, in the approved language, or the
  storyboard must explicitly say `word-free picture page`.
- Record page text, line breaks when material, text placement, font treatment, contrast,
  safe margins, and any special characters in the storyboard and visual asset index.
- Inspect the actual rendered image for spelling, punctuation, missing words, substitutions,
  accidental extra letters, awkward line breaks, clipped glyphs, contrast, and readability.
- Never rely on a later layout overlay to repair missing or incorrect story text. Route the
  page back to the author for wording changes or the illustrator for text composition fixes.
- Do not allow page ids, prompt ids, watermarks, signatures, random letters, or production
  notes to appear in the artwork.

## Visual continuity and references

- Lock the visual family before generating the page sequence: medium, palette, lighting,
  composition range, typography treatment, texture, and age-appropriate detail density.
- Every recurring main character needs an approved reference image unless the storyboard
  records an explicit user-approved loose-continuity exception.
- Compare the actual reference image with every page where that character appears. Check
  face shape, hair, skin tone, clothing, proportions, accessories, age, and expression
  range without stereotyping or flattening identity.
- Preserve recurring animals, objects, settings, and motifs across the page sequence.
- Use an image edit from the approved reference when a recurring character appears and the
  composition is suitable; otherwise regenerate with the locked identity and record why.

## Child-safety and readability gates

Review every page for:

- age-appropriate emotion, action, language, and visual complexity;
- no gratuitous fear, gore, cruelty, humiliation, unsafe imitation, or sexualized content;
- inclusive, respectful representation and no harmful stereotypes;
- clear focal point and enough visual breathing room for the words;
- readable text at the intended viewing size and safe margins on all sides;
- no cropped faces, hands, important objects, or text;
- no accidental logos, watermarks, signatures, unrelated characters, or stray text;
- a clear match between the approved story beat and the actual image.

Any failed gate blocks approval until the responsible artifact is corrected and re-reviewed.

## Artifact and handoff discipline

Keep these artifacts cumulative and path-addressable:

- `picture-book-brief.md`
- `picture-book-storyboard.md`
- `source-text-index.md` when needed
- `visual-style-guide.md`
- `character-reference-index.md` when recurring characters are in scope
- `prompt-pack.md`
- `visual-asset-index.md`
- `image-generation-log.md`
- `picture-book-review-report.md`, including approved page and character manifest
  sections when applicable
- `book-production-plan.md`
- `book-production-report.md`

Every handoff states its current decision or approval state, open risks, next action, and
absolute paths. Do not send a candidate package as though it were approved. The approved
page and character manifest sections in the review report are the authoritative boundary
for production inputs.

## Production and export rules

- The production editor preserves approved page pixels and page text; it may only order,
  size, center, and export them according to the approved plan.
- Include a cover, title page, end page, or credits only when the approved storyboard and
  plan define them. Do not add them as silent packaging extras.
- Validate page count, order, dimensions, safe margins, text readability, file opening,
  and export integrity. Keep digital reading pages and optional print/booklet outputs
  clearly identified.
