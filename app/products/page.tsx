"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  PackageCheck,
  CheckCircle2,
  GitMerge,
  HelpCircle,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import { PRODUCTS_CONTENT } from "@/lib/content/products";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { ProductCanvas } from "@/components/3d/product-canvas";

const PRODUCT_COMPARISON_FAQS = [
  {
    question: "Should we choose Artyx POS or Artyx OMS?",
    answer:
      "Choose Artyx POS if your primary workflow is in-store counter billing where walk-in customers pay at a register and leave with items immediately. Choose Artyx OMS if you sell remotely via Facebook, Instagram, phone, or an e-commerce website and need to move orders through confirmation, stock reservation, packing, and courier dispatch.",
  },
  {
    question: "What if we have both a physical retail shop and a Facebook/online store?",
    answer:
      "Many Bangladeshi retailers run both walk-in outlets and social commerce pages. During your walkthrough call, our team will evaluate your SKU catalog and recommend either a primary system or a connected POS + OMS + Website architecture tailored to your inventory workflow.",
  },
  {
    question: "How does product pricing work?",
    answer:
      "Pricing is tailored to your branch count (for POS) or monthly order volume band (for OMS), plus any required onboarding or custom website integrations. We provide clear quotations in BDT for Bangladesh businesses and USD for international teams after your demo.",
  },
  {
    question: "Do you provide staff training and data migration support?",
    answer:
      "Yes. Every deployment includes structured SKU catalog import guidance (via CSV/Excel templates) and practical role-based training for cashiers, moderators, packing staff, and store managers.",
  },
];

