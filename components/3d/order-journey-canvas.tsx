"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { OrderJourneyScene } from "./order-journey-scene";

function SceneDisposer() {
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    return () => {
      if (sceneRef.current) {
        sceneRef.current.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) {
            mesh.geometry.dispose();
          }
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => {
                m.dispose();
              });
            } else {
              mesh.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return null;
}

export interface OrderJourneyCanvasProps {
  isInView?: boolean;
}

export function OrderJourneyCanvas({ isInView = true }: OrderJourneyCanvasProps) {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [-3, 3.0, 6.8], fov: 40 }}
        dpr={[1, 1.25]}
        frameloop={isInView ? "always" : "demand"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ scene, gl }) => {
          scene.background = null;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        <SceneDisposer />
        <Suspense fallback={null}>
          <OrderJourneyScene />
          <EffectComposer multisampling={0}>
            <Bloom
              mipmapBlur
              intensity={0.3}
              luminanceThreshold={0.9}
              luminanceSmoothing={0.1}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
