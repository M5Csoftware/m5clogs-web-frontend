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
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  PlaneTakeoff: <PlaneTakeoff className="w-6 h-6 text-sky-600" />,
  Boxes: <Boxes className="w-6 h-6 text-sky-600" />,
  Ship: <Ship className="w-6 h-6 text-sky-600" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-sky-600" />,
  Warehouse: <Warehouse className="w-6 h-6 text-sky-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-sky-600" />,
};

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
            Comprehensive Logistics Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-4">
            End-to-End Solutions for Global Freight & Cross-Border Delivery
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From single parcels to full charter flights and ocean shipping containers, M 5 Continent
            Logistics Solution provides dependable delivery across all 5 continents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center border border-sky-100 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all">
                    {iconMap[service.iconName]}
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-sky-700 transition">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-sky-600 mb-3">{service.tagline}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href={`/services#${service.id}`}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-sky-700 bg-sky-50 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center gap-2 transition"
                >
                  <span>Explore Service Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
