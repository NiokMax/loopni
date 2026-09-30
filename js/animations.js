/**
 * Loopni — Animations & Desktop Cursor
 * 
 * Features:
 * - IntersectionObserver scroll reveals
 * - Subtle custom mouse cursor for desktop (disabled on touch devices)
 * - Prefers-reduced-motion support
 */

(function () {
  'use strict';

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll Reveal with IntersectionObserver
  function initScrollReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-revealed'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // 2. Desktop Custom Mouse Cursor
  function initDesktopCursor() {
    // Disable on coarse pointer devices (touchscreens, mobile phones, tablets)
    if (window.matchMedia('(pointer: coarse)').matches || prefersReducedMotion) {
      return;
    }

    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(ring);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        isVisible = true;
      }

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isVisible = false;
    });

    // Smooth trailing animation for the ring
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX - 15}px, ${ringY - 15}px)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover effect over clickable elements
    const interactiveSelectors = 'a, button, input, select, textarea, .product-card, .category-chip, .thumb-btn, [role="button"]';
    
    document.addEventListener('mouseover', e => {
      if (e.target.closest(interactiveSelectors)) {
        ring.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', e => {
      if (e.target.closest(interactiveSelectors)) {
        ring.classList.remove('cursor-hover');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initDesktopCursor();
  });
})();
