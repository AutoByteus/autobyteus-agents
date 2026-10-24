// Build a library: read inhalt/, validate, render Markdown and formulas, split student and
// teacher data, write index.html and app/ (runtime + data). Never overwrites a start page
// that the app did not write: such a file is kept as a backup once.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load as yamlLoad } from "js-yaml";
import { marked } from "marked";
import { BAUSTEINE, TYPEN, EINSATZ, NIVEAU, LEHRKRAFT_FELDER, BEZIEHUNGEN, schrittzahl } from "../shared/schema.js";
import { pruefeGleichung, gleichungHtml, formelHtml } from "../shared/formel.js";

export const APP_MARKE = "chemie-bibliothek-app";
const HIER = path.dirname(fileURLToPath(import.meta.url));
export const RUNTIME = path.join(HIER, "runtime");
const BILD_TYPEN = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml" };
const GROSS_KB = 400;

class Bericht {
  constructor() { this.fehler = []; this.hinweise = []; }
  f(datei, wo, text) { this.fehler.push({ datei, wo, text }); }
  h(datei, wo, text) { this.hinweise.push({ datei, wo, text }); }
}

const lies = (p) => fs.readFileSync(p, "utf8");
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/** Markdown with {{formula}} and {{equation}} (equations are balance-checked). */
function md(text, { inline = false, datei, wo, bericht } = {}) {
  if (text == null || text === "") return "";
  let s = String(text).replace(/\{\{(.+?)\}\}/g, (_, f) => {
    if (/->|<=>|<->|⇌|→/.test(f)) {
      const fehler = pruefeGleichung(f);
      if (fehler && bericht) bericht.f(datei, wo, `Gleichung „${f}“: ${fehler}`);
      return `<span class="gl">${gleichungHtml(f)}</span>`;
    }
    return `<span class="fo">${formelHtml(f)}</span>`;
  });
  return inline ? marked.parseInline(s) : marked.parse(s);
}

function ladeYaml(datei, bericht) {
  try {
    return yamlLoad(lies(datei)) ?? {};
  } catch (e) {
    bericht.f(datei, "", `YAML nicht lesbar: ${e.message.split("\n")[0]}`);
    return null;
  }
}

function wortzahl(html) {
  const t = String(html).replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ");
  return (t.match(/[A-Za-zÄÖÜäöüß0-9][\wÄÖÜäöüß\-–]*/g) || []).length;
}

class Medien {
  constructor(wurzel, bericht) {
    this.ordner = path.join(wurzel, "inhalt", "medien");
    this.bericht = bericht;
    this.quellen = {};
    const q = path.join(this.ordner, "quellen.yaml");
    if (fs.existsSync(q)) {
      const daten = ladeYaml(q, bericht) || {};
      for (const e of Array.isArray(daten) ? daten : daten.medien || []) if (e && e.datei) this.quellen[e.datei] = e;
    }
    this.benutzt = new Set();
  }
  /** data: URI for a media file; data URIs keep export (PNG, PPTX) working from file://. */
  uri(name, datei, wo) {
    const p = path.join(this.ordner, name);
    if (!fs.existsSync(p)) { this.bericht.f(datei, wo, `Medium fehlt: inhalt/medien/${name}`); return ""; }
    const typ = BILD_TYPEN[path.extname(name).toLowerCase()];
    if (!typ) { this.bericht.f(datei, wo, `Dateityp nicht unterstützt: ${name}`); return ""; }
    const kb = fs.statSync(p).size / 1024;
    if (kb > GROSS_KB) this.bericht.h(datei, wo, `${name} ist ${Math.round(kb)} KB; höchstens ${GROSS_KB} KB und 1600 px Breite halten die Bibliothek schnell`);
    if (typ !== "image/svg+xml" && !this.quellen[name]) this.bericht.f(datei, wo, `${name}: Eintrag in inhalt/medien/quellen.yaml fehlt (Urheber, Lizenz, Quelle)`);
    this.benutzt.add(name);
    return `data:${typ};base64,${fs.readFileSync(p).toString("base64")}`;
  }
  svg(wert, datei, wo) {
    if (typeof wert !== "string") return "";
    let code = wert;
    if (!wert.trim().startsWith("<")) {
      const p = path.join(this.ordner, wert);
      if (!fs.existsSync(p)) { this.bericht.f(datei, wo, `SVG fehlt: inhalt/medien/${wert}`); return ""; }
      this.benutzt.add(wert);
      code = lies(p);
    }
    code = code.replace(/<\?xml.*?\?>/, "").replace(/<!DOCTYPE[^>]*>/i, "");
    if (!/<svg[\s>]/.test(code)) { this.bericht.f(datei, wo, "kein <svg>-Element"); return ""; }
    if (/<script/i.test(code) || /\son\w+\s*=/.test(code)) this.bericht.f(datei, wo, "SVG darf kein Skript und keine on…-Attribute enthalten");
    return grenzeSvgStil(code);
  }
}

