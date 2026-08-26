# Style And Language Workflow

Use this reference inside the `article-writing` skill when the request includes author style, bilingual drafting, or platform-specific packaging.

This reference owns style-profile loading, platform rules, bilingual expression, and style-fit checks. The parent `article-writing` skill owns article-level structure, outline shaping, visual planning, drafting order, reviewer handoff, and revision packaging.
The local `article-researcher` skill owns investigation, understanding artifacts, source/evidence tracking, and reusable research handoff.
The shared team writing principles remain the article quality authority for both writing and review.

## Required Shared Read

- Start by reading [the team writing principles](../../../../../shared/writing-principles.md).
- Use it for structure, evidence, style boundaries, bilingual fidelity, and revision precedence; do not let a profile override it.

## Expected Research Inputs

Before applying style decisions or drafting, read the research package produced by `article-researcher` when the article requires factual grounding:

- `brief.md`
- `understanding-notes.md`
- `source-index.md`
- `claim-evidence-ledger.md` when present
- `research-handoff.md`
- `research-open-questions.md` when present

Treat these files as the source of truth. Do not redo research. If the package has a clear gap, stale source, unsupported planned claim, or user/reviewer correction, return to `article-researcher` with the exact missing claim or source need.

## Produced Writing Artifacts

- `style-profile-notes.md` when an author/style profile, rhetorical mode, or platform style is part of the task
- style-bound constraints applied to the current `outline.md` and draft set

## Workflow

1. Resolve and record the target before writing.
- Resolve mode: `original-draft`, `cross-language-conversion`, or `dual-draft`.
- Resolve platform: `WeChat`, `Medium`, or both.
- Resolve language: `Chinese`, `English`, or bilingual.
- In `cross-language-conversion`, resolve explicit `source language` and `target language`.
- Resolve author/style profile name.
- Resolve rhetorical mode: `essay`, `factual-technical`, `paper-like`, or `hybrid`.
- Resolve the opening progression, not only the opening stance. For `builder-direct`, `factual-technical`, and `paper-like` work, default to positive subject/system -> capability/current use -> observed pressure/question -> change, explanation, or proposal.
- Resolve objective, audience, and one-sentence takeaway.
- Resolve expected technical depth (math rigor, engineering detail, examples, references).
- Ask the user only when the missing target detail materially changes the article direction and cannot be inferred from the article brief.
- If user does not specify mode, default to `original-draft` in one language first.
- If user does not specify rhetorical mode, default to `factual-technical` for technical topics and `essay` only when the request clearly asks for a persuasive article.
- Do not assume that naming an author profile automatically authorizes high-rhetoric prose. Profile controls voice and structural habits; rhetorical pressure is a separate choice.
- If the user objects to prior drafts with phrases like `too salesy`, `too indirect`, `too much like an article about the article`, `too much contrast`, `too repetitive`, or `too detached`, treat those as hard style constraints for the next pass, not as soft preferences.
- In the article-writing team, record target decisions in `brief.md` and style-specific decisions in `style-profile-notes.md` instead of keeping them only in chat.

2. Load the correct style profile.
- Read `references/style-registry.md`.
- Normalize profile id to lowercase hyphen-case (for example: `Ryan Zheng` -> `ryan-zheng`).
- If profile exists in registry, read its mapped file under `references/profiles/`.
- If example file exists for that profile in registry, load it before drafting.
- If the selected profile defines internal variants or stance modes, choose one explicitly before the article-writing skill finalizes the outline. Record it in `style-profile-notes.md` as `profile + variant + rhetorical mode`.
- Prefer profile variants that answer the user's actual stance request, not the loudest version of the profile.
- If profile does not exist, create `references/profiles/<profile-id>.md` from `references/profiles/profile-template.md`, add a row in `style-registry.md`, and set status to `bootstrapping`.
- For `bootstrapping` status, require 2-5 sample articles before final drafting.
- In the article-writing team, `style-profile-notes.md` must include the profile path, example paths, selected variant, rhetorical mode, hard constraints, and forbidden moves so `article_reviewer` can review style fit from durable artifacts.

3. Read and verify the research package before outlining.
- Read `research-handoff.md` first, then `brief.md`, `understanding-notes.md`, `source-index.md`, and `claim-evidence-ledger.md` when present.
- Preserve the mechanisms, chronology, source-backed claims, caveats, and user-supplied sequences from the research package.
- If a planned claim, contrast, recommendation, root-cause statement, or production observation lacks an evidence anchor, return to `article-researcher` before drafting or narrow the claim.
- Do not repeat research just because you are writing. Use the research artifacts; if they are insufficient, send a precise gap back to `article-researcher`.

