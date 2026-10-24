<script setup>
// A slide card: live thumbnail (rendered when visible), purpose, goals, time, preview and add/remove.
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import Folie from "../../folien/Folie.vue";
import { folieInfo, folieDaten, ladeKapitel, inStunde, umschalten } from "../store.js";
import { TYPEN, EINSATZ } from "../../shared/schema.js";

const props = defineProps({ id: String, kompakt: Boolean });
const emit = defineEmits(["vorschau"]);
const info = computed(() => folieInfo(props.id));
const daten = computed(() => folieDaten(props.id));
const el = ref(null);
const sichtbar = ref(false);
let io;
onMounted(() => {
  io = new IntersectionObserver((e) => {
    if (e.some((x) => x.isIntersecting)) { sichtbar.value = true; ladeKapitel(info.value.kapitel); io.disconnect(); }
  }, { rootMargin: "300px" });
  io.observe(el.value);
});
onBeforeUnmount(() => io && io.disconnect());
</script>

<template>
  <article ref="el" class="karte-f" :class="{ gewaehlt: inStunde(id) }" :data-karte="id">
    <button class="vorschaubild" :title="'Vorschau ' + info.titel" @click="emit('vorschau', id)">
      <Folie v-if="sichtbar && daten" :folie="daten" modus="statisch" />
      <span class="min">{{ info.min }} min</span>
    </button>
    <div class="karte-text">
      <p class="karte-id">{{ id }} · <span :class="'tt-' + info.typ">{{ TYPEN[info.typ] }}</span></p>
      <h3>{{ info.titel }}</h3>
      <p v-if="!kompakt" class="zweck">{{ info.zweck }}</p>
      <p class="marken"><span v-for="z in info.ziele" :key="z" class="marke-z">{{ z }}</span><span class="marke-e">{{ EINSATZ[info.einsatz] }}</span><span class="marke-e">Niveau {{ info.niveau }}</span></p>
      <div class="karte-knoepfe">
        <button class="k2" @click="emit('vorschau', id)">Vorschau</button>
        <button class="k2" :class="inStunde(id) ? 'raus' : 'rein'" @click="umschalten(id)">{{ inStunde(id) ? "✓ in der Stunde – entfernen" : "+ Stunde" }}</button>
      </div>
    </div>
  </article>
</template>
