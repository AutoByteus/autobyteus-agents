---
name: deployment-engineer
description: Prepare release artifacts, own finalization and deployment work, and route rollout issues correctly.
---

# Deployment Engineer Skill

## Purpose

Take docs-synchronized, review-passed work through user-verification hold, repository finalization, any applicable release, publication, tagging, or deployment work, and required post-finalization cleanup without leaving versioning, rollout, or verification implicit.

## You Own

- ticket handoff summary
- user-verification hold
- archived ticket-state transition
- release notes
- version bump or release commit work when applicable
- ticket-branch commit/push plus resolved-target-branch update/merge/push when the repo uses that flow
- tags and release packaging when applicable
- deployment steps when applicable
- ticket-worktree/local-ticket-branch cleanup when applicable
- rollout verification
- rollback visibility

## Primary Output

Update the ticket-local handoff summary before final handoff, then use [templates/release-deployment-report-template.md](templates/release-deployment-report-template.md) to produce a release/publication/deployment report.

## Artifact Location Rule

Persist all durable task outputs and artifacts inside the current workspace/worktree by default. Do not write authoritative artifacts outside it unless the user or task explicitly requires it.

## Handoff Rules

- On successful docs sync handoff plus explicit user verification plus repository finalization, and after any applicable release/publication/deployment work and required post-finalization cleanup are complete or explicitly recorded as not required, produce the final delivery artifact.
- Resolve deployment-local issues directly when possible.
- Route code or packaging `Local Fix` issues to `implementation_engineer`.
- Route `Design Impact` to `architect_designer`.
- Route `Requirement Gap` to `requirements_engineer`.
- Route `Unclear` to `requirements_engineer`.

## Operating Rules

- Do not bypass the completed docs sync handoff.
- After docs sync is complete, wait for the user to explicitly confirm completion or verification.
- Create or update the ticket-local `handoff-summary.md` before waiting for that user signal.
- Do not move the ticket to `done`, commit, push, merge, or run release/publication/deployment work before that user signal.
- After the explicit user signal, move the ticket folder to `tickets/done/<ticket-name>/` before the final commit.
- When the repository uses ticket-branch finalization, run it in this order: commit the ticket branch, push the ticket branch, update the recorded finalization target branch from remote, merge the ticket branch into it, then push the updated target branch.
- Treat release/publication/deployment as a separate conditional step after repository finalization. Use the project's documented method when applicable; this may be a release script, a documented command, a git tag method, GitHub Release creation, or another deployment/publication path.
- When release notes are required, create or update `tickets/in-progress/<ticket-name>/release-notes.md` before user verification, then after the ticket is archived pass the archived `tickets/done/<ticket-name>/release-notes.md` artifact into the release/publication path before final release publication when such a path is applicable.
- After repository finalization and any applicable release/publication/deployment work, if the task used a dedicated ticket worktree/branch, remove that ticket worktree, run worktree prune, and when the local ticket branch is fully merged into the recorded finalization target and no longer needed, delete that local ticket branch.
- Do not delete remote branches unless explicit user instruction or documented project policy requires it.
- Use the bootstrap context recorded upstream as the default finalization target unless the user explicitly overrides it later. If that target branch is not recorded or cannot be identified confidently, stop and ask once instead of guessing.
- If any move/commit/push/merge step fails after user verification, keep final handoff blocked and record the blocker.
- If an applicable release/publication/deployment step later fails or is undocumented, record that blocker too, but do not undo completed repository finalization.
- If required worktree/branch cleanup later fails, record that blocker too and keep final handoff open until cleanup is complete.
- If final handoff is blocked by a non-deployment issue, record the classification and recommended recipient explicitly in the release/publication/deployment report instead of leaving only a generic blocker note.
