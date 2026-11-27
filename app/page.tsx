import type { Metadata } from "next";
import { AgencyHero } from "@/components/sections/agency-hero";
import { ClientMarqueeStrip } from "@/components/sections/client-marquee-strip";
import { AgencyServices } from "@/components/sections/agency-services";
import { AgencyPortfolio } from "@/components/sections/agency-portfolio";
import { AgencyAbout } from "@/components/sections/agency-about";
import { AgencyProcess } from "@/components/sections/agency-process";
import { AgencyTeam } from "@/components/sections/agency-team";
import { AgencyTestimonials } from "@/components/sections/agency-testimonials";
import { AgencyContact } from "@/components/sections/agency-contact";

export const metadata: Metadata = {
  title:
    "Artyx Digital | Software & Digital Marketing Agency in Dhaka — Build. Launch. Grow.",
  description:
    "Artyx Digital is a 360° creative and software agency in Dhaka — turning ideas into websites, brand identities, POS & OMS software, and digital growth.",
  alternates: {
    canonical: "https://artyx.digital/",
  },
  openGraph: {
    title: "Artyx Digital | We Build Digital Brands That Grow",
    description:
      "360° creative and software agency in Dhaka — digital marketing, brand identity, web & app development, social media, video production, and SEO growth.",
    url: "https://artyx.digital/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <AgencyHero />
      <ClientMarqueeStrip />
      <AgencyServices />
      <AgencyPortfolio />
      <AgencyAbout />
      <AgencyProcess />
      <AgencyTeam />
      <AgencyTestimonials />
      <AgencyContact />
    </>
  );
}
