const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const presentationHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOOPNI — The "L-Loop" Brand Identity &amp; Apparel System</title>
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

    .hero-mockup-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin: 36px 0;
    }
    @media (max-width: 768px) {
      .hero-mockup-grid { grid-template-columns: 1fr; }
    }
    .mockup-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    }
    .mockup-img {
      width: 100%;
      height: 380px;
      object-fit: cover;
      display: block;
      background: #EAE6DE;
    }
    .mockup-caption {
      padding: 20px 24px;
    }
    .mockup-caption h3 {
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .mockup-caption p {
      font-size: 14px;
      color: var(--muted);
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
      <span class="badge">Official Brand Release</span>
      <h1>LOOPNI "L-LOOP" SYSTEM</h1>
      <p class="subtitle">
        Design Thinking: An unmistakable letter <strong>L</strong> that seamlessly integrates a continuous fluid thread loop at its base. Crafted for understated luxury on apparel and maximum visibility in Google Search Console.
      </p>
    </header>

    <!-- Apparel Mockup Showcases -->
    <div class="hero-mockup-grid">
      <div class="mockup-card">
        <img src="assets/images/branding/loopni-hoodie-embroidery.jpg" alt="Loopni L-Loop Hoodie Embroidery" class="mockup-img">
        <div class="mockup-caption">
          <h3>The Hoodie: Discreet Chest Embroidery</h3>
          <p>Understated white embroidery stitch on washed heavyweight charcoal cotton. Elevated, minimal, and doesn't overwhelm the silhouette of the piece.</p>
        </div>
      </div>

      <div class="mockup-card">
        <img src="assets/images/branding/loopni-l-emblem.jpg" alt="Loopni L-Loop Clean Graphic Emblem" class="mockup-img">
        <div class="mockup-caption">
          <h3>The Core Emblem: Letter L + Continuous Loop</h3>
          <p>Architectural geometric letter L with an authentic knot-loop at the heel. Clean, timeless, and completely versatile.</p>
        </div>
      </div>
    </div>

    <!-- Core Vector System -->
    <div class="system-card">
      <h2 class="section-title">Digital &amp; Physical Master Marks</h2>
      <p class="section-desc">Vector SVGs render at 100% infinite sharpness on digital screens, embroidery digitization software, and laser-cut hangtags.</p>

      <div class="displays-row">
        <!-- Standalone Mark -->
        <div class="display-box box-light">
          <img src="assets/images/branding/icon.svg" width="90" height="90" alt="L-Loop Standalone">
          <span class="box-badge">Standalone Emblem (Light)</span>
        </div>

        <!-- Dark Background -->
        <div class="display-box box-dark">
          <svg viewBox="0 0 100 100" width="90" height="90" fill="none">
            <g fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M 40 16 L 40 54 C 40 68, 26 76, 18 68 C 10 60, 18 48, 30 48 C 40 48, 46 60, 54 68 L 80 68" />
            </g>
          </svg>
          <span class="box-badge" style="color: #FFF;">Standalone Emblem (Dark)</span>
        </div>

        <!-- Favicon Badge -->
        <div class="display-box box-light">
          <img src="favicon.svg" width="90" height="90" alt="L-Loop Favicon">
          <span class="box-badge">Google Search Console Badge</span>
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
              <svg viewBox="0 0 100 100" width="16" height="16" fill="none">
                <g fill="none" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 40 16 L 40 54 C 40 68, 26 76, 18 68 C 10 60, 18 48, 30 48 C 40 48, 46 60, 54 68 L 80 68" />
                </g>
              </svg>
            </div>
            <span>16px (Search)</span>
          </div>

          <div class="scale-item">
            <div class="gsc-icon-wrap" style="width: 36px; height: 36px;">
              <svg viewBox="0 0 100 100" width="24" height="24" fill="none">
                <g fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 40 16 L 40 54 C 40 68, 26 76, 18 68 C 10 60, 18 48, 30 48 C 40 48, 46 60, 54 68 L 80 68" />
                </g>
              </svg>
            </div>
            <span>32px (Tab)</span>
          </div>

          <div class="scale-item">
            <div class="gsc-icon-wrap" style="width: 52px; height: 52px;">
              <svg viewBox="0 0 100 100" width="36" height="36" fill="none">
                <g fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 40 16 L 40 54 C 40 68, 26 76, 18 68 C 10 60, 18 48, 30 48 C 40 48, 46 60, 54 68 L 80 68" />
                </g>
              </svg>
            </div>
            <span>48px (Mobile)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Apparel Application Guidelines -->
    <div class="system-card">
      <h2 class="section-title">How to Apply the Logo on Clothes</h2>
      <p class="section-desc">Rules to keep your garments looking premium, elevated, and timeless without altering the character of the piece.</p>

      <div class="rules-grid">
        <div class="rule-box">
          <h5>1. T-Shirts &amp; Polo Shirts</h5>
          <p><strong>Placement:</strong> Left chest, 3 inches below the collar seam.<br><strong>Size:</strong> 2.0 cm to 2.5 cm height.<br><strong>Method:</strong> Direct embroidery or high-density silicone heat-transfer.</p>
        </div>

        <div class="rule-box">
          <h5>2. Hoodies &amp; Sweatshirts</h5>
          <p><strong>Placement:</strong> Left chest (discreet) or center chest (tonal puff print).<br><strong>Size:</strong> 2.5 cm (left chest) or 8 cm (tonal center).<br><strong>Method:</strong> 3D puff embroidery or tonal matte screenprint.</p>
        </div>

        <div class="rule-box">
          <h5>3. Shirts &amp; Outerwear</h5>
          <p><strong>Placement:</strong> Edge of left chest pocket or left cuff.<br><strong>Size:</strong> 1.5 cm to 2.0 cm height.<br><strong>Method:</strong> Tonal thread embroidery (e.g. black thread on black shirt, white thread on white shirt).</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'brand-presentation.html'), presentationHtml);
console.log('✓ brand-presentation.html updated with L-Loop!');
