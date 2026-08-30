# Product Prototyper Package Consistency Audit

Review Status: Analysis complete - awaiting user approval

## User request and review scope

Audit the complete Product Prototyper agent package for package structure,
ownership, content flow, behavioral consistency, logical ordering, grounding,
redundancy, and template quality. The scope includes:

- `agents/product-prototyper/agent.md` and `agent-config.json`;
- the `requirements-prototyper` skill, its shared principles symlink, and all
  final-prototype templates;
- the `interactive-requirements-visualizer` skill, its principles reference,
  visualizer templates, and runnable scaffold;
- the Product Design & Prototyping `team.md`, `team-config.json`, shared
  principles, and the adjacent Prototype Bootstrapper boundary where it
  affects Product Prototyper behavior;
- the repository's agent/package content contract in `README.md`.

The current working tree already contains the previously requested
cognition-first and motion-pacing updates to the visualizer package. This
audit treats those files as the current baseline and does not make
authoritative skill edits.

## Current package and ownership baseline

### Runtime shell

- `agent.md` is a thin mode-selecting Product Prototyper coordinator prompt.
- `agent-config.json` explicitly attaches `requirements-prototyper` and
  `interactive-requirements-visualizer`, and exposes file, shell, browser,
  background-process, message, and dynamic-handoff tools.
- `team-config.json` makes `product_prototyper` the coordinator and contains
  only the local Product Prototyper ↔ Bootstrapper conditional routes.
- Cross-team routing is intentionally delegated to the parent department's
  dynamic handoff rules; the Product team uses `send_message_to`, not
  `delegate_task`, for those outcomes.

### Shared authority

- `team/shared/product-prototype-principles.md` is the canonical cross-role
  reference for fidelity, prototype boundaries, repository ownership,
  lifecycle, synthetic implementation, evidence, and approval authority.
- The final-prototype skill and Bootstrapper each consume that file through a
  local symlink, following the repository's shared-reference convention.
- The visualizer currently consumes the same content through a direct relative
  path instead of a local symlink.

### Final Prototype mode

`requirements-prototyper/SKILL.md` owns final-prototype intake, repository and
ticket lifecycle, baseline acceptance, focused future-state implementation,
user review, final validation, screenshots, `ui-ux-spec.md`, commits, ticket
closure, findings, and handoff. Its templates separate the ticket record,
journey story, behavior matrix, assumptions, change log, runbook, optional
cross-stage report, and final UI/UX specification.

### Requirements Visualization mode

`interactive-requirements-visualizer/SKILL.md` owns exploratory visualizer
scope, the cognition-first design plan, visual form and technology selection,
ticket-scoped implementation, motion/comprehension validation, review evidence,
revision handling, and result routing. Its principles reference owns the
cognitive, simplification, causality, motion, accessibility, and example
guidance. Its brief, design-plan, review, and scaffold files support that
workflow.

### Bootstrapper boundary

Prototype Bootstrapper owns only current-experience baseline discovery,
parity implementation, comparison evidence, and the bootstrap report.
Product Prototyper accepts the result, commits the accepted baseline, and owns
future-state or exploratory work. This boundary is explicit and consistent.

## Preserved behavioral invariants and safety boundaries

- Requirements Visualization and Final Prototype remain distinct modes.
- Exploratory visualization never becomes canonical requirements, approval, or
  `ui-ux-spec.md` by implication.
- Final UI/UX and behavior require explicit user confirmation.
- The source repository and the canonical prototype repository remain separate
  roots; the prototype repository owns its own tickets, commits, and evidence.
- Existing-frontend future-state work cannot begin before an accepted exact
  current-experience baseline.
- Bootstrapper cannot implement future behavior or create Product Prototyper's
  accepted commit.
- Production credentials, customer data, live writes, and production runtime
  coupling are prohibited; visible behavior is implemented with lightweight,
  deterministic local simulation.
- Handoffs use `get_handoff_rules`, apply every matching rule, and send to the
  exact returned recipients with `send_message_to`.
- A visualizer must be designed before frontend code, use a focused cognitive
  model, and preserve a non-motion meaning path when motion is involved.
- Current-experience parity means no known human-perceptible or
  behaviorally meaningful difference across the recorded distinct inventory.

## Primary content spine

### Shared Product Prototyping spine

