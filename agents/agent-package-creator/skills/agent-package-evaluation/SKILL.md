---
name: agent-package-evaluation
description: Evaluate how well a skill, Agent, Team, or Org works in real runs, on its own or after a change (old text against new), and record the verdict with its evidence.
---

# Agent Package Evaluation

Find out from real runs how well a package does its job: on its own, when someone asks how good a package is, or after a change, when `agent-package-creation` step 4 calls for a live check. Wording is silent when it is wrong, so a run shows what reading does not.

How to operate the app is in [references/live-checks.md](references/live-checks.md). Mistakes made in earlier evaluations, and how to catch them, are in [references/evaluation-mistakes.md](references/evaluation-mistakes.md).

## 1. Write the criteria before the first run

Write them to a file in the artifact workspace before anything runs:

- **For a change:** each point of the change, and what a run must show for it.
- **For the whole output, as its user will read or use it:** for an article, its title, opening, detail and readability; for a team, its result, its files, and what it asked the user. A result often fails where nothing changed.
- **The comparison:** what counts as better, the same, or worse than the old text.

Add criteria for a later run before that run, and never rewrite earlier ones to fit a result.

## 2. Build a scenario where the real failure can happen

- **A neutral request:** the smallest realistic input that exercises the change, worded as a user would and with no hint at the answer. For a change about how an agent judges or designs, the same question goes to the old text and the new.
- **The conditions of real use:** the agent keeps the tools, sources and reading it would have in real use, and no prepared answer. When the change answers a real failure, name what the real run had, and give the test the same.
- **Replay a real miss:** when the change comes from a real incident, the incident is the best test data. Clone the repository at the commit where the agent got it wrong (the ticket's history and revision records name it), send the same message the agent received then, once on the old text and once on the new, and compare what each catches. The clone keeps the user's repositories untouched.
- **Test data:** create what each point of the change needs in order to happen: files, seeded state, a stale process, a misleading log, a merged branch. Make the data consistent, because an agent reacts to a flaw in the data instead of to the rule under test. Capable agents avoid traps through good habits, so a trap that only a careless agent would fall into tests nothing: build the situation so that a careful agent still meets it, or treat its avoidance as the answer.
- **No real work:** an agent that delegates in the scenario starts a real worker, which works on whatever its Task names, including the user's repositories. When the scenario only needs to show whom the agent picks, import only the agent under test (a copy of its folder) and use placeholder run IDs on its board, so the call is refused and visible in the traces instead of run. When the worker's work is the point, give its Task a test repository.
- **A general rule** is also checked on a different kind of input once it passes on the first, such as another kind of article or another kind of package.

## 3. Run the old text and the new independently

- Run the old text first, then the new, with the same request word for word.
- Give each run its own copy of the work folder: runs write notes there, and a later run that finds an earlier run's notes builds on them instead of judging independently.
- Each instance is a full desktop app on the user's machine, so keep few running. Use one isolated instance per version of the text under test, shared by that version's runs, and start a fresh one for a new round on changed text. Runs of the same request need separate instances, since a later run can find an earlier one's work journal through memory search; run them one after another, stopping each instance when its run is done. Keep at most two instances running at once, and stop every instance as soon as its runs are done.
- Run the roles under test on the models they use in real use, and a cheap one for the rest. When that model ignores a rule, one run on a stronger model tells unclear wording from the model's own habit.
- Do not change an output while the evaluation runs; the agents do the work.
- A run stopped before its result (an app or computer restart) is started again from scratch, with a fresh copy and an instance that holds no trace of it; a resumed run is not the same test.
- A reply can arrive before the work is done, for example while an agent waits for another. Wait for the run's own sign of completion, such as a passed review or a delivered file, and an idle agent.
- A fresh agent sometimes answers without opening its skill (no skill call in its traces), which tests nothing; a long-running agent in real use has it loaded, so first ask it to load its skill.

## 4. Judge

- **Read each output whole first,** as its user would, before checking any criterion, and note what that user would notice.
- **Then each criterion,** against what the change should produce: the order of messages, the rule an agent quotes from `get_handoff_rules`, the file it writes, where it stops. Name the run and the step where each was observed. A point the run did not exercise is untested, not passed: build data that exercises it and run again.
- **Compare old and new.** When both pass alike, first ask whether the scenario let the real failure happen. If it did, the change adds nothing: shorten or drop it, and say so.
- **Generalization:** say whether the gain comes from a general rule or from fitting this one case.
- Give the user the paths of the outputs: for an output meant for people, their reading is the final check.

## 5. Record the evaluation

Copy the outputs out of temporary folders, then write one evaluation report per evaluation, next to the criteria, from [the report template](templates/evaluation-report-template.md). Every evaluation ends with it, whether it was asked for on its own or is part of a change; the report, not a chat message, carries the verdict:

- the runs: package commit, instance, model, date, and the request;
- what the user of the output would notice, reading it whole;
- each criterion's result, with the evidence and where it was observed;
- the old against the new;
- the defects left, and what the result says about generalization;
- the verdict: **better**, **no difference** (the change adds nothing), or **worse, inconclusive, or could not run**; for a package evaluated on its own, how far its user can rely on it. For a change, `agent-package-creation` step 5 decides from it whether to merge or ask the user.

Give the user the report's path. The result of a change links its evaluation report. Then clean up as [live-checks.md](references/live-checks.md) describes. When a fix follows the evaluation, evaluate again on the final text.
