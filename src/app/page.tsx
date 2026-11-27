"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArtSvg, Icon } from "@/components/ArtSvg";
import {
  CATS,
  CAPS,
  PROCESS,
  PATHS,
  POSTS,
  CONFIG,
  bcatName,
} from "@/data/koreanLogisticsData";

export default function HomePage() {
  const beautyRailRef = useRef<HTMLDivElement>(null);
  const foodRailRef = useRef<HTMLDivElement>(null);

  const scrollRail = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const offset = (direction === "right" ? 1 : -1) * (ref.current.clientWidth * 0.8);
      ref.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const marqueeItems = [
    { text: "Skincare", kr: "스킨케어" },
    { text: "Ramyeon", kr: "라면" },
    { text: "Sunscreen", kr: "선크림" },
    { text: "Gochujang", kr: "고추장" },
    { text: "Sheet masks", kr: "마스크" },
    { text: "Seaweed", kr: "김" },
    { text: "Serums", kr: "세럼" },
    { text: "Banana milk", kr: "우유" },
    { text: "Kimchi", kr: "김치" },
    { text: "Snacks", kr: "과자" },
  ];

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="wrap in">
          <div>
            <p className="kr-line">한국의 좋은 것을, 인도로</p>
            <h1>
              <span className="ln">Bringing Korea&apos;s</span>{" "}
              <span className="ln">
                <em>finest</em> to India.
              </span>
            </h1>
            <p className="lead">
              M5 Clogs.in imports Korean skincare, beauty, food and beverages, and connects Korean
              brands with India&apos;s retailers, wholesalers, distributors and shoppers.
            </p>

            <div className="ctas">
              <Link href="/partnerships?type=catalogue#form" className="btn btn-p">
                <span>Request wholesale catalogue</span>
                <Icon name="arrow" />
              </Link>
              <Link href="/products/skincare-beauty" className="btn btn-o">
                Explore products
              </Link>
            </div>

            <div className="meta">
              <div>
                <b>Seoul → India</b>
                <span>Sourced in South Korea</span>
              </div>
              <div>
                <b>B2B first</b>
                <span>Retail, wholesale, distribution</span>
              </div>
              <div>
                <b>Two worlds</b>
                <span>Beauty and food</span>
              </div>
            </div>
          </div>

          {/* Graphical Orbit & Product Display */}
          <div className="stage" aria-hidden="true">
            <div className="orbit" />
            <div className="sun" />
            <div className="jar">
              <ArtSvg artKey="jar" />
            </div>
            <div className="fl a">
              <ArtSvg artKey="serum" />
            </div>
            <div className="fl b">
              <ArtSvg artKey="sunscreen" />
            </div>
            <div className="fl c">
              <ArtSvg artKey="noodles" />
            </div>
            <div className="fl d">
              <ArtSvg artKey="sauce" />
            </div>
            <span className="tag t1">
              <i />
              Sourced in Korea
            </span>
            <span className="tag t2">
              <i />
              Distributed in India
            </span>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="marquee" aria-hidden="true">
          <div className="tr">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
              <span key={idx}>
                {item.text} <span className="kr">{item.kr}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Intro Section ("Who We Are") */}
      <section className="pad">
        <div className="wrap intro">
          <div>
            <span className="eyebrow">
              Who we are <span className="kr">소개</span>
            </span>
            <h2>
              A bridge between <em>Seoul</em> and India.
            </h2>
          </div>

          <div>
            <p className="big">
              M5 Clogs.in is a Korea-to-India import and distribution business. We find Korean products
              Indian customers will love, bring them in compliantly, and get them to the stores where
              people shop.
            </p>

            <div className="pillars">
              <div className="pillar">
                <span className="n">i.</span>
                <h3>Sourced in Korea</h3>
                <p>Products selected with Korean manufacturers and brands.</p>
              </div>

              <div className="pillar">
                <span className="n">ii.</span>
                <h3>Ready for India</h3>
                <p>Registration, labelling and shelf life planned before shipping.</p>
              </div>

              <div className="pillar">
                <span className="n">iii.</span>
                <h3>Built for partners</h3>
                <p>Supply for retailers, wholesalers, distributors and online sellers.</p>
              </div>
            </div>

            <p style={{ marginTop: "28px" }}>
              <Link href="/about" className="tl">
                <span>More about M5 Clogs</span>
                <Icon name="arrow" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Category Duo ("What We Bring") */}
      <section className="pad-s" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow">
                What we bring <span className="kr">상품</span>
              </span>
              <h2>
                Two categories, <em>one</em> standard.
              </h2>
            </div>
            <p className="lead" style={{ maxWidth: "40ch" }}>
              Korean beauty and Korean food, each sourced and imported to the rules that apply to it.
            </p>
          </div>

          <div className="duo">
            {/* Category 1: Beauty */}
            <Link href="/products/skincare-beauty" className="cat beauty group">
              <span className="hg" aria-hidden="true">
                뷰티
              </span>
              <span className="eyebrow" style={{ color: "var(--persimmon-d)" }}>
                Category 01
              </span>
              <h3>
                Korean Skincare
                <br />& Beauty
              </h3>
              <p>Cleansers, toners, serums, moisturisers, sunscreens, sheet masks and personal care.</p>
              <div className="chips">
                {CATS["skincare-beauty"].subs.slice(0, 5).map((s) => (
                  <span key={s.id}>{s.name}</span>
                ))}
              </div>
              <div className="art">
                <ArtSvg artKey="cleanser" />
                <ArtSvg artKey="serum" />
                <ArtSvg artKey="cream" />
                <ArtSvg artKey="mask" />
              </div>
              <span className="go">
                <Icon name="ne" />
              </span>
            </Link>

            {/* Category 2: Food */}
            <Link href="/products/food-beverages" className="cat food group">
              <span className="hg" aria-hidden="true">
                식품
              </span>
              <span className="eyebrow" style={{ color: "var(--celadon)" }}>
                Category 02
              </span>
              <h3>
                Korean Food
                <br />& Beverages
              </h3>
              <p>Ramyeon, snacks, sauces, seaweed, drinks and ready-to-eat meals.</p>
              <div className="chips">
                {CATS["food-beverages"].subs.slice(0, 5).map((s) => (
                  <span key={s.id}>{s.name.replace("Korean ", "")}</span>
                ))}
              </div>
              <div className="art">
                <ArtSvg artKey="noodles" />
                <ArtSvg artKey="snacks" />
                <ArtSvg artKey="seaweed" />
                <ArtSvg artKey="drinks" />
              </div>
              <span className="go">
                <Icon name="ne" />
              </span>
            </Link>
          </div>

          {/* Other Consumer Products */}
          <div className="other">
            <p>
              <b>Other Korean consumer products</b>{" "}
              <span className="muted">
                — home, lifestyle and more, where there&apos;s demand and a compliant route to market.
              </span>
            </p>
            <Link href="/contact" className="tl">
              <span>Ask about a product</span>
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Skincare & Beauty Rail */}
      <section className="pad" style={{ background: "linear-gradient(180deg, var(--hanji) 0%, #FBE9E4 100%)" }}>
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow">
                Skincare & Beauty <span className="kr">스킨케어</span>
              </span>
              <h2>
                The K-beauty <em>routine</em>, step by step.
              </h2>
              <p className="lead">
                From double cleanse to daily sunscreen, the categories Indian shoppers search for most.
              </p>
            </div>
            <div className="railnav">
              <button
                type="button"
                onClick={() => scrollRail(beautyRailRef, "left")}
                aria-label="Scroll skincare left"
              >
                <Icon name="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollRail(beautyRailRef, "right")}
                aria-label="Scroll skincare right"
              >
                <Icon name="arrow" />
              </button>
            </div>
          </div>

          <div
            ref={beautyRailRef}
            className="rail"
            tabIndex={0}
            aria-label="Korean Skincare & Beauty subcategories"
          >
            {CATS["skincare-beauty"].subs.map((sub) => (
              <Link
                key={sub.id}
                href={`/products/skincare-beauty#${sub.id}`}
                className="sub group"
              >
                <div className="pic" style={{ background: CATS["skincare-beauty"].tint }}>
                  <ArtSvg artKey={sub.artKey} />
                </div>
                <span className="k">{sub.kr}</span>
                <h3>{sub.name}</h3>
                <p>{sub.desc}</p>
              </Link>
            ))}
          </div>

          <div className="ctas" style={{ marginTop: "28px" }}>
            <Link href="/products/skincare-beauty" className="btn btn-ink">
              <span>All skincare & beauty</span>
              <Icon name="arrow" />
            </Link>
            <Link href="/products/skincare-beauty" className="tl">
              <span>Wholesale for beauty retailers</span>
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Food & Beverages Rail (Dark Theme) */}
      <section className="pad dark">
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow">
                Food & Beverages <span className="kr">한식</span>
              </span>
              <h2>
                From Seoul&apos;s <em>convenience stores</em> to India&apos;s aisles.
              </h2>
              <p className="lead">
                Korean flavours, packed for long journeys and labelled for Indian shelves.
              </p>
            </div>
            <div className="railnav">
              <button
                type="button"
                onClick={() => scrollRail(foodRailRef, "left")}
                aria-label="Scroll food left"
              >
                <Icon name="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollRail(foodRailRef, "right")}
                aria-label="Scroll food right"
              >
                <Icon name="arrow" />
              </button>
            </div>
          </div>

          <div
            ref={foodRailRef}
            className="rail"
            tabIndex={0}
            aria-label="Korean Food & Beverages subcategories"
          >
            {CATS["food-beverages"].subs.map((sub) => (
              <Link
                key={sub.id}
                href={`/products/food-beverages#${sub.id}`}
                className="sub group"
              >
                <div className="pic" style={{ background: CATS["food-beverages"].tint }}>
                  <ArtSvg artKey={sub.artKey} />
                </div>
                <span className="k">{sub.kr}</span>
                <h3>{sub.name}</h3>
                <p>{sub.desc}</p>
              </Link>
            ))}
          </div>

          <div className="ctas" style={{ marginTop: "28px" }}>
            <Link href="/products/food-beverages" className="btn btn-p">
              <span>All food & beverages</span>
              <Icon name="arrow" />
            </Link>
            <Link href="/products/food-beverages" className="tl">
              <span>Wholesale for food retailers</span>
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Capabilities Section */}
      <section className="pad dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead" style={{ paddingTop: "90px", borderTop: "1px solid #2B2F39" }}>
            <div>
              <span className="eyebrow">
                Capabilities <span className="kr">역량</span>
              </span>
              <h2>
                Import & distribution, <em>handled.</em>
              </h2>
            </div>
            <Link href="/import-distribution" className="btn btn-ow">
              <span>How we work</span>
              <Icon name="arrow" />
            </Link>
          </div>

          <div className="caps">
            {CAPS.map((cap, i) => (
              <div key={i} className="cap">
                <span className="ic">
                  <Icon name={cap.icon} className="w-6 h-6" />
                </span>
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Choose M5 Clogs */}
      <section className="pad">
        <div className="wrap why">
          <div className="stick">
            <span className="eyebrow">
              Why M5 Clogs <span className="kr">왜</span>
            </span>
            <h2>
              Why choose <em>M5 Clogs?</em>
            </h2>
            <p className="lead">
              Korean products only build trust in India when they arrive compliant, in date and on
              time. That&apos;s the work we focus on.
            </p>
            <Link href="/partnerships?go=form" className="btn btn-ink" style={{ marginTop: "12px" }}>
              <span>Start a conversation</span>
              <Icon name="arrow" />
            </Link>
          </div>

          <ol className="wl">
            <li>
              <div>
                <h3>Korea and India, both ends</h3>
                <p>We work with suppliers in Korea and partners in India, so nothing gets lost between them.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Compliance before shipping</h3>
                <p>Registration, licensing, labelling and shelf life planned before an order leaves Korea.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Curated, not crowded</h3>
                <p>Products chosen for Indian climates, tastes and price points rather than everything available.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Honest about what we offer</h3>
                <p>We only list brands we&apos;re authorised to represent and never claim approvals we don&apos;t hold.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Partners, not just buyers</h3>
                <p>Catalogues, pricing tiers and support built for retailers, wholesalers and distributors.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 8. Brands & Portfolio */}
      <section className="pad paper">
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow">
                Brands & portfolio <span className="kr">브랜드</span>
              </span>
              <h2>
                Korean brands, <em>introduced</em> to India.
              </h2>
              <p className="lead">
                Our brand portfolio is being finalised. We&apos;ll show only brands we&apos;re authorised
                to represent, with their own logos and product details.
              </p>
            </div>
            <Link href="/brands" className="btn btn-o">
              <span>Our brands</span>
              <Icon name="arrow" />
            </Link>
          </div>

          {/* Placeholder Brand Wall */}
          <div className="logos" role="list" aria-label="Brand logo placeholders">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} role="listitem">
                Authorised brand logo
                <br />
                <span className="text-[var(--persimmon)] text-xs">[brand {i + 1}]</span>
              </div>
            ))}
          </div>

          <div className="bpanel">
            <div className="bcard">
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "2rem", lineHeight: 1.1 }}>
                What you&apos;ll find for each brand
              </h3>
              <ul className="space-y-3 mt-4 text-sm text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--persimmon)]" />
                  Brand story and Korean origin
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--jade)]" />
                  Product categories and featured hero products
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                  Availability in India and wholesale order terms
                </li>
              </ul>
            </div>

            <div className="bcard ink">
              <span className="eyebrow" style={{ color: "var(--celadon)" }}>
                For Korean brands
              </span>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "2rem", lineHeight: 1.1, color: "#fff" }}>
                Looking for an India partner?
              </h3>
              <p>
                Tell us about your products. We&apos;ll explain what&apos;s needed to bring them to India and
                how we&apos;d take them to market.
              </p>
              <Link
                href="/partnerships?type=brand#form"
                className="btn btn-p"
                style={{ marginTop: "16px" }}
              >
                <span>Brand partnership enquiry</span>
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Six-Stage Korea-to-India Process */}
      <section className="pad">
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow">
                Our process <span className="kr">과정</span>
              </span>
              <h2>
                From a Korean factory to an <em>Indian</em> shelf.
              </h2>
            </div>
            <p className="lead" style={{ maxWidth: "42ch" }}>
              Six stages, coordinated end to end from supplier vetting to nationwide distribution.
            </p>
          </div>

          <ol className="proc">
            {PROCESS.map((p, i) => (
              <li key={i}>
                <span className="dot">{i + 1}</span>
                <span className="where">{p.where}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10. Business Partnerships (Jade Green) */}
      <section className="pad jade">
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow" style={{ color: "#CFE2D8" }}>
                Business partnerships <span className="kr">파트너십</span>
              </span>
              <h2 style={{ color: "#fff" }}>
                Grow with <em style={{ color: "#F7D2C2" }}>Korean</em> products.
              </h2>
              <p className="lead">
                For businesses across India that want a reliable source of Korean beauty and food.
              </p>
            </div>
            <Link href="/partnerships" className="btn btn-w">
              <span>Partnership details</span>
              <Icon name="arrow" />
            </Link>
          </div>

          <div className="aud">
            {[
              "Retailers",
              "Wholesalers",
              "Distributors",
              "Beauty retailers",
              "Skincare clinics & salons",
              "Supermarkets",
              "Food retailers",
              "E-commerce sellers",
              "Korean manufacturers & brands",
            ].map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>

          <div className="paths">
            {PATHS.map((p, i) => (
              <Link
                key={i}
                href={`/partnerships?type=${p.type}#form`}
                className="path group"
              >
                <span className="ic">
                  <Icon name={p.icon} className="w-5 h-5" />
                </span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="tl">
                  <span>Start</span>
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Latest Insights */}
      <section className="pad">
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow">
                Insights <span className="kr">소식</span>
              </span>
              <h2>Latest insights</h2>
              <p className="lead">
                Market trends, import rules and product guides for businesses working with Korean
                products in India.
              </p>
            </div>
            <Link href="/insights" className="btn btn-o">
              <span>View all articles</span>
              <Icon name="arrow" />
            </Link>
          </div>

          <div className="posts">
            {POSTS.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="post group">
                <div className="cv" style={{ background: post.bg }}>
                  <div className="w-full h-full p-8 flex items-center justify-center">
                    <ArtSvg artKey={post.cover} className="w-32 h-32" />
                  </div>
                </div>
                <div className="m">
                  <span className="ctag">{bcatName(post.cat)}</span>
                  <time dateTime={post.date}>
                    {new Date(post.date + "T00:00:00").toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <span className="tl">
                  <span>Read more</span>
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12. High-Impact CTA Band */}
      <section className="pad-s">
        <div className="wrap">
          <div className="cta">
            <div>
              <span className="eyebrow">
                Let&apos;s talk <span className="kr">함께해요</span>
              </span>
              <h2>
                Bring Korean products to <em>your</em> shelves.
              </h2>
              <p className="lead">
                Tell us what you sell and where. We&apos;ll reply within {CONFIG.responseTime} with
                catalogue and pricing details.
              </p>
            </div>

            <div className="split2">
              <Link href="/partnerships?go=form" className="choose">
                <span className="ic">
                  <Icon name="store" />
                </span>
                <span>
                  <b>I&apos;m a business</b>
                  <small>Retailer, wholesaler, distributor, salon or online seller</small>
                </span>
                <Icon name="arrow" />
              </Link>

              <Link href="/partnerships?type=brand#form" className="choose b">
                <span className="ic">
                  <Icon name="globe" />
                </span>
                <span>
                  <b>I&apos;m a Korean brand</b>
                  <small>Manufacturer looking for an India partner</small>
                </span>
                <Icon name="arrow" />
              </Link>

              <Link href="/where-to-buy" className="choose">
                <span className="ic" style={{ background: "#fff", color: "var(--ink)" }}>
                  <Icon name="person" />
                </span>
                <span>
                  <b>I&apos;m a shopper</b>
                  <small>Find out where to buy</small>
                </span>
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
