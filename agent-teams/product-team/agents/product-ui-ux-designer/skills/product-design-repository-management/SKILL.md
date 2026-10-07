---
name: product-design-repository-management
description: Manage the Product UI/UX Designer's canonical design repository, ticket branch, isolated worktree, revisions, integration state, and cleanup before and after a design-mode skill runs.
---

# Product Design Repository Management

This is the Product UI/UX Designer's shared repository-lifecycle skill. Apply it
before and after exactly one mode skill: `product-experience-design` or
`exploratory-requirements-visualizer`. It owns repository and ticket-worktree
isolation; it does not design the UI reference or decide product behavior.

## Ownership

You own the Product Design repository lifecycle:

- resolve or initialize the canonical design repository when permitted;
- resolve or create the stable Product ticket identifier;
- create, verify, resume, and safely clean up one ticket branch/worktree per
  active requirements-driven request;
- record the canonical repository, active worktree, branch, base revision,
  ticket revision, runtime resources, and integration state;
- protect unrelated changes and prevent two executions from using the same
  ticket worktree;
- commit accepted baseline and ticket changes in the Product design
  repository under its repository policy.

The selected mode skill owns the experience work, validation, user review,
approval, and result classification. `ui_baseline_bootstrapper` may write a
candidate current-experience baseline in the Product-owned worktree, but does
not own the branch, ticket status, acceptance, commit, integration, or cleanup.

## Repository And Worktree Model

Keep one stable design Git repository per selected frontend or product
surface, separate from the production/source repository. The canonical
repository is the long-lived project identity, and its **default branch** is
the integration base: the branch the remote marks as default (`origin/HEAD`),
or, when the repository has no remote, the branch the canonical checkout uses.
The canonical checkout keeps the default branch checked out; it is not the
active checkout for a ticket while ticket work is in progress.

If the canonical repository is missing, initialize it at the resolved sibling
path before creating the ticket worktree. If Git has no commit from which to
create a worktree, use the repository's documented empty-repository procedure
or create a clearly recorded neutral initialization commit; do not label that
commit an accepted product baseline. The baseline or mode skill's accepted
result remains the first accepted design revision.

Reuse a canonical design repository that already represents the same
frontend application or product surface. Otherwise derive `design-subject`
in this order: the selected frontend application's name; a recognizable
product-surface name when the application name is generic; the repository
name when it represents one relevant frontend; or a stable product/experience
name when no frontend exists. Normalize it to the workspace's naming
conventions and name the repository `<design-subject>-design`.

Use one dedicated branch and Git worktree for every active requirements-driven
design request, including product-experience and exploratory-visualization
requests. A ticket folder is an artifact/status location; it is not a
substitute for a branch or worktree.

Use the workspace's established naming convention. When no convention is
provided, use a sanitized `design/<ticket-id>` branch and a sibling
worktree such as:

```text
workspace/
  <source-repository>/
  <design-subject>-design/                      # canonical repository
  <design-subject>-design-worktrees/
    <ticket-id>/                                # active Git worktree
```

Product-experience source stays at the design repository root. An
exploratory visualization may use a ticket-scoped subproject such as
`visualizers/<ticket-id>/` inside the ticket worktree; it is not a second Git
repository.

Do not put a worktree inside the canonical repository, production source
repository, frontend project, or a generic `designs/` or `prototypes/` directory. The
worktree path and branch must be recorded in the Product ticket and every
handoff that needs to resume active work.

## Intake And Isolation

At the beginning of every Product UI/UX Designer request:

1. Resolve the selected product surface, canonical design repository, and
   supplied ticket/request identifier. If the identifier is absent, create one
   using the Product team's established convention; never create a second ID
   for the same request.
2. Run `git fetch origin` and resolve the default branch
   (`git remote set-head origin --auto` refreshes `origin/HEAD`). The base
   revision is the fetched `origin/<default-branch>` commit. Record the source
   repository/frontend and the base revision separately from the active ticket
   checkout. If the local default branch has commits that
   `origin/<default-branch>` lacks, stop with `Blocked` and report them instead
   of choosing a base around unpushed work.
3. Inspect `git status`, `git worktree list`, branch identity, repository
   instructions, and any existing Product ticket record. Never reset, delete,
   overwrite, or silently reuse another ticket's dirty worktree.
