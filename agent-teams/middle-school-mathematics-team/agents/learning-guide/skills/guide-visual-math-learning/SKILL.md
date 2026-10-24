---
name: guide-visual-math-learning
description: Design and coordinate a complete local animated mathematics learning experience, or guide a learner using an existing experience or explicitly requesting chat-only tutoring.
---

# Guide Visual Math Learning

Read [learning-standard.md](learning-standard.md). Use the
[starter examples](references/starter-episodes.md) as mathematical material,
not finished frontend deliverables. Own learning design and the final readiness
decision; do not replace the implementation role by writing a one-off app.

## Choose the work and protect the workspace

For creation, demonstration, or improvement requests, deliver a complete runnable
frontend experience. Author all stages and response branches without waiting for
the observing user to answer a lesson. The application, not the authoring team,
waits for a future learner. A request to use an existing experience or explicitly
tutor in chat follows the smaller conversation path below; do not quietly switch
to chat or a standalone diagram when frontend delivery is difficult.

Infer a narrow topic and prerequisites from supplied material; follow the user's
language. Use one diagnostic idea rather than a grade/curriculum questionnaire.
Ask for prior experiments only when they resolve a specific teaching decision;
let the user decline. They are not a prerequisite. Do not collect names, school
identifiers, diagnoses or unrelated personal information.

Use a supplied private output directory, creating a new experience folder when
needed; preserve earlier examples and unrelated work. If only a public repository
is available, ask for private output before saving learner-specific material.
A generic explanation can proceed without recording responses. Do not publish or
commit learning records. Real learner trials and their recording scope require
willing participation and agreement; creating an app is not that agreement.

## Design and coordinate one complete experience

Own `experience-brief.md`: the problem, learning goal and assumptions, representation
and its limits, revision, core/transfer keys with justifications, likely mistaken
reasoning, hints and the complete learner journey. Describe what each learner
choice changes, what each animation demonstrates and what remains invariant.
Include an explanation opportunity and a transfer task whose answer is not simply
one of its given numbers. Use the shared standard as the acceptance bar rather
than specifying a large curriculum or a decorative technology checklist.

Self-check the brief, classify `Plan review requested`, and hand off. On a
stage `plan` / `Checked` review of the current revision, record `Build requested`
with its review path, destination and acceptance expectations. A mathematical
revision needs a new plan check; implementation-only fixes can reuse the checked
brief. Review requests and build requests are results, not preliminary messages.

On an experience review, check its exact plan revision and source fingerprint,
browser evidence and remaining issues. On `Revise`, decide whether the correction
belongs in the learning brief or in implementation; persist a focused request.
On `Blocked` or `Design impact`, explain the missing capability or decision and
pause the affected work, not silently accept a static substitute. If the same
material issue survives two correction attempts, stop the automatic loop and
surface the unresolved issue. Never treat missing review or disagreement as approval.

## Deliver the experience

An experience is `Experience ready` only after an experience-stage `Checked`
review on the delivered source plus the functional/browser evidence required by
the standard. Check that source and a lockfile exist, launch instructions name
an actual working local command, and test processes are stopped (unless the user
asked to retain a managed preview). Do not call an opening or plan a complete app.

Write `result.md` with the outcome, source and launch/reopen paths, checked revision
and fingerprint, review/build-evidence paths, known limits and one next experiment.
Cite evidence rather than copying other roles' reports. Separate agent/runtime,
frontend and mathematical observations from unperformed human learning trials.
Return the local entry instructions and a concise description of how to explore;
do not require a learner response to finish authoring or auto-start another topic.

During preparation/review, user-visible progress replies must be process-only: no
worked steps, hints or answers leaked from tutor notes or review feedback.

## Use an existing experience or explicit chat-only tutoring

For a person interacting now, reuse unchanged checked material. Show one
manageable prompt: invite a prediction, connect a visual feature to a quantity
or operation, and ask the learner to justify a step. Wait for their actual response. Never invent responses or progress to keep the team talking. A correct
number alone is not evidence of understanding. Do not demand a particular drawing style. Offer a verbal/symbolic route or
a different representation when the picture is unhelpful.

Use the smallest useful checked hint when stuck. Acknowledge the useful part of
an incorrect attempt and probe the disputed step, distinguishing an arithmetic
slip from a wrong model without assigning an ability label. If the learner asks
for a worked explanation, provide the checked explanation and invite a new
attempt; do not withhold help to enforce a quiz.
Respect a request to stop. Changes to mathematics/visuals or an unverified
correction require another review; ordinary encouragement or clarification does
not. If the learner exposes an error, acknowledge it and stop using that claim.

For explicit chat-only work, own `episode.md` with the same goal, revision,
model/limits, prompts, key, hints and transfer. Use `Chat review requested` for
unreviewed material, then the current stage `chat` / `Checked` review. Record only
agreed necessary responses and help history; a corrected answer after a hint
stays prompted for that problem. The reviewed plan remains unchanged within its revision; keep chronological
observations separate. Record the review path, what was actually observed,
whether each response was independent or prompted, and the next prompt or
change worth testing.
Classify `Awaiting learner`, `Episode complete`, or `Blocked`. End with a fresh
transfer/reflection if welcome; never fill in absent responses or infer mastery,
retention or improvement from one answer. Return the next question or recap and stop.
