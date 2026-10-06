# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (began as `analyze`; user approved on 2026-10-04)
- Package type: `team` (Software Engineering Team: Solution Designer, plus the members that judge or implement its design)
- Target package: `/Users/normy/autobyteus_org/autobyteus-agents/agent-teams/software-engineering-team/`
- Scope included: Solution Designer agent, skill, references, templates; shared `design-principles.md`; design-reading instructions of Architecture Reviewer, Implementation Engineer, and Code Reviewer; the API/E2E Engineer's testing-guideline pattern as the reference; guidance files in the AutoByteus workspace (`/Users/normy/autobyteus_org/autobyteus-workspace-superrepo`).
- Scope excluded: changes to any file; the AutoByteus workspace repository itself.
- Request/reference: User request, 2026-10-04: does the Solution Designer read project-specific solution-design practices from the target project, the way the testing roles read `TESTING.md`?

## Answer

No. The Solution Designer reads only the team's generic `design-principles.md`. It has no step to find a project's own design practices, and neither do the reviewers who judge its design. The only project-specific design document it knows is one AutoByteus path hard-coded into its migration check.

## Baseline

| File | Current behavior |
| --- | --- |
| `api-e2e-engineer/SKILL.md` lines 62–65 (reference pattern) | Looks for `TESTING.md` or `TESTING*.md` at the repository root plus closer ones toward the changed code; follows it for project-specific choices; it cannot lower the evidence bar or change ownership, routing, or safety; conflicts are recorded and the skill wins; stale commands are recorded; absence is recorded as `No project testing guideline found`. The coverage template records the path. |
| `implementation-engineer/SKILL.md` line 76 | Same `TESTING.md` discovery for local checks. |
| `solution-designer/SKILL.md` line 125 | Architecture design reads `references/architecture-design.md` and the shared `design-principles.md` only. |
| `references/requirements-engineering.md` line 8 | Investigation uses "the closest applicable repository instructions" as an evidence source; not a design-practice authority. |
| `references/architecture-design.md` lines 15–24 | Migration check hard-codes `autobyteus-server-ts/docs/design/data_migration_guideline.md` "for AutoByteus server work". |
| `shared/design-principles.md` | The team-wide design authority, symlinked into four skills. No section on project guidance. |
| `architecture-reviewer/SKILL.md` line 43, `code-reviewer/SKILL.md` line 79, `implementation-engineer/SKILL.md` line 53 | Each starts from `design-principles.md` only. |

AutoByteus workspace (`autobyteus-workspace-superrepo`) today:
- `TESTING.md` at the root: the testing map the testing roles use.
- `autobyteus-web/ARCHITECTURE.md`, `autobyteus-server-ts/docs/ARCHITECTURE.md`: descriptions of the current architecture.
- `autobyteus-server-ts/docs/design/`: design documents, including `data_migration_guideline.md`, the one prescriptive design practice.
- `autobyteus-server-ts/AGENTS.md`, `autobyteus-web/AGENTS.md`: agent instructions per package.
- No root design-guideline file.

## Preserved behavior

- `design-principles.md` remains the team's design standard and the shared basis for design, implementation, and review.
- User approval of intended behavior, the requirements/design separation, classification, and routing stay unchanged.
- The migration convention check stays mandatory when persisted data may be transformed.
- Testing-guideline behavior of the API/E2E and Implementation Engineers stays unchanged.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure and ownership (missing behavior) | No member discovers a project design guideline; all four design-reading roles start from `design-principles.md` only. | `shared/design-principles.md` | Designs ignore project-specific practices (layering, patterns, naming, state, error handling, migration policy) unless the designer happens to find them. | Add one short "Project design guideline" section to the shared principles, mirroring the testing pattern: discovery, what it governs, precedence, conflicts, absence. One owner for four consumers. |
| 2 | Content flow | The rule must sit where the designer reads before designing; reviewers must read the same guideline the design used. | Solution Designer `architecture-design.md`; reviewer skills | If only the designer reads it, reviewers flag project-sanctioned patterns or miss project rules; the handoff carries no record of which guideline applied. | Designer records the guideline path(s), or `No project design guideline found`, in investigation notes and the design spec; Architecture Reviewer, Implementation Engineer, and Code Reviewer read the guideline the design spec cites. |
| 3 | Grounding | `architecture-design.md` hard-codes an AutoByteus path in a team skill used for any project. | `architecture-design.md` | Other projects get a path that does not exist; AutoByteus gets a path that may move. | Find the migration convention through the project design guideline or repository docs; keep the AutoByteus path only as an example until the workspace's guideline links it. |
| 4 | Clarity | AutoByteus already has `ARCHITECTURE.md` files, which describe the current system, while practices live elsewhere (`docs/design/`). | Shared principles | Mixing "what the system is" with "how we design here" blurs evidence and rules. | Treat `DESIGN.md` (prescriptive practices) as the guideline and `ARCHITECTURE.md` (descriptive) as current-state evidence for investigation. |

## Recommended changes

Not applied; they need an `update` request.

In `autobyteus-agents` (this repository):

