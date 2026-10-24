<script setup>
// Safety in short. GHS codes are shown as labelled diamonds; a real pictogram can be added as a picture.
defineProps({ b: Object });
const NAMEN = { GHS01: "explosiv", GHS02: "entzündbar", GHS03: "brandfördernd", GHS04: "Gas unter Druck", GHS05: "ätzend", GHS06: "giftig", GHS07: "Achtung", GHS08: "gesundheitsschädlich", GHS09: "umweltgefährlich" };
</script>
<template>
  <div class="versuch">
    <p class="v-art">{{ b.form }}</p>
    <div v-if="b.ghs && b.ghs.length" class="ghs">
      <span v-for="g in b.ghs" :key="g" class="ghs-zeichen"><i><b>{{ g }}</b></i><small>{{ NAMEN[g] || "" }}</small></span>
    </div>
    <ul class="schutz"><li v-for="(s, k) in b.schutz" :key="k" v-html="s"></li></ul>
  </div>
</template>
