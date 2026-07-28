"use client";

import { Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Satellite({
  position,
  scale,
  opacity,
}: {
  position: [number, number, number];
  scale: number;
  opacity: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        color="#aebdce"
        roughness={0.24}
        metalness={0.68}
        transmission={0.08}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function Core() {
  return (
    <group position={[-0.34, 0.06, 0]} rotation={[0.035, -0.22, 0.02]}>
      <mesh>
        <icosahedronGeometry args={[1.18, 4]} />
        <meshPhysicalMaterial
          color="#c9d1d9"
          roughness={0.18}
          metalness={0.74}
          transmission={0.14}
          transparent
          opacity={0.38}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.8, 0.3, 0]}>
        <torusGeometry args={[2.35, 0.008, 8, 220]} />
        <meshBasicMaterial color="#8a96a3" transparent opacity={0.28} />
      </mesh>

      <mesh rotation={[0.5, Math.PI / 3.3, 0.4]}>
        <torusGeometry args={[3.35, 0.004, 8, 240]} />
        <meshBasicMaterial color="#d7dee7" transparent opacity={0.14} />
      </mesh>

      <mesh rotation={[-0.22, Math.PI / 2.2, -0.36]}>
        <torusGeometry args={[4.05, 0.003, 8, 260]} />
        <meshBasicMaterial color="#8fa5c1" transparent opacity={0.08} />
      </mesh>

      <Satellite position={[3.34, 0.96, -1.35]} scale={0.19} opacity={0.38} />
      <Satellite position={[0.78, -2.18, -0.15]} scale={0.16} opacity={0.48} />
    </group>
  );
}

export function UniverseScene() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.27} />
      <directionalLight position={[4, 5, 5]} intensity={2.45} />
      <pointLight position={[-4, -2, 2]} intensity={6.4} distance={8.5} />
      <pointLight position={[3.8, 1.2, 2.5]} intensity={2.1} distance={5.5} color="#9ab6db" />
      <Core />
      <Sparkles count={66} scale={[10, 7, 6]} size={1.15} speed={0} opacity={0.31} />
    </Canvas>
  );
}
