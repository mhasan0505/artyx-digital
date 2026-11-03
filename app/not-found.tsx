import { ArrowLeft, Compass, Layers, Package } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#0B1020] text-[#F8FAFC] pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#4D7CFE]/15 border border-[#4D7CFE]/30 text-[#4D7CFE] text-xs font-semibold tracking-wider uppercase mb-6">
          404 — Page Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          The page you requested could not be found.
        </h1>
        <p className="text-[#A7B0C0] text-base sm:text-lg leading-relaxed mb-10">
          The URL may have moved or been updated. Explore our core services,
          software products, or start a conversation below.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
          <Link
            href="/services/"
            className="p-5 rounded-2xl bg-[#121A2D] border border-[#273248] hover:border-[#4D7CFE] transition-colors group"
          >
            <Layers className="w-5 h-5 text-[#4D7CFE] mb-2" />
            <div className="font-semibold text-sm text-[#F8FAFC] group-hover:text-[#4D7CFE]">
              Agency Services
            </div>
            <p className="text-xs text-[#A7B0C0] mt-1">
              Web, E-commerce, Software & SEO
            </p>
          </Link>

          <Link
            href="/products/"
            className="p-5 rounded-2xl bg-[#121A2D] border border-[#273248] hover:border-[#4D7CFE] transition-colors group"
          >
            <Package className="w-5 h-5 text-[#8B5CF6] mb-2" />
            <div className="font-semibold text-sm text-[#F8FAFC] group-hover:text-[#4D7CFE]">
              POS & OMS Products
            </div>
            <p className="text-xs text-[#A7B0C0] mt-1">
              Retail POS & Order Management
            </p>
          </Link>

          <Link
            href="/work/"
            className="p-5 rounded-2xl bg-[#121A2D] border border-[#273248] hover:border-[#4D7CFE] transition-colors group"
          >
            <Compass className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="font-semibold text-sm text-[#F8FAFC] group-hover:text-[#4D7CFE]">
              Our Work
            </div>
            <p className="text-xs text-[#A7B0C0] mt-1">
              Selected projects & case studies
            </p>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4D7CFE] text-white text-sm font-semibold hover:bg-[#3b69eb] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#273248] bg-[#121A2D] text-[#F8FAFC] text-sm font-semibold hover:border-[#4D7CFE] transition-colors"
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}

