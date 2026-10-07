# Agent Package Analysis

- Status: `Completed`
- Operation: `analyze` (independent review of PR #33)
- Package type: `team` (Product Team), plus one Agent Package Creator anti-pattern entry
- Target package: `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/product-team/`; change under review https://github.com/AutoByteus/autobyteus-agents/pull/33 (branch `codex/refine-product-synthetic-state`, commits `6ce75c9`, `bba1c74`, `7a9f995`; based on current `origin/main`; fetched as `pr-33-review`).
- Scope included: every changed Product file and the anti-pattern entry; the PR's result and validation log; criteria: `package-design-principles.md` §4 (in priority order), `skill-authoring-principles.md` ("Ground and prioritize instructions", resources), and the detection checks of `package-anti-patterns.md` (1–13).
- Scope excluded: changes to the PR; UI references and fixtures in the design repository; runtime behavior.
- Request/reference: User, 2026-10-07: evaluate the open PR; re-done against the creator principles at the user's request (first pass used them only from memory).

## Baseline (`origin/main`)

| File | Current responsibility |
| --- | --- |
| `shared/product-design-principles.md` | "What a UI reference is": small hand-written fixtures; "a healthy data layer is measured in kilobytes. If fixtures or content files reach megabytes, or match the source's item counts, real data has been copied." Prohibits recorded/replayed/captured source responses. |
| `product-experience-design/SKILL.md` | Acceptance check "Size and provenance" (kilobytes, hand-written); Bootstrap Routing requests refresh "when an explicitly selected new source authority differs from the report"; anti-pattern "Accepting captured source data as 'fixtures'". |
| `ui-baseline-bootstrapper/SKILL.md` + report template | "Small hand-made synthetic fixtures"; never record, replay, or generate fixtures from source data; report asks for fixture sizes. |
| `product-design-repository-management/SKILL.md` | Correction and Refresh payload fields. |
| Creator `package-anti-patterns.md` | Entries 1–12. |

## Preserved behavior

- Real customer, account, and source content stays prohibited in UI references and baselines, including statically imported content and replay layers.
- No backend, production credentials, live dependencies, or production writes.
- UI-controlled values exact; domain values illustrative; refresh never silently tracks a moving branch.
- Routing, team config, and member boundaries unchanged.

## Findings

Ordered by the authoring-standard priority. Strengths are noted where a priority area has no defect.

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership | The provenance rule has one owner (shared principles, new section), but its distinctive content is restated: "synthetic-looking sample" (shared + Bootstrapper), "size is not a reason" (experience skill + Bootstrapper), "replay or generation" (shared + Bootstrapper). Anti-pattern 4. | `ui-baseline-bootstrapper/SKILL.md`, `product-experience-design/SKILL.md` | Two copies to keep in sync. | Keep the link plus only the role-specific action (Bootstrapper: record origin and inputs in the report; experience skill: inspect provenance before acceptance). |
| 2 | Content flow | Strength: correction/refresh scoping is stated before the Operating Sequence it modifies; Bootstrap Routing separates five reasons before routing. | — | — | None. |
| 3 | Grounding | Strength: replaces proxies (file size, an older report pin) with evidence (provenance, verified gap, explicit refresh instruction), consistently across all five files. Matches principle §4.3 and "Ground and prioritize instructions". | — | — | Keep. |
| 4 | Grounding (safeguard removed) | The experience skill's anti-pattern "Accepting captured source data as 'fixtures'" (recorded API responses, complete libraries, replay layers) is deleted; the list states "Each of these has happened before." §4.5 keeps "prohibitions that prevent plausible … failures"; skill-authoring keeps a prohibition that guards a plausible normal-path mistake. | `product-experience-design/SKILL.md` | A documented past failure loses its concrete warning; the general rule alone was not what agents recognized. | Restore it, narrowed to real source content, beside the new entry. |
| 5 | Clarity | The same rule has two names: "Synthetic-state provenance and proportionality" (5 uses) and "shared synthetic-state rule" (5 uses). §4.4: keep terminology stable. | Product files | Readers may look for two rules. | Use the section title (linked) everywhere. |
| 6 | Clarity (creator) | Anti-pattern 13 Detect lists this incident's words (`kilobytes`, `megabytes`, `hand-written`, …). The anti-pattern file asks for short, general entries. | `package-anti-patterns.md` | The check finds only this incident's wording. | "For every rule that blocks work or forces an action, name the evidence it requires; flag rules triggered by a proxy (size, age, method, naming, metadata) alone." |
| 7 | Economy | Bootstrap Routing's five sub-cases and the data-boundary check use long, heavily qualified sentences. | Product files | Slower to read; no behavior risk. | Optional tightening. |

Detection checks with no finding: 1 (no `delegate_task` bans added), 2 (no route changes), 3 (no other team's member names), 5 (no new identity), 6 (no project names or paths added), 7 (each of the six new report fields serves a stated rule; two are optional), 8, 9 (no external systems), 12 (no teammate recipients added). Process checks 10–11 apply to the author's workflow; the PR is based on current `main` and merges cleanly.

## Recommended or planned changes

Not applied. Before merge: findings 4 and 6. Recommended in the same pass: findings 1 and 5. Optional: 7.

## Open questions and approvals

- Applied on the PR branch (user, 2026-10-07): findings 1, 4 (as "should fix": the new entry partly covers it, but the concrete past forms are restored), 5, and 6. Finding 7 left optional. After the fixes: 4 Product skills and `agent-package-creation` valid; 0 broken links/anchors; the PR's `validate_package.py` passes (48 links in 23 files); one name for the rule; restated sentences removed.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Principles and anti-patterns read before judging | Yes (second pass) | `package-design-principles.md` §4, `skill-authoring-principles.md`, `package-anti-patterns.md` 1–13. |
| Detection checks on added lines | Run | `git diff origin/main...pr-33-review`, greps per check. |
| Based on current main / merge test | Yes / clean | `merge-base`, `git merge-tree`. |
| Skill validator | Pass | 4 Product skills, `agent-package-creation`. |
| PR's structural validation | Pass | `validation.log`. |
| Runtime behavior | Not tested | Guidance-only change. |

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: None
- Caller return: Yes; no rule matched.
