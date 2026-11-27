import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ArtSvg";

export const metadata = {
  title: "Our Korean Brands | M5 Clogs.in - Authorized Importer",
  description:
    "The Korean beauty and food brands M5 Clogs represents in India. We list only brands we are authorized to represent, using their own approved logos and assets.",
};

export default function BrandsPage() {
  const brandPillars = [
    {
      icon: "globe",
      title: "Brand story",
      desc: "Who they are and where in South Korea they formulate and manufacture their products.",
    },
    {
      icon: "box",
      title: "Categories",
      desc: "Which skincare, beauty, food or drink ranges are cleared and available for distribution.",
    },
    {
      icon: "star",
      title: "Featured products",
      desc: "Hero formulas, sizes, ingredients, certifications, and packaging specifications.",
    },
    {
      icon: "handshake",
      title: "Partnership",
      desc: "How Indian retailers can order and who holds authorized regional distribution rights.",
    },
  ];

  return (
    <div className="py-12">
      <section className="phero">
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Our Brands</span>
            </nav>
            <h1>
              Our <em>Korean</em> brands
            </h1>
            <p className="lead">
              The Korean brands M5 Clogs represents in India. We list only brands we&apos;re authorised to
              represent, using their own approved logos and assets.
            </p>
          </div>
          <div className="hg hidden md:block" aria-hidden="true">
            브랜드
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <div className="other" style={{ margin: "0 0 34px", background: "#FFF8E1", borderColor: "#EBD898" }}>
            <p>
              <b>Portfolio in final onboarding.</b> Brand authorisations and distribution contracts are being
              finalised. Each partner brand will be featured here alongside their CDSCO / FSSAI clearance credentials.
            </p>
          </div>

          {/* Brand Grid */}
          <div className="logos">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i}>
                Authorised Brand Logo
                <br />
                <span className="text-[var(--persimmon)] text-xs font-semibold">[brand {i + 1}]</span>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: "80px" }}>What each brand portfolio provides</h2>
          <div className="grid4" style={{ marginTop: "30px" }}>
            {brandPillars.map((p, i) => (
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
                  <Icon name={p.icon} className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-base mb-1">{p.title}</h3>
                <p className="muted" style={{ margin: 0, fontSize: "0.93rem" }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Korean Manufacturers CTA */}
          <div className="bpanel" style={{ marginTop: "50px" }}>
            <div className="bcard ink" style={{ gridColumn: "1 / -1" }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="eyebrow" style={{ color: "var(--celadon)" }}>
                    Korean manufacturers <span className="kr">제조사</span>
                  </span>
                  <h2 style={{ color: "#fff", margin: 0 }}>Bring your brand to India.</h2>
                  <p style={{ marginTop: "12px", maxWidth: "60ch" }}>
                    We&apos;ll manage your CDSCO cosmetic registration, FSSAI clearance, compliant labelling,
                    and retail distribution across India&apos;s fastest growing consumer markets.
                  </p>
                </div>
                <Link href="/partnerships?type=brand#form" className="btn btn-p">
                  <span>Brand partnership enquiry</span>
                  <Icon name="arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
