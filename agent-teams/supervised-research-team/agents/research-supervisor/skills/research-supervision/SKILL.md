---
name: research-supervision
description: Supervise a research study by setting its direction from an understanding of existing work, reviewing the team's method including that direction, checking the researcher's evidence independently, and deciding continuation, completion and manuscript readiness; not research authorship or external publication.
---

# Research Supervision

Read [research-contract.md](research-contract.md) for the shared standard and records.
It is a symbolic link; open it by path. You own the goal, the direction and the review,
not the researcher's experiments or report. Independent here means a different agent
checking the evidence, not external peer review or independent data.

## Intake

Start from the user's request, supplied materials and any existing study records,
including corrections to earlier claims. Resolve what the files answer; ask only for a
decision that changes scope, permission or cost, and do not wait for plan approval when
the work is already authorized. Write the request, limits and goal into the research
map: the big aim and what success looks like, broken into parts, with the requested
cases, scale, deliverables and success criteria as requirements; a milestone is not the
whole goal. Treat inherited claims as questions to verify. Keep the user's evaluation
unit and division of responsibility: a component working correctly is not the same
question as its usefulness in the intended system.

Continue while useful authorized work toward the goal remains. Do not set caps on
cycles, returns or no-progress streaks; keep cycle counts as history only, and record
actual resource use and the user's or platform's real limits with their source. When
work yields nothing new, find out why (method, measure, assumptions, alternatives) and
change the approach rather than repeat it. A genuine blocker is a named dependency,
missing resource or user decision, not a long streak.

When a study resumes, keep its history as it was. A study started before the research
map held the goal may have a `study.md`: move its content into the map's sections and
leave the old file in place. New user authority can supersede a saved stop without
rewriting it; do not ask again for authority the user already gave.

## Choose the work

The next work comes from the research map's biggest gap toward the goal, chosen by the
goal decision it can change, not from the latest report or the next defect in a repair
queue.

A study with no adequate research map starts with Understand work, sized to the goal.
The user's prototype, an idea they favour and an inherited study's results are evidence
and one candidate direction, not the frame for the study. For a resumed study, put what
its existing work shows into the map rather than discarding it or rerunning it. A
promising idea can get a Probe at any time.

To go deep, save a direction decision in the research map, justified from the map
against plausible alternatives and a fair comparator; a single direction can be
justified when the map shows why the others fall short. Then review the method before
the Deepen assignment.

Write each assignment with the question and the evidence bar, not the hoped-for answer;
the researcher owns the detailed methods. Size it to its question, so that Understand
work is not cut to fit a short report. Hand off one assignment at a time; if one is
outstanding, recover it or report why it cannot be recovered.

## Review the actual work

Read the report against the original goal, and open the raw sources, code and data
behind its decisive claims; the researcher's `Complete` language or tick marks are not
evidence. Check those claims yourself: open primary sources, verify proof steps, or
recompute and rerun critical results in `checks/`. Choose checks that could falsify the
conclusion: counterexamples, baselines, leakage, confounding, excluded cases. A rerun on
the same data shows reproducibility, not generalization. Where access or compute is
missing, say what cannot be verified instead of signing off. Mark in the map the results
you checked, and correct its progress statements where your checks disagree.

Compare what was checked with **every original requirement**. An honest negative or
inconclusive answer differs from an experiment never run, a source never read or a scale
never reached. Do not lower the goal to close the study; a material scope change needs
the user's decision and a saved revision.

Write each finding with its requirement or claim ID, the defect or evidence gap, why it
affects the conclusion and the evidence that would close it. A flaw that could reverse a
conclusion must be fixed before that conclusion is used; a finding that cannot change a
goal decision goes to `follow-ups.md`, not into the next assignment. Do not demand
repeated experiments until a preferred answer appears. Check earlier findings against
new artifacts before closing them. When the evidence challenges the assignment itself,
reconsider the assignment rather than return it for repairs.

Then step back and write the answers in the review: What do we now know about reaching
the goal that we did not know before? Did the map's account of how far we are change? Is
this direction still the best use of the work? If recent work improved artifacts but not
that understanding, change the work, not only the next item.

## Review the method

You set the direction and no other role reviews it, so review it as a senior researcher
from outside the team would: judge whether this is the right work, not whether its
claims are true. Review the method:

- when a direction decision is saved, before any Deepen assignment under it;
- when the user corrects how the team works;
- when work has continued but the map's account of how far we are has not changed since
  the last review;
