# Middle School Mathematics Team

**Two members:** [Learning Guide](agents/learning-guide/agent.md) teaches and
listens; [Mathematical Reviewer](agents/mathematical-reviewer/agent.md) checks
the mathematics and the planned learning interaction. See [team.md](team.md)
for the cooperation contract.

## Try the first version

Import this repository as a local AutoByteus agent package, or refresh the
existing import after updating it. Select **Middle School Mathematics Team**,
configure available models for both members, and choose a **private, writable
learning workspace outside this public repository**. No shared-agent package,
image generator, browser, or future organization is required. The model runtime
must supply the file, shell, and team-handoff tools listed in the member configs.
The acceptance rehearsal used `codex_app_server` with `gpt-6.1-sol` for both
members (2026-10-24). Use that tested combination when available for the first
trial, or run a synthetic check of your chosen configuration first. A
`gpt-5.6-luna` probe sent duplicate review requests; other models are not certified
by this package. Model availability and behavior can change.

Example request to the coordinator:

> Help me understand 3x + 6 = 18 using equal groups. Ask me to explain my steps,
> rather than showing the whole solution first. Use this private workspace.

Or:

> Why does splitting a rectangle help explain 3(x + 2)? Let me work it out.

The [starter episodes](agents/learning-guide/skills/guide-visual-math-learning/references/starter-episodes.md) contain tutor keys and sample
prompts, not learner-trial results. They demonstrate algebra–geometry connections
without prescribing a curriculum. Text sketches work in chat; the optional SVGs
can be opened locally. Tutor notes are separate from the learner-facing chat,
but not access-controlled: do not promise hidden answers in a shared workspace.

## Evaluation and next iteration

The creation task's [experiment record](../../tickets/in-progress/create-middle-school-mathematics-team/experiments.md)
separates automated checks, live agent behavior, and unrun human trials. Start
with a willing learner only after agreeing what, if anything, to record. Their
earlier examples may be used privately when supplied; none were copied here.

Open questions: which representation helps this learner explain equality; whether
area decomposition helps them justify distribution; when hints help versus give
away the reasoning; and whether they can explain a new problem later without
help. Decide the next episode from evidence before adding roles or subjects.
