# Visual Review Report

## Review Contract

- Product:
- Review version:
- Brief approval status:
- Script approval status:
- Voiceover package:
- Storyboard path:
- Visual source index:
- Visual asset plan:
- Visual asset production log:
- Review decision: pass / fixes required / blocked
- User visual approval status: pending / approved / changes requested / waived
- User approval summary:

## Visual Review

| Asset ID | Shot ID | Voiceover Clip ID | Clip Visual Order | Asset Path | Content Match | Decision | Finding | Required Fix |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- |
|  |  |  |  |  | matches spoken line and storyboard / mismatch | pass / fix required / reject |  |  |

## Visual Director Self-Check QA

- Production log contains per-image self-check decisions:
- Any candidate marked `needs edit`, `rejected`, or `blocked`:
- Any candidate missing visual-director self-check evidence:
- Required fixes:

## Approved Still / Hold Frame Manifest

This table is the approved-only visual package for `promo_video_producer`.
Only list assets that passed internal review and user visual approval.

| Approved Asset ID | Asset Type | Asset Path | Shot ID | Voiceover Clip ID | Clip Visual Order | Beat ID | Matched Spoken Line / Intent | Product/UI Moment Shown | Intended Dwell / Placement | Approved Motion Use | Source Index Entry | User Approval Status | Notes |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
|  | still frame / hold frame / hero frame / UI card / UI composite / non-text highlight frame |  |  |  | 1 |  |  |  | opening hold / first third / middle / final emphasis / CTA dwell | hold / zoom / pan / floating card / transition input / CTA dwell |  | approved / waived |  |

## Multi-Visual Voiceover QA

- Voiceover clips using multiple approved visuals:
- Visual order follows spoken logic:
- Transitions between visuals preserve comprehension:
- Redundant or misleading frames:
- Required fixes:

## Visual Source Index QA

- Index present and current:
- Candidate assets have index entries:
- Source / seed lineage recorded:
- User-provided screenshots preserved as source entries:
- Generated or edited derivatives linked to source entries:
- Missing visual needs recorded:
- Required fixes:

## Callout And Highlight QA

- Rectangles placed correctly:
- Arrows point to intended targets:
- Rings / highlights match the feature being described:
- Crop or zoom preserves context:
- Problem assets:

## No Added Text QA

- Added explanatory or marketing text overlays present:
- Product UI text already carrying the concept:
- Explicit user/legal requirement for any added text:
- Added text repeating or competing with narration:
- Added text covering important UI:
- Required fixes:

## Truthfulness QA

- Unsupported UI/state changes:
- Unsupported product capabilities:
- Same-style supported use-case basis:
- Product UI base/reference image used:
- Prompt-only UI generation exception reason:
- Final still assets are `generate_image` / `edit_image` outputs:
- Raw user screenshots used directly as final still assets:
- Same-style visuals clearly not presented as exact user-provided screenshots or recording frames unless exact:
- Python/PIL-only or script-only final promo composites:
- UI/text drift:
- Sensitive-data concerns:
- Conceptual assets clearly separated from real UI:

## Readability And Format QA

- Aspect ratio / resolution:
- UI readability:
- Product UI text readability:
- Caption-safe space when captions are in scope:
- Color and brand consistency:

## Routing Decision

- Next specialist:
- Visuals approved for video production:
- Visuals requiring `Visual Fix`:
- Upstream issues requiring promo director review:
- Open non-blocking risks:

## User Visual Review

- Presented visual paths:
- User decision:
- User feedback:
- Changes requested:
- Routed to:
- Final user approval summary:
