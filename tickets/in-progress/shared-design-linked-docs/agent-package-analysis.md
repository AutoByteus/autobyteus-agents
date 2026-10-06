# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Package type: `team` (shared reference of the Software Engineering Team, plus the Solution Designer's matching text)
- Target package:
  - `/home/autobyteus/workspace/autobyteus-agents/agent-teams/software-engineering-team/shared/design-principles.md` §Project-Specific Design Principles
  - `/home/autobyteus/workspace/autobyteus-agents/agent-teams/software-engineering-team/agents/solution-designer/skills/solution-designer/` (design reading gate and design-spec record field)
- Scope included: the shared section, the Solution Designer's gate and record field, and a read-only check of every agent that reads the shared file
- Scope excluded:
  - any project's `DESIGN.md`
  - the consumers' skills and templates
  - all other principle content
- Request/reference: follow-up 1 from `tickets/in-progress/solution-designer-authority-reading-gate/agent-package-result.md`, redirected by the user (conversation, 2026-10-06). Update intent: `repair`.

## The relationship this text must express (user direction)

- **General design principles** apply to every software project. They are the shared `design-principles.md`.
- **A project's `DESIGN.md`** holds what only that project knows: its patterns, libraries, conventions and pointers to its own documents.
- **The connection:** the Software Engineering Team can be used on anyone's project, so the general rules cannot know what any `DESIGN.md` contains or how it is organized. The general layer may only say: check whether the project has a `DESIGN.md`, apply the general principles, and respect the project's own as well.

## Baseline

| File | Current text (after PRs #27 and #28) | Problem |
| --- | --- | --- |
| shared §Project-Specific Design Principles | "Read the `DESIGN.md` files … and the documents they link"; "When a project rule or link no longer matches…" | Prescribes how a project's links are used: project internals in the general layer. |
| Solution Designer gate (`SKILL.md` Phase 3) | "… plus each document they link whose area the change touches" | Same problem. This wording was copied from one project's `DESIGN.md`. |
| design-spec template `Authorities read` | "… and the linked documents whose area the change touches" | Same |

## Findings

| # | Priority area | Evidence | Owner | Impact | Change |
| --- | --- | --- | --- | --- | --- |
| 1 | Structure / ownership | All three texts above describe linked documents. A project's own `DESIGN.md` owns how its links are used; the workspace `DESIGN.md` §Project-specific design documents already does this. | shared file; Solution Designer gate and template | The general rules either over-prescribe (read all links) or encode one project's rule. Both break the general-versus-project boundary. | Remove every statement about linked documents. Keep only: check for `DESIGN.md`, apply the general principles, respect the project's own. |
| 2 | Clarity | The shared file says "common principles"; the user's model and the role of the file is "general". | shared file; template conflict field | Minor naming drift | Use "general" consistently in the section and the design-spec conflict field. |

My earlier repair attempt, which replaced "and the documents they link" with "whose area the change touches", was withdrawn. It moved one project's rule into the general layer.

## Cross-agent check

| Consumer | How it reads the shared file | Effect |
| --- | --- | --- |
| solution-designer | Design reading gate, in full | Gate and record field now say the same thing as the shared section. |
| architecture-reviewer, code-reviewer, implementation-engineer | "Start by reading" | They still learn to check for and respect `DESIGN.md`, and to use the design spec's record. Their skills and templates are unchanged. |

The section anchor `#project-specific-design-principles` is unchanged; the Solution Designer links to it.

## Preserved behavior

- Every role still respects the project's `DESIGN.md`.
- General principles win on conflict, and the conflict goes to the user.
- The `No project DESIGN.md found` record is unchanged.
- Closer `DESIGN*.md` files still refine the root file.
- Consumers still use the design spec's record when one exists.

## Changes

- Shared §Project-Specific Design Principles rewritten:
  - It is the general principles for any software project.
  - A project may add its own (patterns, libraries, conventions) in `DESIGN.md`.
  - Apply the general principles and respect the project's as well: check for applicable `DESIGN.md` files, read them, follow them.
  - The conflict, discrepancy and no-`DESIGN.md` rules are kept.
  - Nothing describes linked documents.
- Solution Designer gate: "the project's own `DESIGN.md` files that apply, when the project has them". No link rule.
- design-spec template: `Authorities read` lists the `DESIGN.md` path(s) only; the conflict field says "general principles".
- No project `DESIGN.md` is edited.

## Open questions and approvals

- Approved by the user in conversation ("Of course … it could only say respect that as well").

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Remaining text about linked documents in the team | None after the edit | `grep "documents they link\|linked documents\|linked doc"` over `agent-teams` |
| Consumers of the shared file | 4, via symlinks | solution-designer, architecture-reviewer, code-reviewer, implementation-engineer |

## Next action

Validate, open the PR, merge it.