4. Bind style and language decisions to the approved structure.
- Read the current `outline.md` and preserve its article promise, section order, paragraph beats, evidence burden, and ending move.
- For `essay`, ensure the outline's thesis is expressed with the selected rhetorical pressure rather than replacing the outline with a more dramatic thesis.
- For `factual-technical` or `paper-like`, preserve the outline's scope, mechanism, evidence basis, and bounded conclusion path; do not add a debate frame for style.
- For `builder-direct`, `factual-technical`, and `paper-like` work, the first paragraph must orient the reader positively in the real subject or system before discussing absence, rejection, limitation, or an alternative. Use a negative or contrastive first move only when the user requests it or the outline records an essential source-grounded correction.
- For derivation-heavy architecture or system articles, preserve a recorded reasoning chain such as prior system -> who or what did the work -> what changed -> new decomposition -> outputs and boundaries -> UI or workflow consequence -> bounded conclusion.
- If the user provides a practical sequence such as `we used X -> it did Y -> we observed Z -> we changed to W -> we noticed Q`, keep that sequence in the outline and draft.
- If the user supplies a more exact runtime or product mechanism during revision, replace the earlier generic explanation with that mechanism. Do not preserve a vague abstraction for stylistic continuity.
- Preserve explicit distinctions such as `software as work surface`, `software as state holder`, `human as doer`, and `agent runtime as doer` when the article relies on them.
- For comparative product or system-design articles, apply the reader journey already selected in `outline.md`. Keep reusable definitions, live executions, work/task records, communication, UI interaction, result review, and artifact transfer distinct; label them as alternatives, independent axes, or composable layers as appropriate.
- Use a scenario as a design derivation rather than a promotional example. Avoid predetermined `best fit`, universal `should`, or a comparison frame shaped only around the home product.
- Do not force a contrastive hook such as `not X, but Y` unless the outline and evidence support it.
- The parent `article-writing` skill owns the outline gate and reviewer handoff. This reference may report a style or language problem, but it must not bypass or replace that gate.

5. Draft with native-language expression.
- For `original-draft`, write fully in the chosen source language.
- For `cross-language-conversion`, treat source article as the canonical logic and rewrite into target language with native flow.
- Keep the same thesis and argument skeleton across languages.
- Do not literal-translate paragraph by paragraph.
- Rewrite naturally for each language while preserving logic, examples, and claims.
- Preserve the chosen rhetorical mode across revisions and conversions. In `factual-technical` mode, prefer mechanism -> evidence -> implication order over persuasion-first framing.
- In builder-report narratives, prefer direct subject-first openings such as `In AutoByteus, we first used...` over detached meta-openers like `This article explains...` or `This note describes...`, unless the user explicitly wants report prose.
- Keep the subject exact at sentence level. If the draft says `runtime`, `system`, `application`, or `interface`, make sure the reader can tell which one it means from local context; use the longer noun when precision matters.
- For math-heavy content, define symbols on first use and keep notation stable.

6. Run quality and style checks.
- Check that style and language edits preserve the approved article promise, section order, paragraph beats, and bounded conclusion. Return structural conflicts to `article-writing` instead of silently reshaping the article.
- Check style alignment against the chosen profile constraints.
- Check platform fit using `references/platform-output-rules.md`.
- When text-bearing visuals are present, apply the platform's mobile-legibility rules from `references/platform-output-rules.md` and verify the rendered result, not only the export resolution.
- Check rhetorical fit:
  - no sales tone unless explicitly requested
  - no forced binary contrast
  - no inflated claims beyond the provided evidence
- Check the opening move: in non-essay modes, the first paragraph introduces the subject/system and its current use or behavior before any negative or contrastive framing. If it does not, revise the opening progression rather than merely softening a phrase.
- In `factual-technical` or `paper-like` mode, verify that observations or system description appear before strong conclusions and that causal claims stay bounded.
- If the chosen profile has variants, verify the draft stayed inside the selected variant instead of drifting into a louder neighboring variant.
- Check standards precedence in this order:
  - factual accuracy from user-supplied corrections
  - mechanism accuracy
  - referent and terminology accuracy
  - approved structure and logic flow
  - voice/style matching
  - platform polish
