#!/usr/bin/env python3
"""Check reaction equations for atom and charge balance.

Usage:
  check_equations.py module.html [more.html ...]   # checks every data-eq="..." attribute
  check_equations.py --eq "2 Mg + O2 -> 2 MgO"      # checks single equations

Notation (ASCII, one species per term, terms separated by " + " with spaces):
  coefficients   2 H2O, 1/2 O2
  charges        Cu^2+  SO4^2-  H3O^+  OH^-   (or Cu[2+])
  electrons      e^-  (also e-)
  groups         Ca(OH)2  [Cu(H2O)4]^2+  CuSO4*5H2O  (hydrate dot: * or ·)
  states         (s) (l) (g) (aq) at the end of a species are ignored
  arrows         ->  <=>  <->      (also the Unicode arrows → ⇌)
  bonds          - = ≡ inside a formula are ignored: CH2=CH2, R-CH2OH
  organic        R and R' count as a group that must balance like an atom
  polymers       write the repeat unit with n = 1: CH2=CH2 -> (CH2-CH2)
  not checked    words such as Energie; leave them out of data-eq
Exit code 1 when an equation is unbalanced or cannot be read.
"""
import html, re, sys
from collections import Counter
from fractions import Fraction

ELEMENTS = set("""H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge
As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy
Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm
Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og D""".split()) | {"R", "R'", "R''"}

ARROWS = r"\s*(?:<=>|<->|->|⇌|→|⟶)\s*"
STATE = re.compile(r"\((?:s|l|g|aq)\)$")


def parse_formula(f):
    """Return a Counter of atoms for a neutral formula string."""
    total = Counter()
    for k, part in enumerate(re.split(r"[*·]", f)):
        m = re.match(r"^(\d+)(.*)$", part) if k > 0 else None
        mult, body = (int(m.group(1)), m.group(2)) if m else (1, part)
        for el, n in _parse_group(body).items():
            total[el] += n * mult
    return total


def _parse_group(s):
    stack = [Counter()]
    i = 0
    while i < len(s):
        c = s[i]
        if c in "([":
            stack.append(Counter()); i += 1
        elif c in ")]":
            if len(stack) == 1:
                raise ValueError("Klammer ohne Partner in " + s)
            grp = stack.pop(); i += 1
            m = re.match(r"\d+", s[i:]); n = int(m.group()) if m else 1
            i += len(m.group()) if m else 0
            for el, cnt in grp.items():
                stack[-1][el] += cnt * n
        else:
            m = re.match(r"R'{0,2}|[A-Z][a-z]?", s[i:])
            if not m:
                raise ValueError("unlesbares Zeichen '%s' in %s" % (c, s))
            el = m.group(); i += len(el)
            if el not in ELEMENTS:
                raise ValueError("unbekanntes Element '%s' in %s" % (el, s))
            m2 = re.match(r"\d+", s[i:]); n = int(m2.group()) if m2 else 1
            i += len(m2.group()) if m2 else 0
            stack[-1][el] += n
    if len(stack) != 1:
        raise ValueError("Klammer nicht geschlossen in " + s)
    return stack[0]


def parse_species(term):
    term = term.strip()
    m = re.match(r"^(\d+/\d+|\d+(?:[.,]\d+)?)\s*(.+)$", term)
    coef = Fraction(1)
    if m and not re.match(r"^\d", m.group(2)):
        coef = Fraction(m.group(1).replace(",", ".")); term = m.group(2).strip()
    term = STATE.sub("", term).strip()
    charge = 0
    cm = re.search(r"(?:\^|\[)(\d*)([+-])\]?$", term)
    if cm:
        charge = (int(cm.group(1)) if cm.group(1) else 1) * (1 if cm.group(2) == "+" else -1)
        term = term[:cm.start()]
    if term == "e":
        if charge == 0:
            charge = -1
        return coef, Counter(), charge
    if term == "e-":
        return coef, Counter(), -1
    if term.endswith(("+", "-")):
        raise ValueError("Ladung mit ^ schreiben, z. B. OH^- statt OH-: " + term)
    return coef, parse_formula(re.sub(r"[-=≡]", "", term)), charge


def check(eq):
    sides = re.split(ARROWS, eq.strip())
    if len(sides) != 2:
        return "kein oder mehr als ein Reaktionspfeil"
    totals = []
    for side in sides:
        atoms, charge = Counter(), Fraction(0)
        for term in re.split(r"\s+\+\s+", side):
            coef, a, q = parse_species(term)
            for el, n in a.items():
                atoms[el] += coef * n
            charge += coef * q
        totals.append((atoms, charge))
    (la, lq), (ra, rq) = totals
    problems = []
    for el in sorted(set(la) | set(ra)):
        if la[el] != ra[el]:
            problems.append("%s: links %s, rechts %s" % (el, la[el], ra[el]))
    if lq != rq:
        problems.append("Ladung: links %s, rechts %s" % (lq, rq))
    return "; ".join(problems)


def main(argv):
    eqs = []
    if argv[:1] == ["--eq"]:
        eqs = [("--eq", e) for e in argv[1:]]
    else:
        for path in argv:
            text = open(path, encoding="utf-8").read()
            found = [html.unescape(x) for x in re.findall(r'data-eq="([^"]*)"', text)]
            eqs += [(path, e) for e in found]
            shown = len(re.findall(r'class="[^"]*\beq\b[^"]*"', text))
            if shown > len(found):
                print("HINWEIS %s: %d Elemente mit Klasse eq, aber nur %d data-eq-Angaben" % (path, shown, len(found)))
    if not eqs:
        print("Keine Gleichungen gefunden (data-eq fehlt?)"); return 1
    bad = 0
    for src, e in eqs:
        try:
            msg = check(e)
        except ValueError as ex:
            msg = "nicht lesbar: %s" % ex
        if msg:
            bad += 1
            print("FEHLER  %s\n        %s" % (e, msg))
        else:
            print("ok      %s" % e)
    print("%d Gleichungen, %d mit Fehlern" % (len(eqs), bad))
    return 1 if bad else 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    sys.exit(main(sys.argv[1:]))
