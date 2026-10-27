<script setup>
import { computed, ref, onMounted } from "vue";
import { katalog, route, gehe } from "../store.js";
import Vorschau from "../components/Vorschau.vue";
const q = ref(route.teile[0] || "");
const feld = ref(null);
onMounted(() => feld.value && feld.value.focus());
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss");
const ART = { begriff: "Begriff", wissen: "Wissenspunkt", folie: "Folie", aufgabe: "Aufgabe", alt: "Älterer Foliensatz", altfolie: "Folie (älter)" };
const RANG = { begriff: 0, wissen: 1, folie: 2, aufgabe: 3, alt: 4, altfolie: 5 };
const index = katalog.suche.map((e) => ({ ...e, k: norm(`${e.titel} ${e.text}`), kt: norm(e.titel) }));
const treffer = computed(() => {
  const w = norm(q.value).split(/\s+/).filter(Boolean);
  if (!w.length) return [];
  return index.filter((e) => w.every((x) => e.k.includes(x))).sort((a, b) => (w.every((x) => b.kt.includes(x)) - w.every((x) => a.kt.includes(x))) || RANG[a.t] - RANG[b.t]).slice(0, 150);
});
const vorschau = ref(null);
function oeffne(e) {
  const [art, ziel] = e.ziel.split(/:(.+)/);
  if (art === "folie") vorschau.value = ziel;
  else if (art === "wissen") gehe("wissen/" + ziel.split("#")[0]);
  else if (art === "alt") window.open(ziel, "_blank");
}
const textOhneHtml = (s) => (s || "").replace(/<[^>]+>/g, "");
</script>

<template>
  <div class="suche">
    <input ref="feld" v-model="q" class="suchfeld" type="search" placeholder="Begriff, Thema, Aufgabe … (z. B. Oxonium-Ion)" aria-label="Suche">
    <p class="zahl">{{ q ? treffer.length + " Treffer" : "Suche über Begriffe, Wissenspunkte, Folien, Aufgaben und ältere Foliensätze." }}</p>
    <ul class="treffer">
      <li v-for="(e, i) in treffer" :key="i">
        <button class="treffer-k" @click="oeffne(e)"><span class="art" :class="'a-' + e.t">{{ ART[e.t] }}</span><b>{{ textOhneHtml(e.titel) }}</b><span v-if="e.text" class="tt">{{ textOhneHtml(e.text).slice(0, 220) }}</span><small v-if="e.klasse">{{ e.klasse }}</small></button>
      </li>
    </ul>
    <Vorschau v-if="vorschau" :id="vorschau" @zu="vorschau = null" />
  </div>
</template>
