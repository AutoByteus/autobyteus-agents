---
name: article-writing
description: Produce a publication-ready article package through source-grounded research, hierarchical structure, reader-continuous drafting, review, and revision.
---

# Article Writing

Use this skill to produce article packages for the article writing team.
Use this as the single end-to-end writing workflow: coordinate the research phase, hierarchical article structure, style and language decisions, outline gate, article draft, and revision package.
Use the separate bundled `article-researcher` skill for source investigation when the article needs it; do not add another research agent or another writing skill.
The writer also owns visual planning because image placement is part of the article's structure and explanation flow.

## Package Artifacts

Research phase, when needed:

- `brief.md`
- `understanding-notes.md`
- `source-index.md`
- `claim-evidence-ledger.md` when factual, technical, or interpretive claims need explicit support

Writing phase:

- `style-profile-notes.md` when an author/style profile, rhetorical mode, or platform style is part of the task
- `outline.md`
- `visual-plan.md` when the article would benefit from diagrams, screenshots, generated images, charts, or other content-bearing visuals
- `visual-asset-index.md` when visual assets are sourced, generated, inserted, or intentionally omitted
- `article.md` or bilingual draft set

The reviewer owns `review-report.md`.

Use [templates/style-profile-notes-template.md](templates/style-profile-notes-template.md) for `style-profile-notes.md`.
Use [templates/outline-template.md](templates/outline-template.md) for `outline.md`.
Use [templates/visual-plan-template.md](templates/visual-plan-template.md) for `visual-plan.md`.
Use [templates/visual-asset-index-template.md](templates/visual-asset-index-template.md) for `visual-asset-index.md`.

## Required Shared Reads

- Start by reading [the team writing principles](../../../../shared/writing-principles.md).
- Use it as the canonical shared writing reference before outlining, drafting, or revising.

## Style And Language Reference

When style profile, bilingual behavior, or platform packaging is in scope, read [references/style-workflow.md](references/style-workflow.md).
That reference owns profile loading, example loading, bilingual expression, platform rules, and style-fit checks inside this workflow. The present `article-writing` skill remains the only owner of artifact order, hierarchical structure, outline approval, drafting, revision, and reviewer handoff.

## Workflow

### Step 1 - Write `brief.md`

Record:

- mode
- platform
- language
- style profile
- selected profile variant
- rhetorical mode
- opening stance
- audience
- one-sentence takeaway
- depth target
- understanding mode
- allowed investigation methods
- visual expectations, visual constraints, and whether image generation, sourced images, diagrams, screenshots, or no visuals are appropriate
- source basis
- active user constraints from revision feedback such as `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`
- explicit limitations or bootstrapping notes when relevant

Use one or more understanding modes:

- `supplied-source`: understand files, notes, pasted material, links, transcripts, screenshots, or source articles supplied by the user
- `workspace-source`: inspect project files, source code, docs, tests, logs, examples, or existing artifacts in the current workspace
- `online-research`: search the web, read websites, documentation, public repos, announcements, standards, papers, or other current sources when useful and allowed
- `paper-document`: read papers, PDFs, reports, manuals, specifications, or long documents
- `experiential-builder`: organize the user's firsthand sequence, observations, product decisions, runtime behavior, or implementation story

If no mode is explicit, infer the smallest mode that can support the requested article. Do not over-research a simple style rewrite, and do not under-research an article that makes technical, factual, or current-world claims.

### Step 2 - Build the understanding package

When the article needs factual, technical, document, source-code, or supplied-material understanding, run the bundled `article-researcher` skill as this workflow's research phase.
It owns the detailed research modes, source inspection, understanding notes, source index, claim/evidence ledger, research handoff, and research readiness gate.

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

Build the structure from large units to small units. Use the outline template and include:

