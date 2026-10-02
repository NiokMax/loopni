const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const presentationHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOOPNI — Official Brand Identity &amp; Search Visibility</title>
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

    /* Google Search Snippet Simulation */
    .google-preview-card {
      background: #FFFFFF;
      border: 1px solid #DFE1E5;
      border-radius: 16px;
      padding: 24px;
      max-width: 650px;
      margin: 30px auto;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    }
    .google-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .google-favicon-box {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #0F0F11;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      flex-shrink: 0;
    }
    .google-favicon-img {
      width: 18px;
      height: 18px;
      object-fit: contain;
    }
    .google-site-info {
      display: flex;
      flex-direction: column;
    }
    .google-site-name {
      font-size: 14px;
      font-weight: 600;
      color: #202124;
      line-height: 1.2;
    }
    .google-site-url {
      font-size: 12px;
      color: #4D5156;
      line-height: 1.2;
    }
    .google-title {
      font-size: 20px;
      color: #1A0DAB;
      font-weight: 500;
      margin-bottom: 6px;
      line-height: 1.3;
      cursor: pointer;
    }
    .google-snippet {
      font-size: 14px;
      color: #4D5156;
      line-height: 1.5;
    }

    /* System Card */
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
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity: 0.7;
      margin-top: 14px;
    }

    /* Scales Bar */
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
  </style>
</head>
<body>
  <div class="container">
    <header>
      <span class="badge">Official Brand Asset</span>
      <h1>LOOPNI PERMANENT LOGO SYSTEM</h1>
      <p class="subtitle">
        Your isolated master emblem has been color-graded and integrated across your entire website, favicon stack, and Google Search infrastructure.
      </p>
    </header>

    <!-- Google Search Snippet Preview -->
    <div class="google-preview-card">
      <div style="font-size: 11px; font-weight: 700; color: #70757A; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
        Google Search Result Live Simulation
      </div>
      <div class="google-header">
        <div class="google-favicon-box">
          <img src="favicon.svg" alt="Loopni Favicon" class="google-favicon-img">
        </div>
        <div class="google-site-info">
          <span class="google-site-name">Loopni</span>
          <span class="google-site-url">https://loopni.shop</span>
        </div>
      </div>
      <div class="google-title">Loopni — Clothing &amp; Accessories | India</div>
      <div class="google-snippet">
        Discover clothing and accessories made for everyday expression. Loopni is an India-based fashion brand founded in Assam by Mayur Bikash Gogoi.
      </div>
    </div>

    <!-- Core Vector System -->
    <div class="system-card">
      <h2 class="section-title">Color Adaptations for Perfect Contrast</h2>
      <p class="section-desc">Each version is mathematically graded so it is 100% visible on its specific background without washing out.</p>

      <div class="displays-row">
        <!-- Black on Light -->
        <div class="display-box box-light">
          <img src="assets/images/branding/logo-symbol-black.png" width="90" height="60" style="object-fit: contain;" alt="Jet Black on Light">
          <span class="box-badge">Light Surfaces (Header / Paper)</span>
        </div>

        <!-- White on Dark -->
        <div class="display-box box-dark">
          <img src="assets/images/branding/logo-symbol-white.png" width="90" height="60" style="object-fit: contain;" alt="Pure White on Dark">
          <span class="box-badge" style="color: #FFF;">Dark Surfaces (Footer / Bags)</span>
        </div>

        <!-- Favicon Badge -->
        <div class="display-box box-light">
          <img src="favicon.svg" width="70" height="70" alt="Favicon Badge">
          <span class="box-badge">Google Search &amp; Browser Tabs</span>
        </div>
      </div>

      <!-- Google Search Console & Favicon Scalability -->
      <div class="test-bar">
        <div class="test-info">
          <h4>Google Search Console &amp; Browser Tab Clarity</h4>
          <p>The high-contrast dark squircle badge guarantees that your logo is bold, crisp, and never lost on white or grey browser tabs.</p>
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
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'brand-presentation.html'), presentationHtml);
console.log('✓ brand-presentation.html updated with Google search preview!');
