import argparse,csv,json
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--split',choices=['smoke','evaluation'],default='smoke');a=p.parse_args()
rows=[]
for r in csv.DictReader((Path(__file__).parent/'cases.csv').open()):
 if r['split']!=a.split: continue
 x=int(r['x']);y=int(r['label']);ca=int(x>=5);ba=int(x>=4)
 rows.append({'id':r['id'],'family':r['family'],'x':x,'label':y,'candidate':ca,'baseline':ba,'candidate_correct':ca==y,'baseline_correct':ba==y})
print(json.dumps({'split':a.split,'n':len(rows),'candidate_correct':sum(r['candidate_correct'] for r in rows),'baseline_correct':sum(r['baseline_correct'] for r in rows),'rows':rows},indent=2))
