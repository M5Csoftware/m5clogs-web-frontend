"use client";

export interface ContactLead {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  topic?: string;
  message: string;
  createdAt: string;
  status: "New" | "Contacted" | "In Progress" | "Resolved";
  source: string;
}

export interface PartnershipLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  bizType: string;
  city: string;
  categories: string[];
  details?: string;
  enquiryType: string;
  createdAt: string;
  status: "New" | "Contacted" | "In Progress" | "Resolved";
}

export interface NewsletterLead {
  id: string;
  email: string;
  source: string;
  createdAt: string;
  status: "Active" | "Unsubscribed";
}

const STORAGE_KEY_CONTACT = "m5c_leads_contact";
const STORAGE_KEY_PARTNERSHIP = "m5c_leads_partnership";
const STORAGE_KEY_NEWSLETTER = "m5c_leads_newsletter";

const INITIAL_CONTACT_LEADS: ContactLead[] = [
  {
    id: "CNT-2026-1049",
    name: "Rohan Varma",
    company: "Luxe Glow Cosmetics",
    email: "rohan.varma@luxeglow.in",
    phone: "+91 98201 44521",
    topic: "Wholesale or distribution",
    message: "We are expanding our retail stores across Mumbai and Pune and want to stock Anua Heartleaf Toner and Skin1004 Centella Ampoules. Could you share your wholesale catalog and MOQ?",
    createdAt: "27 Nov 2026, 02:45 PM",
    status: "New",
    source: "Contact Page Form",
  },
  {
    id: "CNT-2026-1048",
    name: "Meera Sen",
    company: "K-Beauty Boutique Kolkata",
    email: "meera.sen@kbeautykolkata.com",
    phone: "+91 98310 98124",
    topic: "Product question",
    message: "Do you have ready stock for Beauty of Joseon Relief Sun Rice + Probiotics sunscreen with CDSCO sticker compliance for immediate shipment to West Bengal?",
    createdAt: "27 Nov 2026, 11:20 AM",
    status: "New",
    source: "Contact Page Form",
  },
  {
    id: "CNT-2026-1047",
    name: "Karan Johar",
    company: "Spice & Ramen Supermarkets",
    email: "karan@spiceramen.in",
    phone: "+91 99870 12345",
    topic: "Wholesale or distribution",
    message: "Looking for regular monthly supply of Samyang Buldak (Carbonara, 2x Spicy) and Nongshim Shin Ramyun. We operate 8 stores in Delhi NCR.",
    createdAt: "26 Nov 2026, 04:15 PM",
    status: "In Progress",
    source: "Contact Page Form",
  },
  {
    id: "CNT-2026-1046",
    name: "Divya Balan",
    company: "The Korean Shelf Bangalore",
    email: "divya@thekoreanshelf.com",
    phone: "+91 98450 67890",
    topic: "Brand representation",
    message: "We are looking to partner as an authorized regional retailer for TirTir cushions and COSRX snail line in Bangalore. Please send the distributor application form.",
    createdAt: "25 Nov 2026, 06:30 PM",
    status: "Contacted",
    source: "Contact Page Form",
  },
  {
    id: "CNT-2026-1045",
    name: "Arjun Nair",
    company: "Nair Gourmet Grocers",
    email: "arjun@nairgrocers.com",
    phone: "+91 97451 22334",
    topic: "General enquiry",
    message: "Inquiring about shelf-life and FSSAI certificate documentation for Binggrae flavored milk imports into Kerala.",
    createdAt: "24 Nov 2026, 10:05 AM",
    status: "Resolved",
    source: "Contact Page Form",
  },
];

const INITIAL_PARTNERSHIP_LEADS: PartnershipLead[] = [
  {
    id: "PRT-2026-2005",
    name: "Vikram Singhania",
    company: "Blinkit Quick Commerce",
    email: "vikram.s@blinkit.com",
    phone: "+91 98110 54321",
    bizType: "E-commerce & Quick Commerce",
    city: "Gurgaon",
    categories: ["Food & beverages", "Instant noodles", "Korean snacks"],
    enquiryType: "Bulk purchase",
    details: "Need 12,000 units of Samyang Buldak & Orion Choco Pie with rapid warehouse replenishment in Delhi NCR & Mumbai dark stores.",
    createdAt: "27 Nov 2026, 01:15 PM",
    status: "New",
  },
  {
    id: "PRT-2026-2004",
    name: "Ananya Deshmukh",
    company: "Tira Beauty (Reliance Retail)",
    email: "ananya.d@ril.com",
    phone: "+91 99200 88776",
    bizType: "Omnichannel Retail",
    city: "Mumbai",
    categories: ["Skincare & beauty", "Sun care", "Serums & ampoules"],
    enquiryType: "Distribution partner",
    details: "Requesting formal quotation for 3,500 units of Skin1004 Madagascar Centella line and Anua Peach 70% serum for Q1 nationwide launch.",
    createdAt: "26 Nov 2026, 03:50 PM",
    status: "In Progress",
  },
  {
    id: "PRT-2026-2003",
    name: "Rajesh Khandelwal",
    company: "Westside Lifestyle Stores",
    email: "rajesh.k@trent-tata.com",
    phone: "+91 98210 99887",
    bizType: "Department Store Chain",
    city: "Mumbai",
    categories: ["Skincare & beauty"],
    enquiryType: "Wholesale catalogue",
    details: "Looking for certified Korean beauty brands with dual-language Indian MRP labelling for placement across 40 flagship Westside stores.",
    createdAt: "25 Nov 2026, 11:30 AM",
    status: "Contacted",
  },
  {
    id: "PRT-2026-2002",
    name: "Harshavardhan Rao",
    company: "South India Cosmetics Dist.",
    email: "harsha@sicdist.in",
    phone: "+91 98480 33445",
    bizType: "Regional Wholesaler",
    city: "Hyderabad",
    categories: ["Skincare & beauty", "Makeup"],
    enquiryType: "Distribution partner",
    details: "Exclusive distributor agreement inquiry for Telangana and Andhra Pradesh for TirTir and Sungboon Editor.",
    createdAt: "23 Nov 2026, 05:10 PM",
    status: "Resolved",
  },
];

