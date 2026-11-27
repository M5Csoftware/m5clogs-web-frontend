"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import KoreanLogo from "./KoreanLogo";
import { Icon } from "./ArtSvg";
import { POSTS, CONFIG } from "@/data/koreanLogisticsData";

export default function FooterSection() {
  const pathname = usePathname();
  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setSubscribed(true);
      setNewsEmail("");
    }
  };

  const waLink = CONFIG.whatsapp
    ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
        "Hello M5 Clogs, I'd like to know more about your Korean products."
      )}`
    : "/contact";

  return (
    <footer className="site">
      <div className="wrap">
        {/* Topline Banner */}
        <div className="topline">
          <h2>
            Korea&apos;s finest, <em style={{ color: "var(--celadon)" }}>India&apos;s</em> shelves.
          </h2>
          <div className="ctas">
            <Link href="/partnerships?go=form" className="btn btn-p">
              Business enquiry <Icon name="arrow" />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ow"
            >
              <Icon name="wa" /> WhatsApp
            </a>
          </div>
        </div>

        {/* 5 Column Navigation Grid */}
        <div className="cols">
          {/* Column 1: Brand & Newsletter */}
          <div>
            <KoreanLogo variant="light" />
            <p style={{ marginTop: "16px", fontSize: "0.93rem", color: "#A9ADB6" }}>
              Importing Korean skincare, beauty, food and beverages into India.
            </p>
            <form onSubmit={handleSubscribe} className="news" noValidate>
              <label className="sr" htmlFor="nEmail">
                Email for updates
              </label>
              <input
                id="nEmail"
                type="email"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder="Email for trade updates"
                required
              />
              <button className="btn btn-p btn-sm" type="submit">
                Join
              </button>
            </form>
            {subscribed && (
              <p style={{ fontSize: "0.85rem", color: "var(--celadon)", marginTop: "8px" }}>
                ✓ Subscribed to trade updates.
              </p>
            )}
          </div>

          {/* Column 2: Products */}
          <div>
            <h4>Products</h4>
            <ul>
              <li>
                <Link href="/products/skincare-beauty">Skincare & Beauty</Link>
              </li>
              <li>
                <Link href="/products/food-beverages">Food & Beverages</Link>
              </li>
              <li>
                <Link href="/products/skincare-beauty">Skincare wholesale</Link>
              </li>
              <li>
                <Link href="/products/food-beverages">Food wholesale</Link>
              </li>
              <li>
                <Link href="/where-to-buy">Where to buy</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Business */}
          <div>
            <h4>Business</h4>
            <ul>
              <li>
                <Link href="/partnerships">Partnerships</Link>
              </li>
              <li>
                <Link href="/partnerships?type=catalogue#form">Wholesale catalogue</Link>
              </li>
              <li>
                <Link href="/partnerships?type=distributor#form">Become a distributor</Link>
              </li>
              <li>
                <Link href="/partnerships?type=brand#form">For Korean brands</Link>
              </li>
              <li>
                <Link href="/brands">Our brands</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/import-distribution">Import & distribution</Link>
              </li>
              <li>
                <Link href="/compliance">Compliance & quality</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Insights */}
          <div>
            <h4>Insights</h4>
            <ul>
              {POSTS.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={`/insights/${p.slug}`}>
                    {p.title.split(":")[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/insights" style={{ color: "#fff", fontWeight: 700 }}>
                  All articles →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Korean Watermark */}
        <p className="bigword" aria-hidden="true">
          한국 <em>→</em> India
        </p>

        {/* Legal Bar */}
        <div className="legal">
          <span>© 2026 M5 Clogs.in. All rights reserved.</span>
          <span>
            <Link href="/privacy">Privacy</Link> &nbsp;·&nbsp; <Link href="/privacy">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
