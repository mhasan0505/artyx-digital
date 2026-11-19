import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";
import { COMPANY_ENTITY } from "@/lib/content/company";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LeadSubmissionForm } from "@/components/forms/lead-submission-form";

export const metadata: Metadata = {
  title: "Start a Project | Scope & Proposal Request | Artyx Digital",
  description:
    "Share your project requirements with Artyx Digital. We help ambitious businesses design, build, and launch websites, custom software, SaaS products, and growth systems.",
  alternates: {
    canonical: "https://artyx.digital/start-a-project/",
  },
  openGraph: {
    title: "Start a Project | Scope & Proposal Request | Artyx Digital",
    description:
      "Tell us what you're planning. We'll help you define the right scope, milestones, and deliverables.",
    url: "https://artyx.digital/start-a-project/",
    type: "website",
  },
};

const PROJECT_PLANNING_POINTS = [
  {
    title: "Documented Scope & Deliverables",
    description:
      "We prepare a clear milestone specification so your team knows exactly what is included, what is excluded, and when each stage will be delivered.",
  },
  {
    title: "No Inflexible Vendor Lock-In",
    description:
      "All custom websites, software repositories, and brand identity master files belong to your business upon milestone sign-off and completion.",
  },
  {
    title: "Rapid Human Review",
    description:
      "Our strategy and engineering leads review your brief and respond within 2 staffed business hours during Dhaka operating hours (Sun–Thu, 10:00 AM – 7:00 PM GMT+6).",
  },
];

export default function StartAProjectPage() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <section className="pt-28 pb-24 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Start a Project", path: "/start-a-project/" }]}
            theme="dark"
          />

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Context, Value Proposition & Direct Contact */}
            <div className="lg:col-span-5">
              <span className="eyebrow-pill">
                Project Scoping
              </span>

              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:leading-[1.1]">
                Tell Us What You&apos;re Planning. We&apos;ll Help You Move Forward.
              </h1>

              <p className="mt-4 text-base leading-relaxed text-text-muted">
                Whether you need a high-conversion corporate website, an e-commerce
                storefront, custom business software, or an SEO growth plan, share your
                objectives below to receive scoping guidance and a structured proposal.
              </p>

              {/* Commitments Box */}
              <div className="mt-8 space-y-4">
                {PROJECT_PLANNING_POINTS.map((pt) => (
                  <div
                    key={pt.title}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    <div>
                      <h3 className="text-sm font-semibold text-text">{pt.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-text-muted">
                        {pt.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dhaka Response Notice */}
              <div className="mt-8 rounded-2xl border border-border bg-surface/60 p-5 text-xs text-text-muted">
                <div className="flex items-center gap-2 font-semibold text-text">
                  <Clock className="h-4 w-4 text-amber-400" />
                  Response Time Commitment
                </div>
                <p className="mt-1.5 leading-relaxed text-text-muted">
                  {COMPANY_ENTITY.responseSlaStatement}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/80 pt-3">
                  <span>Need an immediate conversation?</span>
                  <a
                    href={COMPANY_ENTITY.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-accent-text hover:underline"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Looking for POS / OMS Link */}
              <div className="mt-6 flex items-center justify-between rounded-xl border border-purple-500/25 bg-purple-500/10 p-4 text-xs">
                <span className="text-purple-200">
                  Looking specifically for our ready-to-deploy POS or OMS products?
                </span>
                <Link
                  href="/request-demo/"
                  className="font-semibold text-purple-300 underline hover:text-text"
                >
                  Request Product Demo →
                </Link>
              </div>
            </div>

            {/* Right Column: 4-Step Interactive Form with Single-Page Switcher */}
            <div className="lg:col-span-7">
              <LeadSubmissionForm
                initialMode="service"
                enableWizard={true}
                heading="Project Scope & Budget Planner"
                subheading="Complete the guided steps below or toggle to the single-page form at any time."
                submitLabel="Submit Project Brief"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
