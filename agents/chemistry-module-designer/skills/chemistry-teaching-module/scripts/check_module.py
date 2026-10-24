#!/usr/bin/env python3
"""Render-check a built teaching module in headless Chrome.

Usage: check_module.py module.html [--out DIR] [--no-shots]

Reports, from the module's own ?check mode:
  - slides whose content runs past the slide edge (overflow, in px)
  - script errors and missing widgets
And from the file itself:
  - resources loaded from the network (the module must work offline)
  - unfinished placeholders written as ‹…›
Then saves a screenshot per slide, and per animation step for slides with
step animations (file names sNN.png and sNN-kK.png), unless --no-shots.
Exit code 1 when a problem is found. Set CHROME to the browser binary if it is
not found automatically.
"""
import json, os, re, shutil, subprocess, sys

CANDIDATES = [
    os.environ.get("CHROME", ""),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "msedge",
]


def find_chrome():
    for c in CANDIDATES:
        if c and (os.path.isfile(c) or shutil.which(c)):
            return c if os.path.isfile(c) else shutil.which(c)
    return None


def run(chrome, args, timeout=60):
    return subprocess.run([chrome, "--headless=new", "--disable-gpu", "--hide-scrollbars"] + args,
                          capture_output=True, text=True, timeout=timeout)


def main(argv):
    if not argv:
        print(__doc__); return 2
    path = os.path.abspath(argv[0])
    out = None
    if "--out" in argv:
        out = argv[argv.index("--out") + 1]
    shots = "--no-shots" not in argv
    text = open(path, encoding="utf-8").read()
    problems = []

    net = re.findall(r'<(?:script|link|img|iframe|video|audio|source)\b[^>]*\b(?:src|href)="(https?:[^"]+)"', text)
    net += re.findall(r'url\((["\']?)(https?:[^)"\']+)\1\)', text)
    net += re.findall(r'@import\s+["\'](https?:[^"\']+)', text)
    if net:
        problems.append("Netzwerk-Ressourcen (Modul muss offline laufen): %s" % net[:5])
    ph = sorted(set(re.findall(r"‹[^›<\n]{1,60}›", text)))
    if ph:
        problems.append("%d unfertige Platzhalter: %s" % (len(ph), ", ".join(ph[:8])))

    chrome = find_chrome()
    if not chrome:
        problems.append("Chrome/Chromium nicht gefunden; CHROME setzen oder im Browser prüfen")
        report(problems); return 1
    url = "file://" + path
    r = run(chrome, ["--window-size=1280,800", "--virtual-time-budget=5000", "--dump-dom", url + "?check"])
    m = re.search(r"CHECK(\{.*?\})</pre>", r.stdout, re.S)
    if not m:
        problems.append("Prüfmodus lieferte kein Ergebnis (Skriptfehler beim Laden?)")
        report(problems); return 1
    res = json.loads(m.group(1).replace("&quot;", '"').replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">"))
    print("Folien: %d, Schritt-Animationen: %d" % (res["slides"], len(res["anims"])))
    for o in res["overflow"]:
        problems.append("Folie %d: Inhalt %d px über dem Rand (%s)" % (o["slide"], o["px"], o["element"]))
    for e in res["errors"]:
        problems.append("Skriptfehler: %s" % e)

    if shots:
        out = out or os.path.join("/tmp", os.path.splitext(os.path.basename(path))[0] + "-check")
        os.makedirs(out, exist_ok=True)
        jobs = [("s%02d.png" % n, "#%d" % n) for n in range(1, res["slides"] + 1)]
        steps = {}
        for a in res["anims"]:
            steps[a["slide"]] = max(steps.get(a["slide"], 0), a["steps"])
        for n, k in sorted(steps.items()):
            jobs += [("s%02d-k%d.png" % (n, i), "#%d:%d" % (n, i)) for i in range(0, k + 1)]
        for name, frag in jobs:
            run(chrome, ["--window-size=1280,776", "--virtual-time-budget=3000",
                         "--screenshot=" + os.path.join(out, name), url + "?shot" + frag])
        print("Screenshots: %s (%d Dateien)" % (out, len(jobs)))
    report(problems)
    return 1 if problems else 0


def report(problems):
    if problems:
        print("PROBLEME:")
        for p in problems:
            print("  - " + p)
    else:
        print("Keine Probleme gefunden.")


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
