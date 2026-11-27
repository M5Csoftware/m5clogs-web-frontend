export interface SubCategory {
  id: string;
  name: string;
  kr: string;
  artKey: string;
  desc: string;
  types: string[];
}

export interface CategoryData {
  name: string;
  kr: string;
  tint: string;
  cls: string;
  lead: string;
  intro: string;
  subs: SubCategory[];
}

export interface InsightPost {
  slug: string;
  cat: string;
  date: string;
  featured?: boolean;
  cover: string;
  bg: string;
  title: string;
  desc: string;
  links: string[];
  body: string;
  sources: [string, string][];
}

export const CONFIG = {
  siteUrl: "https://www.m5clogs.in",
  brandName: "M5 Clogs.in",
  companyName: "M5 Clogs.in — Korea to India",
  tagline: "한국의 좋은 것을, 인도로 (Bringing Korea's finest to India)",
  whatsapp: "919800000000",
  email: "contact@m5clogs.in",
  phone: "+91 11 4987 8800",
  address: "New Delhi, India & Seoul, South Korea",
  responseTime: "1 business day",
  directToConsumer: false,
};

export const CATS: Record<string, CategoryData> = {
  "skincare-beauty": {
    name: "Korean Skincare & Beauty",
    kr: "뷰티",
    tint: "#FBE3DD",
    cls: "beauty",
    lead: "Cleansers, toners, serums, moisturisers, sunscreens, sheet masks and personal care from South Korea, for India's retailers, salons and online sellers.",
    intro:
      "Korean skincare is known for layered routines, gentle textures and lightweight sun protection. We source products suited to Indian climates and shoppers, and coordinate the import registration and labelling each product needs.",
    subs: [
      {
        id: "cleansers",
        name: "Face Cleansers",
        kr: "클렌저",
        artKey: "cleanser",
        desc: "Foam, gel and oil cleansers, including the double-cleanse step K-beauty is known for.",
        types: ["Foam cleansers", "Gel cleansers", "Cleansing oils", "Cleansing balms"],
      },
      {
        id: "toners",
        name: "Toners",
        kr: "토너",
        artKey: "toner",
        desc: "Hydrating and balancing toners that prep skin after cleansing.",
        types: ["Hydrating toners", "Exfoliating toners", "Toner pads"],
      },
      {
        id: "serums",
        name: "Serums & Essences",
        kr: "세럼",
        artKey: "serum",
        desc: "Lightweight, targeted treatments, often the step shoppers come to Korean skincare for.",
        types: ["Essences", "Serums", "Ampoules"],
      },
      {
        id: "moisturisers",
        name: "Moisturisers",
        kr: "크림",
        artKey: "cream",
        desc: "Gel creams for humid weather and richer creams for dry seasons.",
        types: ["Gel creams", "Barrier creams", "Sleeping masks"],
      },
      {
        id: "sunscreens",
        name: "Sunscreens",
        kr: "선크림",
        artKey: "sunscreen",
        desc: "Lightweight sunscreens, one of the most searched Korean beauty categories in India.",
        types: ["Sun creams", "Sun gels", "Sun sticks"],
      },
      {
        id: "sheet-masks",
        name: "Sheet Masks",
        kr: "마스크",
        artKey: "mask",
        desc: "Single-use masks that work well for gifting, trial packs and impulse buys.",
        types: ["Sheet masks", "Wash-off masks", "Patches"],
      },
      {
        id: "personal-care",
        name: "Beauty & Personal Care",
        kr: "쿠션",
        artKey: "care",
        desc: "Cushion compacts, lip care, hair and body care.",
        types: ["Cushion compacts", "Lip care", "Hair care", "Body care"],
      },
    ],
  },
  "food-beverages": {
    name: "Korean Food & Beverages",
    kr: "식품",
    tint: "#E7EFEA",
    cls: "food",
    lead: "Ramyeon, snacks, sauces, seaweed, drinks and ready-to-eat meals from South Korea, for supermarkets, food retailers, cafés and online stores.",
    intro:
      "K-dramas, K-pop and food content have made Korean flavours familiar to Indian shoppers. We focus on products that travel well, have the shelf life Indian import clearance requires, and can be labelled correctly for India, including the vegetarian and non-vegetarian mark.",
    subs: [
      {
        id: "instant-noodles",
        name: "Korean Instant Noodles",
        kr: "라면",
        artKey: "noodles",
        desc: "Ramyeon in packs and cups, from mild to famously spicy, with vegetarian options clearly marked.",
        types: ["Packet ramyeon", "Cup noodles", "Stir-fry noodles"],
      },
      {
        id: "snacks",
        name: "Korean Snacks",
        kr: "과자",
        artKey: "snacks",
        desc: "Crisps, crackers, biscuits and sweets for modern retail and online stores.",
        types: ["Crisps", "Biscuits", "Confectionery"],
      },
      {
        id: "sauces",
        name: "Sauces & Condiments",
        kr: "고추장",
        artKey: "sauce",
        desc: "Gochujang, doenjang, soy-based and barbecue sauces for home cooks and restaurants.",
        types: ["Gochujang", "Doenjang", "Marinades", "Dressings"],
      },
      {
        id: "seaweed",
        name: "Seaweed Products",
        kr: "김",
        artKey: "seaweed",
        desc: "Roasted seaweed snacks and sheets for kimbap and sushi.",
        types: ["Seaweed snacks", "Kimbap sheets"],
      },
      {
        id: "beverages",
        name: "Korean Beverages",
        kr: "음료",
        artKey: "drinks",
        desc: "Flavoured milk, fruit drinks, teas and sparkling drinks.",
        types: ["Flavoured milk", "Fruit drinks", "Teas", "Sparkling drinks"],
      },
      {
        id: "ready-to-eat",
        name: "Ready-to-Eat Products",
        kr: "즉석밥",
        artKey: "rte",
        desc: "Microwave rice, tteokbokki kits and ready meals.",
        types: ["Instant rice", "Tteokbokki", "Ready meals"],
      },
      {
        id: "specialty",
        name: "Korean Specialty Food",
        kr: "김치",
        artKey: "specialty",
        desc: "Kimchi, rice cakes, teas and pantry staples for specialty stores.",
        types: ["Kimchi", "Rice cakes", "Teas", "Pantry staples"],
      },
    ],
  },
};

