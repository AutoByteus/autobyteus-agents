"""Run from study root: python3 runs/C002/reproduce.py [new-output-directory]."""
import csv, hashlib, json, platform, subprocess, sys, time
from pathlib import Path
root = Path(__file__).resolve().parents[2]
out = Path(sys.argv[1]) if len(sys.argv)>1 else root/'runs/C002/reproduction'
out = out.resolve()
assert out.is_relative_to(root), 'Output must remain inside study'
out.mkdir(parents=True, exist_ok=False)
start=time.monotonic()
inputs=[root/'sources/cases.csv',root/'sources/evaluate.py',Path(__file__).resolve()]
def hashes(): return {str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in inputs}
before=hashes()
command=[sys.executable,'sources/evaluate.py','--split','evaluation']
r=subprocess.run(command,cwd=root,capture_output=True,check=True)
(out/'evaluation.json').write_bytes(r.stdout)
(out/'stderr.txt').write_bytes(r.stderr)
r2=subprocess.run(command,cwd=root,capture_output=True,check=True)
(out/'evaluation-repeat.json').write_bytes(r2.stdout)
assert r.stdout==r2.stdout and not r.stderr and not r2.stderr
raw=json.loads(r.stdout)
with (root/'sources/cases.csv').open() as f: allrows=list(csv.DictReader(f))
selected=[r for r in allrows if r['split']=='evaluation']
assert len(selected)==12 and len({r['id'] for r in selected})==12
expected=[]
for row in selected:
 x,y=int(row['x']),int(row['label'])
 a=1 if x>4 else 0; b=1 if x>3 else 0
 expected.append(dict(id=row['id'],family=row['family'],x=x,label=y,candidate=a,baseline=b,candidate_correct=(a==y),baseline_correct=(b==y)))
assert raw['split']=='evaluation' and raw['n']==12 and raw['rows']==expected
summary={}
for family in ['nominal','shifted','boundary','overall']:
 rows=[r for r in expected if family=='overall' or r['family']==family]
 assert len(rows)==(12 if family=='overall' else 4)
 a=sum(r['candidate_correct'] for r in rows); b=sum(r['baseline_correct'] for r in rows)
 summary[family]={'n':len(rows),'candidate_correct':a,'baseline_correct':b,'candidate_accuracy':a/len(rows),'baseline_accuracy':b/len(rows),'paired_correct_difference':a-b,'paired_accuracy_difference':(a-b)/len(rows),'candidate_only_correct':[r['id'] for r in rows if r['candidate_correct'] and not r['baseline_correct']],'baseline_only_correct':[r['id'] for r in rows if r['baseline_correct'] and not r['candidate_correct']],'both_correct':[r['id'] for r in rows if r['candidate_correct'] and r['baseline_correct']],'both_wrong':[r['id'] for r in rows if not r['candidate_correct'] and not r['baseline_correct']]}
assert raw['candidate_correct']==summary['overall']['candidate_correct'] and raw['baseline_correct']==summary['overall']['baseline_correct']
assert hashes()==before
result={'source_rows':len(allrows),'evaluation_ids':[r['id'] for r in selected],'excluded_smoke_ids':[r['id'] for r in allrows if r['split']=='smoke'],'candidate_failures':[r['id'] for r in expected if not r['candidate_correct']],'baseline_failures':[r['id'] for r in expected if not r['baseline_correct']],'summary':summary,'checks':{'all_predictions_and_flags_match_csv':True,'repeat_byte_identical':True,'inputs_unchanged':True}}
(out/'comparison.json').write_text(json.dumps(result,indent=2)+'\n')
lines=['| ID | Family | x | Label | A | B | A correct | B correct | A−B correct |','|---|---|---:|---:|---:|---:|---|---|---:|']
for r in expected: lines.append('| '+ ' | '.join(str(v) for v in [r['id'],r['family'],r['x'],r['label'],r['candidate'],r['baseline'],r['candidate_correct'],r['baseline_correct'],int(r['candidate_correct'])-int(r['baseline_correct'])])+' |')
(out/'per-case.md').write_text('\n'.join(lines)+'\n')
(out/'source-sha256.json').write_text(json.dumps(before,indent=2)+'\n')
(out/'environment.json').write_text(json.dumps({'python':sys.version,'executable':sys.executable,'platform':platform.platform(),'cwd':str(root),'command':command,'reproduction_command':'python3 runs/C002/reproduce.py runs/C002/reproduction-fresh','elapsed_seconds':time.monotonic()-start,'randomness':'none','dependencies':'Python standard library only'},indent=2)+'\n')
print(json.dumps(result,indent=2))
