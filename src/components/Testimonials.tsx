import React from "react";
import { TESTIMONIALS } from "@/data/logisticsData";
import { Star, Quote, Building2, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
            Customer Validation
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-4">
            Trusted by Exporters, E-Commerce Brands & Global Manufacturers
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            See how companies rely on M 5 Continent Logistics Solution to streamline their cross-border
            shipping and improve customer satisfaction.
          </p>
        </div>

        {/* Testimonials cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-sky-600 font-medium">{t.role}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{t.company}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded-lg">
                  {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Badges */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-6 flex flex-wrap items-center justify-around gap-6 text-slate-500 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <span>IATA Compliant Forwarder</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>AEO-T1 Customs Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-600" />
            <span>FIATA & WCA Alliance Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span>ISO 9001:2015 Quality Standard</span>
          </div>
        </div>
      </div>
    </section>
  );
}
