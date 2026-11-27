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

    // Simulate authenticating
    setTimeout(() => {
      if (validateAdminCredentials(username, password)) {
        setAdminSession();
        router.replace("/admin/dashboard");
      } else {
        setError("Invalid username or password. Please use admin / admin.");
        setIsLoading(false);
      }
    }, 300);
  };

  const handleFillDemo = () => {
    setUsername("admin");
    setPassword("admin");
    setError("");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          {/* Subtle top Korean Dancheong accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--persimmon)] via-[var(--gold)] to-[var(--jade)]" />

          {/* Header & Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] mb-4 shadow-xs">
              <Image
                src="/m5c-logo-noBg.svg"
                alt="M5 Clogs Logo"
                width={40}
                height={44}
                priority
              />
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[var(--ink)]">
              M5 Clogs<span className="text-[var(--persimmon)] font-serif italic">.in</span>
            </h1>
            <p className="text-xs font-serif text-[var(--muted)] mt-1.5">
              관리자 포털 • Korea to India Operations Portal
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-bold tracking-wider text-[var(--ink)] uppercase mb-1.5 font-mono"
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
                  className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold tracking-wider text-[var(--ink)] uppercase font-mono"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[var(--muted)] hover:text-[var(--persimmon)] transition"
                >
                  {showPassword ? "Hide" : "Show"}
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
                  className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:outline-none transition"
                />
              </div>
            </div>

            {/* Quick Demo Helper Box */}
            <div className="p-3 rounded-xl bg-[var(--hanji-2)]/60 border border-[var(--line)] flex items-center justify-between text-xs">
              <span className="text-[var(--muted)]">
                Demo credentials: <strong className="text-[var(--ink)] font-mono">admin / admin</strong>
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[var(--persimmon)] font-semibold hover:underline cursor-pointer"
              >
                Auto-fill
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-[var(--line)] text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)] transition inline-flex items-center gap-1.5"
            >
              <span>←</span> Return to Public Website
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="text-center mt-6 text-xs text-[var(--muted)] font-serif">
          M5 Clogs Logistics India Pvt. Ltd. • CDSCO &amp; FSSAI Authorized Importer
        </div>
      </div>
    </div>
  );
}
