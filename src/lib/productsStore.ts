"use client";

export type ProductCategory = "skincare-beauty" | "food-beverages";
export type ProductStockStatus = "in_stock" | "low_stock" | "pre_order" | "out_of_stock";
export type ComplianceStatus =
  | "CDSCO Form 43 Registered"
  | "FSSAI Green Dot (Veg)"
  | "FSSAI Brown Dot (Non-Veg)"
  | "Documentation Pending";
export type ProductStatus = "active" | "draft" | "archived";

export interface Product {
  id: string; // e.g. "PRD-SKN-101"
  sku: string;
  name: string;
  koreanName: string;
  brand: string;
  category: ProductCategory;
  subCategory: string;
  hsnCode: string;
  tradePrice: number; // Wholesale / B2B Price (INR)
  mrp: number; // Retail Price (INR)
  moq: string; // Minimum Order Quantity
  stock: number; // Current warehouse units
  stockStatus: ProductStockStatus;
  complianceStatus: ComplianceStatus;
  shelfLifeMonths: number;
  status: ProductStatus;
  featured?: boolean;
  description: string;
  updatedAt: string;
}

const STORAGE_KEY_PRODUCTS = "m5c_products_catalog";
const EVENT_PRODUCTS_UPDATED = "m5c_products_updated";

