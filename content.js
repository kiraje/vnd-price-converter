/**
 * VND Price Converter - Content Script
 * Scans page text for USD prices and appends VND equivalents inline
 */

(function () {
  'use strict';

  const FALLBACK_RATE = 25500;
  const PROCESSED_ATTR = 'data-vnd-processed';

  // Tags to skip
  const SKIP_TAGS = new Set([
    'SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'SELECT', 'NOSCRIPT', 'CODE', 'PRE'
  ]);

  // Regex to match USD prices:
  // $19.99, $1,000.50, $1000, USD 50, US$10, USD50
  const PRICE_REGEX = /(?:(?:US)?\$\s?|USD\s?)(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?|\d+(?:\.\d{1,2})?)/gi;

  let exchangeRate = FALLBACK_RATE;
  let enabled = true;

  // Inject styles for converted prices
  const style = document.createElement('style');
  style.textContent = `
    .vnd-converted {
      color: #888;
      font-size: 0.9em;
      margin-left: 2px;
      white-space: nowrap;
    }
  `;
  document.head.appendChild(style);

  /**
   * Format number as Vietnamese currency: 510.000đ
   */
  function formatVND(amount) {
    const rounded = Math.round(amount);
    // Format with dot as thousands separator
    const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formatted + 'đ';
  }

  /**
   * Parse a USD amount string like "1,000.50" to a number
   */
  function parseUSD(str) {
    return parseFloat(str.replace(/,/g, ''));
  }

  /**
   * Process a single text node: find USD prices and append VND
   */
  function processTextNode(textNode) {
    const parent = textNode.parentElement;
    if (!parent) return;
    if (SKIP_TAGS.has(parent.tagName)) return;
    if (parent.classList?.contains('vnd-converted')) return;
    if (parent.hasAttribute?.(PROCESSED_ATTR)) return;

    const text = textNode.nodeValue;
    if (!text || !PRICE_REGEX.test(text)) return;

    // Reset regex lastIndex
    PRICE_REGEX.lastIndex = 0;

    // Build replacement fragments
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;
    let hasMatch = false;

    while ((match = PRICE_REGEX.exec(text)) !== null) {
      hasMatch = true;
      const fullMatch = match[0];
      const amountStr = match[1];
      const amount = parseUSD(amountStr);

      if (isNaN(amount) || amount <= 0) continue;

      const vndAmount = amount * exchangeRate;

      // Text before match
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      // Original price text
      fragment.appendChild(document.createTextNode(fullMatch));

      // VND annotation
      const span = document.createElement('span');
      span.className = 'vnd-converted';
      span.textContent = ` (~${formatVND(vndAmount)})`;
      fragment.appendChild(span);

      lastIndex = match.index + fullMatch.length;
    }

    if (!hasMatch) return;

    // Remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    // Replace the text node with our fragment
    parent.replaceChild(fragment, textNode);
    parent.setAttribute(PROCESSED_ATTR, 'true');
  }

  /**
   * Scan the entire document for USD prices
   */
  function scanDocument() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
          if (parent.classList?.contains('vnd-converted')) return NodeFilter.FILTER_REJECT;
          if (parent.hasAttribute?.(PROCESSED_ATTR)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(processTextNode);
  }

  /**
   * Remove all VND annotations (when toggled off)
   */
  function removeAnnotations() {
    document.querySelectorAll('.vnd-converted').forEach(el => el.remove());
    document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach(el => {
      el.removeAttribute(PROCESSED_ATTR);
    });
  }

  /**
   * Observe DOM mutations for dynamically loaded content
   */
  function setupObserver() {
    const observer = new MutationObserver((mutations) => {
      if (!enabled) return;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            processTextNode(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Scan new subtree
            const walker = document.createTreeWalker(
              node,
              NodeFilter.SHOW_TEXT,
              null
            );
            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);
            nodes.forEach(processTextNode);
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Initialize: load settings and start scanning
   */
  async function init() {
    const data = await chrome.storage.local.get(['exchangeRate', 'enabled']);

    exchangeRate = data.exchangeRate || FALLBACK_RATE;
    enabled = data.enabled !== false; // default true

    if (enabled) {
      scanDocument();
      setupObserver();
    }

    // Listen for storage changes (toggle, rate updates)
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.exchangeRate) {
        exchangeRate = changes.exchangeRate.newValue || FALLBACK_RATE;
      }
      if (changes.enabled) {
        enabled = changes.enabled.newValue !== false;
        if (enabled) {
          scanDocument();
        } else {
          removeAnnotations();
        }
      }
    });
  }

  init();
})();
