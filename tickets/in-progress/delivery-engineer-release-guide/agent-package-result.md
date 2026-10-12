# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `skill` (team-local `delivery-engineer`)
- Update intent: `extend`
- Target package: `agent-teams/software-engineering-team/agents/delivery-engineer/skills/delivery-engineer/`
- Request/reference: Project Task `project_task_238e420a-…` (user Ryan via the delivery engineer, 2026-10-12). Analysis: [agent-package-analysis.md](agent-package-analysis.md).

## Summary

- **SKILL, new "Project Release Guide" section:**
  - Before finalization, release, publication or deployment, read `RELEASE.md` at the repository root, or the file `AGENTS.md` points to for releases.
  - Where the guide and the generic steps differ on how to finalize, release or deploy, follow the guide; the user-verification hold and truthful reporting still apply.
  - Record the guide's path, revision and any deviations.
  - Without a guide, use the generic steps, record `No project release guide`, and suggest one from the starter template.
  - The project owns its guide: when a delivery shows it's wrong or missing a step, record that in the report with a proposed fix, and change the guide only when the user agrees or the ticket is about it.
- **SKILL "You Own":** "following the project release guide and recording deviations from it".
- **SKILL finalization target:** the recorded bootstrap context, or the release guide's finalization target. Ask once if both are missing.
- **SKILL, before the final commit:** check that the names and paths of committed files, including ticket evidence, work on every operating system the project builds on or is checked out on, using the rules or checks the release guide gives. The skill keeps the general practice; the specific rules, such as Windows characters and path limits, belong in the project's guide.
- **SKILL release:** use the release guide's method when there is one. After publishing, watch every triggered pipeline to completion, check the published artifacts, and record a partial release as partial. Never move or delete a published tag; fix forward with the next version.
- **Report template:**
  - a new "Project Release Guide" section (path and revision or `No project release guide`, deviations, proposed guide fixes and whether the user agreed);
  - Method gets `Project Release Guide`;
  - new fields for triggered pipelines and checked artifacts;
  - the result gains `Partial`.
- **New `templates/release-guide-template.md`:** a starter `RELEASE.md` with the sections Finalization Target (including the project's file-name rules), Release Decision, Checks Before Tagging, Cutting The Release, Watching The Rollout, Recovery, Rollback, Deployment, and Workflow Reference, one line of guidance each.

## Preserved behavior

- The order of generic delivery steps, the user-verification hold before finalization or release, truthful blocking, and terminal-return rules.

## Superrepo copy

`autobyteus-workspace-superrepo/.claude/skills/delivery-engineer` is a symlink to this skill in the autobyteus-agents main checkout (`/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/agents/delivery-engineer/skills/delivery-engineer`). It updates when that checkout is fast-forwarded to the merge; no separate edit is needed.

## Deliberately left out

- **Optional item 5:** OS-portable names in the api-e2e and implementation roles. Adding the rule to three roles would copy it (anti-pattern 4). The delivery check before the final commit covers every committed file, and a project guide can add a hygiene script (AutoByteus has `check_repository_artifact_hygiene.py`).
- **The AutoByteus `RELEASE.md` itself:** it lives on branch `codex/release-guide` (`0fcad239f`), owned by the delivery engineer's ticket.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Skill validator | Pass | `quick_validate.py` → "Skill is valid!" for `delivery-engineer`. |
| Markdown links and references resolve | Pass | `templates/release-guide-template.md` exists. |
| Changed JSON parses | N/A | No JSON changed. |
| Ownership and cross-file consistency | Pass | Mirrors the `TESTING.md` pattern of the other roles (look at the root, record the path, fall back when absent). Each rule is stated once, in the SKILL. |
| Scope/diff review | Pass | 2 changed files, 1 new template, and this ticket folder. |
| Final review against the standard and anti-patterns | `Pass` (revision 2, round 2) | Round 1: anti-pattern 4, the starter template repeated "never move a published tag" and "the guide wins", so both were removed from the template. Anti-pattern 14, "no very long paths" became "well under Windows' 260-character limit (or the guide's limit)". Round 2 found nothing more. Revision 2 (user, 2026-10-12: "the skill package for individual member … works on the general level … and then it respects the project specifics"): Windows-specific rules moved out of the skill into the guide's role, and guide changes became proposals. Its round 1 aligned the report field and the starter template's Finalization Target; round 2 found nothing more. |
