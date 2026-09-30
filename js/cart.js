/**
 * Loopni — Cart System
 * 
 * Manages shopping cart state, drawer UI, quantities, and localStorage persistence.
 * Storage Key: "loopni_cart"
 */

const Cart = {
  STORAGE_KEY: "loopni_cart",

  getItems() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not read cart from localStorage", e);
      return [];
    }
  },

  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      this.updateBadges();
      this.renderDrawer();
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  },

  addItem(product, size = "M", color = null, quantity = 1) {
    const items = this.getItems();
    const chosenColor = color || (product.colors && product.colors.length ? product.colors[0] : "Default");
    const chosenSize = size || (product.sizes && product.sizes.length ? product.sizes[0] : "Standard");
    const qty = parseInt(quantity, 10) || 1;

    // Check if matching item (same id, size, and color) already in cart
    const existingIndex = items.findIndex(
      item => item.id === product.id && item.size === chosenSize && item.color === chosenColor
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += qty;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images && product.images.length ? product.images[0] : "",
        category: product.category,
        size: chosenSize,
        color: chosenColor,
        quantity: qty
      });
    }

    this.saveItems(items);
    this.openDrawer();
    this.bumpBadge();
  },

  removeItem(index) {
    const items = this.getItems();
    if (index >= 0 && index < items.length) {
      items.splice(index, 1);
      this.saveItems(items);
    }
  },

  updateQuantity(index, delta) {
    const items = this.getItems();
    if (index >= 0 && index < items.length) {
      const newQty = items[index].quantity + delta;
      if (newQty <= 0) {
        this.removeItem(index);
      } else {
        items[index].quantity = newQty;
        this.saveItems(items);
      }
    }
  },

  getTotalCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  },

  getSubtotal() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  updateBadges() {
    const badges = document.querySelectorAll(".cart-count-badge");
    const count = this.getTotalCount();
    badges.forEach(badge => {
      badge.textContent = count;
      badge.setAttribute("aria-label", `${count} items in shopping cart`);
    });
  },

  bumpBadge() {
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(badge => {
      badge.classList.add("badge-bump");
      setTimeout(() => badge.classList.remove("badge-bump"), 300);
    });
  },

  renderDrawer() {
    const container = document.getElementById("cartItemsContainer");
    const subtotalEl = document.getElementById("cartSubtotalDisplay");
    const countEl = document.getElementById("cartDrawerCount");
    if (!container) return;

    const items = this.getItems();
    const count = this.getTotalCount();
    const subtotal = this.getSubtotal();

    if (countEl) countEl.textContent = `(${count})`;
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <svg class="cart-empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p style="font-weight: 700; color: var(--color-primary); margin-bottom: 6px;">Your cart is empty</p>
          <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 20px;">Explore our collection and add everyday pieces.</p>
          <a href="shop.html" class="btn btn-secondary" style="padding: 10px 20px; font-size: 0.8rem;">Browse Products</a>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map((item, idx) => `
      <div class="cart-item" data-index="${idx}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" width="80" height="96" loading="lazy" />
        <div class="cart-item-details">
          <a href="product.html?id=${item.id}" class="cart-item-name">${item.name}</a>
          <span class="cart-item-meta">Size: ${item.size} • Color: ${item.color}</span>
          <span class="cart-item-price">₹${item.price.toLocaleString("en-IN")}</span>
          <div class="cart-qty-control" role="group" aria-label="Adjust quantity">
            <button type="button" class="cart-qty-btn" onclick="Cart.updateQuantity(${idx}, -1)" aria-label="Decrease quantity for ${item.name}">−</button>
            <span class="cart-qty-val" aria-live="polite">${item.quantity}</span>
            <button type="button" class="cart-qty-btn" onclick="Cart.updateQuantity(${idx}, 1)" aria-label="Increase quantity for ${item.name}">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" onclick="Cart.removeItem(${idx})" aria-label="Remove ${item.name} from cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join("");
  },

  openDrawer() {
    const drawer = document.getElementById("cartDrawerWrapper");
    if (drawer) {
      this.renderDrawer();
      drawer.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  },

  closeDrawer() {
    const drawer = document.getElementById("cartDrawerWrapper");
    if (drawer) {
      drawer.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  },

  init() {
    this.updateBadges();
    this.renderDrawer();

    // Trigger buttons
    document.querySelectorAll("[data-open-cart]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    const closeBtn = document.getElementById("cartDrawerClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeDrawer());
    }

    const backdrop = document.getElementById("cartDrawerBackdrop");
    if (backdrop) {
      backdrop.addEventListener("click", () => this.closeDrawer());
    }

    // Checkout button triggers Coming Soon modal
    const checkoutBtn = document.getElementById("cartCheckoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", e => {
        e.preventDefault();
        this.closeDrawer();
        if (typeof openComingSoonModal === "function") {
          openComingSoonModal();
        }
      });
    }

    // ESC to close drawer
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        this.closeDrawer();
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => Cart.init());
