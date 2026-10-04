# Product Team Evolution: Code-First Product UI/UX Design Analysis & Refactoring Plan

## 1. Executive Summary & Core Discovery

### The Historical Bottleneck
Traditionally, software design teams relied on static canvas tools (Photoshop → Sketch → Figma) primarily because **human UI/UX designers lacked frontend coding skills**. This created a structural translation gap:
- Static drawings failed to capture responsive box models, flex/grid layouts, scroll containers, and real browser font rendering.
- Complex interface states (hover/active/focus, loading, error, empty, validation feedback, role-based controls) were either omitted or isolated on disconnected artboards.
- Software engineers had to manually translate static vectors into HTML/CSS, leading to interpretation errors and endless debates over "pixel perfection."

### The Agentic Reality: Code as the Native Design Medium
For AI agents, writing frontend code is native, fast, and effortless. Consequently, an AI agent does not need to be artificially restricted to a vector drawing canvas. 
- **Writing runnable frontend code is the most efficient, expressive, and high-fidelity medium for UI/UX design.**
- The browser DOM is the actual design canvas.
- Real CSS, responsive breakpoints, transitions, and state machines are defined and verified in real time.
- The exported screenshots and UI/UX specifications are not speculative mocks; they are **definitive, production-ready visual and interaction targets** that software engineering can implement 1:1.

### The Misconception in Current Framing
The current package in `agent-teams/product-team` repeatedly refers to its work as "product prototyping" or "maintaining a prototype project." This creates two major problems:
1. **Trivialization**: In software engineering, "prototype" often connotes a rough, disposable, or low-fidelity proof-of-concept. Calling the team's output a "prototype" obscures the fact that it produces normative, production-ready UI/UX specifications (`ui-ux-spec.md`).
2. **Inverted Purpose**: It makes maintaining the prototype codebase sound like the team's ultimate objective, when in reality the runnable frontend is merely the **interactive design sandbox/medium** used to explore, test, and capture the approved product UI/UX design.

---

## 2. Evaluation Against Package Design Principles

### Principle 1: Choose the package boundary from the work
- **Team Identity**: **Product Team** (folder retained as `agent-teams/product-team` to preserve backward-compatible routing in mounted Orgs; team name retained as Product Team per user direction).
- **Core Activity / Discipline**: **Code-First Product UI/UX Design** (spanning visual appearance, typography, layout, information architecture, navigation flows, state handling, and interactive feedback).
- **Primary Deliverables**:
  1. **Approved UI/UX Specification (`ui-ux-spec.md`)**: The normative reference screenshots, component tokens, layout specs, and state rules that Software Engineering builds against.
  2. **Interactive UI Reference / Design Sandbox**: The browser-runnable model on lightweight mock data that demonstrates the verified user experience.

### Principle 2: Design responsibilities before files
- **`product_prototyper` (Coordinator)**:
  - Role: **Product UI/UX Designer & Coordinator**.
  - Responsibilities: Owns UI/UX design exploration, layout hierarchy, interaction flows, user journey testing, normative reference screenshot capture, user confirmation, and authoring `ui-ux-spec.md`.
- **`prototype_bootstrapper` (Member)**:
  - Role: **UI Baseline Bootstrapper**.
  - Responsibilities: Rapidly stands up or refreshes an accurate, browser-runnable current-experience baseline with UI parity to the existing product frontend, giving the designer a truthful canvas to work on.

### Principle 3: Give each rule one authoritative file
- `team.md`: Defines the Product Team, its code-first design mission, member roles, and high-level cooperation.
- `shared/product-design-principles.md`: The canonical principles document explaining *why* we design in code (browser DOM as the highest-fidelity design medium for AI agents), what the UI model contains (mock data, scripted outcomes), UI parity, and verification.
- Member `SKILL.md` files: Step-by-step specialist procedures for evolving the design, exploring abstract concepts, and bootstrapping baselines.

### Principle 4: Apply one authoring standard
- Eliminate defensive legacy phrasing (such as "call it the product prototype, never a UI project") that was born out of fear of confusion with the production repo.
- Replace with clear domain terminology: **Interactive UI Reference / Design Sandbox** vs. **Production Frontend Application**.

---

## 3. Detailed Refactoring Plan

