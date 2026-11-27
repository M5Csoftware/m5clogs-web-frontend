"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ContactLead,
  PartnershipLead,
  NewsletterLead,
  getContactLeads,
  getPartnershipLeads,
  getNewsletterLeads,
  updateContactLeadStatus,
  deleteContactLead,
  updatePartnershipLeadStatus,
  deletePartnershipLead,
  deleteNewsletterLead,
  saveContactLead,
} from "@/lib/leadsStore";

export default function AdminLeadsPage() {
  // Step 1 is selecting a particular form: null means on selection screen
  const [selectedForm, setSelectedForm] = useState<"contact" | "partnership" | "newsletter" | null>(null);

  const [contactLeads, setContactLeads] = useState<ContactLead[]>([]);
  const [partnershipLeads, setPartnershipLeads] = useState<PartnershipLead[]>([]);
  const [newsletterLeads, setNewsletterLeads] = useState<NewsletterLead[]>([]);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selected lead for detail modal
  const [activeContactLead, setActiveContactLead] = useState<ContactLead | null>(null);
  const [activePartnershipLead, setActivePartnershipLead] = useState<PartnershipLead | null>(null);

  const refreshLeads = () => {
    setContactLeads(getContactLeads());
    setPartnershipLeads(getPartnershipLeads());
    setNewsletterLeads(getNewsletterLeads());
  };

  useEffect(() => {
    refreshLeads();
    const handleStorageChange = () => refreshLeads();
    window.addEventListener("m5c_leads_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("m5c_leads_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Filtered lists
  const filteredContactLeads = contactLeads.filter((lead) => {
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(search.toLowerCase())) ||
      lead.id.toLowerCase().includes(search.toLowerCase()) ||
      (lead.topic && lead.topic.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const filteredPartnershipLeads = partnershipLeads.filter((lead) => {
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.id.toLowerCase().includes(search.toLowerCase()) ||
      lead.city.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredNewsletterLeads = newsletterLeads.filter((lead) =>
    lead.email.toLowerCase().includes(search.toLowerCase())
  );

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

  // Test generator for instant demo
  const handleAddSampleContactLead = () => {
    saveContactLead({
      name: "Devika Roy",
      company: "Roy Korean Beauty & Spa",
      email: "devika@roybeauty.in",
      phone: "+91 98300 77112",
      topic: "Wholesale or distribution",
      message: "Looking for 500 units of Anua Heartleaf Toner and 300 units of Beauty of Joseon Sunscreen for immediate order.",
      source: "Contact Page Form (Live Test)",
    });
    refreshLeads();
  };

  // ============================================================
  // STEP 1: FORM SELECTION SCREEN
  // ============================================================
  if (selectedForm === null) {
    const contactNewCount = contactLeads.filter((l) => l.status === "New").length;
    const partnershipNewCount = partnershipLeads.filter((l) => l.status === "New").length;

    return (
      <div className="space-y-10 sm:space-y-12 font-sans">
        {/* Header */}
        <div className="pb-8 border-b border-[var(--line)]">
          <div className="flex items-center gap-3">
            <h1
              className="admin-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Form Leads
            </h1>
          </div>
          <p className="text-base sm:text-lg text-[var(--muted)] mt-2 font-medium">
            First step: Select a particular form below to access and manage its submitted leads and details.
          </p>
        </div>

        {/* 3 Form Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Contact Us Form */}
          <div
            onClick={() => {
              setSelectedForm("contact");
              setSearch("");
              setStatusFilter("All");
            }}
            className="group cursor-pointer bg-[var(--paper)] border-2 border-[var(--line)] hover:border-[var(--persimmon)] rounded-3xl p-8 sm:p-9 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-center text-[var(--persimmon)] group-hover:scale-105 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--hanji)] border border-[var(--line)] text-[var(--muted)]">
                  Linked to /contact
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h2
                  className="admin-heading text-xl sm:text-2xl font-extrabold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition-colors"
                  style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
                >
                  Contact Form
                </h2>
                {contactNewCount > 0 && (
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 animate-pulse">
                    {contactNewCount} New
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-[var(--muted)] font-medium leading-relaxed mb-6">
                General customer messages, brand inquiries, and questions submitted via the public Contact Us page.
              </p>

              <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)] text-xs text-[var(--muted)] space-y-1 mb-6">
                <div className="font-bold text-[var(--ink)]">Tracked Fields:</div>
                <div>Name, Company, Email, Phone, Topic, Full Message</div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--ink)]">
                {contactLeads.length} Total Submissions
              </span>
              <span className="text-sm font-bold text-[var(--persimmon)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Form Leads →
              </span>
            </div>
          </div>

          {/* Card 2: Wholesale & Partnerships Form */}
          <div
            onClick={() => {
              setSelectedForm("partnership");
              setSearch("");
              setStatusFilter("All");
            }}
            className="group cursor-pointer bg-[var(--paper)] border-2 border-[var(--line)] hover:border-[var(--jade)] rounded-3xl p-8 sm:p-9 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-center text-[var(--jade)] group-hover:scale-105 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--hanji)] border border-[var(--line)] text-[var(--muted)]">
                  Linked to /partnerships
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h2
                  className="admin-heading text-xl sm:text-2xl font-extrabold text-[var(--ink)] group-hover:text-[var(--jade)] transition-colors"
                  style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
                >
                  Wholesale &amp; B2B
                </h2>
                {partnershipNewCount > 0 && (
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 animate-pulse">
                    {partnershipNewCount} New
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-[var(--muted)] font-medium leading-relaxed mb-6">
                Trade applications, bulk orders, and distributor inquiries submitted through the Business Enquiry form.
              </p>

              <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)] text-xs text-[var(--muted)] space-y-1 mb-6">
                <div className="font-bold text-[var(--ink)]">Tracked Fields:</div>
                <div>Company, Business Type, City, Product Categories, Order Notes</div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--ink)]">
                {partnershipLeads.length} Total Applications
              </span>
              <span className="text-sm font-bold text-[var(--jade)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Form Leads →
              </span>
            </div>
          </div>

          {/* Card 3: Newsletter Subscriptions */}
          <div
            onClick={() => {
              setSelectedForm("newsletter");
              setSearch("");
              setStatusFilter("All");
            }}
            className="group cursor-pointer bg-[var(--paper)] border-2 border-[var(--line)] hover:border-[var(--gold)] rounded-3xl p-8 sm:p-9 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-center text-[var(--gold)] group-hover:scale-105 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--hanji)] border border-[var(--line)] text-[var(--muted)]">
                  Linked to Site Footer
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h2
                  className="admin-heading text-xl sm:text-2xl font-extrabold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors"
                  style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
                >
                  Newsletter Signups
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[var(--muted)] font-medium leading-relaxed mb-6">
                Customer email subscribers from the website footer for catalogs, new Korean product drops, and price sheets.
              </p>

              <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)] text-xs text-[var(--muted)] space-y-1 mb-6">
                <div className="font-bold text-[var(--ink)]">Tracked Fields:</div>
                <div>Email Address, Subscription Date, Source Page</div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--ink)]">
                {newsletterLeads.length} Total Subscribers
              </span>
              <span className="text-sm font-bold text-[var(--gold)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Subscribers →
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // STEP 2: OPEN PARTICULAR FORM LEADS PAGE (TABLE + DETAILS)
  // ============================================================
  return (
    <div className="space-y-10 font-sans">
      {/* Top Breadcrumb & Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[var(--line)]">
        <div>
          <button
            type="button"
            onClick={() => setSelectedForm(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--persimmon)] transition mb-3 cursor-pointer"
          >
            <span>←</span> Back to All Forms
          </button>
          <h1
            className="admin-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
          >
            {selectedForm === "contact" && "Contact Us Form Leads"}
            {selectedForm === "partnership" && "Wholesale & Partnership Leads"}
            {selectedForm === "newsletter" && "Newsletter Subscribers"}
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted)] mt-1 font-medium">
            {selectedForm === "contact" && "Linked to /contact — Anyone filling the contact form appears here automatically."}
            {selectedForm === "partnership" && "Linked to /partnerships — Trade applications and catalog requests appear here."}
            {selectedForm === "newsletter" && "Linked to site footer — Email subscribers collected from the website."}
          </p>
        </div>

        {/* Quick Switcher Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--paper)] border border-[var(--line)] self-start sm:self-center">
          <button
            type="button"
            onClick={() => setSelectedForm("contact")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              selectedForm === "contact"
                ? "bg-[var(--persimmon)] text-white shadow-xs"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Contact ({contactLeads.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedForm("partnership")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              selectedForm === "partnership"
                ? "bg-[var(--jade)] text-white shadow-xs"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Partnerships ({partnershipLeads.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedForm("newsletter")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              selectedForm === "newsletter"
                ? "bg-[var(--gold)] text-white shadow-xs"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Newsletter ({newsletterLeads.length})
          </button>
        </div>
      </div>

      {/* Action Bar (Search, Status Filter, Test Generator) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search leads by name, email, company, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-11 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--persimmon)] focus:outline-none transition shadow-2xs font-medium"
          />
          <svg className="w-5 h-5 text-[var(--muted)] absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {selectedForm !== "newsletter" && (
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--paper)] border border-[var(--line)] text-xs sm:text-sm">
              {["All", "New", "Contacted", "In Progress", "Resolved"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    statusFilter === tab
                      ? "bg-[var(--hanji)] text-[var(--persimmon)] shadow-2xs"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {selectedForm === "contact" && (
            <button
              type="button"
              onClick={handleAddSampleContactLead}
              className="px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-xs font-bold text-[var(--ink)] hover:border-[var(--persimmon)] hover:text-[var(--persimmon)] transition shadow-2xs cursor-pointer"
            >
              + Submit Test Lead
            </button>
          )}

          <Link
            href={selectedForm === "contact" ? "/contact" : "/partnerships"}
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-xs font-bold transition shadow-xs"
          >
            Open Public Form ↗
          </Link>
        </div>
      </div>

      {/* ============================================================
          FORM 1: CONTACT FORM LEADS TABLE
          ============================================================ */}
      {selectedForm === "contact" && (
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-3xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--line)] bg-[var(--hanji-2)]/40 text-[var(--muted)] uppercase text-xs font-bold tracking-wider">
                  <th className="py-4.5 px-6">Lead ID</th>
                  <th className="py-4.5 px-6">Submitter Name &amp; Contact</th>
                  <th className="py-4.5 px-6">Company</th>
                  <th className="py-4.5 px-6">Inquiry Topic</th>
                  <th className="py-4.5 px-6">Message Excerpt</th>
                  <th className="py-4.5 px-6">Date</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {filteredContactLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setActiveContactLead(lead)}
                    className="hover:bg-[var(--hanji)]/60 transition cursor-pointer group"
                  >
                    <td className="py-5 px-6 font-mono font-bold text-sm text-[var(--ink)]">
                      {lead.id}
                    </td>
                    <td className="py-5 px-6">
                      <div className="font-bold text-base text-[var(--ink)] group-hover:text-[var(--persimmon)] transition-colors">
                        {lead.name}
                      </div>
                      <div className="text-sm text-[var(--muted)] font-medium mt-0.5">
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="text-xs text-[var(--muted)] font-mono mt-0.5">
                          {lead.phone}
                        </div>
                      )}
                    </td>
                    <td className="py-5 px-6 text-sm sm:text-base font-semibold text-[var(--ink)]">
                      {lead.company || "Individual"}
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-xs sm:text-sm font-bold px-2.5 py-1 rounded bg-[var(--hanji)] border border-[var(--line)] text-[var(--ink)]">
                        {lead.topic || "General enquiry"}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-sm text-[var(--muted)] font-medium max-w-xs truncate">
                      {lead.message}
                    </td>
                    <td className="py-5 px-6 font-mono text-xs sm:text-sm text-[var(--muted)] whitespace-nowrap">
                      {lead.createdAt}
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {/* Eye Icon Button (Read) */}
                        <div className="relative group/tip inline-flex">
                          <button
                            type="button"
                            onClick={() => setActiveContactLead(lead)}
                            title="Read"
                            aria-label="Read"
                            className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:border-[var(--persimmon)] hover:text-[var(--persimmon)] hover:bg-[var(--hanji)] transition cursor-pointer shadow-2xs"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--ink)] text-white text-[11px] font-bold opacity-0 group-hover/tip:opacity-100 transition-opacity shadow-sm whitespace-nowrap z-20">
                            Read
                          </span>
                        </div>

                        {/* Trash Icon Button (Remove) */}
                        <div className="relative group/tip inline-flex">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Remove lead ${lead.id}?`)) {
                                deleteContactLead(lead.id);
                                refreshLeads();
                              }
                            }}
                            title="Remove"
                            aria-label="Remove"
                            className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer shadow-2xs"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-rose-700 text-white text-[11px] font-bold opacity-0 group-hover/tip:opacity-100 transition-opacity shadow-sm whitespace-nowrap z-20">
                            Remove
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredContactLeads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-base text-[var(--muted)] font-medium">
                      No contact leads found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================
          FORM 2: WHOLESALE & PARTNERSHIP LEADS TABLE
          ============================================================ */}
      {selectedForm === "partnership" && (
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-3xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--line)] bg-[var(--hanji-2)]/40 text-[var(--muted)] uppercase text-xs font-bold tracking-wider">
                  <th className="py-4.5 px-6">Lead ID</th>
                  <th className="py-4.5 px-6">Company &amp; Submitter</th>
                  <th className="py-4.5 px-6">Business Type</th>
                  <th className="py-4.5 px-6">City</th>
                  <th className="py-4.5 px-6">Categories Requested</th>
                  <th className="py-4.5 px-6">Enquiry Type</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {filteredPartnershipLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setActivePartnershipLead(lead)}
                    className="hover:bg-[var(--hanji)]/60 transition cursor-pointer group"
                  >
                    <td className="py-5 px-6 font-mono font-bold text-sm text-[var(--ink)]">
                      {lead.id}
                    </td>
                    <td className="py-5 px-6">
                      <div className="font-bold text-base text-[var(--ink)] group-hover:text-[var(--jade)] transition-colors">
                        {lead.company}
                      </div>
                      <div className="text-sm text-[var(--muted)] font-medium mt-0.5">
                        {lead.name} • {lead.email}
                      </div>
                      <div className="text-xs text-[var(--muted)] font-mono mt-0.5">
                        {lead.phone}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm font-semibold text-[var(--ink)]">
                      {lead.bizType}
                    </td>
                    <td className="py-5 px-6 text-sm font-medium text-[var(--ink)]">
                      {lead.city}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {lead.categories.map((c) => (
                          <span key={c} className="text-[11px] font-bold px-2 py-0.5 rounded bg-[var(--hanji)] border border-[var(--line)] text-[var(--ink)]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm font-bold text-[var(--ink)]">
                      {lead.enquiryType}
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {/* Eye Icon Button (Read) */}
                        <div className="relative group/tip inline-flex">
                          <button
                            type="button"
                            onClick={() => setActivePartnershipLead(lead)}
                            title="Read"
                            aria-label="Read"
                            className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:border-[var(--jade)] hover:text-[var(--jade)] hover:bg-[var(--hanji)] transition cursor-pointer shadow-2xs"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--ink)] text-white text-[11px] font-bold opacity-0 group-hover/tip:opacity-100 transition-opacity shadow-sm whitespace-nowrap z-20">
                            Read
                          </span>
                        </div>

                        {/* Trash Icon Button (Remove) */}
                        <div className="relative group/tip inline-flex">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete lead ${lead.id}?`)) {
                                deletePartnershipLead(lead.id);
                                refreshLeads();
                              }
                            }}
                            title="Remove"
                            aria-label="Remove"
                            className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer shadow-2xs"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-rose-700 text-white text-[11px] font-bold opacity-0 group-hover/tip:opacity-100 transition-opacity shadow-sm whitespace-nowrap z-20">
                            Remove
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPartnershipLeads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-base text-[var(--muted)] font-medium">
                      No partnership applications found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================
          FORM 3: NEWSLETTER LEADS TABLE
          ============================================================ */}
      {selectedForm === "newsletter" && (
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-3xl shadow-xs overflow-hidden max-w-4xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--line)] bg-[var(--hanji-2)]/40 text-[var(--muted)] uppercase text-xs font-bold tracking-wider">
                  <th className="py-4.5 px-6">ID</th>
                  <th className="py-4.5 px-6">Subscriber Email</th>
                  <th className="py-4.5 px-6">Signup Source</th>
                  <th className="py-4.5 px-6">Date Added</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {filteredNewsletterLeads.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[var(--hanji)]/60 transition">
                    <td className="py-5 px-6 font-mono font-bold text-sm text-[var(--ink)]">
                      {sub.id}
                    </td>
                    <td className="py-5 px-6 font-bold text-base text-[var(--ink)]">
                      {sub.email}
                    </td>
                    <td className="py-5 px-6 text-sm text-[var(--muted)] font-medium">
                      {sub.source}
                    </td>
                    <td className="py-5 px-6 font-mono text-sm text-[var(--muted)]">
                      {sub.createdAt}
                    </td>
                    <td className="py-5 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="relative group/tip inline-flex">
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove subscriber ${sub.email}?`)) {
                              deleteNewsletterLead(sub.id);
                              refreshLeads();
                            }
                          }}
                          title="Remove"
                          aria-label="Remove"
                          className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer shadow-2xs"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-rose-700 text-white text-[11px] font-bold opacity-0 group-hover/tip:opacity-100 transition-opacity shadow-sm whitespace-nowrap z-20">
                          Remove
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredNewsletterLeads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-base text-[var(--muted)] font-medium">
                      No subscribers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: CONTACT LEAD DETAILS
          ============================================================ */}
      {activeContactLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-[var(--paper)] border border-[var(--line)] rounded-3xl p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-6 border-b border-[var(--line)] mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--muted)] uppercase tracking-wider">
                  Contact Form Lead • {activeContactLead.id}
                </span>
                <h3
                  className="admin-heading text-2xl font-extrabold text-[var(--ink)] mt-1"
                  style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
                >
                  {activeContactLead.name}
                </h3>
                <span className="text-xs text-[var(--muted)] font-mono">
                  Submitted on {activeContactLead.createdAt} via {activeContactLead.source}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveContactLead(null)}
                className="p-2 rounded-xl text-[var(--muted)] hover:bg-[var(--hanji)] transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Status Selector Bar */}
              <div className="p-4 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--ink)]">Lead Status</span>
                <select
                  value={activeContactLead.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as ContactLead["status"];
                    updateContactLeadStatus(activeContactLead.id, newStatus);
                    setActiveContactLead({ ...activeContactLead, status: newStatus });
                    refreshLeads();
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-bold text-[var(--ink)] focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* Contact Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                  <div className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Company / Organization</div>
                  <div className="text-base font-bold text-[var(--ink)]">{activeContactLead.company || "Not provided"}</div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                  <div className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Inquiry Topic</div>
                  <div className="text-base font-bold text-[var(--ink)]">{activeContactLead.topic || "General"}</div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                  <div className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Email Address</div>
                  <a href={`mailto:${activeContactLead.email}`} className="text-base font-bold text-[var(--persimmon)] hover:underline">
                    {activeContactLead.email} ↗
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                  <div className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Phone Number</div>
                  <a href={`tel:${activeContactLead.phone}`} className="text-base font-bold text-[var(--ink)] hover:underline">
                    {activeContactLead.phone || "Not provided"}
                  </a>
                </div>
              </div>

              {/* Full Message Box */}
              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-2">
                  Full Customer Message
                </label>
                <div className="p-5 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] text-sm sm:text-base leading-relaxed text-[var(--ink)] font-medium whitespace-pre-wrap">
                  {activeContactLead.message}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <a
                  href={`mailto:${activeContactLead.email}?subject=Regarding your M5 Clogs Inquiry (${activeContactLead.id})`}
                  className="px-5 py-3 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-sm font-bold transition shadow-xs"
                >
                  Reply via Email ↗
                </a>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete lead ${activeContactLead.id}?`)) {
                      deleteContactLead(activeContactLead.id);
                      setActiveContactLead(null);
                      refreshLeads();
                    }
                  }}
                  className="px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-bold transition cursor-pointer"
                >
                  Delete Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: PARTNERSHIP LEAD DETAILS
          ============================================================ */}
      {activePartnershipLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-[var(--paper)] border border-[var(--line)] rounded-3xl p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-6 border-b border-[var(--line)] mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--muted)] uppercase tracking-wider">
                  Partnership Lead • {activePartnershipLead.id}
                </span>
                <h3
                  className="admin-heading text-2xl font-extrabold text-[var(--ink)] mt-1"
                  style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
                >
                  {activePartnershipLead.company}
                </h3>
                <span className="text-xs text-[var(--muted)] font-mono">
                  Submitted by {activePartnershipLead.name} on {activePartnershipLead.createdAt}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActivePartnershipLead(null)}
                className="p-2 rounded-xl text-[var(--muted)] hover:bg-[var(--hanji)] transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Status Selector Bar */}
              <div className="p-4 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--ink)]">Application Status</span>
                <select
                  value={activePartnershipLead.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as PartnershipLead["status"];
                    updatePartnershipLeadStatus(activePartnershipLead.id, newStatus);
                    setActivePartnershipLead({ ...activePartnershipLead, status: newStatus });
                    refreshLeads();
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-bold text-[var(--ink)] focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                  <div className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Contact Person</div>
                  <div className="text-base font-bold text-[var(--ink)]">{activePartnershipLead.name}</div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                  <div className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Business Type &amp; City</div>
                  <div className="text-base font-bold text-[var(--ink)]">{activePartnershipLead.bizType} • {activePartnershipLead.city}</div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                  <div className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Email Address</div>
                  <a href={`mailto:${activePartnershipLead.email}`} className="text-base font-bold text-[var(--jade)] hover:underline">
                    {activePartnershipLead.email} ↗
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-[var(--hanji)] border border-[var(--line)]">
                  <div className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Phone Number</div>
                  <a href={`tel:${activePartnershipLead.phone}`} className="text-base font-bold text-[var(--ink)] hover:underline">
                    {activePartnershipLead.phone}
                  </a>
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-2">
                  Interested Product Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {activePartnershipLead.categories.map((c) => (
                    <span key={c} className="text-xs font-bold px-3 py-1 rounded-lg bg-[var(--hanji)] border border-[var(--line)] text-[var(--ink)]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirement Details */}
              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-2">
                  Application / Order Notes
                </label>
                <div className="p-5 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] text-sm sm:text-base leading-relaxed text-[var(--ink)] font-medium whitespace-pre-wrap">
                  {activePartnershipLead.details}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <a
                  href={`mailto:${activePartnershipLead.email}?subject=M5 Clogs Partnership Inquiry (${activePartnershipLead.id})`}
                  className="px-5 py-3 rounded-xl bg-[var(--jade)] text-white text-sm font-bold transition shadow-xs"
                >
                  Reply via Email ↗
                </a>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete lead ${activePartnershipLead.id}?`)) {
                      deletePartnershipLead(activePartnershipLead.id);
                      setActivePartnershipLead(null);
                      refreshLeads();
                    }
                  }}
                  className="px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-bold transition cursor-pointer"
                >
                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
