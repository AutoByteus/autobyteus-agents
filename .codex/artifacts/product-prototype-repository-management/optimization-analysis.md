# Product Prototyper Repository-Management Review

Review Status: Follow-up naming refinement implemented; validated

## Requested outcome

Make the product-prototyper operate independently according to its skill. It should use the current request and available context, without describing or branching on how that context arrived. It should manage one stable prototype project root, preserve and validate the current baseline, create detailed UI/UX specifications and visual evidence, commit its own accepted project state, and finish through the configured dynamic handoff rules. The prototype stays inside the same source repository as a named sibling project of the selected frontend, and the workflow must not invent a second per-request ticket/work-item system.

The prototype-bootstrapper should remain an independent specialist for
establishing or refreshing the current-experience baseline in that canonical
project root. It may initialize or update the project and return a bootstrap
report, but it should not absorb the product-prototyper's future-state design,
acceptance, or normal project-commit ownership.

## Review scope and baseline

Reviewed the current topology and content of:

- `agent-teams/requirements-engineering-team/team.md`
- `agent-teams/requirements-engineering-team/team-config.json`
- `agent-teams/requirements-engineering-team/agents/product-prototyper/agent.md`
- `agent-teams/requirements-engineering-team/agents/product-prototyper/skills/requirements-prototyper/SKILL.md`
- Product-prototyper templates, including the UI/UX specification, prototype report, runbook, behavior matrix, and change log
- `agent-teams/requirements-engineering-team/agents/prototype-bootstrapper/agent.md`
- `agent-teams/requirements-engineering-team/agents/prototype-bootstrapper/skills/prototype-bootstrapper/SKILL.md`
- `agent-teams/requirements-engineering-team/agents/prototype-bootstrapper/templates/prototype-bootstrap-report-template.md`
- `shared/product-prototype-principles.md`
- `agent-teams/requirements-engineering-team/agents/requirements-engineer/skills/requirements-engineer/SKILL.md`
- Requirements-engineer worktree and requirements templates, as the repository/work-item reference pattern

The earlier review was implemented in the preceding change set. This
follow-up compares that design with the earlier stable project-root workflow
and removes the extra prototype-specific task-management layer while keeping
the useful baseline, evidence, ownership, and handoff safeguards.

## Follow-up comparison and simplification

The earlier workflow already supplied the key identity rule: derive a stable
`<prototype-subject>-prototype` root from the selected frontend or product
surface, reuse it for later work, and place it beside the source frontend at
the same parent level. The prototype remains a project inside the same source
repository rather than introducing another repository or task system. Ticket
folders remain part of the normal project artifacts.

The later repository-management revision was over-specified. It introduced
`PT-*` work items, `tickets/in-progress` and `tickets/done` packages, ticket
branches/worktrees, a mandatory delivery manifest, and a Bootstrapper
checkpoint commit. Those concepts duplicated normal project history and the
canonical UI/UX/report artifacts without improving the stable prototype
identity.

The simplified contract is now:

1. Keep one canonical prototype project root for a frontend/product surface.
2. Keep that project as a sibling project directory of the selected frontend
   inside the same source repository. If the frontend is nested, use the same
   parent level; if it is a direct child of the repository root, the prototype
   is also a direct child. When no frontend exists, use a direct child of the
   source repository. Name it `<prototype-subject>-prototype`; do not add a
   generic `prototypes/` container.
3. Never write prototype files inside the production frontend directory.
4. Let Bootstrapper establish or refresh the current-experience baseline and
   return a runnable result, report, and exact comparison evidence.
5. Let Product Prototyper acceptance-test the result, create the accepted
   baseline commit, implement future-state changes, and commit normal project
   history and final UI/UX evidence.
6. Manage each request through its supplied ticket or request identifier in a
   `tickets/in-progress/<ticket-id>/` or `tickets/done/<ticket-id>/` folder.
   These folders are ordinary project artifacts; do not create a ticket branch,
   task worktree, prototype-specific ID, or delivery-manifest package.

