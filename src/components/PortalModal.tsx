"use client";

import React, { useState } from "react";
import { X, Lock, User, Building, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortalModal({ isOpen, onClose }: PortalModalProps) {
  const [activeTab, setActiveTab] = useState<"client" | "courier">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setLoginSuccess(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setLoginSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-blue-950 via-sky-900 to-slate-900 p-6 text-white relative">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-sky-500/20 text-sky-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase tracking-widest text-sky-300 font-semibold">
              M5C Logistics Cloud Portal
            </span>
          </div>
          <h3 className="text-xl font-bold">Secure Partner Login</h3>
          <p className="text-xs text-sky-200/80 mt-1">
            Access real-time manifest, EDI integration, KYC verification, and billing.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => {
              setActiveTab("client");
              setLoginSuccess(false);
            }}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === "client"
                ? "border-sky-600 text-sky-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Building className="w-4 h-4" />
            Client / Shipper
          </button>
          <button
            onClick={() => {
              setActiveTab("courier");
              setLoginSuccess(false);
            }}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === "courier"
                ? "border-sky-600 text-sky-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <User className="w-4 h-4" />
            Partner / Courier
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loginSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Welcome to M5C Portal</h4>
              <p className="text-sm text-slate-600">
                Authentication successful. Redirecting to your dashboard environment...
              </p>
              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium text-sm transition"
                >
                  Continue to Workspace
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  {activeTab === "client" ? "Corporate Account ID / Email" : "Partner Code / Username"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      activeTab === "client" ? "client@company.com or M5C-CLI-8902" : "courier.partner@m5clogs.com"
                    }
                    className="w-full pl-3.5 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase">Password</label>
                  <a href="#forgot" className="text-xs text-sky-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-3.5 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 bg-slate-50/50"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                <input type="checkbox" id="remember" className="rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                <label htmlFor="remember">Keep me logged in for 30 days</label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-pulse">Verifying Credentials...</span>
                ) : (
                  <>
                    Sign In to Portal
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-slate-500">
                  New corporate shipper?{" "}
                  <a href="#contact" onClick={resetAndClose} className="text-sky-600 font-semibold hover:underline">
                    Apply for a Corporate Account
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
