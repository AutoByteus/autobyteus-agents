// Reaction equations in one ASCII notation, used to render them and to check atom and charge balance.
//   coefficients   2 H2O, 1/2 O2           charges   Cu^2+  SO4^2-  H3O^+  OH^-
//   electrons      e^-                      groups    Ca(OH)2  [Cu(H2O)4]^2+  CuSO4*5H2O
//   states         (s) (l) (g) (aq)         arrows    ->  <=>  (or → ⇌)
//   bonds          - = ≡ inside a formula   organic   R, R' count like an atom
//   polymers       repeat unit with n = 1   words     not allowed (write "Energie" outside the formula)

const ELEMENTE = new Set(`H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge
As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy
Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm
Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og D`.split(/\s+/).concat(["R", "R'", "R''"]));

const PFEIL = /\s*(<=>|<->|->|⇌|→|⟶)\s*/;
const ZUSTAND = /\((s|l|g|aq)\)$/;

class Bruch {
  constructor(z, n = 1) { const g = ggt(Math.abs(z), Math.abs(n)) || 1; this.z = z / g * Math.sign(n || 1); this.n = Math.abs(n) / g; }
  add(o) { return new Bruch(this.z * o.n + o.z * this.n, this.n * o.n); }
  mul(o) { return new Bruch(this.z * o.z, this.n * o.n); }
  eq(o) { return this.z === o.z && this.n === o.n; }
  toString() { return this.n === 1 ? String(this.z) : `${this.z}/${this.n}`; }
}
function ggt(a, b) { return b ? ggt(b, a % b) : a; }
const B = (z, n) => new Bruch(z, n);

