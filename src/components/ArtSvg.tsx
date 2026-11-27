import React from "react";

interface ArtSvgProps {
  artKey: string;
  className?: string;
}

export function ArtSvg({ artKey, className = "" }: ArtSvgProps) {
  const KR = (x: number, y: number, t: string, c = "#14161C", s = 13) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="var(--font-kr), Noto Serif KR, Nanum Myeongjo, serif"
      fontWeight="700"
      fontSize={s}
      fill={c}
    >
      {t}
    </text>
  );

  const getArtwork = (k: string) => {
    switch (k) {
      case "cleanser":
        return (
          <>
            <rect x="72" y="30" width="56" height="128" rx="18" fill="#FFF7F3" stroke="#14161C" strokeWidth="3" />
            <rect x="80" y="158" width="40" height="22" rx="5" fill="#E2552D" stroke="#14161C" strokeWidth="3" />
            <rect x="72" y="30" width="56" height="16" rx="8" fill="#F7D2C2" />
            {KR(100, 100, "클렌저")}
            <path d="M86 118h28" stroke="#14161C" strokeWidth="2" />
            <circle cx="134" cy="54" r="7" fill="#fff" stroke="#14161C" strokeWidth="2" />
            <circle cx="146" cy="70" r="4" fill="#fff" stroke="#14161C" strokeWidth="2" />
          </>
        );
      case "toner":
        return (
          <>
            <rect x="88" y="16" width="24" height="26" rx="4" fill="#14161C" />
            <path d="M70 50q0-8 8-8h44q8 0 8 8v120q0 12-12 12H82q-12 0-12-12z" fill="#DCEBE3" stroke="#14161C" strokeWidth="3" />
            <path d="M70 120h60v50q0 12-12 12H82q-12 0-12-12z" fill="#A9CBBB" opacity="0.8" />
            {KR(100, 92, "토너")}
            <path d="M88 104h24" stroke="#14161C" strokeWidth="2" />
          </>
        );
      case "serum":
        return (
          <>
            <rect x="92" y="10" width="16" height="26" rx="8" fill="#14161C" />
            <rect x="84" y="34" width="32" height="18" rx="4" fill="#C9A45C" stroke="#14161C" strokeWidth="3" />
            <rect x="70" y="52" width="60" height="124" rx="14" fill="#E8B866" stroke="#14161C" strokeWidth="3" />
            <rect x="80" y="84" width="40" height="56" rx="6" fill="#FFF7EA" />
            {KR(100, 110, "세럼", undefined, 12)}
            <path d="M88 124h24" stroke="#14161C" strokeWidth="2" />
            <path d="M84 62v100" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
          </>
        );
      case "cream":
        return (
          <>
            <rect x="50" y="62" width="100" height="22" rx="8" fill="#14161C" />
            <path d="M54 84h92v66q0 20-20 20H74q-20 0-20-20z" fill="#F2C9CF" stroke="#14161C" strokeWidth="3" />
            {KR(100, 130, "크림")}
            <path d="M86 142h28" stroke="#14161C" strokeWidth="2" />
            <path d="M70 40q12-14 22 0t24 0" stroke="#E2552D" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "sunscreen":
        return (
          <>
            <path d="M66 24h68l-8 140H74z" fill="#FFF3C4" stroke="#14161C" strokeWidth="3" />
            <rect x="72" y="164" width="56" height="20" rx="6" fill="#2F6B5C" stroke="#14161C" strokeWidth="3" />
            <circle cx="100" cy="66" r="16" fill="#E2552D" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <path
                key={a}
                d={`M${100 + 22 * Math.cos((a * Math.PI) / 180)} ${66 + 22 * Math.sin((a * Math.PI) / 180)}L${
                  100 + 29 * Math.cos((a * Math.PI) / 180)
                } ${66 + 29 * Math.sin((a * Math.PI) / 180)}`}
                stroke="#E2552D"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            {KR(100, 122, "선크림", undefined, 12)}
            <text x="100" y="142" textAnchor="middle" fontFamily="var(--font-sans), Manrope, sans-serif" fontWeight="800" fontSize="11" fill="#14161C">
              SPF
            </text>
          </>
        );
      case "mask":
        return (
          <>
            <rect x="40" y="30" width="120" height="150" rx="10" fill="#DCEBE3" stroke="#14161C" strokeWidth="3" />
            <path d="M40 52h120" stroke="#14161C" strokeWidth="2" strokeDasharray="4 5" />
            <ellipse cx="100" cy="112" rx="34" ry="44" fill="#fff" stroke="#14161C" strokeWidth="2.5" />
            <ellipse cx="87" cy="102" rx="7" ry="4" fill="#14161C" />
            <ellipse cx="113" cy="102" rx="7" ry="4" fill="#14161C" />
            <path d="M90 130q10 7 20 0" stroke="#14161C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {KR(100, 172, "마스크", undefined, 12)}
          </>
        );
      case "care":
        return (
          <>
            <circle cx="82" cy="120" r="46" fill="#F7D2C2" stroke="#14161C" strokeWidth="3" />
            <circle cx="82" cy="120" r="30" fill="#FFF7F3" stroke="#14161C" strokeWidth="2" />
            <rect x="132" y="64" width="26" height="40" rx="4" fill="#E2552D" stroke="#14161C" strokeWidth="3" />
            <rect x="128" y="104" width="34" height="70" rx="6" fill="#14161C" />
            {KR(82, 125, "쿠션", undefined, 12)}
          </>
        );
      case "noodles":
        return (
          <>
            <path d="M30 96h140q0 70-70 70T30 96z" fill="#E2552D" stroke="#14161C" strokeWidth="3" />
            <path d="M40 106h120" stroke="#14161C" strokeWidth="2" />
            <path d="M52 96q8-22 16 0t16 0 16 0 16 0 16 0 16 0" fill="none" stroke="#F4D06F" strokeWidth="5" strokeLinecap="round" />
            <path d="M128 18l-30 80M146 22l-34 78" stroke="#C9A45C" strokeWidth="5" strokeLinecap="round" />
            {KR(100, 140, "라면", "#fff", 16)}
            <path d="M84 44q-6-10 0-20M100 46q-6-12 0-24" stroke="#A9CBBB" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "snacks":
        return (
          <>
            <path
              d="M54 30l8 10 8-10 8 10 8-10 8 10 8-10 8 10 8-10 8 10 8-10v140l-8-8-8 8-8-8-8 8-8-8-8 8-8-8-8 8-8-8-8 8z"
              fill="#F4D06F"
              stroke="#14161C"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="100" cy="92" r="30" fill="#E2552D" />
            <path d="M84 92q8-14 16 0t16 0" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
            {KR(100, 148, "과자", undefined, 16)}
          </>
        );
      case "sauce":
        return (
          <>
            <rect x="46" y="58" width="108" height="26" rx="8" fill="#2F6B5C" stroke="#14161C" strokeWidth="3" />
            <path d="M52 84h96l-8 82q-1 10-11 10H71q-10 0-11-10z" fill="#C2421D" stroke="#14161C" strokeWidth="3" />
            <rect x="66" y="104" width="68" height="44" rx="6" fill="#FFF7EA" />
            {KR(100, 132, "고추장", undefined, 14)}
            <path d="M100 22q14 14 0 30-14-16 0-30z" fill="#E2552D" stroke="#14161C" strokeWidth="2.5" />
          </>
        );
      case "seaweed":
        return (
          <>
            <rect x="42" y="56" width="116" height="100" rx="6" fill="#1F2A26" stroke="#14161C" strokeWidth="3" transform="rotate(-8 100 106)" />
            <rect x="46" y="48" width="116" height="100" rx="6" fill="#2C3A33" stroke="#14161C" strokeWidth="3" transform="rotate(4 104 98)" />
            <rect x="50" y="44" width="108" height="100" rx="6" fill="#33463C" stroke="#14161C" strokeWidth="3" />
            <path d="M60 64h88M60 84h88M60 104h88M60 124h88" stroke="#4E6B5C" strokeWidth="2" />
            <rect x="74" y="150" width="60" height="26" rx="13" fill="#A9CBBB" stroke="#14161C" strokeWidth="2.5" />
            {KR(104, 168, "김", undefined, 15)}
          </>
        );
      case "drinks":
        return (
          <>
            <path d="M58 60q0-10 10-14l4-14h20l4 14q10 4 10 14v108q0 10-10 10H68q-10 0-10-10z" fill="#FFF3C4" stroke="#14161C" strokeWidth="3" />
            <rect x="70" y="20" width="24" height="14" rx="3" fill="#2F6B5C" />
            {KR(82, 124, "우유", undefined, 12)}
            <rect x="116" y="70" width="44" height="108" rx="10" fill="#A9CBBB" stroke="#14161C" strokeWidth="3" />
            <path d="M116 88h44M116 160h44" stroke="#14161C" strokeWidth="2" />
            {KR(138, 130, "음료", undefined, 11)}
          </>
        );
      case "rte":
        return (
          <>
            <rect x="34" y="84" width="132" height="76" rx="14" fill="#FFF7EA" stroke="#14161C" strokeWidth="3" />
            <path d="M34 100h132" stroke="#14161C" strokeWidth="2" />
            <path d="M50 84q50-40 100 0" fill="#fff" stroke="#14161C" strokeWidth="3" />
            <circle cx="80" cy="74" r="3" fill="#14161C" />
            <circle cx="100" cy="68" r="3" fill="#14161C" />
            <circle cx="120" cy="74" r="3" fill="#14161C" />
            {KR(100, 138, "즉석밥", undefined, 15)}
          </>
        );
      case "specialty":
        return (
          <>
            <path d="M70 50h60q8 0 6 8l-4 10q22 14 22 44 0 34-24 50H70q-24-16-24-50 0-30 22-44l-4-10q-2-8 6-8z" fill="#8A5A3B" stroke="#14161C" strokeWidth="3" />
            <rect x="74" y="36" width="52" height="16" rx="6" fill="#5E3B26" stroke="#14161C" strokeWidth="3" />
            <path d="M56 104q44 14 88 0" stroke="#C9A45C" strokeWidth="3" fill="none" />
            <rect x="74" y="118" width="52" height="30" rx="5" fill="#FFF7EA" />
            {KR(100, 139, "김치", undefined, 14)}
          </>
        );
      case "jar":
      default:
        return (
          <>
            <defs>
              <linearGradient id="jg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FFFDF9" />
                <stop offset="1" stopColor="#E9E0D0" />
              </linearGradient>
            </defs>
            <path
              d="M78 20h44q4 0 4 4v8q38 18 44 66 4 44-30 78-6 6-14 8H74q-8-2-14-8-34-34-30-78 6-48 44-66v-8q0-4 4-4z"
              fill="url(#jg)"
              stroke="#14161C"
              strokeWidth="2.5"
            />
            <path d="M50 94q50 18 100 0" stroke="#C9BFAF" strokeWidth="2" fill="none" />
            <ellipse cx="72" cy="80" rx="8" ry="20" fill="#fff" opacity="0.7" />
            {KR(100, 130, "한국", "#2F6B5C", 22)}
            <text x="100" y="152" textAnchor="middle" fontFamily="var(--font-sans), Manrope, sans-serif" fontWeight="700" fontSize="9" letterSpacing="2" fill="#5E5A55">
              KOREA → INDIA
            </text>
          </>
        );
    }
  };

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      {getArtwork(artKey)}
    </svg>
  );
}

