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

const PARTNER_BRANDS_REVERSED = [
  "Artyx OMS",
  "Best Laptop Gallery",
  "Tech Drive",
  "Natural Foods",
  "Mètisse Restaurant",
  "Sansli by Zebin",
  "Laptop Point BD",
  "Artyx POS",
];

export function ClientMarqueeStrip() {
  return (
    <section
      aria-label="Clients and platforms built by Artyx Digital"
      className="w-full overflow-hidden border-b border-[#DDE3F5] bg-[#F5F7FF] py-7"
    >
      {/* Row 1 — Scrolling Left */}
      <div className="animate-marquee-left flex items-center">
        {[0, 1].map((trackIdx) => (
          <div
            key={`l-${trackIdx}`}
            aria-hidden={trackIdx === 1}
            className="flex shrink-0 items-center"
          >
            {PARTNER_BRANDS.map((brand) => (
              <div key={`l-${trackIdx}-${brand}`} className="flex items-center">
                <span className="px-7 text-sm font-semibold tracking-wide text-[#3D4A6B] transition-colors duration-200 hover:text-[#1A56DB] sm:px-9 sm:text-base">
                  {brand}
                </span>
                <span aria-hidden="true" className="text-[#DDE3F5]">
                  /
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Row 2 — Scrolling Right (Both Directions) */}
      <div className="animate-marquee-right mt-3 flex items-center">
        {[0, 1].map((trackIdx) => (
          <div
            key={`r-${trackIdx}`}
            aria-hidden={trackIdx === 1}
            className="flex shrink-0 items-center"
          >
            {PARTNER_BRANDS_REVERSED.map((brand) => (
              <div key={`r-${trackIdx}-${brand}`} className="flex items-center">
                <span className="px-7 text-sm font-semibold tracking-wide text-[#8A9BC4] transition-colors duration-200 hover:text-[#1A56DB] sm:px-9 sm:text-base">
                  {brand}
                </span>
                <span aria-hidden="true" className="text-[#DDE3F5]">
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
