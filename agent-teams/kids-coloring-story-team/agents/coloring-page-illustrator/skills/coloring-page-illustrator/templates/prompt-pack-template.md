# Prompt Pack

- Status: Draft / In production / Revised
- Project folder:
- Visual style guide path:
- Character reference index path:
- Storyboard path:

| Prompt ID | Page or Item ID | Route | Prompt / Edit Instruction | Exact In-Image Text | Text Placement | Source / Reference Assets | Finished Page Requirements | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| prompt001 | page001 | generate_image / edit_image (character reference as input) / generate_image (approved loose-continuity exception) |  | word-free page / exact text | bottom caption band / title area / none | character reference path when required, or recorded loose-continuity exception | one complete A4 page image; black-and-white line art; rounded border; child-safe simplified style; large colorable spaces | draft |
| color001 | page001 | edit_image (colored reference) | Use the approved black-and-white page as the input image. Add simple cheerful color fills according to the approved color notes while preserving exact black outlines, border, text, composition, and character identity. Do not add objects or rewrite text. | same as paired black-and-white page | unchanged | assets/page001.png | reference-only colored page under assets/colored/; same page layout and order as source | draft |

## Global Prompt Constraints

- Cute black-and-white printable line art matching the approved style guide, such as children's coloring bookmarks, simple story coloring sheets, or Bible verse coloring sheets when Scripture is in scope.
- Simple doodle-style outlines, rounded shapes, closed colorable areas, friendly calm expressions, child-safe scene, generous white space.
- One complete A4-safe page image for one approved storyboard page or activity item. Use a multi-panel or contact-sheet layout only when the approved product format explicitly permits it.
- If exact text is required, include that text inside the generated page image itself.
- If the page is word-free, describe it as a word-free picture page.
- Do not include page numbers, page ids such as `page001`, prompt ids, asset ids, signatures, watermarks, random letters, or any text not explicitly approved for the page.
- Leave safe margins for printing.
- Use approved child-friendly character designs and supplied references only when their ownership or permission is recorded. Follow the peaceful, child-safe staging required by the approved storyboard; apply Bible-specific staging rules only when Bible content is in scope.

## Character Reference Constraints

- Create or approve a character reference sheet/model sheet before generating pages with recurring main characters, unless the storyboard records an explicit user-approved loose-continuity exception.
- Use `edit_image` with the approved character reference image as an input/reference for every page where that character appears, unless the storyboard records an explicit user-approved loose-continuity exception.
- When a reference is in scope, keep face shape, hair or head covering, clothing style, body proportions, age, and key accessories consistent with it. When the exception applies, record its scope and do not imply reference-based continuity.
- Change only pose, expression, and scene details needed for the storyboard beat.
- Record the character reference path in each relevant page prompt, or the approved loose-continuity exception when no reference is required.

## Colored Reference Constraints

- Create colored references only with `edit_image` from the paired black-and-white page.
- Preserve exact composition, black outlines, page border, visible text, character identity, and story beat or activity function.
- Add color fills only; do not add new objects, remove objects, change layout, or rewrite text.
- Do not add page labels, page numbers, watermarks, signatures, or any new text.
- Follow the approved color direction and keep recurring character and motif colors stable.
- Store colored references under `assets/colored/` and label them reference-only.

## Open Risks

-
