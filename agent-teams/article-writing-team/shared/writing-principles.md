# Writing Principles

Read this file before drafting or reviewing an article package. It is the canonical quality standard for thesis shape, structure, evidence, visual planning, style, bilingual fidelity, platform fit, and common failure patterns.

## Core Principles

### 1. Style Never Creates Facts

- Author style may shape voice, rhythm, section order, emphasis, title flavor, and rhetorical pressure.
- Author style must never create facts, opponents, common beliefs, observations, causal explanations, production experience, source context, or claims that are absent from the understanding package.
- Every article mode obeys this rule: `essay`, `factual-technical`, `builder-direct`, `paper-report`, bilingual conversion, and polish passes.
- A contrastive frame such as `not X, but Y`, `the common explanation is`, `the deeper problem is`, or `X should start with Y` is allowed only when the `X` side is grounded in a source, supplied note, inspected code path, observed workflow, prior implementation, or explicit user claim.
- If the negative side of a contrast is not grounded, remove the contrast and write the supported positive claim directly.
- If style guidance conflicts with the source basis, the source basis wins.

### 2. Understanding Comes Before Writing

- The article should be based on an explicit understanding package when the request depends on facts, systems, documents, code, papers, current events, or supplied source material.
- Understanding can come from one or more investigation modes. Name them in `brief.md` and the research package:
  - `supplied-source`: files, notes, pasted material, links, transcripts, screenshots, or source articles the user supplied
  - `workspace-source`: project files, source code, docs, tests, logs, examples, or existing artifacts in the current workspace
  - `online-research`: web search, websites, documentation, public repos, announcements, standards, or papers, when useful and allowed
  - `paper-document`: papers, PDFs, reports, manuals, specifications, or long documents
  - `experiential-builder`: the user's firsthand sequence, observations, product decisions, runtime behavior, or implementation story
  - With no explicit mode, infer the smallest set that supports the requested article. Do not over-research a simple style rewrite, and do not under-research an article that makes technical, factual, or current-world claims.
- The writer should use the smallest investigation scope that can honestly support the article, but should not draft around a vague source basis.
- For source-code or workspace-backed articles, concrete file paths, commands, observed behavior, or project artifacts should support mechanism claims.
- For online or current-world claims, source dates and uncertainty matter.
- For papers and documents, article-specific claims should come from actual reading, not title-level inference.
- If understanding is weak, narrow the article's claims or investigate more before polishing prose.
- Drafting often exposes a gap the research missed. Going back to investigate at any stage is normal; record what was added in the research package.

### 3. Opening Stance Must Match The Request

- Every article needs a strong opening, but not every article needs the same kind of opening.
- Choose the opening stance and the opening progression explicitly:
  - `thesis-first`: for argumentative Medium-style essays; a grounded contrast may appear immediately when the user wants argument pressure or the article must correct an established claim.
  - `scope-first`: for factual technical explanation; introduce the system, scope, or main observation directly.
  - `builder-direct`: for firsthand product or workflow narration; begin from what we used, what it did, and what we observed.
  - `paper-report`: for more formal or report-like prose; begin from scope, method, system boundary, or observed behavior.
- A strong opening should tell the reader what kind of article they are reading within the first section.
- For non-essay modes—especially `builder-direct`, `scope-first`, and `paper-report`—use a positive-first progression:
  `real subject or system -> what it does or how we use it -> observed pressure or question -> change, explanation, or proposal`.
- In these modes, do not begin the first sentence or paragraph with `we did not`, `not X`, `unlike`, `rather than`, or another negative/contrastive frame when it only sets up the subject. Introduce the supported subject directly, then explain the limitation or alternative after the reader has an anchor.
- A grounded contrast is not automatically the right opening. Use a negative or contrastive first move only when the user explicitly requests it, the article is intentionally `thesis-first`, or the contrast is essential to a source-grounded correction and the outline records that reason.
- Do not force `not X, but Y` or a compressed thesis hook when the request is better served by a direct system description or builder-owned sequence.

### 4. Decide The Point, Then Outline Small

- Before outlining, decide the point: what the article claims in one or two sentences, why this reader cares or what is new for them, and the strongest evidence. If research changed what the article can honestly claim, change the claim.
- The outline fixes the point and the order of the sections. It is a short structural contract, not a pre-written article.
- Keep one section chain in `outline.md`: `what the reader understands -> next idea -> why it follows now -> what it makes the reader ask next`. Each section's claim, the question it answers, and what it leads to are read off that chain; if they disagree, resolve it in the outline before drafting.
- A strong outline shows:
  - working title options and the selected opening stance
  - the main claim, central question, or bounded main observation
  - the reader and what they know at the start
  - the anchor example (see 4D)
  - the sections in reading order, each with a one-sentence claim, the reader question it answers, its evidence, mechanism, or example, and what it leads to
  - visual opportunities where the visualization-load trigger fires
  - the intended ending move
