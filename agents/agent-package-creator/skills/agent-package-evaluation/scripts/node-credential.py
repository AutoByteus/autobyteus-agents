#!/usr/bin/env python3
"""Get an owner credential for an isolated test node: setup code over its local control socket, then the
setup exchange. Writes it to OUT (mode 0600) and never prints it."""
import json, os, socket, sys, urllib.request
data_dir, port, out = sys.argv[1], sys.argv[2], sys.argv[3]
s = socket.socket(socket.AF_UNIX); s.connect(os.path.join(data_dir, "server-data", "node-access", "local-control.sock"))
s.sendall(b"setup-code\n"); buf = b""
while True:
    c = s.recv(4096)
    if not c: break
    buf += c
code = json.loads(buf.decode().strip())
code = code.get("setupCode") or code.get("result", {}).get("setupCode")
req = urllib.request.Request(f"http://127.0.0.1:{port}/rest/node-access/setup-exchanges",
    data=json.dumps({"setupCode": code, "desktopName": "creator-eval"}).encode(), headers={"Content-Type": "application/json"})
issued = json.loads(urllib.request.urlopen(req, timeout=30).read().decode())
cred = issued.get("ownerCredential") or issued.get("credential") or next(v for v in issued.values() if isinstance(v, str) and v.startswith("own_"))
fd = os.open(out, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600); os.write(fd, cred.encode()); os.close(fd)
print("credential stored; keys in reply:", sorted(issued.keys()))
