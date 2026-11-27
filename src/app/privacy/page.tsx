import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy & Terms of Service | M5 Clogs.in",
  description:
    "Privacy policy under the Digital Personal Data Protection Act, website terms of service, and cookie disclosures for M5 Clogs.in.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12">
      <section className="phero">
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Privacy & Terms</span>
            </nav>
            <h1>Privacy & terms</h1>
          </div>
          <div className="hg hidden md:block" aria-hidden="true">
            정책
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap" style={{ maxWidth: "780px" }}>
          <div className="prose">
            <h2>Digital Personal Data Protection Policy</h2>
            <p>
              At M5 Clogs.in, we respect your privacy and process trade inquiries and personal details in
              strict accordance with applicable Indian laws, including the Digital Personal Data Protection
              Act (DPDP), 2023.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              When you submit a trade inquiry, wholesale catalogue request, or newsletter subscription, we
              collect your business contact information (name, corporate email, phone/WhatsApp number, company
              name, and business type) to facilitate B2B trade communications.
            </p>

            <h3>2. Use of Information</h3>
            <p>
              We use your contact details solely to send quotation proposals, regulatory compliance updates,
              and order coordination. We do not sell or lease your information to third-party marketing firms.
            </p>

            <h3>3. Regulatory Compliance & Disclaimers</h3>
            <p>
              All product specifications, CDSCO registrations, and FSSAI clearances cited on this platform
              represent authentic trade documentation. Product trademarks, brand marks, and manufacturer
              identities belong to their respective Korean proprietors.
            </p>

            <div className="mt-8 pt-6 border-t border-[var(--line)]">
              <Link href="/" className="btn btn-o btn-sm">
                ← Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
