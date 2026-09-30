/**
 * Loopni — Central Product Database
 * 
 * All products on Loopni are defined here.
 * To add, edit, or remove products, modify this array.
 * Prices are in Indian Rupees (INR - ₹).
 */

const products = [
  {
    id: 1,
    name: "Oversized Black T-Shirt",
    category: "T-Shirts",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    images: [
      "assets/images/products/oversized-black-tshirt-1.svg",
      "assets/images/products/oversized-black-tshirt-2.svg"
    ],
    description: "A relaxed everyday oversized t-shirt crafted from heavy 240 GSM combed cotton. Built with drop shoulders and a ribbed collar for an effortless streetwear silhouette.",
    details: [
      "240 GSM 100% Combed Cotton",
      "Relaxed drop-shoulder oversized fit",
      "Pre-shrunk fabric to prevent post-wash shrinkage",
      "Bio-washed for ultra-soft handfeel",
      "Designed for everyday wear in Indian climates"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Jet Black", "Washed Charcoal"],
    featured: true,
    newArrival: true,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Classic White T-Shirt",
    category: "T-Shirts",
    price: 699,
    originalPrice: 999,
    discount: 30,
    images: [
      "assets/images/products/classic-white-tshirt-1.svg",
      "assets/images/products/classic-white-tshirt-2.svg"
    ],
    description: "The foundational white tee perfected. Tailored in a modern regular fit using breathable 200 GSM organic cotton that stays crisp throughout the day.",
    details: [
      "200 GSM 100% Ring-Spun Cotton",
      "Structured regular fit",
      "Reinforced neckline that holds its shape",
      "Opaque fabric with zero sheer transparency",
      "Machine wash cold, air dry"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Pure White", "Natural Off-White"],
    featured: true,
    newArrival: false,
    badge: "Essential"
  },
  {
    id: 3,
    name: "Minimal Graphic Tee",
    category: "T-Shirts",
    price: 849,
    originalPrice: 1299,
    discount: 35,
    images: [
      "assets/images/products/minimal-graphic-tee-1.svg",
      "assets/images/products/minimal-graphic-tee-2.svg"
    ],
    description: "Clean aesthetic graphic t-shirt featuring subtle typography inspired by modern minimalism. Boxy cut with breathable premium cotton.",
    details: [
      "220 GSM High-density cotton",
      "Screen-printed minimal typographic artwork",
      "Fade-resistant plastisol ink with breathable finish",
      "Boxy streetwear cut with wide sleeves"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Sage Green", "Slate Grey"],
    featured: true,
    newArrival: true,
    badge: "Trending"
  },
  {
    id: 4,
    name: "Relaxed Fit Hoodie",
    category: "Hoodies",
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    images: [
      "assets/images/products/relaxed-fit-hoodie-1.svg",
      "assets/images/products/relaxed-fit-hoodie-2.svg"
    ],
    description: "Heavyweight fleece hoodie designed for cozy evenings and clean layering. Features a structured double-layer hood without drawstrings for a modern clean look.",
    details: [
      "360 GSM Cotton-rich fleece interior",
      "Double-lined hood with self-fabric weight",
      "Seamless kangaroo front pouch",
      "Durable 2x2 ribbed cuffs and hem"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal Grey", "Earth Mocha"],
    featured: true,
    newArrival: true,
    badge: "Warmth"
  },
  {
    id: 5,
    name: "Essential Sweatshirt",
    category: "Hoodies",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    images: [
      "assets/images/products/essential-sweatshirt-1.svg",
      "assets/images/products/essential-sweatshirt-2.svg"
    ],
    description: "A timeless crewneck sweatshirt built from plush brushed cotton fleece. Perfect as a standalone statement or layered over tees.",
    details: [
      "320 GSM Brushed Cotton Fleece",
      "Clean crew neck design with triangular V-stitch",
      "Ribbed collar, cuffs, and waist band",
      "Soft brushed fleece inside"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Forest Green", "Heather Grey"],
    featured: true,
    newArrival: false,
    badge: "Signature"
  },
  {
    id: 6,
    name: "Everyday Cargo Pants",
    category: "Pants",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    images: [
      "assets/images/products/everyday-cargo-pants-1.svg",
      "assets/images/products/everyday-cargo-pants-2.svg"
    ],
    description: "Versatile relaxed cargos constructed from durable cotton twill. Features functional deep utility pockets and adjustable ankle cuffs for customizable styling.",
    details: [
      "100% Durable Cotton Twill weave",
      "6-pocket utility configuration with buttoned flaps",
      "Relaxed taper cut with ankle bungee toggles",
      "Heavy duty YKK zip fly and reinforced belt loops"
    ],
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Military Olive", "Dusk Black"],
    featured: true,
    newArrival: true,
    badge: "Popular"
  },
  {
    id: 7,
    name: "Minimal Streetwear Joggers",
    category: "Pants",
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    images: [
      "assets/images/products/streetwear-joggers-1.svg",
      "assets/images/products/streetwear-joggers-2.svg"
    ],
    description: "Comfort meets streetwear in our tailored heavyweight joggers. Built with deep zippered security pockets and a flexible drawstring waist.",
    details: [
      "300 GSM French Terry loopback cotton",
      "Tailored slim-straight fit with ribbed ankle cuffs",
      "Concealed side zipper pockets for secure carry",
      "Elastic waistband with dipped metal-tip drawcords"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Dark Khaki", "Washed Black"],
    featured: false,
    newArrival: false,
    badge: "Comfort"
  },
  {
    id: 8,
    name: "Casual Overshirt",
    category: "Hoodies",
    price: 1449,
    originalPrice: 2099,
    discount: 31,
    images: [
      "assets/images/products/casual-overshirt-1.svg",
      "assets/images/products/casual-overshirt-2.svg"
    ],
    description: "Heavy textured cotton overshirt designed for easy all-season layering. Dual chest pockets with matte tortoiseshell buttons.",
    details: [
      "100% Structured Heavyweight Woven Cotton",
      "Relaxed overshirt profile suitable as light jacket",
      "Dual flap chest pockets",
      "Reinforced elbow seam details"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Desert Beige", "Navy Blue"],
    featured: true,
    newArrival: true,
    badge: "Layering"
  },
  {
    id: 9,
    name: "Classic Baseball Cap",
    category: "Accessories",
    price: 499,
    originalPrice: 799,
    discount: 38,
    images: [
      "assets/images/products/baseball-cap-1.svg",
      "assets/images/products/baseball-cap-2.svg"
    ],
    description: "Unstructured 6-panel dad cap made from washed cotton canvas. Features a curved brim, embroidered ventilation eyelets, and an antique brass strap buckle.",
    details: [
      "100% Washed Cotton Canvas",
      "Unstructured low-profile 6-panel design",
      "Adjustable fabric strap with brass slider clasp",
      "Curved visor with 8 rows of stitching",
      "One size fits all"
    ],
    sizes: ["Free Size"],
    colors: ["Washed Black", "Olive Drab"],
    featured: true,
    newArrival: false,
    badge: "Accessory"
  },
  {
    id: 10,
    name: "Minimal Crossbody Bag",
    category: "Bags",
    price: 899,
    originalPrice: 1399,
    discount: 36,
    images: [
      "assets/images/products/crossbody-bag-1.svg",
      "assets/images/products/crossbody-bag-2.svg"
    ],
    description: "Compact daily bag engineered from water-resistant ballistic nylon. Designed to carry your phone, wallet, keys, and everyday pocket essentials securely.",
    details: [
      "High-density water-resistant nylon shell",
      "Dual zip compartments with interior mesh organizer",
      "Adjustable woven nylon webbing shoulder strap",
      "Heavy duty quick-release buckle clasp"
    ],
    sizes: ["One Size"],
    colors: ["Matte Black", "Coyote Tan"],
    featured: true,
    newArrival: true,
    badge: "Utility"
  },
  {
    id: 11,
    name: "Everyday Tote Bag",
    category: "Bags",
    price: 599,
    originalPrice: 899,
    discount: 33,
    images: [
      "assets/images/products/everyday-tote-bag-1.svg",
      "assets/images/products/everyday-tote-bag-2.svg"
    ],
    description: "Heavy-duty 14oz canvas tote bag designed for market runs, laptops, or weekend travels. Reinforced cross-stitched handles for maximum durability.",
    details: [
      "14oz Heavyweight unbleached organic cotton canvas",
      "Interior zip pocket for phone and keys",
      "Reinforced boxed bottom for structured stand",
      "Comfortable long shoulder drop handles"
    ],
    sizes: ["One Size (16L)"],
    colors: ["Natural Ecru", "Pitch Black"],
    featured: true,
    newArrival: false,
    badge: "Eco-Friendly"
  },
  {
    id: 12,
    name: "Minimal Canvas Belt",
    category: "Accessories",
    price: 399,
    originalPrice: 599,
    discount: 33,
    images: [
      "assets/images/products/canvas-belt-1.svg",
      "assets/images/products/canvas-belt-2.svg"
    ],
    description: "Durable tactical webbed canvas belt with an oxidized black sliding clamp buckle. Fully adjustable to any waist measurement without punch holes.",
    details: [
      "High-tensile woven cotton-poly blend webbing",
      "Anti-allergy matte alloy slide buckle",
      "Customizable length with cut-and-clamp buckle",
      "Width: 38mm (standard belt loops)"
    ],
    sizes: ["Free Size (Up to 44)"],
    colors: ["Stealth Black", "Army Khaki"],
    featured: false,
    newArrival: false,
    badge: "Durable"
  }
];

// Helper functions for easy querying
function getProductById(id) {
  const numericId = parseInt(id, 10);
  return products.find(p => p.id === numericId) || null;
}

function getFeaturedProducts(limit = 8) {
  return products.filter(p => p.featured).slice(0, limit);
}

function getProductsByCategory(category) {
  if (!category || category === "All") return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function getRelatedProducts(currentId, limit = 4) {
  const current = getProductById(currentId);
  if (!current) return products.slice(0, limit);
  return products
    .filter(p => p.id !== current.id && p.category === current.category)
    .concat(products.filter(p => p.id !== current.id && p.category !== current.category))
    .slice(0, limit);
}
