import type { Metadata } from "next";
import { Instrument_Serif, Manrope, Noto_Serif_KR } from "next/font/google";
import HeaderNav from "@/components/HeaderNav";
import FooterSection from "@/components/FooterSection";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerifKr = Noto_Serif_KR({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Korean Skincare & Food Importer and Distributor in India | M5 Clogs.in",
  description:
    "M5 Clogs.in imports Korean skincare, beauty, food and beverages into India and supplies retailers, wholesalers, distributors and e-commerce sellers.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/m5c-logo-noBg.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    title: "M5 Clogs.in — Korea to India",
    description:
      "Korean skincare, beauty, food and beverages, sourced in Korea and distributed across India.",
    url: "https://www.m5clogs.in/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${instrumentSerif.variable} ${manrope.variable} ${notoSerifKr.variable} scroll-smooth`}
    >
      <body className="bg-[var(--hanji)] text-[var(--ink)] font-sans antialiased min-h-screen flex flex-col selection:bg-[#FFF0B8] selection:text-[#5B4300]">
        <HeaderNav />
        <main id="app" className="flex-1 focus:outline-none">
          {children}
        </main>
        <FooterSection />
      </body>
    </html>
  );
}
