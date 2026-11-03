"use client";

import { WHY_ARTYX_REASONS, DELIVERY_PROCESS_STEPS } from "@/lib/content/company";
import { Target, Cpu, GitMerge, Handshake, CheckCircle2 } from "lucide-react";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";

const REASON_ICONS = [Target, Cpu, GitMerge, Handshake];

export function WhyAndProcess() {
  return (
    <section className="bg-[#070B18] py-24 text-white lg:py-28 relative overflow-hidden border-t border-slate-800">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section: Why Artyx Digital */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Why Artyx Digital
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Engineered Around Commercial &amp; Operational Clarity
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
            We focus on practical outcomes—systems your team can actually run and digital
            assets that make it easier for customers to buy from you.
          </p>
        </div>

        <StaggerReveal className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" itemSelector=".why-card">
          {WHY_ARTYX_REASONS.map((reason, idx) => {
            const Icon = REASON_ICONS[idx % REASON_ICONS.length];
            return (
              <TiltCard
                key={reason.title}
                maxTilt={6}
                glowColor="rgba(0, 229, 255, 0.15)"
                className="why-card flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0C1326]/90 p-7 shadow-xl backdrop-blur-md transition hover:border-cyan-500/40"
              >
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">
                    {reason.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-cyan-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Standard</span>
                </div>
              </TiltCard>
            );
          })}
        </StaggerReveal>

        {/* Section: Structured Six-Stage Process */}
        <div className="mt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
              How We Work
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              A Structured Six-Stage Delivery Process
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
              From initial discovery to post-launch optimization, every project follows
              documented milestones so you always know what is being built and why.
            </p>
          </div>

          <StaggerReveal className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" itemSelector=".process-step">
            {DELIVERY_PROCESS_STEPS.map((step) => (
              <TiltCard
                key={step.stepNumber}
                maxTilt={6}
                glowColor="rgba(168, 85, 247, 0.15)"
                className="process-step relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0C1326]/90 p-7 shadow-xl backdrop-blur-md transition hover:border-purple-500/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      0{step.stepNumber}
                    </span>
                    <span className="rounded-full border border-purple-500/30 bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-300">
                      Stage {step.stepNumber}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                    {step.description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
