"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { scroll3DState } from "@/lib/motion/scroll-3d-state";
import { useTheme } from "@/components/theme/theme-provider";

// 3D Extruded Emblem: Lime front/back face, Graphite sides, and Razor-thin Lime edge lines
function Artyx3DIcon({ isLight = false }: { isLight?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.LineSegments>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  const { geometry, edgesGeometry } = useMemo(() => {
    const scale = 210;
    const cx = 463.5;
    const cy = 457;

    const shape = new THREE.Shape();
    // Outer boundary path
    const outer: [number, number][] = [
      [416, 90], [170, 232], [168, 262], [595, 509], [534, 546], [309, 415],
      [169, 496], [168, 824], [214, 799], [219, 783], [415, 670], [596, 772],
      [759, 677], [581, 572], [665, 522], [665, 234],
    ];

    shape.moveTo((outer[0][0] - cx) / scale, -(outer[0][1] - cy) / scale);
    for (let i = 1; i < outer.length; i++) {
      shape.lineTo((outer[i][0] - cx) / scale, -(outer[i][1] - cy) / scale);
    }
    shape.closePath();

    // Inner Cutout 1
    const hole1 = new THREE.Path();
    const h1: [number, number][] = [
      [216, 526], [312, 469], [670, 678], [598, 719], [418, 616], [217, 732],
    ];
    hole1.moveTo((h1[0][0] - cx) / scale, -(h1[0][1] - cy) / scale);
    for (let i = 1; i < h1.length; i++) {
      hole1.lineTo((h1[i][0] - cx) / scale, -(h1[i][1] - cy) / scale);
    }
    hole1.closePath();
    shape.holes.push(hole1);

    // Inner Cutout 2
    const hole2 = new THREE.Path();
    const h2: [number, number][] = [
      [235, 248], [415, 144], [618, 262], [618, 469],
    ];
    hole2.moveTo((h2[0][0] - cx) / scale, -(h2[0][1] - cy) / scale);
    for (let i = 1; i < h2.length; i++) {
      hole2.lineTo((h2[i][0] - cx) / scale, -(h2[i][1] - cy) / scale);
    }
    hole2.closePath();
    shape.holes.push(hole2);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.028,
      bevelThickness: 0.028,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    const edges = new THREE.EdgesGeometry(geom, 25);

    return { geometry: geom, edgesGeometry: edges };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reducedMotion) {
      // Idle slow continuous rotation
      meshRef.current.rotation.y += delta * 0.22;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.07;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.copy(meshRef.current.rotation);
    }

    if (ringRef.current && !reducedMotion) {
      ringRef.current.rotation.z += delta * 0.14;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
      <group>
        {/* Solid Extruded Mesh: Lime face (material-0) + Graphite sides (material-1) */}
        <mesh ref={meshRef} geometry={geometry}>
          <meshStandardMaterial
            attach="material-0"
            color="#7FFF00"
            roughness={0.22}
            metalness={0.25}
            emissive="#7FFF00"
            emissiveIntensity={0.2}
          />
          <meshStandardMaterial
            attach="material-1"
            color={isLight ? "#333333" : "#1A2218"}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        {/* Razor-thin Lime Edge Lines with subtle bloom */}
        <lineSegments ref={wireframeRef} geometry={edgesGeometry}>
          <lineBasicMaterial
            color={new THREE.Color("#7FFF00").multiplyScalar(1.5)}
            toneMapped={false}
            transparent
            opacity={0.9}
          />
        </lineSegments>

        {/* Ambient Orbiting Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.0, 0.008, 16, 64]} />
          <meshBasicMaterial
            color={new THREE.Color("#7FFF00").multiplyScalar(1.2)}
            toneMapped={false}
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function Hero3DScene() {
  const rootGroup = useRef<THREE.Group>(null!);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useFrame((state, delta) => {
    if (!rootGroup.current) return;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Interactive mouse pointer parallax tilt
    const mouseX = reducedMotion ? 0 : (state.pointer.x * Math.PI) / 6;
    const mouseY = reducedMotion ? 0 : (-state.pointer.y * Math.PI) / 8;

    rootGroup.current.rotation.y = THREE.MathUtils.damp(
      rootGroup.current.rotation.y,
      mouseX,
      2.5,
      delta
    );
    rootGroup.current.rotation.x = THREE.MathUtils.damp(
      rootGroup.current.rotation.x,
      mouseY,
      2.5,
      delta
    );
  });

  return (
    <>
      <ambientLight intensity={isLight ? 0.8 : 0.6} />
      <directionalLight
        position={[4, 5, 5]}
        intensity={1.8}
        color="#FFFFFF"
      />
      <directionalLight
        position={[-4, 3, -3]}
        intensity={0.6}
        color={isLight ? "#E9EFE2" : "#D8E4FF"}
      />

      <group ref={rootGroup}>
        {/* Soft Contact Shadow on badge floor */}
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.35}
          scale={5.5}
          blur={2.2}
          far={3.5}
          color="#000000"
        />
        <Artyx3DIcon isLight={isLight} />
      </group>
    </>
  );
}
