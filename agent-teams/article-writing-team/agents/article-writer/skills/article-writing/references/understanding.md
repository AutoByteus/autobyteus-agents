# Understanding The Subject

Read this in Step 2 of `article-writing`, and again whenever outlining, drafting or review exposes a gap. It owns the article's understanding files: `understanding-notes.md`, `source-index.md` and `claim-evidence-ledger.md`, plus the research fields of `brief.md`. General research from outside sources is the Deep Researcher's work; this file says when to ask for it and how to use what comes back.

Understanding becomes durable files, not chat context. It is ready when you can outline and draft from the files without repeating discovery. When writing exposes a gap, return here with the exact missing claim and add it.

## 1. Reuse first

Before new work, read what already exists in the work folder (`brief.md`, `understanding-notes.md`, `source-index.md`, `claim-evidence-ledger.md`, research briefs, `style-profile-notes.md`, `outline.md`, earlier drafts). If it is enough for this article or revision, record that it was reused and continue.

Add to it only when:

- the user changes the topic, audience, thesis, depth, or platform in a way that changes the evidence needed;
- a planned claim, contrast, recommendation, root-cause statement, or production observation lacks support;
- a source is stale for a current-world claim;
- the reviewer or the user names an understanding, source, or evidence gap.

## 2. Choose who investigates

Use the investigation modes in [the writing principles](../../../../../shared/writing-principles.md) (section 2), the smallest set that supports the article.

- **You:** `supplied-source` (what the user gave you, including a quick read of a link or file they supplied), `workspace-source` (project files, code, docs, tests, logs, commands), and `experiential-builder` (the user's firsthand sequence, decisions, and observations).
- **The Deep Researcher:** `online-research` and `paper-document` work that needs several sources, current facts, or a check of claims the article will make. Write `research-request.md` in the work folder and hand it off; the team's handoff rules send it to the Deep Researcher. While it runs, work on what does not depend on it, such as the style package and the section structure. Do not draft the claims the request covers, and do not send anything for review, until the brief has come back.

`research-request.md` tells the researcher what you need:

- `Requested by:` the article writer, with the work folder's absolute path;
- the question, and what the article will use the answer for;
- the audience and the depth you need (a quick fact check, or a full comparison);
- the scope: products, versions, period, region;
- the claims the article wants to make, to be checked one by one, including any "does not support", "cannot", or "only" claim about another product;
- what you will quote or show: ask for exact wording with its location when the article will quote a source;
- anything you already know and its source, so the researcher does not redo it.

The brief comes back with its answer, findings with source and date, a claims check (`supported`, `not supported`, `needs confirmation`), confidence, and open gaps. Add one row for it to `source-index.md` (its path), and use its claims check in the ledger. Write factual and comparison statements only from `supported` claims; drop or qualify the others. Do not copy the brief's sources into your files; point to the brief.

## 3. `understanding-notes.md`

Record:

- the question or article objective;
- source-by-source notes for your own sources;
- workspace files, code paths, commands, or observations that matter;
- **Must preserve:** definitions, mechanisms, chronology, terms, and the 5–12 source-backed facts the article can safely use;
- the user's firsthand sequence or product observations;
- uncertainty, caveats, source limitations, and user corrections that override earlier assumptions;
- **Open questions:** what is still missing, narrowed, or blocked, and whom you asked.

For product-builder or architecture articles, keep practical sequences as they happened, for example `we used X -> it did Y -> we observed Z -> we changed to W -> we noticed Q`. Do not compress them into generic claims.

For a comparison of products or architectures, build a primitive inventory before choosing a taxonomy or an article spine. Use the same neutral dimensions for every product when relevant: reusable definitions and organization; execution units and lifetime; communication and human interaction; task or work state; result return, review, and acceptance; context and artifact transfer. Keep definition, live execution, work record, communication, and review state distinct. Mark whether dimensions are alternatives, independent axes, or composable layers; do not turn differently packaged primitives into exclusive categories. Add one scenario walked through every product the same way.

For a builder-owned design explanation, capture mechanism and intent: the problem that motivated each primitive, who initiates and owns each transition, what the user can see or control, one continuous scenario that exercises the primitives together, and which conclusions the scenario supports versus preferences or tradeoffs. When these are not observable in the material, ask the user targeted questions such as `Why was this primitive created?` or `What can the user inspect or control here?`.

## 4. `source-index.md`

One row per source you used, and one row per research brief:

- source ID; path or URL; type; date or version when relevant;
- what it contributed; credibility, freshness, or limitation notes;
- status: `used`, `background`, `rejected`, or `open`.

For workspace sources, record exact file paths and commands. For papers or documents you read yourself, record enough detail to support the claims; never infer from a title or abstract.

## 5. `claim-evidence-ledger.md`

Create it when the article depends on factual, technical, source-backed, or interpretive claims. For each load-bearing claim: the claim, its evidence anchor (a source ID, a path, or a brief's claims-check row), confidence, caveats, and what would make it too strong.

Always track style-sensitive claims when used: contrast frames such as `not X, but Y`; claims that a belief is common, shallow, wrong, or incomplete; `should` recommendations; root-cause claims such as `the deeper problem is`; production observations such as `we observed`, `we found`, or `this worked`. Record which framings the evidence allows and which it forbids, with wording traps to avoid. If the evidence does not support the setup side of a contrast or recommendation, remove that framing and write the supported mechanism directly.

## 6. Ready to outline

Before Step 3 of `article-writing`, check:

- `brief.md` records the investigation modes, source basis, depth, and constraints;
- the files answer: what the article is about; what the reader needs to understand first, and what they likely know or assume; the questions to answer in order; the mechanisms, chronology, definitions, or product sequence to preserve; which claims are backed and by what; which are uncertain, stale, too strong, or unsupported; which contrasts, recommendations, root-cause statements, or production observations the evidence allows;
- the ledger exists when evidence tracking is needed, and no planned style-sensitive claim lacks an anchor;
- comparison dimensions are neutral, consistent across products, and do not mislabel composable primitives as exclusive modes;
- claims that another product lacks a capability are checked by the Deep Researcher against current authoritative evidence, or qualified as `not observed in the checked sources`;
- builder-owned design rationale, the product surface, and a representative scenario are captured when central to the article;
- a concrete anchor is identified when one exists (a worked example, runnable code or commands, real numbers, or an artifact), with its source;
- every research brief you asked for has come back, and its open gaps are resolved, narrowed, or listed under Open questions;
- you would not need broad discovery before outlining; a narrow gap found later is fixed through this file.

If a check fails, add to the files, request research, or ask the user a targeted question before outlining.