This preserves repository safety and reproducibility without turning the
prototype into a second ticket-management system.

## Preserved invariants

The update must preserve these existing responsibilities and safeguards:

1. The requirements engineer remains the canonical owner of product requirements, acceptance criteria, scope, and readiness when a requirements-engineering request exists.
2. The product-prototyper owns the future-state experience, detailed UI/UX specification, user review cycle, and normative final visual references.
3. The prototype-bootstrapper owns current-experience baseline discovery, parity implementation, and bootstrap evidence; it does not redesign the product.
4. The selected production frontend and pinned source revision are the authority for current-state UI/UX parity.
5. Prototypes use high experience fidelity and low implementation fidelity: local state, fixtures, and simulated service behavior are allowed, but must be explicit and resettable.
6. A current baseline must be accepted before a future-state change is layered onto an existing frontend.
7. The user is the final approver of intended future-state experience decisions.
8. Handoff remains dynamic: the agent calls `get_handoff_rules`, sends messages only to exact configured recipients using the configured messaging tool, and returns to the user or calling workflow when no team rule applies.
9. The prototype project root must remain separate from the production frontend
   directory within the selected workspace, and bootstrapping must not write
   production changes.
10. Final UI/UX artifacts must agree with the runnable prototype and the approved visual evidence.

## Historical macro analysis

### M1 — Missing prototype repository and worktree lifecycle (Critical)

The product-prototyper skill describes an accepted prototype workspace but does not define how to identify or create the long-lived sibling Git repository, verify its baseline, create a ticket branch/worktree, protect unrelated work, commit changes, or record the resulting revision. The bootstrapper has the same gap for its initial baseline.

**Impact:** The agents can produce files in an ambiguous directory and report completion without a durable, reproducible repository state. Parallel prototype requests can overwrite one another, and the production repository boundary is dependent on an agent's interpretation.

**Proposed action:** Update the shared product-prototype principles with the canonical repository boundary and lifecycle. Add an explicit repository/work-item phase to the product-prototyper skill and a bounded initial-baseline repository phase to the bootstrapper skill. Define source repository, prototype repository, base commit, ticket branch/worktree, accepted commit/tag, dirty-worktree checks, and blocker behavior.

### M2 — Missing prototype ticket/work-item identity and delivery topology (Critical)

The current artifacts are mostly named by type (`ui-ux-spec.md`, screenshots, report) and do not establish one stable package for one cohesive experience change. They do not define how multiple requirements map to one prototype ticket or how concurrent tickets are isolated.

**Impact:** Delivered work is difficult to review, resume, compare, or hand off. Requirements IDs, UI/UX decisions, screenshots, validation, and the exact commit can become disconnected.

**Proposed action:** Introduce a prototype work-item convention, with one work item for a cohesive experience/use-case change and optional links to multiple `REQ-*` and `AC-*` IDs. Add templates for a work-item record and a delivery manifest. Define an in-progress and completed package layout, stable IDs, and the relationship between the work item, branch/worktree, artifacts, and commit/tag.

### M3 — The skill should be request-driven, not invocation-mode-driven (High)

The product-prototyper should not describe whether it was invoked by a user or another agent. From the product-prototyper's perspective, it operates on the current request and available workspace/context, then follows the same skill.

**Impact:** Sender and transport language adds unnecessary branching and duplicates concepts that are already handled by the runtime. It can also make a request without requirements IDs look invalid when those IDs simply are not part of the available context.

**Proposed action:** Remove invocation-source terminology from the product-prototyper and bootstrapper agent descriptions and skills. Begin with request scope and context, use requirements and acceptance-criteria references when available, and record unavailable/not-applicable references in artifacts. Missing observable decisions should still produce a focused clarification/blocker rather than an unbounded redesign.

### M4 — Product-prototype report routing is too narrow (High)

