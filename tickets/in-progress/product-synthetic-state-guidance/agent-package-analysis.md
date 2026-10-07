# Agent Package Analysis

- Status: `Completed` (pre-edit analysis; planned update follows)
- Operation: `update`
- Package type: `team`
- Target package: Product Team, `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/product-team`
- Scope included: shared synthetic-state principles, Product acceptance/routing, Bootstrapper data/correction guidance, affected report template and fixed request payload; one Creator anti-pattern entry required by the authoring workflow.
- Scope excluded: UI-reference files/fixtures, production software, requirements, folder-picker implementation/approval, held Bootstrapper resumption, Team/Org topology and runtime wiring, other repositories.
- Request/reference: 2026-10-07 delegation from `/product_team/product_ui_ux_designer`, run `product_ui_ux_designer_f1b47b534b5e4da49ef50e43e23fbef3`; `/Users/normy/autobyteus_org/autobyteus-web-design-worktrees/restore-native-workspace-folder-picker/tickets/in-progress/restore-native-workspace-folder-picker/skill-wording-refinement-request.md`.

## Baseline

Owning repository: `/Users/normy/autobyteus_org/autobyteus-agents`.
Fetched `origin/main` and local `main` both resolve to `36cf617b188bbd3209e6eb162ebc28d0fd6c3872`.
Canonical checkout has unrelated dirty/untracked work; left untouched.
Dedicated worktree: `/Users/normy/autobyteus_org/autobyteus-agents-worktrees/refine-product-synthetic-state`, branch `codex/refine-product-synthetic-state`, created from fetched `origin/main`.
Artifacts use this repository's `tickets/in-progress/` convention; this is not a Product design ticket.

Paths below are relative to `agent-teams/product-team/`, except the Creator reference.

| File | Current responsibility |
| --- | --- |
| `shared/product-design-principles.md` | Canonical fidelity, synthetic data, refresh authority and role boundaries; consumed by three skill symlinks |
| `agents/product-ui-ux-designer/skills/product-experience-design/SKILL.md` | Existing-product intake, baseline acceptance/correction/refresh, future-state design and user review |
| `agents/ui-baseline-bootstrapper/skills/ui-baseline-bootstrapper/SKILL.md` | Independent current-state reproduction and evidence; no future-state decisions |
| `agents/ui-baseline-bootstrapper/skills/ui-baseline-bootstrapper/templates/ui-baseline-report-template.md` | Current-state provenance, evidence and completion checks |
| `agents/product-ui-ux-designer/skills/product-design-repository-management/SKILL.md` | Product repository/worktree lifecycle and fixed Bootstrapper payload; not the owner of refresh decisions |
| `team.md`, `team-config.json`, both Agent definitions/configs | Roles, attachments, coordinator, conditional `Baseline Needed` and bootstrap-result routes; unchanged |
| Product Experience templates and exploratory skill references (wording scan) | Design evidence and common-principles consumers; no second synthetic-state owner needed |
| `agents/agent-package-creator/skills/agent-package-creation/references/package-anti-patterns.md` (repo-relative) | Creator mistake detection; add evidence-versus-heuristic failure class |

## Preserved behavior

- Code-first, high UI/interaction fidelity with low implementation complexity; local scripted state instead of backend/service replicas.
- Exact UI-controlled copy and meaningful states, illustrative domain values; no customer/account data, real content dumps, credentials, live production services or writes.
- Product owns baseline acceptance and future-state review; user approves future behavior; Solution Designer owns canonical requirements; Bootstrapper reproduces current experience only.
- Initial bootstrap still substantiates its complete selected distinct inventory. An explicitly requested refresh still pins and reconciles the selected source; accepted design-only changes remain protected under existing policy.
- Existing lifecycle, outcomes, routes, attachments, ticket identity and held-work status remain unchanged.

## Findings

