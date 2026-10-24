// Quality gate for a built library, in a real browser:
//  1. every control in every view and on every slide is activated (real mouse click at its centre);
//     it fails on script errors, on controls covered by something else, and on controls without effect;
//  2. every slide at 1920×1080: visible words, smallest font, content past the edge; screenshots of
//     every slide, step and solution state, collected on one overview page;
//  3. notes and teacher fields never reach the audience window, the student HTML or the student PDF;
//  4. each export works: student HTML, teacher HTML (presenter + audience), PowerPoint with notes, PDF.
// Writes <library>/pruefung/bericht.md and pruefung/uebersicht.html (with pruefung/bilder/).
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import zlib from "node:zlib";
import { pathToFileURL } from "node:url";
import { Browser, warte } from "./cdp.mjs";

const MAX_WORTE = 40, FEHLER_WORTE = 55, MIN_PX = 28;

const HILFE = String.raw`
window.__pr = (() => {
  const sichtbar = (el) => { if (!el.getClientRects().length) return false; const s = getComputedStyle(el); return s.visibility !== "hidden" && s.display !== "none" && +s.opacity > 0.05; };
  const name = (el) => (el.getAttribute("aria-label") || el.getAttribute("title") || el.textContent || el.value || el.placeholder || el.tagName).replace(/\s+/g, " ").trim().slice(0, 70);
  // Only the top layer: when a dialog is open, the page behind it is not operable.
  const liste = () => { const modale = document.querySelectorAll(".modal"); const wurzel = modale.length ? modale[modale.length - 1] : document;
    return [...wurzel.querySelectorAll("button, a[href], input, select, textarea, [role=button], summary")]
      .filter((el) => sichtbar(el) && !el.disabled && el.getAttribute("aria-disabled") !== "true" && !el.closest(".m-statisch") && !el.closest("[data-pruefen-aus]")); };
  let mut = 0, obs = null, opens = 0;
  const orig = window.open;
  window.open = function () { opens++; return orig.apply(this, arguments); };
  return {
    steuer: () => liste().map((el, i) => ({ i, name: name(el), tag: el.tagName.toLowerCase(), typ: el.type || "", aktuell: !!el.getAttribute("aria-current") || el.getAttribute("aria-pressed") === "true" })),
    ziel(i) {
      const el = liste()[i]; if (!el) return null;
      el.scrollIntoView({ block: "center", inline: "center" });
      const r = el.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const oben = document.elementFromPoint(x, y);
      return { x, y, frei: !!oben && (oben === el || el.contains(oben) || oben.contains(el)), oben: oben ? String(oben.className || oben.tagName) : "" };
    },
    aendere(i) {
      const el = liste()[i]; if (!el) return false;
      if (el.tagName === "SELECT") { const o = [...el.options].find((x) => x.value !== el.value); if (o) { el.value = o.value; el.dispatchEvent(new Event("change", { bubbles: true })); } return true; }
      if (el.type === "range") { el.value = el.value === el.max ? el.min : el.max; el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true })); return true; }
      el.click(); return true;
    },
    scharf() {
      mut = 0; if (obs) obs.disconnect();
      obs = new MutationObserver((m) => (mut += m.length)); obs.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
      this.v = this.stand();
    },
    stand() { return { hash: location.hash, store: JSON.stringify(Object.assign({}, localStorage)), opens, dl: (window.__chemTest && window.__chemTest.downloads.length) || 0, fs: !!document.fullscreenElement }; },
    wirkung() {
      const n = this.stand();
      return { mut, hash: n.hash !== this.v.hash, store: n.store !== this.v.store, open: n.opens > this.v.opens, download: n.dl > this.v.dl, vollbild: n.fs !== this.v.fs };
    },
    folienMass() {
      const f = document.querySelector(".folie"); if (!f) return null;
      const st = f.getBoundingClientRect();
      let worte = 0, minPx = 999; const klein = [], ueber = [];
      const w = document.createTreeWalker(f, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) {
        const t = w.currentNode, el = t.parentElement, txt = t.textContent.trim();
        if (!txt || !sichtbar(el) || el.closest(".quelle") || el.closest(".aus") || el.closest("svg")) continue;
        let p = el, versteckt = false; while (p && p !== f) { if (+getComputedStyle(p).opacity < 0.05) { versteckt = true; break; } p = p.parentElement; }
        if (versteckt) continue;
        worte += (txt.match(/[A-Za-zÄÖÜäöüß0-9][\wÄÖÜäöüß\-–]*/g) || []).length;
        const px = parseFloat(getComputedStyle(el.closest("sub,sup") ? el.closest("sub,sup").parentElement : el).fontSize);
        if (px < minPx) minPx = px;
        if (px < ${MIN_PX}) klein.push(txt.slice(0, 40) + " (" + Math.round(px) + " px)");
      }
      for (const el of f.querySelectorAll("*")) {
        if (!sichtbar(el) || el.closest("svg")) continue;
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > st.right + 2 || r.bottom > st.bottom + 2 || r.left < st.left - 2)) ueber.push(String(el.className || el.tagName));
      }
      const rumpf = f.querySelector(".f-rumpf");
      if (rumpf && rumpf.scrollHeight > rumpf.clientHeight + 4) ueber.push("Inhalt höher als die Folie");
      return { worte, minPx: Math.round(minPx), klein: klein.slice(0, 5), ueber: [...new Set(ueber)].slice(0, 5) };
    },
  };
})();
true;`;

