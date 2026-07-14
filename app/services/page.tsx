import { CTASection } from "@/components/sections/cta-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TechIcon } from "@/components/ui/tech-icon";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Palette,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";

const services = [
  {
    slug: "web-development",
    icon: Code2,
    title: "Web Development",
    description:
      "Custom websites and web applications built with cutting-edge technology for blazing performance and stunning design.",
    features: [
      "Responsive Design",
      "E-Commerce Solutions",
      "CMS Integration",
      "Progressive Web Apps",
      "API Development",
      "Performance Optimization",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
    ],
    gradient: "from-artyx-brand to-artyx-cyan",
  },
  {
    slug: "digital-marketing",
    icon: Rocket,
    title: "Digital Marketing",
    description:
      "Data-driven campaigns that amplify your reach, boost conversions, and deliver measurable ROI across all channels.",
    features: [
      "SEO Optimization",
      "PPC Campaigns",
      "Social Media Marketing",
      "Email Marketing",
      "Analytics & Reporting",
      "Conversion Optimization",
    ],
    tech: [
      "Google Ads",
      "Meta Ads",
      "Analytics",
      "SEMrush",
      "HubSpot",
      "Mailchimp",
    ],
    gradient: "from-artyx-gold to-artyx-rose",
  },
  {
    slug: "content-creation",
    icon: Palette,
    title: "Content Creation",
    description:
      "Compelling visual and written content that tells your brand story and engages your audience across platforms.",
    features: [
      "Video Production",
      "Graphic Design",
      "Copywriting",
      "Social Media Content",
      "Blog & Articles",
      "Brand Photography",
    ],
    tech: [
      "Adobe Creative Suite",
      "Figma",
      "DaVinci Resolve",
      "Canva",
      "Notion",
      "WordPress",
    ],
    gradient: "from-artyx-purple to-artyx-rose",
  },
  {
    slug: "branding",
    icon: Layers,
    title: "Branding & Identity",
    description:
      "Strategic brand development that creates lasting impressions and builds trust with your target audience.",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Visual Identity",
      "Brand Strategy",
      "Packaging Design",
      "Brand Voice",
    ],
    tech: [
      "Illustrator",
      "Photoshop",
      "Figma",
      "InDesign",
      "After Effects",
      "Blender",
    ],
    gradient: "from-artyx-emerald to-artyx-brand",
  },
  {
    slug: "saas-development",
    icon: Shield,
    title: "SaaS Development",
    description:
      "Scalable software-as-a-service platforms engineered for performance, security, and seamless user experience.",
    features: [
      "Multi-tenant Architecture",
      "Subscription Billing",
      "User Management",
      "API Integration",
      "Cloud Infrastructure",
      "Security & Compliance",
    ],
    tech: ["Next.js", "Prisma", "Stripe", "AWS", "Docker", "Redis"],
    gradient: "from-artyx-cyan to-artyx-purple",
  },
  {
    slug: "pos-software",
    icon: Zap,
    title: "POS Software",
    description:
      "Intelligent point-of-sale systems that streamline operations, manage inventory, and accelerate your business growth.",
    features: [
      "Inventory Management",
      "Sales Analytics",
      "Employee Management",
      "Customer Loyalty",
      "Multi-location Support",
      "Offline Mode",
    ],
    tech: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Firebase",
      "AWS",
    ],
    gradient: "from-artyx-rose to-artyx-gold",
  },
];

export default function ServicesHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
        {/* Abstract background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-48 h-48 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#0078d7"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="none"
                stroke="#0078d7"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="absolute bottom-20 left-20 w-40 h-40 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon
                points="100,20 180,180 20,180"
                fill="none"
                stroke="#0078d7"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-artyx-brand/20 bg-artyx-brand/5 text-artyx-brand text-sm font-medium mb-6">
              Our Services
            </span>
          </ScrollReveal>
          <AnimatedText
            text="Everything You Need to Dominate Digital"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
            delay={0.2}
            staggerDelay={0.03}
          />
          <ScrollReveal delay={0.4}>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              From concept to launch and beyond, we provide comprehensive
              digital solutions that transform businesses and captivate
              audiences.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug}>
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Content */}
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-artyx-brand/5 text-artyx-brand text-sm font-medium mb-6`}
                    >
                      <service.icon className="w-4 h-4" />
                      {service.title}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-gray-700 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-artyx-brand" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.tech.map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-500 text-xs hover:border-artyx-brand/30 hover:text-artyx-brand transition-colors cursor-default"
                        >
                          <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                            <TechIcon name={tech} />
                          </div>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <MagneticButton
                      as="a"
                      href={`/services/${service.slug}`}
                      className="group inline-flex items-center gap-2 text-artyx-brand font-medium hover:gap-3 transition-all"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                  </div>

                  {/* Visual */}
                  <div
                    className={`relative aspect-square rounded-3xl bg-artyx-brand/5 border border-gray-100`}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
