const fs = require('fs');
const path = require('path');

// ============================================================================
// BRAND IDENTITY DESIGNS FOR LOOPNI
// Crafted specifically for contemporary fashion & streetwear
// ============================================================================

// Design 1: "The Woven Infinity Loop" (Matches the AI Hangtag Mockup!)
// A flowing, continuous double-chamber loop where a fluid L-stroke weaves 
// seamlessly into an infinity twist.
function getInfinityWeave(color = '#0F0F11', strokeW = 7.5) {
  return `
    <g fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
      <!-- Continuous Mobius Ribbon -->
      <!-- Left upper arc down into base L -->
      <path d="M 46 24 C 32 24 22 34 22 48 C 22 64 34 76 50 76 C 62 76 72 68 76 56 C 80 44 80 34 72 26 C 64 18 52 20 44 32 L 36 46 C 28 60 30 72 40 76 C 50 80 62 76 70 66" />
    </g>
  `;
}

// Design 2: "The Interlocking Double Loop Monogram" (Iconic Luxury Fashion Mark)
// Two sleek, concentric racetrack loops that intertwine at a 45-degree angle.
// Similar to high fashion marks (like Chanel, Gucci, Cartier, Loewe), 
// but modern and geometric for Loopni.
function getInterlockingMonogram(color = '#0F0F11', strokeW = 7) {
  return `
    <g fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
      <!-- Main Loop (L-profile) -->
      <path d="M 48 20 C 32 20 22 32 22 50 C 22 68 34 80 50 80 C 64 80 72 70 72 58 C 72 48 66 38 56 30" />
      <path d="M 44 22 C 40 24 36 28 34 34" />
      
      <!-- Counter Loop (N-profile) -->
      <path d="M 52 80 C 68 80 78 68 78 50 C 78 32 66 20 50 20 C 36 20 28 30 28 42 C 28 52 34 62 44 70" />
      <path d="M 56 78 C 60 76 64 72 66 66" />
    </g>
  `;
}

// Design 3: "The Geometric L-Loop" (Bold, Minimalist Streetwear Monogram)
// A sharp, unmistakable 'L' that sweeps around into a smooth circular loop.
// Extreme clarity at 16x16 favicon size.
function getLLoop(color = '#0F0F11', strokeW = 8) {
  return `
    <g fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
      <!-- Vertical Stem that loops into a complete circle and exits as base -->
      <path d="M 28 20 L 28 54 C 28 68 38 78 52 78 C 66 78 78 66 78 52 C 78 38 66 26 52 26 C 38 26 28 36 28 50 L 28 78 L 76 78" />
    </g>
  `;
}

// Design 4: "The Precision Double Capsule (45-degree Over-Under Weave)"
// True 3D weave of two rounded oblong pills, exactly like the tote bag in the mockup.
function getPrecisionCapsuleWeave(color = '#0F0F11', strokeW = 7) {
  return `
    <g transform="rotate(-42 50 50)" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
      <!-- Loop 1 (Background loop with gap) -->
      <!-- Left side of Loop 1 -->
      <path d="M 38 22 C 26 22 26 36 26 50 C 26 64 26 78 38 78 C 44 78 48 74 49 68" />
      <path d="M 50 48 L 50 32 C 49 26 45 22 38 22 Z" />
      
      <!-- Loop 2 (Foreground loop passing over Loop 1's top-right) -->
      <rect x="36" y="22" width="28" height="56" rx="14" ry="14" />
      
      <!-- Weave patch: Loop 1 passes OVER Loop 2 at the bottom-left -->
      <path d="M 26 44 L 26 56" stroke-width="${strokeW + 0.5}" />
    </g>
  `;
}

