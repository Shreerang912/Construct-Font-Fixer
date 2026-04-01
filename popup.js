const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
  toggle.checked = enabled;
  updateStatus(enabled);
});
toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });
  updateStatus(enabled);
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab) chrome.tabs.sendMessage(tab.id, { enabled }).catch(() => {});
  });
});
function updateStatus(enabled) {
  status.textContent = enabled ? "Blocking Papyrus & Comic Sans" : "Fix disabled";
}
