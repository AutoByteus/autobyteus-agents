# Investigation Notes

## Goal and boundary

Understand how the fictional Northstar Operating Company models executives, nested departments, agent roles, and runtime wiring so a marketing organization can be added without overlapping the existing revenue organization. The investigation is limited to `autobyteus-agents`.

## Sources consulted

- Repository guidance: `AGENTS.md`.
- Authoring and team-model conventions: `README.md`, especially the `agent-config.json`, `team.md`, `team-config.json`, team-modeling, and sanity-check sections.
- Northstar root definitions: `agent-teams/northstar-operating-company/team-config.json` and `team.md`.
- Existing nested department patterns: engineering and revenue `team-config.json` and `team.md` files.
- Existing role patterns: VP Engineering, Demand Generation Lead, and CRO `agent-config.json` and `agent.md` files.
- Full Northstar role and ownership inventory from all existing `agent.md` files.
- Git history for the Northstar introduction commit (`7de76f8`).
- Repository scans using `find` and `rg` for Northstar, marketing, configuration fields, validation scripts, and nested instructions.

## Current model

- The root `northstar-operating-company` team is coordinated by `ceo` and contains eight executive agents plus five nested department teams.
- Every nested department has a VP coordinator and four specialist roles. Executives and nested department VPs are modeled separately; for example, `cto` represents executive technology strategy while `engineering_org/vp_engineering` coordinates departmental execution.
- Each agent package contains a 19-line runtime `agent-config.json` and a concise `agent.md` with role identity, ownership, working behavior, and response style. Northstar agents currently have no attached skills.
- Team references are local and route through snake_case `memberName` values to kebab-case agent/team folders.
- There is no dedicated automated test suite in the repository. Appropriate validation is JSON parsing, reference resolution, roster/coordinator consistency, structural comparison, and targeted searches for stale routing text.

## Marketing overlap found

- The current `revenue_org` is coordinated by `vp_sales` but also claims marketing and campaign execution.
- `revenue_org/demand_generation_lead` owns campaign strategy and marketing-funnel quality.
- The root `cro` prompt tells the CRO to delegate sales, marketing, customer success, and partnership work to `revenue_org`.
- Adding a parallel marketing department without changing those definitions would create two owners for marketing work.

## Design implications

- Add a `cmo` executive peer and a nested `marketing_org`, following the existing executive/department split.
- Give the marketing department enough real-company coverage to coordinate the requested platform specialists: VP Marketing, Product Marketing Lead, Brand & Content Lead, Demand Generation Lead, Marketing Operations & Analytics Lead, LinkedIn Marketer, X Marketer, and Facebook Marketer.
- Move the existing Demand Generation Lead from `revenue_org` into `marketing_org` instead of duplicating it.
- Narrow `revenue_org` and the CRO routing language to sales, customer success, partnerships, pipeline, retention, and expansion.
- Keep social-platform roles accountable for channel-specific strategy and execution while requiring coordination on shared positioning, editorial calendar, campaign goals, measurement, approvals, and handoffs.

## Constraints and unknowns

- Northstar is explicitly fictional; all new roles must preserve that boundary and state assumptions when company facts are missing.
- No external platform credentials or real company data are implied. The roles plan and produce business artifacts using configured tools.
- The user did not prescribe a reporting structure beyond the three platform marketers. The existing Northstar convention supports the inferred CMO -> VP Marketing -> specialist department structure.
- No long-lived documentation outside the Northstar team files appears to enumerate its exact member roster.
