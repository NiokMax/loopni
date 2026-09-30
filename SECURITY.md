# Loopni — Frontend Architecture & Security Guidelines

## 1. Static Client-Side Model
The current Loopni website is built as a static frontend deployed via **GitHub Pages**. All HTML, CSS, JavaScript, and media assets are delivered publicly to client browsers.

In web architecture, any asset delivered to a client browser can be viewed by inspecting browser network tabs or developer tools. Therefore:
- We **never implement pseudo-security** such as disabling right-click, intercepting `F12`, or blocking `Ctrl+U`. Such scripts harm accessibility, break standard browser conventions, annoy legitimate users, and provide zero actual security against determined scrapers or developers.
- Real security is achieved through architectural boundaries: **never expose secrets on the client**.

---

## 2. Security Rules for Frontend Development

### Rule 1: No Secret Credentials in Repository
- **Never commit:** Private API tokens, payment gateway secret keys (e.g., Razorpay Key Secret, Stripe Secret Key, AWS credentials, database URIs, or admin credentials).
- The pre-launch store does not connect to any active payment processing system, eliminating financial attack surfaces.

### Rule 2: Client-Side Data Handling
- The shopping bag utilizes browser `localStorage` under the key `loopni_cart`.
- Only public product identifiers, titles, selected sizes, quantities, and display prices are stored locally.
- No sensitive user personal data, credit card information, bank details, or passwords are ever stored or processed locally.

### Rule 3: Future Backend Handoff
When expanding from pre-launch to active checkout:
1. **Server-Side Order Creation:** Payment order creation (e.g., Razorpay Orders API) must run exclusively on a protected backend (e.g., Cloud Functions, AWS Lambda, Node.js server, or headless e-commerce backend).
2. **Signature Verification:** Payment webhook signatures and transaction verification must occur on the server using environment secrets.
3. **Environment Variables:** Keep all private keys in secure server vaults or encrypted environment variables (`.env` omitted from git via `.gitignore`).
4. **HTTPS Enforced:** All communication with payment gateways and APIs must strictly use TLS 1.3/HTTPS.

---

## 3. Reporting Security Inquiries
If you discover a vulnerability or security concern related to Loopni web infrastructure, please report it directly to:
- **Email:** `support@loopni.shop`
- **Founder:** Mayur Bikash Gogoi
- **Location:** Assam, India
