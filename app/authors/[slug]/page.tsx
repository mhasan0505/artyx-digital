import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import {
  getAuthorBySlug,
  getArticlesByAuthor,
  INSIGHT_CATEGORIES,
} from "@/lib/content/insights";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/sections/cta-section";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: "artyx-editorial-team" }];
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Author Not Found | Artyx Digital",
    };
  }

  return {
    title: `${author.name} | Editorial Profile | Artyx Digital`,
    description: author.bio,
    alternates: {
      canonical: `https://artyx.digital/authors/${author.slug}/`,
    },
  };
}

export default async function AuthorProfilePage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const articles = getArticlesByAuthor(author.slug);

  return (
    <div className="bg-white">
      <section className="bg-[#0B1020] pt-28 pb-20 text-[#F8FAFC] lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Insights", path: "/insights/" },
              { name: author.name, path: `/authors/${author.slug}/` },
            ]}
            theme="dark"
          />

          <div className="rounded-3xl border border-slate-800 bg-[#121A30] p-8 sm:p-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Editorial Profile
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              {author.name}
            </h1>
            <div className="mt-1 text-sm font-medium text-blue-400">
              {author.role}
            </div>
            <p className="mt-4 text-base leading-relaxed text-[#CBD5E1]">
              {author.bio}
            </p>
            <div className="mt-5 rounded-xl border border-slate-800 bg-[#0B1020] p-4 text-xs text-slate-300">
              <strong className="text-white">Domain Credentials:</strong>{" "}
              {author.credentials}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[#0F172A] sm:text-3xl">
            Published Guides by {author.name} ({articles.length})
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {articles.map((article) => {
              const category = INSIGHT_CATEGORIES[article.primaryCategory];
              return (
                <article
                  key={article.slug}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-[#0078D7]">
                        {category?.shortName}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readingTimeMinutes} min read
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-[#0F172A]">
                      <Link
                        href={article.canonicalPath}
                        className="hover:text-[#0078D7]"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-[#475569]">{article.excerpt}</p>
                  </div>
                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <Link
                      href={article.canonicalPath}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0078D7]"
                    >
                      Read Full Guide
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