export default function ProductsOverviewPage() {
  const [active3DMode, setActive3DMode] = useState<"pos" | "oms">("pos");
  const pos = PRODUCTS_CONTENT.pos;
  const oms = PRODUCTS_CONTENT.oms;

  return (
    <div className="bg-[#070B18] text-white min-h-screen">
      {/* Dark Hero Section with 3D Preview */}
      <section className="relative overflow-hidden bg-[#070B18] pt-28 pb-20 text-[#F8FAFC] lg:pt-36 lg:pb-24 border-b border-slate-800">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 h-[500px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-500/15 via-cyan-500/15 to-transparent blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Products", path: "/products/" }]} theme="dark" />

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 mt-6">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
                <Sparkles className="h-3.5 w-3.5" />
                Business Technology Pillar
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Business Software Built for Everyday Operations.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-[#CBD5E1] sm:text-xl">
                Explore Artyx Digital&apos;s business management products designed to help
                retail and online sellers run sales, inventory, and orders with greater control.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/request-demo/"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0078D7] to-[#0099FF] px-7 py-4 text-base font-semibold text-white shadow-xl shadow-[#0078D7]/30 transition hover:shadow-cyan-500/25 hover:brightness-110"
                >
                  <CalendarClock className="h-5 w-5" />
                  Request a Product Demo
                </Link>
                <Link
                  href="/services/custom-software/"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#0F172A] px-6 py-4 text-base font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
                >
                  Need Custom Software Instead?
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* 3D Visualizer on Hero */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-800 bg-[#0A1022]/90 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                    3D System Inspector
                  </span>
                  <div className="inline-flex rounded-lg border border-slate-800 bg-[#060A16] p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setActive3DMode("pos")}
                      className={`px-2.5 py-1 rounded font-medium ${
                        active3DMode === "pos" ? "bg-purple-600 text-white" : "text-slate-400"
                      }`}
                    >
                      POS
                    </button>
                    <button
                      type="button"
                      onClick={() => setActive3DMode("oms")}
                      className={`px-2.5 py-1 rounded font-medium ${
                        active3DMode === "oms" ? "bg-cyan-600 text-white" : "text-slate-400"
                      }`}
                    >
                      OMS
                    </button>
                  </div>
                </div>
                <div className="relative h-[280px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#060A16] to-[#0A1226] mt-3">
                  <ProductCanvas mode={active3DMode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-Side Product Cards with 3D Tilt */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerReveal className="grid grid-cols-1 gap-10 lg:grid-cols-2" itemSelector=".product-card">
            {/* POS Card */}
            <TiltCard
              maxTilt={6}
              glowColor="rgba(168, 85, 247, 0.18)"
              className="product-card flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0C1326]/90 p-8 shadow-2xl backdrop-blur-md sm:p-10"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-purple-500/15 border border-purple-500/30 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                  <ShoppingCart className="h-4 w-4" />
                  {pos.name}
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold text-white">
                  {pos.homepageHeadline}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
                  {pos.heroSupportingCopy}
                </p>

                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Verified Capabilities Available Today
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {pos.availableCapabilities.map((cap) => (
                      <li
                        key={cap.id}
                        className="flex items-start gap-2.5 text-sm text-slate-200"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                        <span>
                          <strong className="text-white">{cap.featureName}:</strong>{" "}
                          {cap.approvedWording}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-800/80 pt-6">
                <Link
                  href="/products/pos/"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0078D7] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3B82F6]"
                >
                  Explore POS Software
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/request-demo/?product=pos"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#060A16] px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-purple-400/50 hover:text-white"
                >
                  Book POS Walkthrough
                </Link>
              </div>
            </TiltCard>

            {/* OMS Card */}
            <TiltCard
              maxTilt={6}
              glowColor="rgba(0, 229, 255, 0.18)"
              className="product-card flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0C1326]/90 p-8 shadow-2xl backdrop-blur-md sm:p-10"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  <PackageCheck className="h-4 w-4" />
                  {oms.name}
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold text-white">
                  {oms.homepageHeadline}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
                  {oms.heroSupportingCopy}
                </p>

                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Verified Capabilities Available Today
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {oms.availableCapabilities.map((cap) => (
                      <li
                        key={cap.id}
                        className="flex items-start gap-2.5 text-sm text-slate-200"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                        <span>
                          <strong className="text-white">{cap.featureName}:</strong>{" "}
                          {cap.approvedWording}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-800/80 pt-6">
                <Link
                  href="/products/order-management/"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0078D7] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3B82F6]"
                >
                  Explore OMS Software
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/request-demo/?product=oms"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#060A16] px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
                >
                  Book OMS Walkthrough
                </Link>
              </div>
            </TiltCard>
          </StaggerReveal>
        </div>
      </section>

      {/* Comparison Matrix: Which Product Fits Your Business? */}
      <section className="border-y border-slate-800 bg-[#060A16] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Which Product Fits Your Business Workflow?
            </h2>
            <p className="mt-3 text-base text-[#94A3B8]">
              Compare how Artyx POS and Artyx OMS handle transactions, stock, and staff roles.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-slate-800 bg-[#0C1326]/90 shadow-2xl backdrop-blur-md">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-800 bg-[#080D1A] text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-bold">Operational Dimension</th>
                  <th className="px-6 py-4 font-bold text-purple-400">
                    Artyx POS Software
                  </th>
                  <th className="px-6 py-4 font-bold text-cyan-400">
                    Artyx Order Management (OMS)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="px-6 py-4 font-semibold text-white">
                    Primary Selling Channel
                  </td>
                  <td className="px-6 py-4">
                    Physical retail counter, showroom, or branch outlet
                  </td>
                  <td className="px-6 py-4">
                    Facebook Page, Instagram, phone orders &amp; e-commerce site
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-white">
                    Transaction Flow
                  </td>
                  <td className="px-6 py-4">
                    Instant barcode scan → payment → receipt print
                  </td>
                  <td className="px-6 py-4">
                    Capture → Confirmation → Packing → Courier Dispatch → Delivery/Return
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-white">
                    Inventory Deduction Timing
                  </td>
                  <td className="px-6 py-4">
                    Immediate deduction upon counter invoice completion
                  </td>
                  <td className="px-6 py-4">
                    Reserved upon order confirmation; restored on cancellation/return
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-white">
                    Primary Daily Users
                  </td>
                  <td className="px-6 py-4">
                    Store cashiers, floor supervisors, and branch managers
                  </td>
                  <td className="px-6 py-4">
                    Page moderators, confirmation callers, and packing/dispatch staff
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Connected E-commerce Note */}
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-cyan-500/30 bg-[#0C1326] p-7 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <GitMerge className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Connect Your Software with an Artyx E-commerce Website
                </h3>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Need an online storefront that feeds orders directly into your
                  operational workflow? Our engineering team builds custom e-commerce
                  websites designed to work alongside Artyx POS and OMS.
                </p>
              </div>
            </div>
            <Link
              href="/services/ecommerce-website-development/"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#0078D7] to-[#0099FF] px-5 py-3 text-xs font-semibold text-white transition hover:brightness-110"
            >
              Explore E-commerce Development
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              <HelpCircle className="h-3.5 w-3.5" />
              Product FAQs
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white">
              Common Questions About Artyx Software Products
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {PRODUCT_COMPARISON_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-800 bg-[#0C1326] p-6 shadow-md"
              >
                <h3 className="font-display text-lg font-bold text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
