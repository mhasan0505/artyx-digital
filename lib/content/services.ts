import type { ServiceSlug } from "@/lib/validation/lead";

export interface AeoAnswerFirstBlock {
  whatItIs: string;
  whoItIsFor: string;
  problemItSolves: string;
  howItWorks: string;
  whatIsIncluded: string[];
  whatIsNotIncluded: string[];
  pricingApproach: string;
  onboardingProcess: string;
  howToEvaluateAlternatives: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceContentRecord {
  slug: ServiceSlug;
  releasePhase: "R1" | "R2";
  pillar: "Digital Experiences" | "Business Technology" | "Digital Growth";
  name: string;
  shortTitle: string;
  canonicalPath: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSupportingCopy: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  shortOutcomeSummary: string;
  businessProblems: string[];
  deliverables: ServiceDeliverable[];
  technicalCapabilities: string[];
  processSteps: Array<{ step: string; description: string }>;
  techStack: string[];
  aeoAnswerFirst: AeoAnswerFirstBlock;
  faqs: ServiceFAQ[];
  relatedWorkSlugs: string[];
  relatedProductHref?: { label: string; href: string };
}

export const SERVICES_CONTENT: Record<ServiceSlug, ServiceContentRecord> = {
  "web-development": {
    slug: "web-development",
    releasePhase: "R1",
    pillar: "Digital Experiences",
    name: "Web Development",
    shortTitle: "Web Development",
    canonicalPath: "/services/web-development/",
    seoTitle: "Website Development Company in Bangladesh | Artyx Digital",
    metaDescription:
      "Artyx Digital designs and builds fast, accessible, search-ready business websites, corporate sites, landing pages, and custom web applications in Bangladesh and internationally.",
    h1: "Business Websites Built to Support Your Next Stage of Growth.",
    heroSupportingCopy:
      "We design and develop modern corporate websites, landing pages, and custom web applications that establish credibility, communicate your value clearly, and convert visitors into qualified enquiries.",
    primaryCtaLabel: "Discuss Your Website",
    secondaryCtaLabel: "Need an Online Store? View E-commerce",
    secondaryCtaHref: "/services/ecommerce-website-development/",
    shortOutcomeSummary:
      "Establish a fast, credible digital presence engineered to turn visitors into business enquiries.",
    businessProblems: [
      "An outdated or slow website that undermines trust when prospective clients research your company.",
      "Unclear service messaging and navigation that leave visitors unsure what you offer or how to contact you.",
      "Poor mobile usability and slow loading speeds on Bangladesh mobile networks.",
      "Hard-to-update pages that require developer intervention for routine text or portfolio changes.",
      "Missing technical SEO foundations, structured data, and conversion tracking.",
    ],
    deliverables: [
      {
        title: "Corporate & Business Websites",
        description:
          "Multi-page company websites structured around clear positioning, trust signals, and service enquiries.",
      },
      {
        title: "High-Intent Landing Pages",
        description:
          "Focused campaign landing pages engineered for paid search, social campaigns, and product launches with attribution tracking.",
      },
      {
        title: "Custom Web Applications & Portals",
        description:
          "Interactive client portals, booking interfaces, and custom web tools tailored to your business logic.",
      },
      {
        title: "Website Redesign & SEO Migration",
        description:
          "Modernizing legacy sites while preserving existing search equity through audited URL mapping and 301 redirects.",
      },
      {
        title: "CMS & Editorial Workflows",
        description:
          "Structured content management setup so your marketing team can publish articles, case studies, and updates safely.",
      },
      {
        title: "Maintenance & Performance Care",
        description:
          "Optional post-launch security patching, uptime monitoring, backups, and Core Web Vitals optimization.",
      },
    ],
    technicalCapabilities: [
      "Mobile-first responsive layouts tested across Android, iOS, and desktop viewports",
      "WCAG 2.2 AA accessibility considerations (semantic landmarks, keyboard navigation, contrast, form labels)",
      "Core Web Vitals optimization (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 targets)",
      "Search-engine-friendly HTML architecture, canonical tags, XML sitemaps, and JSON-LD schema",
      "Server-side form validation, Cloudflare Turnstile bot protection, and CRM/email lead routing",
      "Need catalogue, cart, and checkout workflows? See our dedicated E-commerce Website Development service.",
    ],
    processSteps: [
      {
        step: "1. Discovery & Architecture",
        description:
          "We audit your current site, clarify target audiences, define the sitemap, and map conversion goals.",
      },
      {
        step: "2. Content & Wireframing",
        description:
          "We structure page messaging, headings, and conversion journeys before visual styling begins.",
      },
      {
        step: "3. UI Design",
        description:
          "High-craft interface design aligned with your brand identity across desktop and mobile breakpoints.",
      },
      {
        step: "4. Frontend & Backend Engineering",
        description:
          "Clean Next.js / React implementation with server-validated lead capture, CMS schemas, and SEO metadata.",
      },
      {
        step: "5. QA, Accessibility & SEO Audit",
        description:
          "Testing across real devices, slower mobile connections, keyboard navigation, and redirect rules.",
      },
      {
        step: "6. Launch & Handover",
        description:
          "Production deployment, Search Console setup, analytics verification, and team training.",
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
    ],
    aeoAnswerFirst: {
      whatItIs:
        "Professional business website development covers the strategy, interface design, frontend/backend engineering, technical SEO, and lead-capture integration required to launch a reliable company web presence.",
      whoItIsFor:
        "B2B and B2C service companies, corporate organizations, hospitality venues, startups, and growing SMEs in Bangladesh and international markets.",
      problemItSolves:
        "Replaces slow, unconvincing, or hard-to-maintain websites with a fast, search-ready platform that clearly explains your offer and captures qualified leads.",
      howItWorks:
        "We start with a discovery and sitemap blueprint, design responsive page templates, develop the site on a modern stack (such as Next.js), integrate validated forms and analytics, and verify performance before launch.",
      whatIsIncluded: [
        "Information architecture and page-by-page wireframe blueprint",
        "Custom responsive UI design for mobile, tablet, and desktop",
        "Frontend and backend development with server-validated lead forms",
        "On-page technical SEO setup (metadata, canonicals, sitemap, JSON-LD)",
        "Consent-aware analytics and conversion event configuration",
      ],
      whatIsNotIncluded: [
        "Full multi-product shopping cart and checkout systems (covered under our dedicated E-commerce Website Development service)",
        "Paid advertising media spend or ongoing monthly SEO retainers unless added to scope",
        "Third-party hosting, domain registration, or paid SaaS license fees",
      ],
      pricingApproach:
        "Pricing depends on page count, custom interactive features, CMS requirements, and integrations. Standard business websites are quoted after a short discovery review; request a tailored quote for BDT or USD project estimates.",
      onboardingProcess:
        "Kickoff starts with a 45-minute discovery session, brand/content inventory, and a written scope document with milestone dates.",
      howToEvaluateAlternatives:
        "Compare agencies on live mobile performance, clarity of their own conversion forms, SEO migration discipline, and whether you receive maintainable code ownership rather than a locked proprietary template.",
    },
    faqs: [
      {
        question: "How much does a business website cost in Bangladesh?",
        answer:
          "The cost of a professional business website depends on the number of unique page templates, content readiness, CMS requirements, and custom integrations. Rather than publishing a one-size-fits-all figure, we scope your exact deliverables and provide a transparent written proposal in BDT (or USD for international clients) before work begins.",
      },
      {
        question: "How long does website development take?",
        answer:
          "A focused corporate or service website typically takes 3 to 6 weeks from approved scope to launch, depending on how quickly content, imagery, and stakeholder feedback are finalized. Larger custom web applications are scheduled in phased releases.",
      },
      {
        question: "Should my business choose WordPress or custom Next.js development?",
        answer:
          "WordPress can suit simple brochure sites when a team already manages WordPress plugins daily. Custom Next.js development is stronger when you need superior mobile speed, custom interactive workflows, stronger security posture, and long-term scalability without plugin bloat.",
      },
      {
        question: "Do you handle website redesigns without losing Google rankings?",
        answer:
          "Yes. Before replacing an existing site, we crawl your current URLs, map pages with search impressions or backlinks, preserve URL structures where intent matches, and implement tested one-to-one 301 redirects.",
      },
      {
        question: "Is website maintenance necessary after launch?",
        answer:
          "Yes. Regular dependency updates, uptime monitoring, backup verification, and periodic content/performance checks keep your site secure and fast. We offer structured maintenance arrangements or can hand over documentation to your internal team.",
      },
    ],
    relatedWorkSlugs: ["metisse-restaurant"],
  },

  "ecommerce-website-development": {
    slug: "ecommerce-website-development",
    releasePhase: "R1",
    pillar: "Digital Experiences",
    name: "E-commerce Website Development",
    shortTitle: "E-commerce Development",
    canonicalPath: "/services/ecommerce-website-development/",
    seoTitle: "E-commerce Website Development in Bangladesh | Artyx Digital",
    metaDescription:
      "Build a high-converting online store with Artyx Digital. We develop e-commerce websites with structured catalogues, smooth mobile checkout, payment integrations, and order workflows.",
    h1: "E-commerce Websites Designed to Turn Browsers into Buyers.",
    heroSupportingCopy:
      "We build online stores that make it effortless for customers to discover products, complete mobile checkout, and track orders—while giving your operations team a clean catalogue and fulfilment workflow.",
    primaryCtaLabel: "Discuss Your E-commerce Project",
    secondaryCtaLabel: "Explore Artyx OMS for Order Management",
    secondaryCtaHref: "/products/order-management/",
    shortOutcomeSummary:
      "Launch or scale an online store with fast mobile product discovery, reliable checkout, and organized order operations.",
    businessProblems: [
      "High cart abandonment caused by slow product pages, confusing variant selectors, or multi-step checkout friction on mobile.",
      "Difficulty managing ratusan/hundreds of SKUs, product categories, and stock availability across social and web channels.",
      "Manual order entry errors when reconciling website orders with Facebook/Instagram messages and courier dispatch.",
      "Platform limitations when outgrowing basic templates or needing custom B2B/B2C pricing rules.",
    ],
    deliverables: [
      {
        title: "Custom & Platform E-commerce Stores",
        description:
          "Tailored storefront engineering built for fast mobile browsing, clear merchandising, and brand differentiation.",
      },
      {
        title: "Product Catalogue & Variant Architecture",
        description:
          "Structured categories, filters, search, size/color/spec attributes, and SKU-level stock visibility.",
      },
      {
        title: "Mobile-First Cart & Checkout",
        description:
          "Streamlined guest and returning-customer checkout supporting Cash on Delivery (COD) and digital payment workflows.",
      },
      {
        title: "Payment & Checkout Integrations",
        description:
          "Integration with supported Bangladesh payment gateways (such as SSLCommerz, bKash, or Nagad where merchant accounts are approved) and Stripe for international stores.",
      },
      {
        title: "Order & Inventory Workflow Connection",
        description:
          "Clean order admin panel or connection with Artyx OMS / POS so online orders and stock levels stay organized.",
      },
      {
        title: "Store Migration & Conversion Optimization",
        description:
          "Migrating catalogues and URLs from legacy stores while improving mobile speed and product-page conversion.",
      },
    ],
    technicalCapabilities: [
      "Clear distinction between rapid platform-based implementation and custom Next.js/headless storefronts",
      "Optimized product image delivery (WebP/AVIF, responsive sizes, zero layout shift)",
      "Product and BreadcrumbList structured data for search visibility",
      "Campaign attribution tracking (UTM, Meta Pixel, Google Ads conversion readiness under user consent)",
      "Role-based store admin access for catalogue managers and order operators",
      "Optional integration path with Artyx Order Management System (OMS) for multi-channel sellers",
    ],
    processSteps: [
      {
        step: "1. Business Model & Catalogue Scoping",
        description:
          "We review your SKU count, variant complexity, payment methods (COD vs. prepaid), and fulfilment workflow.",
      },
      {
        step: "2. Platform vs. Custom Architecture Decision",
        description:
          "We recommend the right technical approach based on your budget, team capacity, and customization needs.",
      },
      {
        step: "3. Storefront UX & Checkout Design",
        description:
          "Designing collection pages, product detail pages, cart drawers, and low-friction mobile checkout.",
      },
      {
        step: "4. Store Development & Gateway Setup",
        description:
          "Building the storefront, configuring inventory rules, and integrating approved payment and shipping workflows.",
      },
      {
        step: "5. End-to-End Order & Payment Testing",
        description:
          "Testing real order placement, stock deduction, mobile responsiveness, and notification emails.",
      },
      {
        step: "6. Launch & Operator Training",
        description:
          "Going live with analytics, search indexing, and hands-on training for your catalogue and order team.",
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Node.js",
    ],
    aeoAnswerFirst: {
      whatItIs:
        "E-commerce website development is the design and engineering of an online storefront—including product catalogues, search/filtering, shopping cart, payment/COD checkout, and back-office order management.",
      whoItIsFor:
        "Retail brands, D2C merchants, electronics and fashion retailers, food/grocery sellers, and Facebook/Instagram businesses launching a dedicated online store.",
      problemItSolves:
        "Eliminates manual DM-only order taking and slow, leaky checkouts by giving customers a reliable self-service store and giving your team structured orders.",
      howItWorks:
        "We map your catalogue and checkout requirements, build a mobile-optimized storefront, integrate your merchant payment/COD workflows, and train your team to manage products and orders.",
      whatIsIncluded: [
        "Responsive homepage, category/collection, and product detail templates",
        "Shopping cart and mobile-friendly checkout (COD + supported payment gateway integration)",
        "Customer order confirmation notifications and order management view",
        "Technical SEO for product and category pages",
        "Consent-aware analytics and e-commerce conversion tracking setup",
      ],
      whatIsNotIncluded: [
        "Merchant account approval fees or transaction commissions charged by payment gateways/couriers",
        "Product photography or writing ratusan/hundreds of individual product descriptions unless scoped",
        "ERP or warehouse hardware provisioning (available separately via Artyx POS / OMS)",
      ],
      pricingApproach:
        "Quoted based on catalogue size, custom vs. platform architecture, payment/courier integrations, and data migration needs. Request a quote for a detailed BDT or USD breakdown.",
      onboardingProcess:
        "Starts with a catalogue & fulfilment workshop, sample SKU spreadsheet review, and merchant gateway checklist.",
      howToEvaluateAlternatives:
        "Test how fast candidate stores load on a mid-range Android phone, how clearly they handle Cash-on-Delivery vs. online payment, and how orders are managed after checkout.",
    },
    faqs: [
      {
        question: "Should I build a custom e-commerce website or use a hosted platform?",
        answer:
          "Hosted platforms or standard CMS stores work well for straightforward catalogues with standard checkout flows. Custom Next.js e-commerce development is ideal when you need fast performance on mobile networks, custom product configurators, specialized local checkout rules, or tight integration with Artyx POS and OMS.",
      },
      {
        question: "Which payment methods and gateways can be integrated?",
        answer:
          "For Bangladesh stores, we support Cash on Delivery (COD) workflows alongside merchant-approved gateways such as SSLCommerz, bKash, and Nagad. For international stores, we integrate Stripe and standard card/wallet checkouts. Note that live gateway activation requires your business to hold an approved merchant account with the provider.",
      },
      {
        question: "Can my e-commerce website connect with Artyx OMS or POS?",
        answer:
          "Yes. If you also receive orders from Facebook and Instagram or run physical retail outlets, we can align your e-commerce store with Artyx OMS and POS so orders and stock are managed through a connected workflow.",
      },
      {
        question: "How do you optimize e-commerce sites for mobile shoppers in Bangladesh?",
        answer:
          "Most Bangladeshi shoppers browse from mobile links on Facebook or Google. We prioritize lightweight page weight, compressed WebP/AVIF product imagery, thumb-friendly variant selection, and a concise checkout form that minimizes typing.",
      },
    ],
    relatedWorkSlugs: ["natural-foods", "laptop-point-bd"],
    relatedProductHref: {
      label: "Explore Artyx OMS for Multi-Channel Order Management",
      href: "/products/order-management/",
    },
  },

  "digital-marketing": {
    slug: "digital-marketing",
    releasePhase: "R1",
    pillar: "Digital Growth",
    name: "SEO & Digital Marketing",
    shortTitle: "SEO & Digital Marketing",
    canonicalPath: "/services/digital-marketing/",
    seoTitle: "Digital Marketing & SEO Services in Bangladesh | Artyx Digital",
    metaDescription:
      "Turn your digital presence into a measurable customer acquisition channel. Artyx Digital provides technical SEO, content strategy, paid advertising, and conversion optimization.",
    h1: "Turn Your Digital Presence into a Customer Acquisition Channel.",
    heroSupportingCopy:
      "We help businesses improve search visibility, reach high-intent audiences across search and social channels, and convert traffic into tracked, qualified business enquiries.",
    primaryCtaLabel: "Request a Marketing Audit",
    secondaryCtaLabel: "Explore Website Development",
    secondaryCtaHref: "/services/web-development/",
    shortOutcomeSummary:
      "Improve organic search visibility, paid campaign efficiency, and landing-page conversion with transparent reporting.",
    businessProblems: [
      "Service or product pages that fail to appear when potential buyers search on Google or AI answer engines.",
      "Paid ad budgets spent on broad impressions and clicks without tracking which campaigns generate actual qualified leads.",
      "Disconnected content creation that produces social posts or blog articles without a clear conversion path.",
      "High website traffic that leaves without submitting an enquiry or requesting a demo.",
    ],
    deliverables: [
      {
        title: "Search Engine Optimization (SEO)",
        description:
          "Keyword-to-URL mapping, commercial page optimization, internal linking architecture, and local SEO for eligible businesses.",
      },
      {
        title: "Technical SEO & AEO/GEO Readiness",
        description:
          "Crawlability audits, Core Web Vitals remediation, canonical/redirect hygiene, JSON-LD schema, and Answer-First content structuring.",
      },
      {
        title: "Content Strategy & Editorial Production",
        description:
          "Topic-cluster articles, comparison guides, and commercial landing copy written to answer buyer questions and build authority.",
      },
      {
        title: "Paid Search & Paid Social Campaigns",
        description:
          "Structured Google Ads and Meta Ads campaign management focused on qualified enquiries rather than vanity reach.",
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description:
          "Improving landing page hierarchy, CTA clarity, and form experience based on user behavior and funnel drop-off data.",
      },
      {
        title: "Attribution & Performance Reporting",
        description:
          "Consent-aware GA4, Search Console, and first/last-touch lead attribution reporting tied to real pipeline outcomes.",
      },
    ],
    technicalCapabilities: [
      "Comprehensive technical crawl and indexation diagnostics (Google Search Console & Bing Webmaster Tools)",
      "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) entity consistency",
      "First-touch and last-touch UTM/click-ID attribution connected to server-validated lead forms",
      "Monthly reporting cadence tracking non-brand organic clicks, landing-page conversion rates, and qualified leads",
      "No guaranteed ranking tricks, spam backlinks, or scaled low-value AI article farms",
    ],
    processSteps: [
      {
        step: "1. Technical, Content & Funnel Audit",
        description:
          "We inspect your current search visibility, site health, competitor landscape, and lead tracking setup.",
      },
      {
        step: "2. Keyword & Search-Intent Roadmap",
        description:
          "We assign primary commercial keywords to dedicated service/product URLs and plan supporting topic clusters.",
      },
      {
        step: "3. On-Page, Technical & Landing Page Fixes",
        description:
          "We resolve indexing blocks, improve page speed, add Answer-First sections, and tighten conversion forms.",
      },
      {
        step: "4. Content & Campaign Execution",
        description:
          "We publish authoritative cluster content and launch targeted paid search/social campaigns where in scope.",
      },
      {
        step: "5. Attribution & Lead Quality Review",
        description:
          "We review not just clicks, but how many submissions became qualified sales conversations in your CRM.",
      },
      {
        step: "6. Monthly Iteration",
        description:
          "We refine budgets, headlines, and content priorities using real Search Console and conversion data.",
      },
    ],
    techStack: [
      "Google Analytics",
      "Google Ads",
      "Meta Ads",
      "SEMrush",
      "Ahrefs",
      "HubSpot",
    ],
    aeoAnswerFirst: {
      whatItIs:
        "SEO and digital marketing is a structured programme combining technical search optimization, answer-oriented content, paid acquisition, and conversion tracking to generate qualified business enquiries.",
      whoItIsFor:
        "Growing B2B and B2C businesses in Bangladesh and international markets that want measurable lead generation rather than vanity traffic or follower counts.",
      problemItSolves:
        "Fixes low search visibility and wasted ad spend by aligning every page and campaign with specific buyer search intent and end-to-end lead attribution.",
      howItWorks:
        "We begin with a technical and conversion audit, fix foundational website and tracking gaps, optimize core commercial pages, and run a disciplined monthly cycle of content and campaign improvements.",
      whatIsIncluded: [
        "Technical SEO audit and implementation support",
        "Keyword-to-URL mapping and on-page commercial optimization",
        "AEO/GEO direct-answer and FAQ structuring",
        "Paid campaign setup/management (when included in retainer scope)",
        "Monthly performance and qualified-lead attribution reporting",
      ],
      whatIsNotIncluded: [
        "Direct media spend paid to Google, Meta, or other ad platforms",
        "Guaranteed #1 search rankings, fixed impression quotas, or guaranteed sales numbers",
        "Paid link-buying schemes or automated mass AI blog generation",
      ],
      pricingApproach:
        "Offered as a standalone initial audit/foundation project or a monthly retainer scoped to your number of target product/service lines and active channels.",
      onboardingProcess:
        "Starts with read-only access to Google Search Console and Analytics, a business goal workshop, and a 90-day prioritized action plan.",
      howToEvaluateAlternatives:
        "Avoid agencies that promise guaranteed Google #1 rankings in 30 days or report only impressions. Look for transparent methodology, technical competence, and focus on qualified leads.",
    },
    faqs: [
      {
        question: "How long does SEO take to show measurable results?",
        answer:
          "Technical fixes and on-page clarity improvements can be completed within weeks, while meaningful growth in non-brand organic rankings and qualified search enquiries typically builds over 3 to 6 months depending on competition, site history, and publishing consistency.",
      },
      {
        question: "Do you guarantee #1 Google rankings or a specific number of sales?",
        answer:
          "No legitimate SEO or marketing provider can guarantee specific search engine positions or sales figures because search algorithms and market conditions are outside any agency's direct control. Instead, we commit to a transparent scope of technical work, high-quality content, accurate attribution, and regular reporting.",
      },
      {
        question: "How do SEO and paid advertising work together?",
        answer:
          "Paid search and social ads can generate immediate traffic to validate landing pages and offers, while SEO and topic-cluster content build durable, compounding visibility for commercial and informational searches over time.",
      },
      {
        question: "What is included in your Content Strategy & Creation offering?",
        answer:
          "Rather than producing disconnected posts, our content team develops commercial service/product copy, Answer-First buyer guides, comparison articles, and campaign creatives that support your core conversion journeys.",
      },
    ],
    relatedWorkSlugs: ["laptop-point-bd", "sansli-by-zebin", "tech-drive"],
  },

  "custom-software": {
    slug: "custom-software",
    releasePhase: "R2",
    pillar: "Business Technology",
    name: "Custom Software Development",
    shortTitle: "Custom Software",
    canonicalPath: "/services/custom-software/",
    seoTitle: "Custom Software Development | Artyx Digital",
    metaDescription:
      "Replace disconnected spreadsheets and manual processes with custom software designed around your business workflows, roles, and operational goals.",
    h1: "Custom Software Designed Around the Way Your Business Works.",
    heroSupportingCopy:
      "We help growing businesses replace fragmented spreadsheets and manual workarounds with tailored internal systems, operational dashboards, and API integrations.",
    primaryCtaLabel: "Discuss Your Software Project",
    secondaryCtaLabel: "Explore Ready-to-Deploy POS & OMS",
    secondaryCtaHref: "/products/",
    shortOutcomeSummary:
      "Streamline internal operations, approvals, and reporting with software engineered for your exact workflow.",
    businessProblems: [
      "Critical business operations tracked across fragile spreadsheets, WhatsApp threads, and disconnected tools.",
      "Off-the-shelf software that forces your team to change core workflows or charges high per-seat fees for unused features.",
      "Lack of role-based access control, audit trails, and real-time operational reporting for management.",
      "Manual duplicate data entry between your website, inventory, accounting, or fulfilment systems.",
    ],
    deliverables: [
      {
        title: "Business Management & Operational Systems",
        description:
          "Custom web-based operational platforms tailored to your inventory, procurement, service delivery, or branch workflows.",
      },
      {
        title: "Internal Dashboards & Reporting Portals",
        description:
          "Role-specific management dashboards consolidating KPIs, financial summaries, and team activity logs.",
      },
      {
        title: "Workflow Automation & Approval Engines",
        description:
          "Automated multi-step approvals, notifications, and task handoffs that reduce manual bottlenecks.",
      },
      {
        title: "Customer & Partner Portals",
        description:
          "Authenticated self-service portals for B2B clients, dealers, or suppliers to place orders and track status.",
      },
      {
        title: "API & System Integrations",
        description:
          "Reliable REST/webhook integrations connecting your existing applications, databases, and third-party services.",
      },
      {
        title: "Database Architecture & Legacy Modernization",
        description:
          "Migrating legacy desktop or spreadsheet data into a relational PostgreSQL architecture with automated backups.",
      },
    ],
    technicalCapabilities: [
      "Structured requirements documentation and domain data modeling before code is written",
      "Relational database design (PostgreSQL) with transactional integrity and row-level access controls",
      "Role-based authentication, permissions, and operational activity logging",
      "Idempotent background workers and outbox patterns for reliable third-party API sync",
      "Automated unit/integration testing, staging environments, and documented deployment rollbacks",
    ],
    processSteps: [
      {
        step: "1. Workflow Discovery & Requirements Spec",
        description:
          "We map your current operational process, user roles, edge cases, and data structures into an approved specification.",
      },
      {
        step: "2. System & Database Architecture",
        description:
          "We design the relational schema, API contracts, security model, and UI wireframes.",
      },
      {
        step: "3. Iterative Milestone Development",
        description:
          "We build and demonstrate working modules in staging sprints so your team can validate workflows early.",
      },
      {
        step: "4. Testing & Data Migration",
        description:
          "We run validation, permission, and integration tests and assist with migrating clean historical data.",
      },
      {
        step: "5. Production Rollout & Staff Training",
        description:
          "We deploy the system, train operators and administrators, and monitor initial live usage.",
      },
      {
        step: "6. Agreed Maintenance & Evolution",
        description:
          "We provide post-launch support and iterative feature enhancements under an agreed SLA.",
      },
    ],
    techStack: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker",
    ],
    aeoAnswerFirst: {
      whatItIs:
        "Custom software development is the process of designing, engineering, deploying, and maintaining a tailored software application built specifically for an organization's unique operational workflows.",
      whoItIsFor:
        "SMEs, retail networks, logistics/distribution businesses, and enterprises whose processes cannot be served efficiently by off-the-shelf software.",
      problemItSolves:
        "Eliminates manual spreadsheet errors, operational blind spots, and disconnected tools by unifying workflows in one secure, role-controlled system.",
      howItWorks:
        "We document your exact workflow and data model, architect a secure web/cloud database application, deliver testable milestones in staging, and train your staff for rollout.",
      whatIsIncluded: [
        "Written functional specification and database schema design",
        "Custom web application frontend and backend API engineering",
        "Role-based user authentication and permission controls",
        "Staging environment review, automated core tests, and production deployment",
        "Admin/operator handover documentation",
      ],
      whatIsNotIncluded: [
        "Ongoing cloud infrastructure hosting bills (e.g. AWS, Vercel, Supabase) which are billed directly to your organization's accounts",
        "Formal external compliance audits (such as ISO or SOC2 certification fees)",
        "Unscoped third-party software license fees",
      ],
      pricingApproach:
        "Scoped and priced by milestone after an initial discovery and requirements phase. For standard retail or order workflows, check whether Artyx POS or OMS already fits your needs at a lower subscription cost.",
      onboardingProcess:
        "Begins with a technical discovery workshop to evaluate build-vs-buy trade-offs and produce a clear phase-1 scope.",
      howToEvaluateAlternatives:
        "First check if an existing product (like Artyx POS or OMS) covers 80% of your workflow. If custom software is justified, choose an engineering partner that writes clear specifications, uses standard maintainable technologies, and gives you full database ownership.",
    },
    faqs: [
      {
        question: "When should a business choose custom software over ready-made software?",
        answer:
          "If a proven ready-made product (such as Artyx POS for retail billing or Artyx OMS for online orders) fits your workflow, starting with the product is faster and more cost-effective. Custom software is the right choice when your competitive advantage or operational workflow has unique rules, approvals, or integrations that standard software cannot support.",
      },
      {
        question: "How do you prevent custom software projects from going off-track?",
        answer:
          "Most software delays happen when requirements are vague. We start with a written workflow specification, prioritize a focused Release 1 MVP that solves the core operational bottleneck first, and demonstrate progress in a staging environment at every milestone.",
      },
      {
        question: "Who owns the source code and business data?",
        answer:
          "For custom software engagements, intellectual property and source-code ownership terms are explicitly defined in your development agreement, and your production database is provisioned under accounts controlled by your business.",
      },
    ],
    relatedWorkSlugs: ["metisse-restaurant", "natural-foods"],
    relatedProductHref: {
      label: "Compare with Ready-to-Use Artyx POS & OMS Products",
      href: "/products/",
    },
  },

  "saas-development": {
    slug: "saas-development",
    releasePhase: "R2",
    pillar: "Business Technology",
    name: "SaaS Development",
    shortTitle: "SaaS Development",
    canonicalPath: "/services/saas-development/",
    seoTitle: "SaaS Development Services | Artyx Digital",
    metaDescription:
      "Turn your software product idea into a scalable SaaS application. Artyx Digital helps founders and businesses plan, design, and build modern web software products.",
    h1: "Turn Your Software Idea into a Scalable Product.",
    heroSupportingCopy:
      "We help founders and businesses plan, design, and engineer modern software-as-a-service (SaaS) applications—from focused MVP validation to multi-user production platforms.",
    primaryCtaLabel: "Discuss a SaaS Project",
    secondaryCtaLabel: "See Our Own Software Products",
    secondaryCtaHref: "/products/",
    shortOutcomeSummary:
      "Take your software product from concept to a tested, maintainable web application with clean tenant and role architecture.",
    businessProblems: [
      "Founders with domain expertise who need a reliable product engineering team to build a launch-ready MVP without over-engineering.",
      "Early prototypes that need a structured database schema, authentication, and workspace permissions before onboarding paying customers.",
      "Unclear product scope that risks burning budget on secondary features before validating core user value.",
    ],
    deliverables: [
      {
        title: "Product Discovery & MVP Scoping",
        description:
          "Defining core user journeys, data models, and a lean Release 1 feature cut-line so you can launch and learn faster.",
      },
      {
        title: "UI/UX & Product Interface Design",
        description:
          "Designing clean dashboards, onboarding flows, data tables, and settings interfaces in Figma and React.",
      },
      {
        title: "Web Application & API Architecture",
        description:
          "Full-stack TypeScript, Next.js, and PostgreSQL engineering designed for maintainability and clear data boundaries.",
      },
      {
        title: "Authentication, Workspaces & Roles",
        description:
          "User sign-up, organization/workspace isolation, and role-based access control where required by your product model.",
      },
      {
        title: "Subscription & Billing Integration",
        description:
          "Integrating Stripe or approved local billing workflows when subscription management is in your agreed project scope.",
      },
      {
        title: "Deployment, Monitoring & Iteration",
        description:
          "Setting up staging/production pipelines, database migrations, and error monitoring for post-launch evolution.",
      },
    ],
    technicalCapabilities: [
      "Experience building and operating our own commercial software products (Artyx POS and Artyx OMS)",
      "Multi-workspace data isolation using PostgreSQL and Row-Level Security (RLS) where in scope",
      "Transactional outbox patterns for reliable emails, webhooks, and background jobs",
      "Responsive web dashboard interfaces accessible on desktop and mobile browsers",
      "Transparent scope governance: features such as usage metering or specialized compliance are scoped explicitly based on your requirements",
    ],
    processSteps: [
      {
        step: "1. Product & User Journey Mapping",
        description:
          "We define the core problem, target user personas, and the minimum feature set required for a credible launch.",
      },
      {
        step: "2. Data Model & Technical Blueprint",
        description:
          "We design tenant boundaries, database tables, authentication flows, and third-party integration requirements.",
      },
      {
        step: "3. Interactive UI Design",
        description:
          "We craft component-driven product screens for key workflows before full backend implementation.",
      },
      {
        step: "4. Phased Sprint Engineering",
        description:
          "We build the application in testable increments with staging deployments for founder review.",
      },
      {
        step: "5. QA, Security & Launch Prep",
        description:
          "We test tenant isolation, input validation, rate limits, and backup procedures prior to user onboarding.",
      },
      {
        step: "6. Post-Launch Product Iteration",
        description:
          "We support feature iterations based on real customer onboarding feedback.",
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Stripe",
    ],
    aeoAnswerFirst: {
      whatItIs:
        "SaaS development is the end-to-end product planning, UI/UX design, and full-stack software engineering required to build a cloud-hosted application used by multiple customer accounts.",
      whoItIsFor:
        "Startup founders, domain experts, and established businesses launching a subscription or B2B software product in Bangladesh or internationally.",
      problemItSolves:
        "Bridges the gap between a product concept and a secure, working web application without the overhead of recruiting a full in-house engineering department on day one.",
      howItWorks:
        "We lock down a disciplined MVP scope, architect the database and workspace permissions, build the frontend and API in iterative sprints, and deploy to your cloud accounts.",
      whatIsIncluded: [
        "MVP product scope definition and technical architecture",
        "Product UI/UX design and component library setup",
        "Full-stack application development (Next.js / React / PostgreSQL)",
        "User authentication and workspace role management",
        "Staging and production deployment setup",
      ],
      whatIsNotIncluded: [
        "Cloud hosting, database, email, or third-party API consumption bills",
        "Guaranteed investor funding or user acquisition results",
        "Formal third-party security certifications unless separately contracted with an accredited auditor",
      ],
      pricingApproach:
        "Engagements start with a fixed-scope Discovery & MVP Blueprint or phased milestone development contract in BDT or USD.",
      onboardingProcess:
        "Starts with a product vision review, feature prioritization matrix, and architecture milestone plan.",
      howToEvaluateAlternatives:
        "Choose a product development partner that has built its own software products (like Artyx POS and OMS) and pushes back against unnecessary MVP feature creep.",
    },
    faqs: [
      {
        question: "How long does it take to build a SaaS MVP?",
        answer:
          "A focused SaaS MVP typically takes 8 to 14 weeks depending on workflow complexity, user roles, and external integrations. We strongly recommend launching a lean, reliable core product first rather than delaying launch for secondary features.",
      },
      {
        question: "Can you integrate both international (Stripe) and Bangladesh payment methods?",
        answer:
          "Yes, where your business holds the required merchant accounts, we can implement Stripe for international subscriptions or local payment/invoice workflows for Bangladesh B2B customers.",
      },
      {
        question: "How do you handle communication with international founders?",
        answer:
          "We operate with written sprint plans, shared staging URLs, asynchronous updates, and scheduled video reviews aligned with your time zone.",
      },
    ],
    relatedWorkSlugs: ["metisse-restaurant", "natural-foods"],
    relatedProductHref: {
      label: "See Our Own SaaS Products: POS & OMS",
      href: "/products/",
    },
  },

  branding: {
    slug: "branding",
    releasePhase: "R2",
    pillar: "Digital Experiences",
    name: "Branding & Creative",
    shortTitle: "Branding & Creative",
    canonicalPath: "/services/branding/",
    seoTitle: "Branding and Brand Identity Services | Artyx Digital",
    metaDescription:
      "Build a brand people recognize and remember. Artyx Digital crafts strategic visual identities, logos, brand guidelines, and digital creative assets.",
    h1: "Build a Brand People Recognize and Remember.",
    heroSupportingCopy:
      "We help businesses create clear, consistent visual identities, brand guidelines, and digital creative assets that communicate quality across physical and online touchpoints.",
    primaryCtaLabel: "Discuss Your Brand",
    secondaryCtaLabel: "View Our Branding Portfolio",
    secondaryCtaHref: "/work/",
    shortOutcomeSummary:
      "Establish a cohesive logo, color system, typography, and brand guideline book that elevates customer trust.",
    businessProblems: [
      "Inconsistent logos, colors, and fonts across your storefront, social media pages, packaging, and website.",
      "A visual identity that blends in with competitors or fails to reflect the actual quality of your products.",
      "Designers and marketing staff recreating ad-hoc graphics without a shared brand guideline system.",
    ],
    deliverables: [
      {
        title: "Brand Positioning & Visual Direction",
        description:
          "Defining your brand personality, audience impression, and visual differentiation before sketching marks.",
      },
      {
        title: "Logo & Monogram Systems",
        description:
          "Primary logomarks, wordmarks, responsive icons, and monochrome variants engineered for print, signage, and digital screens.",
      },
      {
        title: "Color Palette & Typography System",
        description:
          "Accessible color specifications (HEX, RGB, CMYK) and paired heading/body typography rules.",
      },
      {
        title: "Comprehensive Brand Guidelines",
        description:
          "A practical brand book documenting logo clear space, color usage, typography hierarchy, and application examples.",
      },
      {
        title: "Social Media & Marketing Creative Templates",
        description:
          "Cohesive visual templates for social commerce announcements, product showcases, and digital campaigns.",
      },
      {
        title: "Packaging & Environmental Mockups",
        description:
          "Visualizing how your identity translates onto retail bags, boxes, labels, and physical signage where in scope.",
      },
    ],
    technicalCapabilities: [
      "Production-ready vector source files (AI, EPS, SVG, PDF) and high-resolution raster exports (PNG, WebP)",
      "Digital-first legibility testing at small mobile avatar sizes and dark/light backgrounds",
      "Direct alignment with our web development and digital marketing teams so your brand system translates seamlessly to code",
    ],
    processSteps: [
      {
        step: "1. Brand Brief & Market Review",
        description:
          "We study your industry, target buyers, product positioning, and existing visual pain points.",
      },
      {
        step: "2. Visual Direction & Moodboards",
        description:
          "We align on strategic visual territory, geometric vs. expressive forms, and color psychology.",
      },
      {
        step: "3. Logo & Identity Concepting",
        description:
          "We craft focused, original identity concepts presented in realistic brand contexts.",
      },
      {
        step: "4. Iterative Refinement",
        description:
          "We refine the selected direction based on your feedback to perfect proportions, color balance, and type.",
      },
      {
        step: "5. Brand Book & Asset Production",
        description:
          "We assemble the complete brand guidelines document and export organized master file packages.",
      },
    ],
    techStack: [
      "Illustrator",
      "Photoshop",
      "Figma",
      "InDesign",
    ],
    aeoAnswerFirst: {
      whatItIs:
        "Branding and creative services cover the research, design, and documentation of a company's visual identity—including logo systems, color palettes, typography, brand guidelines, and marketing assets.",
      whoItIsFor:
        "New ventures launching in competitive markets, retail and e-commerce brands upgrading their image, and companies preparing for a website or product relaunch.",
      problemItSolves:
        "Replaces fragmented, amateur visuals with a unified brand system that builds immediate recognition and credibility across every customer touchpoint.",
      howItWorks:
        "We conduct a brand discovery brief, explore strategic visual directions, present contextual identity concepts, refine the chosen mark, and deliver a complete brand guideline book and vector asset library.",
      whatIsIncluded: [
        "Brand discovery and visual direction alignment",
        "Primary logo, secondary lockups, and icon mark",
        "Official color system and typography specification",
        "Brand usage guidelines PDF book",
        "Full vector and web-ready master file package",
      ],
      whatIsNotIncluded: [
        "Physical printing or manufacturing costs for packaging/signage",
        "Trademark legal registration filing fees",
        "Full website development unless bundled with a Web Development package",
      ],
      pricingApproach:
        "Fixed-scope project packages based on the depth of identity exploration, brand book pages, and collateral templates required.",
      onboardingProcess:
        "Starts with a 30-minute brand discovery questionnaire and review of your product/service positioning.",
      howToEvaluateAlternatives:
        "Review real multi-page brand identity systems in the agency's portfolio (such as our work for Sansli by Zebin, Laptop Point BD, Tech Drive, and Best Laptop Gallery) rather than single isolated logo icons.",
    },
    faqs: [
      {
        question: "What files do we receive at the end of a branding project?",
        answer:
          "You receive a structured master folder containing editable vector files (Adobe Illustrator .AI, .EPS, .SVG, print-ready .PDF), high-resolution transparent PNG/WebP files for light and dark backgrounds, and your Brand Guidelines PDF book.",
      },
      {
        question: "Can you design both our brand identity and our website?",
        answer:
          "Yes. Completing your brand identity with Artyx Digital right before website or e-commerce development ensures your typography, color tokens, and visual assets move directly into your live website without translation gaps.",
      },
      {
        question: "How many revision rounds are included?",
        answer:
          "Our standard branding scope includes structured concept presentation followed by two dedicated refinement rounds on your selected direction so the final system is polished and signed off with confidence.",
      },
    ],
    relatedWorkSlugs: [
      "sansli-by-zebin",
      "laptop-point-bd",
      "tech-drive",
      "best-laptop-gallery",
    ],
  },
};

export function getAllServices(): ServiceContentRecord[] {
  return Object.values(SERVICES_CONTENT);
}

export function getServiceBySlug(slug: string): ServiceContentRecord | undefined {
  return SERVICES_CONTENT[slug as ServiceSlug];
}

