"use client";

import { Float, Html, Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const layers = [
  { label: "IMAGEM", radius: 1.85, rotation: [1.15, 0.1, 0.4] as [number, number, number], speed: 0.08 },
  { label: "MARKETING", radius: 2.55, rotation: [0.3, 0.85, 0.1] as [number, number, number], speed: -0.055 },
  { label: "NEGÓCIOS", radius: 3.2, rotation: [0.85, 0.2, 0.95] as [number, number, number], speed: 0.042 },
  { label: "TECNOLOGIA", radius: 3.9, rotation: [0.2, 1.15, 0.55] as [number, number, number], speed: -0.032 },
] as const;

function IdentitySystem() {
  const root = useRef<Group>(null);
  const ringRefs = useRef<(Group | null)[]>([]);

  useFrame((state, delta) => {
    if (root.current) {
      root.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.1;
      root.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.09) * 0.025;
    }

    ringRefs.current.forEach((ring, index) => {
      if (!ring) return;
      ring.rotation.z += delta * layers[index].speed;
    });
  });

  return (
    <group ref={root}>
      <Float speed={0.85} floatIntensity={0.32} rotationIntensity={0.08}>
        <mesh>
          <icosahedronGeometry args={[0.9, 3]} />
          <meshPhysicalMaterial
            color="#edf4fb"
            emissive="#718da6"
            emissiveIntensity={0.32}
            metalness={0.62}
            roughness={0.2}
            transparent
            opacity={0.94}
          />
        </mesh>
        <mesh scale={1.17}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial color="#d7e6f3" wireframe transparent opacity={0.12} />
        </mesh>
        <Html center distanceFactor={8.5} zIndexRange={[20, 0]}>
          <div style={{ textAlign: "center", pointerEvents: "none", color: "#f4f8fc" }}>
            <small style={{ display: "block", fontSize: 8, letterSpacing: ".22em", opacity: 0.62 }}>HUMANO</small>
            <strong style={{ fontSize: 15, fontWeight: 600 }}>Marcelo</strong>
          </div>
        </Html>
      </Float>

      {layers.map((layer, index) => (
        <group
          key={layer.label}
          ref={(node) => {
            ringRefs.current[index] = node;
          }}
          rotation={layer.rotation}
        >
          <mesh>
            <torusGeometry args={[layer.radius, 0.012, 8, 220]} />
            <meshBasicMaterial color="#91a8bc" transparent opacity={0.22 - index * 0.025} />
          </mesh>
          <mesh position={[layer.radius, 0, 0]}>
            <sphereGeometry args={[0.075 + index * 0.012, 18, 18]} />
            <meshBasicMaterial color="#dce8f2" transparent opacity={0.72} />
          </mesh>
        </group>
      ))}

      <Line points={[[-4.7, 0, 0], [4.7, 0, 0]]} color="#8095a8" transparent opacity={0.08} lineWidth={0.45} />
      <Line points={[[0, -4.3, 0], [0, 4.3, 0]]} color="#8095a8" transparent opacity={0.06} lineWidth={0.45} />
    </group>
  );
}

export function MarceloCore() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 43 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 5, 6]} intensity={2.5} />
      <pointLight position={[-4, -2, 3]} intensity={10} distance={11} />
      <IdentitySystem />
      <Sparkles count={85} scale={[10, 8, 6]} size={0.75} speed={0.055} opacity={0.18} />
    </Canvas>
  );
}