const INITIAL_NEWSLETTER_LEADS: NewsletterLead[] = [
  { id: "NW-2026-001", email: "priya.sharma@retailindia.com", source: "Website Footer", createdAt: "27 Nov 2026, 09:12 AM", status: "Active" },
  { id: "NW-2026-002", email: "sanjay.gupta@mumbaicosmetics.in", source: "Website Footer", createdAt: "26 Nov 2026, 02:40 PM", status: "Active" },
  { id: "NW-2026-003", email: "alisha.patel@nykaaseller.com", source: "Website Footer", createdAt: "25 Nov 2026, 11:05 AM", status: "Active" },
  { id: "NW-2026-004", email: "trade.enquiry@delhisupermarket.com", source: "Website Footer", createdAt: "24 Nov 2026, 04:30 PM", status: "Active" },
];

function notifyStorageChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("m5c_leads_updated"));
  }
}

// Contact Leads
export function getContactLeads(): ContactLead[] {
  if (typeof window === "undefined") return INITIAL_CONTACT_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTACT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(INITIAL_CONTACT_LEADS));
      return INITIAL_CONTACT_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CONTACT_LEADS;
  }
}

export function saveContactLead(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  topic?: string;
  message: string;
  source?: string;
}): ContactLead {
  const current = getContactLeads();
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const newLead: ContactLead = {
    id: `CNT-2026-${1050 + current.length}`,
    name: data.name,
    company: data.company || "Individual / Unspecified",
    email: data.email,
    phone: data.phone || "Not provided",
    topic: data.topic || "General enquiry",
    message: data.message,
    createdAt: dateStr,
    status: "New",
    source: data.source || "Contact Page Form",
  };

  const updated = [newLead, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(updated));
    notifyStorageChange();
  }
  return newLead;
}

export function updateContactLeadStatus(id: string, status: ContactLead["status"]) {
  const current = getContactLeads();
  const updated = current.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(updated));
    notifyStorageChange();
  }
}

export function deleteContactLead(id: string) {
  const current = getContactLeads();
  const updated = current.filter((lead) => lead.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(updated));
    notifyStorageChange();
  }
}

// Partnership Leads
export function getPartnershipLeads(): PartnershipLead[] {
  if (typeof window === "undefined") return INITIAL_PARTNERSHIP_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PARTNERSHIP);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PARTNERSHIP, JSON.stringify(INITIAL_PARTNERSHIP_LEADS));
      return INITIAL_PARTNERSHIP_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PARTNERSHIP_LEADS;
  }
}

export function savePartnershipLead(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  bizType: string;
  city: string;
  categories: string[];
  details?: string;
  enquiryType: string;
}): PartnershipLead {
  const current = getPartnershipLeads();
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const newLead: PartnershipLead = {
    id: `PRT-2026-${2006 + current.length}`,
    name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone,
    bizType: data.bizType,
    city: data.city,
    categories: data.categories,
    details: data.details || "No additional notes provided.",
    enquiryType: data.enquiryType,
    createdAt: dateStr,
    status: "New",
  };

  const updated = [newLead, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_PARTNERSHIP, JSON.stringify(updated));
    notifyStorageChange();
  }
  return newLead;
}

export function updatePartnershipLeadStatus(id: string, status: PartnershipLead["status"]) {
  const current = getPartnershipLeads();
  const updated = current.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_PARTNERSHIP, JSON.stringify(updated));
    notifyStorageChange();
  }
}

export function deletePartnershipLead(id: string) {
  const current = getPartnershipLeads();
  const updated = current.filter((lead) => lead.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_PARTNERSHIP, JSON.stringify(updated));
    notifyStorageChange();
  }
}

// Newsletter Leads
export function getNewsletterLeads(): NewsletterLead[] {
  if (typeof window === "undefined") return INITIAL_NEWSLETTER_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NEWSLETTER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_NEWSLETTER, JSON.stringify(INITIAL_NEWSLETTER_LEADS));
      return INITIAL_NEWSLETTER_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_NEWSLETTER_LEADS;
  }
}

export function saveNewsletterLead(email: string, source = "Website Footer"): NewsletterLead {
  const current = getNewsletterLeads();
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const newLead: NewsletterLead = {
    id: `NW-2026-${String(current.length + 1).padStart(3, "0")}`,
    email,
    source,
    createdAt: dateStr,
    status: "Active",
  };

  const updated = [newLead, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_NEWSLETTER, JSON.stringify(updated));
    notifyStorageChange();
  }
  return newLead;
}

export function deleteNewsletterLead(id: string) {
  const current = getNewsletterLeads();
  const updated = current.filter((lead) => lead.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_NEWSLETTER, JSON.stringify(updated));
    notifyStorageChange();
  }
}