| # | Priority area | Evidence at base | Owner | Impact | Planned change |
| --- | --- | --- | --- | --- | --- |
| 1 | Grounding | Shared principles:65–95, 151–153, 304–308 equate capture/size with copied real content | Shared principles | Misclassifies generated synthetic snapshots; mandates needless re-authoring | Judge provenance, local independence, determinism/reset, meaningful UI coverage/fidelity, proportional complexity; size only prompts inspection |
| 2 | Flow/grounding | Product skill:231–298 prohibits source inspection at intake but demands refresh if new authority differs from report | Product skill | Metadata difference becomes unsupported UI-failure conclusion and broad work request | Distinguish explicit refresh, verified correction, unverified currency and optional cleanup; allow bounded inspection of affected surfaces and accepted design history |
| 3 | Consistency | Product skill:63–74, 281–287, 438–442, 489–500; Bootstrapper:106–121, 271–274; report template:91–92, 135–136 | Respective skills/template | Shared fix alone leaves contradictory gates active | Replace repeated thresholds/prohibitions with shared-rule pointers and role-specific evidence checks |
| 4 | Precision | Repository-management payload:161–165; Bootstrapper mode inputs:85–93 | Fixed payload and Bootstrapper skill | Correction lacks concise observed evidence; uncertain provenance can be mislabeled confirmed violation | Carry evidence or specific missing substantiation in existing correction fields; explicit refresh instruction in existing Action field, not a new artifact bureaucracy |
| 5 | Creator prevention | Existing anti-patterns cover grounding generically, not promotion of proxy signals into factual findings | Creator anti-pattern reference | Same error can recur elsewhere | Add compact incident/positive route/detection entry and scan repository for other active instances |

## Planned changes

Modify the five Product files above; preserve lifecycle mechanics and all configuration. Add one Creator anti-pattern entry. Keep the shared file the sole detailed synthetic-state policy; other occurrences point to it. Report template records method/provenance, inspected scope/limits and size only when useful. No new Product artifact or comprehensive re-audit gate.

## Open questions and approvals

- No unresolved semantic decision: requested distinctions and preserved boundaries are explicit.
- Delegated completion asks for a committed revision/integration state; use a local scoped commit. No authorization to push/publish or alter dirty canonical checkout: integration remains pending explicit authorization, not implied by Product's separate design-repository lifecycle.
- Reported 72 snapshots and sampled synthetic records are motivating evidence, not a full audit or parity certification. Read the baseline report's synthetic observation/capture description only; no fixture modifications or UI runs.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Repository currency/isolation | Pass | `git fetch origin`; `git rev-parse HEAD origin/main`; `git worktree list`; clean new worktree at fetched base |
| Read applicable instructions and authoring standard | Pass | Root AGENTS.md, Creator skill/references/templates, skill-creator; source workspace DESIGN.md/TESTING.md; no package-level AGENTS.md under owning repo |
| Baseline skill syntax | Pass | `python3 /Users/normy/.codex/skills/.system/skill-creator/scripts/quick_validate.py agent-teams/product-team/agents/product-ui-ux-designer/skills/product-experience-design` → `Skill is valid!` |
| Contradictory wording detection | Confirmed | `rg -n -i 'kilobytes|megabytes|hand-written|hand-made|captured source|source authority differs|moving branch' agent-teams/product-team agents/agent-package-creator` found claims listed above |
| Shared owner and routing read | Pass | Three principle symlinks resolve to one shared file; Product/Bootstrapper skillNames and Team routes inspected; no wiring changes needed |
| Incident factual scope | Limited | Baseline report describes re-captured synthetic snapshots and no production writes; request says only samples inspected. Neither establishes all-current parity or complete safe provenance |
| Runtime/catalog/UI certification | Not run | Guidance-only update; no new tool, role or catalog dependency; no permission to resume held work or certify UI reference |

## Next action

Apply focused guidance changes in isolated worktree, validate structure and consistency, manually classify the five requested cases plus unknown/mixed-provenance cases, persist result, commit locally and route back to assigning execution. Do not resume Bootstrapper or integrate/publish without authorization.
