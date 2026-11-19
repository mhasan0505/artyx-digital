import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ArrowRight } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Our Work & Case Studies | Artyx Digital",
  description:
    "Explore selected website, e-commerce, branding, and visual identity projects delivered by Artyx Digital with transparent scope and deliverables.",
  alternates: {
    canonical: "https://artyx.digital/work/",
  },
  openGraph: {
    title: "Our Work & Case Studies | Artyx Digital",
    description:
      "Documented brand identity, website, and e-commerce case studies delivered by Artyx Digital.",
    url: "https://artyx.digital/work/",
    type: "website",
  },
};

export default function WorkOverviewPage() {
  const projects = getAllProjects();

  return (
    <div className="bg-bg text-text min-h-screen">
      {/* Dark Hero */}
      <section className="bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Our Work", path: "/work/" }]} theme="light" />

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-surface-20/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              Portfolio &amp; Case Studies
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
              Work Designed to Help Businesses Move Forward.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-text-muted sm:text-xl">
              Explore selected website, e-commerce, branding and visual identity projects
              delivered by Artyx Digital. Every case study documents our exact role,
              scope, and relationship transparently.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {projects.map((project) => {
              return (
                <article
                  key={project.slug}
                  className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface shadow-xs transition hover:border-border/40 hover:bg-surface hover:shadow-xl"
                >
                  <div>
                    <Link
                      href={`/work/${project.slug}/`}
                      className={`relative block aspect-[16/10] w-full overflow-hidden ${project.bg} border-b border-border`}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.category}`}
                        fill
                        className="object-contain pt-16 pb-6 px-6 transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text shadow-xs">
                          {project.relationshipType}
                        </span>
                        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted shadow-xs">
                          {project.industry}
                        </span>
                      </div>
                    </Link>

                    <div className="p-8">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-accent-text">
                        <span>{project.category}</span>
                        <span className="text-text-muted">{project.year}</span>
                      </div>

                      <h2 className="mt-2 font-display text-2xl font-bold text-text">
                        <Link
                          href={`/work/${project.slug}/`}
                          className="hover:text-accent-text"
                        >
                          {project.title}
                        </Link>
                      </h2>

                      <p className="mt-3 text-sm leading-relaxed text-text-muted">
                        {project.description}
                      </p>

                      <div className="mt-5 rounded-xl border border-border/90 bg-surface p-4 text-xs text-text-muted">
                        <strong className="text-text">Artyx Role &amp; Scope:</strong>{" "}
                        {project.roleAndScope}
                      </div>

                      <div className="mt-5">
                        <div className="text-xs font-bold uppercase tracking-wider text-text-muted">
                          Delivered Assets
                        </div>
                        <ul className="mt-2.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                          {project.deliverables.slice(0, 4).map((del) => (
                            <li
                              key={del}
                              className="flex items-start gap-2 text-xs text-text-muted"
                            >
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-text" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/80 bg-surface px-8 py-4">
                    <Link
                      href={`/work/${project.slug}/`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:text-accent-text"
                    >
                      View Full Case Study
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/services/${project.relatedServiceSlug}/`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-text-muted hover:text-text"
                    >
                      Related Service
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

