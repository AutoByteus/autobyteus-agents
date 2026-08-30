# Requirements Engineering Team Consistency Audit

Review Status: Superseded by Product Design & Prototyping Team separation review

> **Superseded baseline:** This artifact records the earlier co-located-team
> review. The current authoritative topology is documented in
> `.codex/artifacts/product-design-prototyping-team-separation/optimization-analysis.md`
> and the live `agent-teams/product-design-prototyping-team/` definitions.
> Historical same-repository statements below are retained only as review
> history.

## User request and scope

Audit the three cooperating roles—`requirements_engineer`,
`product_prototyper`, and `prototype_bootstrapper`—and improve any
inconsistencies in their skills, templates, agent descriptions, team contract,
and handoff configuration. Preserve the current design that:

- Requirements Engineer owns canonical requirements, investigation, approval,
  and architecture readiness.
- Product Prototyper owns the stable prototype project, its requirement ticket
  folders, future-state UI/UX work, user review, commits, and final artifacts.
- Prototype Bootstrapper owns only current-experience parity discovery,
  implementation, validation, and bootstrap evidence.
- The prototype uses a stable project root as a sibling project directory of
  the selected frontend inside the same parent/source repository. It uses the
  `<prototype-subject>-prototype` name at the frontend's parent level, without
  a generic `prototypes/` container or a dedicated prototype repository,
  branch, or worktree.
- Ticket folders are ordinary project artifacts: active tickets live under
  `tickets/in-progress/<ticket-id>/`, and completed tickets move to
  `tickets/done/<ticket-id>/`.
- User approval remains the authority for intentional future-state behavior and
  visual design.

## Latest user clarification

Requirements Engineer owns and manages its own requirements ticket/workspace.
It should not define or own Product Prototyper's ticket lifecycle, whether
before or after baseline acceptance. Product Prototyper owns its own ticket from
the moment the prototype request is accepted: it creates or reopens the ticket
folder, tracks status and artifacts, and moves the completed folder to
`tickets/done/`.

The Product Prototyper still manages a project, but that project is no longer a
separate sibling repository. It is a sibling project directory of the selected
frontend inside the same parent/source repository. When the frontend is a
direct child of the repository root, for example:

```text
parent-repository/
  frontend/
  frontend-prototype/
    tickets/
      in-progress/<ticket-id>/
      done/<ticket-id>/
```

When the frontend is nested, keep the prototype beside it at the same parent
level, for example `apps/customer-portal/` and
`apps/customer-portal-prototype/`. Do not add a generic `prototypes/`
container. When no frontend exists, use a direct child of the parent/source
repository with the same `<prototype-subject>-prototype` naming rule.

The correction is therefore stronger than changing “after baseline
acceptance” to “throughout”: the Requirements Engineer cross-reference should
stop assigning Product Prototyper ticket ownership altogether. It may carry
the ticket identifier and later link the completed prototype artifacts into
the canonical requirements package.

## Current behavior and package ownership baseline

The audited topology is:

- `team.md` and `team-config.json`: team ownership and dynamic handoff rules.
- `shared/product-prototype-principles.md`: shared UI/UX fidelity, source,
  project-boundary, ticket-folder, implementation, and evidence principles.
- Requirements Engineer `SKILL.md` and templates: requirements workspace,
  investigation, canonical requirements, approval, prototype gate, and outcome.
- Product Prototyper `SKILL.md`, `agent.md`, and templates: baseline
  acceptance, ticket lifecycle, future-state prototype work, user review,
  visual evidence, UI/UX specification, commit, and handoff.
- Prototype Bootstrapper `SKILL.md`, `agent.md`, and report template:
  current-experience discovery, parity implementation, exact validation, and
  bootstrap handoff.

The current working tree contains the prior approved simplification changes,
the ticket-folder follow-up, and this approved naming/location refinement. The
prior ownership and lifecycle edits are treated as the baseline for this pass;
the authoritative files listed above now use the sibling-project naming model.

## Preserved invariants and user-authority boundaries

1. Requirements Engineer remains the canonical owner of intended requirements,
   acceptance criteria, scope, approval evidence, and requirements readiness.
2. Product Prototyper owns the prototype project and its ticket-folder
   artifacts from request intake. For an existing frontend, it owns the
   runnable future-state prototype, user-facing review, and final UI/UX
   specification after a current baseline is accepted; for no-frontend work,
   it establishes the initial baseline directly.
3. Prototype Bootstrapper remains a bounded current-experience specialist and
   must not redesign the product, approve future behavior, or own requirements.
