# Add North Star Marketing Organization

## Initial goal

Add a realistic marketing organization to the existing North Star organization in this repository. The marketing organization must include dedicated marketers for LinkedIn, X, and Facebook and should follow the repository's existing organization/team conventions.

## Initial scope

- Inspect the existing North Star and engineering organization definitions.
- Model a practical company marketing organization with clear leadership, coordination, and platform ownership.
- Add LinkedIn, X, and Facebook marketer roles with useful responsibilities and collaboration boundaries.
- Validate all added configuration and documentation using repository-supported checks.
- Keep changes limited to `autobyteus-agents`.

## Functional requirements

- **FR-1:** Northstar must expose marketing as a first-class nested department with an accountable department coordinator.
- **FR-2:** Northstar must include a marketing executive at the top-level leadership layer, consistent with its existing executive/department split.
- **FR-3:** The marketing department must include dedicated LinkedIn, X, and Facebook marketer agents.
- **FR-4:** The department must also cover the shared functions needed for a realistic B2B SaaS marketing organization: positioning/product marketing, brand/content, demand generation, and marketing operations/analytics.
- **FR-5:** Platform marketers must own channel-specific plans and execution while collaborating through shared company positioning, campaign objectives, content cadence, measurement, and approval boundaries.
- **FR-6:** Revenue and marketing ownership must be unambiguous: marketing owns brand, product marketing, demand generation, and social channels; revenue continues to own sales, customer success, partnerships, pipeline, retention, and expansion.
- **FR-7:** Every new team and agent definition must follow the repository's current folder, naming, frontmatter, runtime-config, and local-reference conventions.

## Acceptance criteria

- **AC-1:** `northstar-operating-company/team-config.json` includes valid local references for `cmo` and `marketing_org`.
- **AC-2:** `marketing-org/team-config.json` has `vp_marketing` as coordinator and references all seven specialist roles: product marketing, brand/content, demand generation, marketing operations/analytics, LinkedIn, X, and Facebook.
- **AC-3:** Each new role has a parseable `agent-config.json` and a concise `agent.md` defining ownership, collaboration expectations, realistic artifacts/metrics, and the fictional-company boundary.
- **AC-4:** The existing Demand Generation Lead is represented once, under marketing, and no stale root or revenue-team text routes general marketing work to `revenue_org`.
- **AC-5:** All JSON files parse, every local member reference resolves to the expected folder/config pair, and every coordinator is present in its team roster.
- **AC-6:** Targeted repository searches find the new platform route keys and find no conflicting marketing ownership in the CRO or revenue organization descriptions.

## Constraints and assumptions

- Northstar remains a fictional company simulation with no implied access to private data or social-platform accounts.
- The inferred reporting model is CMO at the executive layer, VP Marketing coordinating department execution, and specialist marketers collaborating as peers inside the nested team.
- Existing public paths may be adjusted only where needed to remove duplicate ownership; no cross-repository synchronization is in scope.
- No commit, push, merge, or deployment is requested.

## Validation expectations

- Parse every changed JSON file.
- Run an automated local-reference/coordinator consistency check across all Northstar team definitions.
- Inspect the full diff and search for stale marketing-to-revenue routing language.
