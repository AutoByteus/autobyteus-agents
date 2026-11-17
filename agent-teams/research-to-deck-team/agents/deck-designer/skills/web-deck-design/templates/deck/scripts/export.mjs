// Export with headless Chromium:
//   exports/<name>.pdf            one 1280x720 page per slide (from ?overview, print CSS)
//   exports/slides/slide-NN.png   one screenshot per slide (from ?export#N)
// Usage: node scripts/export.mjs --name Deck-YYYY-MM-DD     (CHROME=/path/to/chromium to choose the browser)
// Exits non-zero when Chromium fails or the PDF's page count differs from the number of slides.
import { spawnSync } from 'node:child_process';
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
const shotDir = join(outDir, 'slides');
rmSync(shotDir, { recursive: true, force: true });
mkdirSync(shotDir, { recursive: true });

// A throwaway profile, so Chromium never hands the job to a browser the user has open.
const profile = mkdtempSync(join(tmpdir(), 'deck-export-'));
process.on('exit', () => rmSync(profile, { recursive: true, force: true }));
const base = ['--headless=new', '--user-data-dir=' + profile, '--no-first-run', '--disable-gpu', '--no-sandbox', '--hide-scrollbars', '--allow-file-access-from-files',
  '--run-all-compositor-stages-before-draw', '--virtual-time-budget=4000'];
function run(extra, url) {
  const r = spawnSync(chrome, [...base, ...extra, url], { encoding: 'utf8' });
  if (r.status !== 0) { console.error(r.stderr); throw new Error('Chromium failed for ' + url); }
}

const pdf = join(outDir, `${name}.pdf`);
run(['--no-pdf-header-footer', '--print-to-pdf=' + pdf], `${index}?overview`);
const pages = (readFileSync(pdf, 'latin1').match(/\/Type\s*\/Page(?!s)/g) || []).length;
console.log(`PDF  ${pdf}  ${statSync(pdf).size} bytes, ${pages} pages, ${slides} slides`);

for (let i = 1; i <= slides; i++) {
  const png = join(shotDir, `slide-${String(i).padStart(2, '0')}.png`);
  run(['--window-size=1280,720', '--screenshot=' + png], `${index}?export#${i}`);
}
console.log(`PNG  ${slides} screenshots in ${shotDir}`);
if (pages !== slides) { console.error(`Page count ${pages} differs from slide count ${slides}: check the print CSS.`); process.exit(2); }
