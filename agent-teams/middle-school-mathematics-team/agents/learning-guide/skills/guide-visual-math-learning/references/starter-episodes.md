# Starter Episodes — Interaction Design References

These are original, synthetic teaching examples, not records of learner trials.
Use one prompt at a time during use; the frontend must implement the complete
journey before delivery. Response branches below are possibilities, not observed
answers. The SVGs are mathematical reference sketches, not finished products.
The shared learning standard is the quality bar for adaptations.

## A. Equal groups and an equation

**Goal:** explain why the same operation on each side preserves equality.
Prerequisites: adding, subtracting, and sharing whole numbers equally. Here `x`
is the nonnegative whole number of counters in each of three identical bags.

Reference sketch (embed/adapt into an interactive scene, not a deliverable): [equal-groups.svg](../assets/equal-groups.svg).
Equivalent text, also usable as a chat sketch:

```text
[ bag: x ] [ bag: x ] [ bag: x ] + 6 loose counters = 18 counters
       three equal unknown groups                  equal total
Schematic, not to scale; the bags each contain the same number.
```

**Opening:** “What do the three x's and the 6 stand for? How could we find
the total in the bags without opening them?” Wait for a prediction or action.

**Next prompts:** After the learner suggests removing six, ask why six must
also be removed from the total on the right. Ask how equal sharing determines
one bag and how to check the result in the original picture.

**Tutor key:**

| Relation | Picture and reason |
| --- | --- |
| `3x + 6 = 18` | Three equal bags and six loose counters have the same total as eighteen counters. |
| `3x = 12` | Remove six counters from both equal totals; equality is preserved. |
| `x = 4` | Share each side into three equal groups; three is nonzero. |
| `3·4 + 6 = 18` | Substitute four counters per bag into the original relation. |

**Hints, smallest first:** point to the loose counters; ask what operation
would remove them; offer `3x = 18 − 6` and let the learner finish.
If a possible response is “18/3 − 6 = 0,” ask whether dividing the *whole*
left side by three leaves six loose counters or two in each share. An alternative
valid route is `x + 2 = 6`, then `x = 4`; do not demand only subtraction first.

**Transfer, no hints first:** “Two equal bags and four loose counters total
fourteen: `2y + 4 = 14`. Find one bag and explain why your changes keep the
totals equal.” Key: `2y = 10`, `y = 5`, `2·5 + 4 = 14`.

**Model limit:** bags cannot hold negative counts. For `x + 5 = 3`, switch to a
number line: an unknown start followed by a +5 move ends at 3, so moving back
5 from 3 gives −2. The signed-number relation is valid; a “negative bag of
counters” without signed counters is not this model. Review this extension
before using it in a learner episode.

## B. Rectangle splitting and distribution

**Goal:** explain multiplication over a sum by accounting for two areas, then
use that explanation to solve for a missing length. Prerequisites: rectangle
area, multiplication, and the meaning of a variable length. Here `x > 0`, in cm.

Reference sketch (embed/adapt into an interactive scene, not a deliverable): [split-rectangle.svg](../assets/split-rectangle.svg).
Equivalent text:

```text
              x cm             2 cm
       +------------------+----------+
 3 cm  |    left part     |right part|
       +------------------+----------+
             total area = 21 cm²
Schematic, not to scale. Both parts have the same 3 cm height.
```

**Opening:** “How could you express the area of the whole rectangle, and then
the area of its two parts? Explain what each factor means.” Do not prefill the
two part areas; let the learner map lengths to products.

**Next prompts:** Ask why adding the parts gives the same area as the whole.
Ask what area remains after removing the right strip and how its height helps
recover the unknown width.

**Tutor key:**

| Relation | Geometric reason |
| --- | --- |
| `3(x + 2) = 21` | Height times total width gives the whole area. |
| `3x + 6 = 21` | Nonoverlapping parts cover the whole: `3·x` and `3·2`. |
| `3x = 15` | Remove the 6 cm² strip from both area totals. |
| `x = 5` | Divide 15 cm² by the 3 cm height, giving a 5 cm width. |
| `3(5 + 2) = 21` | Check the original area using the total width of 7 cm. |

**Hints:** point to the shared height; ask for the right strip's area; offer
“whole area = left area + right area” before substituting. If a possible response
is `3x + 2`, ask what the units of 2 cm are and how much area a 3 cm by 2 cm
strip occupies. A perimeter expression adds boundary lengths; it is not area.

**Transfer, no hints first:** a rectangle of height 4 cm and width `(y + 1)` cm
has area 28 cm². Draw or describe a split, write an equation, and explain `y`.
Key: `4(y + 1) = 28`, `4y + 4 = 28`, `4y = 24`, `y = 6`; total width 7 cm.

**Generalization boundary:** for positive lengths `a`, `b`, `c`, a rectangle
shows `a(b + c) = ab + ac`. Zero gives a degenerate region; negative lengths do
not fit an ordinary rectangle. The algebraic identity extends to real numbers,
but that broader statement needs an algebraic argument, not a claimed drawing
of negative area. No general proof is required in this first episode.

## Turn the mathematics into an experience

For A, let the learner predict which change leaves equal totals, then animate
removing matching quantities from both descriptions and sharing into equal groups.
Show a justified symbolic step beside the same moving objects. An unequal-sided
move can be an explicitly labelled counterexample, not a silently accepted action.
Retain the alternative valid divide-first route in explanations. A static count
sketch or a Next button revealing the key alone does not meet the experience bar.

For B, let the learner propose how the two areas contribute, then visibly split
and rejoin a rectangle while its common height and width labels stay traceable.
Connect the whole product to the sum of products, then inspect removing a known
strip and recovering width from remaining area. Avoid revealing the unknown
through an already-numbered answer-length scale in the opening. Let the learner
reason, retry and compare a new rectangle; don't merely play an animation for them.

The Guide owns the brief and keys. A plan review checks that mathematics and
interaction intent before the Builder implements it. A separate experience review
then operates the rendered project, including wrong responses and the actual
transitions. The Guide delivers only the checked project and its local reopen
instructions. No human-learning claim follows from those engineering checks.
