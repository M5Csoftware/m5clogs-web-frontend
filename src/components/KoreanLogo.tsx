import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: number;
  variant?: "dark" | "light";
  className?: string;
}

export function KoreanMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <circle cx="24" cy="32" r="18" fill="#2F6B5C" />
      <circle cx="40" cy="32" r="18" fill="#E2552D" fillOpacity="0.9" />
      <path d="M32 17.6a18 18 0 010 28.8a18 18 0 010-28.8z" fill="#14161C" />
    </svg>
  );
}

export default function KoreanLogo({
  size = 40,
  variant = "dark",
  className = "",
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      aria-label="M5 Clogs.in home"
      className={`inline-flex items-center gap-2.5 text-decoration-none group ${className}`}
    >
      <KoreanMark size={size} />
      <span className="flex flex-col">
        <b
          className={`text-2xl leading-none tracking-tight font-serif ${
            isLight ? "text-white" : "text-[#14161C]"
          }`}
          style={{ fontFamily: 'var(--font-serif), "Instrument Serif", Georgia, serif' }}
        >
          M5 Clogs
          <i className="italic text-[#E2552D] font-serif not-italic">.in</i>
        </b>
        <small
          className={`block text-[10px] tracking-[0.2em] uppercase font-bold mt-1 font-sans ${
            isLight ? "text-[#8E929B]" : "text-[#5E5A55]"
          }`}
        >
          Korea → India
        </small>
      </span>
    </Link>
  );
}
