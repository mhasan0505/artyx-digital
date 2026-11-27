import { ScrollReveal } from "./scroll-reveal";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn your business, goals, audience and competitors inside out before touching a pixel.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "We build a custom roadmap — creative direction, tech stack, milestones and clear timelines.",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Our team designs, builds and launches with engineering precision and speed.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "We track performance, optimise conversion funnels and scale what's working month after month.",
  },
];

export function AgencyProcess() {
  return (
    <section
      id="process"
      className="w-full border-b border-[#DDE3F5] bg-[#FFFFFF] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <ScrollReveal variant="heading" className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium tracking-[0.08em] text-[#1A56DB]">
            Our Process
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-[#0D1333] sm:text-4xl lg:text-[48px]">
            How We Work
          </h2>
        </ScrollReveal>

        {/* Big 4-Step Horizontal Process Connected by Visible Blue Dashed Line */}
        <div className="relative mt-16 lg:mt-20">
          {/* Horizontal Dashed Connector on Desktop (exact center of 64px circle = top-8) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-8 right-[12%] left-[12%] hidden border-t-2 border-dashed border-[#1A56DB]/30 lg:block"
          />
          {/* Vertical Left Dashed Connector on Mobile */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-8 bottom-8 left-8 border-l-2 border-dashed border-[#1A56DB]/30 lg:hidden"
          />

          <ScrollReveal
            variant="grid"
            className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8"
          >
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative flex items-start gap-6 lg:flex-col lg:items-center lg:text-center"
              >
                {/* 64px Diameter Circle with 2px Royal Blue Border */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#1A56DB] bg-[#FFFFFF] font-display text-[24px] font-bold text-[#1A56DB] shadow-[0_4px_16px_rgba(26,86,219,0.1)]">
                  {step.number}
                </div>

                <div className="pt-1 lg:pt-3">
                  <h3 className="font-display text-[20px] font-semibold text-[#0D1333]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.65] text-[#3D4A6B]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
