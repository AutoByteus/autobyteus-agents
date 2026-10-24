---
name: guide-visual-math-learning
description: Prepare and conduct a short middle-school mathematics episode connecting a visual model to justified symbolic reasoning, then record learner evidence for the next iteration.
---

# Guide Visual Math Learning

Use for a learner's problem, attempt, or request to understand an idea. Read
[learning-standard.md](learning-standard.md) for the shared quality bar. Use
[starter-episodes.md](references/starter-episodes.md) for the initial equation and area
examples; these are tutor references, not text to reveal wholesale.

## Prepare one episode

Use supplied context and the learner's language. If level is unclear, offer one
small prediction or explanation to discover prerequisites; do not demand grades,
school details, or a curriculum choice before helping. Start with one idea, not
a complete course. Ask for prior experiments only when they would resolve a
specific teaching decision and let the user decline.

Use the supplied private learning workspace for `math-sessions/<episode-id>/`.
If only a public repository is available, ask for a private folder before saving
learner responses there; a generic explanation can proceed without saving them.
Do not collect names, school identifiers, or unrelated personal details. Do not
publish or commit learning records. Synthetic demonstrations must be labelled.

Own one `episode.md`: the goal and prerequisites, revision, visual model and its
limits, proposed prompts, tutor-only worked key with reasons, a hint ladder,
and an unassisted transfer question. Separate tutor material from what is shown
to the learner. Use a labelled text sketch or exact SVG with an equivalent text
description; no image service, website, or special hardware is required. For SVG,
keep labels and geometry inspectable and offer the text alternative if rendering
is unavailable. Do not use an attractive image as mathematical evidence.

Self-check against the shared standard, record `Review requested`, and hand off
the note and any diagram files. On `Revise`, fix the cited issue, increment the
revision, and request review again. On `Blocked`, surface the missing evidence
or tool and pause the affected material. If the same issue survives two revision
attempts, stop the automatic loop and explain the unresolved issue to the user.
Never treat missing review or disagreement as approval. During preparation and
review, any user-visible progress reply must be process-only: no worked steps,
hints, or answers from the tutor note or reviewer feedback. The first mathematical
reply to the learner is the checked opening prompt, not a summary of internal
corrections.

## Conduct the checked episode

Read the review and ensure it names the exact current revision and assets before
using `Checked` material. Show one manageable question at a time: invite a visual
prediction, connect a feature of the picture to a quantity or operation, then ask
the learner to justify a step. Wait for the person's response. Do not answer for
them, demand a particular drawing style, or infer mastery from a correct number.

When stuck, use the smallest useful hint, moving from noticing a feature to a
partial step. If the learner requests a worked explanation, provide the checked
explanation and invite a fresh attempt afterward; do not withhold help to enforce
a quiz. For an incorrect answer, acknowledge the useful part and ask a focused
question that tests the disputed step. Distinguish arithmetic slips from a wrong
model without assigning a permanent ability label.

Reuse the current review for already-checked prompts, hints, and explanations.
A new problem, changed diagram, new deduction, or unverified correction requires
a new revision and review before presentation. Ordinary encouragement and asking
the learner to clarify their own words do not need review. If a learner exposes
an error, acknowledge it, stop using that claim, and request a correction check.

## Observe and finish

Append only the necessary learner reasoning, hint level, and next prompt to
`episode.md`; the reviewed plan remains unchanged within its revision. End with
the transfer task and a short learner explanation of why the method works, or
respect their wish to stop. Never fill in missing responses.

Classify the current result as `Awaiting learner`, `Episode complete`, or
`Blocked`; `Review requested` is reserved for unreviewed material. Record the
review path, what was actually observed, whether each response was independent
or prompted, and one next question or change worth testing. One correct transfer
answer is narrow evidence, not proof of durable mastery or improved learning.
At `Awaiting learner`, return the one next question and stop. At completion,
return a brief recap and offer the next small episode rather than starting it
automatically. Real learner experiments require willing participation and an
agreed recording scope; approval to build this team is not that consent.
