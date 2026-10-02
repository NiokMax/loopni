const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ============================================================================
// LOOPNI PRODUCTION BRAND IDENTITY BUILDER — "THE L-LOOP"
// Design Thinking:
// 1. Unmistakable Letter "L" for immediate brand recognition.
// 2. Continuous fluid loop at the heel/corner representing "Loopni", woven fabric threads, and endless style.
// 3. Understated elegance: Subtle 2-2.5cm chest embroidery on t-shirts, shirts, and hoodies that enhances garments without overpowering them.
// 4. Maximum clarity at 16x16px for Google Search Console and browser tabs.
// ============================================================================

const rootDir = path.join(__dirname, '..');
const brandingDir = path.join(rootDir, 'assets', 'images', 'branding');
const iconsDir = path.join(rootDir, 'assets', 'icons');

[brandingDir, iconsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// The Master "L-Loop" Monogram Vector
function getLLoopMarkup(color = '#0F0F11', strokeW = 8) {
  return `<g fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 40 16 
             L 40 54 
             C 40 68, 26 76, 18 68 
             C 10 60, 18 48, 30 48 
             C 40 48, 46 60, 54 68 
             L 80 68" />
  </g>`;
}

// 1. Standalone L-Loop Emblem SVG (100x100)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  ${getLLoopMarkup('#0F0F11', 8)}
</svg>`;

// 2. Favicon SVG: Luxury obsidian badge with crisp white L-Loop (Extreme clarity in Google Search Console & browser tabs)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <rect width="100" height="100" rx="22" fill="#0F0F11" />
  <g transform="translate(6, 6) scale(0.88)">
    ${getLLoopMarkup('#FFFFFF', 9)}
  </g>
</svg>`;

// 3. Master Horizontal Brand Logo (Light Backgrounds: e.g. Site Header)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 70" width="340" height="70" fill="none">
  <style>
    .brand-name { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 900; letter-spacing: 0.22em; font-size: 34px; fill: #0F0F11; }
    .brand-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; letter-spacing: 0.26em; font-size: 9.5px; fill: #6B6861; text-transform: uppercase; }
  </style>
  <!-- L-Loop Emblem -->
  <g transform="translate(6, 5) scale(0.60)">
    ${getLLoopMarkup('#0F0F11', 8.5)}
  </g>
  <!-- Wordmark -->
  <text x="76" y="44" class="brand-name">LOOPNI</text>
  <text x="78" y="58" class="brand-sub">ASSAM • INDIA</text>
</svg>`;

// 4. Master Horizontal Brand Logo (Dark Backgrounds: e.g. Footer / Dark Hero)
const logoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 70" width="340" height="70" fill="none">
  <style>
    .brand-name { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 900; letter-spacing: 0.22em; font-size: 34px; fill: #FFFFFF; }
    .brand-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; letter-spacing: 0.26em; font-size: 9.5px; fill: #A5A299; text-transform: uppercase; }
  </style>
  <!-- L-Loop Emblem -->
  <g transform="translate(6, 5) scale(0.60)">
    ${getLLoopMarkup('#FFFFFF', 8.5)}
  </g>
  <!-- Wordmark -->
  <text x="76" y="44" class="brand-name">LOOPNI</text>
  <text x="78" y="58" class="brand-sub">ASSAM • INDIA</text>
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

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect x="70" y="60" width="1060" height="510" rx="28" fill="#FFFFFF" stroke="#E2DFD6" stroke-width="2" filter="url(#cardShadow)" />

  <!-- Info -->
  <rect x="130" y="125" width="140" height="34" rx="17" fill="#0F0F11" />
  <text x="200" y="147" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.16em">PRE-LAUNCH</text>

  <text x="130" y="245" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="82" font-weight="900" fill="#0F0F11" letter-spacing="0.18em">LOOPNI</text>
  <text x="130" y="315" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="700" fill="#3A3834" letter-spacing="0.04em">EVERYDAY STYLE. YOUR WAY.</text>
  
  <text x="130" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#6B6861">
    Clothing, Fashion &amp; Accessories from Assam, India
  </text>
  <text x="130" y="415" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#8C887E">
    Founded by Mayur Bikash Gogoi (@mayurrr__g) • Launching Soon
  </text>

  <!-- Domain Tag -->
  <rect x="130" y="465" width="220" height="42" rx="21" fill="#FAF9F6" stroke="#E2DFD6" stroke-width="1.5" />
  <circle cx="152" cy="486" r="4.5" fill="#E85A37" />
  <text x="168" y="492" font-family="monospace" font-size="16" font-weight="700" fill="#0F0F11" letter-spacing="0.05em">loopni.shop</text>

  <!-- Right: Large Minimalist L-Loop Emblem Pod -->
  <g transform="translate(800, 145) scale(3.1)">
    <rect width="100" height="100" rx="24" fill="#0F0F11" />
    <g transform="translate(6, 6) scale(0.88)">
      ${getLLoopMarkup('#FFFFFF', 9)}
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

console.log('✓ L-Loop SVGs updated successfully!');

// ============================================================================
// HIGH-RESOLUTION RASTER PNG & ICO ENCODER (PURE NODE JS)
// Renders the new dark pill badge with crisp high-contrast L-Loop monogram
// ============================================================================

function makeCrcTable() {
  let c; const table = [];
  for (let n = 0; n < 256; n++) {
    c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c;
  }
  return table;
}
const crcTable = makeCrcTable();
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  return (crc ^ (-1)) >>> 0;
}
function createChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

// Generate crisp L-Loop PNG with anti-aliasing
function generateLLoopPng(size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdr);

  const rowSize = 1 + size * 4;
  const rawData = Buffer.alloc(rowSize * size);

  const center = size / 2;
  const cornerR = size * 0.22;

  // Normalized stroke coordinates for the L-Loop
  // 1. Stem: x = 0.38, y from 0.20 to 0.56
  // 2. Loop: center around (0.28, 0.62), radius ~0.14
  // 3. Base foot: y = 0.68, x from 0.38 to 0.78
  const strokeThick = 0.085;

  for (let y = 0; y < size; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0;

    for (let x = 0; x < size; x++) {
      const px = rowOffset + 1 + x * 4;

      const dx = Math.max(Math.abs(x - center) - (center - cornerR), 0);
      const dy = Math.max(Math.abs(y - center) - (center - cornerR), 0);
      const distFromCorner = Math.sqrt(dx * dx + dy * dy);

      if (distFromCorner <= cornerR) {
        // Dark badge background
        let r = 15, g = 15, b = 17, a = 255;

        const nx = x / size;
        const ny = y / size;

        // Distance to vertical stem of L: x=0.40, y in [0.20, 0.58]
        let dStem = 999;
        if (ny >= 0.18 && ny <= 0.58) {
          dStem = Math.abs(nx - 0.40);
        } else if (ny < 0.18) {
          dStem = Math.sqrt((nx - 0.40) ** 2 + (ny - 0.18) ** 2);
        }

        // Distance to horizontal foot of L: y=0.68, x in [0.46, 0.78]
        let dFoot = 999;
        if (nx >= 0.46 && nx <= 0.78) {
          dFoot = Math.abs(ny - 0.68);
        } else if (nx > 0.78) {
          dFoot = Math.sqrt((nx - 0.78) ** 2 + (ny - 0.68) ** 2);
        }

        // Distance to circular loop knot: center at (0.28, 0.58), radius = 0.11
        const dLoopCenter = Math.sqrt((nx - 0.28) ** 2 + (ny - 0.58) ** 2);
        const dLoopRing = Math.abs(dLoopCenter - 0.11);

        const minDist = Math.min(dStem, dFoot, dLoopRing);

        if (minDist < strokeThick) {
          // White L-Loop stroke
          r = 255; g = 255; b = 255;
        }

        rawData[px] = r;
        rawData[px + 1] = g;
        rawData[px + 2] = b;
        rawData[px + 3] = a;
      } else {
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

const png32 = generateLLoopPng(32);
const png192 = generateLLoopPng(192);
const png512 = generateLLoopPng(512);
const ico = generateIcoFromPng(png32);

fs.writeFileSync(path.join(rootDir, 'favicon.ico'), ico);
fs.writeFileSync(path.join(rootDir, 'apple-touch-icon.png'), png192);
fs.writeFileSync(path.join(brandingDir, 'icon-192.png'), png192);
fs.writeFileSync(path.join(brandingDir, 'icon-512.png'), png512);

console.log('✓ High-res L-Loop Favicons & App Icons generated!');
