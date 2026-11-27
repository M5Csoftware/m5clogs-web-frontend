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

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden btn btn-ink btn-sm"
              aria-label="Toggle Menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--ink)] text-white p-6 overflow-y-auto flex flex-col justify-between animate-fade-in">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <KoreanLogo variant="light" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-ow btn-sm"
              >
                Close
              </button>
            </div>

            <nav className="space-y-4 font-serif text-2xl">
              <Link
                href="/products/skincare-beauty"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-baseline justify-between py-2 border-b border-white/10"
              >
                <span>Skincare & Beauty</span>
                <small className="font-kr text-xs text-[var(--celadon)]">뷰티</small>
              </Link>
              <Link
                href="/products/food-beverages"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-baseline justify-between py-2 border-b border-white/10"
              >
                <span>Food & Beverages</span>
                <small className="font-kr text-xs text-[var(--celadon)]">식품</small>
              </Link>
              <Link
                href="/brands"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 border-b border-white/10"
              >
                Our Brands
              </Link>
              <Link
                href="/import-distribution"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 border-b border-white/10"
              >
                Import & Distribution
              </Link>
              <Link
                href="/partnerships"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 border-b border-white/10"
              >
                Partnerships
              </Link>
              <Link
                href="/insights"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 border-b border-white/10"
              >
                Insights
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 border-b border-white/10"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 border-b border-white/10"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="pt-8 grid grid-cols-2 gap-3">
            <Link
              href="/partnerships?type=catalogue#form"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-p text-center justify-center text-xs"
            >
              Wholesale catalogue
            </Link>
            <Link
              href="/where-to-buy"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-ow text-center justify-center text-xs"
            >
              Where to buy
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
