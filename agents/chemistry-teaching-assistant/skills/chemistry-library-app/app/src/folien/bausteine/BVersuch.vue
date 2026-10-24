<script setup>
// Safety in short: kind of experiment, GHS pictograms (UNECE, public domain) with their meaning, measures.
import { GHS } from "../ghs.js";
defineProps({ b: Object });
const NAMEN = { GHS01: "explosiv", GHS02: "entzündbar", GHS03: "brandfördernd", GHS04: "Gas unter Druck", GHS05: "ätzend", GHS06: "giftig", GHS07: "Achtung", GHS08: "gesundheitsschädlich", GHS09: "umweltgefährlich" };
</script>
<template>
  <div class="versuch">
    <p class="v-art">{{ b.form }}</p>
    <div v-if="b.ghs && b.ghs.length" class="ghs">
      <figure v-for="g in b.ghs" :key="g" class="ghs-zeichen" :aria-label="g + ' ' + (NAMEN[g] || '')">
        <span class="ghs-bild" v-html="GHS[g] || ''"></span>
        <figcaption>{{ NAMEN[g] || g }}</figcaption>
      </figure>
    </div>
    <ul class="schutz"><li v-for="(s, k) in b.schutz" :key="k" v-html="s"></li></ul>
  </div>
</template>