// Build Preview HTML
const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LOOPNI — Brand Identity &amp; Logo System</title>
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
    }
    .container { max-width: 1100px; margin: 0 auto; }
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
      font-size: 36px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    p.subtitle {
      font-size: 16px;
      color: var(--muted);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.5;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
      margin-top: 30px;
    }
    @media (max-width: 800px) {
      .grid { grid-template-columns: 1fr; }
    }

    .option-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .option-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
    }
    .option-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 15px;
    }
    .option-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.04em;
    }
    .option-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
      background: #EFECE6;
      padding: 4px 10px;
      border-radius: 12px;
    }

    /* Dual Display (Light & Dark) */
    .displays {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 24px;
    }
    .display-box {
      border-radius: 14px;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border);
      position: relative;
    }
    .display-light { background: #FAF9F6; }
    .display-dark { background: #0F0F11; border-color: #222; }
    .display-box span {
      position: absolute;
      bottom: 8px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.5;
    }
    .display-dark span { color: #FFF; }

    /* Wordmark Lockup */
    .lockup-section {
      background: #FAF9F6;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .lockup-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand-name {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 0.18em;
      line-height: 1;
    }
    .brand-sub {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.22em;
      color: var(--muted);
      margin-top: 4px;
      text-transform: uppercase;
    }

    /* Favicon Scaling Test */
    .fav-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 15px;
      border-top: 1px solid #EEE;
    }
    .fav-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .fav-scales {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .fav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      color: var(--muted);
    }
    .fav-icon-wrapper {
      background: #0F0F11;
      border-radius: 22%;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <span class="badge">Identity Presentation</span>
      <h1>LOOPNI Visual Identity</h1>
      <p class="subtitle">Designed around modern Indian streetwear, everyday durability, and the continuous geometry of the loop.</p>
    </header>

    <div class="grid">
      <!-- Option 1: Interlocking Monogram -->
      <div class="option-card">
        <div class="option-header">
          <div class="option-title">Option 1: The Modernist Twin Loop</div>
          <span class="option-tag">Recommended • Luxury Streetwear</span>
        </div>
        <div class="displays">
          <div class="display-box display-light">
            <svg viewBox="0 0 100 100" width="84" height="84">${getInterlockingMonogram()}</svg>
            <span>Light Surface</span>
          </div>
          <div class="display-box display-dark">
            <svg viewBox="0 0 100 100" width="84" height="84">${getInterlockingMonogram('#FFFFFF')}</svg>
            <span>Dark Surface</span>
          </div>
        </div>
        <div class="lockup-section">
          <div class="lockup-brand">
            <svg viewBox="0 0 100 100" width="38" height="38">${getInterlockingMonogram()}</svg>
            <div>
              <div class="brand-name">LOOPNI</div>
              <div class="brand-sub">Assam • India</div>
            </div>
          </div>
          <span style="font-size: 12px; color: var(--muted); font-weight: 600;">Header Lockup</span>
        </div>
        <div class="fav-section">
          <span class="fav-label">Favicon Clarity Test:</span>
          <div class="fav-scales">
            <div class="fav-item">
              <div class="fav-icon-wrapper" style="width: 24px; height: 24px;">
                <svg viewBox="0 0 100 100" width="16" height="16">${getInterlockingMonogram('#FFFFFF')}</svg>
              </div>
              <span>16px</span>
            </div>
            <div class="fav-item">
              <div class="fav-icon-wrapper" style="width: 38px; height: 38px;">
                <svg viewBox="0 0 100 100" width="26" height="26">${getInterlockingMonogram('#FFFFFF')}</svg>
              </div>
              <span>32px</span>
            </div>
            <div class="fav-item">
              <div class="fav-icon-wrapper" style="width: 52px; height: 52px;">
                <svg viewBox="0 0 100 100" width="38" height="38">${getInterlockingMonogram('#FFFFFF')}</svg>
              </div>
              <span>48px</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Option 2: Architectural L-Loop -->
      <div class="option-card">
        <div class="option-header">
          <div class="option-title">Option 2: The Architectural L-Loop</div>
          <span class="option-tag">Bold • Geometric</span>
        </div>
        <div class="displays">
          <div class="display-box display-light">
            <svg viewBox="0 0 100 100" width="84" height="84">${getLLoop()}</svg>
            <span>Light Surface</span>
          </div>
          <div class="display-box display-dark">
            <svg viewBox="0 0 100 100" width="84" height="84">${getLLoop('#FFFFFF')}</svg>
            <span>Dark Surface</span>
          </div>
        </div>
        <div class="lockup-section">
          <div class="lockup-brand">
            <svg viewBox="0 0 100 100" width="38" height="38">${getLLoop()}</svg>
            <div>
              <div class="brand-name">LOOPNI</div>
              <div class="brand-sub">Everyday Style</div>
            </div>
          </div>
          <span style="font-size: 12px; color: var(--muted); font-weight: 600;">Header Lockup</span>
        </div>
        <div class="fav-section">
          <span class="fav-label">Favicon Clarity Test:</span>
          <div class="fav-scales">
            <div class="fav-item">
              <div class="fav-icon-wrapper" style="width: 24px; height: 24px;">
                <svg viewBox="0 0 100 100" width="16" height="16">${getLLoop('#FFFFFF')}</svg>
              </div>
              <span>16px</span>
            </div>
            <div class="fav-item">
              <div class="fav-icon-wrapper" style="width: 38px; height: 38px;">
                <svg viewBox="0 0 100 100" width="26" height="26">${getLLoop('#FFFFFF')}</svg>
              </div>
              <span>32px</span>
            </div>
            <div class="fav-item">
              <div class="fav-icon-wrapper" style="width: 52px; height: 52px;">
                <svg viewBox="0 0 100 100" width="38" height="38">${getLLoop('#FFFFFF')}</svg>
              </div>
              <span>48px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'brand-presentation.html'), previewHtml);
console.log('Brand presentation generated: brand-presentation.html');
