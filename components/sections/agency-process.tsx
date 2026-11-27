import { ScrollReveal } from "./scroll-reveal";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn your business, goals, audience and competitors inside out.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "We build a custom roadmap — creative direction, tech stack, timeline.",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Our team designs, builds and launches with precision and speed.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "We track, optimise and scale what's working month after month.",
  },
];

export function AgencyProcess() {
  return (
    <section
      id="process"
      className="w-full border-y border-[#1E2D5A] bg-[#0D1333] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Centered Header */}
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-medium text-[#00C2FF]">Our Process</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[48px]">
              How We Work
            </h2>
          </div>

          {/* 4-Step Horizontal Layout (Desktop) / Vertical (Mobile) Connected by Dashed Line */}
          <div className="relative mt-16">
            {/* Horizontal Dashed Connector on Desktop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-7 right-[12%] left-[12%] hidden border-t-2 border-dashed border-[#1E2D5A] lg:block"
            />
            {/* Vertical Dashed Connector on Mobile */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-7 bottom-7 left-7 border-l-2 border-dashed border-[#1E2D5A] lg:hidden"
            />

            <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
              {PROCESS_STEPS.map((step) => (
                <li
                  key={step.number}
                  className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:text-center"
                >
                  {/* Circle Number Badge */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#00C2FF] bg-[#05091A] font-display text-lg font-bold text-[#00C2FF] shadow-[0_0_20px_rgba(0,194,255,0.18)]">
                    {step.number}
                  </div>

                  <div className="pt-1 lg:pt-2">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#8A9BC4]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
