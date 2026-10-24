<script setup>
import { inject, ref, computed } from "vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const loesungen = inject("loesungenAn", ref(false));
const live = computed(() => modus.value === "live");
const antwort = ref(props.b.aussagen.map(() => null));
const zeig = (i) => antwort.value[i] !== null || loesungen.value;
</script>
<template>
  <ul class="richtigfalsch">
    <li v-for="(a, i) in b.aussagen" :key="i" :class="{ ok: antwort[i] !== null && antwort[i] === !!a.richtig, no: antwort[i] !== null && antwort[i] !== !!a.richtig }">
      <span class="rf-aussage" v-html="a.text"></span>
      <span class="rf-wahl">
        <button class="knopf" :class="{ an: antwort[i] === true }" :disabled="!live || antwort[i] !== null" @click="antwort[i] = true">richtig</button>
        <button class="knopf" :class="{ an: antwort[i] === false }" :disabled="!live || antwort[i] !== null" @click="antwort[i] = false">falsch</button>
      </span>
      <div v-if="zeig(i)" class="hinweis"><b>{{ a.richtig ? "Richtig." : "Falsch." }}</b> <span v-html="a.erklaerung || ''"></span></div>
    </li>
  </ul>
</template>
