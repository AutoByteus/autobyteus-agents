---
name: product-promo-strategist
description: Coordinate software product promo video projects by turning product inputs, screenshots, links, and rough notes into an evidence-based promo brief.
---

# Product Promo Strategist

Use this skill to start and coordinate a software product promotional video project.

## Expected Inputs

- product name and short description
- user-provided screenshots, screen recordings, app links, website links, docs, or rough notes
- target audience or buyer persona when known
- desired channel such as website, YouTube, LinkedIn, app store, or short-form social
- duration preference, hard duration limit when explicitly stated, aspect ratio, language, tone, brand assets, and CTA when known

## Produced Artifacts

- `product-promo-brief.md`
- `research-notes.md` when research or source review was used
- optional `source-asset-inventory.md` if the user supplies many screenshots, videos, docs, or brand assets

Use:
- [product-promo-brief-template.md](templates/product-promo-brief-template.md)
- [research-notes-template.md](templates/research-notes-template.md)
- [source-asset-inventory-template.md](templates/source-asset-inventory-template.md)

## Required Shared Reads

- Start by reading [promo-production-principles.md](promo-production-principles.md).
- Use it as the shared reference for claim discipline, project package structure, channel choices, and handoffs.

## Workflow

### Step 1 - Establish the project folder

Work inside the active user-selected workspace root.
Create or reuse a product promo project folder with durable artifact paths.
Do not write loose final assets at the workspace top level.

Use a stable, filesystem-friendly project name, for example:

```text
<workspace>/<product-slug>-promo-video/
```

Create or reserve:

- `assets/`
- `audio/`
- `exports/`
- the strategy, script, visual, and delivery artifact files named in the shared principles

### Step 2 - Inventory the inputs

Review supplied product material before writing copy.

Record:

- product name
- product category
- target users
- source paths and URLs
- screenshot or recording coverage
- brand assets
- known CTA
- duration preference and hard duration limit when supplied
- user constraints
- missing information

If the user supplies a website or app page and research tools are available, inspect it.
If the product is private or local-only, use only supplied materials and mark gaps clearly.

### Step 3 - Define the promo job

Choose the right promotional format:

- product explainer
- launch video
- SaaS demo promo
- app store preview
- website hero video
- social ad
- sales enablement video

Confirm:

- target audience
- primary promise
- reason to believe
- emotional tone
- delivery channel
- aspect ratio and resolution target
- duration preference when the user supplied one, or a recommendation when the user did not
- hard duration limit only when the user or platform explicitly requires one
- CTA

When multiple export variants are requested, define the primary version first and list variants separately.

### Step 4 - Keep claims evidence-based

Build a claim table.
For each important claim, record:

- proposed claim
- evidence source
- confidence
- approved wording
- risk or required confirmation

Do not invent:

- metrics
- customer names
- testimonials
- pricing
- compliance or security statements
- integrations
- AI capabilities
- platform availability
- roadmap commitments

If a valuable claim is plausible but unsupported, mark it as a question for the user instead of using it in final copy.

### Step 5 - Write `product-promo-brief.md`

The brief should be clear enough for the script specialist to continue without hidden context.

Include:

- one-line product description
- audience
- user problem or opportunity
- core promise
- key feature moments
- proof points
- claims allowed and claims forbidden
- visual source summary
- brand and tone guidance
- channel, aspect ratio, duration preference, hard duration limit, CTA
- open risks

### Step 6 - Get user approval for the brief

Present `product-promo-brief.md` to the user before downstream handoff.

The approval request should make these decisions easy to review:

- target audience
- product problem or opportunity
- core promise
- key feature moments
- proof points or reason to believe
- allowed claims
- forbidden or unverified claims
- CTA
- channel, aspect ratio, duration preference, and any hard duration limit
- visual ambition, including whether generated or edited promo visuals are expected

Do not treat the brief as approved downstream input until the user has approved the positioning and claim basis.
If the user gives feedback, revise `product-promo-brief.md` and any affected research notes before requesting approval again.

### Step 7 - Handoff to `promo_script_storyboarder`

Send the approved brief downstream using `send_message_to`.

Include:

- absolute path to `product-promo-brief.md`
- absolute path to `research-notes.md` when present
- absolute path to `source-asset-inventory.md` when present
- approval status of the brief
- source material paths
- approved channel, aspect ratio, duration preference, hard duration limit if any, and CTA
- unsupported claims that must not be used
- open questions or risks

## Routing Rules

- If the user changes the product, audience, channel, or CTA, update the brief before downstream work continues.
- If another specialist reports an unsupported claim, revise the brief or ask the user for proof.
- If the script needs a stronger hook but no stronger claim is supported, clarify the value proposition instead of exaggerating.
- If visuals are missing for a key feature, either revise the story around available visuals or route the gap to `product_visual_director`.
