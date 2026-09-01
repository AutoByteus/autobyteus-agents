---
name: product-prototype-repository-management
description: Manage the Product Prototyper's canonical prototype repository, ticket branch, isolated worktree, revisions, integration state, and cleanup before and after a prototype-mode skill runs.
---

# Product Prototype Repository Management

This is the Product Prototyper's shared repository-lifecycle skill. Apply it
before and after exactly one mode skill: `product-experience-prototyper` or
`exploratory-requirements-visualizer`. It owns repository and ticket-worktree
isolation; it does not design the prototype or decide product behavior.

## Ownership

You own the Product Prototype repository lifecycle:

- resolve or initialize the canonical prototype repository when permitted;
- resolve or create the stable Product ticket identifier;
- create, verify, resume, and safely clean up one ticket branch/worktree per
  active requirements-driven request;
- record the canonical repository, active worktree, branch, base revision,
  ticket revision, promoted default baseline revision, runtime resources, and
  integration/promotion state;
- protect unrelated changes and prevent two executions from using the same
  ticket worktree;
- commit accepted baseline and ticket changes in the Product prototype
  repository under its repository policy.

The selected mode skill owns the experience work, validation, user review,
approval, and result classification. `prototype_bootstrapper` may write a
candidate current-experience baseline in the Product-owned worktree, but does
not own the branch, ticket status, acceptance, commit, integration, or cleanup.

## Repository And Worktree Model

Keep one stable prototype Git repository per selected frontend or product
surface, separate from the production/source repository. The canonical
repository is the long-lived project identity and integration base; it is not
the active checkout for a ticket while ticket work is in progress.

If the canonical repository is missing, initialize it at the resolved sibling
path before creating the ticket worktree. If Git has no commit from which to
create a worktree, use the repository's documented empty-repository procedure
or create a clearly recorded neutral initialization commit; do not label that
commit an accepted product baseline. The baseline or mode skill's accepted
result remains the first accepted prototype revision.

Use one dedicated branch and Git worktree for every active requirements-driven
prototype request, including product-experience and exploratory-visualization
requests. A ticket folder is an artifact/status location; it is not a
substitute for a branch or worktree.

Use the workspace's established naming convention. When no convention is
provided, use a sanitized `prototype/<ticket-id>` branch and a sibling
worktree such as:

```text
workspace/
  <source-repository>/
  <prototype-subject>-prototype/                 # canonical repository
  <prototype-subject>-prototype-worktrees/
    <ticket-id>/                                  # active Git worktree
```

Do not put a worktree inside the canonical repository, production source
repository, frontend project, or a generic `prototypes/` directory. The
worktree path and branch must be recorded in the Product ticket and every
handoff that needs to resume active work.

## Intake And Isolation

At the beginning of every Product Prototyper request:

1. Resolve the selected product surface, canonical prototype repository, and
   supplied ticket/request identifier. If the identifier is absent, create one
   using the Product team's established convention; never create a second ID
   for the same request.
2. Resolve the repository's integration/default branch and the latest accepted
   prototype revision. Record the source repository/frontend and the accepted
   prototype base separately from the active ticket checkout.
3. Inspect `git status`, `git worktree list`, branch identity, repository
   instructions, and any existing Product ticket record. Never reset, delete,
   overwrite, or silently reuse another ticket's dirty worktree.
4. If this ticket already has a recorded worktree and branch, verify that they
   still point to the expected repository and ticket. Resume that worktree
   instead of creating a duplicate.
5. Otherwise create a fresh ticket branch/worktree from the recorded latest
   accepted prototype revision. Create `tickets/in-progress/<ticket-id>/` in
   that worktree and initialize or update `prototype-ticket.md` from the
   Product team's shared [prototype-ticket template](../../../../shared/templates/prototype-ticket-template.md),
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

The first current-experience baseline is a prerequisite for future-state work
when an existing frontend is relevant:

- If the canonical prototype repository has no accepted baseline, create or
  resume a dedicated baseline ticket branch/worktree first. Product Prototyper
  sends Bootstrapper the selected source, canonical repository, target
  worktree, branch, and source/base constraints through the fixed local
  handoff. Do not send the future-state requirements package as Bootstrapper
  instructions.
- Bootstrapper discovers and implements current-experience parity only in the
  supplied Product-owned worktree and returns its report, runnable result, and
  evidence. It must not create a second worktree or write to the canonical
  integration checkout.
- Product Prototyper reviews and tests the returned baseline. If it is
  incomplete, keep the same baseline ticket/worktree, record the failed
  inventory items, and send a correction through the normal local handoff.
- After the baseline passes acceptance, Product Prototyper creates the
  accepted baseline commit and integrates it into the canonical prototype base
  according to repository policy. Later requirement work starts only from that
  accepted revision.
- For a no-frontend product, Product Prototyper establishes the smallest
  initial project in the baseline ticket worktree without Bootstrapper, then
  accepts and records the initial base using the same lifecycle.

