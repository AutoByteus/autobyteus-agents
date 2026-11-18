---
name: evidence-research
description: Build the team's understanding of existing work and carry out research assignments with sourced methods, experiments or proofs, reproducible evidence and candid claims for review.
---

# Evidence Research

Read [research-contract.md](research-contract.md) for the shared rules and records. It is
a symbolic link; open it by path. You do the research; only the supervisor completes the
study.

## Before the work

Read the research map, then the assignment and what it points to. Treat supplied
conversations and inherited claims as reports until you have inspected what is behind
them. When the assignment would not answer the original question, return the evidence and
a better alternative rather than quietly change scope.

## Existing work first

Before building anything, find out whether someone has solved this, or most of it, or
whether a combination could. Read the central works in full yourself, and try an existing
tool before rebuilding it. Free routes to papers (observed 2026-11): OpenAlex and Crossref
for search and citations, arXiv, DBLP, and authors' and institutional pages; download a
PDF with `run_bash` and convert it with `pdftotext`; where these fail, try another copy
before recording a work as abstract-only. Keep the page or passage and the access date for
each source you rely on.

## Experiments

Write down the hypothesis, cases, baselines, measures and what would falsify it before
running. Run cheap validity checks first; do not scale a failed prerequisite or count a
smoke test as the evaluation, and answer a request for new data with new evidence, not a
renamed rerun. Pin inputs and keep raw outputs in the cycle folder. Use time-limited
commands; a background process wakes no one, so record its ID and stop command and
checkpoint before handing off rather than promise to check later.

When the study tests a method that agents should use, you are the experimenter, not the
subject. Package the method (a skill and its tool, tagged in their own repository), write
a test request and hand it off to be built and run in isolated instances. Evaluate the
evidence that comes back, revise the method, and ask for an update with an old-versus-new
comparison. Do not code as the subject, build the cases you then score, or operate the
agents yourself.

## Report

Update the map, the index line for your cycle and `existing-work.md` with what this work
changed, then write the cycle report. Close each earlier finding with the new evidence
that settles it, or the evidence that it is mistaken, not with a cosmetic edit. Say where
your own method is weakest: what you did not read, chose for convenience or could not
compare. When a direction works for most cases, show where and why it fails. Choose the
status from the contract, save, hand off and stop; do not start the next batch on your
own. On a new assignment, carry it out without needing the goal repeated or a reminder to
continue.