```text
mode selection
-> shared principles and repository boundary
-> request/ticket context
-> baseline decision
-> mode-specific work
-> browser/evidence validation
-> user approval when final behavior is involved
-> durable artifacts and commit
-> ticket status/closure
-> dynamic handoff
```

### Final Prototype spine

```text
scope and ticket
-> source/repository/baseline verification
-> bootstrap or accepted-baseline branch
-> focused future-state implementation
-> browser review
-> focused feedback loop
-> explicit user confirmation
-> final validation/screenshots/spec
-> commit and ticket closure
-> handoff
```

### Requirements Visualization spine

```text
scope and ticket
-> repository/baseline verification
-> brief
-> cognition-first design plan and gate
-> visualizer implementation
-> browser/motion/comprehension validation
-> review-ready revision and feedback loop
-> clarification completion or impact finding
-> durable evidence and ticket closure policy
-> handoff
```

The three spines are understandable, but several ownership and early-exit
details are repeated across team.md, shared principles, and both skills. The
findings below identify where that repetition risks divergence.

## Macro analysis

### M1 — Visualizer scaffold does not follow its own current motion principles

**Severity: High**

**Evidence:** The visualizer principles now require teaching-paced,
purposeful, controllable motion and no unrelated continuous motion. However,
the starter at
`interactive-requirements-visualizer/templates/visualizer-project/src/App.tsx`
uses a continuously repeating `scaleX` animation (`repeat: Infinity`) for the
message/task line, swaps message/delegation scenes with a short `0.22` second
transition, and provides no pause, replay, slow, step, or reduced-motion path.

**Impact:** The scaffold can reproduce exactly the failure the user reported:
the causal event is not staged, the persistent line reads as decoration rather
than a message traveling, and the template teaches behavior that conflicts
with the principles it tells the agent to read.

**Proposed action:** `Update` the scaffold example after approval. Make it a
small user-triggered, one-shot sequence with visible departure, travel,
arrival, and consequence dwell; remove infinite background motion; add the
minimum pause/replay/reset or slow control needed by the example; and provide
a reduced-motion/stable-state equivalent. Re-run the template build and
browser check.

### M2 — Visualizer baseline branch is implicit in its operating sequence

**Severity: High**

**Evidence:** The visualizer artifact rules say an absent existing-frontend
baseline must use Bootstrapper and resume only after Product Prototyper accepts
it. The operating sequence nevertheless proceeds from repository verification
to writing the visualizer brief and then implementation without an explicit
early `Baseline Needed -> Bootstrapper -> stop` branch.

**Impact:** An agent can create a brief, design plan, or frontend before the
required current-experience baseline is accepted, despite the repository rule
prohibiting future-state work on an unreviewed baseline.

**Proposed action:** `Update` the visualizer operating sequence immediately
after baseline verification: if an existing frontend is relevant and the
baseline is absent, classify `Baseline Needed`, send the fixed Bootstrapper
message through the handoff rule, stop, and resume at baseline verification
after Product Prototyper acceptance. Make the no-frontend path explicit so it
does not enter this branch.

### M3 — The Product team summary narrows visualization to HTML

**Severity: Medium**

**Evidence:** `team.md` says Requirements Visualization creates an “interactive
HTML-based visualizer,” while the visualizer skill permits plain HTML/CSS,
React/Vite/TypeScript, an existing frontend technology, SVG/canvas, animation,
and Three.js when the decision requires it.

**Impact:** The team contract can steer the agent toward HTML-only
implementation and undermine the skill's cognitive-first visual-form and
technology decision.

**Proposed action:** `Update` the team summary to say “small interactive
browser visualizer” and point to the visualizer skill for design and technology
selection. Keep the team summary high-level.

### M4 — Visualizer ticket artifact ownership is incomplete at package level

**Severity: Medium**

**Evidence:** Shared principles state that every ticket folder contains
`prototype-ticket.md`. The final-prototype skill explicitly lists and uses that
template. The visualizer skill requires a ticket folder and lists its brief,
design plan, review record, and evidence, but does not explicitly require or
return the shared `prototype-ticket.md` record.

**Impact:** A visualizer run can produce a review package without the common
ticket identity, status, repository provenance, and outcome record required by
the shared lifecycle. This weakens ticket status/closure and cross-mode
traceability.

