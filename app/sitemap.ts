import type { MetadataRoute } from "next";
import { getAllInsightCategories, getAllPublishedArticles } from "@/lib/content/insights";
import { getAllProducts } from "@/lib/content/products";
import { getAllServices } from "@/lib/content/services";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://artyx.digital").replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/products/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/work/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/insights/", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/start-a-project/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/request-demo/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/privacy-policy/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cookie-policy/", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const serviceRoutes = getAllServices().map((service) => ({
    url: `${baseUrl}${service.canonicalPath}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const productRoutes = getAllProducts().map((product) => ({
    url: `${baseUrl}${product.canonicalPath}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  const workRoutes = getAllProjects().map((project) => ({
    url: `${baseUrl}/work/${project.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const categoryRoutes = getAllInsightCategories().map((cat) => ({
    url: `${baseUrl}/insights/category/${cat.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const articleRoutes = getAllPublishedArticles().map((article) => ({
    url: `${baseUrl}${article.canonicalPath}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...productRoutes,
    ...serviceRoutes,
    ...workRoutes,
    ...categoryRoutes,
    ...articleRoutes,
  ];
}

