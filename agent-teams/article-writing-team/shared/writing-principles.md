# Writing Principles

This is the shared writing reference for the article writing team.

Use these principles for draft creation and review work.
They are the shared writing language for this team.
This is the canonical shared guidance file for article quality: thesis shape, structure, evidence expectations, style handling, bilingual fidelity, platform fit, and common failure patterns live here.

## Core Principles

### 1. Opening Stance Must Match The Request

- Every article needs a strong opening, but not every article needs the same kind of opening.
- The opening stance should be chosen explicitly:
  - `thesis-first`: for argumentative Medium-style essays
  - `scope-first`: for factual technical explanation
  - `builder-direct`: for firsthand product or workflow narration
  - `paper-report`: for more formal or report-like prose
- A strong opening should tell the reader what kind of article they are reading within the first section.
- Do not force `not X, but Y` or a compressed thesis hook when the request is better served by a direct system description or builder-owned sequence.

### 2. Outline Before Full Draft

- The outline is not a formality. It is the structural contract for the article.
- A strong outline should show:
  - working title options
  - the selected opening stance
  - section-by-section purpose
  - the evidence, mechanism, examples, or reasoning burden of each section
  - the intended ending move
- Do not compensate for a weak outline with polished paragraphs.

### 3. One Section, One Job

- Each section should push the argument forward in one clear way.
- Typical section jobs:
  - define the main claim
  - correct a shallow explanation
  - provide evidence or repeated observation
  - introduce a model or framework
  - explain implications
  - compress the conclusion
- If multiple unrelated jobs are mixed into one section, split or reorder them.

### 4. Evidence Must Carry Real Weight

- Claims should be supported by some combination of:
  - concrete example
  - repeated observed pattern
  - named mechanism
  - comparison or contrast
  - source-backed evidence when research is part of the task
- Evidence should not be decorative. It should change whether the claim is believable.
- If the article makes a strong claim without enough support, the support problem is structural, not stylistic.
- If the user later provides a more exact mechanism, replace the earlier generic explanation instead of preserving the abstraction for stylistic continuity.

### 4A. Derivation Must Be Preserved When The Article Depends On It

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

### 5. Style Is A Constraint, Not Decoration

- When a style profile is requested, the draft should match that profile in:
  - opening stance
  - thesis behavior
  - paragraph rhythm
  - transition style
  - tone
  - typical evidence style
  - ending shape
- Style matching should not distort the core reasoning.
- If the requested profile is bootstrapping or weakly evidenced, preserve structure and truthfulness before attempting high-confidence imitation.
- If a profile has variants or stance modes, choose one explicitly and keep the draft inside that variant.

### 6. Platform Fit Should Shape Packaging, Not Weaken Reasoning

- The platform matters for title, pacing, and formatting.
- Platform fit should improve readability, not flatten the argument into generic content.
- The final package should feel native to the platform while preserving the intended thesis, structure, and depth.

### 7. Bilingual Fidelity Means Logic Preservation Plus Native Expression

- In bilingual or cross-language work:
  - do not lose claims
  - do not invent claims
  - preserve section intent and argument order
  - keep terminology stable when precision matters
  - rewrite naturally in the target language instead of translating line by line
- The target-language draft should read like a native article, not like a mirrored source text.

### 8. Review Must Challenge Structure Before Polish

- Review should prioritize:
  - factual accuracy
  - mechanism accuracy
  - opening stance correctness
  - outline integrity
  - logic continuity
  - evidence sufficiency
  - style fit
  - bilingual fidelity when relevant
  - platform fit
  - final line-level clarity
- Do not bury major structural problems under many small edits.
- A review that only line-edits a structurally weak article is not doing its job.

### 9. Directness And Ownership Matter

- If the article is about the author's own product, workflow, or runtime change, the draft should usually use builder ownership language such as `we used`, `we observed`, and `we changed`.
- Do not let the article sound like an outside analyst if the user is clearly writing from firsthand ownership.
- Direct builder narration is usually stronger than detached meta-openers such as `This article explains...` when the article is based on internal implementation or internal experiments.

### 9A. Terminology Must Preserve Real Boundaries

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

### 10. Redundancy Is A Structural Failure

- Repetition of key nouns can be useful.
- Repetition of the same claim without new evidence, mechanism, or implication is a structural weakness.
- Each section should add at least one new contribution.
- If one table already carries the main comparison, do not add a second summary table that merely repeats it.
- Compress conclusion sections instead of reopening the same claim a third time.

### 11. User Corrections Override Style Habit

- When the user says `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`, treat that as an active correction to the writing direction.
- Revision precedence should be:
  1. factual accuracy
  2. mechanism accuracy
  3. ownership stance
  4. logic and structure
  5. style fit
  6. local polish
- A revision is not complete if it only softens the problem without actually removing the failure mode.

## Shared Failure Patterns

- wrong opening stance for the requested article type
- weak or delayed thesis when thesis-first framing is actually required
- outline sections that do not build on one another
- repeated claims without new evidence
- repeated summary sections or duplicated comparison tables
- examples that do not actually prove the point
- style mimicry without real argument control
- detached analyst tone on a builder-owned article
- vague system nouns that collapse real boundaries the user explicitly described
- platform polish masking shallow structure
- bilingual conversion that preserves words but loses reasoning
- strong local paragraphs with a weak overall article arc

## Required Questions

- What opening stance does this article actually need?
- If the article is thesis-first, what is the thesis, and where does it appear?
- What does each section contribute to the thesis?
- What evidence or mechanism makes the central claim believable?
- Does the requested style affect only wording, or does it also affect structure and argument rhythm?
- Is the article using the right ownership stance for who is speaking?
- If the user supplied a more exact mechanism during revision, did the draft replace the earlier generic explanation?
- Does every important noun still have a stable referent at sentence level, or did the draft blur distinct boundaries together?
- Is the article genuinely ready for the requested platform?
- If bilingual, does the target version preserve logic while sounding native?
- If revised, were the substantive issues actually resolved, or only softened?
