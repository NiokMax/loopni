const fs = require('fs');
const path = require('path');

// Design A: Geometric Interlocking Dual Loop (Embossed Weave, L + N monogram)
// In a 100x100 canvas, centered at (50, 50)
function designA(strokeColor = '#0F0F11', strokeW = 8) {
  return `
    <g fill="none" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
      <!-- Left Loop (forms 'L' silhouette) -->
      <path d="M 40 24 C 28 24 20 34 20 48 C 20 62 30 76 46 76 C 58 76 68 66 68 52 C 68 46 65 40 60 35" />
      <!-- Right Loop (forms 'N' completion & loop) -->
      <path d="M 60 76 C 72 76 80 66 80 52 C 80 38 70 24 54 24 C 42 24 32 34 32 48 C 32 54 35 60 40 65" />
    </g>
  `;
}

// Design B: The Continuous Mobius / Infinity Ribbon
// A single continuous line that flows from top to bottom, looping in 3D perspective
function designB(strokeColor = '#0F0F11', strokeW = 7.5) {
  return `
    <g fill="none" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
      <!-- Outer continuous path -->
      <path d="M 30 70 C 18 56 18 36 32 26 C 46 16 62 26 70 42 L 72 46 C 80 62 86 74 72 82 C 58 90 44 76 38 64 L 36 60 C 28 44 38 28 52 28 C 66 28 78 40 76 56" />
    </g>
  `;
}

// Design C: The Architectural "L-Loop" (Bold Minimalist Monogram)
// Clean vertical stem that flows into a circular loop, cutting back through itself
function designC(strokeColor = '#0F0F11', strokeW = 8) {
  return `
    <g fill="none" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
      <!-- Left Stem dropping into lower loop -->
      <path d="M 28 22 L 28 60 C 28 72 38 80 50 80 C 66 80 78 68 78 52 C 78 36 66 24 50 24 C 36 24 26 34 26 48 C 26 56 31 62 38 67 L 76 67" />
    </g>
  `;
}

// Design D: The Precision Diagonal Pill Link (Matches our photorealistic mockup!)
// Two diagonal pills linked at 45 degrees
function designD(strokeColor = '#0F0F11', strokeW = 7.5) {
  return `
    <g fill="none" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
      <!-- Loop 1 (Diagonal Pill L-side) -->
      <path d="M 38 22 C 26 22 20 30 24 44 L 40 70 C 44 76 52 80 60 76 C 68 72 68 62 64 56 L 50 32 C 48 26 44 22 38 22 Z" />
      <!-- Loop 2 (Diagonal Pill N-side) overlapping with weave break -->
      <path d="M 62 78 C 74 78 80 70 76 56 L 60 30 C 56 24 48 20 40 24 C 32 28 32 38 36 44 L 42 54" />
      <path d="M 48 64 L 50 68 C 52 74 56 78 62 78 Z" />
    </g>
  `;
}