- title options
- opening stance
- central question or reader problem
- thesis, promise, or bounded main observation, depending on the selected stance
- scope and explicit non-goals when they prevent overreach
- one primary logic spine, such as causal, chronological, problem-solution, question-answer, comparative, or derivational
- reader starting point: what the reader likely knows, assumes, or needs before the article begins
- opening progression: positive subject/system -> capability or current use -> observed pressure/question -> change, explanation, or proposal
- justified opening exception, if the first move is intentionally negative or contrastive
- idea spine / enrichment chain: for each major step, record the established idea, next idea, why it follows now, and the reader capability or question it creates
- representation mode for each major idea: `prose-only`, `image-led`, or `prose-and-image`
- prose responsibility, image responsibility, combined reader takeaway, and visual ID or `none` for each representation decision
- reader progression: what the reader should understand after each major step, expanding the idea spine rather than listing topics
- a reader question ladder: what question or need each step answers and what question, consequence, or decision it creates next
- the section spine: one sentence per section in reading order, with each section's job, predecessor or question, evidence burden, and successor or implication
- a reader bridge into and out of every section when the relationship is not self-evident
- paragraph beats inside every section: one sentence per planned paragraph or equivalent short-note unit, with its job and evidence/mechanism/example
- the expansion pattern for each major section, such as claim -> mechanism -> evidence/example -> implication
- visual opportunities for sections where an image, diagram, screenshot, chart, or table would materially improve understanding
- intended ending move

If the user provides a practical sequence such as `we used X -> it worked in Y way -> it started to break at Z -> we changed to W -> we observed Q`, preserve that sequence as the section spine instead of rewriting it into a generic essay shape.

Use the following structural checks before handoff:

- The article can be summarized as one central promise or bounded answer.
- For non-essay modes, the first paragraph positively introduces the real subject/system before discussing what was not used, missing, rejected, or proposed instead.
- Any negative or contrastive first move is explicitly justified by the request or source-grounded correction and recorded in the outline.
- The idea spine is continuous: every major step follows from the established idea, adds a necessary contribution, and creates the next question or capability.
- Every major idea has an intentional representation mode. If it uses both prose and image, their responsibilities are distinct and their combined takeaway is explicit; if it is prose-only, the outline explains why an image adds no information.
- Every section adds a new claim, mechanism, evidence, example, decision, or implication.
- Each section follows from the preceding section and prepares the next one; the order is not merely topical.
- The chosen logic spine remains stable; the article does not switch from chronology to taxonomy or from explanation to promotion without a signpost and reason.
- The reader question ladder is continuous: each section answers a prepared question or need and creates a reason for the next section.
- Every meaningful shift in topic, time, actor, abstraction level, scope, or evidence type has a bridge or an explicit signpost.
- Each paragraph beat has one dominant job and can be compressed to one sentence.
- The conclusion resolves or compresses the article's promise instead of introducing a new core idea.
- The outline does not use style, visuals, or title polish to hide an unresolved structure.

If the structure is weak, revise `outline.md` before writing detailed prose. Do not proceed to full drafting unless the reviewer passes the outline or the user explicitly wants to skip that gate.

### Step 6 - Create `visual-plan.md` when visuals would help

Create `visual-plan.md` when:

- the user asks for images, diagrams, screenshots, or visual explanation
- the article is technical, architectural, process-heavy, comparative, data-backed, or long enough that visuals would improve comprehension
- the platform or audience expects visual pacing
- the outline contains mechanisms, sequences, boundaries, comparisons, or abstractions that would be clearer visually

Do not create visuals merely to decorate the article. If the article should remain text-only, record that decision briefly in the outline or brief.

For each planned visual, record:

- visual ID
- idea-spine or section-beat reference
- representation mode: `image-led` or `prose-and-image`
- target section and exact placement intent
- reader problem the visual solves
- visual proposition: the one nearby idea the image must make concrete
- prose responsibility: what the surrounding text carries
- image responsibility: what this visual adds
- combined reader takeaway: what the reader should understand from both
- concrete entities that must be visible
- relationships, direction, state, or lifecycle that must be visible
- minimum reader takeaway without reading the caption or body prose
- visual type: architecture diagram, workflow diagram, sequence diagram, concept map, comparison matrix, timeline, annotated screenshot, code-path map, artifact map, evidence chart, generated illustration, or other
- content that must appear
- content that must not be invented
- required labels or text, if any
- source or evidence anchor from the understanding package
- caption draft
- why the selected production method is clearer than a generic alternative
- production method: built-in `image_gen__imagegen` first when available in the active runtime; image-to-image when a concrete reference improves fidelity; configured `generate_image` second if the preferred tool is unavailable or fails; high-quality HTML/raster diagram only as an explicit exception; or placeholder
- asset path when already available
- status: `planned`, `generated`, `inserted`, `omitted`, or `needs user input`