export const BCATS: [string, string][] = [
  ["skincare-trends", "Korean Skincare Trends"],
  ["beauty-brands", "Korean Beauty Brands"],
  ["food-snacks", "Korean Food & Snacks"],
  ["korea-india-imports", "South Korea to India Imports"],
  ["international-trade", "International Trade"],
  ["import-regulations", "Import Regulations in India"],
  ["market-insights", "Korean Product Market Insights"],
];

export const bcatName = (s: string) => {
  const match = BCATS.find((c) => c[0] === s);
  return match ? match[1] : s;
};

export const PROCESS = [
  { where: "서울 · Korea", title: "Source", desc: "Shortlist products and brands with Korean manufacturers." },
  { where: "서울 · Korea", title: "Coordinate", desc: "Agree specs, labels, shelf life and documents with suppliers." },
  { where: "→ India", title: "Comply", desc: "Registration and licensing coordinated: CDSCO for cosmetics, FSSAI for food." },
  { where: "→ India", title: "Clear", desc: "Customs clearance coordinated with licensed customs brokers." },
  { where: "인도 · India", title: "Store", desc: "Warehousing and inventory in climate-controlled hubs." },
  { where: "인도 · India", title: "Distribute", desc: "Supply to retailers, wholesalers, distributors and online sellers." },
];

