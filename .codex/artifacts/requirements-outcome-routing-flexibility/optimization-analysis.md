# Requirements Outcome Routing Flexibility — Reanalysis

Review Status: Analysis complete - awaiting user approval

## Reanalysis reason and current baseline

The Requirements Engineering package changed after the first analysis. This
reanalysis discards the earlier file-content assumptions and treats the current
working tree as the review baseline.

At review time, twelve Requirements Engineering files already had uncommitted
changes not made by this analysis. Those changes materially strengthen:

- exact current-experience UI/UX fidelity to a pinned source frontend;
- deliberately lightweight prototype internals and synthetic state;
- Prototype Bootstrapper independence from future-state requirements;
- Product Prototyper authorship—but not approval—of future-state UI/UX;
- production-quality future-state prototypes and normative final references;
- ownership of the canonical prototype workspace after baseline acceptance.

These updates are valid current behavior and must be preserved. The Software
Development Department files remain unchanged from `HEAD`.

Target skill files changed by this reanalysis: None. Only this analysis artifact
was rewritten.

## User-requested outcome

Requirements Engineering must support diverse work without assuming that every
successful result continues into production Software Engineering.

Each specialist should:

1. receive the supplied work package and use its skill to perform its own
   responsibility;
2. finish the appropriate artifacts, evidence, and result;
3. call `get_handoff_rules` only after that result exists;
4. reason over the returned natural-language conditions against the actual
   result and requested terminal outcome;
5. use `send_message_to` for every matching returned route, or return to the
   caller when no rule applies.

The rules are natural-language semantic conditions interpreted by an LLM. They
are not an enum language or expression language. A separate edge is required
when the recipient differs, but semantically equivalent results should not be
split into many named-status rules.

Examples that must work:

- requirements or investigation only;
- exact current-experience prototype baseline only;
- future-state product prototype only;
- requirements plus prototype evidence without implementation;
- approved requirements that explicitly continue through implementation and
  delivery;
- any other Requirements Engineering result whose requested endpoint can be
  understood from the package and user decisions.

## Review scope

Reviewed current working-tree versions of:

- Requirements Engineering `team-config.json` and `team.md`;
- Requirements Engineer prompt, skill, requirements template, investigation
  template, and revision-record contract;
- Product Prototyper prompt, skill, prototype report, UI/UX template, and linked
  shared principles;
- Prototype Bootstrapper prompt, skill, bootstrap report, and handoff contract;
- Software Development Department config, team guide, Head prompt, and Head
  skill;
- README descriptions;
- the supplied runtime screenshot;
- the current uncommitted diff against `HEAD`.

Software Engineering internals, AutoByteus runtime code, and other repositories
remain outside scope.

## Current package topology and ownership

| Concern | Authoritative owner |
| --- | --- |
| Requirements, investigation, acceptance criteria, supplements, approval, and result readiness | Requirements Engineer skill and templates |
| Exact current-experience baseline principles | Shared `product-prototype-principles.md` |
| Baseline discovery, construction, fidelity validation, and evidence | Prototype Bootstrapper skill and bootstrap report |
| Baseline acceptance; focused future-state UI/UX authorship; user review; canonical prototype; normative references | Product Prototyper skill and UI/UX artifacts |
| Conditional recipients | Applicable `team-config.json.handoffs` |
| Shared message mechanics | Applicable `team.md` |
| Department intake and final caller response | Head of Software Development skill |
| Tool availability | Agent configs |

The topology is sound. No new team, specialist, runtime component, or tracking
artifact is needed.

## Current behavior after the external update

### Improvements already present

- Prototype Bootstrapper explicitly does not require future-state requirements,
  feature IDs, or a decision question.
- A current-experience bootstrap independently discovers the pinned source UI
  and must not introduce future behavior.
- The exact observable baseline uses lightweight prototype-native state rather
  than production contracts or runtimes.
- Product Prototyper directly reviews the runnable baseline and matched evidence.
- Future-state prototypes have stronger production-quality visual requirements,
  user approval, and normative UI/UX reference rules.
- Requirements artifacts still accept arbitrary supplied and generated
  supplements; no fixed file-type list limits customer evidence.

### Remaining effective paths

