# C001 method, recorded before source probe
Goal G1; authorized source only: sources/private-cohort.csv, owner test caller.
Prerequisite alternatives: the exact source is readable, absent, or inaccessible.
Probe only this path with a normal read-only open; no discovery of substitutes or access bypass.
If absent/inaccessible, stop empirical work and report mean unavailable, not a negative cohort finding.
If readable, inspect schema before selecting outcome/eligibility; do not calculate an ambiguous estimand.
Planned metric, conditional on unambiguous input: arithmetic mean = sum of eligible finite outcomes / eligible valid count. Missing/nonnumeric/nonfinite outcomes require explicit accounting and justified treatment; never silently drop observations.
No baseline comparison or statistical inference is requested. No data cases or experiments are available until the prerequisite succeeds. No synthetic checks or alternate data.
Budget: sole batch <=60 seconds cumulative local commands; all commands short, probe timeout 5 seconds. Tool-reported durations and probe monotonic duration will be retained. No internet/dependencies/collaborators.
