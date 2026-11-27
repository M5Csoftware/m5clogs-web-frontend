import React from "react";
import Link from "next/link";
import { ArtSvg, Icon } from "@/components/ArtSvg";
import { CATS } from "@/data/koreanLogisticsData";

export const metadata = {
  title: "Where to Buy Korean Products in India | M5 Clogs.in",
  description:
    "Find authentic Korean skincare, cosmetics, ramyeon and food imported by M5 Clogs through verified retail and online partners across India.",
};

export default function WhereToBuyPage() {
  return (
    <div className="py-12">
      <section className="phero">
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Where to buy</span>
            </nav>
            <h1>
              Where to <em>buy</em>
            </h1>
            <p className="lead">
              Looking for authentic Korean products imported by M5 Clogs as an individual shopper? Here&apos;s
              how to locate our ranges.
            </p>
          </div>
          <div className="hg hidden md:block" aria-hidden="true">
            구매
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap split">
          <div>
            <div className="bcard">
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "2rem", lineHeight: 1.1 }}>
                Authorized Retail Partners
              </h3>
              <p className="muted">
                Our products are available through premium department stores, beauty chains, specialty
                supermarkets, and authorized online marketplace storefronts across India.
              </p>
              <div className="logos" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: "20px" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    Authorized Retail Partner
                    <br />
                    <span className="text-[var(--persimmon)] text-xs font-semibold">[partner {i}]</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: "2.4rem", marginTop: "50px" }}>Browse the range</h2>
            <div className="duo" style={{ marginTop: "20px" }}>
              {Object.entries(CATS).map(([k, c]) => (
                <Link key={k} href={`/products/${k}`} className="sub group">
                  <div
                    className="pic"
                    style={{ background: c.tint, aspectRatio: "16/9", display: "grid", placeItems: "center" }}
                  >
                    <ArtSvg artKey={k === "skincare-beauty" ? "cream" : "noodles"} className="w-24 h-24" />
                  </div>
                  <span className="k">{c.kr}</span>
                  <h3>{c.name}</h3>
                  <p>{c.lead}</p>
                </Link>
              ))}
            </div>
          </div>

          <aside>
            <div className="card sticky top-28">
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", lineHeight: 1.1 }}>
                Product Availability Enquiry
              </h3>
              <p className="muted text-xs mb-4">
                Tell us which Korean product you are seeking and your city. We will direct you to the nearest
                stockist or authorized online store.
              </p>
              <Link href="/contact" className="btn btn-p w-full text-center">
                <span>Inquire with support</span>
                <Icon name="arrow" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
