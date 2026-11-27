import React from "react";
import TrackingWidget from "@/components/TrackingWidget";
import { Search, ShieldAlert, HelpCircle, Phone, Clock, FileCheck } from "lucide-react";

export const metadata = {
  title: "Track Consignment | M5CLOGS - Live Airway Bill Tracking",
  description:
    "Track your international express courier or freight consignment in real-time across 220+ countries with M 5 Continent Logistics Solution.",
};

export default function TrackingPage() {
  return (
    <div className="py-12 lg:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-sky-700 bg-sky-100 px-3.5 py-1 rounded-full">
            Real-Time Logistics Telemetry
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-2">
            Airway Bill (AWB) Consignment Tracking
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Input your 10 to 14 digit Airway Bill (AWB) or tracking number to see current GPS milestone,
            flight status, customs clearance checkpoints, and estimated delivery schedule.
          </p>
        </div>

        {/* Tracking Widget */}
        <div className="mb-14">
          <TrackingWidget isStandalone={false} />
        </div>

        {/* Instructions & FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-600" />
              Where do I find my Tracking Number?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Your tracking number (AWB) is printed directly on the top-right barcode section of your
              physical Airway Bill or electronic booking receipt issued by M5Clogs.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard formats begin with <code className="font-mono text-sky-700 bg-sky-50 px-1 py-0.5 rounded">M5C-</code>{" "}
              followed by 5 digits and a 2-letter country code (e.g.{" "}
              <span className="font-mono font-semibold">M5C-98421-US</span>).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              How often are tracking checkpoints updated?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Milestone events are transmitted automatically via EDI whenever a consignment is scanned at an
              airport cargo hub, cleared through port customs, loaded onto a freighter, or assigned for local dispatch.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Need assistance? Call our 24/7 Operations Command Center at{" "}
              <a href="tel:+911149878800" className="text-sky-600 font-bold hover:underline">
                +91 11 4987 8800
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