function lade(datei, name) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(datei, "utf8"), ctx);
  return ctx.window[name];
}
/** Sentences of notes and teacher fields; none may reach a student-facing output. */
function lehrkraftTexte(wurzel) {
  const ordner = path.join(wurzel, "app", "daten");
  const texte = new Set();
  const nimm = (html) => {
    const t = String(html || "").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
    for (const satz of t.split(/(?<=[.!?:])\s+/)) if (satz.length >= 24) texte.add(satz.slice(0, 60));
  };
  for (const f of fs.readdirSync(ordner).filter((x) => x.endsWith(".lehrkraft.js"))) {
    const alle = lade(path.join(ordner, f), "CHEM_LEHRKRAFT") || {};
    for (const kap of Object.values(alle)) {
      Object.values(kap.notizen || {}).forEach(nimm);
      Object.values(kap.kapitel || {}).forEach(nimm);
      for (const w of Object.values(kap.wissen || {})) for (const feld of ["sachanalyse", "didaktik", "lehrerskript"]) nimm(w[feld]);
    }
  }
  // A sentence that is also on a slide (for example an expected answer shown as the solution) is not a leak.
  let schueler = "";
  for (const f of fs.readdirSync(ordner).filter((x) => x.endsWith(".js") && !x.endsWith(".lehrkraft.js") && x !== "katalog.js")) {
    const alle = lade(path.join(ordner, f), "CHEM_DATEN") || {};
    schueler += Object.values(alle).map((k) => JSON.stringify(k.folienDaten || {})).join(" ");
  }
  schueler = schueler.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\\[nt]/g, " ").replace(/\s+/g, " ");
  return [...texte].filter((t) => !schueler.includes(t));
}
const enthalten = (text, texte) => texte.filter((t) => text.includes(t));

function zipEintraege(buf) {
  const e = new Map();
  const i = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (i < 0) return e;
  const n = buf.readUInt16LE(i + 10); let p = buf.readUInt32LE(i + 16);
  for (let k = 0; k < n; k++) {
    const meth = buf.readUInt16LE(p + 10), gr = buf.readUInt32LE(p + 20), nl = buf.readUInt16LE(p + 28), xl = buf.readUInt16LE(p + 30), cl = buf.readUInt16LE(p + 32), off = buf.readUInt32LE(p + 42);
    const name = buf.slice(p + 46, p + 46 + nl).toString();
    const lnl = buf.readUInt16LE(off + 26), lxl = buf.readUInt16LE(off + 28);
    const roh = buf.slice(off + 30 + lnl + lxl, off + 30 + lnl + lxl + gr);
    e.set(name, () => (meth === 8 ? zlib.inflateRawSync(roh) : roh).toString("utf8"));
    p += 46 + nl + xl + cl;
  }
  return e;
}

