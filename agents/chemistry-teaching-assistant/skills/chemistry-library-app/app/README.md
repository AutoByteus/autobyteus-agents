# Library app: source

Vue 3 + Vite. `npm install && npm run build` writes `../dist/` (committed, so libraries build
without npm) and regenerates `../references/bausteine.md` from `src/shared/schema.js`.

- `src/folien/`: the slide stage, the components (`bausteine/`), presenter and audience views
- `src/app/`: the library (knowledge view, gallery, lesson, search, presentation, print)
- `src/player/`: the exported lesson file
- `src/export/`: HTML and PowerPoint export
- `src/cli/`: `bauen` (validate and build a library) and `pruefen` (browser check), bundled into `dist/bibliothek.mjs`

After a change: build, then `node ../dist/bibliothek.mjs pruefen` on a copy of `../beispiel/`.
