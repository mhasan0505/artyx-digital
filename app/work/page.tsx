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
    <div className="bg-white">
      {/* Dark Hero */}
      <section className="bg-[#0B1020] pt-28 pb-20 text-[#F8FAFC] lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Our Work", path: "/work/" }]} theme="dark" />

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              Portfolio &amp; Case Studies
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Work Designed to Help Businesses Move Forward.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#CBD5E1] sm:text-xl">
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
              const isInHouse = project.relationshipType
                .toLowerCase()
                .includes("in-house");
              return (
                <article
                  key={project.slug}
                  className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-[#F8FAFC] shadow-xs transition hover:border-[#0078D7]/40 hover:bg-white hover:shadow-xl"
                >
                  <div>
                    <Link
                      href={`/work/${project.slug}/`}
                      className={`relative block aspect-[16/10] w-full overflow-hidden ${project.bg} border-b border-slate-200`}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.category}`}
                        fill
                        className="object-contain p-8 transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold shadow-xs ${
                            isInHouse
                              ? "border border-amber-500/40 bg-amber-950/90 text-amber-200"
                              : "border border-slate-700 bg-slate-900/90 text-slate-100"
                          }`}
                        >
                          {project.relationshipType}
                        </span>
                        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-800 shadow-xs">
                          {project.industry}
                        </span>
                      </div>
                    </Link>

                    <div className="p-8">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0078D7]">
                        <span>{project.category}</span>
                        <span className="text-slate-400">{project.year}</span>
                      </div>

                      <h2 className="mt-2 font-display text-2xl font-bold text-[#0F172A]">
                        <Link
                          href={`/work/${project.slug}/`}
                          className="hover:text-[#0078D7]"
                        >
                          {project.title}
                        </Link>
                      </h2>

                      <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                        {project.description}
                      </p>

                      <div className="mt-5 rounded-xl border border-slate-200/90 bg-white p-4 text-xs text-slate-700">
                        <strong className="text-slate-900">Artyx Role &amp; Scope:</strong>{" "}
                        {project.roleAndScope}
                      </div>

                      <div className="mt-5">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Delivered Assets
                        </div>
                        <ul className="mt-2.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                          {project.deliverables.slice(0, 4).map((del) => (
                            <li
                              key={del}
                              className="flex items-start gap-2 text-xs text-slate-700"
                            >
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/80 bg-white px-8 py-4">
                    <Link
                      href={`/work/${project.slug}/`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0078D7] hover:text-blue-700"
                    >
                      View Full Case Study
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/services/${project.relatedServiceSlug}/`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900"
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

