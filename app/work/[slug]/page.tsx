import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Calendar,
  Clock,
  Layers,
} from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { getServiceBySlug } from "@/lib/content/services";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/sections/cta-section";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found | Artyx Digital",
    };
  }

  return {
    title: `${project.title} Case Study | Artyx Digital`,
    description: project.description,
    alternates: {
      canonical: `https://artyx.digital/work/${project.slug}/`,
    },
    openGraph: {
      title: `${project.title} Case Study | Artyx Digital`,
      description: project.description,
      url: `https://artyx.digital/work/${project.slug}/`,
      type: "article",
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedService = getServiceBySlug(project.relatedServiceSlug);
  const isInHouse = project.relationshipType.toLowerCase().includes("in-house");

  return (
    <div className="bg-white">
      {/* Dark Hero */}
      <section className="bg-[#0B1020] pt-28 pb-20 text-[#F8FAFC] lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Our Work", path: "/work/" },
              { name: project.title, path: `/work/${project.slug}/` },
            ]}
            theme="dark"
          />

          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                isInHouse
                  ? "border border-amber-500/40 bg-amber-500/15 text-amber-200"
                  : "border border-blue-500/30 bg-blue-500/15 text-blue-300"
              }`}
            >
              {project.relationshipType}
            </span>
            <span className="rounded-full border border-slate-700 bg-[#121A30] px-3.5 py-1 text-xs font-medium text-slate-300">
              {project.industry}
            </span>
            <span className="rounded-full border border-slate-700 bg-[#121A30] px-3.5 py-1 text-xs font-medium text-slate-300">
              {project.category}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#CBD5E1] sm:text-xl">
            {project.description}
          </p>

          {/* Project Metadata Strip */}
          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-[#121A30] p-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Briefcase className="h-3.5 w-3.5 text-blue-400" />
                Client / Organization
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                {project.client}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#121A30] p-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Layers className="h-3.5 w-3.5 text-blue-400" />
                Role &amp; Scope
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                {project.roleAndScope}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#121A30] p-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                Delivery Duration
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                {project.duration}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#121A30] p-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                Delivery Year
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                {project.year}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Visual */}
      <section className="border-b border-slate-200 bg-[#F8FAFC] py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div
            className={`relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 ${project.coverBg} shadow-lg`}
          >
            <Image
              src={project.coverImage}
              alt={`${project.title} — Primary Brand & Interface Overview`}
              fill
              priority
              className="object-contain p-8 sm:p-14"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
          </div>
        </div>
      </section>

      {/* Challenge, Solution, Deliverables & Documented Outcomes */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0078D7]">
                  01 · Business Context
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#0F172A] sm:text-3xl">
                  The Challenge
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#475569]">
                  {project.challenge}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0078D7]">
                  02 · Strategic Execution
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#0F172A] sm:text-3xl">
                  Our Solution &amp; Approach
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#475569]">
                  {project.solution}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0078D7]">
                  03 · Scope Delivered
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#0F172A] sm:text-3xl">
                  Concrete Deliverables
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.deliverables.map((del) => (
                    <li
                      key={del}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm font-medium text-[#0F172A]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar: Documented Outcomes, Tools & Related Service */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7">
                <h3 className="font-display text-lg font-bold text-[#0F172A]">
                  Documented Scope &amp; Deliverables Summary
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {project.results.map((res) => (
                    <div
                      key={res.label}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="font-display text-xl font-bold text-[#0078D7]">
                        {res.metric}
                      </div>
                      <div className="mt-1 text-xs text-slate-600">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tools &amp; Disciplines Applied
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {relatedService && (
                <div className="rounded-3xl border border-blue-200 bg-blue-50/70 p-7">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0078D7]">
                    Related Service
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-[#0F172A]">
                    {relatedService.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#475569]">
                    {relatedService.shortOutcomeSummary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={relatedService.canonicalPath}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0078D7] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                    >
                      Explore {relatedService.shortTitle}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/start-a-project/?service=${relatedService.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition hover:border-[#0078D7]"
                    >
                      Start a Similar Project
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Visual Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="border-t border-slate-200 bg-[#F8FAFC] py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-[#0F172A] sm:text-3xl">
                Visual System &amp; Deliverable Plates ({project.images.length})
              </h2>
              <Link
                href="/work/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0078D7] hover:text-blue-700"
              >
                <ArrowLeft className="h-4 w-4" />
                All Projects
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {project.images.map((img, index) => (
                <figure
                  key={`${img.src}-${index}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"
                >
                  <div
                    className={`relative aspect-[16/10] w-full ${img.bg} border-b border-slate-100`}
                  >
                    <Image
                      src={img.src}
                      alt={`${project.title} — ${img.label}`}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className="px-5 py-3.5 text-xs font-medium text-slate-600">
                    {img.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}

