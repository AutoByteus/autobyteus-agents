Review Status: Analysis complete - awaiting user approval

## User request and scope

The Product Prototyper currently works in one stable prototype repository while
Requirements Engineering verifies or uses a dedicated task worktree/branch for
each repository-backed requirement. Review whether Product Prototyper should
create or resume an isolated worktree/branch for each requirements-driven
prototype request so multiple prototype requests can progress without sharing
uncommitted files. Review the Product Prototyper's two modes, the Bootstrapper
handoff, ticket/artifact provenance, repository integration, and concurrent
runtime safety. This analysis does not change runtime skill files.

## Current behavior and package ownership baseline

### Requirements Engineering

The Requirements Engineer skill records the assigned task workspace and says
that a Git task must use a dedicated task worktree or branch unless the current
workspace is already isolated. It blocks before deeper work when workspace
isolation cannot be established and records the worktree/branch in its
investigation metadata. This gives each requirement package an isolated source
workspace and a durable base/revision record.

### Product Prototyper

The Product Prototyper skill currently resolves one canonical separate
prototype repository, creates a ticket folder inside it, and explicitly says
that a per-ticket branch or worktree is not required. The shared Product
Prototype Principles repeat that ticket folders are ordinary folders rather
than worktrees, instruct Product Prototyper to edit the stable repository root,
and forbid dedicated ticket branches or task worktrees. The visualization skill
also copies a temporary visualizer project into the canonical repository rather
than an isolated ticket worktree.

Product Prototyper still owns the prototype repository, ticket lifecycle,
prototype commits, user review, validation, and final UI/UX artifacts. The
Bootstrapper owns only current-experience discovery, parity implementation,
comparison evidence, and its report; Product Prototyper accepts the result and
creates the accepted commit.

### Bootstrapper

The Bootstrapper currently writes to the canonical prototype repository/root.
Its fixed request identifies the repository/root but not a ticket worktree or
branch. If two Product Prototyper executions share that root, Bootstrapper can
write baseline files into the same checkout as another ticket. The current
boundary correctly prevents Bootstrapper from managing Product ticket status or
creating the accepted Product commit, but it does not provide file-level
isolation for its implementation work.

## Preserved invariants and user-authority boundaries

- Keep one stable, separate prototype Git repository per selected frontend or
  product surface.
- Keep the prototype repository separate from the production/source repository.
- Keep Product Prototyper as the owner of its repository identity, ticket
  lifecycle, accepted commits, user review, final validation, and UI/UX
  deliverables.
- Keep Bootstrapper limited to current-experience baseline work; it must not
  implement future-state behavior, approve product decisions, change ticket
  status, or create Product Prototyper's accepted commit.
- Keep the user as the approval authority for intentional future-state UI/UX
  and behavior.
- Preserve the distinction between the canonical prototype repository, the
  active ticket worktree, the ticket branch, the base revision, and the ticket
  commit/revision.
- Preserve ticket-folder status transitions and durable artifact paths.
- Do not claim that worktrees eliminate all conflicts: they prevent shared
  uncommitted file collisions, while overlapping branches can still conflict
  when integrated into the canonical prototype branch.
- Do not push, merge, or delete worktrees merely because this analysis is
  performed. Repository finalization remains conditional on repository policy
  or explicit authorization.

## Macro analysis

### Package topology and ownership

The worktree rule is a shared cross-mode invariant, so its canonical owner
should be `shared/product-prototype-principles.md`. The final-prototype and
requirements-visualization skills should implement the mode-specific lifecycle
around that invariant. The Bootstrapper skill must consume the Product
Prototyper-provided active worktree rather than choosing a second root. Ticket,
runbook, report, and bootstrap-report templates need provenance fields because
the canonical repository path alone will no longer identify the active change.

The current package has one direct contradiction: the Requirements Engineer
requires an isolated task worktree/branch, while Product Prototyper and the
shared prototype principles explicitly forbid one. The contradiction is
behavioral, not merely wording.

### Authoritative sources and boundaries

- `shared/product-prototype-principles.md`: cross-mode repository/worktree,
  concurrency, ownership, and integration principles.
- `requirements-prototyper/SKILL.md`: final-prototype ticket worktree
  creation/resume, baseline gating, commit, integration, and cleanup sequence.
- `interactive-requirements-visualizer/SKILL.md`: visualization-mode use of the
  same ticket worktree and ticket-scoped temporary project.
