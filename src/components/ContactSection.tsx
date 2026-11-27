"use client";

import React, { useState } from "react";
import { COMPANY_INFO, SERVICES_LIST } from "@/data/logisticsData";
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, Clock, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "International Express Delivery",
    originCountry: "India",
    destinationCountry: "United States",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Headquarters Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-4">
                Request a Custom Corporate Freight Quote
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you need regular export air charters, ocean freight container slots, or tailored
                cross-border e-commerce solutions, our logistics consultants are ready to assist.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Registered Corporate Headquarters
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {COMPANY_INFO.headquarters}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Direct Phone Support
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:gap-4 mt-1">
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-xs font-bold text-sky-700 hover:underline"
                    >
                      {COMPANY_INFO.phone} (Main)
                    </a>
                    <a
                      href={`tel:${COMPANY_INFO.tollFree}`}
                      className="text-xs font-bold text-slate-700 hover:underline"
                    >
                      {COMPANY_INFO.tollFree} (Toll Free)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Electronic Inquiries
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:gap-4 mt-1">
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-xs font-bold text-sky-700 hover:underline"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.salesEmail}`}
                      className="text-xs font-bold text-slate-700 hover:underline"
                    >
                      {COMPANY_INFO.salesEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-950">
                    Hours of Operation
                  </h4>
                  <p className="text-xs text-sky-800 mt-1">
                    24/7 Operations Desk, Air Gateway Tracking, & Customs Clearance Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-xl shadow-slate-200/50">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Quote Request Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. An M5Clogs
                  commercial rate consultant will review your shipment specifications and reach out within 2 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        service: "International Express Delivery",
                        originCountry: "India",
                        destinationCountry: "United States",
                        message: "",
                      });
                    }}
                    className="py-2.5 px-6 rounded-xl font-semibold text-xs text-sky-700 bg-sky-50 hover:bg-sky-100 transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-xl font-bold text-slate-900">Get an Instant Freight Proposal</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out your shipping parameters to receive preferential volume pricing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@company.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      Company Name / Brand
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Global Exporters Ltd."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      Service Type
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50 text-slate-800"
                    >
                      {SERVICES_LIST.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      Origin Country
                    </label>
                    <input
                      type="text"
                      value={formData.originCountry}
                      onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                      placeholder="India (DEL)"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                      Destination Country
                    </label>
                    <input
                      type="text"
                      value={formData.destinationCountry}
                      onChange={(e) =>
                        setFormData({ ...formData, destinationCountry: e.target.value })
                      }
                      placeholder="USA / Germany / UAE"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Shipment Details & Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide estimated weight, commodity, frequency of shipments, or special handling requirements..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50 text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="animate-pulse">Processing Proposal...</span>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
