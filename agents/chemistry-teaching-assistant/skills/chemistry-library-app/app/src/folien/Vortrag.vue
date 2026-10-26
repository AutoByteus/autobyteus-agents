<script setup>
// Presenter view. The audience window shows only slides; notes stay here.
// Messages (postMessage, all with key "chem"): audience → presenter {chem:"bereit"} {chem:"taste",key} {chem:"schritt",wert}
//                                               presenter → audience {chem:"zeige", folien, index, schritt, loesungen, schwarz}
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import Folie from "./Folie.vue";

const props = defineProps({
  liste: { type: Array, required: true },
  folie: { type: Function, required: true },
  notiz: { type: Function, required: true },
  titel: { type: String, default: "" },
  minutenGeplant: { type: Number, default: 0 },
  start: { type: Object, default: () => ({ index: 0, schritt: 0 }) },
  oeffnePublikum: { type: Function, required: true },
  grundlagen: { type: Array, default: () => [] },
  ladeFolien: { type: Function, default: async () => {} },
});
const emit = defineEmits(["position", "ende"]);

const index = ref(Math.min(props.start.index || 0, Math.max(0, props.liste.length - 1)));
const schritt = ref(props.start.schritt || 0);
const loesungen = ref(false);
const schwarz = ref(false);
const ausflug = ref(null);
const auswahl = ref(false);
const filter = ref("");
const groesse = ref(22);
let fenster = null; // not reactive: on file:// the audience window is cross-origin for Vue's proxies
const publikum = ref(false);
const blockiert = ref(false);
const beginn = Date.now();
const jetzt = ref(Date.now());
const takt = setInterval(() => { jetzt.value = Date.now(); if (fenster && fenster.closed) { fenster = null; publikum.value = false; } }, 1000);

