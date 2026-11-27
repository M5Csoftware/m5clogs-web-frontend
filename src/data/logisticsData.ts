import { ServiceItem, TestimonialItem } from "@/types/logistics";

export const COMPANY_INFO = {
  name: "M 5 Continent Logistics Solution (P) Ltd.",
  shortName: "M5Clogs",
  tagline: "Connecting 5 Continents Through Intelligent Logistics",
  headline: "Global Express, Freight Forwarding & Cross-Border Supply Chain",
  headquarters: "A-24/5, Mohan Cooperative Industrial Estate, Mathura Road, New Delhi - 110044, India",
  phone: "+91 11 4987 8800",
  tollFree: "1800 572 6564",
  email: "support@m5clogs.com",
  salesEmail: "sales@m5clogs.com",
  operatingHours: "24/7 Operations Support",
  countriesServed: 220,
  dailyShipments: "45,000+",
  onTimeRate: "99.4%",
  warehouses: "18+ Global Hubs",
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "international-express",
    title: "International Express Delivery",
    tagline: "Time-critical door-to-door courier services worldwide",
    description: "Fastest express delivery to North America, Europe, Middle East, and Asia Pacific with end-to-end milestone tracking and guaranteed transit times.",
    badge: "Most Popular",
    iconName: "PlaneTakeoff",
    features: [
      "2 - 4 business days transit time",
      "Doorstep pickup & direct last-mile delivery",
      "Real-time GPS & milestone tracking",
      "Express customs clearance support",
    ],
  },
  {
    id: "air-freight",
    title: "Air Freight Forwarding",
    tagline: "Heavy commercial cargo & chartered aircraft solutions",
    description: "Tailored air cargo solutions for high-value, oversized, and time-sensitive industrial freight connecting leading airport hubs across all five continents.",
    badge: "Cargo & B2B",
    iconName: "Boxes",
    features: [
      "Direct airline allocation & block space agreements",
      "Consolidated (LCL) and dedicated chartered flights",
      "Temperature-controlled pharma & perishable cargo",
      "Comprehensive airport-to-airport & door-to-door options",
    ],
  },
  {
    id: "ocean-freight",
    title: "Ocean & Maritime Freight",
    tagline: "Cost-effective container shipping across global sea routes",
    description: "Full Container Load (FCL) and Less than Container Load (LCL) ocean freight forwarding with premier shipping lines and customs documentation.",
    badge: "Economical",
    iconName: "Ship",
    features: [
      "FCL & LCL consolidations at major Indian & global ports",
      "Port-to-port and multi-modal inland transport",
      "Competitive container freight tariffs",
      "Dangerous goods (DG) & project cargo handling",
    ],
  },
  {
    id: "ecommerce-fulfillment",
    title: "Cross-Border E-Commerce",
    tagline: "Direct D2C fulfillment for global online retailers",
    description: "End-to-end e-commerce logistics integrating with Shopify, Amazon, WooCommerce, and custom ERPs with Cash on Delivery (COD) and seamless reverse logistics.",
    badge: "E-Commerce",
    iconName: "ShoppingBag",
    features: [
      "Automated API integration with e-commerce platforms",
      "Automated label generation & bulk manifest upload",
      "International Cash-on-Delivery (COD) options in GCC",
      "Frictionless return management (RTO) workflow",
    ],
  },
  {
    id: "overseas-warehousing",
    title: "Overseas Warehousing & 3PL",
    tagline: "Strategically located fulfillment hubs in US, UK & UAE",
    description: "Store inventory closer to your international customers. Pick, pack, and ship within hours to cut international delivery transit times down to 1-2 days.",
    badge: "3PL Fulfillment",
    iconName: "Warehouse",
    features: [
      "Bonded and climate-controlled storage facilities",
      "Automated inventory tracking with live portal dashboard",
      "Same-day pick, pack, and local dispatch",
      "Kitting, re-labeling & custom branded packaging",
    ],
  },
  {
    id: "customs-brokerage",
    title: "Customs Clearance & Brokerage",
    tagline: "Licensed customs brokers ensuring fast compliance",
    description: "Hassle-free customs clearing at air cargo complexes, seaports, and inland container depots with complete tariff classification and duty assessment.",
    badge: "Compliance",
    iconName: "ShieldCheck",
    features: [
      "AEO-certified customs brokerage procedures",
      "Accurate HS Code classification & duty optimization",
      "Import-Export documentation & licensing consultation",
      "Minimizing port detention and clearance turnaround",
    ],
  },
];

export const GLOBAL_HUBS = [
  { city: "New Delhi", country: "India", type: "Global HQ & Air Gateway", code: "DEL" },
  { city: "Mumbai", country: "India", type: "Seaport & Western Hub", code: "BOM" },
  { city: "Dubai", country: "UAE", type: "Middle East Fulfillment Hub", code: "DXB" },
  { city: "London", country: "United Kingdom", type: "European Gateway Hub", code: "LHR" },
  { city: "Frankfurt", country: "Germany", type: "Continental Europe Air Hub", code: "FRA" },
  { city: "New York", country: "United States", type: "North American 3PL Center", code: "JFK" },
  { city: "Singapore", country: "Singapore", type: "Southeast Asia Gateway", code: "SIN" },
  { city: "Sydney", country: "Australia", type: "Oceania Distribution Center", code: "SYD" },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Vikram Singhania",
    role: "Head of Global Supply Chain",
    company: "Artisan Living Exporters",
    quote: "M5Clogs transformed our export pipeline to the US and Europe. We reduced delivery delays by 40% and our customers love the transparent real-time tracking.",
    rating: 5,
    location: "Jaipur, India",
  },
  {
    name: "Sarah Jenkins",
    role: "Director of International Operations",
    company: "Aura Botanicals Direct",
    quote: "Their overseas warehousing in the UK and Dubai allowed us to offer 2-day deliveries to our international customers without opening foreign entities ourselves.",
    rating: 5,
    location: "London, UK",
  },
  {
    name: "Rajesh Kulkarni",
    role: "Managing Director",
    company: "Precision Engineering Components",
    quote: "When we have urgent aerospace shipments, M5C's air freight team always delivers on time. Their customs clearance expertise in New Delhi and Frankfurt is unmatched.",
    rating: 5,
    location: "Pune, India",
  },
];

export const DESTINATION_COUNTRIES = [
  { code: "US", name: "United States", ratePerKg: 780, transitDays: "3-5 Days" },
  { code: "GB", name: "United Kingdom", ratePerKg: 650, transitDays: "3-4 Days" },
  { code: "AE", name: "United Arab Emirates", ratePerKg: 420, transitDays: "2-3 Days" },
  { code: "DE", name: "Germany", ratePerKg: 690, transitDays: "3-5 Days" },
  { code: "CA", name: "Canada", ratePerKg: 820, transitDays: "4-6 Days" },
  { code: "AU", name: "Australia", ratePerKg: 880, transitDays: "4-6 Days" },
  { code: "SG", name: "Singapore", ratePerKg: 490, transitDays: "2-4 Days" },
  { code: "FR", name: "France", ratePerKg: 710, transitDays: "3-5 Days" },
  { code: "SA", name: "Saudi Arabia", ratePerKg: 520, transitDays: "3-4 Days" },
  { code: "NL", name: "Netherlands", ratePerKg: 670, transitDays: "3-5 Days" },
];
