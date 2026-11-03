"use client";

import Link from "next/link";
import { ShieldCheck, FileCheck2, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";

const QUALITY_COMMITMENTS = [
  {
    icon: FileCheck2,
    title: "Written Scope & Deliverable Clarity",
    description:
      "Every engagement begins with a documented specification listing what is included, what is outside scope, and how each milestone is reviewed.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Product Capabilities Only",
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
    <section className="bg-[#050814] py-20 text-white lg:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-[#0C1326]/90 p-8 shadow-2xl backdrop-blur-xl sm:p-12 lg:p-14">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Standards &amp; Accountability
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built on Verifiable Work—Not Inflated Claims
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
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
                  glowColor="rgba(16, 185, 129, 0.15)"
                  className="commitment-card rounded-2xl border border-slate-800 bg-[#060A16] p-6 shadow-md"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                    {item.description}
                  </p>
                </TiltCard>
              );
            })}
          </StaggerReveal>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-6">
            <p className="text-xs text-slate-400">
              Want to inspect live systems before making a decision? Book a POS/OMS
              walkthrough or review our 6 documented case studies.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/work/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Inspect Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/request-demo/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Request Product Walkthrough
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
