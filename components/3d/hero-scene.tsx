"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";

const PARTICLE_COUNT = 80;
const [DEFAULT_POSITIONS, DEFAULT_COLORS] = (() => {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const col = new Float32Array(PARTICLE_COUNT * 3);
  const palette = [
    new THREE.Color("#00E5FF"), // Cyan
    new THREE.Color("#8B5CF6"), // Purple
    new THREE.Color("#10B981"), // Emerald
    new THREE.Color("#60A5FA"), // Blue
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const s1 = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const s2 = (Math.sin(i * 78.233) * 43758.5453) % 1;
    const s3 = (Math.sin(i * 45.164) * 43758.5453) % 1;

    pos[i * 3] = (Math.abs(s1) - 0.5) * 12;
    pos[i * 3 + 1] = (Math.abs(s2) - 0.5) * 8;
    pos[i * 3 + 2] = (Math.abs(s3) - 0.5) * 8;

    const c = palette[i % palette.length];
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  return [pos, col];
})();

// Ambient floating particle dust
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[DEFAULT_POSITIONS, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[DEFAULT_COLORS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Pillar 1: Digital Experiences (Crystalline Icosahedron with Wireframe Cage)
function ExperiencesNode({ position = [-1.8, 0.4, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.x += delta * 0.2;
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
        <group ref={meshRef}>
          {/* Outer wireframe */}
          <mesh>
            <icosahedronGeometry args={[0.9, 0]} />
            <meshBasicMaterial
              color="#00E5FF"
              wireframe
              transparent
              opacity={0.45}
            />
          </mesh>
          {/* Inner core */}
          <mesh>
            <icosahedronGeometry args={[0.55, 1]} />
            <meshStandardMaterial
              color="#0078D7"
              emissive="#005299"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </group>
        <Html
          position={[0, -1.2, 0]}
          center
          distanceFactor={10}
          className="pointer-events-none select-none"
        >
          <div className="rounded-full border border-cyan-500/40 bg-[#0B1020]/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-cyan-300 shadow-lg shadow-cyan-500/20 whitespace-nowrap backdrop-blur-md">
            Digital Experiences
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Pillar 2: Business Technology (Interlocking Torus & POS/OMS Orbiting Core)
function TechnologyNode({ position = [0, -0.2, 0.8] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    ringRef1.current.rotation.x += delta * 0.6;
    ringRef1.current.rotation.y += delta * 0.3;
    ringRef2.current.rotation.y -= delta * 0.5;
    ringRef2.current.rotation.z += delta * 0.4;
  });

  return (
    <group position={position}>
      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.7}>
        <group ref={groupRef}>
          {/* Outer ring 1 */}
          <mesh ref={ringRef1}>
            <torusGeometry args={[1.05, 0.04, 16, 64]} />
            <meshStandardMaterial
              color="#A855F7"
              emissive="#8B5CF6"
              emissiveIntensity={0.6}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          {/* Outer ring 2 */}
          <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.85, 0.035, 16, 64]} />
            <meshStandardMaterial
              color="#C084FC"
              emissive="#7C3AED"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          {/* Central Cube representing POS/OMS engine */}
          <mesh>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial
              color="#6D28D9"
              emissive="#4C1D95"
              roughness={0.25}
              metalness={0.9}
            />
          </mesh>
        </group>
        <Html
          position={[0, -1.3, 0]}
          center
          distanceFactor={10}
          className="pointer-events-none select-none"
        >
          <div className="rounded-full border border-purple-500/40 bg-[#0B1020]/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-purple-300 shadow-lg shadow-purple-500/20 whitespace-nowrap backdrop-blur-md">
            POS &amp; OMS Tech
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Pillar 3: Digital Growth (Dynamic Growth Helix / Octahedron with Radiant Ring)
function GrowthNode({ position = [1.8, 0.5, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
  });

  return (
    <group position={position}>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.65}>
        <group ref={meshRef}>
          {/* Octahedron core */}
          <mesh>
            <octahedronGeometry args={[0.75, 0]} />
            <meshStandardMaterial
              color="#10B981"
              emissive="#059669"
              roughness={0.25}
              metalness={0.8}
            />
          </mesh>
          {/* Dynamic ring around it */}
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[1.0, 0.03, 16, 48]} />
            <meshBasicMaterial
              color="#34D399"
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
        <Html
          position={[0, -1.2, 0]}
          center
          distanceFactor={10}
          className="pointer-events-none select-none"
        >
          <div className="rounded-full border border-emerald-500/40 bg-[#0B1020]/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-300 shadow-lg shadow-emerald-500/20 whitespace-nowrap backdrop-blur-md">
            Digital Growth
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Central Connector Network
function ConnectorLines() {
  const lineRef = useRef<THREE.LineSegments>(null!);

  const lineGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-1.8, 0.4, 0), // Experiences
      new THREE.Vector3(0, -0.2, 0.8), // Tech
      new THREE.Vector3(0, -0.2, 0.8), // Tech
      new THREE.Vector3(1.8, 0.5, 0),  // Growth
      new THREE.Vector3(1.8, 0.5, 0),  // Growth
      new THREE.Vector3(-1.8, 0.4, 0), // Experiences
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <lineSegments ref={lineRef} geometry={lineGeometry}>
      <lineBasicMaterial
        color="#4D7CFE"
        transparent
        opacity={0.3}
        linewidth={1}
      />
    </lineSegments>
  );
}

// Main 3D Root with pointer-based parallax tilt
export function Hero3DScene() {
  const rootGroup = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!rootGroup.current) return;
    // Smooth lerp towards pointer position for interactive parallax depth
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (-state.pointer.y * Math.PI) / 14;

    rootGroup.current.rotation.y = THREE.MathUtils.damp(
      rootGroup.current.rotation.y,
      targetX,
      2.5,
      delta
    );
    rootGroup.current.rotation.x = THREE.MathUtils.damp(
      rootGroup.current.rotation.x,
      targetY,
      2.5,
      delta
    );
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[-3, 2, 2]} intensity={2.5} color="#00E5FF" distance={8} />
      <pointLight position={[0, -2, 3]} intensity={2.5} color="#8B5CF6" distance={8} />
      <pointLight position={[3, 2, 2]} intensity={2.5} color="#10B981" distance={8} />

      <group ref={rootGroup}>
        <ParticleField />
        <ConnectorLines />
        <ExperiencesNode position={[-1.9, 0.35, 0]} />
        <TechnologyNode position={[0, -0.3, 0.6]} />
        <GrowthNode position={[1.9, 0.45, 0]} />
      </group>
    </>
  );
}
