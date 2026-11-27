"use client";

import React, { useState, useEffect } from "react";
import { searchTracking, SAMPLE_SHIPMENTS } from "@/data/trackingMockData";
import { ShipmentData, TrackingStatus } from "@/types/logistics";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Truck,
  Plane,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  AlertCircle
} from "lucide-react";

interface TrackingWidgetProps {
  initialAwb?: string;
  isStandalone?: boolean;
}

export default function TrackingWidget({
  initialAwb = "",
  isStandalone = false,
}: TrackingWidgetProps) {
  const [awbInput, setAwbInput] = useState(initialAwb);
  const [searchedAwb, setSearchedAwb] = useState(initialAwb || "M5C-98421-US");
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load initial shipment
  useEffect(() => {
    const res = searchTracking(searchedAwb);
    if (res) {
      setShipment(res);
      setAwbInput(res.trackingNumber);
    }
  }, [searchedAwb]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awbInput.trim()) {
      setErrorMsg("Please enter an Airway Bill (AWB) or Consignment tracking code.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      const result = searchTracking(awbInput);
      if (result) {
        setShipment(result);
        setSearchedAwb(result.trackingNumber);
      } else {
        setErrorMsg("No consignment found matching this reference. Please check your Airway Bill number.");
        setShipment(null);
      }
      setLoading(false);
    }, 400);
  };

  const getStatusColor = (status: TrackingStatus) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-500 text-white";
      case "out_for_delivery":
        return "bg-amber-500 text-white";
      case "customs_cleared":
        return "bg-indigo-600 text-white";
      case "in_transit":
        return "bg-sky-600 text-white";
      default:
        return "bg-slate-700 text-white";
    }
  };

  const stages: { key: TrackingStatus; label: string; icon: React.ReactNode }[] = [
    { key: "order_created", label: "Manifested", icon: <Package className="w-4 h-4" /> },
    { key: "picked_up", label: "Picked Up", icon: <Truck className="w-4 h-4" /> },
    { key: "in_transit", label: "In Flight / Transit", icon: <Plane className="w-4 h-4" /> },
    { key: "customs_cleared", label: "Customs Cleared", icon: <ShieldCheck className="w-4 h-4" /> },
    { key: "out_for_delivery", label: "Out For Delivery", icon: <Truck className="w-4 h-4" /> },
    { key: "delivered", label: "Delivered", icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const getStageIndex = (status: TrackingStatus) => {
    return stages.findIndex((s) => s.key === status);
  };

  const currentStageIndex = shipment ? getStageIndex(shipment.status) : 0;

  return (
    <div
      className={`w-full ${
        isStandalone ? "" : "bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-8"
      }`}
    >
      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Track Airway Bill (AWB) / Consignment Reference
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={awbInput}
              onChange={(e) => {
                setAwbInput(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="e.g. M5C-98421-US, M5C-74190-EU or custom AWB"
              className="w-full pl-11 pr-4 py-3.5 text-base rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 text-slate-900 bg-slate-50/50 uppercase font-mono tracking-wide"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-4" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 bg-gradient-to-r from-sky-600 via-sky-700 to-blue-800 hover:from-sky-500 hover:to-blue-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition disabled:opacity-60 whitespace-nowrap"
          >
            {loading ? (
              <span className="animate-pulse">Locating...</span>
            ) : (
              <>
                <span>Track Now</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Quick Sample Picks */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-600">Sample Consignments:</span>
          {Object.keys(SAMPLE_SHIPMENTS).map((code) => (
            <button
              type="button"
              key={code}
              onClick={() => {
                setAwbInput(code);
                setLoading(true);
                setTimeout(() => {
                  setShipment(SAMPLE_SHIPMENTS[code]);
                  setSearchedAwb(code);
                  setErrorMsg("");
                  setLoading(false);
                }, 200);
              }}
              className={`font-mono px-2.5 py-1 rounded-lg border text-xs transition ${
                searchedAwb === code
                  ? "bg-sky-50 border-sky-300 text-sky-700 font-bold"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </form>

      {/* Error message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Result Card */}
      {shipment && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
            {/* Background vector glow */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/10 pb-5 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                    Airway Bill
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-white">
                    {shipment.serviceType}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-2">
                  {shipment.trackingNumber}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${getStatusColor(
                    shipment.status
                  )} shadow`}
                >
                  {shipment.statusLabel}
                </span>
              </div>
            </div>

            {/* Origin -> Destination Route Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-center sm:text-left">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                <span className="text-xs uppercase text-slate-400 font-medium block">Origin Shipper</span>
                <span className="text-base font-bold text-white block mt-0.5">{shipment.senderCity}</span>
                <span className="text-xs text-sky-300 font-medium">{shipment.senderCountry}</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-center gap-2 text-sky-400 my-1">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
                  <Plane className="w-5 h-5 text-amber-400 animate-pulse" />
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
                </div>
                <span className="text-[11px] text-slate-300 font-mono">
                  {shipment.carrier}
                </span>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 sm:text-right">
                <span className="text-xs uppercase text-slate-400 font-medium block">Destination Port</span>
                <span className="text-base font-bold text-white block mt-0.5">{shipment.recipientCity}</span>
                <span className="text-xs text-sky-300 font-medium">{shipment.recipientCountry}</span>
              </div>
            </div>

            {/* Meta attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block">Est. Delivery</span>
                <span className="text-white font-semibold mt-0.5 block flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {shipment.estimatedDelivery}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Weight / Pieces</span>
                <span className="text-white font-semibold mt-0.5 block">
                  {shipment.weightKg} kg ({shipment.pieces} Pcs)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Carrier Network</span>
                <span className="text-white font-semibold mt-0.5 block">{shipment.carrier}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Last Milestone</span>
                <span className="text-emerald-400 font-semibold mt-0.5 block flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {shipment.lastUpdated}
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="p-5 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-6">
              Shipment Progress Pipeline
            </h4>
            <div className="relative">
              <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
              <div
                className="hidden sm:block absolute top-1/2 left-0 h-1 bg-sky-600 -translate-y-1/2 z-0 transition-all duration-500"
                style={{
                  width: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
                }}
              />

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
                {stages.map((stage, idx) => {
                  const isPassed = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  return (
                    <div key={stage.key} className="flex flex-col items-center text-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-200 shadow-sm ${
                          isCurrent
                            ? "bg-amber-500 text-white ring-4 ring-amber-200"
                            : isPassed
                            ? "bg-sky-600 text-white"
                            : "bg-white border-2 border-slate-300 text-slate-400"
                        }`}
                      >
                        {stage.icon}
                      </div>
                      <span
                        className={`text-xs mt-2 font-semibold ${
                          isCurrent
                            ? "text-amber-700 font-bold"
                            : isPassed
                            ? "text-sky-900"
                            : "text-slate-400"
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Milestone History Event Logs */}
          <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-5 flex items-center justify-between">
              <span>Verified Scan History & EDI Activity</span>
              <span className="text-[11px] font-normal text-slate-500">
                Synchronized with Customs & Airlines
              </span>
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {shipment.events.map((evt, idx) => (
                <div key={evt.id} className="relative group">
                  <div
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-white transition ${
                      idx === 0
                        ? "border-sky-600 ring-2 ring-sky-200 bg-sky-600"
                        : "border-slate-400 group-hover:border-sky-500"
                    }`}
                  />
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        {evt.location}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{evt.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
