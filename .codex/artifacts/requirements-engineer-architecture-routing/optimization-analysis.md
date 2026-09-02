# Requirements Engineer Architecture-Routing Optimization Analysis

Review Status: Analysis complete - awaiting user approval

## User request and review scope

Audit and improve the Requirements Engineer so that, after the requirements
package is complete and explicitly approved, it assesses whether architecture
design is needed. The intended routing is:

```text
Requirements investigation and approval
        -> architecture design needed assessment
             -> Architecture Designer
             -> direct Implementation Engineer
```

The Requirements Engineer must not design architecture or own final technical
architecture risk. The assessment is a requirements-stage routing decision
based on evidence already gathered. The scope includes:

- `requirements-engineering-team/agents/requirements-engineer/agent.md`;
- the Requirements Engineer `SKILL.md` and all of its templates;
- Requirements Engineering `team.md` and `team-config.json`;
- the Software Development Department route and summary, because the direct
  route crosses team boundaries;
- the Software Engineering Team entry contract, routing matrix, and
  Implementation Engineer input/output contract, because a direct package must
  be executable without an architecture design;
- the repository README summaries and content-ownership guidance.

No unrelated team or working-tree changes are in scope.

## Current behavior and package/file ownership baseline

- Requirements Engineer owns investigation, canonical requirements, acceptance
  criteria, user approval, prototype decisions, and the final requirements
  outcome.
- Requirements Engineer explicitly does not own target architecture, but its
  operating sequence currently proceeds from requirements approval to one
  `Approved Architecture-Ready` outcome and the department route sends that
  outcome directly to `architecture_designer`.
- The Requirements Engineering team has one local member and an empty local
  handoff list; cross-team recipients are defined by the parent Software
  Development Department's dynamic handoff rules.
- The Software Development Department currently has only a Requirements
  Engineer -> Architecture Designer route.
- Architecture Designer currently performs the authoritative post-design
  `task_size` (`Small`/`Medium`/`Large`) and `architectural_risk` (`Low`/`High`)
  classification, then routes low-risk Small/Medium work directly to
  Implementation Engineer.
- Implementation Engineer currently accepts an architecture-design package
  and its handoff template requires values carried from `design-spec.md`.
  It does not explicitly accept a requirements-only direct package.
- The requirements document already contains the canonical requirements,
  approval, scope, and downstream architecture-input sections, making it the
  natural owner for a durable pre-architecture routing assessment.

## Preserved invariants, boundaries, and required outputs

1. Requirements Engineer remains the canonical owner of intended behavior,
   requirements, acceptance criteria, user approval, and requirements revision
   history.
2. Requirements Engineer may investigate technical facts and assess routing,
   but must not design target modules, interfaces, data flow, migrations, or
   other architecture.
3. The direct route is allowed only when evidence supports a bounded
   Small/Medium, Low-risk change with no material structural impact.
4. Content volume alone never implies architecture design or high risk; content
   changes that alter runtime contracts, persistence, security, ownership,
   routes, concurrency, or deployment still require Architecture Designer.
5. An `Unclear` or missing assessment never takes the direct route; it routes
   to Architecture Designer.
6. Implementation Engineer must recheck the carried assessment. New structural
   evidence must return to Architecture Designer rather than being silently
   downgraded or implemented around.
7. Architecture Designer retains final architecture ownership and its existing
   post-design `task_size`/`architectural_risk` classification.
8. All handoffs call `get_handoff_rules`, apply every matching rule, use exact
   returned recipients with `send_message_to`, and include absolute paths and
   the stable package identifier.
9. Requirements Engineer's own isolated requirements workspace remains distinct
   from Product Prototyping's repository/tickets and Software Engineering's
   implementation workspace.
10. Both routes still consume the approved requirements package and proceed
    through the existing implementation, API/E2E, delivery, and finalization
    gates appropriate to the carried classification.

## Primary content spine

### Current spine

```text
intake -> investigation -> requirements and acceptance criteria
-> conditional prototype work -> user approval
-> architecture-ready outcome -> Architecture Designer
```

### Required spine

```text
intake -> investigation -> requirements and acceptance criteria
-> conditional prototype work -> user approval and readiness
-> architecture design routing assessment
   -> Architecture Designer
   -> direct Implementation Engineer
-> downstream validation, delivery, and finalization
```

