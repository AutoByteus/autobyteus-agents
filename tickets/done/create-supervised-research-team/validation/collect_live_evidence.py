#!/usr/bin/env python3
"""Archive synthetic study artifacts and observable events, not model reasoning or credentials."""
import argparse, json, shutil, subprocess, hashlib
from pathlib import Path

p=argparse.ArgumentParser();p.add_argument('instance',type=Path);p.add_argument('output',type=Path);args=p.parse_args()
r=args.instance;out=args.output;out.mkdir(parents=True,exist_ok=False)
summary={}
for c in 'abc':
    d=out/f'case-{c}';d.mkdir()
    shutil.copytree(r/'studies'/f'case-{c}',d/'study',ignore=shutil.ignore_patterns('.codex','__pycache__'))
    shutil.copy2(r/'studies'/f'case-{c}-request.txt',d/'request.txt')
    rid=json.loads((r/f'run-{c}.json').read_text())['createAgentTeamRun']['teamRunId']
    mem=r/'data/memory/agent_teams'/rid
    tree=json.loads((mem/'team_run_execution_tree.json').read_text())
    assert not tree['rootTeam']['taskExecutions'], 'unexpected delegated worker'
    (d/'execution-tree.json').write_text(json.dumps(tree,indent=2)+'\n')
    comm=mem/'team_communication_messages_active.jsonl'
    messages=[json.loads(l) for l in comm.read_text().splitlines()] if comm.exists() else []
    (d/'team-messages.jsonl').write_text(''.join(json.dumps(m)+'\n' for m in messages))
    assert len(messages)==(0 if c=='c' else 2),(c,messages)
    if messages:
        assert messages[0]['senderAgentRunId'].startswith('research_supervisor_')
        assert messages[1]['senderAgentRunId'].startswith('researcher_')
    events=[]
    for tr in mem.glob('*/raw_traces_active.jsonl'):
        trace=[json.loads(l) for l in tr.read_text().splitlines()]
        assert any(x.get('trace_type')=='tool_call' and 'SKILL.md' in str(x.get('tool_args','')) for x in trace),tr
        assert trace[-1]['trace_type']=='assistant',tr
        assert not any(x.get('tool_name')=='delegate_task' for x in trace),tr
        assert any(x.get('tool_name')=='get_handoff_rules' for x in trace),tr
        seen_rules=False
        for x in trace:
            if x.get('trace_type')=='tool_call' and x.get('tool_name')=='get_handoff_rules':seen_rules=True
            if x.get('trace_type')=='tool_call' and x.get('tool_name')=='send_message_to':assert seen_rules
            if x.get('trace_type')=='tool_result' and x.get('tool_name')=='send_message_to':
                result=x.get('tool_result');assert result.get('accepted') and result.get('code')=='DELIVERED'
        kept=[dict(agent_run_id=tr.parent.name,**x) for x in trace if x['trace_type'] not in ['reasoning','system_instruction']]
        events+=kept
    events.sort(key=lambda x:x['ts'])
    (d/'observable-events.jsonl').write_text(''.join(json.dumps(x,ensure_ascii=False)+'\n' for x in events))
    summary[c]={'team_run_id':rid,'messages':len(messages),'first_event_utc_seconds':events[0]['ts'],'last_event_utc_seconds':events[-1]['ts'],'no_delegated_workers':True,'all_agents_loaded_skill':True,'all_sends_delivered':True}

# Independent creator recomputation, separate from the live agents' judgment.
a=out/'case-a/study'
expected=json.loads(subprocess.check_output(['python3',str(a/'sources/evaluate.py'),'--split','evaluation']))
assert expected['n']==12 and expected['candidate_correct']==7 and expected['baseline_correct']==8
for path in ['runs/C002/execution/evaluation.json','checks/C002/reproduction/evaluation.json']:
    assert json.loads((a/path).read_text())==expected,path
assert json.loads((a/'checks/C002/verification.json').read_text())['status']=='PASS'
assert not (a/'cycles/C003').exists()
assert '**Complete**' in (a/'cycles/C002/review.md').read_text()
assert '**Not ready**' in (a/'cycles/C002/review.md').read_text()
b=out/'case-b/study';assert not (b/'sources/private-cohort.csv').exists()
assert 'Terminal decision: Blocked' in (b/'cycles/C001/review.md').read_text()
c=out/'case-c/study';assert '**Budget exhausted**' in (c/'cycles/C001/review.md').read_text()
assert not (c/'cycles/C002').exists()
# A and C were seeded identically; old author report and source are still immutable.
for path in ['sources/cases.csv','sources/evaluate.py','runs/smoke.json','cycles/C001/report.md']:
    assert (a/path).read_bytes()==(c/path).read_bytes(),path
summary['assertions']=['12 evaluation rows; A=7, B=8 reproduced by creator','researcher and reviewer raw evaluation identical','source and rejected report preserved','A terminates Complete / Not ready without C003','B terminates Blocked without invented statistic','C terminates Budget exhausted without dispatch','two delivered internal messages in A and B; zero in C','all roles loaded skills; no delegation; get_handoff_rules before send']
(out/'assertions.json').write_text(json.dumps(summary,indent=2)+'\n')
manifest={str(f.relative_to(out)):hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(out.rglob('*')) if f.is_file()}
(out/'archive-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(summary,indent=2))
