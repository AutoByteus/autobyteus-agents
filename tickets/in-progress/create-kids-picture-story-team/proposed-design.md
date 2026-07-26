# Proposed Design

## Design decision

Add a sibling `agent-teams/kids-picture-story-team` package. Keep the four-role production
spine from the coloring team, but give each role a picture-book-specific contract:

`story_picture_book_author -> picture_book_illustrator -> picture_book_reviewer -> book_production_editor`

The team is intentionally parallel to the coloring team rather than a shared configurable
team. This keeps each team's authoritative rules explicit and prevents coloring-only
assumptions from leaking into picture-book work.

## Primary workflow spine

| Spine | Start | End | Owner | Why it matters |
| --- | --- | --- | --- | --- |
| Primary picture-book production | User story/theme/source -> approved brief/storyboard -> page art with in-image text -> approved page manifest -> digital/print book export | `story_picture_book_author` owns story intent and exact wording; `picture_book_illustrator` owns visual execution; `picture_book_reviewer` owns the quality gate; `book_production_editor` owns mechanical export | It spans the full child-facing path and makes approval and packaging boundaries explicit. |
| Bounded review spine | Page asset + storyboard + character/text evidence -> per-page decision -> routed fix or approved manifest | `picture_book_reviewer` | It keeps independent page-by-page review inside the reviewer boundary rather than mixing review into illustration or packaging. |

## Ownership and dependencies

- `story_picture_book_author` is the authoritative owner of audience, reading level,
  story arc, page-turn rhythm, page count, exact visible text, source wording, and approval.
- `picture_book_illustrator` owns style locking, recurring-character references, page
  composition, image generation/editing, text-safe art direction, and visual provenance.
- `picture_book_reviewer` owns actual-image inspection, story-image correspondence,
  continuity, child safety, text accuracy/readability, and approval manifests.
- `book_production_editor` owns ordered page assembly, optional cover/end matter only when
  approved, digital/print exports, mechanical QA, and the final report.
- The reviewer is the authoritative boundary for what may enter an export. The producer
  must depend on reviewer-approved manifests, not on raw illustrator indexes or candidate
  files directly.
- The illustrator does not rewrite story text, and the producer does not repair page art
  or add captions in layout. Those concerns route to their owners.

## Target file map

Add:

- `agent-teams/kids-picture-story-team/team.md`
- `agent-teams/kids-picture-story-team/team-config.json`
- `agent-teams/kids-picture-story-team/shared/picture-book-production-principles.md`
- Four member folders, each with `agent.md`, `agent-config.json`, `skills/<role>/SKILL.md`,
  and a local symlink to the shared principles.
- Role templates for the brief, storyboard, visual asset index, reviewer report, and book
  production report.
- A README section describing the new team.

No existing files are renamed, removed, or modified except the README addition.

## Artifact contract

- Planning: `picture-book-brief.md`, `picture-book-storyboard.md`, and
  `source-text-index.md` when sourced or protected wording is in scope.
- Illustration: `visual-style-guide.md`, `character-reference-index.md`,
  `prompt-pack.md`, `visual-asset-index.md`, and `image-generation-log.md`.
- Review: `picture-book-review-report.md` with approved page and character manifests.
- Delivery: `book-production-plan.md` and `book-production-report.md`, plus ordered page
  images and digital/print exports.

The normal page-count recommendation is `21+` illustrated pages, with the final count
chosen in the approved brief. Each page is one complete image and carries its approved
words on the image surface or is explicitly marked word-free.

## Validation plan

1. Parse all JSON configs and verify team/member references.
2. Verify every skill, template, and shared-principles symlink exists and resolves.
3. Search the new package for forbidden coloring-only concepts.
4. Confirm required picture-book concepts, page-count default, in-image text gates, and
   approved-manifest packaging rules are present.
5. Confirm the README and workflow artifacts describe the same team and scope.
