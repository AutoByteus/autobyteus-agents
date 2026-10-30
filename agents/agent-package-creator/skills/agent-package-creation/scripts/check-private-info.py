#!/usr/bin/env python3
"""Stop private information from entering a public package repository.

  check-private-info.py --staged       check the staged changes (added lines, file names) and the commit author
  check-private-info.py PATH [PATH...]  check files or folders (names below the folder given), for example
                                        material to import or a commit message

Finds email addresses, phone numbers, home-folder paths, secrets, agent server-data and journal paths,
and the user's own terms: names, accounts, private repository names, one per line in a private list
outside the public repository (--terms FILE, $PRIVATE_TERMS_FILE, `git config privacy.termsFile`, or
~/.config/agent-packages/private-terms.txt).

Prints FILE:LINE: KIND for each finding, never the matched text, and exits 1 when there is one.
A line that contains `privacy-check: allow` is skipped; use it only for text that is public and general.
"""
import os
import re
import subprocess
import sys

ALLOW = 'privacy-check: allow'
OK_EMAIL = re.compile(r'(@|\.)(example\.(com|org|net)|example|test|invalid|localhost)$|'
                      r'@users\.noreply\.github\.com$|^noreply@(anthropic|github)\.com$|^git@github\.com$', re.I)
EMAIL = re.compile(r'(?<![\w.+-])[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}\b')
FILE_LIKE = re.compile(r'@\d+x\.|\.(png|jpe?g|svg|gif|webp|js|mjs|ts|css|py|md|json)$', re.I)
PHONE = re.compile(r'(?<![\w/.#=-])\+\d{1,3}[ .-]?\(?\d{1,4}\)?(?:[ .-]?\d{2,4}){2,4}(?![\w/-])')
HOME = re.compile(r'(?:/Users/|/home/|[A-Za-z]:\\{1,2}Users\\{1,2})([A-Za-z0-9._-]+)')
PLACEHOLDER_HOMES = {'me', 'you', 'user', 'username', 'name', 'example', 'runner', 'shared', 'yourname',
                     'your-name', 'alice', 'bob', 'jane', 'john', 'test', 'demo', 'someone', 'node'}
