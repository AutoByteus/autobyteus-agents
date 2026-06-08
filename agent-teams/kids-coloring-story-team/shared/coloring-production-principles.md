# Kids Coloring Story Production Principles

Use this file as the shared operating contract for the whole kids coloring story team.

## 1. Name The Product Clearly

The professional terms for this work include:

- A4 printable coloring pages
- coloring bookmarks
- coloring sheets
- coloring activity sheets
- mini coloring book
- short coloring story
- sequential story pages
- line-art illustration
- black-and-white coloring page
- Bible verse coloring page, when Scripture is in scope

Choose the product format intentionally instead of treating every request as a generic illustration.

## 2. Imagination And Doing Come First

- The goal is not only a cute picture. The page should invite the child to do something: color, notice, imagine, choose, pray, tell the next part, find small details, draw an extra detail, or talk with an adult.
- Prefer simple story moments over abstract decoration.
- A good 6-7 image pack usually has a tiny arc across separate A4 pages: hello, setup, small problem or discovery, courage or help, gentle action, joyful change, and closing reflection or activity.
- Keep child-facing prompts short, concrete, and optional.
- Do not overfill the page. Coloring needs white space, large shapes, and calm visual hierarchy.

## 3. Age Fit

- For ages 3-5: very large shapes, minimal text, simple emotions, few objects, thick outlines, and no tiny detail dependency.
- For ages 6-8: simple scenes, friendly characters, find-and-color details, short captions, and gentle sequence logic.
- For ages 9-11: richer patterns, light puzzles, short reflective prompts, and more detailed backgrounds are acceptable.
- If the user does not specify age, default to ages 5-8 and record the assumption.

## 4. Child-Safe And Kind

- Keep the emotional tone warm, hopeful, curious, gentle, and safe.
- Avoid scary, violent, shaming, manipulative, or guilt-heavy scenes.
- Avoid unsafe behavior that children might imitate unless the scene clearly and gently models safety.
- Use inclusive, respectful character design. Avoid stereotypes, caricatures, or exclusionary assumptions.
- Do not use copyrighted characters, trademarked mascots, or brand-like lookalikes unless the user owns or supplies the rights.

## 5. Faith, Bible, And Values Content

- If Bible verses, prayers, doctrine, or religious teaching are in scope, record the source, translation, exact wording, and citation in `source-text-index.md`.
- Do not invent Bible wording or paraphrase as a quotation.
- Keep faith language age-appropriate and gentle.
- If a verse is long, plan a short excerpt only when the user approves the translation and excerpt.
- Distinguish direct Scripture text, paraphrase, theme, and child-facing activity prompt.
- If source wording is uncertain, ask the user or verify with an allowed source before image production.
- For Bible stories involving conflict, danger, punishment, death, weapons, fear, or enemies, adapt the visual sequence for children by emphasizing trust, courage, prayer, help, safety, and resolution. Avoid impact moments, injury, humiliation, gore, frightening facial expressions, or triumphant cruelty.
- When the story includes a weapon or battle element, treat it as source context, not the visual focus. For young children, prefer symbolic or before-and-after scenes over action violence.
- If the user wants a more literal Bible-story depiction, record the requested literalness level and route it through child-experience review before image production.

## 6. Line-Art Style Rules

- Default visual style: simple cute black-and-white printable line art like children's coloring bookmarks and Bible verse coloring sheets.
- Match the example style family: clean doodle-style outlines, rounded forms, smiling or calm faces, simple decorative motifs, playful bubble-letter text when text is required, and generous white space.
- The art should feel gentle, handmade, approachable, and easy for a child to color. It should not feel like realistic Bible illustration, dramatic comic art, manga, fantasy battle art, dense storybook engraving, or adult coloring-book detail.
- Use consistent characters, motifs, line thickness, and page density across the pack.
- Prefer closed shapes that are easy to color.
- Avoid heavy gray shading, painterly texture, realistic lighting, tiny hatching, crosshatching, complex perspective, dense backgrounds, dramatic shadows, and realistic anatomy that make the page feel serious or hard to color.
- Text should be minimal, large, high-contrast, and easy to proofread.
- If the final product is a coloring bookmark, use a tall narrow panel with a clear border and simple top-to-bottom reading flow.
- If the final product is a page, keep enough margins for home printers.

## 6B. Self-Contained Generated Page Images

- The approved page image is the complete child-facing page.
- When a page includes a caption, Bible verse, title, prompt, or other visible words, put the exact approved text and its placement into the `generate_image` or `edit_image` prompt for that page.
- Printable assembly treats approved page images as finished artwork. Its role is to place, scale, center, order, and export those images as print files.
- When exact text is required, specify it verbatim in the image prompt and describe where it belongs, for example `bottom caption band inside the page border`.
- When a page is word-free, describe it positively as a `word-free coloring scene` or `text-free picture page`.
- When the storyboard requires visible text, a generated page without that text is not ready. Correct it in the image step through `edit_image` or regeneration, producing a new approved page image before packaging.

Positive prompt patterns:

