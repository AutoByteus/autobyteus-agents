# David And Goliath A4 Landscape Dry Run

This dry run validates the `kids-coloring-story-team` structure against a concrete Bible-story example.
It is not a final user artifact; it shows whether the team has enough role boundaries, handoffs, and guardrails to create the product.

## Test Request

- Product: printable coloring story pack
- Topic: David and Goliath
- Source: 1 Samuel 17
- Audience: children ages 5-8
- Format: A4 landscape
- Page structure: seven separate A4 landscape pages, one large coloring image per page
- Style: simplified cute black-and-white coloring bookmark / Bible verse sheet style, large colorable shapes, gentle expressions, generous white space
- Character consistency: David is a recurring main character and needs an approved character reference sheet/model sheet before page generation
- Colored reference pack: included as a separate reference-only package derived from approved black-and-white pages
- Goal: encourage imagination, courage, trust in God, and child participation

## Expected Team Flow

1. `story_activity_designer` creates a source-grounded brief and storyboard, including recurring character ids and page appearances.
2. User approves the seven-page A4 landscape plan before image production.
3. `coloring_page_illustrator` creates a style guide, `character-reference-index.md`, a David reference image under `assets/characters/`, prompt pack, image log, asset index, and seven candidate full-page line-art images.
4. For every page where David appears, `coloring_page_illustrator` uses `edit_image` with the approved David reference image as input/reference.
5. After black-and-white pages pass self-check, `coloring_page_illustrator` creates paired colored reference images under `assets/colored/` from the approved line-art pages.
6. `child_experience_reviewer` checks Bible/source handling, story-image match, David reference consistency, approved-text-only surfaces, child safety, age fit, line clarity, one-image-per-page compliance, coloring usability, and colored-reference preservation.
7. `printable_pack_producer` assembles only approved black-and-white full-page images into a seven-page A4 landscape PDF and PNG exports, then exports the approved colored references separately.

## Story Activity Designer Dry Run

The team should not treat David and Goliath as a battle-action coloring sheet.
For ages 5-8, the approved story angle should be courage and trust, with non-graphic conflict handling.

Suggested seven-page storyboard:

| Page ID | Story Beat | Visual Scene | Character Reference Need | Activity / Imagination Invitation | Text Guidance |
| --- | --- | --- | --- | --- | --- |
| page001 | David helps with sheep | David smiling with sheep on a hillside | `character-david`; create/use David reference | Color the sheep and add flowers | Optional caption: `David cared for the sheep.` |
| page002 | David brings food and listens | David carrying a small bundle near friendly camp tents | use `character-david` reference | Find and color three helpful things | Keep the camp peaceful |
| page003 | David hears about the big problem | David listens while people point toward a far-off tall figure | use `character-david` reference | Circle one brave face | Far-off simple figure only |
| page004 | David remembers God helps him | David looking at a small harp or folded hands under a sunny sky | use `character-david` reference | Draw something that reminds you God helps | Source theme, not direct quote |
| page005 | David chooses simple tools | David with a small bag and stones near a stream | use `character-david` reference | Count and color five smooth stones | Keep sling non-threatening |
| page006 | David stands bravely | David in foreground, very distant simplified giant silhouette | use `character-david` reference | Add rays of courage around David | No impact, no injury, no weapon focus |
| page007 | The people are thankful | David and community smiling peacefully | use `character-david` reference | Color the celebration and add stars | Optional prompt: `What helps you be brave?` |

Source text discipline:

- Record `1 Samuel 17` as the story source.
- Use exact Bible text only after the user supplies or approves translation and wording.
- If a verse is desired, the team should ask which translation and whether to use a short excerpt.

## Coloring Page Illustrator Dry Run

The prompt pack should define each finished page image as:

- David has an approved reference image such as `assets/characters/character-david-reference.png`.
- Every page containing David uses `edit_image` with the approved David reference as input/reference.
- A4 landscape full-page printable coloring sheet.
- One full-page scene only for the current page id.
- If the page has an approved caption, include that exact caption inside the generated image itself, in a simple bottom caption band inside the page border.
- If the page is word-free, describe it as a word-free picture page.
- Cute black-and-white line art matching simplified children's coloring bookmarks and Bible verse sheets.
- Large closed shapes, simple faces, clean outlines, and open interiors.
- Friendly peaceful characters.
- Calm symbolic staging for conflict pages: distance, courage, prayer, helpers, nature, and celebration.
- Keep any sling or stones small and non-dramatic.
- Paired colored reference images use `edit_image` from each approved black-and-white page and preserve composition, line art, border, text, and David's identity.

Likely visual risk:

- Image model may make Goliath scary, make the scene too battle-like, or add unwanted color.
- Image model may compress several story beats into one page if the prompt mentions the whole sequence.
- Generated in-image text may be misspelled, malformed, missing, or placed incorrectly.
- Image model may drift David's face, hair, clothing, age, or proportions if the approved character reference is not used.

Expected illustrator response:

- Generate each page as a separate image.
- Create and log `character-david` in `character-reference-index.md` before story-page generation.
- A page that becomes scary or violent is not ready.
- A page that combines multiple story pages into one image is not ready for the standard A4 story pack.
- When required caption text is absent, misspelled, or malformed inside the generated page image, correct it with `edit_image` or regeneration.
- A page where David no longer matches the approved reference is not ready.
- A colored reference that changes composition, text, or character identity is not ready.

## Child Experience Reviewer Dry Run

Blocking findings should include:

- graphic or implied impact scene
- Goliath drawn as frightening or monstrous
- David shown attacking in a way children might imitate
- any realistic, dramatic, manga, comic-battle, or adult-detail style drift
- tiny detailed battlefield clutter
- wrong or invented Bible quote
- misspelled text
- required caption missing from the generated page image
- missing David character reference when David appears across multiple pages
- David does not match the approved character reference sheet/model sheet
- unwanted color fill
- colored reference changes the black-and-white source composition, text, line art, or character identity
- multiple story scenes compressed into one generated page

Pass condition:

- The sheet communicates courage and trust without scary or violent imagery.
- Each full A4 page remains colorable for ages 5-8.
- David remains recognizably the same child-friendly character across all pages where he appears.
- Colored references are paired to the approved black-and-white pages and remain reference-only.
- The story sequence is understandable across the seven separate pages without relying on hidden explanation.

## Printable Pack Producer Dry Run

Expected package:

- seven-page A4 landscape PDF
- optional PNG exports
- separate colored reference PNGs, and optionally a colored reference PDF or contact sheet
- optional preview-only contact sheet
- one approved full-page image per A4 page inside safe margins
- page title or caption only when it is already inside the approved generated/edited image
- no clipping, no distorted panels, no unapproved visuals
- colored references are not placed into the black-and-white printable PDF

## Validation Result

The team structure is adequate for this example after adding explicit guardrails for conflict-heavy Bible stories and one-image-per-A4-page production.
The key decisions are:

- `story_activity_designer` must define the gentle adaptation before image production.
- `coloring_page_illustrator` must create the David character reference before story-page generation and generate each story beat as a separate full-page image.
- `child_experience_reviewer` must block scary or violent literal renderings, character drift, missing reference assets, colored-reference source changes, and any multi-panel compression.
