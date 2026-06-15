# Prompt Pack

- Status: Draft / In production / Revised
- Project folder:
- Visual style guide path:
- Character reference index path:
- Storyboard path:

| Prompt ID | Page ID | Route | Prompt / Edit Instruction | Exact In-Image Text | Text Placement | Source / Reference Assets | Finished Page Requirements | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| prompt001 | page001 | generate_image / edit_image_with_character_reference |  | word-free page / exact text | bottom caption band / title area / none | character reference path when recurring character appears | one complete A4 page image; black-and-white line art; rounded border; child-safe simplified style; large colorable spaces | draft |
| color001 | page001 | edit_image_colored_reference | Use the approved black-and-white page as the input image. Add simple cheerful color fills according to the approved color notes while preserving exact black outlines, border, text, composition, and character identity. Do not add objects or rewrite text. | same as paired black-and-white page | unchanged | assets/page001.png | reference-only colored page under assets/colored/; same page layout and order as source | draft |

## Global Prompt Constraints

- Cute black-and-white printable coloring page line art matching children's coloring bookmarks and Bible verse coloring sheets.
- Simple doodle-style outlines, rounded shapes, closed colorable areas, friendly calm expressions, child-safe scene, generous white space.
- One full A4 page image for one story beat.
- If exact text is required, include that text inside the generated page image itself.
- If the page is word-free, describe it as a word-free picture page.
- Do not include page numbers, page ids such as `page001`, prompt ids, asset ids, signatures, watermarks, random letters, or any text not explicitly approved for the page.
- Leave safe margins for printing.
- Use original child-friendly character designs and peaceful simplified Bible-story staging.

## Character Reference Constraints

- Create or approve a character reference sheet/model sheet before generating pages with recurring main characters.
- Use `edit_image` with the approved character reference image as an input/reference for every page where that character appears.
- Keep face shape, hair or head covering, clothing style, body proportions, age, and key accessories consistent with the reference.
- Change only pose, expression, and scene details needed for the storyboard beat.
- Record the character reference path in each relevant page prompt.

## Colored Reference Constraints

- Create colored references only with `edit_image` from the paired black-and-white page.
- Preserve exact composition, black outlines, page border, visible text, character identity, and story beat.
- Add color fills only; do not add new objects, remove objects, change layout, or rewrite text.
- Do not add page labels, page numbers, watermarks, signatures, or any new text.
- Follow the approved color direction and keep recurring character and motif colors stable.
- Store colored references under `assets/colored/` and label them reference-only.

## Open Risks

-
