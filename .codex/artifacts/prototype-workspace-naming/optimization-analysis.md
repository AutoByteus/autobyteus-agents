# Prototype Workspace Naming Optimization Analysis

Review Status: Implemented and validated

## User Request And Scope

Define a clear, scalable naming rule for runnable product-prototype workspaces and update the Requirements Engineering Team's prototype instructions through the Skill Optimizer workflow.

The agreed direction is:

- name a prototype for the frontend application or product surface it represents;
- use the suffix `-prototype`;
- in a monorepo, prefer the relevant frontend application rather than the monorepo name;
- let `product_prototyper` resolve the exact prototype root and pass that root to `prototype_bootstrapper`.

This review covers only prototype workspace selection and naming. It does not change prototype scope, technology selection, user approval, artifact ownership, bootstrap delegation, team handoffs, or the separately discussed coordination-board redesign.

## Current Behavior And Package Ownership Baseline

### Effective package topology

- `shared/product-prototype-principles.md` is the canonical shared contract for prototype technology, baseline fidelity, mocked boundaries, workspace isolation, and evidence.
- Both prototype skills load that shared file through role-local symlinks named `product-prototype-principles.md`.
- `agents/product-prototyper/skills/requirements-prototyper/SKILL.md` owns prototype scope, canonical-root inspection, bootstrap routing, prototype construction, user review, final evidence, and the UI/UX specification.
- `agents/prototype-bootstrapper/skills/prototype-bootstrapper/SKILL.md` requires an exact `prototype root` in its delegated work packet and creates or updates only that assigned root.
- Agent prompts are intentionally thin, and agent configs wire the relevant skills and tools.
- Templates record the resolved prototype root but do not select or name it.

### Existing naming behavior

The shared principles currently recommend a stable sibling workspace and illustrate it as `product-prototype/`. The Product Prototyper skill separately says:

- a long-lived existing-product prototype may use `../product-prototype/`;
- a new standalone prototype defaults to `ui-prototypes/<prototype-name>/`.

Neither instruction defines how `<prototype-name>` is chosen. Neither handles multiple frontend applications in a monorepo. The current example can therefore be mistaken for a universal fixed name, and the two locations partially duplicate workspace-placement policy.

### Primary instruction spine

`requirements request -> resolve prototype need -> resolve canonical prototype root -> inspect or bootstrap baseline -> build and validate -> user review -> final prototype artifacts -> requirements handoff`

The missing decision is the rule for resolving a new canonical prototype root before the bootstrap packet is created.

## Preserved Invariants And User-Authority Boundaries

- `requirements_engineer` remains the canonical requirements and approval owner.
- `product_prototyper` remains the prototype scope, user-review, and final UI/UX artifact owner.
- `prototype_bootstrapper` remains a bounded technical-baseline role and receives an exact assigned prototype root.
- An existing canonical prototype root is reused rather than renamed merely to satisfy the new convention.
- Long-lived existing-product prototypes remain isolated from the production project.
- Prototype code does not write to production services or depend on production credentials.
- Existing-frontend prototypes continue to use the relevant source frontend technology when practical.
- No-frontend prototypes continue to use the configured template or documented fallback.
- Prototype artifacts continue to record the absolute or otherwise stable runnable root.
- No tool configuration, team membership, task routing, output schema, or handoff lifecycle changes.
- No commit, push, merge, release, or deployment is part of this optimization.

## Macro Analysis

### Package Topology And Ownership

The package topology is coherent. The shared principles file is already the correct single owner for rules that both prototype roles must understand. Workspace naming is part of workspace selection and isolation, so it belongs there rather than in an agent prompt, template, team board, or a new reference file.

The Product Prototyper must retain a short operational instruction because it is the role that resolves the root before delegating bootstrap. The Bootstrapper needs no duplicated naming algorithm because it already consumes the exact root and is constrained to that assigned location.

### Authoritative Sources And Boundaries

There is a minor ownership defect: shared principles own workspace isolation, while the Product Prototyper independently defines example placement defaults. Adding a third naming rule without consolidating those statements would create competing authorities.