The assessment must occur after the requirements package and any behavior-
defining prototype decisions are complete and explicitly approved. It must
precede the terminal Requirements Engineer handoff. It is not an additional
architecture-design stage.

## Macro analysis

### Package topology and ownership

**Finding M1 — High — Missing routing owner and downstream contract.** The
Requirements Engineer is the only local role and the parent department has no
Requirements Engineer -> Implementation Engineer rule. Adding only prose to
the Requirements Engineer would create a route that runtime configuration
cannot execute. The parent department and Implementation Engineer intake must
be updated together.

**Finding M2 — High — The current terminal outcome is architecture-only.** The
Requirements Engineer skill, team summary, department summary, and department
handoff rule all describe `Approved Architecture-Ready` as the single approved
route. A direct route needs a distinct result classification and a durable
assessment so recipients can distinguish a package that intentionally bypassed
architecture design from an accidentally incomplete package.

### Content hierarchy and logical flow

**Finding M3 — High — The assessment is absent from the Requirements Engineer
workflow.** The current sequence decides about prototypes, then moves from
approval/readiness directly to architecture handoff. Add the assessment after
explicit approval and before classification/handoff. Keep the normal
requirements work unchanged.

**Finding M4 — High — The assessment has no canonical artifact location.** If
it exists only in a handoff message, later implementation and delivery agents
cannot reliably inspect or preserve it. Make a concise assessment section in
`requirements-doc.md` authoritative, with evidence references to
`investigation-notes.md` and the applicable requirement/behavior IDs.

**Finding M5 — Medium — The downstream architecture-input section can imply
architecture is always next.** Preserve that section for constraints and
questions that Architecture Designer should address when selected, but add a
routing section that explicitly says the package may route directly to
Implementation Engineer.

### Behavior, grounding, and classification

**Finding M6 — High — Reusing Architecture Designer's rule requires a
pre-design qualifier.** Architecture Designer's `task_size` and
`architectural_risk` values are authoritative after technical design. The
Requirements Engineer cannot claim final architectural risk. The assessment
should carry preliminary values/evidence and derive the route conservatively:
only Small/Medium + Low with no structural-impact trigger may select direct
implementation; Large, High, Unclear, or missing evidence selects Architecture
Designer.

**Finding M7 — High — Content-heavy work needs a structural-versus-payload
guardrail.** A large content inventory may still be a bounded payload change,
but a content change that modifies readers, APIs, schemas, persistence,
security, ownership, routes, concurrency, deployment, or normative semantics
is not direct by default. Record the inspected structural surfaces rather than
using a file-count threshold alone.

**Finding M8 — Medium — Recovery is underspecified.** The current downstream
rules handle architecture findings, but no direct-route rule explains what
happens when Implementation Engineer discovers architecture impact. Add a
clear re-entry rule to Architecture Designer and require reclassification
before implementation continues.

### Outputs, validation, and handoff

**Finding M9 — High — Implementation Engineer's package contract is
architecture-dependent.** Its current input and handoff instructions require
`design-spec.md` and classification values from that file. Update it to accept
two upstream forms: an architecture-design package, or a Requirements
Engineer direct package containing the approved requirements and routing
assessment with design artifacts marked `N/A`.

**Finding M10 — Medium — Team and README summaries will drift unless updated.**
The Software Development Department and root README currently say approved
requirements go directly to Architecture Designer. Update summaries and the
parent handoff matrix in the same change set.

## Micro analysis

### Terminology and qualifiers

- Use `Architecture Design Routing Assessment` for the Requirements Engineer's
  decision; reserve `task_size` and `architectural_risk` without qualifiers for
  Architecture Designer's authoritative classification.
- In the requirements document label the values `preliminary task size` and
  `preliminary architectural risk`, and state that they are routing evidence,
  not target architecture or final technical classification.
- Use the result names `Approved Direct-Implementation` and `Approved
  Architecture-Ready` so the handoff outcome is explicit. Use
  `Architecture Design Unclear` only when the assessment cannot safely select
  a route. The selected route and outcome express whether architecture design
  is needed; do not add a third classification dimension.

### Qualifiers and transitions

- Direct implementation is valid only when the evidence supports `Small` or
  `Medium`, `Low` preliminary risk, and no structural-impact trigger.
