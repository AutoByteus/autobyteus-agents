# Agent Package Creation Result

- Status: **Completed — package creation and validation**
- Operation: `create`
- Package type: `team`
- Update intent: `new-package`
- Target: **Supervised Research Team**, `/home/autobyteus/workspace/autobyteus-agents/agent-teams/supervised-research-team/`
- Request: Task `autobyteus-agents-5`, Project `project_4b3f19d9-7fba-44b5-9747-84d2cd47dbc0`, delegated by `/project_task_manager` on 2026-10-28.
- Included: reusable two-member team, bundled research/supervision skills, shared evidence contract, routing, catalogue entry and observed validation.
- Excluded: SemFlow research/intake, changes to existing teams, scheduler/watchdog implementation, external publication or submission.

## Summary

Created a **Researcher + independent Research Supervisor** team. The supervisor
preserves the original goal, inspects actual evidence, sends insufficient work back
with verifiable closure criteria, and alone assesses team completion. Negative,
contradictory and limited findings are valid. Research completion and manuscript
readiness remain separate.

Three live synthetic cases passed on an isolated AutoByteus/Codex runtime. A premature
smoke-only completion claim was rejected and returned through real agent messages;
the researcher continued without a user reminder, and the supervisor independently
checked the corrected 12-case result. The defensible negative conclusion was accepted
without a publication claim. Missing data and an exhausted budget stopped honestly.

This is **message-driven continuation, not autonomous recovery from silent runtime
failure**. A stopped/unresponsive runtime or missing handoff needs a supported external
message/resume trigger. No watchdog or hard wall-clock/token enforcement is claimed.

## Ownership and design decisions

- Team summary owns cooperation; team configuration owns the coordinator, two local
  members and two unique conditional sender–recipient pairs.
- Researcher owns sources, methods, implementation, analysis and any requested writing;
  `evidence-research` is its bundled procedure. Keeping these together avoids a writer
  or planner losing the research context.
- Supervisor owns intake, goal preservation, independent critical checks, bounded
  continuation, terminal delivery and manuscript-readiness judgments through its
  bundled `research-supervision` skill. It does not repair and approve its own research.
- Shared `research-contract.md` owns the evidence bar and durable study interface;
  each skill reads a symlink to the same canonical file. Versioned cycles preserve
  rejected work, raw outputs and review history; follow-ups have one home per study.
- Two agents are necessary for independent judgment. A third planner/writer would
  add handoffs without another justified independence boundary. The lost private
  context is carried through goal, evidence, report and review artifacts.
- Existing Research Engineer and Deep Researcher capabilities were assessed, not
  copied or changed. Their standalone/self-review or brief-oriented contracts do not
  supply this team's mandatory supervisory boundary. Other research/writing teams
  retain their existing purposes. See [design](design.md).
- Defaults: six researcher batches, at most 15 minutes local experiment runtime per
  batch, no new paid/cloud services, stop after two no-progress returns. User limits
  override them; these are declared planning safeguards, not platform guarantees.

## Changed paths

### Added

Under `/home/autobyteus/workspace/autobyteus-agents/agent-teams/supervised-research-team/`:

- `team.md`, `team-config.json`, `shared/research-contract.md`.
- `agents/research-supervisor/agent.md`, `agent-config.json`, and
  `skills/research-supervision/SKILL.md` plus its shared-contract symlink.
- `agents/researcher/agent.md`, `agent-config.json`, and
  `skills/evidence-research/SKILL.md` plus its shared-contract symlink.

Task design, evidence, validation scripts/reports and this result under
`/home/autobyteus/workspace/autobyteus-agents/tickets/done/create-supervised-research-team/`.

### Modified

- `/home/autobyteus/workspace/autobyteus-agents/README.md`: one discovery row.

### Moved/removed package paths

None. Temporary test files were removed after archiving evidence. The unrelated
pre-existing Creator launch-config edit in the user's checkout was preserved.

## Durable artifacts

- Result: `/home/autobyteus/workspace/autobyteus-agents/tickets/done/create-supervised-research-team/agent-package-result.md`
- Design: `/home/autobyteus/workspace/autobyteus-agents/tickets/done/create-supervised-research-team/design.md`
- Validation: `/home/autobyteus/workspace/autobyteus-agents/tickets/done/create-supervised-research-team/validation.md`
- Live evidence: `/home/autobyteus/workspace/autobyteus-agents/tickets/done/create-supervised-research-team/evidence/`
- Follow-ups: `/home/autobyteus/workspace/autobyteus-agents/tickets/done/create-supervised-research-team/follow-ups.md`
- Analysis: N/A; this is a distinct new package, not an update.

## Approval state

**Approved scope; evidence gate passed.** The user explicitly selected a research
team and independent supervision. No unresolved material design decision remains.
The Creator workflow authorizes repository merge after successful validation; no
paper publication, deployment or new research assignment is authorized.

## Validation

| Check | Result |
| --- | --- |
| JSON, frontmatter, names, explicit skill attachment | Pass |
| Markdown links/anchors and shared symlinks | Pass |
| Standard skill validator, validation-script execution/compilation | Pass |
| Coordinator, local refs, unique rooted handoffs and terminal fallback | Pass |
| Runtime catalogue/tool availability and final-source equality | Pass in isolated server; no production-registration claim |
| Premature-completion rejection and actual continuation | Pass: A, two delivered messages, no caller reminder |
| Independent evidence check and limited valid conclusion | Pass: A, all 12 cases checked; Complete / Not ready |
| Initial intake, real blocker and finite-budget terminal behavior | Pass: B and C |
| Ownership, scope, final standard/anti-pattern review | Pass; existing packages unchanged |
| Imported shared dependencies / Org checks | N/A |
| Runtime/process/data cleanup | Pass; three runs terminated, port closed, temporary tree removed |

[Validation](validation.md) maps each behavioral claim to actual messages, tool events
and artifacts, and explicitly lists untested paths. Source fingerprints, loaded
catalogue, API receipts and cleanup proof are retained.

## Risks and remaining questions

- A silent stall/crash is not observable by an idle supervisor without a supported
  external trigger. Message acceptance is not proof of work; only the returned
  evidence and review close the investigation.
- Synthetic cases on one model/runtime are not proof of long-horizon or domain-wide
  reliability. Positive manuscript-readiness, other runtimes, user pause, repeated
  no-progress and failed/duplicate-message recovery were not live-tested.
- Agent-only independent review is not external peer review, and no acceptance or
  publishability guarantee is made. Scientific and access limitations remain explicit.
- No SemFlow work was performed. Its unfinished material intake stays separate.

## Delivery and next action

Deliver through the repository's `main` base branch after the evidence gate, then
update the primary checkout and remove this task's feature branch/worktree. This
artifact is saved before that Git operation and final transport; the final caller
message provides the actual merge/cleanup receipt rather than predicting success.

The caller can close this package-creation task once that receipt is supplied.
To use the package, refresh/import the Agents repository and address the team with
a research goal, study workspace, materials and limits. Any SemFlow investigation
or unattended-recovery project is a separately authorized follow-up; see
[follow-ups](follow-ups.md).

## Handoff state at persistence

- `get_handoff_rules`: not yet called for the terminal handoff; required after Git delivery.
- Matching routes / sends: not yet claimed. Apply every returned matching route.
- Caller: `/project_task_manager`, run `project_task_manager_2f41a1df4e464bf2aa8970327d9d7ad0`.
  Final result delivery will include this absolute path and the observed repository receipt.
