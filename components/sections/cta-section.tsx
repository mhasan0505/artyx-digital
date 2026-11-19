"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TiltCard } from "@/components/motion/tilt-card";
import { SplitText } from "@/components/motion/split-text";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 text-text lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <TiltCard
          maxTilt={4}
          className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center shadow-2xl backdrop-blur-xl sm:p-16"
        >
          {/* Ambient subtle lighting: Dark Theme only (Rule 6) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden dark:block hidden">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--surface-2)] blur-3xl opacity-80" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--bg)] blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Rule 4: Eyebrow pill */}
            <div className="eyebrow-pill">
              <span className="pill-dot" />
              <span>Next Steps</span>
            </div>

            <SplitText
              text="Have a Business Goal in Mind? Let's Build It."
              as="h2"
              className="mt-5 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
            />

            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              Tell us what you want to improve, launch or grow. We&apos;ll help you
              identify the right next step with honest engineering and clear scope.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Rule 3: Primary CTA button */}
              <MagneticButton>
                <Link
                  href="/start-a-project/"
                  prefetch={false}
                  onClick={() =>
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Start a Project",
                      cta_location: "footer_cta_primary",
                    })
                  }
                  className="btn-primary inline-flex w-full items-center justify-center gap-2.5 px-8 py-4 text-base sm:w-auto"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticButton>

              {/* Rule 3: Secondary button */}
              <MagneticButton>
                <Link
                  href="/contact/"
                  prefetch={false}
                  onClick={() =>
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Talk to Our Team",
                      cta_location: "footer_cta_secondary",
                    })
                  }
                  className="btn-secondary inline-flex w-full items-center justify-center gap-2 px-7 py-4 text-base sm:w-auto"
                >
                  <MessageSquare className="h-4 w-4 text-accent-text" />
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
