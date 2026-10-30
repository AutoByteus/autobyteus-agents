# Middle School Mathematics Team

**Three members:** [Learning Guide](agents/learning-guide/agent.md) designs and
coordinates; [Experience Builder](agents/experience-builder/agent.md) implements
the frontend and motion; [Mathematical Reviewer](agents/mathematical-reviewer/agent.md)
checks the plan and then operates the actual app. [team.md](team.md) describes
cooperation; [team-config.json](team-config.json) owns routing.

## What it delivers

A local frontend project with a complete learner journey: predict, manipulate,
inspect meaningful animation, explain, receive feedback and try a new problem.
SVG may be a scene component, but a standalone SVG or thin wrapper is not a
finished experience. Explicit chat-only tutoring remains available when requested.

For a new small project the Builder can use React, Vite and Motion; it chooses
compatible versions and writes a lockfile. Existing suitable stacks can be reused.
No AI API, hosted backend, account or public deployment is needed. Dependencies
may need downloading at setup; ordinary learning interaction should then run
locally without sending learner data anywhere.

## Activate and try

Refresh/import this repository as an AutoByteus package and start a **new team
run** so the three-member roster and revised skills are loaded. Choose available
models for every member and a private writable output folder outside this public
repository. Provide file/shell, local Node/browser capability, image inspection
and team-routing tools listed in the configs. A sandboxed test-owned browser is
required for acceptance, not the user's existing browser profile.

Example request:

> Build a complete animated local learning experience about why splitting a
> rectangle explains multiplication over a sum. Let me predict, manipulate,
> explain and try a new problem. Use this private output folder. Provide source,
> working launch instructions and observed browser/mathematical evidence.

The app's README supplies its exact install, launch URL, test and stop commands.
The team should leave source and a way to reopen the preview, not an orphan server.
The authoring request finishes without asking the observer to role-play a learner.

## Evidence and boundaries

This refactor's result and analysis, kept with the maintainers' work records
outside this repository, record the actual tested configuration, demonstration
and remaining limits. Earlier experiments are historical evidence for the original two-member chat design, not validation
of the new frontend workflow. Earlier model-specific routing failures remain a
reason to rehearse your chosen model/runtime rather than assume equivalence.

Mathematical review and browser checks do not establish engagement, understanding
or retention. A real learner trial and any recording require separate agreement.
Keep learner-specific material private. Tutor notes and client-side answers are
not access-controlled assessment secrets. Prior examples can be supplied privately;
no larger curriculum or organization is required before trying one experience.
