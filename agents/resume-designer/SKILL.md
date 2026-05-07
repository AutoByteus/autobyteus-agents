---
name: resume-designer
description: Create frontend-app-based resumes from user input, supplied PDFs, DOCX exports, plain text, or links; select a pure-text style brief; dynamically generate a previewable resume app from that brief; visually verify it; and export a print-ready PDF.
---

# Resume Designer Skill

## Purpose

Turn user-provided career information or existing resume material into a polished frontend resume app generated from structured content plus a pure-text style brief, with a browser-rendered preview and print-ready PDF export.

## You Own

- resume source intake from user notes, pasted text, supplied files, exported Google Docs, PDFs, DOCX files, or user-approved links
- fact extraction and gap clarification
- resume content modeling
- style recommendation and style selection
- frontend layout and visual design
- local preview app startup
- browser render validation
- PDF export
- final package documentation

## Primary Outputs

Use:
- [resume-intake-template.md](templates/resume-intake-template.md)
- [resume-content-model-template.md](templates/resume-content-model-template.md)
- [resume-style-decision-template.md](templates/resume-style-decision-template.md)
- [resume-render-package-template.md](templates/resume-render-package-template.md)

Style brief reference:
- [style-briefs.md](references/style-briefs.md)

Produce in one dedicated work folder per resume run:
- `resume-intake.md`
- `resume-content-model.md`
- `resume-style-decision.md`
- dynamically generated frontend app source, usually Vite + React + TypeScript with screen and print styles
- `resume-render-package.md`
- rendered PDF, usually `resume.pdf`
- optional screenshots such as `render-preview.png` when visual QA needs evidence

## Default Frontend Stack

- Default to Vite + React + TypeScript with plain CSS or CSS modules.
- The scaffold is standardized; the visual structure is not. Do not copy a fixed resume component template by default.
- Generate components, layout, CSS, spacing, and visual hierarchy from the selected text style brief and the actual content model.
- Use semantic React components that fit the chosen design, such as section, entry, timeline, sidebar, highlight, or publication components when the style brief and content justify them.
- Avoid Tailwind by default because resume print CSS needs precise page, break, and typography control. Use Tailwind only when the host project already uses it or the user explicitly requests it.
- Use Next.js only when deployment, routing, server rendering, or an existing project requires it.
- Use static HTML/CSS only as a fallback when package installation or app startup is unavailable, and record the reason in `resume-render-package.md`.
- Make the browser-rendered frontend the source used for PDF export.

## Dependency And Font Policy

- Keep the default dependency set small: `vite`, `react`, `react-dom`, `typescript`, `@vitejs/plugin-react`, and `playwright` for PDF export and visual QA.
- Use plain CSS or CSS modules for resume layout. Do not add a large UI component library such as MUI, Ant Design, Chakra, Bootstrap, or similar by default.
- Do not add chart libraries, animation libraries, or skill-meter widgets by default.
- Use `lucide-react` only when icons are truly useful, and keep icons restrained. Text must remain the primary information carrier.
- Prefer self-hosted fonts through Fontsource packages or local font files. Avoid remote font CDN imports by default because resume preview and PDF export should be reproducible.
- Install only the font families and weights needed by the selected style brief. Prefer variable font packages when available.
- Recommended font families:
  - `Inter` or `IBM Plex Sans` for technical, product, and modern business resumes
  - `Source Serif 4` for executive, academic, and editorial resumes
  - `IBM Plex Mono` or `JetBrains Mono` only for small technical accents, never long body copy
  - system fonts for conservative ATS mode when maximum portability is required
- Wait for fonts to load before screenshot or PDF export when the browser tooling allows it.

## Text-Defined Style System