/** Inline SVG styles are global in the page: prefix every selector and keyframe name with a
 * per-drawing key, so two drawings with the same class names cannot restyle each other. */
function grenzeSvgStil(code) {
  if (!/<style[\s>]/i.test(code)) return code;
  let h = 0; for (const c of code) h = (h * 31 + c.charCodeAt(0)) | 0;
  const k = "s" + (h >>> 0).toString(36);
  code = code.replace(/<svg(\s|>)/, `<svg data-svg="${k}"$1`);
  return code.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/gi, (_, a, css, z) => {
    const namen = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
    for (const n of namen) css = css.replace(new RegExp(`(@keyframes\\s+|animation(?:-name)?\\s*:[^;}]*?)\\b${n}\\b`, "g"), `$1${n}-${k}`);
    let aus = "", i = 0;
    while (i < css.length) {
      const auf = css.indexOf("{", i); if (auf < 0) { aus += css.slice(i); break; }
      const kopf = css.slice(i, auf).trim();
      if (kopf.startsWith("@")) {
        let tiefe = 1, j = auf + 1; while (j < css.length && tiefe) { if (css[j] === "{") tiefe++; else if (css[j] === "}") tiefe--; j++; }
        aus += css.slice(i, j); i = j; continue;
      }
      const zu = css.indexOf("}", auf);
      aus += kopf.split(",").map((s) => `[data-svg="${k}"] ${s.trim()}`).join(",") + css.slice(auf, zu + 1);
      i = zu + 1;
    }
    return a + aus + z;
  });
}

function pruefeFelder(art, spec, b, kontext, wo) {
  const { datei, bericht } = kontext;
  for (const [name, f] of Object.entries(spec)) {
    const v = b[name];
    if (f.pflicht && (v == null || v === "" || (Array.isArray(v) && !v.length))) bericht.f(datei, wo, `${art}: Feld „${name}“ fehlt`);
    if (f.kind === "liste" && v != null) {
      if (!Array.isArray(v)) bericht.f(datei, wo, `${art}: „${name}“ muss eine Liste sein`);
      else v.forEach((e, i) => pruefeFelder(art, f.felder, e || {}, kontext, `${wo}.${name}[${i + 1}]`));
    }
  }
  for (const name of Object.keys(b)) if (name !== "art" && !spec[name]) bericht.h(datei, wo, `${art}: unbekanntes Feld „${name}“ wird ignoriert`);
}

function wandleFelder(spec, b, kontext, wo) {
  const { datei, bericht, medien } = kontext;
  const aus = {};
  for (const [name, f] of Object.entries(spec)) {
    const v = b[name];
    if (v == null) continue;
    if (f.kind === "text") aus[name] = md(v, { inline: true, datei, wo: `${wo}.${name}`, bericht });
    else if (f.kind === "lang") aus[name] = md(v, { datei, wo: `${wo}.${name}`, bericht });
    else if (f.kind === "medium") aus[name] = medien.uri(v, datei, `${wo}.${name}`);
    else if (f.kind === "svg") aus[name] = medien.svg(v, datei, `${wo}.${name}`);
    else if (f.kind === "liste") aus[name] = Array.isArray(v) ? v.map((e, i) => wandleFelder(f.felder, e || {}, kontext, `${wo}.${name}[${i + 1}]`)) : [];
    else aus[name] = v;
  }
  if (b.datei && spec.datei?.kind === "medium") aus.quelle = medien.quellen[b.datei] || null;
  return aus;
}

