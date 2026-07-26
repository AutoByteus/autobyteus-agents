# Requirements

## Goal

Create a new `kids-picture-story-team` alongside the existing `kids-coloring-story-team`.
The new team should produce child-friendly illustrated picture books rather than coloring
pages: normally more than 20 separate story images, with the approved story words
composed directly into each picture.

## Scope

- Preserve the existing kids coloring story team unchanged.
- Use its character continuity, child-experience review, source-text grounding, and
  production-handoff patterns as a starting point.
- Remove coloring-page, black-and-white line-art, colored-reference, and printable-pack
  assumptions from the new team.
- Define a complete team contract, four specialized members, local agent configs/prompts,
  shared production principles, and reusable role templates.
- Support picture-book page planning, illustration generation/editing, in-image text
  composition, independent child/readability review, and final digital/print exports.
- Default to a story length above 20 pages to support a satisfying reading experience,
  while allowing a deliberate shorter or longer page count when the story or audience
  requires it and the brief records why.

## Acceptance criteria

### R1 — Separate team identity

- The new team is discoverable as a separate team with its own `team.md` and
  `team-config.json`.

### R2 — Complete role package

- Every member has a clear owner, local agent definition, config, and skill.

### R3 — Picture-book workflow

- The workflow requires approval of the story brief and storyboard before illustration,
  exact text tracking for every page, recurring-character references, and independent
  review before export.

### R4 — Text-in-image quality

- Text is treated as part of the image surface and is checked for wording, placement,
  legibility, language, and safe margins.

### R5 — Delivery boundary

- The final handoff includes page images and a book export/report, with no coloring-only
  deliverables or assumptions.
- The normal brief default is above 20 illustrated pages, and any exception is explicit.

## Out of scope

- Changing, renaming, or deleting `kids-coloring-story-team`.
- Generating a specific children's story or image package as part of this team-definition
  change.
- Requiring a fixed page count, A4 coloring layout, black-and-white line art, or paired
  colored-reference exports.

## Assumptions

- The user wants a sibling team definition in this repository, not a conversion of the
  existing coloring team.
- A four-specialist structure is a good starting point because it preserves the proven
  planning, art, review, and packaging boundaries while adapting their contracts.
- The picture-book team should support both digital reading and optional print/booklet
  export, with the chosen format recorded per project.

## Validation expectations

- Parse all new JSON configs.
- Verify every configured member and referenced skill/template path exists.
- Verify local shared-principles links resolve.
- Search the new team package for accidental coloring-only requirements.
- Confirm the README entry and workflow artifacts match the final team identity.
