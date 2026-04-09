# Codex Project Guidance

This repository contains agent and team definitions.

Relationship to `autobyteus-skills`:
- Some software-engineering agents in this repository were originally derived from the software-engineering workflow skill.
- `autobyteus-agents` and `autobyteus-skills` are related but independent repositories.
- Changes in this repository are local unless the user explicitly asks to synchronize corresponding changes in another project.

Current task scope rule:
- Unless the user explicitly says otherwise, update only the current repository.
- For software-engineering team changes in this repo, treat `autobyteus-agents` as the source of truth for the current task.

Use subagents only when the user explicitly asks for subagents, delegation, or parallel agent work.

Parent-agent responsibility:
- The main agent remains responsible for final synthesis, artifact updates, workflow-stage decisions, and final gate decisions.
