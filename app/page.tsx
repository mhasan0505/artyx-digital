import { CTASection } from "@/components/sections/cta-section";
import { Hero } from "@/components/sections/hero";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsCounter } from "@/components/sections/stats-counter";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Testimonials } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ServicesGrid />
      <StatsCounter />
      <PortfolioShowcase />
      <Testimonials />
      <CTASection />
    </>
  );
}
