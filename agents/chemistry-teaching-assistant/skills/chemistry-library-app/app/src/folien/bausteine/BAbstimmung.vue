<script setup>
// The teacher counts raised hands per answer, then reveals the solution.
import { inject, ref, computed } from "vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const loesungen = inject("loesungenAn", ref(false));
const live = computed(() => modus.value === "live");
const stimmen = ref(props.b.optionen.map(() => 0));
const offen = ref(false);
const zeigen = computed(() => offen.value || loesungen.value);
const max = computed(() => Math.max(1, ...stimmen.value));
</script>
<template>
  <div class="abstimmung">
    <div v-for="(o, i) in b.optionen" :key="i" class="ab-zeile" :class="{ richtig: zeigen && o.richtig }">
      <span class="ab-text" v-html="o.text"></span>
      <span class="ab-balken"><i :style="{ width: (stimmen[i] / max * 100) + '%' }"></i></span>
      <span class="ab-zahl">{{ stimmen[i] }}</span>
      <span v-if="live" class="ab-knoepfe">
        <button class="knopf rund" title="eine Stimme weniger" :disabled="!stimmen[i]" @click="stimmen[i]--">−</button>
        <button class="knopf rund" title="eine Stimme mehr" @click="stimmen[i]++">+</button>
      </span>
    </div>
    <div v-if="live" class="leiste"><button class="knopf" @click="offen = !offen">{{ zeigen ? "Auflösung ausblenden" : "Auflösen" }}</button></div>
    <div v-if="zeigen" class="hinweis" v-html="b.aufloesung"></div>
  </div>
</template>
