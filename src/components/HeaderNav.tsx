"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import KoreanLogo from "./KoreanLogo";
import { CATS } from "@/data/koreanLogisticsData";

export default function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key and scroll locking when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 bg-[rgba(247,242,234,0.92)] backdrop-blur-md ${
          isScrolled ? "border-b border-[var(--line)] shadow-sm" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-[var(--wrap)] w-full mx-auto px-4 sm:px-[3vw] h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <KoreanLogo />

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 ml-auto" aria-label="Main">
            {/* Products Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProductsOpen(!productsOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hanji-2)] transition ${
                  pathname.startsWith("/products") ? "text-[var(--persimmon)]" : ""
                }`}
                aria-expanded={productsOpen}
              >
                <span>Products</span>
                <span className="text-[10px] transform transition-transform">▼</span>
              </button>

              {productsOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-[780px] bg-[var(--paper)] rounded-3xl p-6 shadow-2xl border border-[var(--line)] grid grid-cols-3 gap-6 animate-fade-in z-50">
                  {/* Beauty Column */}
                  <div>
                    <Link
                      href="/products/skincare-beauty"
                      onClick={() => setProductsOpen(false)}
                      className="font-serif text-xl font-normal block mb-3 text-[var(--ink)] hover:text-[var(--jade)]"
                    >
                      Skincare & Beauty <span className="text-xs text-[var(--persimmon)] font-kr">뷰티</span>
                    </Link>
                    <div className="space-y-1.5 text-xs font-semibold text-[var(--muted)]">
                      {CATS["skincare-beauty"].subs.map((s) => (
                        <Link
                          key={s.id}
                          href={`/products/skincare-beauty#${s.id}`}
                          onClick={() => setProductsOpen(false)}
                          className="block py-1 hover:text-[var(--ink)] hover:translate-x-1 transition"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Food Column */}
                  <div>
                    <Link
                      href="/products/food-beverages"
                      onClick={() => setProductsOpen(false)}
                      className="font-serif text-xl font-normal block mb-3 text-[var(--ink)] hover:text-[var(--jade)]"
                    >
                      Food & Beverages <span className="text-xs text-[var(--persimmon)] font-kr">식품</span>
                    </Link>
                    <div className="space-y-1.5 text-xs font-semibold text-[var(--muted)]">
                      {CATS["food-beverages"].subs.map((s) => (
                        <Link
                          key={s.id}
                          href={`/products/food-beverages#${s.id}`}
                          onClick={() => setProductsOpen(false)}
                          className="block py-1 hover:text-[var(--ink)] hover:translate-x-1 transition"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Featured B2B wholesale card */}
                  <div className="bg-[var(--ink)] text-white p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-kr text-[var(--celadon)] font-medium">도매</span>
                      <h4 className="font-serif text-xl mt-1 mb-2">Wholesale for Indian businesses</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Catalogues, trade pricing tiers, and compliance guidance for retailers.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <Link
                        href="/products/skincare-beauty"
                        onClick={() => setProductsOpen(false)}
                        className="text-xs font-bold text-[var(--celadon)] flex items-center gap-1 hover:underline"
                      >
                        Skincare wholesale →
                      </Link>
                      <Link
                        href="/products/food-beverages"
                        onClick={() => setProductsOpen(false)}
                        className="text-xs font-bold text-[var(--celadon)] flex items-center gap-1 hover:underline"
                      >
                        Food wholesale →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/brands"
              className={`px-3 py-2 text-sm font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hanji-2)] transition ${
                pathname === "/brands" ? "text-[var(--persimmon)] font-bold" : ""
              }`}
            >
              Our Brands
            </Link>

            <Link
              href="/import-distribution"
              className={`px-3 py-2 text-sm font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hanji-2)] transition ${
                pathname === "/import-distribution" ? "text-[var(--persimmon)] font-bold" : ""
              }`}
            >
              Import & Distribution
            </Link>

            <Link
              href="/partnerships"
              className={`px-3 py-2 text-sm font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hanji-2)] transition ${
                pathname === "/partnerships" ? "text-[var(--persimmon)] font-bold" : ""
              }`}
            >
              Partnerships
            </Link>

            <Link
              href="/insights"
              className={`px-3 py-2 text-sm font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hanji-2)] transition ${
                pathname.startsWith("/insights") ? "text-[var(--persimmon)] font-bold" : ""
              }`}
            >
              Insights
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hanji-2)] transition ${
                pathname === "/about" ? "text-[var(--persimmon)] font-bold" : ""
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hanji-2)] transition ${
                pathname === "/contact" ? "text-[var(--persimmon)] font-bold" : ""
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/partnerships?type=catalogue#form"
              className="btn btn-p btn-sm hidden sm:inline-flex"
            >
              Wholesale catalogue
            </Link>

            {/* Menu icon button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:text-[var(--persimmon)] hover:border-[var(--persimmon)] hover:bg-[var(--hanji-2)] transition shadow-2xs cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              title="All pages directory"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Menu Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] max-w-[92vw] z-50 bg-[var(--paper)] text-[var(--ink)] border-l border-[var(--line)] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 font-sans"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--line)] bg-[var(--hanji)]/60">
              <KoreanLogo />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition cursor-pointer shadow-2xs"
                aria-label="Close menu"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Body - Scrollable Links Directory */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
              {/* Group 1: Products & Brands */}
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[var(--muted)] uppercase block mb-2.5">
                  Products & Portfolio
                </span>
                <div className="space-y-1">
                  <Link
                    href="/products/skincare-beauty"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Skincare & Beauty
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Serums, toners, sunscreens & dermatological care
                      </div>
                    </div>
                    <span className="font-kr text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--peach)]/30 text-[var(--persimmon)]">
                      뷰티
                    </span>
                  </Link>

                  <Link
                    href="/products/food-beverages"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Food & Beverages
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Ramen, confectionary, snacks & Korean sauces
                      </div>
                    </div>
                    <span className="font-kr text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--celadon-l)] text-[var(--jade-d)]">
                      식품
                    </span>
                  </Link>

                  <Link
                    href="/brands"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Our Brands Directory
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Authentic Korean brand partners distributed in India
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[var(--jade)] bg-[var(--celadon-l)]/40 px-2 py-0.5 rounded-md">
                      Brands
                    </span>
                  </Link>
                </div>
              </div>

              {/* Group 2: Services & Compliance */}
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[var(--muted)] uppercase block mb-2.5">
                  Import, Logistics & Tools
                </span>
                <div className="space-y-1">
                  <Link
                    href="/import-distribution"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Import & Distribution
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Sea & air freight, cold-chain warehousing & distribution
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/compliance"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        CDSCO & FSSAI Compliance
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Cosmetics registration, food testing & port customs clearance
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[var(--jade)] bg-[var(--celadon-l)]/40 px-2 py-0.5 rounded-md">
                      Port Gate
                    </span>
                  </Link>

                  <Link
                    href="/rate-calculator"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Duty & Rate Calculator
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Instant landed cost & custom tariff computation
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[var(--gold)] bg-[var(--hanji-2)] px-2 py-0.5 rounded-md">
                      Tool
                    </span>
                  </Link>

                  <Link
                    href="/tracking"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Consignment Tracking
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Live shipment status & customs inspection locator
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                      Live
                    </span>
                  </Link>

                  <Link
                    href="/where-to-buy"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Where to Buy
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Quick-commerce, retail supermarkets & verified stockists
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Group 3: Company & Collaboration */}
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[var(--muted)] uppercase block mb-2.5">
                  Company & Partnerships
                </span>
                <div className="space-y-1">
                  <Link
                    href="/partnerships"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Wholesale & Partnerships
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        B2B distribution, quick-commerce & retail supply
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/insights"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Market Insights
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Trade advisories, tariff analysis & industry news
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        About M5C Logistics
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        The India-Korea bilateral trade gateway
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
                        Contact Us
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Offices in Seoul, Mumbai & New Delhi
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/privacy"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--hanji)] transition group"
                  >
                    <div>
                      <div className="text-[14px] font-semibold text-[var(--muted)] group-hover:text-[var(--ink)] transition">
                        Privacy Policy
                      </div>
                      <div className="text-xs text-[var(--muted)]/80">
                        Data protection & terms of compliance
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-6 border-t border-[var(--line)] bg-[var(--hanji)]/40 space-y-3">
              <Link
                href="/partnerships?type=catalogue#form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white font-bold text-sm text-center shadow-xs transition flex items-center justify-center gap-2"
              >
                <span>Request Wholesale Catalogue</span>
                <span>→</span>
              </Link>

              <div className="flex items-center justify-between pt-1">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)] transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Admin Portal</span>
                </Link>

                <span className="text-[11px] text-[var(--muted)]/60 font-mono">
                  M5C Logistics v2.4
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