4. The pinned source frontend is authoritative for current-experience parity.
5. Prototype implementation may use local state, fixtures, and simulated
   capabilities, but all visible behavior and limitations must be explicit.
6. Existing-frontend future-state work cannot begin before the baseline is
   runnable, exact for its recorded inventory, and accepted by Product
   Prototyper.
7. Final visual references are normative only after explicit user confirmation.
8. Every role uses `get_handoff_rules`, exact configured recipients, absolute
   artifact paths, and a terminal outcome; no role invents a recipient.
9. Requirements task-workspace isolation and prototype ticket-folder
   management are different concerns. The former protects requirements
   artifacts; the latter records prototype work in the stable project.
10. No role creates a dedicated prototype repository, branch, or worktree as a
    side effect of this workflow.

## Latest consistency pass

This pass rechecked whether Requirements Engineer only requests prototype work,
whether Product Prototyper manages its own directory-scoped project and ticket
from intake, and whether Bootstrapper remains limited to existing-frontend
current-experience parity. The handoff configuration still expresses the same
flow: Requirements Engineer → Product Prototyper; Product Prototyper →
Bootstrapper only for a missing, failed, or explicitly refreshed baseline; and
Bootstrapper → Product Prototyper for acceptance.

Three wording inconsistencies were corrected:

- Product Prototyper and the team contract previously made project/ticket
  ownership sound as if it began only after baseline acceptance. Ownership now
  starts at request intake; baseline acceptance gates only existing-frontend
  future-state work.
- Product Prototyper's operating sequence previously required an existing
  frontend locator and source pin even for no-frontend construction. It now
  uses the selected product surface and configured template for that mode.
- The shared source-selection rule and UI/UX template now state the same
  existing-frontend versus no-frontend location/provenance conditions.

No additional Requirements Engineer/Product Prototyper/Bootstrapper ownership,
project-boundary, ticket-lifecycle, artifact-path, or dynamic-handoff
inconsistency was found in this pass.

## Macro analysis

### Package topology and ownership

The package topology is coherent: the shared principles own cross-role
invariants, the three `SKILL.md` files own executable role workflows, templates
own output schemas, and team configuration owns routing. No new helper package
is needed.

However, the ticket-folder topology is only partially propagated. Product
Prototyper owns `tickets/in-progress/` and `tickets/done/`, but the shared
artifact section and some templates still describe visual references as living
directly under the project root. This creates two plausible locations for the
same final evidence.

**Finding M1 — High — Artifact topology drift.** The authoritative model should
be explicit: project root contains runnable source and project-wide baseline
evidence; each ticket folder contains `prototype-ticket.md`, `ui-ux-spec.md`,
`visual-references/`, and ticket-specific validation/support artifacts. The
current Product Prototyper sequence instead captures final references in the
project-level `visual-references/` path while later placing ticket artifacts in
the ticket folder.

### Authoritative sources and boundaries

The role boundaries are mostly consistent. Requirements Engineer delegates
prototype construction, Product Prototyper accepts the baseline and commits,
and Bootstrapper returns parity evidence. The following ownership timing
wording is inconsistent:

**Finding M2 — High — Requirements Engineer crosses the ticket-ownership
boundary.** Requirements Engineer currently assigns Product Prototyper ticket-
folder artifacts and ticket status “after baseline acceptance.” That ownership
statement does not belong in the Requirements Engineer skill. Product
Prototyper owns its own ticket from request intake; Requirements Engineer only
passes the relevant requirements/ticket context and later consumes links to
the completed result. Remove the Product ticket-lifecycle contract from the
Requirements Engineer skill rather than changing its timing qualifier.

The Requirements Engineer's own task worktree is not a contradiction, but the
boundary should be stated once so agents do not assume that a requirements
worktree is the prototype project. Requirements artifacts stay in the assigned
requirements workspace; prototype code and ticket folders stay in the canonical
prototype project.

**Finding M3 — High — Prototype location and naming were too broad.** The
clarified design places the prototype project inside the parent/source
repository as a sibling project directory of the selected frontend, at the
same parent level, named `<prototype-subject>-prototype`. The shared
principles, team contract, Product Prototyper skill, Bootstrapper skill, and
templates must use that one location model and must not introduce a generic
`prototypes/` container. For a no-frontend prototype, the same name is a direct
child of the parent/source repository. Requirements Engineer's task worktree
remains separate from this sibling prototype project.

### Logical flow and content architecture

The primary flows are understandable:

- Requirements Engineer investigates → decides whether a prototype is needed
  → hands the approved requirements context to Product Prototyper.
- Product Prototyper resolves the stable project and ticket → requests
  Bootstrapper only when a baseline is missing or invalid → accepts the
  baseline → implements and reviews the ticket → validates and finalizes it.
