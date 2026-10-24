<script setup>
import { inject, ref, computed } from "vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const loesungen = inject("loesungenAn", ref(false));
const live = computed(() => modus.value === "live");
const wahl = ref(null);
const fertig = computed(() => wahl.value !== null || loesungen.value);
</script>
<template>
  <div class="vorhersage">
    <div class="optionen">
      <button v-for="(o, i) in b.optionen" :key="i" class="opt" :class="{ ok: fertig && o.richtig, no: wahl === i && !o.richtig }" :disabled="!live || fertig" @click="wahl = i" v-html="o.text"></button>
    </div>
    <div v-if="fertig" class="hinweis" v-html="b.aufloesung"></div>
    <div v-if="live && wahl !== null" class="leiste"><button class="knopf hell" @click="wahl = null">Neu</button></div>
  </div>
</template>
