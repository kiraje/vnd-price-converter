# Chrome Web Store - Store Listing

## Name
VND Price Converter

## Short Description (132 chars max)
Automatically converts USD prices to Vietnamese Dong (VND) on any webpage with live exchange rates.

## Category
Shopping

## Language
English

## Description

**VND Price Converter** instantly converts USD prices to Vietnamese Dong (VND) right on the webpage you're browsing. No more switching tabs to check exchange rates — prices appear inline, right next to the original USD amount.

### How It Works

Once installed, the extension automatically scans every webpage for USD prices (formats like $19.99, USD 50, US$1,000) and displays the equivalent VND amount next to each price. The conversion happens instantly and unobtrusively — you'll see a small gray text showing the VND equivalent, so you always know exactly what things cost in your local currency.

### Key Features

- **Automatic Detection** — Recognizes multiple USD price formats including $, USD, and US$ notations with proper handling of thousands separators and decimals.
- **Live Exchange Rates** — Fetches real-time USD/VND exchange rates from the Frankfurter API (powered by the European Central Bank) and updates hourly.
- **Inline Display** — VND prices appear right next to the original price, formatted with Vietnamese notation (e.g., 510.000đ). No popups, no overlays.
- **Works Everywhere** — Runs on any website: Amazon, Steam, eBay, Shopify stores, SaaS pricing pages, freelance platforms, and more.
- **Toggle On/Off** — Easily enable or disable conversion from the popup. Your preference is saved across sessions.
- **Lightweight** — Minimal footprint. No background network requests except the hourly rate update. No impact on page load speed.
- **Offline Fallback** — If the rate API is unavailable, uses a cached or fallback rate so conversions still work.

### Perfect For

- Vietnamese shoppers browsing international stores
- Freelancers comparing USD rates to local currency
- Students checking tuition or subscription costs
- Anyone who regularly encounters USD prices online

### Privacy First

VND Price Converter does **not** collect, store, or transmit any personal data. It does not track your browsing history, does not use analytics, and does not send any information to external servers. The only network request is to the public Frankfurter exchange rate API to fetch the current USD/VND rate — no user information is included in this request.

Your data stays on your device. Period.

### Open Source

This extension is open source. You can review the code, report issues, or contribute on GitHub:
https://github.com/kiraje/vnd-price-converter

---

## Privacy Policy URL
https://kiraje.github.io/vnd-price-converter/privacy-policy.html

## Homepage URL
https://github.com/kiraje/vnd-price-converter

---

# Upload Checklist

Follow these steps to publish on Chrome Web Store:

### Prerequisites
- [ ] Google Developer account ($5 one-time fee): https://chrome.google.com/webstore/devconsole/
- [ ] Privacy policy hosted (see GitHub Pages setup below)

### Prepare Package
- [ ] Make sure `manifest.json` version is correct
- [ ] ZIP the extension files (exclude `node_modules`, `screenshots`, `.git`, `STORE-LISTING.md`):
  ```bash
  cd /root/projects/vnd-price-converter
  zip -r vnd-price-converter.zip manifest.json background.js content.js popup.html popup.css popup.js icons/
  ```

### Upload to Chrome Web Store
1. [ ] Go to https://chrome.google.com/webstore/devconsole/
2. [ ] Click **"New Item"** → Upload the `.zip` file
3. [ ] **Store Listing** tab:
   - Name: `VND Price Converter`
   - Short description: copy from above
   - Description: copy from above
   - Category: Shopping
   - Language: English
4. [ ] **Graphic Assets**:
   - Upload 1-5 screenshots (1280x800) from `screenshots/` folder
   - Icon: already in `icons/icon128.png`
5. [ ] **Privacy** tab:
   - Single purpose: "Converts USD prices to VND on webpages"
   - Privacy policy URL: `https://kiraje.github.io/vnd-price-converter/privacy-policy.html`
   - Permissions justification:
     - `activeTab`: Needed to access page content for price detection
     - `storage`: Saves exchange rate cache and user preferences
     - `alarms`: Schedules hourly exchange rate updates
   - Does not use remote code
   - Data use: Does not collect or transmit user data
6. [ ] **Distribution** tab:
   - Visibility: Public
   - Distribution: All regions
7. [ ] Click **"Submit for Review"**

### GitHub Pages Setup for Privacy Policy
```bash
# Option 1: via gh CLI
gh api repos/kiraje/vnd-price-converter/pages -X POST -f source.branch=main -f source.path=/

# Option 2: Manual
# Go to repo Settings → Pages → Source: Deploy from branch → main → / (root) → Save
```
After enabling, privacy policy will be at:
`https://kiraje.github.io/vnd-price-converter/privacy-policy.html`

### After Submission
- Review typically takes 1-3 business days
- You'll get an email when approved or if changes are needed
