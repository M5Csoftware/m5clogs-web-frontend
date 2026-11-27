"use client";

import React from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { COMPANY_INFO, SERVICES_LIST } from "@/data/logisticsData";
import { Phone, Mail, MapPin, Globe, Shield, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-sky-900 to-slate-950 border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to Accelerate Your Global Supply Chain?
            </h3>
            <p className="text-xs text-sky-200/80 mt-1">
              Join hundreds of high-growth exporters shipping seamlessly across 5 continents.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/rate-calculator"
              className="py-3 px-5 rounded-xl font-bold text-xs bg-white text-slate-950 hover:bg-slate-100 transition shadow-md"
            >
              Get Instant Estimate
            </Link>
            <Link
              href="/contact"
              className="py-3 px-5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-md shadow-amber-500/20"
            >
              Speak with a Specialist
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              {COMPANY_INFO.name} is a premier global logistics provider based in New Delhi, India.
              Specializing in cross-border e-commerce delivery, international air courier, ocean freight
              forwarding, overseas warehousing, and licensed customs brokerage.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{COMPANY_INFO.headquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">{COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-300">{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Logistics Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES_LIST.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.id}`}
                    className="hover:text-white transition block"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Access
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/tracking" className="hover:text-white transition">
                  Track Airway Bill (AWB)
                </Link>
              </li>
              <li>
                <Link href="/rate-calculator" className="hover:text-white transition">
                  Freight Rate Calculator
                </Link>
              </li>
              <li>
                <Link href="/#network" className="hover:text-white transition">
                  Global Hubs & Network
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  All Service Offerings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Customer Care
                </Link>
              </li>
              <li>
                <a href="#portal" className="text-amber-400 hover:text-amber-300 transition font-medium">
                  Client & Courier Login
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Newsletter & Trade Updates
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for international trade advisories, customs changes, and fuel surcharge updates.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter business email"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                className="w-full py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-xs transition"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-black/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {COMPANY_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-slate-400 transition">
              Terms of Carriage
            </a>
            <a href="#privacy" className="hover:text-slate-400 transition">
              Privacy Policy
            </a>
            <a href="#customs" className="hover:text-slate-400 transition">
              Customs Disclaimers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