export const INITIAL_PRODUCTS: Product[] = [
  // --- Skincare & Beauty ---
  {
    id: "PRD-SKN-101",
    sku: "SKN-1004-AMP-100",
    name: "Madagascar Centella Asiatica Ampoule 100ml",
    koreanName: "마다가스카르 센텔라 앰플 100ml",
    brand: "Skin1004",
    category: "skincare-beauty",
    subCategory: "Serums & Essences",
    hsnCode: "33049910",
    tradePrice: 780,
    mrp: 1550,
    moq: "48 units (1 carton)",
    stock: 420,
    stockStatus: "in_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 36,
    status: "active",
    featured: true,
    description: "100% Centella Asiatica extract from Madagascar. Soothes sensitive and acne-prone skin, restores hydration barrier.",
    updatedAt: "27 Nov 2026, 03:30 PM",
  },
  {
    id: "PRD-SKN-102",
    sku: "BOJ-SUN-PRO-50",
    name: "Relief Sun: Rice + Probiotics SPF50+ PA++++ (50ml)",
    koreanName: "맑은쌀선크림: 쌀 + 프로바이오틱스 50ml",
    brand: "Beauty of Joseon",
    category: "skincare-beauty",
    subCategory: "Sunscreens",
    hsnCode: "33049910",
    tradePrice: 620,
    mrp: 1250,
    moq: "60 units (1 carton)",
    stock: 650,
    stockStatus: "in_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 30,
    status: "active",
    featured: true,
    description: "Organic chemical sunscreen with 30% rice extract and fermented grain probiotics. Non-greasy finish ideal for warm Indian weather.",
    updatedAt: "27 Nov 2026, 01:15 PM",
  },
  {
    id: "PRD-SKN-103",
    sku: "ANU-HTL-TON-250",
    name: "Heartleaf 77% Soothing Toner 250ml",
    koreanName: "어성초 77% 진정 토너 250ml",
    brand: "Anua",
    category: "skincare-beauty",
    subCategory: "Toners",
    hsnCode: "33049910",
    tradePrice: 850,
    mrp: 1750,
    moq: "36 units",
    stock: 280,
    stockStatus: "in_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 36,
    status: "active",
    featured: true,
    description: "Sub-acidic soothing toner with 77% Houttuynia Cordata (Heartleaf) extract. Excellent for calming redness and balancing sebum.",
    updatedAt: "26 Nov 2026, 05:40 PM",
  },
  {
    id: "PRD-SKN-104",
    sku: "CSX-SNL-ESS-100",
    name: "Advanced Snail 96 Mucin Power Essence 100ml",
    koreanName: "어드밴스드 스네일 96 뮤신 파워 에센스",
    brand: "COSRX",
    category: "skincare-beauty",
    subCategory: "Serums & Essences",
    hsnCode: "33049910",
    tradePrice: 690,
    mrp: 1450,
    moq: "48 units",
    stock: 350,
    stockStatus: "in_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 36,
    status: "active",
    featured: true,
    description: "Enriched with 96.3% Snail Secretion Filtrate for deep hydration, skin elasticity, and texture repair.",
    updatedAt: "25 Nov 2026, 02:20 PM",
  },
  {
    id: "PRD-SKN-105",
    sku: "RND-BRC-SUN-50",
    name: "Birch Juice Moisturizing Sun Cream SPF50+ 50ml",
    koreanName: "자작나무 수분 선크림 50ml",
    brand: "Round Lab",
    category: "skincare-beauty",
    subCategory: "Sunscreens",
    hsnCode: "33049910",
    tradePrice: 710,
    mrp: 1499,
    moq: "50 units",
    stock: 90,
    stockStatus: "low_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 30,
    status: "active",
    featured: false,
    description: "Hydrating sun screen enriched with Inje Birch Tree sap and Vita Hyaluronic acid. Award-winning lightweight texture.",
    updatedAt: "25 Nov 2026, 11:10 AM",
  },
  {
    id: "PRD-SKN-106",
    sku: "TRT-MSK-CUS-18",
    name: "Mask Fit Red Cushion Foundation (21N / 23N / 25N)",
    koreanName: "마스크 핏 레드 쿠션 18g",
    brand: "TirTir",
    category: "skincare-beauty",
    subCategory: "Beauty & Personal Care",
    hsnCode: "33049910",
    tradePrice: 980,
    mrp: 1990,
    moq: "30 units",
    stock: 160,
    stockStatus: "in_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 36,
    status: "active",
    featured: true,
    description: "High-coverage, 72-hour transfer-proof semi-matte cushion foundation with Hibiscus and Red Propolis extract.",
    updatedAt: "24 Nov 2026, 04:00 PM",
  },
  {
    id: "PRD-SKN-107",
    sku: "BNL-CLN-BAL-100",
    name: "Clean It Zero Original Cleansing Balm 100ml",
    koreanName: "클린 잇 제로 클렌징 밤 오리지널 100ml",
    brand: "Banila Co",
    category: "skincare-beauty",
    subCategory: "Face Cleansers",
    hsnCode: "33049910",
    tradePrice: 650,
    mrp: 1350,
    moq: "36 units",
    stock: 210,
    stockStatus: "in_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 36,
    status: "active",
    featured: false,
    description: "Hypoallergenic cleansing balm transforms from sherbet to oil. Melts stubborn waterproof makeup and clears pores.",
    updatedAt: "23 Nov 2026, 10:15 AM",
  },
  {
    id: "PRD-SKN-108",
    sku: "MED-NMF-MSK-10",
    name: "N.M.F Aquaring Ampoule Mask EX (Box of 10)",
    koreanName: "N.M.F 아쿠아링 앰플 마스크 EX (10매)",
    brand: "Mediheal",
    category: "skincare-beauty",
    subCategory: "Sheet Masks",
    hsnCode: "33049910",
    tradePrice: 520,
    mrp: 1100,
    moq: "40 boxes",
    stock: 310,
    stockStatus: "in_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 36,
    status: "active",
    featured: false,
    description: "Natural Moisturizing Factor (NMF) ampoule mask with Hyaluronic Acid and Ceramide for intense skin replenishment.",
    updatedAt: "22 Nov 2026, 03:45 PM",
  },
  {
    id: "PRD-SKN-109",
    sku: "TOR-DIV-SER-50",
    name: "DIVE-IN Low Molecular Hyaluronic Acid Serum 50ml",
    koreanName: "다이브인 저분자 히알루론산 세럼 50ml",
    brand: "Torriden",
    category: "skincare-beauty",
    subCategory: "Serums & Essences",
    hsnCode: "33049910",
    tradePrice: 790,
    mrp: 1620,
    moq: "36 units",
    stock: 45,
    stockStatus: "low_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 36,
    status: "active",
    featured: false,
    description: "5D Complex Low-Molecular Hyaluronic Acid delivers rapid soothing and intense core moisture without stickiness.",
    updatedAt: "21 Nov 2026, 01:20 PM",
  },
  {
    id: "PRD-SKN-110",
    sku: "HRH-WND-TON-150",
    name: "Black Rice Hyaluronic Toner 150ml (Fragrance Free)",
    koreanName: "하루하루원더 흑미 히알루론산 토너 150ml",
    brand: "Haruharu Wonder",
    category: "skincare-beauty",
    subCategory: "Toners",
    hsnCode: "33049910",
    tradePrice: 620,
    mrp: 1290,
    moq: "48 units",
    stock: 180,
    stockStatus: "in_stock",
    complianceStatus: "CDSCO Form 43 Registered",
    shelfLifeMonths: 36,
    status: "active",
    featured: false,
    description: "100% Korean fermented black rice extract with ultra-deep absorption via proprietary Ultra Deep Technology.",
    updatedAt: "20 Nov 2026, 12:00 PM",
  },

  // --- Food & Beverages ---
  {
    id: "PRD-FNB-201",
    sku: "SAM-BUL-CRB-130",
    name: "Buldak Carbonara Hot Chicken Flavor Ramen (130g × 5 pk)",
    koreanName: "삼양 불닭볶음면 까르보 (130g × 5입)",
    brand: "Samyang",
    category: "food-beverages",
    subCategory: "Korean Instant Noodles",
    hsnCode: "19023010",
    tradePrice: 380,
    mrp: 675,
    moq: "32 multipacks (1 master carton)",
    stock: 820,
    stockStatus: "in_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 12,
    status: "active",
    featured: true,
    description: "Creamy cheese and spicy chicken carbonara flavor ramen. High demand on quick-commerce and gourmet retail channels.",
    updatedAt: "27 Nov 2026, 02:10 PM",
  },
  {
    id: "PRD-FNB-202",
    sku: "SAM-BUL-2XS-140",
    name: "Buldak 2x Spicy Hot Chicken Ramen (140g × 5 pk)",
    koreanName: "삼양 핵불닭볶음면 2X 스파이시 (140g × 5입)",
    brand: "Samyang",
    category: "food-beverages",
    subCategory: "Korean Instant Noodles",
    hsnCode: "19023010",
    tradePrice: 360,
    mrp: 650,
    moq: "32 multipacks (1 master carton)",
    stock: 540,
    stockStatus: "in_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 12,
    status: "active",
    featured: true,
    description: "The viral extreme spicy ramyeon challenge noodle pack with 10,000 Scoville Heat Units. Certified Halal / Vegetarian.",
    updatedAt: "27 Nov 2026, 11:50 AM",
  },
  {
    id: "PRD-FNB-203",
    sku: "NSM-SHN-RAM-120",
    name: "Shin Ramyun Gourmet Spicy Noodles (120g × 5 pk)",
    koreanName: "농심 신라면 얼큰한맛 (120g × 5입)",
    brand: "Nongshim",
    category: "food-beverages",
    subCategory: "Korean Instant Noodles",
    hsnCode: "19023010",
    tradePrice: 340,
    mrp: 625,
    moq: "30 multipacks (1 carton)",
    stock: 710,
    stockStatus: "in_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 12,
    status: "active",
    featured: true,
    description: "Korea's #1 iconic soup ramyeon featuring rich spicy broth, chewy noodles, and shiitake mushroom flakes.",
    updatedAt: "26 Nov 2026, 03:20 PM",
  },
  {
    id: "PRD-FNB-204",
    sku: "OTG-JIN-SPC-120",
    name: "Ottogi Jin Ramen Spicy (120g × 5 pk)",
    koreanName: "오뚜기 진라면 매운맛 (120g × 5입)",
    brand: "Ottogi",
    category: "food-beverages",
    subCategory: "Korean Instant Noodles",
    hsnCode: "19023010",
    tradePrice: 290,
    mrp: 540,
    moq: "32 multipacks (1 carton)",
    stock: 390,
    stockStatus: "in_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 12,
    status: "active",
    featured: false,
    description: "Classic Korean savory broth with balanced umami chili spice and premium wheat noodles.",
    updatedAt: "25 Nov 2026, 04:45 PM",
  },
  {
    id: "PRD-FNB-205",
    sku: "CJH-GCH-PST-500",
    name: "Haechandle Gochujang Hot Pepper Paste 500g Tub",
    koreanName: "CJ 해찬들 태양초 골드 고추장 500g",
    brand: "CJ CheilJedang",
    category: "food-beverages",
    subCategory: "Sauces & Condiments",
    hsnCode: "21039090",
    tradePrice: 280,
    mrp: 520,
    moq: "24 tubs (1 carton)",
    stock: 450,
    stockStatus: "in_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 18,
    status: "active",
    featured: true,
    description: "Authentic naturally sun-dried red chili pepper paste. Essential Korean cooking ingredient for tteokbokki, stews, and bibimbap.",
    updatedAt: "24 Nov 2026, 01:10 PM",
  },
  {
    id: "PRD-FNB-206",
    sku: "BGG-BNA-MLK-200",
    name: "Binggrae Banana Flavoured Milk Drink (200ml × 6 pk)",
    koreanName: "빙그레 바나나맛 우유 (200ml × 6입)",
    brand: "Binggrae",
    category: "food-beverages",
    subCategory: "Korean Beverages",
    hsnCode: "22029990",
    tradePrice: 420,
    mrp: 750,
    moq: "20 packs (1 carton)",
    stock: 120,
    stockStatus: "in_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 9,
    status: "active",
    featured: true,
    description: "Iconic sweet and creamy banana flavored dairy drink loved globally. Imported in refrigerated temperature-controlled freight.",
    updatedAt: "23 Nov 2026, 11:00 AM",
  },
  {
    id: "PRD-FNB-207",
    sku: "ORN-CHC-PIE-12",
    name: "Orion Choco Pie Original (Korean Edition, 12 pcs / 468g)",
    koreanName: "오리온 초코파이 정 12개입",
    brand: "Orion",
    category: "food-beverages",
    subCategory: "Korean Snacks",
    hsnCode: "19059040",
    tradePrice: 260,
    mrp: 460,
    moq: "24 boxes (1 carton)",
    stock: 330,
    stockStatus: "in_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 12,
    status: "active",
    featured: false,
    description: "Soft chocolate coated sponge cake with fluffy marshmallow center. Made with premium Korean recipe formulation.",
    updatedAt: "22 Nov 2026, 02:40 PM",
  },
  {
    id: "PRD-FNB-208",
    sku: "DGW-SEA-SNK-15",
    name: "Seasoned Roasted Seaweed Laver Snack (5g × 3 pk)",
    koreanName: "동원 양반 들기름김 (5g × 3봉)",
    brand: "Dongwon",
    category: "food-beverages",
    subCategory: "Seaweed Products",
    hsnCode: "20089999",
    tradePrice: 150,
    mrp: 299,
    moq: "40 sets (1 carton)",
    stock: 260,
    stockStatus: "in_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 12,
    status: "active",
    featured: false,
    description: "Crispy Korean roasted seaweed with wild sesame oil and sea salt. Zero cholesterol, keto and vegan friendly snack.",
    updatedAt: "21 Nov 2026, 09:30 AM",
  },
  {
    id: "PRD-FNB-209",
    sku: "JNG-MAT-KMC-500",
    name: "Jongga Mat Kimchi Cut Napa Cabbage (500g Jar)",
    koreanName: "종가 맛김치 배추김치 500g",
    brand: "Jongga",
    category: "food-beverages",
    subCategory: "Korean Specialty Food",
    hsnCode: "20059900",
    tradePrice: 390,
    mrp: 699,
    moq: "18 jars (Cold Chain)",
    stock: 80,
    stockStatus: "low_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 6,
    status: "active",
    featured: true,
    description: "Authentic Korean fermented napa cabbage kimchi in airtight sealed glass jar. Stored at 0-4°C cold chain logistics.",
    updatedAt: "20 Nov 2026, 04:15 PM",
  },
  {
    id: "PRD-FNB-210",
    sku: "PLD-POR-STR-235",
    name: "Pororo Fruit Drink Strawberry Flavour 235ml",
    koreanName: "팔도 뽀로로 딸기맛 음료 235ml",
    brand: "Paldo",
    category: "food-beverages",
    subCategory: "Korean Beverages",
    hsnCode: "22029990",
    tradePrice: 85,
    mrp: 160,
    moq: "24 bottles (1 case)",
    stock: 0,
    stockStatus: "out_of_stock",
    complianceStatus: "FSSAI Green Dot (Veg)",
    shelfLifeMonths: 12,
    status: "draft",
    featured: false,
    description: "Popular Korean children non-carbonated fruit juice drink with child-safe push-pull cap. Calcium and Vitamin D enriched.",
    updatedAt: "19 Nov 2026, 10:00 AM",
  },
];

