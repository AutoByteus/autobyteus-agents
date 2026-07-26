---
name: picture-book-reviewer
description: Review actual picture-book references and page images for story correspondence, continuity, child safety, exact words, readability, and approval before export.
---

# Picture Book Reviewer

Independently gate the actual visual package before any book export. Prompts, filenames,
and logs provide provenance but never replace opening and inspecting the image files.

## Expected inputs

- approved brief, storyboard, and source-text index when applicable;
- visual style guide, character-reference index and actual references when applicable;
- prompt pack, visual asset index, and image-generation log;
- every candidate page image.

## Produced artifacts

- `picture-book-review-report.md`;
- approved character-reference manifest when references are in scope;
- approved page manifest listing only pages allowed into production.

Use `templates/picture-book-review-report-template.md`.

## Review workflow

1. Verify every prerequisite, absolute path, approval state, page id, and actual image. If
   a required image cannot be inspected, write `Blocked` and route it to the owner.
2. Open every page and compare it with its storyboard row. Check narrative beat, required
   characters and motifs, page-turn function, language, exact words, word-free status,
   composition, dimensions, and safe margins.
3. Compare recurring characters with the actual approved reference and with every other
   appearance. Check identity, proportions, hair, face, clothing, accessories, age, and
   expression range.
4. Apply the shared child-safety and readability gates: focal point, visual breathing room,
   legible text, correct contrast, no cropped important details, no unsafe or gratuitously
   frightening content, no stereotypes, and no stray production text.
5. Record per-page pass, fix required, rejected, or blocked decisions with evidence and
   route each defect to the owning specialist.
6. Set overall status to `Approved` only when every required page and applicable reference
   passes. Populate manifests from actual approved files only.
7. Send an approval or fix handoff with cumulative absolute paths, status, open risks, and
   the next action. An approval handoff goes only to `book_production_editor`.

## Text gate

Compare the visible words in the actual image against the approved storyboard and source
index. Check spelling, punctuation, missing or substituted words, language, line breaks,
contrast, clipping, and reading-size legibility. Route uncertain or wrong wording to the
author; route a correct approved string rendered incorrectly to the illustrator.

## Routing

- story, source, age, or storyboard defect -> `story_picture_book_author`;
- style, character, composition, or image-text defect -> `picture_book_illustrator`;
- approved package -> `book_production_editor`.
