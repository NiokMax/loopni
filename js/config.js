/**
 * Loopni — Centralized Site Configuration
 * 
 * Edit this file to easily update brand details, launch countdown,
 * founder information, contact emails, and social links across the entire website.
 */

const LOOPNI_CONFIG = {
  brandName: "Loopni",
  tagline: "Everyday style. Your way.",
  domain: "https://loopni.shop",
  founder: "Mayur Bikash Gogoi",
  location: "Assam, India",
  shippingRegion: "India only",
  status: "Pre-launch",
  supportEmail: "support@loopni.shop",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  currency: "₹",
  storageKeys: {
    cart: "loopni_cart",
    announcement: "loopni_announcement_dismissed"
  }
};

/**
 * FIXED LAUNCH COUNTDOWN DATE
 * Standard ISO 8601 string with Indian Standard Time (+05:30) offset.
 * Modify this single variable to change the launch date everywhere on the website.
 */
const LOOPNI_LAUNCH_DATE = "2027-01-15T00:00:00+05:30";

// Freeze to prevent accidental mutation during runtime
Object.freeze(LOOPNI_CONFIG);