function baueFolie(roh, kontext, erlaubteZiele) {
  const { datei, bericht } = kontext;
  const wo = roh.id || "(Folie ohne id)";
  const typ = (/-([A-Z]{2})\d+$/.exec(roh.id || "") || [])[1];
  if (!roh.id) bericht.f(datei, wo, "Folie ohne id");
  else if (!typ || !TYPEN[typ]) bericht.f(datei, wo, `id muss auf <Typ><Nr> enden, Typ eines von ${Object.keys(TYPEN).join(", ")}`);
  if (roh.typ && roh.typ !== typ) bericht.f(datei, wo, `typ „${roh.typ}“ passt nicht zur id`);
  for (const f of ["titel", "zweck", "frage", "notizen"]) if (!roh[f]) bericht.f(datei, wo, `Feld „${f}“ fehlt`);
  if (roh.einsatz && !EINSATZ[roh.einsatz]) bericht.f(datei, wo, `einsatz muss ${Object.keys(EINSATZ).join(", ")} sein`);
  if (roh.niveau && !NIVEAU.includes(String(roh.niveau))) bericht.f(datei, wo, "niveau muss I, II oder III sein");
  if (roh.min != null && !(Number.isInteger(roh.min) && roh.min >= 1 && roh.min <= 45)) bericht.f(datei, wo, "min: ganze Minuten 1–45");
  for (const z of roh.ziele || []) if (erlaubteZiele && !erlaubteZiele.has(z)) bericht.f(datei, wo, `Lernziel „${z}“ gibt es nicht`);
  if (!Array.isArray(roh.bausteine) || !roh.bausteine.length) bericht.f(datei, wo, "bausteine fehlen");
  const bausteine = (roh.bausteine || []).map((b, i) => {
    const bw = `${wo}.bausteine[${i + 1}]`;
    const spec = BAUSTEINE[b?.art];
    if (!spec) { bericht.f(datei, bw, `unbekannte art „${b?.art}“; erlaubt: ${Object.keys(BAUSTEINE).join(", ")}`); return null; }
    pruefeFelder(b.art, spec.felder, b, kontext, bw);
    if (b.art === "gleichung" && b.formel) {
      const fehler = /->|<=>|<->|⇌|→/.test(b.formel) ? pruefeGleichung(b.formel) : "";
      if (fehler) bericht.f(datei, bw, `Gleichung „${b.formel}“: ${fehler}`);
    }
    if (b.art === "sortieren" && Array.isArray(b.faecher)) for (const k of b.karten || []) if (k && !b.faecher.includes(k.fach)) bericht.f(datei, bw, `Karte „${k.text}“: Fach „${k.fach}“ gibt es nicht`);
    if (b.art === "vorhersage" && Array.isArray(b.optionen) && !b.optionen.some((o) => o && o.richtig)) bericht.h(datei, bw, "vorhersage ohne richtige Option");
    if (b.art === "aufgabe" && b.afb && !NIVEAU.includes(String(b.afb))) bericht.f(datei, bw, "afb muss I, II oder III sein");
    const aus = wandleFelder(spec.felder, b, kontext, bw);
    if (b.art === "gleichung") { aus.html = /->|<=>|<->|⇌|→/.test(b.formel || "") ? gleichungHtml(b.formel) : formelHtml(b.formel || ""); }
    if (b.art === "reihenfolge") aus.elemente = (b.elemente || []).map((e) => md(e, { inline: true, datei, wo: bw, bericht }));
    if (b.art === "aufgabe") aus.hilfen = (b.hilfen || []).map((e) => md(e, { inline: true, datei, wo: bw, bericht }));
    if (b.art === "versuch") aus.schutz = (b.schutz || []).map((e) => md(e, { inline: true, datei, wo: bw, bericht }));
    return { art: b.art, ...aus };
  }).filter(Boolean);
  const frage = md(roh.frage, { inline: true, datei, wo: `${wo}.frage`, bericht });
  const merke = md(roh.merke, { inline: true, datei, wo: `${wo}.merke`, bericht });
  const folie = {
    id: roh.id, typ, titel: roh.titel || "", zweck: roh.zweck || "", ziele: roh.ziele || [],
    einsatz: roh.einsatz || "neu", niveau: String(roh.niveau || "I"), min: roh.min || 3,
    frage, merke, layout: roh.layout || "auto", bausteine,
    schritte: bausteine.reduce((s, b) => s + schrittzahl(b), 0),
  };
  const sichtbar = [frage, merke, ...bausteine.map((b) => [b.text, b.wort, b.unterschrift, ...(b.karten || []).map((k) => k.vorne || k.text), ...(b.optionen || []).map((o) => o.text), ...(b.aussagen || []).map((a) => a.text), ...(b.elemente || []), b.aufgabe, ...(b.punkte || []).map((p) => p.titel), ...(b.schutz || [])].join(" "))].join(" ");
  folie.worte = wortzahl(sichtbar);
  if (folie.worte > 40) bericht.h(datei, wo, `${folie.worte} sichtbare Wörter (Ziel ≤ 40); Erklärungen gehören in die Notizen`);
  const notizen = md(roh.notizen, { datei, wo: `${wo}.notizen`, bericht });
  return { folie, notizen };
}

