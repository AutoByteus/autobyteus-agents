import json, os, re, sys
root = sys.argv[1]
errs = []
# JSON
for dp, _, fs in os.walk(root):
    for f in fs:
        if f.endswith('.json'):
            try: json.load(open(os.path.join(dp, f)))
            except Exception as e: errs.append(f"json {dp}/{f}: {e}")
team = json.load(open(f"{root}/team-config.json"))
names = {m['memberName'] for m in team['members']}
if team['coordinatorMemberName'] not in names: errs.append('coordinator not a member')
for m in team['members']:
    d = f"{root}/agents/{m['ref']}"
    if not os.path.isfile(f"{d}/agent.md"): errs.append(f"missing {d}/agent.md")
    cfg = json.load(open(f"{d}/agent-config.json"))
    for sk in cfg['skillNames']:
        sp = f"{d}/skills/{sk}/SKILL.md"
        if not os.path.isfile(sp): errs.append(f"skill missing {sp}"); continue
        fm = re.match(r"---\nname: (.+)\ndescription: (.+)\n---", open(sp).read())
        if not fm or fm.group(1) != sk: errs.append(f"frontmatter/name mismatch {sp}")
    if 'get_handoff_rules' not in cfg['toolNames'] or 'send_message_to' not in cfg['toolNames']: errs.append(f"handoff tools missing {d}")
    if 'get_handoff_rules' not in open(f"{d}/agent.md").read(): errs.append(f"agent.md lacks transition {d}")
for h in team['handoffs']:
    for k in ('from', 'to'):
        if h[k].lstrip('/') not in names: errs.append(f"route address {h[k]}")
# links
for dp, _, fs in os.walk(root):
    for f in fs:
        if f.endswith('.md'):
            p = os.path.join(dp, f)
            for t in re.findall(r"\]\(([^)#]+)(?:#[^)]*)?\)", open(p).read()):
                if t.startswith('http'): continue
                if not os.path.exists(os.path.normpath(os.path.join(dp, t))): errs.append(f"broken link {p} -> {t}")
# recipients in skills
for dp, _, fs in os.walk(f"{root}/agents"):
    for f in fs:
        if f == 'SKILL.md' or 'templates' in dp:
            for ln, line in enumerate(open(os.path.join(dp, f)), 1):
                if re.search(r"article_(writer|reviewer)", line): errs.append(f"member name in {dp}/{f}:{ln}")
# placeholders
for dp, _, fs in os.walk(root):
    for f in fs:
        if f.endswith('.md') and re.search(r"TODO|TBD|FIXME", open(os.path.join(dp, f)).read()): errs.append(f"placeholder {dp}/{f}")
print("\n".join(errs) if errs else "ALL CHECKS PASS")