The current product-prototype report template names `requirements_engineer` as the required recipient. That conflicts with the existing rule that an agent should determine its recipient dynamically through `get_handoff_rules`.

**Impact:** The report schema encourages hardcoded routing and makes the artifact depend on one particular caller instead of the configured outcome rules.

**Proposed action:** Replace the fixed recipient requirement with a routing section that records the terminal outcome, the result package, the dynamically selected recipient if one exists, and the user/calling-workflow return path when no matching team rule exists. Keep requirements-engineer integration as one supported route, not the universal route.

### M5 — Delivery artifacts lack a canonical manifest (High)

The current UI/UX specification is rich and the report is useful, but neither is a complete delivery manifest. There is no mandatory single record for the work-item ID, source pin, prototype repository/revision, approval reference, artifact paths, validation result, limitations, and handoff result.

**Impact:** Reviewers cannot reliably determine which exact prototype revision produced the visuals or whether the delivered files correspond to the approved state.

**Proposed action:** Make a delivery manifest mandatory for completed or blocked work. Keep `ui-ux-spec.md` as the canonical experience specification, use the report for analytical findings and integration notes, and use the manifest as the immutable index of the delivered package.

### M6 — UI/UX specification needs repository and provenance metadata (High)

The current UI/UX template covers visual, journey, interaction, state, responsive, accessibility, content, mock-data, and visual-reference details well. It does not consistently capture the prototype work-item, branch/worktree, source revision, accepted baseline revision, final prototype commit/tag, or the exact approval linkage.

**Impact:** The specification can be detailed yet not reproducible. A future implementation team may not know which code state and source state the specification describes.

**Proposed action:** Add a concise provenance block and a repository/delivery section to the template. Use `N/A — not supplied` or `N/A — not applicable` where requirements traceability is unavailable; do not duplicate the complete requirements document.

### M7 — Visual terminology and naming need one convention (Medium)

“Screenshots” is accurate for captured browser images, while “visual references” is the better umbrella because the package may later contain annotated captures, diagrams, or other approved visual evidence. The current template has visual IDs but no required directory or filename convention.

**Impact:** Visual evidence can be hard to locate or mistaken for informal illustration.

**Proposed action:** Define `visual-references/` as the package directory, retain “screenshot” for an actual captured image, and require stable `VIS-*` IDs and descriptive filenames. Mark each visual as normative or illustrative/permitted variation in the UI/UX specification.

### M8 — Commit ownership between bootstrapper and prototyper is undefined (Medium)

The current skills distinguish baseline implementation from future-state work but do not say who commits what. This is especially ambiguous when the bootstrapper creates the first sibling repository.

**Impact:** Agents may leave an uncommitted baseline, commit future-state design into the wrong branch, or claim a result without a reproducible revision.

**Proposed action:** Define that the Product Prototyper reserves the stable
prototype repository path and work item. The Bootstrapper may initialize or
update that repository and create a reproducible candidate checkpoint/report.
The Product Prototyper runs acceptance and regression checks, then creates the
official accepted-baseline commit or tag and owns future-state ticket commits
and final delivery tags. Neither role commits to the production repository.
Remote creation and pushing remain explicit policy/user actions, not an
implicit side effect.

### M9 — Source/prototype/production boundaries are scattered (Medium)

The principles mention a separate sibling project and the skills mention an isolated root, but the team flow, report, and UI/UX template do not all use the same provenance vocabulary.

**Impact:** “Workspace,” “prototype root,” “source root,” and “project” can be interpreted as the same location, increasing the risk of production writes or stale-source validation.

**Proposed action:** Standardize the terms `source repository`, `prototype repository`, `prototype worktree`, `work-item package`, and `delivered revision` across the principles, skills, agent descriptions, and templates.

### M10 — Concurrency and recovery rules are absent (Medium)

The requirements engineer has explicit dedicated-worktree and isolation checks. The prototype package has no equivalent behavior for an existing dirty worktree, an occupied ticket branch, a stale baseline, a missing source revision, or an incomplete prior ticket.

