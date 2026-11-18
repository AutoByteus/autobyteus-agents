// Local server for the live review.
//   node scripts/serve.mjs        start it in the background: it takes a free port, prints the deck's URL and saves it in .server.json
//   node scripts/serve.mjs stop   stop this deck's server, and no other
// PORT=<n> asks for a port; it fails when another program already uses that port.
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { readFileSync, rmSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { join, extname, normalize, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const state = join(root, '.server.json');

if (process.argv[2] === 'stop') {
  let s;
  try { s = JSON.parse(readFileSync(state, 'utf8')); } catch { console.log('No server is recorded for this deck.'); process.exit(0); }
  try { await fetch(`${s.url}__stop?token=${s.token}`); console.log(`Stopped the server at ${s.url}`); }
  catch { console.log(`The server at ${s.url} was not running.`); }
  rmSync(state, { force: true });
  process.exit(0);
}

const token = randomBytes(16).toString('hex');
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.pdf': 'application/pdf',
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__stop' && url.searchParams.get('token') === token) {
    res.end('stopped', () => { rmSync(state, { force: true }); process.exit(0); });
    return;
  }
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  const file = join(root, rel || 'index.html');
  if ((file !== root && !file.startsWith(root + sep)) || file === state) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' }).end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
});

server.on('error', (e) => {
  console.error(e.code === 'EADDRINUSE' ? `Port ${process.env.PORT} is used by another program. Start without PORT to get a free port.` : e.message);
  process.exit(1);
});
server.listen(Number(process.env.PORT || 0), '127.0.0.1', async () => {
  const url = `http://127.0.0.1:${server.address().port}/`;
  await writeFile(state, JSON.stringify({ url, token }) + '\n');
  console.log(`Deck at ${url}  (all slides: ${url}?overview)`);
});
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { rmSync(state, { force: true }); process.exit(0); });
