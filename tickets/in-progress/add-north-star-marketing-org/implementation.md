# Implementation Notes

## Implemented structure

- Added `cmo` to the Northstar executive roster with an agent package that owns executive marketing strategy and delegates execution to `marketing_org`.
- Added `marketing_org` to the Northstar nested-team roster, coordinated by `vp_marketing`.
- Added shared-function roles for Product Marketing, Brand & Content, Demand Generation, and Marketing Operations & Analytics.
- Added dedicated LinkedIn, X, and Facebook marketer roles with channel-native ownership, relevant artifacts and measures, cross-functional inputs, data/account safeguards, and explicit approval gates for external actions.
- Moved the existing Demand Generation Lead package from Revenue to Marketing and added collaboration boundaries for the new team.
- Removed Demand Generation from the Revenue roster and narrowed Revenue/CRO documentation to sales, customer success, partnerships, pipeline, retention, and expansion.
- Updated Northstar operating-model and routing documentation with the new executive, department, and example platform route.

## Pattern choices

- New roles use the same lightweight runtime tool configuration as existing Northstar roles and intentionally attach no bundled skill, matching the current business-simulation convention.
- Agent prompts remain concise role contracts; team-wide coordination rules live in `marketing-org/team.md`.
- Member names use snake_case, filesystem references use kebab-case, and all references remain `team_local`.

## Local implementation checks

- Parsed every Northstar JSON file with `jq`: passed.
- Ran `git diff --check`: passed.
- Checked every Northstar coordinator is a roster member and every team-local agent/team reference resolves: passed.
- Asserted the Marketing roster matches the required eight roles: passed.
- Asserted Demand Generation exists exactly once and only under Marketing: passed.
- Searched for stale Revenue/CRO ownership statements; remaining marketing/revenue mentions describe intentional cross-functional coordination rather than duplicate ownership.

## Size and cleanup

- New prompts are small, single-role definitions consistent with the existing Northstar package size.
- The obsolete Revenue membership and old Demand Generation path were removed rather than retained as aliases or duplicate roles.
