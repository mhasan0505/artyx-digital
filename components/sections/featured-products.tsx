"use client";

import { useState } from "react";
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
import { ProductCanvas } from "@/components/3d/product-canvas";

export function FeaturedProducts() {
  const [active3DMode, setActive3DMode] = useState<"pos" | "oms">("pos");
  const pos = PRODUCTS_CONTENT.pos;
  const oms = PRODUCTS_CONTENT.oms;

  return (
    <section className="relative overflow-hidden bg-[#070B18] py-24 text-[#F8FAFC] lg:py-28">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-500/10 via-cyan-500/10 to-transparent blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
            <Sparkles className="h-3.5 w-3.5" />
            Owned Business Software Products
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Operate Smarter with Artyx POS &amp; Order Management
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#CBD5E1]">
            Alongside our custom agency engineering, we build and support dedicated
            operational software for retail stores and multi-channel online sellers.
          </p>
        </div>

        {/* 3D Holographic Interactive Stage with Mode Switcher */}
        <div className="mt-12 rounded-3xl border border-slate-800 bg-[#0A1022]/80 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Interactive 3D System Inspector
              </span>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="inline-flex rounded-xl border border-slate-800 bg-[#060A16] p-1 text-xs">
              <button
                type="button"
                onClick={() => setActive3DMode("pos")}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-medium transition ${
                  active3DMode === "pos"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                POS Counter Register
              </button>
              <button
                type="button"
                onClick={() => setActive3DMode("oms")}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-medium transition ${
                  active3DMode === "oms"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <PackageCheck className="h-3.5 w-3.5" />
                OMS 5-Stage Pipeline
              </button>
            </div>
          </div>

          {/* 3D Canvas Container */}
          <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#060A16] to-[#0A1226] sm:h-[380px]">
            <ProductCanvas mode={active3DMode} />

            <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-slate-800/80 bg-[#0B1020]/80 px-3 py-1.5 text-[10px] text-slate-400 backdrop-blur-md">
              <span>Drag to rotate · Explore architecture</span>
              <span className="font-semibold text-purple-300">
                {active3DMode === "pos" ? "Physical Retail Counter" : "Multi-Channel Online Flow"}
              </span>
            </div>
          </div>
        </div>

        {/* Equal side-by-side showcase for POS and OMS with 3D Tilt Cards */}
        <StaggerReveal className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2" itemSelector=".product-card">
          {/* Card 1: Artyx POS */}
          <TiltCard
            maxTilt={6}
            glowColor="rgba(168, 85, 247, 0.15)"
            className="product-card flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0D152C]/90 p-8 shadow-2xl backdrop-blur-md sm:p-10"
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2.5 rounded-xl bg-purple-500/15 px-3.5 py-2 text-purple-300">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {pos.name}
                  </span>
                </div>
                <span className="rounded-md border border-slate-700 bg-[#060A16] px-2.5 py-1 text-[11px] font-medium text-slate-400">
                  For Retail &amp; Physical Outlets
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
                {pos.homepageHeadline}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
                {pos.homepageSupportingCopy} Built for retail shops, electronics outlets,
                and fashion stores that need fast counter billing and accurate SKU stock.
              </p>

              {/* Verified Available Capabilities */}
              <ul className="mt-6 space-y-2.5">
                {pos.availableCapabilities.slice(0, 4).map((cap) => (
                  <li
                    key={cap.id}
                    className="flex items-start gap-2.5 text-sm text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                    <span>
                      <strong className="font-semibold text-white">{cap.featureName}:</strong>{" "}
                      {cap.approvedWording}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-800/80 pt-6">
              <Link
                href={pos.canonicalPath}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0078D7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3B82F6]"
              >
                {pos.homepageCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/request-demo/?product=pos"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-purple-400/50 hover:text-white"
              >
                <CalendarClock className="h-4 w-4 text-purple-400" />
                Request POS Demo
              </Link>
            </div>
          </TiltCard>

          {/* Card 2: Artyx OMS */}
          <TiltCard
            maxTilt={6}
            glowColor="rgba(0, 229, 255, 0.15)"
            className="product-card flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0D152C]/90 p-8 shadow-2xl backdrop-blur-md sm:p-10"
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2.5 rounded-xl bg-cyan-500/15 px-3.5 py-2 text-cyan-300">
                  <PackageCheck className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {oms.name}
                  </span>
                </div>
                <span className="rounded-md border border-slate-700 bg-[#060A16] px-2.5 py-1 text-[11px] font-medium text-slate-400">
                  For Social &amp; Online Sellers
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
                {oms.homepageHeadline}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
                {oms.homepageSupportingCopy} Built for Facebook, Instagram, and website
                sellers tired of lost inbox orders and stock overselling.
              </p>

              {/* Verified Available Capabilities */}
              <ul className="mt-6 space-y-2.5">
                {oms.availableCapabilities.slice(0, 4).map((cap) => (
                  <li
                    key={cap.id}
                    className="flex items-start gap-2.5 text-sm text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <span>
                      <strong className="font-semibold text-white">{cap.featureName}:</strong>{" "}
                      {cap.approvedWording}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-800/80 pt-6">
              <Link
                href={oms.canonicalPath}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0078D7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3B82F6]"
              >
                {oms.homepageCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/request-demo/?product=oms"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
              >
                <CalendarClock className="h-4 w-4 text-cyan-400" />
                Request OMS Demo
              </Link>
            </div>
          </TiltCard>
        </StaggerReveal>
      </div>
    </section>
  );
}
