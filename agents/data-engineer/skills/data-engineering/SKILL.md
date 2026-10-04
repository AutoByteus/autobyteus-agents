---
name: data-engineering
description: Ingest, clean, parse, normalize, structure, validate, and prepare datasets and JSON collections for data-driven applications.
---

# Data Engineering

Transform raw or semi-structured materials into validated, production-ready data artifacts for data-driven applications.

Read [data-quality-principles.md](references/data-quality-principles.md) for data fidelity, schema discipline, and normalization rules. Use [data-preparation-report-template.md](templates/data-preparation-report-template.md) to document dataset transformations and validation evidence.

## Trigger and purpose

Use this skill when:
- Creating, importing, or restructuring datasets, question banks, content corpora, or catalogs.
- Parsing unstructured or semi-structured raw materials (Markdown, plain text, PDFs, legacy documents, CSVs, API dumps) into structured JSON.
- Designing or reconciling data schemas and entity relations for frontend/backend consumption.
- Auditing, validating, or repairing existing data files for schema conformance, referential integrity, or encoding issues.

## Operating workflow

```
1. Source audit & scope → 2. Schema contract → 3. Extraction & transformation → 4. Validation & QA → 5. Report & handoff
```

### 1. Source audit & scope

1. **Locate raw inputs**: Identify source files, input directories, legacy data stores, or raw assets (text, Markdown, spreadsheets, audio/media references).
2. **Catalog existing formats**: Determine current file types, character encodings (confirm UTF-8), structural identifiers, and field availability.
3. **Assess volume and edge cases**: Note total entity counts, missing fields, optional attributes, multilingual text, and special characters (e.g., German umlauts `ä, ö, ü, ß`, quotes, math symbols).

### 2. Schema & data modeling

1. **Establish target schema**: Define or inspect the target JSON schema or TypeScript interface (e.g., entity IDs, category keys, question blocks, answer keys, explanations, media links).
2. **Define normalization standards**:
   - Unique identifier conventions (e.g., slugified, prefixed, hierarchical).
   - Answer and key bindings: ensure single source of truth for answers without duplicating conflicting answer banks.
   - Missing fields: handle absent optional fields cleanly (omit or set to empty array/null per schema; never fabricate values).
3. **Draft transformation contract**: If transforming a new corpus, document mapping rules between raw source fields and target JSON properties before writing scripts.

### 3. Extraction, pipeline scripting & transformation

1. **Build deterministic scripts**: Author clean, repeatable transformation scripts in Python (`.py`) or Node.js (`.mjs`/`.ts`). Avoid one-off manual copy-pasting for bulk data.
2. **Execute transformations**:
   - Clean whitespace, trailing spaces, inconsistent line breaks (`\r\n` to `\n`).
   - Extract structured sections, questions, metadata, options, and solutions.
   - Preserve exact source wording, formatting, and structural IDs.
3. **Write structured artifacts**: Save formatted, readable JSON files into the designated target directory (e.g., `content/`, `data/`). Use standard indentation (2 spaces) and stable key ordering.

### 4. Validation & quality assurance

Run automated verification across all generated data files:

1. **Syntax verification**: Confirm every JSON file parses without syntax errors.
2. **Schema validation**: Check required keys, field types, enums, and non-empty constraints.
3. **Referential integrity**:
   - Verify answer keys match defined option identifiers.
   - Check cross-file references (e.g., category IDs, question bank IDs, parent-child relations).
   - Verify referenced local assets (audio, images, PDFs) exist on disk or match required remote asset paths.
4. **Parity and count checks**: Compare output item counts against source counts. Check for accidental deduplication, dropped items, or empty values.

### 5. Report & handoff

1. **Document results**: Use [data-preparation-report-template.md](templates/data-preparation-report-template.md) to record input sources, generated artifacts, transformation scripts, item counts, and validation results.
2. **Deliver package**: Ensure all output JSON files, transformation scripts, and the preparation report are committed or placed at their designated repository paths.
