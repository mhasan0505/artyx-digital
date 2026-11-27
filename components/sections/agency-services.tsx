import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

interface ServiceItem {
  title: string;
  description: string;
  tag: string;
  href: string;
  icon: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across Meta, Google & beyond that convert targeted attention into measurable revenue.",
    tag: "Strategy",
    href: "/services/digital-marketing/",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        stroke="#00C2FF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="4 20 11 13 16 17 24 8" />
        <polyline points="18 8 24 8 24 14" />
        <line x1="4" y1="24" x2="24" y2="24" />
      </svg>
    ),
  },
  {
    title: "Brand Identity",
    description:
      "Logo, visual language, typography and brand guidelines — everything you need to look credible from day one.",
    tag: "Identity",
    href: "/services/branding/",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        stroke="#00C2FF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="14 3 24 11 14 25 4 11 14 3" />
        <line x1="4" y1="11" x2="24" y2="11" />
        <polyline points="14 3 10 11 14 25 18 11 14 3" />
      </svg>
    ),
  },
  {
    title: "Web & App Development",
    description:
      "Custom websites, e-commerce storefronts, POS & OMS systems, and full-stack web apps built on modern stacks.",
    tag: "Engineering",
    href: "/services/web-development/",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        stroke="#00C2FF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="9 8 3 14 9 20" />
        <polyline points="19 8 25 14 19 20" />
        <line x1="16" y1="5" x2="12" y2="23" />
      </svg>
    ),
  },
  {
    title: "Social Media & E-commerce",
    description:
      "Content strategy, storefront design, social-commerce order flows and community management across platforms.",
    tag: "Commerce",
    href: "/services/ecommerce-website-development/",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        stroke="#00C2FF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="10" height="9" rx="2" />
        <rect x="15" y="4" width="10" height="9" rx="2" />
        <rect x="3" y="15" width="10" height="9" rx="2" />
        <path d="M15 17a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5l-3-2h-5a2 2 0 0 1-2-2v-1z" />
      </svg>
    ),
  },
  {
    title: "Custom Software & SaaS",
    description:
      "Tailored internal tools, Artyx POS & OMS deployments, inventory automation and multi-tenant SaaS platforms.",
    tag: "Software",
    href: "/services/custom-software/",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        stroke="#00C2FF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="14 4 24 9.5 14 15 4 9.5 14 4" />
        <polyline points="4 14.5 14 20 24 14.5" />
        <polyline points="4 19.5 14 25 24 19.5" />
      </svg>
    ),
  },
  {
    title: "SEO & Performance",
    description:
      "Organic search growth, technical SEO audits and conversion optimization that compound month over month.",
    tag: "Growth",
    href: "/services/digital-marketing/",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        stroke="#00C2FF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12.5" cy="12.5" r="7.5" />
        <circle cx="12.5" cy="12.5" r="3" />
        <line x1="18" y1="18" x2="24" y2="24" />
      </svg>
    ),
  },
];

export function AgencyServices() {
  return (
    <section id="services" className="bg-[#05091A] py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Left-Aligned Section Header */}
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#00C2FF]">What We Do</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[48px] lg:leading-[1.1]">
              Full-Service Agency, Zero Compromise
            </h2>
          </div>

          {/* 3-Column Glassmorphic Cards Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.title}
                href="/#contact"
                className="glass-card glass-card-hover group flex flex-col justify-between p-7"
              >
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] border border-[#1E2D5A] bg-[#111B40]/80">
                    {service.icon}
                  </div>
                  <h3 className="font-display mt-6 text-xl font-semibold text-white transition-colors group-hover:text-[#00C2FF]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8A9BC4]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-2">
                  <span className="inline-flex items-center rounded-full border border-[#1E2D5A] bg-[#111B40] px-3 py-1 text-xs font-medium text-[#00C2FF]">
                    {service.tag}
                  </span>
                  <span className="text-xs font-medium text-[#8A9BC4] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#00C2FF]">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
