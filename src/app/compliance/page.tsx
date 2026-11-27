import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ArtSvg";

export const metadata = {
  title: "Import Compliance & Quality: CDSCO & FSSAI | M5 Clogs.in",
  description:
    "How Korean cosmetics and food products comply with Indian import regulations: CDSCO cosmetics registration, FSSAI import licences, and mandatory packaging declarations.",
};

export default function CompliancePage() {
  return (
    <div className="py-12">
      <section className="phero">
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/import-distribution">Import & Distribution</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Compliance & Quality</span>
            </nav>
            <h1>
              Import <em>compliance</em> & quality
            </h1>
            <p className="lead">
              Korean products have to meet Indian statutory rules before they reach a shelf. Here&apos;s
              what applies, in plain words.
            </p>
          </div>
          <div className="hg hidden md:block" aria-hidden="true">
            품질
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap split">
          <div className="prose">
            <div className="p-5 rounded-2xl bg-[#FFF8E1] border-l-4 border-[var(--persimmon)] text-sm mb-8 text-[#5B4300]">
              <b>Our licences and registrations.</b> M5 Clogs manages complete regulatory compliance: Importer-Exporter
              Code (IEC), central FSSAI import licences, and CDSCO Form COS-2 registrations. We only represent products
              with verified documentation.
            </div>

            <h2>Skincare & Cosmetics Regulations</h2>
            <h3>CDSCO import registration</h3>
            <p>
              Cosmetics imported for sale in India must be registered with the Central Drugs Standard
              Control Organisation (CDSCO) under the Cosmetics Rules, 2020. The application is made on
              Form COS-1, and CDSCO issues an import registration certificate on Form COS-2.
            </p>

            <h3>Mandatory Indian Labelling</h3>
            <p>
              Imported cosmetics must be labelled to Indian rules, including the importer&apos;s name and
              address and the import registration certificate number. Packaged products also require
              declarations such as Maximum Retail Price (MRP inclusive of all taxes), net quantity, and
              consumer care details under the Legal Metrology (Packaged Commodities) Rules.
            </p>

            <h3>Shelf Life at Port of Entry</h3>
            <p>
              CDSCO guidance dictates that the &ldquo;use before&rdquo; date should be later than six months
              from the date of arrival at Indian customs.
            </p>

            <h2>Food & Beverages Regulations</h2>
            <h3>FSSAI Licensing and FICS Clearance</h3>
            <p>
              Food importers must hold an Importer-Exporter Code and a central FSSAI import licence. Every
              commercial consignment is cleared through FSSAI&apos;s Food Import Clearance System (FICS),
              with visual inspection, laboratory testing, and no-objection clearance.
            </p>

            <h3>Vegetarian & Non-Vegetarian Markings</h3>
            <p>
              Imported Korean food must clearly display the Indian green dot for vegetarian or brown dot for
              non-vegetarian on the principal display panel.
            </p>

            <h3>The 60% Shelf Life Rule</h3>
            <p>
              Under FSSAI rules, imported packaged food must have more than 60% of its original shelf life
              remaining at the time of customs import.
            </p>

            <h2>Our Quality Approach</h2>
            <ul className="space-y-2 mt-4">
              <li>✓ Products sourced with Korean manufacturers who supply full ingredient dossiers</li>
              <li>✓ Custom Indian labels and shelf life planned before an order departs Incheon / Busan</li>
              <li>✓ Climate-controlled warehousing suited to temperature-sensitive cosmetics and snacks</li>
              <li>✓ Complete batch tracking and traceability for every shipment supplied</li>
            </ul>
          </div>

          <aside>
            <div className="side">
              <h3 style={{ color: "#fff", fontFamily: "var(--serif)", fontSize: "1.8rem", lineHeight: 1.1 }}>
                Read the regulatory guides
              </h3>
              <Link href="/insights/import-korean-cosmetics-india-cdsco" className="s">
                CDSCO cosmetics registration guide →
              </Link>
              <Link href="/insights/import-korean-food-india-fssai" className="s">
                FSSAI food clearance guide →
              </Link>
              <Link href="/insights/questions-to-ask-korean-product-importer" className="s">
                7 questions to ask an importer →
              </Link>
              <hr />
              <Link href="/partnerships?go=form" className="btn btn-p" style={{ width: "100%" }}>
                Business enquiry
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
