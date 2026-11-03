import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/book-a-demo",
        destination: "/request-demo/",
        permanent: true,
      },
      {
        source: "/book-a-demo/",
        destination: "/request-demo/",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/work/",
        permanent: true,
      },
      {
        source: "/portfolio/",
        destination: "/work/",
        permanent: true,
      },
      {
        source: "/portfolio/:slug",
        destination: "/work/:slug/",
        permanent: true,
      },
      {
        source: "/portfolio/:slug/",
        destination: "/work/:slug/",
        permanent: true,
      },
      {
        source: "/services/pos-software",
        destination: "/products/pos/",
        permanent: true,
      },
      {
        source: "/services/pos-software/",
        destination: "/products/pos/",
        permanent: true,
      },
      {
        source: "/services/ecommerce-development",
        destination: "/services/ecommerce-website-development/",
        permanent: true,
      },
      {
        source: "/services/ecommerce-development/",
        destination: "/services/ecommerce-website-development/",
        permanent: true,
      },
      {
        source: "/services/content-creation",
        destination: "/services/digital-marketing/#content-strategy",
        permanent: true,
      },
      {
        source: "/services/content-creation/",
        destination: "/services/digital-marketing/#content-strategy",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/insights/",
        permanent: true,
      },
      {
        source: "/blog/",
        destination: "/insights/",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy/",
        permanent: true,
      },
      {
        source: "/privacy/",
        destination: "/privacy-policy/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
