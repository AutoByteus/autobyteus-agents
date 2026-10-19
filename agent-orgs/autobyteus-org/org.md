---
name: AutoByteus Org
description: How AutoByteus is run. The user works with the Project Task Manager, which plans the work as Project Tasks and delegates each to the Software Engineering Team, the Product Team, the Marketing Team, or the Agent Package Creator, and tracks it to completion.
category: product-and-software
---

AutoByteus Org is how AutoByteus is run. The user talks to the Project Task
Manager; it turns requests into Project Tasks and delegates each one, by its
kind, to the member that does that work. Every delegated result comes back to
the Project Task Manager.

## Members

| Member | Owns |
| --- | --- |
| `project_task_manager` (Project Task Manager) | The user's entry point. Plans requests as right-sized Project Tasks with dependencies, keeps the boards, delegates each Task with the user's approval, verifies delivery claims (merge, release, cleanup), and closes Tasks. It does not design or build. |
| `software_engineering_team` | Product code and tests: requirements, design, implementation, review, validation, delivery. |
| `product_team` | Product experience and UI/UX design in runnable UI references. |
| `marketing_team` | Channel-native marketing content and its publication. |
| `agent_package_creator` (Agent Package Creator) | The agent packages: skills, agents, Teams, and this Org, including the Project Task Manager's own package. |

All five are shared definitions in this repository; the Org mounts them and does
not copy or change them. Account-specific marketing data lives in the workspace
the Marketing Team runs in.

## How work flows

1. **The user talks to the Project Task Manager.** Launch the Org and work with
   `project_task_manager`; the Org has no other entry point.
2. **The Project Task Manager delegates each Task by its kind:**
   - software changes → `software_engineering_team`;
   - design → `product_team`;
   - marketing → `marketing_team`;
   - agent packages, including a problem in how any member works →
     `agent_package_creator`.
3. **Results come back to the Project Task Manager.** The Org's handoff rules
   route each delegated result to `/project_task_manager`: a verified delivery
   from the Solution Designer, a design result, a finished marketing Task, a
   package result. It checks the result against the Task's done criteria and
   the user's checks, then closes the Task.
4. **Work one member needs from another goes through the Project Task
   Manager.** A design for a software Task, a product claim for a marketing
   draft, marketing for a release: the member sends the need to
   `/project_task_manager`, which delegates it and passes the result back to
   the asking member by its run ID. Delegated work runs in its own copy, which
   only its run ID reaches, so the Project Task Manager, which holds those run
   IDs, routes it.
5. **Decisions and follow-ups.** Members ask the user directly for decisions.
   Problems they find outside their Task (what is wrong, where, the evidence,
   why it is outside the Task, a suggested Task) go to the Project Task
   Manager, which records them as Tasks.
6. **The Agent Package Creator maintains the members' packages** (skills,
   handoff rules, templates) when the Project Task Manager delegates a package
   Task. It is not part of the other members' delivery flow. It opens a pull
   request; the user merges it, and the Creator then updates the user's local
   checkout, keeping uncommitted edits.

## What the Org owns

- **Only the routes between members:** the rules in
  [org-config.json](org-config.json) that send results and needs to the
  Project Task Manager.
- **Each member keeps the rest:** each Team's coordinator and internal routes in
  its `team-config.json`, each member's work in its own skills, and the Project
  Task Manager's planning and delegation in its own package.
- **Handoff protocol:** before sending a result across members, a member calls
  `get_handoff_rules`, applies every matching rule, and sends to each exact
  returned `recipient_address`. When no rule matches, it returns the result to
  the user or caller.
