"use client";

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { journey } from "@/lib/motion/journey-state";

// Palette Tokens: Exact tokens from specification
const COLOR_BG = "#070B06";
const COLOR_GRAPHITE = "#1A2218"; // Dark Graphite token for floor, pylons, sleepers, gate bodies
const COLOR_PACKAGE_BODY = "#E8ECE4"; // Ivory matte package body
const COLOR_LIME = "#7FFF00";
const COLOR_GREEN_SECONDARY = "#4F8A1E"; // Green secondary for icons/checkmarks

// Base Color objects
const LIME_THREE = new THREE.Color(COLOR_LIME);
const SUPER_BLOOM_LIME = new THREE.Color(COLOR_LIME).multiplyScalar(2.5);
const GREEN_SECONDARY_THREE = new THREE.Color(COLOR_GREEN_SECONDARY);

// 6 Stage Definitions
export const ORDER_STAGES = [
  {
    id: 1,
    number: "01",
    tag: "POS CHECKOUT",
    title: "SCAN (POS)",
    description: "Barcode scanned at counter checkout; receipt printed and transaction posted.",
    badge: "Counter Terminal Active",
  },
  {
    id: 2,
    number: "02",
    tag: "CENTRAL PIPELINE",
    title: "INBOUND",
    description: "Order enters the unified fulfillment pipeline and joins the processing queue.",
    badge: "Queued for Routing",
  },
  {
    id: 3,
    number: "03",
    tag: "OMNICHANNEL SYNC",
    title: "STOCK LOCK",
    description: "Inventory reserved across physical stores and online channels to prevent overselling.",
    badge: "Inventory Reserved",
  },
  {
    id: 4,
    number: "04",
    tag: "FULFILLMENT HUB",
    title: "PACKING",
    description: "Container closed, tamper-evident tape sealed, and courier shipping label applied.",
    badge: "Box Sealed & Labeled",
  },
  {
    id: 5,
    number: "05",
    tag: "CARRIER HANDOFF",
    title: "DISPATCH",
    description: "Package accelerates through outbound portal and transfers to courier transit.",
    badge: "Courier Tracking Live",
  },
  {
    id: 6,
    number: "06",
    tag: "FINAL DESTINATION",
    title: "DELIVERED",
    description: "Handed over to customer, delivery confirmed, and accounts ledger settled.",
    badge: "Order Completed",
  },
];

export function getPackageX(progress: number): number {
  return -5.4 + progress * 10.8;
}

// Station X Coordinates along rail
export const STATION_X = [-5.2, -3.1, -1.0, 1.1, 3.3, 5.2];
export const STATION_PROGRESS_CENTERS = [0.08, 0.25, 0.42, 0.58, 0.75, 0.95];

