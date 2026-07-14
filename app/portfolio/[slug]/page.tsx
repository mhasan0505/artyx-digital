import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getProjectBySlug } from "@/lib/projects";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
        {/* Abstract background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-48 h-48 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#0078d7"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="absolute bottom-20 left-20 w-40 h-40 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon
                points="100,20 180,180 20,180"
                fill="none"
                stroke="#0078d7"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-artyx-brand/5 text-artyx-brand text-sm font-medium mb-6">
              {project.category}
            </span>
          </ScrollReveal>
          <AnimatedText
            text={project.title}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
            delay={0.2}
            staggerDelay={0.03}
          />
          <ScrollReveal delay={0.4}>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              {project.description}
            </p>
          </ScrollReveal>

          {/* Project Meta */}
          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                  Client
                </div>
                <div className="text-gray-900 font-medium">
                  {project.client}
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                  Year
                </div>
                <div className="text-gray-900 font-medium">{project.year}</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                  Duration
                </div>
                <div className="text-gray-900 font-medium">
                  {project.duration}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cover Image */}
      <section className="py-0 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          <ScrollReveal>
            <div
              className={`relative h-64 sm:h-80 rounded-3xl overflow-hidden ${project.coverBg} border border-gray-200 shadow-sm`}
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-contain p-10"
                sizes="(max-width: 1200px) 100vw, 896px"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Images */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={`grid gap-6 ${
              project.images.length === 1
                ? "grid-cols-1 max-w-2xl mx-auto"
                : project.images.length <= 3
                  ? "grid-cols-1 md:grid-cols-" + project.images.length
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {project.images.map((img, i) => (
              <ScrollReveal key={img.label} delay={i * 0.1}>
                <div
                  className={`relative aspect-4/3 rounded-2xl overflow-hidden ${img.bg} border border-gray-200`}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-black/10 backdrop-blur-sm text-gray-700 text-xs font-medium">
                      {img.label}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                The Challenge
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {project.challenge}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Solution
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {project.solution}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The <span className="text-artyx-brand">Results</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.map((result, i) => (
              <ScrollReveal key={result.label} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center">
                  <div
                    className={`text-3xl sm:text-4xl font-bold text-artyx-brand mb-2`}
                  >
                    {result.metric}
                  </div>
                  <div className="text-gray-500 text-sm">{result.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Technologies <span className="text-artyx-brand">Used</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm hover:border-artyx-brand/30 hover:text-artyx-brand transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Want Similar <span className="text-artyx-brand">Results</span>?
            </h2>
            <p className="text-gray-600 mb-8">
              Let's discuss how we can help your business achieve extraordinary
              growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                as="a"
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-artyx-brand text-white font-semibold hover:bg-artyx-brand/90 transition-colors"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <Link
                href="/portfolio"
                className="text-gray-500 hover:text-artyx-brand transition-colors text-sm"
              >
                ← View All Projects
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
