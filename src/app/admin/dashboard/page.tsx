"use client";

import React, { useState } from "react";
import Link from "next/link";

interface B2BLead {
  id: string;
  client: string;
  company: string;
  category: "Skincare & Beauty" | "Food & Beverages" | "Mixed Consignment";
  volume: string;
  value: string;
  status: "Under Review" | "Customs Clearance" | "Sample Dispatched" | "Approved" | "Quotation Sent";
  date: string;
}

const INITIAL_LEADS: B2BLead[] = [
  {
    id: "M5C-INQ-1048",
    client: "Pooja Malhotra",
    company: "Nykaa Retail Ltd",
    category: "Skincare & Beauty",
    volume: "5,000 Units (Anua & Round Lab)",
    value: "₹42,50,000",
    status: "Under Review",
    date: "27 Nov 2026",
  },
  {
    id: "M5C-INQ-1047",
    client: "Vikram Singhania",
    company: "Blinkit Commerce Pvt Ltd",
    category: "Food & Beverages",
    volume: "12,000 Packs (Samyang Buldak)",
    value: "₹18,20,000",
    status: "Approved",
    date: "26 Nov 2026",
  },
  {
    id: "M5C-INQ-1046",
    client: "Ananya Deshmukh",
    company: "Tira Beauty (Reliance Retail)",
    category: "Skincare & Beauty",
    volume: "3,500 Units (Skin1004 & COSRX)",
    value: "₹31,00,000",
    status: "Sample Dispatched",
    date: "25 Nov 2026",
  },
  {
    id: "M5C-INQ-1045",
    client: "Rajesh Khandelwal",
    company: "Westside Lifestyle Stores",
    category: "Skincare & Beauty",
    volume: "2,000 Units (Beauty of Joseon)",
    value: "₹19,40,000",
    status: "Quotation Sent",
    date: "24 Nov 2026",
  },
  {
    id: "M5C-INQ-1044",
    client: "Sunita Nambiar",
    company: "Nature's Basket Gourmet",
    category: "Food & Beverages",
    volume: "4,000 Units (Binggrae & Nongshim)",
    value: "₹11,60,000",
    status: "Customs Clearance",
    date: "23 Nov 2026",
  },
  {
    id: "M5C-INQ-1043",
    client: "Harshavardhan Rao",
    company: "South India Cosmetics Dist.",
    category: "Skincare & Beauty",
    volume: "1,800 Units (TirTir & Sungboon)",
    value: "₹15,80,000",
    status: "Approved",
    date: "22 Nov 2026",
  },
];

