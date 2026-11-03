import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Layers } from "lucide-react";
import {
  getAllInsightCategories,
  getInsightCategoryBySlug,
  getArticlesByCategory,
} from "@/lib/content/insights";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/sections/cta-section";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllInsightCategories().map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getInsightCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Artyx Digital",
    };
  }

  return {
    title: `${category.name} Guides & Insights | Artyx Digital`,
    description: category.description,
    alternates: {
      canonical: `https://artyx.digital/insights/category/${category.slug}/`,
    },
  };
}

export default async function InsightCategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = getInsightCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category.slug);
  const allCategories = getAllInsightCategories();

  return (
    <div className="bg-white">
      <section className="bg-[#0B1020] pt-28 pb-20 text-[#F8FAFC] lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Insights", path: "/insights/" },
              {
                name: category.name,
                path: `/insights/category/${category.slug}/`,
              },
            ]}
            theme="dark"
          />

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <Layers className="h-3.5 w-3.5" />
              Topic Cluster 0{category.clusterNumber}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {category.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[#CBD5E1]">
              {category.description}
            </p>

            <div className="mt-6">
              <Link
                href={category.pillarHref}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#121A30] px-5 py-3 text-sm font-semibold text-blue-300 transition hover:border-blue-400/50 hover:text-white"
              >
                Explore Core Pillar: {category.pillarTitle}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <Link
              href="/insights/"
              className="rounded-xl border border-slate-700 bg-[#121A30] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              All Topics
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/insights/category/${cat.slug}/`}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  cat.slug === category.slug
                    ? "bg-[#0078D7] text-white"
                    : "border border-slate-700 bg-[#121A30] text-slate-300 hover:text-white"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition hover:border-[#0078D7]/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-[#0078D7]">
                      {category.shortName}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold text-[#0F172A]">
                    <Link
                      href={article.canonicalPath}
                      className="hover:text-[#0078D7]"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                  <span className="text-slate-500">Updated {article.updatedAt}</span>
                  <Link
                    href={article.canonicalPath}
                    className="inline-flex items-center gap-1 font-semibold text-[#0078D7]"
                  >
                    Read Guide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

