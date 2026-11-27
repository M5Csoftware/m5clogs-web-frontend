"use client";

import React, { useState } from "react";

type TimeRange = "30d" | "90d" | "ytd";

interface MonthlyData {
  month: string;
  skincare: number;
  food: number;
  totalUnits: number;
  valueCr: number;
}

const ANALYTICS_DATA: Record<TimeRange, {
  summary: {
    totalValue: string;
    valueTrend: string;
    totalUnits: string;
    unitsTrend: string;
    avgDwellTime: string;
    dwellTrend: string;
    conversionRate: string;
    conversionTrend: string;
  };
  monthly: MonthlyData[];
  categories: { name: string; percentage: number; valueCr: number; color: string }[];
  portDwellTimes: { port: string; mode: string; days: number; targetDays: number; passRate: number }[];
  funnel: { stage: string; count: number; percentage: number }[];
  brands: { name: string; category: string; unitsMo: number; share: number; growth: string }[];
}> = {
  "30d": {
    summary: {
      totalValue: "₹2.84 Cr",
      valueTrend: "+18.4% vs last month",
      totalUnits: "118,500",
      unitsTrend: "+22.6% MoM",
      avgDwellTime: "2.8 Days",
      dwellTrend: "-0.6 days faster",
      conversionRate: "72.4%",
      conversionTrend: "+4.1% efficiency",
    },
    monthly: [
      { month: "Week 1", skincare: 18200, food: 10400, totalUnits: 28600, valueCr: 0.68 },
      { month: "Week 2", skincare: 21400, food: 11900, totalUnits: 33300, valueCr: 0.81 },
      { month: "Week 3", skincare: 19800, food: 12200, totalUnits: 32000, valueCr: 0.77 },
      { month: "Week 4", skincare: 24600, food: 14800, totalUnits: 39400, valueCr: 0.94 },
    ],
    categories: [
      { name: "Skincare & Beauty", percentage: 58.5, valueCr: 1.66, color: "var(--persimmon)" },
      { name: "Food & Beverages", percentage: 29.2, valueCr: 0.83, color: "var(--jade)" },
      { name: "Health & Functional", percentage: 12.3, valueCr: 0.35, color: "#d97706" },
    ],
    portDwellTimes: [
      { port: "Nhava Sheva (JNPT)", mode: "Sea Freight", days: 3.4, targetDays: 4.0, passRate: 98.6 },
      { port: "IGI Airport Delhi", mode: "Air Cargo", days: 1.8, targetDays: 2.0, passRate: 99.4 },
      { port: "Chennai Sea Hub", mode: "Sea Freight", days: 3.9, targetDays: 4.2, passRate: 97.8 },
    ],
    funnel: [
      { stage: "B2B Inquiries Received", count: 148, percentage: 100 },
      { stage: "Regulatory Pre-Screened", count: 126, percentage: 85.1 },
      { stage: "Commercial Samples Sent", count: 102, percentage: 68.9 },
      { stage: "Purchase Orders Approved", count: 76, percentage: 51.4 },
    ],
    brands: [
      { name: "Samyang Buldak", category: "Food & Ramyun", unitsMo: 48000, share: 40.5, growth: "+31%" },
      { name: "Anua Skincare", category: "Heartleaf Line", unitsMo: 24000, share: 20.2, growth: "+24%" },
      { name: "Beauty of Joseon", category: "Sunscreen & Serums", unitsMo: 21000, share: 17.7, growth: "+19%" },
      { name: "Skin1004", category: "Madagascar Centella", unitsMo: 14200, share: 12.0, growth: "+15%" },
      { name: "COSRX", category: "Snail Mucin", unitsMo: 18500, share: 15.6, growth: "+8%" },
      { name: "Binggrae Drinks", category: "Flavored Milks", unitsMo: 12000, share: 10.1, growth: "+12%" },
    ],
  },
  "90d": {
    summary: {
      totalValue: "₹8.42 Cr",
      valueTrend: "+24.8% vs Q2",
      totalUnits: "348,500",
      unitsTrend: "+28.1% volume",
      avgDwellTime: "3.1 Days",
      dwellTrend: "-1.1 days improvement",
      conversionRate: "68.4%",
      conversionTrend: "+6.2% conversion",
    },
    monthly: [
      { month: "Sep 2026", skincare: 58200, food: 34100, totalUnits: 92300, valueCr: 2.21 },
      { month: "Oct 2026", skincare: 71400, food: 44200, totalUnits: 115600, valueCr: 2.78 },
      { month: "Nov 2026", skincare: 89600, food: 51000, totalUnits: 140600, valueCr: 3.43 },
    ],
    categories: [
      { name: "Skincare & Beauty", percentage: 57.8, valueCr: 4.87, color: "var(--persimmon)" },
      { name: "Food & Beverages", percentage: 29.8, valueCr: 2.51, color: "var(--jade)" },
      { name: "Health & Functional", percentage: 12.4, valueCr: 1.04, color: "#d97706" },
    ],
    portDwellTimes: [
      { port: "Nhava Sheva (JNPT)", mode: "Sea Freight", days: 3.6, targetDays: 4.0, passRate: 98.2 },
      { port: "IGI Airport Delhi", mode: "Air Cargo", days: 1.9, targetDays: 2.0, passRate: 99.1 },
      { port: "Chennai Sea Hub", mode: "Sea Freight", days: 4.1, targetDays: 4.2, passRate: 97.4 },
    ],
    funnel: [
      { stage: "B2B Inquiries Received", count: 412, percentage: 100 },
      { stage: "Regulatory Pre-Screened", count: 344, percentage: 83.5 },
      { stage: "Commercial Samples Sent", count: 278, percentage: 67.5 },
      { stage: "Purchase Orders Approved", count: 206, percentage: 50.0 },
    ],
    brands: [
      { name: "Samyang Buldak", category: "Food & Ramyun", unitsMo: 138000, share: 39.6, growth: "+34%" },
      { name: "Anua Skincare", category: "Heartleaf Line", unitsMo: 68000, share: 19.5, growth: "+28%" },
      { name: "Beauty of Joseon", category: "Sunscreen & Serums", unitsMo: 59000, share: 16.9, growth: "+21%" },
      { name: "Skin1004", category: "Madagascar Centella", unitsMo: 41000, share: 11.8, growth: "+18%" },
      { name: "COSRX", category: "Snail Mucin", unitsMo: 52000, share: 14.9, growth: "+11%" },
      { name: "Binggrae Drinks", category: "Flavored Milks", unitsMo: 34000, share: 9.8, growth: "+14%" },
    ],
  },
  "ytd": {
    summary: {
      totalValue: "₹26.50 Cr",
      valueTrend: "+42.0% YoY",
      totalUnits: "1,142,000",
      unitsTrend: "+48.4% YoY",
      avgDwellTime: "3.2 Days",
      dwellTrend: "Stable SLA",
      conversionRate: "66.8%",
      conversionTrend: "+8.5% YoY",
    },
    monthly: [
      { month: "Jul", skincare: 51000, food: 31000, totalUnits: 82000, valueCr: 1.95 },
      { month: "Aug", skincare: 56000, food: 33000, totalUnits: 89000, valueCr: 2.12 },
      { month: "Sep", skincare: 62000, food: 37000, totalUnits: 99000, valueCr: 2.36 },
      { month: "Oct", skincare: 74000, food: 46000, totalUnits: 120000, valueCr: 2.89 },
      { month: "Nov", skincare: 91000, food: 52000, totalUnits: 143000, valueCr: 3.48 },
    ],
    categories: [
      { name: "Skincare & Beauty", percentage: 56.4, valueCr: 14.95, color: "var(--persimmon)" },
      { name: "Food & Beverages", percentage: 31.0, valueCr: 8.21, color: "var(--jade)" },
      { name: "Health & Functional", percentage: 12.6, valueCr: 3.34, color: "#d97706" },
    ],
    portDwellTimes: [
      { port: "Nhava Sheva (JNPT)", mode: "Sea Freight", days: 3.7, targetDays: 4.0, passRate: 98.0 },
      { port: "IGI Airport Delhi", mode: "Air Cargo", days: 2.0, targetDays: 2.0, passRate: 98.9 },
      { port: "Chennai Sea Hub", mode: "Sea Freight", days: 4.2, targetDays: 4.2, passRate: 97.1 },
    ],
    funnel: [
      { stage: "B2B Inquiries Received", count: 1280, percentage: 100 },
      { stage: "Regulatory Pre-Screened", count: 1045, percentage: 81.6 },
      { stage: "Commercial Samples Sent", count: 832, percentage: 65.0 },
      { stage: "Purchase Orders Approved", count: 614, percentage: 48.0 },
    ],
    brands: [
      { name: "Samyang Buldak", category: "Food & Ramyun", unitsMo: 440000, share: 38.5, growth: "+44%" },
      { name: "Anua Skincare", category: "Heartleaf Line", unitsMo: 215000, share: 18.8, growth: "+36%" },
      { name: "Beauty of Joseon", category: "Sunscreen & Serums", unitsMo: 188000, share: 16.5, growth: "+30%" },
      { name: "COSRX", category: "Snail Mucin", unitsMo: 165000, share: 14.4, growth: "+14%" },
      { name: "Skin1004", category: "Madagascar Centella", unitsMo: 132000, share: 11.6, growth: "+26%" },
      { name: "Binggrae Drinks", category: "Flavored Milks", unitsMo: 110000, share: 9.6, growth: "+19%" },
    ],
  },
};

