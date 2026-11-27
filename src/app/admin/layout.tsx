"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import { clearAdminSession } from "@/lib/adminAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  const handleLogout = () => {
    clearAdminSession();
    router.replace("/admin/login");
  };

  // On login page, render clean full-page container without the sidebar
  if (isLoginPage) {
    return (
      <AdminGuard>
        <div className="min-h-screen bg-[var(--hanji)] text-[var(--ink)] flex flex-col justify-center">
          {children}
        </div>
      </AdminGuard>
    );
  }

  const isDashboard = pathname === "/admin/dashboard" || pathname === "/admin";

  return (
    <AdminGuard>
      <div className="min-h-screen flex bg-[var(--hanji)] text-[var(--ink)] antialiased">
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen z-50 w-72 bg-[var(--hanji-2)] border-r border-[var(--line)] flex flex-col transition-transform duration-300 ease-in-out ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Sidebar Header / Brand */}
          <div className="p-6 border-b border-[var(--line)]">
            <div className="flex items-center justify-between">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 group text-decoration-none"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--paper)] border border-[var(--line)] shadow-xs flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
                  <Image
                    src="/m5c-logo-noBg.svg"
                    alt="M5 Clogs"
                    width={28}
                    height={32}
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold tracking-tight text-[var(--ink)] leading-none">
                    M5 Clogs<span className="text-[var(--persimmon)] italic font-serif">.in</span>
                  </span>
                  <span className="text-[10px] tracking-widest text-[var(--muted)] uppercase font-semibold mt-1">
                    Admin Portal
                  </span>
                </div>
              </Link>

              {/* Close button for mobile drawer */}
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-[var(--muted)] hover:bg-[var(--hanji)] transition"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Operational badge */}
            <div className="mt-4 flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[var(--paper)]/80 border border-[var(--line)]">
              <span className="w-2 h-2 rounded-full bg-[var(--ok)] animate-pulse" />
              <span className="text-xs font-semibold text-[var(--ink)]">
                Import &amp; Distribution Operations
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="text-[11px] font-bold tracking-wider text-[var(--muted)] uppercase px-3 mb-2 font-mono">
              Main Menu
            </div>
            <nav className="space-y-1.5" aria-label="Admin Navigation">
              {/* Dashboard Link - User explicitly specified only this in sidebar */}
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isDashboard
                    ? "bg-[var(--paper)] text-[var(--persimmon)] shadow-xs border-l-4 border-[var(--persimmon)]"
                    : "text-[var(--ink)] hover:bg-[var(--paper)]/70 hover:text-[var(--persimmon)]"
                }`}
              >
                <svg
                  className={`w-5 h-5 shrink-0 ${isDashboard ? "text-[var(--persimmon)]" : "text-[var(--muted)]"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <div className="flex flex-col">
                  <span className="leading-tight">Dashboard</span>
                  <span className="text-[10px] text-[var(--muted)] font-mono">Overview &amp; Metrics</span>
                </div>
                {isDashboard && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--persimmon)]" />
                )}
              </Link>
            </nav>

            {/* Quick Links Section */}
            <div className="mt-8 pt-6 border-t border-[var(--line)]">
              <div className="text-[11px] font-bold tracking-wider text-[var(--muted)] uppercase px-3 mb-2 font-mono">
                Storefront
              </div>
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--paper)] transition group"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Public Website
                </span>
                <span className="text-[10px] text-[var(--muted)] font-mono">Live Site ↗</span>
              </Link>
            </div>
          </div>

          {/* User profile & Logout Footer */}
          <div className="p-4 border-t border-[var(--line)] bg-[var(--paper)]/50">
            <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[var(--jade)] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  AD
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-xs font-bold text-[var(--ink)] truncate">admin</span>
                  <span className="text-[10px] text-[var(--ok)] font-medium">Super Administrator</span>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--persimmon)] hover:bg-[var(--peach)]/30 transition shrink-0"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* Right Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 h-16 bg-[var(--hanji)]/90 backdrop-blur-md border-b border-[var(--line)] px-4 sm:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--hanji-2)] transition"
                aria-label="Open sidebar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]">
                <span className="hidden sm:inline">Admin</span>
                <span className="hidden sm:inline text-[var(--line-strong)]">/</span>
                <span className="text-[var(--ink)]">Dashboard</span>
              </div>
            </div>

            {/* System Status & Time */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--paper)] border border-[var(--line)] text-xs text-[var(--ink)]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">CDSCO &amp; FSSAI Pipeline Active</span>
              </div>

              <div className="text-xs text-[var(--muted)] hidden sm:block font-mono">
                IST (India)
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--persimmon)] hover:border-[var(--persimmon)] transition"
              >
                Sign out
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[var(--wrap)] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
