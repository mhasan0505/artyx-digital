import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  UserCheck,
  BookOpen,
} from "lucide-react";
import {
  getAllPublishedArticles,
  getArticleBySlug,
  getAuthorBySlug,
  INSIGHT_CATEGORIES,
} from "@/lib/content/insights";
import { buildArticleSchema, JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/sections/cta-section";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPublishedArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Artyx Digital",
    };
  }

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `https://artyx.digital${article.canonicalPath}`,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: `https://artyx.digital${article.canonicalPath}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function InsightArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = INSIGHT_CATEGORIES[article.primaryCategory];
  const author = getAuthorBySlug(article.authorSlug);
  const relatedArticles = article.relatedArticleSlugs
    .map((s) => getArticleBySlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div className="bg-bg text-text min-h-screen">
      <JsonLd
        data={buildArticleSchema({
          title: article.title,
          description: article.metaDescription,
          canonicalPath: article.canonicalPath,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          authorName: author?.name || "Artyx Digital Editorial Team",
          authorSlug: article.authorSlug,
        })}
      />

      {/* Article Hero */}
      <section className="bg-bg pt-28 pb-16 text-text lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Insights", path: "/insights/" },
              ...(category
                ? [
                    {
                      name: category.shortName,
                      path: `/insights/category/${category.slug}/`,
                    },
                  ]
                : []),
              { name: article.title, path: article.canonicalPath },
            ]}
            theme="light"
          />

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {category && (
              <Link
                href={`/insights/category/${category.slug}/`}
                className="rounded-full bg-surface-20/20 px-3 py-1 font-semibold text-blue-300 hover:bg-surface-20/30"
              >
                {category.name}
              </Link>
            )}
            <span className="inline-flex items-center gap-1 text-text-muted">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTimeMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1 text-text-muted">
              <Calendar className="h-3.5 w-3.5" />
              Published {article.publishedAt} · Updated {article.updatedAt}
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            {article.title}
          </h1>

          {/* Author & Editorial Review Metadata */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-text-muted">
            <div>
              Written by{" "}
              <Link
                href={`/authors/${article.authorSlug}/`}
                className="font-semibold text-text underline hover:text-blue-300"
              >
                {author?.name || "Artyx Digital Editorial Team"}
              </Link>
              {author?.role ? ` (${author.role})` : ""}
            </div>
            <div className="inline-flex items-center gap-1.5 text-emerald-300">
              <UserCheck className="h-4 w-4" />
              Reviewed by: {article.editorialReviewer}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Article Body */}
            <article className="lg:col-span-8">
              {/* Answer-First Summary Box (AEO/GEO) */}
              <div className="mb-10 rounded-2xl border border-blue-200 bg-surface p-6 sm:p-8">
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-text">
                  <BookOpen className="h-4 w-4" />
                  Executive Summary (Direct Answer)
                </div>
                <p className="text-base font-medium leading-relaxed text-text">
                  {article.answerFirstSummary}
                </p>
              </div>

              {/* Content Sections */}
              <div className="space-y-12">
                {article.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-relaxed text-text-muted">
                      {section.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-5 space-y-2.5 rounded-2xl border border-border bg-surface p-6">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-sm font-medium text-text"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Practical Action Checklist */}
              {article.practicalChecklist.length > 0 && (
                <div className="mt-14 rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8">
                  <h2 className="font-display text-2xl font-bold text-text">
                    Practical Evaluation &amp; Action Checklist
                  </h2>
                  <p className="mt-1 text-sm text-text-muted">
                    Use these criteria when evaluating this workflow for your business:
                  </p>
                  <ul className="mt-5 space-y-3">
                    {article.practicalChecklist.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm font-medium text-text"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Author Bio Box */}
              {author && (
                <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    About the Author
                  </div>
                  <div className="mt-2 font-display text-lg font-bold text-text">
                    <Link
                      href={`/authors/${author.slug}/`}
                      className="hover:text-accent-text"
                    >
                      {author.name}
                    </Link>
                  </div>
                  <div className="text-xs font-medium text-accent-text">
                    {author.role}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {author.bio}
                  </p>
                </div>
              )}
            </article>

            {/* Right Sidebar: Table of Contents & Related Service/Product */}
            <aside className="space-y-8 lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    In This Guide
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {article.sections.map((sec) => (
                      <li key={sec.id}>
                        <a
                          href={`#${sec.id}`}
                          className="text-text-muted transition hover:text-accent-text"
                        >
                          {sec.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Service or Product CTA */}
                <div className="rounded-2xl border border-border bg-bg p-6 text-text">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-text">
                    How Artyx Can Help
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-text">
                    {article.relatedServiceOrProduct.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    {article.relatedServiceOrProduct.description}
                  </p>
                  <Link
                    href={article.relatedServiceOrProduct.href}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-btn-primary-bg px-4 py-3 text-xs font-semibold text-text transition hover:bg-surface-20"
                  >
                    {article.relatedServiceOrProduct.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="rounded-2xl border border-border bg-surface p-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                      Related Guides
                    </h3>
                    <div className="mt-4 space-y-4">
                      {relatedArticles.map((rel) => (
                        <div
                          key={rel.slug}
                          className="border-b border-border pb-3 last:border-b-0 last:pb-0"
                        >
                          <Link
                            href={rel.canonicalPath}
                            className="text-sm font-semibold text-text hover:text-accent-text"
                          >
                            {rel.title}
                          </Link>
                          <div className="mt-1 text-xs text-text-muted">
                            {rel.readingTimeMinutes} min read
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

