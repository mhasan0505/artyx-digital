export type InsightCategorySlug =
  | "pos-retail"
  | "order-management"
  | "web-ecommerce"
  | "seo-growth"
  | "custom-software-saas";

export interface InsightCategory {
  slug: InsightCategorySlug;
  name: string;
  shortName: string;
  clusterNumber: number;
  pillarTitle: string;
  pillarHref: string;
  description: string;
}

export interface InsightAuthor {
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials: string;
}

export interface InsightSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  primaryCategory: InsightCategorySlug;
  secondaryCategory?: InsightCategorySlug;
  authorSlug: string;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  seoTitle: string;
  metaDescription: string;
  canonicalPath: string;
  status: "published" | "review" | "draft" | "archived";
  answerFirstSummary: string;
  sections: InsightSection[];
  practicalChecklist: string[];
  relatedServiceOrProduct: {
    title: string;
    description: string;
    ctaLabel: string;
    href: string;
  };
  relatedArticleSlugs: string[];
  editorialReviewer: string;
}

export const INSIGHT_CATEGORIES: Record<InsightCategorySlug, InsightCategory> = {
  "pos-retail": {
    slug: "pos-retail",
    name: "POS & Retail Operations",
    shortName: "POS & Retail",
    clusterNumber: 1,
    pillarTitle: "Artyx POS Software for Retail Businesses",
    pillarHref: "/products/pos/",
    description:
      "Practical guides on retail point-of-sale workflows, barcode inventory accuracy, cashier permissions, and daily store reconciliation.",
  },
  "order-management": {
    slug: "order-management",
    name: "Online Order Management & Social Commerce",
    shortName: "Order Management",
    clusterNumber: 2,
    pillarTitle: "Artyx Order Management System (OMS)",
    pillarHref: "/products/order-management/",
    description:
      "Operational frameworks for Facebook, Instagram, and multi-channel online sellers managing order confirmation, stock reservation, and courier dispatch.",
  },
  "web-ecommerce": {
    slug: "web-ecommerce",
    name: "Website & E-commerce Development",
    shortName: "Web & E-commerce",
    clusterNumber: 3,
    pillarTitle: "Business Website & E-commerce Development",
    pillarHref: "/services/web-development/",
    description:
      "Project planning checklists, platform comparisons, mobile conversion architecture, and SEO migration guides for business websites and online stores.",
  },
  "seo-growth": {
    slug: "seo-growth",
    name: "SEO & Digital Growth",
    shortName: "SEO & Growth",
    clusterNumber: 4,
    pillarTitle: "SEO & Digital Marketing Services",
    pillarHref: "/services/digital-marketing/",
    description:
      "Technical SEO checklists, Answer Engine Optimization (AEO), local search fundamentals, and qualified-lead attribution for growing businesses.",
  },
  "custom-software-saas": {
    slug: "custom-software-saas",
    name: "Custom Software & SaaS",
    shortName: "Custom Software & SaaS",
    clusterNumber: 5,
    pillarTitle: "Custom Software & SaaS Development",
    pillarHref: "/services/custom-software/",
    description:
      "Decision guides on build-vs-buy software evaluation, scoping operational systems, and planning lean SaaS MVPs.",
  },
};

