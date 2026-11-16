# Figures And The Page

## 1. Figures Are Structure

- **When an idea earns an image:** when following it requires the reader to hold several entities and how they move or relate at once (a roster of roles with a handoff, a package moving between parties, a before/after, a spatial or process layout, an object the reader has not seen). If the idea survives as one proposition the reader can hold, text is enough.
  - Earned: "Several specialists each own one stage, and the work passes from one to the next" (a roster and a handoff).
  - Not earned: "This tool is faster" (one proposition; an illustration only repeats it).
  - "The text already names the parts" is not a reason to skip an image; it is a reason to make the image non-redundant.
- **Where the trigger fires, decide:** `prose-only` (with the reason the reader needs no mental model), `image-led`, or `prose-and-image` (with what would be lost without either). Plan visuals from the reasoning flow, never append them, and place each where it clarifies the nearby section rather than interrupting it.
- **Each visual has a proposition, defined before its art direction:** the one nearby idea it makes concrete, the entities and relationships that must be visible, and a takeaway that survives without the caption. Reject a visual a generic illustration could replace without changing what the reader learns, unless it is intentionally a cover image; omit decorative images.
- **Visuals are claims.** No fake UI states, charts, architecture, screenshots, benchmarks, logos or source material; captions add no facts the understanding package does not hold.

## 2. Production And Motion

- **Production:** draw diagrams (structure, flow, roles and handoffs, comparisons, charts) as code, in HTML, CSS or SVG, so every box, arrow and label is exact; in a Markdown article, render each to a PNG. Make illustrations and covers with an image model: the built-in `image_gen__imagegen` tool first when the runtime has it, image-to-image editing when a real reference improves fidelity, and the configured `generate_image` when the first is unavailable or fails; never a diagram whose parts are claims. Inspect the final page or raster and fix any wrong, invented or unreadable text.
- **Motion** only where the idea moves (work handed on, a sequence, a build-up). It starts when the figure scrolls into view, and the writer watches it from start to end before anyone sees it.

## 3. The Page

The page serves reading:

- body text of at least 16 px, one type scale, and text in figures as legible as the body at phone width;
- colour only where it carries meaning, used the same way throughout;
- the important things stand out in the text's flow (a highlighted statement, a large number, a figure); a box styled as a side note (tinted, with a border on one side) reads as something to skip, so never put the main point in one;
- fewer, larger elements: a figure or a highlight where it carries an idea, not on every paragraph;
- the style decides the rest ([the styles](styles/index.md), "The page").

## 4. On Phones

Every platform is read mostly on phones. Treat text-bearing diagrams and comparison graphics as mobile content: a large source PNG does not stay readable merely because the platform scales it down.

- Before delivery, view each text-bearing visual at a narrow mobile article width, such as 360–390px: a web project's page in the browser at phone width, a raster by resizing a copy with `run_bash` and viewing it. Titles, card text, row labels, arrows, lifecycle annotations, and every accept/revision or success/failure path must be readable without zoom or horizontal scrolling.
- If the check fails, reduce the text, split wide matrices into separate portrait cards, and stack wide workflows into portrait panels, keeping every relation the figure shows (arrows back as well as forward). Keep the reading order explicit and provide nearby prose that carries the same essential meaning.
