# Codex Project Guidance

This repository contains agent and team definitions.
The shared project-scoped Codex configuration for the software-engineering workflow now lives in:
- `/Users/normy/autobyteus_org/autobyteus-skills/.codex`

If you need to change the shared workflow-oriented Codex agent setup, update it in `autobyteus-skills`, not here.
Keep the agent and team docs in this repository aligned with the shared `software-engineering-workflow-skill` when that workflow changes.

Use subagents only when the user explicitly asks for subagents, delegation, or parallel agent work.

Parent-agent responsibility:
- The main agent remains responsible for final synthesis, artifact updates, workflow-stage decisions, and final gate decisions.
