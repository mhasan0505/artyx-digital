"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Html, PresentationControls } from "@react-three/drei";

export type ProductMode = "pos" | "oms";

interface Product3DSceneProps {
  mode: ProductMode;
}

// 3D POS System Model
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
          <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Counter Display Screen */}
        <group position={[0, 0.3, -0.1]} rotation={[-Math.PI / 10, 0, 0]}>
          <mesh>
            <boxGeometry args={[2.0, 1.2, 0.12]} />
            <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Screen Face */}
          <mesh position={[0, 0, 0.07]}>
            <planeGeometry args={[1.8, 1.0]} />
            <meshBasicMaterial color="#1E1B4B" />
          </mesh>
          <Html position={[0, 0, 0.08]} transform distanceFactor={4} className="pointer-events-none select-none">
            <div className="w-[180px] rounded-lg bg-[#0B1020]/95 p-3 text-left font-mono border border-purple-500/40 shadow-xl">
              <div className="flex items-center justify-between text-[9px] text-purple-300">
                <span>ARTYX POS v2</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="mt-1.5 text-[11px] font-bold text-white">SKU-77491-BD</div>
              <div className="text-[10px] text-slate-300">Counter 01 · Shift Active</div>
              <div className="mt-2 flex justify-between border-t border-slate-800 pt-1 text-[9px]">
                <span className="text-slate-400">Barcode Speed:</span>
                <span className="text-emerald-400 font-semibold">0.14s</span>
              </div>
            </div>
          </Html>
        </group>

        {/* Barcode Scanner Device & Pulsing Laser */}
        <group position={[1.4, -0.3, 0.3]} rotation={[0, -Math.PI / 4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.2, 0.6, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Laser beam */}
          <mesh ref={scannerLaser} position={[-0.6, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
            <meshBasicMaterial color="#A855F7" transparent opacity={0.6} />
          </mesh>
        </group>

        {/* Floating Stock Ledger Data Cube */}
        <mesh position={[-1.4, 0.4, 0.2]}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial
            color="#6B21A8"
            emissive="#581C87"
            wireframe
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

// 3D OMS 5-Stage Pipeline Model
function Oms3DModel() {
  const pipelineRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!pipelineRef.current) return;
    pipelineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  const stages = [
    { name: "Inbound", color: "#38BDF8", pos: [-1.8, 0, 0] },
    { name: "Stock Lock", color: "#818CF8", pos: [-0.9, 0.4, 0.2] },
    { name: "Packing", color: "#A78BFA", pos: [0, 0, 0] },
    { name: "Dispatch", color: "#34D399", pos: [0.9, 0.4, -0.2] },
    { name: "Delivered", color: "#10B981", pos: [1.8, 0, 0] },
  ];

  return (
    <group ref={pipelineRef}>
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Central Connecting Tube */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 4.0, 16]} />
          <meshStandardMaterial
            color="#0284C7"
            emissive="#0369A1"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* 5 Stage Nodes */}
        {stages.map((stage, idx) => (
          <group key={idx} position={stage.pos as [number, number, number]}>
            <mesh>
              <sphereGeometry args={[0.32, 24, 24]} />
              <meshStandardMaterial
                color={stage.color}
                emissive={stage.color}
                emissiveIntensity={0.4}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[0.45, 0.02, 16, 32]} />
              <meshBasicMaterial color={stage.color} wireframe transparent opacity={0.6} />
            </mesh>
            <Html position={[0, -0.65, 0]} center distanceFactor={7} className="pointer-events-none select-none">
              <div className="rounded-md border border-cyan-500/40 bg-[#0B1020]/90 px-2 py-0.5 text-[9px] font-bold text-white shadow-md whitespace-nowrap backdrop-blur-md">
                {stage.name}
              </div>
            </Html>
          </group>
        ))}

        {/* Floating Dispatch Badge */}
        <Html position={[0, 1.2, 0]} center distanceFactor={7} className="pointer-events-none select-none">
          <div className="rounded-full border border-emerald-500/50 bg-[#0B1020]/95 px-3 py-1 text-[11px] font-semibold text-emerald-300 shadow-xl shadow-emerald-500/20 backdrop-blur-md">
            5-Stage Live Order Pipeline
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
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 4]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[-3, 2, 2]} intensity={2.5} color={mode === "pos" ? "#A855F7" : "#00E5FF"} />
      <pointLight position={[3, 2, 2]} intensity={2.0} color={mode === "pos" ? "#6366F1" : "#10B981"} />

      {mode === "pos" ? <Pos3DModel /> : <Oms3DModel />}
    </PresentationControls>
  );
}

