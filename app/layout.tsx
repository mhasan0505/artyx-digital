import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://artyx.digital/"),
  title:
    "Artyx Digital | Software & Digital Marketing Agency in Dhaka — Build. Launch. Grow.",
  description:
    "360° creative and software agency in Dhaka — websites, brands, business software, and digital marketing that actually move the needle.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/logo.webp", type: "image/webp" }],
    apple: [{ url: "/logo.webp", type: "image/webp" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://artyx.digital/",
    siteName: "Artyx Digital",
    title: "Artyx Digital | We Build Digital Brands That Grow",
    description:
      "360° creative and software agency in Dhaka — websites, brand identity, POS & OMS software, and performance marketing.",
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
    description:
      "360° creative and software agency in Dhaka — websites, brands and marketing that actually move the needle.",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased font-sans ${syne.variable} ${inter.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="nga5AcPIwkGznF1KLfPLcL_MJhGJJrJwjzjRKpP1CAQ"
        />
        <link
          rel="preload"
          as="image"
          href="/logo.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#0D1333] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#1A56DB] focus:text-white focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
