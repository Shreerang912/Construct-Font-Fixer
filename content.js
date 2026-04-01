const STYLE_ID = "construct-sans-fix";
function applyFix() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    :root, [data-theme], * {
      --font-hero: 'Press Start 2P', var(--font-sans) !important;
      --font-sans: 'Sora', ui-sans-serif, system-ui, sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', 'Noto Color Emoji' !important;
    }
  `;
  (document.head || document.documentElement).prepend(style);
}
function removeFix() {
  const el = document.getElementById(STYLE_ID);
  if (el) el.remove();
}
function init(enabled) {
  if (enabled) applyFix();
  else removeFix();
}
chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
  init(enabled);
});
chrome.runtime.onMessage.addListener(({ enabled }) => {
  init(enabled);
});
const observer = new MutationObserver(() => {
  chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
    if (enabled) applyFix();
  });
});
observer.observe(document.documentElement, { childList: true, subtree: true });
