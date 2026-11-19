"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Html, PresentationControls } from "@react-three/drei";

export type ProductMode = "pos" | "oms";

interface Product3DSceneProps {
  mode: ProductMode;
}

const BRAND_LIME = "#7FFF00";
const BRAND_GRAPHITE = "#333333";
const BRAND_DARK = "#070B06";

// 3D POS System Model (Clean Brand Palette: Lime + Graphite + Near-black + White)
function Pos3DModel() {
  const terminalRef = useRef<THREE.Group>(null!);
  const scannerLaser = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!terminalRef.current) return;
    terminalRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    if (scannerLaser.current) {
      scannerLaser.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      (scannerLaser.current.material as THREE.MeshBasicMaterial).opacity =
        0.4 + Math.sin(state.clock.elapsedTime * 6) * 0.3;
    }
  });

  return (
    <group ref={terminalRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Terminal Base */}
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[2.2, 0.2, 1.6]} />
          <meshStandardMaterial color={BRAND_GRAPHITE} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Counter Display Screen */}
        <group position={[0, 0.3, -0.1]} rotation={[-Math.PI / 10, 0, 0]}>
          <mesh>
            <boxGeometry args={[2.0, 1.2, 0.12]} />
            <meshStandardMaterial color="#11180E" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Screen Face */}
          <mesh position={[0, 0, 0.07]}>
            <planeGeometry args={[1.8, 1.0]} />
            <meshBasicMaterial color={BRAND_DARK} />
          </mesh>
          <Html position={[0, 0, 0.08]} transform distanceFactor={4} className="pointer-events-none select-none">
            <div className="w-[190px] rounded-lg bg-surface/95 p-3 text-left font-mono border border-border shadow-xl">
              <div className="flex items-center justify-between text-[9px] text-accent-text">
                <span>ARTYX POS TERMINAL</span>
                <span className="font-bold">ONLINE</span>
              </div>
              <div className="mt-1.5 text-[11px] font-bold text-text">Active Counter #01</div>
              <div className="text-[10px] text-text-muted">Shift Active · Hardware Paired</div>
              <div className="mt-2 flex justify-between border-t border-border pt-1 text-[9px]">
                <span className="text-text-muted">Barcode Engine:</span>
                <span className="text-accent-text font-semibold">Active</span>
              </div>
            </div>
          </Html>
        </group>

        {/* Barcode Scanner Device & Pulsing Laser */}
        <group position={[1.4, -0.3, 0.3]} rotation={[0, -Math.PI / 4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.2, 0.6, 16]} />
            <meshStandardMaterial color={BRAND_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Laser beam in Brand Lime */}
          <mesh ref={scannerLaser} position={[-0.6, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
            <meshBasicMaterial color={BRAND_LIME} transparent opacity={0.7} />
          </mesh>
        </group>

        {/* Floating Stock Ledger Data Cube in Lime Wireframe */}
        <mesh position={[-1.4, 0.4, 0.2]}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial
            color={BRAND_GRAPHITE}
            emissive={BRAND_LIME}
            emissiveIntensity={0.8}
            wireframe
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

// 3D OMS 5-Stage Pipeline Model (Clean Brand Palette: Lime + Graphite)
function Oms3DModel() {
  const pipelineRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!pipelineRef.current) return;
    pipelineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  const stages = [
    { name: "Inbound", pos: [-1.8, 0, 0] },
    { name: "Stock Lock", pos: [-0.9, 0.4, 0.2] },
    { name: "Packing", pos: [0, 0, 0] },
    { name: "Dispatch", pos: [0.9, 0.4, -0.2] },
    { name: "Delivered", pos: [1.8, 0, 0] },
  ];

  return (
    <group ref={pipelineRef}>
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Central Connecting Tube */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 4.0, 16]} />
          <meshStandardMaterial
            color={BRAND_GRAPHITE}
            emissive={BRAND_LIME}
            emissiveIntensity={0.9}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* 5 Geometric Gates */}
        {stages.map((stage, idx) => (
          <group key={idx} position={stage.pos as [number, number, number]}>
            <mesh>
              <boxGeometry args={[0.42, 0.42, 0.42]} />
              <meshStandardMaterial
                color={BRAND_GRAPHITE}
                emissive={BRAND_LIME}
                emissiveIntensity={0.7}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[0.45, 0.02, 16, 32]} />
              <meshBasicMaterial color={BRAND_LIME} wireframe transparent opacity={0.6} />
            </mesh>
            <Html position={[0, -0.65, 0]} center distanceFactor={7} className="pointer-events-none select-none">
              <div className="rounded-md border border-border bg-surface/95 px-2.5 py-0.5 text-[9px] font-bold text-accent-text shadow-md whitespace-nowrap backdrop-blur-md">
                {stage.name}
              </div>
            </Html>
          </group>
        ))}

        {/* Floating Dispatch Badge */}
        <Html position={[0, 1.2, 0]} center distanceFactor={7} className="pointer-events-none select-none">
          <div className="rounded-full border border-border bg-surface/95 px-3 py-1 text-[11px] font-semibold text-accent-text shadow-xl backdrop-blur-md">
            Live Order Pipeline
          </div>
        </Html>
      </Float>
    </group>
  );
}

export function Product3DScene({ mode }: Product3DSceneProps) {
  return (
    <PresentationControls
      global
      snap
      speed={1.5}
      damping={0.2}
      rotation={[0.2, 0, 0]}
      polar={[-Math.PI / 6, Math.PI / 6]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 4]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[-3, 2, 2]} intensity={0.5} color="#D8E4FF" />

      {mode === "pos" ? <Pos3DModel /> : <Oms3DModel />}
    </PresentationControls>
  );
}
