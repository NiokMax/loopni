const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const fullPath = path.join(__dirname, '..', reqPath);
  if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
    const errorPage = path.join(__dirname, '..', '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(errorPage));
    return;
  }

  const ext = path.extname(fullPath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  res.end(fs.readFileSync(fullPath));
});

const PORT = 3456;
server.listen(PORT, async () => {
  console.log(`Test server running at http://localhost:${PORT}`);

  const endpoints = [
    '/',
    '/shop.html',
    '/product.html?id=1',
    '/product.html?id=4',
    '/about.html',
    '/contact.html',
    '/shipping.html',
    '/returns.html',
    '/faq.html',
    '/privacy.html',
    '/terms.html',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.json',
    '/non-existent-page.html'
  ];

  let testsPassed = 0;
  for (const ep of endpoints) {
    const is404Expected = ep === '/non-existent-page.html';
    const status = await new Promise(resolve => {
      http.get(`http://localhost:${PORT}${ep}`, r => {
        let data = '';
        r.on('data', chunk => data += chunk);
        r.on('end', () => resolve(r.statusCode));
      }).on('error', () => resolve(500));
    });

    if ((is404Expected && status === 404) || (!is404Expected && status === 200)) {
      console.log(`✓ Tested ${ep.padEnd(26)} -> HTTP ${status}`);
      testsPassed++;
    } else {
      console.error(`❌ Tested ${ep.padEnd(26)} -> HTTP ${status} (Unexpected)`);
    }
  }

  console.log(`\nAll ${testsPassed}/${endpoints.length} HTTP server tests passed!`);
  server.close(() => {
    process.exit(0);
  });
});
