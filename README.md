# Loopni — Everyday Fashion & Wearable Essentials

**Official Website:** [https://loopni.shop](https://loopni.shop)  
**Brand:** Loopni  
**Founder:** Mayur Bikash Gogoi  
**Location:** Assam, India  
**Status:** Pre-Launch Showcase  
**Fulfillment Area:** India Only (Post-Launch)  

---

## 1. Project Overview

**Loopni** is a modern, realistic, fully functional e-commerce frontend built for an authentic Indian fashion startup originating from Assam, India. The brand specializes in everyday wearable clothing—oversized tees, heavyweight hoodies, relaxed cargos, and minimalist accessories.

The website is engineered specifically for **GitHub Pages** deployment with a static architecture, responsive styling across all device viewports (320px to 1920px), an interactive product catalog, custom shopping bag with `localStorage` persistence, a fixed launch countdown modal, and comprehensive **Google Search Console & SEO technical infrastructure**.

---

## 2. Technology Stack

- **Markup:** Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`, ARIA landmark roles)
- **Styling:** Vanilla CSS3 (Custom design tokens, CSS Grid, Flexbox, smooth transitions, reduced-motion queries)
- **Scripting:** Pure Vanilla JavaScript ES6+ (Zero heavy frameworks, fast load times, modular architecture)
- **Deployment Platform:** GitHub Pages (Static hosting with custom domain support)
- **Assets:** High-resolution scalable vector graphics (SVG) and optimized binary PNG/ICO icons

---

## 3. Local Testing & Development

Because Loopni is built entirely with standard web technologies without server-side compilation, you can run and test it locally using any static web server:

### Option A: Using Python (Built-in)
```bash
# In the project directory:
python -m http.server 8000
```
Then open your browser at: `http://localhost:8000`

### Option B: Using Node `npx serve`
```bash
npx serve .
```

### Option C: VS Code Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 4. GitHub Pages Deployment Guide

Deploying Loopni to GitHub Pages takes less than two minutes:

1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Loopni production release"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git
   git push -u origin main
   ```
2. **Enable GitHub Pages:**
   - In your GitHub repository, navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**.
3. **Verify Custom Domain Setting:**
   - Under **Custom domain**, ensure `loopni.shop` is specified.
   - The repository includes a `CNAME` file containing `loopni.shop`. GitHub will automatically detect it.
   - Check **Enforce HTTPS** (GitHub will provision a free SSL certificate via Let's Encrypt).

---

## 5. Custom Domain & DNS Setup (`loopni.shop`)

To link your custom domain registered at Namecheap, GoDaddy, Cloudflare, Hostinger, or Porkbun to GitHub Pages:

1. **Verify Official GitHub Pages DNS Instructions:**
   > **Important:** Always check GitHub's current official documentation for active IP addresses when pointing apex domains:  
   > [GitHub Docs: Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

2. **Add DNS Records at Your Registrar:**
   - **Apex Domain (`loopni.shop`):** Create four `A` records pointing to GitHub's official Pages servers:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
     *(Verify these addresses in GitHub Docs before saving)*
   - **`www` Subdomain:** Create a `CNAME` record:
     - Host: `www`
     - Value: `<YOUR_GITHUB_USERNAME>.github.io`
   - **DNS TXT Record:** Add the Google Search Console verification token (detailed in the next section).

---

## 6. How to Connect Loopni to Google Search Console

Follow this step-by-step workflow to verify ownership and submit your sitemap:

### Step 1: Deploy and Verify Live HTTPS
Ensure the website is live and loading securely at `https://loopni.shop/`.

### Step 2: Open Google Search Console
Visit [Google Search Console](https://search.google.com/search-console) and sign in with your Google account.

### Step 3: Add Domain Property
- Select **Add Property**.
- Choose the **Domain** property option.
- Enter: `loopni.shop` (without `https://` or `www`).
- Click **Continue**.

### Step 4: Add DNS TXT Verification Record
- Google Search Console will display a DNS TXT record value:
  `google-site-verification=...`
- Go to your domain registrar's DNS records manager.
- Create a new `TXT` record:
  - **Host / Name:** `@`
  - **Value:** Paste the verification string from Google.
- Return to Search Console and click **Verify**.

> *Note: If you prefer HTML meta tag verification, open `index.html` (and other pages), find the placeholder `<!-- GOOGLE SEARCH CONSOLE VERIFICATION ... -->`, and replace it with your tag.*

### Step 5: Submit the Sitemap
- In the Search Console dashboard, select the `loopni.shop` property.
- Click **Sitemaps** from the left-hand navigation.
- Under **Add a new sitemap**, type: `sitemap.xml` (Full URL: `https://loopni.shop/sitemap.xml`).
- Click **Submit**.

### Step 6: Use URL Inspection & Request Indexing
- In the top inspection bar, enter: `https://loopni.shop/` and hit Enter.
- Click **Test Live URL**.
- Click **Request Indexing**.

> **SEO Advisory:** Requesting indexing puts your page into Google's priority queue. Google algorithmically evaluates site quality, content, and crawl budgets before indexing. Indexing is not instantaneous and typically occurs over several days.

---

## 7. Customization & Maintenance Guide

All core settings and catalogs are centralized to allow simple updates without touching page markup:

### 1. Changing Brand Details, Founder & Contact
Open [`js/config.js`](file:///c:/Users/theki/Desktop/Loopni/js/config.js):
```javascript
const LOOPNI_CONFIG = {
  brandName: "Loopni",
  tagline: "Everyday style. Your way.",
  domain: "https://loopni.shop",
  founder: "Mayur Bikash Gogoi",
  location: "Assam, India",
  shippingRegion: "India only",
  supportEmail: "support@loopni.shop",
  // ...
};
```

### 2. Changing the Launch Countdown Date
Open [`js/config.js`](file:///c:/Users/theki/Desktop/Loopni/js/config.js) and update the `LOOPNI_LAUNCH_DATE` constant:
```javascript
// ISO 8601 timestamp with IST (+05:30) offset:
const LOOPNI_LAUNCH_DATE = "2027-01-15T00:00:00+05:30";
```
This single variable controls the countdown display on the homepage, Coming Soon modal, and purchase triggers.

### 3. Adding or Editing Products
Open [`js/products.js`](file:///c:/Users/theki/Desktop/Loopni/js/products.js). Every product is structured as a clean object:
```javascript
{
  id: 1,
  name: "Oversized Black T-Shirt",
  category: "T-Shirts", // T-Shirts, Hoodies, Pants, Accessories, Bags
  price: 799,
  originalPrice: 1199,
  discount: 33,
  images: [
    "assets/images/products/oversized-black-tshirt-1.svg",
    "assets/images/products/oversized-black-tshirt-2.svg"
  ],
  description: "A relaxed everyday oversized t-shirt...",
  details: ["240 GSM Combed Cotton", "Drop-shoulder fit"],
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["Jet Black", "Washed Charcoal"],
  featured: true
}
```

### 4. Replacing Images
- **Product Photography:** Place images in `assets/images/products/` and reference their file paths in `js/products.js`.
- **Hero Photography:** Place images in `assets/images/hero/`.
- **Branding & Logos:** Place assets in `assets/images/branding/`.

---

## 8. Directory Structure

```
Loopni/
├── 404.html                     # Branded 404 error page
├── about.html                   # About Loopni & founder story
├── contact.html                 # Contact page with pre-launch inquiry form
├── faq.html                     # Interactive FAQ accordion
├── index.html                   # High-converting homepage & hero
├── privacy.html                 # Privacy policy
├── product.html                 # Product detail view with size/color/cart
├── returns.html                 # Returns and exchange framework
├── shipping.html                # Domestic India shipping policy
├── shop.html                    # Product catalog with search, filters & sort
├── terms.html                   # Terms & conditions
├── CNAME                        # GitHub Pages custom domain (loopni.shop)
├── robots.txt                   # Search crawler directives & sitemap location
├── sitemap.xml                  # XML sitemap with all 9 public URLs
├── manifest.json                # Web App Manifest for mobile/PWA
├── favicon.ico                  # 32x32 binary favicon
├── favicon.svg                  # Modern vector favicon
├── apple-touch-icon.png         # iOS home screen icon
├── README.md                    # Comprehensive documentation
├── SEO-CHECKLIST.md             # Pre and post-launch SEO audit list
├── SECURITY.md                  # Client-side security guidelines
├── css/
│   └── style.css                # Master responsive stylesheet
├── js/
│   ├── config.js                # Central brand & countdown settings
│   ├── products.js              # Central JavaScript product database
│   ├── cart.js                  # Cart logic, drawer UI & localStorage
│   ├── shop.js                  # Search, filter chips, and sorting
│   ├── product-detail.js        # Dynamic product detail page controller
│   ├── animations.js            # Scroll reveal & desktop custom cursor
│   └── app.js                   # Sticky header, announcement & countdown modal
├── assets/
│   ├── icons/                   # SVG and favicon icons
│   └── images/
│       ├── branding/            # Logo, social preview, studio story SVGs
│       ├── hero/                # Fashion editorial hero visual
│       └── products/            # 12 demo products (2 views each)
└── scripts/
    ├── generate-assets.js       # Script to generate SVG visuals
    └── create-png-icons.js      # Script to create binary PNG/ICO icons
```

---

## 9. Future E-Commerce Roadmap

When transitioning from pre-launch to active live transactions:
1. Integrate an Indian payment gateway (e.g., Razorpay, Cashfree, or UPI QR) using serverless functions to maintain secret key isolation.
2. Hook order placement events from `Cart` to an automated fulfillment and shipping API (e.g., Shiprocket, Delhivery, or Bluedart).
3. Connect email notifications to SendGrid, Postmark, or AWS SES for real-time dispatch and tracking updates.

---

## 10. Entity SEO: Founder & Owner Association (Mayur Bikash Gogoi ↔ Loopni)

To ensure that searching *"who is the owner of loopni"*, *"loopni founder"*, or *"mayur bikash gogoi"* leads Google to connect Mayur Bikash Gogoi with Loopni:

1. **Schema.org Entity Graph:** `index.html`, `about.html`, `contact.html`, and `faq.html` implement linked `Organization` and `Person` schema specifying `jobTitle: "Founder & Owner"` and bidirectional `founderOf` and `worksFor` relationships.
2. **Featured Snippet Headings:** `about.html` features dedicated semantic sections (*"Who is Mayur Bikash Gogoi?"* and *"Who owns Loopni?"*) formatted directly for Google's direct-answer extraction.
3. **Structured FAQ Schema:** `faq.html` contains explicit Q&A with matching `FAQPage` JSON-LD schema.
4. **Site-Wide Footer Citation:** Every page carries a footer link: *"Founded & owned by Mayur Bikash Gogoi"*.

# asd
