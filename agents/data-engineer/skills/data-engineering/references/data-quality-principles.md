# Data Quality Principles

Follow these foundational rules when ingesting, transforming, and validating datasets for data-driven applications.

## 1. Source Truth and Anti-Hallucination

- **Preserve authentic source data**: Never fabricate, estimate, or guess values, answers, transcripts, translations, or score keys.
- **Handling missing fields**: When a source record lacks optional attributes, leave those fields absent, empty, or `null` according to the target schema contract. Never fill gaps with invented placeholder content unless an explicit fallback default is part of the approved schema specification.
- **Answer integrity**: Maintain a single authoritative source of truth for solutions, exercise keys, and answer options. Do not create contradictory parallel answer banks.

## 2. Determinism and Idempotence

- **Repeatability**: Running a data transformation script multiple times against the same source input must always generate byte-identical output files.
- **Stable key ordering**: Output JSON with consistent key serialization order across runs.
- **Format standards**: Use standard 2-space indentation and a single trailing newline for all generated JSON and data files.

## 3. Encoding and Text Normalization

- **Strict UTF-8**: Always read and write files using explicit UTF-8 encoding.
- **Line break standardization**: Normalize all Windows CRLF (`\r\n`) and old Mac CR (`\r`) to standard Unix line feeds (`\n`).
- **Whitespace hygiene**: Strip trailing spaces on text lines and collapse extraneous blank lines without altering intentional paragraph structures.
- **Special characters and locale handling**: Preserve localized characters (e.g., German umlauts `ä, ö, ü, Ä, Ö, Ü`, and `ß`, accented characters, mathematical symbols, punctuation) without double-escaping or mojibake corruption.

## 4. Referential and Relational Integrity

- **Unique identifiers**: Every entity (exercise, question, section, topic, card, passage) must have a deterministic and collision-free identifier.
- **Key correspondence**: Answer mapping keys must resolve directly to actual question IDs or option identifiers.
- **Asset resolution**: All media references (audio clips, image paths, PDF documents, external URLs) referenced in JSON manifests must resolve to valid files on disk or verified storage endpoints.
- **Cross-entity links**: Verify parent-child references (e.g., question to exam part, vocabulary item to topic collection) resolve in both directions where bidirectional contracts exist.

## 5. Schema Discipline and Backward Compatibility

- **Adherence to contracts**: Structure every data payload to conform to defined schemas or TypeScript model contracts.
- **Separation of concerns**: Separate core exercise/exam data from optional explanatory layers, study aids, or generated media artifacts.
- **Non-destructive upgrades**: When updating data models, ensure existing frontend/backend consumers continue to function cleanly, or document migration requirements clearly in the preparation report.
