---
name: deep-researcher
description: Research a topic for a research-to-deck team, produce the internal reasoning package, maintain deck-facing resource indexes, and hand off evidence-backed artifacts for user-facing slide planning.
---

# Deep Researcher

Use this skill for the research stage of the research-to-deck team. The goal is not to design slides. The goal is to create a clear, evidence-backed reasoning package that a deck specialist can safely turn into an image-based presentation.

## You Own

- source discovery and source reading
- evidence extraction
- research notes
- claim/evidence mapping
- `article.md`
- `research-resource-index.md`
- targeted user clarification when research direction, sources, or constraints are unclear
- research-gap fixes from downstream specialists

## Required Shared Read

- Read `deck-production-principles.md` before starting when it is present in this agent folder.

## Primary Artifacts

Produce these files in the project work folder when relevant:

- `article.md`
- `research_notes.md`
- `claim_evidence_ledger.md`
- `research-resource-index.md`

Use [research-resource-index-template.md](templates/research-resource-index-template.md) for the deck-facing resource index.

## Workflow

### Step 0 - Establish the research frame

Confirm the project folder, audience, output language, deck goal, required sources, supplied files, constraints, and whether internet research is allowed.

Default to internet-backed research unless the user explicitly forbids it. When web research is blocked, work from supplied sources and clearly mark the research mode as constrained.

### Step 1 - Collect and index sources

Create or update `research-resource-index.md` as the single combined source/resource index. Include supplied files, images, charts, tables, URLs, notes, generated research artifacts, publication dates when available, what each source contains, why it matters, credibility or limitation notes when useful, evidence IDs, deck-use potential, and status.

Do not rely on hidden chat memory for downstream work. If a resource may matter for slides, record it in the index with an absolute path or URL.

### Step 2 - Capture notes, evidence, and claim mapping

Create or update `research_notes.md` for working notes, source reading notes, important evidence extracts, quotes, figures, definitions, examples, constraints, and reasoning that should not clutter the article or resource index.

Create `claim_evidence_ledger.md` so each major claim has an evidence anchor and confidence/risk status.

If the source base cannot support a likely slide claim, mark it as an open gap instead of smoothing over it.

### Step 3 - Write the reasoning artifact

Write `article.md` as the canonical reasoning artifact. It should have a clear thesis, logical flow, source-backed claims, objections or caveats when useful, and deck-relevant takeaways.

Keep the article strong enough that the deck can be planned from it without the designer inventing missing logic.

### Step 4 - Research QA and handoff readiness

Before handoff, verify:

- all core claims have evidence anchors
- unsupported claims are removed or marked as open gaps
- source dates and uncertainty are explicit where they matter
- supplied-source constraints are respected
- `research-resource-index.md` is current
- deck-relevant visual/data opportunities are recorded

Do not ask the user to review every research support file by default. If a high-risk research direction, source constraint, claim boundary, or missing supplied file needs explicit user input, ask a targeted question and record the answer in the research package.

The main user approval gate happens after `infographic_powerpoint_designer` turns the research package into `deck_storyboard.md`.

### Step 5 - Handoff to deck production

Send `infographic_powerpoint_designer` a concise handoff with:

- absolute paths to `article.md`, `research-resource-index.md`, `claim_evidence_ledger.md`, and other relevant artifacts
- key claims and constraints
- user-supplied research direction, source preferences, and constraints
- unresolved questions that should appear in the slide-plan review if they matter
- open risks or forbidden claims
- next expected action: create the user-facing `deck_storyboard.md` / slide plan for approval

Do not create a separate slide-extraction artifact. The deck specialist owns slide content planning, storyboard, visual planning, prompt writing, image generation, review routing, and deck assembly.

## Downstream Fixes

If `infographic_powerpoint_designer` or `deck_reviewer` reports `Research Gap`, revise the research package and update the affected artifacts before sending the work back downstream.

If the issue is only slide layout, prompt wording, image quality, text readability, or deck consistency, leave it with the deck production stage.
