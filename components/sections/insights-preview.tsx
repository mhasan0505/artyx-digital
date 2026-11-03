"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import {
  getAllPublishedArticles,
  INSIGHT_CATEGORIES,
} from "@/lib/content/insights";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";

export function InsightsPreview() {
  const articles = getAllPublishedArticles().slice(0, 3);

  return (
    <section className="bg-[#070B18] py-24 text-white lg:py-28 relative overflow-hidden border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-800 pb-10 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              <BookOpen className="h-3.5 w-3.5" />
              Practical Guides &amp; Insights
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Operational &amp; Digital Growth Playbooks
            </h2>
            <p className="mt-2.5 max-w-2xl text-base text-[#94A3B8]">
              Decision guides on retail POS systems, social-commerce order management,
              business websites, and technical search visibility.
            </p>
          </div>

          <Link
            href="/insights/"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-700 bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
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
                glowColor="rgba(0, 229, 255, 0.15)"
                className="insight-card rounded-3xl border border-slate-800 bg-[#0C1326]/90 p-7 shadow-xl backdrop-blur-md transition hover:border-slate-700"
              >
                <Link
                  href={article.canonicalPath}
                  className="group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 font-semibold text-cyan-300">
                        {category?.shortName || "Insight"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readingTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white transition group-hover:text-cyan-300">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs font-semibold text-cyan-400">
                    <span>Read Guide</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