- `Create one A4 landscape black-and-white coloring page. The page contains a rounded border, a peaceful hillside scene with David and a sheep, and the exact bottom caption "David cared for the sheep." The caption is inside a simple bottom caption band within the border.`
- `Create one A4 landscape word-free black-and-white coloring page. The page shows David choosing smooth stones by a stream, with large closed shapes, rounded doodle outlines, and generous white space.`

## 6A. Non-Scary Bible Story Adaptation

- Bible scenes should look peaceful and child-safe even when the source story contains conflict.
- Use calm symbolic staging: distant silhouettes, before-and-after moments, prayer, helpers, nature motifs, celebration, and gentle facial expressions.
- Do not show frightening giants, angry close-ups, impact moments, injury, weapons as the visual focus, battlefield chaos, or scared children.
- If a source story has a dangerous or violent moment, choose the nearest safe story beat that still preserves the meaning for children.
- The visual mood should make children curious and comfortable, not tense.

## 7. One Image Per A4 Page Rule

- Default final coloring-story output is a multi-page A4 PDF.
- Each story image must occupy its own full A4 page with safe margins and large colorable areas.
- A request for `6 pictures`, `7 pictures`, or a short picture sequence means 6, 7, or the approved number of separate A4 pages, not a collage, grid, storyboard contact sheet, or several small panels inside one generated image.
- Write one image prompt per storyboard page, each prompt describing one complete A4 page image for one story beat.
- A combined overview/contact sheet is a preview artifact only when explicitly useful. The child-coloring assets remain separate full-page images.
- If a generated candidate compresses multiple story pages into one image, regenerate the affected pages as separate A4 assets.

## 8. A4 Print And Format Rules

- Default paper size is A4 unless the user explicitly asks for another size.
- Use the professional orientation terms:
  - `portrait`: vertical page orientation
  - `landscape`: horizontal page orientation
- Default to A4 landscape for story pages unless the user asks otherwise.
- Use A4 portrait only when the user requests a vertical page or the product format clearly needs it.
- Individual bookmark designs should still be generated as separate A4-safe page assets unless the user explicitly asks for multiple cut-out bookmarks on one sheet.
- Record orientation, page count, and whether the output is full-page sheets, bookmarks, half-pages, cards, or a mini booklet.
- Keep important art and text inside safe margins.
- Final printable exports should normally include a PDF plus source PNGs when available.
- Validate that the final files open, print area is not clipped, page order is correct, and text remains readable.

## 9. Image Generation And Editing

- `coloring_page_illustrator` owns image generation and image editing.
- Use `generate_image` or `edit_image` for final visual assets.
- Generate or edit one final coloring page image per approved storyboard page.
- Make each generated page image self-contained, including any required caption or verse text inside the image itself.
- Image calls are serial-only. Call exactly one `generate_image` or `edit_image`, wait for the result, inspect the actual output, log pass/fix/reject/block, then run `sleep 60` before the next image call.
- For every image, record prompt, output path, page id, source or reference ids when present, visual self-check result, and cooldown status in `image-generation-log.md`.
- A successful tool return is not enough. Inspect the image for:
  - black-and-white coloring-page suitability
  - age fit
  - story match
  - clear outlines and colorable shapes
  - pure black-and-white line art when the product is a coloring page
  - required text appears inside the image exactly as specified, or the page is a word-free picture page
  - text is legible and spelled correctly
  - gentle, child-safe content
  - one scene/page only, unless the approved format explicitly asks for a multi-panel cut-out sheet
  - correct page format and margins
- Send only inspected candidate images that passed the illustrator self-check to review.

## 10. Review Gate

- `child_experience_reviewer` must review actual candidate images before printable packaging.
- The two primary review questions are:
  - Does each image correspond to the approved storyboard page it claims to represent?
  - Are recurring characters, objects, and motifs visually consistent across the full page sequence?
- The reviewer must inspect the actual image files side by side with the storyboard and style guide. Prompt text, logs, and file names are not enough.
- If the runtime cannot visually inspect the candidate images, the review status is `Blocked`, not `Approved`.
- If recurring character consistency fails, the reviewer should name the strongest base/reference image and send concrete fix guidance to `coloring_page_illustrator`: use `edit_image` from that base/reference when the scene composition is otherwise usable, or regenerate with the locked character identity when the page is too far off.
- Treat the following as blocking:
  - illegible or misspelled text
  - required page text absent from the generated or edited page image
  - wrong Bible wording or missing citation when Scripture is used
  - overly dense detail for the target age
  - frightening, unsafe, shaming, or exclusionary content
  - malformed hands, faces, animals, objects, or page borders that distract from coloring
  - unwanted color fill in a black-and-white coloring asset
  - story-image mismatch
  - multiple story images compressed into one final page when the approved format is one image per A4 page
  - image not suitable for the requested print format
- Only reviewer-approved visuals may enter the final printable package.

## 11. Handoffs

- Handoffs must reference absolute paths to current artifact files.
- Handoff messages should state approval status, open risks, and next expected action.
- The message body is a concise route; the durable artifacts carry the full context.
- Do not rely on hidden chat history for story sequence, verse wording, visual decisions, or print settings.
