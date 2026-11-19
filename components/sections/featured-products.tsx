"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  PackageCheck,
  CheckCircle2,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import { PRODUCTS_CONTENT } from "@/lib/content/products";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { SplitText } from "@/components/motion/split-text";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { OrderJourneyPinnedSection } from "@/components/3d/order-journey-pinned-section";

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const pos = PRODUCTS_CONTENT.pos;
  const oms = PRODUCTS_CONTENT.oms;

  return (
    <section
      ref={sectionRef}
      className="relative bg-transparent text-text"
    >
      {/* Background radial glow: Dark Theme only (Rule 6) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden overflow-x-clip dark:block hidden">
        <ParallaxLayer
          speed={0.18}
          className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[var(--surface-2)]/50 via-[var(--surface)]/70 to-transparent blur-[140px]"
        />
      </div>

      {/* Intro Header */}
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-12 lg:px-8 lg:pt-28 lg:pb-16 text-center">
        {/* Rule 4: Eyebrow pill in var(--surface), 1px var(--border), var(--text) with small var(--accent-text) dot */}
        <div className="eyebrow-pill">
          <span className="pill-dot" />
          <span>Owned Business Software Products</span>
        </div>
        <SplitText
          text="Operate Smarter with Artyx POS & Order Management"
          as="h2"
          highlightWord="Smarter"
          className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
        />
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-text-muted">
          Alongside our custom agency engineering, we build and support dedicated
          operational software for retail stores and multi-channel online sellers.
        </p>
      </div>

      {/* Rule 7: Order Journey stays a dark stage in both themes with 120px gradients */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-30 h-[120px] -mb-[120px] bg-gradient-to-b from-[var(--bg)] to-[#070B06]"
        />
        <OrderJourneyPinnedSection />
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-30 h-[120px] -mt-[120px] bg-gradient-to-b from-[#070B06] to-[var(--bg)]"
        />
      </div>

      {/* Equal side-by-side showcase for POS and OMS with 3D Tilt Cards */}
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Dedicated Product Platforms
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
            Choose the Right Engine for Your Retail Operation
          </h3>
        </div>

        <StaggerReveal className="grid grid-cols-1 gap-8 lg:grid-cols-2" itemSelector=".product-card">
          {/* Card 1: Artyx POS */}
          <TiltCard
            maxTilt={6}
            className="product-card flex flex-col justify-between rounded-3xl border border-border bg-surface p-8 shadow-2xl backdrop-blur-md sm:p-10"
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-surface-2 px-3.5 py-2 text-text">
                  <ShoppingCart className="h-5 w-5 text-accent-text" />
                  <span className="text-xs font-bold uppercase tracking-wider text-text">
                    {pos.name}
                  </span>
                </div>
                <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-mono text-text-muted">
                  Physical Outlets
                </span>
              </div>

              <h3 className="mt-6 font-heading text-2xl font-bold text-text sm:text-3xl">
                {pos.homepageHeadline}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-muted">
                {pos.homepageSupportingCopy} Built for retail shops, electronics outlets,
                and fashion stores that need fast counter billing and accurate SKU stock.
              </p>

              {/* Verified Available Capabilities */}
              <ul className="mt-6 space-y-2.5">
                {pos.availableCapabilities.slice(0, 4).map((cap) => (
                  <li
                    key={cap.id}
                    className="flex items-start gap-2.5 text-sm text-text"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    <span>
                      <strong className="font-semibold text-text">{cap.featureName}:</strong>{" "}
                      {cap.approvedWording}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <Link
                href={pos.canonicalPath}
                prefetch={false}
                className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm"
              >
                {pos.homepageCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/request-demo/?product=pos"
                prefetch={false}
                className="btn-secondary inline-flex items-center gap-2 px-4 py-3 text-sm"
              >
                <CalendarClock className="h-4 w-4 text-accent-text" />
                Request POS Demo
              </Link>
            </div>
          </TiltCard>

          {/* Card 2: Artyx OMS */}
          <TiltCard
            maxTilt={6}
            className="product-card flex flex-col justify-between rounded-3xl border border-border bg-surface p-8 shadow-2xl backdrop-blur-md sm:p-10"
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-surface-2 px-3.5 py-2 text-text">
                  <PackageCheck className="h-5 w-5 text-accent-text" />
                  <span className="text-xs font-bold uppercase tracking-wider text-text">
                    {oms.name}
                  </span>
                </div>
                <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-mono text-text-muted">
                  Online Sellers
                </span>
              </div>

              <h3 className="mt-6 font-heading text-2xl font-bold text-text sm:text-3xl">
                {oms.homepageHeadline}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-muted">
                {oms.homepageSupportingCopy} Built for Facebook, Instagram, and website
                sellers tired of lost inbox orders and stock overselling.
              </p>

              {/* Verified Available Capabilities */}
              <ul className="mt-6 space-y-2.5">
                {oms.availableCapabilities.slice(0, 4).map((cap) => (
                  <li
                    key={cap.id}
                    className="flex items-start gap-2.5 text-sm text-text"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    <span>
                      <strong className="font-semibold text-text">{cap.featureName}:</strong>{" "}
                      {cap.approvedWording}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <Link
                href={oms.canonicalPath}
                prefetch={false}
                className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm"
              >
                {oms.homepageCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/request-demo/?product=oms"
                prefetch={false}
                className="btn-secondary inline-flex items-center gap-2 px-4 py-3 text-sm"
              >
                <CalendarClock className="h-4 w-4 text-accent-text" />
                Request OMS Demo
              </Link>
            </div>
          </TiltCard>
        </StaggerReveal>
      </div>
    </section>
  );
}
