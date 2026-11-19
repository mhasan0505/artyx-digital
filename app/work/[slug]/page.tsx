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
    <div className="bg-bg text-text min-h-screen">
      {/* Dark Hero */}
      <section className="bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Our Work", path: "/work/" },
              { name: project.title, path: `/work/${project.slug}/` },
            ]}
            theme="light"
          />

          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                isInHouse
                  ? "border border-amber-500/40 bg-amber-500/15 text-amber-200"
                  : "border border-blue-500/30 bg-surface-20/15 text-blue-300"
              }`}
            >
              {project.relationshipType}
            </span>
            <span className="rounded-full border border-border bg-surface-2 px-3.5 py-1 text-xs font-medium text-text-muted">
              {project.industry}
            </span>
            <span className="rounded-full border border-border bg-surface-2 px-3.5 py-1 text-xs font-medium text-text-muted">
              {project.category}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text-muted sm:text-xl">
            {project.description}
          </p>

          {/* Project Metadata Strip */}
          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-surface-2 p-4">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Briefcase className="h-3.5 w-3.5 text-accent-text" />
                Client / Organization
              </div>
              <div className="mt-1 text-sm font-semibold text-text">
                {project.client}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-2 p-4">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Layers className="h-3.5 w-3.5 text-accent-text" />
                Role &amp; Scope
              </div>
              <div className="mt-1 text-sm font-semibold text-text">
                {project.roleAndScope}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-2 p-4">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Clock className="h-3.5 w-3.5 text-accent-text" />
                Delivery Duration
              </div>
              <div className="mt-1 text-sm font-semibold text-text">
                {project.duration}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-2 p-4">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Calendar className="h-3.5 w-3.5 text-accent-text" />
                Delivery Year
              </div>
              <div className="mt-1 text-sm font-semibold text-text">
                {project.year}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Visual */}
      <section className="border-b border-border bg-surface py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div
            className={`relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border ${project.coverBg} shadow-lg`}
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
                <span className="text-xs font-bold uppercase tracking-wider text-accent-text">
                  01 · Business Context
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                  The Challenge
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  {project.challenge}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-text">
                  02 · Strategic Execution
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                  Our Solution &amp; Approach
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  {project.solution}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-text">
                  03 · Scope Delivered
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                  Concrete Deliverables
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.deliverables.map((del) => (
                    <li
                      key={del}
                      className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-4 text-sm font-medium text-text"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar: Documented Outcomes, Tools & Related Service */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-3xl border border-border bg-surface p-7">
                <h3 className="font-display text-lg font-bold text-text">
                  Documented Scope &amp; Deliverables Summary
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {project.results.map((res) => (
                    <div
                      key={res.label}
                      className="rounded-2xl border border-border bg-surface p-4"
                    >
                      <div className="font-display text-xl font-bold text-accent-text">
                        {res.metric}
                      </div>
                      <div className="mt-1 text-xs text-text-muted">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-surface p-7">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Tools &amp; Disciplines Applied
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {relatedService && (
                <div className="rounded-3xl border border-blue-200 bg-surface-2/70 p-7">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-text">
                    Related Service
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-text">
                    {relatedService.name}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">
                    {relatedService.shortOutcomeSummary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={relatedService.canonicalPath}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-btn-primary-bg px-4 py-2.5 text-xs font-semibold text-text transition hover:opacity-90"
                    >
                      Explore {relatedService.shortTitle}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/start-a-project/?service=${relatedService.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-text transition hover:border-border"
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
        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
                Visual System &amp; Deliverable Plates ({project.images.length})
              </h2>
              <Link
                href="/work/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:text-accent-text"
              >
                <ArrowLeft className="h-4 w-4" />
                All Projects
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {project.images.map((img, index) => (
                <figure
                  key={`${img.src}-${index}`}
                  className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xs"
                >
                  <div
                    className={`relative aspect-[16/10] w-full ${img.bg} border-b border-border`}
                  >
                    <Image
                      src={img.src}
                      alt={`${project.title} — ${img.label}`}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className="px-5 py-3.5 text-xs font-medium text-text-muted">
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

