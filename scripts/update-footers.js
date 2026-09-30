const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const files = [
  'index.html', 'shop.html', 'product.html', 'about.html',
  'contact.html', 'shipping.html', 'returns.html', 'faq.html',
  'privacy.html', 'terms.html', '404.html'
];

const target = '<p>&copy; 2026 Loopni. All rights reserved.</p>';
const replacement = '<p>&copy; 2026 Loopni. Founded &amp; owned by <a href="about.html" style="text-decoration: underline; font-weight: 600;">Mayur Bikash Gogoi</a>. All rights reserved.</p>';

let count = 0;
files.forEach(f => {
  const p = path.join(root, f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      fs.writeFileSync(p, content, 'utf8');
      console.log(`Updated footer in: ${f}`);
      count++;
    }
  }
});

console.log(`Successfully updated ${count} file footers!`);
