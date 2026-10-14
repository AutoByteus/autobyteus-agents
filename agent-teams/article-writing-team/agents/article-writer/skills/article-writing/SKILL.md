---
name: article-writing
description: Produce a publication-ready article package through source-grounded research, hierarchical structure, reader-continuous drafting, review, and revision.
---

# Article Writing

Use this skill as the article writer's single end-to-end workflow: research phase, style and language decisions, hierarchical outline, visual plan, draft, revision, and delivery. The writer owns visual planning because image placement is part of the article's structure and explanation flow.

For source investigation, run `article-researcher` as the research phase (Step 2).

## Artifacts

[The article package](../../../../shared/article-package.md) lists the files in the work folder, their owners, and what every review handoff carries. This skill creates `brief.md`, `style-profile-notes.md`, `outline.md`, `visual-plan.md`, `visual-asset-index.md`, and the draft files.

Templates:

- [templates/style-profile-notes-template.md](templates/style-profile-notes-template.md)
- [templates/outline-template.md](templates/outline-template.md)
- [templates/visual-plan-template.md](templates/visual-plan-template.md)
- [templates/visual-asset-index-template.md](templates/visual-asset-index-template.md)

## Required Shared Reads

- Start by reading [the team writing principles](../../../../shared/writing-principles.md), the canonical quality bar before outlining, drafting, or revising.
- When platform packaging is in scope, read [the platform output rules](../../../../shared/platform-output-rules.md).

## Style And Language Reference

When style profile, bilingual behavior, or platform packaging is in scope, read [references/style-workflow.md](references/style-workflow.md).
That reference owns profile loading, example loading, bilingual expression, and style-fit checks. This skill owns artifact order, hierarchical structure, the outline gate, drafting, revision, and review handoffs.

## Workflow

### Step 1 - Write `brief.md`

Record:

- mode, platform, language, audience, one-sentence takeaway, depth target
- style profile, selected profile variant, rhetorical mode, opening stance
- understanding mode (named in the writing principles) and allowed investigation methods
- source basis
- visual expectations and constraints: whether image generation, sourced images, diagrams, screenshots, or no visuals are appropriate
- active user constraints from revision feedback such as `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`
- explicit limitations or bootstrapping notes when relevant

If no mode is explicit, infer the smallest mode that can support the requested article.

If a missing detail changes the article's direction and the request, workspace, and sources cannot settle it, ask the user a targeted question before continuing.

### Step 2 - Build the understanding package

When the article needs factual, technical, document, source-code, or supplied-material understanding, run the bundled `article-researcher` skill as this workflow's research phase.
It owns source inspection, understanding notes, source index, claim/evidence ledger, `research-handoff.md`, and the research readiness gate; it updates the research fields of `brief.md`.

- Reuse an existing research package before starting new discovery.
- Use the smallest research mode that can support the intended article; do not under-research load-bearing claims.
- Do not outline from vague notes. The research phase must leave a writer-ready `research-handoff.md` with supported claims, mechanisms, chronology, caveats, and a candidate evidence-based spine.
- If the source basis cannot support the intended article, narrow the claims or ask a targeted question before outlining.

### Step 3 - Resolve the style package

Use [references/style-workflow.md](references/style-workflow.md) when style profile, bilingual behavior, platform packaging, or author voice is in scope.

Create or update `style-profile-notes.md`.
Record:

- selected profile ID and display name
- profile file path read from the local bundled skill
- example file paths read from the local bundled skill
- selected profile variant or stance mode
- rhetorical mode
- platform and language rules that materially affect the article
- opening progression: the positive subject/system orientation and the next observed pressure or question
- justified opening exception, if the first move is intentionally negative or contrastive
- voice, structure, rhythm, terminology, and ending constraints
- forbidden style moves for this request
- active user corrections such as `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`
- bootstrapping limitations when the profile has weak evidence
- evidence constraints for style-sensitive moves such as contrast, `should`, common-belief claims, root-cause claims, and production observations

