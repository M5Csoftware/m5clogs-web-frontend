"use client";

import React, { useState } from "react";
import { Icon } from "./ArtSvg";
import { CONFIG } from "@/data/koreanLogisticsData";

const ENQ_TYPES = [
  { value: "catalogue", label: "Wholesale catalogue" },
  { value: "distributor", label: "Distribution partner" },
  { value: "bulk", label: "Bulk purchase" },
  { value: "brand", label: "Brand partnership" },
  { value: "pricing", label: "Product pricing" },
];

interface EnquiryFormProps {
  initialType?: string;
  initialCategory?: string;
  compact?: boolean;
}

export default function EnquiryForm({
  initialType = "catalogue",
  initialCategory = "",
  compact = false,
}: EnquiryFormProps) {
  const [enquiryType, setEnquiryType] = useState(initialType);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bizType, setBizType] = useState("");
  const [city, setCity] = useState("");
  const [categories, setCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : ["Skincare & beauty"]
  );
  const [details, setDetails] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter((c) => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    if (!name.trim()) newErrors.name = true;
    if (!company.trim()) newErrors.company = true;
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = true;
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) newErrors.phone = true;
    if (!bizType) newErrors.bizType = true;
    if (!city.trim()) newErrors.city = true;
    if (categories.length === 0) newErrors.categories = true;
    if (!agreed) newErrors.agreed = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="ok-box animate-fade-in p-8 rounded-3xl">
        <h3 className="font-serif text-2xl font-bold text-[#163E31] mb-2">
          Thank you, {name}.
        </h3>
        <p className="text-sm leading-relaxed text-[#163E31]/90">
          Your enquiry for <strong>{company}</strong> has been received. Our trade team will review your
          details and reply within {CONFIG.responseTime} with the catalogue and trade specifications.
        </p>
      </div>
    );
  }

  return (
    <form
      id="enq"
      onSubmit={handleSubmit}
      noValidate
      className={`card ${compact ? "sticky top-28" : ""}`}
    >
      <h3 className="font-serif text-3xl font-normal mb-1">
        {compact ? "Wholesale enquiry" : "Business enquiry"}
      </h3>
      <p className="muted text-sm mb-6">
        We reply within {CONFIG.responseTime}.
      </p>

      <div className="fs">
        {/* Enquiry Type Radios */}
        <div>
          <label>Enquiry type</label>
          <div className="seg" role="radiogroup">
            {ENQ_TYPES.map((t) => (
              <label key={t.value}>
                <input
                  type="radio"
                  name="etype"
                  value={t.value}
                  checked={enquiryType === t.value}
                  onChange={() => setEnquiryType(t.value)}
                />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Name & Company */}
        <div className="f2">
          <div>
            <label htmlFor="eName">Your name</label>
            <input
              id="eName"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: false });
              }}
              className={errors.name ? "invalid" : ""}
            />
            {errors.name && <p className="err">Enter your name.</p>}
          </div>

          <div>
            <label htmlFor="eCo">Company</label>
            <input
              id="eCo"
              type="text"
              required
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                if (errors.company) setErrors({ ...errors, company: false });
              }}
              className={errors.company ? "invalid" : ""}
            />
            {errors.company && <p className="err">Enter your company name.</p>}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="f2">
          <div>
            <label htmlFor="eEmail">Business email</label>
            <input
              id="eEmail"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: false });
              }}
              className={errors.email ? "invalid" : ""}
            />
            {errors.email && <p className="err">Enter a valid email.</p>}
          </div>

          <div>
            <label htmlFor="ePhone">Phone / WhatsApp</label>
            <input
              id="ePhone"
              type="tel"
              required
              placeholder="+91"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: false });
              }}
              className={errors.phone ? "invalid" : ""}
            />
            {errors.phone && <p className="err">Enter a valid phone number.</p>}
          </div>
        </div>

        {/* Business Type & City */}
        <div className="f2">
          <div>
            <label htmlFor="eBiz">Business type</label>
            <select
              id="eBiz"
              required
              value={bizType}
              onChange={(e) => {
                setBizType(e.target.value);
                if (errors.bizType) setErrors({ ...errors, bizType: false });
              }}
              className={errors.bizType ? "invalid" : ""}
            >
              <option value="">Select</option>
              <option>Retailer</option>
              <option>Wholesaler</option>
              <option>Distributor</option>
              <option>Beauty retailer</option>
              <option>Skincare clinic / salon</option>
              <option>Supermarket</option>
              <option>Food retailer</option>
              <option>E-commerce seller</option>
              <option>Korean manufacturer / brand</option>
              <option>Other</option>
            </select>
            {errors.bizType && <p className="err">Choose a business type.</p>}
          </div>

          <div>
            <label htmlFor="eCity">City, state</label>
            <input
              id="eCity"
              type="text"
              required
              placeholder="e.g. Mumbai, Maharashtra"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (errors.city) setErrors({ ...errors, city: false });
              }}
              className={errors.city ? "invalid" : ""}
            />
            {errors.city && <p className="err">Enter your location.</p>}
          </div>
        </div>

        {/* Categories of Interest */}
        <div>
          <label>Categories of interest</label>
          <div className="seg">
            {["Skincare & beauty", "Food & snacks", "Beverages", "Other products"].map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
          {errors.categories && <p className="err block">Choose at least one category.</p>}
        </div>

        {/* Details textarea */}
        <div>
          <label htmlFor="eMsg">
            Details <span className="hint font-normal text-xs">(optional)</span>
          </label>
          <textarea
            id="eMsg"
            rows={3}
            placeholder="Products, volumes, stores, timelines..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* Checkbox */}
        <div>
          <label className="check cursor-pointer">
            <input
              type="checkbox"
              id="eOk"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (errors.agreed) setErrors({ ...errors, agreed: false });
              }}
            />
            <span className="text-xs text-[var(--muted)]">
              M5 Clogs may contact me regarding this enquiry. <a href="/privacy" className="underline">Privacy policy</a>
            </span>
          </label>
          {errors.agreed && <p className="err block">Please agree so we can reply.</p>}
        </div>

        <button className="btn btn-p w-full sm:w-auto" type="submit">
          <span>Send enquiry</span>
          <Icon name="arrow" />
        </button>
      </div>
    </form>
  );
}
