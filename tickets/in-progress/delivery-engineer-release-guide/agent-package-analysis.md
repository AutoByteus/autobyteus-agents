# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `extend`)
- Package type: `skill` (team-local, Software Engineering Team `delivery-engineer`)
- Target package: `agent-teams/software-engineering-team/agents/delivery-engineer/skills/delivery-engineer/` at `origin/main` `acf9934`
- Scope included: `SKILL.md`, `templates/release-deployment-report-template.md`, a new `templates/release-guide-template.md`. Checked how the other roles follow `TESTING.md` (api-e2e-engineer `SKILL.md` lines 62–65; implementation-engineer `SKILL.md` line 76).
- Scope excluded: the AutoByteus repo's own `RELEASE.md` (branch `codex/release-guide`, owned by the delivery engineer's ticket); api-e2e and implementation evidence naming (see Findings 5).
- Request/reference: Project Task `project_task_238e420a-…` (user Ryan via `delivery_engineer_ac9c38d40e2d4ab4a2d018bb2604fa2f`, 2026-10-12); attached example `RELEASE.md` (AutoByteus, `0fcad239f`).

## Baseline

| Location | Current text |
| --- | --- |
| SKILL Workflow line 76 | "Treat release, publication, and deployment as a separate conditional step after repository finalization. Use the project's documented method when one exists." The skill doesn't say where that method lives, or that it wins. |
| SKILL line 73 | "Use the recorded bootstrap context as the finalization target." |
| SKILL after publishing | Nothing about watching triggered pipelines, partial releases, published tags, or file-name portability. |
| Report template | "Method: `Release Script` / … / `Other`"; no field for a project release guide, triggered pipelines, or a partial release. |
| Superrepo copy | `autobyteus-workspace-superrepo/.claude/skills/delivery-engineer` is a symlink to this skill in the autobyteus-agents main checkout, so it isn't a separate copy. |

## Observed defect

The AutoByteus `v1.5.2-beta.1` Windows desktop build failed at checkout: a committed ticket evidence log name contained `:`. That rule was written down nowhere, and the safe release pattern (finalize branch, `--no-push`, manual push) was only discoverable from old ticket reports. Recovery was `v1.5.2-beta.2`, without moving the published tag.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Grounding | line 76 "the project's documented method" | SKILL | Project release specifics are rediscovered from old tickets each time. | Add "Project Release Guide": read `RELEASE.md` (root, or wherever `AGENTS.md` points) before finalization or release. On how to finalize, release or deploy, it wins; the user-verification hold and truthful reporting still apply. Record path, revision and deviations. Without one, use the generic steps, record `No project release guide`, and suggest one from the starter template. Keep it current with the docs sync. |
| 2 | Content flow | nothing after publishing | SKILL | Partial releases and broken pipelines go unnoticed. | After publishing, watch every triggered pipeline to completion, check the published artifacts, and record a partial release as partial. Never move or delete a published tag; fix forward with the next version. |
| 3 | Grounding | evidence log name with `:` | SKILL (finalization) | A checkout-hostile name breaks builds on other operating systems. | Before the final commit, check that committed file names are portable across operating systems. |
| 4 | Content flow | report template has no guide, pipeline or partial fields | report template | Deviations and partial releases aren't recorded. | Add a "Project Release Guide" section and rollout fields. |
| 5 | Ownership | optional item 5 (api-e2e and implementation naming) | — | Adding the rule to three roles copies it (anti-pattern 4). | Keep one owner: the delivery check before the final commit, which is where every committed name passes. Project guides can add a hygiene script (AutoByteus has one). Not changed; noted in the result. |
| 6 | Content flow | no starter | new template | Projects have no shape to start from. | `templates/release-guide-template.md` with the example's section list and one line of guidance per section. |
