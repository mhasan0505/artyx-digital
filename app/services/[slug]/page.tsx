import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Cpu,
  FileText,
} from "lucide-react";
import {
  getAllServices,
  getServiceBySlug,
} from "@/lib/content/services";
import { getProjectsBySlugs } from "@/lib/projects";
import { buildServiceSchema, JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { AnswerFirstSection } from "@/components/seo/answer-first-section";
import { LeadSubmissionForm } from "@/components/forms/lead-submission-form";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServices().map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: "Service Not Found | Artyx Digital",
    };
  }

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://artyx.digital${service.canonicalPath}`,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
      url: `https://artyx.digital${service.canonicalPath}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = getProjectsBySlugs(service.relatedWorkSlugs);

  return (
    <div className="bg-bg text-text min-h-screen">
      <JsonLd
        data={buildServiceSchema({
          name: service.name,
          description: service.metaDescription,
          canonicalPath: service.canonicalPath,
        })}
      />

      {/* Section 1: Hero */}
      <section className="bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Services", path: "/services/" },
              { name: service.shortTitle, path: service.canonicalPath },
            ]}
            theme="light"
          />

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-surface-20/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              {service.pillar} · Agency Service
            </span>

            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:leading-[1.1]">
              {service.h1}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-text-muted sm:text-xl">
              {service.heroSupportingCopy}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#service-enquiry"
                className="inline-flex items-center gap-2 rounded-xl bg-btn-primary-bg px-7 py-4 text-base font-semibold text-text shadow-lg shadow-xs transition hover:opacity-90"
              >
                {service.primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href={service.secondaryCtaHref}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-6 py-4 text-base font-semibold text-text-muted transition hover:border-blue-400/50 hover:text-text"
              >
                {service.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: AEO Answer-First Section */}
      <AnswerFirstSection
        heading={`What Is ${service.name} at Artyx Digital?`}
        data={service.aeoAnswerFirst}
      />

      {/* Section 3: Business Problems & Core Deliverables */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Business Problems */}
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                When You Need This Service
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                Business Problems We Solve
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                If any of these bottlenecks sound familiar, our {service.shortTitle}{" "}
                scope is structured to resolve them directly.
              </p>

              <ul className="mt-6 space-y-3.5">
                {service.businessProblems.map((prob) => (
                  <li
                    key={prob}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-sm text-text"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-text">
                What We Deliver
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                Structured Deliverables &amp; Capabilities
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Practical deliverables engineered around your commercial objectives.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {service.deliverables.map((del) => (
                  <div
                    key={del.title}
                    className="rounded-2xl border border-border bg-surface p-6 shadow-xs"
                  >
                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-accent-text">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-text">
                      {del.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {del.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated #content-strategy anchor for Digital Marketing (supports /services/content-creation/ redirect) */}
      {service.slug === "digital-marketing" && (
        <section
          id="content-strategy"
          className="border-t border-border bg-surface-2/50 py-16"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl border border-blue-200 bg-surface p-8 shadow-xs sm:p-10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-text">
                <FileText className="h-4 w-4" />
                Integrated Content Strategy &amp; Production
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-text sm:text-3xl">
                Search-Aligned Content Creation That Supports Leads &amp; Authority
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted">
                Content creation at Artyx Digital is integrated directly into our SEO &amp;
                Digital Growth discipline so every landing page, buyer guide, product
                explainer, and social campaign asset serves a measurable search or
                conversion goal.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="text-sm font-bold text-text">
                    Service &amp; Product Copywriting
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    Clear, outcome-first website and landing page copy structured for
                    buyers and AI answer engines.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="text-sm font-bold text-text">
                    AEO &amp; Search Topic Clusters
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    Decision guides, comparison matrices, and technical checklists that
                    earn organic search demand.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="text-sm font-bold text-text">
                    Campaign Creative &amp; Ad Assets
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    Paid social and search ad creatives aligned with your brand guidelines
                    and landing page offers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Technical Capabilities, Stack & Process */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Technical Capabilities & Tech Stack */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-text">
                <Cpu className="h-4 w-4" />
                Engineering &amp; Execution Standards
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                Technical Capabilities
              </h2>
              <ul className="mt-6 space-y-3">
                {service.technicalCapabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 text-sm text-text"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <div className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Core Tools &amp; Technologies Used
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {service.relatedProductHref && (
                <div className="mt-8 rounded-2xl border border-purple-200 bg-purple-50/70 p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-800">
                    Connected Artyx Product
                  </div>
                  <p className="mt-1 text-sm text-text-muted">
                    Evaluating ready-to-deploy operational software alongside this
                    service?
                  </p>
                  <Link
                    href={service.relatedProductHref.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:text-purple-900"
                  >
                    {service.relatedProductHref.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Service Process Steps */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-text">
                Step-by-Step Delivery
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-text">
                How We Deliver {service.shortTitle}
              </h2>
              <div className="mt-6 space-y-4">
                {service.processSteps.map((step, idx) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 font-display text-sm font-bold text-accent-text">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-text">
                        {step.step}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Related Portfolio Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-text">
                  Relevant Proof
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold text-text">
                  Selected Work &amp; Related Case Studies
                </h2>
              </div>
              <Link
                href="/work/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:text-accent-text"
              >
                View All Case Studies
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProjects.slice(0, 3).map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}/`}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-border/40 hover:bg-surface hover:shadow-lg"
                >
                  <div>
                    <div
                      className={`relative aspect-[16/10] w-full overflow-hidden ${project.bg} border-b border-border`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-text">
                        {project.relationshipType}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-bold text-text group-hover:text-accent-text">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-text-muted">
                        {project.roleAndScope}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/80 px-6 py-3.5 text-xs font-semibold text-accent-text">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 6: Service FAQs */}
      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-text">
              <HelpCircle className="h-3.5 w-3.5" />
              Service FAQs
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-text">
              Common Questions About {service.name}
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="font-display text-lg font-bold text-text">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Embedded Service Enquiry Form */}
      <section id="service-enquiry" className="bg-bg py-24 text-text">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-surface-20/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              Start Your Project
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-text sm:text-4xl">
              {service.primaryCtaLabel}
            </h2>
            <p className="mt-3 text-base text-text-muted">
              Share your goals, timeline, and budget range below. Our engineering &amp;
              strategy team responds within 2 staffed business hours (Sun–Thu, Dhaka
              GMT+6).
            </p>
          </div>

          <LeadSubmissionForm
            initialMode="service"
            defaultServiceSlug={service.slug}
            heading={`Request a ${service.shortTitle} Consultation`}
            subheading="Tell us about your project requirements and desired outcomes."
            submitLabel={service.primaryCtaLabel}
          />
        </div>
      </section>
    </div>
  );
}
