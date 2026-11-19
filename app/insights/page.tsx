import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar, Layers } from "lucide-react";
import {
  getAllInsightCategories,
  getAllPublishedArticles,
  INSIGHT_CATEGORIES,
} from "@/lib/content/insights";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Insights on Web, POS, Order Management & SEO | Artyx Digital",
  description:
    "Practical guides, playbooks, and technical checklists on business websites, retail POS software, online order management, e-commerce, and SEO.",
  alternates: {
    canonical: "https://artyx.digital/insights/",
  },
  openGraph: {
    title: "Insights on Web, POS, Order Management & SEO | Artyx Digital",
    description:
      "Decision guides and operational playbooks for growing businesses in Bangladesh and internationally.",
    url: "https://artyx.digital/insights/",
    type: "website",
  },
};

export default function InsightsIndexPage() {
  const categories = getAllInsightCategories();
  const articles = getAllPublishedArticles();
  const featuredArticle = articles[0];

  return (
    <div className="bg-bg text-text min-h-screen">
      {/* Dark Hero */}
      <section className="bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }]} theme="light" />

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-surface-20/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <BookOpen className="h-3.5 w-3.5" />
              Knowledge Base &amp; Decision Guides
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
              Practical Insights for Growing Businesses.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-text-muted sm:text-xl">
              Guides, articles and advice on websites, software, business automation,
              e-commerce and digital marketing.
            </p>
          </div>

          {/* Topic Cluster Pills */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            <Link
              href="/insights/"
              className="rounded-xl bg-btn-primary-bg px-4 py-2 text-xs font-semibold text-text"
            >
              All Topics ({articles.length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/insights/category/${cat.slug}/`}
                className="rounded-xl border border-border bg-surface-2 px-4 py-2 text-xs font-semibold text-text-muted transition hover:border-blue-400/50 hover:text-text"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guide */}
      {featuredArticle && (
        <section className="border-b border-border bg-surface py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm sm:p-12">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full bg-surface-2 px-3 py-1 font-semibold text-accent-text">
                  Featured Guide ·{" "}
                  {INSIGHT_CATEGORIES[featuredArticle.primaryCategory]?.name}
                </span>
                <span className="inline-flex items-center gap-1 text-text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredArticle.readingTimeMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1 text-text-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  Updated {featuredArticle.updatedAt}
                </span>
              </div>

              <h2 className="mt-4 font-display text-2xl font-bold text-text sm:text-3xl lg:text-4xl">
                <Link
                  href={featuredArticle.canonicalPath}
                  className="hover:text-accent-text"
                >
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-muted">
                {featuredArticle.answerFirstSummary}
              </p>

              <div className="mt-6">
                <Link
                  href={featuredArticle.canonicalPath}
                  className="inline-flex items-center gap-2 rounded-xl bg-btn-primary-bg px-6 py-3 text-sm font-semibold text-text transition hover:opacity-90"
                >
                  Read Complete Guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const category = INSIGHT_CATEGORIES[article.primaryCategory];
              return (
                <article
                  key={article.slug}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-7 shadow-xs transition hover:-translate-y-0.5 hover:border-border/40 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <Link
                        href={`/insights/category/${article.primaryCategory}/`}
                        className="rounded-full bg-surface-2 px-3 py-1 font-semibold text-accent-text hover:bg-blue-100"
                      >
                        {category?.shortName}
                      </Link>
                      <span className="inline-flex items-center gap-1 text-text-muted">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readingTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-text">
                      <Link
                        href={article.canonicalPath}
                        className="hover:text-accent-text"
                      >
                        {article.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                    <span className="text-text-muted">Updated {article.updatedAt}</span>
                    <Link
                      href={article.canonicalPath}
                      className="inline-flex items-center gap-1 font-semibold text-accent-text hover:text-accent-text"
                    >
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Topic Clusters Overview */}
          <div className="mt-20 border-t border-border pt-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-text">
              <Layers className="h-4 w-4" />
              Five Editorial Topic Clusters
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
              Explore Guides by Business Discipline
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div
                  key={cat.slug}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6"
                >
                  <div>
                    <span className="text-xs font-bold text-accent-text">
                      Cluster 0{cat.clusterNumber}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-text">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-text-muted">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-4 text-xs font-semibold">
                    <Link
                      href={`/insights/category/${cat.slug}/`}
                      className="text-accent-text hover:underline"
                    >
                      View Cluster Articles →
                    </Link>
                    <Link
                      href={cat.pillarHref}
                      className="text-text-muted hover:text-text"
                    >
                      Pillar Page
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

