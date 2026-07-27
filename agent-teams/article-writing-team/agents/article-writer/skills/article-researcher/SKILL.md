---
name: article-researcher
description: Build and maintain durable article research artifacts before drafting so the writer can reuse source-backed understanding without researching twice.
---

# Article Researcher

Use this skill before outlining or drafting an article when the topic requires understanding, evidence, source inspection, or factual grounding.
This is an agent-private skill for the article writer agent.
It owns the research and investigation phase; the `bilingual-author-style-writer` skill owns style-profile loading, platform rules, outline shaping, drafting, and revision.

Start by reading `writing-principles.md` and use it as the quality standard for evidence, clarity, and the rule that style never creates facts.

## Core Principle

Research should become durable files, not temporary chat context.
The research package is complete only when the writer can outline and draft from the artifacts without opening new sources or repeating discovery.
Once a research package exists, read it first and update only missing or stale parts instead of researching the same topic again.

## Research Sufficiency Contract

The researcher must not hand off vague notes.
A handoff is writer-ready only when it answers, in durable files:

- What is the article about?
- What does the reader need to understand before the claim makes sense?
- What exact mechanisms, chronology, definitions, or product sequence must be preserved?
- For a product or system comparison, what first-class primitives does each product expose, how are they packaged, and which dimensions are orthogonal or composable rather than competing modes?
- For a builder-owned design article, what user problem, interaction surface, and end-to-end scenario explain why each primitive exists?
- Which claims are source-backed, and by which source IDs or paths?
- Which claims are uncertain, too strong, stale, or unsupported?
- Which contrast frames, recommendations, root-cause statements, or production observations are allowed or forbidden by evidence?
- What should the writer say directly, and what should the writer avoid inventing?

If the writer would need to search, inspect code, reread papers, or ask broad clarification before drafting, the research package is not complete.

## Produced Artifacts

- `brief.md`
- `understanding-notes.md`
- `source-index.md`
- `claim-evidence-ledger.md` when factual, technical, source-backed, or interpretive claims need explicit support
- `research-handoff.md` summarizing the writer-ready article material, must-preserve mechanisms, allowed claims, caveats, and forbidden overclaims
- Optional `research-open-questions.md` when blocked by missing user input or unavailable sources

## Research Modes

Use one or more modes, choosing the smallest set that supports the article:

- `supplied-source`: understand files, notes, pasted material, links, transcripts, screenshots, or source articles supplied by the user
- `workspace-source`: inspect project files, source code, docs, tests, logs, examples, or existing artifacts in the current workspace
- `online-research`: search the web, read websites, documentation, public repos, announcements, standards, papers, or other current sources when useful and allowed
- `paper-document`: read papers, PDFs, reports, manuals, specifications, or long documents
- `experiential-builder`: organize the user's firsthand sequence, observations, product decisions, runtime behavior, or implementation story

If no mode is explicit, infer the smallest mode that can support the requested article. Do not over-research a simple style rewrite, and do not under-research an article that makes technical, factual, or current-world claims.

## Workflow

### Step 1 - Reuse existing research first

Before new research, look for existing artifacts in the article workspace:

- `brief.md`
- `understanding-notes.md`
- `source-index.md`
- `claim-evidence-ledger.md`
- `style-profile-notes.md`, `outline.md`, or prior drafts when they reveal scope or prior decisions

If existing research is already sufficient for the requested article or revision, do not repeat the research. Instead, record that the package was reused and continue to the writing skill.

Update research only when:

- the user changes the topic, audience, thesis, depth, or platform in a way that changes required evidence
- the package lacks support for a planned claim, contrast, recommendation, root-cause statement, or production observation
- source material is stale for a current-world claim
- the reviewer or user identifies an understanding, source, or evidence gap

### Step 2 - Write or update `brief.md`

Record:

- article objective
- audience
- language and platform if known
- style profile if known
- rhetorical mode if known
- one-sentence takeaway if known
- depth target
- research modes used
- allowed investigation methods
- source basis
- active user constraints or corrections
- explicit limitations, assumptions, and bootstrapping notes

The brief does not need to decide final style. It must make the research scope clear enough for the writing skill.

### Step 3 - Build `understanding-notes.md`

Record:

- the question or article objective being understood
- source-by-source notes
- workspace files, code paths, commands, or observations that matter
- online/documentation/paper findings when used
- definitions, mechanisms, chronology, and distinctions the article must preserve
- user-supplied firsthand sequence or product observations
- uncertainty, caveats, source limitations, and open questions
- user corrections that override prior assumptions

For product-builder or architecture articles, preserve practical sequences such as:

`we used X -> it did Y -> we observed Z -> we changed to W -> we noticed Q`

Do not compress these into generic article claims. The writing skill needs the actual sequence.

For comparative product or architecture articles, also build a primitive inventory before proposing a taxonomy or article spine. Use the same neutral dimensions for every product when relevant, such as:

- reusable definitions and organization
- execution units and lifetime
- communication and human interaction/UI
- task or work state
- result return, review, and acceptance
- context and artifact transfer

Keep product definition, live execution, work/task record, communication, and review state distinct. Explicitly mark whether the dimensions are alternatives, independent axes, or composable layers. Do not turn differently packaged primitives into mutually exclusive product categories.

For a builder-owned design explanation, capture both mechanism and intent:

- what user or organizational problem motivated the primitive
- who initiates and who owns each transition
- what a user can see, inspect, or interact with in the product surface
- one continuous scenario that exercises the relevant primitives together
- which design conclusions the scenario supports and which remain preferences or tradeoffs

If these facts are not observable in supplied material, code, docs, or UI evidence, ask targeted questions such as `Why was this primitive created?` or `What can the user inspect or control here?` before declaring the research writer-ready.

### Step 4 - Build `source-index.md`

Record every relevant source with:

- source ID
- path or URL
- source type
- date or version when relevant
- what it contributed
- credibility, freshness, or limitation notes
- status: `used`, `background`, `rejected`, or `open`

For workspace-source research, include exact file paths and commands inspected.
For online-current research, include access dates or publication dates where recency matters.
For paper/document research, include enough document detail to support the claims; do not infer specifics from title or abstract alone.

Treat product-absence and limitation claims as high-risk current claims. Before writing `does not support`, `only returns`, `cannot`, or an equivalent comparison:

- inspect current authoritative evidence, such as official documentation, pinned current source, or directly observed product/UI behavior, not only prior articles or memory
- check adjacent, experimental, UI-specific, and differently named feature surfaces
- record the version/commit and access date
- distinguish `absent` from `available but packaged differently`, `optional`, `experimental`, or `not first-class`
- if authoritative evidence is unavailable, qualify the result as `not observed in the checked sources` rather than claiming that the capability is absent

### Step 5 - Build `claim-evidence-ledger.md` when needed

Create this file when the article depends on factual, technical, source-backed, or interpretive claims.
For each load-bearing claim, record:

- claim
- evidence anchor
- source IDs or paths
- confidence
- caveats
- what would make the claim too strong

Always track style-sensitive claims when used:

- contrastive frames such as `not X, but Y`
- claims that a belief is common, shallow, wrong, or incomplete
- `should` recommendations
- root-cause claims such as `the deeper problem is`
- production observations such as `we observed`, `we found`, or `this worked`

If evidence does not support the setup side of a contrast or recommendation, tell the writing skill to remove that framing and write the supported mechanism directly.

### Step 6 - Write `research-handoff.md`

Create a compact but complete handoff for the writing skill.
This file is the bridge from research to article writing and should let the writer draft without re-researching.

Include:

- artifact paths for the full research package
- article objective and target reader problem
- 5-12 source-backed facts, mechanisms, or observations the article can safely use
- exact chronology, product sequence, or causal chain to preserve
- terms and definitions that must stay precise
- source IDs for load-bearing claims
- recommended article spine based on the research, without doing style drafting
- for comparisons, the neutral primitive inventory, composability classification, and one same-scenario walkthrough across products
- allowed claims and allowed contrast frames
- forbidden overclaims, unsupported claims, and wording traps
- caveats, uncertainty, freshness limits, and open questions
- visual opportunities grounded in evidence, if any

Do not make `research-handoff.md` a vague summary. It should be specific enough that the writing skill can use it as the first source to build the outline.

### Step 7 - Research readiness gate

Before switching to the writing skill, verify:

- `brief.md` records the article objective, audience, depth, research modes, and constraints
- `understanding-notes.md` and `source-index.md` support the intended article scope
- `claim-evidence-ledger.md` exists when explicit evidence tracking is needed
- `research-handoff.md` gives a writer-ready summary with must-use claims, mechanisms, caveats, and forbidden overclaims
- no planned contrast, common-belief claim, recommendation, root-cause claim, or production observation lacks an evidence anchor
- comparative dimensions are neutral, consistent across products, and do not mislabel composable primitives as exclusive modes
- negative capability claims were checked against current authoritative evidence and are qualified precisely, including `not observed in the checked sources` when evidence is incomplete
- builder-owned design rationale, product interaction surface, and a representative end-to-end scenario are captured when they are central to the article
- open questions are either resolved, narrowed, or explicitly listed
- the writer should not need to open new sources, inspect code, or perform broad discovery before outlining

If the gate fails, update the research package or ask a targeted question before drafting.

## Handoff To Writing Skill

After research, hand off to `bilingual-author-style-writer` with:

- `research-handoff.md` first
- research artifact paths
- key mechanisms or sequences the article must preserve
- source IDs for load-bearing claims
- caveats and forbidden overclaims
- open questions or intentionally narrowed scope

The writing skill should treat the research package as the source of truth and should not redo research.
If the writing skill finds a gap, it should return to this skill with the exact missing claim or source need instead of doing independent research.