**Impact:** The agent may silently mix work, overwrite evidence, or continue from an unreviewed state.

**Proposed action:** Add deterministic recovery rules: never reuse a dirty/unrelated worktree, never overwrite another ticket package, block on missing source or baseline provenance, and report the exact blocker and next action through the normal handoff mechanism.

## Historical micro/content architecture analysis

1. **Keep the shared principles authoritative for cross-agent invariants.** Repository boundary, fidelity model, source pinning, work-item naming, visual-reference terminology, and commit/tag semantics belong there.
2. **Keep the product-prototyper skill as the executable workflow.** Reorder it into request scope/context, repository/work-item setup, baseline routing, experience design, validation, delivery, and dynamic handoff. Avoid copying the complete repository rules into `agent.md`.
3. **Keep `agent.md` short and role-oriented.** It should identify ownership boundaries, repository separation, and the requirement to follow the skill; detailed procedure remains in the skill.
4. **Keep the bootstrapper bounded.** It should share the repository and fidelity invariants, but its output remains current-baseline parity and a bootstrap report. It must not become a second product designer or requirements owner.
5. **Make the UI/UX specification canonical for experience detail.** Do not duplicate every interaction rule in the report or manifest. The manifest indexes it; the report explains findings and integration impact.
6. **Use cross-references instead of repeated requirements content.** Requirements IDs, behavior IDs, and acceptance criteria should be linked from the prototype package; the prototype should not redefine product scope.
7. **Preserve the current dynamic handoff wording.** Team configuration describes available internal routes; skills describe how to query and apply them. The agent should return to the calling context when no configured team rule applies, without fabricating a recipient.
8. **Remove stale universal language.** In particular, replace “required recipient: requirements_engineer” and requirements-only intake wording with the request/context-driven skill flow.

## Historical proposed update set

The following is the proposed implementation set. “Update” means edit an existing authoritative file; “Add” means introduce a new template or artifact.

| Action | File | Proposed change |
|---|---|---|
| Update | `shared/product-prototype-principles.md` | Add the canonical sibling-repository boundary, source pin, prototype-repository lifecycle, ticket/work-item and worktree rules, commit/tag ownership, delivery package layout, visual-reference naming, and recovery invariants. |
| Update | `.../product-prototyper/agent.md` | State the repository ownership boundary, role ownership, and handoff responsibility; defer procedure to the skill without describing invocation source. |
| Update | `.../product-prototyper/skills/requirements-prototyper/SKILL.md` | Reorder and extend the workflow with request scope/context, repository/work-item initialization, baseline acceptance, isolated ticket worktree, independent commits, delivery manifest, recovery, and exact terminal handoff behavior. |
| Update | `.../product-prototyper/templates/ui-ux-spec-template.md` | Add work-item/repository/source/baseline/final-revision provenance and approval links; preserve the existing detailed visual and interaction sections. |
| Update | `.../product-prototyper/templates/product-prototype-report-template.md` | Make routing dynamic rather than fixed to one recipient; add links to manifest, worktree, commit/tag, and blocker state without duplicating the UI/UX specification. |
| Update | `.../product-prototyper/templates/prototype-runbook-template.md` | Record prototype repository/worktree/branch, delivered revision, source pin, and reproducible run context. |
| Add | `.../product-prototyper/templates/prototype-work-item-template.md` | Define the ticket/work-item contract, objective, linked requirements, scope, baseline, branch/worktree, status, review/approval, and artifact links. |
| Add | `.../product-prototyper/templates/prototype-delivery-manifest-template.md` | Provide the mandatory final index for status, exact revisions, artifact paths, visual references, validation, limitations, approval, and dynamic handoff result. |
| Update | `.../prototype-bootstrapper/agent.md` | State that it may establish the initial prototype-repository baseline and returns a reproducible commit/report without owning future-state design. |
| Update | `.../prototype-bootstrapper/skills/prototype-bootstrapper/SKILL.md` | Add reserved-repository/worktree safety, candidate-checkpoint semantics, provenance fields, and consistent completion behavior while retaining independent parity discovery. |
| Update | `.../prototype-bootstrapper/templates/prototype-bootstrap-report-template.md` | Add prototype repository/worktree/revision and delivery-manifest linkage; retain source-vs-prototype inventory and parity evidence. |
| Review only | `team.md`, `team-config.json` | Preserve the existing internal topology and dynamic handoffs unless validation finds stale wording. Do not add a fake user member or hardcode a user route. |
| Review only | Requirements-engineer skill/templates | Reuse their worktree/ticket concepts and align cross-references, but do not change requirements ownership or duplicate its artifacts. |

