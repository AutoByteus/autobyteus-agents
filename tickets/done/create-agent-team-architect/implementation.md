# Implementation

## Scope Classification

- Classification: `Medium`
- Reasoning: New reusable agent package spanning identity, runtime wiring, one bundled skill, focused references/template, and README documentation. No application runtime code or external integration is added.
- Workflow Depth: Proposed design -> future-state runtime call stack -> two-round review (`Go Confirmed`) -> implementation -> structural validation.

## Upstream Artifacts (Required)

- Workflow state: [workflow-state.md](workflow-state.md)
- Investigation notes: [investigation-notes.md](investigation-notes.md)
- Requirements: [requirements.md](requirements.md) — current status `Design-ready`
- Runtime call stacks: [future-state-runtime-call-stack.md](future-state-runtime-call-stack.md)
- Future-state runtime call stack review: [future-state-runtime-call-stack-review.md](future-state-runtime-call-stack-review.md)
- Proposed design: [proposed-design.md](proposed-design.md)
- Optimization analysis: [optimization-analysis.md](optimization-analysis.md) — explicit user approval recorded

## Document Status

- Current Status: `Review-Gate-Validated`
- Notes: Approved package topology and two-mode skill are being implemented. No source implementation file exceeds size guardrails because this is a text/configuration package.

## Plan Baseline (Freeze Until Replanning)

### Preconditions (Must Be True Before Finalizing The Baseline)

- `requirements.md` is at least `Design-ready`: `Yes`
- Acceptance criteria use stable IDs: `Yes`, `AC-1` through `AC-7`
- `workflow-state.md` is current and Stage 5 review evidence is recorded: `Yes`
- Runtime call stack review artifact exists and is current: `Yes`
- All in-scope use cases reviewed: `Yes`, `UC-001` and `UC-002`
- No unresolved blocking findings: `Yes`
- Review reached `Go Confirmed` with two clean deep-review rounds: `Yes`
- Missing-use-case discovery sweeps completed for final two clean rounds: `Yes`
- No newly discovered use cases in final two clean rounds: `Yes`

### Solution Sketch

- Use Cases In Scope: `UC-001` create and `UC-002` update.
- Spine Inventory In Scope: `DS-001`, `DS-002`, `RS-001`, `LS-001`.
- Primary Owners / Main Domain Subjects: Agent Team Architect shell, bundled `agent-team-architecture` skill, focused references/template, README.
- Requirement Coverage Guarantee: all `FR-1` through `FR-10` map to at least one use case.
- Design-Risk Use Cases: none.
- Target Architecture Shape: standalone agent package with one bundled skill and no team wrapper.
- New Owners/Boundary Interfaces To Introduce: operation mode/update intent boundary; result envelope/handoff boundary.
- Primary file/task set: see Implementation Work Table.
- API/Behavior Delta: adds a standalone repository-defined agent; no application API change.
- Key Assumptions: handoff tools are available in result-based runtime contexts; standalone zero-match behavior returns to caller.
- Known Risks: wording drift between README and skill; mitigated by concise README and linked canonical references.

### Runtime Call Stack Review Gate Summary

| Round | Review Result | Findings Requiring Persisted Updates | New Use Cases Discovered | Persisted Updates Completed | Classification | Required Re-Entry Path | Round State | Clean Streak After Round |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Pass | No | No | N/A | N/A | N/A | Candidate Go | 1 |
| 2 | Pass | No | No | N/A | N/A | N/A | Go Confirmed | 2 |

### Go / No-Go Decision

- Decision: `Go`
- Evidence:
  - Final review round: round 2 in [future-state-runtime-call-stack-review.md](future-state-runtime-call-stack-review.md)
  - Clean streak at final round: `2`
  - Final review gate line: `Implementation can start: Yes`

### Principles

- Implement the reviewed package topology without adding an extra agent, mode, coordinator, helper, or compatibility path.
- Keep the skill as the single detailed workflow owner.
- Preserve explicit operation `create`/`update` and subordinate `update_intent`.
- Keep result routing conditional and external to the skill's recipient selection.
- Apply the optimization rubric macro-first and micro-second during implementation review.

### Spine-Led Dependency And Sequencing Map

| Order | Spine ID | Owner | Task / File | Depends On | Why This Order |
| --- | --- | --- | --- | --- | --- |
| 1 | DS-001/DS-002 | Agent package | `agent.md`, `agent-config.json` | Reviewed package boundary | Establish identity and deterministic wiring. |
| 2 | DS-001/DS-002 | Agent Team Architect skill | `SKILL.md` | Agent shell and design basis | Add the canonical workflow and mode contract. |
| 3 | DS-001/DS-002 | Skill references/template | `references/*`, `templates/*` | Skill ownership boundary | Add detailed principles and shared result structure. |
| 4 | DS-001/DS-002 | Repository documentation | `README.md` | Package names and paths | Add concise human-facing discoverability. |
| 5 | RS-001/LS-001 | Agent package | Structural checks and result record | All package files | Reconcile and validate the complete topology. |