export async function pruefe(wurzel, { folie: nurFolie, bilder = true } = {}) {
  const aus = path.join(wurzel, "pruefung"); const bildOrdner = path.join(aus, "bilder");
  fs.rmSync(aus, { recursive: true, force: true }); fs.mkdirSync(bildOrdner, { recursive: true });
  const K = lade(path.join(wurzel, "app", "daten", "katalog.js"), "CHEM_KATALOG");
  const geheim = lehrkraftTexte(wurzel);
  const alleIds = Object.keys(K.folien);
  const folienIds = nurFolie ? [nurFolie] : alleIds;
  const probe = alleIds.slice(0, 6);
  const basis = pathToFileURL(path.join(wurzel, "index.html")).href + "?test";
  const saat = JSON.stringify({ liste: [{ id: "pruef", name: "Prüfstunde", folien: probe, position: { index: 1, schritt: 0 }, geaendert: Date.now() }, { id: "pruef2", name: "Zweite Stunde", folien: probe.slice(0, 2), position: null, geaendert: Date.now() }], aktiv: "pruef" });
  const probleme = [], hinweise = [], tabelle = [];
  let geklickt = 0;
  const b = await Browser.starte();
  const s = await b.seite(basis + "#/wissen");
  const schluessel = await s.werte("'chem-bibliothek:' + location.pathname + ':stunden'");
  const fremdeSchliessen = async (ausser = []) => { for (const t of await b.ziele()) if (t.targetId !== s.targetId && !ausser.includes(t.targetId)) await b.send("Target.closeTarget", { targetId: t.targetId }).catch(() => {}); };
  async function oeffne(route, vorbereitung) {
    await s.werte(`localStorage.clear(); localStorage.setItem(${JSON.stringify(schluessel)}, ${JSON.stringify(saat)}); true`);
    await s.gehe(basis + "#/" + route);
    await s.send("Page.reload", { ignoreCache: false });
    await s.warteAuf("document.readyState === 'complete' && window.__chemTest", 15000);
    await warte(250);
    await s.werte(HILFE);
    if (vorbereitung) { await s.werte(vorbereitung); await warte(350); }
    s.fehler = [];
  }
  async function sweep(ort, route, vorbereitung) {
    await oeffne(route, vorbereitung);
    const steuer = await s.werte("__pr.steuer()");
    for (const c of steuer) {
      await oeffne(route, vorbereitung);
      s.dateiwahl = false;
      const ziele0 = (await b.ziele()).length;
      await s.werte("__pr.scharf()");
      if (c.tag === "select" || c.typ === "range" || c.typ === "checkbox") await s.werte(`__pr.aendere(${c.i})`);
      else {
        const z = await s.werte(`__pr.ziel(${c.i})`);
        if (!z) { probleme.push(`${ort}: „${c.name}“ nicht mehr auffindbar`); continue; }
        if (!z.frei) { probleme.push(`${ort}: „${c.name}“ ist verdeckt (von ${z.oben.slice(0, 40)})`); continue; }
        await s.send("Input.dispatchMouseEvent", { type: "mousePressed", x: z.x, y: z.y, button: "left", clickCount: 1 });
        await s.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: z.x, y: z.y, button: "left", clickCount: 1 });
        if (c.tag === "input" || c.tag === "textarea") await s.send("Input.insertText", { text: "zz" });
      }
      geklickt++;
      await warte(450);
      for (let k = 0; k < 240; k++) { if (!(await s.werte("/wird erstellt|PowerPoint: Folie/.test(document.querySelector('.meldung')?.textContent || '')").catch(() => false))) break; await warte(250); }
      let w;
      try { w = await s.werte("__pr.wirkung()"); } catch { w = { mut: 1 }; }
      const neueFenster = (await b.ziele()).length > ziele0;
      if (s.fehler.length) probleme.push(`${ort}: „${c.name}“ → Skriptfehler: ${s.fehler.slice(0, 2).join(" | ").slice(0, 200)}`);
      else if (!(w.mut || w.hash || w.store || w.open || w.download || w.vollbild || neueFenster || s.dateiwahl) && !c.aktuell) probleme.push(`${ort}: „${c.name}“ hat keine sichtbare Wirkung`);
      if (neueFenster) await fremdeSchliessen();
    }
    return steuer.length;
  }

  const wissenIds = K.klassen.flatMap((k) => k.lernbereiche.flatMap((lb) => lb.kapitel.flatMap((kap) => kap.wissen.map((w) => w.id))));
  const kapitelIds = K.klassen.flatMap((k) => k.lernbereiche.flatMap((lb) => lb.kapitel.map((kap) => kap.id)));
  try {
    // 1. views: every control once; every knowledge point and chapter opened
    if (!nurFolie) {
      const begriff = (K.suche.find((e) => e.t === "begriff") || K.suche[0] || { titel: "a" }).titel.split(" ")[0];
      const ansichten = [
        ["Wissen", `wissen/${wissenIds[0] || ""}`],
        ["Wissen-Kapitel", `wissen/${kapitelIds[0] || ""}`],
        ["Wissen-Spalten-zu", `wissen/${wissenIds[0] || ""}`, "document.querySelector('.links .spalten-kopf .k2').click(); setTimeout(() => document.querySelector('.mitte .werkzeuge .k2:last-child')?.click(), 50); true"],
        ["Vorschau", `wissen/${wissenIds[0] || ""}`, "document.querySelector('.karte-f .k2').click(); true"],
        ["Alle-Folien", "folien"],
        ["Meine-Stunde", "stunde"],
        ["Suche", "suche/" + encodeURIComponent(begriff)],
        ["Praesentation", "praesentation"],
        ["Praesentation-Grundlagen", "praesentation", "[...document.querySelectorAll('.vk')].find((x) => x.textContent.includes('Grundlagen'))?.click(); true"],
      ];
      for (const [ort, route, vorb] of ansichten) {
        const n = await sweep(ort, route, vorb);
        if (bilder) { await oeffne(route, vorb); await warte(400); await s.bild(path.join(bildOrdner, `ansicht-${ort}.png`)); }
        hinweise.push(`${ort}: ${n} Bedienelemente geprüft`);
        await fremdeSchliessen();
      }
      for (const id of [...wissenIds, ...kapitelIds]) {
        await oeffne(`wissen/${id}`);
        await warte(300);
        if (s.fehler.length) probleme.push(`Wissen ${id}: Skriptfehler beim Öffnen: ${s.fehler[0]}`);
      }
    }

    // 2. slides
    for (const id of folienIds) {
      const info = K.folien[id];
      const ort = `Folie ${id}`;
      await oeffne(`folie/${id}/0`);
      const m = await s.werte("__pr.folienMass()");
      if (!m) { probleme.push(`${ort}: wird nicht angezeigt`); continue; }
      if (bilder) {
        await s.bild(path.join(bildOrdner, `${id}.png`));
        for (let k = 1; k <= info.schritte; k++) { await oeffne(`folie/${id}/${k}`); await warte(900); await s.bild(path.join(bildOrdner, `${id}-schritt${k + 1}.png`)); }
        await oeffne(`folie/${id}/0/loesungen`); await s.bild(path.join(bildOrdner, `${id}-loesung.png`));
      }
      if (m.worte > FEHLER_WORTE) probleme.push(`${ort}: ${m.worte} sichtbare Wörter (Ziel höchstens ${MAX_WORTE})`);
      else if (m.worte > MAX_WORTE) hinweise.push(`${ort}: ${m.worte} sichtbare Wörter (Ziel ≤ ${MAX_WORTE})`);
      if (m.klein.length) probleme.push(`${ort}: Schrift kleiner als ${MIN_PX} px: ${m.klein.join("; ")}`);
      if (m.ueber.length) probleme.push(`${ort}: Inhalt ragt über den Rand: ${m.ueber.join(", ")}`);
      const n = await sweep(ort, `folie/${id}/0`);
      tabelle.push({ id, typ: info.typ, worte: m.worte, minPx: m.minPx, steuer: n, schritte: info.schritte });
    }

    // 3. presenter and audience window: no teacher text in the audience window
    if (!nurFolie && probe.length) {
      await oeffne("praesentation");
      await warte(900);
      const pub = (await b.ziele()).find((t) => t.targetId !== s.targetId && t.url.includes("publikum"));
      if (!pub) probleme.push("Präsentation: Publikumsfenster öffnet nicht");
      else {
        const p = await b.anhaengen(pub.targetId);
        if (!(await p.warteAuf("document.querySelector('.leinwand .folie')", 10000))) probleme.push("Publikumsfenster zeigt keine Folie");
        let gesehen = 0;
        for (let k = 0; k < probe.length + 10; k++) {
          const text = await p.werte("document.documentElement.outerHTML");
          const leck = enthalten(text, geheim);
          if (leck.length) { probleme.push(`Publikumsfenster enthält Lehrkraft-Text: „${leck[0]}“`); break; }
          if (/lehrkraft\.js/.test(text)) { probleme.push("Publikumsfenster lädt Lehrkraft-Daten"); break; }
          const vId = await s.werte("document.querySelector('.v-buehne .folie')?.dataset.folie || ''");
          const pId = await p.werte("document.querySelector('.leinwand .folie')?.dataset.folie || ''");
          if (vId && pId && vId !== pId) { probleme.push(`Publikumsfenster zeigt ${pId}, Referentenansicht ${vId}`); break; }
          if (pId) gesehen++;
          await s.taste("ArrowRight"); await warte(250);
        }
        await s.taste("b"); await warte(250);
        if (await p.werte("!!document.querySelector('.leinwand .folie')")) probleme.push("Präsentation: Schwarz (B) schwärzt das Publikumsfenster nicht");
        hinweise.push(`Publikumsfenster: ${gesehen} Stellungen geprüft, keine Lehrkraft-Texte`);
        if (p.fehler.length) probleme.push(`Publikumsfenster: Skriptfehler ${p.fehler[0]}`);
        await p.zu();
      }
      await fremdeSchliessen();

      // 4. exports
      await oeffne("stunde");
      for (const [knopf, endung] of [["HTML Schüler", "schueler.html"], ["HTML Lehrkraft", "lehrkraft.html"], ["PowerPoint", ".pptx"]]) {
        await s.werte(`[...document.querySelectorAll('button')].find((x) => x.textContent.trim() === ${JSON.stringify(knopf)}).click(); true`);
        if (!(await s.warteAuf(`window.__chemTest.downloads.some((d) => d.name.endsWith(${JSON.stringify(endung)}))`, 180000))) { probleme.push(`Export ${knopf}: keine Datei (${s.fehler.slice(0, 1).join("")})`); continue; }
        const b64 = await s.werte(`(async () => { const d = window.__chemTest.downloads.find((x) => x.name.endsWith(${JSON.stringify(endung)})); const r = new FileReader(); return await new Promise((ok) => { r.onload = () => ok(r.result.split(',')[1]); r.readAsDataURL(d.blob); }); })()`);
        const buf = Buffer.from(b64, "base64");
        const datei = path.join(aus, `export-${endung.replace(/^\./, "")}`);
        fs.writeFileSync(datei, buf);
        if (endung === ".pptx") {
          const z = zipEintraege(buf);
          const folien = [...z.keys()].filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n)).length;
          const notizen = [...z.keys()].filter((n) => /^ppt\/notesSlides\/notesSlide\d+\.xml$/.test(n)).map((n) => z.get(n)()).join(" ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ");
          if (folien !== probe.length) probleme.push(`PowerPoint: ${folien} Folien statt ${probe.length}`);
          if (!enthalten(notizen, geheim).length) probleme.push("PowerPoint: Sprechernotizen fehlen");
          hinweise.push(`PowerPoint: ${folien} Folien mit Sprechernotizen, ${Math.round(buf.length / 1024)} KB`);
          continue;
        }
        const html = buf.toString("utf8");
        const leck = enthalten(html, geheim);
        if (endung === "schueler.html" && leck.length) probleme.push(`HTML Schüler enthält Lehrkraft-Text: „${leck[0]}“`);
        if (endung === "lehrkraft.html" && !leck.length) probleme.push("HTML Lehrkraft enthält keine Notizen");
        const x = await b.seite(pathToFileURL(datei).href);
        await x.warteAuf("document.querySelector('.folie, .p-start')", 10000);
        if (endung === "schueler.html") {
          for (let k = 0; k < probe.length + 8; k++) { await x.taste("ArrowRight"); await warte(150); }
          const pos = await x.werte("document.querySelector('.lw-nav span')?.textContent || ''");
          if (!pos.startsWith(`${probe.length} /`)) probleme.push(`HTML Schüler: Blättern endet bei „${pos}“ statt bei Folie ${probe.length}`);
          if (bilder) await x.bild(path.join(bildOrdner, "export-html-schueler.png"));
        } else {
          await x.werte("document.querySelector('.p-knopf').click(); true");
          await warte(900);
          const pub2 = (await b.ziele()).find((t) => ![s.targetId, x.targetId].includes(t.targetId));
          if (!pub2) probleme.push("HTML Lehrkraft: Publikumsfenster öffnet nicht");
          else {
            const p2 = await b.anhaengen(pub2.targetId);
            if (!(await p2.warteAuf("document.querySelector('.leinwand .folie')", 8000))) probleme.push("HTML Lehrkraft: Publikumsfenster zeigt keine Folie");
            const l2 = enthalten(await p2.werte("document.documentElement.outerHTML"), geheim);
            if (l2.length) probleme.push(`HTML Lehrkraft: Publikumsfenster enthält Notizen: „${l2[0]}“`);
            if (bilder) await x.bild(path.join(bildOrdner, "export-html-lehrkraft-referent.png"));
            await p2.zu();
          }
        }
        if (x.fehler.length) probleme.push(`Export ${knopf}: Skriptfehler ${x.fehler[0]}`);
        await x.zu();
        await fremdeSchliessen();
      }
      for (const v of ["schueler", "lehrkraft"]) {
        const d = await b.seite(`${basis}#/druck/${v}/pruef`);
        await d.werte(`localStorage.setItem(${JSON.stringify(schluessel)}, ${JSON.stringify(saat)}); true`);
        await d.send("Page.reload", {});
        if (!(await d.warteAuf("window.__druckBereit", 20000))) { probleme.push(`PDF ${v}: Druckansicht wird nicht fertig`); await d.zu(); continue; }
        const text = await d.werte("document.body.innerText");
        if (v === "schueler" && enthalten(text, geheim).length) probleme.push("PDF Schüler enthält Lehrkraft-Text");
        if (v === "lehrkraft" && !enthalten(text, geheim).length) probleme.push("PDF mit Notizen enthält keine Notizen");
        const pdf = await d.pdf(path.join(aus, `export-${v}.pdf`));
        const seiten = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
        if (seiten < probe.length) probleme.push(`PDF ${v}: ${seiten} Seiten für ${probe.length} Folien`);
        else hinweise.push(`PDF ${v}: ${seiten} Seiten`);
        if (d.fehler.length) probleme.push(`PDF ${v}: Skriptfehler ${d.fehler[0]}`);
        await d.zu();
      }
    }
  } finally {
    await b.schliesse();
  }

  const zeilen = tabelle.map((t) => `| ${t.id} | ${t.typ} | ${t.worte} | ${t.minPx} | ${t.schritte} | ${t.steuer} |`);
  const bericht = `# Prüfbericht ${new Date().toLocaleString("de-DE")}

Ergebnis: **${probleme.length ? `${probleme.length} Probleme` : "bestanden"}** · ${geklickt} Bedienelemente angeklickt · ${tabelle.length} Folien gemessen

## Probleme
${probleme.length ? probleme.map((p) => `- ${p}`).join("\n") : "Keine."}

## Hinweise
${hinweise.map((p) => `- ${p}`).join("\n") || "Keine."}

## Folien (1920×1080)
| Folie | Typ | Wörter | kleinste Schrift px | Schritte | Bedienelemente |
| --- | --- | --- | --- | --- | --- |
${zeilen.join("\n")}

Bilder: pruefung/uebersicht.html (jede Folie, jeder Schritt, Lösungszustand, Ansichten, Exporte).
`;
  fs.writeFileSync(path.join(aus, "bericht.md"), bericht);
  const liste = fs.readdirSync(bildOrdner).sort();
  fs.writeFileSync(path.join(aus, "uebersicht.html"), `<!DOCTYPE html><meta charset="utf-8"><title>Prüfbilder</title><style>body{font:14px sans-serif;margin:16px;background:#eef3f3}div{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:12px}figure{margin:0;background:#fff;padding:6px;border-radius:8px}img{width:100%;border:1px solid #ccc}</style><h1>Prüfbilder</h1><div>${liste.map((f) => `<figure><img src="bilder/${f}" loading="lazy"><figcaption>${f}</figcaption></figure>`).join("")}</div>`);
  console.log(bericht);
  console.log(`Bericht: ${path.join(aus, "bericht.md")}`);
  return probleme.length === 0;
}