- Do not compensate for a weak outline with polished paragraphs.

### 4A. Visuals Are Article Structure, Not Decoration

- Visuals should be planned from the article's reasoning flow, not appended after the prose is finished.
- A useful visual explains, structures, compares, evidences, or summarizes a nearby section claim, mechanism, sequence, boundary, or decision.
- **Visualization-load trigger:** an idea earns an image when a reader must construct and hold a mental model to follow the prose — a structure, sequence, movement, or concrete referent they otherwise have to build in their head. Common triggers: a roster of distinct roles with a handoff; a package or context moving between named parties; a before/after or comparison; a spatial or process layout; a concrete object the reader has not seen. The simple test: if understanding requires the reader to keep several things and how they move or relate in mind at once, that moment deserves an image.
- "The text already names the parts" is **not** a reason to skip an image; it is a reason to design the image to be source-grounded and non-redundant. Redundancy and source-risk constrain what the image may invent and how it stays truthful; they do not decide whether an image appears at all.
- Define the visual proposition before its art direction: state the one nearby idea the image must make concrete, the entities and relationships that must be visible, and the reader takeaway that should survive without the caption.
- Derive each visual plan from a section where the visualization-load trigger fires. Image generation executes the planned visual; it does not decide which idea deserves an image.
- Decorative images, generic stock-like illustrations, and images that merely make the article look longer should be omitted.
- Visuals obey the same factual standard as prose. Do not create fake UI states, fake charts, fake architecture, fake screenshots, fake benchmarks, or fake source material.
- Captions are claims. Every caption should be supported by the understanding package and should not smuggle in new facts.
- For this workflow, prioritize high-quality raster images: when the built-in `image_gen__imagegen` tool is available in the active runtime, use it first; use image-to-image editing when a concrete reference improves fidelity; use configured `generate_image` second when the preferred tool is unavailable or fails.
- Short exact labels, role names, state names, or action names may appear inside an explanatory image when they materially improve comprehension. Inspect the final raster and regenerate or revise any incorrect, invented, or unreadable text.
- Ordinary low-quality SVG diagrams are not the default publication medium. Use an HTML-rendered or rasterized diagram only as an explicit high-quality exception when it is clearly more truthful and useful than an image; do not let a generic generated image replace a required explanation either.
- If an article would be clearer with visuals, the outline or visual plan should show where they belong and what each one teaches the reader.

#### Visualization-load examples (shared by writer and reviewer)

Both the writer (when deciding representation mode) and the reviewer (when passing or rejecting it) apply the same trigger and the same reasoning, not just the same label.

- **Good — image earned:** "Several specialists each own one stage, and the work passes from one to the next." This is a roster plus a handoff; the reader must hold the roles and their flow, so a labeled roster/handoff diagram is called for.
- **Bad — image not earned:** "A single fact, such as 'this tool is faster', that the reader can hold as one proposition without tracking multiple moving parts." A decorative illustration would only repeat the sentence.
- **Good — image earned:** "An order moves from the customer to the warehouse to the courier." This is a multi-party movement the reader must track (who carries what to whom), so a labeled movement/graph diagram is called for.
- **Bad — image not earned:** resting a `prose-only` decision on "the text already names the parts." Naming the parts does not remove the reader's need to visualize the flow between them.
- **Why-rule:** if the idea survives as one proposition the reader can hold without straining, text is enough. If following it requires holding several entities and their movement or relationship at once, that is a visualization moment and it deserves an image.

### 4B. Build And Review From Global Structure To Local Prose

- Article work is hierarchical. Resolve the largest unit that can invalidate the work before expanding the next unit:
  1. main claim, scope, and bounded answer
  2. section chain and order
  3. paragraph expansion: one job per paragraph, built as claim, explanation or mechanism, evidence or example, and implication when needed
  4. sentence clarity, rhythm, and platform polish