| Requested outcome | Current path | Remaining problem |
| --- | --- | --- |
| Requirements/investigation only | Requirements Engineer completes an “architecture-ready” package, then chooses `Approved Architecture-Ready` or `Blocked` | No successful Department terminal route without Architecture Designer |
| Current-experience baseline only | Requirements Engineer's prototype rule expects a material future product/UI decision; if routed, Product Prototyper can obtain the independent baseline | Product Prototyper still requires a decision question, future-state delta, user-reviewed `ui-ux-spec.md`, normative final references, and `Prototype Completed` |
| Future-state prototype only | Product Prototyper returns the approved UI/UX package to Requirements Engineer | Requirements Engineer still forces successful completion toward architecture |
| Full production implementation | Approved requirements route directly to Architecture Designer | Supported, but the rule does not state that implementation/delivery must be part of the requested outcome |
| Pre-architecture blocker | Requirements Engineer routes to Head | Supported |
| Standalone Requirements Team | When no parent route applies, result can return to the caller | Skill wording still defines all success as architecture-ready |

The supplied screenshot remains consistent with the current config. Requirements
Engineer receives three natural-language possibilities: prototype work,
architecture-ready continuation, and pre-architecture blocker. There is no
successful terminal condition for Requirements Engineering work that does not
continue to Software Engineering.

## Preserved behavioral invariants

- Always maintain `requirements-doc.md`, `investigation-notes.md`, and
  `requirements-revision-record.md` at their canonical paths.
- Preserve arbitrary relevant customer, user, code, contract, runtime, data,
  research, image, or other supplemental evidence in the cumulative package.
- Only the user approves intended behavior and future-state UI/UX.
- Requirements Engineer does not design production architecture.
- Product prototyping remains conditional.
- The pinned source frontend is authoritative for current-experience UI/UX.
- A baseline-only request does not weaken exact-fidelity inventory, evidence, or
  Product Prototyper acceptance gates.
- Prototype Bootstrapper remains independent of future requirements and does not
  author future-state product behavior.
- Product Prototyper retains production-quality future-state UI/UX, canonical
  prototype, user-review, `ui-ux-spec.md`, and normative-reference ownership.
- Baseline evidence is not mislabeled as user approval of new product intent.
- Architecture Designer receives work only through a configured route and
  retains the complete existing Software Engineering workflow.
- Head remains Department intake/final boundary, not a relay between Requirements
  Engineer and Architecture Designer.
- Handoff recipients remain configuration-owned.
- No task-lifecycle tools, rigid request-type language, or new process-state
  system is introduced.

## Target result-driven behavior

### Specialist result contract

Specialist skills should define work, evidence, artifacts, completion quality,
and truthful blockers. They should not define an exhaustive list of possible
business requests.

At an owned stopping point, the specialist:

1. records what the work actually accomplished, what remains open, and what the
   user requested as the terminal outcome;
2. records whether production Software Engineering is still requested or needed;
3. calls `get_handoff_rules`;
4. evaluates every returned natural-language condition against the result;
5. sends the cumulative package to each matching returned address;
6. returns the result to the user/caller if no condition applies.

### Economical Requirements routes

Use one expressive rule per semantic edge where practical:

- **Requirements Engineer -> Product Prototyper:** when Requirements Engineer's
  current responsibility needs a runnable product-prototype contribution to
  satisfy the request, including an exact current-experience baseline, a
  future-state experience, or other material product/UI evidence.
- **Requirements Engineer -> Architecture Designer:** when the package is
  approved and architecture-ready **and** the approved requested outcome
  explicitly includes production implementation/delivery.
- **Requirements Engineer -> Head:** when Requirements Engineer's current work
  should return to the Department boundary rather than Software Engineering,
  because either the requested Requirements outcome is complete without
  production engineering or a blocker requires caller resolution.

The Requirements Engineer -> Head edge already exists. Its single rule can be
rewritten broadly; no new status-specific edge is necessary.

### Economical prototype routes

- **Product Prototyper -> Prototype Bootstrapper:** when an exact
  current-experience baseline, correction, or refresh is needed, whether that
  baseline is the requested terminal deliverable or a prerequisite for
  future-state work.
- **Prototype Bootstrapper -> Product Prototyper:** keep the current completed or
  blocked exact-baseline result rule.
- **Product Prototyper -> Requirements Engineer:** use one natural-language rule
  when Product Prototyper has completed or cannot complete its requested
  contribution and its runnable artifacts, evidence, decisions/findings,
  limitations, and applicable approval record are ready for Requirements
  Engineer to integrate or resolve.

### Conditional Product Prototyper completion

After directly accepting the Bootstrapper result:

- if the requested contribution is only the exact current-experience baseline,
  return the runnable prototype root, bootstrap report, matched evidence,
  Product Prototyper acceptance result, and limitations;
