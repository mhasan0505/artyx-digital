"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, PackageCheck } from "lucide-react";
import type { ProductMode } from "./product-scene";

export function ProductSchematicFallback({ mode }: { mode: ProductMode }) {
  const isPos = mode === "pos";
  return (
    <div className="relative flex h-full w-full min-h-[340px] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-6 text-center">
      <div className="absolute h-48 w-48 rounded-full bg-surface-2 blur-3xl dark:block hidden" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-2 text-accent-text shadow-lg">
          {isPos ? <ShoppingCart className="h-8 w-8" /> : <PackageCheck className="h-8 w-8" />}
        </div>
        <div className="mt-4 font-heading text-lg font-bold text-text">
          {isPos ? "Artyx POS Engine Core" : "Artyx OMS Dispatch Hub"}
        </div>
        <div className="mt-1 text-xs text-text-muted">
          {isPos
            ? "Offline-first barcode scanning, automated receipt printer & ledger"
            : "Multi-channel courier dispatch, stock sync & order lifecycles"}
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1 text-[11px] font-mono text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-text" />
          Production Architecture
        </div>
      </div>
    </div>
  );
}

export function Product3DWrapper({ mode }: { mode: ProductMode }) {
  const [Component, setComponent] = useState<React.ComponentType<{ mode: ProductMode }> | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isLargeScreen && !prefersReducedMotion) {
      setIsDesktop(true);
      const load3D = () => {
        import("./product-canvas").then((mod) => {
          setComponent(() => mod.ProductCanvas);
        });
      };
      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(load3D);
      } else {
        setTimeout(load3D, 200);
      }
    }
  }, []);

  if (!isDesktop || !Component) {
    return <ProductSchematicFallback mode={mode} />;
  }

  return <Component mode={mode} />;
}