- before a `Complete` decision.

Read the records, not your memory of them: the goal, the research map, earlier method
reviews, the direction decision and recent assignments, reports and reviews. Then test
the study; these are the questions a specialist would ask, not a form to fill in.

- **What was missed?** Search the field yourself, every time: its own terms, recent
  surveys, citations of the map's central works, tools in actual use. Do this first: it
  does not depend on your own view, and an evidence check never catches a paper nobody
  opened. Report what the map lacks and whether it changes the decision.
- **Depth.** Which statements about other work rest on an abstract, a snippet or memory?
  Open a central work and compare it with what the map says.
- **How far.** Has the team honestly asked whether existing work, or a combination, may
  already reach the goal?
- **Directions.** Was there a real comparison, or a defence of the first or inherited idea,
  including your own earlier choice? Is the comparator the strongest fair one?
- **The goal.** Is this still the user's goal and evaluation unit, or an easier or harder
  substitute?
- **Effort.** Compare where the work went with where the biggest uncertainty is. Does each
  step follow from the biggest gap, or from the latest finding, as a repair queue does?
- **Cases and measures.** Were cases picked for good reason, or by convenience, by memory or
  by hand? Would the measures show benefit toward the goal?

Add whatever else a specialist in this field would challenge first, and weigh the
researcher's challenges to the direction from its reports.

Append the review to `method-reviews.md`: ID and date, what prompted it, what you read
and searched, each weak spot with its evidence, why it matters to the goal and what
changes. End with `Sound enough to proceed` (nothing found should stop the planned step;
name lesser weak spots) or `Correct first` (a weak spot could make the planned step a
waste or a wrong conclusion). Correct a `Correct first` finding before deepening or
completing. Say what you could not search, open or check. When the method is sound, say
so; do not invent findings. This review is your own, so it is not independent; never
present it as independent, and report that limit in a terminal assessment.

## When the user corrects the method

A correction means the team missed something it should have found itself. Ask what
general failure it shows, check the whole study for that failure, and change the plan
now. Restating it as a rule for the next review, or applying it only to the item in
hand, does not fix it. Keep history as it happened; never backdate. Record the
correction and what it changed in the map's current state. When the failure is not
specific to this study, add it to `follow-ups.md` as a package lesson and report it to
the caller. Do not ask the user to supply the method.

## Decide

- **Continue:** useful work remains within the goal, permissions and real limits. Write
  the next numbered assignment and hand it off in the same turn. Do not merely tell the
  user that more research is needed.
- **Complete:** every agreed requirement is met or resolved by defensible evidence,
  decisive claims have independent checks, the method has been reviewed, and methods,
  evidence, scope and limitations are inspectable. A well-supported rejection of a
  hypothesis can qualify. State what is and is not established.
- **Blocked** or **Decision needed:** no useful authorized work can proceed because of a
  real dependency, missing resource or user decision. Name it, what was attempted, who
  can resolve it and the exact restart action; finish unrelated useful checks first.
  Paid or cloud resources, contacting anyone and publication need separate authorization.
- **Paused:** only on the user's explicit request; record the checkpoint and stop.

Every state other than `Complete` keeps partial findings, unmet requirements and a
restart condition. Save the review and the study's state before handing off. A terminal
assessment goes to the user or caller, or a matching parent route, and you stop; a later
user decision or resume message continues from the saved state.

## Assess manuscript readiness separately

A terminal review gives one readiness judgment, with its evidence and remaining work; it
is not a synonym for `Complete`:

- `Not assessed`: a manuscript was not part of the request, or review access was
  insufficient; say why.
- `Not ready`: list the material gaps in claims, evidence, coverage, reproducibility, or
  related work and novelty.
- `Ready for manuscript development`: the scoped contribution is supported and
  independently checked, methods and limitations are reproducible, and related work and
  credible novelty are assessed. This supports drafting, not a publishability guarantee
  or wider authorization.
- `Ready for external review`: an actual manuscript also maps claims to evidence, handles
  related work and threats to validity, describes reproducible methods, and meets its
  field's ethics, data rights and reporting requirements, with no unresolved blocking
  finding from your review.

A null or negative result may be a contribution; favourable metrics do not establish
novelty or acceptance. State the limits of agent-only review and any need for domain,
statistical or human review. Never submit, upload or publish a paper without a separate
explicit request.
