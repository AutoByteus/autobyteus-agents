<script setup>
// "Meine Stunde": compose, order, time, save several lessons, resume, present, download.
import { computed, ref } from "vue";
import { katalog, stunden, stunde, minuten, umschalten, neueStunde, loescheStunde, gehe, herunterladen, dateiname, folieDaten, ladeFolien } from "../store.js";
import { TYPEN } from "../../shared/schema.js";
import Folie from "../../folien/Folie.vue";
import Vorschau from "../components/Vorschau.vue";
import { exportHtml } from "../../export/html.js";
import { exportPptx } from "../../export/pptx.js";

const vorschau = ref(null);
const meldung = ref("");
const arbeitet = ref(false);
const ids = computed(() => stunde.value.folien);
ladeFolien(ids.value);
function schiebe(i, d) {
  const f = stunde.value.folien, z = i + d;
  if (z < 0 || z >= f.length) return;
  [f[i], f[z]] = [f[z], f[i]]; stunde.value.geaendert = Date.now();
}
let ziehe = null;
function fallen(i) { if (ziehe === null || ziehe === i) return; const f = stunde.value.folien; const [x] = f.splice(ziehe, 1); f.splice(i, 0, x); ziehe = null; stunde.value.geaendert = Date.now(); }
const pos = computed(() => stunde.value.position);
function fortsetzen() { gehe("praesentation/fortsetzen"); }
function restNeu() { const rest = stunde.value.folien.slice(pos.value.index); neueStunde(`${stunde.value.name} (Fortsetzung)`, rest); }
function kopieren() { neueStunde(`${stunde.value.name} (Kopie)`, stunde.value.folien); }
function loeschen() { if (confirm(`„${stunde.value.name}“ löschen?`)) loescheStunde(stunde.value.id); }

async function laden(was) {
  if (!ids.value.length) return;
  arbeitet.value = true; meldung.value = "Export wird erstellt …";
  try {
    const name = dateiname(stunde.value.name);
    if (was === "schueler") herunterladen(`${name}-schueler.html`, new Blob([await exportHtml(ids.value, { lehrkraft: false, titel: stunde.value.name })], { type: "text/html" }));
    else if (was === "lehrkraft") herunterladen(`${name}-lehrkraft.html`, new Blob([await exportHtml(ids.value, { lehrkraft: true, titel: stunde.value.name })], { type: "text/html" }));
    else if (was === "pptx") herunterladen(`${name}.pptx`, await exportPptx(ids.value, stunde.value.name, (t) => (meldung.value = t)));
    meldung.value = "Fertig: Die Datei liegt in Ihrem Download-Ordner.";
  } catch (e) {
    meldung.value = "Export fehlgeschlagen: " + e.message;
    console.error(e);
  } finally { arbeitet.value = false; }
}
function pdf(variante) { const w = window.open(`${location.pathname}${location.search}#/druck/${variante}/${stunde.value.id}`, "_blank"); if (!w) meldung.value = "Bitte Pop-ups für diese Seite erlauben."; }
function sichern() { herunterladen(`${dateiname(stunde.value.name)}.stunde.json`, new Blob([JSON.stringify({ art: "chemie-stunde", name: stunde.value.name, folien: stunde.value.folien }, null, 2)], { type: "application/json" })); }
const datei = ref(null);
async function oeffneDatei(e) {
  const f = e.target.files[0];
  if (!f) return;
  try {
    const d = JSON.parse(await f.text());
    const bekannt = (d.folien || []).filter((id) => katalog.folien[id]);
    neueStunde(d.name || f.name, bekannt);
    meldung.value = bekannt.length < (d.folien || []).length ? `${(d.folien || []).length - bekannt.length} Folien gibt es in dieser Bibliothek nicht.` : `„${d.name}“ geladen.`;
  } catch { meldung.value = "Diese Datei ist keine gespeicherte Stunde."; }
  e.target.value = "";
}
const datum = (t) => new Date(t).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
</script>

