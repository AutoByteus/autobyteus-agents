---
name: research-engineer
description: Run the full research-engineering loop from paper or method understanding through minimal implementation, experiments, analysis, and next-loop decisions.
---

# Research Engineer

Use this skill for research-oriented engineering work where investigation, implementation, validation, and analysis are tightly coupled.

## You Own

- research intake and objective framing
- continuous research note-taking during planning, implementation, experiments, debugging, and analysis
- supplied paper, link, note, dataset, code, and constraint inventory
- broad source discovery across web search, papers, PDFs, websites, documentation, repositories, datasets, benchmarks, local files, and generated artifacts
- literature search and source ranking when the task asks to find or choose papers
- paper, PDF, repository, dataset, or benchmark retrieval when allowed by user constraints and access rules
- source reading and paper or method understanding
- claim boundaries and uncertainty
- research planning and execution-track selection
- experiment design and metric selection when empirical validation is needed
- data preparation and evaluation setup
- minimal faithful implementation
- local environment setup and research-code bring-up
- model, loss, optimizer, data, evaluation, and logging hooks needed by the experiment plan
- smoke checks, training or fine-tuning runs, benchmark runs, ablations, and probes
- recursive loop management across research, implementation, debugging, tuning, and validation
- result analysis and failure interpretation
- illustrative HTML explanation when requested
- research decision logging
- self-review of source faithfulness, implementation alignment, experiment validity, reproducibility, and conclusion strength

## Required Shared Read

- Start by reading [research-engineering-principles.md](research-engineering-principles.md).
- Use it as the shared reference for deep-learning effort distribution, minimal prototypes, reproducibility, negative results, and evidence quality.

## Produced Artifacts

Use:

- [research-brief-template.md](templates/research-brief-template.md)
- [research-notes-template.md](templates/research-notes-template.md)
- [source-index-template.md](templates/source-index-template.md)
- [literature-review-template.md](templates/literature-review-template.md)
- [paper-analysis-template.md](templates/paper-analysis-template.md)
- [research-plan-template.md](templates/research-plan-template.md)
- [experiment-plan-template.md](templates/experiment-plan-template.md)
- [research-loop-log-template.md](templates/research-loop-log-template.md)
- [implementation-handoff-template.md](templates/implementation-handoff-template.md)
- [experiment-report-template.md](templates/experiment-report-template.md)
- [research-decision-log-template.md](templates/research-decision-log-template.md)

Produce these files in the project work folder when relevant:

- `research-brief.md`
- `research-notes.md`
- `source-index.md`
- `literature-review.md`
- `paper-analysis.md`
- `research-plan.md`
- `experiment-plan.md`
- `implementation-handoff.md`
- `research-loop-log.md`
- `experiment-report.md`
- `research-decision-log.md`
- `research-explainer.html` when requested

## Workflow

### Step 1 - Establish the research frame

Create or reuse a durable project folder in the active workspace.
Create or update `research-notes.md` at the start of the run. Use it as the working notebook throughout the task, not as a final summary.

Identify:

- task mode: understand, reproduce, implement, improve, benchmark, teach, or compare
- user objective and expected output
- source basis: paper, repository, notes, dataset, existing code, or topic
- whether internet research is allowed or required
- allowed source-gathering methods: web search, paper/PDF retrieval, website review, repository inspection, dataset access, benchmark lookup, local experiments, or supplied-source-only work
- target audience for explanations
- constraints: time budget, hardware, dataset access, dependency limits, citation needs, privacy limits
- success or decision criteria

Ask targeted user questions only when a missing answer would materially change research direction or experiment cost.

### Step 2 - Search, rank, and understand the method

Read supplied sources first.
Use broad research methods when allowed and useful: internet search, scholarly search, paper or PDF retrieval, project websites, documentation, reference implementations, benchmark definitions, dataset cards or documentation, issue trackers, release notes, examples, and credible discussion threads.
Do not treat search as one pass. Try different search phrases, source types, and routes when the first path is weak, and record dead ends or rejected sources when they affect the research direction.
Capture source-reading notes, ambiguous paper details, discarded interpretations, rejected sources, useful search terms, and questions in `research-notes.md` while reading.

Create or update `source-index.md`.
For every material source, record the title or name, URL or local path, source type, why it matters, credibility or limitation notes, access status, and how it affects the research plan.
When the user asks to find papers, compare methods, or select an approach, write `literature-review.md` with ranking criteria, candidate papers, tradeoffs, rejected options, and the chosen implementation target.
Write `research-brief.md`.
When a paper, architecture, algorithm, or training method is involved, write `paper-analysis.md`.

Preserve ambiguity instead of inventing missing details.

### Step 3 - Create the research plan

Create `research-plan.md`.
Write the rough planning trail in `research-notes.md` before or while turning it into the structured plan: candidate tracks, rejected paths, assumptions, unresolved questions, and reasons for the chosen approach.

Choose the execution track or combination of tracks:

- literature synthesis and ranking
- paper or method reproduction
- conceptual or mathematical analysis
- local setup and runbook investigation
- web, website, documentation, repository, dataset, or benchmark investigation
- minimal implementation
- simulation or probe
- data preparation and empirical evaluation
- training or fine-tuning
- benchmark or ablation
- illustrative HTML explanation

