# Agent Package Creation Result

- Status: `Completed`
- Operation: `update`
- Package type: `team`
- Update intent: `repair`: handoffs attached far too many files (1,618 in one message)
- Target package: Software Engineering Team, `agent-teams/software-engineering-team/`; also `agents/agent-package-creator/` (anti-pattern and contract line)
- Scope included: every handoff, attach and preserve rule in the six roles; `team.md`; the delivery receipt check; the creator's anti-patterns and handoff contract.
- Scope excluded: the AutoByteus UI slowness with long attachment lists; evidence size and repository growth (parked); other teams' handoff wording (follow-up candidates below).
- Request/reference: Project Task `project_task_ecb48849-8c86-477c-aa06-ecf7c2fd3b67`

## Summary

The cause was that the role skills told every sender to carry "the complete
cumulative package" and "attach all relevant artifacts". Nothing asked the
sender to choose, so each role forwarded every reference it had received and
added its own. In the `shared-network-workspaces` run the list grew from 435
to 1,618, mostly old evidence and repository source, and agents built package
indexes and hash checks to prove nothing was dropped.

Now the agent decides, as the user asked: after finishing, it reasons about
what it produced, what the receiver does next and which files the receiver
will open, and hands off those. A shared guide owns that reasoning, with the
real before/after example (1,618 files vs. ten). Each role's per-route lists
became one line: your own documents always go (named per role, for example
the Solution Designer's handoff file, requirements, investigation notes,
solution revision record and design spec); other files are your judgement,
as the guide describes. Paths are absolute, including the ticket folder and
the worktree.

## Ownership and design decisions

- What a handoff carries: `shared/handoff-references.md`, guidance only. Linked from each role skill through a `references/` symlink, the team's pattern, and from `team.md`.
- Who decides: the sending agent, by judgement. There are no fixed per-route lists; route lines say "send the result to …".
- Traceability: unchanged. It stays in the revision records, the documents' upstream links, the proof table and the supplement inventory.

## Changed paths

### Added

- `agent-teams/software-engineering-team/shared/handoff-references.md`
- `agent-teams/software-engineering-team/agents/*/skills/*/references/handoff-references.md`: six symlinks to the shared file
- `tickets/in-progress/se-lean-handoffs/agent-package-analysis.md`, `agent-package-result.md`

### Modified

- `team.md`: one pointer sentence; "carries" becomes "has".
- code-reviewer `SKILL.md`: removed "Preserve the complete cumulative artifact package through every reroute" and "attach all relevant artifacts"; one handoff line; the routes send the result.
- api-e2e-engineer `SKILL.md`: the full document list and "Attach the complete cumulative package…" become the one line (removed test files are still given as paths with the diff).
- implementation-engineer `SKILL.md`: a Local Fix arrives with the finding and its evidence; the send list becomes the one line.
- architecture-reviewer `SKILL.md`: the pass and fail sends become the one line plus "send the result".
- solution-designer `SKILL.md`: names the supplements the receiver needs; attaches the handoff file plus the files the receiver needs; the receipt checks the final documents, not "cumulative artifact paths".
- solution-designer `references/requirements-engineering.md`: link the UI/UX package from the requirements doc; keep supplements in the inventory.
- delivery-engineer `SKILL.md`: the terminal message names the archived folder and the final documents the receipt check needs.
- Input lists in four roles: "cumulative" and "complete" dropped from "Accept the … package".
- Creator `package-anti-patterns.md`: new entry 18, "Handoffs that forward everything". Creator `result-and-handoff-contract.md`: step 2 now asks for the artifacts the recipient needs, not "all still-relevant upstream artifacts".

### Removed

- None (only lines inside the files above).

## Approval state

- State: `Pending`: PR for the user's review; merge on "approved, merge".

## Validation

| Check | Observed result | Evidence or limitation |
| --- | --- | --- |
| Changed JSON parses | Pass | All team JSON loads (none changed) |
| Frontmatter and names align | Pass | `quick_validate.py`: the six SE skills and the creator skill are valid |
| Skill folder/frontmatter align | Pass | Same |
| Configured `skillNames` resolve | N/A | No config changed |
| Markdown links and references resolve | Pass | Link check over the team: 0 broken; the six symlinks resolve |
| Member refs, coordinator, routes | N/A | `team-config.json` unchanged |
| Ownership and cross-file consistency | Pass | Search for "cumulative package", "complete package", "attach all" and "every still-relevant supplement and" in the team: none left |
| Scope/diff review | Pass | Only handoff, attach, preserve and receipt lines changed |
| Final review against the standard and anti-patterns | Pass | Round 1: removed repeated "do not re-attach" lines (anti-pattern 4). Round 2 (user direction): replaced per-route lists with agent judgement (anti-pattern 7). Round 3: removed a duplicate absolute-paths line. Round 4 (user direction): absolute paths for the ticket folder and worktree; each role's own documents always handed off. |

## Risks, questions, and blockers

- Not yet observed in a live run. The next SE ticket's handoffs will show it.
- Follow-up candidates (anti-pattern 18 detection, no change here):
  - STORM's six skills attach "the handoff file plus the cumulative artifact package". Its "default cumulative package" per receiver is a bounded list.
  - Article Writing (after PR #50) sends "the full package" for draft review. It is a small set of named documents.
  - Product Team's `product-experience-design` says "every still-relevant supporting artifact".
- Separate possible Task: the AutoByteus UI slows down rendering a message with many attachments.

## Next expected action

The user reviews the PR. On "approved, merge": merge, update the local checkout, and report to the PM.

## Handoff state

- `get_handoff_rules` called: at report time.
