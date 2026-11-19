import { ArrowLeft, Compass, Layers, Package } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-bg text-text pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-btn-primary-bg/15 border border-border/30 text-accent-text text-xs font-semibold tracking-wider uppercase mb-6">
          404 — Page Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          The page you requested could not be found.
        </h1>
        <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-10">
          The URL may have moved or been updated. Explore our core services,
          software products, or start a conversation below.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
          <Link
            href="/services/"
            className="p-5 rounded-2xl bg-surface-2 border border-border hover:border-border transition-colors group"
          >
            <Layers className="w-5 h-5 text-accent-text mb-2" />
            <div className="font-semibold text-sm text-text group-hover:text-accent-text">
              Agency Services
            </div>
            <p className="text-xs text-text-muted mt-1">
              Web, E-commerce, Software & SEO
            </p>
          </Link>

          <Link
            href="/products/"
            className="p-5 rounded-2xl bg-surface-2 border border-border hover:border-border transition-colors group"
          >
            <Package className="w-5 h-5 text-accent-text mb-2" />
            <div className="font-semibold text-sm text-text group-hover:text-accent-text">
              POS & OMS Products
            </div>
            <p className="text-xs text-text-muted mt-1">
              Retail POS & Order Management
            </p>
          </Link>

          <Link
            href="/work/"
            className="p-5 rounded-2xl bg-surface-2 border border-border hover:border-border transition-colors group"
          >
            <Compass className="w-5 h-5 text-accent-text mb-2" />
            <div className="font-semibold text-sm text-text group-hover:text-accent-text">
              Our Work
            </div>
            <p className="text-xs text-text-muted mt-1">
              Selected projects & case studies
            </p>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-primary-bg text-text text-sm font-semibold hover:bg-btn-primary-bg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-surface-2 text-text text-sm font-semibold hover:border-border transition-colors"
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}

