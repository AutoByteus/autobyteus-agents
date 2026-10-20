# Agent Package Analysis: who brings the design project up to date after a baseline refresh

- Status: `Completed` (waiting for the user's decision)
- Operation: `update` (update intent: `repair`)
- Package type: `team` (`agent-teams/product-team`)
- Target package: worktree `/tmp/pbi`, branch `product-baseline-integration`, from `origin/main` at `d3b210e`
- Files read in full:
  - `team.md`, `team-config.json`;
  - the Bootstrapper's `agent.md` and skill;
  - the Designer's `agent.md` and `product-design-repository-management` skill;
  - `product-experience-design` "Bootstrap Routing";
  - shared principles §2 (refresh policy), §8 and §9.
- Observed, read-only: the design repository `/Users/normy/autobyteus_org/autobyteus-web-design` (history of `personal`, worktrees) and REFRESH-011's `product-ticket.md`.
- Request/reference: Task autobyteus-agents-38 (from the UI Baseline Bootstrapper at the user's direction, 2026-10-20). The user asked whether the design project is up to date after a refresh, and said that if not, the package has a problem.

## Map: how a refresh reaches `personal` today (observed)

| Step | Who | Evidence |
| --- | --- | --- |
| Open a refresh ticket and worktree, send the fixed payload | Designer (repository-management skill) | REFRESH-011 `product-ticket.md`: requester the Designer, for design ticket `settings-update-notifications` |
| Refresh in the assigned worktree; report a candidate | Bootstrapper | REFRESH-011: uncommitted changes, HEAD `7ca2ff0` |
| Review and accept | Designer (`product-experience-design`, Bootstrap Routing) | – |
| Commit, integrate into `personal`, fast-forward the canonical checkout, record it | Designer (repository-management, "Commit, Integration, And Cleanup") | REFRESH-009: commit `e4d81b2` and integration `b31a5b1` at 08:02. REFRESH-010: `837ef2a` at 08:40, integration recorded in `e5ad9d8` at 08:44. Both minutes after acceptance; design tickets merged `personal` afterwards. |

So the package does bring the design project up to date, through the Designer, after acceptance. REFRESH-011 is not in `personal` because it is still in progress, not because a step is missing.

## What is actually wrong

| # | Finding | Kind | Owner |
| --- | --- | --- | --- |
| F1 | The Bootstrapper's skill describes only its own part. It cannot tell the user whether and when the project will be current, and its answer ("no, and the skill forbids it") read as if nothing would ever update it. | Missing information for a role that is asked | Bootstrapper skill (handoff and report) |
| F2 | The Designer's repository skill makes integration explicit only for the first accepted baseline ("After the baseline is accepted, create the accepted baseline commit and integrate it"). For a refresh or correction it holds only through the general finalization section and practice (009, 010). | A rule that depends on reading two sections together | Designer's repository-management skill |
| F3 | REFRESH-011's record plans for the design worktree to "merge this refresh before its final references". If a design ticket merges the refresh branch before the refresh is integrated, the refresh reaches `personal` only inside a design ticket, and the record of when the project became current is split. | A path that bypasses the one record | Designer's repository-management skill ("Resumption And Base Advancement") |

## The decision (for the user)

Who brings the design project up to date after a refresh, and when?

- **(a) The Bootstrapper integrates it itself into `personal`.** Against it:
  - it would commit an unreviewed candidate, while acceptance is the Designer's quality gate;
  - it would write to the canonical checkout, where the user and other active worktrees work (the shared principles forbid that during ticket work);
  - the repository lifecycle would have two owners.
- **(b) The Designer integrates it, as today, made explicit and immediate (recommended).**
  1. Every accepted baseline result (initial, correction or refresh) is committed and integrated into the default branch right away as its own baseline ticket, and its record says so.
  2. A design ticket that needs the refresh merges the default branch after that integration, never the refresh branch.
  3. The Bootstrapper's report and handoff state that its result is a candidate, which the Designer accepts and integrates into the default branch. When asked whether the project is current, it points to that step and to the baseline ticket's integration result.

  The Task's version of (b) had the Bootstrapper check `personal` before reporting done. That cannot work: acceptance happens after its report. The one home for "is `personal` current?" is the baseline ticket's integration result, written by the Designer.

## Planned changes, if the user chooses (b)

- **Bootstrapper skill:** one sentence each in the Design Repository Boundary and the handoff on what happens next and who owns it.
- **Designer's repository-management skill:**
  - Baseline And Bootstrap Boundary: accepted initial, correction and refresh results are integrated at once as a baseline ticket.
  - Resumption: dependent tickets merge the default branch after integration, not the refresh branch.
- **Shared principles §9:** "commits the accepted baseline" becomes "commits and integrates each accepted baseline result (initial, correction, refresh) into the default branch".

## Real-use check plan

A small refresh in a scratch design repository (a test copy, not the user's), in an isolated app, with the Product Team:

1. the Designer requests a refresh;
2. the Bootstrapper refreshes and reports a candidate;
3. the Designer accepts and integrates it.

Expected: the default branch carries it, the commit is recorded in the baseline ticket, and a dependent ticket merges the default branch.
