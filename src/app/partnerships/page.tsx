import React from "react";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import { Icon } from "@/components/ArtSvg";
import { CONFIG } from "@/data/koreanLogisticsData";

export const metadata = {
  title: "Business Partnerships | M5 Clogs.in - Wholesale, Distribution & Brand Representation",
  description:
    "Ways to partner with M5 Clogs: wholesale catalogues for retailers, regional distribution agreements, bulk purchases, and India market entry for Korean manufacturers.",
};

export default function PartnershipsPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string; cat?: string }>;
}) {
  const groups = [
    {
      icon: "store",
      title: "Retail Stores",
      aud: "Beauty retailers, supermarkets, gourmet stores",
      desc: "A curated Korean range with registered labels, trade margins, and point-of-sale merchandising.",
    },
    {
      icon: "truck",
      title: "Wholesale & Distribution",
      aud: "Regional FMCG and cosmetics distributors",
      desc: "Exclusive territory distribution agreements with competitive wholesale price lists.",
    },
    {
      icon: "star",
      title: "Salons & Clinics",
      aud: "Dermatological clinics and aesthetic salons",
      desc: "Professional-grade K-beauty ampoules, treatment serums, and retail back-bar products.",
    },
    {
      icon: "box",
      title: "E-Commerce Sellers",
      aud: "Online stores, Amazon, Nykaa, Quick-commerce",
      desc: "Ready inventory with the brand authorization letters and compliance documentation marketplaces demand.",
    },
    {
      icon: "globe",
      title: "Korean Brands",
      aud: "Manufacturers and brand owners in Korea",
      desc: "An authorized India partner managing CDSCO, FSSAI, customs clearance, and nationwide distribution.",
    },
  ];

  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hello M5 Clogs, I would like to discuss a business partnership."
  )}`;

  return (
    <div className="py-12">
      <section className="phero">
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Partnerships</span>
            </nav>
            <h1>
              Business <em>partnerships</em>
            </h1>
            <p className="lead">
              Ways to work with M5 Clogs, whether you sell in India or formulate and manufacture in South Korea.
            </p>
          </div>
          <div className="hg hidden md:block" aria-hidden="true">
            파트너
          </div>
        </div>
      </section>

      {/* Group Cards Grid */}
      <section className="pad-s">
        <div className="wrap">
          <div className="grid4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {groups.map((g, i) => (
              <div key={i} className="bcard" style={{ padding: "26px" }}>
                <span
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "14px",
                    background: "var(--celadon-l)",
                    color: "var(--jade)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <Icon name={g.icon} className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-base mb-1">{g.title}</h3>
                <p className="muted" style={{ fontSize: "0.85rem", marginBottom: "8px" }}>
                  {g.aud}
                </p>
                <p style={{ fontSize: "0.93rem", margin: 0 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pad-s" style={{ paddingTop: "20px" }}>
        <div className="wrap split">
          <div id="form">
            <EnquiryForm />
          </div>

          <div>
            <h2 style={{ fontSize: "2.4rem" }}>What happens next</h2>
            <ol className="steps mt-6">
              <li>
                <b>1. We review your trade enquiry</b>
                <span>Your business profile, distribution territory, and product categories of interest.</span>
              </li>
              <li>
                <b>2. We share matching ranges</b>
                <span>Comprehensive product catalogues, wholesale MOQ tiers, and commercial pricing.</span>
              </li>
              <li>
                <b>3. We establish partnership terms</b>
                <span>Dispatch schedules, order cadence, and dedicated account management.</span>
              </li>
            </ol>

            <div className="bcard mt-8">
              <h3 className="font-bold text-base mb-2">Prefer to speak directly?</h3>
              <p className="muted text-sm mb-4">
                Message our trade desk on WhatsApp or reach out via our contact page.
              </p>
              <div className="ctas">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-jade btn-sm">
                  <Icon name="wa" /> WhatsApp
                </a>
                <Link href="/contact" className="btn btn-o btn-sm">
                  Contact details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