export const PATHS = [
  { type: "catalogue", icon: "book", title: "Request a Wholesale Catalogue", desc: "Product lists and specifications." },
  { type: "distributor", icon: "truck", title: "Become a Distribution Partner", desc: "Regional or category distribution." },
  { type: "bulk", icon: "box", title: "Bulk Purchase Enquiry", desc: "Larger volumes for your business." },
  { type: "brand", icon: "globe", title: "Brand Partnership Enquiry", desc: "For Korean manufacturers and brands." },
  { type: "pricing", icon: "tag", title: "Request Product Pricing", desc: "Price lists and trade terms." },
];

export const CAPS = [
  { icon: "source", title: "Korean product sourcing", desc: "Products identified and sourced with manufacturers and brands in South Korea." },
  { icon: "handshake", title: "Supplier coordination", desc: "Specifications, packaging, labels and production timelines agreed with suppliers." },
  { icon: "doc", title: "Import documentation", desc: "Invoices, packing lists, certificates of origin and product documents prepared." },
  { icon: "shield", title: "Regulatory compliance coordination", desc: "CDSCO cosmetic registration and FSSAI food requirements planned for each product." },
  { icon: "customs", title: "Customs clearance coordination", desc: "Clearance coordinated with licensed customs brokers." },
  { icon: "truck", title: "Warehousing & distribution", desc: "Storage, inventory and delivery to partners across India." },
];