The correction should make the shared principles authoritative for selection, naming, placement, stability, and isolation. The Product Prototyper should apply that shared rule when it resolves the canonical root. The Bootstrapper should continue to follow the assigned path without independently renaming it.

### Logical Flow And Content Architecture

The workflow currently jumps from receiving an optional `prototype root` to checking whether the canonical root exists. When no root exists, the reader must invent both the name and location before creating the bootstrap packet.

The repaired flow should be:

1. Reuse an applicable supplied or existing canonical root.
2. Otherwise identify the prototype subject.
3. Derive `<prototype-subject>-prototype` using the source workspace's naming conventions.
4. Choose the stable isolated location.
5. Pass the exact root to the Bootstrapper.

This decision belongs immediately before the current existence check and delegation path.

### Behavioral Grounding And Invariants

The proposed convention is grounded in the user's explicit decision and the observed package:

- the prototype packet already contains the source project and exact prototype root;
- the Product Prototyper already inspects the source application and owns the prototype workspace;
- the Bootstrapper already inspects package metadata and operates only on the assigned root;
- the shared principles already distinguish existing-frontend, no-frontend, existing-prototype, and refresh modes;
- the shared principles already prefer an isolated stable sibling workspace for long-lived existing-product prototypes.

The term **prototype subject** is more precise than **source project** for naming. In a monorepo, the source project may contain several applications, while the prototype normally represents one frontend application or one recognizable product surface.

### Outputs, Validation, Recovery, And Handoff

The output remains one resolved canonical prototype root recorded in existing evidence artifacts. No new artifact is justified.

Recovery behavior should remain narrow:

- reuse an applicable existing canonical root;
- if a new root is required, choose the relevant application or surface name;
- use the repository name only when it represents the single relevant frontend;
- if no reliable subject can be identified, require an explicit stable name rather than silently choosing a generic directory.

The Bootstrapper continues to return a precise gap when its packet lacks a root. Handoff behavior does not change.

## Micro Analysis

### Wording And Terminology

- **Prototype subject** should mean the stable frontend application or product surface represented by the prototype.
- **Canonical prototype root** should continue to mean the exact stable workspace path used across bootstrap, evolution, review, and evidence.
- Use the directory form `<prototype-subject>-prototype` consistently.
- Prefer **frontend application name** over **frontend project name** because the former remains meaningful inside a monorepo.
- Do not prescribe a new slugging system; apply the source workspace's established directory/package naming convention.

### Qualifiers, Conditions, And Exceptions

- The frontend-application rule applies when an identifiable source frontend exists.
- In a monorepo, the relevant application outranks the repository name.
- A stable product-surface name is the fallback when a directory such as `frontend` is generic or does not identify the experience.
- The repository name is acceptable only when the repository represents the single relevant frontend.
- A no-frontend prototype uses a stable product or experience name.
- An existing canonical root is preserved even if it predates the convention; renaming it would create unnecessary path and evidence churn.

### Redundancy, Transitions, And Economy

- Keep the complete selection and naming rule once in the shared principles.
- Replace the Product Prototyper's competing hard-coded examples with a short operational application of the shared rule.
- Keep root fields in existing templates; they record evidence and do not duplicate selection logic.
- Keep the Bootstrapper's exact-root precondition; it protects the delegation boundary.
- Do not add a naming section to both prototype skills, either agent prompt, `team.md`, or README.

### Negative And Prohibitive Sentence Disposition

| Existing or proposed boundary | Disposition | Reason |
| --- | --- | --- |
| Do not write prototype files into production unless that location is explicitly assigned | Keep | Protects a plausible and costly workspace-isolation boundary. |
| Do not use production credentials or writes | Keep | Protects a security and data-integrity boundary. |
| Never rely on temporary screenshot paths | Keep, outside naming rule | Protects final evidence stability and is not naming duplication. |
| Do not use the monorepo name | Rewrite positively | The correct conditional rule is to prefer the relevant frontend application in a monorepo; an absolute prohibition would be wrong when the monorepo represents the only frontend. |
| Do not use generic names such as `ui-prototype` | Do not add as a standalone warning | The ordered positive fallback and explicit-name recovery path already determine the correct action. |
| Do not rename an existing canonical root | Rewrite as a positive preservation rule | `Reuse an applicable existing canonical root` is clearer and preserves path stability. |
| Bootstrapper must not invent a new name | Do not add | Its existing `create or update only the isolated prototype root assigned by the packet` rule already closes that branch. |

