import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  variant?: "dark" | "light" | "white";
  showTagline?: boolean;
}

export default function BrandLogo({
  className = "",
  variant = "dark",
  showTagline = true,
}: BrandLogoProps) {
  const isLight = variant === "light" || variant === "white";

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* Dynamic Emblem */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-sky-700 to-amber-500 shadow-md shadow-sky-900/20 group-hover:scale-105 transition-transform">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white drop-shadow"
        >
          {/* Globe & Flight Vectors */}
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <path
            d="M8 20C8 20 12 12 20 12C28 12 32 20 32 20"
            stroke="#fbbf24"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M8 20C8 20 12 28 20 28C28 28 32 20 32 20"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Central Cargo Emblem */}
          <rect x="15" y="15" width="10" height="10" rx="2" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M20 15V25M15 20H25" stroke="#ffffff" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 font-black tracking-tight text-xl leading-none">
          <span className={isLight ? "text-white" : "text-slate-900"}>M5C</span>
          <span className="text-sky-600">LOGS</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 font-semibold uppercase tracking-wider ml-1">
            Global
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[10px] tracking-wider uppercase font-medium mt-0.5 ${
              isLight ? "text-sky-200/80" : "text-slate-500"
            }`}
          >
            5 Continent Logistics
          </span>
        )}
      </div>
    </Link>
  );
}
