// The slide components ("Bausteine") and their fields. One place for the build (validation,
// Markdown, media) and for the documentation in references/data-format.md.
//   kind: "text" short Markdown shown on the slide (inline, formulas in {{…}})
//         "lang" Markdown that may be longer (hidden until revealed: solutions, feedback)
//         "medium" a file in inhalt/medien/
//         "svg" inline SVG code or a file in inhalt/medien/ (*.svg)
//         "liste" list of objects with their own fields ("felder")
//         "plain" plain value (number, word, true/false)

export const TYPEN = { EI: "Einstieg", EN: "Entdecken", ER: "Erklärung", UE: "Üben", DI: "Diagnose", VT: "Vertiefung", AK: "Weitere Aktivität" };
export const EINSATZ = { neu: "Erstes Lernen", wdh: "Wiederholung", pruef: "Prüfungsvorbereitung" };
export const NIVEAU = ["I", "II", "III"];
export const EBENEN = ["Einblick gewinnen", "Kennen", "Übertragen", "Anwenden", "Beherrschen", "Sich positionieren", "Beurteilen", "Gestalten"];
export const BEZIEHUNGEN = { vorwissen: "Vorwissen", gleichzeitig: "Gleichzeitig", spaeter: "Später", oberstufe: "Oberstufe" };

