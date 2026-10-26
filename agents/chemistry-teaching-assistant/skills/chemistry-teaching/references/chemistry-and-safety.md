# Chemistry And Safety

What knowledge points and slides must get right, for [Chemistry Teaching](../SKILL.md). Use
it while writing, and read the finished material against it.

## Chemistry

**Equations.** Write every formula and equation in the library's notation (`{{2 H2 + O2 -> 2 H2O}}`
in text, or a `gleichung` component); the build checks every equation for atoms and
charge. Use the equilibrium arrow ⇌ (`<=>`) where the equilibrium is the point; otherwise →. Write charges as number then sign (Cu²⁺,
SO₄²⁻, never Cu⁺²) and electrons as e⁻. Oxidation numbers are Roman numerals with sign
above the symbol (+II, −I); charges stay Arabic. Add state symbols where the class's
curriculum uses them.

**Names.** Use German names as German textbooks write them: Kupfer(II)-sulfat,
Natriumchlorid, Ethansäure (Essigsäure). Name substances and particles correctly:
Natriumchlorid is a substance made of sodium ions and chloride ions; there is no
"Natriumchlorid-Molekül".

**Substance and particle level.** Substances have properties such as colour, melting
point and conductivity; single particles do not. Kupferatome sind nicht rotbraun, and a
particle does not melt or expand. Captions and solutions keep the two levels apart and
say which one they speak about.

**Models by grade.** Use the models the class has met in its curriculum: the simple
particle model, Dalton's atomic model, the nucleus–shell model, the shell or energy-level
model, electron-pair bonds and Lewis formulas, and orbitals only where the curriculum
has them. Introduce a new model on its own slide before using it. The slide's notes state
what each shown model leaves out.

**Numbers.** Take values (standard potentials, pKs values, melting points, enthalpies)
from a named source and cite it in the notes or the knowledge point's subject analysis. Use SI units and the decimal comma,
and state the conditions (for example standard conditions). A value you could not
confirm is listed as an open point for the teacher, not shown as fact.

**Misconceptions to take up where the topic touches them.**

- Burning destroys matter; mass is lost (conservation of mass).
- Dissolving or mixing is a chemical reaction.
- Equilibrium means the reaction has stopped, or equal concentrations.
- Breaking a bond releases energy (it needs energy; forming bonds releases it).
- A catalyst does not take part in the reaction.
- Ionic compounds consist of ion pairs or molecules.
- Electrons travel through the solution in electrolysis or galvanic cells.
- Particles have the properties of the substance (see above).

## Experiments and safety

German school experiments follow the Richtlinie zur Sicherheit im Unterricht (RiSU,
KMK recommendation, updated 2023) as the teacher's Land puts it into force. The risk
assessment (Gefährdungsbeurteilung) is the teacher's responsibility; prepared ones (for
example from DEGINTU or a publisher) must be checked against her room, class and
equipment. The material supports her assessment and does not replace it.

For every experiment:

- **Kind.** Mark it as teacher demonstration (Lehrerexperiment), demonstration with
  pupils (Lehrerexperiment mit Schülerbeteiligung), or pupil experiment
  (Schülerexperiment).
- **Substances.** For each substance: name, concentration and amount; GHS pictograms,
  signal word and H-statements taken from GESTIS or the supplier's safety data sheet,
  with the source in the slide's notes. Never write hazard data from memory.
- **Restrictions for pupils.** Look the substance up in the current Stoffliste zur DGUV
  Regel 113-018 (DGUV Information 213-098, kept current on DEGINTU) and the Land's RiSU: may pupils handle it, from which grade, is a substitute
  required (Ersatzstoffprüfung)? When you cannot confirm that pupils may do it, plan a
  teacher demonstration and list the question as an open point.
- **Pupil slide.** A `versuch` component with the kind, the pictograms and the concrete
  measures (goggles, fume hood, smallest amounts, gloves where needed), in a few words.
- **Notes and knowledge point.** Preparation (solutions to make up, amounts), what often goes wrong
  in the experiment, disposal, and the sources for every hazard statement.
- **Too dangerous for school.** Show it as an animation only, labelled
  "Nur als Animation – nicht nachmachen".

An experiment is never presented as harmless without sources for that statement.
