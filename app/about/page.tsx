import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import {
  COMPANY_ENTITY,
  THREE_BUSINESS_PILLARS,
  WHY_ARTYX_REASONS,
  DELIVERY_PROCESS_STEPS,
} from "@/lib/content/company";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "About Artyx Digital | Technology & Digital Growth Partner",
  description:
    "Artyx Digital is a Dhaka-based digital technology and growth company helping businesses build websites, operate smarter with POS, OMS, and custom software, and grow through SEO.",
  alternates: {
    canonical: "https://artyx.digital/about/",
  },
  openGraph: {
    title: "About Artyx Digital | Technology & Digital Growth Partner",
    description: COMPANY_ENTITY.consistentDescription,
    url: "https://artyx.digital/about/",
    type: "website",
  },
};

const WORKING_PRINCIPLES = [
  {
    title: "Clarity Before Code",
    description:
      "We document business goals, user workflows, and scope boundaries in plain language before engineering begins so there are no surprises mid-project.",
  },
  {
    title: "Operational Realism",
    description:
      "Whether we are designing an e-commerce checkout or configuring Artyx POS and OMS, we build for real-world retail counters, moderators, and mobile networks.",
  },
  {
    title: "Evidence Over Hype",
    description:
      "We do not publish inflated percentage claims, fabricated testimonials, or unverified awards. We stand behind live product demos and documented work.",
  },
  {
    title: "Connected Architecture",
    description:
      "Your brand identity, website, operational software, and search visibility should work as one connected system rather than isolated silos.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-bg text-text min-h-screen">
      {/* Dark Hero */}
      <section className="bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "About", path: "/about/" }]} theme="light" />

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-surface-20/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              About {COMPANY_ENTITY.name}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
              We Help Businesses Build, Operate and Grow.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-text-muted sm:text-xl">
              Artyx Digital brings together digital product thinking, creative execution,
              business technology and growth strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview & Mission */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-text">
                Who We Are
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
                One Partner for Digital Experiences, Business Software &amp; Search Growth
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-text-muted">
                <p>{COMPANY_ENTITY.consistentDescription}</p>
                <p>
                  Many growing businesses face a frustrating divide: creative agencies can
                  design a website that looks good on launch day, but they rarely
                  understand SKU inventory, order confirmation queues, or custom software
                  architecture. Conversely, traditional software vendors build rigid tools
                  that ignore brand credibility, mobile conversion, and search engine
                  visibility.
                </p>
                <p>
                  Artyx Digital bridges that gap. Headquartered in Dhaka and serving both
                  Bangladeshi enterprises and international clients, we combine full-stack
                  agency services with our own operational software products—
                  <strong>Artyx POS</strong> and <strong>Artyx OMS</strong>.
                </p>
              </div>
            </div>

            {/* Verified Operations & Entity Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-border bg-surface p-8 shadow-xs">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  Verified Company Profile
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-text">
                  Dhaka Engineering &amp; Operations Hub
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  Our multi-disciplinary engineering, product, design, and growth teams
                  operate from Dhaka, supporting clients across Bangladesh and
                  internationally.
                </p>

                <div className="mt-6 space-y-4 border-t border-border pt-6 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    <div>
                      <div className="font-semibold text-text">Office Address</div>
                      <div className="text-text-muted">
                        {COMPANY_ENTITY.address.fullDisplay}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    <div>
                      <div className="font-semibold text-text">
                        Staffed Operating Hours
                      </div>
                      <div className="text-text-muted">
                        {COMPANY_ENTITY.operatingHoursDisplay}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    <div>
                      <div className="font-semibold text-text">Direct Email</div>
                      <a
                        href={`mailto:${COMPANY_ENTITY.email}`}
                        className="text-accent-text hover:underline"
                      >
                        {COMPANY_ENTITY.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    <div>
                      <div className="font-semibold text-text">
                        Phone &amp; WhatsApp
                      </div>
                      <a
                        href={`tel:${COMPANY_ENTITY.phoneE164}`}
                        className="text-accent-text hover:underline"
                      >
                        {COMPANY_ENTITY.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Business Pillars */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">
              Our Three Business Pillars
            </h2>
            <p className="mt-3 text-base text-text-muted">
              Balanced focus across client engineering services and owned operational
              products.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {THREE_BUSINESS_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-8 shadow-xs"
              >
                <div>
                  <div
                    className="mb-4 h-1.5 w-12 rounded-full"
                    style={{ backgroundColor: pillar.accentColor }}
                  />
                  <h3 className="font-display text-2xl font-bold text-text">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                    {pillar.summary}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-4">
                    {pillar.offerings.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs font-medium text-text"
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

                <div className="mt-6 border-t border-border pt-4">
                  <Link
                    href={pillar.ctaHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text hover:underline"
                  >
                    {pillar.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Principles & Why Businesses Choose Us */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-text">
                Operating Philosophy
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                Principles That Guide Our Work
              </h2>
              <div className="mt-6 space-y-4">
                {WORKING_PRINCIPLES.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <h3 className="font-display text-lg font-bold text-text">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-text">
                Why Artyx Digital
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                How We Deliver Long-Term Value
              </h2>
              <div className="mt-6 space-y-4">
                {WHY_ARTYX_REASONS.map((r) => (
                  <div
                    key={r.title}
                    className="rounded-2xl border border-border bg-surface p-6 shadow-xs"
                  >
                    <h3 className="font-display text-lg font-bold text-text">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                      {r.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6-Step Delivery Process */}
          <div className="mt-20 border-t border-border pt-16">
            <h2 className="text-center font-display text-3xl font-bold text-text">
              Our 6-Step Delivery Process
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DELIVERY_PROCESS_STEPS.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <span className="font-display text-2xl font-bold text-accent-text">
                    {step.stepNumber}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-text">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