- Bootstrapper resolves source and project → discovers and reproduces the
  current experience → validates exact parity → returns a report and evidence.

Two transitions remain underspecified:

**Finding M4 — High — Fixed Bootstrap handoff conflicts with general package
  preservation.** Team communication says every handoff preserves a stable
package identifier, while the Product Prototyper's fixed bootstrap message
intentionally excludes the requirements package and ticket details. The intended
boundary is valid—Bootstrapper does not manage the Product Prototyper ticket—but
the exception must be explicit. Product Prototyper should retain and update the
ticket locally; the fixed Bootstrapper trigger should carry only the selected
frontend, canonical project root, source constraint, and mode-specific action.

**Finding M5 — Medium — Ticket completion transition needs one authoritative
rule.** Product Prototyper says to move the folder to `tickets/done/`, but the
team contract and ticket template do not define the exact terminal conditions.
The Product Prototyper skill should own the transition: explicit user
confirmation, final validation, reproducible commit, complete ticket record,
and all required artifact links; then move the folder and report the final
absolute paths.

### Behavioral grounding and invariants

The exact-parity boundary is well grounded in the shared principles and
Bootstrapper quality gate. Product Prototyper's acceptance gate is appropriately
separate from Bootstrapper's parity gate.

**Finding M6 — Medium — Bootstrap acceptance evidence is not linked to the
ticket state strongly enough.** Bootstrapper returns a project-level report,
while Product Prototyper's ticket record must record which report, source pin,
accepted baseline revision, and acceptance result it used. This can be fixed by
making the ticket record the explicit owner of the acceptance link, without
making Bootstrapper own the ticket.

### Outputs, validation, recovery, and handoff

The three roles have appropriate validation responsibilities, but one output
contract is too unconditional:

