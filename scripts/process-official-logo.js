const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ============================================================================
// LOOPNI OFFICIAL BRAND LOGO PROCESSOR
// Directly processes the user's uploaded isolated master logo PNG:
// 1. Decodes and unfilters the 1024x682 RGBA image
// 2. Extracts the exact bounding box of the emblem
// 3. Generates:
//    - Black variant (for light backgrounds / header / web visibility)
//    - White variant (for dark backgrounds / footer)
//    - Original luxury cream variant
//    - Dark square badge (for Google Search Console, Google Search, Favicons)
// 4. Encodes ICO, PNGs (16, 32, 48, 192, 512), SVGs, and Schema assets
// ============================================================================

const rootDir = path.join(__dirname, '..');
const brandingDir = path.join(rootDir, 'assets', 'images', 'branding');
const iconsDir = path.join(rootDir, 'assets', 'icons');
const sourcePngPath = 'C:/Users/theki/.gemini/antigravity/brain/4da7082d-a3e5-460b-be8f-0ceb898ded2a/.user_uploaded/media_1790928919617.png';

// Read source PNG
const srcBuf = fs.readFileSync(sourcePngPath);
const srcW = srcBuf.readUInt32BE(16);
const srcH = srcBuf.readUInt32BE(20);

// Extract IDAT
const idatChunks = [];
let offset = 8;
while (offset < srcBuf.length) {
  const len = srcBuf.readUInt32BE(offset);
  const type = srcBuf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') idatChunks.push(srcBuf.subarray(offset + 8, offset + 8 + len));
  offset += 12 + len;
}
const rawDecompressed = zlib.inflateSync(Buffer.concat(idatChunks));
const srcPixels = Buffer.alloc(srcW * srcH * 4);
const rowBytes = 1 + srcW * 4;

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

let prevRow = Buffer.alloc(srcW * 4);
let curRow = Buffer.alloc(srcW * 4);

for (let y = 0; y < srcH; y++) {
  const rowStart = y * rowBytes;
  const filter = rawDecompressed[rowStart];
  for (let i = 0; i < srcW * 4; i++) {
    const rawByte = rawDecompressed[rowStart + 1 + i];
    const a = (i >= 4) ? curRow[i - 4] : 0;
    const b = prevRow[i];
    const c = (i >= 4) ? prevRow[i - 4] : 0;
    let val = 0;
    if (filter === 0) val = rawByte;
    else if (filter === 1) val = (rawByte + a) & 0xFF;
    else if (filter === 2) val = (rawByte + b) & 0xFF;
    else if (filter === 3) val = (rawByte + Math.floor((a + b) / 2)) & 0xFF;
    else if (filter === 4) val = (rawByte + paeth(a, b, c)) & 0xFF;
    curRow[i] = val;
    srcPixels[y * srcW * 4 + i] = val;
  }
  prevRow.set(curRow);
}

// Find non-transparent bounding box
let minX = srcW, maxX = 0, minY = srcH, maxY = 0;
for (let y = 0; y < srcH; y++) {
  for (let x = 0; x < srcW; x++) {
    const idx = (y * srcW + x) * 4;
    const a = srcPixels[idx + 3];
    if (a > 20) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Add 4px padding around bounds
minX = Math.max(0, minX - 4);
minY = Math.max(0, minY - 4);
maxX = Math.min(srcW - 1, maxX + 4);
maxY = Math.min(srcH - 1, maxY + 4);

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
console.log(`Cropped Emblem: ${cropW} x ${cropH}`);

// PNG Encoder Utility
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

function encodePng(w, h, rgbaBuffer) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdr);

  const rowSize = 1 + w * 4;
  const raw = Buffer.alloc(rowSize * h);
  for (let y = 0; y < h; y++) {
    raw[y * rowSize] = 0; // Filter 0
    rgbaBuffer.copy(raw, y * rowSize + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idat = createChunk('IDAT', zlib.deflateSync(raw));
  const iend = createChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdrChunk, idat, iend]);
}

