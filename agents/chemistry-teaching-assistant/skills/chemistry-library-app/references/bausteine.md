# Bausteine (Folienkomponenten)

Generiert aus `app/src/shared/schema.js` bei `npm run build`; nicht von Hand ändern. Felder und Regeln der Folie: [data-format.md](data-format.md).

## text

Kurzer Text, höchstens ein bis zwei Sätze.

- `text` (Pflicht): kurzer Text (Markdown, {{Formel}})

## bild

Foto oder Zeichnung.

- `datei` (Pflicht): Datei in inhalt/medien/
- `alt` (Pflicht): Wert
- `unterschrift`: kurzer Text (Markdown, {{Formel}})

## svg

Gezeichnetes Modell oder Schema (SVG); Bewegung als CSS-Animation im SVG.

- `svg` (Pflicht): SVG-Code oder Datei in inhalt/medien/
- `alt` (Pflicht): Wert
- `unterschrift`: kurzer Text (Markdown, {{Formel}})

## gleichung

Reaktionsgleichung oder Formel in der Formelschreibweise (siehe data-format.md); Gleichungen werden auf Atome und Ladung geprüft.

- `formel` (Pflicht): Wert
- `wort`: kurzer Text (Markdown, {{Formel}})

## schritte

Schritt-Animation: SVG, dessen Elemente (id) je Schritt erscheinen (zeigen), verschwinden (verbergen) oder eine Klasse bekommen (klasse: {id: klasse}). Schritte wirken nacheinander; der erste Schritt ist der Anfangszustand; → geht durch die Schritte, ehe die Präsentation weiterblättert. Bewegung über Klassen und CSS-Übergänge im SVG.

- `svg` (Pflicht): SVG-Code oder Datei in inhalt/medien/
- `alt` (Pflicht): Wert
- `schritte` (Pflicht): Liste
  - `text` (Pflicht): kurzer Text (Markdown, {{Formel}})
  - `zeigen`: Wert
  - `verbergen`: Wert
  - `klasse`: Wert

## aufdecken

Karten zum Umdrehen: vorne ein Wort oder Bild, hinten die kurze Erklärung.

- `karten` (Pflicht): Liste
  - `vorne` (Pflicht): kurzer Text (Markdown, {{Formel}})
  - `bild`: Datei in inhalt/medien/
  - `hinten` (Pflicht): Text, darf länger sein (erst nach Aufdecken sichtbar)

## sortieren

Karten in Fächer sortieren (antippen, dann Fach antippen; mit der Maus auch ziehen); fach ist einer der Namen aus faecher; rueckmeldung erscheint bei falscher Zuordnung.

- `faecher` (Pflicht): Wert
- `karten` (Pflicht): Liste
  - `text` (Pflicht): kurzer Text (Markdown, {{Formel}})
  - `bild`: Datei in inhalt/medien/
  - `fach` (Pflicht): Wert
  - `rueckmeldung`: Text, darf länger sein (erst nach Aufdecken sichtbar)

## reihenfolge

Elemente in die richtige Reihenfolge bringen; elemente stehen in der richtigen Reihenfolge, die App mischt sie.

- `elemente` (Pflicht): Wert
- `aufloesung`: Text, darf länger sein (erst nach Aufdecken sichtbar)

## abstimmung

Klassenabstimmung: die Lehrkraft zählt Hände je Antwort (+/−), dann Auflösung; richtig: true markiert die richtige Antwort. merken: ein Schlüssel, unter dem die Zahlen im Browser bleiben; vergleich: zeigt die unter einem anderen Schlüssel gemerkten Zahlen als „vorher“ (Abstimmung vor und nach der Stunde).

- `optionen` (Pflicht): Liste
  - `text` (Pflicht): kurzer Text (Markdown, {{Formel}})
  - `richtig`: Wert
- `aufloesung` (Pflicht): Text, darf länger sein (erst nach Aufdecken sichtbar)
- `merken`: Wert
- `vergleich`: Wert

## vorhersage

Erst vermuten, dann auflösen: eine Option antippen, dann erscheint die Auflösung; richtig: true markiert die richtige Option.

- `optionen` (Pflicht): Liste
  - `text` (Pflicht): kurzer Text (Markdown, {{Formel}})
  - `richtig`: Wert
- `aufloesung` (Pflicht): Text, darf länger sein (erst nach Aufdecken sichtbar)

## richtigfalsch

Aussagen als richtig oder falsch beurteilen; richtig: true oder false; erklaerung erscheint nach der Antwort.

- `aussagen` (Pflicht): Liste
  - `text` (Pflicht): kurzer Text (Markdown, {{Formel}})
  - `richtig` (Pflicht): Wert
  - `erklaerung`: Text, darf länger sein (erst nach Aufdecken sichtbar)

## regler

Regler über Stufen: je Stufe ein anderes Bild, Modell oder kurzer Text. Dauerbewegung (Teilchen) als CSS-Animation im SVG der Stufe.

- `name` (Pflicht): Wert
- `stufen` (Pflicht): Liste
  - `wert` (Pflicht): Wert
  - `text`: kurzer Text (Markdown, {{Formel}})
  - `bild`: Datei in inhalt/medien/
  - `svg`: SVG-Code oder Datei in inhalt/medien/

## hotspot

Bild mit nummerierten Punkten zum Antippen; x und y in Prozent der Bildbreite und -höhe.

- `datei` (Pflicht): Datei in inhalt/medien/
- `alt` (Pflicht): Wert
- `punkte` (Pflicht): Liste
  - `x` (Pflicht): Wert
  - `y` (Pflicht): Wert
  - `titel` (Pflicht): kurzer Text (Markdown, {{Formel}})
  - `text`: Text, darf länger sein (erst nach Aufdecken sichtbar)

## aufgabe

Aufgabe mit gestuften Hilfen und verdeckter Lösung; afb I, II oder III; hilfen ist eine Liste kurzer Texte, die nacheinander erscheinen.

- `afb` (Pflicht): Wert
- `aufgabe` (Pflicht): kurzer Text (Markdown, {{Formel}})
- `hilfen`: Wert
- `loesung` (Pflicht): Text, darf länger sein (erst nach Aufdecken sichtbar)

## versuch

Sicherheit eines Versuchs, kurz: form ist Lehrerversuch oder Schülerversuch; ghs ist eine Liste von Codes (GHS01–GHS09); schutz ist eine Liste kurzer Maßnahmen.

- `form` (Pflicht): Wert
- `ghs`: Wert
- `schutz` (Pflicht): Wert
