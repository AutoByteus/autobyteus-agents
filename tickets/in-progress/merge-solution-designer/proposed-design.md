# Proposed Design v1 — One Solution Owner

## Current Approved Revision — Design Before Classification

The later user clarification supersedes the original requirements-only bypass:
Solution Designer completes investigation and requirements, obtains explicit user
approval, completes a proportionate design spec, then classifies task size/risk and
uses configured handoff rules. Every implementation package carries design;
Small/Medium Low-risk packages may bypass independent reviews, not design.
The current implementation and validation record is
`.codex/artifacts/solution-designer-consistency-audit/optimization-analysis.md` and
its linked `validation.md`. Earlier sections below describe the prior merge round
and are historical where they conflict with this revision.


## Behavior / current state / intended change
Use requirements.md REQ-001–008 and investigation-notes.md. Restore one governing owner across discovery and technical design; keep user approval as a phase gate rather than an agent boundary. Existing narrow architecture role blocks edits needed by ordinary design conversations.

## Spine inventory and ownership
| Spine | Flow | Governing owner | Off-spine concerns |
|---|---|---|---|
| DS-001 Intake/solution/delivery | User -> Department Head -> Solution Designer -> selected engineering route -> Delivery -> Solution Designer -> Department Head -> User | Solution Designer owns solution; Delivery owns finalization | Evidence, requirements, design templates |
| DS-002 Product return | Solution Designer -> Product Prototyper -> Solution Designer | Product owns its deliverables; Solution owns intended behavior integration | Separate prototype repository, UI/UX evidence |
| DS-003 Recovery | Reviewer/Implementation/API/Delivery -> Solution Designer -> investigate/classify -> approval if changed intent -> route revised package | Solution Designer | Single SR-* index; user approval reference |
| DS-004 Internal refinement | Evidence -> requirements -> user approval -> architecture evidence/design -> alignment -> classify | Solution Designer | Phase-specific standards; shared principles |

Department Head is a thin facade, not another governing solution owner. It forwards intake once and returns terminal or externally blocked results; no requirement/design artifacts, approvals, review gates, or repository operations belong to it. Direct agent coordinator required by runtime.

## Canonical files / subsystem mapping
- Move engineering architecture-designer folder to solution-designer at same depth; retain symlinked shared principles/examples.
- Move current requirements/investigation templates into solution skill, retaining scenario improvements.
- solution-designer/SKILL.md owns input, phases, approval/recovery, outputs, result envelope and terminal verification.
- references/requirements-engineering.md owns detailed existing investigation, requirements, Product and readiness standards. references/architecture-design.md owns existing design standards and classification. Both directly linked from main guide.
- templates/solution-revision-record-template.md replaces two active revision formats; SR-001 starts first coherent requirements baseline (before design), later entries identify phase and affected approval/design basis.
- department-head/agent.md holds intentionally tiny placeholder behavior; config exposes read_file, get_handoff_rules, send_message_to only. No unnecessary skill for a routing shell.
- Each team-config.json remains sole recipient authority. Engineering retains full internal forward/recovery graph with solution_designer coordinator; parent adds ingress, Product exchanges and verified terminal/blocked return.
- Consumers use solution revision record once, not duplicate requirements/design revision fields. Existing reviewer/implementation/API/delivery revision records are unchanged apart from SR references.

## Interfaces / dependency rules
Result statuses: Department Head `Work Requested`; Solution Designer `Product Design Requested`, `Approved Direct-Implementation`, `Architecture Design Complete`, `Blocked`, verified `Terminal`. Delivery remains `Delivery Completed`. Architecture-needed and unclear routing are internal phases, never self-handoff or forward packages missing requirements approval. Terminal/Blocked receipts must not match new-work forwarding.
Product outcomes retain existing names. Reviewer pass includes primary implementation handoff and informational designer notice; designer does not forward the notice again. API/E2E pre-execution upstream uncertainty returns to Solution Designer; failed executions retain Code Reviewer failure-origin route.

## Design health / removals / state
Refactor needed now: split-owner coordination is task root cause. Remove requirements-engineer, architecture-designer and their live role/revision references; do not rewrite historical tickets. No compatibility aliases. No persisted application data affected; definition files replace current roster, not a live-run migration. Existing user artifacts are preserved, not automatically rewritten. At resumed task bootstrap preserve historical revision evidence without fabricating approval.

## Change sequence / tradeoffs
Consolidate authoritative skill and templates -> update rosters/routes -> update consumers and Product references -> validate -> synchronize README -> final review. Single agent has broader context; phase-specific references keep loading focused. Independent architecture/code reviews remain conditional under existing policy. Safe content-only direct route remains, not main's mandatory design for all tasks.

## Risk / validation
Medium instruction-system change. Executable graph/package checks plus scenario walkthroughs validate intended contracts, not live LLM behavior. Exact package identity, explicit user approval and truthful finalization evidence remain gate inputs. See requirements.md acceptance map.
