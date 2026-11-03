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
    <div className="bg-white">
      <JsonLd
        data={buildServiceSchema({
          name: service.name,
          description: service.metaDescription,
          canonicalPath: service.canonicalPath,
        })}
      />

      {/* Section 1: Hero */}
      <section className="bg-[#0B1020] pt-28 pb-20 text-[#F8FAFC] lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Services", path: "/services/" },
              { name: service.shortTitle, path: service.canonicalPath },
            ]}
            theme="dark"
          />

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              {service.pillar} · Agency Service
            </span>

            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:leading-[1.1]">
              {service.h1}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-[#CBD5E1] sm:text-xl">
              {service.heroSupportingCopy}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#service-enquiry"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0078D7] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#0078D7]/30 transition hover:bg-[#3B82F6]"
              >
                {service.primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href={service.secondaryCtaHref}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#121A30] px-6 py-4 text-base font-semibold text-slate-200 transition hover:border-blue-400/50 hover:text-white"
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
              <h2 className="mt-2 font-display text-3xl font-bold text-[#0F172A]">
                Business Problems We Solve
              </h2>
              <p className="mt-2 text-sm text-[#475569]">
                If any of these bottlenecks sound familiar, our {service.shortTitle}{" "}
                scope is structured to resolve them directly.
              </p>

              <ul className="mt-6 space-y-3.5">
                {service.businessProblems.map((prob) => (
                  <li
                    key={prob}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm text-[#0F172A]"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0078D7]">
                What We Deliver
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#0F172A]">
                Structured Deliverables &amp; Capabilities
              </h2>
              <p className="mt-2 text-sm text-[#475569]">
                Practical deliverables engineered around your commercial objectives.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {service.deliverables.map((del) => (
                  <div
                    key={del.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
                  >
                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0078D7]">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0F172A]">
                      {del.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">
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
          className="border-t border-slate-200 bg-blue-50/50 py-16"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl border border-blue-200 bg-white p-8 shadow-xs sm:p-10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0078D7]">
                <FileText className="h-4 w-4" />
                Integrated Content Strategy &amp; Production
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-[#0F172A] sm:text-3xl">
                Search-Aligned Content Creation That Supports Leads &amp; Authority
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#475569]">
                Content creation at Artyx Digital is integrated directly into our SEO &amp;
                Digital Growth discipline so every landing page, buyer guide, product
                explainer, and social campaign asset serves a measurable search or
                conversion goal.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                  <div className="text-sm font-bold text-slate-900">
                    Service &amp; Product Copywriting
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    Clear, outcome-first website and landing page copy structured for
                    buyers and AI answer engines.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                  <div className="text-sm font-bold text-slate-900">
                    AEO &amp; Search Topic Clusters
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    Decision guides, comparison matrices, and technical checklists that
                    earn organic search demand.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                  <div className="text-sm font-bold text-slate-900">
                    Campaign Creative &amp; Ad Assets
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
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
      <section className="border-y border-slate-200 bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Technical Capabilities & Tech Stack */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0078D7]">
                <Cpu className="h-4 w-4" />
                Engineering &amp; Execution Standards
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#0F172A]">
                Technical Capabilities
              </h2>
              <ul className="mt-6 space-y-3">
                {service.technicalCapabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 text-sm text-[#0F172A]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Core Tools &amp; Technologies Used
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
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
                  <p className="mt-1 text-sm text-slate-700">
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
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0078D7]">
                Step-by-Step Delivery
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#0F172A]">
                How We Deliver {service.shortTitle}
              </h2>
              <div className="mt-6 space-y-4">
                {service.processSteps.map((step, idx) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-display text-sm font-bold text-[#0078D7]">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#0F172A]">
                        {step.step}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#475569]">
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
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0078D7]">
                  Relevant Proof
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold text-[#0F172A]">
                  Selected Work &amp; Related Case Studies
                </h2>
              </div>
              <Link
                href="/work/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0078D7] hover:text-blue-700"
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
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] transition hover:border-[#0078D7]/40 hover:bg-white hover:shadow-lg"
                >
                  <div>
                    <div
                      className={`relative aspect-[16/10] w-full overflow-hidden ${project.bg} border-b border-slate-200`}
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
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0078D7]">
                        {project.relationshipType}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-bold text-[#0F172A] group-hover:text-[#0078D7]">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                        {project.roleAndScope}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/80 px-6 py-3.5 text-xs font-semibold text-[#0078D7]">
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
      <section className="border-t border-slate-200 bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#0078D7]">
              <HelpCircle className="h-3.5 w-3.5" />
              Service FAQs
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#0F172A]">
              Common Questions About {service.name}
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-[#0F172A]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Embedded Service Enquiry Form */}
      <section id="service-enquiry" className="bg-[#0B1020] py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              Start Your Project
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              {service.primaryCtaLabel}
            </h2>
            <p className="mt-3 text-base text-[#CBD5E1]">
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
