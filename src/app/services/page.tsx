import React from "react";
import Link from "next/link";
import { SERVICES_LIST } from "@/data/logisticsData";
import {
  PlaneTakeoff,
  Boxes,
  Ship,
  ShoppingBag,
  Warehouse,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Headphones,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  PlaneTakeoff: <PlaneTakeoff className="w-8 h-8 text-sky-600" />,
  Boxes: <Boxes className="w-8 h-8 text-sky-600" />,
  Ship: <Ship className="w-8 h-8 text-sky-600" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8 text-sky-600" />,
  Warehouse: <Warehouse className="w-8 h-8 text-sky-600" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-sky-600" />,
};

export const metadata = {
  title: "Logistics Services | M5CLOGS - Global Freight & Express Solutions",
  description:
    "Explore M5Clogs comprehensive range of international freight forwarding, express courier, overseas 3PL warehousing, and customs brokerage services.",
};

export default function ServicesPage() {
  return (
    <div className="py-12 lg:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-sky-700 bg-sky-100 px-3.5 py-1 rounded-full">
            Full Service Logistics Suite
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 mb-4">
            Global Transportation & Supply Chain Capabilities
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            M 5 Continent Logistics Solution delivers customized multimodal transportation and cross-border
            distribution systems tailored to exporters, manufacturers, and modern e-commerce enterprises.
          </p>
        </div>

        {/* Detailed Service Cards */}
        <div className="space-y-12">
          {SERVICES_LIST.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                        {iconMap[service.iconName]}
                      </div>
                      <div>
                        {service.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                            {service.badge}
                          </span>
                        )}
                        <h2 className="text-2xl font-black text-slate-900">{service.title}</h2>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-sky-700">{service.tagline}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-7 space-y-4">
                    <h4 className="text-base font-bold text-white">Ideal Use Cases</h4>
                    <ul className="text-xs space-y-2 text-slate-300">
                      <li>• High-value and time-critical exports needing SLA commitments</li>
                      <li>• Door-to-door deliveries with custom clearance handling</li>
                      <li>• Enterprise shipments requiring dedicated space agreements</li>
                      <li>• E-commerce businesses expanding into US, Europe, and GCC</li>
                    </ul>
                    <div className="pt-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 w-full justify-center py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-md shadow-amber-500/20"
                      >
                        <span>Request Custom Quotation</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
