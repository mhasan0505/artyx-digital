"use client";

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

const SERVICE_ICONS: Record<ServiceSlug, typeof Globe> = {
  "web-development": Globe,
  "ecommerce-website-development": ShoppingBag,
  "custom-software": Cpu,
  "saas-development": Layers,
  "digital-marketing": TrendingUp,
  branding: Palette,
};

export function ServicesGrid() {
  const services = getAllServices();

  return (
    <section className="bg-[#050814] py-24 text-white lg:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-1/4 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Part 1: Three Business Pillars */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Three Connected Business Pillars
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            One Technology &amp; Growth Partner Across Your Entire Business
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#CBD5E1]">
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
              glowColor={
                pillar.id === "experiences"
                  ? "rgba(0, 229, 255, 0.18)"
                  : pillar.id === "technology"
                  ? "rgba(168, 85, 247, 0.18)"
                  : "rgba(16, 185, 129, 0.18)"
              }
              className="pillar-card flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0C1326]/90 p-8 shadow-2xl backdrop-blur-md transition hover:border-slate-700 sm:p-9"
            >
              <div>
                <div
                  className="mb-5 inline-block h-2 w-14 rounded-full shadow-md"
                  style={{ backgroundColor: pillar.accentColor }}
                />
                <h3 className="font-display text-2xl font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                  {pillar.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-slate-800/80 pt-5">
                  {pillar.offerings.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm font-medium text-slate-200"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: pillar.accentColor }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-slate-800/80 pt-5">
                <div className="mb-3 text-xs text-slate-400">
                  <strong className="text-slate-300">Best for:</strong> {pillar.audience}
                </div>
                <Link
                  href={pillar.ctaHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  {pillar.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </TiltCard>
          ))}
        </StaggerReveal>

        {/* Part 2: Dedicated Agency Service Cards */}
        <div className="mt-24">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-8 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                End-to-End Capabilities
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Dedicated Agency Services
              </h3>
            </div>
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              View All Services Overview
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <StaggerReveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" itemSelector=".service-card">
            {services.map((service) => {
              const Icon = SERVICE_ICONS[service.slug] ?? Globe;
              return (
                <TiltCard
                  key={service.slug}
                  maxTilt={5}
                  glowColor="rgba(0, 153, 255, 0.12)"
                  className="service-card flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#090F1F]/90 p-7 shadow-lg backdrop-blur-sm transition hover:border-cyan-500/40 hover:bg-[#0D152B]"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="mt-5 font-display text-xl font-bold text-white">
                      {service.name}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                      {service.shortOutcomeSummary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-800/80 pt-4">
                    <Link
                      href={service.canonicalPath}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 transition hover:text-cyan-300"
                    >
                      Explore Service &amp; Deliverables
                      <ArrowRight className="h-3.5 w-3.5" />
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
