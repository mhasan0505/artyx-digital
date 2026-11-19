"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import {
  getAllPublishedArticles,
  INSIGHT_CATEGORIES,
} from "@/lib/content/insights";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { SplitText } from "@/components/motion/split-text";

export function InsightsPreview() {
  const articles = getAllPublishedArticles().slice(0, 3);

  return (
    <section className="relative overflow-hidden border-t border-border bg-bg py-24 text-text lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-10 sm:flex-row sm:items-end">
          <div>
            {/* Rule 4: Eyebrow pill */}
            <div className="eyebrow-pill">
              <span className="pill-dot" />
              <span>Practical Guides &amp; Insights</span>
            </div>
            <SplitText
              text="Operational & Digital Growth Playbooks"
              as="h2"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
            />
            <p className="mt-2.5 max-w-2xl text-base text-text-muted">
              Decision guides on retail POS systems, social-commerce order management,
              business websites, and technical search visibility.
            </p>
          </div>

          {/* Rule 3: Secondary button */}
          <Link
            href="/insights/"
            prefetch={false}
            className="btn-secondary inline-flex items-center gap-2 self-start px-5 py-3 text-sm"
          >
            Browse All Insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <StaggerReveal className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3" itemSelector=".insight-card">
          {articles.map((article) => {
            const category = INSIGHT_CATEGORIES[article.primaryCategory];
            return (
              <TiltCard
                key={article.slug}
                maxTilt={6}
                className="insight-card rounded-3xl border border-border bg-surface p-7 shadow-xl backdrop-blur-md transition hover:border-accent-text"
              >
                <Link
                  href={article.canonicalPath}
                  prefetch={false}
                  className="group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="rounded-full bg-surface-2 border border-border px-3 py-1 font-semibold text-text-muted">
                        {category?.shortName || "Insight"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-text-muted">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readingTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-text transition group-hover:text-accent-text">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-text transition group-hover:text-accent-text">
                    <span>Read Guide</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-accent-text" />
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
