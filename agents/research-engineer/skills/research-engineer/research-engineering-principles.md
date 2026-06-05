# Research Engineering Principles

## Purpose

Research engineering work optimizes for understanding, evidence, and iteration speed.
The core loop is investigate, plan, execute, evaluate, analyze, then decide the next research move.
That loop is recursive: each cycle may change the interpretation, plan, implementation, instrumentation, parameters, benchmark, evidence standard, or even the research question.

Research engineering is also a writing-heavy workflow. The engineer should continuously write down what they are thinking, planning, expecting, observing, rejecting, and changing. Notes are not a polish step after the work; they are part of doing the work. They keep the research recoverable when an experiment fails, a paper detail is ambiguous, or the next loop depends on why an earlier choice was made.

This differs from a production software-engineering workflow:

- the codebase may be small, experimental, or notebook-like
- the hardest part may be interpreting a paper, algorithm, metric, or failure mode
- implementation, validation, literature review, setup work, and analysis often inform each other in short loops
- validation may mean preparing data, running a training or fine-tuning job, monitoring checkpoints, evaluating metrics, and changing parameters rather than writing conventional software tests
- correctness depends on source faithfulness, reproducibility, and empirical evidence, not only clean code
- the final output is often a research conclusion, prototype, benchmark report, or next experiment plan rather than a release

For deep learning work, most of the effort usually goes into:

- understanding the method, objective, assumptions, and missing paper details
- making data, metrics, losses, tensor shapes, training dynamics, and evaluation behavior observable
- deciding what data to use, how to preprocess it, how long to train, when to evaluate, and which checkpoints matter
- debugging training instability, underfitting, overfitting, data leakage, metric mismatch, numerical issues, and reproduction gaps
- designing ablations and baselines that isolate the real cause
- interpreting results honestly, including negative or inconclusive runs

The implementation may be short, but the research loop around it is not.

Research engineering can also include local setup and bring-up work:

- installing or configuring research dependencies
- reproducing vendor or reference-repository examples
- fixing environment, build, CUDA, package, data-path, or runtime errors
- adjusting parameters when a first run is unstable, too expensive, or not measuring the intended behavior
- managing long-running jobs by recording checkpoints, partial metrics, cancellation reasons, and restart decisions
- rerunning with better instrumentation after a failure reveals a missing observable

Research source gathering is intentionally broad. Depending on the task and user constraints, the engineer may use supplied materials, internet search, scholarly indexes, paper PDFs, preprints, project websites, documentation, benchmarks, datasets, issue trackers, release notes, reference repositories, examples, forum or discussion threads, local files, code inspection, small scripts, simulations, probes, and empirical runs. The right method is whichever produces reliable evidence for the research question within the allowed time, access, privacy, and dependency limits.

## Operating Rules