Do not leave style fit implicit in chat. The reviewer must be able to read `style-profile-notes.md` and understand what style standard the draft was trying to meet.

### Step 4 - Pre-outline gate

Before writing `outline.md`, verify:

- `brief.md` records target, audience, mode, platform, language, and constraints
- `research-handoff.md` has been read when the research skill produced it
- `style-profile-notes.md` records profile, variant, rhetorical mode, and style constraints when style matching is in scope
- the opening progression matches the selected stance; non-essay modes do not plan a negative-first opening without a recorded exception
- `understanding-notes.md` and `source-index.md` support the intended article scope
- `claim-evidence-ledger.md` exists when the article needs explicit evidence tracking
- no planned contrast, common-belief claim, recommendation, root-cause claim, or production observation lacks an evidence anchor

If a gate fails, update the relevant upstream artifact before outlining.

### Step 5 - Build the hierarchical structure in `outline.md`

Build the structure from large units to small units. Fill every field of [the outline template](templates/outline-template.md) with specifics: article contract (title options, opening stance and progression, thesis or bounded observation, one logic spine, reader starting point, scope and non-goals, ending move), the idea spine with a representation decision for each major idea, reader progression, question ladder, and a section spine with paragraph beats.

If the user provides a practical sequence such as `we used X -> it worked in Y way -> it started to break at Z -> we changed to W -> we observed Q`, preserve that sequence as the section spine instead of rewriting it into a generic essay shape.

Representation modes follow the visualization-load trigger in the writing principles; every `prose-only` idea records why the reader does not need to build or hold a mental model to continue.

Then complete the template's Structural Gate. If the structure is weak, revise `outline.md` before writing detailed prose. Style, visuals, and title polish do not hide an unresolved structure.

### Step 6 - Create `visual-plan.md` when visuals would help

Create `visual-plan.md` when:

- the user asks for images, diagrams, screenshots, or visual explanation
- the article is technical, architectural, process-heavy, comparative, data-backed, or long enough that visuals would improve comprehension
- the platform or audience expects visual pacing
- the outline contains mechanisms, sequences, boundaries, comparisons, or abstractions that would be clearer visually
- any idea meets the visualization-load trigger in the shared writing principles

Do not create visuals merely to decorate the article. If the article should remain text-only, record that decision briefly in the outline or brief.

For each planned visual, fill [the visual plan template](templates/visual-plan-template.md).

When using image generation, keep prompts constrained by the understanding package. Name the article-specific entities, relationships, action or state, and one visual proposition. Do not ask the image model to invent real interfaces, metrics, architecture, people, logos, or source evidence. Short exact labels are allowed when they materially improve comprehension; view the final raster and regenerate or revise incorrect or unreadable text. Production method and tool order follow the writing principles (visuals section). Do not use an ordinary low-quality SVG diagram as the default.

Reject or redesign a visual when a generic illustration could replace it without changing what the reader learns. A caption may expand the image's meaning, but it must not be the only place where the article-specific mechanism exists. If the image repeats the prose without adding its recorded responsibility, revise the representation decision or omit the image.

### Step 7 - Pre-draft review and gate

When Steps 1-6 and their gates pass, the package is ready for the pre-draft review of the understanding basis, style basis, outline, and visual plan. Send it as [the article package](../../../../shared/article-package.md) describes, then wait for the reviewer's result.

Before writing the full draft, verify:

- the outline has passed review or the user explicitly skipped the outline gate
- any review findings against understanding, evidence, style basis, structure, or the visual plan have been resolved in the corresponding artifact
- `style-profile-notes.md` and the outline agree on opening stance, profile variant, rhetorical mode, and forbidden moves
- each planned visual links to a representation decision and passes the self-contained takeaway test

If a gate fails, update the upstream package before drafting.

### Step 8 - Draft the article package

