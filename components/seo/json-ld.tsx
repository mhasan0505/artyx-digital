import { COMPANY_ENTITY } from "@/lib/content/company";

export function buildOrganizationAndWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": COMPANY_ENTITY.organizationId,
        name: COMPANY_ENTITY.name,
        url: COMPANY_ENTITY.url,
        logo: {
          "@type": "ImageObject",
          url: "https://artyx.digital/logo-full-for-dark-bg.png",
          caption: "Artyx Digital Logo",
        },
        image: [
          "https://artyx.digital/logo-compact-for-dark-bg.png",
          "https://artyx.digital/logo-compact-for-light-bg.png",
        ],
        description: COMPANY_ENTITY.consistentDescription,
        email: COMPANY_ENTITY.email,
        telephone: COMPANY_ENTITY.phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY_ENTITY.address.streetAddress,
          addressLocality: COMPANY_ENTITY.address.addressLocality,
          postalCode: COMPANY_ENTITY.address.postalCode,
          addressCountry: COMPANY_ENTITY.address.addressCountry,
        },
      },
      {
        "@type": "WebSite",
        "@id": COMPANY_ENTITY.websiteId,
        url: COMPANY_ENTITY.url,
        name: COMPANY_ENTITY.name,
        publisher: {
          "@id": COMPANY_ENTITY.organizationId,
        },
        inLanguage: "en",
      },
    ],
  };
}

export function buildServiceSchema({
  name,
  description,
  canonicalPath,
}: {
  name: string;
  description: string;
  canonicalPath: string;
}) {
  const fullUrl = `https://artyx.digital${canonicalPath}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${fullUrl}#service`,
    name,
    description,
    url: fullUrl,
    provider: {
      "@id": COMPANY_ENTITY.organizationId,
    },
    areaServed: [
      { "@type": "Country", name: "Bangladesh" },
      { "@type": "Place", name: "Worldwide" },
    ],
  };
}

/**
 * Semantic SoftwareApplication schema per Draft v2 Section 0 & Section 18.1.
 * Strictly avoids fabricating ratings, reviews, or fake offer prices.
 */
export function buildSoftwareApplicationSchema({
  name,
  description,
  canonicalPath,
  applicationCategory = "BusinessApplication",
}: {
  name: string;
  description: string;
  canonicalPath: string;
  applicationCategory?: string;
}) {
  const fullUrl = `https://artyx.digital${canonicalPath}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${fullUrl}#software`,
    name,
    description,
    url: fullUrl,
    applicationCategory,
    operatingSystem: "Web Browser",
    publisher: {
      "@id": COMPANY_ENTITY.organizationId,
    },
  };
}

export function buildArticleSchema({
  title,
  description,
  canonicalPath,
  publishedAt,
  updatedAt,
  authorName,
  authorSlug,
}: {
  title: string;
  description: string;
  canonicalPath: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  authorSlug: string;
}) {
  const fullUrl = `https://artyx.digital${canonicalPath}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${fullUrl}#article`,
    headline: title,
    description,
    url: fullUrl,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Person",
      name: authorName,
      url: `https://artyx.digital/authors/${authorSlug}/`,
    },
    publisher: {
      "@id": COMPANY_ENTITY.organizationId,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `https://artyx.digital${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