When using image generation, keep prompts constrained by the understanding package. Name the article-specific entities, relationships, action or state, and one visual proposition. Do not ask the image model to invent real interfaces, metrics, architecture, people, logos, or source evidence. Short exact labels are allowed when they materially improve comprehension, but inspect the final raster and regenerate or revise incorrect or unreadable text. Do not use an ordinary low-quality SVG diagram as the default; use a high-quality HTML-rendered or rasterized diagram only when explicitly justified.

Reject or redesign a visual when a generic illustration could replace it without changing what the reader learns. A caption may expand the image's meaning, but it must not be the only place where the article-specific mechanism exists. If the image repeats the prose without adding its recorded responsibility, revise the representation decision or omit the image.

### Step 7 - Pre-draft gate

Before writing the full draft, verify:

- the outline has passed review or the user explicitly skipped the outline gate
- `outline.md` contains the article promise, section spine, paragraph beats, evidence burden, and ending move
- the first-paragraph progression is explicit and follows the selected opening stance
- `outline.md` contains the chosen logic spine, idea spine, representation decisions, reader question ladder, and section bridges where needed
- the compressed section and paragraph maps form a coherent reader progression
- a first-time-reader pass finds no unprepared topic, time, actor, abstraction, scope, or evidence shift
- any review findings against understanding, evidence, style basis, or structure have been resolved in the corresponding artifact
- the selected author style is constrained by the shared writing principles, especially `Style Never Creates Facts`
- style-profile notes and the outline agree on opening stance, profile variant, rhetorical mode, and forbidden moves
- `visual-plan.md` exists when visuals are requested or clearly needed by the article shape
- each planned visual is linked to an idea-spine representation decision, has a clear visual proposition, and passes the self-contained takeaway test

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

### Step 9 - Revise after review

- Read the review report fully.
- Fix the highest-level failing unit first: article promise, section spine, paragraph beats, paragraph reasoning, then local polish.
- If the article feels like a sequence of topics, rebuild the idea spine before editing transitions: established idea -> next idea -> reason it follows -> reader capability or next question.
- Re-run the compression test after structural edits: summarize each section and paragraph in one sentence and compare that map with the revised `outline.md`.
- Run a first-time-reader continuity pass after structural edits: read section endings and openings together, then paragraph openings and endings, and mark every `Where did this come from?`, `How does this follow?`, or `Why now?` moment. Repair the bridge, prerequisite, or order before polishing.
- If the draft's local paragraphs are strong but the global map is weak, revise the structure instead of preserving polished prose.
- If the reviewer reports `Understanding Gap`, `Source Gap`, or `Evidence Gap`, return to the understanding package before editing prose.
- If the reviewer reports `Visual Plan Gap`, revise the outline, visual plan, captions, assets, or article placement before polishing prose.
- Preserve the original audience and selected direction unless the review identifies that the direction itself is wrong.
- When style fit is weak, revise rhythm, transitions, and structural moves, not just isolated words.
- If the user or reviewer supplies a more exact mechanism, replace the earlier generic explanation immediately.
- If the active revision constraints include `too salesy`, `too detached`, or `too repetitive`, remove those failure modes explicitly instead of only softening them.

## Handoff Rules

- Send the outline package to `article_reviewer` before the full draft in the normal flow.
- Include the full cumulative package in every reviewer handoff: brief, understanding notes, source index, claim/evidence ledger when present, style-profile notes when present, visual plan when present, visual asset index when present, source basis, outline, draft files, and any material style notes.
- On revision rounds, resend the full cumulative package plus the latest review report context.
