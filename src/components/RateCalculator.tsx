"use client";

import React, { useState } from "react";
import { DESTINATION_COUNTRIES } from "@/data/logisticsData";
import { Calculator, ArrowRight, Plane, Clock, ShieldCheck, Box, RefreshCw } from "lucide-react";

export default function RateCalculator() {
  const [originCountry] = useState("India (DEL/BOM Air Complex)");
  const [destinationCode, setDestinationCode] = useState("US");
  const [weight, setWeight] = useState<number>(5);
  const [serviceTier, setServiceTier] = useState<"express" | "standard">("express");

  const selectedDestination =
    DESTINATION_COUNTRIES.find((c) => c.code === destinationCode) || DESTINATION_COUNTRIES[0];

  // Pricing formula: base rate + weight * ratePerKg * tier multiplier
  const baseTariff = 1200;
  const tierMultiplier = serviceTier === "express" ? 1.0 : 0.78;
  const estimatedCostINR = Math.round(
    (baseTariff + weight * selectedDestination.ratePerKg) * tierMultiplier
  );
  const estimatedCostUSD = Math.round(estimatedCostINR / 86);

  const transitTime =
    serviceTier === "express"
      ? selectedDestination.transitDays
      : `${parseInt(selectedDestination.transitDays.split("-")[0]) + 2}-${
          parseInt(selectedDestination.transitDays.split("-")[1]) + 3
        } Days`;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2 text-sky-700">
        <Calculator className="w-5 h-5 text-sky-600" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Commercial & Retail Freight Estimator
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
        Calculate International Shipping Rates
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-6">
        Get instant estimates for door-to-door express and consolidated freight to over 220 countries.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Origin & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Ship From (Origin)
              </label>
              <div className="p-3 bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 border border-slate-200 flex items-center justify-between">
                <span>{originCountry}</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                  IN
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Ship To (Destination)
              </label>
              <select
                value={destinationCode}
                onChange={(e) => setDestinationCode(e.target.value)}
                className="w-full p-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
              >
                {DESTINATION_COUNTRIES.map((dest) => (
                  <option key={dest.code} value={dest.code}>
                    {dest.name} ({dest.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Weight Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-sky-600" />
                Consignment Gross Weight:
              </label>
              <span className="text-sm font-black text-sky-700 font-mono bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-200">
                {weight} kg ({Math.round(weight * 2.20462)} lbs)
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="50"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full accent-sky-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-600 font-mono mt-1 font-semibold">
              <span>0.5 kg (Document / Sample)</span>
              <span>10 kg</span>
              <span>25 kg</span>
              <span>50+ kg (Commercial Cargo)</span>
            </div>
          </div>

          {/* Service Tier Switch */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
              Select Speed & Service Tier
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setServiceTier("express")}
                className={`p-3.5 rounded-xl border text-left transition ${
                  serviceTier === "express"
                    ? "border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">M5C Express Air</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-600 text-white">
                    Fastest
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Priority direct flight routing with expedited customs clearance.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setServiceTier("standard")}
                className={`p-3.5 rounded-xl border text-left transition ${
                  serviceTier === "standard"
                    ? "border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">Standard Economy</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white">
                    Save 22%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Consolidated air freight ideal for non-critical e-commerce & parcels.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Result Box */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 text-white shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold">
                Estimated Freight Tariff
              </span>
              <span className="text-[11px] text-slate-400">Door-to-Door</span>
            </div>

            <div className="space-y-1 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                  ₹{estimatedCostINR.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-sky-300 font-mono">
                  (~${estimatedCostUSD} USD)
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Includes fuel surcharge & standard export handling
              </p>
            </div>

            <div className="space-y-3 text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Estimated Transit Time:
                </span>
                <span className="font-bold text-white">{transitTime}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-sky-400" />
                  Routing:
                </span>
                <span className="font-semibold text-white">
                  DEL / BOM → {selectedDestination.code} Gateway
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Customs Support:
                </span>
                <span className="font-semibold text-emerald-400">EDI Pre-Clearance Included</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10">
            <a
              href="#contact"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition"
            >
              <span>Book Consignment at This Rate</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              Corporate & volume discounts available for monthly contracts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