function baueWissen(roh, kontext, kapitelId) {
  const { datei, bericht } = kontext;
  const wo = roh.id || path.basename(datei);
  if (!new RegExp(`^${kapitelId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.\\d+$`).test(roh.id || "")) bericht.f(datei, wo, `id muss ${kapitelId}.<Nr> sein`);
  if (path.basename(datei, ".yaml") !== roh.id) bericht.f(datei, wo, "Dateiname muss der id entsprechen");
  for (const f of ["titel", "kurz"]) if (!roh[f]) bericht.f(datei, wo, `Feld „${f}“ fehlt`);
  const entwurf = roh.entwurf === true;
  const melde = (t) => (entwurf ? bericht.h(datei, wo, t) : bericht.f(datei, wo, t));
  for (const f of LEHRKRAFT_FELDER) {
    const v = roh[f];
    if (v == null || v === "" || (Array.isArray(v) && !v.length)) melde(`Feld „${f}“ fehlt (alle neun Felder sind Pflicht; „entwurf: true“ erlaubt Lücken)`);
  }
  const lp = roh.lehrplan || {};
  if (roh.lehrplan && (!lp.zitat || lp.seite == null || !lp.ebene)) melde("lehrplan braucht zitat, seite und ebene");
  const ziele = new Set((roh.lernziele || []).map((z) => z.id));
  (roh.lernziele || []).forEach((z, i) => { if (!z.id || !z.text) bericht.f(datei, `${wo}.lernziele[${i + 1}]`, "Lernziel braucht id und text"); });
  for (const v of roh.verknuepfungen || []) if (v.rel && !BEZIEHUNGEN[v.rel]) bericht.f(datei, wo, `verknuepfungen: rel „${v.rel}“ unbekannt`);
  const m = (t, w) => md(t, { datei, wo: `${wo}.${w}`, bericht });
  const mi = (t, w) => md(t, { inline: true, datei, wo: `${wo}.${w}`, bericht });
  const lehrkraft = {
    lehrplan: roh.lehrplan ? { zitat: m(lp.zitat, "lehrplan.zitat"), seite: lp.seite, ebene: lp.ebene || "", art: lp.art || {}, eigen: m(lp.eigen, "lehrplan.eigen") } : null,
    lernziele: (roh.lernziele || []).map((z) => ({ id: z.id, afb: z.afb || "", text: mi(z.text, "lernziele") })),
    erfolgskriterien: (roh.erfolgskriterien || []).map((e) => ({ ziel: e.ziel || "", text: mi(e.text, "erfolgskriterien") })),
    sachanalyse: m(roh.sachanalyse, "sachanalyse"),
    didaktik: m(roh.didaktik, "didaktik"),
    lehrerskript: m(roh.lehrerskript, "lehrerskript"),
    fehlvorstellungen: (roh.fehlvorstellungen || []).map((f) => ({ vorstellung: mi(f.vorstellung, "fehlvorstellungen"), warum: m(f.warum, "fehlvorstellungen"), diagnose: m(f.diagnose, "fehlvorstellungen"), korrektur: m(f.korrektur, "fehlvorstellungen"), folie: f.folie || "", verstanden: m(f.verstanden, "fehlvorstellungen") })),
    aufgaben: (roh.aufgaben || []).map((a) => ({ afb: a.afb || "", aufgabe: m(a.aufgabe, "aufgaben"), loesung: m(a.loesung, "aufgaben") })),
    verknuepfungen: (roh.verknuepfungen || []).map((v) => ({ rel: v.rel, ref: v.ref || "", text: mi(v.text, "verknuepfungen") })),
  };
  const begriffe = (roh.begriffe || []).map((b) => ({ begriff: b.begriff, stufe: b.stufe || "K", erklaerung: mi(b.erklaerung, "begriffe") }));
  const folien = [], notizen = {};
  for (const f of roh.folien || []) {
    if (f.id && !f.id.startsWith(roh.id + "-")) bericht.f(datei, f.id, `Folien-id muss mit ${roh.id}- beginnen`);
    const r = baueFolie(f, kontext, ziele);
    folien.push(r.folie); notizen[r.folie.id] = r.notizen;
  }
  return {
    student: { id: roh.id, titel: roh.titel || "", kurz: mi(roh.kurz, "kurz"), ebene: lp.ebene || roh.ebene || "", begriffe, folien: folien.map((f) => f.id) },
    lehrkraft, folien, notizen, begriffeRoh: roh.begriffe || [], entwurf,
  };
}