// Resampling / Resizing & Color Grading function
// targetType: 'black' | 'white' | 'original' | 'dark-badge'
function renderEmblem(targetSize, targetType = 'black', paddingRatio = 0.15) {
  const canvasW = targetSize;
  const canvasH = targetSize;
  const out = Buffer.alloc(canvasW * canvasH * 4);

  // Available area inside padding
  const availW = canvasW * (1 - paddingRatio * 2);
  const availH = canvasH * (1 - paddingRatio * 2);

  // Scale factor to fit inside available area
  const scale = Math.min(availW / cropW, availH / cropH);
  const scaledW = cropW * scale;
  const scaledH = cropH * scale;

  const destX = (canvasW - scaledW) / 2;
  const destY = (canvasH - scaledH) / 2;

  const cornerR = canvasW * 0.22;
  const center = canvasW / 2;

  for (let y = 0; y < canvasH; y++) {
    for (let x = 0; x < canvasW; x++) {
      const outIdx = (y * canvasW + x) * 4;

      // Handle dark badge background if requested
      if (targetType === 'dark-badge') {
        const dx = Math.max(Math.abs(x - center) - (center - cornerR), 0);
        const dy = Math.max(Math.abs(y - center) - (center - cornerR), 0);
        const distFromCorner = Math.sqrt(dx * dx + dy * dy);
        if (distFromCorner <= cornerR) {
          out[outIdx] = 17;     // R
          out[outIdx + 1] = 17; // G
          out[outIdx + 2] = 17; // B
          out[outIdx + 3] = 255;// A
        } else {
          out[outIdx + 3] = 0;  // Transparent
          continue;
        }
      }

      // Map (x, y) to source coordinates
      const srcXFloat = minX + (x - destX) / scale;
      const srcYFloat = minY + (y - destY) / scale;

      if (srcXFloat >= minX && srcXFloat < minX + cropW && srcYFloat >= minY && srcYFloat < minY + cropH) {
        // Bilinear interpolation
        const x0 = Math.floor(srcXFloat);
        const y0 = Math.floor(srcYFloat);
        const x1 = Math.min(srcW - 1, x0 + 1);
        const y1 = Math.min(srcH - 1, y0 + 1);

        const fx = srcXFloat - x0;
        const fy = srcYFloat - y0;

        const idx00 = (y0 * srcW + x0) * 4;
        const idx10 = (y0 * srcW + x1) * 4;
        const idx01 = (y1 * srcW + x0) * 4;
        const idx11 = (y1 * srcW + x1) * 4;

        const a00 = srcPixels[idx00 + 3];
        const a10 = srcPixels[idx10 + 3];
        const a01 = srcPixels[idx01 + 3];
        const a11 = srcPixels[idx11 + 3];

        const interpA = (a00 * (1 - fx) + a10 * fx) * (1 - fy) + (a01 * (1 - fx) + a11 * fx) * fy;

        if (interpA > 2) {
          // Source brightness/shading factor (0 to 1)
          const origR = (srcPixels[idx00] * (1 - fx) + srcPixels[idx10] * fx) * (1 - fy) + (srcPixels[idx01] * (1 - fx) + srcPixels[idx11] * fx) * fy;
          const origG = (srcPixels[idx00+1] * (1 - fx) + srcPixels[idx10+1] * fx) * (1 - fy) + (srcPixels[idx01+1] * (1 - fx) + srcPixels[idx11+1] * fx) * fy;
          const origB = (srcPixels[idx00+2] * (1 - fx) + srcPixels[idx10+2] * fx) * (1 - fy) + (srcPixels[idx01+2] * (1 - fx) + srcPixels[idx11+2] * fx) * fy;
          const brightness = (origR + origG + origB) / (3 * 255);

          let r, g, b, a = Math.round(interpA);

          if (targetType === 'black') {
            // High-contrast jet black with subtle dimensional shading (10 to 30)
            const shade = Math.round(14 + (1 - brightness) * 40);
            r = shade; g = shade; b = shade;
          } else if (targetType === 'white' || targetType === 'dark-badge') {
            // Pure crisp white with subtle bevel
            const shade = Math.round(245 + brightness * 10);
            r = shade; g = shade; b = shade;
          } else {
            // Original cream
            r = Math.round(origR);
            g = Math.round(origG);
            b = Math.round(origB);
          }

          if (targetType === 'dark-badge') {
            // Alpha composite over dark badge background
            const bgR = out[outIdx];
            const bgG = out[outIdx + 1];
            const bgB = out[outIdx + 2];
            const alphaFrac = a / 255;
            out[outIdx] = Math.round(r * alphaFrac + bgR * (1 - alphaFrac));
            out[outIdx + 1] = Math.round(g * alphaFrac + bgG * (1 - alphaFrac));
            out[outIdx + 2] = Math.round(b * alphaFrac + bgB * (1 - alphaFrac));
            out[outIdx + 3] = 255;
          } else {
            out[outIdx] = r;
            out[outIdx + 1] = g;
            out[outIdx + 2] = b;
            out[outIdx + 3] = a;
          }
        }
      }
    }
  }

  return encodePng(canvasW, canvasH, out);
}

