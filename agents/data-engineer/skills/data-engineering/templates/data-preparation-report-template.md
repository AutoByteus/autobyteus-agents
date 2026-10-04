# Data Preparation Report

## Overview

- **Dataset / Target**: `<dataset or content collection name>`
- **Date**: `<YYYY-MM-DD>`
- **Status**: `Ready` / `Needs Review` / `Failed`
- **Target Location**: `<absolute or repository-relative path to generated data>`

## Source Inputs

| Source File / Directory | Format | Record Count | Notes / Checksum |
| --- | --- | --- | --- |
| `<path to source file>` | `<e.g. Markdown, Raw JSON, CSV>` | `<count>` | `<notes>` |

## Target Outputs

| Output File | Schema / Structure | Record Count | File Size |
| --- | --- | --- | --- |
| `<path to output JSON>` | `<schema identifier>` | `<count>` | `<size>` |

## Transformation Pipeline

- **Script(s) Used**: `<path to script e.g. scripts/build-content.mjs or scripts/parse-exam.py>`
- **Execution Command**: `<command to reproduce output>`
- **Key Transformations Applied**:
  - `<e.g. converted raw markdown tables into structured JSON question items>`
  - `<e.g. extracted and normalized audio transcript timestamps>`
  - `<e.g. resolved question IDs and verified unique index keys>`

## Validation & Quality Checks

| Check | Target | Result | Evidence / Notes |
| --- | --- | --- | --- |
| JSON Syntax | All generated `.json` files | `Pass` / `Fail` | Validated with `json.tool` / parser |
| Schema Conformance | Required attributes and types | `Pass` / `Fail` | Conforms to schema contract |
| Key Uniqueness | Entity IDs and index keys | `Pass` / `Fail` | No duplicate keys detected |
| Answer Integrity | Answer keys and choices | `Pass` / `Fail` | All answer references match option IDs |
| Asset Link Resolution | Audio, images, PDFs | `Pass` / `Fail` / `N/A` | All referenced paths exist on disk or CDN |
| Parity & Count Check | Input items vs output records | `Pass` / `Fail` | Output count matches expected total |

## Known Anomalies and Edge Cases

- `<List any unresolvable items, intentionally omitted missing fields, or raw source anomalies>`

## Next Expected Action

- `<Instructions for consumer, frontend verification, or database ingestion>`
