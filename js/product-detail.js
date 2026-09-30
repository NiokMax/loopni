/**
 * Loopni — Product Detail Page Controller
 * 
 * Handles single product display, image switching, size/color selection,
 * quantity adjustments, Add to Cart, Buy Now, and related items.
 */

const ProductDetailController = {
  currentProduct: null,
  selectedSize: "M",
  selectedColor: "",
  quantity: 1,

  init() {
    this.loadProduct();
    if (!this.currentProduct) return;

    this.render();
    this.bindEvents();
    this.renderRelated();
    this.updateMeta();
  },

  loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "1";
    this.currentProduct = getProductById(id) || products[0];

    if (this.currentProduct) {
      this.selectedSize = this.currentProduct.sizes && this.currentProduct.sizes.length ? this.currentProduct.sizes[0] : "Standard";
      this.selectedColor = this.currentProduct.colors && this.currentProduct.colors.length ? this.currentProduct.colors[0] : "Default";
    }
  },

  updateMeta() {
    if (!this.currentProduct) return;
    document.title = `${this.currentProduct.name} — Loopni India`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", `${this.currentProduct.name} by Loopni. ${this.currentProduct.description.slice(0, 140)}`);
    }
  },

  render() {
    const p = this.currentProduct;
    if (!p) return;

    // Elements
    const titleEl = document.getElementById("pDetailTitle");
    const catEl = document.getElementById("pDetailCategory");
    const currentPriceEl = document.getElementById("pDetailCurrentPrice");
    const origPriceEl = document.getElementById("pDetailOriginalPrice");
    const discountEl = document.getElementById("pDetailDiscount");
    const descEl = document.getElementById("pDetailDescription");
    const mainImgEl = document.getElementById("pDetailMainImage");
    const thumbsContainer = document.getElementById("pDetailThumbnails");
    const sizesContainer = document.getElementById("pDetailSizes");
    const colorsContainer = document.getElementById("pDetailColors");
    const specsContainer = document.getElementById("pDetailSpecs");
    const selectedSizeLabel = document.getElementById("selectedSizePreview");
    const selectedColorLabel = document.getElementById("selectedColorPreview");
    const qtyVal = document.getElementById("pDetailQtyVal");

    if (titleEl) titleEl.textContent = p.name;
    if (catEl) catEl.textContent = p.category;
    if (currentPriceEl) currentPriceEl.textContent = `₹${p.price.toLocaleString("en-IN")}`;
    if (origPriceEl) origPriceEl.textContent = `₹${p.originalPrice.toLocaleString("en-IN")}`;
    if (discountEl) discountEl.textContent = `${p.discount}% OFF`;
    if (descEl) descEl.textContent = p.description;

    if (selectedSizeLabel) selectedSizeLabel.textContent = this.selectedSize;
    if (selectedColorLabel) selectedColorLabel.textContent = this.selectedColor;
    if (qtyVal) qtyVal.textContent = this.quantity;

    // Main Image
    if (mainImgEl && p.images && p.images.length > 0) {
      mainImgEl.src = p.images[0];
      mainImgEl.alt = `${p.name} - Loopni Everyday Fashion`;
    }

    // Thumbnails
    if (thumbsContainer && p.images) {
      thumbsContainer.innerHTML = p.images.map((img, idx) => `
        <button type="button" class="thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="View product angle ${idx + 1}">
          <img src="${img}" alt="${p.name} angle ${idx + 1}" class="thumb-img" width="72" height="90" />
        </button>
      `).join("");
    }

    // Sizes
    if (sizesContainer && p.sizes) {
      sizesContainer.innerHTML = p.sizes.map(size => `
        <button type="button" class="size-pill ${size === this.selectedSize ? 'active' : ''}" data-size="${size}" aria-label="Select size ${size}">
          ${size}
        </button>
      `).join("");
    }

    // Colors
    if (colorsContainer && p.colors) {
      colorsContainer.innerHTML = p.colors.map(color => `
        <button type="button" class="color-pill ${color === this.selectedColor ? 'active' : ''}" data-color="${color}" aria-label="Select color ${color}">
          ${color}
        </button>
      `).join("");
    }

    // Specs
    if (specsContainer && p.details) {
      specsContainer.innerHTML = p.details.map(item => `
        <li class="specs-item">
          <span class="specs-bullet"></span>
          <span>${item}</span>
        </li>
      `).join("");
    }
  },

  bindEvents() {
    const mainImgEl = document.getElementById("pDetailMainImage");
    const thumbsContainer = document.getElementById("pDetailThumbnails");
    const sizesContainer = document.getElementById("pDetailSizes");
    const colorsContainer = document.getElementById("pDetailColors");
    const selectedSizeLabel = document.getElementById("selectedSizePreview");
    const selectedColorLabel = document.getElementById("selectedColorPreview");
    const qtyVal = document.getElementById("pDetailQtyVal");
    const qtyMinusBtn = document.getElementById("qtyMinusBtn");
    const qtyPlusBtn = document.getElementById("qtyPlusBtn");
    const addCartBtn = document.getElementById("btnAddToCart");
    const buyNowBtn = document.getElementById("btnBuyNow");

    // Thumbnail switching
    if (thumbsContainer) {
      thumbsContainer.addEventListener("click", e => {
        const btn = e.target.closest(".thumb-btn");
        if (!btn) return;
        const idx = parseInt(btn.dataset.index, 10);
        thumbsContainer.querySelectorAll(".thumb-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (mainImgEl && this.currentProduct.images[idx]) {
          mainImgEl.src = this.currentProduct.images[idx];
        }
      });
    }

    // Size selection
    if (sizesContainer) {
      sizesContainer.addEventListener("click", e => {
        const btn = e.target.closest(".size-pill");
        if (!btn) return;
        sizesContainer.querySelectorAll(".size-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedSize = btn.dataset.size;
        if (selectedSizeLabel) selectedSizeLabel.textContent = this.selectedSize;
      });
    }

    // Color selection
    if (colorsContainer) {
      colorsContainer.addEventListener("click", e => {
        const btn = e.target.closest(".color-pill");
        if (!btn) return;
        colorsContainer.querySelectorAll(".color-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedColor = btn.dataset.color;
        if (selectedColorLabel) selectedColorLabel.textContent = this.selectedColor;
      });
    }

    // Quantity
    if (qtyMinusBtn) {
      qtyMinusBtn.addEventListener("click", () => {
        if (this.quantity > 1) {
          this.quantity--;
          if (qtyVal) qtyVal.textContent = this.quantity;
        }
      });
    }

    if (qtyPlusBtn) {
      qtyPlusBtn.addEventListener("click", () => {
        if (this.quantity < 10) {
          this.quantity++;
          if (qtyVal) qtyVal.textContent = this.quantity;
        }
      });
    }

    // Add To Cart
    if (addCartBtn) {
      addCartBtn.addEventListener("click", () => {
        if (typeof Cart !== "undefined") {
          Cart.addItem(this.currentProduct, this.selectedSize, this.selectedColor, this.quantity);
        }
      });
    }

    // Buy Now -> Coming Soon Modal
    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
        if (typeof openComingSoonModal === "function") {
          openComingSoonModal();
        }
      });
    }
  },

  renderRelated() {
    const relatedContainer = document.getElementById("relatedProductsGrid");
    if (!relatedContainer || !this.currentProduct) return;

    const related = getRelatedProducts(this.currentProduct.id, 4);
    relatedContainer.innerHTML = related.map(p => `
      <article class="product-card reveal is-revealed" data-id="${p.id}">
        <div class="product-card-media">
          <img src="${p.images[0]}" alt="${p.name} from Loopni" class="product-card-img" width="800" height="1000" loading="lazy" />
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          ${p.discount ? `<span class="product-badge discount-badge" style="left: auto; right: 12px;">${p.discount}% OFF</span>` : ''}
          <a href="product.html?id=${p.id}" class="product-quick-view">View Product</a>
        </div>
        <div class="product-card-body">
          <span class="product-card-cat">${p.category}</span>
          <h3 class="product-card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="product-card-prices">
            <span class="price-current">₹${p.price.toLocaleString("en-IN")}</span>
            <span class="price-original">₹${p.originalPrice.toLocaleString("en-IN")}</span>
            <span class="price-discount">${p.discount}% OFF</span>
          </div>
        </div>
      </article>
    `).join("");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("pDetailTitle")) {
    ProductDetailController.init();
  }
});
