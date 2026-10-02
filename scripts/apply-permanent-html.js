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

  // 1. Update Header Logo Link to use the crisp black emblem
  content = content.replace(
    /<img src="assets\/images\/branding\/icon\.svg" alt="" width="28" height="28" class="brand-logo-mark">/g,
    `<img src="assets/images/branding/logo-symbol-black.png" alt="Loopni" width="32" height="32" class="brand-logo-mark">`
  );

  // 2. Update Mobile Drawer Header to use the crisp black emblem
  content = content.replace(
    /<img src="assets\/images\/branding\/icon\.svg" alt="" width="24" height="24" class="brand-logo-mark">/g,
    `<img src="assets/images/branding/logo-symbol-black.png" alt="Loopni" width="28" height="28" class="brand-logo-mark">`
  );

  // 3. Update Footer Logo to use the crisp white emblem natively
  content = content.replace(
    /<img src="assets\/images\/branding\/icon\.svg" alt="" width="26" height="26" class="footer-logo-mark">/g,
    `<img src="assets/images/branding/logo-symbol-white.png" alt="Loopni" width="28" height="28" class="footer-logo-mark">`
  );

  // 4. Update Schema Organization logo to the 512x512 high-res PNG for Google Knowledge Graph & Search
  content = content.replace(
    /"logo": "https:\/\/loopni\.shop\/assets\/images\/branding\/logo\.svg"/g,
    `"logo": "https://loopni.shop/assets/images/branding/icon-512.png"`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated permanent logo in ${file}`);
});