// ----------------------------------------------------------------------
// 1. DUAL GRAPHITE RAILS, SLEEPERS & PYLONS (Dark Graphite, Thin Edge Lines)
// ----------------------------------------------------------------------
function IndustrialRail() {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Front Rail Track: Dark Graphite MeshStandardMaterial */}
      <mesh position={[0, 0, 0.55]}>
        <boxGeometry args={[18, 0.08, 0.08]} />
        <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Front Rail Thin Lime Edge Line */}
      <mesh position={[0, 0.042, 0.55]}>
        <boxGeometry args={[18, 0.008, 0.008]} />
        <meshBasicMaterial color={SUPER_BLOOM_LIME} toneMapped={false} />
      </mesh>

      {/* Back Rail Track: Dark Graphite MeshStandardMaterial */}
      <mesh position={[0, 0, -0.55]}>
        <boxGeometry args={[18, 0.08, 0.08]} />
        <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Back Rail Thin Lime Edge Line */}
      <mesh position={[0, 0.042, -0.55]}>
        <boxGeometry args={[18, 0.008, 0.008]} />
        <meshBasicMaterial color={SUPER_BLOOM_LIME} toneMapped={false} />
      </mesh>

      {/* Sleepers along rail (Dark Graphite #1A2218, MeshStandardMaterial, NO emissive lime) */}
      {Array.from({ length: 36 }).map((_, i) => {
        const x = -8.0 + i * 0.46;
        return (
          <mesh key={i} position={[x, -0.05, 0]}>
            <boxGeometry args={[0.12, 0.04, 1.35]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
        );
      })}

      {/* Vertical Support Pylons (Dark Graphite #1A2218, MeshStandardMaterial, NO emissive lime) */}
      {STATION_X.map((x, i) => (
        <group key={i} position={[x, -0.45, 0]}>
          <mesh position={[0, 0, 0.55]}>
            <cylinderGeometry args={[0.045, 0.065, 0.8, 12]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0, -0.55]}>
            <cylinderGeometry args={[0.045, 0.065, 0.8, 12]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ----------------------------------------------------------------------
// 2. FLOOR & FAINT LIME GRID (Opacity ~0.15, Dark Graphite #1A2218 Floor)
// ----------------------------------------------------------------------
function DarkGround() {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useEffect(() => {
    if (gridRef.current) {
      const mat = gridRef.current.material as THREE.Material;
      mat.transparent = true;
      mat.opacity = 0.15; // Strict compliance: faint lime grid opacity ~0.15
      mat.depthWrite = false;
    }
  }, []);

  return (
    <group position={[0, -0.65, 0]}>
      {/* Dark Graphite Floor Plane (MeshStandardMaterial, metalness 0.6, roughness 0.4) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[44, 22]} />
        <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Faint Lime Floor Grid (opacity ~0.15) */}
      <gridHelper
        ref={gridRef}
        args={[44, 44, COLOR_LIME, COLOR_LIME]}
        position={[0, 0.002, 0]}
      />
    </group>
  );
}

// ----------------------------------------------------------------------
// 3. MAIN 3D SCENE (Imperative useFrame, Zero Re-renders on Scroll)
// ----------------------------------------------------------------------
export function OrderJourneyScene() {
  const { camera } = useThree();

  // Hero Package Refs
  const packageRef = useRef<THREE.Group>(null!);
  const leftFlapRef = useRef<THREE.Group>(null!);
  const rightFlapRef = useRef<THREE.Group>(null!);
  const tapeRef = useRef<THREE.Mesh>(null!);

  // Station Effects Refs
  const laserRef = useRef<THREE.Group>(null!);
  const laserMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const receiptRef = useRef<THREE.Group>(null!);

  const inboundPulseRingRef = useRef<THREE.Mesh>(null!);
  const inboundPulseMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const leftClampRef = useRef<THREE.Mesh>(null!);
  const rightClampRef = useRef<THREE.Mesh>(null!);
  const pulseRingRef = useRef<THREE.Mesh>(null!);
  const pulseRingMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const tapeSealRef = useRef<THREE.Mesh>(null!);
  const tapeSealMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const trailRef = useRef<THREE.InstancedMesh>(null!);
  const trailMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const burstRef = useRef<THREE.InstancedMesh>(null!);
  const checkmarkGroupRef = useRef<THREE.Group>(null!);

  // 6 Station Edge Material Refs (Crossfaded: Inactive ~20%, Active full intensity > 1.0)
  const stationEdgeMatRefs = [
    useRef<THREE.LineBasicMaterial>(null!),
    useRef<THREE.MeshBasicMaterial>(null!),
    useRef<THREE.LineBasicMaterial>(null!),
    useRef<THREE.LineBasicMaterial>(null!),
    useRef<THREE.LineBasicMaterial>(null!),
    useRef<THREE.LineBasicMaterial>(null!),
  ];

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // 36 Burst Particle Directions
  const burstDirs = useMemo(() => {
    return Array.from({ length: 36 }).map(() => {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 1.5 + 0.3,
        (Math.random() - 0.5) * 2
      ).normalize();
      const speed = 0.8 + Math.random() * 1.4;
      return { dir: v, speed };
    });
  }, []);

  // Initialize instanced trail & burst matrices
  useEffect(() => {
    if (trailRef.current) {
      for (let i = 0; i < 14; i++) {
        dummy.position.set(0, -100, 0);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        trailRef.current.setMatrixAt(i, dummy.matrix);
      }
      trailRef.current.instanceMatrix.needsUpdate = true;
    }

    if (burstRef.current) {
      for (let i = 0; i < 36; i++) {
        dummy.position.set(0, -100, 0);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        burstRef.current.setMatrixAt(i, dummy.matrix);
      }
      burstRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy]);

  useFrame((state, delta) => {
    // 1. Smoothly interpolate journey progress
    journey.smooth = THREE.MathUtils.damp(journey.smooth, journey.target, 6, delta);
    const p = journey.smooth;
    const packageX = getPackageX(p);

    // 2. CAMERA AND LAYOUT RIG:
    // - Elevated 3/4 view: pulled back to Z=8.2 and raised to Y=3.4
    // - Shifted so action sits in the right 60% of viewport (away from left narrative card)
    // - Target camera lookAt is shifted left of the package (targetLookX = packageX - 1.4),
    //   projecting the package and rail cleanly to the right 60% of screen (~68% screen width)
    // - Both current station and next station remain fully visible at all times
    const targetCamX = packageX - 1.4;
    const targetCamY = 3.4;
    const targetCamZ = 8.2;
    const mouseX = state.pointer.x * 0.15;
    const mouseY = state.pointer.y * 0.08;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX + mouseX, 3.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY + mouseY, 3.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 3.5, delta);
    camera.lookAt(packageX - 1.4, 0.3, 0);

    // 3. CROSSFADING STATION ACTIVATION (Inactive = ~20% lime edges, Active = full intensity)
    // For each station i, compute activation act_i based on distance to progress center
    const stationActs = STATION_PROGRESS_CENTERS.map((center) => {
      const dist = Math.abs(p - center);
      const span = 0.17;
      if (dist >= span) return 0;
      const t = 1 - dist / span;
      return t * t * (3 - 2 * t); // smoothstep curve
    });

    // Update each station's thin lime edge material
    stationActs.forEach((act, idx) => {
      const mat = stationEdgeMatRefs[idx]?.current;
      if (mat) {
        // Inactive: 0.20 intensity (dim); Active: up to 2.5 (full blooming intensity)
        const intensity = 0.20 + 0.80 * act;
        mat.color.copy(LIME_THREE).multiplyScalar(intensity * 2.5);
      }
    });

    // 4. HERO PACKAGE: Position & Dynamics
    if (packageRef.current) {
      packageRef.current.position.x = packageX;

      // Subtle tilt during dispatch acceleration (stage 5)
      const dispatchAct = stationActs[4];
      const targetTilt = dispatchAct * 0.12;
      packageRef.current.rotation.z = THREE.MathUtils.damp(
        packageRef.current.rotation.z,
        -targetTilt,
        6.0,
        delta
      );
    }

    // 5. STAGE 1 (SCAN POS): Sweeping Laser & Receipt Strip
    // Note: laserRef is inside Station 1 group (STATION_X[0]), so local x is Math.sin(...)
    const scanAct = stationActs[0];
    if (laserRef.current && laserMatRef.current) {
      laserRef.current.visible = scanAct > 0.02;
      if (scanAct > 0.02) {
        laserRef.current.position.x = Math.sin(state.clock.elapsedTime * 6.0) * 0.45;
        laserMatRef.current.opacity = scanAct * 0.75;
      }
    }

    if (receiptRef.current) {
      const receiptT = Math.min(1, Math.max(0, p / 0.16));
      receiptRef.current.scale.y = Math.max(0.001, receiptT);
      receiptRef.current.visible = receiptT > 0.01;
    }

    // 6. STAGE 2 (INBOUND): Ring Pulse Glow Effect
    const inboundAct = stationActs[1];
    if (inboundPulseRingRef.current && inboundPulseMatRef.current) {
      inboundPulseRingRef.current.visible = inboundAct > 0.02;
      if (inboundAct > 0.02) {
        const pulsePhase = (state.clock.elapsedTime * 3.0) % 1.0;
        inboundPulseRingRef.current.scale.setScalar(1.0 + pulsePhase * 0.35);
        inboundPulseMatRef.current.opacity = (1.0 - pulsePhase) * inboundAct * 0.8;
      }
    }

    // 7. STAGE 3 (STOCK LOCK): Mechanical Clamping & Pulse Wave
    const lockAct = stationActs[2];
    const isLockStage = p >= 0.33 && p <= 0.50;
    const lockT = isLockStage ? (p - 0.33) / 0.17 : 0;

    let clampOffset = 0.9;
    let pulseScale = 0.1;
    let pulseOpacity = 0;

    if (lockT > 0 && lockT <= 0.45) {
      clampOffset = THREE.MathUtils.lerp(0.9, 0.58, lockT / 0.45);
    } else if (lockT > 0.45 && lockT <= 0.8) {
      clampOffset = 0.58;
      const pt = (lockT - 0.45) / 0.35;
      pulseScale = 0.2 + pt * 1.8;
      pulseOpacity = Math.max(0, 1 - pt) * lockAct;
    } else if (lockT > 0.8 && lockT <= 1.0) {
      clampOffset = THREE.MathUtils.lerp(0.58, 0.9, (lockT - 0.8) / 0.2);
    }

    if (leftClampRef.current && rightClampRef.current) {
      leftClampRef.current.position.z = clampOffset;
      rightClampRef.current.position.z = -clampOffset;
    }

    if (pulseRingRef.current && pulseRingMatRef.current) {
      pulseRingRef.current.scale.set(pulseScale, pulseScale, 1);
      pulseRingMatRef.current.opacity = pulseOpacity;
      pulseRingRef.current.visible = pulseOpacity > 0.01;
    }

    // 8. STAGE 4 (PACKING): Top Flaps Fold Inward & Graphite Tape Band Seals
    let flapAngle = 0.55;
    let tapeScale = 0;
    if (p < 0.5) {
      flapAngle = 0.55;
      tapeScale = 0;
    } else if (p >= 0.5 && p <= 0.6) {
      const t = (p - 0.5) / 0.1;
      flapAngle = THREE.MathUtils.lerp(0.55, 0, t);
      tapeScale = 0;
    } else if (p > 0.6 && p <= 0.67) {
      flapAngle = 0;
      const t = (p - 0.6) / 0.07;
      tapeScale = Math.min(1, Math.max(0, t));
    } else {
      flapAngle = 0;
      tapeScale = 1;
    }

    // Flap pivot rotation (0 rad = flat closed meeting at center seam, 0.55 rad = angled open)
    if (leftFlapRef.current) leftFlapRef.current.rotation.z = flapAngle;
    if (rightFlapRef.current) rightFlapRef.current.rotation.z = -flapAngle;

    if (tapeRef.current) {
      tapeRef.current.scale.z = Math.max(0.001, tapeScale);
      tapeRef.current.visible = tapeScale > 0.01;
    }

    // Active tape sealing line strip
    const packingAct = stationActs[3];
    if (tapeSealRef.current && tapeSealMatRef.current) {
      const isSealing = p >= 0.59 && p <= 0.68;
      tapeSealRef.current.visible = isSealing && packingAct > 0.02;
      if (isSealing) {
        tapeSealRef.current.position.z = -0.5 + tapeScale * 1.0;
        tapeSealMatRef.current.opacity = packingAct * 0.9;
      }
    }

    // 9. STAGE 5 (DISPATCH): Instanced Lime Motion Trail (Trailing behind package)
    const dispatchAct = stationActs[4];
    if (trailRef.current && trailMatRef.current) {
      const isDispatchStage = p >= 0.68 && p <= 0.85;
      trailRef.current.visible = isDispatchStage && dispatchAct > 0.02;
      if (isDispatchStage) {
        trailMatRef.current.opacity = dispatchAct * 0.7;
        for (let i = 0; i < 14; i++) {
          const lag = (i + 1) * 0.16;
          const x = packageX - lag;
          const s = Math.max(0.01, 1 - i / 14);

          dummy.position.set(x, 0, 0);
          dummy.scale.set(0.12 * s, 0.45 * s, 0.65 * s);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          trailRef.current.setMatrixAt(i, dummy.matrix);
        }
        trailRef.current.instanceMatrix.needsUpdate = true;
      }
    }

    // 10. STAGE 6 (DELIVERED): Lime Burst Particles & Rotating Checkmark
    const deliveredAct = stationActs[5];
    const isDelivered = p >= 0.85;
    const deliveredT = isDelivered ? (p - 0.85) / 0.15 : 0;

    if (burstRef.current) {
      burstRef.current.visible = isDelivered && deliveredAct > 0.02;
      if (isDelivered) {
        for (let i = 0; i < 36; i++) {
          const pData = burstDirs[i];
          const dist = pData.speed * deliveredT * 1.9;
          const x = 5.2 + pData.dir.x * dist;
          const y = 0.2 + pData.dir.y * dist;
          const z = pData.dir.z * dist;
          const s = Math.max(0.001, (1 - deliveredT) * 0.08 * deliveredAct);

          dummy.position.set(x, y, z);
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          burstRef.current.setMatrixAt(i, dummy.matrix);
        }
        burstRef.current.instanceMatrix.needsUpdate = true;
      }
    }

    if (checkmarkGroupRef.current) {
      checkmarkGroupRef.current.visible = isDelivered && deliveredAct > 0.02;
      if (isDelivered) {
        checkmarkGroupRef.current.rotation.y += delta * 1.5;
        checkmarkGroupRef.current.scale.setScalar(Math.min(1, deliveredT * 2.4 * deliveredAct));
      }
    }
  });

  return (
    <>
      {/* 4. LIGHTING: Neutral white key (~1.2), soft cool rim light, city environment, NO lime lights */}
      <directionalLight position={[6, 9, 6]} intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[-6, 4, -5]} intensity={0.5} color="#D8E4FF" />
      <Environment files="/hdr/city.hdr" environmentIntensity={0.25} />

      {/* Dark Graphite Floor & Faint Lime Grid (opacity ~0.15) */}
      <DarkGround />

      {/* Industrial Dark Rails & Sleepers (Dark Graphite #1A2218, MeshStandardMaterial) */}
      <IndustrialRail />

      {/* ------------------------------------------------------------------ */}
      {/* STATION 1: SCAN (POS) */}
      {/* ------------------------------------------------------------------ */}
      <group position={[STATION_X[0], 0, 0]}>
        <group position={[0, 0.65, 0]}>
          {/* Gate Frame: Dark Graphite MeshStandardMaterial, metalness 0.6, roughness 0.4 */}
          <mesh position={[-0.8, 0, 0]}>
            <boxGeometry args={[0.1, 1.5, 0.18]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0.8, 0, 0]}>
            <boxGeometry args={[0.1, 1.5, 0.18]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <boxGeometry args={[1.7, 0.12, 0.18]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>

          {/* Thin Lime Edge Outline (EdgesGeometry, Crossfaded 20% -> 100%) */}
          <lineSegments position={[0, 0.75, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(1.704, 0.124, 0.184)]} />
            <lineBasicMaterial
              ref={stationEdgeMatRefs[0]}
              color={SUPER_BLOOM_LIME}
              toneMapped={false}
              linewidth={1.5}
            />
          </lineSegments>

          {/* Scanner Housing */}
          <mesh position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 0.12, 16]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.58, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
            <meshBasicMaterial color={SUPER_BLOOM_LIME} toneMapped={false} />
          </mesh>
        </group>

        {/* ACTIVE EFFECT: Sweeping Lime Laser Line directly over package */}
        <group ref={laserRef} position={[0, 0.46, 0]}>
          <mesh>
            <boxGeometry args={[0.02, 0.015, 1.1]} />
            <meshBasicMaterial
              ref={laserMatRef}
              color={SUPER_BLOOM_LIME}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <planeGeometry args={[0.02, 0.44]} />
            <meshBasicMaterial
              color={SUPER_BLOOM_LIME}
              toneMapped={false}
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>

        {/* Receipt Printer & Printed Slip */}
        <group position={[0, 0.45, 0.75]}>
          <mesh>
            <boxGeometry args={[0.42, 0.25, 0.22]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, -0.1, 0.11]}>
            <boxGeometry args={[0.28, 0.015, 0.015]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <group ref={receiptRef} position={[0, -0.15, 0.12]} scale={[1, 0.001, 1]}>
            <mesh position={[0, -0.25, 0]}>
              <planeGeometry args={[0.26, 0.5]} />
              <meshBasicMaterial color="#F4F4F4" side={THREE.DoubleSide} />
            </mesh>
            {[-0.1, -0.2, -0.3, -0.4].map((ly, idx) => (
              <mesh key={idx} position={[0, ly, 0.005]}>
                <planeGeometry args={[0.2, 0.02]} />
                <meshBasicMaterial color={COLOR_GRAPHITE} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* STATION 2: INBOUND GATE */}
      {/* ------------------------------------------------------------------ */}
      <group position={[STATION_X[1], 0, 0]}>
        <group position={[0, 0.5, 0]}>
          {/* Outer Gate Ring: Dark Graphite MeshStandardMaterial (NO emissive lime on body) */}
          <mesh>
            <torusGeometry args={[1.05, 0.06, 12, 32]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Thin Lime Edge Ring (Crossfaded 20% -> 100%) */}
          <mesh>
            <torusGeometry args={[1.115, 0.008, 8, 32]} />
            <meshBasicMaterial
              ref={stationEdgeMatRefs[1]}
              color={SUPER_BLOOM_LIME}
              toneMapped={false}
            />
          </mesh>

          {/* ACTIVE EFFECT: Inbound Ring Pulse Glow */}
          <mesh ref={inboundPulseRingRef} scale={[1, 1, 1]}>
            <torusGeometry args={[1.05, 0.015, 8, 32]} />
            <meshBasicMaterial
              ref={inboundPulseMatRef}
              color={SUPER_BLOOM_LIME}
              toneMapped={false}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
        {/* Support Bases */}
        <mesh position={[-1.1, -0.3, 0]}>
          <boxGeometry args={[0.18, 0.6, 0.25]} />
          <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[1.1, -0.3, 0]}>
          <boxGeometry args={[0.18, 0.6, 0.25]} />
          <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* STATION 3: STOCK LOCK GATE */}
      {/* ------------------------------------------------------------------ */}
      <group position={[STATION_X[2], 0, 0]}>
        <group position={[0, 0.55, 0]}>
          <mesh>
            <boxGeometry args={[0.35, 1.35, 0.16]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[0.35, 0.15, 1.5]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Thin Lime Edge Outline (EdgesGeometry, Crossfaded 20% -> 100%) */}
          <lineSegments position={[0, 0.7, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.354, 0.154, 1.504)]} />
            <lineBasicMaterial
              ref={stationEdgeMatRefs[2]}
              color={SUPER_BLOOM_LIME}
              toneMapped={false}
              linewidth={1.5}
            />
          </lineSegments>
        </group>

        {/* Left & Right Mechanical Clamps (Dark Graphite with thin edge) */}
        <mesh ref={leftClampRef} position={[0, 0.1, 0.9]}>
          <boxGeometry args={[0.22, 0.55, 0.12]} />
          <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh ref={rightClampRef} position={[0, 0.1, -0.9]}>
          <boxGeometry args={[0.22, 0.55, 0.12]} />
          <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
        </mesh>

        {/* ACTIVE EFFECT: Pulse Wave Shock Ring */}
        <mesh ref={pulseRingRef} position={[0, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.4, 0.48, 32]} />
          <meshBasicMaterial
            ref={pulseRingMatRef}
            color={SUPER_BLOOM_LIME}
            toneMapped={false}
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* STATION 4: PACKING GANTRY */}
      {/* ------------------------------------------------------------------ */}
      <group position={[STATION_X[3], 0, 0]}>
        <group position={[0, 0.65, 0]}>
          <mesh position={[-0.75, 0, 0]}>
            <boxGeometry args={[0.12, 1.5, 0.2]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0.75, 0, 0]}>
            <boxGeometry args={[0.12, 1.5, 0.2]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.76, 0]}>
            <boxGeometry args={[1.62, 0.14, 0.25]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Thin Lime Edge Outline (EdgesGeometry, Crossfaded 20% -> 100%) */}
          <lineSegments position={[0, 0.76, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(1.624, 0.144, 0.254)]} />
            <lineBasicMaterial
              ref={stationEdgeMatRefs[3]}
              color={SUPER_BLOOM_LIME}
              toneMapped={false}
              linewidth={1.5}
            />
          </lineSegments>

          {/* Gantry Sealing Press Head */}
          <mesh position={[0, 0.48, 0]}>
            <cylinderGeometry args={[0.14, 0.16, 0.35, 16]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.02, 16]} />
            <meshBasicMaterial color={SUPER_BLOOM_LIME} toneMapped={false} />
          </mesh>
        </group>

        {/* ACTIVE EFFECT: Sealing Line Application Strip */}
        <mesh ref={tapeSealRef} position={[0, 0.45, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.26, 0.02, 0.04]} />
          <meshBasicMaterial
            ref={tapeSealMatRef}
            color={SUPER_BLOOM_LIME}
            toneMapped={false}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* STATION 5: DISPATCH PORTAL */}
      {/* ------------------------------------------------------------------ */}
      <group position={[STATION_X[4], 0, 0]}>
        <group position={[0, 0.55, 0]}>
          <mesh position={[-0.7, 0, 0.35]} rotation={[0, 0.25, 0]}>
            <boxGeometry args={[0.08, 1.3, 0.35]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0.7, 0, 0.35]} rotation={[0, -0.25, 0]}>
            <boxGeometry args={[0.08, 1.3, 0.35]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.68, 0.35]}>
            <boxGeometry args={[1.48, 0.1, 0.28]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Thin Lime Edge Outline (EdgesGeometry, Crossfaded 20% -> 100%) */}
          <lineSegments position={[0, 0.68, 0.35]}>
            <edgesGeometry args={[new THREE.BoxGeometry(1.484, 0.104, 0.284)]} />
            <lineBasicMaterial
              ref={stationEdgeMatRefs[4]}
              color={SUPER_BLOOM_LIME}
              toneMapped={false}
              linewidth={1.5}
            />
          </lineSegments>
        </group>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* STATION 6: DELIVERED DOCK */}
      {/* ------------------------------------------------------------------ */}
      <group position={[STATION_X[5], 0, 0]}>
        <group position={[0, 0.65, 0]}>
          <mesh position={[-0.8, 0, 0]}>
            <boxGeometry args={[0.1, 1.5, 0.2]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0.8, 0, 0]}>
            <boxGeometry args={[0.1, 1.5, 0.2]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <boxGeometry args={[1.7, 0.1, 0.2]} />
            <meshStandardMaterial color={COLOR_GRAPHITE} roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Thin Lime Edge Outline (EdgesGeometry, Crossfaded 20% -> 100%) */}
          <lineSegments position={[0, 0.75, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(1.704, 0.104, 0.204)]} />
            <lineBasicMaterial
              ref={stationEdgeMatRefs[5]}
              color={SUPER_BLOOM_LIME}
              toneMapped={false}
              linewidth={1.5}
            />
          </lineSegments>
        </group>

        {/* ACTIVE EFFECT: Floating 3D Checkmark (✔) in Green Secondary (#4F8A1E) */}
        <group ref={checkmarkGroupRef} position={[0, 1.15, 0]}>
          {/* Short stem: down & right */}
          <mesh position={[-0.12, -0.04, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.26, 0.08]} />
            <meshBasicMaterial color={GREEN_SECONDARY_THREE} toneMapped={false} />
          </mesh>
          {/* Long stem: up & right */}
          <mesh position={[0.14, 0.08, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.56, 0.08]} />
            <meshBasicMaterial color={GREEN_SECONDARY_THREE} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* GLOBAL ACTIVE EFFECTS (World Coordinates) */}
      {/* ------------------------------------------------------------------ */}
      {/* Stage 5: Instanced Lime Motion Trail (behind package in world space) */}
      <instancedMesh
        ref={trailRef}
        args={[undefined, undefined, 14]}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          ref={trailMatRef}
          color={SUPER_BLOOM_LIME}
          toneMapped={false}
          transparent
          opacity={0.65}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      {/* Stage 6: Instanced Lime Burst Particles (around Station 6 dock in world space) */}
      <instancedMesh
        ref={burstRef}
        args={[undefined, undefined, 36]}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[0.55, 8, 8]} />
        <meshBasicMaterial
          color={SUPER_BLOOM_LIME}
          toneMapped={false}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      {/* ------------------------------------------------------------------ */}
      {/* 3. HERO PACKAGE: ~1.3x Larger, Ivory #E8ECE4 Matte Body, */}
      {/* Graphite Tape Band, Small Lime Label Strip. Brightest object in every beat */}
      {/* ------------------------------------------------------------------ */}
      <group ref={packageRef} position={[-5.4, 0, 0]}>
        {/* Main Box Body: Matte Ivory #E8ECE4 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.22, 0.88, 1.02]} />
          <meshStandardMaterial
            color={COLOR_PACKAGE_BODY}
            roughness={0.75}
            metalness={0.06}
          />
        </mesh>

        {/* Thin Edge Lines on package (Selective Bloom) */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.224, 0.884, 1.024)]} />
          <lineBasicMaterial
            color={SUPER_BLOOM_LIME}
            toneMapped={false}
            linewidth={1.5}
          />
        </lineSegments>

        {/* Small Lime Courier Label Strip on front face (Accent only) */}
        <mesh position={[0, 0, 0.518]}>
          <planeGeometry args={[0.38, 0.2]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive={COLOR_LIME}
            emissiveIntensity={1.3}
            toneMapped={false}
            roughness={0.2}
          />
        </mesh>
        {/* Barcode line on label */}
        <mesh position={[0, -0.04, 0.522]}>
          <planeGeometry args={[0.3, 0.035]} />
          <meshBasicMaterial color={COLOR_GRAPHITE} />
        </mesh>

        {/* Left Top Flap: Pivoting from left edge of box (x = -0.61) */}
        <group ref={leftFlapRef} position={[-0.61, 0.44, 0]}>
          <mesh position={[0.305, 0, 0]}>
            <boxGeometry args={[0.61, 0.02, 1.01]} />
            <meshStandardMaterial
              color={COLOR_PACKAGE_BODY}
              roughness={0.75}
              metalness={0.06}
            />
          </mesh>
        </group>

        {/* Right Top Flap: Pivoting from right edge of box (x = +0.61) */}
        <group ref={rightFlapRef} position={[0.61, 0.44, 0]}>
          <mesh position={[-0.305, 0, 0]}>
            <boxGeometry args={[0.61, 0.02, 1.01]} />
            <meshStandardMaterial
              color={COLOR_PACKAGE_BODY}
              roughness={0.75}
              metalness={0.06}
            />
          </mesh>
        </group>

        {/* GRAPHITE Tape Band (#1A2218, MeshStandardMaterial, NO emissive lime tape) */}
        <mesh ref={tapeRef} position={[0, 0.455, 0]} scale={[1, 1, 0.001]}>
          <boxGeometry args={[0.22, 0.015, 1.03]} />
          <meshStandardMaterial
            color={COLOR_GRAPHITE}
            roughness={0.5}
            metalness={0.35}
          />
        </mesh>
      </group>
    </>
  );
}
