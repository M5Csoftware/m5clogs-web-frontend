import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import GlobalNetwork from "@/components/GlobalNetwork";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* Hero with embedded live tracking & rate calculator */}
      <Hero />

      {/* Core logistics service capabilities */}
      <ServicesGrid />

      {/* Why Choose M5Clogs / Strategic Pillars */}
      <WhyChooseUs />

      {/* Global Trade Infrastructure & Hubs */}
      <GlobalNetwork />

      {/* Client Testimonials & Trust Validation */}
      <Testimonials />

      {/* Custom Quote Inquiries & Headquarters Info */}
      <ContactSection />
    </>
  );
}