4. If this ticket already has a recorded worktree and branch, verify that they
   still point to the expected repository and ticket. Resume that worktree
   instead of creating a duplicate.
5. Otherwise create a fresh ticket branch/worktree from the fetched
   `origin/<default-branch>`, never from the local default branch or a
   previously recorded revision. Create `tickets/in-progress/<ticket-id>/` in
   that worktree and initialize or update `product-ticket.md` from the
   Product team's shared [product-ticket template](../../../../shared/templates/product-ticket-template.md),
   recording the repository, worktree, branch, base revision, and current
   status.
6. Stop with a precise `Blocked` result when the repository, base revision,
   branch, worktree, ticket identity, or workspace ownership is ambiguous or
   unsafe. Record the blocker before routing it through the selected mode
   skill's handoff rules.

The canonical repository checkout must not be used as a shared editing
checkout for active ticket work. Separate worktrees prevent uncommitted source,
index, ticket-artifact, and branch-state collisions, but do not promise that
overlapping branches will merge without conflict.

## Baseline And Bootstrap Boundary

When an existing frontend is relevant, the first accepted current-experience
baseline is a prerequisite for future-state work. The shared principles'
Bootstrapper boundary defines what Bootstrapper may do; the
`product-experience-design` skill decides when to request it and whether
to accept its result. This skill provides the baseline lifecycle:

- If the canonical design repository has no accepted baseline, create or
  resume a dedicated baseline ticket branch/worktree, then send the payload
  below. A correction keeps the same baseline ticket and worktree.
- After the baseline is accepted, create the accepted baseline commit and
  integrate it into the default branch through the finalization sequence
  below. Later requirement work starts from the default branch that contains
  it.
- For a no-frontend product, establish the smallest initial project in the
  baseline ticket worktree without Bootstrapper, then accept and record the
  initial base through the same lifecycle.

The baseline ticket is still a Product ticket. Bootstrapper's report is a
mode-specific artifact, not a second ticket-management system.

Use this fixed local Bootstrapper payload for every baseline request; do not
send the future-state requirements package or Product ticket package as
Bootstrapper instructions:

```text
Outcome: Baseline Needed
Mode: Initial Bootstrap | Correction | Refresh
Selected frontend: <absolute source path>
Design repository/root: <absolute canonical separate design repository path>
Design task worktree: <absolute Product-owned baseline worktree path>
Ticket branch: <Product-owned baseline branch>
Accepted design base: <commit or None for initial baseline>
Explicit source constraint: <verbatim source-revision/root constraint or None>
Action: <independent current-experience baseline, named correction, or selected refresh>
```

For `Correction`, identify only the established bootstrap-report path and
failed or unsubstantiated inventory IDs in addition to this schema; use
`Action` for the observed gap or specific missing evidence and acceptance
criterion. For `Refresh`, identify only the established report path and explicitly selected
new source authority; record the explicit refresh instruction in `Action`.
The mode skill decides whether a correction or refresh is justified; neither
this payload nor a difference between revision numbers decides it. Keep the stable Product ticket and
design identity unchanged across retries.

## Ticket Folders And Statuses

Keep ticket folders inside the active ticket worktree:
`tickets/in-progress/<ticket-id>/` while work is open and
`tickets/done/<ticket-id>/` after completion. A ticket folder holds
`product-ticket.md`, the UI/UX specification, visual references, and
supporting evidence; the Git worktree provides source and index isolation.

Set the `product-ticket.md` status with these transitions. The mode skill's
outcome classification and the ticket status must agree.

```text
ticket opened / active work -> In Progress
existing frontend has no accepted baseline -> Baseline Needed
review URL or review package sent -> Awaiting User Review
feedback or revision received -> In Progress
explicit final approval and final artifacts committed -> Completed
missing decision, required input, or other unresolved prerequisite -> Blocked
interactive visualization is not useful for the decision -> Not Recommended
```

An exploratory-visualization ticket stays in `tickets/in-progress/` while
clarification is open. When clarification closes without product-experience
work, complete its evidence and close the ticket under repository policy; if
product-experience work follows, keep or reopen it in progress.

## Runtime Isolation

