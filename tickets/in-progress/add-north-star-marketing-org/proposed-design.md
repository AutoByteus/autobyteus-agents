# Proposed Design

## Decision

Model marketing as a first-class Northstar department parallel to engineering, product, revenue, operations, and finance/people. Add a CMO to the executive team, use VP Marketing as the nested department coordinator, and place shared marketing capabilities plus the three requested social-platform specialists inside `marketing-org`.

## Operating spines

| Spine | Scope | Start | End | Owner | Why it matters |
|---|---|---|---|---|---|
| Marketing strategy | Primary end-to-end | Company request | Prioritized marketing direction | CMO | Keeps positioning, investment, and company-level tradeoffs at the executive boundary. |
| Marketing execution | Primary end-to-end | Approved marketing goal | Channel/campaign artifact with metrics | Marketing Org / VP Marketing | Converts strategy into coordinated specialist work without routing through Sales. |
| Cross-functional GTM | Secondary | Marketing plan | Sales/product/customer handoff | CMO, CRO, CPO and their departments | Makes interfaces explicit while preserving department ownership. |
| Specialist synthesis | Return | Platform/specialist findings | VP Marketing recommendation | Marketing Org / VP Marketing | Produces one coherent department answer instead of disconnected channel outputs. |

Representative execution path:

`user/company request -> CEO or CMO -> marketing_org -> vp_marketing -> relevant shared-function and channel specialists -> coordinated plan/deliverable -> executive or cross-functional handoff`

## Ownership model

- `cmo`: company-level marketing strategy, positioning, brand investment, market narrative, and executive tradeoffs.
- `vp_marketing`: department goals, budget allocation, integrated planning, staffing, operating cadence, and specialist coordination.
- `product_marketing_lead`: ICP/persona insight, positioning, messaging, launches, sales enablement, and competitive narrative.
- `brand_content_lead`: brand system, editorial strategy, content portfolio, creative briefs, and voice consistency.
- `demand_generation_lead`: acquisition campaigns, offers, lead generation, conversion paths, and funnel quality.
- `marketing_operations_analytics_lead`: planning operations, campaign taxonomy, attribution, dashboards, automation requirements, and data quality.
- `linkedin_marketer`: professional-audience strategy, company/executive presence, organic/paid programs, and qualified engagement on LinkedIn.
- `x_marketer`: real-time conversation, thought leadership, launch/community amplification, and response strategy on X.
- `facebook_marketer`: page/community strategy, paid audience programs, retargeting, and Facebook-specific creative/performance learning.
- `revenue_org`: sales, customer success, partnerships, pipeline, retention, and expansion; it consumes marketing-qualified demand but does not own the marketing department.

## Structural mapping

### Add

- Root executive package: `agents/cmo/{agent.md,agent-config.json}`.
- Nested department: `agent-teams/marketing-org/{team.md,team-config.json}`.
- Marketing agents for VP Marketing, Product Marketing, Brand & Content, Marketing Operations & Analytics, LinkedIn, X, and Facebook.

### Move

- Move `agent-teams/revenue-org/agents/demand-generation-lead` intact to `agent-teams/marketing-org/agents/demand-generation-lead`, then update its collaboration language only if needed.

### Modify

- Add `cmo` and `marketing_org` to the Northstar root roster and routing documentation.
- Narrow `revenue-org/team-config.json` and `team.md` to remove Demand Generation and general marketing ownership.
- Update `agents/cro/agent.md` so it delegates sales, customer success, and partnership execution to Revenue and coordinates with the CMO/Marketing Org for marketing.

### Remove

- Remove the old Demand Generation membership/path under Revenue through the clean move.
- Remove stale statements that general marketing execution belongs to Revenue.

## Collaboration boundaries

- Platform specialists do not independently redefine company positioning, brand voice, campaign goals, or metric definitions.
- Product Marketing and Brand & Content provide shared message/creative inputs; Demand Generation provides funnel/campaign context; Marketing Operations & Analytics provides tracking and evaluation standards.
- Each platform specialist adapts those inputs to its channel, owns channel recommendations and outputs, and returns learnings to VP Marketing.
- Pricing, company positioning, major budget shifts, and cross-functional priority conflicts escalate through CMO/CEO; sales pipeline execution remains with CRO/Revenue.

## Validation design

- Parse all repository JSON.
- Walk every Northstar `team-config.json`; assert coordinator membership and resolution of each `team_local` agent/team reference to the correct folder and config.
- Assert the Marketing roster exactly includes the coordinator and seven named specialists.
- Search for Demand Generation under Revenue and stale phrases that route marketing to `revenue_org`.
- Review the diff for consistent frontmatter, tool wiring, naming, ownership, and fictional-company safeguards.
