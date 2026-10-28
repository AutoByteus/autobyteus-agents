"""Validate supplied evaluation output and compute fixed finite metrics (stdlib)."""
import argparse
import csv
from fractions import Fraction
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EXPECTED = {
    "nominal": ["n1", "n2", "n3", "n4"],
    "shifted": ["d1", "d2", "d3", "d4"],
    "boundary": ["b1", "b2", "b3", "b4"],
}
IDS = [case_id for ids in EXPECTED.values() for case_id in ids]


def require(condition, message):
    if not condition:
        raise ValueError(message)


def local(path):
    resolved = (ROOT / path).resolve()
    require(resolved.is_relative_to(ROOT), "Path must be within study")
    return resolved


def dump(path, value):
    with path.open("x", encoding="utf-8") as handle:
        json.dump(value, handle, indent=2)
        handle.write("\n")


def group(rows):
    total = len(rows)
    result = {"total": total, "case_ids": [r["id"] for r in rows]}
    for method in ("candidate", "baseline"):
        correct = sum(r[method + "_correct"] for r in rows)
        result[method] = {
            "correct": correct, "total": total,
            "accuracy_exact": str(Fraction(correct, total)),
            "accuracy_decimal": correct / total,
            "failure_ids": [r["id"] for r in rows if not r[method + "_correct"]],
        }
    wins = [r["id"] for r in rows if r["candidate_correct"] and not r["baseline_correct"]]
    losses = [r["id"] for r in rows if not r["candidate_correct"] and r["baseline_correct"]]
    both_correct = [r["id"] for r in rows if r["candidate_correct"] and r["baseline_correct"]]
    both_wrong = [r["id"] for r in rows if not r["candidate_correct"] and not r["baseline_correct"]]
    delta = result["candidate"]["correct"] - result["baseline"]["correct"]
    require(len(wins) + len(losses) + len(both_correct) + len(both_wrong) == total,
            "Paired partition must be exhaustive")
    require(delta == len(wins) - len(losses), "Paired delta must match marginal delta")
    result.update({
        "candidate_minus_baseline_correct": delta,
        "accuracy_difference_exact": str(Fraction(delta, total)),
        "accuracy_difference_decimal": delta / total,
        "candidate_perfect": result["candidate"]["correct"] == total,
        "candidate_strictly_better": delta > 0,
        "paired": {
            "candidate_win_count": len(wins), "candidate_win_ids": wins,
            "baseline_win_count": len(losses), "baseline_win_ids": losses,
            "tie_count": len(both_correct) + len(both_wrong),
            "both_correct_count": len(both_correct), "both_correct_ids": both_correct,
            "both_wrong_count": len(both_wrong), "both_wrong_ids": both_wrong,
        },
    })
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--raw", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    out = local(args.out)
    out.mkdir(parents=False, exist_ok=False)
    with (ROOT / "sources/cases.csv").open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        require(reader.fieldnames == ["id", "family", "x", "label", "split"], "Unexpected source schema")
        source = list(reader)
    require(len({r["id"] for r in source}) == len(source), "Duplicate source ID")
    require(all(r["split"] in ("smoke", "evaluation") for r in source), "Unexpected split")
    selected = [r for r in source if r["split"] == "evaluation"]
    smoke = [r["id"] for r in source if r["split"] == "smoke"]
    require(smoke == ["s1", "s2"], "Unexpected smoke inventory")
    require([r["id"] for r in selected] == IDS, "Evaluation IDs/order differ from assignment")
    for family, ids in EXPECTED.items():
        require([r["id"] for r in selected if r["family"] == family] == ids,
                "Evaluation family membership differs from assignment")

    with local(args.raw).open(encoding="utf-8") as handle:
        raw = json.load(handle)
    require(set(raw) == {"split", "n", "candidate_correct", "baseline_correct", "rows"},
            "Unexpected raw schema")
    require(raw["split"] == "evaluation", "Wrong split: cannot accept smoke")
    for key in ("n", "candidate_correct", "baseline_correct"):
        require(type(raw[key]) is int, "Raw count is not integer")
    require(raw["n"] == len(selected) == len(raw["rows"]) == 12, "Wrong evaluation denominator")
    require([r["id"] for r in raw["rows"]] == IDS, "Raw case coverage/order differs")
    checked = []
    for source_row, observed in zip(selected, raw["rows"]):
        x, label = int(source_row["x"]), int(source_row["label"])
        require(label in (0, 1), "Nonbinary source label")
        expected = {
            "id": source_row["id"], "family": source_row["family"],
            "x": x, "label": label,
            "candidate": 1 if x >= 5 else 0, "baseline": 1 if x >= 4 else 0,
        }
        expected["candidate_correct"] = expected["candidate"] == label
        expected["baseline_correct"] = expected["baseline"] == label
        require(observed == expected, f"Raw row differs from direct threshold calculation: {source_row['id']}")
        for key, value in expected.items():
            require(type(observed[key]) is type(value), f"Wrong raw field type: {key}")
        checked.append(observed)
    for method in ("candidate", "baseline"):
        require(raw[method + "_correct"] == sum(r[method + "_correct"] for r in checked),
                "Raw overall count inconsistent with rows")
    groups = {family: group([r for r in checked if r["family"] == family]) for family in EXPECTED}
    groups["overall"] = group(checked)
    validation = {
        "split": "evaluation", "planned": 12, "attempted": 12, "completed": 12,
        "researcher_self_validated": 12, "expected_ids": IDS,
        "observed_ids": [r["id"] for r in checked],
        "family_counts": {f: groups[f]["total"] for f in EXPECTED},
        "smoke_excluded_ids": smoke, "unexpected_or_missing_ids": [],
        "all_raw_fields_match_independent_threshold_calculation": True,
        "all_raw_totals_consistent": True,
        "note": "Researcher self-check only; independent supervisory review remains pending.",
    }
    dump(out / "validation.json", validation)
    dump(out / "summary.json", {
        "study": "Synthetic threshold study", "goal": "G1", "cycle": "C010",
        "metric": "Equally weighted accuracy; strict superiority requires positive A-minus-B accuracy.",
        "groups": groups,
    })
    fields = list(checked[0]) + ["paired_outcome", "candidate_minus_baseline_correct"]
    with (out / "per-case.csv").open("x", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for row in checked:
            a, b = row["candidate_correct"], row["baseline_correct"]
            outcome = "both_correct" if a and b else "both_wrong" if not a and not b else "candidate_win" if a else "baseline_win"
            writer.writerow({**row, "paired_outcome": outcome,
                             "candidate_minus_baseline_correct": int(a) - int(b)})
    lines = ["# C010 finite comparison", "", "| Group | A correct/total | B correct/total | A-B accuracy (exact) | A wins | B wins | Ties |",
             "| --- | --- | --- | --- | --- | --- | --- |"]
    for name, g in groups.items():
        p = g["paired"]
        lines.append(f"| {name} | {g['candidate']['correct']}/{g['total']} | {g['baseline']['correct']}/{g['total']} | {g['accuracy_difference_exact']} | {p['candidate_win_count']} | {p['baseline_win_count']} | {p['tie_count']} |")
    lines += ["", "Per-case predictions, labels, correctness and paired outcomes are in per-case.csv.",
              "All failure IDs and tie subtypes are in summary.json. This is not independent supervisory review."]
    with (out / "comparison.md").open("x", encoding="utf-8") as handle:
        handle.write("\n".join(lines) + "\n")
    print(json.dumps({"validation": validation, "overall": groups["overall"]}, indent=2))


if __name__ == "__main__":
    main()
