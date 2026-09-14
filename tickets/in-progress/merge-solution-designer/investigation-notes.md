# Investigation — Merge Solution Designer

## Scope and evidence
Medium: agent/skill ownership and cross-team routing change; no application code or external schema change. Working tree on existing isolated role-split branch. Baseline changes recorded in baseline-status.txt and safety diff in /tmp/merge-solution-designer-baseline.patch.

### Source log / commands
- `git status --short`, `git branch --show-current`, `git worktree list`: current dedicated branch codex/solution-designer-to-architecture-designer, no checkout or branch replacement needed.
- `git show main:agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/SKILL.md`: original combined owner already investigates, obtains requirements approval, performs additional architecture investigation, maintains canonical artifacts, and handles requirement/design re-entry. Use its ownership model, not an old-file revert.
- Read requirements-engineer agent, skill and all three templates under agent-teams/software-development-department/agents/requirements-engineer/: current supported scenario basis, approval, prototype ownership, readiness and safe direct route are invariants to preserve.
- Read architecture-designer agent, skill and both templates under agent-teams/software-engineering-team/agents/architecture-designer/: strict upstream read-only ownership causes feedback round trips; preserve technical depth, data transitions, content-versus-structure risk and conditional review.
- Read both team-config.json files, team.md files, Product team config and ownership references; `rg` on role names and both revision formats across README.md, agents and agent-teams finds downstream artifact contracts and Product references to update.
- Read implementation, architecture-review, code-review, API/E2E and delivery contracts. Delivery currently returns directly to Requirements Engineer; move to Solution Designer then terminal department response. API/E2E skill declares upstream pre-execution gaps but team config lacks that direct route; make it explicit while retaining Code Review failure-origin route for execution failures.
- Read README package layering, shared reference/symlink conventions and shared design principles. Designer symlinks currently resolve to the engineering team's canonical shared files; retaining that folder depth preserves them.
- Read-only implementation verification in adjacent checkout: ../autobyteus-workspace/autobyteus-server-ts/src/agent-team-definition/services/team-definition-graph-resolver.ts requires exactly one direct Agent coordinator, not a nested team coordinator. No adjacent repository changes.

## User clarification / definitive target
The user explicitly requires Solution Designer to remain coordinator of Software Engineering Team and a new thin placeholder Department Head to coordinate Software Development Department. Earlier proposed department-level Solution Designer is superseded, not implemented.

## Supported flows and ownership
- Intake: Department Head forwards unchanged request/context to nested Solution Designer, without requiring a requirements package first.
- Discovery/requirements and design are phases of one Solution Designer with one canonical investigation artifact and solution revision index.
- Product help: Solution Designer communicates directly with Product Prototyper; no Department Head relay.
- Requirements user approval precedes design. Changed intended behavior invalidates the affected approval/design basis until renewed approval; new evidence alone does not.
- Direct implementation remains available for approved Small/Medium Low-risk nonstructural changes; uncertainty enters additional design investigation locally, not self-handoff.
- Architecture review remains independent for Large/High packages. Reviewer owns its primary forward handoff and informational designer notice.
- All downstream requirement/design/unclear findings return to Solution Designer; local implementation and failure-origin ownership are retained.
- Delivery owns verification/finalization; Solution Designer verifies receipt and returns terminal package to Department Head; Department Head returns it without redoing gates.

## Constraints / risks
Do not lose pre-existing requirements scenario and reviewer improvements. Keep Product team repository/workflow independent. Historical tickets and .codex/artifacts remain historical evidence, not live role references to rewrite. No old-role aliases or duplicate designer instances. No application runtime is launched for this definition-only change; executable validation can prove topology/config/path contracts, while natural-language role execution requires a later real team run.

## Post-Design Classification And Consistency Update

Applied the user-approved audit with the later design-before-classification
clarification. Implementation is complete; 11 package regression tests and
10 standard skill validations passed. Manual contract walkthrough and preservation
checks are recorded in `.codex/artifacts/solution-designer-consistency-audit/validation.md`.
All implementation-ready routes now require design; independent review thresholds
and executable validation are preserved. Shared technical guidance and Product
team files are unchanged in this round. Earlier no-design descriptions are
superseded by the current approved revision. No live team run or repository
finalization was performed. Awaiting user verification.
