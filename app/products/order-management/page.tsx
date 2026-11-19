import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  PackageCheck,
  MonitorSmartphone,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { PRODUCTS_CONTENT } from "@/lib/content/products";
import {
  buildSoftwareApplicationSchema,
  JsonLd,
} from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { AnswerFirstSection } from "@/components/seo/answer-first-section";
import { LeadSubmissionForm } from "@/components/forms/lead-submission-form";
import { ProductCanvas } from "@/components/3d/product-canvas";

const oms = PRODUCTS_CONTENT.oms;

export const metadata: Metadata = {
  title: oms.seoTitle,
  description: oms.metaDescription,
  alternates: {
    canonical: `https://artyx.digital${oms.canonicalPath}`,
  },
  openGraph: {
    title: oms.seoTitle,
    description: oms.metaDescription,
    url: `https://artyx.digital${oms.canonicalPath}`,
    type: "website",
  },
};

export default function OmsProductPage() {
  const roadmapCapabilities = oms.allCapabilities.filter(
    (c) => c.status === "in_development",
  );

  return (
    <div className="bg-bg text-text min-h-screen">
      <JsonLd
        data={buildSoftwareApplicationSchema({
          name: oms.name,
          description: oms.metaDescription,
          canonicalPath: oms.canonicalPath,
          applicationCategory: "BusinessApplication",
        })}
      />

      {/* Section 1: Hero */}
      <section className="bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Products", path: "/products/" },
              {
                name: "Order Management System",
                path: "/products/order-management/",
              },
            ]}
            theme="dark"
          />

          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-4 eyebrow-pill">
                <PackageCheck className="h-3.5 w-3.5 text-accent-text" />
                {oms.name}
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:leading-[1.1]">
                {oms.h1}
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-text-muted">
                {oms.heroSupportingCopy}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#request-oms-demo"
                  className="btn-primary inline-flex items-center gap-2 px-7 py-4 text-base font-bold"
                >
                  {oms.primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#oms-lifecycle"
                  className="btn-secondary inline-flex items-center gap-2 px-6 py-4 text-base font-semibold"
                >
                  {oms.secondaryCtaLabel}
                </a>
              </div>
            </div>

            {/* Labelled Illustrative OMS Pipeline Mockup with Interactive 3D */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-2xl">
                <div className="mb-3 flex items-center justify-between border-b border-border pb-2.5">
                  <span className="text-xs font-semibold text-text">
                    Artyx OMS Order Lifecycle Queue
                  </span>
                  <span className="rounded border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-mono text-accent-text">
                    Interactive 3D Preview
                  </span>
                </div>

                <div className="relative h-[220px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-surface to-surface-2 mb-3">
                  <ProductCanvas mode="oms" />
                </div>

                <div className="space-y-3">
                  {[
                    {
                      stage: "1. New Orders (FB / IG / Web)",
                      detail: "Customer phone verified · Duplicate check passed",
                      badge: "14 Queued",
                      color: "text-accent-text bg-surface-2 border border-border",
                    },
                    {
                      stage: "2. Confirmed & Stock Reserved",
                      detail: "SKU units locked immediately against overselling",
                      badge: "28 Ready",
                      color: "text-accent-text bg-surface-2 border border-border",
                    },
                    {
                      stage: "3. Packed & Ready for Courier",
                      detail: "Packing slips generated · Courier manifest ready",
                      badge: "19 Dispatched",
                      color: "text-accent-text bg-surface-2 border border-border",
                    },
                  ].map((row) => (
                    <div
                      key={row.stage}
                      className="rounded-xl border border-border bg-bg p-3.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-text">{row.stage}</span>
                        <span
                          className={`rounded px-2 py-0.5 text-[11px] font-semibold ${row.color}`}
                        >
                          {row.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-text-muted">{row.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: AEO Answer-First Overview */}
      <AnswerFirstSection
        heading="What Is Artyx Order Management System (OMS) and How Does It Work?"
        data={oms.aeoAnswerFirst}
      />

      {/* Section 3: Problems Solved & Supported Seller Types */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-text">
                Operational Challenges Solved
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                Why Online Sellers Outgrow Inbox &amp; Spreadsheet Order Tracking
              </h2>
              <div className="mt-6 space-y-4">
                {oms.problemsSolved.map((prob) => (
                  <div
                    key={prob.title}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <h3 className="font-display text-lg font-bold text-text">
                      {prob.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                      {prob.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                Built For Social &amp; Online Commerce
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                Who Artyx OMS Is Designed For
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {oms.supportedBusinessTypes.map((bt) => (
                  <div
                    key={bt.title}
                    className="rounded-2xl border border-border bg-surface p-6 shadow-xs"
                  >
                    <h3 className="font-display text-base font-bold text-text">
                      {bt.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {bt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Verified Capability Register */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Product Capability Register
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-text sm:text-4xl">
              Production OMS Modules Available Today
            </h2>
            <p className="mt-2 text-base text-text-muted">
              Every module listed below is verified and demonstrated live during your OMS
              walkthrough.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {oms.availableCapabilities.map((cap) => (
              <div
                key={cap.id}
                className="rounded-2xl border border-border bg-surface p-6 shadow-xs"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Available Now
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-text">
                  {cap.featureName}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {cap.approvedWording}
                </p>
              </div>
            ))}
          </div>

          {roadmapCapabilities.length > 0 && (
            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/70 p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                <Clock className="h-4 w-4" />
                In Development / Custom Connector Scope
              </div>
              <p className="mt-1 text-xs text-amber-800">
                Direct courier API connectors and external storefront webhooks depend on
                your specific accounts and connector readiness. We confirm exact
                integration options during your live demo:
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {roadmapCapabilities.map((cap) => (
                  <div
                    key={cap.id}
                    className="rounded-xl border border-amber-200/80 bg-surface p-4"
                  >
                    <div className="text-sm font-bold text-text">{cap.featureName}</div>
                    <p className="mt-1 text-xs text-text-muted">{cap.approvedWording}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 5: 5-Stage Order Lifecycle & Requirements */}
      <section id="oms-lifecycle" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">
              The 5-Stage Online Order Lifecycle
            </h2>
            <p className="mt-3 text-base text-text-muted">
              Track every customer order from initial message or checkout to final delivery
              or return reconciliation.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-5">
            {oms.workflowSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <span className="font-display text-2xl font-bold text-accent-text">
                  {step.step}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Device, Connectivity & Onboarding */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-7">
              <div className="flex items-center gap-2.5 text-sm font-bold text-text">
                <MonitorSmartphone className="h-5 w-5 text-accent-text" />
                Device &amp; Team Access Requirements
              </div>
              <ul className="mt-4 space-y-2.5">
                {oms.deviceAndConnectivityRequirements.map((req) => (
                  <li
                    key={req}
                    className="flex items-start gap-2.5 text-sm text-text-muted"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-7">
              <div className="flex items-center gap-2.5 text-sm font-bold text-text">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                Onboarding, Training &amp; Pricing Policy
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {oms.pricingSummary}
              </p>
              <ul className="mt-4 space-y-2">
                {oms.onboardingAndSupport.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-text-muted"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQs */}
      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-text">
              <HelpCircle className="h-3.5 w-3.5" />
              OMS FAQs
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-text">
              Frequently Asked Questions About Artyx OMS
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {oms.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="font-display text-lg font-bold text-text">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Embedded OMS Demo Request Form */}
      <section id="request-oms-demo" className="bg-bg py-24 text-text">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Live Product Walkthrough
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-text sm:text-4xl">
              See How Artyx OMS Organizes Your Order Pipeline
            </h2>
            <p className="mt-3 text-base text-text-muted">
              Select your active sales channels and monthly order volume below. Our team
              will contact you within 1 business day (Sun–Thu, Dhaka GMT+6) to schedule a
              live walkthrough.
            </p>
          </div>

          <LeadSubmissionForm
            initialMode="oms_demo"
            heading="Request an Artyx OMS Demo"
            subheading="Share your selling channels and order volume so we can tailor your walkthrough."
            submitLabel="Request OMS Walkthrough"
          />

          <div className="mt-6 text-center text-xs text-text-muted">
            Need in-store barcode counter billing for a physical retail shop?{" "}
            <Link
              href="/products/pos/"
              className="font-semibold text-blue-400 underline hover:text-blue-300"
            >
              Explore Artyx POS Software →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

