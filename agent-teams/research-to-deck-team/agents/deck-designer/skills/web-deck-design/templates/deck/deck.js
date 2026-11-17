// Deck runtime, no dependencies.
//   index.html            present mode: one slide scaled to the window; arrows, Space, PageUp/PageDown, Home/End, click
//   index.html?overview   every slide stacked (printing uses this)
//   index.html?export#3   exactly slide 3 at 1280x720, no chrome (scripts/export.mjs)
(function () {
  const params = new URLSearchParams(location.search);
  const mode = params.has('export') ? 'export' : params.has('overview') ? 'overview' : 'present';
  document.body.classList.add(mode);

  // Replace <i data-icon="name"></i> with its inline line icon from assets/icons.js.
  const icons = window.DECK_ICONS || {};
  document.querySelectorAll('i[data-icon]').forEach((el) => {
    const inner = icons[el.dataset.icon];
    const span = document.createElement('span');
    span.className = 'icon ' + (el.className || '');
    span.setAttribute('aria-hidden', 'true');
    if (inner) {
      span.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
        'stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
    } else {
      console.warn('Missing icon:', el.dataset.icon);
      span.dataset.missingIcon = el.dataset.icon;
    }
    el.replaceWith(span);
  });

  const deck = document.querySelector('.deck');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const hud = document.querySelector('.hud');
  let current = 0;

  function fromHash() {
    const n = parseInt(location.hash.replace('#', ''), 10);
    return Number.isFinite(n) && n >= 1 && n <= slides.length ? n - 1 : 0;
  }

  function show(i) {
    current = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, k) => s.classList.toggle('active', k === current));
    if (hud) hud.textContent = current + 1 + ' / ' + slides.length;
    const hash = '#' + (current + 1);
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }

  function fit() {
    const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720) * 0.96;
    deck.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
  }

  if (mode !== 'overview') {
    show(fromHash());
    window.addEventListener('hashchange', () => show(fromHash()));
  }
  if (mode === 'present') {
    fit();
    window.addEventListener('resize', fit);
    document.addEventListener('keydown', (e) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); show(current + 1); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); show(current - 1); }
      else if (e.key === 'Home') show(0);
      else if (e.key === 'End') show(slides.length - 1);
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      show(e.clientX > window.innerWidth / 2 ? current + 1 : current - 1);
    });
  }
})();
