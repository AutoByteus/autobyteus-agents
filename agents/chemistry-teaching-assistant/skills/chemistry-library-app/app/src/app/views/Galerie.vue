<script setup>
// All slides as cards, with filters. Same cards and lesson as the knowledge view.
import { computed, reactive, ref } from "vue";
import { katalog, struktur } from "../store.js";
import { TYPEN, EINSATZ } from "../../shared/schema.js";
import FolienKarte from "../components/FolienKarte.vue";
import Vorschau from "../components/Vorschau.vue";

const f = reactive({ klasse: "", lernbereich: "", kapitel: "", wissen: "", typ: "", einsatz: "", niveau: "" });
const alle = Object.values(katalog.folien);
const lbs = computed(() => Object.values(struktur.lernbereich).filter((lb) => !f.klasse || lb.klasse === f.klasse));
const kaps = computed(() => Object.values(struktur.kapitel).filter((k) => (!f.klasse || k.klasse === f.klasse) && (!f.lernbereich || k.lernbereich === f.lernbereich)));
const wps = computed(() => Object.values(struktur.wissen).filter((w) => !f.kapitel || w.kapitel === f.kapitel));
const treffer = computed(() => alle.filter((s) => (!f.klasse || s.klasse === f.klasse) && (!f.lernbereich || s.lernbereich === f.lernbereich) && (!f.kapitel || s.kapitel === f.kapitel) && (!f.wissen || s.wissen === f.wissen) && (!f.typ || s.typ === f.typ) && (!f.einsatz || s.einsatz === f.einsatz) && (!f.niveau || s.niveau === f.niveau)).map((s) => s.id));
const vorschau = ref(null);
function zuruecksetzen() { for (const k of Object.keys(f)) f[k] = ""; }
</script>

<template>
  <div class="galerie">
    <div class="filterleiste">
      <select v-model="f.klasse" aria-label="Klasse"><option value="">alle Klassen</option><option v-for="k in struktur.klassen" :key="k.id" :value="k.id">{{ k.titel }}</option></select>
      <select v-model="f.lernbereich" aria-label="Lernbereich"><option value="">alle Lernbereiche</option><option v-for="lb in lbs" :key="lb.id" :value="lb.id">{{ lb.titel }}</option></select>
      <select v-model="f.kapitel" aria-label="Kapitel"><option value="">alle Kapitel</option><option v-for="k in kaps" :key="k.id" :value="k.id">{{ k.id }} {{ k.titel }}</option></select>
      <select v-model="f.wissen" aria-label="Wissenspunkt"><option value="">alle Wissenspunkte</option><option v-for="w in wps" :key="w.id" :value="w.id">{{ w.id }} {{ w.titel }}</option></select>
      <select v-model="f.typ" aria-label="Typ"><option value="">alle Typen</option><option v-for="(n, t) in TYPEN" :key="t" :value="t">{{ n }}</option></select>
      <select v-model="f.einsatz" aria-label="Einsatz"><option value="">jeder Einsatz</option><option v-for="(n, e) in EINSATZ" :key="e" :value="e">{{ n }}</option></select>
      <select v-model="f.niveau" aria-label="Niveau"><option value="">jedes Niveau</option><option v-for="n in ['I', 'II', 'III']" :key="n" :value="n">Niveau {{ n }}</option></select>
      <button class="k2 klein" :disabled="!Object.values(f).some(Boolean)" @click="zuruecksetzen">Filter zurücksetzen</button>
      <span class="zahl">{{ treffer.length }} Folien</span>
    </div>
    <div class="karten-raster breit galerie-raster">
      <FolienKarte v-for="id in treffer" :id="id" :key="id" kompakt @vorschau="vorschau = $event" />
    </div>
    <p v-if="!treffer.length" class="leer-hinweis">Keine Folie passt zu diesen Filtern.</p>
    <Vorschau v-if="vorschau" :id="vorschau" :liste="treffer" @zu="vorschau = null" @wechsel="vorschau = $event" />
  </div>
</template>
