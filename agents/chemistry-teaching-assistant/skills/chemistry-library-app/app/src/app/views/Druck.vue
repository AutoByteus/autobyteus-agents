<script setup>
// #/druck/<schueler|lehrkraft>/<lesson id>: all slides of a lesson in their end state, one per page.
// "lehrkraft" adds the notes under each slide. Opens the print dialog when ready.
import { ref, computed, onMounted, nextTick } from "vue";
import Folie from "../../folien/Folie.vue";
import { route, stunden, folieDaten, notiz, ladeFolien, TEST } from "../store.js";
const variante = route.teile[0] === "lehrkraft" ? "lehrkraft" : "schueler";
const s = computed(() => stunden.liste.find((x) => x.id === route.teile[1]) || stunden.liste[0]);
const bereit = ref(false);
onMounted(async () => {
  await ladeFolien(s.value.folien, { lehrkraft: variante === "lehrkraft" });
  bereit.value = true;
  document.title = `${s.value.name} – ${variante === "lehrkraft" ? "mit Notizen" : "Folien"}`;
  await nextTick(); await document.fonts.ready;
  window.__druckBereit = true;
  if (!TEST) setTimeout(() => print(), 400);
});
</script>
<template>
  <div class="druck" :class="'d-' + variante">
    <template v-if="bereit">
      <section v-for="(id, i) in s.folien" :key="id" class="d-seite">
        <div class="d-folie"><Folie :folie="folieDaten(id)" modus="ende" /></div>
        <div v-if="variante === 'lehrkraft'" class="d-notiz"><h4>{{ i + 1 }} · {{ id }}</h4><div v-html="notiz(id)"></div></div>
      </section>
    </template>
  </div>
</template>
