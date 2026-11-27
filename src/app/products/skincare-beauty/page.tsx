import React from "react";
import Link from "next/link";
import { ArtSvg, Icon } from "@/components/ArtSvg";
import { CATS, CONFIG, POSTS } from "@/data/koreanLogisticsData";

export const metadata = {
  title: "Korean Skincare & Beauty Wholesale Importer in India | M5 Clogs.in",
  description:
    "Cleansers, toners, serums, moisturisers, sunscreens, sheet masks and personal care from South Korea for India's retailers, salons and online sellers.",
};

export default function SkincareBeautyPage() {
  const c = CATS["skincare-beauty"];
  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hello M5 Clogs, I would like to inquire about Korean Skincare & Beauty wholesale."
  )}`;

  return (
    <div className="py-12">
      {/* Category Hero */}
      <section className="phero" style={{ background: "linear-gradient(180deg, #FBE3DD, var(--hanji))" }}>
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
            <ArtSvg artKey="serum" className="w-64 h-64 mx-auto" />
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
                  <h3 className="font-bold text-base mb-2">Are your cosmetics registered with CDSCO?</h3>
                  <p className="text-sm text-[var(--muted)] m-0">
                    Imported cosmetics must be registered with CDSCO before import. M5 Clogs handles
                    compliance, Form COS-1 filings and COS-2 registrations before shipping.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)]">
                  <h3 className="font-bold text-base mb-2">Can I order small quantities to test?</h3>
                  <p className="text-sm text-[var(--muted)] m-0">
                    Tell us your store or salon profile and we will recommend a starter sample range with flexible trial order tiers.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[var(--line)]">
                  <h3 className="font-bold text-base mb-2">Do you supply salons and skincare clinics?</h3>
                  <p className="text-sm text-[var(--muted)] m-0">
                    Yes, dermatological clinics, beauty salons and medical spas can request our professional-use and retail back-bar catalogue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside>
            <div className="side">
              <h3 style={{ color: "#fff", fontFamily: "var(--serif)", fontSize: "1.8rem", lineHeight: 1.1 }}>
                Stock Korean beauty
              </h3>
              <p>Catalogue, pricing tiers and minimum orders for your business.</p>
              <Link href="/partnerships?type=catalogue#form" className="btn btn-p" style={{ width: "100%" }}>
                Request catalogue
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-ow" style={{ width: "100%", marginTop: "8px" }}>
                <Icon name="wa" /> WhatsApp
              </a>
              <hr />
              <Link href="/compliance" className="s">
                Import compliance & CDSCO →
              </Link>
              <Link href="/products/food-beverages" className="s">
                Explore Food & Beverages →
              </Link>
              <hr />
              <p style={{ margin: "0 0 8px", fontSize: "0.9rem", color: "#A9ADB6" }}>Recommended guides</p>
              {POSTS.filter((p) => p.links.includes("skincare-beauty"))
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
