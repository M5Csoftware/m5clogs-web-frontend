"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Calculator, ShieldCheck, ArrowRight, Globe, Plane, CheckCircle2 } from "lucide-react";
import TrackingWidget from "./TrackingWidget";
import RateCalculator from "./RateCalculator";
import { COMPANY_INFO } from "@/data/logisticsData";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"tracking" | "calculator">("tracking");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative background vectors & grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Pill */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-sky-300 font-semibold mb-5 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>M 5 Continent Logistics Solution (P) Ltd.</span>
            <span className="text-white/40">|</span>
            <span className="text-amber-400">Global Supply Chain Excellence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5">
            Connecting Five Continents With{" "}
            <span className="bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300 bg-clip-text text-transparent">
              Precision Logistics
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed mb-6">
            Empowering global cross-border trade with expedited air courier, maritime freight forwarding,
            overseas fulfillment hubs, and licensed customs clearance across 220+ countries.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Direct Airline Blocked Space
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Automated EDI Customs Clearance
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              B2C Global E-Commerce & COD
            </span>
          </div>
        </div>

        {/* Tab switcher for Tracking vs Rate Calculator */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="inline-flex p-1.5 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
              <button
                onClick={() => setActiveTab("tracking")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "tracking"
                    ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Search className="w-4 h-4" />
                Track Consignment / AWB
              </button>
              <button
                onClick={() => setActiveTab("calculator")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "calculator"
                    ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Calculator className="w-4 h-4" />
                Instant Rate Calculator
              </button>
            </div>
          </div>

          {/* Interactive Widget Box */}
          <div className="text-slate-900 transition-all">
            {activeTab === "tracking" ? (
              <TrackingWidget isStandalone={false} />
            ) : (
              <RateCalculator />
            )}
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 pt-8 border-t border-white/10 text-center">
          <div className="p-3">
            <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              {COMPANY_INFO.countriesServed}+
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 block">
              Countries & Territories
            </span>
          </div>
          <div className="p-3">
            <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
              {COMPANY_INFO.dailyShipments}
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 block">
              Packages Handled Monthly
            </span>
          </div>
          <div className="p-3">
            <span className="block text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {COMPANY_INFO.onTimeRate}
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 block">
              On-Time SLA Delivery
            </span>
          </div>
          <div className="p-3">
            <span className="block text-2xl sm:text-3xl font-black text-sky-400 font-mono">
              {COMPANY_INFO.warehouses}
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 block">
              Global Logistics Hubs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
