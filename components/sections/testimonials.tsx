"use client";

import Link from "next/link";
import { ShieldCheck, FileCheck2, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { SplitText } from "@/components/motion/split-text";

const QUALITY_COMMITMENTS = [
  {
    icon: FileCheck2,
    title: "Written Scope & Deliverable Clarity",
    description:
      "Every engagement begins with a documented specification listing what is included, what is outside scope, and how each milestone is reviewed.",
  },
  {
    icon: ShieldCheck,
    title: "Demonstrated Product Capabilities",
    description:
      "During Artyx POS and OMS demos, we walk you through live, supported capabilities first and clearly distinguish roadmap features from production modules.",
  },
  {
    icon: Lock,
    title: "Transparent Portfolio & Asset Ownership",
    description:
      "We distinguish client work from in-house ventures in our portfolio, and upon project completion, agreed brand assets and deliverables are handed over cleanly.",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-bg py-20 text-text lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-2xl backdrop-blur-xl sm:p-12 lg:p-14">
          <div className="max-w-3xl">
            {/* Rule 4: Eyebrow pill */}
            <div className="eyebrow-pill">
              <span className="pill-dot" />
              <span>Standards &amp; Accountability</span>
            </div>
            <SplitText
              text="Built on Verifiable Work—Not Inflated Claims"
              as="h2"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl"
            />
            <p className="mt-3 text-base leading-relaxed text-text-muted">
              We only publish client quotes and performance metrics when written client
              sign-off is on file. Evaluate our capability directly through our published
              case studies, live product walkthroughs, and transparent delivery standards.
            </p>
          </div>

          <StaggerReveal className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3" itemSelector=".commitment-card">
            {QUALITY_COMMITMENTS.map((item) => {
              const Icon = item.icon;
              return (
                <TiltCard
                  key={item.title}
                  maxTilt={5}
                  className="commitment-card rounded-2xl border border-border bg-surface-2 p-6 shadow-md"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-accent-text">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </TiltCard>
              );
            })}
          </StaggerReveal>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p className="text-xs text-text-muted">
              Want to inspect live systems before making a decision? Book a POS/OMS
              walkthrough or review our 6 documented case studies.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/work/"
                prefetch={false}
                className="theme-link inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4"
              >
                Inspect Case Studies
                <ArrowRight className="arrow-icon h-4 w-4" />
              </Link>
              <Link
                href="/request-demo/"
                prefetch={false}
                className="theme-link inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4"
              >
                Request Product Walkthrough
                <ArrowRight className="arrow-icon h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