function gruppe(s) {
  const stapel = [new Map()];
  let i = 0;
  const zahl = () => { const m = /^\d+/.exec(s.slice(i)); if (m) { i += m[0].length; return +m[0]; } return 1; };
  while (i < s.length) {
    const c = s[i];
    if (c === "(" || c === "[") { stapel.push(new Map()); i++; }
    else if (c === ")" || c === "]") {
      if (stapel.length === 1) throw new Error(`Klammer ohne Partner in ${s}`);
      const g = stapel.pop(); i++; const n = zahl();
      for (const [el, k] of g) stapel.at(-1).set(el, (stapel.at(-1).get(el) || 0) + k * n);
    } else {
      const m = /^(R'{0,2}|[A-Z][a-z]?)/.exec(s.slice(i));
      if (!m) throw new Error(`unlesbares Zeichen „${c}“ in ${s}`);
      const el = m[0]; i += el.length;
      if (!ELEMENTE.has(el)) throw new Error(`unbekanntes Element „${el}“ in ${s}`);
      const n = zahl();
      stapel.at(-1).set(el, (stapel.at(-1).get(el) || 0) + n);
    }
  }
  if (stapel.length !== 1) throw new Error(`Klammer nicht geschlossen in ${s}`);
  return stapel[0];
}

function atome(formel) {
  const gesamt = new Map();
  formel.split(/[*·]/).forEach((teil, k) => {
    let mult = 1, rumpf = teil;
    const m = k > 0 ? /^(\d+)(.*)$/.exec(teil) : null;
    if (m) { mult = +m[1]; rumpf = m[2]; }
    for (const [el, n] of gruppe(rumpf)) gesamt.set(el, (gesamt.get(el) || 0) + n * mult);
  });
  return gesamt;
}

export function zerlegeTeilchen(term) {
  term = term.trim();
  let koeff = B(1);
  const m = /^(\d+\/\d+|\d+(?:[.,]\d+)?)\s*(.+)$/.exec(term);
  if (m && !/^\d/.test(m[2])) {
    const k = m[1].replace(",", ".");
    if (k.includes("/")) { const [z, n] = k.split("/"); koeff = B(+z, +n); }
    else if (k.includes(".")) { const d = k.split(".")[1].length; koeff = B(Math.round(+k * 10 ** d), 10 ** d); }
    else koeff = B(+k);
    term = m[2].trim();
  }
  const zustand = (ZUSTAND.exec(term) || [])[1] || "";
  term = term.replace(ZUSTAND, "").trim();
  let ladung = 0;
  const cm = /(?:\^|\[)(\d*)([+-])\]?$/.exec(term);
  if (cm) { ladung = (cm[1] ? +cm[1] : 1) * (cm[2] === "+" ? 1 : -1); term = term.slice(0, cm.index); }
  if (term === "e") return { koeff, atome: new Map(), ladung: ladung || -1, formel: "e", zustand };
  if (/[+-]$/.test(term)) throw new Error(`Ladung mit ^ schreiben, z. B. OH^- statt OH-: ${term}`);
  return { koeff, atome: atome(term.replace(/[-=≡]/g, "")), ladung, formel: term, zustand };
}

/** "" when the equation is balanced, otherwise what is wrong. */
export function pruefeGleichung(gleichung) {
  try {
    const seiten = gleichung.trim().split(PFEIL);
    if (seiten.length !== 3) return "kein oder mehr als ein Reaktionspfeil";
    const summe = (seite) => {
      const a = new Map(); let q = B(0);
      for (const term of seite.split(/\s+\+\s+/)) {
        const t = zerlegeTeilchen(term);
        for (const [el, n] of t.atome) a.set(el, (a.get(el) || B(0)).add(t.koeff.mul(B(n))));
        q = q.add(t.koeff.mul(B(t.ladung)));
      }
      return [a, q];
    };
    const [la, lq] = summe(seiten[0]);
    const [ra, rq] = summe(seiten[2]);
    const fehler = [];
    for (const el of [...new Set([...la.keys(), ...ra.keys()])].sort()) {
      const l = la.get(el) || B(0), r = ra.get(el) || B(0);
      if (!l.eq(r)) fehler.push(`${el}: links ${l}, rechts ${r}`);
    }
    if (!lq.eq(rq)) fehler.push(`Ladung: links ${lq}, rechts ${rq}`);
    return fehler.join("; ");
  } catch (e) {
    return `nicht lesbar: ${e.message}`;
  }
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function teilchenHtml(term) {
  term = term.trim();
  let koeff = "";
  const m = /^(\d+\/\d+|\d+(?:[.,]\d+)?)\s*(.+)$/.exec(term);
  if (m && !/^\d/.test(m[2])) { koeff = m[1].replace(".", ","); term = m[2].trim(); }
  const zustand = (ZUSTAND.exec(term) || [])[1];
  term = term.replace(ZUSTAND, "").trim();
  let ladung = "";
  const cm = /(?:\^|\[)(\d*)([+-])\]?$/.exec(term);
  if (cm) { ladung = (cm[1] || "") + (cm[2] === "-" ? "−" : "+"); term = term.slice(0, cm.index); }
  let h = "";
  const teile = term.split(/[*·]/);
  teile.forEach((teil, k) => {
    if (k > 0) { h += "·"; const n = /^(\d+)(.*)$/.exec(teil); if (n) { h += n[1]; teil = n[2]; } }
    h += esc(teil).replace(/([A-Za-z\)\]'])(\d+)/g, "$1<sub>$2</sub>").replace(/-/g, "–").replace(/=/g, "=");
  });
  if (ladung) h += `<sup>${ladung}</sup>`;
  if (zustand) h += `<span class="zustand">(${zustand})</span>`;
  return (koeff ? `<span class="koeff">${koeff}</span> ` : "") + `<span class="teilchen">${h}</span>`;
}

/** HTML for one equation in the notation above. */
export function gleichungHtml(gleichung) {
  const teile = gleichung.trim().split(PFEIL);
  if (teile.length !== 3) return esc(gleichung);
  const pfeil = /<=>|<->|⇌/.test(teile[1]) ? "⇌" : "→";
  const seite = (s) => s.split(/\s+\+\s+/).map(teilchenHtml).join(' <span class="plus">+</span> ');
  return `${seite(teile[0])} <span class="pfeil">${pfeil}</span> ${seite(teile[2])}`;
}

/** HTML for a single formula such as "H2SO4" or "SO4^2-" (no arrow). */
export function formelHtml(formel) {
  return teilchenHtml(formel);
}
