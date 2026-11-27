import React from "react";
import Link from "next/link";
import { ArtSvg, Icon } from "@/components/ArtSvg";
import { CATS, CONFIG, POSTS } from "@/data/koreanLogisticsData";

export const metadata = {
  title: "Korean Food & Beverages Importer and Distributor in India | M5 Clogs.in",
  description:
    "Ramyeon, snacks, sauces, seaweed, drinks and ready-to-eat meals from South Korea, for supermarkets, food retailers, cafés and online stores across India.",
};

export default function FoodBeveragesPage() {
  const c = CATS["food-beverages"];
  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hello M5 Clogs, I would like to inquire about Korean Food & Beverages wholesale."
  )}`;

  return (
    <div className="py-12">
      {/* Category Hero */}
      <section className="phero" style={{ background: "linear-gradient(180deg, #E7EFEA, var(--hanji))" }}>
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{c.name}</span>
            </nav>
            <h1>{c.name}</h1>
            <p className="lead">{c.lead}</p>
            <div className="ctas" style={{ marginTop: "28px" }}>
              <Link href="/partnerships?type=catalogue#form" className="btn btn-p">
                <span>Business enquiry</span>
                <Icon name="arrow" />
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-o">
                <Icon name="wa" /> WhatsApp
              </a>
            </div>
          </div>
          <div className="art hidden md:block">
            <ArtSvg artKey="noodles" className="w-64 h-64 mx-auto" />
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="pad-s">
        <div className="wrap split">
          <div>
            <p className="lead" style={{ marginBottom: "30px" }}>
              {c.intro}
            </p>

            {/* Subcategory anchors */}
            <nav className="subnav" aria-label="Subcategories">
              {c.subs.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.name}
                </a>
              ))}
            </nav>

            {/* Subcategory Detailed Blocks */}
            <div className="space-y-12">
              {c.subs.map((s) => (
                <div key={s.id} id={s.id} className="subblock">
                  <div className="pic" style={{ background: c.tint }}>
                    <ArtSvg artKey={s.artKey} />
                  </div>
                  <div>
                    <span className="k">{s.kr}</span>
                    <h2>{s.name}</h2>
                    <p>{s.desc}</p>
                    <div className="types">
                      {s.types.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="ctas" style={{ marginTop: "16px" }}>
                      <Link
                        href={`/partnerships?type=pricing&cat=${encodeURIComponent(s.name)}#form`}
                        className="btn btn-ink btn-sm"
                      >
                        Request pricing
                      </Link>
                      <Link href="/where-to-buy" className="tl">
                        <span>Where to buy</span>
                        <Icon name="arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQs */}
            <div style={{ marginTop: "60px" }}>
              <h2 style={{ fontSize: "2.4rem", marginBottom: "24px" }}>Frequently asked questions</h2>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)]">
                  <h3 className="font-bold text-base mb-2">Do your food products have FSSAI clearance?</h3>
                  <p className="text-sm text-[var(--muted)] m-0">
                    Yes. All food shipments clear through FSSAI&apos;s Food Import Clearance System (FICS) with
                    proper testing, no-objection certificates, and compliant Indian label markings.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)]">
                  <h3 className="font-bold text-base mb-2">Do you have vegetarian ramyeon?</h3>
                  <p className="text-sm text-[var(--muted)] m-0">
                    Yes! Every imported pack carries the Indian green vegetarian or brown non-vegetarian symbol.
                    We have a dedicated 100% vegetarian Korean food range.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)]">
                  <h3 className="font-bold text-base mb-2">What shelf life will I receive?</h3>
                  <p className="text-sm text-[var(--muted)] m-0">
                    Under Indian import regulations, food must have at least 60% of original shelf life
                    remaining at the time of customs import. We deliver fresh stock with verified expiry dates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside>
            <div className="side">
              <h3 style={{ color: "#fff", fontFamily: "var(--serif)", fontSize: "1.8rem", lineHeight: 1.1 }}>
                Stock Korean food
              </h3>
              <p>Catalogue, pricing tiers and wholesale order guidelines for Indian supermarkets and cafes.</p>
              <Link href="/partnerships?type=catalogue#form" className="btn btn-p" style={{ width: "100%" }}>
                Request catalogue
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-ow" style={{ width: "100%", marginTop: "8px" }}>
                <Icon name="wa" /> WhatsApp
              </a>
              <hr />
              <Link href="/compliance" className="s">
                FSSAI import regulations →
              </Link>
              <Link href="/products/skincare-beauty" className="s">
                Explore Skincare & Beauty →
              </Link>
              <hr />
              <p style={{ margin: "0 0 8px", fontSize: "0.9rem", color: "#A9ADB6" }}>Recommended guides</p>
              {POSTS.filter((p) => p.links.includes("food-beverages"))
                .slice(0, 2)
                .map((post) => (
                  <Link key={post.slug} href={`/insights/${post.slug}`} className="s text-xs">
                    {post.title}
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
