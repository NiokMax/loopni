const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlFiles = [
  'index.html', 'shop.html', 'product.html', 'about.html',
  'contact.html', 'shipping.html', 'returns.html', 'faq.html',
  'privacy.html', 'terms.html', '404.html'
];

let totalErrors = 0;

console.log('=== LOOPNI INTEGRITY & SEO VERIFICATION ===\n');

// 1. Check all HTML files exist
htmlFiles.forEach(file => {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${file}`);
    totalErrors++;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Check Title
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  if (!titleMatch || !titleMatch[1].trim()) {
    console.error(`❌ ${file}: Missing <title> tag`);
    totalErrors++;
  } else {
    console.log(`✓ ${file}: Title -> "${titleMatch[1]}"`);
  }

  // Check Canonical URL
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
  if (!canonicalMatch) {
    console.error(`❌ ${file}: Missing canonical URL`);
    totalErrors++;
  } else {
    if (!canonicalMatch[1].startsWith('https://loopni.shop')) {
      console.error(`❌ ${file}: Canonical URL does not match https://loopni.shop: ${canonicalMatch[1]}`);
      totalErrors++;
    }
  }

  // Check Meta Description
  if (file !== '404.html') {
    const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    if (!descMatch || !descMatch[1].trim()) {
      console.error(`❌ ${file}: Missing or empty meta description`);
      totalErrors++;
    }
  }

  // Check Google verification placeholder
  if (content.includes('GSC_VERIFICATION_TOKEN_PLACEHOLDER')) {
    console.log(`  └─ GSC verification placeholder intact in ${file}`);
  }

  // Check referenced local scripts and css
  const scriptMatches = content.matchAll(/<script\s+src="(.*?)"/gi);
  for (const m of scriptMatches) {
    const src = m[1];
    if (!src.startsWith('http')) {
      const scriptPath = path.join(root, src);
      if (!fs.existsSync(scriptPath)) {
        console.error(`❌ ${file}: Script not found: ${src}`);
        totalErrors++;
      }
    }
  }

  const cssMatches = content.matchAll(/<link\s+rel="stylesheet"\s+href="(.*?)"/gi);
  for (const m of cssMatches) {
    const href = m[1];
    if (!href.startsWith('http')) {
      const cssPath = path.join(root, href);
      if (!fs.existsSync(cssPath)) {
        console.error(`❌ ${file}: CSS not found: ${href}`);
        totalErrors++;
      }
    }
  }

  // Check referenced local images
  const imgMatches = content.matchAll(/<img[^>]+src="([^">]+)"/gi);
  for (const m of imgMatches) {
    const src = m[1];
    if (!src.startsWith('http') && !src.startsWith('data:')) {
      const imgPath = path.join(root, src);
      if (!fs.existsSync(imgPath)) {
        console.error(`❌ ${file}: Image not found: ${src}`);
        totalErrors++;
      }
    }
  }
});

// 2. Verify CNAME, robots.txt, sitemap.xml, manifest.json
const specialFiles = ['CNAME', 'robots.txt', 'sitemap.xml', 'manifest.json', 'favicon.ico'];
specialFiles.forEach(f => {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) {
    console.error(`❌ Special file missing: ${f}`);
    totalErrors++;
  } else {
    console.log(`✓ Special file verified: ${f}`);
  }
});

// 3. Verify JS Products Database
const vm = require('vm');
const productsJsPath = path.join(root, 'js', 'products.js');
try {
  const code = fs.readFileSync(productsJsPath, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  const productsList = vm.runInContext(code + '\n;products;', sandbox);
  if (productsList && Array.isArray(productsList) && productsList.length >= 10) {
    console.log(`✓ Central product database verified: ${productsList.length} products loaded.`);
    // Verify each product's images exist
    productsList.forEach(p => {
      p.images.forEach(img => {
        const fullImg = path.join(root, img);
        if (!fs.existsSync(fullImg)) {
          console.error(`❌ Product ID ${p.id} (${p.name}): Image missing: ${img}`);
          totalErrors++;
        }
      });
    });
  } else {
    console.error('❌ products.js did not define products array properly');
    totalErrors++;
  }
} catch (e) {
  console.error('❌ Error evaluating products.js', e);
  totalErrors++;
}

// 4. Verify CNAME content
const cnameContent = fs.readFileSync(path.join(root, 'CNAME'), 'utf8').trim();
if (cnameContent !== 'loopni.shop') {
  console.error(`❌ CNAME content mismatch: "${cnameContent}" expected "loopni.shop"`);
  totalErrors++;
} else {
  console.log(`✓ CNAME content confirmed: ${cnameContent}`);
}

console.log(`\nVerification finished with ${totalErrors} errors.`);
if (totalErrors > 0) process.exit(1);
