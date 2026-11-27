import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M5CLOGS | M 5 Continent Logistics Solution (P) Ltd. | Global Freight & Express",
  description:
    "Official portal of M 5 Continent Logistics Solution (P) Ltd. (M5Clogs). International express delivery, air & ocean freight forwarding, cross-border e-commerce fulfillment, overseas warehousing, and customs brokerage across 220+ countries.",
  keywords: [
    "M5clogs",
    "M 5 Continent Logistics Solution",
    "International courier India",
    "Air freight forwarding New Delhi",
    "Customs clearance agent",
    "Cross-border ecommerce logistics",
    "Airway bill tracking",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
