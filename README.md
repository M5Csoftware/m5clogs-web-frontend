# M5CLOGS Web Frontend

Official web platform and shipment portal for **M 5 Continent Logistics Solution (P) Ltd.** (M5Clogs).

Connecting five continents through intelligent international express air courier, maritime freight forwarding, overseas bonded warehousing (3PL), cross-border e-commerce distribution, and licensed customs brokerage.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/turbopack`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: [ESLint 9](https://eslint.org/)

---

## 🌟 Key Features

1. **Interactive Live Shipment Tracking (`/tracking`)**:
   - Real-time Airway Bill (AWB) lookups with status milestones (Manifested, Picked Up, In Flight, Customs Cleared, Out for Delivery, Delivered).
   - Sample AWBs: `M5C-98421-US`, `M5C-74190-EU`, `M5C-33812-AE` or any custom reference.
   - Verified scan history, time-stamped EDI events, carrier telemetry, and origin/destination display.

2. **Instant International Freight Rate Calculator (`/rate-calculator`)**:
   - Dynamic freight tariffs calculation for 10+ major global trade destinations (USA, UK, UAE, Germany, Canada, Australia, etc.).
   - Slider for gross weight (0.5 kg to 50+ kg) with volumetric weight guidance.
   - Real-time toggle between **M5C Express Air** (Fastest) and **Standard Economy Air** (Cost-optimized).

3. **Core Logistics Services Showcase (`/services`)**:
   - International Express Delivery (2-4 business days).
   - Air Freight Forwarding (Commercial cargo & charters).
   - Ocean & Maritime Freight (FCL / LCL).
   - Cross-Border E-Commerce & GCC Cash on Delivery (COD).
   - Overseas Warehousing & 3PL (US, UK, UAE, EU hubs).
   - Customs Clearance & Brokerage (AEO-T1 accredited).

4. **Strategic Global Network (`/#network`)**:
   - Interactive hub selector for key gateways: DEL, BOM, DXB, LHR, FRA, JFK, SIN, SYD.
   - Overview of key international trade corridors.

5. **Client & Partner EDI Portal Modal**:
   - Sign-in interface for Shippers, Corporate Clients, and Courier Delivery Partners.

6. **Corporate Freight Proposal Form (`/contact`)**:
   - Tailored quote inquiry submission with operational headquarters details (New Delhi, India) and 24/7 hotline.

---

## 📁 Project Structure

```text
m5clogs-web-frontend/
├── public/                 # Static assets & icons
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── layout.tsx      # Root layout with responsive Navbar & Footer
│   │   ├── page.tsx        # Homepage
│   │   ├── tracking/       # Dedicated AWB tracking portal
│   │   ├── services/       # Detailed services catalog
│   │   ├── rate-calculator/# Shipping rate estimation tool
│   │   ├── contact/        # Contact & quote request page
│   │   └── globals.css     # Tailwind CSS styles & themes
│   ├── components/         # Reusable React UI components
│   │   ├── BrandLogo.tsx   # M5CLOGS vector branding
│   │   ├── Navbar.tsx      # Top bar & navigation drawer
│   │   ├── Footer.tsx      # Footer & corporate links
│   │   ├── Hero.tsx        # Main banner with tabbed tools
│   │   ├── TrackingWidget.tsx # Live AWB visualizer & timeline
│   │   ├── RateCalculator.tsx # Instant tariff calculator
│   │   ├── ServicesGrid.tsx# Service cards with Lucide icons
│   │   ├── WhyChooseUs.tsx # Core value propositions
│   │   ├── GlobalNetwork.tsx # Hub selector & trade corridors
│   │   ├── Testimonials.tsx# Exporter reviews & certifications
│   │   ├── ContactSection.tsx # Quote proposal form
│   │   └── PortalModal.tsx # Customer & courier sign-in modal
│   ├── data/               # Logistics data & mock shipment databases
│   │   ├── logisticsData.ts
│   │   └── trackingMockData.ts
│   └── types/              # TypeScript models for shipments & services
│       └── logistics.ts
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js `v20+` or `v24+`
- npm (or pnpm/yarn/bun)

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
```

### 4. Start Production Server

```bash
npm run start
```

---

## 🏢 Corporate Contact

**M 5 Continent Logistics Solution (P) Ltd.**  
- **HQ**: A-24/5, Mohan Cooperative Industrial Estate, Mathura Road, New Delhi - 110044, India  
- **Phone**: +91 11 4987 8800 | Toll Free: 1800 572 6564  
- **Email**: support@m5clogs.com | sales@m5clogs.com  
