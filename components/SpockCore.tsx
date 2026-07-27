"use client";

import { Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

const satellites: [number, number, number][] = [
  [-2.8, 1.5, -0.6],
  [-3.1, -1.15, 0.45],
  [-1.4, 2.65, 0.15],
  [1.4, 2.55, -0.4],
  [3.05, 1.15, 0.5],
  [3.1, -1.4, -0.6],
  [1.15, -2.7, 0.25],
  [-1.45, -2.55, -0.35],
];

function CorePair() {
  const rig = useRef<Group>(null);
  const human = useRef<Mesh>(null);
  const ai = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!rig.current || !human.current || !ai.current) return;
    rig.current.rotation.y += delta * 0.035;
    rig.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.035;

    const pulseHuman = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.035;
    const pulseAi = 1 + Math.sin(state.clock.elapsedTime * 1.1 + 1.3) * 0.045;
    human.current.scale.setScalar(pulseHuman);
    ai.current.scale.setScalar(pulseAi);
  });

  return (
    <group ref={rig}>
      <mesh ref={human} position={[-1.35, 0, 0]}>
        <icosahedronGeometry args={[0.82, 2]} />
        <meshPhysicalMaterial color="#9aaaba" emissive="#61778c" emissiveIntensity={0.34} roughness={0.28} metalness={0.58} transparent opacity={0.84} />
      </mesh>

      <mesh ref={ai} position={[1.35, 0, 0]}>
        <octahedronGeometry args={[0.88, 2]} />
        <meshPhysicalMaterial color="#edf6ff" emissive="#a8c9e8" emissiveIntensity={0.72} roughness={0.18} metalness={0.64} transparent opacity={0.9} />
      </mesh>

      <Line points={[[-0.52, 0, 0], [0.47, 0, 0]]} color="#dbe9f6" lineWidth={1.1} transparent opacity={0.7} />

      {satellites.map((position, index) => (
        <group key={index}>
          <Line points={[[index % 2 === 0 ? -1.35 : 1.35, 0, 0], position]} color="#7790a7" lineWidth={0.5} transparent opacity={0.18} />
          <mesh position={position}>
            <sphereGeometry args={[0.09 + (index % 3) * 0.025, 16, 16]} />
            <meshBasicMaterial color="#b6c9da" transparent opacity={0.64} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function SpockCore() {
  const camera = useMemo(() => ({ position: [0, 0, 7.2] as [number, number, number], fov: 42 }), []);

  return (
    <Canvas dpr={[1, 1.5]} camera={camera} gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}>
      <ambientLight intensity={0.36} />
      <directionalLight position={[4, 6, 5]} intensity={2.6} />
      <pointLight position={[3, -2, 3]} intensity={10} distance={10} />
      <CorePair />
      <Sparkles count={90} scale={[9, 7, 5]} size={0.75} speed={0.08} opacity={0.23} />
    </Canvas>
  );
}
