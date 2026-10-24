// App state: catalog, data loaded per chapter, route, saved lessons, layout preferences.
import { reactive, computed, watch } from "vue";

const K = window.CHEM_KATALOG || { titel: "Chemie-Bibliothek", klassen: [], folien: {}, suche: [], alt: [] };
export const katalog = K;
export const TEST = new URLSearchParams(location.search).has("test");

// ---------- data per chapter (student data and teacher data are separate files) ----------
const geladen = {};
export function ladeSkript(src) {
  if (!geladen[src]) {
    geladen[src] = new Promise((ok, fehler) => {
      const s = document.createElement("script");
      s.src = src; s.onload = () => ok(); s.onerror = () => fehler(new Error("nicht geladen: " + src));
      document.head.appendChild(s);
    });
  }
  return geladen[src];
}
export const daten = reactive({ kapitel: {}, lehrkraft: {} });
export async function ladeKapitel(id) {
  if (!daten.kapitel[id]) { await ladeSkript(`app/daten/${id}.js`); daten.kapitel[id] = window.CHEM_DATEN[id]; }
  return daten.kapitel[id];
}
export async function ladeLehrkraft(id) {
  if (!daten.lehrkraft[id]) { await ladeSkript(`app/daten/${id}.lehrkraft.js`); daten.lehrkraft[id] = window.CHEM_LEHRKRAFT[id]; }
  return daten.lehrkraft[id];
}
export const folieInfo = (id) => K.folien[id];
export function folieDaten(id) {
  const info = K.folien[id];
  return info && daten.kapitel[info.kapitel] ? daten.kapitel[info.kapitel].folienDaten[id] : null;
}
export function notiz(id) {
  const info = K.folien[id];
  return info && daten.lehrkraft[info.kapitel] ? daten.lehrkraft[info.kapitel].notizen[id] || "" : "";
}
export async function ladeFolien(ids, { lehrkraft = false } = {}) {
  const kapitel = [...new Set(ids.map((id) => K.folien[id]?.kapitel).filter(Boolean))];
  await Promise.all(kapitel.map((k) => ladeKapitel(k)));
  if (lehrkraft) await Promise.all(kapitel.map((k) => ladeLehrkraft(k)));
}

// ---------- index of the structure ----------
export const struktur = { klassen: K.klassen, kapitel: {}, wissen: {}, lernbereich: {} };
for (const kl of K.klassen) for (const lb of kl.lernbereiche) {
  struktur.lernbereich[lb.id] = { ...lb, klasse: kl.id };
  for (const kap of lb.kapitel) {
    struktur.kapitel[kap.id] = { ...kap, lernbereich: lb.id, klasse: kl.id };
    for (const w of kap.wissen) struktur.wissen[w.id] = { ...w, kapitel: kap.id, lernbereich: lb.id, klasse: kl.id };
  }
}

// ---------- route ----------
export const route = reactive({ ansicht: "wissen", teile: [] });
function leseRoute() {
  const h = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  const [ansicht, ...teile] = h.split("/");
  route.ansicht = ansicht || "wissen";
  route.teile = teile;
}
window.addEventListener("hashchange", leseRoute);
leseRoute();
export function gehe(pfad) { location.hash = "#/" + pfad; }

// ---------- preferences ----------
const SCHLUESSEL = "chem-bibliothek:" + location.pathname;
const lies = (k, v) => { try { const x = localStorage.getItem(SCHLUESSEL + ":" + k); return x ? JSON.parse(x) : v; } catch { return v; } };
const schreib = (k, v) => { try { localStorage.setItem(SCHLUESSEL + ":" + k, JSON.stringify(v)); } catch { /* storage full or blocked */ } };
export const ui = reactive(lies("ui", { links: true, mitte: true, offen: {} }));
watch(ui, () => schreib("ui", ui), { deep: true });

// ---------- lessons ("Meine Stunde") ----------
const neueId = () => "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
export const stunden = reactive(lies("stunden", { liste: [], aktiv: null }));
if (!stunden.liste.length) stunden.liste.push({ id: neueId(), name: "Neue Stunde", folien: [], position: null, geaendert: Date.now() });
if (!stunden.liste.find((s) => s.id === stunden.aktiv)) stunden.aktiv = stunden.liste[0].id;
watch(stunden, () => schreib("stunden", stunden), { deep: true });
export const stunde = computed(() => stunden.liste.find((s) => s.id === stunden.aktiv));
export const minuten = computed(() => stunde.value.folien.reduce((s, id) => s + (K.folien[id]?.min || 0), 0));
export const inStunde = (id) => stunde.value.folien.includes(id);
export function umschalten(id) {
  const f = stunde.value.folien, i = f.indexOf(id);
  if (i >= 0) f.splice(i, 1); else f.push(id);
  stunde.value.geaendert = Date.now();
}
export function neueStunde(name = "Neue Stunde", folien = []) {
  const s = { id: neueId(), name, folien: [...folien], position: null, geaendert: Date.now() };
  stunden.liste.unshift(s); stunden.aktiv = s.id; return s;
}
export function loescheStunde(id) {
  const i = stunden.liste.findIndex((s) => s.id === id);
  if (i < 0) return;
  stunden.liste.splice(i, 1);
  if (!stunden.liste.length) neueStunde();
  if (stunden.aktiv === id) stunden.aktiv = stunden.liste[0].id;
}

// ---------- downloads (captured in test mode) ----------
export const testDownloads = [];
export function herunterladen(name, blob) {
  if (TEST) { testDownloads.push({ name, blob }); return; }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 30000);
}
export const dateiname = (s) => (s || "stunde").toLowerCase().replace(/[äöüß]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" }[c])).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "stunde";
