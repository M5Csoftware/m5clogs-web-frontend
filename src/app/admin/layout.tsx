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
        <div className="admin-panel min-h-screen bg-[var(--hanji)] text-[var(--ink)] flex flex-col justify-center font-sans antialiased">
          {children}
        </div>
      </AdminGuard>
    );
  }

  const isDashboard = pathname === "/admin/dashboard" || pathname === "/admin";

  return (
    <AdminGuard>
      <div className="admin-panel min-h-screen flex bg-[var(--hanji)] text-[var(--ink)] font-sans antialiased">
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar with Generous Whitespacing */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen z-50 w-72 bg-[var(--hanji-2)] border-r border-[var(--line)] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Top Section */}
          <div>
            {/* Brand Header */}
            <div className="p-7 border-b border-[var(--line)]">
              <div className="flex items-center justify-between">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-3.5 group text-decoration-none"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--paper)] border border-[var(--line)] shadow-xs flex items-center justify-center p-2 shrink-0 transition-transform group-hover:scale-105">
                    <Image
                      src="/m5c-logo-noBg.svg"
                      alt="M5 Clogs"
                      width={28}
                      height={32}
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-baseline">
                      <span className="text-xl font-extrabold tracking-tight text-[var(--ink)] leading-none">
                        M5 Clogs
                      </span>
                      <span className="text-xl font-extrabold text-[var(--persimmon)] leading-none">
                        .in
                      </span>
                    </div>
                    <span className="text-xs font-bold tracking-wider text-[var(--muted)] uppercase mt-1">
                      Admin Portal
                    </span>
                  </div>
                </Link>

                {/* Close button for mobile drawer */}
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-lg text-[var(--muted)] hover:bg-[var(--hanji)] transition"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Items with Good Whitespace */}
            <div className="px-5 py-8 space-y-3">
              <div className="text-xs font-bold tracking-wider text-[var(--muted)] uppercase px-3 mb-3">
                Menu
              </div>

              {/* Single Dashboard link */}
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
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
                <span>Dashboard</span>
              </Link>

              {/* Public Website Link */}
              <div className="pt-6">
                <Link
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--paper)] transition"
                >
                  <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>View Public Website ↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* User profile & Logout Footer */}
          <div className="p-5 border-t border-[var(--line)] bg-[var(--paper)]/50">
            <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[var(--jade)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  AD
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-base font-bold text-[var(--ink)] truncate">admin</span>
                  <span className="text-xs text-[var(--muted)] font-medium">Administrator</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--persimmon)] hover:bg-[var(--peach)]/30 transition shrink-0"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 h-18 bg-[var(--hanji)]/90 backdrop-blur-md border-b border-[var(--line)] px-6 sm:px-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
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

              {/* Breadcrumb with good readability */}
              <div className="flex items-center gap-2 text-base font-semibold text-[var(--muted)]">
                <span>Admin</span>
                <span className="text-[var(--line-strong)]">/</span>
                <span className="text-[var(--ink)] font-bold">Dashboard</span>
              </div>
            </div>

            {/* Quick Status & Sign Out */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--paper)] border border-[var(--line)] text-sm text-[var(--ink)] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>CDSCO &amp; FSSAI Active</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-bold px-4 py-2 rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--persimmon)] hover:border-[var(--persimmon)] transition cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </header>

          {/* Page Content with Generous Whitespacing */}
          <main className="flex-1 p-6 sm:p-10 lg:p-12 max-w-[var(--wrap)] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
