<script setup>
// Three columns: knowledge tree | curriculum and teacher preparation | slides of the knowledge point.
// Left and middle columns collapse, so the slide column can take the whole width.
import { computed, ref, watch } from "vue";
import { katalog, struktur, route, gehe, ui, ladeKapitel, ladeLehrkraft, daten, neueStunde } from "../store.js";
import { TYPEN, FELD_TITEL, LEHRKRAFT_FELDER, BEZIEHUNGEN } from "../../shared/schema.js";
import FolienKarte from "../components/FolienKarte.vue";
import Vorschau from "../components/Vorschau.vue";

const erstesWissen = computed(() => Object.keys(struktur.wissen)[0] || null);
const auswahl = computed(() => route.teile[0] || erstesWissen.value);
const wissen = computed(() => struktur.wissen[auswahl.value] || null);
const kapitel = computed(() => struktur.kapitel[wissen.value ? wissen.value.kapitel : auswahl.value] || null);
const istKapitel = computed(() => !wissen.value && !!kapitel.value);
watch(kapitel, (k) => { if (k) { ladeKapitel(k.id); ladeLehrkraft(k.id); } }, { immediate: true });
const lk = computed(() => (kapitel.value ? daten.lehrkraft[kapitel.value.id] : null));
const wl = computed(() => (lk.value && wissen.value ? lk.value.wissen[wissen.value.id] : null));
const begriffe = computed(() => (kapitel.value && daten.kapitel[kapitel.value.id] ? (daten.kapitel[kapitel.value.id].wissen.find((w) => w.id === auswahl.value) || {}).begriffe || [] : []));

const folienIds = computed(() => (wissen.value ? wissen.value.folien : kapitel.value ? kapitel.value.folien : []));
const gruppen = computed(() => {
  const g = {};
  for (const id of folienIds.value) { const t = katalog.folien[id]?.typ; (g[t] = g[t] || []).push(id); }
  return Object.keys(TYPEN).filter((t) => g[t]).map((t) => ({ t, ids: g[t] }));
});
const vorschau = ref(null);

const filter = ref("");
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const passt = (w) => !filter.value || norm(`${w.id} ${w.titel} ${w.begriffe.join(" ")}`).includes(norm(filter.value));
const zuKlasse = ref(Object.fromEntries(struktur.klassen.map((k, i) => [k.id, i > 0])));
const offenLb = ref({});
watch(kapitel, (k) => { if (k) offenLb.value[k.lernbereich] = true; }, { immediate: true });

const feldOffen = (f) => ui.offen[f] !== false;
function alle(an) { for (const f of LEHRKRAFT_FELDER) ui.offen[f] = an; }
function drucken() { document.body.classList.add("druck-mitte"); setTimeout(() => { print(); document.body.classList.remove("druck-mitte"); }, 50); }
function musterstunde() { const s = kapitel.value.stunde; neueStunde(`${kapitel.value.id} ${s.titel}`, s.folien); gehe("stunde"); }
</script>