- Start from the research question, not from code structure.
- Keep `research-notes.md` open as the working notebook. Record assumptions, open questions, paper interpretation notes, plan changes, implementation observations, expected experiment outcomes, failures, and next-step reasoning as they happen.
- Choose source-gathering methods deliberately. Use web search, paper retrieval, website review, documentation reading, repository inspection, dataset or benchmark review, local probing, or experiments as needed, and record what was searched or skipped.
- Track all material sources in `source-index.md`, including supplied files, URLs, papers, PDFs, repositories, datasets, benchmarks, documentation pages, and local result artifacts.
- Respect user constraints and access boundaries. Do not download or use sources, datasets, or code when the user forbids internet use, dependency changes, licensing risk, private data exposure, or large local artifacts.
- Create a research plan before deep execution. The plan should choose the right track for the task: literature synthesis, paper reproduction, conceptual explanation, mathematical analysis, local setup, implementation, simulation, empirical benchmark, training/fine-tuning, or some combination.
- Before running an experiment, write what you expect to learn, what outcomes would support or weaken the claim, and what failure modes to watch for.
- After running an experiment, write the observed result, immediate interpretation, confounders, and next decision before moving on to another run.
- Separate paper-faithful reproduction from exploratory improvement. Mark which mode applies.
- Preserve source uncertainty. If a paper, blog, repository, benchmark, or dataset does not support a claim, say so.
- Prefer a minimal faithful prototype over a large framework when the task is to understand or validate an idea.
- Keep implementation decisions traceable to equations, algorithm steps, model architecture, dataset requirements, or experiment goals.
- Record environment, seeds, dataset versions, model checkpoints, command lines, dependency versions, hardware assumptions when material, and raw result locations.
- Treat benchmarks as evidence with limits. Report run count, variance when available, metric definition, comparison baseline, and known confounders.
- For training or fine-tuning work, record data source, preprocessing, split strategy, epochs or steps, batch size, learning rate, optimizer, checkpoint cadence, early-stop or cancellation criteria, and benchmark/evaluation cadence when material.
- Use smoke tests to catch broken implementations, but do not confuse smoke tests with empirical validation.
- Preserve negative results. Failed runs, unstable training, worse metrics, and mismatched reproduction results are research evidence.
- Prefer explicit next-loop decisions over vague recommendations.
- Keep a loop log. Each meaningful cycle should record the question, change, run, observation, interpretation, and next decision.
- Let evidence revise the plan. A good research run may end by changing the experiment design, adding instrumentation, rejecting a paper target, simplifying the implementation, or reframing the question.
- When the user asks for understanding support, create a concrete explanatory artifact rather than only prose in chat. A static HTML page is appropriate when diagrams, tables, side-by-side comparisons, training curves, architecture walkthroughs, or interactive controls would make the method easier to understand.

## Default Artifacts

- `research-brief.md`: objective, scope, source basis, user constraints, expected output, and decision criteria.
- `research-notes.md`: continuous working notes for assumptions, source reading, planning thoughts, implementation observations, expected experiment outcomes, failures, interpretation changes, and next-step reasoning.
- `source-index.md`: durable list of supplied and discovered sources, including papers, PDFs, web pages, repositories, documentation, datasets, benchmarks, local files, generated artifacts, credibility notes, access constraints, and relevance.
- `literature-review.md`: ranked source comparison, selection rationale, rejected options, and evidence for why one paper or method should be implemented.
- `paper-analysis.md`: paper or method breakdown, assumptions, equations or algorithm steps, reproduction targets, uncertainty, and implementation implications.
- `research-plan.md`: chosen execution track, rationale, evidence needed, artifacts to produce, loop rules, risks, stop conditions, and review expectations.
- `experiment-plan.md`: datasets, preprocessing, baselines, metrics, training or fine-tuning runs, benchmark commands, budgets, ablations, checkpoint cadence, stop conditions, and expected evidence.
- `research-loop-log.md`: chronological record of research cycles, failed attempts, adjustments, reruns, and decisions.
- `implementation-handoff.md`: changed files, algorithm mapping, instrumentation, local checks, known gaps, and how to run the implementation.
- `experiment-report.md`: executed runs, raw result paths, metrics, plots or tables when useful, analysis, failure modes, and reproducibility status.
- `research-decision-log.md`: final or loop-level decision, evidence basis, next experiment, and user-facing conclusion.
- `research-explainer.html`: optional illustrative explanation artifact for the user, grounded in the same research and experiment package.

## Quality Bar

A research package is ready only when:

- the objective and mode are explicit: understand, reproduce, implement, improve, benchmark, or teach
- the research plan matches the actual task instead of forcing a neural-network or software-delivery template
- the source interpretation is traceable
- the note trail explains important assumptions, plan changes, experiment expectations, observations, and interpretation changes
- the implementation matches the stated interpretation or clearly marks intentional deviations
- the experiment plan can actually test the claim being made
- loop changes are recorded with reasons instead of hidden in chat context
- results are reproducible enough for the task's risk level
- conclusions distinguish observed evidence from speculation
- next steps are concrete when the work remains open
- explanatory artifacts distinguish source-backed mechanisms, implementation choices, observed results, and open hypotheses
