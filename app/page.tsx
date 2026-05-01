import Image from "next/image";

const launchFocus = [
  "Brand-first website experience",
  "SEO and conversion architecture",
  "Paid ads and growth automation",
];

const HomePage = () => {
  return (
    <main className="wip-shell flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
      <div className="wip-orb wip-orb-left" aria-hidden="true" />
      <div className="wip-orb wip-orb-right" aria-hidden="true" />

      <section className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-black/45 p-8 shadow-2xl backdrop-blur-lg sm:p-12">
        <p className="inline-flex rounded-full border border-white/25 bg-white/8 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
          Artyx Digital
        </p>

        <div className="mt-7 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h1 className="text-4xl leading-tight font-semibold text-white sm:text-5xl lg:text-6xl">
              New Website
              <span className="block text-[#ffd166]">In Progress</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              We are crafting a high-performance digital home for a modern
              software and digital marketing agency. The full experience is
              launching soon.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-white/90 sm:text-base">
              {launchFocus.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ffd166]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/7 p-6 sm:p-8">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border border-white/20 bg-black/30 p-4 shadow-lg sm:h-36 sm:w-36">
              <Image
                src="/logo.png"
                alt="Artyx Digital logo"
                width={140}
                height={140}
                priority
                className="h-auto w-full object-contain"
              />
            </div>

            <p className="mt-6 text-sm tracking-[0.14em] text-white/70 uppercase">
              Status
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white">
              Work In Progress
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              We are refining visuals, messaging, and performance to deliver a
              bold launch.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
