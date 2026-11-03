import type { Metadata } from "next";
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
  HelpCircle,
} from "lucide-react";
import {
  THREE_BUSINESS_PILLARS,
  DELIVERY_PROCESS_STEPS,
} from "@/lib/content/company";
import { getAllServices } from "@/lib/content/services";
import type { ServiceSlug } from "@/lib/validation/lead";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Digital Services | Web, Software, SEO & Branding | Artyx Digital",
  description:
    "From websites, e-commerce, and custom software to branding and digital marketing, Artyx Digital helps ambitious businesses build, operate, and grow.",
  alternates: {
    canonical: "https://artyx.digital/services/",
  },
  openGraph: {
    title: "Digital Services | Web, Software, SEO & Branding | Artyx Digital",
    description:
      "Explore Artyx Digital's six core services across Digital Experiences, Business Technology, and Digital Growth.",
    url: "https://artyx.digital/services/",
    type: "website",
  },
};

const SERVICE_ICONS: Record<ServiceSlug, typeof Globe> = {
  "web-development": Globe,
  "ecommerce-website-development": ShoppingBag,
  "custom-software": Cpu,
  "saas-development": Layers,
  "digital-marketing": TrendingUp,
  branding: Palette,
};

const SERVICES_OVERVIEW_FAQS = [
  {
    question: "Can we combine multiple services in one project?",
    answer:
      "Yes. Many clients start with Branding & Identity followed by Website or E-commerce Development, or pair an E-commerce build with Artyx OMS and Technical SEO. Working with one coordinated team eliminates handoff friction between separate agencies.",
  },
  {
    question: "How do you scope and price agency projects?",
    answer:
      "Every project starts with a discovery review where we document your objectives, required deliverables, integrations, and timeline. We then provide a transparent, milestone-based proposal in BDT (for Bangladesh clients) or USD (for international clients).",
  },
  {
    question: "What is the difference between Custom Software and Artyx POS/OMS?",
    answer:
      "Artyx POS and Artyx OMS are our ready-to-deploy software products for retail counter billing and online order management. Custom Software Development is for businesses that need bespoke internal portals, workflow automation, or custom ERP/CRM modules tailored to unique processes.",
  },
  {
    question: "Do you work with international clients outside Bangladesh?",
    answer:
      "Yes. Our engineering and design team in Dhaka works with both Bangladeshi businesses and international startups and SMEs across English-speaking markets using structured async documentation and scheduled video check-ins.",
  },
];

export default function ServicesOverviewPage() {
  const services = getAllServices();

  return (
    <div className="bg-white">
      {/* Section 1: Hero */}
      <section className="bg-[#0B1020] pt-28 pb-20 text-[#F8FAFC] lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Services", path: "/services/" }]} theme="dark" />

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              Agency Capabilities
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Digital Solutions Built Around Your Business.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#CBD5E1] sm:text-xl">
              From websites and custom software to branding and digital marketing, Artyx
              Digital helps businesses build, improve and grow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/start-a-project/"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0078D7] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#0078D7]/30 transition hover:bg-[#3B82F6]"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products/"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#121A30] px-6 py-4 text-base font-semibold text-slate-200 transition hover:border-blue-400/50 hover:text-white"
              >
                Looking for POS or OMS Products?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Three Business Pillars */}
      <section className="border-b border-slate-200 bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-[#0F172A] sm:text-4xl">
              Organized Around Three Business Pillars
            </h2>
            <p className="mt-3 text-base text-[#475569]">
              Clients should understand business outcomes before technical specifications.
              Here is how our capabilities connect across your growth stages.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {THREE_BUSINESS_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs"
              >
                <div
                  className="mb-3 h-1.5 w-10 rounded-full"
                  style={{ backgroundColor: pillar.accentColor }}
                />
                <h3 className="font-display text-xl font-bold text-[#0F172A]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-[#475569]">{pillar.summary}</p>
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {pillar.offerings.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs font-medium text-slate-700"
                    >
                      <CheckCircle2
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: pillar.accentColor }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Six Detailed Service Cards */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0078D7]">
              Dedicated Service Lines
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-[#0F172A] sm:text-4xl">
              Choose the Service That Matches Your Immediate Goal
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service) => {
              const Icon = SERVICE_ICONS[service.slug] || Globe;
              return (
                <div
                  key={service.slug}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 transition hover:border-[#0078D7]/40 hover:bg-white hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0078D7]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-200/70 px-3 py-1 text-xs font-semibold text-slate-700">
                        {service.pillar}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold text-[#0F172A]">
                      {service.name}
                    </h3>
                    <p className="mt-2.5 text-base leading-relaxed text-[#475569]">
                      {service.heroSupportingCopy}
                    </p>

                    <div className="mt-6 border-t border-slate-200/80 pt-5">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Key Deliverables
                      </div>
                      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {service.deliverables.slice(0, 4).map((del) => (
                          <li
                            key={del.title}
                            className="flex items-start gap-2 text-xs font-medium text-slate-800"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0078D7]" />
                            <span>{del.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-5">
                    <Link
                      href={service.canonicalPath}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0078D7] hover:text-blue-700"
                    >
                      Explore {service.shortTitle}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/start-a-project/?service=${service.slug}`}
                      className="text-xs font-medium text-slate-500 hover:text-slate-900"
                    >
                      Request Proposal →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Delivery Process */}
      <section className="border-y border-slate-200 bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-[#0F172A] sm:text-4xl">
              Our Six-Stage Delivery Process
            </h2>
            <p className="mt-3 text-base text-[#475569]">
              Structured discovery, transparent milestones, and clean production launches.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERY_PROCESS_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="font-display text-2xl font-bold text-[#0078D7]">
                  {step.stepNumber}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: FAQs */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#0078D7]">
              <HelpCircle className="h-3.5 w-3.5" />
              Services FAQs
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#0F172A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {SERVICES_OVERVIEW_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-[#0F172A]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
