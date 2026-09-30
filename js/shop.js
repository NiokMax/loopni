/**
 * Loopni — Shop & Catalog Controller
 * 
 * Manages category filtering, live searching, sorting, and product card rendering.
 */

const ShopController = {
  activeCategory: "All",
  searchQuery: "",
  activeSort: "featured",

  init() {
    this.parseUrlParams();
    this.bindEvents();
    this.render();
  },

  parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    const q = params.get("q");
    const sort = params.get("sort");

    if (cat) this.activeCategory = cat;
    if (q) this.searchQuery = q.trim();
    if (sort) this.activeSort = sort;

    const searchInput = document.getElementById("shopSearchInput");
    if (searchInput && this.searchQuery) {
      searchInput.value = this.searchQuery;
    }

    const sortSelect = document.getElementById("shopSortSelect");
    if (sortSelect && this.activeSort) {
      sortSelect.value = this.activeSort;
    }
  },

  bindEvents() {
    // Category chips
    const chips = document.querySelectorAll(".category-chip");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeCategory = chip.dataset.category || "All";
        this.updateUrl();
        this.render();
      });
    });

    // Sort dropdown
    const sortSelect = document.getElementById("shopSortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", e => {
        this.activeSort = e.target.value;
        this.updateUrl();
        this.render();
      });
    }

    // Search input
    const searchInput = document.getElementById("shopSearchInput");
    const searchForm = document.getElementById("shopSearchForm");

    if (searchInput) {
      searchInput.addEventListener("input", e => {
        this.searchQuery = e.target.value.trim();
        this.updateUrl();
        this.render();
      });
    }

    if (searchForm) {
      searchForm.addEventListener("submit", e => {
        e.preventDefault();
        if (searchInput) {
          this.searchQuery = searchInput.value.trim();
          this.updateUrl();
          this.render();
        }
      });
    }
  },

  updateUrl() {
    const params = new URLSearchParams();
    if (this.activeCategory && this.activeCategory !== "All") params.set("cat", this.activeCategory);
    if (this.searchQuery) params.set("q", this.searchQuery);
    if (this.activeSort && this.activeSort !== "featured") params.set("sort", this.activeSort);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  },

  clearSearch() {
    this.searchQuery = "";
    const searchInput = document.getElementById("shopSearchInput");
    if (searchInput) searchInput.value = "";
    this.updateUrl();
    this.render();
  },

  filterAndSortProducts() {
    if (typeof products === "undefined") return [];

    let list = [...products];

    // 1. Filter by category
    if (this.activeCategory && this.activeCategory !== "All") {
      list = list.filter(p => p.category.toLowerCase() === this.activeCategory.toLowerCase());
    }

    // 2. Filter by search query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 3. Sort
    switch (this.activeSort) {
      case "newest":
        list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  },

  render() {
    const grid = document.getElementById("shopProductGrid");
    const countEl = document.getElementById("shopResultsCount");
    const activeSearchNotice = document.getElementById("activeSearchNotice");
    if (!grid) return;

    // Update active category chip
    document.querySelectorAll(".category-chip").forEach(chip => {
      if ((chip.dataset.category || "All").toLowerCase() === this.activeCategory.toLowerCase()) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });

    // Update active search bar notice
    if (activeSearchNotice) {
      if (this.searchQuery) {
        activeSearchNotice.innerHTML = `
          <div class="search-active-pill">
            <span>Searching for: <strong>"${this.searchQuery}"</strong></span>
            <button type="button" class="clear-search-btn" onclick="ShopController.clearSearch()" aria-label="Clear search">✕ Clear</button>
          </div>
        `;
        activeSearchNotice.style.display = "block";
      } else {
        activeSearchNotice.innerHTML = "";
        activeSearchNotice.style.display = "none";
      }
    }

    const filtered = this.filterAndSortProducts();

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-results" style="grid-column: 1 / -1;">
          <h3 class="empty-results-title">NO PRODUCTS FOUND</h3>
          <p class="empty-results-desc">We couldn't find any products matching your current filters or search term.</p>
          <button type="button" class="btn btn-secondary" onclick="ShopController.clearSearch(); ShopController.activeCategory='All'; ShopController.render();">
            View All Products
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => `
      <article class="product-card reveal is-revealed" data-id="${p.id}">
        <div class="product-card-media">
          <img src="${p.images[0]}" alt="${p.name} from Loopni" class="product-card-img" width="800" height="1000" loading="lazy" />
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          ${p.discount ? `<span class="product-badge discount-badge" style="left: auto; right: 12px;">${p.discount}% OFF</span>` : ''}
          <a href="product.html?id=${p.id}" class="product-quick-view">View Product</a>
        </div>
        <div class="product-card-body">
          <span class="product-card-cat">${p.category}</span>
          <h2 class="product-card-title"><a href="product.html?id=${p.id}">${p.name}</a></h2>
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
  if (document.getElementById("shopProductGrid")) {
    ShopController.init();
  }
});
