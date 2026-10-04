# Agent Package Analysis

- Status: `Completed`
- Operation: `update`
- Update intent: `optimize`
- Package type: `agent`
- Target package: `code-reviewer` (`/home/autobyteus/workspace/autobyteus-agents/agent-teams/software-engineering-team/agents/code-reviewer`)
- Scope included: `agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/SKILL.md`, `templates/code-review-report-template.md`, `templates/code-review-revision-record-template.md`, `agent.md`, and `agent-teams/software-engineering-team/team.md`.
- Scope excluded: Tool configuration in `agent-config.json` (tools remain identical: `edit_file`, `read_file`, `write_file`, `run_bash`, `send_message_to`, etc.); external team member boundaries remain intact.
- Request/reference: User request to codify autonomous reviewer scope-sizing on subsequent rounds (targeted delta review vs. autonomous full re-audit based on cumulative drift/blast radius, replacing any mechanical round counter).

## Baseline

| File | Current responsibility |
| --- | --- |
| `agent.md` | Code reviewer identity, scenario-grounding invariant, revision-record mandate, authoritative skill reference for review scope and routing. |
| `skills/code-reviewer/SKILL.md` | Three review entry points, implementation review sequence, candidate gate, failure classification, handoff rules. Mention of round `>1` rechecking prior findings, but lacks explicit autonomous criteria for choosing between a targeted delta review and an autonomous full re-audit. |
| `skills/code-reviewer/templates/code-review-report-template.md` | Canonical report template. Tracks round and scorecard, but lacks explicit tracking of review scope mode (`Targeted Delta` vs `Autonomous Full Re-Audit`) and cumulative blast radius assessment. |
| `skills/code-reviewer/templates/code-review-revision-record-template.md` | Chronological revision record template (`CRR-*`). Lacks explicit scope mode indicator. |

## Preserved behavior

- Round 1 (`CRR-001`) remains a mandatory, comprehensive full implementation-source review across all checks and the 10-category scorecard (`>=9.0` clean pass threshold).
- Grounding in supported product scenarios and governing contracts remains strictly enforced.
- Single canonical report (`code-review-report.md`) is maintained across all rounds.
- Failure classifications (`Local Fix`, `Design Impact`, `Requirement Gap`, `Unclear`) and exact routing destinations remain intact.
- Separate proportional test-code review and failure-origin review entry points remain distinct.

## Findings

| # | Priority area | Evidence | Owner | Impact | Recommended change |
| --- | --- | --- | --- | --- | --- |
| 1 | Content flow & decision autonomy | `SKILL.md:107-112`, `SKILL.md:226-227` mentions round `>1` rechecks prior findings, but does not provide explicit decision criteria for when the reviewer should keep the review targeted vs. autonomously trigger a full re-audit. | `SKILL.md` | Reviewer might either over-audit trivial fixes or under-audit subtle cumulative drift across multiple rounds. | Add explicit **Autonomous Review Scope Sizing** rule: default to Targeted Delta Review for bounded fixes; autonomously elevate to Autonomous Full Re-Audit when cumulative drift, patch-on-patch complexity, or shared interface changes threaten system-wide convergence. |
| 2 | Report precision & audit trail | `code-review-report-template.md:16-46` and lines 61-66 record scope and round number, but do not record whether the round was conducted as a Targeted Delta or Full Re-Audit, nor the blast radius rationale. | `templates/code-review-report-template.md` | Downstream consumers (and future review rounds) cannot see whether a pass was based on a narrow delta check or a comprehensive full re-audit. | Add `Round Review Scope` (`Full Initial Review` / `Targeted Delta Review` / `Autonomous Full Re-Audit`) and `Cumulative Blast Radius Assessment` to the template. |
| 3 | Revision record consistency | `code-review-revision-record-template.md:16-29` records review round, trigger, and what changed, but does not identify the scope mode. | `templates/code-review-revision-record-template.md` | Historical chronology does not distinguish delta passes from full re-audit passes at a glance. | Add `Review Scope Mode` field to revision entry template. |

## Recommended or planned changes

- `agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/SKILL.md`:
  - In `Implementation Review Basis And Sequence` (step 4), add explicit autonomous scope-sizing evaluation: evaluate cumulative churn, patch-on-patch complexity, and blast radius across rounds to determine whether to perform a Targeted Delta Review or elevate to an Autonomous Full Re-Audit.
  - In `Implementation Review Rules`, specify the criteria for:
    - (a) *Targeted Delta Review*: isolated fix confined to previous finding; revalidate affected checks; carry over valid prior evidence for unaffected checks.
    - (b) *Autonomous Full Re-Audit*: cumulative cross-file churn, modified shared types/interfaces, or patch-on-patch complexity across rounds; re-audit all 22 structural checks and full 10-category scorecard to guarantee convergence.
    - (c) *Design Escalation*: boundary breach or structural misalignment; escalate immediately to `Design Impact` -> `solution_designer`.
- `agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/templates/code-review-report-template.md`:
  - Add `Round Review Scope` (`Full Initial Review` / `Targeted Delta Review` / `Autonomous Full Re-Audit`) and `Cumulative Blast Radius Assessment` to `Review Round Meta` and `Review Scope`.
  - Update round rules to reflect autonomous scope-sizing.
- `agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/templates/code-review-revision-record-template.md`:
  - Add `Review Scope Mode` (`Full Initial` / `Targeted Delta` / `Autonomous Full Re-Audit`) to `CRR-*` entry structure.

## Open questions and approvals

- None. The approach adheres strictly to human reviewer reality and the repository's authoring principles.

## Analysis checks

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Target files exist | Pass | All paths in `agent-teams/software-engineering-team/agents/code-reviewer/` confirmed. |
| Single canonical owner per rule | Pass | Review scope decision owned by `SKILL.md`; artifacts owned by templates. |
| Tool dependencies preserved | Pass | No tool changes required in `agent-config.json`. |

## Next action

Apply the planned updates to `SKILL.md`, `code-review-report-template.md`, and `code-review-revision-record-template.md`.