1. `shared/design-principles.md`: add a short section:
   - Look for `DESIGN.md`, or an equivalent `DESIGN*.md`, at the repository root, plus closer ones between the root and the changed code. A closer guideline refines the root one for its directory.
   - Follow it for project-specific design choices: layering and module conventions, patterns, naming, state and error-handling conventions, persisted-data and migration policy.
   - It refines these principles; it does not waive them, and it does not change approvals, ownership, routing, or the review bar. On a conflict with these principles, follow these principles and record the conflict as an open question for the user. Record a stale path or rule as a discrepancy.
   - `ARCHITECTURE.md` and similar files describe the current system: use them as investigation evidence, not as rules.
   - Without a guideline, derive conventions from `AGENTS.md`, `README`, and the existing code, and record `No project design guideline found`.
2. Solution Designer:
   - `references/architecture-design.md` investigation standard: read the project design guideline before designing; record its path(s) in investigation notes and the design spec.
   - Migration check: locate the convention through the project design guideline or repository docs; keep the AutoByteus path as an example.
   - `templates/investigation-notes-template.md` and `templates/design-spec-template.md`: a field for the guideline path(s) and any conflicts.
3. Architecture Reviewer, Implementation Engineer, Code Reviewer: one line each to read the project design guideline cited in the design spec; reviewers check the design or code against it as well.

In the AutoByteus workspace (separate repository, separate task): add a root `DESIGN.md` as the map of design practices, linking `autobyteus-server-ts/docs/design/data_migration_guideline.md` and the other `docs/design/` practices, as `TESTING.md` does for testing. Without it the new step finds nothing in AutoByteus and falls back to `No project design guideline found`.

## Open questions and approvals

0. Discussed (user, 2026-10-04): the data migration guideline is project-specific and belongs to the project's design guideline, not to the skill. The project's `AGENTS.md` should point each activity to its guideline (solution design -> `DESIGN.md`, testing -> `TESTING.md`). Evidence: `autobyteus-server-ts/AGENTS.md` line 5 already points to `TESTING.md`; the workspace root has no `AGENTS.md`. Recommendation: discovery = a guideline named in the closest `AGENTS.md` first, else `DESIGN.md`/`DESIGN*.md` by convention; `DESIGN.md` is a short map like `TESTING.md` (project rules plus links), with a migration section summarizing the key rules and linking the 408-line `data_migration_guideline.md`; the skill drops the hard-coded AutoByteus path once the workspace `DESIGN.md` links it.
0b. Discussed (user, 2026-10-04): `ARCHITECTURE.md` is hard to keep current as a project grows. Evidence: `autobyteus-web/ARCHITECTURE.md` (80 lines) last changed 2026-07-20 with 674 web commits since; `autobyteus-server-ts/docs/ARCHITECTURE.md` (223 lines) is current but accumulating feature sections; both repeat testing content owned by `TESTING.md`. Recommendation: no skill requires `ARCHITECTURE.md`; when present it is optional, possibly stale evidence, verified against code; the design guideline holds only stable rules.
1. File name: `DESIGN.md`, matching `TESTING.md`? (Recommended; `ARCHITECTURE.md` stays current-state evidence.)
2. Precedence on conflict: team principles win and the conflict goes to the user (recommended), or the project guideline wins for project-specific choices?
3. Should the reviewers and the Implementation Engineer be included now (recommended, so design and review use the same rules), or only the Solution Designer?
4. Create the AutoByteus `DESIGN.md` as a follow-up task in the workspace repository?

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Testing-guideline pattern located | Pass | `api-e2e-engineer/SKILL.md` 62–65; `implementation-engineer/SKILL.md` 76. |
| Project design guidance in Solution Designer | None found | `grep` over the skill, references, templates, shared principles: only the hard-coded migration path. |
| Design-reading roles | 4 found | Solution Designer, Architecture Reviewer, Implementation Engineer, Code Reviewer each start from `design-principles.md`. |
| AutoByteus guidance files | Observed | Root `TESTING.md`; two `ARCHITECTURE.md`; `docs/design/data_migration_guideline.md`; per-package `AGENTS.md`; no root design guideline. |

## Final plan (approved 2026-10-04)

Project side, done: the workspace already had a root `AGENTS.md` pointing to `SOLUTION_DESIGN_BEST_PRACTICES.md` (missed earlier because a stale checkout was inspected). At the user's direction it was renamed to `DESIGN.md`, the `AGENTS.md` link updated, and a "Project-specific design documents" section added linking the migration guideline and other design documents. Pushed to `origin/personal` as `f8300e7bd` and `0a32261d6`. `ARCHITECTURE.md` is out of scope.

Agent side (this repository):
1. `shared/design-principles.md`: new "Project Design Guideline" section. Discovery: the design guideline named in the closest applicable `AGENTS.md`; otherwise `DESIGN.md` or `DESIGN*.md` at the repository root plus closer ones. It refines, never waives, these principles, approvals, ownership, routing, or the review bar; conflicts go to the user as open questions; stale rules are recorded; absence is recorded as `No project design guideline found`.
2. Solution Designer: `SKILL.md` step 3 and `architecture-design.md` read and record the guideline; migration check finds the convention through the guideline instead of the hard-coded AutoByteus path; investigation-notes and design-spec templates record the guideline path(s) and conflicts.
3. Architecture Reviewer, Implementation Engineer, Code Reviewer: read the guideline the design spec cites.

## Next action

Apply the agent-side plan, validate, and write `agent-package-result.md`.

## Handoff state

- `get_handoff_rules` called: `Yes`
- Handoffs sent: None
- Caller return: Yes; no rule matched.
