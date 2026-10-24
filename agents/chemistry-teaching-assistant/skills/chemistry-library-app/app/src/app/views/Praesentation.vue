<script setup>
import { ref, computed } from "vue";
import Vortrag from "../../folien/Vortrag.vue";
import { route, stunde, minuten, folieDaten, notiz, ladeFolien, gehe, struktur, TEST } from "../store.js";

const bereit = ref(false);
const ids = computed(() => stunde.value.folien);
const start = route.teile[0] === "fortsetzen" && stunde.value.position ? { ...stunde.value.position } : { index: 0, schritt: 0 };
ladeFolien(ids.value, { lehrkraft: true }).then(() => (bereit.value = true));
const grundlagen = Object.values(struktur.wissen).map((w) => ({ id: w.id, titel: w.titel, folien: w.folien }));
function oeffnePublikum() {
  return window.open(`${location.pathname}${TEST ? "?test" : ""}#/publikum`, "chem-publikum", "popup,width=1280,height=760");
}
function position(p) { stunde.value.position = p; }
async function lade(ids2) { await ladeFolien(ids2, { lehrkraft: true }); }
</script>

<template>
  <Vortrag v-if="bereit && ids.length" :liste="ids" :folie="folieDaten" :notiz="notiz" :titel="stunde.name" :minuten-geplant="minuten" :start="start" :oeffne-publikum="oeffnePublikum" :grundlagen="grundlagen" :lade-folien="lade" @position="position" @ende="gehe('stunde')" />
  <p v-else-if="!ids.length" class="leer-hinweis">Die Stunde hat noch keine Folien. <a href="#/stunde">Zur Stunde</a></p>
  <p v-else class="leer-hinweis">Präsentation wird vorbereitet …</p>
</template>