## Historical package model (superseded)

The implementation should document a model such as:

```text
<workspace>/
  <production-project>/                 # source repository; never modified by prototype work
  <production-project>-prototype/        # long-lived sibling prototype repository
    main                                 # latest accepted prototype baseline
    tickets/
      in-progress/PT-<id>-<slug>/       # work-item package and evidence while active
      done/PT-<id>-<slug>/               # immutable delivered package
        prototype-work-item.md
        ui-ux-spec.md
        prototype-delivery-manifest.md
        visual-references/
        ui-behavior-test-matrix.md
        prototype-runbook.md
        prototype-change-log.md
        product-prototype-report.md
```

The exact root may be supplied by the user or workspace configuration, but the concepts and provenance fields should remain stable. A ticket may link to multiple requirements when it represents one cohesive experience change. A separate branch/worktree is used for concurrent or isolated work; the accepted result is committed in the prototype repository and linked from the manifest. Push/remote creation is explicit, not automatic.

## Historical assumptions and open questions

1. **Prototype ticket prefix:** This analysis assumes a prototype-specific `PT-*` ID, while preserving `REQ-*`, `AC-*`, `BEH-*`, `TR-*`, `VIS-*`, and `PC-*` IDs. If the project already has a ticket namespace, the templates should parameterize the prefix rather than invent a collision.
2. **Remote hosting:** The recommended default is a separate local/remote prototype repository per long-lived product prototype, but the agent should not create a GitHub repository or push without explicit authorization or an established policy.
3. **Accepted-state merge policy:** The proposed default is commit and tag the approved prototype state, with merging to prototype `main` controlled by the repository policy. The skill should not silently merge or rewrite another ticket's branch.
4. **Prototype repository initialization:** The Product Prototyper reserves the
   stable sibling path before Initial Bootstrap. If no repository exists, the
   Bootstrapper may initialize it at that exact path; if repository creation,
   path safety, or isolation is impossible, it must block with an explicit next
   action.
5. **Optional requirements traceability:** Requirements and acceptance-criteria references are used when available in the working context. When absent, the artifacts record `N/A — not supplied` or `N/A — not applicable`; the work must still define an observable objective, scope boundary, and user approval state.

## Current validation plan

Before committing this follow-up, I will:

1. Review the applied update set without discarding unrelated pre-existing working-tree changes.
2. Check that all referenced templates and paths exist and that each file has one clear owner and purpose.
3. Parse `team-config.json` and inspect all handoff recipients against the configured team members.
4. Search for stale invocation-source or requirements-only language, especially fixed report recipients and duplicated intake modes.
5. Verify that project-root/source provenance fields use consistent names across principles, skills, and templates.
6. Verify that product-prototyper and bootstrapper responsibilities do not overlap in future-state design or requirements ownership.
7. Run `git diff --check` and a content-order/redundancy review; report any validation limitation.

The current authoritative files are the updated team contract, Product
Prototyper and Bootstrapper skills, their project-level templates, and the
Requirements Engineer cross-references. The deleted work-item and delivery
manifest templates are intentional because the simplified workflow has no
consumer for them.