**Finding M7 — High — Requirements Outcome lists prototype paths even when
prototyping is conditional.** Requirements Engineer's `Approved
Architecture-Ready` outcome requires prototype ticket and project paths even
when the Product Prototype Gate was evaluated as not applicable. The outcome
must require those paths when a prototype was used and record `N/A — not
applicable` otherwise. The requirements template already follows this
conditional pattern and should be the model for the outcome text.

The Bootstrapper handoff correctly routes only to Product Prototyper. The
Product Prototyper handoff correctly routes completed, impact, not-recommended,
and blocked outcomes. Requirements Engineer remains the final requirements
integration owner.

## Micro analysis

### Wording and terminology

- `project root`, `prototype project`, and `prototype workspace` are used for
  closely related concepts. Use `prototype project root` for the code location,
  `ticket folder` for the per-request artifact location, and `requirements
  task workspace` for Requirements Engineer artifacts.
- `ticket`, `request`, and `stable package identifier` are all valid but their
  relationship is implicit. State that a supplied ticket/request identifier is
  reused; if absent, the normal surrounding-project ticket convention is used;
  no `PT-*` namespace is invented.
- Bootstrapper still says it does not create a “separate task commit.” That is
  less precise than “Bootstrapper does not finalize the ticket or create the
  Product Prototyper's accepted project commit.”

### Qualifiers, conditions, and exceptions

- The Bootstrapper fixed-message exception should sit beside the general
  handoff artifact rule, not only in the final Bootstrap Routing paragraph.
- Requirements Engineer's prototype paths need an explicit conditional
  qualifier in both the skill outcome and any requirements template guidance.
- The final visual-reference path should consistently say
  `<ticket-folder>/visual-references/`; project-level baseline screenshots can
  remain in Bootstrapper evidence and must not be called normative final
  references.

### Redundancy, transitions, and economy

The repeated exact-fidelity gates across shared principles, Bootstrapper, and
Product Prototyper are justified because each role applies a different gate:
Bootstrapper proves current parity; Product Prototyper accepts and regresses;
Requirements Engineer verifies approved UI/UX integration. Keep the reminders,
but make each reminder name its role-specific result.

The repeated “no branch/worktree/separate repository” wording is useful at the
project boundary and ticket boundary, but it can be reduced to one canonical
shared rule plus short skill reminders. Do not remove the explicit negative at
the Bootstrapper boundary because it prevents Bootstrapper from taking over
ticket ownership.

## Findings and evidence

### Macro findings

| ID | Severity | Evidence | Impact |
| --- | --- | --- | --- |
| M1 | High | Product sequence uses project-level `visual-references/`; shared Section 12 and ticket lifecycle use ticket folders. | Final artifacts can be split between two locations and handoffs can reference stale paths. |
| M2 | High | Requirements Engineer ownership paragraph assigns Product ticket-folder artifacts and status at all. | Requirements Engineer crosses Product Prototyper's independent ticket/project boundary. |
| M3 | High | Shared and role documents still allow a sibling prototype workspace. | The prototype may be created outside the parent/source repository contrary to the clarified project placement. |
| M4 | High | Team-wide package-preservation rule conflicts with the fixed minimal Product→Bootstrapper trigger. | Bootstrapper requests may either become non-minimal or silently lose package context. |
| M5 | Medium | Product skill defines move-to-done but team/template do not define its terminal conditions. | Tickets may be moved prematurely or remain in progress after completion. |
| M6 | Medium | Bootstrapper report and Product ticket record are both provenance sources without an explicit acceptance link. | Accepted baseline revision and ticket status can drift. |
| M7 | High | Requirements Outcome unconditionally requires prototype paths even though the gate is conditional. | Backend-only or not-recommended requirements packages have invalid output obligations. |

### Micro findings

| ID | Severity | Evidence | Impact |
| --- | --- | --- | --- |
| m1 | Medium | `project root`, `workspace`, and `ticket folder` are mixed in neighboring rules. | Artifact placement requires inference. |
| m2 | Low | “separate task commit” in Bootstrapper skill. | Commit ownership is less precise than the surrounding contract. |
| m3 | Medium | Final visual-reference path differs between Product skill, templates, and shared Section 12. | Normative screenshots may not be stored with the ticket that approves them. |
| m4 | Low | General handoff reminder and fixed-bootstrap exception are separated. | Readers may append ticket/package artifacts to the fixed request. |

## Proposed improvements

### Macro actions, in order

1. **Restructure — shared artifact topology**
   - **Affected boundary:** `shared/product-prototype-principles.md` Sections
     10 and 12.
   - **Change:** Define project-root code and baseline evidence separately from
     per-ticket artifacts. Make each ticket folder the canonical owner of its
     ticket record, `ui-ux-spec.md`, final `visual-references/`, report, and
     ticket-specific support files.
   - **Effect:** One unambiguous artifact topology without reintroducing
     branches, worktrees, or a separate repository.

2. **Update — Product Prototyper ticket and evidence flow**
   - **Affected files:** Product Prototyper `SKILL.md` and templates.
   - **Change:** Make the ticket transition states and terminal move-to-done
     conditions explicit; use the ticket-folder visual-reference path in the
     workflow and all templates; make the ticket record link the Bootstrapper
     report, accepted baseline revision, final revision, and handoff paths.
   - **Effect:** The Product Prototyper owns the complete ticket lifecycle while
     Bootstrapper remains independent of ticket management.

3. **Update — Requirements Engineer boundary and conditional output**
   - **Affected files:** Requirements Engineer `SKILL.md` and
     `requirements-doc-template.md`.
   - **Change:** Remove Product Prototyper ticket-lifecycle ownership from the
     Requirements Engineer skill, distinguish the requirements task workspace
     from the sibling prototype project, and make prototype paths conditional
     (`N/A` when no prototype applies).
   - **Effect:** Requirements Engineer remains canonical for requirements
     without owning Product Prototyper's ticket or project management.

4. **Update — Sibling project boundary and handoff exception**
   - **Affected files:** shared principles, `team.md`, `team-config.json`,
     Product Prototyper `SKILL.md`, Bootstrapper `SKILL.md`, and the relevant
     agent/template descriptions.
   - **Change:** Require the prototype project to be a named sibling directory
     of the selected frontend at the same parent level inside the
     parent/source repository; do not add a generic `prototypes/` container.
     Also state that the fixed
     Product→Bootstrapper trigger is a narrow exception to general package
     preservation: Product retains the ticket and later attaches the
     Bootstrapper report/evidence; Bootstrapper receives no future-state
     ticket package.
   - **Effect:** The independent bootstrap remains minimal and routing remains
     deterministic.

5. **Update — Bootstrapper commit wording and report linkage**
   - **Affected files:** Bootstrapper `SKILL.md`, `agent.md`, and report
     template.
   - **Change:** Replace “separate task commit” with accepted-project-commit
     language; keep Bootstrapper's report project-level and add the fields
     Product Prototyper needs to record acceptance without transferring ticket
     ownership.
   - **Effect:** Commit ownership and baseline provenance are explicit.

6. **Keep — Existing templates and dynamic handoff architecture**
   - **Affected files:** all three agent configs and existing supporting
     templates.
   - **Change:** Keep the current tool lists, dynamic `get_handoff_rules`
     pattern, user approval boundary, exact-fidelity checks, and normal
     requirements task-worktree rules. Only add short cross-references where
     needed; do not add a new task-management or repository layer.
   - **Effect:** Preserve working behavior and avoid redundancy.

### Micro actions, in order

1. **Update:** normalize `prototype project root`, `ticket folder`, and
   `requirements task workspace` terminology in the affected files.
2. **Rewrite:** replace “separate task commit” with “accepted project commit
   owned by Product Prototyper.”
3. **Move:** place the fixed-bootstrap package exception beside the general
   handoff artifact rule.
4. **Update:** use `<ticket-folder>/visual-references/` for normative final
   references and distinguish it from Bootstrapper comparison evidence.
5. **Keep:** retain prohibitions that protect user approval, production paths,
   source pinning, exact validation, dynamic routing, and ticket ownership.

## Assumptions and open questions

1. A caller-supplied ticket/request identifier is authoritative when present;
   otherwise Product Prototyper uses the surrounding project's normal ticket
   convention and does not create a `PT-*` namespace.
2. The runnable prototype implementation remains at the project root; moving
   a ticket folder to `done/` moves its artifacts, not the source project into
   a separate worktree.
3. Bootstrapper comparison evidence may remain project-level or in its own
   evidence subdirectory; only user-approved final visual references are
   required to live under the completed ticket folder.
4. No change is proposed to Requirements Engineer's own task-worktree
   isolation; it remains separate from prototype ticket-folder management.

## Validation plan

After approval and implementation:

1. Parse all affected JSON configuration and verify handoff members and
   recipients.
2. Check every local Markdown link, including the new ticket template and all
   deleted-template references.
3. Search for stale work-item, manifest, separate-repository, and old
   project-level final-visual paths in authoritative files.
4. Verify the three role flows in execution order: requirements handoff,
   baseline bootstrap/return/acceptance, ticket evolution, finalization, and
   requirements integration.
5. Run `git diff --check` and inspect the two macro and micro review passes.
6. Preserve the unrelated untracked `.codex/artifacts/requirements-outcome-routing-flexibility/`
   and `.codex/skills/` paths.

Target skill files changed during analysis: None

Analysis artifact:
`.codex/artifacts/requirements-engineering-team-consistency-audit/optimization-analysis.md`

## Post-approval implementation and validation record

- Approval recorded: User explicitly approved the proposed consistency updates.
- Target files changed: shared prototype principles, team contract and handoff
  configuration, Requirements Engineer skill/template, Product Prototyper
  skill/templates, Bootstrapper skill/agent, and this analysis artifact.
- Behavior preserved or intentionally changed: Preserved exact current-state
  bootstrap, user approval, dynamic handoff, and commit ownership boundaries.
  Clarified that the prototype project is a named sibling of the selected
  frontend inside the parent/source repository; Product Prototyper owns its
  ticket from intake through the
  `in-progress` → `done` folder transition; Requirements Engineer only passes
  requirements context and integrates the returned artifacts.
- Validation performed and result: `git diff --check`, all repository JSON
  parsing, team handoff endpoint checks, changed-file Markdown-link resolution,
  deleted-template reference checks, stale-boundary searches, and a third
  macro/content assertion pass all passed, including the ownership and
  no-frontend mode checks from the latest review.

## Macro review pass

- Invariants checked: Requirements ownership, Product ticket/project ownership,
  Bootstrapper current-parity scope, parent-repository placement, ticket-folder
  finalization, user approval, exact-fidelity gates, and dynamic handoffs.
- Grounding issues: No unsupported runtime paths or handoff recipients found.
- Flow or ownership issues: Fixed the Requirements Engineer ticket-ownership
  wording, sibling project naming/location, fixed-bootstrap exception,
  conditional prototype outputs, and ticket finalization conditions.
- Cross-file issues: Shared principles, team config, all three skills, agent
  descriptions, and templates now use the same project/ticket/artifact model.

## Micro review pass

- Redundancy removed: Removed obsolete work-item, delivery-manifest,
  repository/worktree, and project-level final-visual variants from the active
  prototype contract.
- Defensive wording retained and why: Kept production-path protection,
  source-pinning, exact-validation, user-approval, ticket-conflict, and fixed
  bootstrap restrictions because each closes a plausible failure boundary.
- Transitions repaired: Requirements handoff → Product ticket intake → minimal
  Bootstrapper baseline → Product acceptance → ticket artifact finalization →
  `tickets/done/` → Requirements integration.
- Final residual risk: Multiple overlapping tickets share one project working
  tree, so the Product Prototyper must serialize conflicting changes as stated
  in the shared lifecycle rule.
