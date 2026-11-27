import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ArtSvg";

export const metadata = {
  title: "About M5 Clogs.in | Korea to India Import and Distribution",
  description:
    "A Korea-to-India import and distribution business, connecting Korean manufacturers and brands with Indian retailers, wholesalers, salons, and shoppers.",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <section className="phero">
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">About</span>
            </nav>
            <h1>
              About <em>M5 Clogs.in</em>
            </h1>
            <p className="lead">
              A Korea-to-India import and distribution enterprise, connecting Korean manufacturers and
              brands with Indian businesses and shoppers.
            </p>
          </div>
          <div className="hg hidden md:block" aria-hidden="true">
            소개
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap split">
          <div className="prose">
            <h2>Who We Are</h2>
            <p>
              M5 Clogs.in imports authentic Korean skincare, beauty, food and beverages into India. We work
              directly with vetted suppliers in South Korea and supply retailers, wholesalers, distributors,
              and modern e-commerce sellers across India.
            </p>

            <h2>Our Vision</h2>
            <p>
              To make genuine Korean consumer goods accessible across India through reputable local stores
              shoppers already trust, backed by rigorous compliance, accurate shelf-life planning, and reliable inventory.
            </p>

            <h2>Our Korea-to-India Focus</h2>
            <p>
              We dedicate our operational infrastructure exclusively to the South Korea ⇄ India trade route.
              That specialization allows us to understand Korean manufacturer production workflows while
              navigating India&apos;s Central Drugs Standard Control Organisation (CDSCO) and Food Safety and
              Standards Authority of India (FSSAI) regulatory frameworks.
            </p>

            <h2>How We Source</h2>
            <p>
              We curate products tailored to Indian regional climates, consumer tastes, and competitive price
              points, collaborating only with Korean brand partners capable of providing full formulation dossiers
              and manufacturing certificates.
            </p>

            <h2>Commitment to Quality & Transparency</h2>
            <p>
              Mandatory Indian packaging declarations, Maximum Retail Price (MRP) labelling, and remaining
              shelf life are finalized before shipments leave Korean ports. We never claim authorizations or
              licenses we do not possess.
            </p>

            <div className="p-5 rounded-2xl bg-[#FFF8E1] border-l-4 border-[var(--persimmon)] text-xs text-[#5B4300] mt-6">
              <b>Corporate Transparency:</b> All imported consignments are accompanied by statutory Bills of
              Entry, laboratory test reports, certificates of origin, and registered importer details.
            </div>
          </div>

          <aside>
            <div className="side">
              <h3 style={{ color: "#fff", fontFamily: "var(--serif)", fontSize: "1.8rem", lineHeight: 1.1 }}>
                At a glance
              </h3>
              <ul className="space-y-3 mt-4 text-xs text-[#E5E7EB]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--persimmon)]" />
                  Origin: South Korea (Seoul, Incheon, Busan)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--celadon)]" />
                  Destination Market: Pan-India
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  Categories: Skincare, Cosmetics, Food, Snacks, Beverages
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fff]" />
                  Model: B2B Wholesale, Distribution & Brand Representation
                </li>
              </ul>
              <Link href="/contact" className="btn btn-p mt-6" style={{ width: "100%" }}>
                <span>Contact us</span>
                <Icon name="arrow" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
