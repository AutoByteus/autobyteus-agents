# Figures And The Page

When an article gets a figure, how figures are made, and how they read on a phone. The writer applies it and the reviewer judges by it.

## 1. Figures Are Structure

- **When an idea earns an image:** when following it requires the reader to hold several entities and how they move or relate at once (a roster of roles with a handoff, a package moving between parties, a before/after, a spatial or process layout, an object the reader has not seen). If the idea survives as one proposition the reader can hold, text is enough.
  - Earned: "Several specialists each own one stage, and the work passes from one to the next" (a roster and a handoff).
  - Not earned: "This tool is faster" (one proposition; an illustration only repeats it).
  - "The text already names the parts" is not a reason to skip an image; it is a reason to make the image non-redundant.
- **Where the trigger fires, decide:** `prose-only` (with the reason the reader needs no mental model), `image-led`, or `prose-and-image` (with what would be lost without either). Plan visuals from the reasoning flow, never append them, and place each where it clarifies the nearby section rather than interrupting it.
- **Each visual has a proposition, defined before its art direction:** the one nearby idea it makes concrete, the entities and relationships that must be visible, and a takeaway that survives without the caption. Reject a visual a generic illustration could replace without changing what the reader learns, unless it is intentionally a cover image; omit decorative images.
- **Visuals are claims.** No fake UI states, charts, architecture, screenshots, benchmarks, logos or source material; captions add no facts the understanding package does not hold.

## 2. Production

- **Production:** high-quality raster images. Use the built-in `image_gen__imagegen` tool first when the runtime has it, image-to-image editing when a real reference improves fidelity, and the configured `generate_image` when the first is unavailable or fails. An ordinary SVG diagram is not the default; an HTML-rendered or rasterized diagram is an explicit exception when it is clearly more truthful. Short exact labels are allowed when they help; inspect the final raster and regenerate any wrong, invented or unreadable text.

## 3. On Phones

Every platform is read mostly on phones. Treat text-bearing diagrams and comparison graphics as mobile content: a large source PNG does not stay readable merely because the platform scales it down.

- Before delivery, view each text-bearing visual at a narrow mobile article width, such as 360–390px (resize a copy with `run_bash`, then view it). Titles, card text, row labels, arrows, lifecycle annotations, and every accept/revision or success/failure path must be readable without zoom or horizontal scrolling.
- If the check fails, reduce the text, split wide matrices into separate portrait cards, and stack wide workflows into portrait panels. Keep the reading order explicit and provide nearby prose that carries the same essential meaning.
