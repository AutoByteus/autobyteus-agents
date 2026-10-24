<script setup>
import { inject, ref, computed } from "vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const loesungen = inject("loesungenAn", ref(false));
const offen = ref(props.b.karten.map(() => false));
const zeige = (i) => offen.value[i] || loesungen.value;
const live = computed(() => modus.value === "live");
</script>
<template>
  <div class="karten" :style="{ '--spalten': Math.min(b.karten.length, b.karten.length > 4 ? 3 : 2) }">
    <button v-for="(k, i) in b.karten" :key="i" class="karte" :class="{ offen: zeige(i) }" :disabled="!live" @click="offen[i] = !offen[i]">
      <img v-if="k.bild && !zeige(i)" :src="k.bild" alt="" draggable="false">
      <span v-if="!zeige(i)" class="vorne" v-html="k.vorne"></span>
      <span v-else class="hinten" v-html="k.hinten"></span>
    </button>
  </div>
</template>
