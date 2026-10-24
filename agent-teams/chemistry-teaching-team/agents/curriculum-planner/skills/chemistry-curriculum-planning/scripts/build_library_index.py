#!/usr/bin/env python3
"""Build the library start page index.html: one offline search over every plan,
curriculum analysis, module, slide, task and technical term in the library folder.

Usage: build_library_index.py <library folder> [--title "Chemie-Bibliothek"]

Reads (folders named src_*, quellen and hidden folders are skipped):
  - modules: *.html with <section class="slide ..."> slides. Per slide: number,
    data-section, h1/h2, guiding question (.lq-line), boxes .def/.merke/.teilchen/.stoff,
    tasks (.aufgabe with level .n1/.n2/.n3). Grade from <meta name="klasse">, else
    from "Klasse N" or "Oberstufe" in title or description. Other HTML files without
    slides are listed by title only.
  - library pages: *.html with <meta name="bibliothek-typ" content="plan|lehrplan">.
    Each h2/h3 with an id becomes a hit with its section text; each <dt id> in <dl class="begriffe"> becomes
    a term with its <dd> explanation.
Writes <library folder>/index.html (data embedded, works from file://) and prints counts.
"""
import html, json, os, re, sys

SKIP_DIRS = {"quellen"}


def text(s):
    s = re.sub(r"<(script|style|svg|aside)\b.*?</\1>", " ", s, flags=re.S | re.I)
    s = re.sub(r"<sup>", "^", s)
    s = re.sub(r'</?[a-zA-Z][^"<>]*(?:"[^"]*"[^"<>]*)*>', " ", s)  # quoted values may contain ">"
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def first(pattern, s, flags=re.S | re.I):
    m = re.search(pattern, s, flags)
    return m.group(1) if m else ""


def meta(s, name):
    return html.unescape(first(r'<meta\s+name="%s"\s+content="([^"]*)"' % re.escape(name), s))


def grade_of(s, title, desc):
    g = meta(s, "klasse")
    if g:
        return g
    m = re.search(r"Klassen?\s*(\d{1,2}(?:\s*[–-]\s*\d{1,2})?)", title + " " + desc)
    if m:
        return re.sub(r"\s", "", m.group(1)).replace("-", "–")
    if re.search(r"Oberstufe|Grundkurs|Leistungskurs|GOSt", title + " " + desc):
        return "Oberstufe"
    return ""


def boxes(sec, cls):
    out = []
    for m in re.finditer(r'<div class="box [^"]*\b%s\b[^"]*"[^>]*>(.*?)</div>\s*(?=<div class="box|</div>|<aside)' % cls, sec, re.S):
        out.append(m.group(1))
    return out


def module_items(rel, s):
    title = text(first(r"<title>(.*?)</title>", s))
    desc = meta(s, "description")
    grade = grade_of(s, title, desc)
    items = [{"t": "modul", "title": title, "text": desc, "link": rel, "g": grade, "src": title}]
    parts = re.split(r'(?=<section class="slide)', s)[1:]
    for n, sec in enumerate(parts, 1):
        sec = sec.split("</section>")[0]
        head = text(first(r"<h2[^>]*>(.*?)</h2>", sec) or first(r"<h1[^>]*>(.*?)</h1>", sec))
        lq = text(first(r'<p class="lq-line"[^>]*>(.*?)</p>', sec)).replace("Leitfrage ", "", 1)
        section = html.unescape(first(r'data-section="([^"]*)"', sec))
        core = " ".join(text(b) for c in ("def", "merke", "teilchen", "stoff") for b in boxes(sec, c))
        items.append({"t": "folie", "title": head or section, "q": lq, "sec": section,
                      "text": core[:600], "link": "%s#%d" % (rel, n), "g": grade, "src": title, "n": n})
        for b in boxes(sec, "aufgabe"):
            lvl = "III" if 'class="niv n3' in b else "II" if 'class="niv n2' in b else "I" if 'class="niv n1' in b else ""
            t = re.sub(r"^(Aufgabe\s*\d*\s*)", "", text(b))
            t = re.sub(r"^(I{1,3})\s", "", t).lstrip("· ")
            items.append({"t": "aufgabe", "title": t[:400], "lvl": lvl, "link": "%s#%d" % (rel, n),
                          "g": grade, "src": title, "n": n})
    return items