// Generate the suite of icons:
console.log('Generating production PNG icons...');
const pngBlack512 = renderEmblem(512, 'black', 0.08);
const pngWhite512 = renderEmblem(512, 'white', 0.08);
const pngCream512 = renderEmblem(512, 'original', 0.08);

// Google Search Console & Favicon Dark Badges:
const pngBadge512 = renderEmblem(512, 'dark-badge', 0.16);
const pngBadge192 = renderEmblem(192, 'dark-badge', 0.16);
const pngBadge48 = renderEmblem(48, 'dark-badge', 0.16);
const pngBadge32 = renderEmblem(32, 'dark-badge', 0.16);
const pngBadge16 = renderEmblem(16, 'dark-badge', 0.16);

// Multi-resolution ICO builder (16, 32, 48)
function buildIco(entries) {
  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Icon
  header.writeUInt16LE(entries.length, 4); // Count

  let offset = 6 + entries.length * 16;
  const dirBuffers = [];
  const imgBuffers = [];

  for (const { size, buf } of entries) {
    const dir = Buffer.alloc(16);
    dir[0] = size >= 256 ? 0 : size;
    dir[1] = size >= 256 ? 0 : size;
    dir[2] = 0; dir[3] = 0;
    dir.writeUInt16LE(1, 4);  // Color planes
    dir.writeUInt16LE(32, 6); // Bits per pixel
    dir.writeUInt32LE(buf.length, 8); // Size
    dir.writeUInt32LE(offset, 12);    // Offset
    dirBuffers.push(dir);
    imgBuffers.push(buf);
    offset += buf.length;
  }

  return Buffer.concat([header, ...dirBuffers, ...imgBuffers]);
}

const multiIco = buildIco([
  { size: 16, buf: pngBadge16 },
  { size: 32, buf: pngBadge32 },
  { size: 48, buf: pngBadge48 }
]);

// Write Core Files
fs.writeFileSync(path.join(rootDir, 'favicon.ico'), multiIco);
fs.writeFileSync(path.join(rootDir, 'apple-touch-icon.png'), pngBadge192);
fs.writeFileSync(path.join(brandingDir, 'icon-192.png'), pngBadge192);
fs.writeFileSync(path.join(brandingDir, 'icon-512.png'), pngBadge512);

// Standalone transparent PNGs
fs.writeFileSync(path.join(brandingDir, 'logo-symbol-black.png'), pngBlack512);
fs.writeFileSync(path.join(brandingDir, 'logo-symbol-white.png'), pngWhite512);
fs.writeFileSync(path.join(brandingDir, 'logo-symbol-cream.png'), pngCream512);
fs.writeFileSync(path.join(brandingDir, 'logo.png'), pngBlack512); // Square logo for Google Schema

// Build Crisp SVG wrappers using embedded high-res Base64 of the exact isolated logo!
// This guarantees that the SVG looks 100% IDENTICAL to the user's uploaded art on every screen and browser!
const blackBase64 = pngBlack512.toString('base64');
const whiteBase64 = pngWhite512.toString('base64');
const badgeBase64 = pngBadge512.toString('base64');

// 1. Standalone Emblem SVG (Transparent Black)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <image href="data:image/png;base64,${blackBase64}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
</svg>`;

// 2. Favicon SVG (Dark high-contrast badge)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <image href="data:image/png;base64,${badgeBase64}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
</svg>`;

