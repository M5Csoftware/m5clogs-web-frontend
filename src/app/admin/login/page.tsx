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
    }, 200);
  };

  const handleFillDemo = () => {
    setUsername("admin");
    setPassword("admin");
    setError("");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 w-full font-sans">
      <div className="w-full max-w-2xl">
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-3xl shadow-xl p-8 sm:p-12 lg:p-14 relative">
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--persimmon)] via-[var(--gold)] to-[var(--jade)] rounded-t-3xl" />

          {/* Header */}
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[var(--line)]">
            <div className="w-14 h-14 rounded-2xl bg-[var(--hanji)] border border-[var(--line)] shadow-xs flex items-center justify-center p-2.5 shrink-0">
              <Image
                src="/m5c-logo-noBg.svg"
                alt="M5 Clogs Logo"
                width={36}
                height={40}
                priority
              />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                  M5 Clogs
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--persimmon)]">
                  .in
                </span>
                <span className="ml-2 text-xs font-bold tracking-wider text-[var(--muted)] uppercase px-2 py-0.5 rounded bg-[var(--hanji)] border border-[var(--line)]">
                  Admin
                </span>
              </div>
              <p className="text-sm text-[var(--muted)] mt-1 font-medium">
                Sign in to manage import consignments and inquiries
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Login Form with Generous Spacing */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-bold tracking-wider text-[var(--ink)] uppercase mb-2.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="admin"
                className="w-full px-5 py-3.5 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-base text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:ring-2 focus:ring-[var(--persimmon)]/20 focus:outline-none transition shadow-2xs font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold tracking-wider text-[var(--ink)] uppercase"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--persimmon)] transition cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-base text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:ring-2 focus:ring-[var(--persimmon)]/20 focus:outline-none transition shadow-2xs font-medium"
              />
            </div>

            {/* Quick Demo Helper */}
            <div className="p-4 rounded-xl bg-[var(--hanji-2)]/60 border border-[var(--line)] flex items-center justify-between text-sm">
              <span className="text-[var(--muted)]">
                Default: <strong className="text-[var(--ink)] font-mono">admin / admin</strong>
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[var(--persimmon)] font-bold hover:underline cursor-pointer"
              >
                Auto-fill
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-base font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-[var(--line)] text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--ink)] transition inline-flex items-center gap-2"
            >
              <span>←</span> Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