const sichtbar = computed(() => (ausflug.value ? ausflug.value.liste : props.liste));
const pos = computed(() => (ausflug.value ? ausflug.value.index : index.value));
const aktuell = computed(() => props.folie(sichtbar.value[pos.value]));
const naechste = computed(() => props.folie(sichtbar.value[pos.value + 1]));
const amAnfang = computed(() => pos.value === 0 && schritt.value === 0);
const amEnde = computed(() => pos.value >= sichtbar.value.length - 1 && schritt.value >= (aktuell.value ? aktuell.value.schritte : 0));
const zeit = computed(() => { const s = Math.floor((jetzt.value - beginn) / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; });

function setze(p, s) {
  if (ausflug.value) ausflug.value.index = p; else index.value = p;
  schritt.value = s; loesungen.value = false;
}
function weiter() {
  const f = aktuell.value;
  if (f && schritt.value < f.schritte) { schritt.value++; return; }
  if (pos.value < sichtbar.value.length - 1) setze(pos.value + 1, 0);
}
function zurueck() {
  if (schritt.value > 0) { schritt.value--; return; }
  if (pos.value > 0) { const f = props.folie(sichtbar.value[pos.value - 1]); setze(pos.value - 1, f ? f.schritte : 0); }
}
async function starteAusflug(w) {
  await props.ladeFolien(w.folien);
  ausflug.value = { liste: w.folien, index: 0, titel: `${w.id} ${w.titel}`, zurueck: { index: index.value, schritt: schritt.value } };
  schritt.value = 0; loesungen.value = false; auswahl.value = false;
}
function ausflugEnde() {
  if (!ausflug.value) return;
  const z = ausflug.value.zurueck; ausflug.value = null; index.value = z.index; schritt.value = z.schritt;
}
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const grundlagenTreffer = computed(() => props.grundlagen.filter((w) => w.folien.length && (!filter.value || norm(`${w.id} ${w.titel}`).includes(norm(filter.value)))).slice(0, 60));

function zustand() {
  return { chem: "zeige", folien: [...sichtbar.value], index: pos.value, schritt: schritt.value, loesungen: loesungen.value, schwarz: schwarz.value, titel: props.titel };
}
function sende() { if (fenster && !fenster.closed) fenster.postMessage(JSON.parse(JSON.stringify(zustand())), "*"); }
watch([sichtbar, pos, schritt, loesungen, schwarz], sende, { deep: true });
watch([index, schritt], () => { if (!ausflug.value) emit("position", { index: index.value, schritt: schritt.value }); });

function oeffnen() {
  const w = props.oeffnePublikum();
  if (!w) { blockiert.value = true; return; }
  blockiert.value = false; fenster = w; publikum.value = true;
  // An audience window that was already open does not reload; send the state to it now and again shortly after.
  for (const ms of [50, 400, 1500]) setTimeout(sende, ms);
}
function nachricht(e) {
  const d = e.data;
  if (!d || !d.chem || (fenster && e.source !== fenster)) return;
  if (d.chem === "bereit") { if (!fenster) { fenster = e.source; publikum.value = true; } sende(); }
  else if (d.chem === "taste") taste({ key: d.key, target: document.body, preventDefault() {} });
  else if (d.chem === "schritt") schritt.value = Math.max(0, Math.min(d.wert, aktuell.value ? aktuell.value.schritte : 0));
}
function taste(e) {
  if (auswahl.value) { if (e.key === "Escape") auswahl.value = false; return; }
  if (e.target && e.target.closest && e.target.closest("input,textarea,select")) return;
  const k = e.key;
  if (["ArrowRight", " ", "PageDown", "Enter"].includes(k)) { e.preventDefault(); weiter(); }
  else if (["ArrowLeft", "PageUp", "Backspace"].includes(k)) { e.preventDefault(); zurueck(); }
  else if (k === "Home") setze(0, 0);
  else if (k === "End") setze(sichtbar.value.length - 1, 0);
  else if (k === "l" || k === "L") loesungen.value = !loesungen.value;
  else if (k === "b" || k === "B" || k === ".") schwarz.value = !schwarz.value;
  else if (k === "g" || k === "G") { if (props.grundlagen.length) { auswahl.value = true; nextTick(() => document.querySelector(".ausflug-filter")?.focus()); } }
  else if (k === "z" || k === "Z") ausflugEnde();
  else if (k === "Escape") beenden();
}
function beenden() { if (fenster && !fenster.closed) fenster.close(); emit("ende"); }
onMounted(() => { addEventListener("keydown", taste); addEventListener("message", nachricht); oeffnen(); });
onBeforeUnmount(() => { removeEventListener("keydown", taste); removeEventListener("message", nachricht); clearInterval(takt); if (fenster && !fenster.closed) fenster.close(); });
defineExpose({ weiter, zurueck, zustand });
</script>

<template>
  <div class="vortrag">
    <header class="v-kopf">
      <b>{{ titel }}</b>
      <span v-if="ausflug" class="v-ausflug">Exkurs: {{ ausflug.titel }}</span>
      <span class="v-pos">Folie {{ pos + 1 }} / {{ sichtbar.length }}<template v-if="aktuell && aktuell.schritte"> · Schritt {{ schritt + 1 }}/{{ aktuell.schritte + 1 }}</template></span>
      <span class="v-zeit" title="Zeit seit Beginn / geplant">{{ zeit }}<template v-if="minutenGeplant"> / {{ minutenGeplant }} min</template></span>
      <span class="v-knoepfe">
        <button class="vk" title="zurück (←)" :disabled="amAnfang" @click="zurueck">◀</button>
        <button class="vk" title="weiter (→, Leertaste)" :disabled="amEnde" @click="weiter">▶</button>
        <button class="vk" :class="{ an: loesungen }" title="Lösungen im Publikumsfenster zeigen (L)" @click="loesungen = !loesungen">Lösungen</button>
        <button class="vk" :class="{ an: schwarz }" title="Publikumsfenster schwarz (B)" @click="schwarz = !schwarz">Schwarz</button>
        <button v-if="grundlagen.length && !ausflug" class="vk" title="Grundlagen einschieben (G)" @click="auswahl = true">Grundlagen …</button>
        <button v-if="ausflug" class="vk an" title="zurück zur Stunde (Z)" @click="ausflugEnde">Zurück zur Stunde</button>
        <button v-if="!publikum" class="vk" title="Publikumsfenster öffnen" @click="oeffnen">Publikumsfenster öffnen</button>
        <button class="vk" title="Präsentation beenden (Esc)" @click="beenden">Beenden</button>
      </span>
    </header>
    <p v-if="blockiert" class="v-warnung">Das Publikumsfenster wurde blockiert. Bitte Pop-ups für diese Seite erlauben und „Publikumsfenster öffnen“ wählen.</p>
    <p v-else-if="publikum" class="v-info">Publikumsfenster offen: auf den Beamer ziehen und dort F für Vollbild drücken. Nur dieses Fenster zeigt Notizen.</p>
    <div class="v-rumpf">
      <section class="v-aktuell">
        <div class="v-buehne" :class="{ schwarz }"><Folie v-if="aktuell" :key="sichtbar[pos]" :folie="aktuell" modus="statisch" :schritt="schritt" :loesungen="loesungen" /></div>
      </section>
      <aside class="v-seite">
        <div class="v-naechste"><h4>Als Nächstes</h4><div class="v-mini"><Folie v-if="naechste" :key="sichtbar[pos + 1]" :folie="naechste" modus="statisch" /><p v-else class="v-ende">Ende der Stunde</p></div></div>
        <div class="v-notizen">
          <h4>Notizen <span><button class="vk klein" title="kleiner" @click="groesse = Math.max(14, groesse - 2)">A−</button><button class="vk klein" title="größer" @click="groesse = Math.min(40, groesse + 2)">A+</button></span></h4>
          <div class="v-notiztext" :style="{ fontSize: groesse + 'px' }" v-html="notiz(sichtbar[pos]) || '<p>Keine Notizen.</p>'"></div>
        </div>
      </aside>
    </div>
    <nav class="v-leiste">
      <button v-for="(id, i) in sichtbar" :key="id + i" class="v-daumen" :class="{ an: i === pos }" :aria-current="i === pos ? 'step' : null" :title="(props.folie(id) || {}).titel" @click="setze(i, 0)">{{ i + 1 }}</button>
    </nav>
    <div v-if="auswahl" class="modal" @click.self="auswahl = false">
      <div class="modal-in ausflug">
        <h3>Grundlagen einschieben</h3>
        <input v-model="filter" class="ausflug-filter filter" placeholder="Wissenspunkt suchen …" aria-label="Wissenspunkt suchen">
        <ul><li v-for="w in grundlagenTreffer" :key="w.id"><button class="k2" @click="starteAusflug(w)">{{ w.id }} {{ w.titel }} · {{ w.folien.length }} Folien</button></li></ul>
        <button class="k2" @click="auswahl = false">Abbrechen</button>
      </div>
    </div>
  </div>
</template>