**Proposed action:** `Update` the visualizer artifact rules, template usage,
result contract, and shared visualization artifact summary to require the
common `prototype-ticket.md` alongside the mode-specific brief, design plan,
and review record.

### M5 — Shared principles, team summary, and skills repeat repository policy

**Severity: Medium**

**Evidence:** Separate sections in `team.md`,
`shared/product-prototype-principles.md`, `requirements-prototyper/SKILL.md`,
and `interactive-requirements-visualizer/SKILL.md` repeat the separate
repository, sibling-root, ticket-folder, no-worktree, commit, baseline, and
ownership rules.

**Impact:** The behavior is mostly consistent today, but future changes can
update one copy and leave another with stale wording. This violates the
repository's one-authoritative-owner goal at the package level and makes the
long final skill harder to review.

**Proposed action:** `Restructure` after explicit approval using this ownership
split:

- shared principles: cross-mode repository, ticket, fidelity, simulation,
  approval, and safety invariants;
- final skill: final-mode bootstrap, future-state review, final artifacts,
  validation, and closure steps;
- visualizer skill: exploratory design-plan, motion/comprehension, visualizer
  artifacts, and clarification loop;
- team.md: member boundary, high-level mode flow, and routing expectations;
- templates: artifact-specific fields only.

Replace repeated policy paragraphs with short links/pointers while preserving
the mode-specific exception text.

### M6 — Visualizer temporary-project exception is not stated in shared policy

**Severity: Medium**

**Evidence:** Shared principles say the prototype source remains at the
prototype repository root, while the visualizer skill and scaffold use a
ticket-scoped temporary project such as `visualizers/<ticket-id>/` inside that
repository.

**Impact:** A reader cannot tell whether the visualizer subproject is an
intentional mode-specific exception or an accidental violation of the root
source rule. This can lead to inconsistent repository layouts.

**Proposed action:** `Update` shared principles to state explicitly that
final-prototype source remains at the repository root, while Requirements
Visualization may use a ticket-scoped temporary visualizer subproject inside
the canonical prototype repository. Keep the prohibition on a second Git
repository and generic `prototypes/` container.

### M7 — Ticket status transitions are modeled but not sequenced

**Severity: Medium**

**Evidence:** `prototype-ticket-template.md` and the optional report define
`In Progress`, `Awaiting User Review`, `Completed`, `Blocked`, and `Not
Recommended`. The final skill says to keep the ticket current but does not
explicitly assign statuses at intake, review presentation, feedback, final
confirmation, or blockage. The visualizer skill similarly says to keep the
ticket in progress while clarification remains open but does not explicitly
mark `Awaiting User Review`.

**Impact:** Different runs may leave the ticket in `In Progress` while waiting
for the user, or mark `Completed` before the final artifact/closure branch.
The ticket record and handoff outcome can disagree.

**Proposed action:** `Add` a compact mode-aware status transition table to the
shared lifecycle or Product Prototyper skill:

```text
intake/design/implementation -> In Progress
review URL sent -> Awaiting User Review
feedback received -> In Progress
explicit final approval + final artifacts -> Completed
blocked branch -> Blocked
not recommended branch -> Not Recommended
```

Keep the actual status field in `prototype-ticket.md`; the table should not be
duplicated in every template.

### M8 — Shared visualization artifact summary is behind the visualizer package

**Severity: Low/Medium**

**Evidence:** Shared principles Section 12 names the visualization brief,
review record, review URL, interaction evidence, and unresolved-question
record. The visualizer now also requires a cognition-first design plan,
motion-pacing evidence, and a result-contract path for that plan.

**Impact:** The team-level delivery summary no longer describes the actual
mode-specific artifact set, making handoff expectations incomplete.

**Proposed action:** `Update` the shared summary to name the common ticket
record plus the visualization brief, design plan, review record, browser/motion
evidence, visual references, and unresolved questions as applicable. Point to
the visualizer skill rather than copying its full schema.

## Cross-file behavior and grounding review

### Consistent behavior

- Product Prototyper is correctly the coordinator and repository/ticket owner.
- Bootstrapper is correctly limited to current-experience parity and returns
  to Product Prototyper for acceptance and commit.
- Final Prototype requires user confirmation before canonical UI/UX artifacts
  and final reference screenshots.
