/**
 * Screenshot generator for VND Price Converter
 * Creates realistic screenshots showing the extension in action
 * Output: 1280x800 PNG (Chrome Web Store requirement)
 */
const { chromium } = require('playwright');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'screenshots');

async function genScreenshot1_Steam(page) {
  // Mock a realistic Steam-like pricing page with VND conversions visible
  await page.setContent(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Red Dead Redemption 2 on Steam</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #1b2838; color: #c6d4df; font-size: 14px; }
    
    /* Navbar */
    .nav { background: #171a21; padding: 10px 20px; display: flex; align-items: center; gap: 20px; border-bottom: 1px solid #4c6b22; }
    .nav .logo { color: #c6d4df; font-size: 22px; font-weight: bold; letter-spacing: 1px; }
    .nav a { color: #c6d4df; text-decoration: none; font-size: 13px; opacity: 0.7; }
    .nav a:hover { opacity: 1; }
    .nav .search { margin-left: auto; background: #316282; border: none; color: #c6d4df; padding: 6px 12px; border-radius: 3px; width: 200px; }

    /* Breadcrumb */
    .breadcrumb { padding: 8px 20px; font-size: 12px; color: #8f98a0; }
    .breadcrumb a { color: #66c0f4; text-decoration: none; }

    /* Main content */
    .main { display: flex; gap: 20px; padding: 20px; max-width: 1000px; margin: 0 auto; }
    .left { flex: 1; }
    .right { width: 310px; flex-shrink: 0; }

    /* Header */
    .game-title { font-size: 26px; color: #c6d4df; margin-bottom: 8px; }
    .game-header-image { width: 100%; height: 180px; object-fit: cover; border-radius: 3px; background: linear-gradient(135deg, #2a1a0a 0%, #4a2e10 50%, #2a1a0a 100%); display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
    .game-header-image span { color: #c9a84c; font-size: 18px; font-weight: bold; }

    /* Purchase box */
    .purchase-box { background: #1b2838; border: 1px solid #4c6b22; padding: 16px; border-radius: 3px; }
    .buy-title { font-size: 12px; text-transform: uppercase; color: #8f98a0; margin-bottom: 4px; }
    .buy-game-title { font-size: 15px; color: #c6d4df; margin-bottom: 10px; }
    .price-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .original-price { text-decoration: line-through; color: #8f98a0; font-size: 13px; }
    .discount-badge { background: #4c6b22; color: #a4d007; padding: 3px 7px; font-size: 13px; font-weight: bold; border-radius: 2px; }
    .final-price { font-size: 20px; color: #c6d4df; font-weight: bold; }
    
    /* VND converted span */
    .vnd-converted { color: #8fb4d9; font-size: 13px; font-weight: normal; white-space: nowrap; background: rgba(102, 192, 244, 0.1); padding: 1px 5px; border-radius: 3px; border: 1px solid rgba(102, 192, 244, 0.2); }
    
    .buy-btn { width: 100%; background: linear-gradient(to bottom, #a4d007 5%, #536904 95%); border: none; color: #1b2838; font-size: 14px; font-weight: bold; padding: 10px; cursor: pointer; border-radius: 2px; text-transform: uppercase; }

    /* Game details */
    .game-desc { font-size: 13px; line-height: 1.6; color: #8f98a0; margin-top: 14px; }

    /* Tags */
    .tags { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 5px; }
    .tag { background: rgba(103, 193, 245, 0.2); color: #66c0f4; padding: 3px 8px; font-size: 12px; border-radius: 2px; border: 1px solid rgba(103, 193, 245, 0.3); }

    /* Reviews */
    .reviews { background: #16202d; padding: 12px; border-radius: 3px; margin-top: 12px; }
    .review-title { font-size: 12px; color: #8f98a0; margin-bottom: 6px; text-transform: uppercase; }
    .review-score { color: #66c0f4; font-size: 14px; font-weight: bold; }
    .review-count { color: #8f98a0; font-size: 12px; }

    /* Other packages */
    .other-pkg { background: #16202d; padding: 12px; border-radius: 3px; margin-top: 12px; }
    .other-pkg h3 { font-size: 13px; color: #8f98a0; text-transform: uppercase; margin-bottom: 8px; }
    .pkg-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-top: 1px solid #2a475e; }
    .pkg-name { font-size: 13px; color: #c6d4df; }
    .pkg-price { font-size: 14px; color: #c6d4df; font-weight: bold; }

    /* Extension popup indicator */
    .ext-indicator { position: fixed; top: 12px; right: 12px; z-index: 9999; }
    .ext-popup { background: white; border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.35); width: 280px; overflow: hidden; }
    .ext-popup-header { background: #1a73e8; color: white; padding: 10px 14px; font-size: 14px; font-weight: bold; text-align: center; }
    .ext-popup-body { padding: 14px; font-family: -apple-system, sans-serif; }
    .ext-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee; margin-bottom: 8px; }
    .ext-row span:first-child { font-size: 14px; color: #333; }
    .ext-toggle { display: flex; align-items: center; gap: 6px; }
    .ext-switch { width: 44px; height: 24px; background: #1a73e8; border-radius: 24px; position: relative; cursor: pointer; }
    .ext-switch::after { content: ''; position: absolute; width: 18px; height: 18px; background: white; border-radius: 50%; right: 3px; top: 3px; }
    .ext-info div { display: flex; justify-content: space-between; font-size: 12px; padding: 3px 0; color: #555; }
    .ext-info .val { font-weight: 600; color: #d32f2f; }
    .ext-btn { width: 100%; margin-top: 10px; padding: 7px; border: 1px solid #ddd; border-radius: 5px; background: #f8f9fa; font-size: 12px; cursor: pointer; }
    .on-badge { color: #2e7d32; font-size: 11px; font-weight: bold; background: #e8f5e9; padding: 2px 6px; border-radius: 10px; }
  </style>
</head>
<body>
  <div class="nav">
    <div class="logo">STEAM</div>
    <a href="#">STORE</a>
    <a href="#">COMMUNITY</a>
    <a href="#">ABOUT</a>
    <input class="search" placeholder="Search">
  </div>
  <div class="breadcrumb">
    <a href="#">All Games</a> › <a href="#">Action</a> › Red Dead Redemption 2
  </div>
  <div class="main">
    <div class="left">
      <div class="game-title">Red Dead Redemption 2</div>
      <div class="game-header-image">
        <span>🤠 RED DEAD REDEMPTION 2</span>
      </div>
      <div class="game-desc">
        Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, Red Dead Redemption 2 is an epic tale of honor and loyalty at the dawn of the modern age.
      </div>
      <div class="tags">
        <span class="tag">Open World</span>
        <span class="tag">Western</span>
        <span class="tag">Story Rich</span>
        <span class="tag">Action</span>
        <span class="tag">Adventure</span>
      </div>
      <div class="reviews">
        <div class="review-title">Overall Reviews</div>
        <span class="review-score">Very Positive</span>
        <span class="review-count">&nbsp;(498,241 reviews)</span>
      </div>
    </div>

    <div class="right">
      <div class="purchase-box">
        <div class="buy-title">Buy</div>
        <div class="buy-game-title">Red Dead Redemption 2</div>
        
        <div class="price-row">
          <span class="original-price">$59.99</span>
          <span class="discount-badge">-40%</span>
          <span class="final-price">$35.99 <span class="vnd-converted">(~918.745đ)</span></span>
        </div>
        <button class="buy-btn">Add to Cart</button>

        <div class="other-pkg">
          <h3>Bundles</h3>
          <div class="pkg-item">
            <span class="pkg-name">RDR2 + GTA V</span>
            <span class="pkg-price">$49.99 <span class="vnd-converted">(~1.274.745đ)</span></span>
          </div>
          <div class="pkg-item">
            <span class="pkg-name">Rockstar Collection</span>
            <span class="pkg-price">$89.99 <span class="vnd-converted">(~2.294.745đ)</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Extension popup -->
  <div class="ext-indicator">
    <div class="ext-popup">
      <div class="ext-popup-header">💱 VND Converter</div>
      <div class="ext-popup-body">
        <div class="ext-row">
          <span>Enable conversion</span>
          <div class="ext-toggle">
            <span class="on-badge">ON</span>
            <div class="ext-switch"></div>
          </div>
        </div>
        <div class="ext-info">
          <div><span>Rate:</span><span class="val">1 USD = 25.500đ</span></div>
          <div><span>Source:</span><span>frankfurter.app</span></div>
          <div><span>Updated:</span><span>03:45, 20/02/2026</span></div>
        </div>
        <button class="ext-btn">🔄 Refresh Rate</button>
      </div>
    </div>
  </div>
</body>
</html>
  `, { waitUntil: 'domcontentloaded' });
  
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-1-steam.png'), clip: { x: 0, y: 0, width: 1280, height: 800 } });
  console.log('✅ Screenshot 1 (Steam) done');
}

async function genScreenshot2_Notion(page) {
  await page.setContent(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Notion – Pricing</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background: #fff; color: #37352f; font-size: 14px; }

    /* Nav */
    .nav { border-bottom: 1px solid #e9e9e7; padding: 0 32px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: rgba(255,255,255,0.95); }
    .nav .logo { font-size: 20px; font-weight: bold; display: flex; align-items: center; gap: 8px; }
    .nav .logo span { font-size: 22px; }
    .nav-links { display: flex; gap: 24px; font-size: 14px; color: #37352f; }
    .nav-links a { text-decoration: none; color: #37352f; opacity: 0.8; }
    .nav-cta { display: flex; gap: 10px; align-items: center; }
    .btn-secondary { padding: 7px 14px; border: 1px solid #e9e9e7; border-radius: 5px; font-size: 14px; cursor: pointer; background: white; }
    .btn-primary { padding: 7px 14px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer; background: #000; color: white; }

    /* Hero */
    .hero { text-align: center; padding: 48px 20px 32px; }
    .hero h1 { font-size: 36px; font-weight: 700; margin-bottom: 10px; }
    .hero p { color: #787774; font-size: 16px; margin-bottom: 24px; }
    .toggle-billing { display: inline-flex; background: #f1f1ef; padding: 4px; border-radius: 8px; gap: 4px; margin-bottom: 8px; }
    .toggle-billing button { padding: 7px 18px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }
    .toggle-billing .active { background: white; box-shadow: 0 1px 4px rgba(0,0,0,0.12); font-weight: 600; }
    .toggle-billing .inactive { background: transparent; color: #787774; }
    .save-note { font-size: 12px; color: #2ecc71; font-weight: 500; margin-bottom: 32px; }
    .usd-note { font-size: 12px; color: #787774; margin-bottom: 8px; }

    /* Plans grid */
    .plans { display: flex; gap: 16px; max-width: 1100px; margin: 0 auto; padding: 0 20px 40px; justify-content: center; }
    .plan { flex: 1; max-width: 240px; border: 1px solid #e9e9e7; border-radius: 10px; padding: 24px 20px; position: relative; }
    .plan.popular { border-color: #000; border-width: 2px; }
    .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #000; color: white; padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
    .plan-name { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
    .plan-desc { font-size: 13px; color: #787774; margin-bottom: 20px; line-height: 1.5; }
    .plan-price { margin-bottom: 6px; }
    .plan-price .amount { font-size: 32px; font-weight: 700; }
    .plan-price .period { font-size: 14px; color: #787774; }
    .plan-price .per-member { display: block; font-size: 12px; color: #787774; margin-bottom: 4px; }
    
    /* VND tag */
    .vnd-converted { color: #0f7b6c; font-size: 12px; font-weight: 600; background: #edfaf7; padding: 2px 6px; border-radius: 4px; border: 1px solid #bdf0e6; display: inline-block; margin-bottom: 12px; white-space: nowrap; }
    
    .plan-cta { width: 100%; padding: 9px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; margin-bottom: 16px; }
    .cta-primary { background: #000; color: white; border: none; }
    .cta-secondary { background: white; color: #37352f; border: 1px solid #e9e9e7; }
    .plan-features { list-style: none; font-size: 13px; color: #37352f; }
    .plan-features li { padding: 5px 0; border-bottom: 1px solid #f1f1ef; display: flex; align-items: flex-start; gap: 7px; }
    .plan-features li:last-child { border-bottom: none; }
    .check { color: #2ecc71; font-weight: bold; flex-shrink: 0; }

    /* Extension popup */
    .ext-indicator { position: fixed; bottom: 30px; right: 30px; z-index: 9999; }
    .ext-popup { background: white; border-radius: 10px; box-shadow: 0 4px 28px rgba(0,0,0,0.18); width: 260px; overflow: hidden; border: 1px solid #e9e9e7; }
    .ext-header { background: #1a73e8; color: white; padding: 10px 14px; font-size: 14px; font-weight: bold; text-align: center; }
    .ext-body { padding: 12px 14px; font-family: inherit; }
    .ext-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid #f1f1ef; margin-bottom: 8px; font-size: 13px; }
    .ext-switch { width: 40px; height: 22px; background: #1a73e8; border-radius: 22px; position: relative; cursor: pointer; }
    .ext-switch::after { content: ''; position: absolute; width: 16px; height: 16px; background: white; border-radius: 50%; right: 3px; top: 3px; }
    .ext-info div { display: flex; justify-content: space-between; font-size: 12px; padding: 3px 0; }
    .ext-info .label { color: #787774; }
    .ext-info .val { font-weight: 700; color: #d32f2f; }
    .ext-btn { width: 100%; margin-top: 10px; padding: 7px; border: 1px solid #e9e9e7; border-radius: 6px; background: #f1f1ef; font-size: 12px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="nav">
    <div class="logo"><span>N</span> <strong>Notion</strong></div>
    <div class="nav-links">
      <a href="#">Product</a>
      <a href="#">Solutions</a>
      <a href="#">Resources</a>
      <a href="#"><strong>Pricing</strong></a>
    </div>
    <div class="nav-cta">
      <button class="btn-secondary">Log in</button>
      <button class="btn-primary">Get Notion free</button>
    </div>
  </div>

  <div class="hero">
    <h1>Simple, transparent pricing</h1>
    <p>Start for free. Upgrade when you need more.</p>
    <div class="toggle-billing">
      <button class="inactive">Monthly</button>
      <button class="active">Yearly</button>
    </div><br>
    <div class="save-note">✓ Save up to 20% with yearly billing</div>
    <div class="usd-note">Prices in USD · billed annually per member</div>
  </div>

  <div class="plans">
    <!-- Free -->
    <div class="plan">
      <div class="plan-name">Free</div>
      <div class="plan-desc">For personal use and small teams getting started.</div>
      <div class="plan-price">
        <span class="amount">$0</span>
        <span class="period">/mo</span>
        <span class="per-member">per member</span>
      </div>
      <div class="vnd-converted">~0đ / tháng</div>
      <button class="plan-cta cta-secondary">Get started free</button>
      <ul class="plan-features">
        <li><span class="check">✓</span> Unlimited pages & blocks</li>
        <li><span class="check">✓</span> Share with 10 guests</li>
        <li><span class="check">✓</span> Sync across devices</li>
      </ul>
    </div>

    <!-- Plus -->
    <div class="plan popular">
      <div class="popular-badge">⭐ Most Popular</div>
      <div class="plan-name">Plus</div>
      <div class="plan-desc">For small teams who want to manage work and grow together.</div>
      <div class="plan-price">
        <span class="amount">$10</span>
        <span class="period">/mo</span>
        <span class="per-member">per member</span>
      </div>
      <div class="vnd-converted">~255.000đ / tháng</div>
      <button class="plan-cta cta-primary">Try Plus free</button>
      <ul class="plan-features">
        <li><span class="check">✓</span> Unlimited blocks for teams</li>
        <li><span class="check">✓</span> Unlimited file uploads</li>
        <li><span class="check">✓</span> 30-day page history</li>
        <li><span class="check">✓</span> Invite 100 guests</li>
      </ul>
    </div>

    <!-- Business -->
    <div class="plan">
      <div class="plan-name">Business</div>
      <div class="plan-desc">For companies to connect teams across departments.</div>
      <div class="plan-price">
        <span class="amount">$20</span>
        <span class="period">/mo</span>
        <span class="per-member">per member</span>
      </div>
      <div class="vnd-converted">~510.000đ / tháng</div>
      <button class="plan-cta cta-secondary">Try Business free</button>
      <ul class="plan-features">
        <li><span class="check">✓</span> SAML SSO</li>
        <li><span class="check">✓</span> Private teamspaces</li>
        <li><span class="check">✓</span> 90-day page history</li>
        <li><span class="check">✓</span> Advanced analytics</li>
      </ul>
    </div>

    <!-- Enterprise -->
    <div class="plan">
      <div class="plan-name">Enterprise</div>
      <div class="plan-desc">For large organizations needing advanced controls and security.</div>
      <div class="plan-price">
        <span class="amount">Custom</span>
        <span class="period"></span>
        <span class="per-member">&nbsp;</span>
      </div>
      <div class="vnd-converted" style="visibility:hidden">—</div>
      <button class="plan-cta cta-secondary">Contact sales</button>
      <ul class="plan-features">
        <li><span class="check">✓</span> Advanced security & controls</li>
        <li><span class="check">✓</span> User provisioning (SCIM)</li>
        <li><span class="check">✓</span> Audit log</li>
        <li><span class="check">✓</span> Dedicated manager</li>
      </ul>
    </div>
  </div>

  <!-- Extension popup pinned bottom-right -->
  <div class="ext-indicator">
    <div class="ext-popup">
      <div class="ext-header">💱 VND Converter</div>
      <div class="ext-body">
        <div class="ext-row">
          <span>Enable conversion</span>
          <div class="ext-switch"></div>
        </div>
        <div class="ext-info">
          <div><span class="label">Rate:</span><span class="val">1 USD = 25.500đ</span></div>
          <div><span class="label">Source:</span><span>frankfurter.app</span></div>
          <div><span class="label">Updated:</span><span>03:45, 20/02/2026</span></div>
        </div>
        <button class="ext-btn">🔄 Refresh Rate</button>
      </div>
    </div>
  </div>
</body>
</html>
  `, { waitUntil: 'domcontentloaded' });

  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-2-notion.png'), clip: { x: 0, y: 0, width: 1280, height: 800 } });
  console.log('✅ Screenshot 2 (Notion Pricing) done');
}

async function genScreenshot3_Amazon(page) {
  await page.setContent(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Amazon - Product Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #fff; color: #0F1111; font-size: 14px; }

    /* Nav */
    .nav { background: #131921; color: white; padding: 8px 16px; display: flex; align-items: center; gap: 12px; }
    .nav .logo { font-size: 20px; font-weight: bold; color: #ff9900; letter-spacing: -1px; border: 1px solid #e77600; padding: 3px 5px; border-radius: 3px; }
    .nav .location { font-size: 12px; display: flex; align-items: center; gap: 4px; }
    .nav .location span { font-size: 11px; color: #ccc; }
    .nav-search { flex: 1; display: flex; }
    .nav-search input { flex: 1; padding: 8px 12px; border: none; border-radius: 4px 0 0 4px; font-size: 14px; }
    .nav-search button { background: #ff9900; border: none; padding: 8px 14px; border-radius: 0 4px 4px 0; cursor: pointer; font-size: 16px; }
    .nav-cart { color: white; font-size: 12px; display: flex; flex-direction: column; align-items: center; }
    .nav-cart .cart-icon { font-size: 24px; }

    /* Breadcrumb */
    .breadcrumb { padding: 8px 16px; font-size: 12px; color: #007185; }
    .breadcrumb a { color: #007185; text-decoration: none; }

    /* Product layout */
    .product { display: flex; gap: 20px; padding: 16px; max-width: 1200px; margin: 0 auto; }
    
    /* Image */
    .product-image { width: 380px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: #f3f3f3; border: 1px solid #ddd; border-radius: 4px; height: 380px; font-size: 80px; }

    /* Info */
    .product-info { flex: 1; }
    .product-title { font-size: 20px; line-height: 1.4; margin-bottom: 8px; }
    .rating { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; font-size: 13px; color: #007185; }
    .stars { color: #ff9900; font-size: 15px; }
    .divider { border-top: 1px solid #ddd; margin: 10px 0; }
    
    /* Price box */
    .price-section { margin-bottom: 12px; }
    .list-price { font-size: 13px; color: #565959; }
    .list-price span { text-decoration: line-through; }
    .deal-price { font-size: 13px; color: #CC0C39; font-weight: bold; display: flex; align-items: center; gap: 8px; }
    .main-price { font-size: 28px; font-weight: 400; color: #B12704; display: flex; align-items: baseline; gap: 6px; }
    .main-price .cents { font-size: 16px; vertical-align: super; line-height: 1; }
    
    /* VND converted */
    .vnd-converted { color: #007185; font-size: 13px; background: #f0f9f9; padding: 2px 7px; border-radius: 4px; border: 1px solid #b2dfdb; white-space: nowrap; display: inline-block; }
    .vnd-block { margin: 4px 0 10px; }
    
    .prime { color: #00a8e0; font-size: 13px; margin-bottom: 8px; }
    
    /* Buy box */
    .buy-box { width: 240px; flex-shrink: 0; border: 1px solid #ddd; border-radius: 8px; padding: 16px; font-size: 14px; }
    .buy-price { font-size: 22px; font-weight: bold; color: #B12704; margin-bottom: 4px; }
    .buy-vnd { font-size: 13px; color: #007185; margin-bottom: 10px; }
    .buy-vnd .vnd-converted { font-size: 12px; }
    .stock { color: #007600; font-size: 14px; font-weight: bold; margin-bottom: 10px; }
    .buy-btn { width: 100%; background: #ffd814; border: 1px solid #fcd200; border-radius: 20px; padding: 9px; font-size: 14px; cursor: pointer; margin-bottom: 8px; }
    .cart-btn { width: 100%; background: #ffa41c; border: 1px solid #ff8f00; border-radius: 20px; padding: 9px; font-size: 14px; cursor: pointer; }
    
    .feature-bullets { list-style: none; font-size: 14px; line-height: 2; }
    .feature-bullets li::before { content: '›  '; color: #000; }
  </style>
</head>
<body>
  <div class="nav">
    <div class="logo">amazon</div>
    <div class="nav-search">
      <input type="text" value="mechanical keyboard">
      <button>🔍</button>
    </div>
    <div class="nav-cart"><span class="cart-icon">🛒</span><span>Cart</span></div>
  </div>
  <div class="breadcrumb">
    <a href="#">Electronics</a> › <a href="#">Computers & Accessories</a> › <a href="#">Keyboards</a>
  </div>
  <div class="product">
    <div class="product-image">⌨️</div>
    <div class="product-info">
      <div class="product-title">Logitech MX Keys Advanced Wireless Illuminated Keyboard — Tactile Responsive Typing, Backlighting, Bluetooth, USB-C, macOS/Windows/Linux/iOS/Android</div>
      <div class="rating">
        <span class="stars">★★★★☆</span>
        <a href="#">18,234 ratings</a>
        &nbsp;|&nbsp; <a href="#">200+ answered questions</a>
      </div>
      <div class="divider"></div>
      <div class="price-section">
        <div class="list-price">List Price: <span>$129.99</span> <span class="vnd-converted">(~3.314.745đ)</span></div>
        <div class="deal-price">Deal of the Day — Limited time offer</div>
        <div class="main-price">
          <span class="cents">$</span><span>99</span><span class="cents">.99</span>
        </div>
        <div class="vnd-block">
          <span class="vnd-converted">~2.549.745đ</span>
        </div>
        <div class="prime">✦ FREE delivery <strong>Tuesday, Feb 25</strong> with Prime</div>
      </div>
      <div class="divider"></div>
      <ul class="feature-bullets">
        <li>PERFECT STROKE KEYS — Spherically dished keys match the shape of your fingertips</li>
        <li>SMART ILLUMINATION — Adjustable backlight keys, auto-adapts to ambient light</li>
        <li>MULTI-DEVICE — Connect and type on 3 devices, switch between them with Bluetooth</li>
        <li>USB-C RECHARGEABLE — Charge with USB-C; battery lasts up to 10 days with backlight</li>
      </ul>
    </div>
    <div class="buy-box">
      <div class="buy-price">$99.99</div>
      <div class="buy-vnd"><span class="vnd-converted">~2.549.745đ</span></div>
      <div class="stock">In Stock</div>
      <button class="buy-btn">Buy Now</button>
      <button class="cart-btn">Add to Cart</button>
    </div>
  </div>
</body>
</html>
  `, { waitUntil: 'domcontentloaded' });

  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-3-amazon.png'), clip: { x: 0, y: 0, width: 1280, height: 800 } });
  console.log('✅ Screenshot 3 (Amazon) done');
}

async function genScreenshot4_Freelance(page) {
  await page.setContent(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Upwork - Job Listing</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: #f4f4f2; color: #1d2124; font-size: 14px; }

    /* Nav */
    .nav { background: #14a800; padding: 0 24px; height: 60px; display: flex; align-items: center; gap: 24px; }
    .nav .logo { color: white; font-size: 22px; font-weight: bold; }
    .nav a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14px; }
    .nav .nav-cta { margin-left: auto; display: flex; gap: 10px; }
    .btn-outline { border: 1px solid white; color: white; background: transparent; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 14px; }
    .btn-filled { border: none; color: #14a800; background: white; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 14px; font-weight: bold; }

    /* Layout */
    .container { display: flex; gap: 20px; padding: 24px; max-width: 1100px; margin: 0 auto; }
    .feed { flex: 1; }
    .sidebar { width: 280px; flex-shrink: 0; }

    /* Job card */
    .job-card { background: white; border: 1px solid #d5d5d0; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
    .job-card:hover { border-color: #14a800; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .posted { font-size: 12px; color: #6e6e6e; margin-bottom: 6px; }
    .job-title { font-size: 18px; color: #108a00; font-weight: 600; margin-bottom: 8px; text-decoration: underline; cursor: pointer; }
    .job-meta { display: flex; gap: 16px; margin-bottom: 10px; flex-wrap: wrap; font-size: 13px; color: #6e6e6e; }
    .job-meta .meta-item { display: flex; align-items: center; gap: 4px; }
    .job-desc { font-size: 14px; line-height: 1.6; color: #1d2124; margin-bottom: 10px; }
    .job-skills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
    .skill-tag { border: 1px solid #d5d5d0; border-radius: 20px; padding: 3px 10px; font-size: 12px; color: #1d2124; }
    
    /* Budget */
    .budget-row { display: flex; align-items: center; gap: 10px; background: #f9f9f7; border-radius: 6px; padding: 10px 14px; border-left: 3px solid #14a800; }
    .budget-label { font-size: 13px; color: #6e6e6e; }
    .budget-amount { font-size: 16px; font-weight: 700; color: #1d2124; }
    .vnd-converted { color: #108a00; font-size: 13px; font-weight: 600; background: #e6f6e6; padding: 2px 8px; border-radius: 4px; border: 1px solid #aadcaa; white-space: nowrap; }

    /* Sidebar widget */
    .sidebar-widget { background: white; border: 1px solid #d5d5d0; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
    .widget-title { font-size: 15px; font-weight: 700; margin-bottom: 12px; }
    
    /* Extension popup */
    .ext-popup { background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border: 1px solid #d5d5d0; overflow: hidden; }
    .ext-header { background: #1a73e8; color: white; padding: 10px 14px; font-size: 14px; font-weight: bold; text-align: center; }
    .ext-body { padding: 12px 14px; }
    .ext-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid #f1f1ef; margin-bottom: 8px; font-size: 13px; }
    .ext-switch { width: 40px; height: 22px; background: #1a73e8; border-radius: 22px; position: relative; }
    .ext-switch::after { content: ''; position: absolute; width: 16px; height: 16px; background: white; border-radius: 50%; right: 3px; top: 3px; }
    .ext-info div { display: flex; justify-content: space-between; font-size: 12px; padding: 3px 0; }
    .ext-val { font-weight: 700; color: #d32f2f; }
    .ext-btn { width: 100%; margin-top: 10px; padding: 7px; border: 1px solid #d5d5d0; border-radius: 6px; background: #f4f4f2; font-size: 12px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="nav">
    <div class="logo">Upwork</div>
    <a href="#">Find Work</a>
    <a href="#">Find Talent</a>
    <div class="nav-cta">
      <button class="btn-outline">Log In</button>
      <button class="btn-filled">Sign Up</button>
    </div>
  </div>
  <div class="container">
    <div class="feed">
      <h2 style="margin-bottom:14px;font-size:18px;">Jobs you might like</h2>

      <!-- Job 1 -->
      <div class="job-card">
        <div class="posted">Posted 2 hours ago · Worldwide</div>
        <div class="job-title">Senior React Developer — Long-term contract</div>
        <div class="job-meta">
          <span class="meta-item">💼 Hourly</span>
          <span class="meta-item">🕐 30+ hrs/week</span>
          <span class="meta-item">📅 6+ months</span>
          <span class="meta-item">⭐ Expert</span>
        </div>
        <div class="job-desc">
          We are looking for an experienced React developer to join our SaaS product team. You will work closely with our design and backend teams to build and maintain high-performance web applications.
        </div>
        <div class="job-skills">
          <span class="skill-tag">React.js</span>
          <span class="skill-tag">TypeScript</span>
          <span class="skill-tag">Node.js</span>
          <span class="skill-tag">REST API</span>
        </div>
        <div class="budget-row">
          <span class="budget-label">Hourly Rate:</span>
          <span class="budget-amount">$45 - $65/hr</span>
          <span class="vnd-converted">~1.147.500đ - 1.657.500đ/hr</span>
        </div>
      </div>

      <!-- Job 2 -->
      <div class="job-card">
        <div class="posted">Posted 5 hours ago · United States only</div>
        <div class="job-title">Full-Stack Engineer for FinTech Startup</div>
        <div class="job-meta">
          <span class="meta-item">💰 Fixed Price</span>
          <span class="meta-item">🕐 Full time</span>
          <span class="meta-item">📅 3 months</span>
        </div>
        <div class="job-desc">
          FinTech startup seeking a skilled full-stack engineer to build a customer-facing dashboard. Must have experience with financial data visualization and real-time updates.
        </div>
        <div class="job-skills">
          <span class="skill-tag">Next.js</span>
          <span class="skill-tag">PostgreSQL</span>
          <span class="skill-tag">D3.js</span>
          <span class="skill-tag">AWS</span>
        </div>
        <div class="budget-row">
          <span class="budget-label">Fixed Budget:</span>
          <span class="budget-amount">$8,500</span>
          <span class="vnd-converted">~216.750.000đ</span>
        </div>
      </div>

      <!-- Job 3 -->
      <div class="job-card">
        <div class="posted">Posted 1 day ago · Worldwide</div>
        <div class="job-title">UI/UX Designer for Mobile App Redesign</div>
        <div class="job-meta">
          <span class="meta-item">💼 Hourly</span>
          <span class="meta-item">🕐 10-20 hrs/week</span>
        </div>
        <div class="job-desc">
          We need an experienced UI/UX designer to redesign our mobile app. The project includes user research, wireframing, prototyping, and final Figma deliverables.
        </div>
        <div class="job-skills">
          <span class="skill-tag">Figma</span>
          <span class="skill-tag">UI Design</span>
          <span class="skill-tag">Mobile UX</span>
        </div>
        <div class="budget-row">
          <span class="budget-label">Hourly Rate:</span>
          <span class="budget-amount">$25 - $40/hr</span>
          <span class="vnd-converted">~637.500đ - 1.020.000đ/hr</span>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="ext-popup">
        <div class="ext-header">💱 VND Converter</div>
        <div class="ext-body">
          <div class="ext-row">
            <span>Enable conversion</span>
            <div class="ext-switch"></div>
          </div>
          <div class="ext-info">
            <div><span>Rate:</span><span class="ext-val">1 USD = 25.500đ</span></div>
            <div><span>Source:</span><span>frankfurter.app</span></div>
            <div><span>Updated:</span><span>just now</span></div>
          </div>
          <button class="ext-btn">🔄 Refresh Rate</button>
        </div>
      </div>

      <div class="sidebar-widget" style="margin-top:16px;">
        <div class="widget-title">Profile Strength</div>
        <div style="font-size:13px;color:#6e6e6e;line-height:1.8;">
          <div>✓ Profile photo</div>
          <div>✓ Professional title</div>
          <div>✓ Skills added</div>
          <div>○ Add portfolio items</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `, { waitUntil: 'domcontentloaded' });

  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-4-upwork.png'), clip: { x: 0, y: 0, width: 1280, height: 800 } });
  console.log('✅ Screenshot 4 (Upwork) done');
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  await genScreenshot1_Steam(page);
  await genScreenshot2_Notion(page);
  await genScreenshot3_Amazon(page);
  await genScreenshot4_Freelance(page);

  await browser.close();
  console.log('\n🎉 All screenshots generated in screenshots/');
})();
