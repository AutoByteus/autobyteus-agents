"""Supervisor verification, run from study root: python3 checks/C002/verify.py."""
import csv, hashlib, json
from pathlib import Path
from collections import Counter
p=Path('runs/C002/execution')
q=Path('checks/C002/reproduction')
for name in ['evaluation.json','evaluation-repeat.json','comparison.json','per-case.md','source-sha256.json','stderr.txt']:
    assert (p/name).read_bytes()==(q/name).read_bytes(), name
for name, digest in json.loads((p/'source-sha256.json').read_text()).items():
    assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest
for line in Path('runs/C002/prior-before.sha256').read_text().splitlines():
    digest,name=line.split(maxsplit=1)
    assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest
# Check preservation against supervisor's own original manifest, too.
for line in Path('checks/C001/reviewed-sha256.txt').read_text().splitlines():
    digest,name=line.split(maxsplit=1)
    if name in ['cycles/C001/report.md','cycles/C001/assignment.md','sources/cases.csv','sources/evaluate.py','runs/smoke.json']:
        assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest
rows=list(csv.DictReader(Path('sources/cases.csv').open()))
ev=[r for r in rows if r['split']=='evaluation']
assert len(rows)==14 and len(ev)==12 and len(set(r['id'] for r in ev))==12
assert Counter(r['family'] for r in ev)=={'nominal':4,'shifted':4,'boundary':4}
raw=json.loads((p/'evaluation.json').read_text())
assert raw['split']=='evaluation' and raw['n']==12
assert [r['id'] for r in raw['rows']]==[r['id'] for r in ev]
expected=[]
for r in ev:
    x,y=int(r['x']),int(r['label'])
    a=0 if x<5 else 1
    b=0 if x<4 else 1
    expected.append(dict(id=r['id'],family=r['family'],x=x,label=y,candidate=a,baseline=b,candidate_correct=a==y,baseline_correct=b==y))
assert raw['rows']==expected
assert raw['candidate_correct']==sum(r['candidate_correct'] for r in expected)==7
assert raw['baseline_correct']==sum(r['baseline_correct'] for r in expected)==8
comparison=json.loads((p/'comparison.json').read_text())
assert comparison['candidate_failures']==[r['id'] for r in expected if not r['candidate_correct']]
assert comparison['baseline_failures']==[r['id'] for r in expected if not r['baseline_correct']]
for family in ['nominal','shifted','boundary','overall']:
    selected=[r for r in expected if family=='overall' or r['family']==family]
    s=comparison['summary'][family]
    a=sum(r['candidate_correct'] for r in selected);b=sum(r['baseline_correct'] for r in selected)
    assert (s['n'],s['candidate_correct'],s['baseline_correct'])==(len(selected),a,b)
    assert (s['candidate_accuracy'],s['baseline_accuracy'],s['paired_correct_difference'],s['paired_accuracy_difference'])==(a/len(selected),b/len(selected),a-b,(a-b)/len(selected))
    for key,flags in [('candidate_only_correct',(True,False)),('baseline_only_correct',(False,True)),('both_correct',(True,True)),('both_wrong',(False,False))]:
        assert s[key]==[r['id'] for r in selected if (r['candidate_correct'],r['baseline_correct'])==flags]
report=Path('cycles/C002/report.md').read_text()
for line in (p/'per-case.md').read_text().splitlines()[2:]:
    assert line in report
assert json.loads(Path('checks/C001/evaluation-rerun.json').read_text())==raw
print(json.dumps({'status':'PASS','evaluation_rows_independently_checked':12,'per_case_report_matches':True,'source_and_prior_artifact_hashes_match':True,'researcher_reproduction_matches':True,'candidate_correct':7,'baseline_correct':8,'candidate_only':['b3'],'baseline_only':['n3','b1'],'limits':'Same synthetic fixture; no label validation, external peer review or population generalization.'},indent=2))