| File | Target Improvements |
| :--- | :--- |
| `agent-teams/product-team/team.md` | • Name retained as `Product Team`.<br>• Elevate mission statement to code-first Product UI/UX Design.<br>• Clarify that runnable code is the design medium, and `ui-ux-spec.md` is the primary contract for engineering. |
| `agent-teams/product-team/shared/product-design-principles.md` | • Renamed from `product-prototype-principles.md` to eliminate legacy "prototype" framing in file naming.<br>• Add architectural rationale in Section 1: why code is the native design medium for AI agents.<br>• Define the dual deliverables: Approved UI/UX Specification (`ui-ux-spec.md`) + Interactive UI Reference.<br>• Refine terminology from "prototype project maintenance" to "interactive design sandbox". |
| `agent-teams/product-team/agents/product-prototyper/agent.md` | • Clarify role as Product UI/UX Designer and coordinator.<br>• Explicitly state ownership of user experience, interaction flows, visual standards, and `ui-ux-spec.md`. |
| `agent-teams/product-team/agents/prototype-bootstrapper/agent.md` | • Clarify role as UI Baseline Bootstrapper establishing the current-experience interactive canvas. |
| Member Skills (`product-experience-prototyper`, `exploratory-requirements-visualizer`, `prototype-bootstrapper`) | • Align purpose and description statements to code-first UI/UX design exploration and specification. |

---

## 4. Preservation & Non-Goals

1. **Preserve External Routing**: The folder name `agent-teams/product-team` and member addresses `/product_team/product_prototyper` and `/product_team/prototype_bootstrapper` remain unchanged so all parent organization mounts (`autobyteus-org`, `software-development-department`) continue to resolve without breaking changes.
   - *Superseded during this ticket:* the members were later renamed to `product_ui_ux_designer` and `ui_baseline_bootstrapper`, and both parent orgs' routes were updated to the new addresses.
2. **Preserve Operational Safety**: Strict separation between the interactive design sandbox and the production repository is strictly maintained (separate git worktree/repo, lightweight synthetic mock data only, no live backend credentials or production writes).
3. **Preserve Approval Authority**: The user remains the sole approval authority for future-state UI/UX designs before final reference screenshots and `ui-ux-spec.md` become normative for downstream engineering.

---

## 5. UI/UX Specification Template Evaluation & Upgrade Plan

### Assessment of Current `ui-ux-spec-template.md`
- **Strengths**: High rigor in traceability, state machine modeling, and normative vs illustrative visual boundaries.
- **Shortcomings under Human UI/UX Craft Standards**:
  1. *Flat table vs. Spatial hierarchy*: Squeezing layout and anatomy into a table cell fails to capture spatial hierarchy, z-index layering, and visual weight.
  2. *Missing Design Rationale*: Captures "what" is on screen but misses "why" choices were made (trade-offs, user mental model).
  3. *Unstructured placeholders*: Empty headers for responsive breakpoints, accessibility, and form validation leave critical engineering requirements unguided.
  4. *Abstract styling vs. Code-first tokens*: Lacks structured design tokens (colors, type scale, spacing) and component manifest (Vue/React files built in sandbox).
  5. *UX Writing / Micro-copy omission*: Missing action grammar, empty state formula, and actionable error message standards.

### Upgrade Scope for `ui-ux-spec-template.md`
1. **Design Rationale & Trade-offs**: Document core user intent and why the chosen pattern was selected over alternatives.
2. **Page Anatomy & Spatial Hierarchy**: Structural breakdown (Base canvas, sticky bars, modals, drawers, visual focal points).
3. **Design Tokens & Component Manifest**: Semantic color roles, typography scale, spacing grid, and code components in sandbox.
4. **Structured Form & Input Validation Matrix**: Field, input type, required, validation rules, trigger timing, and exact error message.
5. **Responsive Breakpoints & Ergonomics Matrix**: Viewports (`<640px`, `640-1024px`, `>1024px`), navigation adaptation, touch targets ($\ge 44\text{px}$).
6. **Accessibility (a11y) & Keyboard Navigation**: Focus order, modal focus trap, keyboard shortcuts (`Tab`, `Esc`, `Enter`), ARIA roles, WCAG AA contrast.
7. **UX Writing & Micro-copy Standards**: Button action grammar, empty state 3-part formula (icon + explanation + CTA), problem+remedy error copy.
8. **Terminology Harmonization**: Update remaining "prototype-owned" phrasing to "Interactive UI Reference / Design Sandbox".
