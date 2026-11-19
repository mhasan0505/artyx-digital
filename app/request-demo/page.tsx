import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarClock,
  ShoppingCart,
  PackageCheck,
  Clock,
  HelpCircle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LeadSubmissionForm } from "@/components/forms/lead-submission-form";

export const metadata: Metadata = {
  title: "Request a Product Demo | Artyx POS & Order Management | Artyx Digital",
  description:
    "Request a live walkthrough of Artyx POS Software or Artyx Order Management System (OMS). Experience counter checkout, SKU inventory, and order fulfillment workflows.",
  alternates: {
    canonical: "https://artyx.digital/request-demo/",
  },
  openGraph: {
    title: "Request a Product Demo | Artyx POS & Order Management | Artyx Digital",
    description:
      "Schedule a tailored live walkthrough call with our product engineering team. Tailored for retail outlets and multi-channel online sellers.",
    url: "https://artyx.digital/request-demo/",
    type: "website",
  },
};

const DEMO_FAQS = [
  {
    question: "Is this an automated calendar booking or a demo request?",
    answer:
      "Submitting this form submits a tailored demo request to our product engineering team rather than immediately locking a generic calendar slot. Our specialist will contact you via your preferred channel (WhatsApp, email, or phone) within 1 business day (Sunday–Thursday, Dhaka GMT+6) to confirm a convenient live screen-share or in-person walkthrough.",
  },
  {
    question: "What happens during the live walkthrough?",
    answer:
      "We prepare a live demonstration instance pre-configured for your business type (retail store, fashion boutique, or social-commerce seller). We demonstrate real-world workflows: counter checkout, barcode scanning, order queues, SKU stock reservation, role permissions, and daily reports.",
  },
  {
    question: "Can multiple team members join the walkthrough?",
    answer:
      "Yes. We encourage store owners, accountants, inventory managers, and customer-support moderators to attend so everyone can ask role-specific questions about their daily workflows.",
  },
  {
    question: "What should we prepare before the demo call?",
    answer:
      "A rough estimate of your SKU count, number of outlets (for POS) or average monthly order volume (for OMS), and a list of hardware devices you currently use (e.g., barcode scanners or receipt printers).",
  },
];

interface RequestDemoPageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function RequestDemoPage({
  searchParams,
}: RequestDemoPageProps) {
  const resolvedParams = await searchParams;
  const isOmsSelected = resolvedParams?.product === "oms";
  const initialMode = isOmsSelected ? "oms_demo" : "pos_demo";

  return (
    <div className="bg-bg text-text min-h-screen">
      <section className="pt-28 pb-24 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Products", path: "/products/" },
              { name: "Request a Demo", path: "/request-demo/" },
            ]}
            theme="dark"
          />

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Context, Honest Scheduling Policy & Product Summaries */}
            <div className="lg:col-span-5">
              <span className="eyebrow-pill">
                <CalendarClock className="h-3.5 w-3.5" />
                Live Product Walkthrough
              </span>

              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:leading-[1.1]">
                See Artyx Software Running on Real Workflows.
              </h1>

              <p className="mt-4 text-base leading-relaxed text-text-muted">
                Request a dedicated walkthrough of Artyx POS or Artyx Order Management
                System (OMS). Our team demonstrates live features, answers workflow
                questions, and reviews device compatibility.
              </p>

              {/* Honest Scheduling Notice per Draft v2 Section 2.2 & 13.1 */}
              <div className="mt-6 rounded-2xl border border-blue-500/30 bg-surface p-5 text-xs text-blue-200">
                <div className="flex items-center gap-2 font-bold text-text">
                  <Clock className="h-4 w-4 text-accent-text" />
                  Scheduling &amp; Response Notice
                </div>
                <p className="mt-1.5 leading-relaxed text-text-muted">
                  Submitting this form initiates a demo consultation request with our
                  product team. We will contact you via your chosen channel within 1
                  business day (Sun–Thu, 10:00 AM – 7:00 PM Dhaka GMT+6) to agree on a
                  specific walkthrough time tailored to your schedule.
                </p>
              </div>

              {/* Product Comparison Summary Cards */}
              <div className="mt-6 space-y-3.5">
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-text">
                      <ShoppingCart className="h-4 w-4 text-accent-text" />
                      Artyx POS Software
                    </span>
                    <span className="text-[11px] text-text-muted">Physical Stores</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                    Counter barcode checkout, SKU stock balances, low-stock alerts, and
                    cashier shift closure reconciliation.
                  </p>
                  <Link
                    href="/products/pos/"
                    className="mt-2 inline-block text-xs font-semibold text-purple-300 hover:underline"
                  >
                    View Full POS Specifications →
                  </Link>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-text">
                      <PackageCheck className="h-4 w-4 text-cyan-400" />
                      Artyx Order Management (OMS)
                    </span>
                    <span className="text-[11px] text-text-muted">Social &amp; Online</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                    Centralized Facebook, Instagram &amp; web order intake, automatic SKU
                    stock reservation, packing queues, and courier dispatch tracking.
                  </p>
                  <Link
                    href="/products/order-management/"
                    className="mt-2 inline-block text-xs font-semibold text-cyan-300 hover:underline"
                  >
                    View Full OMS Specifications →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form pre-selected to POS or OMS with mode switcher */}
            <div className="lg:col-span-7">
              <LeadSubmissionForm
                initialMode={initialMode}
                allowModeSwitch={true}
                heading="Request Your Live Walkthrough"
                subheading="Select whether you would like to demo Artyx POS, Artyx OMS, or an agency service."
                submitLabel="Request Live Walkthrough"
              />
            </div>
          </div>

          {/* Demo Preparation FAQs */}
          <div className="mt-24 border-t border-border pt-16">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
                <HelpCircle className="h-3.5 w-3.5 text-accent-text" />
                Demo Preparation &amp; Expectations
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-text sm:text-3xl">
                What to Expect from Your Walkthrough
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {DEMO_FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border bg-surface p-6 text-sm"
                >
                  <h3 className="font-display font-bold text-text">{faq.question}</h3>
                  <p className="mt-2 leading-relaxed text-text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
