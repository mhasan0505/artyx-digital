import type { MetadataRoute } from "next";

/**
 * Robots policy per Draft v2 Section 18:
 * - Explicitly allows Googlebot, Bingbot, and OAI-SearchBot (ChatGPT Search discovery)
 * - Independently disallows GPTBot (model training) by default unless explicitly enabled
 * - Disallows /api/ routes
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://artyx.digital").replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: ["*", "Googlebot", "Bingbot", "OAI-SearchBot"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