- Requirements Visualization remains exploratory and does not self-approve or
  produce final UI/UX specifications.
- All members use dynamic handoff rules and exact `send_message_to`; the local
  Product team does not use `delegate_task` for its cross-team route.
- The user, Requirements Engineering, and Software Engineering authority
  boundaries are preserved.

### Grounding and source concerns

- The exact-fidelity contract is carefully qualified by observable inventory,
  matched conditions, synthetic fixtures, and no-known-difference gates; no
  unsupported production-readiness claim was found.
- The visualizer's motion heuristic is clearly labeled as a starting heuristic,
  not a universal cognitive law. Its source guidance is in the principles
  reference rather than the runtime shell.
- The package uses `prototype-prototype`/`prototype repository` terminology
  consistently enough for runtime behavior, but the short team summary should
  avoid adding an HTML-only technology commitment.

## Micro analysis and instruction ledger

### File/content ownership ledger

| Behavior | Preconditions | Output / exit | Current owner | Assessment |
| --- | --- | --- | --- | --- |
| Select final vs. visualization mode | Request contains a decision/journey | One selected skill | `agent.md` + skill mode boundaries | Keep; the shell is concise and the skills define the detail. |
| Shared repository/ticket/approval safety | Any prototype work | Safe separate-root workflow | `shared/product-prototype-principles.md` | Keep as authority; reduce copies elsewhere. |
| Current baseline discovery/parity | Existing frontend and no accepted report | Completed/Blocked bootstrap report | Bootstrapper skill | Keep. |
| Baseline acceptance and commit | Bootstrapper result available | Accepted baseline or recovery | Final Product Prototyper skill | Keep; add explicit visualizer early exit. |
| Final future-state design | Accepted baseline or no-frontend path, known decision | Reviewed runnable prototype | Final Product Prototyper skill | Keep. |
| Exploratory visual representation | Unresolved decision and valid context | Review-ready visualization package | Visualizer skill | Keep; add common ticket record. |
| Cognition-first visual plan | Decision question before frontend | Ready-to-Build design plan | Visualizer skill/design-plan template | Keep; ensure scaffold follows it. |
| User review/approval | Runnable review package | Approved final design or feedback | Final skill/team authority | Keep; explicit status transitions needed. |
| Handoff | Classified result | Exact returned recipients or caller | Team config + skills | Keep. |

### Terminology and transition findings

- `Ready to Build` is the visualizer's internal design-gate state; the phrase
  “approved design plan” in Technology Selection can be read as user approval.
  **Action: Rewrite** it as “a design plan marked `Ready to Build`.”
- `Review-ready` and `Approved` are correctly distinct in most files. Preserve
  that distinction and do not use “approved” for exploratory visualization.
- `prototype repository/root`, `ticket folder`, `source pin`, and
  `prototype revision` are the right durable provenance terms. Preserve them,
  but let the shared reference own their definitions.
- The visualizer's brief, design plan, and review template have a coherent
  scope -> method -> evidence division. Do not merge them; add the common
  ticket record rather than duplicating ticket fields in each.

### Negative/prohibitive instruction disposition

| Instruction family | Disposition | Reason |
| --- | --- | --- |
| Do not create a second prototype repository/root | Keep; centralize reference | Protects repository identity and user work. |
| Do not place work under generic `prototypes/` or production source paths | Keep; centralize reference | Protects workspace and production boundaries. |
| Do not use production credentials, writes, customer data, or live services | Keep | Safety boundary and realistic failure prevention. |
| Do not begin future-state work before an accepted baseline | Keep; add explicit branch to visualizer | Protects current-experience fidelity. |
| Bootstrapper must not design future behavior or commit acceptance | Keep | Preserves specialist ownership. |
| Do not claim approval/completion or production readiness | Keep | Protects user authority and evidence integrity. |
| Do not attach future requirements to independent bootstrap | Keep | Preserves Bootstrapper independence. |
| Do not create a final `ui-ux-spec.md` for exploratory visualization | Keep | Protects mode boundary. |
| Do not use infinite/decorative motion in the starter | Add after approval | Current template contradicts the motion principles. |
| Do not use `delegate_task` for Product cross-team routing | Keep in team routing summary | Protects the declared communication contract. |
| Do not poll after successful handoff | Keep | Runtime termination behavior. |