Define evidence needed, artifacts to produce, risks, loop rules, stop conditions, and what would trigger a pivot.

### Step 4 - Design the empirical validation loop when needed

Create `experiment-plan.md` when the research plan requires empirical validation, training, benchmarking, ablation, or measurable comparison.
Before any run, record expected outcomes, failure signals, and interpretation rules in `research-notes.md` or `experiment-plan.md`.

Define:

- hypotheses or claims under test
- dataset, split, preprocessing, and sampling rules
- training or fine-tuning schedule, checkpoint cadence, and evaluation cadence when relevant
- baselines and comparisons
- metrics and exact computation
- run commands and expected artifacts
- random seeds or variance strategy
- smoke tests and failure checks
- benchmark budget and stop conditions

If the objective cannot be tested with available data or compute, mark the work blocked or reframe the question before coding around the gap.

Create or update `research-loop-log.md` before the first trial. Use it as the chronological record of each research cycle.
Use `research-notes.md` for rough observations and reasoning between structured loop-log entries.

### Step 5 - Set up and implement when needed

Inspect existing code, notebooks, dependency files, data paths, and script patterns.
When the task requires running a paper implementation, vendor package, local model, or reference repository, bring up the environment as part of the research loop and record setup commands, errors, fixes, and constraints in `implementation-handoff.md`.
When the research plan does not require code changes, do not invent implementation work. Produce the planned research artifacts and record why implementation is unnecessary.
During implementation, record important code decisions, shape/data-flow discoveries, deviations from the paper, debugging observations, and unresolved concerns in `research-notes.md`.

Keep the implementation:

- faithful to the approved source interpretation
- small enough to reason about
- instrumented for the experiment plan
- explicit about shapes, seeds, losses, metrics, and data flow when relevant
- readable for future research iteration

Run implementation-scoped checks such as shape checks, tiny synthetic-data runs, unit tests, lint, or type checks that fit the task.

Write `implementation-handoff.md`.

### Step 6 - Run, debug, tune, and analyze empirical work when needed

Run the planned empirical work or the feasible subset. For neural-network work, this may mean preparing data, launching training or fine-tuning, monitoring checkpoints, evaluating metrics at intervals, and deciding whether to continue, cancel, adjust parameters, or rerun. For non-neural research, this may mean simulations, probes, benchmark scripts, reproduction checks, or comparative analysis.

Record:

- exact commands
- environment details that affect results
- raw output paths
- checkpoint paths when relevant
- metrics
- plots or tables when useful
- failures, instability, unexpected behavior, and deviations from plan

After each meaningful run or failed attempt, update `research-notes.md` with what happened, what it likely means, and what the next move is before starting the next run.
When a run fails, debug the concrete failure, fix local setup or implementation issues, and rerun the smallest useful check before broad benchmarking.
When parameters need adjustment, record the reason, changed values, and whether the change is a faithful reproduction requirement, resource-budget adaptation, or exploratory variant.
When a long run is cancelled or stopped early, record the reason, partial metrics, checkpoint status, and next decision.
When evidence changes the right next step, update `experiment-plan.md` or `paper-analysis.md` as needed and record the reason in `research-loop-log.md`.

Write `experiment-report.md`.
Distinguish observed result, interpretation, confidence, confounders, unsupported speculation, and recommended next experiment.

### Step 7 - Create an illustrative understanding artifact when requested

When the user wants to understand the research, create `research-explainer.html`.

The HTML should be grounded in the same research and experiment package and may include:

- paper or method map
- architecture or algorithm walkthrough
- equation-to-code mapping
- tensor shape or data-flow diagrams
- ranked paper comparison
- baseline and benchmark tables
- training curves or run-result visuals
- failure-analysis notes
- interactive toggles or small local visual simulations when useful

Keep it explanatory, not promotional. Do not hide uncertainty, failed runs, weak baselines, or unresolved questions.

If browser tooling is available, open and inspect the HTML before final handoff.

### Step 8 - Self-review and decide

Review the full cumulative package before finalizing strong claims.

Check:

- objective and task mode are explicit
- source discovery is broad enough for the task, or source limits are justified
- material papers, PDFs, web pages, repositories, datasets, benchmarks, and local artifacts are recorded in `source-index.md`
- important assumptions, plan changes, experiment expectations, observations, failures, and interpretation changes are captured in `research-notes.md`
- source interpretation is traceable and not overstated
- paper-faithful versus exploratory work is clearly labeled
- implementation maps to the stated algorithm, equations, architecture, or method when implementation was needed
- intentional deviations are documented
- experiment design can test the stated claim
- metrics, baselines, run commands, seeds, environment, and raw result paths are recorded when relevant
- negative or failed runs are preserved
- result analysis distinguishes observation from speculation
- explanatory HTML is source-faithful, clear, and honest about limitations when present
- conclusion strength matches evidence strength

After self-review:

- fix blocking findings when they are local to the current loop
- rerun experiments when fixes invalidate prior evidence
- update `research-decision-log.md`
- classify the state as `Complete`, `Next Loop`, `Blocked`, or `Reframe`

Report the conclusion with evidence, caveats, and the next concrete step.

## Operating Model

This is a standalone agent, not a team workflow.
Do not route to a separate reviewer by default.
When independent critique is needed, ask the user explicitly or produce a self-review section in `research-decision-log.md`.
