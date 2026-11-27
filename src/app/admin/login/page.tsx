"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setAdminSession, validateAdminCredentials } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (validateAdminCredentials(username, password)) {
        setAdminSession();
        router.replace("/admin/dashboard");
      } else {
        setError("Invalid username or password. Please use admin / admin.");
        setIsLoading(false);
      }
    }, 250);
  };

  const handleFillDemo = () => {
    setUsername("admin");
    setPassword("admin");
    setError("");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 w-full">
      {/* Wide Landscape Card Container (1000px max width) */}
      <div className="w-full max-w-5xl">
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-3xl shadow-xl overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Subtle top Korean Dancheong accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--persimmon)] via-[var(--gold)] to-[var(--jade)] z-10" />

          {/* Left Brand & Mission Stage (5 cols on desktop) */}
          <div className="lg:col-span-5 bg-[var(--hanji-2)] p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[var(--line)] flex flex-col justify-between relative overflow-hidden">
            {/* Subtle background seal watermarks */}
            <div className="absolute -bottom-10 -left-10 text-[180px] font-serif text-[var(--line)]/30 select-none pointer-events-none leading-none">
              美
            </div>

            <div className="relative z-1">
              {/* Logo & Headline */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-xs flex items-center justify-center p-2 shrink-0">
                  <Image
                    src="/m5c-logo-noBg.svg"
                    alt="M5 Clogs Logo"
                    width={34}
                    height={38}
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] whitespace-nowrap leading-none">
                    M5 Clogs<span className="text-[var(--persimmon)] font-serif italic">.in</span>
                  </h1>
                  <span className="text-[11px] font-bold tracking-wider text-[var(--muted)] uppercase font-mono mt-1">
                    Operations Portal
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--paper)] border border-[var(--line)] mb-6 text-xs text-[var(--ink)]">
                <span className="w-2 h-2 rounded-full bg-[var(--ok)] animate-pulse" />
                <span className="font-medium font-serif">한국 ➔ 인도 관리자 포털</span>
              </div>

              <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 font-sans">
                Centralized administration for Korean skincare and food imports into India, CDSCO cosmetics clearances, FSSAI compliance, and B2B wholesale distribution.
              </p>

              {/* Operational Pillars */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-[var(--ink)]">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="font-semibold">CDSCO Form 43 Regulatory Tracking</strong>
                    <p className="text-[11px] text-[var(--muted)]">Cosmetics import license verification &amp; ingredient review.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-[var(--ink)]">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="font-semibold">Cold-Chain Sea &amp; Air Logistics</strong>
                    <p className="text-[11px] text-[var(--muted)]">Incheon Hub ➔ Nhava Sheva (JNPT) &amp; IGI Delhi Air Cargo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-[var(--ink)]">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="font-semibold">FSSAI FoSCoS Food Clearance</strong>
                    <p className="text-[11px] text-[var(--muted)]">Vegetarian green-dot labelling &amp; food safety compliance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quote / Stamp */}
            <div className="relative z-1 pt-8 mt-6 border-t border-[var(--line)] text-xs text-[var(--muted)] flex items-center justify-between">
              <span className="font-serif italic">&ldquo;Korea&apos;s finest, India&apos;s shelves.&rdquo;</span>
              <span className="font-mono text-[10px] text-[var(--ink)] font-bold">M5 Clogs v2.4</span>
            </div>
          </div>

          {/* Right Login Form (7 cols on desktop - Wide and Spacious) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[var(--paper)]">
            <div className="max-w-xl w-full mx-auto">
              <div className="mb-8">
                <span className="text-xs font-bold tracking-widest text-[var(--persimmon)] uppercase font-mono">
                  SECURE ACCESS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] mt-1">
                  Sign in to Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 font-sans">
                  Enter your administrator credentials to manage import consignments and B2B leads.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-xs font-bold tracking-wider text-[var(--ink)] uppercase mb-2 font-mono"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="admin"
                      className="w-full px-4 py-3.5 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:ring-2 focus:ring-[var(--persimmon)]/20 focus:outline-none transition shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="block text-xs font-bold tracking-wider text-[var(--ink)] uppercase font-mono"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-[var(--muted)] hover:text-[var(--persimmon)] font-medium transition cursor-pointer"
                    >
                      {showPassword ? "Hide password" : "Show password"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:ring-2 focus:ring-[var(--persimmon)]/20 focus:outline-none transition shadow-2xs"
                    />
                  </div>
                </div>

                {/* Quick Demo Helper Box */}
                <div className="p-3.5 rounded-xl bg-[var(--hanji-2)]/70 border border-[var(--line)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--persimmon)]" />
                    <span className="text-[var(--muted)]">
                      Default credentials: <strong className="text-[var(--ink)] font-mono">admin / admin</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="text-[var(--persimmon)] font-bold hover:underline cursor-pointer pl-2"
                  >
                    Auto-fill
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-sm sm:text-base font-bold tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Return Link */}
              <div className="mt-8 pt-6 border-t border-[var(--line)] flex items-center justify-between">
                <Link
                  href="/"
                  className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)] transition inline-flex items-center gap-2"
                >
                  <span>←</span> Return to Public Website
                </Link>

                <span className="text-[11px] text-[var(--muted)] font-serif hidden sm:inline">
                  CDSCO &amp; FSSAI Authorized Importer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Outer bottom copyright footer */}
        <div className="text-center mt-6 text-xs text-[var(--muted)] font-serif">
          M5 Clogs Logistics India Pvt. Ltd. • Registered Import &amp; Wholesale Distribution Portal
        </div>
      </div>
    </div>
  );
}
