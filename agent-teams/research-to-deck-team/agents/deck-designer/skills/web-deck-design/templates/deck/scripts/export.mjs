// Export with headless Chromium:
//   exports/<name>.pdf            one 1280x720 page per slide (from ?overview, print CSS)
//   exports/<name>/slide-NN.png   one screenshot per slide (from ?export#N); each version keeps its own
// Usage: node scripts/export.mjs --name Deck-YYYY-MM-DD     (CHROME=/path/to/chromium to choose the browser)
// Exits non-zero when Chromium fails or the PDF's page count differs from the number of slides.
// Each Chromium call has 60 s; a call that hangs is stopped and tried once more.
// Chromium's temporary files go in each call's throwaway profile, which is removed after the call, also when the
// export is interrupted.
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, statSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const at = args.indexOf('--name');
const name = at >= 0 && args[at + 1] ? args[at + 1] : 'Deck';

const chrome = [process.env.CHROME, '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium']
  .find((c) => c && existsSync(c));
if (!chrome) { console.error('No Chromium found; set CHROME=/path/to/chrome'); process.exit(1); }

const index = pathToFileURL(join(root, 'index.html')).href;
const slides = (readFileSync(join(root, 'index.html'), 'utf8').match(/<section class="slide\b/g) || []).length;
const outDir = join(root, 'exports');
const shotDir = join(outDir, name);
rmSync(shotDir, { recursive: true, force: true });
mkdirSync(shotDir, { recursive: true });

const base = ['--headless=new', '--no-first-run', '--disable-gpu', '--no-sandbox', '--hide-scrollbars', '--allow-file-access-from-files',
  '--run-all-compositor-stages-before-draw', '--virtual-time-budget=4000'];
const LIMIT = 60000;
let profile = null, child = null;
const stop = (c) => { try { process.kill(-c.pid, 'SIGKILL'); } catch { c.kill('SIGKILL'); } };
const cleanUp = () => { if (child) stop(child); child = null; if (profile) rmSync(profile, { recursive: true, force: true }); profile = null; };
process.on('exit', cleanUp);
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => process.exit(130));
function once(args, tmp) {
  return new Promise((resolve) => {
    // Its own process group, so a hung browser is stopped with all its helper processes.
    const env = { ...process.env, TMPDIR: tmp, TMP: tmp, TEMP: tmp };
    const c = child = spawn(chrome, args, { stdio: ['ignore', 'ignore', 'pipe'], detached: process.platform !== 'win32', env });
    let stderr = '';
    c.stderr.on('data', (d) => { stderr += d; });
    const done = (r) => { clearTimeout(timer); c.stderr.destroy(); resolve(r); };
    const timer = setTimeout(() => {
      stop(c);
      done({ timedOut: true, stderr });
    }, LIMIT);
    c.on('exit', (code) => { if (child === c) child = null; done({ code, stderr }); });
    c.on('error', (e) => done({ code: -1, stderr: String(e) }));
  });
}
async function run(extra, url) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    // A throwaway profile per call, so Chromium never hands the job to a browser the user has open.
    profile = mkdtempSync(join(tmpdir(), 'deck-export-'));
    const tmp = join(profile, 'tmp');
    mkdirSync(tmp);
    const r = await once(['--user-data-dir=' + join(profile, 'profile'), ...base, ...extra, url], tmp);
    cleanUp();
    if (r.code === 0) return;
    if (!r.timedOut) { console.error(r.stderr); throw new Error('Chromium failed for ' + url); }
    console.error(`Chromium did not finish within ${LIMIT / 1000} s for ${url}${attempt === 1 ? '; trying again.' : '.'}`);
  }
  throw new Error('Chromium hung twice for ' + url + '; run the export again.');
}

const pdf = join(outDir, `${name}.pdf`);
await run(['--no-pdf-header-footer', '--print-to-pdf=' + pdf], `${index}?overview`);
const pages = (readFileSync(pdf, 'latin1').match(/\/Type\s*\/Page(?!s)/g) || []).length;
console.log(`PDF  ${pdf}  ${statSync(pdf).size} bytes, ${pages} pages, ${slides} slides`);

for (let i = 1; i <= slides; i++) {
  const png = join(shotDir, `slide-${String(i).padStart(2, '0')}.png`);
  await run(['--window-size=1280,720', '--screenshot=' + png], `${index}?export#${i}`);
}
console.log(`PNG  ${slides} screenshots in ${shotDir}`);
if (pages !== slides) { console.error(`Page count ${pages} differs from slide count ${slides}: check the print CSS.`); process.exit(2); }
