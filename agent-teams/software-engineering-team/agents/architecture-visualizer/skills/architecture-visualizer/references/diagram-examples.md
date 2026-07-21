# Architecture Diagram Examples

These examples show complementary views of one small ordering system. Adapt their level and shape to the actual solution package; do not copy the example domain or create every view by default.

## Contents

- [Typical Diagram Set](#typical-diagram-set)
- [Subsystem, Component, and Ownership Map](#example-1-subsystem-component-and-ownership-map)
- [Business Use-Case Sequence](#example-2-business-use-case-sequence)
- [Focused Interface Boundary](#example-3-focused-interface-boundary)
- [Conditional Lifecycle View](#example-4-conditional-lifecycle-view)

## Typical Diagram Set

| Priority | View | Question answered | When to include |
|---|---|---|---|
| 1 | Subsystem/component ownership map | What exists, what does each part own, and where are the boundaries? | Default first view whenever visualization is requested |
| 2 | Business interaction sequence | How do the responsible parts collaborate for an important use case or data-flow spine? | When the behavior crosses owners or its interaction order matters |
| 3 | Focused interface or event boundary | What contract connects two owners? | Only when the contract itself needs clarification beyond labels in the first two views |
| 4 | State, data, deployment, or local-flow view | What additional structure governs this particular design? | Only when the solution depends materially on it or the user asks for it |

## Example 1: Subsystem, Component, and Ownership Map

This is the normal starting point. Subgraphs establish subsystem ownership, nodes state component responsibility, and edge labels name important contracts.

```mermaid
flowchart LR
    customer["Customer"]

    subgraph experience["Customer Experience — owns interaction"]
        checkout["Checkout UI<br/>Collects order intent and presents status"]
    end

    subgraph ordering["Ordering — owns order lifecycle"]
        order_api["Order API<br/>Request boundary"]
        order_service["Order Service<br/>Validates and coordinates orders"]
    end

    subgraph payments["Payments — owns authorization"]
        payments_api["Payments API<br/>Authorization contract"]
        provider_adapter["Provider Adapter<br/>External payment integration"]
    end

    fulfillment["Fulfillment<br/>Owns dispatch"]
    provider["External Payment Provider"]

    customer --> checkout
    checkout -- "PlaceOrder" --> order_api
    order_api --> order_service
    order_service -- "AuthorizePayment" --> payments_api
    payments_api --> provider_adapter
    provider_adapter --> provider
    order_service -- "OrderPlaced event" --> fulfillment
```

The diagram deliberately omits classes, database tables, and helper calls. Its purpose is to make responsibilities, ownership, and major dependencies legible.

## Example 2: Business Use-Case Sequence

This view follows one primary data-flow spine across the owners from the first diagram. Messages name business interactions and contracts rather than every internal call.

```mermaid
sequenceDiagram
    actor Customer
    participant UI as Checkout UI
    participant Orders as Order Service
    participant Payments as Payments API
    participant Events as Event Channel
    participant Fulfillment

    Customer->>UI: Place order
    UI->>Orders: PlaceOrder
    Orders->>Payments: AuthorizePayment
    alt Payment authorized
        Payments-->>Orders: Authorization reference
        Orders->>Orders: Persist confirmed order
        Orders-->>Events: Publish OrderPlaced
        Events-->>Fulfillment: Deliver OrderPlaced
        Orders-->>UI: Order accepted
        UI-->>Customer: Show confirmation
    else Payment declined
        Payments-->>Orders: Decline reason
        Orders-->>UI: Order rejected
        UI-->>Customer: Show payment guidance
    end
```

Create another sequence only when another use case has a materially different spine. Do not make one sequence per acceptance criterion when the interaction shape is the same.

## Example 3: Focused Interface Boundary

Most interfaces should remain labels in the structural and sequence views. Use a focused diagram only when the boundary itself is architecturally important.

```mermaid
flowchart LR
    order_service["Order Service<br/>Contract consumer"]
    payment_contract["Payments API<br/>authorize intent → authorization result"]
    payment_service["Payment Service<br/>Contract owner"]
    provider_adapter["Provider Adapter<br/>External protocol isolation"]

    order_service -- "business request" --> payment_contract
    payment_contract --> payment_service
    payment_service --> provider_adapter
```

The reading notes should identify the contract owner, semantic input and outcome, and the dependency direction. Avoid expanding the diagram into method signatures or payload fields unless those details define the architectural boundary.

## Example 4: Conditional Lifecycle View

Add a state diagram only when lifecycle rules materially affect the design. It complements rather than replaces the ownership and sequence views.

```mermaid
stateDiagram-v2
    [*] --> PendingPayment: Order accepted
    PendingPayment --> Confirmed: Authorization succeeds
    PendingPayment --> Rejected: Authorization fails
    Confirmed --> FulfillmentRequested: OrderPlaced delivered
    Rejected --> [*]
    FulfillmentRequested --> [*]
```

Data/entity, deployment/runtime, and bounded-local-flow diagrams follow the same rule: include them only when they answer an important question that the structural and sequence views do not already answer.