Git isolation is necessary but not sufficient when multiple UI references run at
once. For each active worktree, resolve and record an isolated or explicitly
owned dev-server port, process identity, temporary output directory, fixture
state, and reset method. Do not stop, reset, or reuse a process or state store
owned by another ticket. If a required runtime resource cannot be isolated,
return `Blocked` rather than sharing it silently.

## Resumption And Base Advancement

- Resume from the recorded ticket worktree, branch, ticket status, and latest
  ticket revision. Do not recreate the ticket or silently discard its changes.
- Before final integration, fetch and compare the ticket base with
  `origin/<default-branch>`. If the default branch advanced, merge it into the
  ticket branch in the ticket worktree, preserve approved ticket behavior, rerun affected browser
  and regression validation, and update the recorded base.
- If integration produces a conflict, unexpected behavior, or unsafe dirty
  state, preserve the evidence and classify the result as `Blocked` or the
  mode-specific recovery outcome. Never overwrite another branch or silently
  reset user-approved work.
- A source refresh or baseline correction can affect active ticket branches.
  Pause and reconcile it explicitly; do not silently rebase or invalidate an
  active ticket.

## Commit, Integration, And Cleanup

The selected mode skill decides when the design behavior and user review
are complete. Then the Product UI/UX Designer performs this repository sequence:

1. Update the ticket record and all durable artifacts in the active worktree.
2. Run the mode skill's final validation and record the exact result.
3. Commit the accepted baseline or ticket result on the ticket branch. The
   commit must include the runnable UI reference and the durable ticket evidence
   that belongs with that result.
4. Integrate the ticket into the default branch so that the remote and the
   local canonical checkout end on the same revision:
   - Fetch. If `origin/<default-branch>` moved past the ticket base, apply the
     base-advancement rule above first.
   - Push the ticket result to the remote default branch as a fast-forward
     (`git push origin <ticket-branch>:<default-branch>`). If the push is
     rejected, fetch and apply the base-advancement rule again; never
     force-push.
   - Fast-forward the local default branch in the canonical checkout
     (`git -C <canonical-repository> merge --ff-only origin/<default-branch>`).
     If that checkout is not on the default branch, is dirty, or cannot
     fast-forward, leave it untouched and report the exact blocker.
   - Without a remote, fast-forward the canonical checkout's default branch to
     the ticket branch instead.
   - Every later finalization commit on the default branch, such as an
     integration record or ticket move, follows the same
     push-then-update sequence. Finish by confirming that the local default
     branch and `origin/<default-branch>` are the same revision.

   Revalidate after integration: the approved experience must be reachable
   from the default branch through the product's normal entry point, without
   a preview URL or preview-only state. If it is not, preserve the ticket and
   report the integration as `Blocked`. Record `Completed`, `Not required`,
   or `Blocked`, and do not imply that an unintegrated branch is present on
   the default branch.
5. Move an accepted completed ticket from
   `tickets/in-progress/<ticket-id>/` to `tickets/done/<ticket-id>/` in the
   same repository-finalization sequence, when the ticket policy defines that
   transition. Keep blocked or unfinished work in `tickets/in-progress/`.
6. Stop the ticket's running UI reference processes, then remove the local worktree only after
   final evidence, handoff, and integration state are durable. Retain or
   delete the ticket branch only under repository policy. If cleanup is unsafe,
   leave the worktree intact and report the exact cleanup blocker.

Creating a remote is not implicit. When the repository has a remote, pushing
the default branch is part of finalization; push ticket branches only under
repository policy or explicit authorization. Record the final local and remote
default-branch revisions in the result.

## Workspace Result Contract

Before returning control to the selected mode skill, provide or record:

- Product ticket/request ID and ticket folder;
- canonical design repository/root;
- active ticket worktree path and ticket branch;
- source repository/frontend and pinned source revision when applicable;
- accepted design base revision;
- ticket commit/revision when one exists;
- default-entry-point validation evidence after integration, or exact blocker;
- runtime port/process/temp-state ownership;
- baseline status and Bootstrapper report path when applicable;
- default branch, its local and `origin` revisions after integration, and the
  integration result (`Pending` until finalization when appropriate);
- cleanup status or exact cleanup blocker (`Pending` until finalization when
  appropriate).

The mode skill uses this state in its own result package and then performs the
normal `get_handoff_rules` -> apply every matching rule ->
`send_message_to` exact returned recipients protocol. This management skill does
not invent a recipient or replace the mode skill's handoff.
