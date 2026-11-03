import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { StatsCounter } from "@/components/sections/stats-counter";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { WhyAndProcess } from "@/components/sections/why-and-process";
import { Testimonials } from "@/components/sections/testimonials";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Artyx Digital | Web Development, POS, OMS & Digital Growth",
  description:
    "Artyx Digital helps ambitious businesses in Bangladesh and internationally build better websites, operate smarter with POS, OMS, and custom software, and grow through digital marketing.",
  alternates: {
    canonical: "https://artyx.digital/",
  },
  openGraph: {
    title: "Artyx Digital | Build Better. Operate Smarter. Grow Faster.",
    description:
      "Web development, e-commerce, custom software, POS, Order Management System (OMS), branding, and SEO growth under one roof.",
    url: "https://artyx.digital/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <ServicesGrid />
      <FeaturedProducts />
      <PortfolioShowcase />
      <WhyAndProcess />
      <Testimonials />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
