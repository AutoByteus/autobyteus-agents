# Visual Source Index

## Index Contract

- Product:
- Project folder:
- Index version:
- Last updated:
- Owner: visual_director
- Source asset inventory:
- Visual asset production log:
- Current visual package version:
- Status: active / superseded / archived

## How To Use This Index

- Treat this file as the source of truth for available visual resources.
- Update it before planning a new visual version, after the user provides new screenshots or files, and immediately after every generated or edited visual output.
- Use stable asset ids. Do not reuse an id for a different image or frame.
- Link every generated or edited output to its source, seed, or reference asset ids.
- Check this index before asking the user for another screenshot or deciding that a visual source is missing.

## Source / Seed / Reference Assets

| Asset ID | Type | Path / URL | Origin | Dimensions / Duration | UI Area / Product State | What It Shows | Sensitive Data / Redaction | Reuse Potential | Related Shot IDs | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| src001 | screenshot / recording / frame / logo / brand asset / document image / other |  | user supplied / discovered / prior package / generated / edited |  |  |  | none / redaction needed / redacted / avoid | seed for edit / reference only / motion bridge / not usable / needs review |  | active / superseded / rejected / approved source |  |

## Generated / Edited / Derived Assets

| Asset ID | Source / Seed Asset IDs | Output Path | Route | Tool | What Changed | Preserved Invariants | Related Shot IDs | Visual Director Self-Check | Review Status | Final Use Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| img001 | src001 |  | source-based edit / generated conceptual support / same-style supported use case / non-text highlight frame / polished hold frame | generate_image / edit_image |  | UI layout, labels, product state, claim-relevant values |  | candidate passed self-check / needs edit / rejected / blocked | not reviewed / needs fix / passed internal review / user approved / rejected | candidate / approved final / rejected / source for later derivative |  |

## Approved Final Asset Cross-Reference

This section mirrors the approved final visual assets for resource memory.
The authoritative approved still / hold frame manifest for `promo_video_producer` is in `visual-review-report.md`.
Do not list candidates, rejected assets, or unreviewed generated images here.
Do not use this section as a substitute for user approval recorded in `visual-review-report.md`.

| Approved Asset ID | Asset Type | Output Path | Shot ID | Voiceover Clip ID | Clip Visual Order | Beat ID | Matched Spoken Line / Intent | Product/UI Moment Shown | Intended Dwell / Placement | Planned Use | Review Report Decision | User Approval Status | Notes |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| img001 | still frame / hold frame / hero frame / UI card / UI composite / non-text highlight frame |  |  |  | 1 |  |  |  | opening hold / first third / middle / final emphasis / CTA dwell | hold / zoom / pan / floating card / transition input / CTA dwell | passed internal review | user approved |  |

## Missing / Requested Visuals

| Need ID | Needed For Shot IDs | Product Area / State Needed | Why Needed | Closest Existing Asset ID | User Request Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| need001 |  |  |  |  | not requested / requested / supplied / no longer needed |  |

## Version Notes

| Version | Date | Change Summary | Added Asset IDs | Superseded Asset IDs | Notes |
| --- | --- | --- | --- | --- | --- |
| v1 |  | initial index |  |  |  |
