#!/usr/bin/env python3
"""Archive observable synthetic-study evidence, never credentials or reasoning."""
import argparse
import hashlib
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path


def fingerprint(root):
    result = {}
    for path in sorted(root.rglob('*')):
        if not path.is_file():
            continue
        value = {'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
        if path.is_symlink():
            value['symlink'] = str(path.readlink())
        result[str(path.relative_to(root))] = value
    return result


def collect(root, case, output):
    assert root.name.startswith('research-goal-check.'), 'Only an owned isolated test root'
    output.mkdir(parents=True, exist_ok=False)
    creation = json.loads((root / f'run-{case}.json').read_text())
    team = creation['createAgentTeamRun']['teamRunId']
    memory = root / 'data/memory/agent_teams' / team
    tree = json.loads((memory / 'team_run_execution_tree.json').read_text())
    (output / 'execution-tree.json').write_text(json.dumps(tree, indent=2) + '\n')
    messages = memory / 'team_communication_messages_active.jsonl'
    if messages.exists():
        shutil.copy2(messages, output / 'messages.jsonl')
    else:
        (output / 'messages.jsonl').write_text('')
    for member in tree['rootTeam']['members']:
        path = memory / member['agentRunId'] / 'raw_traces_active.jsonl'
        events = [json.loads(line) for line in path.read_text().splitlines()] if path.exists() else []
        events = [event for event in events if event['trace_type'] not in ('reasoning', 'system_instruction')]
        (output / f"{member['address'][1:]}-observable.jsonl").write_text(
            ''.join(json.dumps(event, ensure_ascii=False) + '\n' for event in events))
    shutil.copytree(root / 'studies' / case, output / 'study',
                    ignore=shutil.ignore_patterns('.codex', '__pycache__', '.git'))
    for path in (root / 'studies').glob(f'{case}*-request.txt'):
        shutil.copy2(path, output / path.name)
    package = root / 'package/agent-teams/supervised-research-team'
    metadata = {
        'captured_at_utc': datetime.now(timezone.utc).isoformat(),
        'case': case,
        'team_run_id': team,
        'app_package_version': json.loads(Path('/app/autobyteus-server-ts/package.json').read_text())['version'],
        'source_manifest': fingerprint(package),
        'study_manifest': fingerprint(output / 'study'),
        'exclusions': ['reasoning', 'system_instruction', '.codex', '__pycache__', '.git'],
        'history_note': 'Pre-existing cycles were seeded synthetic records, not claimed live executions.',
    }
    (output / 'capture.json').write_text(json.dumps(metadata, indent=2) + '\n')
    print(f'Captured {case}: {team} -> {output}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('root', type=Path)
    parser.add_argument('case', choices=['upgrade', 'stalled', 'paused', 'blocked'])
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    collect(args.root, args.case, args.output)
