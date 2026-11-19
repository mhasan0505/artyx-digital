import { CookieConsentBanner } from "@/components/consent/cookie-consent-banner";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Preloader } from "@/components/ui/preloader";
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
  Unbounded,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  preload: true,
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-badge-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-badge-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/icon-badge-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: COMPANY_ENTITY.url,
    siteName: COMPANY_ENTITY.name,
    title:
      "Artyx Digital | Digital Agency in Bangladesh — Websites, Software & Growth",
    description: COMPANY_ENTITY.consistentDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Artyx Digital — Build. Launch. Grow.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artyx Digital | Build. Launch. Grow.",
    description: COMPANY_ENTITY.consistentDescription,
    images: ["/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#070B06",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        spaceGrotesk.variable,
        unbounded.variable,
        hindSiliguri.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('artyx_theme');var t=(s==='light'||s==='dark')?s:'dark';var d=document.documentElement;d.classList.remove('light','dark');d.classList.add(t);d.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <meta
          name="google-site-verification"
          content="nga5AcPIwkGznF1KLfPLcL_MJhGJJrJwjzjRKpP1CAQ"
        />
        <link
          rel="preload"
          as="image"
          href="/logo-compact-for-dark-bg.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <JsonLd data={buildOrganizationAndWebsiteSchema()} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text antialiased">
        <ThemeProvider>
          <Preloader />
          <CustomCursor />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-btn-primary-bg focus:text-btn-primary-fg focus:font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
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
        </ThemeProvider>
      </body>
    </html>
  );
}