## Findings And Evidence

### Macro Findings

#### M1 - No deterministic owner or rule for a new prototype name

- Severity: Medium
- Evidence: `shared/product-prototype-principles.md` illustrates `product-prototype/`; `requirements-prototyper/SKILL.md` refers to `../product-prototype/` and `ui-prototypes/<prototype-name>/`; neither explains how to choose the name.
- Impact: different runs can choose generic or inconsistent roots, especially when a workspace contains multiple projects.

#### M2 - Monorepo source identity is ambiguous

- Severity: Medium
- Evidence: the bootstrap packet names a `source project`, but the current instructions do not distinguish the repository from the relevant frontend application.
- Impact: a prototype can be named for an entire monorepo even when it represents only one application or product surface.

#### M3 - Workspace policy is split across two authorities

- Severity: Low
- Evidence: shared principles own workspace isolation, while the Product Prototyper skill separately defines placement examples and a standalone default.
- Impact: adding the requested naming rule locally would increase drift and leave the Bootstrapper's shared context incomplete.

#### M4 - The Bootstrapper contract is already correctly bounded

- Severity: None / keep
- Evidence: the Bootstrapper requires `prototype root` in its packet, returns a gap when it is absent, and creates or updates only that assigned root.
- Impact: duplicating the selection algorithm there would weaken ownership rather than improve it.

### Micro Findings

#### m1 - `product-prototype` reads as a fixed generic name

- Severity: Low
- Evidence: it appears as the only sibling-workspace example in the shared principles and as `../product-prototype/` in the Product Prototyper skill.
- Impact: readers may use the same ambiguous directory for unrelated products or surfaces.

#### m2 - `<prototype-name>` is underspecified

- Severity: Low
- Evidence: the current standalone default provides a placeholder without selection criteria.
- Impact: the placeholder does not lead to reproducible behavior.

#### m3 - `source project name` is insufficiently precise

- Severity: Low
- Evidence: a monorepo can contain several frontend applications and backend projects.
- Impact: it can produce a name that describes the container rather than the prototyped experience.

## Proposed Improvements

### Macro Actions, In Order

#### 1. Restructure - make shared principles the sole naming authority

- Action: `Restructure`
- Affected file or boundary: `agent-teams/requirements-engineering-team/shared/product-prototype-principles.md`, workspace section
- Change: expand the workspace section to own canonical-root reuse, new-root naming, placement, stability, and isolation.
- Expected effect: both prototype roles receive one consistent rule through their existing symlinked reference.

#### 2. Add - deterministic prototype-subject selection

- Action: `Add`
- Affected file or boundary: shared workspace principles
- Change: define the ordered selection rule:
  1. reuse an applicable existing canonical prototype root;
  2. for an identifiable source frontend, use its stable application name;
  3. in a monorepo, use the relevant frontend application rather than the repository name;
  4. when the application identifier is generic or ambiguous, use the stable product-surface name;
  5. use the repository name only when it represents the single relevant frontend;
  6. with no source frontend, use a stable product or experience name;
  7. name the new directory `<prototype-subject>-prototype` using the workspace's naming conventions.
- Expected effect: roots are stable, human-readable, and collision-resistant without inventing a second metadata scheme.

#### 3. Update - assign root-resolution action to Product Prototyper

- Action: `Update`
- Affected file or boundary: `agents/product-prototyper/skills/requirements-prototyper/SKILL.md`, workspace/output paragraph and Bootstrap Routing
- Change: instruct the Product Prototyper to resolve the canonical root under the shared rule before checking or delegating, then include the exact root in the bootstrap packet.
- Expected effect: the role that owns the prototype makes the naming decision once; the Bootstrapper receives a deterministic path.