def page_items(rel, s, kind):
    title = text(first(r"<title>(.*?)</title>", s))
    grade = meta(s, "klasse") or grade_of(s, title, meta(s, "description"))
    items = [{"t": kind, "title": title, "text": meta(s, "description"), "link": rel, "g": grade, "src": title}]
    heads = list(re.finditer(r'<h([23])[^>]*\bid="([^"]+)"[^>]*>(.*?)</h\1>', s, re.S))
    for i, m in enumerate(heads):
        # section text: up to the next heading (h2/h3, with or without id) or end of main
        rest = s[m.end():heads[i + 1].start() if i + 1 < len(heads) else len(s)]
        rest = re.split(r"<h[23][\s>]|</main>", rest)[0]
        rest = re.sub(r'<dl class="begriffe".*?</dl>', " ", rest, flags=re.S)  # terms are own hits
        items.append({"t": kind, "title": text(m.group(3)), "link": "%s#%s" % (rel, m.group(2)),
                      "g": grade, "src": title, "text": text(rest)[:3000]})
    for dl in re.findall(r'<dl class="begriffe"[^>]*>(.*?)</dl>', s, re.S):
        for m in re.finditer(r'<dt[^>]*\bid="([^"]+)"[^>]*>(.*?)</dt>\s*<dd[^>]*>(.*?)</dd>', dl, re.S):
            items.append({"t": "begriff", "title": text(m.group(2)), "text": text(m.group(3)),
                          "link": "%s#%s" % (rel, m.group(1)), "g": grade, "src": title})
    return items


def collect(root):
    items = []
    for d, dirs, files in os.walk(root):
        dirs[:] = sorted(x for x in dirs if not (x.startswith(("src_", ".")) or x in SKIP_DIRS))
        for f in sorted(files):
            if not f.endswith(".html") or (d == root and f == "index.html"):
                continue
            p = os.path.join(d, f)
            rel = os.path.relpath(p, root).replace(os.sep, "/")
            s = open(p, encoding="utf-8", errors="replace").read()
            kind = meta(s, "bibliothek-typ")
            if kind in ("plan", "lehrplan"):
                items += page_items(rel, s, kind)
            elif '<section class="slide' in s:
                items += module_items(rel, s)
            else:
                title = text(first(r"<title>(.*?)</title>", s)) or f
                desc = meta(s, "description")
                items.append({"t": "modul", "title": title, "text": desc, "link": rel,
                              "g": grade_of(s, title, desc), "src": title})
    return items


