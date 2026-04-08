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

## Source Log

| Date | Source Type (`Code`/`Doc`/`Spec`/`Web`/`Repo`/`Issue`/`Command`/`Trace`/`Log`/`Data`/`Setup`/`Other`) | Exact Source / Query / Command | Why Consulted | Relevant Findings | Follow-Up Needed |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | Code | `src/example/file.ts` | Verify the current owner and entrypoint | `ExampleController` still owns the request entrypoint | No |
| YYYY-MM-DD | Repo | `https://github.com/example-org/example-sdk` @ `v1.4.2` | Check upstream integration behavior | Sample app shows the callback fires only after explicit session join | Yes |
| YYYY-MM-DD | Command | `rg -n "example" src` | Find the affected path | Found one active handler and one stale helper | No |

## Current Behavior / Current Flow

- Current entrypoint or first observable boundary:
- Current execution flow:
- Ownership or boundary observations:
- Current behavior summary:

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

## Constraints / Dependencies / Compatibility Facts

## Open Unknowns / Risks

## Notes For Architect Designer