#### 4. Remove - competing generic defaults

- Action: `Remove`
- Affected file or boundary: `requirements-prototyper/SKILL.md` and the shared workspace example
- Change: remove or replace `../product-prototype/` and the underspecified `ui-prototypes/<prototype-name>/` as independent defaults. Retain examples only if they demonstrate the authoritative `<prototype-subject>-prototype` convention.
- Expected effect: examples no longer compete with the rule or imply a universal generic name.

#### 5. Keep - Bootstrapper, prompts, configs, templates, and team board

- Action: `Keep`
- Affected files or boundary:
  - `agents/prototype-bootstrapper/skills/prototype-bootstrapper/SKILL.md`
  - both `agent.md` files
  - both `agent-config.json` files
  - prototype templates
  - `team.md` and `team-config.json`
- Reason: these files already have the correct responsibility. The Bootstrapper consumes the assigned root; prompts and configs need no workflow duplication; templates merely record the result; the naming policy is not team routing.
- Expected effect: smallest coherent edit set with no unrelated runtime or package churn.

### Micro Actions, In Order

#### 6. Update - use precise terms

- Action: `Update`
- Affected file or boundary: changed shared and Product Prototyper sentences
- Change: consistently use `prototype subject`, `frontend application`, and `canonical prototype root`.
- Expected effect: monorepo and product-surface cases are understandable without additional explanation.

#### 7. Merge - consolidate placement and naming prose

- Action: `Merge`
- Affected file or boundary: shared workspace section
- Change: integrate naming with the existing stable-workspace and isolation rules rather than creating a disconnected section or new reference.
- Expected effect: selection precedes creation, and the section reads in execution order.

#### 8. Keep - safety and evidence boundaries

- Action: `Keep`
- Affected file or boundary: existing isolation, production-write, credential, and stable-evidence instructions
- Reason: each protects a distinct plausible failure mode and is not made redundant by naming.
- Expected effect: naming clarity without weakening prototype safety or evidence quality.

## Assumptions And Open Questions

- Assumption: `-prototype` is the approved suffix.
- Assumption: the prototype is normally long-lived for a frontend application or product surface, not named after a single ticket or revision round.
- Assumption: an existing canonical root should be preserved even when its name does not match the new convention.
- Assumption: directory-name normalization follows the relevant workspace's established conventions; this package should not impose a universal slugging algorithm.
- Assumption: for new no-frontend work, a stable product or experience name is available in the requirements package or can be requested.
- Open questions: None required to implement the agreed rule. If a runtime case has neither an identifiable frontend application nor a stable product/experience name, the Product Prototyper should surface that naming gap rather than choose a generic root silently.

## Risks

- Overfitting the rule to folder names could yield unhelpful names such as `frontend-prototype`; the product-surface fallback prevents this.
- Naming after a monorepo could hide which application the prototype represents; the application-first priority prevents this.
- Renaming an existing workspace could break paths in evidence; the existing-root preservation rule prevents this.
- Duplicating the full algorithm in both skills could cause drift; the shared authority plus one Product Prototyper action prevents this.

## Validation Plan

After approval and implementation:

1. Run the standard skill validator against `requirements-prototyper` and `prototype-bootstrapper`.
2. Resolve every Markdown link and both shared-reference symlinks.
3. Confirm both agent configs still name valid skill folders and parse as JSON.
4. Search the effective Requirements Engineering runtime Markdown for stale independent defaults such as `../product-prototype/` and `ui-prototypes/<prototype-name>/`.
5. Confirm the shared principles contain one authoritative `<prototype-subject>-prototype` rule and the monorepo application-first condition.
6. Confirm the Product Prototyper resolves and passes the exact root while the Bootstrapper only consumes the assigned root.
7. Re-read both skills with the shared reference in execution order and complete the required macro behavior/structure pass.
8. Complete the required micro economy/coherence pass, including every changed negative or conditional sentence.
9. Compare preserved invariants against the final effective package.
10. Run `git diff --check` and inspect the focused diff to ensure no unrelated working-tree changes were overwritten.