The baseline ticket is still a Product ticket. Bootstrapper's report is a
mode-specific artifact, not a second ticket-management system.

Use this fixed local Bootstrapper payload for every baseline request; do not
send the future-state requirements package or Product ticket package as
Bootstrapper instructions:

```text
Outcome: Baseline Needed
Mode: Initial Bootstrap | Correction | Refresh
Selected frontend: <absolute source path>
Prototype repository/root: <absolute canonical separate prototype path>
Prototype task worktree: <absolute Product-owned baseline worktree path>
Ticket branch: <Product-owned baseline branch>
Accepted prototype base: <commit or None for initial baseline>
Explicit source constraint: <verbatim source-revision/root constraint or None>
Action: <independent current-experience baseline, named correction, or selected refresh>
```

For `Correction`, identify only the established bootstrap-report path and
failed or unsubstantiated inventory IDs in addition to this schema. For
`Refresh`, identify only the established report path and explicitly selected
new source authority. Keep the stable Product ticket and prototype identity
unchanged across retries.

## Runtime Isolation

Git isolation is necessary but not sufficient when multiple prototypes run at
once. For each active worktree, resolve and record an isolated or explicitly
owned dev-server port, process identity, temporary output directory, fixture
state, and reset method. Do not stop, reset, or reuse a process or state store
owned by another ticket. If a required runtime resource cannot be isolated,
return `Blocked` rather than sharing it silently.

## Resumption And Base Advancement

- Resume from the recorded ticket worktree, branch, ticket status, and latest
  ticket revision. Do not recreate the ticket or silently discard its changes.
- Before final integration, compare the ticket base with the latest accepted
  canonical revision. If the base advanced, integrate it deliberately in the
  ticket worktree, preserve approved ticket behavior, rerun affected browser
  and regression validation, and update the recorded base.
- If integration produces a conflict, unexpected behavior, or unsafe dirty
  state, preserve the evidence and classify the result as `Blocked` or the
  mode-specific recovery outcome. Never overwrite another branch or silently
  reset user-approved work.
- A source refresh or baseline correction can affect active ticket branches.
  Pause and reconcile it explicitly; do not silently rebase or invalidate an
  active ticket.

## Commit, Integration, And Cleanup

The selected mode skill decides when the prototype behavior and user review
are complete. Then Product Prototyper performs this repository sequence:

1. Update the ticket record and all durable artifacts in the active worktree.
2. Run the mode skill's final validation and record the exact result.
3. Commit the accepted baseline or ticket result on the ticket branch. The
   commit must include the runnable prototype and the durable ticket evidence
   that belongs with that result.
4. Integrate the ticket branch into the canonical prototype branch only when
   the repository's documented policy or explicit authorization permits it.
   Revalidate after integration. When the ticket contains an approved preview
   candidate for the product experience, promote that candidate into the
   default baseline before terminal completion: the approved experience must be
   reachable through the normal/default entry point without preview-only state.
   Record the integration revision and promoted baseline revision separately
   when needed. A merged candidate that still requires a preview URL is not a
   completed baseline promotion; preserve the ticket and report the promotion
   as incomplete or blocked. Record `Completed`, `Not required`, or `Blocked`,
   and do not imply that an unintegrated branch is present on the canonical
   base.
5. Move an accepted completed ticket from
   `tickets/in-progress/<ticket-id>/` to `tickets/done/<ticket-id>/` in the
   same repository-finalization sequence, when the ticket policy defines that
   transition. Keep blocked or unfinished work in `tickets/in-progress/`.
6. Stop active preview processes, then remove the local worktree only after
   final evidence, handoff, and integration state are durable. Retain or
   delete the ticket branch only under repository policy. If cleanup is unsafe,
   leave the worktree intact and report the exact cleanup blocker.

Remote creation and pushing are not implicit. Follow the existing prototype
repository policy or explicit authorization, and record remote/branch state in
the result.

## Workspace Result Contract

Before returning control to the selected mode skill, provide or record:

- Product ticket/request ID and ticket folder;
- canonical prototype repository/root;
- active ticket worktree path and ticket branch;
- source repository/frontend and pinned source revision when applicable;
- accepted prototype base revision;
- ticket commit/revision when one exists;
- promoted default baseline revision when an approved candidate is promoted;
- default-entry-point promotion validation evidence or exact blocker;
- runtime port/process/temp-state ownership;
- baseline status and Bootstrapper report path when applicable;
- integration target and current result (`Pending` until finalization when
  appropriate);
- cleanup status or exact cleanup blocker (`Pending` until finalization when
  appropriate).

The mode skill uses this state in its own result package and then performs the
normal `get_handoff_rules` -> apply every matching rule ->
`send_message_to` exact returned recipients protocol. This management skill does
not invent a recipient or replace the mode skill's handoff.
