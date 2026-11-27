import React from "react";
import { ShieldCheck, Cpu, Clock, Globe2, Truck, FileText, CheckCircle } from "lucide-react";

export default function WhyChooseUs() {
  const strengths = [
    {
      icon: <Globe2 className="w-6 h-6 text-sky-500" />,
      title: "Direct Connectivity Across 5 Continents",
      desc: "Robust networks spanning Asia, Europe, North America, Middle East, and Oceania with dedicated customs gateways in New Delhi, Mumbai, Dubai, and Frankfurt.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-sky-500" />,
      title: "Real-Time EDI & Automated Tracking",
      desc: "Instant status updates synchronized directly with commercial airline freight manifests and destination country border customs systems.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sky-500" />,
      title: "AEO Certified Customs Clearance",
      desc: "In-house licensed customs brokers ensuring expedited processing, zero unnecessary delays, accurate HS coding, and compliance with global tariff regulations.",
    },
    {
      icon: <Clock className="w-6 h-6 text-sky-500" />,
      title: "99.4% On-Time Delivery Performance",
      desc: "Proactive contingency routing and round-the-clock operations ensure your cargo lands on schedule even during peak holiday and trade seasons.",
    },
    {
      icon: <FileText className="w-6 h-6 text-sky-500" />,
      title: "Seamless E-Commerce API Integration",
      desc: "Plug-and-play connections for Shopify, Amazon, WooCommerce, and Magento with automated bulk label generation and international COD remittance.",
    },
    {
      icon: <Truck className="w-6 h-6 text-sky-500" />,
      title: "Tailored Reverse Logistics (RTO Management)",
      desc: "Cut cross-border return costs through overseas consolidation centers, inspection, re-packaging, and scheduled bulk re-importing.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Values */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              Why Partner With M5Clogs
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              A Technology-Driven Logistics Engine Built for Fast Global Trade
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              M 5 Continent Logistics Solution (P) Ltd. bridges the gap between domestic manufacturing
              and international consumers. We combine physical air and sea assets with advanced digital
              visibility to make worldwide shipping straightforward and dependable.
            </p>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 to-slate-900 text-white space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <span>Dedicated Enterprise Account Managers</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every business partner gets single-point-of-contact support, guaranteed space allocation,
                and custom billing credit periods.
              </p>
            </div>
          </div>

          {/* Right Column: 6 Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {strengths.map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:shadow-md transition duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-3">
                  {s.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
