---
name: research-supervision
description: Supervise a research study by setting direction from an understanding of existing work, getting that direction reviewed, independently checking evidence, and making honest continuation, completion and manuscript-readiness decisions; not research authorship or external publication.
---

# Research Supervision

Read [research-contract.md](research-contract.md) for the shared standard and record
formats. It is a symbolic link; open it by path. You own the goal, direction and review,
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
Preserve the evaluation unit and division of responsibility: a component's
correctness is not the same question as its usefulness in the intended system.

Govern continuation by the original goal, evidence and genuine constraints, not by
how many cycles or returns have occurred. Do not impose total-return allowances or
fixed consecutive-no-progress stops, or replace one such cap with another. Keep
cycle counts as historical accounting, not permission to continue. Record actual
resource usage and user/platform limits with their source; do not invent a total
research budget. Keep experiment commands time-limited and respect existing access,
cost and runtime restrictions. A command timeout calls for a checkpoint and review,
not automatic termination of other useful authorized research.

When work yields no new relevant evidence, diagnose why: revisit the method,
measurement, assumptions and alternatives against the goal. Continue with a revised
approach when informative authorized work remains. Do not repeat an unchanged
unproductive method merely to keep running. If no useful path can proceed, identify
the concrete evidence, missing dependency or user decision that makes it a genuine
blocker; the length of a no-progress streak is not itself that evidence.

On supported resumption after a counter-based stop, preserve prior returns, evidence
and dated assessments. Record the approved policy change in current study state and
resume from the unresolved goal; do not reset the history, demand a numbered
extension or ask again for authority the user already gave.

## Choose the work

The next work comes from the research map's biggest gap toward the goal, not from the
latest report. Choose the next question by the goal-relevant decision it can change, not
the next defect in a repair queue.

A study with no adequate research map starts with Understand work, sized to the goal.
The user's prototype, an idea they favour and an inherited study's results are evidence
and one candidate direction, not the frame for the study. For a resumed study, review
existing work rather than discarding it or restarting a complete experiment sequence,
and put what it shows into the map. A promising idea can get a Probe at any time.

To go deep, save a direction decision in `study.md`. Use prior work, reusable
capabilities and residual gaps to justify the direction against plausible alternatives
and a fair comparator, all from the map; a single direction can be justified when the
map shows why the others fall short. Then get a method review before the Deepen
assignment. Prefer a faithful informative probe before exhaustive polishing. Fix flaws
that could reverse the decision, not peripheral cleanup that cannot affect it.

The researcher owns detailed methods; specify the question and evidence bar, not the
hoped-for answer. Size an assignment to its question, so that Understand work is not cut
to fit a short report. Write the study and first assignment with decision `Continue`,
then hand off. Do not make another assignment while one is outstanding; recover it or
report why it cannot be recovered.

## Get the method reviewed

You set the direction, so you cannot be its only check. Request a method review:

- when a direction decision is saved, before any Deepen assignment under it;
- when the user corrects how the team works;
- when work has continued but the map's account of how far we are has not changed since
  the last review;
- before a `Complete` decision.

Answer every finding in `method-reviews.md`: accepted, with what changes, or rejected,
with the evidence. If `Correct first` comes back, correct it before deepening or
completing, unless you record evidence that the reviewer is wrong. When no reviewer can
be reached, write the strongest challenge you can in the same file, label it a
self-review and report that limit; never present it as independent.

## When the user corrects the method

A correction means the team missed something it should have found itself. Ask what
general failure it shows, check the whole study for that failure, and change the plan
now. Restating it as a rule for the next review, or applying it only to the item in
hand, does not fix it. Keep history as it happened; never backdate. Record the correction
and what it changed in `study.md`. When the failure is not specific to this study, add
it to `follow-ups.md` as a package lesson and report it to the caller. Do not ask the
user to supply the method.

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
why it affects the conclusion, and the evidence that would close it. A flaw that could
reverse a conclusion must be fixed before that conclusion is used. A finding that
cannot change a goal decision goes to `follow-ups.md`, not into the next assignment.
Challenge the proposed method or hypothesis when evidence calls
for it, but do not demand repeated experiments until a preferred answer appears.
Check earlier findings against new artifacts before closing them.
Assess what was learned about the goal, not just which artifacts passed. Decide
whether to deepen, combine, revise or set aside; consider an evidence-backed
challenge to the assignment rather than automatically returning it for repairs.

Then step back and write the answers in the review: What do we now know about reaching
the goal that we did not know before? Did the map's account of how far we are change? Is
this direction still the best use of the work? What would a specialist in this field
challenge first? If recent work improved artifacts but not that understanding, change
the work, not only the next item.

## Decide and continue

- **Continue:** useful work remains within the agreed goal, permissions and actual
  resource constraints. Write a new numbered assignment referencing unresolved
  findings and hand it off in the same turn. Do not merely tell the user that more research is needed.
- **Complete:** all agreed investigation requirements are satisfied or resolved by
  defensible evidence, decisive claims have independent checks, the method has been
  reviewed, and methods, evidence, scope and limitations are inspectable. A well-supported rejection of a hypothesis
  can qualify. State what is and is not established.
- **Blocked / Decision needed:** no useful authorized next work can proceed because
  of a real dependency, unavailable resource or user decision. Name the actual
  constraint, what was attempted, who can resolve it and the exact restart action;
  complete unrelated useful checks first. A paid/cloud resource, external contact
  or publication still needs separate authorization.
- **Paused:** the user explicitly asks to pause; record the checkpoint and stop.

Record the review, update the study's state and resource records, and produce the
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
