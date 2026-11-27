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
    id: "M5C-1048",
    client: "Pooja Malhotra",
    company: "Nykaa Retail Ltd",
    category: "Skincare & Beauty",
    volume: "5,000 Units (Anua & Round Lab)",
    value: "₹42,50,000",
    status: "Under Review",
    date: "27 Nov 2026",
  },
  {
    id: "M5C-1047",
    client: "Vikram Singhania",
    company: "Blinkit Commerce Pvt Ltd",
    category: "Food & Beverages",
    volume: "12,000 Packs (Samyang Buldak)",
    value: "₹18,20,000",
    status: "Approved",
    date: "26 Nov 2026",
  },
  {
    id: "M5C-1046",
    client: "Ananya Deshmukh",
    company: "Tira Beauty (Reliance Retail)",
    category: "Skincare & Beauty",
    volume: "3,500 Units (Skin1004 & COSRX)",
    value: "₹31,00,000",
    status: "Sample Dispatched",
    date: "25 Nov 2026",
  },
  {
    id: "M5C-1045",
    client: "Rajesh Khandelwal",
    company: "Westside Lifestyle Stores",
    category: "Skincare & Beauty",
    volume: "2,000 Units (Beauty of Joseon)",
    value: "₹19,40,000",
    status: "Quotation Sent",
    date: "24 Nov 2026",
  },
  {
    id: "M5C-1044",
    client: "Sunita Nambiar",
    company: "Nature's Basket Gourmet",
    category: "Food & Beverages",
    volume: "4,000 Units (Binggrae & Nongshim)",
    value: "₹11,60,000",
    status: "Customs Clearance",
    date: "23 Nov 2026",
  },
  {
    id: "M5C-1043",
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
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Customs Clearance":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Sample Dispatched":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Quotation Sent":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Under Review":
      default:
        return "bg-orange-50 text-orange-800 border-orange-200";
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12 font-sans">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pb-8 border-b border-[var(--line)]">
        <div>
          <h1
            className="admin-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
          >
            Dashboard
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted)] mt-2 font-medium">
            Live overview of import shipments, clearances, and B2B requests
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/rate-calculator"
            target="_blank"
            className="px-5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-bold text-[var(--ink)] hover:border-[var(--persimmon)] hover:text-[var(--persimmon)] transition shadow-2xs"
          >
            Rate Calculator ↗
          </Link>
          <Link
            href="/tracking"
            target="_blank"
            className="px-5 py-2.5 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-sm font-bold transition shadow-xs"
          >
            Track Consignments ↗
          </Link>
        </div>
      </div>

      {/* 4 Metric Stats Cards with High Readability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="p-7 sm:p-8 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-xs hover:border-[var(--persimmon)]/40 transition">
          <div className="flex items-center justify-between text-sm font-bold tracking-wider text-[var(--muted)] uppercase mb-3">
            <span>B2B Inquiries</span>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded text-xs font-bold">
              +22% MoM
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-[var(--ink)] tracking-tight mb-2">
            148
          </div>
          <div className="text-sm sm:text-base text-[var(--ink-2)] font-semibold">
            84 Skincare • 64 Food &amp; Beverage
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-7 sm:p-8 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-xs hover:border-[var(--jade)]/40 transition">
          <div className="flex items-center justify-between text-sm font-bold tracking-wider text-[var(--muted)] uppercase mb-3">
            <span>Active Shipments</span>
            <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded text-xs font-bold">
              In Transit
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-[var(--ink)] tracking-tight mb-2">
            32
          </div>
          <div className="text-sm sm:text-base text-[var(--ink-2)] font-semibold">
            18 Sea (Nhava Sheva) • 14 Air (Delhi)
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-7 sm:p-8 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-xs hover:border-[var(--gold)]/40 transition">
          <div className="flex items-center justify-between text-sm font-bold tracking-wider text-[var(--muted)] uppercase mb-3">
            <span>Approved SKUs</span>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded text-xs font-bold">
              Active
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-[var(--ink)] tracking-tight mb-2">
            76
          </div>
          <div className="text-sm sm:text-base text-[var(--ink-2)] font-semibold">
            52 CDSCO Form 43 • 24 FSSAI NOCs
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-7 sm:p-8 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-xs hover:border-[var(--ink)]/40 transition">
          <div className="flex items-center justify-between text-sm font-bold tracking-wider text-[var(--muted)] uppercase mb-3">
            <span>Retail Outlets</span>
            <span className="text-purple-700 bg-purple-50 px-2.5 py-1 rounded text-xs font-bold">
              18 States
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-[var(--ink)] tracking-tight mb-2">
            1,280+
          </div>
          <div className="text-sm sm:text-base text-[var(--ink-2)] font-semibold">
            Nykaa, Tira, Blinkit &amp; Wholesalers
          </div>
        </div>
      </div>

      {/* Shipment Transit Stages (Clean & Uncluttered) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h2
              className="admin-heading text-xl sm:text-2xl font-extrabold text-[var(--ink)] tracking-tight"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Shipment Transit Pipeline
            </h2>
            <p className="text-base text-[var(--muted)] mt-1.5 font-medium">
              Active milestones across sea freight and air cargo
            </p>
          </div>
          <span className="text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full w-fit">
            ● Normal Port Operations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          <div className="p-5 rounded-2xl bg-[var(--hanji)] border border-[var(--line)]">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                ✓
              </span>
              <span className="text-base font-bold text-[var(--ink)]">Incheon Hub</span>
            </div>
            <div className="text-sm sm:text-base font-semibold text-[var(--muted)]">
              12 Batches Cleared
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--hanji)] border border-[var(--line)]">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                ✓
              </span>
              <span className="text-base font-bold text-[var(--ink)]">Freight Transit</span>
            </div>
            <div className="text-sm sm:text-base font-semibold text-[var(--muted)]">
              8 Vessels &amp; Flights
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--hanji-2)] border-2 border-[var(--persimmon)] shadow-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-6 rounded-full bg-[var(--persimmon)] text-white text-xs font-bold flex items-center justify-center animate-pulse">
                3
              </span>
              <span className="text-base font-bold text-[var(--persimmon)]">Indian Customs</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-[var(--persimmon)]">
              6 In Clearance (JNPT/Delhi)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--hanji)] border border-[var(--line)]">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-6 rounded-full bg-[var(--line-strong)] text-[var(--ink)] text-xs font-bold flex items-center justify-center">
                4
              </span>
              <span className="text-base font-bold text-[var(--ink)]">Central Warehouse</span>
            </div>
            <div className="text-sm sm:text-base font-semibold text-[var(--muted)]">
              4 Batches Ready
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--hanji)] border border-[var(--line)]">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-6 rounded-full bg-[var(--line-strong)] text-[var(--ink)] text-xs font-bold flex items-center justify-center">
                5
              </span>
              <span className="text-base font-bold text-[var(--ink)]">B2B Delivery</span>
            </div>
            <div className="text-sm sm:text-base font-semibold text-[var(--muted)]">
              Pan-India Dispatch
            </div>
          </div>
        </div>
      </div>

      {/* Recent B2B Inquiries Table with High Contrast & Readability */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h2
              className="admin-heading text-xl sm:text-2xl font-extrabold text-[var(--ink)] tracking-tight"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Recent Inquiries
            </h2>
            <p className="text-base text-[var(--muted)] mt-1.5 font-medium">
              B2B wholesale and retail partner requests
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search company, buyer, ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-3 pl-11 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:outline-none transition w-64 sm:w-80 font-medium"
              />
              <svg
                className="w-5 h-5 text-[var(--muted)] absolute left-3.5 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)] text-sm">
              {["All", "Beauty", "Food"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg font-bold transition cursor-pointer ${
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

        {/* Clean, Readable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--line)] text-[var(--muted)] text-[14px] font-bold">
                <th className="py-4 px-3.5 text-left whitespace-nowrap">ID</th>
                <th className="py-4 px-3.5 text-left whitespace-nowrap">Company &amp; Buyer</th>
                <th className="py-4 px-3.5 text-left whitespace-nowrap">Category</th>
                <th className="py-4 px-3.5 text-left">Requirement</th>
                <th className="py-4 px-3.5 text-left whitespace-nowrap">Est. Value</th>
                <th className="py-4 px-3.5 text-left whitespace-nowrap">Status</th>
                <th className="py-4 px-3.5 text-left whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-[var(--hanji)]/60 transition"
                >
                  <td className="py-4 px-3.5 font-mono font-bold text-[14px] text-[var(--ink)] whitespace-nowrap text-left">
                    {lead.id}
                  </td>
                  <td className="py-4 px-3.5 whitespace-nowrap text-left">
                    <div className="flex flex-col items-start justify-start">
                      <div className="font-bold text-[14px] text-[var(--ink)]">{lead.company}</div>
                      <div className="text-[14px] text-[var(--muted)] mt-0.5 font-medium">{lead.client}</div>
                    </div>
                  </td>
                  <td className="py-4 px-3.5 font-semibold text-[14px] text-[var(--ink)] whitespace-nowrap text-left">
                    {lead.category}
                  </td>
                  <td className="py-4 px-3.5 text-[14px] text-[var(--muted)] font-medium max-w-xs truncate text-left">
                    {lead.volume}
                  </td>
                  <td className="py-4 px-3.5 font-bold font-mono text-[14px] text-[var(--ink)] whitespace-nowrap text-left">
                    {lead.value}
                  </td>
                  <td className="py-4 px-3.5 whitespace-nowrap text-left">
                    <span
                      className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[14px] font-bold border whitespace-nowrap ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-3.5 font-mono text-[14px] text-[var(--muted)] whitespace-nowrap text-left">
                    {lead.date}
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-[14px] text-[var(--muted)] font-medium">
                    No inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Section: Top Brands & Gateways */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Brands Distributed */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <h3
            className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
          >
            Top Distributed Brands
          </h3>

          <div className="space-y-4">
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
                className="flex items-center justify-between p-4.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)] hover:border-[var(--persimmon)]/40 transition"
              >
                <div>
                  <div className="text-base font-bold text-[var(--ink)]">{b.name}</div>
                  <div className="text-sm text-[var(--muted)] mt-0.5 font-medium">{b.type}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {b.demand}
                  </span>
                  <div className="text-sm sm:text-base font-mono font-bold text-[var(--ink)] mt-1">
                    {b.units}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Gateways */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <h3
            className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
          >
            Regulatory Gateways
          </h3>

          <div className="space-y-4">
            <div className="p-4.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-[var(--ink)]">CDSCO SUGAM Portal</div>
                <div className="text-sm text-[var(--muted)] mt-0.5 font-medium">Form 43 Registration Active (52 Formulas)</div>
              </div>
              <span className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Online
              </span>
            </div>

            <div className="p-4.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-[var(--ink)]">FSSAI FoSCoS System</div>
                <div className="text-sm text-[var(--muted)] mt-0.5 font-medium">Food Import Clearance Active</div>
              </div>
              <span className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Online
              </span>
            </div>

            <div className="p-4.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-[var(--ink)]">ICEGATE Customs EDI</div>
                <div className="text-sm text-[var(--muted)] mt-0.5 font-medium">JNPT Nhava Sheva &amp; IGI Delhi Air Cargo</div>
              </div>
              <span className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Connected
              </span>
            </div>

            <div className="p-4.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-[var(--ink)]">Gurgaon Cold Chain Facility</div>
                <div className="text-sm text-[var(--muted)] mt-0.5 font-medium">Automated temperature control (18.4°C)</div>
              </div>
              <span className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Optimal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
