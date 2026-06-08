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
- Goal: encourage imagination, courage, trust in God, and child participation

## Expected Team Flow

1. `story_activity_designer` creates a source-grounded brief and storyboard.
2. User approves the seven-page A4 landscape plan before image production.
3. `coloring_page_illustrator` creates a style guide, prompt pack, image log, asset index, and seven candidate full-page line-art images.
4. `child_experience_reviewer` checks Bible/source handling, child safety, age fit, line clarity, one-image-per-page compliance, and coloring usability.
5. `printable_pack_producer` assembles only approved full-page images into a seven-page A4 landscape PDF and PNG exports.

## Story Activity Designer Dry Run

The team should not treat David and Goliath as a battle-action coloring sheet.
For ages 5-8, the approved story angle should be courage and trust, with non-graphic conflict handling.

Suggested seven-page storyboard:

| Page ID | Story Beat | Visual Scene | Activity / Imagination Invitation | Text Guidance |
| --- | --- | --- | --- | --- |
| page001 | David helps with sheep | David smiling with sheep on a hillside | Color the sheep and add flowers | Optional caption: `David cared for the sheep.` |
| page002 | David brings food and listens | David carrying a small bundle near friendly camp tents | Find and color three helpful things | Keep the camp peaceful |
| page003 | David hears about the big problem | David listens while people point toward a far-off tall figure | Circle one brave face | Avoid scary giant close-up |
| page004 | David remembers God helps him | David looking at a small harp or folded hands under a sunny sky | Draw something that reminds you God helps | Source theme, not direct quote |
| page005 | David chooses simple tools | David with a small bag and stones near a stream | Count and color five smooth stones | Keep sling non-threatening |
| page006 | David stands bravely | David in foreground, very distant simplified giant silhouette | Add rays of courage around David | No impact, no injury, no weapon focus |
| page007 | The people are thankful | David and community smiling peacefully | Color the celebration and add stars | Optional prompt: `What helps you be brave?` |

Source text discipline:

- Record `1 Samuel 17` as the story source.
- Do not quote exact Bible text unless the user supplies or approves translation and wording.
- If a verse is desired, the team should ask which translation and whether to use a short excerpt.

## Coloring Page Illustrator Dry Run

The prompt pack should constrain each page as:

- A4 landscape full-page printable coloring sheet.
- One full-page scene only for the current page id.
- No collage, grid, contact sheet, comic strip, thumbnail board, six-panel sheet, or seven-panel sheet.
- Cute black-and-white line art matching simplified children's coloring bookmarks and Bible verse sheets.
- Large closed shapes, simple faces, clean outlines, no gray shading, no filled color.
- Friendly non-frightening characters.
- No action violence, no injury, no impact scene, no scary giant, no dramatic comic style, no realistic battle illustration.
- Keep any sling or stones small and non-dramatic.

Likely visual risk:

- Image model may make Goliath scary, make the scene too battle-like, or add unwanted color.
- Image model may compress several story beats into one page if the prompt mentions the whole sequence.
- Text generation may misspell names or produce malformed letters.

Expected illustrator response:

- Generate each page as a separate image.
- Reject scary or violent candidates.
- Reject any generated candidate that combines multiple story pages into one image.
- Prefer no generated text inside images unless exact wording is critical.
- If text is needed, keep it outside image generation or route to printable layout.

## Child Experience Reviewer Dry Run

Blocking findings should include:

- graphic or implied impact scene
- Goliath drawn as frightening or monstrous
- David shown attacking in a way children might imitate
- any realistic, dramatic, manga, comic-battle, or adult-detail style drift
- tiny detailed battlefield clutter
- wrong or invented Bible quote
- misspelled text
- unwanted color fill
- multiple story scenes compressed into one generated page

Pass condition:

- The sheet communicates courage and trust without scary or violent imagery.
- Each full A4 page remains colorable for ages 5-8.
- The story sequence is understandable across the seven separate pages without relying on hidden explanation.

## Printable Pack Producer Dry Run

Expected package:

- seven-page A4 landscape PDF
- optional PNG exports
- optional preview-only contact sheet
- one approved full-page image per A4 page inside safe margins
- page title only if user approves text
- no clipping, no distorted panels, no unapproved visuals

## Validation Result

The team structure is adequate for this example after adding explicit guardrails for conflict-heavy Bible stories and one-image-per-A4-page production.
The key decisions are:

- `story_activity_designer` must define the gentle adaptation before image production.
- `coloring_page_illustrator` must generate each story beat as a separate full-page image.
- `child_experience_reviewer` must block scary or violent literal renderings and any multi-panel compression.
