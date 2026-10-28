#!/usr/bin/env python3
"""Focused source regressions; live behavior is checked separately."""
import argparse
import json
import re
from pathlib import Path


def check(package):
    supervisor = (package / 'agents/research-supervisor/skills/research-supervision/SKILL.md').read_text()
    researcher = (package / 'agents/researcher/skills/evidence-research/SKILL.md').read_text()
    contract = (package / 'shared/research-contract.md').read_text()
    config = json.loads((package / 'team-config.json').read_text())
    route = next(h for h in config['handoffs'] if h['from'] == '/research_supervisor')
    active = '\n'.join([supervisor, researcher, contract, json.dumps(config)])
    for obsolete in ('Budget exhausted', 'six researcher', 'two consecutive',
                     'budget used/remaining', 'remaining budget', 'batch limit'):
        assert obsolete not in active, f'Obsolete active policy: {obsolete}'
    assert not re.search(r'(?:at most|maximum|default)\s+\d+\s+(?:returns|cycles|batches)', active, re.I)
    for requirement in (
        'not permission to continue', 'do not invent a total\nresearch budget',
        'Continue with a revised\napproach', 'do not reset the history',
        'all agreed investigation requirements', 'real dependency',
        'user explicitly asks to pause', 'Never submit, upload or publish',
        'without altering the\nresearcher',
    ):
        assert requirement in supervisor, requirement
    assert 'actual resource and permission constraints' in route['rules'][0]
    assert 'no other delivered assignment awaiting a report' in route['rules'][0]
    assert 'experiment timeouts, real resource constraints and checkpoint conditions' in contract
    assert 'New user authority\ncan supersede a saved stop without rewriting it' in contract
    assert 'An explicit user stop takes precedence' in contract
    assert 'Do not promise an autonomous watchdog' in contract
    assert 'Stop jobs you own at the agreed limit or explicit stop request' in researcher
    assert 'not proof that research is complete' in researcher
    assert 'do not publish it' in researcher
    print('PASS: no old count gate; goal-directed review, actual constraints, explicit pause,')
    print('history, one-assignment handoff, evidence independence and recovery safeguards remain.')
    print('Limit: lexical regression checks are not a proof of arbitrary future model behavior.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('package', type=Path)
    check(parser.parse_args().package)