SECRETS = [
    ('private key', r'-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY'),
    ('API key', r'\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{20,}|\bAIza[0-9A-Za-z_-]{35}\b'),
    ('GitHub token', r'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})'),
    ('AWS key', r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b'),
    ('Slack token', r'\bxox[abprs]-[A-Za-z0-9-]{10,}'),
    ('JWT', r'\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}'),
    ('session token in URL', r'[?&](?:token|access_token|sessionid|sid|key)=[A-Za-z0-9%._-]{6,}'),
    ('password in URL', r'\b[a-z][a-z0-9+.-]*://[^/\s:@]+:[^/\s:@]{6,}@'),
    ('assigned secret', r'(?i)\b(?:api[_-]?key|secret|token|passw(?:or)?d)\b["\']?\s*[:=]\s*["\'][^"\'\s<>{}$]{12,}["\']'),
]
SECRETS = [(kind, re.compile(rx)) for kind, rx in SECRETS]
SERVER_DATA = re.compile(r'\.autobyteus/server-data|work_journal(?:_\d+|_active)?\.md')  # privacy-check: allow


def load_terms(path):
    candidates = [path, os.environ.get('PRIVATE_TERMS_FILE')]
    try:
        candidates.append(subprocess.run(['git', 'config', '--get', 'privacy.termsFile'],
                                         capture_output=True, text=True).stdout.strip())
    except OSError:
        pass
    candidates.append(os.path.expanduser('~/.config/agent-packages/private-terms.txt'))
    for c in candidates:
        if c and os.path.isfile(os.path.expanduser(c)):
            terms = []
            for line in open(os.path.expanduser(c), encoding='utf-8'):
                t = line.strip()
                if t and not t.startswith('#'):
                    # A term matches from a word start, its words joined by any or no separator
                    # ("First Last", "first-last", "firstlast"); a short term only as a whole word.
                    body = r'[\s_.-]*'.join(re.escape(w) for w in t.split())
                    tail = '' if len(t) >= 5 else r'(?![A-Za-z0-9])'
                    terms.append(re.compile(r'(?<![A-Za-z0-9])' + body + tail, re.I))
            return terms, c
    return [], None


def check_line(line, terms):
    if ALLOW in line:
        return []
    kinds = []
    for m in EMAIL.finditer(line):
        if not OK_EMAIL.search(m.group(0)) and not FILE_LIKE.search(m.group(0)):
            kinds.append('email address')
    if any(len(re.sub(r'\D', '', m.group(0))) >= 9 for m in PHONE.finditer(line)):
        kinds.append('phone number')
    if any(m.group(1).lower() not in PLACEHOLDER_HOMES for m in HOME.finditer(line)):
        kinds.append('home folder path')
    kinds += [kind for kind, rx in SECRETS if rx.search(line)]
    if SERVER_DATA.search(line):
        kinds.append('agent server data or journal path')
    if any(rx.search(line) for rx in terms):
        kinds.append("the user's private term")
    return sorted(set(kinds))


def staged(terms):
    findings = []
    names = subprocess.run(['git', 'diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'],
                           capture_output=True, text=True, check=True).stdout.split('\0')
    for name in filter(None, names):
        findings += [(name, 0, k) for k in check_line(name, terms)]
    diff = subprocess.run(['git', 'diff', '--cached', '-U0', '--no-color', '--diff-filter=ACMR'],
                          capture_output=True, check=True).stdout.decode('utf-8', 'replace')
    path, n = None, 0
    for line in diff.split('\n'):
        if line.startswith('+++ '):
            path = line[6:] if line.startswith('+++ b/') else None
        elif line.startswith('@@'):
            n = int(re.search(r'\+(\d+)', line).group(1))
        elif line.startswith('+') and path:
            findings += [(path, n, k) for k in check_line(line[1:], terms)]
            n += 1
    ident = subprocess.run(['git', 'var', 'GIT_AUTHOR_IDENT'], capture_output=True, text=True).stdout
    email = re.search(r'<([^>]*)>', ident)
    if email and not OK_EMAIL.search(email.group(1)):
        findings.append(('(commit author)', 0, 'author email is not a GitHub noreply address; '
                         'set `git config user.email <id>+<login>@users.noreply.github.com` in this repository'))
    return findings


def files(paths, terms):
    findings = []
    todo = []
    for p in paths:
        if os.path.isdir(p):
            for root, dirs, fs in os.walk(p):
                dirs[:] = [d for d in dirs if d != '.git']
                todo += [(os.path.join(root, f), os.path.relpath(os.path.join(root, f), p)) for f in fs if f != '.git']
        else:
            todo.append((p, os.path.basename(p)))
    for f, name in todo:
        findings += [(f, 0, k) for k in check_line(name, terms)]
        try:
            data = open(f, 'rb').read()
        except OSError:
            continue
        if b'\0' in data[:8000]:
            continue
        for n, line in enumerate(data.decode('utf-8', 'replace').split('\n'), 1):
            findings += [(f, n, k) for k in check_line(line, terms)]
    return findings


def main():
    args = sys.argv[1:]
    term_file = None
    if '--terms' in args:
        i = args.index('--terms')
        term_file = args[i + 1]
        del args[i:i + 2]
    if not args or args[0] in ('-h', '--help'):
        print(__doc__)
        return 2
    terms, source = load_terms(term_file)
    findings = staged(terms) if args == ['--staged'] else files(args, terms)
    if not source:
        print('privacy check: no private terms list found, so names and accounts were not checked '
              '(see --help).', file=sys.stderr)
    for path, n, kind in findings:
        print(f'{path}:{n}: {kind}' if n else f'{path}: {kind}', file=sys.stderr)
    if findings:
        print(f'privacy check: {len(findings)} finding(s); private information must not enter a public '
              'package repository. Remove or generalize it (the matched text is not shown).', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
