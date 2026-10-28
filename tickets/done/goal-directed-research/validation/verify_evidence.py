#!/usr/bin/env python3
"""Check archived observations; read the reviews as well as these assertions."""
import argparse
import hashlib
import importlib.util
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.dont_write_bytecode = True


def read_json(path):
    return json.loads(path.read_text())


def events(case, role):
    return [json.loads(line) for line in (case / f'{role}-observable.jsonl').read_text().splitlines()]


def evaluation_paths(folder):
    matches = []
    for path in folder.rglob('*.json'):
        value = read_json(path)
        if isinstance(value, dict) and value.get('split') == 'evaluation' and value.get('n') == 12:
            assert (value['candidate_correct'], value['baseline_correct']) == (7, 8), path
            assert len(value['rows']) == 12, path
            matches.append(str(path.relative_to(folder)))
    return matches


def verify(ticket, package):
    evidence = ticket / 'evidence'
    cases = ['upgrade-before', 'upgrade-after', 'stalled', 'paused', 'blocked']
    for name in cases:
        case = evidence / name
        capture = read_json(case / 'capture.json')
        for relative, record in capture['study_manifest'].items():
            assert hashlib.sha256((case / 'study' / relative).read_bytes()).hexdigest() == record['sha256'], (name, relative)
        if name != 'upgrade-before':
            for relative, record in capture['source_manifest'].items():
                path = package / relative
                assert hashlib.sha256(path.read_bytes()).hexdigest() == record['sha256'], (name, relative)
                if 'symlink' in record:
                    assert str(path.readlink()) == record['symlink']
        for role in ('research_supervisor', 'researcher'):
            assert not any(e['trace_type'] in ('reasoning', 'system_instruction') for e in events(case, role))
            assert not any(e.get('tool_name') == 'delegate_task' for e in events(case, role))
    before, after = evidence / 'upgrade-before', evidence / 'upgrade-after'
    old_tree, new_tree = read_json(before / 'execution-tree.json'), read_json(after / 'execution-tree.json')
    assert old_tree['rootTeam']['teamRunId'] == new_tree['rootTeam']['teamRunId']
    # Lazy activation fills platformAgentRunId; that is not a replacement member.
    for old, new in zip(old_tree['rootTeam']['members'], new_tree['rootTeam']['members'], strict=True):
        for key in ('address', 'agentDefinitionId', 'agentRunId', 'launchConfiguration'):
            assert old[key] == new[key], (key, old[key], new[key])
    assert old_tree['handoffs'] == new_tree['handoffs']  # observed runtime snapshot, not a hot-reload claim
    for path in (before / 'study').rglob('*'):
        if not path.is_file() or path.relative_to(before / 'study').parts[0] not in ('cycles', 'sources', 'runs', 'checks'):
            continue
        assert path.read_bytes() == (after / 'study' / path.relative_to(before / 'study')).read_bytes(), path
    assert (after / 'study/evidence.md').read_bytes().startswith((before / 'study/evidence.md').read_bytes())
    assert any(e['trace_type'] == 'system_task_notification' and 'skill updated' in e['content'] for e in events(after, 'research_supervisor'))
    assert 'Budget exhausted' in (before / 'study/cycles/C006/review.md').read_text()
    assert not (before / 'messages.jsonl').read_text().strip()

    # Compare seeded histories against regenerated fixtures, not a rewritten expected history.
    spec = importlib.util.spec_from_file_location('fixture', ticket / 'validation/seed_studies.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    root = Path(tempfile.mkdtemp(prefix='research-history-verify.'))
    try:
        initial = root / 'studies'
        initial.mkdir()
        module.seed(initial, package.parents[1])
        for name in ('stalled', 'paused'):
            for path in (initial / name).rglob('*'):
                if path.is_file() and path.relative_to(initial / name).parts[0] in ('cycles', 'sources', 'runs'):
                    assert path.read_bytes() == (evidence / name / 'study' / path.relative_to(initial / name)).read_bytes(), path
    finally:
        assert root.parent == Path(tempfile.gettempdir()) and root.name.startswith('research-history-verify.')
        shutil.rmtree(root)

    for name in ('upgrade-after', 'stalled'):
        case = evidence / name
        researcher = evaluation_paths(case / 'study/runs')
        supervisor = evaluation_paths(case / 'study/checks')
        assert researcher and supervisor, (name, researcher, supervisor)
        for role in ('research_supervisor', 'researcher'):
            rows = events(case, role)
            assert any(e['trace_type'] == 'tool_call' and e.get('tool_name') == 'get_handoff_rules' for e in rows)
            assert any(e['trace_type'] == 'tool_result' and e.get('tool_name') == 'send_message_to'
                       and e['tool_result'].get('code') == 'DELIVERED' for e in rows)
        print(f'PASS {name}: researcher {researcher}; supervisor {supervisor}; delivered loop, same-source reproducibility.')
    for name in ('paused', 'blocked'):
        assert not (evidence / name / 'messages.jsonl').read_text().strip(), name
        assert not events(evidence / name, 'researcher'), name
    missing = read_json(evidence / 'blocked/study/checks/C001/source-access.json')
    assert missing['access_attempt']['error_type'] == 'FileNotFoundError'
    assert missing['cohort_records_analyzed'] == 0
    assert not (evidence / 'paused/study/cycles/C010').exists()
    print('PASS: hashes, historical artifacts, same upgrade members, update notice, no delegates, blocked/pause without dispatch.')
    print('Limits: review judgments require human-readable inspection; these are finite synthetic tests, not generalization or crash recovery.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('ticket', type=Path)
    parser.add_argument('package', type=Path)
    args = parser.parse_args()
    verify(args.ticket.resolve(), args.package.resolve())
