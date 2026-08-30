# Product Design & Prototyping Team Separation Review

Review Status: Implemented; final consistency review passed

## User request and scope

Separate Product Prototyper and Prototype Bootstrapper from Requirements
Engineering into a dedicated `product-design-prototyping-team`. Restore the
prototype's independent project and repository boundary, keep its ticket
lifecycle owned by that team, and connect the three teams through
`send_message_to` handoffs rather than task delegation. Recheck the complete
cross-file package after implementation and repair any remaining
inconsistencies.

## Current behavior and package ownership baseline

The current repository has these relevant structures:

- `requirements-engineering-team` contains Requirements Engineer,
  Product Prototyper, Prototype Bootstrapper, the shared prototype principles,
  and local handoffs between all three roles.
- `software-engineering-team` is already separate. Its coordinator is
  `architecture_designer`; there is no `solution_designer` member or reference.
- `software-development-department` currently nests only Requirements
  Engineering and Software Engineering and routes the approved requirements
  package directly from Requirements Engineer to Architecture Designer.
- Product prototype instructions currently place the prototype project inside
  the source repository, with ordinary ticket folders and no per-ticket
  worktree.
- Product Prototyper already owns prototype tickets and commits, while
  Bootstrapper is bounded to current-experience parity and returns its result
  to Product Prototyper.

## Requested target topology

```text
software-development-department
├── requirements-engineering-team
│   └── requirements-engineer
├── product-design-prototyping-team
│   ├── product-prototyper
│   └── prototype-bootstrapper
└── software-engineering-team
    ├── architecture-designer
    ├── architecture-reviewer
    ├── implementation-engineer
    ├── code-reviewer
    ├── api-e2e-engineer
    └── delivery-engineer
```

The prototype repository is separate from the production/source repository:

```text
workspace/
├── source-repository/
└── <prototype-subject>-prototype/
    └── tickets/
        ├── in-progress/<ticket-id>/
        └── done/<ticket-id>/
```

Product Prototyper owns the separate prototype repository, project files,
tickets, commits, user review, and UI/UX artifacts. Requirements Engineer owns
requirements and only sends or receives requirement/prototype handoff context.
Bootstrapper works inside the prototype repository for current-experience
parity, but does not own future-state tickets, approval, or the accepted
Product Prototyper commit.

## Implementation summary

The approved redesign is now represented in the live definitions:

- Product Prototyper and Prototype Bootstrapper were moved into
  `agent-teams/product-design-prototyping-team/`.
- Requirements Engineering now contains only Requirements Engineer and has no
  local Product ownership or product handoff routes.
- The department now mounts all three teams and owns the rooted
  Requirements ↔ Product cross-team routes. Product-local routes remain only
  Product Prototyper ↔ Prototype Bootstrapper.
- Product documentation now requires a separate prototype Git repository,
  ordinary ticket folders, Product-owned commits, and `send_message_to`.
- Requirements documentation now treats prototype artifacts as externally
  owned and links them without managing their repository or tickets.

## Preserved invariants

1. Requirements Engineer remains the canonical owner of requirements,
   investigation, acceptance criteria, explicit user approval, and
   architecture readiness.
2. Product Prototyper owns the prototype repository and its ticket lifecycle
   from request intake, including normal project commits and final UI/UX
   artifacts.
3. Prototype Bootstrapper remains a bounded current-experience parity
   specialist and does not redesign the product or own requirements.
4. The pinned production frontend remains the authority for current-state
   parity; prototype internals remain lightweight and synthetic.
5. The user remains the sole approval authority for intentional future-state
   UI/UX and behavior.
6. Ticket folders remain ordinary prototype-repository artifacts. This review
   restores the separate repository boundary but does not reintroduce the
   obsolete `PT-*` namespace, mandatory delivery-manifest layer, or dedicated
   per-ticket worktrees unless explicitly requested later.
7. All agent-to-agent and cross-team routing uses `get_handoff_rules` followed
   by `send_message_to` with the exact returned recipient address.
8. The software-engineering coordinator remains `architecture_designer`.

## Macro analysis

### Package topology and ownership

**Finding M1 — Critical — Prototype roles are owned by the wrong team.** The
Product Prototyper and Bootstrapper packages, shared principles, and team
contract are physically and conceptually under Requirements Engineering. This
makes Requirements Engineering appear to own a project, repository, tickets,
and UI/UX work that it should only request and later integrate.

**Finding M2 — High — The repository boundary contradicts the independent
project model.** Current rules place the prototype inside the production/source
repository. That conflicts with Product Prototyper independently maintaining
its own project history, tickets, and commits.

### Handoff and department topology

**Finding M3 — Critical — Cross-team routing is not represented.** The current
Requirements Engineering Team config routes Requirements Engineer directly to
Product Prototyper as a local member. The Product Design & Prototyping Team
must become a sibling nested team, and the containing department must route the
cross-team outcomes through canonical addresses.

**Finding M4 — High — The department omits the Product Design & Prototyping
Team.** The department currently describes only two independent teams and has
no route for a prototype request, prototype completion, requirement impact, or
prototype blocker.

**Finding M5 — High — The three-team flow must preserve the requirements gate.**
The Product Design & Prototyping Team may work independently and can receive a
user request, but Requirements Engineer remains responsible for integrating
approved UI/UX evidence into the canonical requirements package before the
Software Engineering handoff.

