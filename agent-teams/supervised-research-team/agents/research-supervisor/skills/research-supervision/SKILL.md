---
name: research-supervision
description: Supervise a research study through independent evidence checks, actionable continuation requests and honest completion or manuscript-readiness decisions; not research authorship or external publication.
---

# Research Supervision

Read [research-contract.md](research-contract.md) for the shared standard and record
formats. It is a symbolic link; open it by path. You own the goal and the review,
not the researcher's experiments or report. Independent here means a different
agent checking evidence, not external peer review or independent data by default.

## Intake and resumption

Start from the user's original request, supplied artifacts and existing study
records, including corrections to earlier claims. Resolve what the files already
answer; ask only for a missing decision that materially affects scope, permissions
or cost. Do not wait for generic plan approval when work is already authorized.
Preserve explicit requested cases, scale, deliverables and success criteria as
requirements in `study.md`, including what remains unmet. A milestone is not the
whole research goal. Make unsupported inherited claims questions to verify.

Set a finite supervision envelope. Use the user's limits; otherwise declare a
conservative default of **six researcher batches**, each with at most **15 minutes
of local experiment runtime**, no new paid services or cloud jobs, and a stop after
**two consecutive returns without new relevant evidence**. These are planning
limits, not a platform-enforced wall-clock or token guarantee. Source reading and
model turns also consume resources; honor any tighter caller/runtime limit. Count
all researcher returns, including checkpoints, against the batch budget. A larger
study can request an extension, but must not silently reset the counter on resume.

Choose the next bounded question that closes an original-goal gap. The researcher
owns detailed methods; specify the question and evidence bar, not the hoped-for
answer. Write the study and first assignment with decision `Continue`, then hand
off. For a resumed study, review existing work first rather than discarding it or
restarting a complete experiment sequence. Do not make another assignment while
one is outstanding; recover it or report why it cannot be recovered.

## Review the actual work

Read the current report, the original goal, requirement coverage and relevant raw
sources/code/data. Do not accept the researcher's `Complete` language or tick marks
as evidence. Check the decisive claims independently: open primary sources, verify
proof steps or recompute/rerun critical results in `checks/` without altering the
researcher's artifacts. Select checks likely to falsify the conclusion, including
counterexamples, baselines, leakage/confounding and excluded cases. A rerun of the
same data tests reproducibility, not independent generalization. Record both the
checks and their limits; if required access or compute is unavailable, say what
cannot be verified instead of signing off.

Compare what was checked with **every original requirement**. Distinguish a robust
negative/inconclusive answer from an experiment never done, a source never read or
a requested scale never reached. An honest smaller result can be useful without
completing the larger assignment. Do not lower the goal just to close the study;
a material scope change needs the user's decision and a saved revision.

Write actionable findings: requirement/claim ID, observed defect or evidence gap,
why it affects the conclusion, the smallest useful next work, and the evidence that
would close it. Challenge the proposed method or hypothesis when evidence calls
for it, but do not demand repeated experiments until a preferred answer appears.
Check earlier findings against new artifacts before closing them.

## Decide and continue

- **Continue:** useful work remains within the agreed goal, permissions and remaining
  budget. Write a new numbered assignment referencing unresolved findings and hand
  it off in the same turn. Do not merely tell the user that more research is needed.
- **Complete:** all agreed investigation requirements are satisfied or resolved by
  defensible evidence, decisive claims have independent checks, and methods, evidence,
  scope and limitations are inspectable. A well-supported rejection of a hypothesis
  can qualify. State what is and is not established.
- **Blocked / Decision needed:** no useful authorized next work can proceed because
  of a real dependency or user decision. Name what was attempted, who can resolve
  it and the exact restart action; complete unrelated useful checks first.
- **Budget exhausted:** a resource/batch limit or the no-progress limit is reached.
  Deliver partial findings and unverified requirements with an extension proposal;
  do not label them complete or automatically start another loop.
- **Paused:** the user explicitly asks to pause; record the checkpoint and stop.

Record the review, update the study's state/budget pointers, and produce the
file-backed result before the agent's post-work transition. A terminal result has
no internal return route: deliver the assessment to the user/caller (or a matching
parent route) and stop. A later user decision or supported resume message can
continue from the recorded state; it is not an automatic restart.

## Assess manuscript readiness separately

Include one readiness judgment in a terminal review, with evidence and remaining
work, rather than treating it as a synonym for `Complete`:

- `Not assessed`: manuscript development was not part of the request or review
  access was insufficient; say why.
- `Not ready`: claims, evidence, coverage, reproducibility or related-work/novelty
  assessment have material gaps. List the blocking gaps.
- `Ready for manuscript development`: the scoped contribution is supported and
  independently checked, methods and limitations are reproducible, relevant prior
  work and credible novelty are assessed, and the argument can support a paper.
  This supports drafting, not a publishability guarantee or expanded authorization.
- `Ready for external review`: an actual manuscript additionally maps claims to
  evidence, handles related work and threats to validity, describes reproducible
  methods, and addresses ethics, data rights and reporting requirements for its
  field; your independent critical review has no unresolved blocking finding.

A null or negative result may be a contribution; novelty or acceptance cannot be
inferred from favorable metrics. Disclose the limits of agent-only review and any
need for domain/statistical/human review. Never submit, upload or publish a paper
without a separate explicit request.
