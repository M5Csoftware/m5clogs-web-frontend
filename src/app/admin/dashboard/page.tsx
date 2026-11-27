"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getContactLeads,
  getPartnershipLeads,
  getNewsletterLeads,
  ContactLead,
  PartnershipLead,
  NewsletterLead,
} from "@/lib/leadsStore";

export default function AdminDashboardPage() {
  const [contactLeads, setContactLeads] = useState<ContactLead[]>([]);
  const [partnershipLeads, setPartnershipLeads] = useState<PartnershipLead[]>([]);
  const [newsletterLeads, setNewsletterLeads] = useState<NewsletterLead[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadAllLeads = () => {
    setContactLeads(getContactLeads());
    setPartnershipLeads(getPartnershipLeads());
    setNewsletterLeads(getNewsletterLeads());
    setLoaded(true);
  };

  useEffect(() => {
    loadAllLeads();

    const handleUpdate = () => loadAllLeads();
    window.addEventListener("m5c_leads_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("m5c_leads_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Compute real statistics
  const totalContact = contactLeads.length;
  const totalPartnership = partnershipLeads.length;
  const totalNewsletter = newsletterLeads.length;
  const totalLeads = totalContact + totalPartnership + totalNewsletter;

  // Status counts (from Contact & Partnership)
  const allActionableLeads = [...contactLeads, ...partnershipLeads];
  const newCount = allActionableLeads.filter((l) => l.status === "New").length;
  const inProgressCount = allActionableLeads.filter(
    (l) => l.status === "Contacted" || l.status === "In Progress"
  ).length;
  const resolvedCount =
    allActionableLeads.filter((l) => l.status === "Resolved").length +
    newsletterLeads.filter((n) => n.status === "Active").length;

  // Topic counts from Contact leads
  const topicCounts: Record<string, number> = {};
  contactLeads.forEach((l) => {
    const topic = l.topic || "General enquiry";
    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
  });
  const topicList = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);

  // Category counts from Partnership leads
  const categoryCounts: Record<string, number> = {};
  partnershipLeads.forEach((l) => {
    (l.categories || []).forEach((cat) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });
  const categoryList = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  // Recent leads stream (latest 5 across all forms)
  const recentStream = [
    ...contactLeads.map((l) => ({
      id: l.id,
      title: l.name,
      subtitle: l.company || l.email,
      source: "Contact Us Form",
      badgeColor: "border-[var(--persimmon)] text-[var(--persimmon)] bg-[var(--persimmon)]/5",
      status: l.status,
      date: l.createdAt,
    })),
    ...partnershipLeads.map((l) => ({
      id: l.id,
      title: l.company,
      subtitle: `${l.name} • ${l.bizType}`,
      source: "Partnership Form",
      badgeColor: "border-[var(--jade)] text-[var(--jade)] bg-[var(--jade)]/5",
      status: l.status,
      date: l.createdAt,
    })),
    ...newsletterLeads.map((l) => ({
      id: l.id,
      title: l.email,
      subtitle: l.source,
      source: "Newsletter Subscription",
      badgeColor: "border-blue-500 text-blue-700 bg-blue-50",
      status: l.status,
      date: l.createdAt,
    })),
  ].slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "Contacted":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "In Progress":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Resolved":
      case "Active":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-800 border-slate-200";
    }
  };

  // Percentages for status donut
  const totalStatusItems = allActionableLeads.length || 1;
  const newPct = Math.round((newCount / totalStatusItems) * 100);
  const inProgressPct = Math.round((inProgressCount / totalStatusItems) * 100);
  const resolvedPct = Math.max(0, 100 - newPct - inProgressPct);

  return (
    <div className="space-y-10 sm:space-y-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pb-8 border-b border-[var(--line)]">
        <div>
          <h1
            className="admin-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
          >
            Form Leads &amp; Website Analytics
          </h1>
          <p className="text-base text-[var(--muted)] mt-1.5 font-medium">
            Live analytics dynamically calculated from public website form submissions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--hanji-2)] text-[var(--ink)] text-sm font-bold transition shadow-xs flex items-center gap-2"
          >
            <span>Products</span>
            <span className="text-xs px-1.5 py-0.5 rounded-md bg-[var(--hanji-2)] font-mono text-[var(--muted)]">SKUs</span>
          </Link>
          <Link
            href="/admin/leads"
            className="px-5 py-2.5 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-sm font-bold transition shadow-xs"
          >
            Manage Form Leads →
          </Link>
        </div>
      </div>

      {/* 4 Real KPI Statistics from Leads Store */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Collected */}
        <div className="p-7 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3 flex items-center justify-between">
            <span>Total Website Leads</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-4xl font-extrabold text-[var(--ink)] tracking-tight">
            {loaded ? totalLeads : "..."}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 font-medium">
            {totalContact} Contact • {totalPartnership} Wholesale • {totalNewsletter} Subscribers
          </p>
        </div>

        {/* New Leads */}
        <div className="p-7 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3 flex items-center justify-between">
            <span>New / Action Required</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              Needs Reply
            </span>
          </div>
          <div className="text-4xl font-extrabold text-rose-700 tracking-tight">
            {loaded ? newCount : "..."}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 font-medium">
            Leads waiting for first response from team
          </p>
        </div>

        {/* In Follow-up */}
        <div className="p-7 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3 flex items-center justify-between">
            <span>In Progress / Contacted</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
              Active
            </span>
          </div>
          <div className="text-4xl font-extrabold text-amber-700 tracking-tight">
            {loaded ? inProgressCount : "..."}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 font-medium">
            Ongoing discussions, catalog sharing &amp; proposals
          </p>
        </div>

        {/* Resolved / Closed */}
        <div className="p-7 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center justify-between">
            <span>Resolved / Completed</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Converted
            </span>
          </div>
          <div className="text-4xl font-extrabold text-emerald-700 tracking-tight">
            {loaded ? resolvedCount : "..."}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 font-medium">
            Resolved customer inquiries &amp; active subscribers
          </p>
        </div>
      </div>

      {/* Row 2: Form Ingestion Breakdown & Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Distribution (2 Cols) */}
        <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight"
                style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
              >
                Lead Volume by Public Form
              </h2>
              <p className="text-sm text-[var(--muted)] mt-1 font-medium">
                Breakdown of submissions captured across website entry points
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Live Store
            </span>
          </div>

          <div className="space-y-6">
            {/* Contact Form */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-[var(--ink)] flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[var(--persimmon)]" />
                  Contact Us Page Form (/contact)
                </span>
                <span className="font-mono text-[var(--muted)]">
                  {totalContact} leads ({totalLeads ? Math.round((totalContact / totalLeads) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-6 bg-[var(--hanji)] rounded-xl overflow-hidden p-0.5">
                <div
                  style={{ width: `${totalLeads ? (totalContact / totalLeads) * 100 : 0}%` }}
                  className="h-full bg-[var(--persimmon)] rounded-lg transition-all duration-500"
                />
              </div>
            </div>

            {/* Wholesale & Partnership Form */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-[var(--ink)] flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[var(--jade)]" />
                  Wholesale &amp; Partnership Application (/partnerships)
                </span>
                <span className="font-mono text-[var(--muted)]">
                  {totalPartnership} leads ({totalLeads ? Math.round((totalPartnership / totalLeads) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-6 bg-[var(--hanji)] rounded-xl overflow-hidden p-0.5">
                <div
                  style={{ width: `${totalLeads ? (totalPartnership / totalLeads) * 100 : 0}%` }}
                  className="h-full bg-[var(--jade)] rounded-lg transition-all duration-500"
                />
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-[var(--ink)] flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-blue-500" />
                  Website Footer Newsletter
                </span>
                <span className="font-mono text-[var(--muted)]">
                  {totalNewsletter} leads ({totalLeads ? Math.round((totalNewsletter / totalLeads) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-6 bg-[var(--hanji)] rounded-xl overflow-hidden p-0.5">
                <div
                  style={{ width: `${totalLeads ? (totalNewsletter / totalLeads) * 100 : 0}%` }}
                  className="h-full bg-blue-500 rounded-lg transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--muted)] font-medium">
            <span>Synchronized with client-side localStorage persistence</span>
            <span>Automatically updates when forms are submitted</span>
          </div>
        </div>

        {/* Lead Status Distribution (1 Col Donut) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs flex flex-col justify-between">
          <div>
            <h2
              className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Status Distribution
            </h2>
            <p className="text-sm text-[var(--muted)] mb-6 font-medium">
              Pipeline status across all customer inquiries
            </p>

            {/* SVG Donut Chart */}
            <div className="flex items-center justify-center my-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Segment: New (Rose) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#e11d48"
                    strokeWidth="14"
                    strokeDasharray={`${newPct * 2.51} 251`}
                    strokeDashoffset="0"
                  />
                  {/* Segment: In Progress (Amber) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#d97706"
                    strokeWidth="14"
                    strokeDasharray={`${inProgressPct * 2.51} 251`}
                    strokeDashoffset={`${-newPct * 2.51}`}
                  />
                  {/* Segment: Resolved (Emerald) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#059669"
                    strokeWidth="14"
                    strokeDasharray={`${resolvedPct * 2.51} 251`}
                    strokeDashoffset={`${-(newPct + inProgressPct) * 2.51}`}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-[var(--muted)] uppercase">Active</span>
                  <span className="text-2xl font-extrabold text-[var(--ink)] font-mono">
                    {allActionableLeads.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 mt-4">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  <span className="text-xs font-bold text-[var(--ink)]">New / Unopened</span>
                </div>
                <span className="text-xs font-bold font-mono text-[var(--ink)]">
                  {newCount} ({newPct}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span className="text-xs font-bold text-[var(--ink)]">In Progress</span>
                </div>
                <span className="text-xs font-bold font-mono text-[var(--ink)]">
                  {inProgressCount} ({inProgressPct}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-[var(--ink)]">Resolved</span>
                </div>
                <span className="text-xs font-bold font-mono text-[var(--ink)]">
                  {allActionableLeads.filter((l) => l.status === "Resolved").length} ({resolvedPct}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Topic Breakdown & Partnership Category Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Topics Analysis */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight"
                style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
              >
                Contact Inquiry Topics
              </h2>
              <p className="text-sm text-[var(--muted)] mt-1 font-medium">
                What customers are inquiring about on the Contact Us form
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[var(--muted)]">
              {totalContact} submissions
            </span>
          </div>

          <div className="space-y-4">
            {topicList.length > 0 ? (
              topicList.map(([topic, count]) => {
                const pct = totalContact ? Math.round((count / totalContact) * 100) : 0;
                return (
                  <div key={topic} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="text-[var(--ink)]">{topic}</span>
                      <span className="font-mono text-[var(--muted)]">
                        {count} leads ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[var(--hanji)] rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className="h-full bg-[var(--persimmon)] rounded-full"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-sm text-[var(--muted)]">
                No contact form topics recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Partnership Categories Requested */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight"
                style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
              >
                Top Requested B2B Categories
              </h2>
              <p className="text-sm text-[var(--muted)] mt-1 font-medium">
                Most requested product sectors in Partnership applications
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[var(--muted)]">
              {totalPartnership} applications
            </span>
          </div>

          <div className="space-y-4">
            {categoryList.length > 0 ? (
              categoryList.slice(0, 6).map(([cat, count]) => {
                const pct = totalPartnership ? Math.round((count / totalPartnership) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="text-[var(--ink)]">{cat}</span>
                      <span className="font-mono text-[var(--muted)]">
                        {count} inquiries ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[var(--hanji)] rounded-full overflow-hidden">
                      <div
                        style={{ width: `${Math.min(100, pct)}%` }}
                        className="h-full bg-[var(--jade)] rounded-full"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-sm text-[var(--muted)]">
                No partnership categories recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 4: Recent Submissions Stream */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="admin-heading text-xl font-extrabold text-[var(--ink)] tracking-tight"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Recent Website Submissions
            </h2>
            <p className="text-sm text-[var(--muted)] mt-1 font-medium">
              Latest user submissions from all 3 public website forms
            </p>
          </div>

          <Link
            href="/admin/leads"
            className="text-sm font-bold text-[var(--persimmon)] hover:underline"
          >
            View all in Form Leads →
          </Link>
        </div>

        <div className="space-y-3">
          {recentStream.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[var(--persimmon)]/40 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] shrink-0">
                  {item.id}
                </span>
                <div>
                  <div className="text-[14px] font-bold text-[var(--ink)]">{item.title}</div>
                  <div className="text-xs text-[var(--muted)] font-medium mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                  {item.source}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(item.status)}`}>
                  {item.status}
                </span>
                <span className="text-xs font-mono text-[var(--muted)] whitespace-nowrap">
                  {item.date}
                </span>
              </div>
            </div>
          ))}

          {recentStream.length === 0 && (
            <div className="py-12 text-center text-sm text-[var(--muted)] font-medium">
              No leads recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
