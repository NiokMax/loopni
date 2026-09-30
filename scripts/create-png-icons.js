const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation
function makeCrcTable() {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  return crcTable;
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

function generatePng(width, height, r, g, b, a = 255) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type 6: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Raw image data with filter byte 0 at start of each scanline
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // filter None
    for (let x = 0; x < width; x++) {
      const px = rowOffset + 1 + x * 4;
      // Draw a dark square with rounded corner feel or accent
      const border = 4;
      const isAccent = (x > width * 0.65 && x < width * 0.8 && y > height * 0.25 && y < height * 0.4);
      if (isAccent) {
        rawData[px] = 244; // R
        rawData[px + 1] = 81; // G
        rawData[px + 2] = 30; // B
        rawData[px + 3] = 255;
      } else {
        rawData[px] = r;
        rawData[px + 1] = g;
        rawData[px + 2] = b;
        rawData[px + 3] = a;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function generateIcoFromPng(pngBuffer) {
  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(1, 4); // count 1

  // Directory entry: 16 bytes
  const entry = Buffer.alloc(16);
  entry[0] = 32; // width
  entry[1] = 32; // height
  entry[2] = 0;  // palette colors
  entry[3] = 0;  // reserved
  entry.writeUInt16LE(1, 4);  // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // size of image data
  entry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

  return Buffer.concat([header, entry, pngBuffer]);
}

// Generate files
const png32 = generatePng(32, 32, 17, 17, 17);
const png192 = generatePng(192, 192, 17, 17, 17);
const png512 = generatePng(512, 512, 17, 17, 17);
const ico = generateIcoFromPng(png32);

const root = path.join(__dirname, '..');
const branding = path.join(root, 'assets', 'images', 'branding');

fs.writeFileSync(path.join(root, 'favicon.ico'), ico);
fs.writeFileSync(path.join(root, 'apple-touch-icon.png'), png192);
fs.writeFileSync(path.join(branding, 'icon-192.png'), png192);
fs.writeFileSync(path.join(branding, 'icon-512.png'), png512);

console.log('PNG & ICO assets generated successfully!');
