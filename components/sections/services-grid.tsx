"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  ShoppingBag,
  Cpu,
  Layers,
  TrendingUp,
  Palette,
  CheckCircle2,
} from "lucide-react";
import { THREE_BUSINESS_PILLARS } from "@/lib/content/company";
import { getAllServices } from "@/lib/content/services";
import type { ServiceSlug } from "@/lib/validation/lead";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { SplitText } from "@/components/motion/split-text";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { scroll3DState } from "@/lib/motion/scroll-3d-state";

const SERVICE_ICONS: Record<ServiceSlug, typeof Globe> = {
  "web-development": Globe,
  "ecommerce-website-development": ShoppingBag,
  "custom-software": Cpu,
  "saas-development": Layers,
  "digital-marketing": TrendingUp,
  branding: Palette,
};

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const services = getAllServices();

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.innerWidth < 768) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: true,
        onUpdate: (self) => {
          scroll3DState.servicesScrollProgress = self.progress;
          if (self.isActive) scroll3DState.activeStage = "services";
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="services-section"
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-24 text-text lg:py-28"
    >
      {/* Background ambient lighting with multi-layer parallax: Dark Theme only (Rule 6) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden dark:block hidden">
        <ParallaxLayer speed={0.25} className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-[var(--surface-2)]/40 blur-[140px]" />
        <ParallaxLayer speed={-0.2} className="absolute bottom-1/4 -right-40 h-[500px] w-[500px] rounded-full bg-[var(--surface)]/60 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Part 1: Three Business Pillars */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow-pill">
            <span className="pill-dot" />
            <span>Three Connected Business Pillars</span>
          </div>
          <SplitText
            text="One Technology & Growth Partner Across Your Entire Business"
            as="h2"
            highlightWord="Growth"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
          />
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            We bring agency web engineering, owned operational software, and search
            acquisition under one roof so your website, internal workflow, and marketing
            reinforce one another.
          </p>
        </div>

        {/* 3 Pillar Tilt Cards */}
        <StaggerReveal className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3" itemSelector=".pillar-card">
          {THREE_BUSINESS_PILLARS.map((pillar) => (
            <TiltCard
              key={pillar.id}
              maxTilt={7}
              className="pillar-card flex flex-col justify-between rounded-3xl border border-border bg-surface p-8 shadow-2xl backdrop-blur-md transition hover:border-accent-text sm:p-9"
            >
              <div>
                <div className="mb-5 inline-block h-2 w-14 rounded-full bg-accent-text" />
                <h3 className="font-heading text-2xl font-bold text-text">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {pillar.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                  {pillar.offerings.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm font-medium text-text"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-border pt-5">
                <div className="mb-3 text-xs text-text-muted">
                  <strong className="text-text">Best for:</strong> {pillar.audience}
                </div>
                <Link
                  href={pillar.ctaHref}
                  prefetch={false}
                  className="theme-link inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
                >
                  {pillar.ctaLabel}
                  <ArrowRight className="arrow-icon h-4 w-4" />
                </Link>
              </div>
            </TiltCard>
          ))}
        </StaggerReveal>

        {/* Part 2: Dedicated Agency Service Cards */}
        <div className="mt-24">
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-8 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                End-to-End Capabilities
              </span>
              <h3 className="mt-2 font-heading text-2xl font-bold text-text sm:text-3xl">
                Dedicated Agency Services
              </h3>
            </div>
            <Link
              href="/services/"
              prefetch={false}
              className="theme-link inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
            >
              View All Services Overview
              <ArrowRight className="arrow-icon h-4 w-4" />
            </Link>
          </div>

          <StaggerReveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" itemSelector=".service-card">
            {services.map((service) => {
              const Icon = SERVICE_ICONS[service.slug] ?? Globe;
              return (
                <TiltCard
                  key={service.slug}
                  maxTilt={5}
                  className="service-card flex flex-col justify-between rounded-2xl border border-border bg-surface p-7 shadow-lg backdrop-blur-sm transition hover:border-accent-text"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent-text">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="mt-5 font-heading text-xl font-bold text-text">
                      {service.name}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {service.shortOutcomeSummary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border pt-4">
                    <Link
                      href={service.canonicalPath}
                      prefetch={false}
                      className="theme-link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider underline underline-offset-4"
                    >
                      Explore Service &amp; Deliverables
                      <ArrowRight className="arrow-icon h-3.5 w-3.5" />
                    </Link>
                  </div>
                </TiltCard>
              );
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
