"use client";

import { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { Hero3DScene } from "./hero-scene";

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

function Hero3DFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-48 w-48 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-emerald-500/20 blur-2xl animate-pulse" />
      <div className="relative flex flex-col items-center gap-2">
        <div className="h-10 w-10 rounded-xl border border-cyan-500/40 bg-cyan-500/10 animate-spin" />
        <span className="text-xs font-medium text-slate-400">Loading 3D Engine...</span>
      </div>
    </div>
  );
}

export function HeroCanvas() {
  const isClient = useIsClient();

  if (!isClient) {
    return <Hero3DFallback />;
  }

  return (
    <div className="relative h-full w-full min-h-[360px] lg:min-h-[460px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
