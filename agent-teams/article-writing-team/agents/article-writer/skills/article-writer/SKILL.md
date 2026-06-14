---
name: article-writer
description: Produce a publication-ready article package from investigation-led understanding through outline, draft, and revision using the team's shared writing principles.
---

# Article Writer

Use this skill to produce article packages for the article writing team.
The writer owns the investigation and understanding stage as well as the article draft.
Do not add a separate research specialist to this team by default.

## Produced Artifacts

- `brief.md`
- `understanding-notes.md`
- `source-index.md`
- `claim-evidence-ledger.md` when factual, technical, or interpretive claims need explicit support
- `style-profile-notes.md` when an author/style profile, rhetorical mode, or platform style is part of the task
- `outline.md`
- `article.md` or bilingual draft set

Use [templates/style-profile-notes-template.md](templates/style-profile-notes-template.md) for `style-profile-notes.md`.

## Required Shared Reads

- Start by reading [writing-principles.md](writing-principles.md).
- Use it as the canonical shared writing reference before outlining, drafting, or revising.

## Required Local Skill

- Also use the team-local bundled `bilingual-author-style-writer` skill for style-profile loading, example loading, bilingual drafting behavior, and platform-output rules.
- Apply that skill's separation between mode, platform, language, author/style profile, rhetorical mode, objective, audience, takeaway, and depth target.
- Preserve its rule that author style controls voice and structural habits, while rhetorical mode controls pressure and article shape.
- Treat that skill as local to this article team, not as an external shared skill source.

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

### Step 2 - Resolve the style package

Use the team-local `bilingual-author-style-writer` skill when style profile, bilingual behavior, platform packaging, or author voice is in scope.

Create or update `style-profile-notes.md`.
Record:

- selected profile ID and display name
- profile file path read from the local bundled skill
- example file paths read from the local bundled skill
- selected profile variant or stance mode
- rhetorical mode
- platform and language rules that materially affect the article
- voice, structure, rhythm, terminology, and ending constraints
- forbidden style moves for this request
- active user corrections such as `too salesy`, `too detached`, `too repetitive`, `too indirect`, or `not accurate`
- bootstrapping limitations when the profile has weak evidence
- evidence constraints for style-sensitive moves such as contrast, `should`, common-belief claims, root-cause claims, and production observations

Do not leave style fit implicit in chat. The reviewer must be able to read `style-profile-notes.md` and understand what style standard the draft was trying to meet.

### Step 3 - Build the understanding package

Create or update `understanding-notes.md`.
Record:

- the question or article objective being understood
- source-by-source notes
- workspace files, code paths, commands, or observations that matter
- online/documentation/paper findings when used
- definitions, mechanisms, chronology, and distinctions the article must preserve
- uncertainty, caveats, source limitations, and open questions
- user-supplied corrections or constraints that override prior assumptions

Create or update `source-index.md`.
Record:

- supplied materials with absolute paths or URLs
- workspace files and source-code paths inspected
- websites, documentation, papers, or PDFs read
- what each source contributed
- credibility, date, or limitation notes when relevant
- status: `used`, `background`, `rejected`, or `open`

Create `claim-evidence-ledger.md` when the article depends on factual, technical, source-backed, or interpretive claims.
Record each load-bearing claim with:

- evidence anchor
- source IDs or paths
- confidence
- caveats
- what would make the claim too strong

Record style-sensitive claims explicitly when used:

- contrastive frames such as `not X, but Y`
- claims that a belief is common, shallow, wrong, or incomplete
- `should` recommendations
- root-cause claims such as `the deeper problem is`
- production observations such as `we observed`, `we found`, or `this worked`

If the source basis does not support the setup side of a contrast or recommendation, remove that framing and write the supported mechanism directly.

For codebase or workspace articles, source investigation is not optional when mechanism claims are made. Inspect the relevant files or commands and record the exact path or command evidence.

For online-current articles, use web research unless the user forbids it or the task can be safely answered from supplied sources. Record dates where recency matters.

For document or paper articles, read enough of the actual document to support the claims. Do not infer specific methods, results, or conclusions from title or abstract alone.

If the source basis cannot support the intended article, stop and ask a targeted question or narrow the article's claims before outlining.

### Step 4 - Pre-outline gate

Before writing `outline.md`, verify:

- `brief.md` records target, audience, mode, platform, language, and constraints
- `style-profile-notes.md` records profile, variant, rhetorical mode, and style constraints when style matching is in scope
- `understanding-notes.md` and `source-index.md` support the intended article scope
- `claim-evidence-ledger.md` exists when the article needs explicit evidence tracking
- no planned contrast, common-belief claim, recommendation, root-cause claim, or production observation lacks an evidence anchor

If a gate fails, update the relevant upstream artifact before outlining.

### Step 5 - Write `outline.md`

Include:

- title options
- opening stance
- thesis or main observation, depending on the selected stance
- section purpose
- planned evidence, mechanism, or examples for each section
- intended ending move

If the user provides a practical sequence such as `we used X -> it worked in Y way -> it started to break at Z -> we changed to W -> we observed Q`, preserve that sequence as the section spine instead of rewriting it into a generic essay shape.

Do not proceed to full drafting on a weak outline unless the user explicitly wants to skip that gate.

### Step 6 - Pre-draft gate

Before writing the full draft, verify:

- the outline has passed review or the user explicitly skipped the outline gate
- any review findings against understanding, evidence, style basis, or structure have been resolved in the corresponding artifact
- the selected author style is constrained by the shared writing principles, especially `Style Never Creates Facts`
- style-profile notes and the outline agree on opening stance, profile variant, rhetorical mode, and forbidden moves

If a gate fails, update the upstream package before drafting.

### Step 7 - Draft the article package

- For single-language work, write `article.md`.
- For bilingual or conversion work, write the full draft set needed for review.
- Keep the draft aligned to the shared writing principles and the requested style profile.
- Keep the draft inside the selected profile variant and rhetorical mode.
- If the article is about the user's own product or workflow, use builder ownership language unless the user explicitly wants detached report prose.
- Use the understanding package as the source of truth. Do not introduce claims that are absent from the notes, source index, user brief, or ledger unless they are clearly marked as assumptions and accepted by the user.
- Treat author style as expression, not evidence. Do not add an opponent, common belief, industry claim, prior failure, or production observation only because it fits the selected profile.
- Preserve exact mechanisms, terminology, and source-code boundaries when those distinctions matter to the article.
- Prefer a clear reasoning chain over a dramatic hook when the article is explanatory, factual-technical, paper-like, or builder-report prose.

### Step 8 - Revise after review

- Read the review report fully.
- Fix structural issues before local polish.
- If the reviewer reports `Understanding Gap`, `Source Gap`, or `Evidence Gap`, return to the understanding package before editing prose.
- Preserve the original audience and selected direction unless the review identifies that the direction itself is wrong.
- When style fit is weak, revise rhythm, transitions, and structural moves, not just isolated words.
- If the user or reviewer supplies a more exact mechanism, replace the earlier generic explanation immediately.
- If the active revision constraints include `too salesy`, `too detached`, or `too repetitive`, remove those failure modes explicitly instead of only softening them.

## Handoff Rules

- Send the outline package to `article_reviewer` before the full draft in the normal flow.
- Include the full cumulative package in every reviewer handoff: brief, understanding notes, source index, claim/evidence ledger when present, style-profile notes when present, source basis, outline, draft files, and any material style notes.
- On revision rounds, resend the full cumulative package plus the latest review report context.
