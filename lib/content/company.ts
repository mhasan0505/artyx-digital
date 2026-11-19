export const COMPANY_ENTITY = {
  name: "Artyx Digital",
  legalName: "Artyx Digital",
  url: "https://artyx.digital/",
  organizationId: "https://artyx.digital/#organization",
  websiteId: "https://artyx.digital/#website",
  logoPath: "/logo-compact-for-dark-bg.png",
  logoUrl: "https://artyx.digital/logo-compact-for-dark-bg.png",
  tagline: "Build. Launch. Grow.",
  positioningStatement:
    "Artyx Digital helps ambitious businesses build better digital experiences, operate smarter with technology and grow through digital marketing.",
  supportingMessage:
    "From high-performing websites and custom software to business management systems and digital growth, we bring the technology and expertise businesses need to move forward.",
  consistentDescription:
    "Artyx Digital is a Dhaka-based digital technology and growth company offering web development, e-commerce development, custom software, POS, order management, branding, and digital marketing services.",
  email: "hello@artyx.digital",
  phoneDisplay: "+880 1732-549551",
  phoneE164: "+8801732549551",
  whatsappNumber: "8801732549551",
  whatsappUrl: "https://wa.me/8801732549551",
  address: {
    streetAddress: "18/3 Jahurabad, Mirpur",
    addressLocality: "Dhaka",
    postalCode: "1216",
    addressCountry: "BD",
    fullDisplay: "18/3 Jahurabad, Mirpur, Dhaka-1216, Bangladesh",
  },
  operatingTimezone: "Asia/Dhaka (GMT+6)",
  operatingHoursDisplay: "Sunday – Thursday (Asia/Dhaka, GMT+6)",
  responseSlaStatement:
    "Inquiries reviewed promptly during active business hours.",
  privacyNoticeVersion: "2026-10-v1",
} as const;

export interface BusinessPillar {
  id: string;
  title: string;
  summary: string;
  offerings: string[];
  audience: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
}

export const THREE_BUSINESS_PILLARS: BusinessPillar[] = [
  {
    id: "digital-experiences",
    title: "Digital Experiences",
    summary:
      "Build a digital presence that represents your business and turns visitors into customers.",
    offerings: [
      "Business Website Development",
      "E-commerce Website Development",
      "Custom Web Applications",
      "Branding & Visual Identity",
    ],
    audience: "Startups, SMEs, and established businesses",
    ctaLabel: "Explore Services",
    ctaHref: "/services/",
    accentColor: "#7FFF00",
  },
  {
    id: "business-technology",
    title: "Business Technology",
    summary:
      "Make everyday business operations easier with software designed around your workflow.",
    offerings: [
      "Artyx POS Software",
      "Artyx Order Management System (OMS)",
      "Custom Software Development",
      "SaaS Product Development",
    ],
    audience: "Retailers, online sellers, and growing businesses",
    ctaLabel: "Explore Products",
    ctaHref: "/products/",
    accentColor: "#8B5CF6",
  },
  {
    id: "digital-growth",
    title: "Digital Growth",
    summary:
      "Reach the right audience, improve visibility and create a stronger customer acquisition system.",
    offerings: [
      "Search Engine Optimization (SEO)",
      "Technical SEO & Site Audits",
      "Paid Advertising (Search & Social)",
      "Content Strategy & Conversion Optimization",
    ],
    audience: "Businesses seeking search visibility and qualified leads",
    ctaLabel: "Grow Your Business",
    ctaHref: "/services/digital-marketing/",
    accentColor: "#10B981",
  },
];

export const WHY_ARTYX_REASONS = [
  {
    title: "Business-focused thinking",
    description:
      "Every website, software system, or campaign starts with your operational and commercial objectives—not technology for its own sake.",
  },
  {
    title: "Technology expertise under one roof",
    description:
      "We combine custom engineering, e-commerce architecture, and owned business software products (POS and OMS) within one coordinated team.",
  },
  {
    title: "Connected services",
    description:
      "Strategy, brand identity, web engineering, operational software, and search growth work together so you do not have to manage disconnected vendors.",
  },
  {
    title: "Long-term partnership",
    description:
      "Structured onboarding, clear documentation, and post-launch maintenance or optimization support where included in your agreed scope.",
  },
] as const;

export const DELIVERY_PROCESS_STEPS = [
  {
    stepNumber: "01",
    title: "Discover",
    description:
      "Understand your business model, current operational bottlenecks, target customers, and commercial objectives.",
  },
  {
    stepNumber: "02",
    title: "Strategize",
    description:
      "Define the right technical or growth solution, clear deliverables, milestones, and project scope.",
  },
  {
    stepNumber: "03",
    title: "Design",
    description:
      "Create the user experience, interface architecture, database schema, or brand direction for approval.",
  },
  {
    stepNumber: "04",
    title: "Build",
    description:
      "Develop, integrate, and rigorously test the solution across mobile, tablet, and desktop environments.",
  },
  {
    stepNumber: "05",
    title: "Launch",
    description:
      "Deploy to production with technical SEO, analytics, security checks, and practical team onboarding.",
  },
  {
    stepNumber: "06",
    title: "Improve",
    description:
      "Provide agreed post-launch maintenance, performance monitoring, and iterative conversion optimization.",
  },
] as const;

/**
 * Verified capability & portfolio evidence strip for the homepage (Draft v2 Section 3.1).
 * Replaces duplicate placeholder counters ("150+ Projects / 99%") with factual, verifiable statements.
 */
export const VERIFIED_TRUST_EVIDENCE = [
  {
    label: "Three Connected Pillars",
    value: "Web · Software · Growth",
    detail: "Agency engineering + owned POS & OMS software products",
  },
  {
    label: "Markets Served",
    value: "Bangladesh & Global",
    detail: "Dhaka engineering hub supporting local & international clients",
  },
  {
    label: "Delivered Work",
    value: "4 Case Studies",
    detail: "Documented brand, web & e-commerce engagements in our portfolio",
  },
  {
    label: "Direct Scoping",
    value: "Engineering Consultation",
    detail: "Direct technical follow-up with our product team for project inquiries",
  },
] as const;

