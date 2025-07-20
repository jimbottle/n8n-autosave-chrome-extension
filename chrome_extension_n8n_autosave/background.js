// background.js - Service worker for n8n Auto-Save

const DEFAULT_INTERVAL_MINUTES = 5;
const MIN_INTERVAL = 1;
const MAX_INTERVAL = 180;
const ALARM_NAME = 'n8n-autosave-alarm';

// Get interval from storage or fallback to default
async function getInterval() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['interval'], (result) => {
      let val = parseInt(result.interval, 10);
      if (isNaN(val) || val < MIN_INTERVAL || val > MAX_INTERVAL) val = DEFAULT_INTERVAL_MINUTES;
      resolve(val);
    });
  });
}

// Create or update the alarm
async function createAlarm() {
  const interval = await getInterval();
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: interval });
}

// Clear the alarm
function clearAlarm() {
  chrome.alarms.clear(ALARM_NAME);
}

// Send message to all matching tabs
async function notifyTabs() {
  const tabs = await chrome.tabs.query({ url: '*://*/workflow/*' });
  for (const tab of tabs) {
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { action: 'autosave' });
    }
  }
}

// On install or update, set up alarm
chrome.runtime.onInstalled.addListener(() => {
  createAlarm();
});

// On alarm, notify tabs
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    notifyTabs();
  }
});

// Listen for interval changes from options page
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'updateInterval') {
    clearAlarm();
    createAlarm();
    sendResponse({ status: 'ok' });
  }
}); 