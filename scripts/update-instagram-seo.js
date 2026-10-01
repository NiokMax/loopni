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

  // 1. Replace generic instagram.com link in footer with loopni.pvt
  content = content.replace(
    /href="https:\/\/instagram\.com"/g,
    'href="https://www.instagram.com/loopni.pvt/"'
  );

  // 2. Add rel="me" identity verification links in <head> if not present
  if (!content.includes('rel="me"')) {
    const metaTags = `  <link rel="me" href="https://www.instagram.com/loopni.pvt/">\n  <link rel="me" href="https://www.instagram.com/mayurrr__g/">\n  <meta name="author" content="Mayur Bikash Gogoi">\n`;
    content = content.replace('<!-- Canonical URL -->', metaTags + '  <!-- Canonical URL -->');
  }

  // 3. Update Organization Schema to include sameAs: ["https://www.instagram.com/loopni.pvt/"]
  if (content.includes('"@type": "Organization"')) {
    content = content.replace(
      /"logo": "https:\/\/loopni\.shop\/assets\/images\/branding\/logo\.svg",/g,
      `"logo": "https://loopni.shop/assets/images/branding/logo.svg",\n        "sameAs": [\n          "https://www.instagram.com/loopni.pvt/"\n        ],`
    );
  }

  // 4. Update Person Schema to include sameAs: ["https://www.instagram.com/mayurrr__g/"] & image
  if (content.includes('"@type": "Person"')) {
    content = content.replace(
      /"jobTitle": "Founder & Owner",/g,
      `"jobTitle": "Founder & Owner of Loopni",\n        "image": "https://loopni.shop/assets/images/founder/mayur-bikash-gogoi.jpg",\n        "sameAs": [\n          "https://www.instagram.com/mayurrr__g/"\n        ],`
    );
  }

  // 5. Update footer founder credit to include founder's Instagram handle
  content = content.replace(
    /Founded &amp; owned by <a href="about\.html" style="text-decoration: underline; color: inherit;">Mayur Bikash Gogoi<\/a>\./g,
    `Founded &amp; owned by <a href="about.html" style="text-decoration: underline; color: inherit;">Mayur Bikash Gogoi</a> (<a href="https://www.instagram.com/mayurrr__g/" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent); text-decoration: none;">@mayurrr__g</a>).`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated Instagram SEO for ${file}`);
});

// Now update the Founder Showcase Card specifically inside about.html
let aboutContent = fs.readFileSync(path.join(rootDir, 'about.html'), 'utf8');

const updatedFounderCard = `        <!-- Direct Answer Optimized Founder Section -->
        <article class="about-founder-card" itemscope itemtype="https://schema.org/Person">
          <div class="founder-card-layout">
            <div class="founder-avatar-wrap">
              <img src="assets/images/founder/mayur-bikash-gogoi.jpg" alt="Mayur Bikash Gogoi — Founder &amp; Owner of Loopni" class="founder-avatar" itemprop="image" width="140" height="140">
              <a href="https://www.instagram.com/mayurrr__g/" class="founder-social-badge" target="_blank" rel="noopener noreferrer" itemprop="sameAs" aria-label="Mayur Bikash Gogoi on Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>@mayurrr__g</span>
              </a>
            </div>

            <div class="founder-bio-wrap">
              <span class="section-tag" style="color: var(--color-accent);">Leadership &amp; Ownership</span>
              <h2 class="founder-title" itemprop="name">Mayur Bikash Gogoi</h2>
              <span class="founder-role" itemprop="jobTitle">Founder &amp; Owner of Loopni • Assam, India</span>
              
              <div style="background-color: var(--color-surface-subtle); border-left: 3px solid var(--color-primary); padding: 14px 18px; margin: 14px 0 18px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
                <p style="margin: 0; font-size: 1.02rem; font-weight: 600; color: var(--color-primary);">
                  <strong>Mayur Bikash Gogoi</strong> is the founder and owner of <strong>Loopni</strong>, an India-based everyday fashion and lifestyle brand originating from Assam, India.
                </p>
              </div>

              <h3 style="font-size: 1.1rem; font-weight: 750; text-transform: uppercase; margin-top: 18px; margin-bottom: 8px;">
                Who is the founder of Loopni?
              </h3>
              <p itemprop="description">
                <strong>Mayur Bikash Gogoi</strong> is an Indian entrepreneur and the founder of Loopni. Operating from Assam, he started Loopni with the vision of providing simple, high-quality, wearable clothing tailored for everyday life in India. Under his leadership, Loopni focuses on honest design, 100% combed cotton textiles, relaxed fits, and a modern online shopping experience.
              </p>

              <h3 style="font-size: 1.1rem; font-weight: 750; text-transform: uppercase; margin-top: 18px; margin-bottom: 8px;">
                Who owns Loopni?
              </h3>
              <p style="margin-bottom: 16px;">
                Loopni is independently owned and operated by founder <strong>Mayur Bikash Gogoi</strong>. The brand is built as a genuine young Indian startup with transparent communication, preparing to launch its initial streetwear and apparel collections across India.
              </p>

              <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; padding-top: 10px; border-top: 1px solid var(--color-border);">
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted);">Official Channels:</span>
                <a href="https://www.instagram.com/loopni.pvt/" class="social-badge" target="_blank" rel="noopener noreferrer" style="font-size: 0.82rem; font-weight: 600; color: var(--color-primary); text-decoration: underline;">
                  Brand: @loopni.pvt
                </a>
                <span style="color: var(--color-border);">•</span>
                <a href="https://www.instagram.com/mayurrr__g/" class="social-badge" target="_blank" rel="noopener noreferrer" style="font-size: 0.82rem; font-weight: 600; color: var(--color-primary); text-decoration: underline;">
                  Founder: @mayurrr__g
                </a>
              </div>
            </div>
          </div>
        </article>`;

// Replace old article block with updated one
aboutContent = aboutContent.replace(
  /<article class="about-founder-card" itemscope itemtype="https:\/\/schema\.org\/Person">[\s\S]*?<\/article>/,
  updatedFounderCard
);

fs.writeFileSync(path.join(rootDir, 'about.html'), aboutContent, 'utf8');
console.log('✓ about.html founder showcase upgraded!');
