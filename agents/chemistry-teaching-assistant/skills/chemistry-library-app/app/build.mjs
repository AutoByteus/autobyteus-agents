// Builds ../dist from the sources:
//   dist/runtime/app.js, app.css          the library app (classic script, runs from file://)
//   dist/runtime/player-vorlage.js        the exported-lesson player as a template (loaded on export)
//   dist/runtime/pptx.js                  PowerPoint library (loaded on export)
//   dist/bibliothek.mjs                   the command-line tool: bauen, pruefen (node, no npm needed)
// Run: npm install && npm run build
import { build } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const hier = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(hier, "..", "dist");
const runtime = path.join(dist, "runtime");
const tmp = path.join(hier, ".tmp-build");
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(runtime, { recursive: true });

const schriften = [["Source Sans 3", 400, "sans-400"], ["Source Sans 3", 600, "sans-600"], ["Source Sans 3", 700, "sans-700"], ["Source Serif 4", 700, "serif-700"]]
  .map(([fam, w, f]) => `@font-face{font-family:"${fam}";font-style:normal;font-weight:${w};font-display:swap;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(hier, "fonts", f + ".woff2")).toString("base64")}) format("woff2")}`)
  .join("\n");

const gemeinsam = {
  configFile: false, logLevel: "warn", root: hier,
  define: { "process.env.NODE_ENV": '"production"', __VUE_OPTIONS_API__: "false", __VUE_PROD_DEVTOOLS__: "false", __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false" },
};

async function iife(entry, name, out, extra = {}) {
  await build({
    ...gemeinsam,
    plugins: [vue()],
    resolve: { alias: { "image-size": path.join(hier, "src/export/leer.js") } },
    build: {
      outDir: tmp, emptyOutDir: true, minify: true, target: "es2020", cssCodeSplit: false,
      lib: { entry: path.join(hier, entry), formats: ["iife"], name, fileName: () => out + ".js", cssFileName: out },
      ...extra,
    },
  });
}

await iife("src/app/main.js", "ChemApp", "app");
fs.copyFileSync(path.join(tmp, "app.js"), path.join(runtime, "app.js"));
fs.writeFileSync(path.join(runtime, "app.css"), schriften + "\n" + fs.readFileSync(path.join(tmp, "app.css"), "utf8"));

await iife("src/player/main.js", "ChemPlayer", "player");
const vorlage = { js: fs.readFileSync(path.join(tmp, "player.js"), "utf8"), css: schriften + "\n" + fs.readFileSync(path.join(tmp, "player.css"), "utf8") };
fs.writeFileSync(path.join(runtime, "player-vorlage.js"), `window.CHEM_PLAYER_VORLAGE=${JSON.stringify(vorlage).replace(/</g, "\\u003c")};\n`);

await iife("src/export/pptx-lib.js", "ChemPptxLib", "pptx");
fs.writeFileSync(path.join(runtime, "pptx.js"), `window.CHEM_SCHRIFTEN=${JSON.stringify(schriften)};\n` + fs.readFileSync(path.join(tmp, "pptx.js"), "utf8"));

await build({
  ...gemeinsam,
  define: {},
  ssr: { noExternal: true },
  build: {
    outDir: tmp, emptyOutDir: true, minify: false, target: "node22", ssr: path.join(hier, "src/cli/bibliothek.mjs"),
    rollupOptions: { output: { format: "es", entryFileNames: "bibliothek.mjs" } },
  },
});
fs.copyFileSync(path.join(tmp, "bibliothek.mjs"), path.join(dist, "bibliothek.mjs"));
fs.copyFileSync(path.join(hier, "fonts", "LIZENZ.txt"), path.join(runtime, "SCHRIFTEN-LIZENZ.txt"));
fs.rmSync(tmp, { recursive: true, force: true });

// references/bausteine.md is generated from the schema the build validates against, so they cannot drift.
const { BAUSTEINE } = await import(pathToFileURL(path.join(hier, "src/shared/schema.js")).href);
const ART = { text: "kurzer Text (Markdown, {{Formel}})", lang: "Text, darf länger sein (erst nach Aufdecken sichtbar)", medium: "Datei in inhalt/medien/", svg: "SVG-Code oder Datei in inhalt/medien/", liste: "Liste", plain: "Wert" };
const feldText = (felder, tiefe = 0) => Object.entries(felder).map(([n, f]) => `${"  ".repeat(tiefe)}- \`${n}\`${f.pflicht ? " (Pflicht)" : ""}: ${ART[f.kind]}${f.kind === "liste" ? "\n" + feldText(f.felder, tiefe + 1) : ""}`).join("\n");
fs.writeFileSync(path.resolve(hier, "..", "references", "bausteine.md"), `# Bausteine (Folienkomponenten)

Generiert aus \`app/src/shared/schema.js\` bei \`npm run build\`; nicht von Hand ändern. Felder und Regeln der Folie: [data-format.md](data-format.md).

${Object.entries(BAUSTEINE).map(([art, d]) => `## ${art}\n\n${d.zweck}.\n\n${feldText(d.felder)}\n`).join("\n")}`);

for (const f of fs.readdirSync(runtime)) console.log(`dist/runtime/${f}`.padEnd(36), Math.round(fs.statSync(path.join(runtime, f)).size / 1024), "KB");
console.log("dist/bibliothek.mjs".padEnd(36), Math.round(fs.statSync(path.join(dist, "bibliothek.mjs")).size / 1024), "KB");
