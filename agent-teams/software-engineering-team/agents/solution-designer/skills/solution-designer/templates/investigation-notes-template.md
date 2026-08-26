# Investigation Notes

Write this artifact to a canonical file path in the assigned task workspace before any handoff message.

## Investigation Status

- Bootstrap Status:
- Current Status:
- Investigation Goal:
- Scope Classification (`Small`/`Medium`/`Large`):
- Scope Classification Rationale:
- Scope Summary:
- Primary Questions To Resolve:

## Request Context

## Environment Discovery / Bootstrap Context

- Project Type (`Git`/`Non-Git`):
- Task Workspace Root:
- Task Artifact Folder:
- Current Branch:
- Current Worktree / Working Directory:
- Bootstrap Base Branch:
- Remote Refresh Result:
- Task Branch:
- Expected Base Branch (if known):
- Expected Finalization Target (if known):
- Bootstrap Blockers:
- Notes For Downstream Agents:

## Supplemental Task Artifact Inventory

Maintain the canonical inventory of separate files that remain useful as investigation evidence or as complementary requirement, design, or downstream context. Do not inventory disposable scratch files or generated intermediates unless they are intentionally promoted for continued use.

| Artifact Path | Purpose And Scope | Evidence, Context, Or Decision Captured | Core Artifact(s) Supported | Related Requirement / Acceptance-Criteria IDs (When Applicable) | Status | Approval Applicability / State | Follow-Up Needed |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

## Source Log

| Date | Source Type (`Code`/`Doc`/`Spec`/`Web`/`Repo`/`Issue`/`Command`/`Trace`/`Log`/`Data`/`Setup`/`Other`) | Exact Source / Query / Command | Why Consulted | Relevant Findings | Follow-Up Needed |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | Code | `src/example/file.ts` | Verify the current owner and entrypoint | `ExampleController` still owns the request entrypoint | No |
| YYYY-MM-DD | Repo | `https://github.com/example-org/example-sdk` @ `v1.4.2` | Check upstream integration behavior | Sample app shows the callback fires only after explicit session join | Yes |
| YYYY-MM-DD | Command | `rg -n "example" src` | Find the affected path | Found one active handler and one stale helper | No |

## Relevant Existing Behavior And Production Paths

Record only behavior relevant to the task. A behavior may be user-initiated, system-initiated, operational, or an established contract; it does not require a UI journey. Use stable IDs and evidence from supported or observed production behavior, not a synthetic caller or mechanically possible state alone. Reuse these IDs in the requirements' current-and-desired behavior summary and the design map. For genuinely new behavior, record `No Current Path` with evidence; the design map will record the approved target trigger and path.

| Behavior ID | Kind (`User`/`System`/`Operational`/`Contract`) | Current Supported Trigger Or Governing Contract | Current Production Path And Lifecycle | Meaningful Current Outcome / Invariants | Evidence |
| --- | --- | --- | --- | --- | --- |
| BEH-001 |  |  |  |  |  |

## Design Health Assessment Evidence

- Change posture (`Feature`/`Bug Fix`/`Behavior Change`/`Refactor`/`Cleanup`/`Performance`/`Larger Requirement`):
- Candidate root cause classification (`Local Implementation Defect`/`Missing Invariant`/`Boundary Or Ownership Issue`/`Duplicated Policy Or Coordination`/`File Placement Or Responsibility Drift`/`Shared Structure Looseness`/`Legacy Or Compatibility Pressure`/`No Design Issue Found`/`Unclear`):
- Refactor posture evidence summary:

| Evidence Source | Observation | Design Health Implication | Follow-Up Needed |
| --- | --- | --- | --- |
|  |  |  |  |

## Relevant Files / Components

| Path / Component | Current Responsibility | Finding / Observation | Design / Ownership Implication |
| --- | --- | --- | --- |
| `src/example/file.ts` | Request entrypoint | Delegates to stale helper before routing to service | Controller still looks like the correct owner; stale helper may be removable |

## Runtime / Probe Findings

| Date | Method (`Repro`/`Trace`/`Probe`/`Script`/`Test`/`Setup`) | Exact Command / Method | Observation | Implication |
| --- | --- | --- | --- | --- |
| YYYY-MM-DD | Trace | `npm test -- example.spec.ts` | Failure appears only on one branch | Investigation should focus on that branch first |

## External / Public Source Findings

- Public API / spec / issue / upstream source:
- Version / tag / commit / freshness:
- Relevant contract, behavior, or constraint learned:
- Why it matters:

## Reproduction / Environment Setup

- Required services, mocks, emulators, or fixtures:
- Required config, feature flags, env vars, or accounts:
- External repos, samples, or artifacts cloned/downloaded for investigation:
- Setup commands that materially affected the investigation:
- Cleanup notes for temporary investigation-only setup:

## Findings From Code / Docs / Data / Logs

## Persisted Data Transition Evidence (When Applicable)

- Current stored subject, location, representative shape, and approximate volume:
- Relevant code-model, serialization, semantic, or physical-store change:
- Normal readers and writers, including unknown/extra-field behavior:
- Representative direct-read or compatibility evidence:
- Required semantics and invariants preserved by direct use: `Yes` / `No` / `Undetermined` — evidence:
- Physical storage, privacy/security, disposal, rebuild, or operational constraints:
- Concrete benefit, cost, and risk of migration if it remains a candidate:
- Existing migration framework or lifecycle constraints, only if migration may be required:

## Constraints / Dependencies / Compatibility Facts

## Open Unknowns / Risks

## Notes For Downstream Implementation And Review