Target skill files changed during analysis: None

Analysis artifact: `.codex/artifacts/prototype-workspace-naming/optimization-analysis.md`

## Post-Approval Implementation And Validation Record

- Approval recorded: User explicitly replied `approve` after reviewing the
  proposed plan.
- Target files changed:
  - `agent-teams/requirements-engineering-team/shared/product-prototype-principles.md`
  - `agent-teams/requirements-engineering-team/agents/product-prototyper/skills/requirements-prototyper/SKILL.md`
- Behavior preserved or intentionally changed:
  - Added the approved `<prototype-subject>-prototype` convention.
  - Added the frontend-application-first monorepo rule and ordered fallbacks.
  - Preserved an applicable existing canonical root.
  - Made `product_prototyper` resolve the exact root before existence checks and
    bootstrap delegation.
  - Preserved `prototype_bootstrapper` as the consumer of the assigned exact
    root; its skill was inspected and validated but not edited for this change.
  - Preserved prototype technology, scope, user approval, artifacts, validation,
    isolation, tool configuration, and handoff behavior.
- Validation performed and result:
  - Standard `quick_validate.py` passed for `requirements-prototyper` and
    `prototype-bootstrapper`: `Skill is valid!` for both.
  - Both relevant `agent-config.json` files parsed, and every configured skill
    directory contained its `SKILL.md`.
  - All Markdown links in the two skills and shared principles resolved.
  - Both role-local shared-principles symlinks resolved to the canonical shared
    file.
  - Assertions passed for the naming authority, ordered monorepo priority,
    explicit-name recovery, Product Prototyper root resolution, exact-root
    delegation, and Bootstrapper assigned-root boundary.
  - No runtime Markdown retained the stale independent defaults
    `../product-prototype/` or `ui-prototypes/<prototype-name>/`.
  - `git diff --check` passed.
  - No live AutoByteus team run was launched; static validation covers the
    instruction and package contract changed here.
- Working-tree note: the branch already contained other approved uncommitted
  changes. This implementation changed only the two files listed above and this
  analysis artifact; it did not overwrite or finalize the other work.

## Macro Review Pass

- Invariants checked: Existing-root reuse, isolated stable workspace, exact-root
  bootstrap packet, assigned-root-only Bootstrapper behavior, durable root
  evidence, production-write and credential boundaries, technology selection,
  prototype ownership, user approval, and handoff behavior all remain present.
- Grounding issues: None. The new convention is grounded in the user's approved
  rule, and every referenced role, input, file, symlink, and tool boundary was
  observed in the package.
- Flow or ownership issues: Resolved. Shared principles now own the complete
  naming policy; Product Prototyper applies it before checking the filesystem;
  Bootstrapper continues to consume rather than select the root.
- Cross-file issues: None found. Inputs, routing, shared principles,
  Bootstrapper preconditions, templates, prompts, and configs agree about one
  exact canonical prototype root.

## Micro Review Pass

- Redundancy removed: Removed the competing generic sibling and standalone
  defaults from Product Prototyper. The full selection algorithm appears only
  in the shared principles; the specialist skill keeps one short operational
  reference.
- Defensive wording retained and why: Retained production-write, credential,
  assigned-root, temporary-evidence, and blocked-bootstrap boundaries because
  they protect distinct safety, integrity, output, or validation failures.
  Expressed existing-root preservation and monorepo selection positively rather
  than adding standalone prohibitions.
- Transitions repaired: Root selection now precedes the existence check;
  existence determines bootstrap versus reuse; the exact resolved root then
  enters the bootstrap packet.
- Final residual risk: Different workspaces can normalize names differently,
  intentionally. When the inspected application, product surface, repository,
  and no-frontend request do not yield a stable subject, the shared rule now
  requires an explicit stable name rather than a generic guess.