- The Architecture Designer route applies to `Large`, `High`, any
  structural-impact trigger, or any requirement needing architecture-owned
  technical decisions.
- An `Unclear` assessment applies when evidence is insufficient; it routes
  conservatively to Architecture Designer and must not be treated as direct
  implementation. Keep task size and architectural risk as the only
  classification dimensions; use assessment status and selected route for
  uncertainty and routing.
- The assessment occurs after explicit user approval. If requirements change,
  rerun the requirements readiness and assessment rather than preserving a
  stale route.

### Redundancy and economy

- Keep the detailed structural/payload examples in the Requirements Engineer
  skill because they govern the pre-design decision, and reference them from
  the team summary and route rule rather than copying the full list.
- Keep Architecture Designer's existing detailed classification guidance as
  the authority for post-design classification. Add only a short handoff
  compatibility note to avoid duplicating its full rule set.
- Keep the requirements document assessment as a compact table/field group;
  do not duplicate the full requirements or architecture design.

## Instruction ledger and negative-instruction disposition

| Behavior | Preconditions | Action | Output / exit | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| Investigate and define requirements | Request accepted | Gather evidence and write canonical artifacts | Approved or blocked requirements package | Requirements Engineer | Keep |
| Decide if visual evidence is needed | Material UI/interaction uncertainty | Select visualizer/final prototype or direct evidence | Conditional prototype route or continue | Requirements Engineer | Keep |
| Assess architecture-design need | Requirements complete and explicitly approved | Evaluate preliminary size/risk and structural impact | Direct, architecture, or unclear route | Requirements Engineer | Add |
| Design target architecture | Architecture route selected | Technical design and authoritative classification | Architecture package | Architecture Designer | Keep downstream |
| Implement direct low-risk work | Approved direct package | Implement only approved behavior and recheck route | Direct implementation handoff or escalation | Implementation Engineer | Add downstream contract |
| Route after own work | Classified outcome | Call `get_handoff_rules`, apply all matches, message exact recipients | Terminal stage handoff | Each role | Keep |

Negative instructions:

| Instruction | Disposition | Boundary protected |
| --- | --- | --- |
| Do not design target architecture | Keep | Requirements/architecture ownership |
| Do not use content volume alone as risk | Add | Prevents false architecture escalation |
| Do not direct-route unclear work | Add | Prevents unsafe bypass |
| Do not silently downgrade direct-route impact | Add downstream | Preserves architecture recovery |
| Do not manage Product Prototyper's repository or tickets | Keep | Independent team ownership |
| Do not treat direct implementation as architecture approval | Keep | Preserves technical authority |

## Proposed improvements

### Macro actions

1. **Add** an `Architecture Design Routing Assessment` section to
   `requirements-doc-template.md`, with the routing decision, preliminary
   classification, structural/payload evidence, rationale, selected route,
   escalation trigger, approval reference, and assessment status.
2. **Update** Requirements Engineer `SKILL.md` ownership, operating sequence,
   output contract, and handoff rules to perform the assessment only after
   explicit approval, classify `Approved Direct-Implementation`,
   `Approved Architecture-Ready`, or `Architecture Design Unclear`, and call
   `get_handoff_rules` afterward. Keep task size and architectural risk as the
   only classification dimensions; use the selected route for the decision.
3. **Update** Requirements Engineer `agent.md` and `team.md` to describe the
   assessment as routing, not architecture design, and to summarize both
   possible routes.
4. **Add** the parent department handoff rule from Requirements Engineer to
   `/software_engineering_team/implementation_engineer` for an approved direct
   package. Keep the existing Architecture Designer route for `Yes` and
   `Unclear`/architecture-ready outcomes.
5. **Update** Software Development Department `team.md` and root `README.md`
   summaries to describe the conditional direct route.
6. **Update** Software Engineering Team entry/flow documentation and
   Implementation Engineer `SKILL.md` plus its handoff template to accept a
   Requirements Engineer direct package, preserve `N/A` architecture
   artifacts, recheck the classification, and escalate structural impact to
   Architecture Designer.

### Micro actions

7. **Rewrite** route wording to distinguish preliminary Requirements Engineer
   evidence from Architecture Designer's authoritative post-design fields.
8. **Add** explicit status/route values and `N/A` handling for design artifacts
   in the direct implementation handoff.
9. **Update** the relevant requirements output and handoff path lists so
   direct packages include the assessment path and exact next action.
