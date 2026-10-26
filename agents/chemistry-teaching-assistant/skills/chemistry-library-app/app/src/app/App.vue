<script setup>
import { computed } from "vue";
import { katalog, route, gehe, stunde, minuten } from "./store.js";
import Wissen from "./views/Wissen.vue";
import Galerie from "./views/Galerie.vue";
import StundeAnsicht from "./views/StundeAnsicht.vue";
import Suche from "./views/Suche.vue";
import Praesentation from "./views/Praesentation.vue";
import Publikum from "./views/Publikum.vue";
import EinzelFolie from "./views/EinzelFolie.vue";
import Druck from "./views/Druck.vue";

const VOLLBILD = new Set(["praesentation", "publikum", "folie", "druck"]);
const ANSICHTEN = { wissen: Wissen, folien: Galerie, stunde: StundeAnsicht, suche: Suche, praesentation: Praesentation, publikum: Publikum, folie: EinzelFolie, druck: Druck };
const ansicht = computed(() => ANSICHTEN[route.ansicht] || Wissen);
const vollbild = computed(() => VOLLBILD.has(route.ansicht));
const reiter = [["wissen", "Wissen"], ["folien", "Alle Folien"], ["stunde", "Meine Stunde"], ["suche", "Suche"]];
</script>

<template>
  <div class="app" :class="{ vollbild }">
    <header v-if="!vollbild" class="kopf">
      <span class="marke">{{ katalog.titel }}</span>
      <nav class="reiter">
        <button v-for="[id, name] in reiter" :key="id" class="reiter-knopf" :class="{ an: route.ansicht === id }" :aria-current="route.ansicht === id ? 'page' : null" @click="gehe(id)">{{ name }}</button>
      </nav>
      <span class="stunde-info" title="Folien und Minuten der aktuellen Stunde">{{ stunde.name }} · {{ stunde.folien.length }} Folien · {{ minuten }} min</span>
      <button class="knopf-p" :disabled="!stunde.folien.length" @click="gehe('praesentation')">▶ Präsentieren</button>
    </header>
    <main class="inhalt"><component :is="ansicht" /></main>
  </div>
</template>
