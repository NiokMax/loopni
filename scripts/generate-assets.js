const fs = require('fs');
const path = require('path');

const brandingDir = path.join(__dirname, '..', 'assets', 'images', 'branding');
const heroDir = path.join(__dirname, '..', 'assets', 'images', 'hero');
const productsDir = path.join(__dirname, '..', 'assets', 'images', 'products');
const iconsDir = path.join(__dirname, '..', 'assets', 'icons');

[brandingDir, heroDir, productsDir, iconsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 1. Brand Logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" width="280" height="60" fill="none">
  <style>
    .brand-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 800; letter-spacing: 0.18em; font-size: 32px; fill: #111111; }
    .loop-accent { stroke: #111111; stroke-width: 3.5; stroke-linecap: round; }
  </style>
  <text x="5" y="42" class="brand-text">LOOPNI</text>
  <path d="M 12 49 C 25 54, 55 54, 75 49" class="loop-accent" />
</svg>`;

const logoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" width="280" height="60" fill="none">
  <style>
    .brand-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 800; letter-spacing: 0.18em; font-size: 32px; fill: #FFFFFF; }
    .loop-accent { stroke: #FFFFFF; stroke-width: 3.5; stroke-linecap: round; }
  </style>
  <text x="5" y="42" class="brand-text">LOOPNI</text>
  <path d="M 12 49 C 25 54, 55 54, 75 49" class="loop-accent" />
</svg>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <rect width="100" height="100" rx="20" fill="#111111" />
  <text x="50" y="65" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.02em">L</text>
  <circle cx="72" cy="36" r="6" fill="#F4511E" />
</svg>`;

// Open Graph Social Preview Image (1200x630)
const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7F6F2" />
      <stop offset="100%" stop-color="#EAE7DF" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A1A1A" />
      <stop offset="100%" stop-color="#0D0D0D" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect x="80" y="80" width="1040" height="470" rx="24" fill="#FFFFFF" stroke="#E2DFD6" stroke-width="2" />
  
  <rect x="130" y="130" width="120" height="32" rx="16" fill="#111111" />
  <text x="190" y="151" font-family="sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.12em">PRE-LAUNCH</text>
  
  <text x="130" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="76" font-weight="900" fill="#111111" letter-spacing="0.14em">LOOPNI</text>
  <text x="130" y="300" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="700" fill="#444444" letter-spacing="0.02em">EVERYDAY STYLE. YOUR WAY.</text>
  
  <text x="130" y="365" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#666666">
    Clothing &amp; Accessories Made for Everyday Expression
  </text>
  <text x="130" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="500" fill="#888888">
    Founded by Mayur Bikash Gogoi • Assam, India • Shipping Across India Soon
  </text>

  <rect x="130" y="445" width="220" height="50" rx="8" fill="#111111" />
  <text x="240" y="476" font-family="sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.08em">EXPLORE STORE</text>
  
  <text x="1070" y="520" font-family="monospace" font-size="18" font-weight="600" fill="#999999" text-anchor="end">loopni.shop</text>
</svg>`;

// Write brand assets
fs.writeFileSync(path.join(brandingDir, 'logo.svg'), logoSvg);
fs.writeFileSync(path.join(brandingDir, 'logo-white.svg'), logoWhiteSvg);
fs.writeFileSync(path.join(brandingDir, 'icon.svg'), iconSvg);
fs.writeFileSync(path.join(brandingDir, 'og-image.svg'), ogImageSvg);
fs.writeFileSync(path.join(__dirname, '..', 'favicon.svg'), iconSvg);
fs.writeFileSync(path.join(iconsDir, 'favicon.svg'), iconSvg);

// Hero fashion image SVG
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="900" height="1100">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EAE7DF" />
      <stop offset="50%" stop-color="#DCD7CB" />
      <stop offset="100%" stop-color="#CBC4B4" />
    </linearGradient>
    <linearGradient id="garmentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#242424" />
      <stop offset="100%" stop-color="#141414" />
    </linearGradient>
    <linearGradient id="pantGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4B4F43" />
      <stop offset="100%" stop-color="#34372E" />
    </linearGradient>
    <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D79E78" />
      <stop offset="100%" stop-color="#C28660" />
    </linearGradient>
  </defs>
  <!-- Background Studio Setting -->
  <rect width="900" height="1100" fill="url(#heroBg)" />
  <rect x="0" y="920" width="900" height="180" fill="#BDB5A4" opacity="0.4" />
  
  <!-- Architectural Studio Lines -->
  <line x1="140" y1="0" x2="140" y2="1100" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="2" />
  <line x1="760" y1="0" x2="760" y2="1100" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="2" />
  <circle cx="450" cy="520" r="320" fill="#FFFFFF" opacity="0.18" />

  <!-- Shadow below model -->
  <ellipse cx="450" cy="980" rx="220" ry="28" fill="#1C1C18" opacity="0.2" />

  <!-- Human Figure & Streetwear Silhouette (Realistic Fashion Aesthetic) -->
  <!-- Legs / Cargo Pants -->
  <path d="M 370 580 L 335 940 L 415 940 L 440 680 L 465 680 L 490 940 L 570 940 L 530 580 Z" fill="url(#pantGrad)" />
  <!-- Cargo Pocket Details -->
  <rect x="330" y="690" width="55" height="75" rx="6" fill="#3D4136" stroke="#2B2F25" stroke-width="1.5" />
  <rect x="520" y="690" width="55" height="75" rx="6" fill="#3D4136" stroke="#2B2F25" stroke-width="1.5" />
  <path d="M 330 690 L 385 690 L 380 710 L 335 710 Z" fill="#2B2F25" />
  <path d="M 520 690 L 575 690 L 570 710 L 525 710 Z" fill="#2B2F25" />
  
  <!-- Sneakers -->
  <path d="M 320 935 Q 310 970 330 975 L 420 975 Q 430 960 415 935 Z" fill="#FBFBF9" stroke="#E5E4DE" stroke-width="2" />
  <path d="M 485 935 Q 470 960 480 975 L 570 975 Q 590 970 580 935 Z" fill="#FBFBF9" stroke="#E5E4DE" stroke-width="2" />
  <rect x="320" y="965" width="100" height="10" rx="3" fill="#D8D6CE" />
  <rect x="480" y="965" width="100" height="10" rx="3" fill="#D8D6CE" />

  <!-- Torso & Oversized Tee / Jacket -->
  <path d="M 330 250 Q 450 260 570 250 L 610 430 L 535 460 L 515 360 L 525 610 L 375 610 L 385 360 L 365 460 L 290 430 Z" fill="url(#garmentGrad)" />
  <!-- Fold lines / subtle crease details -->
  <path d="M 410 320 Q 450 350 490 320" stroke="#333333" stroke-width="2" fill="none" opacity="0.6" />
  <path d="M 425 400 Q 460 440 480 400" stroke="#333333" stroke-width="2" fill="none" opacity="0.5" />
  <path d="M 415 500 Q 450 530 485 500" stroke="#333333" stroke-width="2" fill="none" opacity="0.5" />
  
  <!-- Neck / Collarbone -->
  <path d="M 415 250 Q 450 270 485 250 L 480 180 L 420 180 Z" fill="url(#skinTone)" />
  <!-- Collar Rib -->
  <path d="M 415 245 Q 450 270 485 245 Q 450 280 415 245 Z" fill="#2E2E2E" />

  <!-- Arms -->
  <path d="M 290 430 L 265 540 L 305 550 L 335 440 Z" fill="url(#skinTone)" />
  <path d="M 610 430 L 635 540 L 595 550 L 565 440 Z" fill="url(#skinTone)" />

  <!-- Head & Hairstyle -->
  <path d="M 415 170 Q 410 85 450 85 Q 490 85 485 170 Q 450 205 415 170 Z" fill="url(#skinTone)" />
  <!-- Modern Hair Cut -->
  <path d="M 410 130 Q 405 70 450 65 Q 495 70 490 130 Q 470 95 450 95 Q 430 95 410 130 Z" fill="#1C1816" />

  <!-- Crossbody Bag Accessory -->
  <path d="M 370 250 L 530 480 L 500 500 L 340 270 Z" fill="#181818" />
  <rect x="470" y="440" width="80" height="95" rx="10" fill="#222222" stroke="#383838" stroke-width="2" transform="rotate(-15 470 440)" />

  <!-- Subtle Editorial Watermark Overlay -->
  <text x="850" y="1040" font-family="-apple-system, sans-serif" font-weight="800" font-size="28" fill="#111111" opacity="0.35" text-anchor="end" letter-spacing="0.2em">LOOPNI • 2026</text>
  <text x="50" y="1040" font-family="-apple-system, sans-serif" font-weight="600" font-size="14" fill="#111111" opacity="0.5" letter-spacing="0.1em">LOOKBOOK 01 / GUWAHATI &amp; ASSAM</text>
</svg>`;

fs.writeFileSync(path.join(heroDir, 'hero-fashion.svg'), heroSvg);

// About page story graphic
const aboutStorySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="abg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F4F1EA" />
      <stop offset="100%" stop-color="#E2DCD0" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" rx="16" fill="url(#abg)" />
  <!-- Studio sketches & fabric swatches motif -->
  <rect x="60" y="60" width="320" height="420" rx="12" fill="#FFFFFF" stroke="#D3CDC0" stroke-width="2" />
  <text x="90" y="110" font-family="sans-serif" font-size="20" font-weight="800" fill="#111111" letter-spacing="0.1em">LOOPNI STUDIO</text>
  <text x="90" y="140" font-family="sans-serif" font-size="13" font-weight="500" fill="#666666">Assam, India • Design Notes</text>
  <line x1="90" y1="165" x2="330" y2="165" stroke="#EAE7DF" stroke-width="1.5" />
  <text x="90" y="200" font-family="monospace" font-size="12" fill="#444444">• 100% Combed Indian Cotton</text>
  <text x="90" y="230" font-family="monospace" font-size="12" fill="#444444">• 240 GSM Drop Shoulder Cut</text>
  <text x="90" y="260" font-family="monospace" font-size="12" fill="#444444">• Earth tones &amp; functional wear</text>
  <text x="90" y="290" font-family="monospace" font-size="12" fill="#444444">• Accessible everyday fashion</text>
  <text x="90" y="320" font-family="monospace" font-size="12" fill="#444444">• Founder: Mayur Bikash Gogoi</text>

  <!-- Fabric Swatch Cards -->
  <rect x="420" y="60" width="320" height="210" rx="12" fill="#242424" />
  <text x="450" y="105" font-family="sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" letter-spacing="0.1em">FABRIC SPECS</text>
  <text x="450" y="145" font-family="sans-serif" font-size="28" font-weight="900" fill="#F4511E">240 GSM</text>
  <text x="450" y="180" font-family="sans-serif" font-size="14" font-weight="400" fill="#AAAAAA">Heavyweight Combed Cotton</text>

  <rect x="420" y="290" width="320" height="230" rx="12" fill="#3D4538" />
  <text x="450" y="335" font-family="sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" letter-spacing="0.1em">COLOR PALETTE</text>
  <circle cx="465" cy="385" r="22" fill="#1C1C1C" stroke="#FFFFFF" stroke-width="2" />
  <circle cx="525" cy="385" r="22" fill="#F5F5F0" stroke="#FFFFFF" stroke-width="2" />
  <circle cx="585" cy="385" r="22" fill="#4B5340" stroke="#FFFFFF" stroke-width="2" />
  <circle cx="645" cy="385" r="22" fill="#C2A878" stroke="#FFFFFF" stroke-width="2" />
  <text x="450" y="450" font-family="sans-serif" font-size="13" font-weight="400" fill="#DDDDDD">Muted earth tones &amp; timeless monocromes</text>

  <!-- Bottom Quote -->
  <rect x="60" y="500" width="680" height="60" rx="8" fill="#FFFFFF" stroke="#D3CDC0" stroke-width="1.5" />
  <text x="90" y="536" font-family="sans-serif" font-size="14" font-weight="600" fill="#222222">"Everyday clothing should be simple, wearable, and honest." — Mayur Bikash Gogoi</text>
</svg>`;

fs.writeFileSync(path.join(brandingDir, 'about-story.svg'), aboutStorySvg);

// Now generate realistic product SVGs for all 12 products (2 views each)
const productVisuals = [
  {
    name: 'oversized-black-tshirt',
    category: 'tshirt',
    color1: '#1A1A1A',
    color2: '#282828',
    detail: 'Oversized drop-shoulder profile',
    sub: 'Heavyweight 240 GSM Combed Cotton'
  },
  {
    name: 'classic-white-tshirt',
    category: 'tshirt',
    color1: '#F8F8F6',
    color2: '#ECECE8',
    detail: 'Classic tailored crewneck profile',
    sub: '200 GSM Ring-Spun Cotton'
  },
  {
    name: 'minimal-graphic-tee',
    category: 'tshirt',
    color1: '#758273',
    color2: '#616F5F',
    detail: 'Clean typographic print front',
    sub: '220 GSM Streetwear Cut'
  },
  {
    name: 'relaxed-fit-hoodie',
    category: 'hoodie',
    color1: '#2E3033',
    color2: '#222325',
    detail: 'Structured double-lined hood',
    sub: '360 GSM Cotton Fleece'
  },
  {
    name: 'essential-sweatshirt',
    category: 'sweatshirt',
    color1: '#2B4031',
    color2: '#1F3024',
    detail: 'Plush brushed loopback fleece',
    sub: '320 GSM Crewneck'
  },
  {
    name: 'everyday-cargo-pants',
    category: 'pants',
    color1: '#434A3B',
    color2: '#353B2E',
    detail: '6-pocket utility construction',
    sub: 'Heavy Cotton Twill Weave'
  },
  {
    name: 'streetwear-joggers',
    category: 'joggers',
    color1: '#2A2927',
    color2: '#1E1D1B',
    detail: 'Concealed zip pockets & cuffs',
    sub: '300 GSM French Terry'
  },
  {
    name: 'casual-overshirt',
    category: 'overshirt',
    color1: '#9C886B',
    color2: '#877356',
    detail: 'Dual flap pockets & woven texture',
    sub: 'Heavy Textured Cotton'
  },
  {
    name: 'baseball-cap',
    category: 'cap',
    color1: '#242424',
    color2: '#1B1B1B',
    detail: 'Unstructured 6-panel washed canvas',
    sub: 'Antique Brass Slider'
  },
  {
    name: 'crossbody-bag',
    category: 'bag',
    color1: '#1F2022',
    color2: '#161718',
    detail: 'Dual zip waterproof compartments',
    sub: 'Ballistic Nylon Shell'
  },
  {
    name: 'everyday-tote-bag',
    category: 'tote',
    color1: '#ECE8DF',
    color2: '#D9D3C5',
    detail: '14oz heavy unbleached canvas',
    sub: 'Reinforced Boxed Bottom'
  },
  {
    name: 'canvas-belt',
    category: 'belt',
    color1: '#262624',
    color2: '#1A1A18',
    detail: 'Oxidized black clamp buckle',
    sub: 'High-Tensile Woven Webbing'
  }
];

function generateProductSvg(item, view = 1) {
  const isWhite = item.color1.toLowerCase().includes('#f8') || item.color1.toLowerCase().includes('#ec');
  const textColor = isWhite ? '#111111' : '#FFFFFF';
  const strokeColor = isWhite ? '#D0CDC4' : 'rgba(255,255,255,0.15)';
  const viewLabel = view === 1 ? 'FRONT VIEW' : 'DETAIL VIEW';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F6F5F1" />
      <stop offset="100%" stop-color="#E9E6DC" />
    </linearGradient>
    <linearGradient id="prodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.color1}" />
      <stop offset="100%" stop-color="${item.color2}" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#1A1814" flood-opacity="0.12"/>
    </filter>
  </defs>
  
  <!-- Canvas Background -->
  <rect width="800" height="1000" fill="url(#bgGrad)" />
  
  <!-- Subtle Studio Grid -->
  <line x1="60" y1="60" x2="740" y2="60" stroke="#DFDBD0" stroke-width="1" />
  <line x1="60" y1="940" x2="740" y2="940" stroke="#DFDBD0" stroke-width="1" />

  <!-- Editorial Metadata -->
  <text x="70" y="95" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="700" letter-spacing="0.16em" fill="#8C887E">LOOPNI / COLLECTION 01</text>
  <text x="730" y="95" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="700" letter-spacing="0.18em" fill="#8C887E" text-anchor="end">${viewLabel}</text>

  <!-- Product Silhouette Render Based on Type -->
  <g filter="url(#shadow)">
    ${renderProductShape(item, view, textColor, strokeColor)}
  </g>

  <!-- Bottom Spec Tag -->
  <rect x="70" y="875" width="660" height="50" rx="8" fill="#FFFFFF" fill-opacity="0.85" stroke="#DFDBD0" stroke-width="1" />
  <text x="95" y="906" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#222222" letter-spacing="0.04em">${item.detail}</text>
  <text x="705" y="906" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="500" fill="#777777" text-anchor="end">${item.sub}</text>
</svg>`;
}

function renderProductShape(item, view, textColor, strokeColor) {
  const cat = item.category;
  if (cat === 'tshirt') {
    if (view === 1) {
      return `
        <!-- T-Shirt Silhouette Front -->
        <path d="M 270 260 Q 400 275 530 260 L 640 370 L 565 425 L 530 365 L 540 760 L 260 760 L 270 365 L 235 425 L 160 370 Z" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2" />
        <path d="M 345 262 Q 400 310 455 262 Q 400 285 345 262 Z" fill="#222" opacity="0.25" />
        <path d="M 345 262 Q 400 310 455 262" stroke="${strokeColor}" stroke-width="2" fill="none" />
        ${item.name.includes('Graphic') ? `
          <rect x="340" y="390" width="120" height="140" rx="4" fill="rgba(255,255,255,0.06)" />
          <text x="400" y="445" font-family="sans-serif" font-size="16" font-weight="900" fill="${textColor}" text-anchor="middle" letter-spacing="0.2em">LOOPNI</text>
          <text x="400" y="475" font-family="monospace" font-size="10" font-weight="600" fill="${textColor}" text-anchor="middle" opacity="0.75">EST. ASSAM</text>
        ` : `
          <text x="400" y="345" font-family="sans-serif" font-size="11" font-weight="600" fill="${textColor}" text-anchor="middle" letter-spacing="0.15em" opacity="0.4">LOOPNI</text>
        `}
      `;
    } else {
      return `
        <!-- T-Shirt Silhouette Detail / Back -->
        <path d="M 270 260 Q 400 270 530 260 L 640 370 L 565 425 L 530 365 L 540 760 L 260 760 L 270 365 L 235 425 L 160 370 Z" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2" />
        <path d="M 345 262 Q 400 280 455 262" stroke="${strokeColor}" stroke-width="3" fill="none" />
        <!-- Close up hem/tag detail -->
        <rect x="360" y="320" width="80" height="45" rx="4" fill="rgba(255,255,255,0.08)" stroke="${strokeColor}" stroke-width="1.5" />
        <text x="400" y="342" font-family="sans-serif" font-size="10" font-weight="700" fill="${textColor}" text-anchor="middle">LOOPNI • 100%</text>
        <text x="400" y="356" font-family="sans-serif" font-size="9" fill="${textColor}" text-anchor="middle" opacity="0.7">MADE IN INDIA</text>
      `;
    }
  } else if (cat === 'hoodie' || cat === 'sweatshirt' || cat === 'overshirt') {
    return `
      <!-- Hoodie / Sweatshirt Silhouette -->
      <path d="M 255 270 L 320 220 Q 400 240 480 220 L 545 270 L 665 400 L 585 455 L 545 375 L 550 770 L 250 770 L 255 375 L 215 455 L 135 400 Z" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2" />
      ${cat === 'hoodie' ? `
        <!-- Hood Outline & Kangaroo Pocket -->
        <path d="M 320 220 Q 400 170 480 220 Q 400 260 320 220 Z" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2" />
        <path d="M 300 570 L 500 570 L 530 680 L 270 680 Z" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="1.5" opacity="0.9" />
      ` : `
        <!-- Crewneck / Collar -->
        <path d="M 335 240 Q 400 275 465 240" stroke="${strokeColor}" stroke-width="4" fill="none" />
      `}
      <rect x="250" y="740" width="300" height="30" fill="rgba(0,0,0,0.15)" stroke="${strokeColor}" stroke-width="1" />
    `;
  } else if (cat === 'pants' || cat === 'joggers') {
    return `
      <!-- Pants / Cargos / Joggers Silhouette -->
      <path d="M 285 240 L 515 240 L 550 780 L 460 780 L 415 440 L 400 440 L 340 780 L 250 780 Z" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2" />
      <!-- Waistband -->
      <rect x="285" y="240" width="230" height="36" fill="rgba(0,0,0,0.18)" stroke="${strokeColor}" stroke-width="1.5" />
      <!-- Cargo / Pocket Accents -->
      <rect x="260" y="450" width="55" height="90" rx="6" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="1.5" />
      <rect x="485" y="450" width="55" height="90" rx="6" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="1.5" />
      <!-- Ankle Cuffs -->
      <rect x="250" y="760" width="90" height="20" fill="rgba(0,0,0,0.25)" />
      <rect x="460" y="760" width="90" height="20" fill="rgba(0,0,0,0.25)" />
    `;
  } else if (cat === 'cap') {
    return `
      <!-- Baseball Cap Silhouette -->
      <path d="M 230 460 Q 230 300 400 300 Q 570 300 570 460 Z" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2" />
      <!-- Curved Visor Brim -->
      <path d="M 200 460 Q 400 450 600 460 Q 640 500 570 515 Q 400 495 230 515 Q 160 500 200 460 Z" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2" />
      <!-- Button on top -->
      <circle cx="400" cy="298" r="10" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2" />
      <!-- Embroidered Eyelets -->
      <circle cx="340" cy="380" r="4" fill="#555" />
      <circle cx="400" cy="370" r="4" fill="#555" />
      <circle cx="460" cy="380" r="4" fill="#555" />
    `;
  } else if (cat === 'bag' || cat === 'tote') {
    if (cat === 'tote') {
      return `
        <!-- Tote Bag Handles & Body -->
        <path d="M 330 380 L 330 200 Q 400 180 470 200 L 470 380" stroke="${strokeColor}" stroke-width="14" fill="none" stroke-linecap="round" />
        <rect x="250" y="380" width="300" height="380" rx="10" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2" />
        <text x="400" y="550" font-family="sans-serif" font-size="24" font-weight="900" fill="${textColor}" text-anchor="middle" letter-spacing="0.18em">LOOPNI</text>
        <text x="400" y="585" font-family="sans-serif" font-size="12" font-weight="600" fill="${textColor}" text-anchor="middle" opacity="0.6">EVERYDAY CANVAS</text>
      `;
    } else {
      return `
        <!-- Crossbody Bag -->
        <path d="M 210 240 L 590 620" stroke="#111" stroke-width="24" stroke-linecap="round" />
        <rect x="270" y="360" width="260" height="200" rx="20" fill="url(#prodGrad)" stroke="${strokeColor}" stroke-width="2.5" />
        <line x1="290" y1="410" x2="510" y2="410" stroke="#444" stroke-width="4" stroke-linecap="round" />
        <rect x="360" y="470" width="80" height="24" rx="4" fill="rgba(255,255,255,0.08)" />
        <text x="400" y="486" font-family="sans-serif" font-size="11" font-weight="800" fill="${textColor}" text-anchor="middle" letter-spacing="0.15em">LOOPNI</text>
      `;
    }
  } else if (cat === 'belt') {
    return `
      <!-- Tactical Belt Coil & Buckle -->
      <path d="M 240 500 Q 240 340 400 340 Q 560 340 560 500 Q 560 640 400 640 Q 280 640 280 520" stroke="url(#prodGrad)" stroke-width="42" fill="none" stroke-linecap="round" />
      <rect x="360" y="315" width="85" height="52" rx="6" fill="#151515" stroke="#444" stroke-width="3" />
      <rect x="375" y="332" width="55" height="18" rx="2" fill="#2E2E2E" />
    `;
  }
}

// Generate all product images
productVisuals.forEach(item => {
  const svg1 = generateProductSvg(item, 1);
  const svg2 = generateProductSvg(item, 2);
  fs.writeFileSync(path.join(productsDir, `${item.name}-1.svg`), svg1);
  fs.writeFileSync(path.join(productsDir, `${item.name}-2.svg`), svg2);
});

console.log('Successfully generated all brand, hero, and product assets!');