10. **Keep** all unrelated Product Prototyping ownership, prototype gating,
    user approval, and dynamic handoff rules unchanged.

## Assumptions, open questions, and risks

- Assumption: direct Requirements Engineer -> Implementation Engineer routing
  is allowed by the parent runtime when a matching department handoff rule is
  added.
- Assumption: Architecture Designer remains the authority for final
  architecture classification whenever its stage is selected.
- Open question: whether the runtime should call the direct result
  `Approved Direct-Implementation` or another existing outcome name. This
  analysis uses `Approved Direct-Implementation` because it cannot be confused
  with `Approved Architecture-Ready`.
- Risk: a weak Requirements Engineer investigation could incorrectly label a
  structural change as content-only. The conservative `Unclear -> Architecture
  Designer` route and Implementation Engineer recheck mitigate this.
- Risk: adding a cross-team route without updating Implementation Engineer's
  input contract would create a runtime handoff that cannot execute; both are
  included in the proposed plan.

## Validation plan after approval

1. Validate all changed Markdown links, YAML frontmatter, JSON configs, and
   configured member addresses.
2. Confirm the parent department has exactly one matching direct route and that
   Architecture Designer remains the route for `Yes`, `High`, `Large`, and
   `Unclear` cases.
3. Re-read the Requirements Engineer flow in order: investigation -> prototype
   gate -> approval -> routing assessment -> classification -> handoff.
4. Re-read the Software Engineering entry flow for both architecture-design
   and direct implementation packages.
5. Search for stale claims that every approved requirements package goes to
   Architecture Designer or that Implementation Engineer always requires
   `design-spec.md`.
6. Perform a macro consistency pass and then a micro terminology/redundancy
   pass, including every retained negative instruction.
7. Preserve and report unrelated working-tree changes without staging them.

Target skill files changed during analysis: None

Analysis artifact:
`.codex/artifacts/requirements-engineer-architecture-routing/optimization-analysis.md`

## Post-approval consistency review

Review Status: Implementation complete - macro and micro consistency passes complete

### Macro pass

- The Requirements Engineer owns requirements investigation, approval,
  requirements readiness, and the preliminary routing assessment.
- The assessment is performed after approval and before the Requirements
  Engineer's result handoff.
- Task size and architectural risk are the only classification dimensions.
  The selected route and outcome express whether architecture design is
  needed; no third `architecture_design_needed` field is used.
- The parent department config has mutually distinct outcomes for direct
  implementation, architecture design, unclear assessment, prototype work,
  and blockers.
- Direct packages are accepted by the Software Engineering team and
  Implementation Engineer without invented design artifacts. Architecture
  packages retain the existing architecture and review gates.
- Direct-route structural impact returns through result-based routing before
  review-gated progression. Requirements gaps remain requirements-owned.

### Micro pass

- Canonical assessment fields, outcome names, route conditions, template
  values, and downstream handoff language are aligned.
- `N/A — not applicable` is used for omitted architecture/review artifacts on
  direct paths; uncertainty uses assessment status and
  `N/A — insufficient evidence` rather than an extra risk classification.
- Agent-facing instructions remain capability-oriented and do not require a
  particular caller. Runtime recipient selection remains in
  `team-config.json` through `get_handoff_rules`.
- Markdown links in the changed agent packages resolve, JSON configuration
  parses, frontmatter is present, section order follows the work-to-handoff
  flow, and `git diff --check` passes.
- Repository-root README example links that are intentionally illustrative
  remain unchanged; they are not source links for this package.

No remaining consistency issue was found in the reviewed Requirements
Engineering -> Software Engineering route.

## Team-contract minimization review

- The affected `team.md` files now keep only team identity, ownership
  boundaries, entry/exit or route summaries, and the universal communication
  convention.
- Requirements Engineering, Software Development Department, Software
  Engineering, and Product Design & Prototyping no longer repeat specialist
  checklists, artifact schemas, validation gates, recovery procedures, or full
  handoff matrices.
- Detailed work and result contracts remain in member `SKILL.md` files and
  templates; executable recipient conditions remain in `team-config.json`.
- The Product Design & Prototyping bootstrap exception is described only as a
  local route whose exact mechanism is owned by its skill and local config;
  the team contract does not prescribe a conflicting tool.
