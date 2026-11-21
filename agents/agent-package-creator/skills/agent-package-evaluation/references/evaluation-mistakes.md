# Evaluation Mistakes

Keep entries short and general: one cause per entry, the incident in one or two sentences, and merge entries that share a cause.

## 1. Judging a change from a run that did not exercise it

- **Incidents:** Test data cited a missing evidence folder; a question forbade tools so no copy opened the skill; data never made a probe mislead (2026-10-20); a fictional corpus with no network let neither text skip real reading (2026-11-01); fresh requests tested a failure that came from drift (2026-11-07); public pages could be fetched without the browser the change was about (2026-11-08). The user: "agents are really really smart … if you babysit a smart model, maybe it doesn't work".
- **Breaks:** [§2 and §4](../SKILL.md#2-build-a-scenario-where-the-real-failure-can-happen): a scenario where the real failure can happen, and every point mapped to where it was observed.
- **Instead:** Create consistent test data that makes each point of the change happen, and leave the agent the tools and reading it has in real use ([live-checks.md](live-checks.md)). After the run, map each point to where it happened; build data for any point that did not, and rerun. When old and new text both pass, first ask whether the scenario lets the real failure happen at all: it needs the conditions of real use, such as open access to the real sources and no prepared answer. Write the pass criteria before the first run, and run the old text first.
- **Detect:** In the result's validation, each point of the change names the run and the step where it was observed; a point without one is listed as untested. For a change that answers a real failure, name what the real run had that the test withholds or supplies.

## 2. A live check that starts real work

- **Incident:** A live check of the Project Task Manager let it delegate for real: two Creator copies started on the seeded Task and one committed to the user's agents repository (2026-10-23).
- **Breaks:** [live-checks.md](live-checks.md): an isolated instance must not act on the user's repositories or data.
- **Instead:** When the scenario only needs the agent's choice, load only the agent under test and put placeholder run IDs on its board, so a delegation is refused and seen in the traces; when the worker's work is the point, give its Task a test repository.
- **Detect:** Before sending, list each `delegate_task` or `send_message_to` the scenario can lead to and where it would land; after the run, check the instance's runs and the repositories' branches and worktrees.
- **The user's browser (2026-11-04):** a live check of a team that hands web work to the Computer Use Operator ran the real operator in an isolated app. It reached the user's own signed-in browser through the shared display and debugging port and opened a tab there; the Creator stopped the run and closed only that tab. Give an agent with browser or screen tools a separate display, browser and test bridge ([live-checks.md](live-checks.md), §3a), or a no-access test double when its work is not the point.

## 3. Criteria that cover only the change

- **Incident:** Over six rounds of a writing team, each round's criteria covered the rules just changed. One article passed them with a title nobody could decode before reading it; the next listed a ticket number, an internal ticket title and a test count as "mostly met". The user found both on his first read (2026-11-06).
- **Breaks:** [§1](../SKILL.md#1-write-the-criteria-before-the-first-run): criteria also for the whole output as its user will read or use it.
- **Instead:** Write criteria for the whole output as well as for the change, and read each output whole, as its user would, before checking any criterion.
- **Detect:** For each criteria file, ask what a user of the output sees first (a title, a summary, a file, a question to them) and find the criterion that covers it.

## 4. A verdict without an evaluation report

- **Incident:** Four rounds of a writing team's evaluation left their verdicts only in chat, and a Creator recorded an evaluation as an analysis; the user: "for evaluation we need to have an evaluation result or evaluation report" (2026-11-07).
- **Breaks:** [§5](../SKILL.md#5-record-the-evaluation): one evaluation report per evaluation, from the template.
- **Instead:** Write the evaluation report before telling anyone the verdict, and link it from the result.
- **Detect:** Each evaluation in the artifact workspace has a report from the template naming its runs.

## 5. Judging a general rule on one kind of input

- **Incident:** A writing team's rules were improved over six rounds on one brief. Preparing a second kind of article showed that one rule, "the spine of a technical blog is the chain of problems", would have forced a product comparison into pains and solutions; it was fixed before the run (2026-11-06).
- **Breaks:** [§2](../SKILL.md#2-build-a-scenario-where-the-real-failure-can-happen): a general rule is also checked on a different kind of input.
- **Instead:** Once a general change passes on its first input, run it on a different kind (another kind of article, another kind of package), old text against new.
- **Detect:** For each changed rule, name the kinds of input it applies to and the run that covered each kind.

## 6. An instance for every run

- **Incident:** The first text of this skill said to give each run its own fresh isolated instance. In its live check, the Creator evaluating a one-skill package started ten instances, one per run, and stopped none of them; with the two hosting the Creators, twelve desktop apps ran on the user's machine, and the user asked why (2026-11-07).
- **Breaks:** [§3](../SKILL.md#3-run-the-old-text-and-the-new-independently): few instances, one per version of the text, each stopped as soon as its runs are done.
- **Instead:** Share an instance among a version's runs of different requests; give runs of the same request separate instances one after another; keep at most two running.
- **Detect:** During an evaluation, `isolated-app list` shows no more than two running instances; the run log names which instance each run used and when it was stopped.

## 7. An isolation gap accepted as a residual

- **Incident:** A bench gave subjects their own data but the host's process list; subjects saw the user's app and other subjects' processes, two changed their work because of them, and the machine ran out of memory (2026-11-11). Files are the same gap: with the old and new copies under one folder, an old-text run diffed the new skill and followed it, and a new-text run found and read the criteria file in the artifact workspace (2026-11-21).
- **Breaks:** [live-checks.md](live-checks.md#1a-a-private-process-list-where-it-is-cheap-and-room-in-memory) and [§4](../SKILL.md#4-judge): on a bench that runs many subjects, each instance has its own process list, and a run counts only after its transcript scan.
- **Instead:** For each gap a bench names, ask what a subject could do with it, and close it where that is cheap for the bench rather than list it (but see mistake 8). Keep each version's package, workspace and data where the other version's subjects cannot reach them, and the artifact workspace (criteria, fixtures) too; on Linux with root a private mount namespace hides them cheaply. Scan every subject's transcript before counting its run.
- **Detect:** The report names, per instance, the processes seen from inside and the memory peak, and per run the scan result. A bench protocol that lists a "residual" says what a subject could do with it.

## 8. A safeguard that blocks the evaluation

- **Incident:** The fix for mistake 7 required a private process list everywhere, which blocked an evaluation on the user's Mac; the user: a requirement that is not easy or does not give enough benefit is a practice, and the use case decides (2026-11-12).
- **Breaks:** [§3](../SKILL.md#3-run-the-old-text-and-the-new-independently): safeguards fit the setup they protect.
- **Instead:** Name what the safeguard prevents and where that risk is real. Require it only where the risk is real and the safeguard is cheap; elsewhere use the cheaper protection (one subject that starts processes at a time, the transcript scan). A setup that needs more isolation decides that for itself.
- **Detect:** For each requirement that can end in "could not run", name the setup it protects and the cost of meeting it on the user's own machine.
