const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = [
  'index.html', 'shop.html', 'product.html', 'about.html', 'contact.html',
  'shipping.html', 'returns.html', 'faq.html', 'privacy.html', 'terms.html', '404.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update Header Brand Link:
  // From:
  // <a href="index.html" class="brand-logo-link" aria-label="Loopni Home">\n          <span class="brand-logo-text">LOOPNI</span>\n        </a>
  // To include brand-logo-mark:
  content = content.replace(
    /<a href="index\.html" class="brand-logo-link" aria-label="Loopni Home">\s*<span class="brand-logo-text">LOOPNI<\/span>\s*<\/a>/g,
    `<a href="index.html" class="brand-logo-link" aria-label="Loopni Home">\n          <img src="assets/images/branding/icon.svg" alt="" width="28" height="28" class="brand-logo-mark">\n          <span class="brand-logo-text">LOOPNI</span>\n        </a>`
  );

  // 2. Update Mobile Drawer Header:
  // <span class="brand-logo-text" style="font-size: 1.4rem;">LOOPNI</span>
  content = content.replace(
    /<span class="brand-logo-text" style="font-size: 1\.4rem;">LOOPNI<\/span>/g,
    `<div class="brand-logo-link">\n            <img src="assets/images/branding/icon.svg" alt="" width="24" height="24" class="brand-logo-mark">\n            <span class="brand-logo-text" style="font-size: 1.4rem;">LOOPNI</span>\n          </div>`
  );

  // 3. Update Footer Logo:
  // <span class="footer-logo">LOOPNI</span> or <div class="footer-logo">LOOPNI</div>
  content = content.replace(
    /<span class="footer-logo">LOOPNI<\/span>/g,
    `<div class="footer-logo">\n          <img src="assets/images/branding/icon.svg" alt="" width="26" height="26" class="footer-logo-mark">\n          <span>LOOPNI</span>\n        </div>`
  );
  content = content.replace(
    /<div class="footer-logo">\s*LOOPNI\s*<\/div>/g,
    `<div class="footer-logo">\n          <img src="assets/images/branding/icon.svg" alt="" width="26" height="26" class="footer-logo-mark">\n          <span>LOOPNI</span>\n        </div>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
