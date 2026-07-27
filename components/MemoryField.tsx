"use client";

import { Float, Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

const layers = [
  { position: [-1.4, 0.75, 0.2] as [number, number, number], rotation: [0.08, -0.28, -0.08] as [number, number, number], scale: [2.7, 1.75, 1] as [number, number, number], opacity: 0.16 },
  { position: [-0.45, 0.18, -0.35] as [number, number, number], rotation: [-0.04, 0.18, 0.06] as [number, number, number], scale: [2.8, 1.8, 1] as [number, number, number], opacity: 0.22 },
  { position: [0.65, -0.35, -0.9] as [number, number, number], rotation: [0.05, -0.12, -0.04] as [number, number, number], scale: [2.9, 1.85, 1] as [number, number, number], opacity: 0.28 },
] as const;

function ArchiveLayers() {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.075;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.13) * 0.025;
    }
    if (core.current) core.current.rotation.z += delta * 0.035;
  });

  const path = useMemo(
    () => [
      [-2.8, 1.65, 0.35],
      [-1.4, 0.75, 0.2],
      [-0.45, 0.18, -0.35],
      [0.65, -0.35, -0.9],
      [2.65, -1.55, -1.2],
    ] as [number, number, number][],
    [],
  );

  return (
    <group ref={group}>
      <Line points={path} color="#94a9bc" lineWidth={0.75} transparent opacity={0.26} />

      {layers.map((layer, index) => (
        <Float key={index} speed={0.65 + index * 0.1} rotationIntensity={0.08} floatIntensity={0.16}>
          <mesh position={layer.position} rotation={layer.rotation} scale={layer.scale}>
            <planeGeometry args={[1, 1, 18, 12]} />
            <meshPhysicalMaterial
              color={index === 2 ? "#dce7f0" : "#8799aa"}
              wireframe={index !== 2}
              transparent
              opacity={layer.opacity}
              roughness={0.38}
              metalness={0.28}
              side={2}
            />
          </mesh>
        </Float>
      ))}

      <mesh ref={core} position={[1.65, 0.65, -0.25]}>
        <icosahedronGeometry args={[0.64, 2]} />
        <meshPhysicalMaterial
          color="#dfe9f2"
          emissive="#708ba4"
          emissiveIntensity={0.45}
          metalness={0.55}
          roughness={0.22}
          transparent
          opacity={0.76}
        />
      </mesh>

      <mesh position={[1.65, 0.65, -0.25]} scale={1.65}>
        <sphereGeometry args={[0.66, 22, 22]} />
        <meshBasicMaterial color="#a8bed1" wireframe transparent opacity={0.11} />
      </mesh>
    </group>
  );
}

export function MemoryField() {
  return (
    <Canvas dpr={[1, 1.45]} camera={{ position: [0, 0.1, 7.2], fov: 44 }} gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}>
      <ambientLight intensity={0.38} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <pointLight position={[-4, -2, 3]} intensity={9} distance={11} />
      <ArchiveLayers />
      <Sparkles count={85} scale={[9, 6, 5]} size={0.8} speed={0.06} opacity={0.2} />
    </Canvas>
  );
}