- otherwise continue the current production-quality future-state prototype,
  user-review, `ui-ux-spec.md`, and normative-reference workflow.

The first branch does not create a fake future-state decision, `ui-ux-spec.md`,
or normative future-state screenshot package. The second branch retains every
new fidelity safeguard already present in the working tree.

## Macro analysis

### M1 — Critical — successful non-implementation work still has no Department terminal condition

**Evidence:** Requirements Engineer sequence still ends only as `Approved
Architecture-Ready` or `Blocked`. Department config maps approved success to
Architecture Designer and maps only blockers back to Head.

**Impact:** Requirements-only and prototype-only work may enter implementation
without being requested.

**Action:** `Restructure` Requirements completion language. `Update` the existing
Requirements Engineer -> Head rule to cover both successful terminal
Requirements work without production engineering and pre-architecture blockers.
`Update` the Architecture Designer rule so approval/readiness and explicit
production-engineering intent are both required.

### M2 — Critical — current-experience baseline independence conflicts with Product Prototyper's mandatory future-state workflow

**Evidence:** Updated shared principles and Bootstrapper say a baseline does not
require future-state requirements or a decision question. Product Prototyper
still rejects an input without a decision question/journey and always proceeds
through a future-state delta, user review, `ui-ux-spec.md`, normative references,
and `Prototype Completed`.

**Impact:** The newly strengthened independent baseline is constructible but not
truthfully returnable as the requested terminal prototype contribution.

**Action:** `Restructure` Product Prototyper around two result-dependent branches
after the same direct baseline review gate. Do not change Bootstrapper.

### M3 — High — Requirements prototype gate still excludes a user-requested baseline deliverable

**Evidence:** Requirements Engineer requests a prototype only when a future
product/UI decision needs resolution and requires a future-state critical
journey in every request.

**Impact:** A direct user request for the exact existing-product prototype
baseline does not satisfy the stated gate even though the current Bootstrapper
is specifically designed to produce it.

**Action:** `Update` the gate and packet contract to support any materially needed
prototype contribution. For a baseline-only request, require selected source,
source authority, prototype root, and expected current-experience evidence—not a
future-state decision question.

### M4 — High — Head's completion gate rejects valid Requirements terminal outcomes

**Evidence:** Head owns only blockers and terminal Software Engineering results.
Its success gate always requires architecture, implementation, reviews,
validation, user verification, and finalization.

**Impact:** A new Requirements terminal route would still fail at the Department
boundary.

**Action:** `Restructure` Head completion into two conditional evidence gates:
Requirements terminal and Software Engineering terminal. Both validate against
the original requested outcome; only the latter requires implementation and
finalization evidence.

### M5 — High — downstream intent is not recorded separately from architecture readiness

**Evidence:** `requirements-doc.md` records `Architecture-ready: Yes/No` and has a
mandatory Downstream Architecture Input section, but it does not record whether
production engineering is part of the requested outcome.

**Impact:** “Technically ready for architecture” can be mistaken for “authorized
to start production engineering.”

**Action:** `Add` compact fields to the existing requirements document:

- requested terminal outcome, in natural language;
- production Software Engineering still requested or needed:
  `Yes` / `No` / `Undetermined`;
- current downstream disposition and rationale, in natural language.

Make architecture-specific input/readiness `N/A` when production engineering is
not in scope. Do not create a new tracking artifact.

### M6 — High — affected skills treat natural-language rules like a fixed status table

**Evidence:** Requirements Engineer and Product Prototyper both say “classify the
outcome as” a small named set before querying rules. Current config conditions
repeat those names.

**Impact:** The LLM reasons about labels chosen in advance instead of comparing
the completed real-world result with expressive live conditions. Adding more
labels would merely create another rigid taxonomy.

**Action:** `Restructure` the affected Handoff sections around work-first result
reasoning. Keep useful domain result words in artifacts, but do not require an
exhaustive enum to select a recipient.

### M7 — Medium — same-recipient Product Prototyper results are unnecessarily split

**Evidence:** Product Prototyper -> Requirements Engineer currently has separate
rules for completed UI/UX and for findings/not-recommended/blockers.

**Impact:** Both transitions have the same recipient and integration boundary.
The split encourages result-label matching and still omits baseline-only
completion.

**Action:** `Merge` them into one expressive natural-language rule covering any
completed or blocked requested prototype contribution ready for Requirements
Engineer integration or resolution.

### M8 — Medium — team and public descriptions still define Requirements success universally as architecture-ready

