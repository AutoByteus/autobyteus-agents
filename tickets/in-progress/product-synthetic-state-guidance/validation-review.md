# Validation and focused review — synthetic-state guidance

Date: 2026-10-07. Scope: package text and packaging contracts only.
Worktree: `/Users/normy/autobyteus_org/autobyteus-agents-worktrees/refine-product-synthetic-state`.
Base: `36cf617b188bbd3209e6eb162ebc28d0fd6c3872` (`origin/main`).

## Commands and observed results

Run from the worktree:

```bash
python3 tickets/in-progress/product-synthetic-state-guidance/validate_package.py
# PASS: 5 standard skill validations, folder/frontmatter names/descriptions,
# 2 local Agent bindings, Team coordinator and 2 internal rooted routes,
# 3 shared-authority symlinks, 43 local links/anchors across 23 Markdown files,
# git diff --check.
git diff --check
git diff --stat
git diff -- agent-teams/product-team agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md
git grep -n -i -E 'kilobytes|megabytes|hand-written|hand-made|captured source' -- '*.md'
git grep -l -i -E '(source|baseline|report).*(refresh|stale)|(refresh|stale).*(source|baseline|report)' -- '*.md'
```

`validation.log` records the executable structural checks. The script calls the installed standard validator at `/Users/normy/.codex/skills/.system/skill-creator/scripts/quick_validate.py`. It also validates the unchanged exploratory skill because it consumes the shared principles, and the Creator skill whose anti-pattern reference changed. No JSON or runtime tool grant was changed.

## Before/after rationale

| Before | After | Boundary preserved |
| --- | --- | --- |
| Handwritten and kilobyte-sized were mandatory; megabytes/source-like counts asserted real copying | Provenance, local independence, deterministic reset, meaningful UI coverage/fidelity and proportional complexity determine fitness; size/method guide inspection | Only synthetic state, not customer content or production exports |
| Recorded/captured source responses were banned without distinguishing origin | Capture from wholly synthetic source-observation scenarios is valid; mixed/unknown origins need evidence | Real content replay or generator laundering remains prohibited |
| Report pin mismatch required refresh while initial routing discouraged all source inspection | Read accepted design history/current affected surface; targeted correction needs a verified gap or concrete missing evidence; explicit refresh remains an independent valid request | No broad reinventory for focused work; no silent pin change or unapproved design decision |
| Report/template and quality gates repeated the old cutoff | Gates point to the shared policy, recording inputs, inspection limits and evidence | Shared owner stays canonical; no second policy or new report system |
| Correction and refresh scopes could overlap implicitly | Correction uses affected behavior/dependencies; refresh retains explicit source-diff reconciliation and existing quick unchanged-surface pass | Initial bootstrap still covers its complete selected inventory |

## Requested example classifications — manual contract walk-through

These are semantic reviews of the composed instructions, not agent execution tests or UI certifications.

| Case | Classification from revised guidance | Result |
| --- | --- | --- |
| 1. Generated purely synthetic 5 MB multi-scenario state | Not an automatic defect. Check documented origin/inputs, local independence/reset, UI coverage/fidelity and proportional complexity. Repetition may motivate optional cleanup, not mandatory hand transcription. | Pass |
| 2. Tiny real customer response | Prohibited regardless of size or fixture label. Replace with synthetic content; not acceptable as deferred known data-boundary debt. | Pass |
| 3. Old baseline report plus later approved design commits | Does not prove stale UI. Read applicable accepted artifacts and current affected journey; record uncertainty if it remains. No automatic refresh or all-surface parity claim. | Pass |
| 4. Verified missing current-source interaction | Focused Correction with affected inventory ID/surface, evidence, expected behavior and exact/illustrative acceptance criterion. Recheck affected behavior/dependencies; do not commission unrelated refresh. | Pass |
| 5. Explicit user-requested source refresh | Refresh proceeds against selected pin without first proving a mismatch. Existing source-diff validation and accepted-design reconciliation policy still govern. | Pass |

## Additional boundary checks — manual

- Unknown snapshot inputs with one synthetic-looking sample: **unknown**, not proven copying and not collection-wide safe certification. Inspect input/scenario evidence; if needed data remains unsubstantiated, resolve that specific gap before acceptance.
- Generator fed a real customer response or mixed account data: **data-boundary failure**, not made synthetic by serialization or renaming.
- Confirmed purely synthetic fixture that cannot reset or hides a meaningful UI state: **functional/fidelity defect**, even if tiny; fix the actual issue, not its authoring method.
- Old report is given as the reason for an **explicit** user refresh: still valid refresh. Bootstrapper's guard addresses missing instruction/evidence, not the user's rationale for an explicit request.
- Accepted intentional design delta differs from current source: not automatically a defect; explicit refresh follows the existing reconciliation policy. Product/user/Solution/Bootstrapper decision boundaries are unchanged.
- Historically deferred DATA-001, without new provenance findings: history alone establishes neither current compliance nor failure. This update does not adjudicate the actual fixture set.

Review found and corrected two wording risks before completion: Bootstrapper's routing-question guard could have been read as overriding explicit refresh when old metadata was the rationale; source-diff/load-and-look guidance could have applied to focused corrections. It now distinguishes these cases explicitly.

## Consistency and anti-pattern detection

- Shared rule has one owner in `shared/product-design-principles.md`; both role skills point to it. Existing three symlinks remain unchanged and valid.
- All old mandatory handwritten/KB gates and unqualified captured-data bans in active Product guidance/template are reconciled. The remaining `megabytes` mention is a warning against false inference, not a threshold.
- Repository-wide tracked Markdown scan found no other active instance of this size/capture-as-provenance defect. Other source/staleness hits reviewed in article-researcher, article-writing style-workflow, Code Reviewer skill/template and promo Visual Director concern actual source/test quality, not automatic pin-driven baseline refresh. Historical `.codex/artifacts/` records were not rewritten as active policy. Follow-up instances of this defect: **none identified by this scan**.
- Creator anti-pattern #13 records the failure class/detection pattern required by the package-authoring workflow; no unrelated Creator routing/policy was changed.
- Scope/diff review: five Product files plus one Creator reference; no Agent/Team/Org config, production, UI-reference, fixture, requirements or unrelated dirty file changes. Only task analysis, repeatable structural checks/log, this review and result are added as evidence.
- No independent reviewer was launched: this is a focused text update; the containing authoring workflow does not require independent review. No claim of independent forward-testing.

## Limitations and repository state

- No browser runs, 72-snapshot audit, runtime registration/catalog verification, or live model behavior test. The guide change neither certifies the current UI nor resolves folder-picker requirements/approval.
- No held Bootstrapper message/resumption. Its previously delivered hold remains outside this update.
- Fetch at final review still yields `origin/main=36cf617b188bbd3209e6eb162ebc28d0fd6c3872`; canonical dirty status unchanged from intake. No push, merge, reset, checkout switch, or edits there.
- Local branch is the deliverable; publication/integration requires separate authorization. Workspace `.codex/skills` symlinks still point to the canonical checkout and will not expose this branch automatically. Retain the isolated worktree and ticket artifacts for integration/review.