<template>
  <div class="drei" :class="{ 'ohne-links': !ui.links, 'ohne-mitte': !ui.mitte }">
    <!-- left: knowledge tree -->
    <aside v-if="ui.links" class="spalte links">
      <div class="spalten-kopf"><input v-model="filter" class="filter" placeholder="Filter: Punkt, Begriff …" aria-label="Wissensverzeichnis filtern"><button class="k2 klein" title="Verzeichnis zuklappen" @click="ui.links = false">⟨</button></div>
      <nav class="baum">
        <section v-for="kl in struktur.klassen" :key="kl.id">
          <button class="baum-klasse" @click="zuKlasse[kl.id] = !zuKlasse[kl.id]">{{ zuKlasse[kl.id] ? "▸" : "▾" }} {{ kl.titel }}</button>
          <template v-if="!zuKlasse[kl.id]">
            <div v-for="lb in kl.lernbereiche" :key="lb.id" class="baum-lb">
              <button class="baum-lb-k" :class="{ leer: !lb.kapitel.length }" @click="offenLb[lb.id] = !offenLb[lb.id]">
                <span>{{ lb.titel }}</span><small>{{ lb.wahl ? "Wahl" : lb.ustd ? lb.ustd + " Ustd." : "" }}</small>
              </button>
              <template v-if="offenLb[lb.id]">
                <div v-for="kap in lb.kapitel" :key="kap.id" class="baum-kap">
                  <button class="baum-kap-k" :class="{ an: auswahl === kap.id }" :aria-current="auswahl === kap.id ? 'page' : null" @click="gehe('wissen/' + kap.id)">{{ kap.id }} {{ kap.titel }}</button>
                  <template v-for="w in kap.wissen" :key="w.id">
                    <button v-if="passt(w)" class="baum-w" :class="{ an: auswahl === w.id }" :aria-current="auswahl === w.id ? 'page' : null" @click="gehe('wissen/' + w.id)">
                      <span>{{ w.id.split(".").pop() }}</span> {{ w.titel }} <small>{{ w.folien.length }}</small>
                    </button>
                  </template>
                </div>
                <p v-if="!lb.kapitel.length" class="baum-leer">noch kein Kapitel</p>
              </template>
            </div>
          </template>
        </section>
        <section v-if="katalog.alt.length" class="baum-alt">
          <p class="baum-titel">Ältere Foliensätze</p>
          <a v-for="a in katalog.alt" :key="a.datei" :href="a.datei" target="_blank" class="baum-w">{{ a.titel }}</a>
        </section>
      </nav>
    </aside>
    <button v-else class="schiene" title="Verzeichnis aufklappen" @click="ui.links = true">⟩<span>Verzeichnis</span></button>

    <!-- middle: curriculum and teacher preparation -->
    <section v-if="ui.mitte" class="spalte mitte">
      <template v-if="wissen || istKapitel">
        <div class="spalten-kopf">
          <span class="kennung">{{ auswahl }}</span>
          <span class="werkzeuge">
            <template v-if="wissen"><button class="k2 klein" @click="alle(true)">alle auf</button><button class="k2 klein" @click="alle(false)">alle zu</button></template>
            <button class="k2 klein" @click="drucken">Drucken</button>
            <button class="k2 klein" title="Spalte schließen" @click="ui.mitte = false">✕</button>
          </span>
        </div>
        <div class="mitte-text">
          <template v-if="wissen">
            <h2>{{ wissen.titel }}</h2>
            <p class="kurz" v-html="wissen.kurz"></p>
            <p class="marken"><span class="marke-e">{{ wissen.ebene || "Ebene offen" }}</span><span class="marke-e">{{ struktur.lernbereich[wissen.lernbereich]?.titel }}</span></p>
            <dl v-if="begriffe.length" class="begriffe"><template v-for="b in begriffe" :key="b.begriff"><dt>{{ b.begriff }} <small>{{ b.stufe === "A" ? "anwenden" : "kennen" }}</small></dt><dd v-html="b.erklaerung"></dd></template></dl>
            <p v-if="!wl" class="laedt">Lehrkraft-Teil wird geladen …</p>
            <template v-else>
              <section v-for="f in LEHRKRAFT_FELDER" :key="f" class="feld" :class="{ zu: !feldOffen(f) }">
                <button class="feld-kopf" @click="ui.offen[f] = !feldOffen(f)">{{ feldOffen(f) ? "▾" : "▸" }} {{ FELD_TITEL[f] }}</button>
                <div v-if="feldOffen(f)" class="feld-inhalt">
                  <template v-if="f === 'lehrplan' && wl.lehrplan">
                    <blockquote class="lp" v-html="wl.lehrplan.zitat"></blockquote>
                    <p class="quelle-lp">Lehrplan S. {{ wl.lehrplan.seite }} · Anforderungsebene: <b>{{ wl.lehrplan.ebene }}</b></p>
                    <p class="arten"><span v-for="(v, k) in wl.lehrplan.art" :key="k" :class="{ ja: v }">{{ k }}: {{ v ? "ja" : "nein" }}</span></p>
                    <div v-if="wl.lehrplan.eigen" class="eigen"><b>Eigene Planung</b><div v-html="wl.lehrplan.eigen"></div></div>
                  </template>
                  <ol v-else-if="f === 'lernziele'" class="ziele"><li v-for="z in wl.lernziele" :key="z.id"><b>{{ z.id }}</b> <span v-if="z.afb" class="afb">{{ z.afb }}</span> <span v-html="z.text"></span></li></ol>
                  <ul v-else-if="f === 'erfolgskriterien'"><li v-for="(e, i) in wl.erfolgskriterien" :key="i"><b v-if="e.ziel">{{ e.ziel }}</b> <span v-html="e.text"></span></li></ul>
                  <template v-else-if="f === 'fehlvorstellungen'">
                    <div v-for="(fv, i) in wl.fehlvorstellungen" :key="i" class="fv">
                      <p class="fv-v">„<span v-html="fv.vorstellung"></span>“</p>
                      <dl><dt>Warum falsch</dt><dd v-html="fv.warum"></dd><dt>Diagnose</dt><dd v-html="fv.diagnose"></dd><dt>Korrektur</dt><dd><span v-html="fv.korrektur"></span> <a v-if="fv.folie && katalog.folien[fv.folie]" href="" @click.prevent="vorschau = fv.folie">{{ fv.folie }}</a></dd><dt>Verstanden, wenn</dt><dd v-html="fv.verstanden"></dd></dl>
                    </div>
                  </template>
                  <template v-else-if="f === 'aufgaben'">
                    <div v-for="(a, i) in wl.aufgaben" :id="'aufgabe-' + (i + 1)" :key="i" class="aufg"><span class="afb">{{ a.afb }}</span><div v-html="a.aufgabe"></div><details><summary>Lösung</summary><div v-html="a.loesung"></div></details></div>
                  </template>
                  <ul v-else-if="f === 'verknuepfungen'" class="verkn"><li v-for="(v, i) in wl.verknuepfungen" :key="i"><b>{{ BEZIEHUNGEN[v.rel] || v.rel }}</b> <a v-if="struktur.wissen[v.ref] || struktur.kapitel[v.ref]" href="" @click.prevent="gehe('wissen/' + v.ref)">{{ v.ref }}</a><span v-else>{{ v.ref }}</span> <span v-html="v.text"></span></li></ul>
                  <div v-else v-html="wl[f]"></div>
                </div>
              </section>
            </template>
          </template>
          <template v-else>
            <h2>{{ kapitel.titel }}</h2>
            <p class="kurz" v-html="kapitel.kurz"></p>
            <div v-if="kapitel.stunde" class="feld"><p><b>{{ kapitel.stunde.titel }}</b> · {{ kapitel.stunde.folien.length }} Folien</p><button class="k2 rein" @click="musterstunde">Als Stunde übernehmen</button></div>
            <template v-if="lk">
              <section v-for="[f, t] in [['einheit', 'Einheit'], ['stunde', 'Stundenvorschlag'], ['versuche', 'Versuche und Sicherheit'], ['quellen', 'Quellen']]" :key="f" class="feld"><template v-if="lk.kapitel[f]"><h3>{{ t }}</h3><div v-html="lk.kapitel[f]"></div></template></section>
            </template>
            <h3>Wissenspunkte</h3>
            <ul class="kap-liste"><li v-for="w in kapitel.wissen" :key="w.id"><a href="" @click.prevent="gehe('wissen/' + w.id)">{{ w.id }} {{ w.titel }}</a> · {{ w.folien.length }} Folien</li></ul>
          </template>
        </div>
      </template>
      <p v-else class="leer-hinweis">Noch keine Inhalte. Die Bibliothek wird gefüllt, sobald Wissenspunkte in <code>inhalt/</code> liegen.</p>
    </section>
    <button v-else class="schiene" title="Lehrplan und Lehrkraft aufklappen" @click="ui.mitte = true">⟩<span>Lehrplan &amp; Lehrkraft</span></button>

    <!-- right: slides -->
    <section class="spalte rechts">
      <div class="spalten-kopf"><span class="kennung">Unterrichtsfolien</span><span>{{ folienIds.length }} Folien · {{ folienIds.reduce((s, id) => s + (katalog.folien[id]?.min || 0), 0) }} min</span></div>
      <div class="folien-liste">
        <!-- both side columns closed: one grid of large cards (each card shows its type) -->
        <div v-if="!ui.mitte && !ui.links" class="karten-raster gross">
          <FolienKarte v-for="id in gruppen.flatMap((g) => g.ids)" :id="id" :key="id" @vorschau="vorschau = $event" />
        </div>
        <template v-else>
          <section v-for="g in gruppen" :key="g.t" class="typ-gruppe">
            <h4 :class="'tt-' + g.t">{{ TYPEN[g.t] }} · {{ g.ids.length }}</h4>
            <div class="karten-raster" :class="{ mittel: !ui.mitte || !ui.links }">
              <FolienKarte v-for="id in g.ids" :id="id" :key="id" @vorschau="vorschau = $event" />
            </div>
          </section>
        </template>
        <p v-if="!folienIds.length" class="leer-hinweis">Für diesen Punkt gibt es noch keine Folien.</p>
      </div>
    </section>
    <Vorschau v-if="vorschau" :id="vorschau" :liste="folienIds" @zu="vorschau = null" @wechsel="vorschau = $event" />
  </div>
</template>
