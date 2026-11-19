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
      className="relative overflow-hidden border-y border-border bg-transparent py-14 text-text"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StaggerReveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" itemSelector=".stat-item">
          {VERIFIED_TRUST_EVIDENCE.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <TiltCard
                key={item.label}
                maxTilt={6}
                className="stat-item flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-xl backdrop-blur-md transition hover:border-accent-text"
              >
                <div>
                  {/* Semantic Icon Container: var(--surface-2) with var(--accent-text) icon */}
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent-text">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {item.label}
                  </div>
                  <div className="mt-1 font-heading text-xl font-bold text-text">
                    {item.value}
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-text-muted">
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