- `prototype-bootstrapper/SKILL.md`: work only in the Product Prototyper's
  assigned ticket worktree; return files and evidence without accepting or
  integrating the branch.
- `team.md`: concise ownership and high-level route summary only.
- `team-config.json`: member addresses and handoff conditions, not Git
  implementation instructions.
- ticket/runbook/report templates: durable repository, branch, worktree,
  revision, integration, and cleanup fields.

No new agent or coordinator is needed. Product Prototyper already owns the
prototype repository and ticket lifecycle, so worktree lifecycle belongs to the
same agent. Bootstrapper should use the supplied worktree and must not own its
branch lifecycle.

### Logical flow and content architecture

The current final-prototype flow is coherent through ticket creation and
validation, but it lacks isolation between ticket intake and repository edits.
The corrected primary spine should be:

`resolve request/ticket -> resolve canonical prototype repository -> resolve or create isolated ticket worktree/branch -> verify base and baseline -> optionally bootstrap in that worktree -> Product acceptance -> implement one focused prototype change -> validate -> user review -> commit ticket branch -> integrate under repository policy -> move ticket to done -> clean up safely -> handoff`

The visualization mode should use the same first three repository steps before
copying its temporary visualizer project. Its temporary project remains a
ticket-scoped subproject; the worktree is the Git isolation boundary.

Initial baseline creation is a special prerequisite, not a reason to return to
the shared checkout. Product Prototyper should create or select a dedicated
baseline worktree/branch, direct Bootstrapper to that path, accept and commit
the baseline itself, and establish the canonical accepted base before ordinary
requirement branches are created. Later requirement branches must start from a
recorded accepted prototype revision.

### Behavioral grounding and invariants

The requested concurrency benefit is real for uncommitted files, ticket
artifacts, dev-server outputs, and branch checkout state. It is not sufficient
to create folders named after tickets: those folders do not isolate source
files, Git index state, branch state, or generated output. A real Git worktree
and ticket branch are required for repository-backed work.

Worktree isolation also does not remove integration conflicts. Two tickets that
change the same component can still conflict when merged. The skill must
therefore require each ticket to record its base revision, preserve accepted
behavior, update/reconcile against an advanced canonical base at a safe
checkpoint, and report an integration conflict instead of silently overwriting
another ticket.

Concurrent browser validation has a second boundary: each active worktree must
use an isolated or explicitly assigned port, temporary output path, fixture
state, and process ownership. Otherwise two clean Git worktrees can still
interfere at runtime.

### Outputs, validation, recovery, and handoff

The Product Prototyper result must expose both repository identity and active
task identity: canonical prototype repository path, ticket worktree path,
ticket branch, base revision, current ticket commit/revision, integration
state, ticket path, and durable artifact paths. A Bootstrapper result must add
its worktree and branch provenance but must state that Product Prototyper still
owns acceptance and the accepted commit.

Recovery must cover missing/ambiguous repository identity, existing branch or
worktree collisions, dirty/unrelated changes, an advanced base, merge
conflicts, missing runtime isolation, and unsafe cleanup. The result remains
`Blocked` when a safe worktree or base cannot be established.

Handoff ownership does not change: Product Prototyper still calls
`get_handoff_rules`, applies every matching rule, and sends through the exact
returned addresses. The Bootstrapper handoff should carry only the source
locator, canonical prototype repository, target worktree/branch, base/source
revision constraints, and the fixed baseline action; it should not carry
future-state requirements or the full Product ticket package.

## Micro analysis (only after macro analysis is coherent)

### Wording and terminology

The package currently overloads “prototype repository/root” to mean both the
stable repository identity and the active checkout. Those must be named
separately:

- `Prototype repository/root`: stable repository identity.
- `Prototype task worktree`: active isolated checkout for one ticket.
- `Ticket branch`: branch checked out by that worktree.
- `Base prototype revision`: accepted revision from which the ticket started.
- `Prototype revision/commit`: current ticket result.

“Ticket folder” must no longer be described as the isolation mechanism. It is a
durable artifact/status location inside the active worktree and, after
integration, the canonical repository.

### Qualifiers, conditions, and exceptions

The worktree requirement applies to requirements-driven final prototypes and
requirements visualizers. It does not require a separate prototype Git
repository per ticket. The stable prototype repository remains shared; only
the checkout/branch is isolated.

