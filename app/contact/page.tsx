import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  CalendarClock,
  Briefcase,
} from "lucide-react";
import { COMPANY_ENTITY } from "@/lib/content/company";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LeadSubmissionForm } from "@/components/forms/lead-submission-form";

export const metadata: Metadata = {
  title: "Contact Artyx Digital | Start a Project or Request a Demo",
  description:
    "Contact Artyx Digital in Dhaka or online. Start a web, e-commerce, software, or marketing project, or request a live demo of Artyx POS and OMS.",
  alternates: {
    canonical: "https://artyx.digital/contact/",
  },
  openGraph: {
    title: "Contact Artyx Digital | Start a Project or Request a Demo",
    description:
      "Share your project, product interest or business goal. Our team will guide you toward the next step.",
    url: "https://artyx.digital/contact/",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#0B1020] text-[#F8FAFC]">
      <section className="pt-28 pb-24 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact/" }]} theme="dark" />

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Context, Direct Paths & Contact Info */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
                Get in Touch
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Let&apos;s Talk About What You Want to Build.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#CBD5E1]">
                Share your project, product interest or business goal. Our team will
                guide you toward the next step.
              </p>

              {/* Dedicated Conversion Path Shortcuts */}
              <div className="mt-8 space-y-3">
                <Link
                  href="/start-a-project/"
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#121A30] p-4 transition hover:border-blue-500/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        Starting an Agency Project?
                      </div>
                      <div className="text-xs text-slate-400">
                        Use our structured project scope &amp; budget planner
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-400" />
                </Link>

                <Link
                  href="/request-demo/"
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#121A30] p-4 transition hover:border-purple-500/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                      <CalendarClock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        Evaluating Artyx POS or OMS?
                      </div>
                      <div className="text-xs text-slate-400">
                        Request a tailored product walkthrough call
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-purple-400" />
                </Link>
              </div>

              {/* Verified Contact Channels */}
              <div className="mt-8 space-y-4 rounded-2xl border border-slate-800 bg-[#121A30]/70 p-6 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-xs text-slate-400">Email</div>
                    <a
                      href={`mailto:${COMPANY_ENTITY.email}`}
                      className="font-semibold text-white hover:text-blue-300"
                    >
                      {COMPANY_ENTITY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-xs text-slate-400">Phone (Bangladesh &amp; Global)</div>
                    <a
                      href={`tel:${COMPANY_ENTITY.phoneE164}`}
                      className="font-semibold text-white hover:text-blue-300"
                    >
                      {COMPANY_ENTITY.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <div className="text-xs text-slate-400">WhatsApp Business</div>
                    <a
                      href={COMPANY_ENTITY.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-300 hover:underline"
                    >
                      Chat on WhatsApp ({COMPANY_ENTITY.phoneDisplay})
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  <div>
                    <div className="text-xs text-slate-400">Dhaka Office</div>
                    <div className="text-slate-200">
                      {COMPANY_ENTITY.address.fullDisplay}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-800 pt-4">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {COMPANY_ENTITY.operatingHoursDisplay}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-400">
                      {COMPANY_ENTITY.responseSlaStatement}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Multi-Mode Form */}
            <div className="lg:col-span-7">
              <LeadSubmissionForm
                initialMode="general"
                allowModeSwitch={true}
                heading="Send Us a Message"
                subheading="Choose your enquiry type below so we route your message to the right specialist."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