### File Placement Plan

| Item | Current Path | Target Path | Owning Concern / Platform | Action | Verification |
| --- | --- | --- | --- | --- | --- |
| Agent shell | None | `agents/agent-team-architect/agent.md` | Standalone agent identity | Add | Frontmatter and thin-shell review |
| Runtime config | None | `agents/agent-team-architect/agent-config.json` | Runtime wiring | Add | JSON parse and tool/skill review |
| Main skill | None | `agents/agent-team-architect/skills/agent-team-architecture/SKILL.md` | Create/update workflow | Add | Frontmatter, mode, link, and effective-flow review |
| Design reference | None | `.../references/agent-team-design-principles.md` | Package architecture principles | Add | Link/path and ownership review |
| Result reference | None | `.../references/result-and-handoff-contract.md` | Result/handoff schema | Add | Link/path and field review |
| Result template | None | `.../templates/agent-team-result-template.md` | Durable output structure | Add | Link/path and template review |
| README entry | Existing README | `README.md` | Human-facing discoverability | Modify | Diff and link review |

### Implementation Work Table

| Change ID | Spine ID(s) | Owner | Concern | Current Path | Target Path | Action | Depends On | Implementation Status | Unit Test File | Unit Test Status | Integration Test File | Integration Test Status | Stage 8 Review Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C-001 | DS-001/DS-002 | Agent shell | Identity and handoff transition | None | `agents/agent-team-architect/agent.md` | Create | Reviewed design | Completed | None | N/A | None | N/A | Planned | Thin shell. |
| C-002 | DS-001/DS-002 | Runtime wiring | Tools and skill attachment | None | `agents/agent-team-architect/agent-config.json` | Create | C-001 | Completed | None | N/A | None | N/A | Planned | Explicit `skillNames`, handoff tools included. |
| C-003 | DS-001/DS-002 | Architect skill | Two-mode workflow | None | `.../SKILL.md` | Create | C-001/C-002 | Completed | None | N/A | None | N/A | Planned | `create` and `update` only. |
| C-004 | DS-001/DS-002 | Skill references | Principles, result contract, template | None | `.../references/*`, `.../templates/*` | Create | C-003 | Completed | None | N/A | None | N/A | Planned | One owner per detailed rule. |
| C-005 | DS-001 | README | Standalone-agent description | `README.md` | `README.md` | Modify | C-001/C-003 | Completed | None | N/A | None | N/A | Planned | Concise linked entry. |

### Requirement, Spine, And Design Traceability

| Requirement | Acceptance Criteria ID(s) | Spine ID(s) | Design Section | Use Case / Call Stack | Planned Task ID(s) | Stage 6 Verification | Stage 7 Scenario ID(s) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-1, FR-2 | AC-1, AC-2 | DS-001/DS-002 | Architecture Direction, Naming | UC-001/UC-002 | C-001/C-002/C-003 | Structural review | AV-001/AV-002 |
| FR-3, FR-4, FR-5 | AC-2, AC-3 | DS-001/DS-002/LS-001 | Mode Workflow, Error Handling | UC-001/UC-002 | C-003 | Effective-flow review | AV-003 |
| FR-6, FR-7, FR-8 | AC-3, AC-4, AC-6 | DS-001/DS-002/RS-001 | Ownership Map, Result Boundary | UC-001/UC-002 | C-003/C-004 | Contract review | AV-004 |
| FR-9, FR-10 | AC-5, AC-7 | DS-001/DS-002 | README, Grounding | UC-001/UC-002 | C-005 | Diff/doc review | AV-005 |

### Stage 7 Planned Coverage Mapping

| Acceptance Criteria ID | Requirement ID | Spine ID(s) | Expected Outcome | Stage 7 Scenario ID(s) | Test Level | Initial Status |
| --- | --- | --- | --- | --- | --- | --- |
| AC-1 | FR-1/FR-2 | DS-001/DS-002 | Package files and names align. | AV-001 | API/config | Planned |
| AC-2 | FR-2/FR-4/FR-5 | DS-001/DS-002 | Exactly two modes; other labels are intents/internal checks. | AV-002 | Executable/package | Planned |
| AC-3/AC-4 | FR-6/FR-7/FR-8 | RS-001/LS-001 | Ownership and result/handoff contract are complete. | AV-003 | Executable/package | Planned |
| AC-5 | FR-9 | DS-001 | README entry is concise and linked. | AV-004 | Package | Planned |
| AC-6/AC-7 | FR-10 | DS-001/DS-002 | JSON/links validate and diff is in scope. | AV-005 | Executable/package | Planned |

### Design Delta Traceability

| Change ID | Planned Task ID(s) | Includes Remove/Rename Work | Verification |
| --- | --- | --- | --- |
| C-001 | T-001 | No | Frontmatter and thin-shell review |
| C-002 | T-002 | No | JSON parse and config review |
| C-003 | T-003 | No | Skill effective-flow review |
| C-004 | T-004 | No | Link/path and ownership review |
| C-005 | T-005 | No | README/diff review |

