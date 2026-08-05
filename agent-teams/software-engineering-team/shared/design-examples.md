# Design Examples

These examples are not rigid templates.
Use them to learn how a good design spec can read when the architecture is organized around:

- data-flow spine inventory
- main domain subject nodes
- ownership
- off-spine concerns around the spine
- interface boundaries with explicit identity shape
- approved behavior, production journeys, and edge-case reachability
- derived subsystem, optional module grouping, folder, and file placement

Do not copy these literally.
Use them to recognize the shape of a clear design.
This file includes both good examples and bad-practice anti-examples.
Folder layouts in these examples are illustrative projections of the design, not universal conventions.
When mapping a design into code, follow the spine and ownership model, but also respect the established codebase style when it stays readable.
The examples are intentionally detailed. Preserve them rather than shortening or removing them for concision, and add examples when new structural practices need concrete shape guidance.

## Contents

- [Example 1: CRUD Request Flow](#example-1-crud-request-flow)
- [Example 2: Agent Run Runtime With Internal Event Loop](#example-2-agent-run-runtime-with-internal-event-loop)
- [Example 3: Event-Driven Agent Runtime With Thin Facade And Internal Worker Loop](#example-3-event-driven-agent-runtime-with-thin-facade-and-internal-worker-loop)
- [Example 4: Team Run Orchestration](#example-4-team-run-orchestration)
- [Example 5: Workflow With State Machine](#example-5-workflow-with-state-machine)
- [Example 6: Generic List Surface To Avoid](#example-6-generic-list-surface-to-avoid)
- [Example 7: Current-Schema Runtime With Required Data Migration](#example-7-current-schema-runtime-with-required-data-migration)
- [Example 8: Schema Contraction With No Data Migration](#example-8-schema-contraction-with-no-data-migration)
- [Example 9: Rejecting An Unreachable Edge Case During Technical Review](#example-9-rejecting-an-unreachable-edge-case-during-technical-review)
- [Common Bad-Practice Patterns](#common-bad-practice-patterns)
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

## Example 2: Agent Run Runtime With Internal Event Loop

### Situation

A client starts an agent run.
The run enters a runtime engine.
Inside that runtime, an event loop consumes provider events and emits normalized run events back upward.

### Spine Inventory

| Spine ID | Scope | Start | End | Governing Owner | Why It Matters |
| --- | --- | --- | --- | --- | --- |
| DS-101 | `Primary End-to-End` | `GraphQL / WS / External Input` | `Provider Runtime` | `AgentRun` | main run execution line |
| DS-102 | `Return-Event` | `Provider Runtime Events` | `Frontend / Callbacks` | `AgentRun` | normalized event return path |
| DS-103 | `Bounded Local` | `Provider Event Queue` | `Normalized Runtime Event` | `RuntimeEngine` | runtime-internal loop that materially shapes behavior |

### Primary Execution Spine

`GraphQL / WS / External Input -> AgentRunManager -> AgentRun -> AgentRunBackend -> RuntimeEngine / Client -> Provider Runtime`

### Return/Event Spine

`Provider Runtime Events -> RuntimeEngine / Client -> AgentRunBackend -> AgentRun -> WS / History / External Callback -> Frontend`

### Bounded Local Spine

Parent owner: `RuntimeEngine`

`Provider Event Queue -> Runtime Loop -> Event Handler / Transition -> Normalized Runtime Event`

This is not a second architecture.
It is the internal control flow of one owned node.

### Main Domain Subject Nodes

| Node | Role | Ownership |
| --- | --- | --- |
| `AgentRunManager` | run entry owner | creation and lookup |
| `AgentRun` | run lifecycle owner | run state and run-level behavior |
| `AgentRunBackend` | adaptation owner | provider/runtime normalization |
| `RuntimeEngine` | runtime control owner | provider session, loop, dispatch |

### Off-Spine Concerns Around The Spine

| Off-Spine Concern | Serves Which Owner | Responsibility |
| --- | --- | --- |
| `RunDefinitionResolver` | `AgentRunManager` | definition lookup |
| `WorkspaceResolver` | `AgentRun` | workspace context lookup |
| `RunHistoryStore` | `AgentRun` | persistence/history |
| `WsEventMapper` | `AgentRun` | websocket message mapping |
| `ExternalCallbackBinder` | `AgentRun` | callback transport binding |

### Interface Boundary Mapping

Avoid:

- `getRunResumeConfig(runId)`

Prefer:

| Interface | Subject Owned | Identity Shape | Why |
| --- | --- | --- | --- |
| `getAgentRunResumeConfig(runId)` | `AgentRun` | `runId` | standalone run |
| `getTeamRunResumeConfig(teamRunId)` | `TeamRun` | `teamRunId` | team run |
| `getTeamMemberRunResumeConfig(teamRunId, memberKey)` | team-member run | `teamRunId + memberKey` | explicit member identity |

### Derived Subsystem / Folder / File Mapping

One valid folder shape:

```text
runs/
  entry/
    AgentRunManager.ts
  lifecycle/
    AgentRun.ts
  backend/
    AgentRunBackend.ts
  transport/
    WsEventMapper.ts
runtime/
  engine/
    RuntimeEngine.ts
  provider/
    ProviderClient.ts
```

| Path | Owner | Responsibility |
| --- | --- | --- |
| `runs/entry/AgentRunManager.ts` | run entry owner | run creation and lookup |
| `runs/lifecycle/AgentRun.ts` | run lifecycle owner | run state |
| `runs/backend/AgentRunBackend.ts` | adaptation owner | runtime normalization |
| `runtime/engine/RuntimeEngine.ts` | runtime owner | event loop and provider interaction |
| `runtime/provider/ProviderClient.ts` | provider adapter | provider protocol transport |
| `runs/transport/WsEventMapper.ts` | off-spine concern | transport mapping |

This is one good projection of the design into code.
Another layout can also be valid if it keeps the same ownership and structural boundaries readable.

### Why This Is Clean

- The main run execution path stays readable.
- The runtime loop is explicit without replacing the main spine.
- Resume-config interfaces are split by subject instead of guessed from a generic ID.

### Bad Practice To Avoid

`GraphQL -> RuntimeCompositionService -> RuntimeSessionStore -> EventBridge -> SnapshotService -> CodexClient`

Why this degrades:

- off-spine concerns sit on the main line instead of serving it
- there is no obvious main domain subject
- sequencing authority is blurred across generic coordination pieces
- the next engineer has to reconstruct the real flow from fragments

Flat folder shape that often accompanies this smell:

```text
runtime/
  RuntimeCompositionService.ts
  RuntimeSessionStore.ts
  EventBridge.ts
  SnapshotService.ts
  CodexClient.ts
```

Why this folder shape also hurts:

- the folder hides which files are main-line nodes versus off-spine concerns
- runtime control, persistence-ish storage, mapping, and transport are mixed together
- the directory layout stops helping the reader understand the architecture

## Example 3: Event-Driven Agent Runtime With Thin Facade And Internal Worker Loop

### Situation

An external caller posts a user or inter-agent message to an agent.
The public `Agent` surface stays thin.
`AgentRuntime` owns lifecycle and submission, while `AgentWorker` owns the serialized event loop.
Queues, dispatchers, registries, status projection, bootstrap, shutdown, and streaming serve that runtime instead of competing with it.

### Spine Inventory

| Spine ID | Scope | Start | End | Governing Owner | Why It Matters |
| --- | --- | --- | --- | --- | --- |
| DS-151 | `Primary End-to-End` | `Caller / Agent Client` | `Concrete Event Handler` | `AgentRuntime` | main path for request intake into runtime processing |
| DS-152 | `Return-Event` | `Handled / Derived Event` | `External Notifier / Stream Consumer` | `AgentRuntime` | outward event/status visibility |
| DS-153 | `Bounded Local` | `Input Event Queues` | `Handled Event Or Follow-Up Event` | `AgentWorker` | serialized worker loop that materially shapes runtime behavior |

### Primary Execution Spine

`Caller -> Agent -> AgentRuntime -> AgentInputEventQueueManager -> AgentWorker -> WorkerEventDispatcher -> Event Handler`

### Return/Event Spine

`Event Handler / Status Projection -> AgentExternalEventNotifier -> External Stream / Consumer`

### Bounded Local Spine

Parent owner: `AgentWorker`

`Input Event Queues -> AgentWorker.asyncRun() -> WorkerEventDispatcher -> Event Handler -> Derived Event / Next Queue Item`

### Main Domain Subject Nodes

| Node | Role | Ownership |
| --- | --- | --- |
| `Agent` | thin public facade | public entry convenience only; should not own runtime sequencing |
| `AgentRuntime` | governing runtime owner | lifecycle, event submission, outward notifier wiring |
| `AgentWorker` | bounded local owner | serialized worker loop and shutdown path |
| `WorkerEventDispatcher` | dispatch owner inside worker flow | applies status projection and routes each event to a concrete handler |

### Off-Spine Concerns Around The Spine

| Off-Spine Concern | Serves Which Owner | Responsibility |
| --- | --- | --- |
| `AgentInputEventQueueManager` | `AgentWorker` | prioritized queue intake and delivery |
| `EventHandlerRegistry` | `WorkerEventDispatcher` | handler lookup by event type |
| `AgentStatusManager` / status derivation | `AgentRuntime` | runtime-visible status projection |
| `AgentEventStore` | `AgentWorker` | event persistence/history |
| `AgentExternalEventNotifier` | `AgentRuntime` | outward event/status publishing |
| `AgentBootstrapper` | `AgentWorker` | startup sequencing |
| `AgentShutdownOrchestrator` | `AgentWorker` | cleanup and shutdown sequencing |

### Design Lesson

This is a strong example of how a real design can have several spines at once:

- a public request spine
- a return/event spine
- a bounded local worker-loop spine

It also shows an important ownership distinction:
the first public class in the flow (`Agent`) is not automatically the deepest owner.
Sometimes a public facade exists mainly to forward into the true governing owner (`AgentRuntime`), and the bounded local loop owner (`AgentWorker`) sits one level deeper again.
It also shows capability-area reuse:
once the system already has `events/`, `handlers/`, `status/`, `context/`, `streaming/`, `bootstrap-steps/`, and `shutdown-steps`, new off-spine responsibilities in those categories should normally land there instead of becoming new ad hoc helpers.

### Derived Subsystem / Folder / File Mapping

One valid runtime-oriented shared-structure projection:

```text
agent/
  agent.ts
  runtime/
    agent-runtime.ts
    agent-worker.ts
  events/
    agent-events.ts
    agent-input-event-queue-manager.ts
    worker-event-dispatcher.ts
    notifiers.ts
  handlers/
    event-handler-registry.ts
    user-input-message-event-handler.ts
    tool-result-event-handler.ts
  status/
    manager.ts
    status-deriver.ts
  context/
    agent-context.ts
    agent-runtime-state.ts
  streaming/
    agent-event-stream.ts
  bootstrap-steps/
    agent-bootstrapper.ts
  shutdown-steps/
    agent-shutdown-orchestrator.ts
```

Why this folder shape is good:

- `runtime/` keeps the governing runtime owner and the bounded local worker owner together without hiding the distinction between them
- `events/`, `handlers/`, `status/`, `context/`, and `streaming/` are clear off-spine concerns around that runtime
- the layout is not pretending to be one-folder-per-spine-step; it is a readable projection of ownership and runtime depth

### Bad Practice To Avoid

```text
agent/
  Agent.ts
  RuntimeService.ts
  QueueService.ts
  DispatchService.ts
  StatusService.ts
  StreamService.ts
  BootstrapService.ts
  ShutdownService.ts
```

Why this degrades:

- thin facade, governing runtime owner, loop owner, and off-spine concerns collapse into one flat directory
- many generic `...Service` names blur authority
- queues, dispatch, status, and streaming start competing with the runtime instead of clearly serving it
- the bounded local worker-loop spine becomes hard to see

## Example 4: Team Run Orchestration

### Situation

A team run coordinates multiple member runs.
Each member run has its own runtime, but the team run owns the higher-level orchestration and event multiplexing.

### Spine Inventory

| Spine ID | Scope | Start | End | Governing Owner | Why It Matters |
| --- | --- | --- | --- | --- | --- |
| DS-201 | `Primary End-to-End` | `GraphQL / WS / External Input` | `member runtimes` | `TeamRun` | top-level team execution line |
| DS-202 | `Return-Event` | `member runtime events` | `Frontend / Callbacks` | `TeamRun` | team event multiplexing line |

### Primary Execution Spine

`GraphQL / WS / External Input -> AgentTeamRunManager -> TeamRun -> TeamRunBackend -> member AgentRuns -> member backends -> runtime engines / clients`

### Return/Event Spine

`member runtime events -> member backends normalize to AgentRunEvent -> TeamRunBackend multiplexes to TeamRunEvent -> TeamRun -> WS / History / External Callback -> Frontend`

### Main Domain Subject Nodes

| Node | Role | Ownership |
| --- | --- | --- |
| `AgentTeamRunManager` | entry owner | team-run creation and lookup |
| `TeamRun` | orchestration owner | team lifecycle and member coordination |
| `TeamRunBackend` | multiplexing owner | team/backend adaptation and event multiplexing |
| `AgentRun` | member owner | member run lifecycle |

### Interface Boundary Mapping

| Interface | Subject Owned | Identity Shape |
| --- | --- | --- |
| `startTeamRun(teamRunId, teamDefinition)` | `TeamRun` | `teamRunId + definition` |
| `getTeamRun(teamRunId)` | `TeamRun` | `teamRunId` |
| `getTeamMemberRun(teamRunId, memberKey)` | member-in-team | `teamRunId + memberKey` |

### Design Lesson

Do not flatten team-level and member-level boundaries into one generic `run` interface.
The team run and the member run are related, but they are not the same subject.

### Bad Practice To Avoid

`Input -> RunService -> RunBackend -> Runtime`

with one generic interface family like:

- `getRun(runId)`
- `getRunResumeConfig(runId)`
- `listRuns(filter)`

Why this degrades:

- team-level and member-level ownership get mixed together
- caller intent is unclear
- ID meaning becomes ambiguous
- later logic grows around guessing what kind of run the caller meant

## Example 5: Workflow With State Machine

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

## Example 6: Generic List Surface To Avoid

### Situation

A service starts with one endpoint:

`listRuns(filter)`

Over time it starts returning:

- standalone agent runs
- team runs
- team member runs

with different semantics and identity shapes.

### Why This Degrades

- the caller no longer knows what subject it is dealing with
- filters and IDs become ambiguous
- ownership drifts into mapping code and conditionals
- naming becomes weaker over time

### Better Shapes

Split by subject:

- `listAgentRuns(agentFilter)`
- `listTeamRuns(teamFilter)`
- `listTeamMemberRuns(teamRunId, memberFilter)`

Or require an explicit compound selector:

- `listRuns({ subjectType, subjectFilter })`

The key rule is:
do not let a generic list surface become a mixed-subject bag just because it is convenient today.

## Example 7: Current-Schema Runtime With Required Data Migration

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

## Example 8: Schema Contraction With No Data Migration

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

## Example 9: Rejecting An Unreachable Edge Case During Technical Review

### Situation

A desktop application manages settings for multiple server nodes. Selecting a node opens or focuses a separate node-specific window. During window bootstrap, the settings store is bound to that window's node and remains bound for the lifetime of the window.

A settings card saves several values through an existing per-setting update action. Elsewhere in the codebase, a separate mobile-session flow can call `bindNodeContext(...)`, and the store contains a `bindingRevision` field.

A reviewer notices that each setting update can resolve the current client. From those local facts alone, the reviewer imagines that the window could switch from node A to node B in the middle of one save and proposes:

- a captured client for the whole save
- revision fencing
- rebinding state
- partial-result types
- new recovery behavior
- additional localization and tests

Those mechanisms are technically coherent, but the premise must be checked against the supported product journey before they become design requirements.

### Upstream Behavior And Production-Path Map

The approved behavior is to edit settings for the node represented by the current node-specific window. No requirement introduces in-place node switching for that window.

The architecture designer records this basis before review:

| Behavior ID | Kind | Approved Requirement / Intent | Approved Trigger / Contract | Relevant Existing Behavior And Evidence | Approved Change / Preserved Outcome | Target Production Path / Lifecycle And Spine ID(s) |
| --- | --- | --- | --- | --- | --- | --- |
| `BEH-SETTINGS-001` | User | Settings apply to the node represented by the current node-specific window | User opens or focuses one node-specific window | Window creation/focus, bootstrap binding, production callers of `bindNodeContext(...)`, and the settings action show that node identity remains stable for the window lifetime | Preserve node identity while saving the approved setting changes | `DS-SETTINGS-001`: `Node Manager -> node-specific window -> bootstrap binding -> settings card -> existing setting action` |

The architecture reviewer validates this map against the approved requirements, investigation evidence, and current code before applying structural checks. The relevant evidence shows:

- ordinary desktop node selection opens or focuses a node-specific window
- bootstrap binds the store once for that window
- the settings card does not expose an in-window node-switch action
- the only normal `bindNodeContext(...)` caller belongs to a separate mobile-session lifecycle
- `bindingRevision` protects that separate lifecycle; its existence does not prove desktop rebinding

### Material Edge-Case Record

#### `EDGE-SETTINGS-001` — Node binding changes during one multi-setting save

- Related approved requirement or established contract: settings apply to the node represented by the current node-specific window.
- Relevant behavior ID(s): `BEH-SETTINGS-001`.
- Initiating basis kind: `User`.
- Independent product-supported initiating trigger or applicable governing contract: the user opens or focuses one node-specific window.
- Support evidence: the Node Manager exposes that product surface and its window creation/focus path implements the supported user action.
- Forward current or approved target production caller/event path that exercises the initiating basis and reaches the claimed state: `Node Manager -> node-specific window -> bootstrap binding -> settings card -> existing setting action`. No caller on that path invokes node rebinding during save.
- Lifecycle preconditions and material consequence at the claimed point: the window is already bound before the card becomes interactive and remains bound for its lifetime, so the claimed cross-node save consequence cannot occur. A generic binding method, revision field, and separate mobile caller do not change this lifecycle.
- Reachability: `Not Reachable`.
- Review consequence / proportionate response: do not require a revision-fenced save protocol. Reuse the existing setting action, preserve truthful partial-persistence behavior, and stop on the first actual same-node failure when that is the approved behavior.

### Why The Initial Finding Is Invalid

Bad finding shape:

```text
The store can rebind and exposes bindingRevision.
Therefore a multi-setting save can cross nodes.
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

- in-place node switching inside the settings window
- a production event that rebinds the same window while save is active
- concurrent lifecycle behavior that can replace the window's node context

If such a path exists, record its trigger, lifecycle, material consequence, and evidence. Then evaluate whether fencing or recovery is proportionate. Until that evidence exists, classify missing material evidence as `Unclear` rather than assuming either reachability or safety.

### Downstream Code-Review Use

The code reviewer receives the design spec's `BEH-SETTINGS-001` map row and the design review report's `EDGE-SETTINGS-001` decision.

- If the implementation preserves the node-specific window lifecycle, mark the behavior and edge-case decision `Confirmed` by ID without copying the full reasoning.
- If the implementation introduces a real in-window rebinding path, reuse `EDGE-SETTINGS-001`, record the changed evidence, and reclassify it.
- Do not recreate the rejected hypothetical merely because the implementation still contains `bindingRevision` or a generic binding method.

### Design Lesson

Technical review begins from approved behavior and the complete relevant production path. Local capability is not proof of reachability. Persisting the behavior, evidence, and decision makes the reasoning auditable, prevents unsupported complexity, and lets downstream reviewers confirm or challenge the decision when later evidence changes.

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

## How To Use These Examples

- Start from the example whose shape is closest to the current task.
- Reuse the reasoning style, not the exact names.
- Keep the design spine-first.
- Keep ownership explicit.
- Keep off-spine concerns around the spine.
- Keep interface boundaries singular and identity-explicit.
- Distinguish thin public facades from deeper governing owners when both exist.
- Validate edge-case findings against an approved journey, production trigger, and lifecycle; record unreachable or unclear premises instead of designing from isolated technical possibility.
- Choose `Directly Usable — No Migration`, `Discard or Rebuild`, or `Migration Required` before designing migration machinery.
- Let files and any optional module groupings appear after the design story is already clear.
