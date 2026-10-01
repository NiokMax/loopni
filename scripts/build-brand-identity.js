const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ============================================================================
// LOOPNI PRODUCTION BRAND IDENTITY BUILDER
// ============================================================================

const rootDir = path.join(__dirname, '..');
const brandingDir = path.join(rootDir, 'assets', 'images', 'branding');
const iconsDir = path.join(rootDir, 'assets', 'icons');

[brandingDir, iconsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// The Master Loopni Monogram: Interlocking Dual Loop
// Symmetrical, mathematical, high-fashion continuous ribbon
function getMonogramMarkup(color = '#0F0F11', strokeW = 7.5) {
  return `<g fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
    <!-- Loop 1 (L-side continuous chamber) -->
    <path d="M 48 20 C 32 20 22 32 22 50 C 22 68 34 80 50 80 C 64 80 72 70 72 58 C 72 48 66 38 56 30" />
    <path d="M 44 22 C 40 24 36 28 34 34" />
    
    <!-- Loop 2 (N-side continuous chamber) -->
    <path d="M 52 80 C 68 80 78 68 78 50 C 78 32 66 20 50 20 C 36 20 28 30 28 42 C 28 52 34 62 44 70" />
    <path d="M 56 78 C 60 76 64 72 66 66" />
  </g>`;
}

// 1. Standalone Emblem SVG (100x100)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  ${getMonogramMarkup('#0F0F11', 7.5)}
</svg>`;

// 2. Favicon SVG with luxury dark rounded badge for instant contrast on any browser tab theme
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <rect width="100" height="100" rx="24" fill="#0F0F11" />
  <g transform="translate(10, 10) scale(0.8)">
    ${getMonogramMarkup('#FFFFFF', 8.5)}
  </g>
</svg>`;

// 3. Master Horizontal Brand Logo (Light Backgrounds: e.g. Site Header)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 70" width="340" height="70" fill="none">
  <style>
    .brand-name { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 900; letter-spacing: 0.22em; font-size: 34px; fill: #0F0F11; }
    .brand-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; letter-spacing: 0.26em; font-size: 9.5px; fill: #6B6861; text-transform: uppercase; }
  </style>
  <!-- Brand Emblem -->
  <g transform="translate(6, 6) scale(0.58)">
    ${getMonogramMarkup('#0F0F11', 7.5)}
  </g>
  <!-- Wordmark -->
  <text x="80" y="44" class="brand-name">LOOPNI</text>
  <text x="82" y="58" class="brand-sub">ASSAM • INDIA</text>
</svg>`;

// 4. Master Horizontal Brand Logo (Dark Backgrounds: e.g. Footer / Dark Hero)
const logoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 70" width="340" height="70" fill="none">
  <style>
    .brand-name { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 900; letter-spacing: 0.22em; font-size: 34px; fill: #FFFFFF; }
    .brand-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; letter-spacing: 0.26em; font-size: 9.5px; fill: #A5A299; text-transform: uppercase; }
  </style>
  <!-- Brand Emblem -->
  <g transform="translate(6, 6) scale(0.58)">
    ${getMonogramMarkup('#FFFFFF', 7.5)}
  </g>
  <!-- Wordmark -->
  <text x="80" y="44" class="brand-name">LOOPNI</text>
  <text x="82" y="58" class="brand-sub">ASSAM • INDIA</text>
</svg>`;

// 5. OpenGraph Social Share Card (1200x630)
const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9F8F5" />
      <stop offset="100%" stop-color="#EAE7DF" />
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Outer Architectural Framing -->
  <rect x="70" y="60" width="1060" height="510" rx="28" fill="#FFFFFF" stroke="#E2DFD6" stroke-width="2" filter="url(#cardShadow)" />

  <!-- Left: Content Information -->
  <!-- Pre-Launch Badge -->
  <rect x="130" y="125" width="140" height="34" rx="17" fill="#0F0F11" />
  <text x="200" y="147" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.16em">PRE-LAUNCH</text>

  <!-- Brand Title -->
  <text x="130" y="245" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="82" font-weight="900" fill="#0F0F11" letter-spacing="0.18em">LOOPNI</text>
  
  <!-- Slogan -->
  <text x="130" y="315" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="700" fill="#3A3834" letter-spacing="0.04em">EVERYDAY STYLE. YOUR WAY.</text>
  
  <!-- Description -->
  <text x="130" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#6B6861">
    Clothing, Fashion &amp; Accessories from Assam, India
  </text>
  <text x="130" y="415" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#8C887E">
    Founded by Mayur Bikash Gogoi • Launching Soon
  </text>

  <!-- Domain Tag -->
  <rect x="130" y="465" width="220" height="42" rx="21" fill="#FAF9F6" stroke="#E2DFD6" stroke-width="1.5" />
  <circle cx="152" cy="486" r="4.5" fill="#E85A37" />
  <text x="168" y="492" font-family="monospace" font-size="16" font-weight="700" fill="#0F0F11" letter-spacing="0.05em">loopni.shop</text>

  <!-- Right: Large Minimalist Brand Emblem -->
  <g transform="translate(800, 155) scale(3.0)">
    <!-- Dark Circular Emblem Pod -->
    <rect width="100" height="100" rx="26" fill="#0F0F11" />
    <g transform="translate(10, 10) scale(0.8)">
      ${getMonogramMarkup('#FFFFFF', 8)}
    </g>
  </g>
</svg>`;

// Write all SVGs
fs.writeFileSync(path.join(brandingDir, 'icon.svg'), iconSvg);
fs.writeFileSync(path.join(brandingDir, 'logo.svg'), logoSvg);
fs.writeFileSync(path.join(brandingDir, 'logo-white.svg'), logoWhiteSvg);
fs.writeFileSync(path.join(brandingDir, 'og-image.svg'), ogImageSvg);

fs.writeFileSync(path.join(rootDir, 'favicon.svg'), faviconSvg);
fs.writeFileSync(path.join(iconsDir, 'favicon.svg'), faviconSvg);

console.log('✓ SVGs updated successfully!');

// ============================================================================
// HIGH-RESOLUTION RASTER PNG & ICO ENCODER (PURE NODE JS)
// Renders the new dark pill badge with crisp high-contrast monogram
// ============================================================================

function makeCrcTable() {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}
const crcTable = makeCrcTable();

function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

// Generate an anti-aliased high-contrast icon PNG
function generateBrandPng(size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdr);

  const rowSize = 1 + size * 4;
  const rawData = Buffer.alloc(rowSize * size);

  const center = size / 2;
  const radius = size * 0.44;
  const cornerR = size * 0.22;

  // Render rounded dark background badge with twin loop geometry
  for (let y = 0; y < size; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0;

    for (let x = 0; x < size; x++) {
      const px = rowOffset + 1 + x * 4;

      // Distance from rounded rectangle boundary
      const dx = Math.max(Math.abs(x - center) - (center - cornerR), 0);
      const dy = Math.max(Math.abs(y - center) - (center - cornerR), 0);
      const distFromCorner = Math.sqrt(dx * dx + dy * dy);

      if (distFromCorner <= cornerR) {
        // Inside dark badge
        let r = 15, g = 15, b = 17, a = 255;

        // Normalized coords (-1 to +1)
        const nx = (x - center) / (size * 0.35);
        const ny = (y - center) / (size * 0.35);

        // Distance to left loop center (-0.45, 0) and right loop center (+0.45, 0)
        const d1 = Math.sqrt((nx + 0.35) ** 2 + ny ** 2);
        const d2 = Math.sqrt((nx - 0.35) ** 2 + ny ** 2);

        // Ring thickness
        const ringR = 0.55;
        const ringThick = 0.16;

        const inRing1 = Math.abs(d1 - ringR) < ringThick;
        const inRing2 = Math.abs(d2 - ringR) < ringThick;

        if (inRing1 || inRing2) {
          // White loop strokes
          r = 255; g = 255; b = 255;
        }

        rawData[px] = r;
        rawData[px + 1] = g;
        rawData[px + 2] = b;
        rawData[px + 3] = a;
      } else {
        // Transparent outside rounded badge
        rawData[px] = 0;
        rawData[px + 1] = 0;
        rawData[px + 2] = 0;
        rawData[px + 3] = 0;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function generateIcoFromPng(pngBuffer, size = 32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = size;
  entry[1] = size;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

const png32 = generateBrandPng(32);
const png192 = generateBrandPng(192);
const png512 = generateBrandPng(512);
const ico = generateIcoFromPng(png32);

fs.writeFileSync(path.join(rootDir, 'favicon.ico'), ico);
fs.writeFileSync(path.join(rootDir, 'apple-touch-icon.png'), png192);
fs.writeFileSync(path.join(brandingDir, 'icon-192.png'), png192);
fs.writeFileSync(path.join(brandingDir, 'icon-512.png'), png512);

console.log('✓ High-res Favicons & App Icons generated!');