<template>
  <div class="stunde-seite">
    <aside class="stunden-liste">
      <div class="spalten-kopf"><span class="kennung">Gespeicherte Stunden</span><button class="k2 klein rein" @click="neueStunde()">+ Neu</button></div>
      <button v-for="s in stunden.liste" :key="s.id" class="stunde-k" :class="{ an: s.id === stunden.aktiv }" :aria-current="s.id === stunden.aktiv ? 'true' : null" @click="stunden.aktiv = s.id">
        <b>{{ s.name }}</b><small>{{ s.folien.length }} Folien · {{ s.folien.reduce((m, id) => m + (katalog.folien[id]?.min || 0), 0) }} min · {{ datum(s.geaendert) }}</small>
      </button>
      <div class="datei-knoepfe">
        <button class="k2 klein" @click="sichern">Stunde als Datei sichern</button>
        <button class="k2 klein" @click="datei.click()">Stunde aus Datei laden</button>
        <input ref="datei" type="file" accept=".json,application/json" hidden @change="oeffneDatei">
      </div>
    </aside>
    <section class="stunde-haupt">
      <div class="stunde-kopf">
        <input v-model="stunde.name" class="stunde-name" aria-label="Name der Stunde" @input="stunde.geaendert = Date.now()">
        <span class="zeit">{{ ids.length }} Folien · {{ minuten }} min</span>
        <button class="k2" @click="kopieren">Kopie</button>
        <button class="k2" @click="loeschen">Löschen</button>
      </div>
      <div class="stunde-aktionen">
        <button class="knopf-p" :disabled="!ids.length" @click="gehe('praesentation')">▶ Präsentieren</button>
        <template v-if="pos && pos.index > 0 && pos.index < ids.length">
          <button class="k2" @click="fortsetzen">Fortsetzen ab Folie {{ pos.index + 1 }}</button>
          <button class="k2" @click="restNeu">Rest als neue Stunde</button>
        </template>
        <span class="trenner"></span>
        <span class="label">Herunterladen:</span>
        <button class="k2" :disabled="!ids.length || arbeitet" title="Eine Datei ohne Notizen, für Schülerinnen und Schüler" @click="laden('schueler')">HTML Schüler</button>
        <button class="k2" :disabled="!ids.length || arbeitet" title="Eine Datei mit Notizen und Referentenansicht" @click="laden('lehrkraft')">HTML Lehrkraft</button>
        <button class="k2" :disabled="!ids.length || arbeitet" title="PowerPoint mit Notizen in den Sprechernotizen; interaktive Folien als Bild" @click="laden('pptx')">PowerPoint</button>
        <button class="k2" :disabled="!ids.length" @click="pdf('schueler')">PDF Schüler</button>
        <button class="k2" :disabled="!ids.length" @click="pdf('lehrkraft')">PDF mit Notizen</button>
      </div>
      <p v-if="meldung" class="meldung" role="status">{{ meldung }}</p>
      <ol class="stunde-folien">
        <li v-for="(id, i) in ids" :key="id" class="sf" draggable="true" @dragstart="ziehe = i" @dragover.prevent @drop="fallen(i)">
          <span class="sf-nr">{{ i + 1 }}</span>
          <button class="sf-bild" :title="'Vorschau ' + id" @click="vorschau = id"><Folie v-if="folieDaten(id)" :folie="folieDaten(id)" modus="statisch" :kennung="false" /></button>
          <span class="sf-text"><b>{{ katalog.folien[id]?.titel || id }}</b><small>{{ id }} · {{ TYPEN[katalog.folien[id]?.typ] }} · {{ katalog.folien[id]?.min }} min</small></span>
          <span class="sf-knoepfe">
            <button class="k2 klein" :disabled="i === 0" title="nach oben" @click="schiebe(i, -1)">▲</button>
            <button class="k2 klein" :disabled="i === ids.length - 1" title="nach unten" @click="schiebe(i, 1)">▼</button>
            <button class="k2 klein raus" title="aus der Stunde entfernen" @click="umschalten(id)">✕</button>
          </span>
        </li>
      </ol>
      <p v-if="!ids.length" class="leer-hinweis">Noch keine Folien. Unter „Wissen“ oder „Alle Folien“ mit „+ Stunde“ hinzufügen.</p>
    </section>
    <Vorschau v-if="vorschau" :id="vorschau" :liste="ids" @zu="vorschau = null" @wechsel="vorschau = $event" />
  </div>
</template>