// Icon helper components
export function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  switch (name) {
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "left":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "ne":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
          <path d="M7 17L17 7M8 7h9v9" />
        </svg>
      );
    case "source":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4.5 4.5M8.5 11h5M11 8.5v5" />
        </svg>
      );
    case "handshake":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <path d="M2 9l4-2.5 4 1.5 2.5-1.5 4 1 5.5 3.5-2.5 4" />
          <path d="M6 6.5L3 14l4 3M19 13.5l-4.5 4.5c-.8.8-2 .8-2.8 0L8 14.5M10 8l-2.5 3c.8.8 2.2.8 3 0L13 8.5" />
        </svg>
      );
    case "doc":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M15 3v4h4M9 12h7M9 16h5" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <path d="M12 3l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6z" />
          <path d="M8.5 12l2.5 2.5 4.5-5" />
        </svg>
      );
    case "customs":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2" />
        </svg>
      );
    case "box":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z" />
          <path d="M3 7.5l9 4.5 9-4.5M12 12v9" />
        </svg>
      );
    case "truck":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <path d="M2 6h12v11H2zM14 9h4l4 4v4h-8" />
          <circle cx="6.5" cy="18" r="2" />
          <circle cx="17.5" cy="18" r="2" />
        </svg>
      );
    case "store":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <path d="M3 9l2-5h14l2 5M3 9h18M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3M5 12v9h14v-9M10 21v-5h4v5" />
        </svg>
      );
    case "tag":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <path d="M3 12V3h9l9 9-9 9z" />
          <circle cx="7.5" cy="7.5" r="1.5" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
          <path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4zM20 4h-6a3 3 0 00-1 .2M20 4v14h-7" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
      );
    case "person":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1-5 4.5-7 8-7s7 2 8 7" />
        </svg>
      );
    case "wa":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 000-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.1.7a2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z" />
        </svg>
      );
    default:
      return null;
  }
}