- Run a terminology-precision pass on technical drafts:
  - keep `application logic`, `application UI`, `agent runtime`, `agent team runtime`, `delivery boundary`, and `artifact` distinct when the article relies on those distinctions
  - if the user says the draft feels `vague`, assume some subjects are under-specified and expand them explicitly
  - do not trade away causal accuracy just to make the sentence shorter or more elegant
- Check redundancy aggressively:
  - each section must add at least one new fact, mechanism, example, or implication
  - do not restate the same central claim in the opening, transition section, and conclusion unless the function clearly changes
  - if one comparison table already carries the main contrast, do not add a second summary table that says the same thing
  - trim repeated phrases such as `the important point is`, `this is why`, or `the practical value is` when they introduce no new information
- For builder narratives, verify the opening uses firsthand ownership language and that the body does not drift back into detached analyst narration.
- For revised drafts, verify that earlier user complaints have been actively removed rather than only softened.
- In `cross-language-conversion`, add fidelity checks:
  - no claim loss
  - no invented claims
  - notation and terms stay consistent
- If the user asks for revisions, apply focused passes: `logic`, `voice`, `depth`, `length`, `title`, or `tone-temperature`.
- Strong extra revision passes for technical architecture articles:
  - `subject-precision`: replace vague nouns with exact system components
  - `derivation-flow`: ensure each section follows from the previous one rather than jumping to a conclusion early
  - `transition-smoothing`: fix inter-sentence jumps where the referent or causal chain becomes hard to track
- Report style, language, platform, or fidelity findings to the parent `article-writing` workflow. It owns the outline gate, cumulative package, reviewer handoff, and revision routing.

## Rhetorical Modes

- `essay`: argument-bearing, thesis-forward, suitable for Medium-style opinion or strategy pieces.
- `factual-technical`: neutral technical prose, scope-first, evidence-led, low rhetorical pressure.
- `paper-like`: more formal and report-like; emphasize definitions, observations, method, limitations, and bounded conclusions.
- `hybrid`: structurally clear article prose with restrained rhetoric; useful when the user wants readability without essay pressure.

When profile guidance and rhetorical mode conflict, obey the explicit rhetorical mode request.

## Direction Selection Cues

Map common user cues to writing direction explicitly:

| User cue | Default response |
| --- | --- |
| `too salesy`, `too much Medium tone`, `too much rhetoric` | switch to `factual-technical` or `paper-like`; lower rhetorical pressure immediately |
| `be direct`, `start from what we used`, `write from our product perspective` | choose builder-first structure and builder ownership voice |
| `too detached`, `sounds like someone else built it` | use `we built`, `we used`, `we observed`, `we changed` |
| `too repetitive`, `don’t repeat again and again` | remove duplicate summary sections, repeated contrast pivots, and second comparison tables |
| `more factual`, `scientific`, `paper-like` | lead with scope/mechanism/observation, not thesis compression |
| `this is not accurate` plus added mechanism detail | replace generic causal explanation with the new precise mechanism |
| `this feels vague` | run a terminology-precision pass and replace blurred nouns with explicit system components |

When multiple cues appear, obey them in this order: accuracy -> directness/ownership -> rhetoric reduction -> redundancy reduction -> polish.

For builder-direct openings, treat `start with what we used`, `start with what we have`, and `explain the current system first` as positive-first instructions. Do not translate them into `we did not start with...` or `not X...` unless the user explicitly asks for that contrast.

## Output Modes

- `Outline`: title options plus detailed structure.
- `Single-language draft`: one full WeChat or Medium article.
- `Cross-language conversion`: source article -> target-language adapted article.
- `Bilingual pair`: CN + EN drafts with aligned thesis and argument order.
- `Polish pass`: revised draft plus compact change log.

## Resources

- `references/style-registry.md`: profile status and loading order.
- `references/profiles/profile-template.md`: template for any new author profile.
- `references/profiles/ryan.md`: deep style fingerprint from provided samples.
- `references/profiles/normy.md`: Normy bootstrapping profile (can be updated later).
- `references/examples/ryan-examples.md`: Ryan few-shot examples for EN/CN and conversion behavior.
- `references/examples/normy-examples.md`: placeholder for future Normy examples.
- `references/examples/example-template.md`: template for adding examples for any new profile.
- `references/platform-output-rules.md`: WeChat/Medium packaging rules.
