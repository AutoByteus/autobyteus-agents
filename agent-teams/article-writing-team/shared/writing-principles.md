# Writing Principles

The one quality standard of the team. The writer builds an article by it and the reviewer judges by it, section by section, in the same order. The skills say who does what and when; the rules live here. Every statement below is a requirement: "each section does one job" means each section must.

An article is built like software:
- **The spine:** the line of ideas the reader follows.
- **One home per idea:** each idea stated once, where it belongs.
- **The test:** reading it as the reader would.
- **Work from large to small:** the point, then the section chain, then the paragraphs, then the sentences. A larger unit that is wrong cannot be fixed by polishing a smaller one.

## 1. Grounding: Style Never Creates Facts

- Every claim, opponent, common belief, observation, causal explanation, production experience and source context in the article comes from the understanding package (section 2) or from the user. Style may shape voice, rhythm, order, emphasis, title and rhetorical pressure; it never adds facts. This holds in every mode, in conversions and in polish passes.
- A contrast such as `not X, but Y`, `the common explanation is`, `the deeper problem is` or `X should start with Y` is allowed only when the `X` side is grounded in a source, a supplied note, an inspected code path, an observed workflow, a prior implementation, or an explicit user claim. If it is not, remove the contrast and write the supported claim directly.
- A `should` recommendation, a root-cause claim and a production observation (`we observed`, `we found`, `this worked`) need the same anchor. Do not frame the article as a debate or recommendation the user did not ask for.
- When style guidance conflicts with the source basis, the source basis wins. When the user gives a more exact mechanism, it replaces the earlier generic explanation at once.

## 2. Understanding Before Writing

- An article that depends on facts, systems, documents, code, papers, current events or supplied material is written from an explicit understanding package, named by its investigation modes:
  - `supplied-source`: files, notes, links, transcripts, screenshots or articles the user supplied;
  - `workspace-source`: project files, code, docs, tests, logs, examples or existing artifacts;
  - `online-research`: the web, documentation, public repositories, announcements, standards;
  - `paper-document`: papers, PDFs, reports, manuals, specifications, long documents;
  - `experiential-builder`: the user's firsthand sequence, observations, decisions and runtime behavior.
- Use the smallest set that honestly supports the article: do not over-research a style rewrite, and do not under-research technical, factual or current-world claims.
- Mechanism claims about code or a workspace rest on concrete paths, commands, observed behavior or artifacts. Current-world claims carry source dates and uncertainty. Claims about a paper or document come from reading it, not from its title or abstract.
- If understanding is weak, narrow the claims or investigate more before polishing prose. Going back to investigate at any stage is normal; record what was added.

## 3. Mode, Opening And Ownership

Choose the mode by the kind of article, never by whose material it is:

| Mode | Use when | How it reads |
| --- | --- | --- |
| `technical-blog` | **The default for any technical topic**, including the author's own product, workflow or experience. | An engineer explaining how something works and what they learned. It opens with the problem as the reader experiences it, then the answer in a few sentences, then a short map of the parts and how they connect (section 4). Sections are those parts in the order the reader needs them, not the order things happened. Each says which part of the problem it solves, what the solution is, how it works, a real example or number, and why it matters. Low rhetoric. |
| `essay` | Only when the user asks for an argument, opinion or strategic viewpoint. | The thesis in the first paragraph; a grounded contrast may open; medium to high rhetorical pressure. |
| `paper-report` | Only when the user asks for a formal, report-like or scientific document. | Scope, method, observations, limitations and bounded conclusions, in that order. |

- A story told in time order (we used, then it broke, then we changed) is not a mode. Use time order only when the topic itself is a history or a postmortem the user asked for; otherwise the history appears inside a concept section as evidence.
- Naming an author profile does not change the mode or authorize rhetoric (section 7).
- Do not open with `we did not`, `not X`, `unlike`, `rather than` or another negative frame about an alternative when it only sets up the subject (a real problem the reader has is not such a frame); a negative first move needs an explicit user request or an essential source-grounded correction recorded in the outline, and the article makes that reason clear before going on. Grounding a contrast does not make it the right opening. Do not open with meta-lines such as `This article explains…` or `This note describes…`.
- When the article is about the author's own product, workflow or runtime, the author's facts are written in first person (`we built`, `we measured`, `I review`), as evidence. Do not turn them into detached analyst prose, unless the user asks for it.

## 4. The Point And The Spine