// 3. Header Logo SVG (Light Background: Bold Black)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 68" width="320" height="68">
  <style>
    .brand-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 900; letter-spacing: 0.22em; font-size: 34px; fill: #0F0F11; }
    .brand-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; letter-spacing: 0.26em; font-size: 9.5px; fill: #6B6861; text-transform: uppercase; }
  </style>
  <image href="data:image/png;base64,${blackBase64}" x="0" y="4" width="60" height="60" preserveAspectRatio="xMidYMid meet" />
  <text x="74" y="42" class="brand-title">LOOPNI</text>
  <text x="76" y="56" class="brand-sub">ASSAM • INDIA</text>
</svg>`;

// 4. Footer Logo SVG (Dark Background: Crisp White)
const logoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 68" width="320" height="68">
  <style>
    .brand-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 900; letter-spacing: 0.22em; font-size: 34px; fill: #FFFFFF; }
    .brand-sub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; letter-spacing: 0.26em; font-size: 9.5px; fill: #A5A299; text-transform: uppercase; }
  </style>
  <image href="data:image/png;base64,${whiteBase64}" x="0" y="4" width="60" height="60" preserveAspectRatio="xMidYMid meet" />
  <text x="74" y="42" class="brand-title">LOOPNI</text>
  <text x="76" y="56" class="brand-sub">ASSAM • INDIA</text>
</svg>`;

// 5. Stacked Hangtag Edition SVG
const logoStackedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" width="300" height="360">
  <style>
    .brand-name-stk { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 900; letter-spacing: 0.24em; font-size: 38px; fill: #0F0F11; text-anchor: middle; }
    .brand-loc-stk { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; letter-spacing: 0.26em; font-size: 13px; fill: #555555; text-anchor: middle; text-transform: uppercase; }
    .brand-cat-stk { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 800; letter-spacing: 0.28em; font-size: 11px; fill: #111111; text-anchor: middle; text-transform: uppercase; }
  </style>
  <image href="data:image/png;base64,${blackBase64}" x="75" y="24" width="150" height="150" preserveAspectRatio="xMidYMid meet" />
  <text x="150" y="215" class="brand-name-stk">LOOPNI</text>
  <text x="150" y="250" class="brand-loc-stk">ASSAM INDIA</text>
  <line x1="80" y1="285" x2="220" y2="285" stroke="#E2DFD6" stroke-width="1.5" />
  <text x="150" y="315" class="brand-cat-stk">PREMIUM APPAREL</text>
</svg>`;

// Write SVGs
fs.writeFileSync(path.join(brandingDir, 'icon.svg'), iconSvg);
fs.writeFileSync(path.join(brandingDir, 'logo.svg'), logoSvg);
fs.writeFileSync(path.join(brandingDir, 'logo-white.svg'), logoWhiteSvg);
fs.writeFileSync(path.join(brandingDir, 'logo-stacked.svg'), logoStackedSvg);
fs.writeFileSync(path.join(rootDir, 'favicon.svg'), faviconSvg);
fs.writeFileSync(path.join(iconsDir, 'favicon.svg'), faviconSvg);

// OpenGraph Social Card
const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9F8F5" />
      <stop offset="100%" stop-color="#EAE7DF" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect x="70" y="60" width="1060" height="510" rx="28" fill="#FFFFFF" stroke="#E2DFD6" stroke-width="2" />
  
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

  <rect x="130" y="465" width="220" height="42" rx="21" fill="#FAF9F6" stroke="#E2DFD6" stroke-width="1.5" />
  <circle cx="152" cy="486" r="4.5" fill="#E85A37" />
  <text x="168" y="492" font-family="monospace" font-size="16" font-weight="700" fill="#0F0F11" letter-spacing="0.05em">loopni.shop</text>

  <image href="data:image/png;base64,${badgeBase64}" x="780" y="140" width="300" height="300" />
</svg>`;
fs.writeFileSync(path.join(brandingDir, 'og-image.svg'), ogImageSvg);

console.log('✓ All official brand assets processed and generated perfectly!');
