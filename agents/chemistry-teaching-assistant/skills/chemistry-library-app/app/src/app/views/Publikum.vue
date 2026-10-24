<script setup>
// Audience window: loads only student data (never *.lehrkraft.js).
import Leinwand from "../../folien/Leinwand.vue";
import { folieDaten, ladeFolien } from "../store.js";
async function vorbereiten(ids) { await ladeFolien(ids); }
</script>
<template><Leinwand :folie="folieDaten" :vorbereiten="vorbereiten" /></template>
