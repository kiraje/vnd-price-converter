/**
 * VND Price Converter - Background Service Worker
 * Fetches USD→VND exchange rate and caches it in chrome.storage.local
 */

const FALLBACK_RATE = 25500;
const ALARM_NAME = 'fetch-exchange-rate';
const API_URL = 'https://api.frankfurter.app/latest?from=USD&to=VND';

/**
 * Fetch exchange rate from API and store in chrome.storage.local
 */
async function fetchAndStoreRate() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const rate = data.rates?.VND;
    if (!rate || typeof rate !== 'number') throw new Error('Invalid rate data');

    await chrome.storage.local.set({
      exchangeRate: rate,
      lastUpdated: Date.now(),
      source: 'frankfurter.app'
    });
    console.log(`[VND Converter] Rate updated: 1 USD = ${rate} VND`);
  } catch (err) {
    console.warn(`[VND Converter] Failed to fetch rate: ${err.message}. Using fallback.`);
    // Only set fallback if no rate exists yet
    const stored = await chrome.storage.local.get('exchangeRate');
    if (!stored.exchangeRate) {
      await chrome.storage.local.set({
        exchangeRate: FALLBACK_RATE,
        lastUpdated: Date.now(),
        source: 'fallback'
      });
    }
  }
}

// Fetch rate on install/update
chrome.runtime.onInstalled.addListener(() => {
  fetchAndStoreRate();
  // Set up hourly alarm
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: 60 });
});

// Also fetch on service worker startup (in case alarm missed)
chrome.runtime.onStartup.addListener(() => {
  fetchAndStoreRate();
});

// Handle alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    fetchAndStoreRate();
  }
});
