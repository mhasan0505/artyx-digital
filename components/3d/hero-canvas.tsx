"use client";

import { Suspense, useState, useEffect, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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

export function HeroCanvas() {
  const isClient = useIsClient();
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    // Check if mobile or reduced motion (desktop only for WebGL)
    const isMobile = window.innerWidth < 1024;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || reducedMotion) {
      setShouldRender3D(false);
      return;
    }

    // Defer 3D Canvas mount until first user interaction or after initial idle
    const activate = () => {
      setShouldRender3D(true);
      window.removeEventListener("scroll", activate);
      window.removeEventListener("mousemove", activate);
      window.removeEventListener("touchstart", activate);
    };

    window.addEventListener("scroll", activate, { passive: true, once: true });
    window.addEventListener("mousemove", activate, { passive: true, once: true });
    window.addEventListener("touchstart", activate, { passive: true, once: true });

    const timer = setTimeout(activate, 150);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", activate);
      window.removeEventListener("mousemove", activate);
      window.removeEventListener("touchstart", activate);
    };
  }, []);

  if (!isClient || !shouldRender3D) {
    return null;
  }

  return (
    <div className="relative h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        <Suspense fallback={null}>
          <Hero3DScene />
          <EffectComposer multisampling={0}>
            <Bloom
              mipmapBlur
              intensity={0.3}
              luminanceThreshold={0.88}
              luminanceSmoothing={0.12}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
