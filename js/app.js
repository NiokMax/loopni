/**
 * Loopni — Core Application Script
 * 
 * Manages:
 * - Sticky header scroll dynamics
 * - Dismissable announcement bar (localStorage persistence)
 * - Mobile navigation drawer
 * - Global search modal
 * - Coming Soon purchase system & fixed launch countdown
 */

// 1. Sticky Header on Scroll
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// 2. Announcement Bar Dismissal
function initAnnouncementBar() {
  const bar = document.getElementById('announcementBar');
  const closeBtn = document.getElementById('announcementCloseBtn');
  if (!bar) return;

  const storageKey = (typeof LOOPNI_CONFIG !== 'undefined' && LOOPNI_CONFIG.storageKeys)
    ? LOOPNI_CONFIG.storageKeys.announcement
    : 'loopni_announcement_dismissed';

  if (localStorage.getItem(storageKey) === 'true') {
    bar.classList.add('is-hidden');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      bar.classList.add('is-hidden');
      try {
        localStorage.setItem(storageKey, 'true');
      } catch (e) {
        console.warn('Could not save announcement dismissal state', e);
      }
    });
  }
}

// 3. Mobile Navigation Drawer
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileNavClose');
  const backdrop = document.getElementById('mobileNavBackdrop');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

// 4. Global Search Modal
function initSearchModal() {
  const modal = document.getElementById('searchModal');
  const backdrop = document.getElementById('searchModalBackdrop');
  const closeBtn = document.getElementById('searchModalClose');
  const openBtns = document.querySelectorAll('[data-open-search]');
  const searchInput = document.getElementById('globalSearchInput');

  if (!modal) return;

  const openSearch = () => {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  };

  const closeSearch = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openSearch();
    });
  });

  if (backdrop) backdrop.addEventListener('click', closeSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  // Keyboard shortcut '/' opens search if not in an input
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeSearch();
    }
  });

  // Handle search submission
  const searchForm = document.getElementById('globalSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const query = (searchInput.value || '').trim();
      if (query) {
        window.location.href = `shop.html?q=${encodeURIComponent(query)}`;
      }
    });
  }

  // Tag clicks inside search modal
  document.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const term = tag.textContent.trim();
      window.location.href = `shop.html?q=${encodeURIComponent(term)}`;
    });
  });
}

// 5. Coming Soon Purchase System & Fixed Launch Countdown
let countdownInterval = null;

function updateCountdown() {
  const targetDateStr = (typeof LOOPNI_LAUNCH_DATE !== 'undefined')
    ? LOOPNI_LAUNCH_DATE
    : "2027-01-15T00:00:00+05:30";

  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  const daysEl = document.getElementById('countdownDays');
  const hoursEl = document.getElementById('countdownHours');
  const minutesEl = document.getElementById('countdownMinutes');
  const secondsEl = document.getElementById('countdownSeconds');
  const titleEl = document.getElementById('comingSoonTitle');
  const descEl = document.getElementById('comingSoonDesc');

  if (diff <= 0) {
    if (daysEl) daysEl.textContent = '00';
    if (hoursEl) hoursEl.textContent = '00';
    if (minutesEl) minutesEl.textContent = '00';
    if (secondsEl) secondsEl.textContent = '00';

    if (titleEl) titleEl.textContent = 'LOOPNI IS NOW OPEN';
    if (descEl) descEl.textContent = 'Our store has officially opened! Thank you for waiting.';
    if (countdownInterval) clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

function openComingSoonModal() {
  const modal = document.getElementById('comingSoonModal');
  if (!modal) return;

  updateCountdown();
  if (!countdownInterval) {
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeComingSoonModal() {
  const modal = document.getElementById('comingSoonModal');
  if (!modal) return;

  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function initComingSoonModal() {
  const modal = document.getElementById('comingSoonModal');
  if (!modal) return;

  const closeBtn = document.getElementById('comingSoonCloseBtn');
  const backdrop = document.getElementById('comingSoonBackdrop');

  if (closeBtn) closeBtn.addEventListener('click', closeComingSoonModal);
  if (backdrop) backdrop.addEventListener('click', closeComingSoonModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeComingSoonModal();
    }
  });

  // Global trigger for any button with data-open-coming-soon
  document.addEventListener('click', e => {
    if (e.target.closest('[data-open-coming-soon]')) {
      e.preventDefault();
      openComingSoonModal();
    }
  });

  // Notify form inside modal
  const notifyForm = document.getElementById('comingSoonNotifyForm');
  const feedback = document.getElementById('notifyFeedback');
  if (notifyForm) {
    notifyForm.addEventListener('submit', e => {
      e.preventDefault();
      const emailInput = notifyForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (email) {
        try {
          const list = JSON.parse(localStorage.getItem('loopni_subscribers') || '[]');
          if (!list.includes(email)) list.push(email);
          localStorage.setItem('loopni_subscribers', JSON.stringify(list));
        } catch (err) {
          console.warn('LocalStorage error saving subscriber', err);
        }

        if (feedback) {
          feedback.textContent = `Thanks! We'll notify ${email} the moment we launch.`;
          feedback.style.display = 'block';
        }
        notifyForm.reset();
      }
    });
  }

  // Initial countdown run
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

// 6. Contact Form Placeholder Handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFeedback');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const subject = form.querySelector('[name="subject"]').value;
    const message = form.querySelector('[name="message"]').value;

    const mailto = `mailto:support@loopni.shop?subject=${encodeURIComponent(subject || 'Inquiry from Loopni Website')}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
    
    // Provide clean feedback
    if (feedback) {
      feedback.innerHTML = `
        <div class="notice-box" style="margin-top: 16px;">
          <p><strong>Note:</strong> Since Loopni is preparing for launch, your default email client will open to send your message to <strong>support@loopni.shop</strong>.</p>
        </div>
      `;
      feedback.style.display = 'block';
    }

    setTimeout(() => {
      window.location.href = mailto;
    }, 600);
  });
}

// 7. FAQ Accordion Handler
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close others for clean accordion
        faqItems.forEach(other => other.classList.remove('is-open'));
        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    }
  });
}

// Document Ready Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initAnnouncementBar();
  initMobileMenu();
  initSearchModal();
  initComingSoonModal();
  initContactForm();
  initFaqAccordion();
});
