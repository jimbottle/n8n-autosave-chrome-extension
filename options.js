// options.js - n8n Auto-Save Options

const DEFAULT_INTERVAL = 5;
const MIN = 1;
const MAX = 180;

const intervalInput = document.getElementById('interval');
const feedback = document.getElementById('feedback');
const currentValue = document.getElementById('currentValue');
const form = document.getElementById('intervalForm');

async function loadInterval() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['interval'], (result) => {
      let val = parseInt(result.interval, 10);
      if (isNaN(val) || val < MIN || val > MAX) val = DEFAULT_INTERVAL;
      resolve(val);
    });
  });
}

async function saveInterval(val) {
  await chrome.storage.sync.set({ interval: val });
  // Notify background to update alarm
  chrome.runtime.sendMessage({ action: 'updateInterval' });
}

function showFeedback(msg, isError = true) {
  feedback.textContent = msg;
  feedback.style.color = isError ? '#b00' : 'green';
}

async function updateCurrent() {
  const val = await loadInterval();
  currentValue.textContent = `Current interval: ${val} minute${val === 1 ? '' : 's'}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const val = parseInt(intervalInput.value, 10);
  if (isNaN(val) || val < MIN || val > MAX) {
    showFeedback(`Please enter a value between ${MIN} and ${MAX}.`);
    return;
  }
  await saveInterval(val);
  showFeedback('Saved!', false);
  updateCurrent();
});

intervalInput.addEventListener('input', () => {
  const val = parseInt(intervalInput.value, 10);
  if (isNaN(val) || val < MIN || val > MAX) {
    showFeedback(`Value must be between ${MIN} and ${MAX}.`);
  } else {
    feedback.textContent = '';
  }
});

// Initialize
(async () => {
  const val = await loadInterval();
  intervalInput.value = val;
  updateCurrent();
})(); 