PAGE = r"""<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITLE__</title>
<style>
:root{--ink:#1f2a2e;--muted:#5b6b70;--petrol:#0f3d3e;--hin:#0e8f80;--amber:#e0921f;--tint:#eef6f5;--line:#d5e3e1}
*{box-sizing:border-box}body{margin:0;font-family:"Source Sans 3","Segoe UI",system-ui,Arial,sans-serif;color:var(--ink);background:#f6f9f9}
header{background:var(--petrol);color:#fff;padding:18px 28px 14px}
header h1{font-family:Cambria,Georgia,serif;margin:0 0 10px;font-size:28px}
#q{width:100%;font-size:20px;padding:10px 14px;border-radius:10px;border:0}
.filters{display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;font-size:14px;color:#cfe6e2;align-items:center}
.filters select{font-size:14px;padding:3px 6px;border-radius:6px}
main{display:grid;grid-template-columns:1fr 330px;gap:20px;padding:18px 28px}
.hit{background:#fff;border:1px solid var(--line);border-radius:12px;padding:10px 14px;margin-bottom:9px;display:flex;gap:10px}
.hit .b{flex:1;min-width:0}.hit a{color:var(--petrol);font-weight:700;text-decoration:none;font-size:17px}.hit a:hover{text-decoration:underline}
.hit p{margin:3px 0 0;font-size:14.5px;line-height:1.35}.hit .src{color:var(--muted);font-size:13px}
.ty{font:700 10.5px/1 sans-serif;letter-spacing:.08em;text-transform:uppercase;border-radius:999px;padding:4px 8px;color:#fff;align-self:flex-start;white-space:nowrap}
.ty.begriff{background:#6d28d9}.ty.folie{background:var(--hin)}.ty.aufgabe{background:#2a62b8}.ty.plan{background:var(--amber)}.ty.lehrplan{background:#8a5300}.ty.modul{background:var(--petrol)}
.star{border:0;background:none;font-size:20px;cursor:pointer;color:#b9c7c9;align-self:flex-start}.star.on{color:var(--amber)}
aside{position:sticky;top:12px;align-self:start;background:#fff;border:2px solid var(--amber);border-radius:14px;padding:12px 14px}
aside h2{font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:#a36200;margin:0 0 8px}
aside ol{padding-left:20px;margin:0 0 8px;font-size:14.5px}aside li{margin-bottom:6px}aside li a{color:var(--petrol)}
aside li button{border:0;background:none;cursor:pointer;color:var(--muted);font-size:13px;padding:0 3px}
aside .ctl button{border:0;background:var(--hin);color:#fff;border-radius:999px;padding:4px 12px;font-weight:700;cursor:pointer;margin-right:6px}
.count{color:var(--muted);font-size:14px;margin:0 0 8px}
@media print{header,.star,.hit,.count,aside .ctl,aside li button{display:none}main{display:block}aside{position:static;border:0}}
</style></head><body>
<header><h1>__TITLE__</h1>
<input id="q" type="search" placeholder="Begriff, Thema, Aufgabe … (z. B. Oxidationszahl)" autofocus>
<div class="filters"><label>Klasse <select id="g"><option value="">alle</option></select></label>
<label>Art <select id="t"><option value="">alles</option><option value="begriff">Begriffe</option><option value="folie">Folien</option><option value="aufgabe">Aufgaben</option><option value="plan">Unterrichtspläne</option><option value="lehrplan">Lehrplan</option><option value="modul">Module</option></select></label>
<label>Niveau <select id="l"><option value="">alle</option><option>I</option><option>II</option><option>III</option></select></label></div></header>
<main><section><p class="count" id="count"></p><div id="hits"></div></section>
<aside><h2>☆ Meine Stunde</h2><ol id="pick"></ol><div class="ctl"><button id="pp">Drucken</button><button id="pc">Leeren</button></div>
<p class="count" style="margin-top:8px">Mit ☆ Treffer sammeln, mit ▲▼ ordnen. Die Liste bleibt in diesem Browser gespeichert.</p></aside></main>
<script>
const D=__DATA__;
const L={begriff:"Begriff",folie:"Folie",aufgabe:"Aufgabe",plan:"Plan",lehrplan:"Lehrplan",modul:"Modul"};
const norm=s=>(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").replace(/ae/g,"a").replace(/oe/g,"o").replace(/ue/g,"u");
D.forEach((d,i)=>{d.i=i;d.k=norm([d.title,d.q,d.sec,d.text,d.src].join(" "));});
const gs=[...new Set(D.map(d=>d.g).filter(Boolean))].sort((a,b)=>(parseInt(a)||99)-(parseInt(b)||99));
const gsel=document.getElementById("g");gs.forEach(g=>{const o=document.createElement("option");o.textContent=g;gsel.appendChild(o);});
const KEY="bibliothek-stunde:"+location.pathname;
let pick=[];try{pick=JSON.parse(localStorage.getItem(KEY)||"[]");}catch(e){}
const esc=s=>(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const rank={begriff:0,folie:1,aufgabe:2,plan:3,lehrplan:4,modul:5};
function render(){
  const q=norm(document.getElementById("q").value).split(/\s+/).filter(Boolean);
  const g=gsel.value,t=document.getElementById("t").value,l=document.getElementById("l").value;
  let r=D.filter(d=>(!g||d.g===g)&&(!t||d.t===t)&&(!l||d.lvl===l)&&q.every(w=>d.k.includes(w)));
  if(q.length)r.sort((a,b)=>{const ta=q.every(w=>norm(a.title).includes(w))?0:1,tb=q.every(w=>norm(b.title).includes(w))?0:1;return ta-tb||rank[a.t]-rank[b.t];});
  document.getElementById("count").textContent=r.length+" Treffer"+(r.length>200?" (die ersten 200)":"");
  document.getElementById("hits").innerHTML=r.slice(0,200).map(d=>`<div class="hit"><span class="ty ${d.t}">${L[d.t]}${d.lvl?" "+d.lvl:""}</span><div class="b"><a href="${esc(d.link)}" target="_blank">${esc(d.title)||"(ohne Titel)"}</a>${d.q?`<p><i>${esc(d.q)}</i></p>`:""}${d.text&&d.t!=="modul"?`<p>${esc(d.text.slice(0,260))}${d.text.length>260?" …":""}</p>`:d.text?`<p>${esc(d.text.slice(0,200))}</p>`:""}<p class="src">${esc(d.src)}${d.n?" · Folie "+d.n:""}${d.g?" · "+esc(d.g):""}</p></div><button class="star ${pick.includes(d.link)?"on":""}" data-l="${esc(d.link)}" title="Für meine Stunde merken">★</button></div>`).join("");
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(pick));}catch(e){}}
function renderPick(){
  const by=Object.fromEntries(D.map(d=>[d.link,d]));
  document.getElementById("pick").innerHTML=pick.map((p,i)=>{const d=by[p]||{title:p,t:"",src:""};return `<li><a href="${esc(p)}" target="_blank">${esc(d.title)}</a> <span class="count">${L[d.t]||""}${d.n?" "+d.n:""}</span><br><button data-a="up" data-i="${i}">▲</button><button data-a="dn" data-i="${i}">▼</button><button data-a="rm" data-i="${i}">entfernen</button></li>`;}).join("")||'<li class="count" style="list-style:none">noch leer</li>';
}
document.getElementById("hits").addEventListener("click",e=>{const b=e.target.closest(".star");if(!b)return;const l=b.dataset.l;const i=pick.indexOf(l);if(i<0)pick.push(l);else pick.splice(i,1);b.classList.toggle("on");save();renderPick();});
document.getElementById("pick").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const i=+b.dataset.i;
  if(b.dataset.a==="rm")pick.splice(i,1);if(b.dataset.a==="up"&&i>0)[pick[i-1],pick[i]]=[pick[i],pick[i-1]];if(b.dataset.a==="dn"&&i<pick.length-1)[pick[i+1],pick[i]]=[pick[i],pick[i+1]];save();renderPick();render();});
document.getElementById("pc").onclick=()=>{pick=[];save();renderPick();render();};
document.getElementById("pp").onclick=()=>print();
["q","g","t","l"].forEach(id=>document.getElementById(id).addEventListener("input",render));
render();renderPick();
</script></body></html>
"""


def main(argv):
    if not argv:
        print(__doc__); return 2
    root = os.path.abspath(argv[0])
    title = argv[argv.index("--title") + 1] if "--title" in argv else "Chemie-Bibliothek"
    items = collect(root)
    data = json.dumps(items, ensure_ascii=False).replace("</", "<\\/")
    page = PAGE.replace("__TITLE__", html.escape(title)).replace("__DATA__", data)
    open(os.path.join(root, "index.html"), "w", encoding="utf-8").write(page)
    counts = {}
    for it in items:
        counts[it["t"]] = counts.get(it["t"], 0) + 1
    print(os.path.join(root, "index.html"), ", ".join("%s: %d" % kv for kv in sorted(counts.items())))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