### Decommission / Rename Execution Tasks

| Task ID | Item | Action | Cleanup Steps | Risk Notes |
| --- | --- | --- | --- | --- |
| None | Separate create/optimizer/audit/repair agents | Not added | Keep the two-mode design; no obsolete files exist to remove. | Avoids duplicated ownership. |

### Step-By-Step Plan

1. Add and wire the thin standalone agent shell.
2. Add the bundled two-mode skill, detailed principles, result/handoff contract, and result template.
3. Add the concise README entry.
4. Run package, link, configuration, and scope validation; record results.

### Backward-Compat And Decoupling Guardrails

- Backward-compatibility mechanisms introduced: `None`.
- Legacy code retained for old behavior: `No`.
- Dead/obsolete code or unused helpers/tests/flags/adapters left in scope: `No`.
- Shared data structures remain tight: `Yes`.
- Shared design-principles guidance reapplied during implementation: `Yes`.
- Authoritative Boundary Rule preserved: `Yes`.
- Decoupling impact assessment completed: `Yes`.
- New tight coupling or cyclic dependency introduced: `No`.
- Changed source implementation files kept within size guardrails: `Yes`; no executable source files changed.

### Code Review Gate Plan (Stage 8)

- Gate artifact path: `tickets/in-progress/create-agent-team-architect/code-review.md`.
- Scope: new agent package and README only.
- Line-count measurement: `rg -n "\S" <file-path> | wc -l` if needed; no source-file hard-limit risk.
- Review focus: package ownership, two-mode clarity, grounding, link/config correctness, handoff contract, and diff scope.

### Test Strategy

- Unit tests: `N/A`; this is a text/configuration package.
- Integration tests: `N/A`; validate cross-file package topology with focused shell checks.
- Stage 7 planned executable validation: parse JSON, check frontmatter/name alignment, resolve local links, assert mode/handoff rules, and inspect diff scope.

### Cross-Reference Exception Protocol

| File | Cross-Reference With | Why Unavoidable | Temporary Strategy | Unblock Condition | Design Follow-Up Status | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| `SKILL.md` | `references/*`, `templates/*` | Skill must discover detailed principles and result structure. | Direct local Markdown links. | None; this is the intended topology. | Not Needed | Architect skill |

### Design Feedback Loop

| Smell/Issue | Evidence | Design Section To Update | Action | Status |
| --- | --- | --- | --- | --- |
| None identified during implementation | Package topology and effective-flow review | N/A | Continue to validation | Pending |

## Execution Tracking

### Kickoff Preconditions Checklist

- Workflow state is current: `Yes`.
- Stage 6 and `Code Edit Permission = Unlocked` before package edits: `Yes`.
- Scope classification confirmed: `Medium`.
- Investigation notes are current: `Yes`.
- Requirements status is `Design-ready`: `Yes`.
- Runtime review final gate is `Implementation can start: Yes`: `Yes`.
- Review reached `Go Confirmed` with two clean rounds: `Yes`.
- No unresolved blocking findings: `Yes`.

### Progress Log

- 2026-08-31: User approved `optimization-analysis.md`; implementation permission unlocked.
- 2026-08-31: New agent shell, runtime configuration, bundled skill, references, result template, and README entry created.

### Scope Change Log

| Date | Previous Scope | New Scope | Trigger | Required Action |
| --- | --- | --- | --- | --- |
| — | — | — | No scope change | None |

### Implementation Work Updates

- C-001 through C-005: completed; focused Stage 6 validation passed. See `implementation-validation-command-log.txt`.

### Downstream Stage Status Pointers

- Stage 7 executable validation: `Pass`; canonical artifact `executable-validation.md` and command log `executable-validation-command-log.txt`.
- Stage 8 code review: `Pass`; artifact `code-review.md` has no findings and all categories >= 9.0.
- Stage 9 docs sync: `Pass`; artifact `docs-sync.md` records the README update.

### Blocked Items

- None.

### Design Feedback Loop Log

| Date | Trigger | Classification | Required Artifact Update | Status |
| --- | --- | --- | --- | --- |
| — | — | — | — | None |

### Remove/Rename/Legacy Cleanup Verification Log

| Item | Verification | Result |
| --- | --- | --- |
| Separate optimizer/audit/repair modes or agents | Search new skill and package topology | Not introduced |
| Compatibility wrappers or alternate package format | Diff review | None |

### Completion Gate

- Package implementation complete: `Yes`.
- Focused validation complete: `Yes`; JSON, frontmatter, path, mode, handoff, README, and whitespace checks passed.
- Stage 6 result: `Pass`; Stage 7 executable structural validation also passed.
- Stage 8 review result: `Pass`; Stage 9 docs sync result: `Pass`.