- Read [style-briefs.md](references/style-briefs.md) before selecting a visual direction.
- Treat each brief as natural-language design direction, not a code template.
- The brief may describe layout grammar, typography, density, color behavior, section emphasis, and constraints, but it must not prescribe a fixed DOM tree or fixed component set.
- Default to a clean, quiet, resume-first interpretation of every style brief. The resume should feel straightforward before it feels designed.
- Use one separator system per boundary. Do not stack a strong header rule immediately above a section divider; for clean technical and founder resumes, prefer the same subtle gray section rule throughout unless the style brief clearly justifies a stronger single rule.
- Recommend one primary style and up to two alternatives based on target role, industry, seniority, company type, geography, and whether the resume must be conservative, creative, academic, or product-facing.
- If the user gives no preference, choose the safest style for the target audience and record why in `resume-style-decision.md`.
- Support multiple style briefs in the app only when practical. A style switcher is optional because very different briefs may require different generated layout structures, not just token swaps.
- Keep every style printable, ATS-readable, and text-selectable. Do not create image-only or overly decorative resumes.
- If the user asks for a new style, write or adapt the text brief first, then generate the frontend from that brief.

## Source Intake Rules

- Prefer direct user-provided facts over inferred content.
- Existing PDFs, DOCX files, Google Docs exports, pasted resumes, LinkedIn exports, portfolio pages, and personal websites are input sources, not authoritative permission to invent missing details.
- For Google Docs, use an exported file, pasted content, or an accessible published link. If a private link cannot be read, ask for an export or paste.
- If a source conflicts with another source, preserve the conflict in `resume-intake.md` and ask the user when the choice affects the resume.
- Do not fabricate employment dates, degree completion, location, citizenship, clearance, GPA, metrics, skills, or awards.
- Rewrite for clarity and impact only within the factual boundary of the sources.

## Workflow

### Step 1 - Create `resume-intake.md`

Capture:
- target role or resume purpose
- audience or industry
- preferred resume length and page size
- supplied source inventory
- extracted contact block
- extracted experience, education, projects, skills, awards, publications, and certifications
- unresolved gaps, conflicts, and assumptions
- privacy constraints and content the user wants excluded

Ask only for blocking missing information. If the user gives enough material to make a useful first version, proceed and mark open questions in the intake artifact.

### Step 2 - Create `resume-content-model.md`

Convert intake into a structured resume model:
- header and contact links
- summary or headline, if useful
- section order
- experience entries with role, organization, location, dates, bullets, stack, and measurable outcomes
- education and credential entries
- project entries, if relevant
- skills taxonomy grouped for scanability
- ATS keyword targets based only on the target role and truthful experience

Keep bullets concise, concrete, and achievement-oriented. Prefer measurable impact when supplied; otherwise use precise scope and responsibility.

### Step 3 - Create `resume-style-decision.md`

Use [style-briefs.md](references/style-briefs.md) to pick or author a design brief.

Record:
- target role and audience interpretation
- recommended primary style
- optional alternate styles
- rationale
- typography, spacing, color, and layout implications
- font family direction and installed font packages, if any
- ATS and print risks for the selected style
- whether the app should expose multiple generated styles or stay focused on one

When user preference conflicts with hiring-context fit, explain the tradeoff and proceed with the user's choice unless it would harm readability or truthfulness.

### Step 4 - Build the frontend resume app

Generate the resume app from the content model and selected style brief.

Implementation requirements:
- scaffold or update a Vite + React + TypeScript app unless an existing app stack is already supplied
- keep resume data separate from generated presentation code, for example `src/resume-data.ts`
- write components and CSS that are specifically derived from the selected brief instead of reusing one fixed resume layout
- provide at least the selected generated style; add alternate generated styles when requested or when the user needs comparison
- include screen CSS and print CSS in the app
- include package scripts for preview, build, and PDF export when the package manager supports them
- include an export path documented in `resume-render-package.md`
- keep dependency choices aligned with the Dependency And Font Policy

