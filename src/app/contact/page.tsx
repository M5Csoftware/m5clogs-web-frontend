import React from "react";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact M5CLOGS | Customer Support & Corporate Freight Quotes",
  description:
    "Contact M 5 Continent Logistics Solution (P) Ltd. in New Delhi. Get 24/7 shipment support, corporate pricing, or partner inquiries.",
};

export default function ContactPage() {
  return (
    <div className="py-12 lg:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactSection />
      </div>
    </div>
  );
}
