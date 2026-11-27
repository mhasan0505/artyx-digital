const PARTNER_BRANDS = [
  "Laptop Point BD",
  "Sansli by Zebin",
  "Mètisse Restaurant",
  "Natural Foods",
  "Tech Drive",
  "Best Laptop Gallery",
  "Artyx POS",
  "Artyx OMS",
];

export function ClientMarqueeStrip() {
  return (
    <section
      aria-label="Brands and products built by Artyx Digital"
      className="w-full overflow-hidden border-y border-[#1E2D5A] bg-[#0D1333] py-6"
    >
      <div className="animate-logo-marquee flex items-center">
        {[0, 1].map((trackIdx) => (
          <div
            key={trackIdx}
            aria-hidden={trackIdx === 1}
            className="flex shrink-0 items-center"
          >
            {PARTNER_BRANDS.map((brand) => (
              <div
                key={`${trackIdx}-${brand}`}
                className="flex items-center"
              >
                <span className="font-display px-7 text-base font-bold tracking-[0.06em] text-[#8A9BC4] transition-colors duration-200 hover:text-white sm:px-10 sm:text-lg">
                  {brand}
                </span>
                <span
                  aria-hidden="true"
                  className="text-lg font-bold text-[#00C2FF]/60"
                >
                  ·
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
