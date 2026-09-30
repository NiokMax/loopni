# Loopni — Google Search Console & Production SEO Checklist

This checklist ensures that **Loopni** (`https://loopni.shop`) is technically optimized for Google Search Console, discoverability, search indexing, and performance.

---

## 1. Pre-Deployment Technical SEO Audit

| Item | Verification Requirement | Status |
| :--- | :--- | :---: |
| **Domain Setup** | `CNAME` contains exact apex domain `loopni.shop`. | [x] Ready |
| **HTTPS Protocol** | All URLs, assets, schema links, and canonical tags enforce `https://`. | [x] Ready |
| **Canonical Tags** | Unique, self-referential canonical tags on every page (`https://loopni.shop/...`). | [x] Ready |
| **robots.txt** | Permits Googlebot crawling (`Allow: /`) and declares sitemap reference. | [x] Ready |
| **sitemap.xml** | Valid XML format containing all 9 indexable public pages with priority weighting. | [x] Ready |
| **Unique Page Titles** | Distinct, descriptive brand titles for every page (no duplicate titles). | [x] Ready |
| **Meta Descriptions** | Natural, human-written descriptions without keyword stuffing on every page. | [x] Ready |
| **Meta Robots** | `<meta name="robots" content="index, follow">` present on indexable pages. | [x] Ready |
| **404 Directives** | `404.html` carries `<meta name="robots" content="noindex, follow">`. | [x] Ready |
| **Open Graph & Twitter** | Complete `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`. | [x] Ready |
| **Structured Data** | Valid JSON-LD Schema: `Organization` & `WebSite` on Home, `AboutPage` on About, `FAQPage` on FAQ. | [x] Ready |
| **Pre-launch Availability**| Honest schema availability (no deceptive `InStock` flags during pre-launch). | [x] Ready |
| **Image SEO & Alt Text** | Descriptive, relevant `alt` text on all images with explicit `width` & `height`. | [x] Ready |
| **Web Performance (CWV)**| Static asset delivery, zero bulky runtime frameworks, optimized SVG/PNG vectors. | [x] Ready |
| **Mobile Responsiveness** | Verified viewport meta tag and fluid grid from 320px to 1920px without overflow. | [x] Ready |
| **Internal Linking** | Contextual descriptive anchor links connecting Home, Shop, Details, and Policies. | [x] Ready |

---

## 2. Post-Deployment Google Search Console (GSC) Workflow

Follow these steps once you push your repository to GitHub Pages and connect `loopni.shop`:

### Step 1: Create Domain Property in Google Search Console
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property**.
3. Choose the **Domain** property type (recommended) and enter `loopni.shop`.
   > *Note: Domain properties automatically cover `https://loopni.shop`, `http://`, `www.loopni.shop`, and all subdomains.*

### Step 2: DNS TXT Verification
1. Google Search Console will supply a unique `TXT` verification token.
   Example: `google-site-verification=XXXXXXXXXXXXXXXXXXXX`
2. Log into your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare, Porkbun).
3. Access your **DNS Management** for `loopni.shop`.
4. Add a new DNS Record:
   - **Type:** `TXT`
   - **Host / Name:** `@` (or leave blank depending on registrar)
   - **Value:** Paste the verification token provided by Google.
   - **TTL:** Automatic or 300 seconds.
5. Return to Google Search Console and click **Verify**. (DNS propagation may take a few minutes up to a couple of hours).

> **Alternative HTML Tag Verification:** If using HTML tag verification, open `index.html` (and other pages), locate the comment `<!-- GOOGLE SEARCH CONSOLE VERIFICATION ... -->`, and paste the provided `<meta name="google-site-verification" content="...">` tag.

### Step 3: Submit Your Sitemap
1. In Google Search Console, select your `loopni.shop` property.
2. In the left sidebar, click **Sitemaps** (under Indexing).
3. Under **Add a new sitemap**, enter:
   `https://loopni.shop/sitemap.xml`
4. Click **Submit**.
5. Confirm that Google reads the sitemap with a **Success** status.

### Step 4: URL Inspection & Request Indexing
1. Use the search bar at the very top of Google Search Console: **"Inspect any URL in 'loopni.shop'"**.
2. Enter `https://loopni.shop/` and press Enter.
3. Click **Test Live URL** to confirm that Googlebot can fetch the page, render HTML, and encounter no blocking robots directives.
4. Click **Request Indexing**.
   > *Important: Requesting indexing places the page in Google's priority crawl queue. Google retains full algorithmic discretion over when and how pages are indexed.*

### Step 5: Monitor Ongoing Health
- **Page Indexing (Coverage):** Monitor valid vs. excluded pages.
- **Core Web Vitals:** Check real-world user metrics (LCP, INP, CLS) in the Experience report.
- **Mobile Usability:** Verify zero tap target warnings or content overflow.
- **Performance Report:** Track impressions, queries, clicks, and average CTR across India.

---

## 3. Entity SEO & Google Knowledge Graph: Founder & Owner Association

To ensure that queries like:
- *"Who is the owner of Loopni?"*
- *"Loopni founder"*
- *"Mayur Bikash Gogoi"*
- *"Mayur Bikash Gogoi Loopni"*

prompt Google to show **Mayur Bikash Gogoi** as the owner/founder of Loopni:

### On-Site Optimizations Implemented:
1. **Interconnected Schema Entity Graph (`@graph`):**
   - Declares `Loopni` (`Organization`) with `founder` pointing to `Mayur Bikash Gogoi` (`Person`).
   - Declares `Mayur Bikash Gogoi` (`Person`) with `jobTitle: "Founder & Owner"`, `founderOf`, and `worksFor` pointing to `Loopni`.
   - Included on `index.html`, `about.html`, `contact.html`, and `faq.html`.
2. **Direct Answer / Featured Snippet Headings:**
   - In `about.html`: Explicit heading *"Who is Mayur Bikash Gogoi?"* and *"Who owns Loopni?"* with clean, crawlable direct answers.
3. **Structured FAQPage Schema:**
   - In `faq.html`: Exact Question: *"Who is the owner and founder of Loopni?"* -> Answer: *"Mayur Bikash Gogoi is the founder and owner of Loopni."*
4. **Universal Footer Entity Link:**
   - On every page: `Founded & owned by <a href="about.html">Mayur Bikash Gogoi</a>`.

### External Signal Recommendations (Off-Site):
Google's Knowledge Graph confirms entity relationships when independent external sources corroborate on-site schema:
1. **LinkedIn Profile:** On Mayur Bikash Gogoi's LinkedIn, set current experience as *Founder & Owner at Loopni* linking to `https://loopni.shop`.
2. **Social Media Profiles (Instagram / X):** Add bio: *"Founder & Owner @loopni.shop"* with link `https://loopni.shop`.
3. **Press & Startup Directories:** List Loopni on Crunchbase, AngelList / Wellfound, and local Indian startup directories specifying Mayur Bikash Gogoi as the founder.
4. **Google Business Profile:** Once physical dispatch starts in Assam, create a Google Business Profile for Loopni linking to `loopni.shop`.
