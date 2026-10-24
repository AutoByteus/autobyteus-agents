#!/usr/bin/env python3
"""Baut aus den Teil-Dateien dieses Ordners (00_head.html … 99_tail.html) ein
einziges, offline lauffähiges HTML-Modul.

Aufruf: python3 build.py [Ausgabedatei]
Standard-Ausgabe: ../<ordnername ohne "src_">.html

- Teile werden nach Dateinamen sortiert aneinandergehängt.
- "/*FONTS*/" wird durch fonts.css ersetzt, falls vorhanden (eingebettete Schriften).
- Lokale Bilder in src="…" werden als data-URI eingebettet.
"""
import base64, glob, mimetypes, os, re, sys

here = os.path.dirname(os.path.abspath(__file__))
name = os.path.basename(here)
name = name[4:] if name.startswith("src_") else name
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(here), name + ".html")

parts = sorted(glob.glob(os.path.join(here, "*.html")))
html = "".join(open(p, encoding="utf-8").read() for p in parts)

fonts = os.path.join(here, "fonts.css")
html = html.replace("/*FONTS*/", open(fonts, encoding="utf-8").read() if os.path.exists(fonts) else "", 1)

def embed(m):
    ref = m.group(2)
    path = os.path.join(here, ref)
    if ref.startswith(("data:", "http:", "https:", "#")) or not os.path.isfile(path):
        return m.group(0)
    mime = mimetypes.guess_type(path)[0] or "application/octet-stream"
    data = base64.b64encode(open(path, "rb").read()).decode("ascii")
    return m.group(1) + "data:" + mime + ";base64," + data + m.group(3)

html = re.sub(r'(\bsrc=")([^"]+)(")', embed, html)

open(out, "w", encoding="utf-8").write(html)
print(out, len(html), "Zeichen,", len(re.findall(r'<section class="slide', html)), "Folien")
