import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

interface ServiceItem {
  title: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across Meta, Google & beyond that convert targeted attention into measurable revenue.",
    tag: "Strategy",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A56DB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="5" y1="20" x2="5" y2="14" />
        <line x1="10" y1="20" x2="10" y2="10" />
        <line x1="15" y1="20" x2="15" y2="12" />
        <line x1="20" y1="20" x2="20" y2="5" />
        <polyline points="4 10 10 5 15 8 20 3" />
      </svg>
    ),
  },
  {
    title: "Brand Identity",
    description:
      "Logo, visual language, typography and brand guidelines — everything you need to look credible from day one.",
    tag: "Identity",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A56DB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 21 9 12 22 3 9 12 2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <polyline points="12 2 8.5 9 12 22 15.5 9 12 2" />
      </svg>
    ),
  },
  {
    title: "Web & App Development",
    description:
      "Custom websites, e-commerce storefronts, POS & OMS systems, and web apps built on modern engineering stacks.",
    tag: "Engineering",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A56DB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="8 7 3 12 8 17" />
        <polyline points="16 7 21 12 16 17" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    title: "Social Media Management",
    description:
      "Content strategy, visual design, editorial scheduling and community management across Facebook, Instagram & LinkedIn.",
    tag: "Social",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A56DB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    title: "Video Production",
    description:
      "Commercial videos, high-retention reels, motion graphics and product shoots crafted to stop the scroll.",
    tag: "Production",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A56DB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9.5" />
        <polygon points="10 8.5 16 12 10 15.5 10 8.5" />
      </svg>
    ),
  },
  {
    title: "SEO & Performance",
    description:
      "Organic search growth, technical SEO audits and conversion rate optimization that compound month after month.",
    tag: "Growth",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A56DB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
];

export function AgencyServices() {
  return (
    <section
      id="services"
      className="section-pad border-b border-[#DDE3F5] bg-[#F5F7FF]"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Left-Aligned Section Heading */}
        <ScrollReveal variant="heading" className="max-w-2xl">
          <p className="text-[13px] font-medium tracking-[0.08em] text-[#1A56DB]">
            What We Do
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-[#0D1333] sm:text-4xl lg:text-[48px] lg:leading-[1.1]">
            Full-Service Agency,
            <br />
            Zero Compromise
          </h2>
        </ScrollReveal>

        {/* Staggered 3-Column Card Grid */}
        <ScrollReveal
          variant="grid"
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              href="/#contact"
              className="light-card light-card-hover group flex min-h-[240px] flex-col justify-between p-9"
            >
              <div>
                <div className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-[#EEF2FF]">
                  {service.icon}
                </div>
                <h3 className="font-display mt-6 text-[20px] font-semibold text-[#0D1333] transition-colors group-hover:text-[#1A56DB]">
                  {service.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-[#3D4A6B]">
                  {service.description}
                </p>
              </div>

              <div className="mt-7 flex items-center justify-between pt-2">
                <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-3.5 py-1 text-xs font-semibold text-[#1A56DB]">
                  {service.tag}
                </span>
                <span className="text-sm font-semibold text-[#3D4A6B] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#1A56DB]">
                  Inquire →
                </span>
              </div>
            </Link>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
