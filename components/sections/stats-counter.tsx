"use client";

import { VERIFIED_TRUST_EVIDENCE } from "@/lib/content/company";
import { ShieldCheck, Globe2, Briefcase, Clock } from "lucide-react";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";

const ICONS = [Briefcase, Globe2, ShieldCheck, Clock];

export function StatsCounter() {
  return (
    <section
      aria-label="Verified capability and service commitments"
      className="border-y border-slate-800/80 bg-[#060A16] py-14 text-white relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StaggerReveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" itemSelector=".stat-item">
          {VERIFIED_TRUST_EVIDENCE.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <TiltCard
                key={item.label}
                maxTilt={6}
                glowColor="rgba(0, 229, 255, 0.12)"
                className="stat-item flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#0C1326]/80 p-6 shadow-xl backdrop-blur-md transition hover:border-cyan-500/30"
              >
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </div>
                  <div className="mt-1 font-display text-xl font-bold text-white">
                    {item.value}
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-[#94A3B8]">
                  {item.detail}
                </p>
              </TiltCard>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