// Helper to get products from LocalStorage with fallback
export function getProducts(): Product[] {
  if (typeof window === "undefined") {
    return INITIAL_PRODUCTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PRODUCTS;
  } catch (err) {
    console.error("Error reading products store:", err);
    return INITIAL_PRODUCTS;
  }
}

// Helper to save products
export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event(EVENT_PRODUCTS_UPDATED));
  } catch (err) {
    console.error("Error saving products store:", err);
  }
}

// Get single product
export function getProductById(id: string): Product | undefined {
  const products = getProducts();
  return products.find((p) => p.id === id);
}

// Add new product
export function addProduct(data: Omit<Product, "id" | "updatedAt">): Product {
  const products = getProducts();
  const nextNumber = products.length + 101;
  const prefix = data.category === "skincare-beauty" ? "PRD-SKN" : "PRD-FNB";
  const id = `${prefix}-${nextNumber}`;

  const now = new Date();
  const formattedDate = `${now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}, ${now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;

  const newProduct: Product = {
    ...data,
    id,
    updatedAt: formattedDate,
  };

  const updated = [newProduct, ...products];
  saveProducts(updated);
  return newProduct;
}

// Update existing product
export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const now = new Date();
  const formattedDate = `${now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}, ${now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;

  const updatedProduct: Product = {
    ...products[idx],
    ...updates,
    updatedAt: formattedDate,
  };

  products[idx] = updatedProduct;
  saveProducts(products);
  return updatedProduct;
}

// Delete product
export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

// Duplicate product
export function duplicateProduct(id: string): Product | null {
  const product = getProductById(id);
  if (!product) return null;

  const clone: Omit<Product, "id" | "updatedAt"> = {
    ...product,
    name: `${product.name} (Copy)`,
    sku: `${product.sku}-CPY`,
    stock: Math.floor(product.stock / 2),
    status: "draft",
  };

  return addProduct(clone);
}

// Bulk update status
export function bulkUpdateProductStatus(ids: string[], status: ProductStatus): void {
  const products = getProducts();
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}, ${now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;

  const updated = products.map((p) => {
    if (ids.includes(p.id)) {
      return { ...p, status, updatedAt: formattedDate };
    }
    return p;
  });

  saveProducts(updated);
}

// Bulk delete products
export function bulkDeleteProducts(ids: string[]): void {
  const products = getProducts();
  const filtered = products.filter((p) => !ids.includes(p.id));
  saveProducts(filtered);
}

// Reset products to default seed data
export function resetProductsToDefault(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  window.dispatchEvent(new Event(EVENT_PRODUCTS_UPDATED));
}

// Export products as CSV
export function exportProductsCSV(): void {
  const products = getProducts();
  const headers = [
    "ID",
    "SKU",
    "Name",
    "Korean Name",
    "Brand",
    "Category",
    "SubCategory",
    "HSN Code",
    "Trade Price (INR)",
    "MRP (INR)",
    "MOQ",
    "Stock Units",
    "Stock Status",
    "Compliance Status",
    "Shelf Life (Mo)",
    "Status",
    "Last Updated",
  ];

  const rows = products.map((p) => [
    `"${p.id}"`,
    `"${p.sku}"`,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.koreanName.replace(/"/g, '""')}"`,
    `"${p.brand}"`,
    `"${p.category}"`,
    `"${p.subCategory}"`,
    `"${p.hsnCode}"`,
    p.tradePrice,
    p.mrp,
    `"${p.moq}"`,
    p.stock,
    `"${p.stockStatus}"`,
    `"${p.complianceStatus}"`,
    p.shelfLifeMonths,
    `"${p.status}"`,
    `"${p.updatedAt}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `m5c_korean_products_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export products as JSON
export function exportProductsJSON(): void {
  const products = getProducts();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `m5c_korean_products_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
