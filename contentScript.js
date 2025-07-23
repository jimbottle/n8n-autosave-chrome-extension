// contentScript.js - n8n Auto-Save Button Clicker

function isVisibleAndEnabled(btn) {
  if (!btn) return false;
  const style = window.getComputedStyle(btn);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    !btn.disabled &&
    btn.offsetParent !== null
  );
}

async function clickSaveButton() {
  try {
    const btn = document.querySelector('span[data-test-id="workflow-save-button"] > button');
    if (isVisibleAndEnabled(btn)) {
      btn.click();
      console.debug(`[n8n-autosave] Save button clicked at ${new Date().toLocaleTimeString()}`);
    } else {
      console.debug(`[n8n-autosave] Save button not clickable at ${new Date().toLocaleTimeString()}`);
    }
  } catch (e) {
    console.debug(`[n8n-autosave] Error: ${e.message} at ${new Date().toLocaleTimeString()}`);
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'autosave') {
    clickSaveButton();
  }
}); 