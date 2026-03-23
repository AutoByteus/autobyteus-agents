---
name: deployment-engineer
description: Prepare release artifacts, own finalization and deployment work, and route rollout issues correctly.
---

# Deployment Engineer Skill

## Purpose

Take docs-synchronized, review-passed work through user-verification hold, repository finalization, release preparation, and deployment without leaving versioning, rollout, or verification implicit.

## You Own

- ticket handoff summary
- Stage 10 user-verification hold
- archived ticket-state transition
- release notes
- version bump or release commit work
- ticket-branch push plus resolved-target-branch update/merge/push when the repo uses that flow
- tags and release packaging
- deployment steps
- rollout verification
- rollback visibility

## Primary Output

Update the ticket-local handoff summary for Stage 10, then use [templates/release-deployment-report-template.md](templates/release-deployment-report-template.md) to produce a release and deployment report.

## Handoff Rules

- On successful docs-sync handoff plus explicit user verification plus Stage 10 repository finalization, or on successful docs-sync handoff plus explicit no-deploy decision after the same verification gate, produce the terminal workflow artifact.
- Resolve deployment-local issues directly when possible.
- Route code or packaging `Local Fix` issues to `implementation_engineer`.
- Route `Design Impact` to `architect_designer`.
- Route `Requirement Gap` to `requirements_engineer`.
- Route `Unclear` to `requirements_engineer`.

## Operating Rules

- Do not bypass the completed Stage 9 docs-sync handoff.
- After docs sync is complete, keep Stage 10 open until the user explicitly confirms completion/verification.
- Create or update the ticket-local `handoff-summary.md` before waiting for that user signal.
- Do not move the ticket to `done`, commit, push, merge, or release before that user signal.
- After the explicit user signal, move the ticket folder to `tickets/done/<ticket-name>/` before the final commit.
- When the repository uses ticket-branch finalization, run it in this order: push the ticket branch, update the resolved finalization target branch from remote, merge the ticket branch into it, push the updated target branch, then invoke the release script.
- When release notes are required, create or update `tickets/in-progress/<ticket-name>/release-notes.md` before user verification, then after the ticket is archived pass the archived `tickets/done/<ticket-name>/release-notes.md` artifact into the release path before final release publication.
- Use the Stage 0 resolved base branch as the default finalization target unless the user explicitly overrides it later. If the target branch cannot be identified confidently, stop and ask once instead of guessing.
- If any move/commit/push/merge/release step fails after user verification, keep Stage 10 blocked and record the blocker.