export const BAUSTEINE = {
  text: { zweck: "Kurzer Text, höchstens ein bis zwei Sätze", felder: { text: { kind: "text", pflicht: true } } },
  bild: { zweck: "Foto oder Zeichnung", felder: { datei: { kind: "medium", pflicht: true }, alt: { kind: "plain", pflicht: true }, unterschrift: { kind: "text" } } },
  svg: { zweck: "Gezeichnetes Modell oder Schema (SVG); Bewegung als CSS-Animation im SVG", felder: { svg: { kind: "svg", pflicht: true }, alt: { kind: "plain", pflicht: true }, unterschrift: { kind: "text" } } },
  gleichung: { zweck: "Reaktionsgleichung oder Formel in der Formelschreibweise (siehe data-format.md); Gleichungen werden auf Atome und Ladung geprüft", felder: { formel: { kind: "plain", pflicht: true }, wort: { kind: "text" } } },
  schritte: {
    zweck: "Schritt-Animation: SVG, dessen Elemente (id) je Schritt erscheinen (zeigen), verschwinden (verbergen) oder eine Klasse bekommen (klasse: {id: klasse}). Schritte wirken nacheinander; der erste Schritt ist der Anfangszustand; → geht durch die Schritte, ehe die Präsentation weiterblättert. Bewegung über Klassen und CSS-Übergänge im SVG",
    felder: {
      svg: { kind: "svg", pflicht: true }, alt: { kind: "plain", pflicht: true },
      schritte: { kind: "liste", pflicht: true, felder: { text: { kind: "text", pflicht: true }, zeigen: { kind: "plain" }, verbergen: { kind: "plain" }, klasse: { kind: "plain" } } },
    },
  },
  aufdecken: { zweck: "Karten zum Umdrehen: vorne ein Wort oder Bild, hinten die kurze Erklärung", felder: { karten: { kind: "liste", pflicht: true, felder: { vorne: { kind: "text", pflicht: true }, bild: { kind: "medium" }, hinten: { kind: "lang", pflicht: true } } } } },
  sortieren: {
    zweck: "Karten in Fächer sortieren (antippen, dann Fach antippen; mit der Maus auch ziehen); fach ist einer der Namen aus faecher; rueckmeldung erscheint bei falscher Zuordnung",
    felder: { faecher: { kind: "plain", pflicht: true }, karten: { kind: "liste", pflicht: true, felder: { text: { kind: "text", pflicht: true }, bild: { kind: "medium" }, fach: { kind: "plain", pflicht: true }, rueckmeldung: { kind: "lang" } } } },
  },
  reihenfolge: { zweck: "Elemente in die richtige Reihenfolge bringen; elemente stehen in der richtigen Reihenfolge, die App mischt sie", felder: { elemente: { kind: "plain", pflicht: true }, aufloesung: { kind: "lang" } } },
  abstimmung: {
    zweck: "Klassenabstimmung: die Lehrkraft zählt Hände je Antwort (+/−), dann Auflösung; richtig: true markiert die richtige Antwort. merken: ein Schlüssel, unter dem die Zahlen im Browser bleiben; vergleich: zeigt die unter einem anderen Schlüssel gemerkten Zahlen als „vorher“ (Abstimmung vor und nach der Stunde)",
    felder: { optionen: { kind: "liste", pflicht: true, felder: { text: { kind: "text", pflicht: true }, richtig: { kind: "plain" } } }, aufloesung: { kind: "lang", pflicht: true }, merken: { kind: "plain" }, vergleich: { kind: "plain" } },
  },
  vorhersage: {
    zweck: "Erst vermuten, dann auflösen: eine Option antippen, dann erscheint die Auflösung; richtig: true markiert die richtige Option",
    felder: { optionen: { kind: "liste", pflicht: true, felder: { text: { kind: "text", pflicht: true }, richtig: { kind: "plain" } } }, aufloesung: { kind: "lang", pflicht: true } },
  },
  richtigfalsch: { zweck: "Aussagen als richtig oder falsch beurteilen; richtig: true oder false; erklaerung erscheint nach der Antwort", felder: { aussagen: { kind: "liste", pflicht: true, felder: { text: { kind: "text", pflicht: true }, richtig: { kind: "plain", pflicht: true }, erklaerung: { kind: "lang" } } } } },
  regler: {
    zweck: "Regler über Stufen: je Stufe ein anderes Bild, Modell oder kurzer Text. Dauerbewegung (Teilchen) als CSS-Animation im SVG der Stufe",
    felder: { name: { kind: "plain", pflicht: true }, stufen: { kind: "liste", pflicht: true, felder: { wert: { kind: "plain", pflicht: true }, text: { kind: "text" }, bild: { kind: "medium" }, svg: { kind: "svg" } } } },
  },
  hotspot: { zweck: "Bild mit nummerierten Punkten zum Antippen; x und y in Prozent der Bildbreite und -höhe", felder: { datei: { kind: "medium", pflicht: true }, alt: { kind: "plain", pflicht: true }, punkte: { kind: "liste", pflicht: true, felder: { x: { kind: "plain", pflicht: true }, y: { kind: "plain", pflicht: true }, titel: { kind: "text", pflicht: true }, text: { kind: "lang" } } } } },
  aufgabe: { zweck: "Aufgabe mit gestuften Hilfen und verdeckter Lösung; afb I, II oder III; hilfen ist eine Liste kurzer Texte, die nacheinander erscheinen", felder: { afb: { kind: "plain", pflicht: true }, aufgabe: { kind: "text", pflicht: true }, hilfen: { kind: "plain" }, loesung: { kind: "lang", pflicht: true } } },
  versuch: { zweck: "Sicherheit eines Versuchs, kurz: form ist Lehrerversuch oder Schülerversuch; ghs ist eine Liste von Codes (GHS01–GHS09); schutz ist eine Liste kurzer Maßnahmen", felder: { form: { kind: "plain", pflicht: true }, ghs: { kind: "plain" }, schutz: { kind: "plain", pflicht: true } } },
};

/** Number of animation steps a component contributes ("→" goes through them before the next slide). */
export function schrittzahl(b) {
  return b.art === "schritte" ? (b.schritte || []).length - 1 : 0;
}

export const LEHRKRAFT_FELDER = ["lehrplan", "lernziele", "erfolgskriterien", "sachanalyse", "didaktik", "lehrerskript", "fehlvorstellungen", "aufgaben", "verknuepfungen"];
export const FELD_TITEL = {
  lehrplan: "Lehrplanvorgabe", lernziele: "Lernziele", erfolgskriterien: "Erfolgskriterien", sachanalyse: "Sachanalyse",
  didaktik: "Didaktik und Methodik", lehrerskript: "Lehrerskript", fehlvorstellungen: "Fehlvorstellungen",
  aufgaben: "Aufgaben und Lösungen", verknuepfungen: "Wissensverknüpfungen",
};