The Bootstrapper is a narrow exception to general Product ownership: it may
write baseline implementation into the Product Prototyper's assigned worktree,
but it cannot create the accepted commit or finalize the ticket. This should be
stated next to the Bootstrapper boundary rather than as a broad exception in
`team.md`.

No-frontend initialization and first baseline creation need an explicit
bootstrap branch/worktree path. After the baseline is accepted and integrated,
ordinary ticket worktrees use the accepted canonical revision.

### Redundancy, transitions, and economy

The same “stable repository, no ticket worktree” rule currently appears in the
shared principles, final-prototype skill, and ticket template. The update should
replace those copies with one shared invariant and concise mode-specific
references. Detailed Git commands, branch naming, conflict recovery, and
cleanup should live in the owning skill, not in `team.md`.

The team document should only say that Product Prototyper owns per-ticket
worktree/branch lifecycle and that Bootstrapper works in the assigned worktree;
the shared principles and skills should contain the actual rules.

## Findings and evidence

### Macro findings

1. **High — missing isolation for concurrent Product work.**
   `requirements-prototyper/SKILL.md` currently requires one stable repository,
   ticket folders, and explicitly says a dedicated per-ticket worktree is not
   required. `shared/product-prototype-principles.md` repeats the prohibition.
   Impact: concurrent requests can edit the same checkout and index, so one
   ticket can overwrite or commit another ticket's uncommitted prototype and
   artifact changes.

2. **High — Bootstrapper target is unsafe for concurrent work.**
   The fixed Bootstrapper request identifies only the canonical repository/root,
   and `prototype-bootstrapper/SKILL.md` instructs it to write there. Impact:
   baseline work can collide with a future-state ticket or another baseline
   correction. The Bootstrapper needs a Product-owned target worktree.

3. **Medium — artifact provenance cannot distinguish concurrent checkouts.**
   Ticket, runbook, product-report, and bootstrap-report templates record a
   repository/root and revision but not consistently the active worktree,
   ticket branch, base revision, or integration state. Impact: handoffs and
   resumptions can reopen the wrong checkout or treat one branch's evidence as
   another ticket's result.

4. **Medium — integration and runtime concurrency are underspecified.**
   The current skill warns about dirty state but does not define a ticket-branch
   integration checkpoint, conflict handling, safe worktree cleanup, or unique
   runtime resource ownership. Impact: worktree creation would reduce file
   collisions but still leave merge and live-preview collisions ambiguous.

### Micro findings

1. **Medium — overloaded repository terminology.**
   “Prototype repository/root” is used for stable identity and active edit
   location. Rename fields and handoff language to distinguish repository,
   worktree, branch, base revision, and ticket revision.

2. **Low — contradictory negative wording.**
   “Ticket folders are ordinary folders, not branches or worktrees” and “a
   dedicated per-ticket branch or worktree is not required” are now the wrong
   policy. Remove them from the shared principles and ticket template rather
   than layering an exception over them.

3. **Low — team-level detail risk.**
   `team.md` should not receive the full Git lifecycle or conflict checklist.
   Keep only the ownership and high-level isolation contract; put the procedure
   in skills and provenance in templates.

## Proposed improvements

### Macro actions, in order

1. **Update — establish shared isolation invariant.**
   Affected boundary: `shared/product-prototype-principles.md`.
   Replace the no-worktree policy with one stable prototype repository plus one
   dedicated ticket branch/worktree per active requirements-driven request.
   Define canonical repository versus active worktree, base revision, branch
   naming/location convention, safe reuse/resume, dirty-state blocking, base
   advancement, integration conflict handling, runtime resource isolation, and
   cleanup. Preserve the one-repository-per-product-surface rule.

2. **Update — make Product Prototyper own ticket worktrees.**
   Affected boundary: `requirements-prototyper/SKILL.md`.
   Add intake steps to resolve/create/resume exactly one ticket branch/worktree
   from the latest accepted prototype base, record its identity, and perform
   all ticket source/artifact edits there. Add the baseline-worktree exception,
   commit/integration checkpoint, conflict recovery, and cleanup rules. Apply
   the same lifecycle to no-frontend work.

3. **Update — apply the same isolation boundary to visualization mode.**
   Affected boundary: `interactive-requirements-visualizer/SKILL.md`.
   Require the ticket worktree before copying the temporary visualizer project;
   keep the visualizer project temporary and ticket-scoped inside that worktree.
   Record worktree/branch provenance and isolate dev-server resources.

