(() => {
  const root = document.documentElement;
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('.panel')];
  const images = [...document.querySelectorAll('.theme-emblem')];
  const symbols = [...document.querySelectorAll('.theme-symbol')];
  const themeButtons = [...document.querySelectorAll('[data-set-theme]')];
  function showTab() {
    const name = location.hash === '#emblem' ? 'emblem' : 'philosophy';
    panels.forEach(panel => { panel.hidden = panel.id !== name; });
    tabs.forEach(tab => { if (tab.dataset.tab === name) tab.setAttribute('aria-current','page'); else tab.removeAttribute('aria-current'); });
    window.scrollTo(0,0);
  }
  function setTheme(theme) {
    const mode = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = mode;
    images.forEach(img => { img.src = mode === 'dark' ? 'assets/emblem-dark.png' : 'assets/emblem-original.png'; });
    symbols.forEach(img => { const name = img.dataset.symbol; if (name) img.src = `assets/${name}-${mode}.png?v=refined3`; });
    themeButtons.forEach(btn => btn.setAttribute('aria-pressed',String(btn.dataset.setTheme === mode)));
    document.querySelector('meta[name="theme-color"]').content = mode === 'dark' ? '#0a0c0b' : '#f9f8f4';
    try { localStorage.setItem('freedom-theme',mode); } catch(_) {}
  }
  let saved = 'dark';
  try { saved = localStorage.getItem('freedom-theme') || 'dark'; } catch(_) {}
  setTheme(saved);
  themeButtons.forEach(btn => btn.addEventListener('click',() => setTheme(btn.dataset.setTheme)));
  window.addEventListener('hashchange',showTab);
  showTab();
})();