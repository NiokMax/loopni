const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const presentationHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOOPNI — Official Permanent Brand Identity System</title>
  <style>
    :root {
      --bg: #F7F5F0;
      --card-bg: #FFFFFF;
      --border: #E5E1D8;
      --dark: #0F0F11;
      --muted: #6B6861;
      --accent: #E85A37;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--dark);
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container { max-width: 1140px; margin: 0 auto; }
    header { margin-bottom: 40px; text-align: center; }
    .badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 6px 14px;
      background: var(--dark);
      color: #FFF;
      border-radius: 20px;
      margin-bottom: 14px;
    }
    h1 {
      font-size: 38px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    p.subtitle {
      font-size: 16px;
      color: var(--muted);
      max-width: 680px;
      margin: 0 auto;
    }

    .hero-mockup-wrap {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 24px;
      overflow: hidden;
      margin: 36px 0;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04);
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 800px) {
      .hero-mockup-wrap { grid-template-columns: 1fr; }
    }
    .hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
    }
    .hero-content {
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .hero-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 8px;
    }
    .hero-title {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 0.08em;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    .hero-desc {
      font-size: 15px;
      color: var(--muted);
      margin-bottom: 24px;
    }
    .hero-features {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hero-features li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    .hero-features li span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #EFECE6;
      border-radius: 50%;
      color: var(--dark);
      font-size: 11px;
    }

    /* Core Logo System Card */
    .system-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 36px;
      margin-bottom: 30px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }
    .section-title {
      font-size: 22px;
      font-weight: 850;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
    }
    .section-desc {
      font-size: 15px;
      color: var(--muted);
      margin-bottom: 24px;
    }

    .displays-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    @media (max-width: 800px) {
      .displays-row { grid-template-columns: 1fr; }
    }
    .display-box {
      border-radius: 16px;
      padding: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border);
      text-align: center;
      min-height: 200px;
    }
    .box-light { background: #FAF9F6; }
    .box-dark { background: #0F0F11; color: #FFF; border-color: #222; }
    .box-badge {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity: 0.6;
      margin-top: 14px;
    }

    /* GSC & Favicon Test Bar */
    .test-bar {
      background: #FAF9F6;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
    }
    .test-info h4 {
      font-size: 15px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .test-info p {
      font-size: 13px;
      color: var(--muted);
    }
    .scales-cluster {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .scale-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
    }
    .gsc-icon-wrap {
      background: #0F0F11;
      border-radius: 24%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Guidelines List */
    .rules-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 20px;
    }
    @media (max-width: 800px) {
      .rules-grid { grid-template-columns: 1fr; }
    }
    .rule-box {
      background: #FAF9F6;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px;
    }
    .rule-box h5 {
      font-size: 14px;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .rule-box p {
      font-size: 13px;
      color: var(--muted);
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <span class="badge">Permanent Brand Standard</span>
      <h1>LOOPNI OFFICIAL LOGO SYSTEM</h1>
      <p class="subtitle">
        The official, permanent visual identity for <strong>Loopni</strong>. An interlocking continuous loop monogram that embodies the letters <strong>L</strong> and <strong>N</strong> within an endless woven thread.
      </p>
    </header>

    <!-- Main Visual Presentation Card -->
    <div class="hero-mockup-wrap">
      <img src="assets/images/branding/official-permanent-logo-hangtag.jpg" alt="Official Permanent Loopni Logo Hangtag &amp; Tote Bag" class="hero-img">
      <div class="hero-content">
        <span class="hero-tag">Official Selection</span>
        <h2 class="hero-title">The Interlocking Twin-Loop</h2>
        <p class="hero-desc">
          Created for subtle luxury streetwear and timeless durability. Built to look understated and prestigious whether embossed on hangtags, printed on tote bags, or embroidered on chest pockets.
        </p>
        <ul class="hero-features">
          <li><span>✓</span> <strong>L + N Monogram:</strong> Left capsule forms the 'L', negative space &amp; right capsule complete the 'N'.</li>
          <li><span>✓</span> <strong>Over-and-Under Weave:</strong> Seamless 3D continuous loop inspired by woven textile construction.</li>
          <li><span>✓</span> <strong>Never Spoils Clothes:</strong> Sized perfectly for subtle 2.5cm chest embroidery or high-density matte prints.</li>
          <li><span>✓</span> <strong>100% Vector Scalable:</strong> Renders sharply from 16px Google Search favicons to giant store signboards.</li>
        </ul>
      </div>
    </div>

    <!-- Core Vector System -->
    <div class="system-card">
      <h2 class="section-title">Production Vector Lockups</h2>
      <p class="section-desc">Vector SVGs render at 100% infinite sharpness on digital screens, embroidery digitization software, and laser-cut hangtags.</p>

      <div class="displays-row">
        <!-- Standalone Mark -->
        <div class="display-box box-light">
          <img src="assets/images/branding/icon.svg" width="90" height="90" alt="Loopni Monogram Standalone">
          <span class="box-badge">Standalone Emblem (Light)</span>
        </div>

        <!-- Dark Background -->
        <div class="display-box box-dark">
          <img src="assets/images/branding/logo-white.svg" width="220" alt="Loopni Dark Lockup">
          <span class="box-badge" style="color: #FFF;">Dark Surface Lockup</span>
        </div>

        <!-- Vertical Stacked Hangtag Edition -->
        <div class="display-box box-light">
          <img src="assets/images/branding/logo-stacked.svg" width="130" alt="Loopni Stacked Hangtag Edition">
          <span class="box-badge">Hangtag Vertical Edition</span>
        </div>
      </div>

      <!-- Google Search Console & Favicon Scalability -->
      <div class="test-bar">
        <div class="test-info">
          <h4>Google Search Console &amp; Browser Visibility</h4>
          <p>Tested down to 16×16 px. The high-contrast dark squircle guarantees instant recognition in Google Search results and browser tabs.</p>
        </div>
        <div class="scales-cluster">
          <div class="scale-item">
            <div class="gsc-icon-wrap" style="width: 24px; height: 24px;">
              <img src="favicon.svg" width="24" height="24" alt="16px">
            </div>
            <span>16px (Search)</span>
          </div>

          <div class="scale-item">
            <div class="gsc-icon-wrap" style="width: 36px; height: 36px;">
              <img src="favicon.svg" width="36" height="36" alt="32px">
            </div>
            <span>32px (Tab)</span>
          </div>

          <div class="scale-item">
            <div class="gsc-icon-wrap" style="width: 52px; height: 52px;">
              <img src="favicon.svg" width="52" height="52" alt="48px">
            </div>
            <span>48px (Mobile)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Apparel Manufacturing Rules -->
    <div class="system-card">
      <h2 class="section-title">Apparel Manufacturing Guidelines</h2>
      <p class="section-desc">Recommended specifications for your manufacturers and printers to keep Loopni garments looking high-end.</p>

      <div class="rules-grid">
        <div class="rule-box">
          <h5>1. T-Shirts &amp; Polo Shirts</h5>
          <p><strong>Placement:</strong> Left chest, 3 inches below collar seam.<br><strong>Size:</strong> 2.2 cm to 2.5 cm width.<br><strong>Technique:</strong> Flat thread embroidery or matte high-density silicon heat-transfer.</p>
        </div>

        <div class="rule-box">
          <h5>2. Hoodies &amp; Sweatshirts</h5>
          <p><strong>Placement:</strong> Left chest (discreet) or center chest (tonal print).<br><strong>Size:</strong> 2.5 cm (left chest) or 9 cm (center chest).<br><strong>Technique:</strong> 3D puff embroidery or tonal matte screenprint.</p>
        </div>

        <div class="rule-box">
          <h5>3. Hangtags &amp; Packaging</h5>
          <p><strong>Placement:</strong> Embossed on premium 400gsm cotton-textured paper tag (matching the mockup photo).<br><strong>Technique:</strong> Blind debossing / blind embossing + black foil stamping.</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'brand-presentation.html'), presentationHtml);
console.log('✓ brand-presentation.html updated with permanent logo!');
