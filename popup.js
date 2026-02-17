/**
 * VND Price Converter - Popup Script
 */

const toggleEl = document.getElementById('toggle');
const rateEl = document.getElementById('rate');
const sourceEl = document.getElementById('source');
const updatedEl = document.getElementById('updated');
const refreshBtn = document.getElementById('refresh');

/**
 * Format number with dot separators
 */
function formatNumber(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Format timestamp to readable string
 */
function formatTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Load and display current state
 */
async function loadState() {
  const data = await chrome.storage.local.get(['enabled', 'exchangeRate', 'lastUpdated', 'source']);

  toggleEl.checked = data.enabled !== false;
  rateEl.textContent = data.exchangeRate
    ? `1 USD = ${formatNumber(data.exchangeRate)}đ`
    : '—';
  sourceEl.textContent = data.source || '—';
  updatedEl.textContent = formatTime(data.lastUpdated);
}

// Toggle handler
toggleEl.addEventListener('change', () => {
  chrome.storage.local.set({ enabled: toggleEl.checked });
});

// Refresh button - trigger background to re-fetch
refreshBtn.addEventListener('click', async () => {
  refreshBtn.textContent = '⏳ Đang cập nhật...';
  refreshBtn.disabled = true;

  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=VND');
    if (!response.ok) throw new Error('Fetch failed');
    const data = await response.json();
    const rate = data.rates?.VND;
    if (rate) {
      await chrome.storage.local.set({
        exchangeRate: rate,
        lastUpdated: Date.now(),
        source: 'frankfurter.app'
      });
    }
  } catch (e) {
    console.warn('Failed to refresh rate:', e);
  }

  await loadState();
  refreshBtn.textContent = '🔄 Cập nhật tỷ giá';
  refreshBtn.disabled = false;
});

// Init
loadState();
