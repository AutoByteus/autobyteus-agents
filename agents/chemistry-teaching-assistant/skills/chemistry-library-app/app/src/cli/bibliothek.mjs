#!/usr/bin/env node
// Command-line tool of the chemistry library app.
//   node bibliothek.mjs bauen   <library folder> [--trotzdem]
//   node bibliothek.mjs pruefen <library folder> [--folie <id>] [--ohne-bilder]
import path from "node:path";
import { baue, berichtText } from "./bauen.mjs";
import { pruefe } from "./pruefen.mjs";

const [befehl, ordner, ...rest] = process.argv.slice(2);
const opt = (n) => rest.includes(n);
const wert = (n) => (rest.includes(n) ? rest[rest.indexOf(n) + 1] : undefined);
if (!befehl || !ordner || !["bauen", "pruefen"].includes(befehl)) {
  console.log("Aufruf:\n  node bibliothek.mjs bauen <Bibliotheksordner> [--trotzdem]\n  node bibliothek.mjs pruefen <Bibliotheksordner> [--folie <id>] [--ohne-bilder]");
  process.exit(2);
}
const wurzel = path.resolve(ordner);
const bericht = baue(wurzel, { force: opt("--trotzdem") });
console.log(berichtText(bericht));
if (bericht.fehler.length && !opt("--trotzdem")) { console.log("\nNichts geschrieben: erst die Fehler beheben."); process.exit(1); }
console.log(`\nGebaut: ${path.join(wurzel, "index.html")}`);
if (befehl === "pruefen") {
  const ok = await pruefe(wurzel, { folie: wert("--folie"), bilder: !opt("--ohne-bilder") });
  process.exit(ok ? 0 : 1);
}
