"""Standard-library checks/arithmetic for the fixed supplied evaluation census."""
import argparse
import csv
import hashlib
import json
from collections import Counter
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EXPECTED = [f"{prefix}{i}" for prefix in ("n", "d", "b") for i in range(1, 5)]
FAMILIES = {"n": "nominal", "d": "shifted", "b": "boundary"}


def write_json(path, value):
    with path.open("x") as f:
        json.dump(value, f, indent=2)
        f.write("\n")


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read_cases():
    with (ROOT / "sources/cases.csv").open(newline="") as f:
        reader = csv.DictReader(f)
        assert reader.fieldnames == ["id", "family", "x", "label", "split"]
        all_rows = list(reader)
    assert len(all_rows) == 14
    assert len({r["id"] for r in all_rows}) == 14
    assert all(r["label"] in {"0", "1"} for r in all_rows)
    assert all(r["split"] in {"smoke", "evaluation"} for r in all_rows)
    for r in all_rows:
        r["x"], r["label"] = int(r["x"]), int(r["label"])
    cases = [r for r in all_rows if r["split"] == "evaluation"]
    smoke = [r for r in all_rows if r["split"] == "smoke"]
    assert len(smoke) == 2 and len(cases) == 12
    assert [r["id"] for r in cases] == EXPECTED
    assert all(r["family"] == FAMILIES[r["id"][0]] for r in cases)
    assert Counter(r["family"] for r in cases) == Counter({f: 4 for f in FAMILIES.values()})
    assert not ({r["id"] for r in smoke} & set(EXPECTED))
    return cases


def summarize(rows):
    n = len(rows)
    result = {"n": n}
    for model in ("candidate", "baseline"):
        correct = [r["id"] for r in rows if r[f"{model}_correct"]]
        failed = [r["id"] for r in rows if not r[f"{model}_correct"]]
        result[model] = {"correct": len(correct), "total": n,
                         "correct_over_total": f"{len(correct)}/{n}",
                         "accuracy_exact": str(Fraction(len(correct), n)),
                         "accuracy": len(correct) / n,
                         "correct_ids": correct, "failure_ids": failed}
    categories = ("both_correct", "candidate_only", "baseline_only", "both_wrong")
    paired = {c: {"count": sum(r["paired_outcome"] == c for r in rows),
                  "ids": [r["id"] for r in rows if r["paired_outcome"] == c]}
              for c in categories}
    delta = result["candidate"]["correct"] - result["baseline"]["correct"]
    assert sum(v["count"] for v in paired.values()) == n
    assert paired["candidate_only"]["count"] - paired["baseline_only"]["count"] == delta
    result.update({"paired": paired, "candidate_minus_baseline_correct": delta,
                   "accuracy_difference_exact": str(Fraction(delta, n)),
                   "accuracy_difference": delta / n,
                   "difference_percentage_points": 100 * delta / n,
                   "candidate_perfect": result["candidate"]["correct"] == n,
                   "candidate_strictly_better": delta > 0})
    return result


def analyze(raw_path, output):
    cases = read_cases()
    raw = json.loads(raw_path.read_text())
    assert set(raw) == {"split", "n", "candidate_correct", "baseline_correct", "rows"}
    assert raw["split"] == "evaluation" and raw["n"] == 12
    assert len(raw["rows"]) == 12
    assert [r["id"] for r in raw["rows"]] == EXPECTED
    checked = []
    for source, actual in zip(cases, raw["rows"]):
        x, label = source["x"], source["label"]
        # Separate arithmetic, equivalent only for the supplied integer inputs.
        a, b = (1 if x > 4 else 0), (1 if x > 3 else 0)
        expected = {k: source[k] for k in ("id", "family", "x", "label")}
        expected.update(candidate=a, baseline=b,
                        candidate_correct=a == label, baseline_correct=b == label)
        assert actual == expected, (source["id"], actual, expected)
        assert all(type(actual[k]) is int for k in ("x", "label", "candidate", "baseline"))
        assert all(type(actual[k]) is bool for k in ("candidate_correct", "baseline_correct"))
        pair = {(True, True): "both_correct", (True, False): "candidate_only",
                (False, True): "baseline_only", (False, False): "both_wrong"}[(a == label, b == label)]
        checked.append(dict(actual, split="evaluation", paired_outcome=pair))
    for model in ("candidate", "baseline"):
        assert type(raw[f"{model}_correct"]) is int
        assert raw[f"{model}_correct"] == sum(r[f"{model}_correct"] for r in checked)
    n3 = next(r for r in checked if r["id"] == "n3")
    assert (n3["family"], n3["x"], n3["label"], n3["candidate"], n3["baseline"],
            n3["candidate_correct"], n3["baseline_correct"]) == ("nominal", 4, 1, 0, 1, False, True)
    comparison = {
        "split": "evaluation", "metric": "equal-weight exact supplied-label accuracy",
        "coverage": {"planned_unique_ids": EXPECTED, "attempted_unique_ids": EXPECTED,
                     "completed_unique_ids": [r["id"] for r in checked],
                     "planned": 12, "attempted": 12, "completed": 12, "excluded_evaluation_ids": []},
        "overall": summarize(checked),
        "families": {f: summarize([r for r in checked if r["family"] == f]) for f in FAMILIES.values()},
        "limits": ["Finite census, not an estimate for unseen data.",
                   "Same-label/source self-check, not independent supervisory approval.",
                   "No confidence interval, speed, novelty or publication claim."]}
    fieldnames = ["id", "family", "split", "x", "label", "candidate", "baseline",
                  "candidate_correct", "baseline_correct", "paired_outcome"]
    with (output / "per-case.csv").open("x", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(checked)
    write_json(output / "failures.json", [r for r in checked if not (
        r["candidate_correct"] and r["baseline_correct"])])
    write_json(output / "comparison.json", comparison)
    write_json(output / "validation.json", {
        "status": "all assertions passed", "checked_unique_ids": EXPECTED,
        "checked_rows": len(checked), "source_csv_sha256": sha(ROOT / "sources/cases.csv"),
        "raw_sha256": sha(raw_path), "source_prediction_and_correctness_fields_match": True,
        "split_ids_order_and_families_match": True, "raw_aggregate_counts_recomputed": True,
        "paired_partition_and_net_difference_checked": True,
        "n3_matches_S003_values": True, "n3": n3,
        "independence": "Researcher self-check only; supervisor must review full evidence."})
    return comparison


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--raw", required=True)
    p.add_argument("--out", required=True)
    args = p.parse_args()
    raw_path, out = (ROOT / args.raw).resolve(), (ROOT / args.out).resolve()
    assert raw_path.is_relative_to(ROOT) and out.is_relative_to(ROOT)
    out.mkdir(parents=True, exist_ok=False)
    result = analyze(raw_path, out)
    print(json.dumps(result, indent=2))