Design requirements:
- strong hierarchy, restrained styling, and high information density
- one-column or conservative two-column layout that prints cleanly
- semantic HTML for headings, lists, links, and sections
- print CSS with explicit page size, margins, color behavior, and break controls
- readable typography at print scale
- restrained visual language: thin rules, clear typography, controlled whitespace, and minimal accent color
- no duplicate separators: avoid header bottom borders plus first-section top borders, nested card borders, or multiple horizontal rules that visually describe the same boundary
- no decorative effects that reduce ATS readability, recruiter scanning, or PDF text selection
- all contact links valid and visibly distinct enough for print and screen

Avoid:
- image-only resumes
- inaccessible text contrast
- fragile absolute positioning for core content
- excessive icons, charts, progress bars, or skill meters
- dashboard-like panels, marketing cards, badge grids, decorative sidebars, or product-page composition unless the user explicitly asks for a more expressive portfolio resume
- content hidden on print unless intentionally excluded

Generation rules:
- Before coding, translate the selected text brief into concrete layout decisions for this user's content.
- Let content volume influence structure. A publication-heavy academic resume, one-page early-career resume, and senior product resume should not share the same visual skeleton unless that is actually the best fit.
- Keep repeated code and CSS clean, but do not over-abstract the generated app around imaginary future templates.
- If multiple style variants are requested, generate each variant intentionally; do not force every variant through one token-only layout if the brief calls for a different structure.

### Step 5 - Start the preview app

Start the app locally with the project's package manager and provide the preview URL when available.

Default command path:
- install dependencies if needed
- run `npm run dev -- --host 127.0.0.1` or the equivalent project command
- open the local URL in the embedded in-app browser when available

Keep the preview server running while visual QA and PDF export are active. If a server cannot be started, record the blocker and use the most reliable available local render fallback.

### Step 6 - Render and visually verify

Use the embedded in-app browser when available. Otherwise use Playwright, Chromium, or the most reliable local browser route.

Verify:
- first screen renders without missing assets
- desktop preview has no overlapping text or broken spacing
- style selection or configured style renders as intended
- selected fonts load and fallback acceptably when they do not
- print preview or PDF pagination keeps entries together where practical
- horizontal rules and section separators are intentional, consistent, and never doubled around the header or adjacent sections
- page count matches the requested target or records why it cannot
- links work or degrade clearly in print
- selectable text remains available in the PDF

If rendering exposes content overflow, awkward page breaks, missing assets, or unreadable spacing, fix the frontend before exporting final PDF.

### Step 7 - Export PDF

Export from the rendered frontend with browser print/PDF tooling such as Playwright, Chromium, or an equivalent deterministic path.

PDF requirements:
- use print media CSS
- preserve text as selectable text
- preserve hyperlinks when the toolchain supports them
- avoid rasterizing the whole page
- name the final PDF clearly, such as `resume.pdf` or `<name>-resume.pdf`

### Step 8 - Write `resume-render-package.md`

Record:
- final frontend path
- preview URL used
- final PDF path
- rendering or export command
- app framework and package manager
- dependencies and fonts used
- browser/toolchain used
- selected style brief
- page size, margins, and page count
- visual QA notes
- ATS/readability notes
- known limitations or open user decisions

## Quality Bar

- The resume should be useful as both a website preview and a PDF deliverable.
- The PDF is the default handoff artifact because most hiring workflows still expect PDF.
- The frontend remains the editable source of truth so future revisions are made in code, then re-rendered.
- A strong resume usually feels simple: clear reading order, plain section names, quiet typography, and no visual treatment that competes with the candidate's facts.
- Content truth is more important than polish. If strong copy would require invented facts, leave a clear placeholder or ask the user.

## Blocking Rules

- If there is not enough career information to build even a skeletal resume, ask for role history, education, skills, and target role before designing.
- If the user requests extraction from a private Google Doc or inaccessible link, ask for an export, paste, or accessible published link.
- If PDF export tooling is unavailable, still deliver the frontend package and record the export blocker in `resume-render-package.md`.
- If a supplied source appears to contain sensitive personal information beyond resume needs, summarize only what is necessary and ask before including it.

## Communication Rule

Keep progress updates short and production-oriented: intake status, content-model status, render status, export status, and blockers.
