<script setup>
import { inject, ref, computed } from "vue";
const props = defineProps({ b: Object });
const modus = inject("folienModus", ref("live"));
const loesungen = inject("loesungenAn", ref(false));
const live = computed(() => modus.value === "live");
const hilfen = ref(0);
const loesung = ref(false);
const zeigeLoesung = computed(() => loesung.value || loesungen.value);
</script>
<template>
  <div class="aufgabe">
    <p class="a-text"><span class="niveau" :class="'n' + b.afb.length">{{ b.afb }}</span> <span v-html="b.aufgabe"></span></p>
    <ol v-if="hilfen" class="hilfen"><li v-for="k in hilfen" :key="k" v-html="b.hilfen[k - 1]"></li></ol>
    <div v-if="live" class="leiste">
      <button v-if="b.hilfen && hilfen < b.hilfen.length" class="knopf hell" @click="hilfen++">Hilfe {{ hilfen + 1 }}</button>
      <button class="knopf" @click="loesung = !loesung">{{ zeigeLoesung ? "Lösung verbergen" : "Lösung zeigen" }}</button>
    </div>
    <div v-if="zeigeLoesung" class="hinweis loesung" v-html="b.loesung"></div>
  </div>
</template>