// Design E: The Pure Geometric Interlocking Ribbon (Two concentric racetrack loops at 40deg)
function designE(strokeColor = '#0F0F11', strokeW = 7) {
  return `
    <g fill="none" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
      <!-- Primary Loop -->
      <path d="M 34 26 C 22 26 16 38 22 52 L 36 72 C 42 80 54 80 62 74 C 70 68 68 56 62 46 L 52 30 C 46 22 38 26 34 26 Z" />
      <!-- Counter Loop with over/under clearance -->
      <path d="M 66 74 C 78 74 84 62 78 48 L 64 28 C 58 20 46 20 38 26 C 30 32 32 44 38 54 L 44 62" />
      <path d="M 52 72 C 56 74 61 74 66 74 Z" />
    </g>
  `;
}

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Loopni Logo Design Exploration</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #F8F7F4; color: #111; padding: 40px; margin: 0; }
    h1 { font-size: 24px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
    p { color: #666; margin-bottom: 30px; font-size: 14px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .card { background: #FFF; border-radius: 16px; padding: 24px; border: 1px solid #E8E5DF; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .card h3 { font-size: 15px; margin: 0 0 16px 0; letter-spacing: 0.05em; color: #222; }
    .preview-box { display: flex; align-items: center; justify-content: center; height: 140px; background: #FAFAF8; border-radius: 12px; margin-bottom: 16px; border: 1px solid #EEE; }
    .dark-box { background: #111; }
    .sizes-row { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
    .wordmark-row { display: flex; align-items: center; gap: 12px; font-size: 20px; font-weight: 800; letter-spacing: 0.18em; }
    svg { display: block; }
  </style>
</head>
<body>
  <h1>Loopni Brandmark &amp; Favicon Exploration</h1>
  <p>Minimalist luxury apparel brand mark designs: Tested across scales from 16px favicon to wordmark lockup.</p>

  <div class="grid">
    <div class="card">
      <h3>Design A: Harmonious Dual-Loop (L + N Interlock)</h3>
      <div class="preview-box">
        <svg viewBox="0 0 100 100" width="80" height="80">${designA()}</svg>
      </div>
      <div class="preview-box dark-box">
        <svg viewBox="0 0 100 100" width="80" height="80">${designA('#FFFFFF')}</svg>
      </div>
      <div class="sizes-row">
        <span>16px: <svg viewBox="0 0 100 100" width="16" height="16">${designA()}</svg></span>
        <span>32px: <svg viewBox="0 0 100 100" width="32" height="32">${designA()}</svg></span>
        <span>48px: <svg viewBox="0 0 100 100" width="48" height="48">${designA()}</svg></span>
      </div>
      <div class="wordmark-row">
        <svg viewBox="0 0 100 100" width="32" height="32">${designA()}</svg>
        <span>LOOPNI</span>
      </div>
    </div>

    <div class="card">
      <h3>Design B: Infinity Ribbon Knot</h3>
      <div class="preview-box">
        <svg viewBox="0 0 100 100" width="80" height="80">${designB()}</svg>
      </div>
      <div class="preview-box dark-box">
        <svg viewBox="0 0 100 100" width="80" height="80">${designB('#FFFFFF')}</svg>
      </div>
      <div class="sizes-row">
        <span>16px: <svg viewBox="0 0 100 100" width="16" height="16">${designB()}</svg></span>
        <span>32px: <svg viewBox="0 0 100 100" width="32" height="32">${designB()}</svg></span>
        <span>48px: <svg viewBox="0 0 100 100" width="48" height="48">${designB()}</svg></span>
      </div>
      <div class="wordmark-row">
        <svg viewBox="0 0 100 100" width="32" height="32">${designB()}</svg>
        <span>LOOPNI</span>
      </div>
    </div>

    <div class="card">
      <h3>Design C: Architectural L-Loop</h3>
      <div class="preview-box">
        <svg viewBox="0 0 100 100" width="80" height="80">${designC()}</svg>
      </div>
      <div class="preview-box dark-box">
        <svg viewBox="0 0 100 100" width="80" height="80">${designC('#FFFFFF')}</svg>
      </div>
      <div class="sizes-row">
        <span>16px: <svg viewBox="0 0 100 100" width="16" height="16">${designC()}</svg></span>
        <span>32px: <svg viewBox="0 0 100 100" width="32" height="32">${designC()}</svg></span>
        <span>48px: <svg viewBox="0 0 100 100" width="48" height="48">${designC()}</svg></span>
      </div>
      <div class="wordmark-row">
        <svg viewBox="0 0 100 100" width="32" height="32">${designC()}</svg>
        <span>LOOPNI</span>
      </div>
    </div>

    <div class="card">
      <h3>Design D: Tilted Woven Pill Monogram</h3>
      <div class="preview-box">
        <svg viewBox="0 0 100 100" width="80" height="80">${designD()}</svg>
      </div>
      <div class="preview-box dark-box">
        <svg viewBox="0 0 100 100" width="80" height="80">${designD('#FFFFFF')}</svg>
      </div>
      <div class="sizes-row">
        <span>16px: <svg viewBox="0 0 100 100" width="16" height="16">${designD()}</svg></span>
        <span>32px: <svg viewBox="0 0 100 100" width="32" height="32">${designD()}</svg></span>
        <span>48px: <svg viewBox="0 0 100 100" width="48" height="48">${designD()}</svg></span>
      </div>
      <div class="wordmark-row">
        <svg viewBox="0 0 100 100" width="32" height="32">${designD()}</svg>
        <span>LOOPNI</span>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'logo-preview.html'), html);
console.log('Preview generated: logo-preview.html');