4. **Update — direct Bootstrapper writes to the Product-owned worktree.**
   Affected boundary: `prototype-bootstrapper/SKILL.md` and the fixed bootstrap
   message in `requirements-prototyper/SKILL.md` plus local
   `product-design-prototyping-team/team-config.json` wording if needed.
   Include canonical repository, target worktree, ticket branch, and base/source
   revision. Bootstrapper verifies and writes only in that target; Product
   Prototyper remains the acceptance and commit owner.

5. **Update — preserve provenance in artifacts.**
   Affected files: `prototype-ticket-template.md`,
   `prototype-runbook-template.md`, `product-prototype-report-template.md`,
   `prototype-bootstrap-report-template.md`, and any final handoff template
   that reports repository state. Add fields for worktree, branch, base
   revision, ticket revision/commit, integration result, runtime resource
   isolation, and cleanup result where durable evidence needs them. Do not put
   transient worktree paths into the normative UI/UX specification unless they
   are needed for reproducibility; record the durable repository and commit
   there instead.

6. **Update — summarize ownership without duplicating procedure.**
   Affected boundary: Product Design & Prototyping `team.md` and, only if
   needed for cross-team discoverability, the root README summary. State that
   Product Prototyper owns one isolated branch/worktree per active ticket and
   Bootstrapper works in the assigned worktree. Keep Git commands, conditions,
   and recovery in skills; keep recipients in `team-config.json`.

7. **Keep — do not change routing ownership.**
   Affected boundary: local and parent handoff configs. `get_handoff_rules`,
   `send_message_to`, Product's local Bootstrapper route, and parent
   cross-team routes remain result-based. Worktree lifecycle is repository
   execution state, not a new agent or a new handoff route.

### Micro actions, in order

8. **Update — normalize terms.**
   Affected Product skill sections and templates. Use stable terms for canonical
   repository, active ticket worktree, ticket branch, accepted base revision,
   ticket commit, integration target, and cleanup status.

9. **Remove — delete the explicit no-worktree policy.**
   Affected shared principles and prototype ticket template. Replace it with a
   positive worktree rule and a concise explanation that ticket folders remain
   artifact/status folders, not the isolation mechanism.

10. **Keep — preserve safety negatives that close real branches.**
    Retain blocking on dirty/unrelated changes, duplicate worktrees, ambiguous
    base/source identity, unsafe merge, unowned processes, and unsafe cleanup.
    These prevent plausible concurrency or data-loss failures and are not
    redundant warnings.

## Assumptions and open questions

- Assumption: the runtime permits Product Prototyper to use `run_bash` for
  `git worktree` and branch operations, or supplies an equivalent isolated
  workspace that the skill can verify.
- Assumption: the stable prototype repository has an integration/default branch
  or another repository-policy-defined accepted base from which ticket branches
  can be created.
- Assumption: Product Prototyper, not Bootstrapper or Requirements Engineering,
  remains responsible for committing and integrating prototype changes.
- Open question: the repository's canonical integration branch name and merge
  policy should remain configurable rather than hard-coded as `main` unless the
  product repository explicitly defines it.
- Open question: whether completed ticket branches are retained remotely after
  integration is a repository policy decision; local worktree cleanup should
  occur only after the final evidence and integration state are recorded.
- Risk: a source refresh or baseline correction can invalidate active ticket
  branches. The safe behavior is to pause/reconcile explicitly and revalidate,
  not silently reset or rebase user-approved work.
- Risk: separate worktrees do not prevent semantic merge conflicts. Integration
  must remain a deliberate gate with explicit conflict evidence.

## Validation plan after approval

1. Validate all changed Markdown links, frontmatter, and JSON configs.
2. Search the Product package for stale “no per-ticket worktree” claims and
   ambiguous repository/root fields.
3. Verify both Product Prototyper modes create/resume a ticket worktree before
   editing and that Bootstrapper receives and uses the same target worktree.
4. Verify the baseline path, later-ticket path, no-frontend path, correction or
   refresh path, user-review path, integration-conflict path, and cleanup path.
5. Verify ticket, runbook, report, and bootstrap-report templates expose enough
   provenance to resume the correct branch/worktree.
6. Re-read the package in execution order for the primary spine:
   repository -> worktree -> baseline -> work -> validation -> review -> commit
   -> integration -> ticket completion -> cleanup -> handoff.
7. Perform the required macro pass and then the micro pass, including every
   retained concurrency and cleanup prohibition.