**Evidence:** Requirements team frontmatter, opening, collaboration flow,
Requirements prompt/skill frontmatter, Department flow, Head prompt/skill, and
README all assume successful Requirements work continues to architecture.

**Impact:** Even with corrected config, prompt framing would continue biasing the
agent toward Software Engineering.

**Action:** `Update` descriptions to “approved, purpose-complete requirements
package; architecture-ready when production engineering is in scope.”

### M9 — Low — optional product report contains fixed routing metadata

**Evidence:** `product-prototype-report-template.md` still contains `Required
recipient: requirements_engineer` and assumes every result has a UI/UX
specification.

**Impact:** The artifact duplicates configuration ownership and cannot represent
baseline-only completion cleanly.

**Action:** `Update` conditional artifact fields and replace fixed recipient with
result, limitations, and next-needed-action information.

### M10 — Keep — current exact-fidelity and UI-authority update is coherent

**Evidence:** Updated shared principles, Bootstrapper, Product Prototyper, team
guide, requirements template, UI/UX template, and reports consistently establish
high experience fidelity, low implementation fidelity, synthetic state,
independent baseline authority, user approval, and normative final references.

**Impact:** A broad rewrite could accidentally weaken recent work.

**Action:** `Keep` these invariants and apply only surgical completion/routing
changes around them.

## Micro analysis

### Wording and terminology

| Severity | Current wording | Problem | Disposition |
| --- | --- | --- | --- |
| High | every success is “architecture-ready” | Conflates quality with downstream authorization | `Qualify` by production-engineering scope |
| High | every prototype needs a “decision question” and “future-state critical journey” | Excludes baseline-only work | `Qualify` by requested prototype contribution |
| Medium | “classify as” fixed route statuses | Treats natural language like an enum language | `Rewrite` as result-versus-rule reasoning |
| Medium | Product final outputs always include UI/UX spec and normative references | False for current-experience-only delivery | `Split` outputs by actual requested contribution |
| Low | “supplemental task artifacts” | Needlessly narrows otherwise flexible evidence language | `Rewrite` as “supplemental artifacts” |
| Low | fixed `Required recipient` report field | Duplicates the handoff graph | `Remove` |

### Negative-instruction disposition

| Boundary | Disposition | Reason |
| --- | --- | --- |
| Only the user approves future-state behavior/UI | `Keep` | Product authority |
| Do not start future-state work before exact baseline acceptance | `Keep` | Fidelity sequence |
| Do not weaken exact baseline for baseline-only completion | `Keep` once in shared principles | Fidelity invariant |
| Do not create future-state artifacts for baseline-only work | `Rewrite` positively as conditional outputs | Truthful artifact boundary |
| Do not infer or hard-code recipients | `Keep` | Configuration authority |
| Do not default an undetermined request to Architecture Designer | `Rewrite` positively: architecture route requires explicit production-engineering scope | Prevents unauthorized implementation |
| Do not enumerate every legitimate Requirements outcome | `Do not add` as runtime prohibition | Broad natural-language conditions already provide the positive model |

## Proposed improvements by authoritative file

### Requirements Engineering Team

| Action | File | Current-baseline-aware change |
| --- | --- | --- |
| `Update` | `agent-teams/requirements-engineering-team/team-config.json` | Broaden Requirements -> Product; broaden Product -> Bootstrap to terminal or prerequisite baseline; keep Bootstrap -> Product; merge Product -> Requirements into one expressive result-ready rule |
| `Restructure` | `agent-teams/requirements-engineering-team/team.md` | Preserve exact-fidelity/UI-authority additions while describing baseline-only, future-state-only, and conditional production-engineering completion |
| `Update` | Requirements Engineer `agent.md` and skill frontmatter | Remove universal architecture-ready result framing |
| `Restructure` | Requirements Engineer `SKILL.md` | Record requested endpoint/engineering scope, support baseline requests, finish truthful artifacts, then query and reason over live rules rather than fixed result labels |
| `Update` | `templates/requirements-doc-template.md` | Add terminal-outcome, production-engineering-scope, and downstream-rationale fields; make architecture fields conditional |
| `Update` | `templates/investigation-notes-template.md` | Add one free-text prototype purpose/expected contribution field and preserve arbitrary evidence |
| `Keep` | `templates/requirements-revision-record-template.md` | Existing revision history is adequate |
| `Update` | Product Prototyper `agent.md` and skill frontmatter | Preserve new production-quality future-state authority while adding accepted baseline-only contribution |
| `Restructure` | Product Prototyper `SKILL.md` | Preserve exact baseline review and new UI/UX rigor; branch after acceptance based on requested contribution; use result-versus-rule reasoning |
| `Update` | `shared/product-prototype-principles.md` | Add only the cross-role rule that an accepted baseline may itself satisfy the requested prototype contribution |
| `Update` | `templates/product-prototype-report-template.md` | Support baseline-only result, conditional UI/UX fields, and no fixed recipient |
| `Keep` | `templates/ui-ux-spec-template.md` | Current normative future-state contract remains correct when future-state UI/UX is produced |
| `Keep` | Prototype Bootstrapper prompt, skill, config, and report | Current independent exact-baseline contract already supports the requested behavior |
| `Keep` | all Requirements agent configs | Required message and rule tools already exist |

