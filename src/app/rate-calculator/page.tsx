import React from "react";
import RateCalculator from "@/components/RateCalculator";
import { Calculator, ShieldCheck, HelpCircle, Truck, Globe } from "lucide-react";

export const metadata = {
  title: "Shipping Rate Calculator | M5CLOGS - Instant International Freight Estimates",
  description:
    "Calculate competitive international shipping rates from India to over 220 countries with M 5 Continent Logistics Solution.",
};

export default function RateCalculatorPage() {
  return (
    <div className="py-12 lg:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-sky-700 bg-sky-100 px-3.5 py-1 rounded-full">
            Transparent Freight Tariffs
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-2">
            International Shipping Rate Calculator
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Get estimated door-to-door express and standard economy air freight tariffs from major Indian
            cargo gateways to destinations worldwide.
          </p>
        </div>

        {/* Rate Calculator Component */}
        <div className="mb-14">
          <RateCalculator />
        </div>

        {/* Information Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-sky-600" />
              Volumetric Weight Rule
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Air freight is billed on whichever is higher: actual gross weight or volumetric weight
              (calculated as Length × Width × Height in cm / 5000).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Customs Duties & Tariffs
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Standard estimates cover freight, fuel, and security surcharges. Destination import duties and
              taxes are determined by local customs authorities based on HS codes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-500" />
              Commercial & Heavy Cargo
            </h4>
            <p className="text-slate-600 leading-relaxed">
              For consignments exceeding 100 kg or full container ocean loads (FCL/LCL), please contact our
              commercial desk for chartered bulk contract rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
