import { CookieConsentBanner } from "@/components/consent/cookie-consent-banner";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import {
  buildOrganizationAndWebsiteSchema,
  JsonLd,
} from "@/components/seo/json-ld";
import { COMPANY_ENTITY } from "@/lib/content/company";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  Geist_Mono,
  Hind_Siliguri,
  Inter,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_ENTITY.url),
  title: {
    default:
      "Artyx Digital | Digital Agency in Bangladesh — Websites, Software & Growth",
    template: "%s",
  },
  description:
    "Artyx Digital helps businesses build websites, e-commerce experiences, and custom software, manage operations with POS and OMS solutions, and grow through digital marketing.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: COMPANY_ENTITY.url,
    siteName: COMPANY_ENTITY.name,
    title:
      "Artyx Digital | Digital Agency in Bangladesh — Websites, Software & Growth",
    description: COMPANY_ENTITY.consistentDescription,
  },
};

export const viewport = {
  themeColor: "#0B1020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        spaceGrotesk.variable,
        hindSiliguri.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <head>
        <meta
          name="google-site-verification"
          content="nga5AcPIwkGznF1KLfPLcL_MJhGJJrJwjzjRKpP1CAQ"
        />
        <JsonLd data={buildOrganizationAndWebsiteSchema()} />
      </head>
      <body className="min-h-full flex flex-col bg-[#070B18] text-[#F8FAFC]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#4D7CFE] focus:text-white focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <SmoothScrollProvider>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </SmoothScrollProvider>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