function scanAlt(wurzel, bericht) {
  const alt = [];
  for (const f of fs.readdirSync(wurzel).sort()) {
    if (!f.endsWith(".html") || f === "index.html" || f.startsWith("index-vorher")) continue;
    let s;
    try { s = lies(path.join(wurzel, f)); } catch { continue; }
    if (s.includes(APP_MARKE)) continue;
    const titel = (/<title>([\s\S]*?)<\/title>/i.exec(s) || [])[1]?.replace(/\s+/g, " ").trim() || f;
    const desc = (/<meta\s+name="description"\s+content="([^"]*)"/i.exec(s) || [])[1] || "";
    const kl = (/Klassen?\s*(\d{1,2})/.exec(titel + " " + desc) || [])[1] || (/Oberstufe|Grundkurs|Leistungskurs/.test(titel + desc) ? "Oberstufe" : "");
    const folien = [];
    const teile = s.split(/(?=<section class="slide)/).slice(1);
    teile.forEach((sec, i) => {
      const h = (/<h[12][^>]*>([\s\S]*?)<\/h[12]>/.exec(sec) || [])[1];
      if (h) folien.push({ n: i + 1, titel: h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() });
    });
    alt.push({ datei: f, titel: titel.replace(/&amp;/g, "&"), klasse: kl, folien });
  }
  return alt;
}

/** Read and validate the library. Returns { bericht, ausgabe } without writing anything. */
export function lese(wurzel) {
  const bericht = new Bericht();
  const inhalt = path.join(wurzel, "inhalt");
  const bibDatei = path.join(inhalt, "bibliothek.yaml");
  if (!fs.existsSync(bibDatei)) { bericht.f(bibDatei, "", "inhalt/bibliothek.yaml fehlt"); return { bericht }; }
  const bib = ladeYaml(bibDatei, bericht) || {};
  const medien = new Medien(wurzel, bericht);
  const lbs = new Map();
  const klassen = (bib.klassen || []).map((k) => ({
    id: k.id, titel: k.titel || k.id,
    lernbereiche: (k.lernbereiche || []).map((lb) => { const o = { id: lb.id, titel: lb.titel, ustd: lb.ustd ?? null, seite: lb.seite ?? null, wahl: !!lb.wahl, text: md(lb.text, { datei: bibDatei, wo: lb.id, bericht }), kapitel: [] }; lbs.set(lb.id, o); return o; }),
  }));
  if (!klassen.length) bericht.f(bibDatei, "klassen", "keine Klassen angegeben");
  const kapitelDaten = {};
  const alleFolien = {};
  const suche = [];
  const ids = new Map();
  for (const kl of fs.existsSync(inhalt) ? fs.readdirSync(inhalt).sort() : []) {
    const klOrdner = path.join(inhalt, kl);
    if (!fs.statSync(klOrdner).isDirectory() || kl === "medien") continue;
    for (const kap of fs.readdirSync(klOrdner).sort()) {
      const ordner = path.join(klOrdner, kap);
      const kapDatei = path.join(ordner, "kapitel.yaml");
      if (!fs.statSync(ordner).isDirectory()) continue;
      if (!fs.existsSync(kapDatei)) { bericht.f(kapDatei, "", "kapitel.yaml fehlt"); continue; }
      const kr = ladeYaml(kapDatei, bericht);
      if (!kr) continue;
      if (kr.id !== kap) bericht.f(kapDatei, "id", `id „${kr.id}“ muss dem Ordnernamen „${kap}“ entsprechen`);
      const lb = lbs.get(kr.lernbereich);
      if (!lb) bericht.f(kapDatei, "lernbereich", `Lernbereich „${kr.lernbereich}“ steht nicht in bibliothek.yaml`);
      const kontext = { datei: kapDatei, bericht, medien };
      const student = { id: kr.id, titel: kr.titel || kr.id, kurz: md(kr.kurz, { inline: true, ...kontext, wo: "kurz" }), lernbereich: kr.lernbereich, klasse: kl, wissen: [], folien: [], stunde: kr.stunde ? { titel: kr.stunde.titel || "Musterstunde", folien: kr.stunde.folien || [] } : null };
      const lehrkraft = { kapitel: { einheit: md(kr.einheit, { ...kontext, wo: "einheit" }), stunde: md(kr.stunde?.text, { ...kontext, wo: "stunde" }), versuche: md(kr.versuche, { ...kontext, wo: "versuche" }), quellen: md(kr.quellen, { ...kontext, wo: "quellen" }) }, wissen: {}, notizen: {} };
      const folienDaten = {};
      const merkeFolie = (f, wissenId, d) => {
        if (ids.has(f.id)) bericht.f(d, f.id, `Folien-id doppelt (auch in ${ids.get(f.id)})`);
        ids.set(f.id, d);
        folienDaten[f.id] = f;
        alleFolien[f.id] = { id: f.id, titel: f.titel, zweck: f.zweck, typ: f.typ, einsatz: f.einsatz, niveau: f.niveau, min: f.min, ziele: f.ziele, wissen: wissenId, kapitel: kr.id, klasse: kl, lernbereich: kr.lernbereich, schritte: f.schritte, worte: f.worte };
        suche.push({ t: "folie", titel: f.titel, text: `${f.zweck} ${f.frage.replace(/<[^>]+>/g, "")}`, ziel: `folie:${f.id}`, klasse: kl });
      };
      for (const datei of fs.readdirSync(ordner).filter((d) => d.endsWith(".yaml") && d !== "kapitel.yaml").sort((a, b) => a.localeCompare(b, "de", { numeric: true }))) {
        const voll = path.join(ordner, datei);
        const roh = ladeYaml(voll, bericht);
        if (!roh) continue;
        const w = baueWissen(roh, { datei: voll, bericht, medien }, kr.id);
        student.wissen.push(w.student);
        lehrkraft.wissen[roh.id] = w.lehrkraft;
        Object.assign(lehrkraft.notizen, w.notizen);
        for (const f of w.folien) merkeFolie(f, roh.id, voll);
        suche.push({ t: "wissen", titel: `${roh.id} ${roh.titel}`, text: String(roh.kurz || ""), ziel: `wissen:${roh.id}`, klasse: kl });
        for (const b of w.begriffeRoh) suche.push({ t: "begriff", titel: b.begriff, text: String(b.erklaerung || ""), ziel: `wissen:${roh.id}`, klasse: kl });
        for (const [i, a] of (roh.aufgaben || []).entries()) suche.push({ t: "aufgabe", titel: String(a.aufgabe || "").slice(0, 140), text: "", ziel: `wissen:${roh.id}#aufgabe-${i + 1}`, klasse: kl });
      }
      for (const f of kr.folien || []) {
        if (f.id && !f.id.startsWith(kr.id + "-")) bericht.f(kapDatei, f.id, `Folien-id muss mit ${kr.id}- beginnen`);
        const r = baueFolie(f, kontext, null);
        student.folien.push(r.folie.id);
        lehrkraft.notizen[r.folie.id] = r.notizen;
        merkeFolie(r.folie, kr.id, kapDatei);
      }
      for (const fid of kr.stunde?.folien || []) if (!folienDaten[fid]) bericht.f(kapDatei, "stunde", `Folie „${fid}“ der Musterstunde gibt es nicht`);
      if (lb) lb.kapitel.push({ id: kr.id, titel: student.titel, kurz: student.kurz, wissen: student.wissen.map((w) => ({ id: w.id, titel: w.titel, kurz: w.kurz, ebene: w.ebene, begriffe: w.begriffe.map((b) => b.begriff), folien: w.folien })), folien: student.folien, stunde: student.stunde });
      kapitelDaten[kr.id] = { student: { ...student, folienDaten }, lehrkraft };
    }
  }
  const alt = scanAlt(wurzel, bericht);
  for (const a of alt) {
    suche.push({ t: "alt", titel: a.titel, text: "", ziel: `alt:${a.datei}`, klasse: a.klasse });
    for (const f of a.folien) suche.push({ t: "altfolie", titel: f.titel, text: a.titel, ziel: `alt:${a.datei}#${f.n}`, klasse: a.klasse });
  }
  for (const name of fs.existsSync(medien.ordner) ? fs.readdirSync(medien.ordner) : []) {
    if (name === "quellen.yaml" || name.startsWith(".")) continue;
    if (!medien.benutzt.has(name)) bericht.h(path.join(medien.ordner, name), "", "Medium wird von keiner Folie benutzt");
  }
  const katalog = {
    titel: bib.titel || "Chemie-Bibliothek", land: bib.land || "", lehrplan: bib.lehrplan || null,
    erstellt: new Date().toISOString(), klassen, folien: alleFolien, suche, alt,
    medienquellen: Object.values(medien.quellen).filter((q) => medien.benutzt.has(q.datei)),
  };
  return { bericht, ausgabe: { katalog, kapitelDaten } };
}

const js = (name, wert) => `${name}=${JSON.stringify(wert).replace(/</g, "\\u003c")};\n`;

export function startseite(titel) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="generator" content="${APP_MARKE}">
<title>${esc(titel)}</title>
<link rel="stylesheet" href="app/app.css">
</head>
<body>
<div id="app"><p style="font:18px sans-serif;padding:40px">Die Bibliothek wird geladen …</p></div>
<script src="app/daten/katalog.js"></script>
<script src="app/app.js"></script>
</body>
</html>
`;
}

/** Validate and write. Returns the report; writes nothing when there are errors unless force. */
export function baue(wurzel, { force = false } = {}) {
  const { bericht, ausgabe } = lese(wurzel);
  if (!ausgabe || (bericht.fehler.length && !force)) return bericht;
  const appOrdner = path.join(wurzel, "app");
  const datenOrdner = path.join(appOrdner, "daten");
  fs.rmSync(datenOrdner, { recursive: true, force: true });
  fs.mkdirSync(datenOrdner, { recursive: true });
  for (const f of fs.readdirSync(RUNTIME)) fs.copyFileSync(path.join(RUNTIME, f), path.join(appOrdner, f));
  fs.writeFileSync(path.join(datenOrdner, "katalog.js"), js("window.CHEM_KATALOG", ausgabe.katalog));
  for (const [id, d] of Object.entries(ausgabe.kapitelDaten)) {
    fs.writeFileSync(path.join(datenOrdner, `${id}.js`), `(window.CHEM_DATEN=window.CHEM_DATEN||{})[${JSON.stringify(id)}]=${JSON.stringify(d.student).replace(/</g, "\\u003c")};\n`);
    fs.writeFileSync(path.join(datenOrdner, `${id}.lehrkraft.js`), `(window.CHEM_LEHRKRAFT=window.CHEM_LEHRKRAFT||{})[${JSON.stringify(id)}]=${JSON.stringify(d.lehrkraft).replace(/</g, "\\u003c")};\n`);
  }
  const start = path.join(wurzel, "index.html");
  if (fs.existsSync(start) && !lies(start).includes(APP_MARKE)) {
    const sicher = path.join(wurzel, `index-vorher-${new Date().toISOString().slice(0, 10)}.html`);
    if (!fs.existsSync(sicher)) fs.copyFileSync(start, sicher);
    bericht.h(start, "", `Vorhandene Startseite gesichert als ${path.basename(sicher)}`);
  }
  fs.writeFileSync(start, startseite(ausgabe.katalog.titel));
  return bericht;
}

export function berichtText(bericht) {
  const zeile = (e) => `- ${path.basename(e.datei || "")}${e.wo ? ` · ${e.wo}` : ""}: ${e.text}`;
  return [
    bericht.fehler.length ? `FEHLER (${bericht.fehler.length})\n${bericht.fehler.map(zeile).join("\n")}` : "Keine Fehler.",
    bericht.hinweise.length ? `HINWEISE (${bericht.hinweise.length})\n${bericht.hinweise.map(zeile).join("\n")}` : "",
  ].filter(Boolean).join("\n\n");
}
