# Executable Validation

## Validation boundary

Northstar teams are static import definitions in this repository; the repository does not include an AutoByteus runtime or an import test harness. The meaningful executable boundary available here is the complete definition package: parseability, team wiring, route resolution, role-contract structure, and clean ownership migration. No additional UI, API, process, or browser scenario is available or needed for this configuration-only change.

## Scenarios and results

| Scenario | Acceptance criteria | Mode | Expected outcome | Result |
|---|---|---|---|---|
| Repository JSON parse | AC-3, AC-5 | `find` + `jq empty` over every repository JSON file | Every JSON file parses | Passed |
| Northstar reference resolution | AC-1, AC-5 | Shell walk over every Northstar `team-config.json` | Each coordinator is a member; every `team_local` agent/team reference resolves to its config and documentation pair | Passed |
| Root marketing routes | AC-1 | Exact `jq` assertions | `cmo` and `marketing_org` have the correct refs, types, and local scope | Passed |
| Marketing roster | AC-2 | Exact sorted-member assertion | Coordinator is `vp_marketing`; roster contains exactly VP Marketing plus seven required specialists | Passed |
| Role package contracts | AC-3 | Loop over CMO and all Marketing roles using `jq` and heading/frontmatter searches | Standard runtime tools, explicit empty skills, business-simulation identity, ownership, working contract, and response style are present | Passed |
| Demand Generation migration | AC-4 | Filesystem count plus Revenue/Marketing config assertions | One package exists, only under Marketing, with no Revenue membership | Passed |
| Routing cleanup | AC-4, AC-6 | Positive and negative targeted searches | New CMO/Marketing routes exist; stale phrases assigning marketing to Revenue are absent | Passed |
| Formatting hygiene | AC-5 | `git diff --check` plus trailing-whitespace search | No whitespace errors | Passed |

## Evidence summary

All scenarios passed on 2026-07-11 in the isolated `codex/add-north-star-marketing-org` worktree. No temporary validation files or runtime scaffolding were created.

## Residual risk

The definitions were not imported into a separately installed AutoByteus application because that runtime is not part of this repository. Risk is low because the new files copy the existing Northstar package schema exactly and all local references and JSON structures resolve successfully.