### Software Development Department

| Action | File | Current-baseline-aware change |
| --- | --- | --- |
| `Update` | `agent-teams/software-development-department/team-config.json` | Rewrite existing Requirements -> Head rule to cover terminal completion without production engineering or blocker; strengthen Requirements -> Architecture with explicit production-engineering intent |
| `Restructure` | `team.md` | Add Requirements-terminal flow while preserving direct Requirements -> Architecture and Requirement Gap return |
| `Update` | Head `agent.md` and skill frontmatter | Include successful Requirements terminal results |
| `Restructure` | Head `SKILL.md` | Add Requirements-terminal evidence gate beside current full Software Engineering terminal gate |

### Public description and analysis

| Action | File | Change |
| --- | --- | --- |
| `Update` | `README.md` | Describe Requirements Engineering as purpose-complete and Software Engineering as conditional |
| `Update` | This artifact | Mark implemented and record observed validation after approval |

## Validation plan after approval

1. Preserve and compare every pre-existing uncommitted fidelity/UI-authority
   change; implementation must not overwrite it.
2. Run the standard validator on all three Requirements skills, Head, and
   Architecture Designer.
3. Parse all affected JSON and validate every nested rooted endpoint.
4. Assert one expressive rule per semantic edge where practical; avoid
   status-by-status rule proliferation.
5. Assert the only Requirements -> Architecture rule requires explicit
   production implementation/delivery scope in addition to approval/readiness.
6. Assert the existing Requirements -> Head edge covers successful terminal
   Requirements work without production engineering and blockers.
7. Assert standalone Requirements use returns a truthful result when no parent
   rule matches.
8. Assert baseline-only Product Prototyper completion does not require a
   decision question, future-state delta, `ui-ux-spec.md`, or normative
   future-state screenshots.
9. Assert exact baseline fidelity, Product Prototyper direct acceptance,
   synthetic-state boundaries, future-state production quality, user approval,
   and normative-reference rules remain intact.
10. Assert standard requirements artifacts and arbitrary relevant supplements
    remain required/preserved.
11. Check all links, symlinks, fixed-recipient leakage, removed task-lifecycle
    terms, conflict markers, and `git diff --check`.
12. Perform macro and micro rereads in execution order.
13. Record the live-runtime limitation unless the revised routes are exercised
    in AutoByteus.

## Assumptions, risks, and open boundary

### Grounded assumptions

- The screenshot proves nested Requirements Engineer can retrieve both child-team
  and parent-department rules.
- The current local uncommitted Requirements changes are intentional updates and
  must be retained.
- Architecture Designer entry starts the end-to-end Software Engineering flow,
  not an architecture-only terminal service.

### Risks

- Editing the same uncommitted files without a current-baseline diff check could
  overwrite another contributor's exact-fidelity work.
- A baseline-only completion could accidentally be described as approval of new
  product behavior; baseline acceptance and future-state approval must stay
  distinct.
- An undetermined production-engineering intent must remain unresolved or return
  for clarification; it must not silently default to Architecture Designer.
- If architecture-only delivery is later required, Software Engineering needs a
  separate terminal condition after architecture review. That is outside this
  minimal request.

## Recommendation

Implement a surgical result-driven routing update on top of the current
working-tree package. The recent prototype-fidelity update is valuable and does
not solve the terminal-routing problem: it makes independent baseline work
stronger, but Requirements Engineer and Product Prototyper still lack a truthful
way to stop after that requested result.

## Analysis boundary

Target skill files changed by this reanalysis: None

Pre-existing target-file changes observed: Yes — twelve uncommitted Requirements
Engineering files, preserved as the current review baseline.

Analysis artifact:
`.codex/artifacts/requirements-outcome-routing-flexibility/optimization-analysis.md`