- Expand the approved outline top-down: article promise -> section spine -> paragraph beats -> paragraph reasoning -> sentence polish.
- Compose prose and planned visuals as one explanatory unit: the prose carries its recorded responsibility, the image carries its recorded responsibility, and the pair delivers the combined takeaway without accidental duplication.
- Preserve the approved section order and paragraph jobs. If drafting reveals a structural problem, stop and revise `outline.md` rather than silently improvising a new article shape.
- Expand paragraphs only as far as their beat requires. A useful default for explanatory prose is claim -> explanation or mechanism -> evidence/example -> implication or transition; omit a component when the article does not need it.
- Draft with known-to-new movement: begin from an established referent or question, introduce one next concept, state its relation, and only then move to another concept.
- Write or preserve a bridge whenever the article changes topic, time, actor, abstraction level, scope, or evidence type. Do not assume the reader will infer why the shift is relevant.
- For single-language work, write `article.md`.
- For bilingual or conversion work, write the full draft set needed for review.
- Keep the draft aligned to the shared writing principles and the requested style profile.
- Keep the draft inside the selected profile variant and rhetorical mode.
- If the article is about the user's own product or workflow, use builder ownership language unless the user explicitly wants detached report prose.
- In non-essay modes, draft the first paragraph positively: name the subject or system, state what it does or how we use it, then introduce the observed pressure, question, or proposed change. Do not use a negative or contrastive opener merely to create a hook.
- If a negative or contrastive opening is explicitly justified, preserve the recorded exception and make the reason legible before expanding the rest of the article.
- Use the understanding package as the source of truth. Do not introduce claims that are absent from the notes, source index, user brief, or ledger unless they are clearly marked as assumptions and accepted by the user.
- Treat author style as expression, not evidence. Do not add an opponent, common belief, industry claim, prior failure, or production observation only because it fits the selected profile.
- Preserve exact mechanisms, terminology, and source-code boundaries when those distinctions matter to the article.
- Prefer a clear reasoning chain over a dramatic hook when the article is explanatory, factual-technical, paper-like, or builder-report prose.
- Insert planned visuals at the point where they clarify the surrounding section, not at the end as a gallery.
- Include image references or stable placeholders, captions, and nearby prose that explain why the reader is seeing the visual.
- Create or update `visual-asset-index.md` when assets are generated, sourced, inserted, or intentionally omitted.
- If a planned visual cannot be truthfully produced, keep the placeholder explicit, mark the status in `visual-plan.md`, and do not replace it with a generic image.
- When the draft is complete, send the full package for draft review.

### Step 9 - Revise after review

- Read the review report fully.
- Fix the highest-level failing unit first: article promise, section spine, paragraph beats, paragraph reasoning, then local polish.
- If the article feels like a sequence of topics, rebuild the idea spine before editing transitions: established idea -> next idea -> reason it follows -> reader capability or next question.
- Re-run the compression test after structural edits: summarize each section and paragraph in one sentence and compare that map with the revised `outline.md`.
- Run a first-time-reader continuity pass after structural edits: read section endings and openings together, then paragraph openings and endings, and mark every `Where did this come from?`, `How does this follow?`, or `Why now?` moment. Repair the bridge, prerequisite, or order before polishing.
- If the draft's local paragraphs are strong but the global map is weak, revise the structure instead of preserving polished prose.
- If the reviewer reports `Understanding Gap`, `Source Gap`, or `Evidence Gap`, return to the understanding package before editing prose.
- If the reviewer reports `Visual Plan Gap`, revise the outline, visual plan, captions, assets, or article placement before polishing prose.
- If a finding needs information only the user has (brief details, source access, platform, a decision), ask the user targeted questions instead of guessing.
- Preserve the original audience and selected direction unless the review identifies that the direction itself is wrong.
- When style fit is weak, revise rhythm, transitions, and structural moves, not just isolated words.
- If the user or reviewer supplies a more exact mechanism, replace the earlier generic explanation immediately.
- If the active revision constraints include `too salesy`, `too detached`, or `too repetitive`, remove those failure modes explicitly instead of only softening them.
- After revisions, send the whole updated package for re-review.

### Step 10 - Deliver

When the reviewer's decision is `Pass`, give the user the absolute paths of the final article files and the visual assets, the platform and language of each draft, and any limitation the review report recorded.
