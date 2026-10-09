# Agent Package Analysis

- Status: `Completed`
- Operation: `analyze`
- Package type: `team` (Marketing Team)
- Target package: `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/marketing-team/` at `origin/main` `4b1ffa4`
- Scope included: team config and members; Content Creator skill and tools; every research-capable agent in the repository.
- Scope excluded: changes to any file.
- Request/reference: User, 2026-10-09: posts comparing our product with the best products on the market need deep, evidence-based product research; today the Content Creator does it. Is there a role for it?
- Criteria applied: `package-design-principles.md` §1 (add a role only for a distinct decision, output, or lifecycle), §2, §3, §4 (grounding); anti-patterns 3, 12, 14.

## Answer

No role owns it. The Marketing Team has a Content Creator (entry point, drafts, approvals, publishing records), a Performance Analyst (numbers of our own posts), and the shared Computer Use Operator (website actions). Deep product and market research falls to the Content Creator, which has no `search_web` tool and no research procedure. No agent elsewhere in the repository fits: the research agents there serve their own team's output.

## Baseline

| File | Relevant current behavior |
| --- | --- |
| `team-config.json` | Members: `marketing_content_creator` (coordinator), `marketing_performance_analyst`, `computer_use_operator`. |
| `marketing-content-creator/agent-config.json` | Tools include `read_url`; no `search_web`. |
| `marketing-content-creation/SKILL.md` | "Never invent claims, metrics…" (line 88); research only as site data collected by the Operator (line 113); `positioning/<product>.md` holds "approved product facts"; product claims go out as `Claim Review Needed` (line 143). Nothing covers competitors or market comparison. |
| Repository research agents | Deep Researcher (deck handoff), Research Engineer (papers, implementation), Promo Director (positioning inside promo videos), STORM Team and Article Writer (long articles). |

## Preserved behavior

- The Content Creator stays the entry point and owns drafts, approvals, the style library, and published records.
- Product claims about our own product still go through `Claim Review Needed`.
- The Operator stays the only member that operates websites.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership (missing behavior) | No member owns market and competitor research; the Content Creator lacks `search_web` and a procedure. | Team topology | Comparison posts rest on whatever the writer finds while drafting; truthfulness depends on the writer checking itself. | Add a team-local **Market Researcher**. Distinct output (a sourced research brief and reusable competitor profiles), distinct lifecycle (profiles reused across posts and refreshed when stale), and an independent check on the writer. |
| 2 | Grounding (missing behavior) | Comparison claims ("faster than X", "the only tool that…") need dated, sourced evidence; market facts go stale. | New skill | Unsourced or outdated comparisons. | Every claim has a source and a date; separate verified fact, vendor claim, and opinion; compare like for like (same plan, version, date); mark claims that cannot be verified. |
| 3 | Content flow | Some product pages need sign-in or a trial. | Team config | The researcher cannot reach them. | Researcher asks the Operator for browser work (`Requested by: Market Researcher`), like the Performance Analyst. |

## Recommended changes

Not applied; they need an `update` request.

- New `agents/market-researcher/` (team-local): `agent.md`; `agent-config.json` (`read_file`, `write_file`, `edit_file`, `run_bash`, `search_web`, `read_url`, `read_media_file`, `get_handoff_rules`, `send_message_to`); bundled skill `market-research`:
  - Input: `research-request.md` from the Content Creator (question, products to compare, audience, the claims the post wants to make).
  - Work: find the strongest products in the category; collect facts from primary sources (official docs, pricing, changelogs, benchmarks with method); reuse and refresh `marketing-research/competitors/<product>.md` profiles; build a comparison for the question.
  - Output: `research-brief.md`: answer, comparison table, a claims check (each claim the post wants to make: supported / not supported / needs our product's confirmation, with source and date), open gaps.
  - Rules: no claim without a source and date; vendor marketing is labelled as a vendor claim; facts about our own product come from the positioning file or `Claim Review Needed`, never guessed.
- `team-config.json`: add the member; routes Creator → Researcher (research request), Researcher → Creator (brief), Researcher ↔ Operator (`Requested by` lines).
- Content Creator skill: request research for comparison or market claims and draft only from the brief's supported claims; `team.md` and README: one line each.

## Open questions and approvals

1. Approve adding the Market Researcher (name open: "Market Researcher" or "Product Researcher")?
2. Should our own product's facts in comparisons always go through `Claim Review Needed` (Solution Designer, when in the Org), or may the researcher read our public docs and site like any other product?

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Team roster and tools | Read | `team-config.json`, `agent-config.json`. |
| Research agents elsewhere | 14 found, none fits | Names, descriptions, tools of agents mentioning research. |

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: None
- Caller return: Yes; no rule matched.
