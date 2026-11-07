# Evaluation Mistakes

Concrete mistakes found in real evaluations of agent packages. The [evaluation skill](../SKILL.md) is the authority; each entry shows how it was broken, what to do instead, and how to catch it. Keep entries short and general: one cause per entry, and merge entries that share a cause. Entries 1 and 2 were anti-patterns 27 and 28 of the package anti-pattern catalog.

## 1. Judging a change from a run that did not exercise it

- **Incidents:** Three on 2026-10-20.
  - **An evidence check:** the first test data cited an evidence folder that did not exist, and the PM held the Task to rescue the evidence instead of showing the rule under test.
  - **A judgment check:** the first question told both copies not to run any tools, so neither opened the skill under test, and both answered from general caution.
  - **A probe check:** the data never made a probe mislead, so "a surprising result gets a second check" went unexercised and was nearly reported as passed. The user pointed out that evaluation sometimes needs test data created for it. Two more fixtures (a stale count, a stale server on the default port) were sidestepped by careful agents that used their own file and port. The user: "agents are really really smart … if you babysit a smart model, maybe it doesn't work". The point was dropped from the guide instead.
  - **A check that could not fail the real way (2026-11-01):** the user's complaint was that a research team did not study existing work before going deep. The check gave old and new text a fictional corpus, forbade the network and seeded the history, so neither could skip real reading. Both passed, and the change merged while the real behaviour stayed.
  - **A fresh request for a failure that came from drift (2026-11-07):** a rule on when an Agent gets a second skill was tested with three fresh requests; old and new text decided alike. The real miss had grown inside an existing skill over many changes; a second test, a skill that had grown a second job, also showed no difference, and the rule was dropped.
- **Breaks:** [§2 and §4](../SKILL.md#2-build-a-scenario-where-the-real-failure-can-happen): a scenario where the real failure can happen, and every point mapped to where it was observed.
- **Instead:** Create consistent test data that makes each point of the change happen, and leave the agent the tools and reading it has in real use ([live-checks.md](live-checks.md)). After the run, map each point to where it happened; build data for any point that did not, and rerun. When old and new text both pass, first ask whether the scenario lets the real failure happen at all: it needs the conditions of real use, such as open access to the real sources and no prepared answer. Write the pass criteria before the first run, and run the old text first.
- **Detect:** In the result's validation, each point of the change names the run and the step where it was observed; a point without one is listed as untested. For a change that answers a real failure, name what the real run had that the test withholds or supplies.

## 2. A live check that starts real work

- **Incident:** A live check tested how the Project Task Manager moves a Task to another worker, in isolated apps that held the whole package. The PM delegated for real: two Agent Package Creator copies started on the seeded Task, and one committed on a new branch in a worktree of the user's agents repository and started another test instance. A guard script meant to stop such runs hung on its terminate call (2026-10-23).
- **Breaks:** [live-checks.md](live-checks.md): an isolated instance must not act on the user's repositories or data.
- **Instead:** When the scenario only needs the agent's choice, load only the agent under test and put placeholder run IDs on its board, so a delegation is refused and seen in the traces; when the worker's work is the point, give its Task a test repository.
- **Detect:** Before sending, list each `delegate_task` or `send_message_to` the scenario can lead to and where it would land; after the run, check the instance's runs and the repositories' branches and worktrees.

## 3. Criteria that cover only the change

- **Incident:** Over six rounds of a writing team, each round's criteria covered the rules just changed. One article passed them with a title nobody could decode before reading it; the next listed a ticket number, an internal ticket title and a test count as "mostly met". The user found both on his first read (2026-11-06).
- **Breaks:** [§1](../SKILL.md#1-write-the-criteria-before-the-first-run): criteria also for the whole output as its user will read or use it.
- **Instead:** Write criteria for the whole output as well as for the change, and read each output whole, as its user would, before checking any criterion.
- **Detect:** For each criteria file, ask what a user of the output sees first (a title, a summary, a file, a question to them) and find the criterion that covers it.

## 4. A verdict without an evaluation report

- **Incident:** The same writing team was evaluated six times; the verdicts for the first four rounds exist only in chat, so later rounds could not be compared with them from files. The user asked whether an evaluation file is written every time (2026-11-07). In a live check the same day, a Creator asked how good a package was recorded its evaluation as a package analysis with a verdict section, because no evaluation report existed; the user: "for evaluation we need to have an evaluation result or evaluation report".
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
