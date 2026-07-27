"use client";

import { Html, Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const layers = [
  ["PROBLEMA", -3.2, 0.42],
  ["CONTEXTO", -1.9, 0.52],
  ["MODELO", -0.65, 0.68],
  ["AGENTE", 0.7, 0.62],
  ["WORKFLOW", 2.05, 0.5],
  ["RESULTADO", 3.35, 0.42],
] as const;

function Architecture() {
  const root = useRef<Group>(null);

  useFrame((state) => {
    if (!root.current) return;
    root.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.13) * 0.12;
    root.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.09) * 0.035;
  });

  return (
    <group ref={root}>
      <Line
        points={layers.map(([, x]) => [x, 0, 0] as [number, number, number])}
        color="#9fb6ca"
        transparent
        opacity={0.26}
        lineWidth={0.8}
      />

      {layers.map(([label, x, size], index) => (
        <group key={label} position={[x, Math.sin(index * 1.25) * 0.45, index % 2 === 0 ? 0.15 : -0.15]}>
          <mesh>
            {index === 2 || index === 3 ? <icosahedronGeometry args={[size, 2]} /> : <octahedronGeometry args={[size, 1]} />}
            <meshPhysicalMaterial
              color={index >= 2 && index <= 3 ? "#e7f1fa" : "#9fb0bf"}
              emissive={index >= 2 && index <= 3 ? "#7898b5" : "#3f566b"}
              emissiveIntensity={index >= 2 && index <= 3 ? 0.62 : 0.24}
              metalness={0.6}
              roughness={0.24}
              transparent
              opacity={0.84}
            />
          </mesh>
          <Html center distanceFactor={9.5} zIndexRange={[20, 0]}>
            <span style={{ color: "#dce7f1", fontSize: 8, letterSpacing: ".17em", whiteSpace: "nowrap", opacity: 0.8 }}>{label}</span>
          </Html>
        </group>
      ))}
    </group>
  );
}

export function AIField() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9.4], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={2.7} />
      <pointLight position={[0, -2, 4]} intensity={11} distance={12} />
      <Architecture />
      <Sparkles count={80} scale={[11, 6, 5]} size={0.65} speed={0.05} opacity={0.16} />
    </Canvas>
  );
}
