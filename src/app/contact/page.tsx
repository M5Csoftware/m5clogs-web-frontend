"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ArtSvg";
import { CONFIG } from "@/data/koreanLogisticsData";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    topic: "Wholesale or distribution",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hello M5 Clogs, I would like to inquire about Korean products."
  )}`;

  return (
    <div className="py-12">
      <section className="phero">
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
            <h1>
              Contact <em>us</em>
            </h1>
            <p className="lead">
              Business enquiries, Korean brand partnerships or product availability questions. We&apos;d love
              to hear from you.
            </p>
          </div>
          <div className="hg hidden md:block" aria-hidden="true">
            연락
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap split">
          {submitted ? (
            <div className="ok-box p-8 rounded-3xl">
              <h3 className="font-serif text-2xl font-bold text-[#163E31] mb-2">Message received.</h3>
              <p className="text-sm text-[#163E31]/90">
                Thank you, {formData.name}. Our trade team will respond to {formData.email} within{" "}
                {CONFIG.responseTime}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card" noValidate>
              <div className="fs">
                <div className="f2">
                  <div>
                    <label htmlFor="cName">Your name *</label>
                    <input
                      id="cName"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Patel"
                    />
                  </div>
                  <div>
                    <label htmlFor="cCo">Company (optional)</label>
                    <input
                      id="cCo"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Seoul Glow Beauty"
                    />
                  </div>
                </div>

                <div className="f2">
                  <div>
                    <label htmlFor="cEmail">Email *</label>
                    <input
                      id="cEmail"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ananya@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="cPhone">Phone / WhatsApp</label>
                    <input
                      id="cPhone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cTopic">Enquiry category</label>
                  <select
                    id="cTopic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  >
                    <option>Wholesale or distribution</option>
                    <option>Korean brand partnership</option>
                    <option>Product retail availability</option>
                    <option>Press or media</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cMsg">Message *</label>
                  <textarea
                    id="cMsg"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are looking for..."
                  />
                </div>

                <button className="btn btn-p" type="submit">
                  <span>Send message</span>
                  <Icon name="arrow" />
                </button>
              </div>
            </form>
          )}

          <aside>
            <div className="side">
              <h3 style={{ color: "#fff", fontFamily: "var(--serif)", fontSize: "1.8rem", lineHeight: 1.1 }}>
                Reach us directly
              </h3>
              <p>
                <b style={{ color: "#fff" }}>Email</b>
                <br />
                <a className="s" href={`mailto:${CONFIG.email}`}>
                  {CONFIG.email}
                </a>
              </p>
              <p>
                <b style={{ color: "#fff" }}>Phone</b>
                <br />
                <span className="text-sm text-slate-300">{CONFIG.phone}</span>
              </p>
              <p>
                <b style={{ color: "#fff" }}>Locations</b>
                <br />
                <span className="text-sm text-slate-300">{CONFIG.address}</span>
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-jade"
                style={{ width: "100%", marginTop: "12px" }}
              >
                <Icon name="wa" /> Chat on WhatsApp
              </a>
              <hr />
              <p style={{ margin: "0 0 6px", fontSize: "0.85rem", color: "#A9ADB6" }}>
                Looking for trade catalogues?
              </p>
              <Link href="/partnerships?go=form" className="s">
                Use the business enquiry form →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
