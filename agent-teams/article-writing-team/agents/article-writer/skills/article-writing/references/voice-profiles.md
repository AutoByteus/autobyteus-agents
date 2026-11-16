# Voice Profiles

A voice profile records how one author writes, for when the user asks for that author's voice (writing principles, section 4).

## Where they live

In `voice-profiles/` inside the folder your Semantic Memory instructions name; without that section, in `<workspace>/voice-profiles/`.

- `index.md`: one row per profile: `profile_id` (lowercase hyphen-case, for example `Jane Doe` → `jane-doe`), display name, status (`bootstrapping` or `ready`), languages, profile file, examples file, primary use, source basis.
- `<profile_id>.md`, from [the profile template](profiles/profile-template.md).
- `<profile_id>-examples.md`, from [the example template](examples/example-template.md).

Several runs may write at once: read `index.md` just before you change it, and change only your own row.

## Load a profile

1. Read `index.md` and resolve the requested author to a `profile_id`.
2. Read the profile file and, when listed, its examples file.
3. Read [the platform output rules](platform-output-rules.md) and [the formats](formats.md).
4. Draft only after the profile and the platform constraints are loaded.

## Add a profile

When the requested author has no profile:

1. Create `<profile_id>.md` and `<profile_id>-examples.md` from the templates.
2. Add a row to `index.md` with status `bootstrapping` and source basis `Pending corpus`.
3. Ask for or record 2–5 sample articles before final drafting.

## Update a profile

When the user provides sample articles:

1. Record each sample's author, language, platform, date, topic and link.
2. Extract style signals: thesis style and confidence; paragraph rhythm and sentence length; section structure and transitions; typical verbs, connectors and framing phrases; preferred evidence.
3. Update only that profile; keep profiles separate and do not merge voices.
4. Switch `bootstrapping` to `ready` only after stable traits are seen in at least 3 samples.
