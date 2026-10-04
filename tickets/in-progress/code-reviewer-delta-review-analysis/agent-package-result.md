# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `agent`
- Update intent: `optimize`
- Target package: `code-reviewer` (`/home/autobyteus/workspace/autobyteus-agents/agent-teams/software-engineering-team/agents/code-reviewer`)
- Scope included: `SKILL.md`, `code-review-report-template.md`, and `code-review-revision-record-template.md` under `agent-teams/software-engineering-team/agents/code-reviewer/`.
- Scope excluded: Agent tool configuration (`agent-config.json`), external team members, and unrelated team routing.
- Request/reference: Codify autonomous review scope sizing for subsequent implementation-review rounds (targeted delta review vs. autonomous full re-audit based on cumulative blast radius and drift across rounds, replacing any mechanical round counter).

## Summary

Revised after independent review (see `agent-package-analysis.md`, "Revision after independent review"). The Code Reviewer now records a `Review Scope` for every implementation-review round:
1. `Full Review` on round 1.
2. `Targeted Delta Review` by default on round `>1` when changes stay within the files and behavior of the prior findings: recheck those findings, revalidate affected checks and scores, and carry forward still-valid evidence.
3. `Full Re-Audit` when changes across rounds touch the data-flow spine, change shared interfaces or data shapes, spread beyond the prior findings' files, or layer fixes on earlier fixes: rerun all structural checks and the full scorecard.
4. Design problems stay under the existing `Design Impact` classification, after the Candidate Finding gate.
5. Both templates record the scope with the same field name and values.

## Ownership and design decisions

- **Review scope criteria:** `SKILL.md` Implementation Review Rules only; step 4 points there.
- **Design Impact routing:** unchanged in Classification Rules and `team-config.json`.
- **Scope record:** one `Review Scope` field pair in the report template's Review Round Meta; one `Review scope` field in the revision-record template.

## Changed paths

### Added

- `None`

### Modified

- `/home/autobyteus/workspace/autobyteus-agents/agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/SKILL.md`
- `/home/autobyteus/workspace/autobyteus-agents/agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/templates/code-review-report-template.md`
- `/home/autobyteus/workspace/autobyteus-agents/agent-teams/software-engineering-team/agents/code-reviewer/skills/code-reviewer/templates/code-review-revision-record-template.md`

### Moved or renamed

- `None`

### Removed

- `None`

## Durable artifacts and evidence

- Result: `/home/autobyteus/workspace/autobyteus-agents/tickets/in-progress/code-reviewer-delta-review-analysis/agent-package-result.md`
- Analysis: `/home/autobyteus/workspace/autobyteus-agents/tickets/in-progress/code-reviewer-delta-review-analysis/agent-package-analysis.md`
- Design/requirements: User request to codify review scope sizing on later rounds; independent review at `/Users/normy/autobyteus_org/autobyteus-agents/tickets/in-progress/pr-25-code-reviewer-scope-review/agent-package-analysis.md`.
- Validation evidence: `quick_validate.py` on the skill; `git diff origin/main`; stale-term search.

## Approval state

- State: `Approved`
- Evidence or decision reference: Direct user directive to update the code reviewer agent package following package principles.

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | `N/A` | No JSON changed. |
| Frontmatter and names align | `Pass` | `SKILL.md` frontmatter `name: code-reviewer` unchanged. |
| Skill folder/frontmatter align | `Pass` | Folder `skills/code-reviewer/` matches. |
| Configured `skillNames` resolve | `Pass` | Unchanged `agent-config.json`. |
| Markdown links and references resolve | `Pass` | No links added or changed. |
| Skill validator and changed scripts | `Pass` | `quick_validate.py`: "Skill is valid!"; no scripts. |
| Member refs, coordinator, and rooted routes | `N/A` | No routing change; the existing `/code_reviewer` -> `/solution_designer` Design Impact route covers design issues. |
| Imported shared dependencies | `N/A` | None. |
| Ownership and cross-file consistency | `Pass` | Criteria stated once; identical field values in both templates; no remaining "autonomous", "blast radius", "Full Initial", or "Design Escalation" terms. |
| Scope/diff review | `Pass` | Diff against `main` limited to the three package files and this ticket folder. |

## Risks, questions, and blockers

- `None`.

## Next expected action

Review completed changes and present to the user.

## Handoff state

- `get_handoff_rules` called: `Yes`
- Matching routes: `None`
- Handoffs sent: `None`
- Caller return: `Yes` (User direct response)
