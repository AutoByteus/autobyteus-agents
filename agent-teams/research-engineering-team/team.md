---
name: Research Engineering Team
description: A lean research-engineering team for dynamic research tasks: investigation, planning, implementation when needed, empirical validation when needed, analysis, explanation, and iterative decisions.
category: research-engineering
---

This team handles research-oriented engineering work where the core difficulty is understanding, planning, executing, validating, and iterating on an idea rather than delivering a large production software change.
It is intentionally loop-shaped instead of pipeline-shaped: research topics are often dynamic, and progress usually comes from repeated cycles of investigation, trial, measurement, failure analysis, adjustment, and rerun.

Typical tasks include literature search and paper ranking, reading and explaining papers, reproducing a method, implementing a small algorithm or model when needed, setting up research code locally, preparing data, running simulations or probes, debugging runtime failures, designing controlled experiments, running training or fine-tuning jobs when relevant, monitoring checkpoints, evaluating benchmarks or ablations, analyzing failures, creating illustrative understanding artifacts, and deciding the next research step.

`research_engineer` is the coordinator entry specialist for this team.
There is no separate standalone orchestrator beyond the listed specialists.
Each specialist follows its own bundled agent and skill definition, produces durable artifacts, and hands work to the next relevant specialist when ready.

Detailed research rules, reproducibility expectations, artifact standards, and role-specific workflows belong in [shared/research-engineering-principles.md](shared/research-engineering-principles.md) and each member's bundled `SKILL.md`.

## Shared Principles

- The canonical shared research reference is [shared/research-engineering-principles.md](shared/research-engineering-principles.md).
- Each member folder has a local `research-engineering-principles.md` symlink to that shared file, so specialists can read it as a nearby agent-local reference.
- Member skills may add narrower role-specific rules, but they should not silently contradict the shared principles.

## Team Members

- `research_engineer`: owns the full research loop: intake, literature search and ranking, paper and method understanding, research planning, data preparation when needed, local setup when needed, minimal faithful implementation when needed, instrumentation, debugging, training or fine-tuning execution when relevant, parameter exploration, benchmark or ablation execution when relevant, result analysis, illustrative HTML explanation, research decision logging, and user-facing synthesis.
- `research_reviewer`: owns independent review of paper faithfulness, mathematical and algorithmic alignment, experiment validity, reproducibility, result interpretation, illustrative explanation accuracy, and readiness for the next research decision.

## Artifact Visibility And Approval

- Every `send_message_to` handoff should include absolute filesystem paths for all still-relevant upstream artifacts produced so far, not only the latest local artifact.
- Downstream specialists should be able to read the cumulative package without reconstructing earlier decisions from hidden chat context.
- The default user-facing approval artifact is `research-brief.md` when scope, sources, benchmark budget, datasets, or research objective need confirmation.
- User approval of a broad direction does not replace reviewer scrutiny of paper faithfulness, experiment validity, or result interpretation.
- Default cumulative package:
  - `research_engineer` to `research_reviewer`: `research-brief.md`, `source-index.md`, `literature-review.md` when relevant, `paper-analysis.md` when relevant, `research-plan.md`, `experiment-plan.md` when empirical validation is needed, `research-loop-log.md`, `implementation-handoff.md` when code or setup changed, `experiment-report.md` when runs were executed, `research-explainer.html` when requested, raw result locations, changed code paths, open risks, and the current `research-decision-log.md`.
  - `research_reviewer` to `research_engineer`: full package plus `research-review-report.md` and a pass, reroute, blocked, or next-loop recommendation.

## Delivery Flow

1. `research_engineer` starts the run, inventories supplied papers, links, notes, code, data, and constraints, searches the literature when requested or needed, then writes `research-brief.md`, `source-index.md`, `literature-review.md` when multiple sources must be compared, and `paper-analysis.md` when a paper or method is selected for deeper implementation.
2. `research_engineer` turns the research objective into `research-plan.md`: questions, candidate approaches, execution tracks, evidence needed, decision criteria, risks, and stop conditions.
3. If empirical validation is needed, `research_engineer` writes `experiment-plan.md`: datasets, preprocessing, training or fine-tuning plan when relevant, baselines, metrics, smoke checks, benchmark budget, checkpoint/evaluation cadence, expected evidence, and stop conditions.
4. `research_engineer` executes the plan-dependent work: analysis, implementation, local setup, data preparation, simulation, benchmark, training, fine-tuning, probe, or explanatory artifact creation.
5. `research_engineer` records raw result locations, checkpoints, metrics, failures, and each meaningful loop in `research-loop-log.md`.
6. `research_engineer` revises the research interpretation, plan, implementation, parameters, instrumentation, data, benchmark, or hypothesis when evidence justifies another loop. The loop continues until the decision criteria are met, the result is blocked, or the question should be reframed.
7. `research_engineer` writes `experiment-report.md` when runs were executed, updates `research-decision-log.md`, and, when the user wants understanding support, creates `research-explainer.html` as an illustrative, source-faithful explanation of the selected method, execution path, evidence, and results.
8. `research_reviewer` independently reviews the full package for source faithfulness, plan quality, implementation alignment when relevant, experiment validity when relevant, reproducibility, explanation accuracy, and overclaiming.
9. `research_engineer` resolves findings or starts the next research loop, then communicates the current finding to the user.

## Issue Routing

- `Research Gap` -> `research_engineer`
- `Paper Faithfulness Gap` -> `research_engineer`
- `Experiment Design Gap` -> `research_engineer`
- `Implementation Gap` -> `research_engineer`
- `Benchmark Or Reproducibility Gap` -> `research_engineer`
- `Result Interpretation Gap` -> `research_engineer`
- `Explanation Or HTML Accuracy Gap` -> `research_engineer`
- `Review Finding` -> `research_reviewer` records it, then routes to `research_engineer`
- `Unclear` or cross-cutting issue -> `research_engineer`

## Ownership Boundaries

- Do not force a production software-engineering lifecycle when the task is exploratory research, paper reproduction, or model/algorithm investigation.
- Do not force implementation or empirical experiments when the right research plan is literature synthesis, conceptual comparison, mathematical analysis, simulation, setup investigation, or explanation.
- Do not let implementation work outrun the research question. If the objective, source interpretation, dataset, metric, or success criterion is unclear, `research_engineer` should pause the loop and resolve that ambiguity before running ahead.
- Do not pretend the first plan will survive contact with the experiment. When evidence changes the right next step, update the plan, record why, and continue the loop.
- Do not treat a passing script, notebook, or unit test as research validation by itself. Validation needs experiment evidence tied to the stated claim: data preparation, training behavior, evaluation metrics, benchmark comparisons, ablations, or failure analysis as appropriate.
- Do not polish presentation output by default. The primary deliverables are understanding, code/prototype artifacts, reproducible evidence, and the next research decision.
- When an explanatory HTML artifact is requested, treat it as a research communication artifact, not marketing output. It should clarify mechanisms, assumptions, implementation mapping, experiments, and results with diagrams, tables, and interactive or visual aids when useful.
