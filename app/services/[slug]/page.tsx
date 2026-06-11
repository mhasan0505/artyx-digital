import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
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
import Link from "next/link";
import { notFound } from "next/navigation";

const services = {
  "web-development": {
    icon: Code2,
    title: "Web Development",
    description:
      "Custom websites and web applications built with cutting-edge technology for blazing performance and stunning design.",
    gradient: "from-artyx-brand to-artyx-cyan",
    overview:
      "We build high-performance, scalable web applications that drive business growth. From responsive websites to complex web platforms, our development team delivers solutions that combine beautiful design with robust functionality.",
    features: [
      {
        title: "Responsive Design",
        description:
          "Pixel-perfect layouts that adapt seamlessly to any device or screen size.",
      },
      {
        title: "E-Commerce Solutions",
        description:
          "Custom online stores with secure payment processing and inventory management.",
      },
      {
        title: "CMS Integration",
        description:
          "Content management systems that empower your team to update content easily.",
      },
      {
        title: "Progressive Web Apps",
        description:
          "App-like experiences that work offline and load instantly on any device.",
      },
      {
        title: "API Development",
        description:
          "RESTful and GraphQL APIs that connect your systems and enable integrations.",
      },
      {
        title: "Performance Optimization",
        description:
          "Lightning-fast load times through code splitting, caching, and optimization.",
      },
    ],
    process: [
      {
        step: "Discovery",
        description:
          "We analyze your requirements, target audience, and business goals to create a comprehensive project plan.",
      },
      {
        step: "Design",
        description:
          "Our designers create wireframes and high-fidelity mockups that bring your vision to life.",
      },
      {
        step: "Development",
        description:
          "Clean, maintainable code built with modern frameworks and best practices.",
      },
      {
        step: "Testing",
        description:
          "Rigorous QA testing across devices, browsers, and scenarios to ensure flawless performance.",
      },
      {
        step: "Launch",
        description:
          "Smooth deployment with monitoring, backups, and performance optimization.",
      },
      {
        step: "Support",
        description:
          "Ongoing maintenance, updates, and technical support to keep your site running perfectly.",
      },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
    ],
    caseStudy: {
      title: "E-Commerce Platform Redesign",
      result: "300% increase in conversions",
      description:
        "We rebuilt a legacy e-commerce platform using Next.js, resulting in 3x faster load times and a 300% increase in conversion rates.",
    },
  },
  "digital-marketing": {
    icon: Rocket,
    title: "Digital Marketing",
    description:
      "Data-driven campaigns that amplify your reach, boost conversions, and deliver measurable ROI across all channels.",
    gradient: "from-artyx-gold to-artyx-rose",
    overview:
      "Our digital marketing strategies are built on data, creativity, and relentless optimization. We help businesses reach their ideal customers, generate qualified leads, and maximize their marketing ROI across all digital channels.",
    features: [
      {
        title: "SEO Optimization",
        description:
          "Dominate search results with our proven SEO strategies and technical optimization.",
      },
      {
        title: "PPC Campaigns",
        description:
          "Targeted pay-per-click campaigns that deliver immediate, measurable results.",
      },
      {
        title: "Social Media Marketing",
        description:
          "Engaging content and community management that builds brand loyalty.",
      },
      {
        title: "Email Marketing",
        description:
          "Automated email sequences that nurture leads and drive conversions.",
      },
      {
        title: "Analytics & Reporting",
        description:
          "Comprehensive dashboards that track KPIs and inform strategic decisions.",
      },
      {
        title: "Conversion Optimization",
        description:
          "A/B testing and UX improvements that maximize your conversion rates.",
      },
    ],
    process: [
      {
        step: "Audit",
        description:
          "We analyze your current digital presence, competitors, and market opportunities.",
      },
      {
        step: "Strategy",
        description:
          "Custom marketing plan aligned with your business goals and budget.",
      },
      {
        step: "Execution",
        description:
          "Campaign launch across selected channels with compelling creative assets.",
      },
      {
        step: "Monitor",
        description:
          "Real-time tracking and optimization to maximize performance.",
      },
      {
        step: "Report",
        description:
          "Transparent reporting with actionable insights and recommendations.",
      },
      {
        step: "Scale",
        description:
          "Expand successful campaigns and explore new growth opportunities.",
      },
    ],
    tech: [
      "Google Ads",
      "Meta Ads",
      "Google Analytics",
      "SEMrush",
      "HubSpot",
      "Mailchimp",
      "Hotjar",
      "Ahrefs",
    ],
    caseStudy: {
      title: "Social Media Campaign",
      result: "2M+ impressions in 30 days",
      description:
        "A viral social media campaign that generated over 2 million impressions and 50,000 engagements in just 30 days.",
    },
  },
  "content-creation": {
    icon: Palette,
    title: "Content Creation",
    description:
      "Compelling visual and written content that tells your brand story and engages your audience across platforms.",
    gradient: "from-artyx-purple to-artyx-rose",
    overview:
      "Great content is the foundation of every successful digital strategy. Our creative team produces high-quality visual and written content that captures attention, tells your story, and drives engagement across all platforms.",
    features: [
      {
        title: "Video Production",
        description:
          "Professional videos from concept to final edit, optimized for every platform.",
      },
      {
        title: "Graphic Design",
        description:
          "Eye-catching visuals that communicate your message and strengthen your brand.",
      },
      {
        title: "Copywriting",
        description:
          "Persuasive copy that converts visitors into customers and builds trust.",
      },
      {
        title: "Social Media Content",
        description:
          "Platform-specific content that drives engagement and grows your following.",
      },
      {
        title: "Blog & Articles",
        description:
          "SEO-optimized long-form content that establishes thought leadership.",
      },
      {
        title: "Brand Photography",
        description:
          "Professional photography that captures your brand essence and products.",
      },
    ],
    process: [
      {
        step: "Brief",
        description:
          "We gather your requirements, brand guidelines, and content objectives.",
      },
      {
        step: "Concept",
        description:
          "Creative concepts and storyboards that align with your brand voice.",
      },
      {
        step: "Production",
        description:
          "Professional creation of content with attention to every detail.",
      },
      {
        step: "Review",
        description:
          "Collaborative review process with revisions until you're 100% satisfied.",
      },
      {
        step: "Delivery",
        description:
          "Final assets delivered in all required formats and specifications.",
      },
      {
        step: "Distribution",
        description:
          "Strategic publishing and promotion across your chosen channels.",
      },
    ],
    tech: [
      "Adobe Creative Suite",
      "Figma",
      "DaVinci Resolve",
      "Canva",
      "Notion",
      "WordPress",
      "Premiere Pro",
      "After Effects",
    ],
    caseStudy: {
      title: "Brand Content Strategy",
      result: "400% increase in engagement",
      description:
        "A comprehensive content strategy that transformed a brand's social media presence and quadrupled engagement rates.",
    },
  },
  branding: {
    icon: Layers,
    title: "Branding & Identity",
    description:
      "Strategic brand development that creates lasting impressions and builds trust with your target audience.",
    gradient: "from-artyx-emerald to-artyx-brand",
    overview:
      "Your brand is more than a logo—it's the sum of every interaction people have with your business. We develop comprehensive brand identities that resonate with your audience, differentiate you from competitors, and build lasting trust.",
    features: [
      {
        title: "Logo Design",
        description:
          "Distinctive logos that capture your brand essence and work across all mediums.",
      },
      {
        title: "Brand Guidelines",
        description:
          "Comprehensive documentation that ensures consistent brand application.",
      },
      {
        title: "Visual Identity",
        description:
          "Cohesive visual systems including colors, typography, and imagery styles.",
      },
      {
        title: "Brand Strategy",
        description:
          "Strategic positioning that defines your unique value proposition.",
      },
      {
        title: "Packaging Design",
        description:
          "Product packaging that stands out on shelves and reinforces brand identity.",
      },
      {
        title: "Brand Voice",
        description:
          "Distinctive tone and messaging guidelines for all communications.",
      },
    ],
    process: [
      {
        step: "Research",
        description:
          "Market analysis, competitor review, and audience insights gathering.",
      },
      {
        step: "Strategy",
        description: "Brand positioning, values, and personality definition.",
      },
      {
        step: "Concept",
        description:
          "Multiple creative directions exploring different brand expressions.",
      },
      {
        step: "Refine",
        description:
          "Iterative refinement based on feedback until the perfect identity emerges.",
      },
      {
        step: "System",
        description:
          "Complete brand system with guidelines, assets, and application examples.",
      },
      {
        step: "Launch",
        description:
          "Brand rollout strategy and implementation support across all touchpoints.",
      },
    ],
    tech: [
      "Illustrator",
      "Photoshop",
      "Figma",
      "InDesign",
      "After Effects",
      "Blender",
      "Procreate",
      "Sketch",
    ],
    caseStudy: {
      title: "Tech Startup Rebrand",
      result: "150% increase in brand recognition",
      description:
        "A complete brand overhaul that transformed a startup's image and increased brand recognition by 150%.",
    },
  },
  "saas-development": {
    icon: Shield,
    title: "SaaS Development",
    description:
      "Scalable software-as-a-service platforms engineered for performance, security, and seamless user experience.",
    gradient: "from-artyx-cyan to-artyx-purple",
    overview:
      "We build SaaS platforms that scale with your business. From MVP to enterprise-grade solutions, our development team creates secure, performant, and user-friendly software that your customers will love.",
    features: [
      {
        title: "Multi-tenant Architecture",
        description:
          "Secure, isolated environments that serve multiple customers efficiently.",
      },
      {
        title: "Subscription Billing",
        description:
          "Integrated payment processing with flexible pricing tiers and billing cycles.",
      },
      {
        title: "User Management",
        description:
          "Role-based access control, authentication, and user lifecycle management.",
      },
      {
        title: "API Integration",
        description:
          "Seamless connections with third-party services and your existing systems.",
      },
      {
        title: "Cloud Infrastructure",
        description:
          "Scalable cloud architecture that grows with your user base.",
      },
      {
        title: "Security & Compliance",
        description:
          "Enterprise-grade security with GDPR, SOC2, and industry compliance.",
      },
    ],
    process: [
      {
        step: "Discovery",
        description:
          "Requirements gathering, user research, and technical architecture planning.",
      },
      {
        step: "MVP",
        description:
          "Rapid development of a minimum viable product to validate your concept.",
      },
      {
        step: "Iterate",
        description:
          "Agile development cycles with continuous feedback and improvement.",
      },
      {
        step: "Scale",
        description:
          "Infrastructure optimization and feature expansion for growth.",
      },
      {
        step: "Launch",
        description:
          "Production deployment with monitoring, alerts, and performance tuning.",
      },
      {
        step: "Evolve",
        description:
          "Ongoing development based on user feedback and market demands.",
      },
    ],
    tech: [
      "Next.js",
      "Prisma",
      "Stripe",
      "AWS",
      "Docker",
      "Redis",
      "PostgreSQL",
      "TypeScript",
    ],
    caseStudy: {
      title: "Analytics SaaS Platform",
      result: "10K+ daily active users",
      description:
        "A comprehensive analytics platform that serves over 10,000 daily active users with real-time data processing.",
    },
  },
  "pos-software": {
    icon: Zap,
    title: "POS Software",
    description:
      "Intelligent point-of-sale systems that streamline operations, manage inventory, and accelerate your business growth.",
    gradient: "from-artyx-rose to-artyx-gold",
    overview:
      "Our POS solutions are designed for businesses that demand reliability, speed, and intelligence. From single-location retailers to multi-chain operations, we build POS systems that simplify operations and provide actionable business insights.",
    features: [
      {
        title: "Inventory Management",
        description:
          "Real-time stock tracking, automated reordering, and multi-location sync.",
      },
      {
        title: "Sales Analytics",
        description:
          "Comprehensive reporting on sales trends, peak hours, and product performance.",
      },
      {
        title: "Employee Management",
        description:
          "Staff scheduling, performance tracking, and role-based permissions.",
      },
      {
        title: "Customer Loyalty",
        description:
          "Built-in loyalty programs, rewards, and customer relationship management.",
      },
      {
        title: "Multi-location Support",
        description:
          "Centralized management for businesses with multiple locations.",
      },
      {
        title: "Offline Mode",
        description:
          "Continue processing transactions even when internet connectivity is lost.",
      },
    ],
    process: [
      {
        step: "Consultation",
        description:
          "Understanding your business operations, pain points, and requirements.",
      },
      {
        step: "Design",
        description:
          "Intuitive interface design optimized for speed and ease of use.",
      },
      {
        step: "Development",
        description:
          "Robust POS system built with reliability and performance in mind.",
      },
      {
        step: "Integration",
        description:
          "Connection with payment processors, accounting software, and inventory systems.",
      },
      {
        step: "Training",
        description:
          "Comprehensive staff training and documentation for smooth adoption.",
      },
      {
        step: "Support",
        description: "24/7 technical support and regular feature updates.",
      },
    ],
    tech: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Firebase",
      "AWS",
      "Redis",
      "Docker",
    ],
    caseStudy: {
      title: "Restaurant Chain POS",
      result: "50+ locations deployed",
      description:
        "Custom POS solution deployed across 50+ restaurant locations, reducing order processing time by 40%.",
    },
  },
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
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
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-artyx-brand/5 text-artyx-brand text-sm font-medium mb-6`}
            >
              <Icon className="w-4 h-4" />
              {service.title}
            </div>
          </ScrollReveal>
          <AnimatedText
            text={service.title}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
            delay={0.2}
            staggerDelay={0.03}
          />
          <ScrollReveal delay={0.4}>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              {service.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-gray-600 text-lg leading-relaxed text-center">
              {service.overview}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What We <span className="text-artyx-brand">Deliver</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-artyx-brand/30 transition-all group">
                  <CheckCircle2 className="w-5 h-5 text-artyx-brand mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-artyx-brand">Process</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {service.process.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  <div
                    className={`w-12 h-12 rounded-xl bg-artyx-brand flex items-center justify-center text-white font-bold shrink-0`}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {step.step}
                    </h3>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Technologies We <span className="text-artyx-brand">Use</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {service.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm hover:border-artyx-brand/30 hover:text-artyx-brand transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <span className="text-artyx-brand text-sm font-medium tracking-wider uppercase">
                Case Study
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                {service.caseStudy.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.caseStudy.description}
              </p>
              <div
                className={`inline-block px-4 py-2 rounded-full bg-artyx-brand text-white font-semibold`}
              >
                {service.caseStudy.result}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get <span className="text-artyx-brand">Started</span>?
            </h2>
            <p className="text-gray-600 mb-8">
              Let's discuss how we can bring your vision to life with our
              expertise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                as="a"
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-artyx-brand text-white font-semibold hover:bg-artyx-brand/90 transition-colors"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <Link
                href="/services"
                className="text-gray-500 hover:text-artyx-brand transition-colors text-sm"
              >
                ← Back to Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