Most prohibitions protect a distinct boundary or failure path. The main
economy opportunity is not deleting these guards; it is removing repeated
copies from `team.md` and the two skills after the shared authority is made
explicit.

## Proposed improvement plan, ordered by priority

### Macro changes

1. `Update` visualizer scaffold motion so the canonical example follows the
   motion principles instead of teaching infinite/instant transitions.
2. `Update` visualizer operating sequence with an explicit Baseline Needed
   early exit and no-frontend exception.
3. `Update` Product team summary from HTML-only to browser visualizer.
4. `Update` visualizer artifact contract to create/update the common
   `prototype-ticket.md` and return its path.
5. `Update` shared principles with the visualizer temporary-project exception,
   design-plan/motion artifact summary, and status-transition authority.
6. `Restructure` repeated repository and lifecycle prose so shared principles
   own cross-mode policy while skills own mode-specific execution.
7. `Add` the local shared-principles symlink to the visualizer skill and change
   its direct relative link to the local filename, matching the repository
   package convention.

### Micro changes

8. `Rewrite` “approved design plan” as ``design plan marked `Ready to Build` ``
   to avoid implying user approval.
9. `Update` long or repeated team summary lines only after macro ownership is
   repaired; do not perform sentence cleanup first.
10. `Add` concise template prompts for the common ticket record only where
    needed; keep design-plan and review fields distinct.
11. `Remove` or revise the empty `Deliberate Simplifications And Non-Goals`
    heading in `prototype-assumptions-template.md` so the template has an
    actionable field or a clearly intentional freeform section.

## Assumptions, open questions, and risks

- Assumption: `visualizers/<ticket-id>/` is the intended temporary
  subproject for exploratory visualizers inside the canonical prototype
  repository, not a second repository or permanent production source root.
- Assumption: the Product team should keep using `send_message_to` for
  cross-team results; this audit does not propose changing the communication
  contract.
- Open question: Should a Requirements Visualization ticket always create the
  common `prototype-ticket.md`, even for `Not Recommended`, request-gap, or
  `Baseline Needed` early exits? The shared lifecycle suggests yes for a
  supplied ticket, while the fixed Bootstrapper message must remain free of
  the Product ticket package.
- Open question: Should the status-transition table live in shared principles
  or in the final Product Prototyper skill? It is cross-mode policy, but the
  Product Prototyper skill is the only runtime owner of ticket updates.
- Risk: moving repeated text without preserving short mode-specific reminders
  could make the skill less usable if the runtime does not load the shared
  reference reliably. Local symlinks and direct links must be validated before
  shortening.
- Risk: changing the scaffold motion is a behavior change to a starter
  project, not just documentation; it needs a focused build and browser
  validation after approval.

## Validation plan after approval

1. Validate all JSON and frontmatter, skill names, configured skill bindings,
   symlinks, and local Markdown links across the Product team package.
2. Run the repository's standard skill/package validator if available.
3. Re-read the package in execution order: agent shell -> shared principles ->
   mode selection -> baseline branch -> mode workflow -> artifacts ->
   validation -> ticket status -> handoff.
4. Assert that the visualizer scaffold's starter motion is finite,
   user-triggered, perceptible, controllable, and equivalent under reduced
   motion; run its build and browser smoke test.
5. Search for stale HTML-only wording, missing design-plan/ticket-record
   paths, pre-baseline implementation instructions, and contradictory approval
   qualifiers.
6. Perform a macro pass for ownership/flow/behavior and a second micro pass
   for terminology, repeated rules, negative instruction dispositions, and
   template residue.
7. Confirm preserved invariants and record any unresolved limitations.

Target skill files changed during analysis: None

Analysis artifact:
`.codex/artifacts/product-prototyper-package-consistency-audit/optimization-analysis.md`

## Post-approval implementation review

Approval was received after the analysis. The approved actions were applied to
the Product Prototyper package without changing the unrelated working-tree
paths listed outside this package.

Implemented remediation includes:

- a finite, user-triggered, teaching-paced scaffold sequence with pause,
  replay, slow, skip, reset, consequence dwell, arrival state, and reduced-
  motion handling;
- an explicit visualizer baseline-needed early exit and resume point;
- common `prototype-ticket.md` ownership and shared status transitions for
  final and visualization modes;
