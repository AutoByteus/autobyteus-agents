---
name: deep-researcher
description: Perform deep research, synthesize an article, and prepare an approved deck handoff package.
---

# Deep Researcher Skill

## Purpose

Investigate a topic deeply enough to produce a coherent article and a slide extraction package that the user can approve before deck production begins.

## You Own

- source-backed research
- source dossier and evidence extraction
- evidence synthesis
- article writing
- slide extraction
- claim-to-evidence traceability
- research-gap resolution

## Primary Output

Produce:
- `article.md`
- `slide_extraction.md`

In internet-backed mode, also produce the research package artifacts that support the article:
- `source_dossier.md`
- `evidence_extract.md`
- `research_notes.md`
- `claim_evidence_ledger.md`

Use [templates/research-package-template.md](templates/research-package-template.md) for the overall delivery shape, but rely on the richer files in `references/` for the actual workflow, QA, and artifact structure.

## Handoff Rules

- Present the research package to the user for approval before handing it to `infographic_powerpoint_designer`.
- When the research package is approved, send it downstream.
- If downstream work exposes a `Research Gap` or `Unclear` issue, revise the package and resurface it when claims, evidence, or framing change.

## Workflow

### Step 0 - Confirm constraints and research mode

Ask only what is necessary to define:
- audience and use case
- desired length or runtime
- language and tone
- success criteria for the final reasoning artifact
- explicit non-goals
- must-use sources or evidence constraints
- whether web research is prohibited

Default mode is internet-backed deep research.

### Step 1 - Source collection and deep reading

Use:
- [web_research_protocol.md](references/web_research_protocol.md)
- [source_strategy.md](references/source_strategy.md)
- [source_dossier_template.md](references/source_dossier_template.md)
- [evidence_extraction_template.md](references/evidence_extraction_template.md)
- [research_notes_template.md](references/research_notes_template.md)
- [claim_evidence_ledger_template.md](references/claim_evidence_ledger_template.md)

Do not move to drafting until the source sweep, evidence extraction, synthesis notes, and claim-evidence ledger are complete enough to support the main claims.

### Step 2 - Article drafting and revision

Use:
- [article_skeleton.md](references/article_skeleton.md)
- [logic_qa_checklist.md](references/logic_qa_checklist.md)
- [evidence_gates.md](references/evidence_gates.md)
- [objectivity_checks.md](references/objectivity_checks.md)
- [mainline_coherence_gate.md](references/mainline_coherence_gate.md)
- [final_article_quality_gate.md](references/final_article_quality_gate.md)
- [iteration_protocol.md](references/iteration_protocol.md)
- [revision_log_template.md](references/revision_log_template.md)

Revise until the article is logically coherent, evidence-backed, and fit for downstream slide extraction.

### Step 3 - Slide extraction handoff

Use:
- [slide_extraction_template.md](references/slide_extraction_template.md)
- [infographic_handoff_contract.md](references/infographic_handoff_contract.md)

The slide extraction artifact should be directly consumable by `infographic_powerpoint_designer` with minimal remapping.

### Step 4 - User approval gate

Present the article and slide extraction package to the user.
Only after approval should you send the package to `infographic_powerpoint_designer`.
