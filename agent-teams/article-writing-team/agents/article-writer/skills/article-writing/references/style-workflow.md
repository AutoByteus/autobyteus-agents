# Style And Language Workflow

Read this in Step 3 of `article-writing` when the user asks for an author's voice, bilingual drafting or platform packaging. It owns profile loading, the style notes, native expression in each language, conversion, and style checks. The modes, the opening rules, the user's correction cues and the one priority order are in [the writing principles](writing-principles.md) (sections 3 and 10); a profile never overrides them.

## 1. Resolve the target

Record the target in `brief.md` (Step 1 of `article-writing`). For style work, also resolve:

- the work type: `original-draft` (the default, in one language first), `cross-language-conversion` (with an explicit source and target language), or `dual-draft`;
- the platform (WeChat, Medium, or both) and the language;
- the expected technical depth: math rigor, engineering detail, examples, references.

Ask the user only when a missing detail changes the article's direction and cannot be inferred from the request.

## 2. Load the profile

1. Read [the style registry](style-registry.md) and normalize the requested author to its `profile_id` (lowercase hyphen-case, for example `Jane Doe` → `jane-doe`).
2. Read the profile file and, when listed, its example file. If the profile does not exist, add it as the registry's "Add New Author Profile" section describes.
3. If the profile has variants, choose one before the outline is finalized: the one that answers the user's actual stance request, not the loudest one.
4. A `bootstrapping` profile needs 2–5 sample articles before final drafting.

Write `style-profile-notes.md` from [its template](../templates/style-profile-notes-template.md): the profile and example paths, the variant and mode, the voice constraints, the forbidden moves for this request, and the evidence constraints for style-sensitive moves, so the reviewer can judge style fit from the file.

## 3. Bind style to the approved structure

The outline's point, section order, evidence and ending stay as approved; style changes how they are said, not what they are.

- In `essay`, express the outline's thesis with the chosen pressure; do not replace it with a more dramatic one. In the other modes, keep the outline's scope, mechanism, evidence and bounded conclusion, and add no debate frame for style.
- For a comparison of products or system designs, follow the reader journey chosen in the outline. Keep reusable definitions, live executions, work records, communication, UI interaction, result review and artifact transfer distinct, labeled as alternatives, independent axes or composable layers. Use a scenario as a design derivation, not a promotional example; avoid a predetermined `best fit`, a universal `should`, or a frame built only around the home product.
- This reference may report a style or language problem to the writer; it does not bypass the outline gate.

## 4. Native expression

- Write `original-draft` work fully in the chosen language. Keep the chosen mode across revisions and conversions; in `technical-blog` and `paper-report`, prefer mechanism → evidence → implication over persuasion-first framing.
- For math-heavy content, define symbols on first use and keep notation stable.
- **Conversion:** the source draft is the canonical logic.
  1. Extract its thesis map and section intent.
  2. Rewrite into the target language with native rhythm and platform fit, not paragraph by paragraph.
  3. Check fidelity (principles, section 9).
  4. Return the target draft with 3–6 alignment notes on the logic preserved.

## 5. Style checks

- Style edits keep the approved claim, section order and conclusion; a structural conflict goes back to the outline, not into silent reshaping.
- The draft matches the profile's constraints and stays inside the chosen variant, without drifting into a louder neighboring one.
- No sales or manifesto tone, forced binary contrast or claim inflated beyond the evidence, unless the user asked for that tone.
- In `technical-blog` and `paper-report`, observations or the system description come before strong conclusions, and causal claims stay bounded.
- Platform fit follows [the platform output rules](platform-output-rules.md), including the legibility of text in visuals; check the rendered result, not only the export resolution.
- When style fit is weak, revise rhythm, transitions and structural moves, not isolated words.

For a requested revision, run a focused pass: `logic`, `voice`, `depth`, `length`, `title` or `tone-temperature`. For technical architecture articles, also:
- `subject-precision`: replace vague nouns with the exact components;
- `derivation-flow`: each section follows from the previous one instead of jumping to the conclusion;
- `transition-smoothing`: fix jumps where the referent or causal chain is lost.

## Output Modes

- `Outline`: title options plus the structure.
- `Single-language draft`: one full WeChat or Medium article.
- `Cross-language conversion`: the source article adapted into the target language.
- `Bilingual pair`: Chinese and English drafts with one thesis and argument order.
- `Polish pass`: the revised draft plus a compact change log.

## Resources

- [style-registry.md](style-registry.md): the profiles, their status, and how to add or update one.
- `profiles/`: one file per author profile, and [profile-template.md](profiles/profile-template.md) for a new one.
- `examples/`: few-shot examples per profile, and [example-template.md](examples/example-template.md) for a new one.