export const POSTS: InsightPost[] = [
  {
    slug: "import-korean-cosmetics-india-cdsco",
    cat: "import-regulations",
    date: "2026-11-12",
    featured: true,
    cover: "serum",
    bg: "#FBE3DD",
    title: "How to import Korean cosmetics into India: CDSCO registration explained",
    desc: "Why every imported cosmetic needs a CDSCO registration certificate, what Forms COS-1 and COS-2 are, and what retailers should check on the label.",
    links: ["skincare-beauty", "import-distribution", "compliance"],
    body: `<p>Every cosmetic imported into India for sale must be registered with the Central Drugs Standard Control Organisation (CDSCO). For retailers and distributors, that registration is the first thing to ask about before taking on a Korean beauty line.</p>
<h2>What has to be registered</h2><p>Under the Cosmetics Rules, 2020, both the cosmetic products and the manufacturing site must be registered with CDSCO before the products are imported. A small number of imports are exempt, such as limited quantities for research, but not goods intended for sale in India.</p>
<h2>Forms COS-1 and COS-2</h2><table><thead><tr><th>Form</th><th>What it is</th></tr></thead><tbody><tr><td>COS-1</td><td>The application for an import registration certificate</td></tr><tr><td>COS-2</td><td>The import registration certificate CDSCO issues</td></tr></tbody></table><p>The application can be made by the manufacturer, its authorised agent, its subsidiary in India, or another importer in India authorised by the manufacturer.</p>
<h2>How long registration lasts</h2><p>A COS-2 certificate remains valid in perpetuity, provided the retention fee is paid before five years from the date of issue. A late fee applies if it is missed.</p>
<h2>What the label must show</h2><ul><li>Labelling that meets the Cosmetics Rules</li><li>The country where the product was actually manufactured, where required</li><li>The importer's name and address and the import registration certificate number. These India-specific details can be added after import.</li></ul>
<h2>Shelf life at import</h2><p>CDSCO's guidance states that the "use before" date of an imported cosmetic should be later than six months from the date of import. Short-dated stock can be refused.</p>
<h2>Questions to ask a Korean beauty supplier</h2><ol><li>Is each product covered by a CDSCO import registration, and in whose name?</li><li>Who is the importer on the label?</li><li>How much shelf life will the stock have when it reaches you?</li><li>Are labels compliant with Indian packaging rules, including MRP and net quantity?</li></ol>
<div class="note">This article is general information, not legal advice. Check current requirements with CDSCO or a regulatory consultant.</div>`,
    sources: [
      ["CDSCO: Frequently asked questions on import of cosmetics", "https://www.cdsco.gov.in/opencms/export/sites/CDSCO_WEB/Pdf-documents/cosmetics/Frequently-Asked-Questions-FAQcosmeticia.pdf"],
      ["CDSCO: Guidance document on registration and import of cosmetics", "https://cdsco.gov.in/opencms/export/sites/CDSCO_WEB/Pdf-documents/cosmetics/Guidance-Document-on-Registration-and-Import-of-cosmetics-into-India-converted.pdf"]
    ]
  },
  {
    slug: "import-korean-food-india-fssai",
    cat: "import-regulations",
    date: "2026-11-05",
    cover: "noodles",
    bg: "#F7E1D5",
    title: "Importing Korean food into India: FSSAI licence, clearance and labelling",
    desc: "The steps from IEC to FSSAI clearance, the shelf-life rule at import, and the label details inspectors check on Korean food products.",
    links: ["food-beverages", "import-distribution", "compliance"],
    body: `<p>Korean ramyeon, snacks and sauces have to clear two checks when they arrive in India: customs, and the Food Safety and Standards Authority of India (FSSAI). Knowing the order of steps helps retailers understand lead times and what to ask their importer.</p>
<h2>1. Importer-Exporter Code</h2><p>An Importer-Exporter Code (IEC) from the Directorate General of Foreign Trade is a prerequisite for the licences and clearances that follow.</p>
<h2>2. FSSAI import licence</h2><p>Food importers need a central FSSAI licence for import, applied for through the FoSCoS portal.</p>
<h2>3. Customs and FICS</h2><p>A customs broker files the Bill of Entry, and the FSSAI clearance application is made through the Food Import Clearance System (FICS) with the IEC, FSSAI licence and Bill of Entry.</p>
<h2>4. Inspection and sampling</h2><p>An authorised officer checks the consignment, including its labelling and remaining shelf life, and draws samples for laboratory testing. A no-objection certificate allows customs to release the goods.</p>
<h2>The shelf-life rule</h2><p>Imported food generally needs more than 60% of its original shelf life remaining at the time of import. For short-life products, that makes planning shipments from Korea essential.</p>
<h2>Label details inspectors check</h2><ul><li>The importer's name and address</li><li>The FSSAI logo and licence number</li><li>The vegetarian or non-vegetarian symbol</li><li>Ingredients, net quantity, dates and other mandatory declarations</li></ul>
<div class="note">Many Korean ramyeon and snacks contain meat or seafood extracts, so the vegetarian or non-vegetarian mark matters to Indian shoppers. Check the ingredients carefully before listing a product as vegetarian.</div>`,
    sources: [
      ["India Briefing: Food import procedure in India", "https://india-briefing.com/news/food-import-procedure-india-fssai-steps-reforms-29980.html"],
      ["FSSAI: Food Import Clearance System", "https://fics.fssai.gov.in/"]
    ]
  },
  {
    slug: "korean-skincare-steps-explained",
    cat: "skincare-trends",
    date: "2026-10-29",
    cover: "toner",
    bg: "#E7EFEA",
    title: "Korean skincare steps explained for Indian retailers",
    desc: "Cleanse, tone, treat, moisturise, protect: how Korean routines are built and how to merchandise them for Indian shoppers.",
    links: ["skincare-beauty", "partnerships"],
    body: `<p>Korean skincare is often described as a "10-step routine", but most shoppers build a simpler version around a few core steps. Understanding them helps retailers plan ranges, displays and staff advice.</p>
<h2>Cleanse</h2><p>Many routines use a double cleanse: an oil or balm to remove sunscreen and make-up, then a gentle foam or gel cleanser.</p>
<h2>Tone</h2><p>Korean toners are usually hydrating rather than astringent, preparing skin for the next steps.</p>
<h2>Treat</h2><p>Essences, serums and ampoules are the targeted step, and often the products customers ask for by name.</p>
<h2>Moisturise</h2><p>Gel creams suit humid Indian summers; richer creams sell in drier months and northern winters.</p>
<h2>Protect</h2><p>Lightweight sunscreens are one of the strongest entry points into Korean beauty for Indian shoppers who dislike heavy, white-cast formulas.</p>`,
    sources: []
  },
  {
    slug: "korean-ramyeon-snacks-guide-retailers",
    cat: "food-snacks",
    date: "2026-10-22",
    cover: "snacks",
    bg: "#FBF0D2",
    title: "A retailer's guide to Korean ramyeon and snacks in India",
    desc: "Spice levels, vegetarian labelling, shelf life and display: what to know before stocking Korean noodles and snacks.",
    links: ["food-beverages", "partnerships"],
    body: `<p>Korean instant noodles and snacks are often a shopper's first Korean purchase. They're also where labelling and range planning matter most.</p>
<h2>Plan a range by spice level</h2><p>Offer a ladder from mild to very spicy. Clear shelf labels help shoppers choose and come back for the next level.</p>
<h2>Vegetarian and non-vegetarian</h2><p>Many ramyeon soups and seasonings use beef, chicken or seafood extracts. Every imported pack must carry the correct Indian vegetarian or non-vegetarian mark, so check before you promote a product as vegetarian.</p>
<h2>Shelf life and stock rotation</h2><p>Imported food needs a large share of its shelf life remaining at import, but stock still ages on your shelves. Order in quantities you can sell through and rotate first-expiry-first-out.</p>`,
    sources: []
  },
  {
    slug: "questions-to-ask-korean-product-importer",
    cat: "korea-india-imports",
    date: "2026-10-15",
    cover: "jar",
    bg: "#EEE5D6",
    title: "Seven questions to ask before working with a Korean product importer",
    desc: "Registration, labelling, shelf life, pricing and supply: how to judge an importer before you stock Korean products.",
    links: ["partnerships", "import-distribution", "compliance"],
    body: `<p>Choosing the right import partner protects your shelves, your margins and your customers. These questions apply whether you're a beauty retailer, a supermarket or an online seller.</p>
<h2>The questions</h2><ol><li><b>Who is the importer of record?</b> Their name should appear on the Indian label.</li><li><b>Are products registered or cleared?</b> CDSCO registration for cosmetics; FSSAI licence and clearance for food.</li><li><b>Are labels compliant?</b> Packaged goods must show details such as the importer's address, MRP and net quantity.</li><li><b>How much shelf life will I receive?</b> Ask for a minimum remaining shelf life on delivery.</li><li><b>Is the brand relationship authorised?</b> Ask how the importer sources the products.</li><li><b>What are the minimum order quantities and pricing tiers?</b></li><li><b>How are damages, recalls and returns handled?</b></li></ol>`,
    sources: []
  },
  {
    slug: "why-korean-products-are-growing-in-india",
    cat: "market-insights",
    date: "2026-10-08",
    cover: "drinks",
    bg: "#DCEBE3",
    title: "Why Korean products are finding a place on Indian shelves",
    desc: "Culture, curiosity and convenience: the drivers behind Korean beauty and food in India, and what they mean for retailers.",
    links: ["skincare-beauty", "food-beverages"],
    body: `<p>Korean entertainment has introduced a generation of Indian viewers to Korean food, beauty and lifestyle. Retailers are seeing that curiosity turn into repeat purchases.</p>
<h2>What's driving demand</h2><ul><li><b>Culture:</b> K-dramas and K-pop put Korean products on screen</li><li><b>Social media:</b> creators review sunscreens, serums and ramyeon challenges</li><li><b>Product fit:</b> lightweight skincare suits humid climates; spicy flavours suit Indian palates</li><li><b>Brand investment:</b> Korean food companies have been launching products for Indian consumers</li></ul>`,
    sources: [
      ["The Tribune: Nongshim's India launch", "https://www.tribuneindia.com/news/business/south-korean-food-giant-nongshim-makes-a-bold-india-play-with-launch-of-online-exclusive-shin-ramyun-kimchi-stir-fry/"]
    ]
  }
];