export const INSIGHT_AUTHORS: Record<string, InsightAuthor> = {
  "artyx-editorial-team": {
    slug: "artyx-editorial-team",
    name: "Artyx Digital Product & Engineering Editorial",
    role: "Product Architecture & Digital Growth Practice, Dhaka",
    bio: "Written and reviewed by Artyx Digital's product engineering and search strategy team in Dhaka, drawing on implementation work across retail POS, online order workflows, and commercial web platforms.",
    credentials: "Reviewed against Artyx Product Capability & SEO Standards",
  },
};

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    slug: "retail-pos-software-evaluation-guide",
    title: "Retail POS Software: What a Shop Owner Should Evaluate Before Choosing",
    excerpt:
      "A step-by-step evaluation framework for retail shop owners in Bangladesh comparing POS software against manual registers and spreadsheets.",
    primaryCategory: "pos-retail",
    secondaryCategory: "order-management",
    authorSlug: "artyx-editorial-team",
    publishedAt: "2026-10-30",
    updatedAt: "2026-10-30",
    readingTimeMinutes: 6,
    seoTitle: "How to Choose Retail POS Software in Bangladesh | Artyx Digital",
    metaDescription:
      "Learn what retail shop owners should evaluate before choosing POS software: barcode billing speed, SKU variant stock tracking, cashier roles, and hardware compatibility.",
    canonicalPath: "/insights/retail-pos-software-evaluation-guide/",
    status: "published",
    answerFirstSummary:
      "To choose the right retail POS software, evaluate five operational areas before looking at price: 1) counter billing speed with barcode scanners, 2) real-time SKU and variant stock deduction, 3) cashier vs. manager permission controls, 4) daily register closure and margin reporting, and 5) local onboarding and printer/scanner compatibility.",
    sections: [
      {
        id: "why-spreadsheets-fail-at-the-counter",
        heading: "1. Why Manual Registers and Spreadsheets Break Down as SKU Count Grows",
        paragraphs: [
          "Many retail outlets start by writing paper memos at the counter and updating an Excel sheet at night. This works when a shop carries 20 items, but breaks down once you manage hundreds of SKUs, size/color variants, or multiple counter staff.",
          "By the time an evening spreadsheet is updated, fast-moving items may already be out of stock, and discrepancies between physical cash and sold inventory become difficult to trace.",
        ],
      },
      {
        id: "core-workflows-to-test-in-a-demo",
        heading: "2. Core Counter Workflows to Test During a Live POS Demo",
        paragraphs: [
          "Never buy POS software from a feature checklist alone. Ask the vendor to walk through a real counter transaction using products similar to your shop's catalogue.",
        ],
        bullets: [
          "Barcode & keyboard speed: How many seconds does it take to scan three items, apply an approved discount, and print a receipt?",
          "Stock ledger accuracy: Does the system log supplier stock-ins, customer returns, and damaged-stock adjustments with timestamps?",
          "Cashier accountability: Can a cashier process a normal sale while being restricted from deleting past invoices or viewing store-wide profit margins?",
          "Payment method breakdown: Does the daily closure report separate cash, card, bKash, and Nagad collections clearly?",
        ],
      },
      {
        id: "pos-vs-oms-distinction",
        heading: "3. Do You Need POS, OMS, or Both?",
        paragraphs: [
          "Retailers who sell both in a physical store and on Facebook/Instagram often confuse Point of Sale (POS) with an Order Management System (OMS).",
          "A POS is built for walk-in customers who pay at the counter and leave with the item immediately. An OMS is built for remote online orders that must be confirmed by phone, packed, handed to a courier, and reconciled upon delivery.",
        ],
      },
    ],
    practicalChecklist: [
      "List your total SKU count and whether products have size, color, or serial/IMEI attributes.",
      "Confirm which thermal receipt printers and USB barcode scanners you already own.",
      "Decide which actions require manager approval (e.g. price overrides, bill cancellations, refunds).",
      "Check internet stability at your outlet counter and discuss connectivity requirements during your demo.",
      "Request a live POS demo using 5–10 of your actual products before committing.",
    ],
    relatedServiceOrProduct: {
      title: "Explore Artyx POS Software",
      description:
        "See how Artyx POS handles counter billing, SKU inventory, role permissions, and daily retail reporting.",
      ctaLabel: "Request a POS Demo",
      href: "/products/pos/",
    },
    relatedArticleSlugs: [
      "organize-facebook-instagram-orders-workflow",
      "when-to-invest-in-custom-software-vs-ready-made",
    ],
    editorialReviewer: "Artyx POS Product Owner",
  },
  {
    slug: "organize-facebook-instagram-orders-workflow",
    title: "How Online Sellers Can Organize Facebook and Instagram Orders",
    excerpt:
      "A practical order-processing workflow for social-commerce brands to stop losing orders in inbox threads and shared spreadsheets.",
    primaryCategory: "order-management",
    secondaryCategory: "pos-retail",
    authorSlug: "artyx-editorial-team",
    publishedAt: "2026-10-30",
    updatedAt: "2026-10-30",
    readingTimeMinutes: 7,
    seoTitle: "How to Manage Facebook & Instagram Orders Efficiently | Artyx Digital",
    metaDescription:
      "Stop losing social commerce orders in spreadsheets. Learn how to structure order intake, phone confirmation, stock reservation, and courier dispatch with an OMS.",
    canonicalPath: "/insights/organize-facebook-instagram-orders-workflow/",
    status: "published",
    answerFirstSummary:
      "Online sellers can eliminate social-commerce order chaos by separating order handling into five distinct stages—Intake, Confirmation (with immediate stock reservation), Packing Slip Generation, Courier Dispatch, and Delivery/Return Reconciliation—supported by an Order Management System (OMS) rather than shared spreadsheets.",
    sections: [
      {
        id: "the-root-causes-of-social-order-chaos",
        heading: "1. Why Shared Spreadsheets Fail Past 30 Orders a Day",
        paragraphs: [
          "When two or three page moderators reply to Facebook and Instagram messages simultaneously and paste addresses into a Google Sheet, three expensive mistakes happen repeatedly: duplicate dispatches, missed orders, and overselling the last unit of a popular item.",
          "Chat inboxes are designed for conversation—not inventory reservation or warehouse fulfilment.",
        ],
      },
      {
        id: "five-stage-oms-lifecycle",
        heading: "2. The Five-Stage Order Management Lifecycle",
        paragraphs: [
          "Whether your team processes 50 or 2,000 orders a month, structuring every order through explicit status gates keeps moderators and packers aligned:",
        ],
        bullets: [
          "Stage 1 — New Order Capture: Record customer name, phone number, delivery address, channel tag (Facebook/Instagram/Web), and SKU items.",
          "Stage 2 — Phone Confirmation & Stock Reservation: Verify the order with the buyer and mark as Confirmed, immediately reserving stock so other moderators see accurate availability.",
          "Stage 3 — Packing & Invoice Batching: Warehouse staff filter only Confirmed orders, print standardized packing slips, and mark parcels as Packed.",
          "Stage 4 — Courier Handover: Generate dispatch sheets and record consignment tracking.",
          "Stage 5 — Delivered or Returned: Close completed orders and restock returned items with an audit reason.",
        ],
      },
      {
        id: "checking-repeat-customer-history",
        heading: "3. Using Phone Lookup to Speed Up Repeat Orders and Spot High Return Risk",
        paragraphs: [
          "Looking up a customer by phone number during order intake lets your moderator pre-fill their saved delivery address in seconds and see whether previous parcels were successfully delivered or repeatedly refused at the door.",
        ],
      },
    ],
    practicalChecklist: [
      "Assign separate logins for page moderators (order intake/confirmation) and packing staff (invoice printing/dispatch).",
      "Never pack an order that has not moved to the 'Confirmed' status.",
      "Reserve inventory at the moment of order confirmation, not when the courier picks up the parcel.",
      "Tag every order with its source channel (Facebook, Instagram, Website, WhatsApp) to measure campaign ROI.",
    ],
    relatedServiceOrProduct: {
      title: "Explore Artyx Order Management System (OMS)",
      description:
        "Bring your Facebook, Instagram, and website order workflow into one organized system.",
      ctaLabel: "Request an OMS Demo",
      href: "/products/order-management/",
    },
    relatedArticleSlugs: [
      "retail-pos-software-evaluation-guide",
      "ecommerce-website-development-project-checklist",
    ],
    editorialReviewer: "Artyx OMS Product Owner",
  },
  {
    slug: "ecommerce-website-development-project-checklist",
    title: "E-commerce Website Development: A Practical Project Checklist",
    excerpt:
      "Everything a retail or D2C brand needs to prepare before commissioning an e-commerce website—from SKU structure and mobile checkout to payment and order workflows.",
    primaryCategory: "web-ecommerce",
    secondaryCategory: "order-management",
    authorSlug: "artyx-editorial-team",
    publishedAt: "2026-10-30",
    updatedAt: "2026-10-30",
    readingTimeMinutes: 7,
    seoTitle: "E-commerce Website Development Checklist for Businesses | Artyx Digital",
    metaDescription:
      "Planning an online store? Use this practical e-commerce development checklist covering catalogue structure, mobile checkout, COD/payment gateways, and SEO.",
    canonicalPath: "/insights/ecommerce-website-development-project-checklist/",
    status: "published",
    answerFirstSummary:
      "A successful e-commerce website project requires six foundational preparations before design starts: 1) a structured SKU and variant catalogue, 2) a mobile-first cart and checkout flow supporting both COD and digital payments, 3) clear shipping/delivery zone rules, 4) back-office order and stock workflows, 5) fast product image optimization, and 6) consent-aware conversion tracking.",
    sections: [
      {
        id: "catalogue-and-variant-structure",
        heading: "1. Structure Your Product Catalogue and Variants First",
        paragraphs: [
          "The most common cause of e-commerce launch delays is an unstructured product list. Before development begins, define your top-level categories, subcategories, and variant attributes (such as size, color, storage capacity, or weight).",
          "Decide whether each variant has its own SKU code, price, and stock count.",
        ],
      },
      {
        id: "mobile-checkout-and-payment-realities",
        heading: "2. Design Checkout for Mobile Shoppers and Real Payment Habits",
        paragraphs: [
          "In Bangladesh, a large share of e-commerce traffic arrives from mobile social links and prefers Cash on Delivery (COD) or mobile wallets alongside card payments. International buyers expect fast card/wallet checkout via Stripe.",
        ],
        bullets: [
          "Allow guest checkout without forcing mandatory account creation before purchase.",
          "Validate phone numbers cleanly and keep address fields concise (Name, Phone, City/Zone, Full Address).",
          "Clearly display delivery charges and estimated delivery timelines before the final submit button.",
          "Confirm your business has the necessary trade license and bank documentation if applying for merchant payment gateways (SSLCommerz, bKash, Nagad, or Stripe).",
        ],
      },
      {
        id: "post-checkout-operations",
        heading: "3. Connect Checkout to Your Order & Inventory Workflow",
        paragraphs: [
          "An online store is only half of the system. Make sure your team has a clear process—either in the store admin or connected to Artyx OMS—to confirm orders, print packing slips, and update stock.",
        ],
      },
    ],
    practicalChecklist: [
      "Prepare a clean spreadsheet of at least 20–50 representative products with titles, categories, variants, prices, and SKU codes.",
      "Collect high-resolution product photos with consistent aspect ratios.",
      "Define inside-Dhaka, outside-Dhaka, and international shipping rate rules.",
      "Confirm merchant gateway account readiness or launch with verified COD + manual/automated gateway phases.",
      "Prepare privacy, terms, return/refund, and delivery policy pages.",
    ],
    relatedServiceOrProduct: {
      title: "E-commerce Website Development by Artyx Digital",
      description:
        "We design and build high-converting online stores tailored for mobile shoppers and smooth order operations.",
      ctaLabel: "Discuss Your E-commerce Project",
      href: "/services/ecommerce-website-development/",
    },
    relatedArticleSlugs: [
      "website-development-project-brief-guide",
      "organize-facebook-instagram-orders-workflow",
    ],
    editorialReviewer: "Artyx Web & E-commerce Lead",
  },
  {
    slug: "website-development-project-brief-guide",
    title: "Website Development Project Brief: What a Business Should Prepare",
    excerpt:
      "How to write a clear website development brief so your agency can give you an accurate scope, timeline, and fixed quotation.",
    primaryCategory: "web-ecommerce",
    secondaryCategory: "seo-growth",
    authorSlug: "artyx-editorial-team",
    publishedAt: "2026-10-30",
    updatedAt: "2026-10-30",
    readingTimeMinutes: 5,
    seoTitle: "How to Prepare a Website Development Project Brief | Artyx Digital",
    metaDescription:
      "Get accurate website quotes and faster delivery. Learn what to include in a business website project brief: goals, audiences, sitemap, forms, and SEO migration.",
    canonicalPath: "/insights/website-development-project-brief-guide/",
    status: "published",
    answerFirstSummary:
      "A practical website project brief should state five things clearly: 1) your business model and primary commercial goal, 2) target audiences and markets, 3) required pages and conversion actions (such as project enquiry or demo request forms), 4) who will supply copy, photos, and approvals, and 5) existing URLs that must be preserved for SEO.",
    sections: [
      {
        id: "define-business-outcomes-before-design",
        heading: "1. Define Commercial Outcomes Before Choosing Colors or Animations",
        paragraphs: [
          "When businesses ask 'How much does a website cost?' without a brief, agencies have to guess. Start by stating what a successful website must do for your business in the next 12 months—such as generating B2B project enquiries, booking product demos, or explaining a complex service clearly.",
        ],
      },
      {
        id: "core-sections-of-a-website-brief",
        heading: "2. Five Sections Every Website Brief Should Include",
        paragraphs: [
          "You do not need a 30-page technical document. A concise 2-page brief covering these points gives engineers and designers everything needed for an accurate proposal:",
        ],
        bullets: [
          "Company & Positioning: What do you sell, who are your buyers, and what separates you from competitors?",
          "Proposed Sitemap: Which core pages are required for Release 1 (e.g. Home, Services, Products, Work, About, Contact)?",
          "Conversion Paths: What exact information should your lead forms collect, and where should enquiries be routed?",
          "Content & Asset Readiness: Do you have approved brand guidelines, product screenshots, and case study permissions ready?",
          "Existing Site & Domain Details: If redesigning an existing domain, list pages that currently receive search traffic so 301 redirects are planned.",
        ],
      },
    ],
    practicalChecklist: [
      "Identify one internal project owner who will review designs and approve copy.",
      "Gather your vector logo files, brand colors, and official contact details.",
      "List 2–3 reference websites whose clarity and structure you admire.",
      "Decide your target launch window and whether a phased Release 1 MVP makes sense.",
    ],
    relatedServiceOrProduct: {
      title: "Start Your Website Project with Artyx Digital",
      description:
        "Use our structured project planner or speak with our engineering team to scope your website.",
      ctaLabel: "Discuss Your Website",
      href: "/services/web-development/",
    },
    relatedArticleSlugs: [
      "ecommerce-website-development-project-checklist",
      "technical-seo-checklist-business-websites",
    ],
    editorialReviewer: "Artyx Technical Lead",
  },
  {
    slug: "technical-seo-checklist-business-websites",
    title: "Technical SEO Checklist for a Business Website",
    excerpt:
      "A practical audit checklist covering crawlability, canonical URLs, redirects, structured data, Core Web Vitals, and AI search readiness.",
    primaryCategory: "seo-growth",
    secondaryCategory: "web-ecommerce",
    authorSlug: "artyx-editorial-team",
    publishedAt: "2026-10-30",
    updatedAt: "2026-10-30",
    readingTimeMinutes: 6,
    seoTitle: "Technical SEO Checklist for Business Websites | Artyx Digital",
    metaDescription:
      "Ensure search engines and AI answer engines can crawl, index, and understand your business website with this technical SEO and AEO checklist.",
    canonicalPath: "/insights/technical-seo-checklist-business-websites/",
    status: "published",
    answerFirstSummary:
      "Technical SEO ensures search engines can reliably crawl, render, index, and understand your website. Priority checks include: 1) clean robots.txt and canonical XML sitemap, 2) consistent trailing-slash and HTTPS canonical URLs, 3) one primary search intent per URL with unique H1 and metadata, 4) Answer-First sections and accurate JSON-LD schema, and 5) fast mobile Core Web Vitals.",
    sections: [
      {
        id: "crawlability-and-canonical-consistency",
        heading: "1. Crawlability, Sitemaps, and Canonical URL Consistency",
        paragraphs: [
          "Before writing blog posts, verify that Googlebot, Bingbot, and AI search crawlers (such as OAI-SearchBot) can access your public pages without hitting redirect chains, accidental noindex tags, or inconsistent URL slashes.",
        ],
        bullets: [
          "Pick one URL convention (such as trailing slashes on all page routes) and enforce it across internal links, canonical tags, and sitemap.xml.",
          "Exclude redirected URLs, API routes, and non-canonical parameter URLs from your XML sitemap.",
          "Use one-hop 301 permanent redirects when migrating legacy URLs to equivalent new pages.",
        ],
      },
      {
        id: "aeo-and-geo-foundations",
        heading: "2. Preparing Commercial Pages for Answer Engines (AEO & GEO)",
        paragraphs: [
          "Modern search experiences—including Google AI Overviews, Bing Copilot, and ChatGPT Search—rely on clear entity definitions, direct answers, and verifiable facts rather than keyword stuffing.",
          "Include an Answer-First summary on every service and product page explaining what the offer is, who it is for, how it works, and what is included, paired with accurate Organization, Service, or SoftwareApplication JSON-LD.",
        ],
      },
    ],
    practicalChecklist: [
      "Verify domain ownership in both Google Search Console and Bing Webmaster Tools.",
      "Confirm every indexable page has a unique <title>, meta description, and single H1.",
      "Validate Organization, WebSite, Service, and BreadcrumbList JSON-LD in Schema Markup Validator.",
      "Test mobile LCP, INP, and CLS on realistic mobile network conditions.",
    ],
    relatedServiceOrProduct: {
      title: "Request a Technical SEO & Marketing Audit",
      description:
        "Let our team audit your site's crawlability, search intent map, and conversion tracking.",
      ctaLabel: "Request a Marketing Audit",
      href: "/services/digital-marketing/",
    },
    relatedArticleSlugs: [
      "website-development-project-brief-guide",
      "ecommerce-website-development-project-checklist",
    ],
    editorialReviewer: "Artyx SEO & Growth Lead",
  },
  {
    slug: "when-to-invest-in-custom-software-vs-ready-made",
    title: "When a Business Should Invest in Custom Software vs. Ready-Made Systems",
    excerpt:
      "How to evaluate whether an off-the-shelf product (like POS or OMS) or a custom-engineered software application is the right investment for your operations.",
    primaryCategory: "custom-software-saas",
    secondaryCategory: "pos-retail",
    authorSlug: "artyx-editorial-team",
    publishedAt: "2026-10-30",
    updatedAt: "2026-10-30",
    readingTimeMinutes: 6,
    seoTitle: "Custom Software vs Ready-Made Software: Decision Guide | Artyx Digital",
    metaDescription:
      "Should your business buy ready-made software or build custom software? Compare cost, workflow fit, integrations, and long-term ownership.",
    canonicalPath: "/insights/when-to-invest-in-custom-software-vs-ready-made/",
    status: "published",
    answerFirstSummary:
      "Choose a ready-made software product (such as Artyx POS for retail billing or Artyx OMS for online orders) when standard workflows cover 80% or more of your daily operations. Invest in custom software development when your business relies on proprietary workflows, multi-department approvals, or specialized integrations that off-the-shelf tools cannot support.",
    sections: [
      {
        id: "start-with-workflow-fit",
        heading: "1. Evaluate Workflow Fit Before Writing Custom Code",
        paragraphs: [
          "Building custom software from scratch for a standard problem—like basic counter billing—wastes time and budget when a dedicated product already exists. Conversely, forcing a complex multi-stage operational business into rigid off-the-shelf software leads to staff workarounds and shadow spreadsheets.",
        ],
      },
      {
        id: "four-questions-for-build-vs-buy",
        heading: "2. Four Questions to Guide Your Build-vs-Buy Decision",
        paragraphs: [
          "Run your operational bottleneck through these four criteria:",
        ],
        bullets: [
          "Workflow Standardization: Is this a standard retail/order workflow (use POS/OMS) or a unique process specific to your business model (build custom)?",
          "Integration Requirements: Do you need custom data synchronization across internal databases, partner portals, or legacy systems?",
          "User & Role Scaling: Will per-seat licensing on foreign SaaS tools become prohibitive as your operations team grows?",
          "Phased MVP Feasibility: Can the core operational bottleneck be solved in a focused 8–12 week Release 1 software module?",
        ],
      },
    ],
    practicalChecklist: [
      "Document your current workflow step by step, noting where spreadsheets or manual handoffs fail.",
      "Demo existing products (such as Artyx POS and OMS) first to see what is already solved out of the box.",
      "If custom software is needed, define a focused Phase 1 scope with clear user roles and database ownership.",
    ],
    relatedServiceOrProduct: {
      title: "Custom Software & Owned Products at Artyx Digital",
      description:
        "Compare our ready-to-deploy POS and OMS products or discuss a tailored custom software specification.",
      ctaLabel: "Discuss Your Software Project",
      href: "/services/custom-software/",
    },
    relatedArticleSlugs: [
      "retail-pos-software-evaluation-guide",
      "organize-facebook-instagram-orders-workflow",
    ],
    editorialReviewer: "Artyx Technical Lead",
  },
];

export function getAllInsightCategories(): InsightCategory[] {
  return Object.values(INSIGHT_CATEGORIES);
}

export function getInsightCategoryBySlug(
  slug: string,
): InsightCategory | undefined {
  return INSIGHT_CATEGORIES[slug as InsightCategorySlug];
}

export function getAllPublishedArticles(): InsightArticle[] {
  return INSIGHT_ARTICLES.filter((a) => a.status === "published");
}

export function getArticleBySlug(slug: string): InsightArticle | undefined {
  return INSIGHT_ARTICLES.find(
    (a) => a.slug === slug && a.status === "published",
  );
}

export function getArticlesByCategory(
  categorySlug: InsightCategorySlug,
): InsightArticle[] {
  return getAllPublishedArticles().filter(
    (a) =>
      a.primaryCategory === categorySlug ||
      a.secondaryCategory === categorySlug,
  );
}

export function getAuthorBySlug(slug: string): InsightAuthor | undefined {
  return INSIGHT_AUTHORS[slug];
}

export function getArticlesByAuthor(authorSlug: string): InsightArticle[] {
  return getAllPublishedArticles().filter((a) => a.authorSlug === authorSlug);
}