### Behavioral and artifact boundaries

**Finding M6 — High — Bootstrap context must carry two repository identities.**
An existing-frontend bootstrap needs the source repository/frontend locator and
the separate prototype repository/root. Product Prototyper keeps ticket and
future-state context locally; Bootstrapper receives only the minimal
current-baseline context needed for its mode.

**Finding M7 — Medium — Artifact templates need separate-repository language.**
Prototype reports, runbooks, UI/UX specifications, and tickets must identify
the source repository and the prototype repository separately. Requirements
artifacts should link returned prototype paths without managing them.

## Micro analysis

- Replace `parent/source repository` when referring to prototype code with
  `prototype repository`; retain `source repository` for the production
  frontend and source authority.
- Keep `prototype project root` for the prototype repository root and
  `requirements task workspace` for Requirements Engineer artifacts.
- Use `send_message_to` for Requirements Engineer → Product Prototyper,
  Product Prototyper → Bootstrapper, Bootstrapper → Product Prototyper, and
  Product Prototyper → Requirements Engineer.
- Keep local team configs responsible for local-member handoffs and put
  sibling-team routing in the containing Software Development Department.
- Keep the fixed bootstrap message minimal. Add the separate prototype
  repository/root as a target/provenance field, not future-state requirements,
  ticket instructions, or implementation guidance.

## Proposed improvements

1. **Move — Product prototype package**
   - Move both prototype agents, their skills, templates, and shared principles
     under `agent-teams/product-design-prototyping-team/`.
   - Remove them from Requirements Engineering's local members and local
     handoff config.

2. **Add — Product Design & Prototyping Team**
   - Add `team.md` and `team-config.json` with Product Prototyper as the
     coordinator and Bootstrapper as the specialist.
   - Keep only internal Bootstrapper/Product Prototyper handoffs in this team.

3. **Update — Separate repository lifecycle**
   - Restore a canonical sibling prototype repository derived from
     `<prototype-subject>-prototype`.
   - Make Product Prototyper responsible for resolving, creating, protecting,
     and committing that repository; keep ordinary ticket folders inside it.
   - Keep Bootstrapper's edits bounded to that repository and leave accepted
     commit ownership with Product Prototyper.

4. **Update — Department topology and cross-team handoffs**
   - Add the Product Design & Prototyping Team as a nested department member.
   - Route Requirements Engineer prototype requests and Product Prototyper
     results through the department's rooted cross-team addresses.
   - Keep Requirements Engineer → Architecture Designer as the post-approval
     route.

5. **Update — Requirements boundary and artifacts**
   - Remove prototype role ownership and shared prototype principles from the
     Requirements Engineering Team package.
   - Keep the Requirements Engineer's prototype gate and integration rules,
     but describe prototype outputs as externally owned links.

6. **Update — Agent descriptions, templates, and audit records**
   - Align repository identity, ticket ownership, handoff transport, and
     no-frontend behavior across all moved files and the requirements docs.
   - Record the completed review and validation in this analysis artifact.

## Assumptions and open questions

1. “Own repository and tickets” means restore a separate prototype Git
   repository and ordinary ticket folders, while retaining the latest
   simplification that removed per-ticket branches/worktrees and `PT-*` IDs.
2. The Product Design & Prototyping Team is a sibling nested team of the
   Requirements and Software Engineering Teams under the Software Development
   Department.
3. Cross-team routes are declared by the containing department; local team
   routes remain local and are compiled into the containing team graph.
4. Remote repository creation and push remain subject to repository policy or
   explicit authorization; Product Prototyper still owns local commits and
   repository state.

## Validation plan

- Parse every repository JSON file.
- Validate nested-team references, coordinators, and all handoff endpoints by
  resolving the department graph.
- Check local Markdown links and moved symlink targets.
- Search for stale prototype paths, old team membership, old same-repository
  claims, and forbidden delegation language in active instructions.
- Assert the three-team flow, separate repository boundary, ticket ownership,
  Bootstrapper scope, and dynamic `send_message_to` handoffs.
- Perform a second macro review and a final micro/content review after edits.

Target skill files changed during implementation: Product Prototyper, Prototype Bootstrapper, and Requirements Engineer skills plus their templates

Analysis artifact:
`.codex/artifacts/product-design-prototyping-team-separation/optimization-analysis.md`

## Final consistency review

The post-implementation review passed these checks:

- JSON parsing succeeds for all agent/team configs in the edited topology.
- The Requirements Engineering team contains only Requirements Engineer.
- The Product Design & Prototyping team contains Product Prototyper and
  Prototype Bootstrapper, with Product Prototyper as coordinator.
- The department mounts exactly the three specialist teams and its effective
  rooted handoff graph has no duplicate routes. Requirements ↔ Product routes
  are department-level; Product ↔ Bootstrapper routes are team-local.
- All three participating agents expose `get_handoff_rules` and
  `send_message_to`; none exposes task-delegation tools.
- Product repository/ticket/commit ownership, Bootstrapper baseline scope,
  source-versus-prototype repository separation, and Requirements external-link
  ownership agree across team contracts, skills, and templates.
- Moved shared-principles links and edited-package Markdown links resolve.
- `git diff --check` passes.

Unrelated pre-existing definitions and untracked directories were left
untouched.