- The writer should not draft detailed prose while the main claim or section chain is unstable.
- A section is ready to draft only when its claim, the question it answers, its evidence basis, and what it leads to are clear.
- Give each paragraph one dominant job. Split a paragraph that introduces a new claim, a mechanism, and a conclusion that deserve separate steps.
- The reviewer runs the same hierarchy in reverse: main claim first, then section progression, then paragraphs, and only then sentence-level polish.
- Before drafting, run the idea-chain test for every section: what the reader already understands, the next idea, why it follows now, and the question it creates. A list of related topics is not a coherent chain.
- Where the visualization-load trigger fires, choose `prose-only`, `image-led`, or `prose-and-image`. For `prose-and-image`, state what understanding would be lost if either medium were removed; for `prose-only`, state why the reader does not need to hold a mental model.
- Use a reverse outline on the draft: compress each section and each paragraph to one sentence, then compare that map with `outline.md`. If the compressed map cannot be explained as a coherent progression, route the issue back to structure rather than polishing prose.
- Each section must change the reader's understanding by adding a new claim, mechanism, evidence, example, decision, or implication. A conclusion should compress the resolved argument, not introduce another central idea.

### 4C. Protect Reader Continuity And Expectation

- A readable article can introduce new ideas; it must not introduce them without preparation. Novelty should feel earned, not random.
- Choose one primary logic spine for the article: causal, chronological, problem-solution, question-answer, comparative, derivational, or another explicitly named pattern. Do not make the reader infer a new organizing principle halfway through.
- Give every section a reader contract:
  - **entry:** what the reader already understands and what question or need brings them here
  - **movement:** the one new claim, mechanism, example, or decision this section adds
  - **exit:** what has now been resolved and why the next section follows
- Preserve known-to-new movement inside paragraphs. Start from an established referent or question, introduce the next concept, and explain its relation before adding another concept.
- Enrich rather than accumulate: each paragraph should do its one job and make the next paragraph or section more possible. Name the relation—continuation, consequence, contrast, example, qualification, or return to the central question—when the reader cannot infer it.
- Bridge every meaningful shift in topic, time, actor, abstraction level, scope, or evidence type. If a reader could ask `Why are we discussing this now?`, add the reason or change the order.
- At each section and paragraph boundary, make the relationship explicit when it is not obvious: continuation, consequence, contrast, example, qualification, or return to the central question.
- Audit the article as a first-time reader, not as its author. Mark every place where the reader may ask `Where did this come from?`, `How does this follow?`, or `What does this have to do with the promise?` and repair the bridge, missing prerequisite, or structure.

### 4D. A Technical Article Shows The Thing

- Show the subject early with a concrete anchor: a worked example, real code, a real command and its output, real numbers, or a real artifact. Say what the anchor demonstrates.
- The anchor must be real. Code shown was run, or is marked as not run; numbers, quotes, and outputs trace to a source in the research package. An invented example is allowed only when labeled illustrative and when it adds no factual claim.
- Later sections reuse the anchor to carry the argument where they can, instead of switching to abstraction.
- Explanation with no anchor is a structural weakness, like evidence with no weight (section 6).

### 5. One Section, One Job

- Each section should push the argument forward in one clear way.
- Typical section jobs:
  - define the main claim
  - correct a shallow explanation
  - provide evidence or repeated observation
  - introduce a model or framework
  - explain implications
  - compress the conclusion
- If multiple unrelated jobs are mixed into one section, split or reorder them.

### 6. Evidence Must Carry Real Weight

- Claims should be supported by some combination of:
  - concrete example
  - repeated observed pattern
  - named mechanism
  - comparison or contrast
  - source-backed evidence when research is part of the task
- Evidence should not be decorative. It should change whether the claim is believable.
- If the article makes a strong claim without enough support, the support problem is structural, not stylistic.
- If the user later provides a more exact mechanism, replace the earlier generic explanation instead of preserving the abstraction for stylistic continuity.

### 6A. Derivation Must Be Preserved When The Article Depends On It

- Some articles are not mainly thesis-first essays. They are derivations.
- In those cases, the article should preserve the user's reasoning chain instead of jumping to the conclusion too early.
- For architecture or system articles, a common derivation sequence is:
  - prior system
  - who or what was actually doing the work
  - what changed
  - new decomposition or boundary
  - practical UI, workflow, or product consequence
  - bounded conclusion
- If the user is reasoning from system structure to product consequence, do not rewrite the article into a generic opinion piece.

### 7. Style Is A Constraint, Not Decoration

- When a style profile is requested, the draft should match that profile in:
  - opening stance
  - thesis behavior
  - paragraph rhythm
  - transition style
  - tone
  - typical evidence style
  - ending shape
- Style matching should not distort the core reasoning.
- Style matching must operate within the source basis; it cannot add unsupported setup, conflict, or conclusions to sound more like the profile.
- If the requested profile is bootstrapping or weakly evidenced, preserve structure and truthfulness before attempting high-confidence imitation.
- If a profile has variants or stance modes, choose one explicitly and keep the draft inside that variant.