export default function AdminDashboardPage() {
  const [range, setRange] = useState<TimeRange>("90d");
  const data = ANALYTICS_DATA[range];

  // Helper to compute max units for chart scaling
  const maxMonthly = Math.max(...data.monthly.map((m) => m.totalUnits));

  return (
    <div className="space-y-10 sm:space-y-12 font-sans text-left">
      {/* Header with Time Period Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pb-8 border-b border-[var(--line)]">
        <div>
          <h1
            className="admin-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
          >
            Analytics &amp; Statistics
          </h1>
          <p className="text-base text-[var(--muted)] mt-1.5 font-medium">
            Quantitative metrics across consignment velocity, category distribution, and customs dwell time.
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-2xs">
          {(
            [
              { id: "30d", label: "Last 30 Days" },
              { id: "90d", label: "Last 90 Days" },
              { id: "ytd", label: "Year to Date (2026)" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setRange(t.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                range === t.id
                  ? "bg-[var(--persimmon)] text-white shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Statistical KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* KPI 1: Value */}
        <div className="p-7 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
            <span>Import Cargo Value</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
              {data.summary.valueTrend}
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
            {data.summary.totalValue}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 font-medium">
            CIF invoice cleared value across JNPT &amp; Delhi hubs
          </p>
        </div>

        {/* KPI 2: Volume */}
        <div className="p-7 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
            <span>Consignment Units</span>
            <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px] font-bold">
              {data.summary.unitsTrend}
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
            {data.summary.totalUnits}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 font-medium">
            Verified master cartons and retail SKUs dispatched
          </p>
        </div>

        {/* KPI 3: Dwell Time */}
        <div className="p-7 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
            <span>Avg Customs Dwell Time</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
              {data.summary.dwellTrend}
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
            {data.summary.avgDwellTime}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 font-medium">
            From vessel berthing / flight touchdown to out-of-charge
          </p>
        </div>

        {/* KPI 4: Conversion Rate */}
        <div className="p-7 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
            <span>Inquiry-to-PO Conversion</span>
            <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px] font-bold">
              {data.summary.conversionTrend}
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
            {data.summary.conversionRate}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 font-medium">
            Lead closure velocity across modern trade &amp; quick-commerce
          </p>
        </div>
      </div>

      {/* Row 2: Monthly Import Volume Graph & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart: Monthly Import Volume (2 Columns) */}
        <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2
                className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight"
                style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
              >
                Import Volume &amp; Consignment Velocity
              </h2>
              <p className="text-sm text-[var(--muted)] mt-1 font-medium">
                Monthly units cleared (Skincare &amp; Cosmetics vs. Food &amp; Beverages)
              </p>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[var(--persimmon)]" />
                <span className="text-[var(--ink)]">Skincare</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[var(--jade)]" />
                <span className="text-[var(--ink)]">Food &amp; Bev</span>
              </div>
            </div>
          </div>

          {/* Pure SVG & CSS Bar Visualization */}
          <div className="space-y-6 pt-2">
            {data.monthly.map((m) => {
              const skincarePct = (m.skincare / maxMonthly) * 100;
              const foodPct = (m.food / maxMonthly) * 100;

              return (
                <div key={m.month} className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                    <span className="text-[var(--ink)] w-20">{m.month}</span>
                    <span className="text-[var(--muted)] font-mono">
                      {m.totalUnits.toLocaleString()} units • ₹{m.valueCr} Cr
                    </span>
                  </div>

                  {/* Stacked Visual Bar */}
                  <div className="w-full h-8 bg-[var(--hanji)] rounded-xl overflow-hidden flex p-1 gap-1">
                    <div
                      style={{ width: `${skincarePct}%` }}
                      className="h-full bg-[var(--persimmon)] rounded-lg transition-all duration-500 relative group/bar flex items-center justify-end px-2"
                    >
                      <span className="text-[11px] font-bold text-white hidden sm:inline opacity-90 font-mono">
                        {m.skincare.toLocaleString()}
                      </span>
                    </div>
                    <div
                      style={{ width: `${foodPct}%` }}
                      className="h-full bg-[var(--jade)] rounded-lg transition-all duration-500 relative group/bar flex items-center justify-end px-2"
                    >
                      <span className="text-[11px] font-bold text-white hidden sm:inline opacity-90 font-mono">
                        {m.food.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--line)] flex flex-wrap items-center justify-between text-xs text-[var(--muted)] font-medium">
            <span>✓ Synchronized with ICEGATE Nhava Sheva &amp; Delhi Air Cargo logs</span>
            <span>All values in Master Packaging Units (SKUs)</span>
          </div>
        </div>

        {/* Donut / Share Chart: Category Breakdown (1 Column) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs flex flex-col justify-between">
          <div>
            <h2
              className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Category Distribution
            </h2>
            <p className="text-sm text-[var(--muted)] mb-8 font-medium">
              Share of import value by product segment
            </p>

            {/* Visual Circular Representation */}
            <div className="flex items-center justify-center my-6">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Segment 1: Skincare */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="var(--persimmon)"
                    strokeWidth="14"
                    strokeDasharray={`${data.categories[0].percentage * 2.51} 251`}
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Food */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="var(--jade)"
                    strokeWidth="14"
                    strokeDasharray={`${data.categories[1].percentage * 2.51} 251`}
                    strokeDashoffset={`${-data.categories[0].percentage * 2.51}`}
                  />
                  {/* Segment 3: Health */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#d97706"
                    strokeWidth="14"
                    strokeDasharray={`${data.categories[2].percentage * 2.51} 251`}
                    strokeDashoffset={`${-(data.categories[0].percentage + data.categories[1].percentage) * 2.51}`}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-[var(--muted)] uppercase">Total Value</span>
                  <span className="text-xl font-extrabold text-[var(--ink)] font-mono">
                    {data.summary.totalValue}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Rows */}
            <div className="space-y-3 mt-4">
              {data.categories.map((c) => (
                <div
                  key={c.name}
                  className="p-3.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-sm font-bold text-[var(--ink)]">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[var(--ink)]">
                      {c.percentage}%
                    </span>
                    <span className="text-xs text-[var(--muted)] block font-mono">
                      ₹{c.valueCr} Cr
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Customs Velocity & Funnel Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customs Port Velocity */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight"
                style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
              >
                Customs Clearance Velocity
              </h2>
              <p className="text-sm text-[var(--muted)] mt-1 font-medium">
                Average clearance dwell time vs SLA target across Indian port gateways
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Dual Port Active
            </span>
          </div>

          <div className="space-y-5">
            {data.portDwellTimes.map((p) => (
              <div key={p.port} className="p-5 rounded-2xl bg-[var(--hanji)] border border-[var(--line)]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-base font-bold text-[var(--ink)]">{p.port}</span>
                    <span className="text-xs text-[var(--muted)] block font-medium mt-0.5">
                      {p.mode} • Target SLA: &lt; {p.targetDays} days
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold font-mono text-[var(--ink)]">
                      {p.days} Days
                    </span>
                    <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                      {p.passRate}% First Pass
                    </span>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="w-full bg-[var(--paper)] h-2.5 rounded-full overflow-hidden mt-3 border border-[var(--line)]">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${Math.min(100, (p.targetDays / p.days) * 80)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Conversion Pipeline Funnel */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <h2
            className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight mb-2"
            style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
          >
            Inquiry &amp; Lead Conversion Funnel
          </h2>
          <p className="text-sm text-[var(--muted)] mb-8 font-medium">
            Progression from initial partner enquiry to signed distribution PO
          </p>

          <div className="space-y-4">
            {data.funnel.map((f, i) => (
              <div key={f.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <span className="text-[var(--ink)]">
                    {i + 1}. {f.stage}
                  </span>
                  <span className="font-mono text-[var(--ink)]">
                    {f.count} leads ({f.percentage}%)
                  </span>
                </div>

                {/* Funnel Bar */}
                <div className="w-full h-7 bg-[var(--hanji)] rounded-xl overflow-hidden p-1">
                  <div
                    style={{ width: `${f.percentage}%` }}
                    className="h-full bg-[var(--persimmon)] rounded-lg transition-all duration-500 opacity-90 flex items-center px-3"
                  >
                    <span className="text-[11px] font-bold text-white font-mono">
                      {f.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--muted)] font-medium">
            <span>Average commercial sales cycle: 11.4 business days</span>
            <span className="text-emerald-700 font-bold">● High Conversion Velocity</span>
          </div>
        </div>
      </div>

      {/* Row 4: Top Performing Korean Brands */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2
              className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Top Korean Brands by Velocity &amp; Demand
            </h2>
            <p className="text-sm text-[var(--muted)] mt-1 font-medium">
              Ranked by monthly consignment volume and retail re-order frequency
            </p>
          </div>
          <span className="text-xs text-[var(--muted)] font-mono">
            Updated via automated warehouse scan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.brands.map((b, idx) => (
            <div
              key={b.name}
              className="p-5 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] hover:border-[var(--persimmon)]/50 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[var(--paper)] border border-[var(--line)] text-xs font-bold text-[var(--ink)] flex items-center justify-center font-mono">
                    #{idx + 1}
                  </span>
                  <div className="text-base font-bold text-[var(--ink)]">{b.name}</div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  {b.growth}
                </span>
              </div>

              <div className="text-xs text-[var(--muted)] mb-3 font-medium">
                {b.category}
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-[var(--line)]">
                <span className="text-xs font-bold text-[var(--muted)] uppercase">Monthly Volume</span>
                <span className="text-sm font-extrabold font-mono text-[var(--ink)]">
                  {b.unitsMo.toLocaleString()} units
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[var(--paper)] h-2 rounded-full overflow-hidden mt-3 border border-[var(--line)]">
                <div
                  className="h-full bg-[var(--persimmon)] rounded-full"
                  style={{ width: `${Math.min(100, b.share * 2)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
