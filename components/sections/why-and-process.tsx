"use client";

import { useRef } from "react";
import { WHY_ARTYX_REASONS } from "@/lib/content/company";
import {
  Target,
  Cpu,
  GitMerge,
  Handshake,
  CheckCircle2,
  Code2,
  Rocket,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { SplitText } from "@/components/motion/split-text";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const REASON_ICONS = [Target, Cpu, GitMerge, Handshake];

const PROCESS_STAGES = [
  {
    step: "01",
    phase: "BUILD",
    badge: "Phase 01 · Engineering & System Design",
    title: "Precision Architecture & Custom Development",
    description:
      "We build robust web applications, e-commerce stores, and software products (POS & OMS) with modern Next.js and clean, documented databases—no fragile off-the-shelf templates.",
    icon: Code2,
    deliverables: [
      "Custom UI/UX & Design Tokens",
      "Next.js & TypeScript Architecture",
      "POS & OMS Workflow Integration",
      "Database & Schema Modeling",
    ],
  },
  {
    step: "02",
    phase: "LAUNCH",
    badge: "Phase 02 · Deployment & Go-Live",
    title: "Production Deployment & Team Onboarding",
    description:
      "We orchestrate production deployment, technical SEO indexing, security hardening, and hands-on staff training for retail counter POS and multi-channel order management.",
    icon: Rocket,
    deliverables: [
      "Cloud Hosting Setup & Optimization",
      "Technical SEO & Schema Validation",
      "POS & Software Handover Walkthrough",
      "Inventory & Order Migration",
    ],
  },
  {
    step: "03",
    phase: "GROW",
    badge: "Phase 03 · Acquisition & Continuous Scaling",
    title: "Search Visibility, Attribution & Iterative Growth",
    description:
      "Post-launch, we align technical search performance, conversion optimization, and continuous product updates to turn visits into revenue and orders into loyal customers.",
    icon: TrendingUp,
    deliverables: [
      "Technical SEO & Search Visibility",
      "Multi-Channel Order Analytics",
      "Conversion Rate Optimization",
      "Ongoing Maintenance & Feature Updates",
    ],
  },
];

export function WhyAndProcess() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion and skip pinning on small mobile screens
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.innerWidth < 1024
      ) {
        return;
      }

      const panels = gsap.utils.toArray<HTMLElement>(".process-panel");
      if (!panels.length || !trackRef.current || !horizontalSectionRef.current) return;

      const totalPanels = panels.length;

      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1.1,
          start: "top top",
          end: () => `+=${trackRef.current?.offsetWidth || 2400}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        scrollTween.kill();
      };
    },
    { scope: horizontalSectionRef }
  );

  return (
    <section className="relative overflow-hidden bg-bg text-text">
      {/* 1. Horizontal Scroll Section: "Build. Launch. Grow." */}
      <div
        ref={horizontalSectionRef}
        className="relative overflow-hidden border-t border-border py-20 lg:h-screen lg:py-0 lg:flex lg:flex-col lg:justify-center"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-8 lg:mb-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
            <div>
              {/* Rule 4: Eyebrow pill */}
              <div className="eyebrow-pill">
                <span className="pill-dot" />
                <span>The Artyx Lifecycle</span>
              </div>
              <SplitText
                text="Build. Launch. Grow."
                as="h2"
                className="mt-3 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
              />
            </div>
            <p className="max-w-md text-sm text-text-muted">
              A proven delivery model engineered for operational predictability, technical excellence, and sustainable business revenue.
            </p>
          </div>
        </div>

        {/* Horizontal Track for Desktop / Vertical Grid for Mobile */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col gap-6 lg:flex-row lg:flex-nowrap lg:gap-8 w-full"
          >
            {PROCESS_STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="process-panel w-full shrink-0 lg:w-[calc(100vw-180px)] lg:max-w-3xl"
                >
                  <div className="rounded-3xl border border-border bg-surface p-8 shadow-2xl backdrop-blur-xl sm:p-10">
                    <div className="flex items-center justify-between border-b border-border pb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-2 text-accent-text">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                            {stage.badge}
                          </span>
                          <h3 className="font-wordmark text-2xl font-black uppercase text-text">
                            {stage.phase}
                          </h3>
                        </div>
                      </div>
                      <span aria-hidden="true" className="font-display text-5xl font-black text-accent-text select-none">
                        {stage.step}
                      </span>
                    </div>

                    <h4 className="mt-6 font-heading text-2xl font-bold text-text">
                      {stage.title}
                    </h4>
                    <p className="mt-3 text-base leading-relaxed text-text-muted">
                      {stage.description}
                    </p>

                    <div className="mt-8 border-t border-border pt-6">
                      <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                        Key Milestone Deliverables
                      </div>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {stage.deliverables.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-sm font-medium text-text"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-text" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Section: Why Artyx Digital */}
      <div className="relative border-t border-border py-24 lg:py-28">
        {/* Dark theme glow only (Rule 6) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden dark:block hidden">
          <ParallaxLayer speed={0.2} className="absolute top-1/4 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--surface-2)]/40 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow-pill">
              <span className="pill-dot" />
              <span>Why Artyx Digital</span>
            </div>
            <SplitText
              text="Engineered Around Commercial & Operational Clarity"
              as="h2"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
            />
            <p className="mt-3 text-base leading-relaxed text-text-muted">
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
                  className="why-card flex flex-col justify-between rounded-2xl border border-border bg-surface p-7 shadow-xl backdrop-blur-md transition hover:border-accent-text"
                >
                  <div>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent-text">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-text">
                      {reason.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                      {reason.description}
                    </p>
                  </div>
                </TiltCard>
              );
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
