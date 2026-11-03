"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TiltCard } from "@/components/motion/tilt-card";

export function CTASection() {
  return (
    <section className="bg-[#050814] py-24 text-[#F8FAFC] lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <TiltCard
          maxTilt={4}
          glowColor="rgba(0, 229, 255, 0.2)"
          className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0F172A] via-[#0B1020] to-[#060A16] p-10 text-center shadow-2xl backdrop-blur-xl sm:p-16"
        >
          {/* Ambient glowing orbs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Next Steps
            </span>

            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Have a Business Goal in Mind? Let&apos;s Build It.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#CBD5E1]">
              Tell us what you want to improve, launch or grow. We&apos;ll help you
              identify the right next step with honest engineering and clear scope.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton>
                <Link
                  href="/start-a-project/"
                  onClick={() =>
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Start a Project",
                      cta_location: "footer_cta_primary",
                    })
                  }
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0078D7] to-[#0099FF] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#0078D7]/30 transition hover:shadow-cyan-500/30 hover:brightness-110 sm:w-auto"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/contact/"
                  onClick={() =>
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Talk to Our Team",
                      cta_location: "footer_cta_secondary",
                    })
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#0B1020]/90 px-7 py-4 text-base font-semibold text-slate-200 backdrop-blur-sm transition hover:border-cyan-400/50 hover:text-white sm:w-auto"
                >
                  <MessageSquare className="h-4 w-4 text-cyan-400" />
                  Talk to Our Team
                </Link>
              </MagneticButton>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
