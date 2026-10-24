# Design Examples

Worked examples of clear designs and of the shapes to avoid, followed by short case studies of real design mistakes. They are not templates: use them to recognize the shape of a clear design, and reuse the reasoning, not the names. Folder layouts are illustrative projections of the design, not universal conventions; respect the codebase's established style when it stays readable.

## Contents

- [Example 1: CRUD Request Flow](#example-1-crud-request-flow)
- [Example 2: Job Runtime With A Thin Facade And An Internal Worker Loop](#example-2-job-runtime-with-a-thin-facade-and-an-internal-worker-loop)
- [Example 3: Related Subjects Keep Separate Interfaces](#example-3-related-subjects-keep-separate-interfaces)
- [Example 4: Workflow With State Machine](#example-4-workflow-with-state-machine)
- [Example 5: Current-Schema Runtime With Required Data Migration](#example-5-current-schema-runtime-with-required-data-migration)
- [Example 6: Schema Contraction With No Data Migration](#example-6-schema-contraction-with-no-data-migration)
- [Example 7: Rejecting An Unreachable Edge Case During Technical Review](#example-7-rejecting-an-unreachable-edge-case-during-technical-review)
- [Example 8: Supported Product Scenario Versus Technical Possibility](#example-8-supported-product-scenario-versus-technical-possibility)
- [Common Bad-Practice Patterns](#common-bad-practice-patterns)
- [Case Studies](#case-studies)
- [How To Use These Examples](#how-to-use-these-examples)

## Example 1: CRUD Request Flow

### Situation

A user submits an order from a frontend.
The system validates the request, applies domain rules, persists the order, and returns the created result.

### Spine Inventory

| Spine ID | Scope | Start | End | Governing Owner | Why It Matters |
| --- | --- | --- | --- | --- | --- |
| DS-001 | `Primary End-to-End` | `Frontend` | `Database` | `OrderApplicationService` | Main request path for order creation |
| DS-002 | `Return-Event` | `OrderRepository` | `Frontend` | `OrderApplicationService` | Main return path for response shaping |

### Primary Execution Spine

`Frontend -> OrderController -> OrderApplicationService -> Order -> OrderRepository -> Database`

### Return Spine

`OrderRepository -> OrderApplicationService -> Frontend`

### Main Domain Subject Nodes

| Node | Role | Ownership |
| --- | --- | --- |
| `OrderController` | request boundary | request parsing and transport handoff |
| `OrderApplicationService` | use-case owner | orchestration of order creation use case |
| `Order` | domain owner | invariants, business rules, state transitions |
| `OrderRepository` | persistence boundary | storage contract fulfillment |

### Off-Spine Concerns Around The Spine

| Off-Spine Concern | Serves Which Owner | Responsibility |
| --- | --- | --- |
| `AuthPolicy` | `OrderController` | request authorization |
| `RequestValidator` | `OrderController` | input validation |
| `AuditLogger` | `OrderApplicationService` | audit recording |
| `MetricsPublisher` | `OrderApplicationService` | metrics emission |
| `OrderResponseMapper` (optional) | `OrderController` or `OrderApplicationService` | output mapping when response shaping becomes non-trivial |

### Interface Boundary Mapping

| Interface | Subject Owned | Identity Shape | Note |
| --- | --- | --- | --- |
| `createOrder(customerId, orderDraft)` | `Order` | `customerId + orderDraft` | clear create boundary |
| `getOrder(orderId)` | `Order` | `orderId` | explicit order identity |

### Derived Subsystem / Folder / File Mapping

One valid conventional shared-layer projection:

```text
controllers/
  OrderController.ts
services/
  orders/
    OrderApplicationService.ts
domain/
  orders/
    Order.ts
persistence/
  repositories/
    OrderRepository.ts
  models/
    OrderRecord.ts
```

| Path | Owner | Responsibility |
| --- | --- | --- |
| `controllers/OrderController.ts` | request boundary | HTTP/API transport entry |
| `services/orders/OrderApplicationService.ts` | use-case owner | orchestration |
| `domain/orders/Order.ts` | domain owner | rules and invariants |
| `persistence/repositories/OrderRepository.ts` | persistence boundary | storage contract |
| `persistence/models/OrderRecord.ts` | persistence adapter | database-facing record/model |

Another valid feature-oriented projection:

```text
orders/
  OrderController.ts
  OrderApplicationService.ts
  Order.ts
  OrderRepository.ts
  OrderRecord.ts
```

This can also be good when the codebase is already feature-oriented and the folder still makes ownership readable.
If response mapping later becomes non-trivial, add an explicit `OrderResponseMapper` near the transport boundary rather than pushing that concern into the domain owner.

The point is not that one exact folder convention is always right.
The point is that the code layout should make the ownership and structural depth easy to read for that codebase.

### Why This Is Clean

- The request path is easy to draw.
- The domain aggregate owns business rules instead of helpers or repositories.
- The off-spine concerns help the main flow but do not replace it.
- The interfaces are subject-specific and identity-specific.

### Bad Practice To Avoid

`Frontend -> OrderController -> OrderService -> ValidationHelper -> PricingHelper -> PersistenceHelper -> Repository`

Why this degrades:

- helpers start owning real business behavior
- the main domain subject becomes hard to find
- ownership is fragmented across utility-style pieces
- the request path becomes harder to reason about

Flat folder shape that usually accompanies this smell:

```text
orders/
  OrderController.ts
  OrderService.ts
  ValidationHelper.ts
  PricingHelper.ts
  PersistenceHelper.ts
  Repository.ts
```

Why this folder shape also hurts:

- transport, orchestration, domain, and persistence boundaries are mixed together
- the next engineer cannot see the structural depth from the directory layout
- generic helpers accumulate because the folder no longer communicates boundaries
- it looks feature-grouped on paper, but the files themselves no longer reflect clear owned boundaries

## Example 2: Job Runtime With A Thin Facade And An Internal Worker Loop

### Situation

A client submits a job. The public `JobClient` surface stays thin. `JobRuntime` owns the job's lifecycle and event submission, and `JobWorker` owns the serialized event loop that consumes provider events and emits normalized job events back upward. Queues, dispatch, status, bootstrap, shutdown, and streaming serve that runtime instead of competing with it.

### Spine Inventory

| Spine ID | Scope | Start | End | Governing Owner | Why It Matters |
| --- | --- | --- | --- | --- | --- |
| DS-101 | `Primary End-to-End` | `API / Queue Input` | `Provider` | `JobRuntime` | main path from submission into runtime processing |
| DS-102 | `Return-Event` | `Provider Events` | `Stream / Callback Consumer` | `JobRuntime` | outward event and status visibility |
| DS-103 | `Bounded Local` | `Input Event Queue` | `Handled Event Or Follow-Up Event` | `JobWorker` | serialized worker loop that materially shapes runtime behavior |

### Spines

- Primary: `API -> JobClient -> JobRuntime -> JobInputQueue -> JobWorker -> WorkerEventDispatcher -> Event Handler -> Provider`
- Return/event: `Provider Events -> Event Handler / Status Projection -> JobEventNotifier -> Stream / Callback -> Client`
- Bounded local, parent owner `JobWorker`: `Input Event Queue -> JobWorker.run() -> WorkerEventDispatcher -> Event Handler -> Derived Event / Next Queue Item`

The bounded local spine is not a second architecture; it is the internal control flow of one owned node.

### Main Domain Subject Nodes

| Node | Role | Ownership |
| --- | --- | --- |
| `JobClient` | thin public facade | public entry convenience only; should not own runtime sequencing |
| `JobRuntime` | governing runtime owner | lifecycle, event submission, outward notifier wiring |
| `JobWorker` | bounded local owner | serialized worker loop and shutdown path |
| `WorkerEventDispatcher` | dispatch owner inside the worker flow | applies status projection and routes each event to a concrete handler |

### Off-Spine Concerns Around The Spine

| Off-Spine Concern | Serves Which Owner | Responsibility |
| --- | --- | --- |
| `JobInputQueue` | `JobWorker` | prioritized queue intake and delivery |
| `EventHandlerRegistry` | `WorkerEventDispatcher` | handler lookup by event type |
| `JobStatusProjector` | `JobRuntime` | runtime-visible status |
| `JobEventStore` | `JobWorker` | event history |
| `JobEventNotifier` | `JobRuntime` | outward event and status publishing |
| `JobBootstrapper`, `JobShutdown` | `JobWorker` | startup and cleanup sequencing |

### Derived Folder / File Mapping

```text
jobs/
  job-client.ts
  runtime/
    job-runtime.ts
    job-worker.ts
  events/
    job-events.ts
    job-input-queue.ts
    worker-event-dispatcher.ts
    job-event-notifier.ts
  handlers/
    event-handler-registry.ts
    provider-result-handler.ts
  status/
    job-status-projector.ts
  bootstrap/
    job-bootstrapper.ts
  shutdown/
    job-shutdown.ts
```

- `runtime/` keeps the governing owner and the loop owner together without hiding the distinction between them.
- `events/`, `handlers/`, `status/`, `bootstrap/`, and `shutdown/` are capability areas around the runtime: a new responsibility of one of those kinds should land there, not in a new ad hoc helper.
- The layout is a readable projection of ownership and depth, not one folder per spine step.

### Design Lesson

A real design can have several spines at once: a request spine, a return/event spine, and a bounded local loop. The first public class in the flow (`JobClient`) is not automatically the owner: a thin facade may forward to the governing owner (`JobRuntime`), and the loop owner (`JobWorker`) sits one level deeper.

### Bad Practice To Avoid

Generic coordinators on the main line:

`API -> RuntimeCompositionService -> SessionStore -> EventBridge -> SnapshotService -> ProviderClient`

- off-spine concerns sit on the main line instead of serving it, and there is no obvious main domain subject
- sequencing authority is blurred across generic coordination pieces
- the next engineer has to reconstruct the real flow from fragments

The flat folder that usually comes with it:

```text
jobs/
  JobClient.ts
  RuntimeService.ts
  QueueService.ts
  DispatchService.ts
  StatusService.ts
  StreamService.ts
  BootstrapService.ts
```

- facade, governing owner, loop owner, and off-spine concerns collapse into one directory
- generic `...Service` names blur authority, and queues, dispatch, and status start competing with the runtime
- the bounded worker loop becomes hard to see

## Example 3: Related Subjects Keep Separate Interfaces

### Situation

A system runs standalone jobs and pipelines. A pipeline coordinates several steps; each step runs as its own job, and the pipeline owns the higher-level orchestration and event multiplexing.

### Spines

- Primary: `API -> PipelineManager -> Pipeline -> step Jobs -> JobRuntime -> Provider`
- Return/event: `step job events -> Pipeline multiplexes them into PipelineEvent -> Stream -> Client`

### Main Domain Subject Nodes

| Node | Role | Ownership |
| --- | --- | --- |
| `PipelineManager` | entry owner | pipeline creation and lookup |
| `Pipeline` | orchestration owner | pipeline lifecycle and step coordination |
| `Job` | step owner | one step's lifecycle |

### Interface Boundary Mapping

| Interface | Subject Owned | Identity Shape |
| --- | --- | --- |
| `startPipeline(pipelineId, definition)` | `Pipeline` | `pipelineId + definition` |
| `getPipelineStep(pipelineId, stepKey)` | step in a pipeline | `pipelineId + stepKey` |
| `getJobResumeConfig(jobId)` | standalone `Job` | `jobId` |
| `getPipelineResumeConfig(pipelineId)` | `Pipeline` | `pipelineId` |
| `getPipelineStepResumeConfig(pipelineId, stepKey)` | step in a pipeline | `pipelineId + stepKey` |

### Bad Practice To Avoid

A surface that started as `listRuns(filter)` and now returns standalone jobs, pipelines, and pipeline steps, with `getRun(runId)` and `getRunResumeConfig(runId)` beside it:

- the caller no longer knows what subject it is dealing with
- IDs and filters become ambiguous, and ownership drifts into mapping code and conditionals
- later logic grows around guessing which kind of run the caller meant

Better: split by subject (`listJobs(jobFilter)`, `listPipelines(pipelineFilter)`, `listPipelineSteps(pipelineId, stepFilter)`), or require an explicit compound selector (`listRuns({ subjectType, subjectFilter })`).

### Design Lesson

A pipeline and its steps are related, but they are not the same subject. Do not flatten a parent and its parts into one generic interface because it is convenient today.

## Example 4: Workflow With State Machine

### Situation

A workflow engine drives a multi-step approval process.
The overall business flow is still end to end, but one owner uses a state machine internally.

### Spine Inventory

| Spine ID | Scope | Start | End | Governing Owner | Why It Matters |
| --- | --- | --- | --- | --- | --- |
| DS-301 | `Primary End-to-End` | `API Request` | `Persistence + Notification Trigger` | `WorkflowInstanceService` | top-level business flow |
| DS-302 | `Bounded Local` | `Current Workflow State` | `Next Workflow State` | `WorkflowStateMachine` | lifecycle transition logic |

### Primary Execution Spine

`API Request -> WorkflowController -> WorkflowInstanceService -> WorkflowInstance -> WorkflowRepository`

### Bounded Local Spine

Parent owner: `WorkflowStateMachine`

`Current State -> Transition Rule -> Next State -> Side-Effect Command`

### Main Domain Subject Nodes

| Node | Role | Ownership |
| --- | --- | --- |
| `WorkflowController` | request boundary | request parsing |
| `WorkflowInstanceService` | use-case owner | workflow orchestration |
| `WorkflowInstance` | domain owner | workflow data and invariants |
| `WorkflowStateMachine` | bounded local owner | transition policy |
| `WorkflowRepository` | persistence boundary | state persistence |

### Off-Spine Concerns Around The Spine

| Off-Spine Concern | Serves Which Owner | Responsibility |
| --- | --- | --- |
| `NotificationAdapter` | `WorkflowInstanceService` | send notifications |
| `AuditTrailStore` | `WorkflowInstanceService` | audit persistence |

### Design Lesson

A state machine does not remove the need for a main spine.
It usually lives inside one owner and should be named as a bounded local spine when it materially shapes behavior.

### Bad Practice To Avoid

Spreading one workflow state machine across several generic services:

`WorkflowController -> WorkflowService -> TransitionHelper -> RuleRegistry -> ActionManager -> Repository`

Why this degrades:

- no single owner clearly owns transition policy
- state logic becomes distributed and harder to validate
- the state machine stops being a clear bounded local flow
- helper and registry structures quietly become business owners

## Example 5: Current-Schema Runtime With Required Data Migration

### Situation

An application already stores version-1 workspace settings. A new design replaces that persisted shape with version 2.

The existing user data must be preserved, but the current business logic must not carry version-1 branches, dual-shape repositories, or permanent fallback behavior.

### Transition Decision

| Question | Evidence |
|---|---|
| Can current runtime use version-1 records directly? | No; required values changed representation and meaning, and the current reader rejects the old shape |
| Can the data be discarded or rebuilt? | No; the records contain authoritative user settings |
| What does transformation provide? | Required semantic conversion while preserving user data |

Decision: `Migration Required`.

### Spine Inventory

| Spine ID | Class | User / System Trigger | Success Outcome | Owning Boundary |
|---|---|---|---|---|
| DS-401 | Startup / maintenance | Application startup or an explicit deployment migration step finds schema version 1 | All eligible records are validated as schema version 2 and the migration ledger records completion | Migration subsystem |
| DS-402 | Primary end-to-end | A current client reads or updates workspace settings | The request is processed and persisted using schema version 2 only | Settings domain |

### Migration Spine

```text
AppBootstrap
  -> SchemaVersionStore
  -> MigrationRunner
  -> V1ToV2SettingsMigration
  -> CurrentSchemaValidator
  -> MigrationLedger
  -> StartCurrentRuntime
```

### Current Runtime Spine

```text
UI / API
  -> SettingsService
  -> CurrentSettingsRepository
  -> SettingsSchemaV2Record
```

The two spines are deliberately separate. The migration spine may understand the historical source schema. The current runtime spine may not.

### Deployment / Cutover Constraint

This example assumes a controlled cutover: the old application version is stopped or otherwise prevented from accessing the settings store before the version-2 migration begins. The new application holds the migration/startup gate until validation and ledger completion succeed.

If the deployment environment cannot prevent old and new binaries from accessing the same store concurrently, that is an unresolved deployment/design constraint. It must be surfaced and resolved; it must not be hidden behind dual-schema business logic.

### Ownership

| Component | Responsibility | Explicit Non-Responsibility |
|---|---|---|
| `AppBootstrap` | Prevent the current runtime from starting until required migrations complete | Does not transform records or contain schema-version branches |
| `MigrationRunner` | Discover pending migrations, execute them in order, and coordinate checkpoints and recovery | Does not serve normal settings reads or writes |
| `V1ToV2SettingsMigration` | Decode version-1 records and deterministically transform them into version 2 | Is not imported by the settings service or current repository |
| `CurrentSchemaValidator` | Prove transformed records satisfy the current schema before completion is recorded | Does not accept version-1 records as valid current data |
| `MigrationLedger` | Record ordered migration completion only after validation succeeds | Does not make an incomplete migration appear complete |
| `SettingsService` | Implement current business behavior against version 2 | Does not detect, translate, or fall back to version 1 |
| `CurrentSettingsRepository` | Read and write version-2 records only | Does not dual-read or dual-write historical formats |

### Off-Spine Support

- A backup or snapshot mechanism protects the pre-migration state when the migration risk requires it.
- A quarantine path records malformed historical records that cannot be transformed automatically.
- Structured logs and metrics report migration progress and failure without becoming an alternate execution path.
- An operator recovery command may retry, restore, or resume the migration according to the approved recovery plan.

### Folder Mapping

```text
bootstrap/
  application-bootstrap.ts

migrations/
  migration-runner.ts
  migration-ledger.ts
  versions/
    v1-to-v2-settings-migration.ts
    v1-settings-record.ts

settings/
  current/
    settings-service.ts
    settings-repository.ts
    settings-schema-v2.ts
```

Historical schema types live under the migration-owned boundary. Their continued presence there supports ordered upgrades, fresh-install replay, recovery, or audit needs; it does not authorize current business code to depend on them.

### Completion And Failure Behavior

1. The runner checks the migration ledger and source schema version.
2. The migration reads version-1 records through its migration-owned decoder.
3. It deterministically writes version-2 records using a restart-safe strategy.
4. The current-schema validator verifies the migrated result.
5. Only after successful verification does the ledger record completion.
6. If transformation or validation fails, startup remains blocked and the documented restore, quarantine, retry, or operator-recovery path is used.
7. After completion, normal reads and writes travel only through the current runtime spine.

### Bad Practice

```text
SettingsService
  -> if record is version 1, translate it inline
  -> otherwise use version 2

CurrentSettingsRepository
  -> read version 1 or version 2
  -> write both formats for compatibility
```

This is bad because:

- historical data handling infects every current feature path,
- two schemas become competing authorities,
- failures can occur during arbitrary user requests rather than at a controlled boundary,
- migration completion is impossible to prove,
- compatibility branches become permanent and accumulate with each schema change,
- tests must preserve obsolete behavior instead of protecting the current design.

### Design Lesson

Preserving existing data does not require preserving an obsolete runtime contract. Transform the data at an explicit, owned, testable migration boundary; then keep the business path structurally clean and current-schema-only.

## Example 6: Schema Contraction With No Data Migration

### Situation

An application stores several gigabytes of JSON workspace records. The current stored documents contain a superset of attributes:

```json
{
  "workspaceId": "w-17",
  "displayName": "Research",
  "enabled": true,
  "obsoleteThemeHint": "warm",
  "deprecatedSortToken": "manual-v1"
}
```

The new application model removes `obsoleteThemeHint` and `deprecatedSortToken`. The normal JSON reader is version-agnostic, projects recognized fields into the current model, and safely ignores unknown attributes. The removed fields no longer influence behavior, no invariant depends on them, and no privacy, storage, or physical-schema requirement demands immediate deletion.

### Persisted-Data Transition Decision

| Question | Evidence |
|---|---|
| Can the current reader consume representative existing records? | Yes; direct-read tests load stored supersets through the normal reader without version checks or fallback branches |
| Are required semantics and invariants preserved? | Yes; all authoritative values remain present and the removed fields are behaviorally obsolete |
| Is the data disposable or cheaply rebuildable? | No, but rebuilding is unnecessary because direct use is correct |
| Does the physical store require modification? | No; JSON permits extra object attributes and the application does not require canonical byte-for-byte rewriting |
| What would bulk migration add? | I/O, duration, corruption exposure, recovery work, and rollout risk without a functional benefit |

Decision: `Directly Usable — No Migration`.

### Current Runtime Spine

```text
WorkspaceJsonFile
  -> CurrentWorkspaceReader
  -> CurrentWorkspaceModel
  -> WorkspaceService
```

`CurrentWorkspaceReader` has one general current-runtime contract: recognize current fields and ignore irrelevant extras. It does not inspect schema versions, branch on historical formats, dual-read, or translate old fields.

### Ownership And File Consequence

| Component | Responsibility | Explicit Non-Responsibility |
|---|---|---|
| `CurrentWorkspaceReader` | Project recognized JSON attributes into the current model | Does not contain a version-1 branch or migration transform |
| `CurrentWorkspaceModel` | Define the fields and invariants used by current behavior | Does not retain obsolete attributes for compatibility |
| `WorkspaceWriter` | Write the current representation on ordinary future updates | Does not scan and rewrite untouched files merely for cleanup |

No migration subsystem, ledger, startup gate, maintenance command, or bulk rewrite is added.

### Required Evidence

- Load representative real or production-shaped superset records through the normal reader.
- Prove current behavior and invariants use only the retained attributes.
- Prove removed attributes are not required for derived values, identity, authorization, ordering, or recovery.
- Confirm the storage/parser contract intentionally permits irrelevant extra attributes.
- Record any separate privacy, compliance, disk-cost, or canonicalization requirement; such a requirement could change the decision.

### Bad Practice

```text
ApplicationStartup
  -> scan several gigabytes of workspace JSON
  -> remove two ignored attributes from every record
  -> rewrite every file
  -> add checkpoints, rollback, recovery, and completion tracking
```

This is bad when no concrete requirement needs the rewrite. It converts a safe model contraction into a high-risk operational project, increases failure exposure, and creates migration machinery with no correctness benefit.

### Design Lesson

A stored representation does not need to be byte-for-byte identical to the current in-memory model. When the normal reader consumes the data correctly and required meaning is preserved, record the no-migration decision and its evidence instead of rewriting data for representational cleanliness.

## Example 7: Rejecting An Unreachable Edge Case During Technical Review

### Situation

A desktop mail application manages settings for several mail accounts. Selecting an account opens or focuses a separate account window. During window bootstrap, the settings store is bound to that window's account and remains bound for the lifetime of the window.

A settings card saves several values through an existing per-setting update action. Elsewhere in the codebase, a separate background-sync flow can call `bindAccountContext(...)`, and the store contains a `bindingRevision` field.

A reviewer notices that each setting update can resolve the current client. From those local facts alone, the reviewer imagines that the window could switch from account A to account B in the middle of one save and proposes:

- a captured client for the whole save
- revision fencing
- rebinding state
- partial-result types
- new recovery behavior
- additional localization and tests

Those mechanisms are technically coherent, but the premise must be checked against the supported product journey before they become design requirements.

### Upstream Behavior And Production-Path Map

The approved behavior is to edit settings for the account represented by the current account window. No requirement introduces in-place account switching for that window.

The solution designer records this basis before review:

| Behavior ID | Kind | Approved Requirement / Intent | Approved Trigger / Contract | Relevant Existing Behavior And Evidence | Approved Change / Preserved Outcome | Target Production Path / Lifecycle And Spine ID(s) |
| --- | --- | --- | --- | --- | --- | --- |
| `BEH-SETTINGS-001` | User | Settings apply to the account represented by the current account window | User opens or focuses one account window | Window creation/focus, bootstrap binding, production callers of `bindAccountContext(...)`, and the settings action show that account identity remains stable for the window lifetime | Preserve account identity while saving the approved setting changes | `DS-SETTINGS-001`: `Account list -> account window -> bootstrap binding -> settings card -> existing setting action` |

The architecture reviewer validates this map against the approved requirements, investigation evidence, and current code before applying structural checks. The relevant evidence shows:

- ordinary account selection opens or focuses an account window
- bootstrap binds the store once for that window
- the settings card does not expose an in-window account-switch action
- the only normal `bindAccountContext(...)` caller belongs to a separate background-sync lifecycle
- `bindingRevision` protects that separate lifecycle; its existence does not prove window rebinding

### Material Edge-Case Record

#### `EDGE-SETTINGS-001` — Account binding changes during one multi-setting save

- Related approved requirement or established contract: settings apply to the account represented by the current account window.
- Relevant behavior ID(s): `BEH-SETTINGS-001`.
- Initiating basis kind: `User`.
- Independent product-supported initiating trigger or applicable governing contract: the user opens or focuses one account window.
- Support evidence: the Account list exposes that product surface and its window creation/focus path implements the supported user action.
- Forward current or approved target production caller/event path that exercises the initiating basis and reaches the claimed state: `Account list -> account window -> bootstrap binding -> settings card -> existing setting action`. No caller on that path invokes account rebinding during save.
- Lifecycle preconditions and material consequence at the claimed point: the window is already bound before the card becomes interactive and remains bound for its lifetime, so the claimed cross-account save consequence cannot occur. A generic binding method, revision field, and separate background-sync caller do not change this lifecycle.
- Scenario validity: `Technically Possible but Unsupported/Contrived`; the exposed setting action and unrelated background-sync binding capability do not establish a coherent cross-account save workflow or an explicitly supported concurrent product behavior.
- Reachability: `Not Reachable`.
- Review consequence / proportionate response: do not require a revision-fenced save protocol. Reuse the existing setting action, preserve truthful partial-persistence behavior, and stop on the first actual same-account failure when that is the approved behavior.

### Why The Initial Finding Is Invalid

Bad finding shape:

```text
The store can rebind and exposes bindingRevision.
Therefore a multi-setting save can cross accounts.
Add revision fencing and rebinding recovery.
```

This finding proves only technical possibility at the level of isolated methods and fields. It does not identify a supported trigger, production caller, or lifecycle path that can produce the state.

The correct review does not dismiss edge cases generally. It rejects this particular premise because the complete relevant journey cannot reach it.

### Do Not Aggregate Plausible Failure Causes

A reviewer evaluating snapshot recovery must not write:

```text
The snapshot can be absent after a new entity, manual deletion, schema reset,
invalid schema, filesystem failure, or an interrupted write.
Therefore archived history must enter recovery.
```

This combines conditions with different triggers, paths, and consequences without proving that any one of them reaches the claimed recovery behavior. Classify them separately. A new entity may be reachable but have no archive to recover; a real schema reset may not route archived history into continuation; malformed input may throw instead of entering the assumed fallback; manual deletion, corruption, infrastructure failure, or interrupted execution may have no supported in-scope journey or governing recovery contract. A synthetic reproduction that invokes the fallback proves only that the branch can run, not that a supported production journey reaches it.

For any condition that is material, prove the complete witness: supported trigger or contract -> actual production path -> claimed lifecycle state -> material consequence. One real but irrelevant condition cannot validate the other conditions or the proposed recovery machinery.

### When The Decision Would Change

Reclassify the premise if evidence shows that the current or approved target product supports any of the following:

- in-place account switching inside the settings window
- a production event that rebinds the same window while save is active
- concurrent lifecycle behavior that can replace the window's account context

If such a path exists, record its trigger, lifecycle, material consequence, and evidence. Then evaluate whether fencing or recovery is proportionate. Until that evidence exists, classify missing material evidence as `Unclear` rather than assuming either reachability or safety.

### Downstream Code-Review Use

The code reviewer receives the design spec's `BEH-SETTINGS-001` map row and the design review report's `EDGE-SETTINGS-001` decision.

- If the implementation preserves the account window lifecycle, mark the behavior and edge-case decision `Confirmed` by ID without copying the full reasoning.
- If the implementation introduces a real in-window rebinding path, reuse `EDGE-SETTINGS-001`, record the changed evidence, and reclassify it.
- Do not recreate the rejected hypothetical merely because the implementation still contains `bindingRevision` or a generic binding method.

### Design Lesson

Technical review begins from approved behavior, a supported product scenario, and the complete relevant production path. Local capability is not proof of scenario validity or reachability. Persisting the behavior, evidence, and decision makes the reasoning auditable, prevents unsupported complexity, and lets downstream reviewers confirm or challenge the decision when later evidence changes.

## Example 8: Supported Product Scenario Versus Technical Possibility

### Situation

A product manages a hierarchy of Sites built from installable Plugins. Users
can edit the active hierarchy in the Editor and can remove a plugin from Settings. The
implementation also contains lower-level plugin loaders, fallback branches,
and test helpers that can construct states not normally created by the product.

The technical reviewer must decide whether an observed implementation behavior
is a review-relevant product scenario. The key question is not only “can some
code path be reached?” It is:

```text
coherent actor goal or supported event
-> supported entry surface or contract
-> forward production path
-> lifecycle state
-> material consequence
```

### Supported Normal Scenario: Edit The Active Site Hierarchy

The user wants to rename a Site and save the change through the Editor.

| Field | Evidence-backed basis |
| --- | --- |
| Scenario ID | `SCN-SITE-EDIT-001` |
| Actor and coherent goal | A user edits the active Site hierarchy and wants the saved name to appear on the next load |
| Supported entry surface | Editor and its Save action |
| Forward production path | `Editor -> Site API -> authoritative hierarchy manager -> persisted Site definition -> reload/published hierarchy` |
| Lifecycle and consequence | The edit is claimed, persisted, and visible after reload; failure to preserve the name is material |
| Independent evidence | Approved requirement, Editor route, normal API caller, persistence code, and an end-to-end journey |
| Scenario validity | `Supported Normal Scenario` |

This scenario can support an implementation finding. For example, if the API
returns success but the authoritative hierarchy manager discards the renamed
field before persistence, the reviewer can promote that observation because the
actor, goal, entry surface, path, lifecycle, consequence, and evidence are all
independently established.

### Supported Explicit Edge Scenario: Retain A Detached Definition

The product explicitly supports temporarily removing a Site from the active
root hierarchy while retaining its authored Site definition for later reuse.

| Field | Evidence-backed basis |
| --- | --- |
| Scenario ID | `SCN-SITE-DETACH-001` |
| Actor and coherent goal | A user temporarily detaches a Site from the active topology without deleting its authored definition |
| Supported entry surface | The documented topology-management action in the Editor |
| Forward production path | `Editor detach action -> topology manager -> active-root manifest -> definition library remains addressable -> later checkout/re-attach` |
| Lifecycle and consequence | The Site is inactive in the current topology but remains available for later reuse |
| Independent evidence | Approved product behavior and a normal save/reload or checkout journey that demonstrates retention |
| Scenario validity | `Supported Explicit Edge Scenario` |

This is an unusual workflow, but it is reviewable because the product
explicitly supports it. A code reviewer must not demand physical deletion of
the detached Site directory merely because the active manifest no longer lists
it. The topology and definition-library responsibilities are different.

### Negative Example: Two Exposed Actions Do Not Prove A Concurrent Workflow

Suppose a reviewer observes that:

1. the Editor can save a Site definition; and
2. Settings can remove the Plugin that supplied that Site.

The reviewer then imagines that a user opens two browser tabs, starts saving in
one tab, and deliberately removes the supplying plugin in the other tab during
the narrow interval before the save claims its ownership. The reviewer proposes
revision fencing, re-resolution, partial-admission behavior, and recovery
machinery.

| Field | Correct assessment |
| --- | --- |
| Scenario ID | `SCN-SITE-RACE-001` |
| Observed technical facts | Both actions are individually callable |
| Missing product basis | No coherent user goal, collaboration requirement, or explicit concurrent-edit contract explains the contradictory timing |
| Missing independent path | The two action endpoints do not prove that this ordering is a supported workflow |
| Scenario validity | `Technically Possible but Unsupported/Contrived` |
| Review use | `Reject`; do not score, route, or prescribe machinery from it |

The fact that both actions exist in production is insufficient. If the product
later adds multi-user collaboration or explicitly documents concurrent plugin
removal during saves, record that contract and re-evaluate the scenario as a
supported edge case. Until then, the reviewer must not turn a mechanically
constructible race into a product defect.

### Negative Example: A Test Or Internal Method Cannot Create Product Validity

A unit test directly invokes a fallback method with a fabricated missing
snapshot and observes an exception. Or a reviewer finds an internal method that
can rebind a context and reasons backward from it to an imagined user journey.

These observations may show that the method or branch behaves a certain way,
but they do not establish:

- who has a supported goal that initiates the state;
- which product surface or independent system event creates it;
- that the normal production path reaches the state; or
- that the product promises the claimed recovery behavior.

| Scenario validity | Correct review treatment |
| --- | --- |
| `Technically Possible but Unsupported/Contrived` | Reject as a product finding; do not add recovery machinery |
| `Unclear` because the product contract or caller evidence is missing | Hold for investigation or route to the authority; do not score or prescribe machinery yet |
| Supported scenario already established, and the test reproduces it | Use the test as confirming evidence, not as the scenario's origin |

The test, endpoint, callback, internal method, diff, and proposed fix can be
evidence about a scenario. They cannot be the independent reason that the
scenario exists.

### Negative Example: A Compatibility Rule Must Be Checked Against Normal Data

An implementation rejects every symbolic link because symbolic links are
considered difficult to reason about. A reviewer verifies that the rejection
branch works and treats the rule as correct.

That is incomplete. If the normal installed Plugins contain legitimate
internal symbolic links, the rule breaks an established installation journey:

```text
normal installation -> plugin discovery -> plugin import -> Site publication
```

The reviewer must inspect representative normal plugin data before accepting
the restriction. The relevant scenario may be a supported system installation
event rather than a user clicking a button. A technically clean restriction is
not automatically a valid product rule when it rejects normal supported data.

### Decision Table

| Scenario classification | May affect finding, score, routing, or machinery? | Required action |
| --- | --- | --- |
| `Supported Normal Scenario` | Yes | Trace the path, lifecycle, consequence, and evidence; then review proportionately |
| `Supported Explicit Edge Scenario` | Yes | Cite the explicit product, security, operational, or contractual basis |
| `Technically Possible but Unsupported/Contrived` | No | Reject and keep it out of findings, deductions, routing, and prescriptions |
| `Unclear` | Not yet | Investigate or block the dependent conclusion; do not guess |

### How The Roles Use This Example

- The Solution Designer records the user's goal and approved behavior; it
  does not invent a technical race merely because an implementation detail is
  visible.
- The Solution Designer maps each approved scenario to its production
  path, ownership boundaries, and lifecycle, and records any explicit edge
  contract.
- The Architecture Reviewer checks whether the proposed design serves those
  supported scenarios without adding unsupported complexity.
- The Code Reviewer starts with the established scenario and path, treats code
  observations as provisional, and promotes only candidates that pass the
  scenario-and-mechanism gate.

### Design Lesson

Product scenario validity and technical reachability are related but different.
Reachability asks whether supported execution can produce the state; scenario
validity asks whether the state belongs to a coherent, supported product or
contractual workflow. Good design and review require both. This prevents
bottom-up reasoning from endpoints, fields, tests, or callbacks from creating
false defects and unnecessary architecture.

## Common Bad-Practice Patterns

### 1. Generalist Boundary

Bad shape:

- one API/query/command/service method tries to serve several subjects
- one generic ID or selector is used to guess the subject

Typical symptoms:

- `getThing(id)`
- `listThings(filter)`
- `resolveContext(id)`

Why it hurts:

- weak naming
- mixed ownership
- branching logic grows over time
- identity meaning becomes unstable

Better direction:

- split by subject
- or require an explicit compound identity shape

### 2. Fragmented Coordinator Chain

Bad shape:

- many coordination-style services sit on the main line
- no obvious main domain owner advances the flow

Typical symptoms:

- `CompositionService`
- `Bridge`
- `SessionStore`
- `Resolver`
- `Dispatcher`

Why it hurts:

- the spine is hidden
- off-spine concerns compete with the main flow
- debugging and change analysis become expensive

Better direction:

- restore a readable spine
- attach off-spine concerns to clear owners on that spine

### 3. Hidden Local Loop

Bad shape:

- a runtime loop, worker cycle, or state machine materially shapes behavior
- but the design never names it

Why it hurts:

- important behavior is invisible in the design
- validation scope becomes incomplete
- internal authority and sequencing stay unclear

Better direction:

- name it as a bounded local spine
- state its parent owner
- explain why it matters

### 4. Overloaded Main-Line Node

Bad shape:

- one main-line node keeps every concern because it is “central”

Why it hurts:

- the node becomes a god-object
- off-spine responsibilities stop being explicit
- the design looks spine-first on paper but is not truly decomposed

Better direction:

- keep the node as the owner of core sequencing
- split off-spine concerns around it under clear ownership

### 5. Flat Mixed-Layer Folder

Bad shape:

- one folder contains transport entrypoints, application sequencing, domain owners, persistence adapters, and generic utilities together

Why it hurts:

- structural depth disappears from the code layout
- folder names stop helping the reader reason about ownership
- later off-spine concerns pile up in the same directory because there is no visible boundary

Better direction:

- let folder structure reflect real architectural boundaries
- keep different structural depths in different folders when the change is non-trivial
- do this with judgment, not by mechanically copying every flow step into its own directory
- treat file placement as a readable projection of the spine and ownership model

### 6. Ad Hoc Support Creation Instead Of Reusing An Existing Capability Area

Bad shape:

- each new off-spine need creates a new local helper, utility, or service even though the codebase already has an established subsystem for that job

Why it hurts:

- responsibilities scatter across the codebase
- existing subsystem boundaries weaken over time
- the next engineer stops knowing where that kind of logic belongs
- off-spine concern structure grows by convenience instead of ownership

Better direction:

- check whether an existing capability area or subsystem already owns that kind of responsibility
- reuse or extend it when the fit is natural
- create a new off-spine concern only when the current system truly lacks the right owner

### 7. Mistaking A Thin Facade For The Governing Owner

Bad shape:

- the first public class in the call chain is treated as the true owner even though it mostly forwards

Why it hurts:

- ownership appears simpler than it really is
- runtime control or lifecycle authority gets hidden
- later off-spine concerns get attached to the wrong boundary

Better direction:

- name the thin facade explicitly
- name the deeper governing owner explicitly
- if a bounded local loop exists below that, name it too

## Case Studies

Real design mistakes and their fixes, written without the project they came from: the situation, the mistake, the better design, and the lesson.

### Case 1: One Sequence, Two Owners

Principles 2 and 13.

- **Situation:** a run sends a message to a run on another server. A link registry knows the remote endpoint; a messaging engine checks messages, assigns their IDs, and keeps the sender's log.
- **The mistake:** the root gets the endpoint from the registry, then calls `engine.sendToRemote(input, transmit)`. The engine checks the message, assigns its ID, calls `transmit`, which goes back into the registry and the channel, and then commits. The spine's owner read "root + registry". Every dependency pointed the right way, and a second review passed it.

  ```text
  ❌ root → links.endpointFor → engine.sendToRemote(input, transmit)
                                  └─ transmit() → links → channel
                               → engine commits the sender's log
  ```

- **The better design:** the root's message delivery owns the order and calls each mechanism itself.

  ```text
  ✅ root: endpoint.allowsSender → engine.prepareRemoteSend → links.deliver → engine.commitSentToRemote
  ```

- **The lesson:** with the callback, refusal, timeout, and partial failure had no single owner, and the next retry or queueing rule would have landed on whichever side someone touched first.
- **Notice it by:** a function passed to one mechanism so it can reach another collaborator; an owner written "A + B". A chain of many coordinators with no main owner is a different mistake ([Common Bad-Practice Pattern 2](#2-fragmented-coordinator-chain)).

### Case 2: One Entry Form Traced, Another Left Open

Principle 1.

- **Situation:** a delegation tool has two entry forms: start a new worker for a description, or give a saved task to an existing worker by its run ID. A change adds workers on other servers.
- **The mistake:** remote support was designed for the first form only. Given a remote worker's run ID, the second form would have tried to hand a saved task across servers.
- **The better design:** each entry form traced; the existing-worker form refuses a remote worker with an explicit error before it resolves the task.
- **The lesson:** a path traced for one form says nothing about another; the untraced form is the one that fails in use.
- **Notice it by:** one example standing for every entry form of a tool or API, or one kind ("a run") standing for several.

### Case 3: A Reader Of Derived Data Left Out

Principle 11.

- **Situation:** group stores compose messages between local and remote participants into their stored view.
- **The mistake:** the design's table of code that reads the changed structure left out the stored-state validators, which still required both message endpoints to be local. After a restart, the validators dropped the stored state and replies were refused. End-to-end testing found it; design and architecture review had not.
- **The better design:** a row for the validators in that table; they check endpoints against the store's endpoint set, which has one owner.
- **The lesson:** code that reads what is derived from a structure (views, endpoint sets, validators, streams) breaks as surely as code that reads it directly.
- **Notice it by:** an inventory that lists only the direct readers of a changed structure, or only the server side of a changed rule. User-visible text that states the rule is a consumer too, and so is the code that matches an error code to a message; a new field or mark with no named reader is a sign of the same gap.

### Case 4: Behavior By Absence

Principle 13.

- **Situation:** closing a task must stop tracking the task's run on another server.
- **The mistake:** the design reached that outcome because the release lookup found no authority for the remote run (`NO_AUTHORITY`), which then counted as "stopped".
- **The better design:** an explicit result (`fenced_remote`) where task runs are released: no release is invoked, the message says what happened, and it is the hook for a later "stop on the remote server".
- **The lesson:** a behavior reached through a failed lookup works by accident and breaks silently when the lookup changes.
- **Notice it by:** "finds no X, so …", "counts as".

### Case 5: Claims About The Code Taken On Trust

Principle 1.

- **Situation:** two designs justified their shape with statements about existing code.
- **The mistake:** one counted "14 readers" of a port method; it had exactly one. The inflated count kept a second method beside the new one, and a dead field. The other said a new idle shutdown "mirrors" an existing one, but it used the user's Stop, which interrupts work in progress.
- **The better design:** the new method replaces the old one on the port, its one reader moves, and the dead field is removed. The idle shutdown happens only when every member prepares a quiet termination, reusing the existing quiet rule.
- **The lesson:** a count and a "mirrors" are claims; checked against the cited code, rule by rule, both fell apart.
- **Notice it by:** "mirrors", "as today", "the compiler enforces", a count with no source; a module called production code without listing its importers; "unchanged" for a merge of copies that were never compared line by line; "unrecoverable" or "the layout matches" without opening the existing files or asking how they were made.

### Case 6: One Word, Two Meanings

Principle 15.

- **Situation:** an app that connects to several servers grew over several changes, each of which named its things locally.
- **The mistake:** a new stored field `nodeId` held another server's instance ID, while `nodeId` already named a client-side connection profile, and one screen carried both. A tool named for "available" servers also returned unavailable ones. The word for a registered remote server was already an existing contract's word for an independent run. Each name looked natural in its own file, and the reviews passed them.
- **The better design:** the ID named for what it identifies, the same name in code, storage, wire, and API; the list named for what it returns; one word per meaning in the project's glossary, with the second meanings renamed away in the same change.
- **The lesson:** a name is right only against its other uses in the system, not against its own file.
- **Notice it by:** an identifier whose meaning depends on the file it is in; "X, also called Y"; a list or tool whose name says less or more than it returns.

### Case 7: One Rule Applied By Several Callers

Principle 13.

- **Situation:** after startup migrations run, a runner reports which capabilities are ready. Two startup hosts and a manual-retry path each have to apply that answer.
- **The mistake:** each of the three callers read the answer and set each capability itself: three copies of one sequence. The "pending" state before the runner answers was left to each consumer's default.
- **The better design:** one owner, `applyCapabilityReadiness(readiness)` with `markCapabilitiesPending()`, called by all three paths, and the pending state set explicitly right after the schema check.
- **The lesson:** copies of one sequence drift. The next capability lands in one caller and not the others, and the state before the answer depends on which default each consumer has.
- **Notice it by:** "the same shape in each host", "each caller configures …", and a state that exists only because nothing set it yet.

## How To Use These Examples

- Start from the example whose shape is closest to the current task.
- Read the case studies when a design touches the same shape: several kinds or entry forms, a sequence across components, derived data, a decision by absence, a claim about existing code, a rule applied by several callers, or a name used in several places.
- Reuse the reasoning style, not the exact names.
- The rules these examples illustrate live in [design-principles.md](design-principles.md): spine-first design (Principles 2 and 14), explicit ownership and named facades (3), off-spine concerns (4), singular interfaces (10), reachable premises (6), persisted-data decisions (5), file placement after the design story (12), and one vocabulary (15).
- Judge a finding outside a ticket's scope with [ticket-scope.md](ticket-scope.md#common-situations).
