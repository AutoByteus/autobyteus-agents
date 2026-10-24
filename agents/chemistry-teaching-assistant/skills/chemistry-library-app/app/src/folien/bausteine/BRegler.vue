<script setup>
import { inject, ref, computed } from "vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const live = computed(() => modus.value === "live");
const i = ref(0);
const stufe = computed(() => props.b.stufen[i.value]);
</script>
<template>
  <div class="regler">
    <div class="r-anzeige">
      <img v-if="stufe.bild" :src="stufe.bild" alt="" draggable="false">
      <div v-if="stufe.svg" class="svg-flaeche" v-html="stufe.svg"></div>
      <p v-if="stufe.text" class="text" v-html="stufe.text"></p>
    </div>
    <label class="r-leiste">
      <span class="r-name">{{ b.name }}</span>
      <input v-model.number="i" type="range" min="0" :max="b.stufen.length - 1" step="1" :disabled="!live" :aria-label="b.name">
      <span class="r-wert">{{ stufe.wert }}</span>
    </label>
    <div v-if="live" class="r-stufen">
      <button v-for="(s, k) in b.stufen" :key="k" class="knopf" :class="{ an: k === i }" :aria-pressed="k === i ? 'true' : 'false'" @click="i = k">{{ s.wert }}</button>
    </div>
  </div>
</template>