8. Keep unrelated working-tree changes unstaged and unmodified.

Target skill files changed during analysis (before approval): None

Analysis artifact:
`.codex/artifacts/product-prototyper-worktree-management/optimization-analysis.md`

## Post-approval implementation and validation record

Approval was explicit in the user request on 2026-08-29. The approved design
was implemented without changing unrelated pre-existing working-tree files.

Authoritative updates:

- Added `product-prototype-repository-management/SKILL.md` as the Product
  Prototyper's shared repository, ticket, branch/worktree, runtime-isolation,
  integration, and cleanup skill.
- Attached that management skill in Product Prototyper's `agent-config.json`
  and made `agent.md` apply it before exactly one experience-mode skill.
- Updated `requirements-prototyper/SKILL.md` and
  `interactive-requirements-visualizer/SKILL.md` so their mode workflows use the
  management-established worktree and return repository finalization to the
  management skill instead of owning conflicting lifecycle instructions.
- Updated Bootstrapper's skill and `agent.md` so it writes only in the
  Product-owned target worktree and never creates a competing repository,
  branch, worktree, ticket system, integration, or accepted commit.
- Updated shared Product Prototype Principles, team ownership/communication
  docs, the root README summary, the local bootstrap handoff config, and the
  ticket/runbook/product-report/bootstrap-report templates with the same
  repository/worktree/branch/base/integration/cleanup vocabulary.

## Post-approval macro review

The execution spine now reads:

```text
resolve canonical prototype repository
  -> create/resume Product ticket branch and worktree
  -> record accepted base and runtime isolation
  -> bootstrap in that assigned worktree when needed
  -> Product acceptance
  -> mode-specific prototype or visualization work
  -> browser/user validation
  -> Product ticket-branch commit
  -> deliberate canonical integration
  -> ticket status/folder finalization
  -> safe runtime/worktree cleanup
  -> result-based handoff
```

The baseline, later-ticket, no-frontend, correction/refresh, review, blocked,
integration-conflict, and cleanup paths all have an explicit owner. The stable
prototype repository remains the product-surface identity and integration base;
the active ticket worktree is the only editing checkout. Bootstrapper's
candidate work is therefore isolated without transferring Product ticket or
commit ownership to the child role.

## Post-approval micro review

- **Ownership:** management owns repository state; each mode owns only its
  experience artifacts; Bootstrapper owns only current-experience parity.
- **Identity:** canonical repository, active worktree, ticket branch, accepted
  base, ticket revision, integration result, and cleanup result are distinct
  fields in the durable ticket/report contracts.
- **Routing:** the fixed Bootstrapper payload is defined once in the management
  skill; mode skills decide when it applies, and dynamic handoff rules still
  decide recipients.
- **Concurrency:** separate Git worktrees protect active ticket edits, while
  explicit runtime-resource ownership and deliberate base reconciliation cover
  the remaining collision risks.
- **Redundancy:** team docs summarize ownership only; the management skill owns
  procedure; mode skills own behavior and evidence; templates own durable
  fields. The previous contradictory no-worktree statements were removed.
- **Safety:** dirty/ambiguous worktrees, unknown bases, merge conflicts,
  unowned processes, and unsafe cleanup remain blockers rather than being
  silently reset or shared.

Validation completed:

- `quick_validate.py` passed for all four authored skills.
- Authored-package Markdown links and JSON configs passed validation, excluding
  vendored `node_modules` documentation and metadata.
- `git diff --check` passed.
- A stale-policy scan found no remaining authoritative “no per-ticket
  worktree” statement in the Product Design & Prototyping package.

## Approval and refined implementation direction

Approval recorded: 2026-08-29. The user approved implementing the isolated
worktree model and asked for a dedicated Product Prototyper management skill.

The implementation uses one shared prerequisite skill,
`product-prototype-repository-management`, followed by exactly one mode skill:
`requirements-prototyper` or `interactive-requirements-visualizer`. The agent
configuration attaches all three so the agent can apply the management
prerequisite and select one mode; `agent.md` states that sequence
explicitly rather than presenting the management skill and mode skill as an
either/or choice.

The management skill owns Product Prototyper's repository, ticket,
worktree, branch, base-revision, integration, runtime-isolation, and cleanup
procedure. The mode skills own only final-prototype or visualization work.
Bootstrapper receives and uses the Product-owned active worktree without
owning its branch, ticket, acceptance, or commit lifecycle.
