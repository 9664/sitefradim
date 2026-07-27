"use client";

import { Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Core() {
  return (
    <group rotation={[0.035, -0.22, 0.02]}>
      <mesh>
        <icosahedronGeometry args={[1.05, 3]} />
        <meshPhysicalMaterial
          color="#c9d1d9"
          roughness={0.2}
          metalness={0.72}
          transmission={0.12}
          transparent
          opacity={0.34}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.8, 0.3, 0]}>
        <torusGeometry args={[2.25, 0.008, 8, 180]} />
        <meshBasicMaterial color="#8a96a3" transparent opacity={0.24} />
      </mesh>

      <mesh rotation={[0.5, Math.PI / 3.3, 0.4]}>
        <torusGeometry args={[3.2, 0.004, 8, 200]} />
        <meshBasicMaterial color="#d7dee7" transparent opacity={0.12} />
      </mesh>
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
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} />
      <pointLight position={[-4, -2, 2]} intensity={6} distance={8} />
      <Core />
      <Sparkles count={54} scale={[10, 7, 6]} size={1.2} speed={0} opacity={0.28} />
    </Canvas>
  );
}
