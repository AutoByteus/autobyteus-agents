# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `skill` (the Agent-bundled `product-experience-design`, the Product Team shared principles, and the lifecycle text in `product-design-repository-management` that they depend on)
- Target package: `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/product-team/`
- Scope included: `product-experience-design/SKILL.md`, `shared/product-design-principles.md`, `product-design-repository-management/SKILL.md` (preview-candidate lifecycle only), `shared/templates/product-ticket-template.md` (promotion fields only), `team.md`
- Scope excluded: the visualizer and Bootstrapper workflows (checked; they have no preview or promotion concept), routes, agent configs, and the design repositories' tickets
- Request/reference:
  - Round 1: message from `/product_team/product_ui_ux_designer` (ticket `task-run-resources-workspace-cleanup`, gaps G1–G6, edits 1–7).
  - Round 2: the user asked me to analyse and update after I said the round-1 edits mostly added text, while the failures broke rules that already existed.

## Baseline

| File | Current responsibility |
| --- | --- |
| `shared/product-design-principles.md` | Cross-mode invariants. Round 1 added the actor-caused-change rule and the legacy `prototypeReview` statement to §5. |
| `product-experience-design/SKILL.md` (570 lines after round 1) | Product-experience workflow. Its future-state design rules are spread across Design Proportionality (line 191), Design Evolution Rules (337), Implementation Principles (356), Validation (371), Quality Gate (418), and Anti-Patterns (465). Most of the first 190 lines cover baseline acceptance and the data boundary. |
| `product-design-repository-management/SKILL.md` | Repository lifecycle. Lines 21–23, 244, and 248–256 define "approved preview candidate" promotion; lines 282–283 record it. |
| `shared/templates/product-ticket-template.md` | Lines 29–30 record the promoted baseline revision and the promotion validation. |
| `team.md` | Summary of the shared principles (updated in round 1). |

## Preserved behavior

- Every trigger, mode choice, output, status, and handoff outcome.
- The baseline acceptance, data-boundary, and comparison rules.
- Integration to the default branch, followed by validation at the normal entry point.
- Invisible scenario selection for the starting state.
- Every requirement from round-1 edits 1–7.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership (root cause) | The rules the designer broke ("keep visible interactions real", reachable "without preview-only state") existed before round 1. "Keep visible interactions real" appears only in principles §5, not in the skill. "Without preview-only state" appears only in a gate item about end-of-ticket promotion, so it never applied during review. The design repo's own `README.md:45-47` already said `prototypeReview` URLs are historical, yet the ticket's `product-ticket.md:59` uses `?prototypeReview=task-run-cleanup`. | `product-experience-design/SKILL.md` | The rules that decide visible design quality are scattered and buried. Adding more text does not make them noticed. | Gather the future-state design rules into one short, numbered "Core Design Rules" section near the top. Point to it from the sequence, validation, gate, and anti-patterns instead of restating it. |
| 2 | Structure and ownership (contradiction) | SKILL steps 8 and 11, the Validation preview bullet, and the Quality Gate preview item, plus repository-management lines 248–256 and 282–283 and template lines 29–30, sanction an "approved preview candidate": a design reached through a preview URL or preview-only state during review, then promoted at the end. This is the formal form of the rejected `?prototypeReview=` pattern, and it contradicts the round-1 gate "the review URL is the normal entry point". The ticket worktree already isolates the change, so preview gating has no remaining purpose. | Repository management (lifecycle); `product-experience-design` (references); ticket template | Two skills contradict each other, and the older one invites the failure. | Remove the preview-candidate path. Keep the safeguard: after integration, the approved experience must work from the normal entry point; if it still needs preview-only state, the result is `Blocked`. |
| 3 | Economy | Round 1 states the visual-quality rule four times (Evolution, Validation, Gate, Anti-Patterns) and the actor rule three times. The four new anti-patterns restate the rules in full. | `product-experience-design/SKILL.md` | Longer skill (+49 lines); competing phrasings of one rule. | One statement in Core Design Rules. Validation keeps only the review procedure, the gate keeps one merged check, and each anti-pattern points to its rule. Merge "Design Proportionality" into the core rules. |
| 4 | Grounding (wording) | Round-1 examples "fade vs instant", "dashed, tinted, or boxed rows", and "set it on page X" come from one ticket. | `product-experience-design/SKILL.md` | A general skill carries ticket-specific detail. An earlier team cleanup (`tickets/in-progress/product-team-consistency`) removed this kind of wording. | Generalize them. Keep `prototypeReview`, because it names the real legacy pattern. |
| 5 | Flow | Operating Sequence steps 5 and 8 still say "production-quality visual finish" and "rather than relying only on a preview URL". | `product-experience-design/SKILL.md` | They don't connect to the new visual review, and step 8 implies preview URLs are normal. | Point step 5 to the visual design review; make step 8 the normal entry point only. |

## Recommended or planned changes

- `product-experience-design/SKILL.md`:
  - Add "Core Design Rules" (six numbered rules) after "What You Build", absorbing "Design Proportionality" and the round-1 rule text.
  - Shorten the round-1 additions in the Operating Sequence, Design Evolution Rules, and Implementation Principles to pointers.
  - Remove preview-candidate references from steps 8 and 11, Validation, and the Quality Gate.
  - Merge the round-1 gate items into existing items.
  - Make the four new anti-patterns one-line pointers.
- `product-design-repository-management/SKILL.md`: replace the preview-candidate promotion with post-integration validation at the normal entry point, and update its owned-state and result-contract lines.
- `shared/templates/product-ticket-template.md`: replace the two promotion fields with one default-entry-point validation field.
- `shared/product-design-principles.md` §8: drop "baseline promotion" from the lifecycle list.

## Open questions and approvals

- The user asked for the analysis and update. Removing the preview-candidate path follows from the approved round-1 rule ("the review URL is the normal entry point; no preview-only control"), so I treat it as within that approval.
- No active design ticket depends on a preview candidate. `autobyteus-web-design/tickets/in-progress` is empty, and the only active worktree that uses `prototypeReview` is the ticket the user rejected.
- No commit is authorized.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Preview and promotion references | Pass | `grep -iE "promot\|preview candidate\|preview-only"`: matches only in the two designer skills and the ticket template; none in the visualizer or Bootstrapper |
| Existing rule already present in the design repo | Pass | `autobyteus-web-design/README.md:45-47`; `task-run-resources-workspace-cleanup/.../product-ticket.md:59` |
| Active tickets depending on preview candidates | Pass | `tickets/in-progress` is empty in both design repos; the only worktree hit is the rejected ticket |

## Next action

Apply the planned changes.