- **Decide the point before outlining:** the problem it answers, as the reader experiences it (taken from the sources or the user's experience, never an invented pain); the main claim in one or two sentences, bounded by the evidence; the strongest evidence. If research changes what can honestly be claimed, change the claim.
- **Give the reader the map before the detail.** After the problem and the answer, show the parts and how they connect, in a few lines, a short list or one figure, so the reader sees the whole line before entering any part. Each section then picks up its part of the map; the shared problem is stated once in the opening, and a section names only the part it solves.
- **Choose one logic spine** and name it: in `technical-blog`, concepts in the order the reader needs them (each builds on the ones before); otherwise causal, problem-solution, question-answer, comparative, derivational, or chronological for a history. Do not switch organizing principle halfway without a signpost.
- **The section chain is the spine made concrete:** what the reader understands → the next idea → why it follows now → the question it creates. Each section has one claim, the reader question it answers, its evidence or mechanism, and what it leads to. A list of related topics is not a chain.
- **Preserve the user's own reasoning.** When the user derives a design (prior system → who or what did the work → what changed → new decomposition or boundary → product or workflow consequence → bounded conclusion), keep that logic inside the concept it explains; do not flatten it into generic claims. A sequence of events (`we used X → it did Y → we observed Z → we changed to W`) is evidence for a concept, not the article's structure, unless the user asks for the story.
- **The outline is short:** the point, the problem and the map, the opening and reader starting point, the anchor example (section 6), the section chain, visual decisions (section 8), the ending move. It is a structural contract, not a pre-written article; a weak outline is not fixed by polished paragraphs. Do not draft detailed prose while the point or the section chain is unstable: a section is ready to draft when its claim, the question it answers, its evidence and what it leads to are clear.

## 5. Sections, Paragraphs, Sentences

- **Each section does one job and adds one contribution:** a claim, mechanism, evidence, example, decision or implication. Typical jobs: define the claim, correct a shallow explanation, give evidence, introduce a model, explain implications, compress the conclusion. Split a section that mixes unrelated jobs.
- **Reader continuity.** Every section has an entry (what the reader knows and why they are here), a movement (the one new thing it adds) and an exit (what is resolved and why the next section follows). Bridge every shift in topic, time, actor, abstraction level, scope or evidence type that the reader cannot follow; name the relation (continuation, consequence, contrast, example, qualification, return to the question) in a clause, not in a sentence of its own. A bridge works without the author's private context. New ideas are allowed; unprepared ones are not.
- **Paragraphs:** one dominant job each; known-to-new movement (start from an established referent, introduce one concept, state its relation, then move on). A useful default for explanation is claim → mechanism → evidence or example → implication; drop what the paragraph does not need.
- **Every sentence carries information:** a fact, a number, a mechanism, a definition, an example, a source, or the answer to the question the reader just reached. A sentence that only moves the reader along carries nothing: a story bridge (`There's a second lesson here`, `Go back to the list`), a rhetorical question (`So what is still mine?`), an emphasis line, a teaser, or a slogan. Cut it, or fold the relation into the next informative sentence as a clause. Write as an engineer explains to a colleague, not as a narrator.
- **One home per idea.** State the main point once, in the opening, then support it; do not repeat it as a subtitle, a refrain or a closing motto. Repeating a key noun is fine; repeating a claim without new evidence, mechanism or implication is a structural failure. Do not restate the central claim in the opening, a transition and the ending unless its function changes; do not add a second table or summary that repeats the first; cut phrases such as `the important point is` that add nothing. The ending compresses the resolved argument; it introduces no new central idea.
- **Terms keep their boundaries.** When the article relies on distinctions (for example human doer, software work surface, application logic, application UI, agent runtime, agent team runtime, delivery boundary, artifact), keep them explicit; do not collapse them into `system`, `runtime`, `interface` or `process`. A word keeps one meaning throughout. A smoother sentence that is less accurate loses.
- **Checks on a draft:**
  - **Reverse outline:** compress each section and paragraph to one sentence and compare the map with `outline.md`. A map that is not a coherent progression is a structural problem, not a polish problem.
  - **First-time reader:** read section endings with the next openings, then paragraph boundaries, and mark every `Where did this come from?`, `How does this follow?` and `Why now?`. Fix the bridge, prerequisite or order.

## 6. Evidence And The Anchor

- Claims are carried by a concrete example, a repeated observed pattern, a named mechanism, a comparison, or a source. Evidence must change whether the claim is believable; decorative evidence does not count. A strong claim without support is a structural problem.
- **Show the thing early:** a real anchor (a worked example, real code, a command and its output, real numbers, a real artifact), with what it demonstrates; later sections reuse it to carry the argument. Code shown was run, or is marked as not run; numbers, quotes and outputs trace to the research package. An invented example is allowed only when labeled illustrative and adding no factual claim. Explanation with no anchor is a structural weakness.

## 7. Style And Platform

- Use an author's voice profile only when the user asks for that voice. Do not adopt a voice from what the workspace contains, such as a social-media voice guide or earlier posts, unless the user asks for it.
- A requested profile shapes word choice, rhythm, tone and examples, inside the chosen mode (section 3) and within the source basis (section 1). It never changes the mode or the structure, and never distorts the reasoning.
- If the profile is bootstrapping or weakly evidenced, keep structure and truth before attempting imitation. If it has variants, choose one and stay in it.
- Platform fit shapes title, pacing and formatting, never the argument. The packaging rules are in [platform-output-rules.md](platform-output-rules.md).

## 8. Visuals Are Structure

- **When an idea earns an image:** when following it requires the reader to hold several entities and how they move or relate at once (a roster of roles with a handoff, a package moving between parties, a before/after, a spatial or process layout, an object the reader has not seen). If the idea survives as one proposition the reader can hold, text is enough.
  - Earned: "Several specialists each own one stage, and the work passes from one to the next" (a roster and a handoff).
  - Not earned: "This tool is faster" (one proposition; an illustration only repeats it).
  - "The text already names the parts" is not a reason to skip an image; it is a reason to make the image non-redundant.
- **Where the trigger fires, decide:** `prose-only` (with the reason the reader needs no mental model), `image-led`, or `prose-and-image` (with what would be lost without either). Plan visuals from the reasoning flow, never append them, and place each where it clarifies the nearby section rather than interrupting it.
- **Each visual has a proposition, defined before its art direction:** the one nearby idea it makes concrete, the entities and relationships that must be visible, and a takeaway that survives without the caption. Reject a visual a generic illustration could replace without changing what the reader learns, unless it is intentionally a cover image; omit decorative images.
- **Visuals are claims.** No fake UI states, charts, architecture, screenshots, benchmarks, logos or source material; captions add no facts the understanding package does not hold.
- **Production:** high-quality raster images. Use the built-in `image_gen__imagegen` tool first when the runtime has it, image-to-image editing when a real reference improves fidelity, and the configured `generate_image` when the first is unavailable or fails. An ordinary SVG diagram is not the default; an HTML-rendered or rasterized diagram is an explicit exception when it is clearly more truthful. Short exact labels are allowed when they help; inspect the final raster and regenerate any wrong, invented or unreadable text.

## 9. Bilingual Fidelity (Only For Bilingual Or Conversion Work)

- Do not lose claims and do not add claims. Keep section intent, argument order and terminology stable.
- Rewrite natively in the target language instead of translating line by line.

## 10. Priorities And User Corrections

One order for writing, revising and reviewing. Fix the highest failing level first; a lower one never compensates for a higher one:

1. Factual and mechanism accuracy, including the user's corrections.
2. Understanding and source support: load-bearing claims checked against the primary source, not only the writer's notes.
3. The point, the mode and opening, and the ownership stance.
4. The section chain and reader continuity.
5. Paragraph jobs and bridges.
6. Evidence weight, and visual usefulness and factuality.
7. Style fit.
8. Bilingual fidelity and platform fit.
9. Sentence polish.

The user's feedback is a hard constraint on the next pass, carried until the article passes, and a revision is complete only when the failure is removed, not softened:

| User cue | Response |
| --- | --- |
| `too salesy`, `too much Medium tone`, `too much rhetoric`, `reads like a novel`, `like literature` | Move to `technical-blog` (or `paper-report` if asked); remove contrastive hooks, emphasis lines, rhetorical questions and story bridges. |
| `be direct`, `start from what we used`, `write from our product perspective` | Open on the system as it is and what it does; the author's facts in first person. |
| `too detached`, `sounds like someone else built it` | Restore builder ownership language throughout. |
| `too repetitive`, `don't repeat again and again` | Remove repeated restatements, duplicate summaries and second comparison tables. |
| `too indirect`, `too much like an article about the article` | Open on the subject itself; remove meta-commentary. |
| `more factual`, `scientific`, `paper-like` | Lead with scope, mechanism and observation, not thesis compression. |
| `not accurate`, with new detail | Replace the generic explanation with the user's mechanism. |
| `this feels vague` | Replace blurred nouns with the exact components (section 5). |

When several cues apply, follow the order above.
