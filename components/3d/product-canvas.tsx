"use client";

import { Suspense, useState, useEffect, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { Product3DScene, ProductMode } from "./product-scene";
import { ShoppingCart, PackageCheck } from "lucide-react";

interface ProductCanvasProps {
  mode: ProductMode;
}

function subscribe() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

function ProductSchematicFallback({ mode }: ProductCanvasProps) {
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

export function ProductCanvas({ mode }: ProductCanvasProps) {
  const isClient = useIsClient();
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || reducedMotion) {
      setShouldRender3D(false);
      return;
    }

    if ("requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        setShouldRender3D(true);
      });
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => setShouldRender3D(true), 200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isClient || !shouldRender3D) {
    return <ProductSchematicFallback mode={mode} />;
  }

  return (
    <div className="relative h-full w-full min-h-[340px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <Product3DScene mode={mode} />
        </Suspense>
      </Canvas>
    </div>
  );
}
