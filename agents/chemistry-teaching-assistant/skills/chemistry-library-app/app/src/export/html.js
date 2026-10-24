// Single-file HTML export of a lesson. Student version: slides only, no notes.
// Teacher version: slides, notes and the presenter view (audience window without notes).
import { ladeSkript, folieDaten, notiz, ladeFolien } from "../app/store.js";

const sicher = (s) => s.replace(/<\/(script|style)/gi, "<\\/$1");
export function playerHtml(vorlage, daten) {
  const json = JSON.stringify(daten).replace(/</g, "\\u003c");
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${String(daten.titel || "Stunde").replace(/[<&]/g, "")}</title>
<style id="chem-stil">${sicher(vorlage.css)}</style>
</head>
<body>
<div id="app"></div>
<script id="chem-daten">window.CHEM_EXPORT=${json};</script>
<script id="chem-player">${sicher(vorlage.js)}</script>
</body>
</html>
`;
}

export async function exportHtml(ids, { lehrkraft, titel }) {
  await ladeFolien(ids, { lehrkraft });
  await ladeSkript("app/player-vorlage.js");
  const folien = ids.map((id) => folieDaten(id)).filter(Boolean);
  const daten = { titel, erstellt: new Date().toISOString(), lehrkraft: !!lehrkraft, folien };
  if (lehrkraft) daten.notizen = Object.fromEntries(ids.map((id) => [id, notiz(id)]));
  return playerHtml(window.CHEM_PLAYER_VORLAGE, daten);
}