- explicit visualizer temporary-project and delivery-artifact rules;
- technology-neutral team wording and the standard shared-principles symlink;
- actionable simplification/non-goal template fields and consistent status
  vocabulary.

Validation completed:

- visualizer scaffold `npm run build`: passed;
- Vite development-server HTTP smoke check: passed;
- JSON configuration parsing: passed;
- Product Design & Prototyping package Markdown-link validation: 19 links
  checked, no broken links;
- shared-principles symlink validation: passed;
- `git diff --check`: passed.

## Follow-up: explicit mode naming and baseline relationship

The next review found that `requirements-prototyper` is misleadingly named and
that the visualizer mode's relationship to an existing product surface is not
explicit enough. The intended boundary is:

- `product-experience-prototyper`: evolve an applicable accepted product
  experience incrementally and produce the implementation-oriented UI/UX
  specification; retain its no-frontend initial-experience fallback.
- `exploratory-requirements-visualizer`: clarify abstract, independent, or
  otherwise product-surface-unattached concepts. It may use a lightweight
  standalone visualizer project and must not be selected for a concrete change
  to an existing route, component, or preserved interaction.

Approved changes:

| File/boundary | Action | Intended result |
| --- | --- | --- |
| Product mode skill directory, frontmatter, and links | Rename/update | Replace `requirements-prototyper` with `product-experience-prototyper`. |
| Exploratory mode skill directory, frontmatter, and links | Rename/update | Replace `interactive-requirements-visualizer` with `exploratory-requirements-visualizer`. |
| Product Prototyper `agent.md` and `agent-config.json` | Update | Make mode selection and attached skill names explicit. |
| Exploratory visualizer skill | Update | Add an applicability gate: route existing-product-surface changes to the Product Experience Prototyper and do not require or imitate an unrelated baseline. |
| Shared principles, team contract, and root README | Update | Describe the two modes by responsibility and preserve one shared repository/worktree lifecycle. |
| Skill references and templates | Update | Remove stale names and ensure each instruction matches the renamed owner and scope. |

The repository-management skill remains shared infrastructure. Its ticket,
worktree, runtime, commit, integration, and cleanup ownership is unchanged.
The existing product mode remains the baseline-native path whenever an
existing product surface is in scope; the exploratory mode is not a fallback
for that case.

## Follow-up: Requirements Engineer ownership correction

The first implementation of the mode-name change placed too much Product
Design routing logic in the Requirements Engineer skill. That conflicted with
the team principle that each agent owns its work and uses its outcome-based
handoff rules after completing that work.

Corrected boundary:

- Requirements Engineer owns requirements investigation, the canonical
  requirements package, user approval, and any Product Design request context
  present in the input.
- Requirements Engineer may forward a generic `Product Design Requested`
  outcome when the user's stated or clarified intent calls for that team's
  help. This label routes the request; it does not select a Product Prototyper
  mode.
- Product Prototyper owns reasoning about the received request, choosing
  `product-experience-prototyper` versus
  `exploratory-requirements-visualizer`, and all Product repository, ticket,
  worktree, bootstrap, validation, and handoff operations.
- Product Design results return through the handoff rules; Requirements
  Engineer records user decisions and integrates only approved evidence into
  the canonical requirements package.

Implemented correction:

- `Update` Requirements Engineer's skill, investigation-notes template, team
  summary, department routing rule, department summary, and department
  coordinator skill to remove mode selection from Requirements Engineering.
- `Keep` the Product Prototyper's mode-selection authority and the renamed
  skill identifiers.
- `Keep` the Requirements Engineer's architecture-design routing assessment,
  which is a distinct requirements-owned responsibility already established by
  the workflow.

Review result: the Requirements Engineer no longer contains a visualizer-versus-
product-prototype decision gate. It records and forwards the user's Product
Design intent, while the Product Prototyper chooses its own mode after
receiving the request.

Validation completed after the correction:

- Requirements Engineer, Product Prototyper, repository-management, and Head
  skills passed `quick_validate.py`.
- The exploratory visualizer template `npm run build` passed.
- Changed JSON files parsed successfully.
- Authored Markdown links in the affected packages all resolved.
- Configured agent skills resolved with matching frontmatter names.
- `git diff --check` passed.