### 8. Platform Fit Should Shape Packaging, Not Weaken Reasoning

- The platform matters for title, pacing, and formatting.
- Platform fit should improve readability, not flatten the argument into generic content.
- The final package should feel native to the platform while preserving the intended thesis, structure, and depth.

### 9. Bilingual Fidelity Means Logic Preservation Plus Native Expression

- In bilingual or cross-language work:
  - do not lose claims
  - do not invent claims
  - preserve section intent and argument order
  - keep terminology stable when precision matters
  - rewrite naturally in the target language instead of translating line by line
- The target-language draft should read like a native article, not like a mirrored source text.

### 10. Review Must Challenge Understanding And Structure Before Polish

- Review should prioritize:
  - factual accuracy
  - mechanism accuracy
  - understanding sufficiency
  - source support, checked against the primary source for the load-bearing claims, not only against the writer's notes
  - claim/evidence alignment
  - opening stance correctness
  - outline integrity
  - logic continuity
  - evidence sufficiency
  - visual usefulness and factuality when visuals are part of the article package
  - style fit
  - bilingual fidelity when relevant
  - platform fit
  - final line-level clarity
- Do not bury major structural problems under many small edits.
- A review that only line-edits an under-investigated or structurally weak article is not doing its job.

### 11. Directness And Ownership Matter

- If the article is about the author's own product, workflow, or runtime change, the draft should usually use builder ownership language such as `we used`, `we observed`, and `we changed`.
- Do not let the article sound like an outside analyst if the user is clearly writing from firsthand ownership.
- Direct builder narration is usually stronger than detached meta-openers such as `This article explains...` when the article is based on internal implementation or internal experiments.

### 11A. Terminology Must Preserve Real Boundaries

- Technical accuracy is often lost when a draft compresses distinct things into one vague noun.
- If the article relies on distinctions such as:
  - human doer
  - software work surface
  - application logic
  - application UI
  - agent runtime
  - agent team runtime
  - delivery boundary
  - artifact
  then those terms should remain explicit.
- Do not replace a more exact mechanism with words like `system`, `runtime`, `interface`, or `process` if the reader can no longer tell what is actually meant.
- A sentence can be smoother and still be less accurate. Accuracy wins.

### 12. Redundancy Is A Structural Failure

- Repetition of key nouns can be useful.
- Repetition of the same claim without new evidence, mechanism, or implication is a structural weakness.
- Each section should add at least one new contribution.
- If one table already carries the main comparison, do not add a second summary table that merely repeats it.
- Compress conclusion sections instead of reopening the same claim a third time.

### 13. User Corrections Override Style Habit

- When the user says `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`, treat that as an active correction to the writing direction.
- Revision precedence should be:
  1. factual accuracy
  2. mechanism accuracy
  3. understanding sufficiency and source support
  4. ownership stance
  5. logic and structure
  6. style fit
  7. local polish
- A revision is not complete if it only softens the problem without actually removing the failure mode.

## Shared Failure Patterns

- author style creating an unsupported claim, opponent, common belief, or production observation
- `not X, but Y` where `X` is invented or absent from the evidence
- `should` framing that implies a debate or recommendation the user did not ask for
- wrong opening stance for the requested article type
- vague or missing investigation before drafting
- source-code or workspace claims without inspected file/path evidence
- claims that rest only on the writer's notes and were never checked against the primary source
- explanation with no concrete anchor (no worked example, real code, or real numbers)
- an over-detailed outline that stands in for a draft
- online/current claims without dates or source uncertainty
- paper/document claims inferred without deep reading
- weak or delayed thesis when thesis-first framing is actually required
- outline sections that do not build on one another
- unprepared shifts in topic, time, actor, abstraction level, scope, or evidence type
- transitions that rely on the author's private context instead of giving the reader a bridge
- a logic spine that changes mid-article without an explicit signpost
- repeated claims without new evidence
- repeated summary sections or duplicated comparison tables
- examples that do not actually prove the point
- missing visual plan for a technical or long-form article that needs diagrams, screenshots, or other structural aids
- visuals that are decorative, generic, or disconnected from the nearby section
- generated visuals, captions, diagrams, screenshots, or charts that invent unsupported facts
- visual placement that interrupts the reasoning flow instead of clarifying it
- style mimicry without real argument control
- detached analyst tone on a builder-owned article
- vague system nouns that collapse real boundaries the user explicitly described
- platform polish masking shallow structure
- bilingual conversion that preserves words but loses reasoning
- strong local paragraphs with a weak overall article arc
