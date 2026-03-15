# Spine-First Design Examples

These examples are not rigid templates.
Use them to learn how a good design spec can read when the architecture is organized around:

- data-flow spine inventory
- main domain subject nodes
- ownership
- support structure around the spine
- interface boundaries with explicit identity shape
- derived module/file placement

Do not copy these literally.
Use them to recognize the shape of a clear design.
This file includes both good examples and bad-practice anti-examples.

## Example 1: CRUD / Request Flow

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

`OrderRepository -> OrderApplicationService -> OrderPresenter -> Frontend`

### Main Domain Subject Nodes

| Node | Role | Ownership |
| --- | --- | --- |
| `OrderController` | request boundary | request parsing and transport handoff |
| `OrderApplicationService` | use-case owner | orchestration of order creation use case |
| `Order` | domain owner | invariants, business rules, state transitions |
| `OrderRepository` | persistence boundary | storage contract fulfillment |

### Support Structure Around The Spine

| Support Branch | Serves Which Owner | Responsibility |
| --- | --- | --- |
| `AuthPolicy` | `OrderController` | request authorization |
| `RequestValidator` | `OrderController` | input validation |
| `AuditLogger` | `OrderApplicationService` | audit recording |
| `MetricsPublisher` | `OrderApplicationService` | metrics emission |

### Interface Boundary Mapping

| Interface | Subject Owned | Identity Shape | Note |
| --- | --- | --- | --- |
| `createOrder(customerId, orderDraft)` | `Order` | `customerId + orderDraft` | clear create boundary |
| `getOrder(orderId)` | `Order` | `orderId` | explicit order identity |

### Derived Module/File Mapping

| Module/File | Owner | Responsibility |
| --- | --- | --- |
| `orders/OrderController.ts` | request boundary | HTTP/API transport entry |
| `orders/OrderApplicationService.ts` | use-case owner | orchestration |
| `orders/domain/Order.ts` | domain owner | rules and invariants |
| `orders/persistence/OrderRepository.ts` | persistence boundary | storage contract |
| `orders/presentation/OrderPresenter.ts` | support branch | response mapping |

### Why This Is Clean

- The request path is easy to draw.
- The domain aggregate owns business rules instead of helpers or repositories.
- The support pieces help the main flow but do not replace it.
- The interfaces are subject-specific and identity-specific.

### Bad Practice To Avoid

`Frontend -> OrderController -> OrderService -> ValidationHelper -> PricingHelper -> PersistenceHelper -> Repository`

Why this degrades:

- helpers start owning real business behavior
- the main domain subject becomes hard to find
- ownership is fragmented across utility-style pieces
- the request path becomes harder to reason about

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

### Support Structure Around The Spine

| Support Branch | Serves Which Owner | Responsibility |
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

### Derived Module/File Mapping

| Module/File | Owner | Responsibility |
| --- | --- | --- |
| `runs/AgentRunManager.ts` | run entry owner | run creation and lookup |
| `runs/AgentRun.ts` | run lifecycle owner | run state |
| `runs/AgentRunBackend.ts` | adaptation owner | runtime normalization |
| `runtime/RuntimeEngine.ts` | runtime owner | event loop and provider interaction |
| `runtime/ProviderClient.ts` | support/adapter | provider protocol transport |
| `runs/WsEventMapper.ts` | support branch | transport mapping |

### Why This Is Clean

- The main run execution path stays readable.
- The runtime loop is explicit without replacing the main spine.
- Resume-config interfaces are split by subject instead of guessed from a generic ID.

### Bad Practice To Avoid

`GraphQL -> RuntimeCompositionService -> RuntimeSessionStore -> EventBridge -> SnapshotService -> CodexClient`

Why this degrades:

- support services sit on the main line instead of serving it
- there is no obvious main domain subject
- sequencing authority is blurred across generic coordination pieces
- the next engineer has to reconstruct the real flow from fragments

## Example 3: Team Run Orchestration

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

### Support Structure Around The Spine

| Support Branch | Serves Which Owner | Responsibility |
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

## Example 5: Generic List Surface To Avoid

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
- support pieces compete with the main flow
- debugging and change analysis become expensive

Better direction:

- restore a readable spine
- attach support branches to clear owners on that spine

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
- support responsibilities stop being explicit
- the design looks spine-first on paper but is not truly decomposed

Better direction:

- keep the node as the owner of core sequencing
- split support concerns around it under clear ownership

## How To Use These Examples

- Start from the example whose shape is closest to the current task.
- Reuse the reasoning style, not the exact names.
- Keep the design spine-first.
- Keep ownership explicit.
- Keep support branches around the spine.
- Keep interface boundaries singular and identity-explicit.
- Let files/modules appear after the design story is already clear.
