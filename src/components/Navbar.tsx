"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, Clock, Search, LogIn, Menu, X, Shield, Globe2 } from "lucide-react";
import BrandLogo from "./BrandLogo";
import PortalModal from "./PortalModal";
import { COMPANY_INFO } from "@/data/logisticsData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Track Shipment", href: "/tracking" },
    { label: "Rate Calculator", href: "/rate-calculator" },
    { label: "Global Network", href: "/#network" },
    { label: "Contact Us", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="w-full text-xs bg-slate-950 text-slate-300 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-sky-400 font-medium">
              <Globe2 className="w-3.5 h-3.5" />
              Direct Air & Ocean Routes Across 220+ Countries
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {COMPANY_INFO.operatingHours}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-sky-300 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-slate-200">{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-sky-300 transition"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <button
              onClick={() => setPortalOpen(true)}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 transition"
            >
              <Shield className="w-3 h-3" />
              <span>Customer EDI Portal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 py-3 border-b border-slate-100"
            : "bg-white py-4 border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-150 relative py-1 ${
                  isActive(link.href)
                    ? "text-sky-700 font-bold"
                    : "text-slate-700 hover:text-sky-600"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/tracking"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              <Search className="w-3.5 h-3.5 text-sky-600" />
              <span>Track AWB</span>
            </Link>

            <button
              onClick={() => setPortalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-sm shadow-sky-600/30 transition transform hover:-translate-y-0.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Client Portal</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setPortalOpen(true)}
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-sky-600 text-white"
            >
              Portal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-3 text-sm font-semibold rounded-lg ${
                  isActive(link.href)
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/tracking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-800"
              >
                Track Shipment by AWB
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPortalOpen(true);
                }}
                className="w-full text-center py-2.5 rounded-xl font-semibold text-sm bg-sky-600 text-white"
              >
                Sign In to Client Portal
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Portal modal */}
      <PortalModal isOpen={portalOpen} onClose={() => setPortalOpen(false)} />
    </>
  );
}
