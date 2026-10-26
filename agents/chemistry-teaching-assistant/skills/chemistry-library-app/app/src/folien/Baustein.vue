<script setup>
import BText from "./bausteine/BText.vue";
import BBild from "./bausteine/BBild.vue";
import BSvg from "./bausteine/BSvg.vue";
import BGleichung from "./bausteine/BGleichung.vue";
import BSchritte from "./bausteine/BSchritte.vue";
import BAufdecken from "./bausteine/BAufdecken.vue";
import BSortieren from "./bausteine/BSortieren.vue";
import BReihenfolge from "./bausteine/BReihenfolge.vue";
import BAbstimmung from "./bausteine/BAbstimmung.vue";
import BVorhersage from "./bausteine/BVorhersage.vue";
import BRichtigFalsch from "./bausteine/BRichtigFalsch.vue";
import BRegler from "./bausteine/BRegler.vue";
import BHotspot from "./bausteine/BHotspot.vue";
import BAufgabe from "./bausteine/BAufgabe.vue";
import BVersuch from "./bausteine/BVersuch.vue";

defineProps({ b: Object, schritt: { type: Number, default: 0 } });
defineEmits(["schritt"]);
const ARTEN = {
  text: BText, bild: BBild, svg: BSvg, gleichung: BGleichung, schritte: BSchritte, aufdecken: BAufdecken,
  sortieren: BSortieren, reihenfolge: BReihenfolge, abstimmung: BAbstimmung, vorhersage: BVorhersage,
  richtigfalsch: BRichtigFalsch, regler: BRegler, hotspot: BHotspot, aufgabe: BAufgabe, versuch: BVersuch,
};
</script>

<template>
  <div class="baustein" :class="'b-' + b.art">
    <component :is="ARTEN[b.art]" :b="b" :schritt="schritt" @schritt="$emit('schritt', $event)" />
  </div>
</template>