export default function AdminDashboardPage() {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [leads] = useState<B2BLead[]>(INITIAL_LEADS);

  const filteredLeads = leads.filter((lead) => {
    const matchesCategory = filter === "All" || lead.category.includes(filter);
    const matchesSearch =
      lead.client.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.id.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: B2BLead["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Customs Clearance":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Sample Dispatched":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Quotation Sent":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Under Review":
      default:
        return "bg-orange-50 text-orange-700 border-orange-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Stage */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]">
              Operations Dashboard
            </h1>
            <span className="text-xs font-mono text-[var(--persimmon)] px-2.5 py-0.5 rounded-full bg-[var(--peach)]/40 border border-[var(--peach)] font-semibold">
              Admin Console
            </span>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Live overview of Korea ➔ India beauty &amp; food import consignments, CDSCO/FSSAI clearances, and B2B inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/rate-calculator"
            target="_blank"
            className="px-4 py-2 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-xs font-semibold text-[var(--ink)] hover:border-[var(--persimmon)] hover:text-[var(--persimmon)] transition shadow-2xs"
          >
            Rate Calculator ↗
          </Link>
          <Link
            href="/tracking"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-xs font-bold transition shadow-xs"
          >
            Live Container Tracking ↗
          </Link>
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {/* Card 1 */}
        <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-xs relative overflow-hidden group hover:border-[var(--persimmon)]/50 transition">
          <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono mb-3">
            <span>B2B LEADS &amp; INQUIRIES</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              +22.4% MoM
            </span>
          </div>
          <div className="font-serif text-4xl font-bold text-[var(--ink)] mb-1">
            148
          </div>
          <div className="text-xs text-[var(--muted)] flex items-center gap-1.5 font-sans">
            <span className="w-2 h-2 rounded-full bg-[var(--persimmon)]" />
            <span>84 K-Beauty • 64 K-Food</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-xs relative overflow-hidden group hover:border-[var(--jade)]/50 transition">
          <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono mb-3">
            <span>ACTIVE CONSIGNMENTS</span>
            <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
              In Transit
            </span>
          </div>
          <div className="font-serif text-4xl font-bold text-[var(--ink)] mb-1">
            32 <span className="text-lg font-sans font-normal text-[var(--muted)]">Batches</span>
          </div>
          <div className="text-xs text-[var(--muted)] flex items-center gap-1.5 font-sans">
            <span className="w-2 h-2 rounded-full bg-[var(--jade)]" />
            <span>18 Sea (Nhava Sheva) • 14 Air (Delhi)</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-xs relative overflow-hidden group hover:border-[var(--gold)]/50 transition">
          <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono mb-3">
            <span>REGULATORY CLEARANCES</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              100% Valid
            </span>
          </div>
          <div className="font-serif text-4xl font-bold text-[var(--ink)] mb-1">
            76 <span className="text-lg font-sans font-normal text-[var(--muted)]">SKUs</span>
          </div>
          <div className="text-xs text-[var(--muted)] flex items-center gap-1.5 font-sans">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            <span>52 CDSCO Form 43 • 24 FSSAI NOCs</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-xs relative overflow-hidden group hover:border-[var(--ink)]/50 transition">
          <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono mb-3">
            <span>DISTRIBUTION NETWORK</span>
            <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded">
              18 States
            </span>
          </div>
          <div className="font-serif text-4xl font-bold text-[var(--ink)] mb-1">
            1,280+
          </div>
          <div className="text-xs text-[var(--muted)] flex items-center gap-1.5 font-sans">
            <span className="w-2 h-2 rounded-full bg-[var(--ink)]" />
            <span>Nykaa, Tira, Blinkit &amp; Regional Supermarkets</span>
          </div>
        </div>
      </div>

      {/* Korea ➔ India Import Logistics Pipeline Status Rail */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)]">
              Korea ➔ India Import Pipeline Status
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Live milestones for ongoing sea and temperature-controlled air shipments
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--ok)] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
            ● Normal Port Operations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                ✓
              </span>
              <span className="text-xs font-bold text-[var(--ink)]">Incheon Hub</span>
            </div>
            <p className="text-xs text-[var(--muted)] font-serif">
              Brand dispatch &amp; export declaration completed.
            </p>
            <div className="text-[11px] font-mono text-[var(--ink)] mt-2 font-bold">
              12 Batches Cleared
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                ✓
              </span>
              <span className="text-xs font-bold text-[var(--ink)]">Sea / Air Transit</span>
            </div>
            <p className="text-xs text-[var(--muted)] font-serif">
              Freight in transit with real-time temperature logs.
            </p>
            <div className="text-[11px] font-mono text-[var(--ink)] mt-2 font-bold">
              8 Vessels / Flights
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-[var(--hanji-2)] border border-[var(--persimmon)] shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-[var(--persimmon)] text-white text-xs font-bold flex items-center justify-center animate-pulse">
                3
              </span>
              <span className="text-xs font-bold text-[var(--persimmon)]">Indian Customs</span>
            </div>
            <p className="text-xs text-[var(--muted)] font-serif">
              CDSCO / FSSAI sampling at Nhava Sheva &amp; IGI Delhi.
            </p>
            <div className="text-[11px] font-mono text-[var(--persimmon)] mt-2 font-bold">
              6 Batches Under Clearance
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-[var(--line-strong)] text-[var(--ink)] text-xs font-bold flex items-center justify-center">
                4
              </span>
              <span className="text-xs font-bold text-[var(--ink)]">Central Warehouse</span>
            </div>
            <p className="text-xs text-[var(--muted)] font-serif">
              Gurgaon cold storage &amp; Indian regulatory MRP stickering.
            </p>
            <div className="text-[11px] font-mono text-[var(--muted)] mt-2 font-bold">
              4 Batches Ready
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-[var(--line-strong)] text-[var(--ink)] text-xs font-bold flex items-center justify-center">
                5
              </span>
              <span className="text-xs font-bold text-[var(--ink)]">B2B Delivery</span>
            </div>
            <p className="text-xs text-[var(--muted)] font-serif">
              Dispatched to e-commerce hubs and retail store shelves.
            </p>
            <div className="text-[11px] font-mono text-[var(--muted)] mt-2 font-bold">
              Pan-India Coverage
            </div>
          </div>
        </div>
      </div>

      {/* Recent B2B Inquiries & Quotation Requests Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--ink)]">
              Recent Inquiries &amp; Quotation Requests
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Verified retailer and wholesale requests received through the website
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search buyer, company, ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3.5 py-2 pl-9 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-xs text-[var(--ink)] placeholder:text-[var(--muted)] focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:outline-none transition w-48 sm:w-64"
              />
              <svg
                className="w-4 h-4 text-[var(--muted)] absolute left-3 top-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--hanji)] border border-[var(--line)] text-xs">
              {["All", "Beauty", "Food"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    filter === tab
                      ? "bg-[var(--paper)] text-[var(--persimmon)] shadow-2xs"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--line)] text-[var(--muted)] font-mono uppercase text-[11px]">
                <th className="py-3 px-4 font-bold">Inquiry ID</th>
                <th className="py-3 px-4 font-bold">Buyer &amp; Company</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Requirement</th>
                <th className="py-3 px-4 font-bold">Est. Value</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-[var(--hanji)]/60 transition group"
                >
                  <td className="py-4 px-4 font-mono font-bold text-[var(--ink)]">
                    {lead.id}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-[var(--ink)]">{lead.company}</div>
                    <div className="text-[11px] text-[var(--muted)] font-serif">
                      {lead.client}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-[var(--ink)]">
                      {lead.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[var(--muted)] max-w-xs truncate">
                    {lead.volume}
                  </td>
                  <td className="py-4 px-4 font-bold font-mono text-[var(--ink)]">
                    {lead.value}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-[var(--muted)] whitespace-nowrap">
                    {lead.date}
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[var(--muted)]">
                    No inquiries found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Section: Top Brands & Compliance Gateways */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top In-Demand Korean Brands in India */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <h3 className="font-serif text-xl font-bold text-[var(--ink)] mb-1">
            Top Korean Brands Distributed
          </h3>
          <p className="text-xs text-[var(--muted)] mb-5">
            Key brand inventory moving through M5 Clogs distribution networks
          </p>

          <div className="space-y-3">
            {[
              { name: "Anua", type: "Heartleaf Skincare", demand: "High Demand", units: "24,000 / mo" },
              { name: "Samyang Buldak", type: "Spicy Ramyun & Sauces", demand: "Top Velocity", units: "48,000 / mo" },
              { name: "COSRX", type: "Snail Mucin Line", demand: "Stable", units: "18,500 / mo" },
              { name: "Skin1004", type: "Centella Ampoules", demand: "Rising", units: "14,200 / mo" },
              { name: "Beauty of Joseon", type: "Sunscreen & Serums", demand: "High Demand", units: "21,000 / mo" },
              { name: "Binggrae", type: "Flavored Milks & Drinks", demand: "FSSAI Cleared", units: "32,000 / mo" },
            ].map((b) => (
              <div
                key={b.name}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)] hover:border-[var(--persimmon)]/40 transition"
              >
                <div>
                  <div className="text-xs font-bold text-[var(--ink)]">{b.name}</div>
                  <div className="text-[11px] text-[var(--muted)] font-serif">{b.type}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {b.demand}
                  </span>
                  <div className="text-xs font-mono font-bold text-[var(--ink)] mt-1">
                    {b.units}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory & CDSCO Compliance Health */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-[var(--ink)] mb-1">
              Regulatory Gateway Status
            </h3>
            <p className="text-xs text-[var(--muted)] mb-5">
              Live status of Indian import statutory portals &amp; licenses
            </p>

            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[var(--ink)]">CDSCO SUGAM Portal</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Online</span>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  Cosmetics Form 43 Registration Certificate active. 52 approved ingredient formulas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[var(--ink)]">FSSAI FoSCoS Import Gateway</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Online</span>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  Food safety clearance system active. All packaging verified for Indian vegetarian/non-vegetarian green/brown dot labels.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[var(--ink)]">ICEGATE Customs EDI Portal</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Connected</span>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  Nhava Sheva (JNPT) &amp; IGI Delhi Air Cargo customs house agents synchronized.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[var(--ink)]">Gurgaon Cold Chain Warehouse</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">18.4°C Optimal</span>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  24/7 temperature monitored warehouse for delicate skincare serums and Korean snacks.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--muted)]">
            <span>Last synchronized: Just now</span>
            <span className="font-mono text-[var(--ink)] font-bold">M5 Clogs Ops v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
