"use client";

import React, { useState } from "react";
import { GLOBAL_HUBS } from "@/data/logisticsData";
import { Globe, MapPin, Plane, ArrowUpRight, Shield } from "lucide-react";

export default function GlobalNetwork() {
  const [selectedHub, setSelectedHub] = useState(GLOBAL_HUBS[0]);

  const corridors = [
    {
      name: "India ⇄ North America Express",
      time: "3-5 Business Days",
      gateways: "DEL / BOM → JFK / ORD / LAX",
      details: "Daily scheduled freighter flights with expedited US Customs clearance.",
    },
    {
      name: "India ⇄ European Union Cargo Line",
      time: "2-4 Business Days",
      gateways: "DEL → FRA / LHR / AMS",
      details: "Direct air links connecting major EU industrial centers and e-commerce distribution.",
    },
    {
      name: "India ⇄ GCC / Middle East Rapid",
      time: "24-48 Hours",
      gateways: "DEL / BOM / BLR → DXB / DOH / RUH",
      details: "Next-day delivery available for UAE and Saudi Arabia with COD collection.",
    },
    {
      name: "India ⇄ Southeast Asia & Oceania",
      time: "3-5 Business Days",
      gateways: "DEL / MAA → SIN / BKK / SYD",
      details: "Comprehensive multi-modal maritime and air forwarding across APAC ports.",
    },
  ];

  return (
    <section id="network" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400 bg-sky-950 border border-sky-800/60 px-3.5 py-1 rounded-full">
            Strategic Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">
            A Seamless Network Across 5 Continents
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Headquartered in New Delhi, India with operational gateway hubs, bonded warehouses, and
            carrier alliances in every major trade epicenter globally.
          </p>
        </div>

        {/* Hubs Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
          {GLOBAL_HUBS.map((hub) => (
            <button
              key={hub.code}
              onClick={() => setSelectedHub(hub)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                selectedHub.code === hub.code
                  ? "bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-600/40 ring-2 ring-sky-300/30 scale-105"
                  : "bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 text-slate-300"
              }`}
            >
              <span className="text-xs font-black font-mono tracking-wider block">
                {hub.code}
              </span>
              <span className="text-xs font-bold block truncate mt-0.5">{hub.city}</span>
              <span className="text-[10px] text-slate-400 block truncate">{hub.country}</span>
            </button>
          ))}
        </div>

        {/* Selected Hub Detail Card */}
        <div className="bg-gradient-to-r from-slate-800/90 to-blue-950/90 rounded-3xl p-6 sm:p-8 border border-white/10 mb-14 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold font-mono text-lg">
                {selectedHub.code}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  {selectedHub.type}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {selectedHub.city}, {selectedHub.country}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Hub Operations 24/7
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 text-slate-300 font-semibold">
                EDI Customs Integration
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-slate-400 block mb-1">Direct Cargo Clearance</span>
              <p className="text-slate-200">
                On-site licensed customs clearance agents and fast-track green channel access.
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-slate-400 block mb-1">Fulfillment & 3PL Capabilities</span>
              <p className="text-slate-200">
                Pick, pack, cross-docking, temperature-controlled storage, and local last-mile dispatch.
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-slate-400 block mb-1">Connecting Trade Lines</span>
              <p className="text-slate-200">
                Direct block-space agreements with top tier international cargo and passenger airlines.
              </p>
            </div>
          </div>
        </div>

        {/* Trade Corridors Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Plane className="w-5 h-5 text-amber-400" />
            Key International Trade Corridors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {corridors.map((c, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-sky-500/50 transition duration-150"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-white">{c.name}</h4>
                  <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 shrink-0">
                    {c.time}
                  </span>
                </div>
                <div className="text-xs text-sky-400 font-mono mb-2">{c.gateways}</div>
                <p className="text-xs text-slate-300">{c.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
