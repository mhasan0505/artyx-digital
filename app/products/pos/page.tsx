import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ShoppingCart,
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

const pos = PRODUCTS_CONTENT.pos;

export const metadata: Metadata = {
  title: pos.seoTitle,
  description: pos.metaDescription,
  alternates: {
    canonical: `https://artyx.digital${pos.canonicalPath}`,
  },
  openGraph: {
    title: pos.seoTitle,
    description: pos.metaDescription,
    url: `https://artyx.digital${pos.canonicalPath}`,
    type: "website",
  },
};

export default function PosProductPage() {
  const roadmapCapabilities = pos.allCapabilities.filter(
    (c) => c.status === "in_development",
  );

  return (
    <div className="bg-bg text-text min-h-screen">
      <JsonLd
        data={buildSoftwareApplicationSchema({
          name: pos.name,
          description: pos.metaDescription,
          canonicalPath: pos.canonicalPath,
          applicationCategory: "BusinessApplication",
        })}
      />

      {/* Section 1: Hero */}
      <section className="bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Products", path: "/products/" },
              { name: "POS Software", path: "/products/pos/" },
            ]}
            theme="dark"
          />

          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-4 eyebrow-pill">
                <ShoppingCart className="h-3.5 w-3.5 text-accent-text" />
                {pos.name}
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:leading-[1.1]">
                {pos.h1}
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-text-muted">
                {pos.heroSupportingCopy}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#request-pos-demo"
                  className="btn-primary inline-flex items-center gap-2 px-7 py-4 text-base font-bold"
                >
                  {pos.primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#pos-capabilities"
                  className="btn-secondary inline-flex items-center gap-2 px-6 py-4 text-base font-semibold"
                >
                  {pos.secondaryCtaLabel}
                </a>
              </div>
            </div>

            {/* Labelled Illustrative POS Interface Mockup with Interactive 3D */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-2xl">
                <div className="mb-3 flex items-center justify-between border-b border-border pb-2.5">
                  <span className="text-xs font-semibold text-text">
                    Artyx POS Counter Terminal
                  </span>
                  <span className="rounded border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-mono text-accent-text">
                    Interactive 3D Preview
                  </span>
                </div>

                <div className="relative h-[220px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-surface to-surface-2 mb-3">
                  <ProductCanvas mode="pos" />
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-border bg-bg p-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">Active Register</span>
                      <span className="rounded bg-surface-2 border border-border px-2 py-0.5 text-[11px] font-semibold text-accent-text">
                        Counter #01 · Open
                      </span>
                    </div>
                    <div className="mt-3 space-y-2 border-t border-border pt-2.5 text-xs">
                      <div className="flex justify-between text-text-muted">
                        <span>1x Wireless Barcode Scanner Terminal</span>
                        <span className="font-mono">BDT 3,450</span>
                      </div>
                      <div className="flex justify-between text-text-muted">
                        <span>2x Thermal Paper Roll Pack (80mm)</span>
                        <span className="font-mono">BDT 900</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-sm font-bold text-text">
                      <span>Total Due (Cash / Mobile Payment)</span>
                      <span className="font-mono text-text">BDT 4,350</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-border bg-surface p-3">
                      <div className="text-text-muted">Low-Stock Alerts</div>
                      <div className="mt-1 font-semibold text-amber-300">
                        4 SKUs Below Threshold
                      </div>
                    </div>
                    <div className="rounded-xl border border-border bg-surface p-3">
                      <div className="text-text-muted">Cashier Shift Audit</div>
                      <div className="mt-1 font-semibold text-emerald-300">
                        Role Permissions Active
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: AEO Answer-First Overview */}
      <AnswerFirstSection
        heading="What Is Artyx POS Software and How Does It Work?"
        data={pos.aeoAnswerFirst}
      />

      {/* Section 3: Problems Solved & Supported Retail Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-text">
                Operational Challenges Solved
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                Why Retailers Replace Spreadsheets &amp; Legacy Registers
              </h2>
              <div className="mt-6 space-y-4">
                {pos.problemsSolved.map((prob) => (
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
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-700">
                Built For Retail Workflows
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                Retail Categories Supported by Artyx POS
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {pos.supportedBusinessTypes.map((bt) => (
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
      <section
        id="pos-capabilities"
        className="border-y border-border bg-surface py-20"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Product Capability Register
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-text sm:text-4xl">
              Production Modules Available Today
            </h2>
            <p className="mt-2 text-base text-text-muted">
              Every module listed below is verified and demonstrated live during your POS
              walkthrough.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pos.availableCapabilities.map((cap) => (
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
                In Development / Custom Integration Scope
              </div>
              <p className="mt-1 text-xs text-amber-800">
                For transparency, the following items are not bundled as self-serve toggle
                features today and require custom scoping or roadmap scheduling:
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

      {/* Section 5: 5-Step POS Workflow & Hardware Requirements */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">
              How Daily Store Operations Work in 5 Steps
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-5">
            {pos.workflowSteps.map((step) => (
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
                Device &amp; Connectivity Requirements
              </div>
              <ul className="mt-4 space-y-2.5">
                {pos.deviceAndConnectivityRequirements.map((req) => (
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
                {pos.pricingSummary}
              </p>
              <ul className="mt-4 space-y-2">
                {pos.onboardingAndSupport.map((item) => (
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
              POS Software FAQs
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-text">
              Frequently Asked Questions About Artyx POS
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {pos.faqs.map((faq) => (
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

      {/* Section 7: Embedded POS Demo Request Form */}
      <section id="request-pos-demo" className="bg-bg py-24 text-text">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
              Live Product Walkthrough
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-text sm:text-4xl">
              See How Artyx POS Fits Your Retail Workflow
            </h2>
            <p className="mt-3 text-base text-text-muted">
              Share your store category and outlet count below. Our team will contact you
              within 1 business day (Sun–Thu, Dhaka GMT+6) to schedule a live demo.
            </p>
          </div>

          <LeadSubmissionForm
            initialMode="pos_demo"
            heading="Request an Artyx POS Demo"
            subheading="Tell us about your retail setup so we can prepare a relevant live walkthrough."
            submitLabel="Request POS Walkthrough"
          />

          <div className="mt-6 text-center text-xs text-text-muted">
            Selling primarily through Facebook, Instagram, or an online store?{" "}
            <Link
              href="/products/order-management/"
              className="font-semibold text-blue-400 underline hover:text-blue-300"
            >
              Explore Artyx Order Management System (OMS) →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

