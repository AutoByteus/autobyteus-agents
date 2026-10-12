# Agent Package Analysis

- Status: `Completed`
- Operation: `update` (intent: `simplify`)
- Package type: `team` member skill (Software Engineering Team, Solution Designer), plus the team's summary and one route condition
- Target package: `agent-teams/software-engineering-team/` at `origin/main` `ec90c33`
- Scope included: Solution Designer `SKILL.md` (§1, §2, Purpose, Recovery), `agent.md`, `references/requirements-engineering.md`, `references/architecture-design.md`, templates (requirements-doc, design-spec, solution-revision-record); `team.md`; `team-config.json` (architecture-review route condition).
- Scope excluded: other members' "Requirement Gap needs user approval" rules (new policy, security, migration, scope). These are the "needs the user" cases and stay. Delivery's user-verification hold is unchanged; it is the safety net. PR #40 (waiting notice) is a separate PR.
- Request/reference: Project Task `project_task_f3f4b283-…`, addition from the user 2026-10-12. About 80% of the designer's reasoned recommendations are accepted as they are, and about 20% need discussion. "I trust the solution designer has really, really good judgement."

## Baseline

| Location | Current rule |
| --- | --- |
| SKILL §1 (lines 113–123) | Decide details within the direction; "Leave for the user only decisions that change scope or product direction, or a real product trade-off the evidence cannot settle". No concrete criteria. |
| SKILL §2 "Obtain Explicit Requirements Approval" (139–158) | Always present the requirements and wait: "Record explicit user approval … Never mark requirements Approved without that evidence. Hold at `Ready for Approval`…" |
| SKILL Purpose (13, 27) | "User approval separates them"; "only the user approves intended-behavior changes". |
| SKILL Recovery table (227) | `Requirement Gap`: "obtain renewed explicit user approval". |
| `agent.md` (3, 13) | "explicit user approval"; "The user remains the authority for approving intended behavior." |
| requirements-engineering.md (40–41) | "Never mark the package `Approved` without explicit user approval"; "After readiness and explicit approval…". |
| architecture-design.md (52) | "obtain renewed user approval before changed intended behavior governs design". |
| Templates | requirements-doc "Content ready for user approval" / "User approval received"; design-spec "user-approval reference", "renewed user approval"; solution-revision-record "user-approval reference". |
| `team.md` (9) | "explicit user approval between those phases". |
| `team-config.json` (46) | Architecture-review route: "Requirements … must have current explicit user approval." |
| Delivery Engineer | "user-verification hold" before finalization (unchanged). |

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Content flow | §2 always waits for the user | SKILL §2 | Most "please approve" stops are for requirements the user accepts as they are. | Within the direction and with no `Needs user` decision: approve yourself, tell the user briefly what and why, continue. Otherwise ask and wait as today. |
| 2 | Clarity | §1 gives no concrete criteria for "needs the user" | SKILL §1 | The line between deciding and asking is fuzzy, so the designer over-asks. | Name the criteria: scope or product direction; visible behaviour or taste the direction doesn't settle; hard to undo; security or cost; conflicts with the user's explicit request. Say plainly that its judgement is trusted. |
| 3 | Consistency | "explicit user approval" in 10 places (Baseline) | each file | The other files would still require the old gate. | Point each to §2: "approval (§2)", recording who approved. |
| 4 | Ownership | team-config route condition | `team-config.json` | Architecture review would refuse a designer-approved basis. | "current approval: the user's, or the Solution Designer's within the request's direction with the user informed". |

## Planned changes

- **SKILL §1:** the criteria list, plus "your judgement on the rest is trusted".
- **SKILL §2:**
  - retitle "Approve The Requirements Basis";
  - add a **Within the direction** bullet (approve, inform, continue; the safety net is the recorded reasoning and the user's in-app verification);
  - turn the existing ask bullet into **Needs the user** (ask directly and wait);
  - the record bullet records who approved.
- **SKILL Purpose and Recovery:** point to §2.
- **`agent.md`, requirements-engineering.md, architecture-design.md, templates, `team.md`, `team-config.json`:** wording aligned with §2. The criteria are stated only in §1.

Merge note: PR #40 also edits SKILL §2 (removes the waiting-notice sentence). Whichever PR lands second is rebased; the conflict is limited to adjacent lines in §2.
