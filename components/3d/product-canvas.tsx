"use client";

import { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { Product3DScene, ProductMode } from "./product-scene";

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

function Product3DFallback() {
  return (
    <div className="relative flex h-full w-full min-h-[340px] items-center justify-center rounded-2xl bg-[#080D1A]/60">
      <div className="h-8 w-8 rounded-lg border border-purple-500/40 bg-purple-500/10 animate-spin" />
    </div>
  );
}

export function ProductCanvas({ mode }: ProductCanvasProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return <Product3DFallback />;
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
