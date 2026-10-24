<script setup>
import { inject, ref, computed } from "vue";
import Quelle from "./Quelle.vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const live = computed(() => modus.value === "live");
const offen = ref(null);
</script>
<template>
  <figure class="hotspot">
    <div class="hs-flaeche">
      <img :src="b.datei" :alt="b.alt" draggable="false">
      <button v-for="(p, k) in b.punkte" :key="k" class="hs-punkt" :class="{ an: offen === k }" :style="{ left: p.x + '%', top: p.y + '%' }" :disabled="!live" :title="p.titel.replace(/<[^>]+>/g, '')" @click="offen = offen === k ? null : k">{{ k + 1 }}</button>
    </div>
    <div v-if="offen !== null" class="hinweis"><b v-html="b.punkte[offen].titel"></b> <span v-html="b.punkte[offen].text || ''"></span></div>
    <Quelle :q="b.quelle" />
  </figure>
</template>
